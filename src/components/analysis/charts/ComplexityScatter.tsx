import { Component, createMemo } from "solid-js";
import { useAppContext } from "@/store/AppContext";
import { ChartBase } from "./ChartBase";
import { ChartOption } from "@/logic/chartWrapper";

interface DataShape {
  value: [number, number, number];
  functionName: string;
  fileName: string;
}

export const ComplexityScatter: Component = () => {
  const context = useAppContext();

  const chartData = createMemo<DataShape[]>(() => {
    return Object.values(context.data.hotspots)
      .filter((item) => Object.keys(item.complexity ?? {}).length)
      .map((item) => ({
        value: [item.complexity!.maxComplexity, item.errorCount, item.issueCount],
        functionName: item.complexity!.functionName,
        fileName: item.filename,
      }));
  });

  const options = createMemo<ChartOption>(() => ({
    tooltip: {
      formatter: (params: unknown) => {
        const p = params as { data: DataShape };
        const d = p.data;
        return `
          <strong>${d.functionName}()</strong>
          <br/>
          ${d.fileName}
          <br/>
        `;
      },
    },
    xAxis: {
      name: "Complexity",
      type: "value",
      splitLine: { lineStyle: { type: "dashed" } },
    },
    yAxis: {
      name: "Errors",
      type: "value",
      splitLine: { lineStyle: { type: "dashed" } },
    },
    series: [
      {
        type: "scatter",
        data: chartData(),
        symbolSize: (data: [number, number, number]) => {
          return Math.max(Math.sqrt(data[2]) * 4, 8);
        },
        itemStyle: {
          color: "rgba(255, 99, 132, 0.7)",
        },
      },
    ],
  }));

  return <ChartBase options={options()} class="min-h-[400px]" />;
};
