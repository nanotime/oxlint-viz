import { describe, expect, it, vi } from "vite-plus/test";
import { render } from "@solidjs/testing-library";
import {
  ComplexityScatter,
  buildComplexityScatterOptions,
  buildComplexityScatterData,
} from "../ComplexityScatter";
import { createMockReport } from "@/__test__/helpers";

vi.mock("@/store/AppContext", () => ({
  useAppContext: () => ({ data: createMockReport() }),
}));

vi.mock("./ChartBase", () => ({
  ChartBase: (props: { options: unknown; class?: string }) => (
    <div
      data-testid="chart-base"
      data-options={JSON.stringify(props.options)}
      class={props.class}
    />
  ),
}));

describe("buildComplexityScatterData", () => {
  it("should return empty array when no hotspots have complexity", () => {
    const report = createMockReport({ hotspots: {} });
    const result = buildComplexityScatterData(report);

    expect(result).toHaveLength(0);
  });

  it("should extract complexity data from hotspots", () => {
    const report = createMockReport({
      hotspots: {
        "src/test.ts": {
          filename: "src/test.ts",
          issueCount: 5,
          errorCount: 3,
          warningCount: 2,
          categories: {},
          complexity: {
            functionName: "testFn",
            maxComplexity: 15,
            currentComplexity: 10,
          },
        },
      },
    });
    const result = buildComplexityScatterData(report);

    expect(result).toHaveLength(1);
    expect(result[0].functionName).toBe("testFn");
    expect(result[0].fileName).toBe("src/test.ts");
    expect(result[0].value).toEqual([15, 3, 5]);
  });

  it("should filter out hotspots without complexity", () => {
    const report = createMockReport({
      hotspots: {
        "src/with.ts": {
          filename: "src/with.ts",
          issueCount: 5,
          errorCount: 5,
          warningCount: 0,
          categories: {},
          complexity: { functionName: "fn1", maxComplexity: 10, currentComplexity: 5 },
        },
        "src/without.ts": {
          filename: "src/without.ts",
          issueCount: 2,
          errorCount: 2,
          warningCount: 0,
          categories: {},
        },
      },
    });
    const result = buildComplexityScatterData(report);

    expect(result).toHaveLength(1);
    expect(result[0].fileName).toBe("src/with.ts");
  });

  it("should map complexity data correctly", () => {
    const report = createMockReport({
      hotspots: {
        "src/file.ts": {
          filename: "src/file.ts",
          issueCount: 10,
          errorCount: 8,
          warningCount: 2,
          categories: {},
          complexity: {
            functionName: "complexFn",
            maxComplexity: 25,
            currentComplexity: 20,
          },
        },
      },
    });
    const result = buildComplexityScatterData(report);

    expect(result[0].value[0]).toBe(25);
    expect(result[0].value[1]).toBe(8);
    expect(result[0].value[2]).toBe(10);
  });
});

describe("buildComplexityScatterOptions", () => {
  it("should return correct chart structure", () => {
    const report = createMockReport();
    const options = buildComplexityScatterOptions(report) as any;

    expect(options.tooltip).toBeDefined();
    expect(options.xAxis).toBeDefined();
    expect(options.yAxis).toBeDefined();
    expect(options.series).toHaveLength(1);
    expect(options.series[0].type).toBe("scatter");
  });

  it("should configure xAxis with complexity label and dashed splitLine", () => {
    const report = createMockReport();
    const options = buildComplexityScatterOptions(report) as any;

    expect(options.xAxis.name).toBe("Complexity");
    expect(options.xAxis.splitLine.lineStyle.type).toBe("dashed");
  });

  it("should configure yAxis with errors label and dashed splitLine", () => {
    const report = createMockReport();
    const options = buildComplexityScatterOptions(report) as any;

    expect(options.yAxis.name).toBe("Errors");
    expect(options.yAxis.splitLine.lineStyle.type).toBe("dashed");
  });

  it("should calculate symbolSize based on issueCount", () => {
    const report = createMockReport({
      hotspots: {
        "src/test.ts": {
          filename: "src/test.ts",
          issueCount: 25,
          errorCount: 25,
          warningCount: 0,
          categories: {},
          complexity: { functionName: "fn", maxComplexity: 10, currentComplexity: 5 },
        },
      },
    });
    const options = buildComplexityScatterOptions(report) as any;

    const symbolSizeFn = options.series[0].symbolSize;
    expect(symbolSizeFn([10, 25, 25])).toBe(20);
  });

  it("should have minimum symbolSize of 8", () => {
    const report = createMockReport({
      hotspots: {
        "src/test.ts": {
          filename: "src/test.ts",
          issueCount: 1,
          errorCount: 1,
          warningCount: 0,
          categories: {},
          complexity: { functionName: "fn", maxComplexity: 5, currentComplexity: 1 },
        },
      },
    });
    const options = buildComplexityScatterOptions(report) as any;

    const symbolSizeFn = options.series[0].symbolSize;
    expect(symbolSizeFn([5, 1, 1])).toBe(8);
  });

  it("should set itemStyle with correct color", () => {
    const report = createMockReport();
    const options = buildComplexityScatterOptions(report) as any;

    expect(options.series[0].itemStyle.color).toBe("rgba(255, 99, 132, 0.7)");
  });
});

describe("ComplexityScatter Component", () => {
  it("should render without errors", () => {
    const { container } = render(() => <ComplexityScatter />);
    expect(container.querySelector(".w-full")).toBeInTheDocument();
  });
});
