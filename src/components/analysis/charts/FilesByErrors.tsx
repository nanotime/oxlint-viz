import { Component } from "solid-js";
import { useAppContext } from "@/store/AppContext";
import { ChartBase } from "./ChartBase";
import { ChartOption } from "@/logic/chartWrapper";
import { palette } from "@/utils/palette";
import { NormalizedReport } from "@/model/output";

export const getErrorColor = (errorCount: number) => {
  if (errorCount === 0) return palette.grayscale.light;
  if (errorCount <= 5) return palette.grayscale.mid;
  if (errorCount <= 15) return palette.grayscale.dark;
  return palette.status.error;
};

export interface FilesByErrorsData {
  name: string;
  value: number;
  fullPath: string;
  issueCount: number;
  errorCount: number;
  warningCount: number;
  complexityCount: number;
  itemStyle: { color: string };
}

export const buildFilesByErrorsOptions = (data: NormalizedReport): ChartOption => {
  const hotspots = data.hotspots;

  const hotSpotsData: FilesByErrorsData[] = Object.entries(hotspots).map(([path, hsData]) => ({
    name: path.split("/").pop() || path,
    value: hsData.errorCount,
    fullPath: path,
    issueCount: hsData.issueCount,
    errorCount: hsData.errorCount,
    warningCount: hsData.warningCount,
    complexityCount: Object.keys(hsData.complexity ?? {}).length,
    itemStyle: {
      color: getErrorColor(hsData.errorCount),
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
        const { fullPath, value, issueCount, warningCount, complexityCount } = info.data;
        return `
          <div style="font-family: inherit; min-width: 200px; line-height: 1.5;">
            <div style="font-weight: bold; border-bottom: 1px solid #eee; margin-bottom: 8px; padding-bottom: 4px; color: #000; word-break: break-all;">
              ${fullPath}
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Total Issues:</span>
              <span style="font-weight: bold; margin-left: 20px;">${issueCount}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Error Count:</span>
              <span style="font-weight: bold; margin-left: 20px;">${value}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Warnings:</span>
              <span style="font-weight: bold; margin-left: 20px;">${warningCount}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Complexity findings:</span>
              <span style="font-weight: bold; margin-left: 20px;">${complexityCount}</span>
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

export const FilesByErrors: Component = () => {
  const context = useAppContext();

  return <ChartBase options={buildFilesByErrorsOptions(context.data)} />;
};
