import { CategoryType } from "./categories";

export type SeverityLevel = "error" | "warning" | "advice" | "ignore";
export type PresetType = "balanced" | "strict" | "performance" | "cleanCode";
export type PresetConfig = Record<PresetType, SeverityConfig>;

export interface SeverityConfig {
  preset: PresetType;
  overrides: Partial<Record<CategoryType, SeverityLevel>>;
}

export const PRESET_LABELS: Record<PresetType, string> = {
  cleanCode: "Clean Code (Recommended)",
  strict: "Strict (All Rules)",
  balanced: "Balanced (Reduced Noise)",
  performance: "Performance Focus",
};

export const SEVERITY_PRESETS: PresetConfig = {
  balanced: {
    preset: "balanced",
    overrides: {
      style: "advice",
      pedantic: "ignore",
      restriction: "error",
    },
  },
  strict: {
    preset: "strict",
    overrides: {},
  },
  performance: {
    preset: "performance",
    overrides: {
      style: "ignore",
      pedantic: "ignore",
      restriction: "ignore",
      suspicious: "ignore",
    },
  },
  cleanCode: {
    preset: "cleanCode",
    overrides: {
      pedantic: "ignore",
      style: "warning",
      suspicious: "warning",
    },
  },
};
