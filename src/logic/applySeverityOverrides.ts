import { OxlintDiagnostic } from "@/model/input";
import { SeverityConfig, SEVERITY_PRESETS } from "@/model/severityConfig";
import { inferCategory } from "./inferCategory";

export function applySeverityOverrides(
  diagnostics: OxlintDiagnostic[],
  config: SeverityConfig,
): OxlintDiagnostic[] {
  const presetOverrides = SEVERITY_PRESETS[config.preset].overrides;
  const effectiveOverrides = { ...presetOverrides, ...config.overrides };

  const result = [];
  for (const diag of diagnostics) {
    const category = inferCategory(diag.code);
    const override = effectiveOverrides[category as keyof typeof effectiveOverrides];

    if (override === "ignore") continue;

    if (override) {
      result.push({ ...diag, severity: override });
    } else {
      result.push(diag);
    }
  }
  return result;
}
