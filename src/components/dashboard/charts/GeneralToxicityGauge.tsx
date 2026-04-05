import { Component } from "solid-js";
import { ChartBase } from "./ChartBase";
import { ChartOption } from "@/logic/chartWrapper";
import { useAppContext } from "@/store/AppContext";
import { palette } from "@/utils/palette";

export const GeneralToxicityGauge: Component = () => {
  const context = useAppContext();

  const options = (): ChartOption => {
    const toxicity = context.data.distribution.generalToxicity;
    const color = () => {
      const pox = toxicity * 100;
      if (pox <= 33) return palette.status.success;
      if (pox <= 50) return palette.status.info;
      if (pox <= 70) return palette.status.warning;

      return palette.status.error;
    };
    return {
      series: [
        {
          type: "gauge",
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 100,
          radius: "100%",
          center: ["50%", "70%"],
          pointer: {
            show: true,
            itemStyle: {
              color: palette.grayscale.mid,
            },
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            width: 18,
            itemStyle: {
              color: color(),
            },
          },
          axisLine: {
            lineStyle: {
              width: 18,
              color: [[1, palette.base[200]]],
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
          },
          data: [
            {
              value: Number((toxicity * 100).toFixed(1)),
            },
          ],
          detail: {
            show: false,
          },
        },
      ],
    };
  };

  return <ChartBase options={options()} />;
};
