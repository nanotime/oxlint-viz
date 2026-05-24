import { describe, expect, it, vi } from "vite-plus/test";
import { render } from "@solidjs/testing-library";
import { FilesHeatmap, buildFilesHeatmapOptions } from "../FilesHeatmap";
import { createMockReport } from "@/__test__/helpers";

vi.mock("@/store/AppContext", () => ({
  useAppContext: () => ({ data: createMockReport() }),
}));

vi.mock("./ChartBase", () => ({
  ChartBase: (props: { options: unknown }) => (
    <div data-testid="chart-base" data-options={JSON.stringify(props.options)} />
  ),
}));

describe("buildFilesHeatmapOptions", () => {
  it("should return correct chart structure", () => {
    const report = createMockReport();
    const options = buildFilesHeatmapOptions(report) as any;

    expect(options.tooltip).toBeDefined();
    expect(options.xAxis).toBeDefined();
    expect(options.yAxis).toBeDefined();
    expect(options.visualMap).toBeDefined();
    expect(options.series).toHaveLength(1);
    expect(options.series[0].type).toBe("heatmap");
  });

  it("should have correct xAxis categories", () => {
    const report = createMockReport();
    const options = buildFilesHeatmapOptions(report) as any;

    expect(options.xAxis.data).toEqual([
      "correctness",
      "pedantic",
      "perf",
      "style",
      "suspicious",
      "restriction",
    ]);
  });

  it("should map hotspots to yAxis and heatmap data", () => {
    const report = createMockReport({
      hotspots: {
        "src/file1.ts": {
          filename: "src/file1.ts",
          issueCount: 5,
          errorCount: 3,
          warningCount: 2,
          categories: { correctness: 2, style: 3 },
        },
      },
    });
    const options = buildFilesHeatmapOptions(report) as any;

    expect(options.yAxis.data).toContain("file1.ts");
    expect(
      options.series[0].data.some((d: number[]) => d[0] === 0 && d[1] === 0 && d[2] === 2),
    ).toBe(true);
    expect(
      options.series[0].data.some((d: number[]) => d[0] === 3 && d[1] === 0 && d[2] === 3),
    ).toBe(true);
  });

  it("should sort hotspots by issueCount descending for yAxis", () => {
    const report = createMockReport({
      hotspots: {
        "src/low.ts": {
          filename: "src/low.ts",
          issueCount: 1,
          errorCount: 1,
          warningCount: 0,
          categories: {},
        },
        "src/high.ts": {
          filename: "src/high.ts",
          issueCount: 10,
          errorCount: 10,
          warningCount: 0,
          categories: {},
        },
        "src/med.ts": {
          filename: "src/med.ts",
          issueCount: 5,
          errorCount: 5,
          warningCount: 0,
          categories: {},
        },
      },
    });
    const options = buildFilesHeatmapOptions(report) as any;

    expect(options.yAxis.data[0]).toBe("high.ts");
    expect(options.yAxis.data[1]).toBe("med.ts");
    expect(options.yAxis.data[2]).toBe("low.ts");
  });

  it("should handle empty hotspots", () => {
    const report = createMockReport({ hotspots: {} });
    const options = buildFilesHeatmapOptions(report) as any;

    expect(options.yAxis.data).toHaveLength(0);
    expect(options.series[0].data).toHaveLength(0);
    expect(options.visualMap.max).toBe(0);
  });

  it("should handle missing categories as zero", () => {
    const report = createMockReport({
      hotspots: {
        "src/file.ts": {
          filename: "src/file.ts",
          issueCount: 2,
          errorCount: 2,
          warningCount: 0,
          categories: { correctness: 2 },
        },
      },
    });
    const options = buildFilesHeatmapOptions(report) as any;

    const nonZeroCount = options.series[0].data.filter((d: number[]) => d[2] > 0).length;
    expect(nonZeroCount).toBe(1);
  });

  it("should configure visualMap with correct colors", () => {
    const report = createMockReport();
    const options = buildFilesHeatmapOptions(report) as any;

    expect(options.visualMap.inRange.color).toEqual(["#f3f4f6", "#ef4444", "#7f1d1d"]);
  });

  it("should set visualMap calculable and orient vertical", () => {
    const report = createMockReport();
    const options = buildFilesHeatmapOptions(report) as any;

    expect(options.visualMap.calculable).toBe(true);
    expect(options.visualMap.orient).toBe("vertical");
  });
});

describe("FilesHeatmap Component", () => {
  it("should render without errors", () => {
    const { container } = render(() => <FilesHeatmap />);
    expect(container.querySelector(".w-full")).toBeInTheDocument();
  });
});
