import { createMemo } from "solid-js";
import { isFeatureEnabled } from "@/config/features";
import { FeatureFlag } from "@/config/features.types";

/**
 * Returns a memoized boolean that can be used with Show component.
 */
export function useFeatureFlag(flag: FeatureFlag) {
  return createMemo(() => isFeatureEnabled(flag));
}
