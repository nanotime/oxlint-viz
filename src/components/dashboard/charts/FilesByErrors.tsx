import { Component } from "solid-js";
import { useAppContext } from "@/store/AppContext";
import { ChartBase } from "./ChartBase";
import { ChartOption } from "@/logic/chartWrapper";
import { palette } from "@/utils/palette";

export const FilesByErrors: Component = () => {
  const context = useAppContext();

  const options = (): ChartOption => {
    const hotspots = context.data.hotspots;

    const getErrorColor = (errorCount: number) => {
      if (errorCount === 0) return palette.grayscale.light;
      if (errorCount <= 5) return palette.grayscale.mid;
      if (errorCount <= 15) return palette.grayscale.dark;
      return palette.status.error;
    };

    const hotSpotsData = Object.entries(hotspots).map(([path, data]) => ({
      name: path.split("/").pop() || path,
      value: data.errorCount,
      fullPath: path,
      issueCount: data.issueCount,
      errorCount: data.errorCount,
      warningCount: data.warningCount,
      itemStyle: {
        color: getErrorColor(data.errorCount),
      },
    }));

    return {
      tooltip: {
        trigger: "item",
        padding: 10,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "#ccc",
        borderWidth: 1,
        textStyle: {
          color: "#333",
        },
        formatter: (info: any) => {
          const { fullPath, value, issueCount, warningCount } = info.data;
          return `
            <div style="font-family: inherit; min-width: 200px; line-height: 1.5;">
              <div style="font-weight: bold; border-bottom: 1px solid #eee; margin-bottom: 8px; padding-bottom: 4px; color: #000; word-break: break-all;">
                ${fullPath}
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Error Count:</span>
                <span style="font-weight: bold; margin-left: 20px;">${value}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Total Issues:</span>
                <span style="font-weight: bold; margin-left: 20px;">${issueCount}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Warnings:</span>
                <span style="font-weight: bold; margin-left: 20px;">${warningCount}</span>
              </div>
            </div>
          `;
        },
      },
      series: [
        {
          name: "Files by Errors",
          type: "treemap",
          data: hotSpotsData,
          roam: false,
          nodeClick: false,
          breadcrumb: {
            show: false,
          },
          itemStyle: {
            gapWidth: 2,
            borderRadius: 4,
          },
          label: {
            show: true,
            formatter: "{b}",
            fontSize: 12,
            overflow: "truncate",
          },
          upperLabel: {
            show: false,
          },
        },
      ],
    };
  };

  return <ChartBase options={options()} />;
};
