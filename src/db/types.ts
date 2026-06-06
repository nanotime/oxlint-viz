import type { NormalizedReport } from "@/model/output";
import type { PresetType } from "@/model/severityConfig";

export interface SavedAnalysis {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  rawReport: string;
  normalizedData: NormalizedReport;
  preset: PresetType;
}

export interface SaveAnalysisInput {
  name: string;
  rawReport: string;
  normalizedData: NormalizedReport;
  preset: PresetType;
}
