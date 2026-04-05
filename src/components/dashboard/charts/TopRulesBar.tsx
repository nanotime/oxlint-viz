import { Component } from "solid-js";
import { ChartBase } from "./ChartBase";
import { ChartOption } from "@/logic/chartWrapper";
import { useAppContext } from "@/store/AppContext";
import { palette } from "@/utils/palette";

export const TopRulesBar: Component = () => {
  const context = useAppContext();

  const options = (): ChartOption => {
    const rules = context.data.rules;

    // Convert to array of entries, sort by count descending, take top 15, then reverse
    // (Reversing is necessary for horizontal bars in ECharts to show largest on top)
    const top15 = Object.entries(rules)
      .map(([name, data]) => ({ name, count: data.count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15)
      .reverse();

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
      },
      yAxis: {
        type: "category",
        data: top15.map((r) => r.name),
        axisLabel: {
          show: false,
        },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      series: [
        {
          name: "Occurrences",
          type: "bar",
          color: palette.grayscale.dark,
          data: top15.map((r) => r.count),
          itemStyle: {
            borderRadius: [0, 4, 4, 0],
          },
        },
      ],
    };
  };

  return <ChartBase options={options()} />;
};
