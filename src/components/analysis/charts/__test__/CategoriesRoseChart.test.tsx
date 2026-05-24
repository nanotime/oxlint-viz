import { describe, expect, it, vi } from "vite-plus/test";
import { render } from "@solidjs/testing-library";
import { CategoriesRoseChart, buildCategoriesRoseOptions } from "../CategoriesRoseChart";
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

describe("buildCategoriesRoseOptions", () => {
  it("should return correct chart structure", () => {
    const report = createMockReport();
    const options = buildCategoriesRoseOptions(report) as any;

    expect(options.tooltip).toBeDefined();
    expect(options.legend).toBeDefined();
    expect(options.series).toHaveLength(1);
    expect(options.series[0].type).toBe("pie");
  });

  it("should sort categories by count descending", () => {
    const report = createMockReport({
      distribution: {
        categories: { style: 100, correctness: 200, perf: 50 },
        severity: { error: 0, warning: 0, advice: 0 },
      },
    });
    const options = buildCategoriesRoseOptions(report) as any;

    expect(options.series[0].data[0].name).toBe("correctness");
    expect(options.series[0].data[1].name).toBe("style");
    expect(options.series[0].data[2].name).toBe("perf");
  });

  it("should apply grayscale colors from palette", () => {
    const report = createMockReport({
      distribution: {
        categories: { a: 10, b: 9, c: 8, d: 7, e: 6, f: 5 },
        severity: { error: 0, warning: 0, advice: 0 },
      },
    });
    const options = buildCategoriesRoseOptions(report) as any;

    const expectedColors = [
      palette.grayscale.dark,
      palette.grayscale.mid,
      palette.grayscale.light,
      "#9ca3af",
      "#d1d5db",
      "#e5e7eb",
    ];

    options.series[0].data.forEach((d: any, idx: number) => {
      expect(d.itemStyle.color).toBe(expectedColors[Math.min(idx, expectedColors.length - 1)]);
    });
  });

  it("should handle empty categories", () => {
    const report = createMockReport({
      distribution: { categories: {}, severity: { error: 0, warning: 0, advice: 0 } },
    });
    const options = buildCategoriesRoseOptions(report) as any;

    expect(options.series[0].data).toHaveLength(0);
    expect(options.legend.data).toHaveLength(0);
  });

  it("should set roseType to area", () => {
    const report = createMockReport();
    const options = buildCategoriesRoseOptions(report) as any;

    expect(options.series[0].roseType).toBe("area");
  });

  it("should configure correct radius and center", () => {
    const report = createMockReport();
    const options = buildCategoriesRoseOptions(report) as any;

    expect(options.series[0].radius).toEqual([20, 100]);
    expect(options.series[0].center).toEqual(["40%", "50%"]);
  });

  it("should hide labels on pie", () => {
    const report = createMockReport();
    const options = buildCategoriesRoseOptions(report) as any;

    expect(options.series[0].label.show).toBe(false);
  });

  it("should add border radius to itemStyle", () => {
    const report = createMockReport();
    const options = buildCategoriesRoseOptions(report) as any;

    expect(options.series[0].itemStyle.borderRadius).toBe(5);
  });

  it("should set legend data from category names", () => {
    const report = createMockReport({
      distribution: {
        categories: { correctness: 50, style: 30 },
        severity: { error: 0, warning: 0, advice: 0 },
      },
    });
    const options = buildCategoriesRoseOptions(report) as any;

    expect(options.legend.data).toContain("correctness");
    expect(options.legend.data).toContain("style");
  });
});

describe("CategoriesRoseChart Component", () => {
  it("should render without errors", () => {
    const { container } = render(() => <CategoriesRoseChart />);
    expect(container.querySelector(".w-full")).toBeInTheDocument();
  });
});
