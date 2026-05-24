import { Component } from "solid-js";
import { useAppContext } from "@/store/AppContext";
import { ChartBase } from "./ChartBase";
import { ChartOption } from "@/logic/chartWrapper";
import { NormalizedReport } from "@/model/output";

export interface ComplexityDataShape {
  value: [number, number, number];
  functionName: string;
  fileName: string;
}

export const buildComplexityScatterData = (data: NormalizedReport): ComplexityDataShape[] => {
  return Object.values(data.hotspots)
    .filter((item) => Object.keys(item.complexity ?? {}).length)
    .map((item) => ({
      value: [item.complexity!.maxComplexity, item.errorCount, item.issueCount],
      functionName: item.complexity!.functionName,
      fileName: item.filename,
    }));
};

export const buildComplexityScatterOptions = (data: NormalizedReport): ChartOption => {
  const chartData = buildComplexityScatterData(data);

  return {
    tooltip: {
      formatter: (params: unknown) => {
        const p = params as { data: ComplexityDataShape };
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
        data: chartData,
        symbolSize: (chartData: [number, number, number]) => {
          return Math.max(Math.sqrt(chartData[2]) * 4, 8);
        },
        itemStyle: {
          color: "rgba(255, 99, 132, 0.7)",
        },
      },
    ],
  };
};

export const ComplexityScatter: Component = () => {
  const context = useAppContext();

  return <ChartBase options={buildComplexityScatterOptions(context.data)} class="min-h-[400px]" />;
};
