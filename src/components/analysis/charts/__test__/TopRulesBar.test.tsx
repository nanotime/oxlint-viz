import { describe, expect, it, vi } from "vite-plus/test";
import { render } from "@solidjs/testing-library";
import { TopRulesBar, buildTopRulesBarOptions } from "../TopRulesBar";
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

describe("buildTopRulesBarOptions", () => {
  it("should return correct chart structure", () => {
    const report = createMockReport();
    const options = buildTopRulesBarOptions(report) as any;

    expect(options.tooltip).toBeDefined();
    expect(options.grid).toBeDefined();
    expect(options.xAxis).toBeDefined();
    expect(options.yAxis).toBeDefined();
    expect(options.series).toHaveLength(1);
    expect(options.series[0].type).toBe("bar");
  });

  it("should sort rules by count descending and take top 15", () => {
    const report = createMockReport({
      rules: {
        "rule-a": { name: "rule-a", count: 100, category: "correctness" },
        "rule-b": { name: "rule-b", count: 50, category: "style" },
        "rule-c": { name: "rule-c", count: 30, category: "correctness" },
      },
    });
    const options = buildTopRulesBarOptions(report) as any;

    const yAxisData = options.yAxis.data;
    expect(yAxisData[0]).toBe("rule-a");
    expect(yAxisData[1]).toBe("rule-b");
    expect(yAxisData[2]).toBe("rule-c");
  });

  it("should handle empty rules", () => {
    const report = createMockReport({ rules: {} });
    const options = buildTopRulesBarOptions(report) as any;

    expect(options.yAxis.data).toEqual([]);
    expect(options.series[0].data).toEqual([]);
  });

  it("should limit to top 15 rules", () => {
    const rules: Record<string, { name: string; count: number; category: string }> = {};
    for (let i = 0; i < 20; i++) {
      rules[`rule-${i}`] = { name: `rule-${i}`, count: 20 - i, category: "style" };
    }
    const report = createMockReport({ rules });
    const options = buildTopRulesBarOptions(report) as any;

    expect(options.yAxis.data).toHaveLength(15);
    expect(options.series[0].data).toHaveLength(15);
  });

  it("should return a function for dynamic color based on index", () => {
    const report = createMockReport();
    const options = buildTopRulesBarOptions(report) as any;

    expect(typeof options.series[0].itemStyle.color).toBe("function");

    // Verify the function returns correct palette colors based on index
    // Index 0-1: dark, Index 2-4: mid, Index 5-7: light, Index 8+: base[300]
    const dark = palette.grayscale.dark;
    const mid = palette.grayscale.mid;
    const light = palette.grayscale.light;
    const base300 = palette.base[300];

    expect(options.series[0].itemStyle.color({ dataIndex: 0 })).toBe(dark);
    expect(options.series[0].itemStyle.color({ dataIndex: 1 })).toBe(dark);
    expect(options.series[0].itemStyle.color({ dataIndex: 2 })).toBe(mid);
    expect(options.series[0].itemStyle.color({ dataIndex: 4 })).toBe(mid);
    expect(options.series[0].itemStyle.color({ dataIndex: 5 })).toBe(light);

    // Index 8+ should return base[300] (falls through to last return)
    // This also tests boundary when palette length < dataIndex
    expect(options.series[0].itemStyle.color({ dataIndex: 8 })).toBe(base300);
  });

  it("should handle dataIndex beyond palette length by returning base[300]", () => {
    const report = createMockReport();
    const options = buildTopRulesBarOptions(report) as any;

    // Default mock has 6 rules, so palette has 6 items (indices 0-5)
    // For dataIndex beyond 5, it should return base[300]
    const colorFn = options.series[0].itemStyle.color;
    expect(colorFn({ dataIndex: 100 })).toBe(palette.base[300]);
  });

  it("should set yAxis inverse to true", () => {
    const report = createMockReport();
    const options = buildTopRulesBarOptions(report) as any;

    expect(options.yAxis.inverse).toBe(true);
  });

  it("should hide yAxis label, tick, and line", () => {
    const report = createMockReport();
    const options = buildTopRulesBarOptions(report) as any;

    expect(options.yAxis.axisLabel.show).toBe(false);
    expect(options.yAxis.axisTick.show).toBe(false);
    expect(options.yAxis.axisLine.show).toBe(false);
  });
});

describe("TopRulesBar Component", () => {
  it("should render without errors", () => {
    const { container } = render(() => <TopRulesBar />);
    expect(container.querySelector(".w-full")).toBeInTheDocument();
  });
});
