import { FeatureFlag, FeatureConfig } from "./features.types";

/**
 * Master feature flags registry.
 *
 * RULE: Any flag used in code must be registered here.
 * RULE: Any flag here must be documented in FEATURE_FLAGS.md
 */
const FEATURE_REGISTRY: Record<FeatureFlag, FeatureConfig> = {
  complexity: {
    name: "complexity",
    description: "Cyclomatic complexity visualization in dashboard",
    defaultValue: true,
    status: "beta",
  },
  heatmap: {
    name: "heatmap",
    description: "Files vs categories heatmap",
    defaultValue: true,
    status: "stable",
  },
};

/**
 * Gets the effective value of a feature flag.
 *
 * Precedence:
 * 1. Environment variable VITE_FEATURE_<NAME>
 * 2. Registry default value
 *
 * @example
 * .env.local
 * VITE_FEATURE_COMPLEXITY=true
 *
 * In code
 * isFeatureEnabled('complexity') // true
 */
export function isFeatureEnabled(flag: FeatureFlag): boolean {
  const config = FEATURE_REGISTRY[flag];

  if (!config) {
    console.warn(
      `[FeatureFlag] "${flag}" is not registered. Add it to features.ts and FEATURE_FLAGS.md`,
    );
    return false;
  }

  const envVar = `VITE_FEATURE_${flag.toUpperCase()}`;
  const envValue = import.meta.env[envVar];

  // Use env value if exists, otherwise use default
  if (envValue !== undefined) {
    return envValue === "true" || envValue === true;
  }

  return config.defaultValue;
}

export function getFeatureConfig(flag: FeatureFlag): FeatureConfig | undefined {
  return FEATURE_REGISTRY[flag];
}

export function getAllFeatures(): FeatureConfig[] {
  return Object.values(FEATURE_REGISTRY);
}

export function isValidFeatureFlag(value: string): value is FeatureFlag {
  return value in FEATURE_REGISTRY;
}
