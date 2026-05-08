import { Component } from "solid-js";
import { ChartBase } from "./ChartBase";
import { ChartOption } from "@/logic/chartWrapper";
import { useAppContext } from "@/store/AppContext";

export const FilesHeatmap: Component = () => {
  const context = useAppContext();
  const options = (): ChartOption => {
    const hotspots = context.data.hotspots;
    const hotSpotsData = Object.entries(hotspots)
      .map(([key, data]) => ({
        name: data.filename.split("/").pop() || key,
        issueCount: data.issueCount,
        categories: data.categories,
      }))
      .sort((a, b) => b.issueCount - a.issueCount);

    const xAxisData = ["correctness", "pedantic", "perf", "style", "suspicious", "restriction"];
    const yAxisData = hotSpotsData.map((spot) => spot.name);
    const heatMapData: [number, number, number][] = [];

    hotSpotsData.forEach((spot, yIdex) => {
      xAxisData.forEach((category, xIndex) => {
        const value = spot.categories[category] || 0;
        heatMapData.push([xIndex, yIdex, value]);
      });
    });

    const cats: number[] = [];
    hotSpotsData.forEach((spot) => {
      const categs = Math.max(...Object.values(spot.categories));
      cats.push(categs);
    });

    return {
      tooltip: {
        trigger: "item",
      },
      xAxis: {
        type: "category",
        data: xAxisData,
      },
      yAxis: {
        type: "category",
        data: yAxisData,
      },
      visualMap: {
        min: 0,
        max: Math.max(...cats),
        calculable: true,
        orient: "vertical",
        bottom: "30%",
        right: "0%",
        inRange: {
          color: ["#f3f4f6", "#ef4444", "#7f1d1d"],
        },
      },
      series: [
        {
          type: "heatmap",
          data: heatMapData,
        },
      ],
    };
  };
  return <ChartBase options={options()} />;
};
