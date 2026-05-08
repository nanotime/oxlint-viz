/**
 * Available feature flags in the application.
 * Each flag must be documented in src/model/FEATURE_FLAGS.md
 */
export type FeatureFlag = "complexity" | "heatmap";

export interface FeatureConfig {
  name: FeatureFlag;
  description: string;
  defaultValue: boolean;
  status: "stable" | "beta" | "experimental" | "deprecated";
}

export type FeatureMap = Record<FeatureFlag, boolean>;
