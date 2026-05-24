import { describe, expect, it, vi } from "vite-plus/test";
import { render } from "@solidjs/testing-library";
import { FilesByErrors, buildFilesByErrorsOptions, getErrorColor } from "../FilesByErrors";
import { createMockReport } from "@/__test__/helpers";
import { palette } from "@/utils/palette";

vi.mock("@/store/AppContext", () => ({
  useAppContext: () => ({ data: createMockReport() }),
}));

vi.mock("./ChartBase", () => ({
  ChartBase: (props: { options: unknown }) => (
    <div data-testid="chart-base" data-options={JSON.stringify(props.options)} />
  ),
}));

describe("getErrorColor", () => {
  it("should return light gray for zero errors", () => {
    expect(getErrorColor(0)).toBe(palette.grayscale.light);
  });

  it("should return mid gray for 1-5 errors", () => {
    expect(getErrorColor(1)).toBe(palette.grayscale.mid);
    expect(getErrorColor(5)).toBe(palette.grayscale.mid);
  });

  it("should return dark gray for 6-15 errors", () => {
    expect(getErrorColor(6)).toBe(palette.grayscale.dark);
    expect(getErrorColor(15)).toBe(palette.grayscale.dark);
  });

  it("should return error color for more than 15 errors", () => {
    expect(getErrorColor(16)).toBe(palette.status.error);
    expect(getErrorColor(100)).toBe(palette.status.error);
  });
});

describe("buildFilesByErrorsOptions", () => {
  it("should return correct chart structure", () => {
    const report = createMockReport();
    const options = buildFilesByErrorsOptions(report) as any;

    expect(options.tooltip).toBeDefined();
    expect(options.series).toHaveLength(1);
    expect(options.series[0].type).toBe("treemap");
  });

  it("should map hotspots to treemap data", () => {
    const report = createMockReport({
      hotspots: {
        "src/components/test.tsx": {
          filename: "src/components/test.tsx",
          issueCount: 5,
          errorCount: 3,
          warningCount: 2,
          categories: { correctness: 3, style: 2 },
        },
      },
    });
    const options = buildFilesByErrorsOptions(report) as any;

    expect(options.series[0].data).toHaveLength(1);
    expect(options.series[0].data[0].name).toBe("test.tsx");
    expect(options.series[0].data[0].fullPath).toBe("src/components/test.tsx");
    expect(options.series[0].data[0].value).toBe(3);
    expect(options.series[0].data[0].issueCount).toBe(5);
    expect(options.series[0].data[0].errorCount).toBe(3);
    expect(options.series[0].data[0].warningCount).toBe(2);
  });

  it("should extract file name from path (last segment)", () => {
    const report = createMockReport({
      hotspots: {
        "src/components/nested/deep/TestFile.tsx": {
          filename: "src/components/nested/deep/TestFile.tsx",
          issueCount: 1,
          errorCount: 1,
          warningCount: 0,
          categories: {},
        },
      },
    });
    const options = buildFilesByErrorsOptions(report) as any;

    expect(options.series[0].data[0].name).toBe("TestFile.tsx");
  });

  it("should handle empty hotspots", () => {
    const report = createMockReport({ hotspots: {} });
    const options = buildFilesByErrorsOptions(report) as any;

    expect(options.series[0].data).toHaveLength(0);
  });

  it("should count complexity findings (number of complexity properties)", () => {
    const report = createMockReport({
      hotspots: {
        "src/test.tsx": {
          filename: "src/test.tsx",
          issueCount: 2,
          errorCount: 2,
          warningCount: 0,
          categories: {},
          complexity: {
            functionName: "testFn",
            maxComplexity: 15,
            currentComplexity: 10,
          },
        },
      },
    });
    const options = buildFilesByErrorsOptions(report) as any;

    // complexity has 3 properties: functionName, maxComplexity, currentComplexity
    expect(options.series[0].data[0].complexityCount).toBe(3);
  });

  it("should set treemap as non-interactive", () => {
    const report = createMockReport();
    const options = buildFilesByErrorsOptions(report) as any;

    expect(options.series[0].roam).toBe(false);
    expect(options.series[0].nodeClick).toBe(false);
    expect(options.series[0].breadcrumb.show).toBe(false);
  });

  it("should configure label to show and truncate", () => {
    const report = createMockReport();
    const options = buildFilesByErrorsOptions(report) as any;

    expect(options.series[0].label.show).toBe(true);
    expect(options.series[0].label.formatter).toBe("{b}");
    expect(options.series[0].label.overflow).toBe("truncate");
  });
});

describe("FilesByErrors Component", () => {
  it("should render without errors", () => {
    const { container } = render(() => <FilesByErrors />);
    expect(container.querySelector(".w-full")).toBeInTheDocument();
  });
});
