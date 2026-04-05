import { Component } from "solid-js";
import { ChartBase } from "./ChartBase";
import { ChartOption } from "@/logic/chartWrapper";
import { useAppContext } from "@/store/AppContext";
import { palette } from "@/utils/palette";

export const CategoriesBarChart: Component = () => {
  const context = useAppContext();

  const options = (): ChartOption => {
    // Sort categories by count for a more professional dashboard look
    const categories = Object.entries(context.data.distribution.categories)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
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
        data: categories.map((c) => c.name),
      },
      series: [
        {
          name: "Categories distribution",
          type: "bar",
          color: palette.grayscale.dark,
          data: categories.map((c) => c.count),
          itemStyle: {
            borderRadius: [0, 4, 4, 0],
          },
        },
      ],
    };
  };

  return <ChartBase options={options()} />;
};
