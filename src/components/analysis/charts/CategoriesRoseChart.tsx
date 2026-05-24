import { Component } from "solid-js";
import { ChartBase } from "./ChartBase";
import { ChartOption } from "@/logic/chartWrapper";
import { useAppContext } from "@/store/AppContext";
import { palette } from "@/utils/palette";
import { NormalizedReport } from "@/model/output";

export const buildCategoriesRoseOptions = (data: NormalizedReport): ChartOption => {
  const categories = Object.entries(data.distribution.categories)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const grayscaleColors = [
    palette.grayscale.dark,
    palette.grayscale.mid,
    palette.grayscale.light,
    "#9ca3af",
    "#d1d5db",
    "#e5e7eb",
  ];

  const chartData = categories.map((c, index) => ({
    value: c.count,
    name: c.name,
    itemStyle: {
      color: grayscaleColors[Math.min(index, grayscaleColors.length - 1)],
    },
  }));

  return {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
    },
    legend: {
      orient: "vertical",
      right: "right",
      data: categories.map((c) => c.name),
    },
    series: [
      {
        name: "Categories",
        type: "pie",
        roseType: "area",
        radius: [20, 100],
        center: ["40%", "50%"],
        itemStyle: {
          borderRadius: 5,
        },
        label: {
          show: false,
        },
        data: chartData,
      },
    ],
  };
};

export const CategoriesRoseChart: Component = () => {
  const context = useAppContext();

  return <ChartBase options={buildCategoriesRoseOptions(context.data)} />;
};
