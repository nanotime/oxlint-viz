import { Component } from "solid-js";
import { useAppContext } from "@/store/AppContext";
import { ChartBase } from "./ChartBase";
import { ChartOption } from "@/logic/chartWrapper";
import { HealthStatus } from "@/model/output";
import { palette } from "@/utils/palette";

export const TreeByToxicity: Component = () => {
  const context = useAppContext();

  const options = (): ChartOption => {
    const hotspots = context.data.hotspots;

    const getHealthColor = (health: HealthStatus) => {
      switch (health) {
        case "healthy":
          return palette.grayscale.light;
        case "warning":
          return palette.grayscale.mid;
        case "toxic":
          return palette.grayscale.dark;
        default:
          return palette.status.error;
      }
    };

    // Transform hotspots into Treemap data
    const hotSpotsData = Object.entries(hotspots).map(([path, data]) => ({
      name: path.split("/").pop() || path,
      value: data.toxicityScore,
      fullPath: path,
      issueCount: data.issueCount,
      errorCount: data.errorCount,
      warningCount: data.warningCount,
      itemStyle: {
        color: getHealthColor(data.status),
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
        // Custom HTML formatter for a detailed "Technical Debt" card
        formatter: (info: any) => {
          const { fullPath, value, issueCount, errorCount, warningCount } = info.data;
          return `
            <div style="font-family: inherit; min-width: 200px; line-height: 1.5;">
              <div style="font-weight: bold; border-bottom: 1px solid #eee; margin-bottom: 8px; padding-bottom: 4px; color: #000; word-break: break-all;">
                ${fullPath}
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Toxicity Score:</span>
                <span style="font-weight: bold; margin-left: 20px;">${value}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Total Issues:</span>
                <span style="font-weight: bold; margin-left: 20px;">${issueCount}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Total Errors:</span>
                <span style="font-weight: bold; margin-left: 20px;">${errorCount}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Total Warnings:</span>
                <span style="font-weight: bold; margin-left: 20px;">${warningCount}</span>
              </div>
            </div>
          `;
        },
      },
      series: [
        {
          name: "Files by Toxicity",
          type: "treemap",
          data: hotSpotsData,
          // UI Cleanup: Keep it as a static, readable dashboard element
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
          // Ensures the text is always legible against the block background
          upperLabel: {
            show: false,
          },
        },
      ],
    };
  };

  return <ChartBase options={options()} />;
};
