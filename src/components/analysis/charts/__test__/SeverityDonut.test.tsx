import { describe, expect, it, vi } from "vite-plus/test";
import { render } from "@solidjs/testing-library";
import { SeverityDonut, buildSeverityDonutOptions } from "../SeverityDonut";
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

describe("buildSeverityDonutOptions", () => {
  it("should return correct chart structure", () => {
    const report = createMockReport();
    const options = buildSeverityDonutOptions(report) as any;

    expect(options.tooltip).toBeDefined();
    expect(options.legend).toBeDefined();
    expect(options.title).toBeDefined();
    expect(options.series).toHaveLength(1);
    expect(options.series[0].type).toBe("pie");
  });

  it("should calculate total from severity distribution", () => {
    const report = createMockReport({
      distribution: { severity: { error: 50, warning: 30, advice: 20 }, categories: {} },
    });
    const options = buildSeverityDonutOptions(report) as any;

    expect(options.title.text).toBe("100");
    expect(options.title.subtext).toBe("Issues");
  });

  it("should set correct series data for severity levels", () => {
    const report = createMockReport({
      distribution: { severity: { error: 50, warning: 30, advice: 20 }, categories: {} },
    });
    const options = buildSeverityDonutOptions(report) as any;

    const data = options.series[0].data;
    expect(data).toHaveLength(3);
    expect(data.find((d: any) => d.name === "Error").value).toBe(50);
    expect(data.find((d: any) => d.name === "Warning").value).toBe(30);
    expect(data.find((d: any) => d.name === "Advice").value).toBe(20);
  });

  it("should use correct colors for severity", () => {
    const report = createMockReport();
    const options = buildSeverityDonutOptions(report) as any;

    expect(options.series[0].color).toEqual([
      palette.status.error,
      palette.status.warning,
      palette.status.info,
    ]);
  });

  it("should configure pie with donut radius", () => {
    const report = createMockReport();
    const options = buildSeverityDonutOptions(report) as any;

    expect(options.series[0].radius).toEqual(["55%", "80%"]);
  });

  it("should handle zero totals gracefully", () => {
    const report = createMockReport({
      distribution: { severity: { error: 0, warning: 0, advice: 0 }, categories: {} },
    });
    const options = buildSeverityDonutOptions(report) as any;

    expect(options.title.text).toBe("0");
  });

  it("should hide label on pie", () => {
    const report = createMockReport();
    const options = buildSeverityDonutOptions(report) as any;

    expect(options.series[0].label.show).toBe(false);
  });

  it("should configure itemStyle with border radius and width", () => {
    const report = createMockReport();
    const options = buildSeverityDonutOptions(report) as any;

    expect(options.series[0].itemStyle.borderRadius).toBe(6);
    expect(options.series[0].itemStyle.borderColor).toBe("#fff");
    expect(options.series[0].itemStyle.borderWidth).toBe(2);
  });
});

describe("SeverityDonut Component", () => {
  it("should render without errors", () => {
    const { container } = render(() => <SeverityDonut />);
    expect(container.querySelector(".w-full")).toBeInTheDocument();
  });
});
