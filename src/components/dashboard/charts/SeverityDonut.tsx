import { Component } from "solid-js";
import { ChartBase } from "./ChartBase";
import { ChartOption } from "@/logic/chartWrapper";
import { useAppContext } from "@/store/AppContext";
import { palette } from "@/utils/palette";

export const SeverityDonut: Component = () => {
  const context = useAppContext();
  const options = (): ChartOption => {
    const { error, warning, advice } = context.data.distribution.severity;
    const total = error + warning + advice;
    return {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        top: "0%",
        left: "center",
      },
      title: {
        text: total.toString(),
        subtext: "Total Issues",
        top: "center",
        left: "center",
        textStyle: {
          fontSize: 32,
          fontWeight: "bold",
        },
        subtextStyle: {
          fontSize: 14,
          fontStyle: "italic",
        },
      },
      series: [
        {
          name: "Severity Distribution",
          type: "pie",
          radius: ["55%", "80%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
          },
          itemStyle: {
            borderRadius: 6,
            borderColor: "#fff",
            borderWidth: 2,
          },
          color: [palette.status.error, palette.status.warning, palette.status.info],
          data: [
            { value: error, name: "Error" },
            { value: warning, name: "Warning" },
            { value: advice, name: "Advice" },
          ],
        },
      ],
    };
  };

  return <ChartBase options={options()} />;
};
