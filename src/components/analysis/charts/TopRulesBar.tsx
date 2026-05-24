import { Component } from "solid-js";
import { ChartBase } from "./ChartBase";
import { ChartOption } from "@/logic/chartWrapper";
import { useAppContext } from "@/store/AppContext";
import { palette } from "@/utils/palette";
import { NormalizedReport } from "@/model/output";

export const buildTopRulesBarOptions = (data: NormalizedReport): ChartOption => {
  const rules = data.rules;

  const top15Data = Object.entries(rules)
    .map(([name, ruleData]) => ({ name, count: ruleData.count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  const top15 = top15Data.map((r) => r.count);
  const yAxisCategories = top15Data.map((r) => r.name);

  const barsPalette = top15.map((_, idx) => {
    if (idx < 2) return palette.grayscale.dark;
    if (idx < 5) return palette.grayscale.mid;
    if (idx < 8) return palette.grayscale.light;

    return palette.base[300];
  });

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
      inverse: true,
      data: yAxisCategories,
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
        data: top15,
        itemStyle: {
          color: ({ dataIndex }: { dataIndex: number }) =>
            barsPalette[dataIndex] ?? palette.base[300],
          borderRadius: [0, 4, 4, 0],
        },
      },
    ],
  };
};

export const TopRulesBar: Component = () => {
  const context = useAppContext();

  return <ChartBase options={buildTopRulesBarOptions(context.data)} />;
};
