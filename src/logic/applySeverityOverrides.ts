import { OxlintDiagnostic } from "@/model/input";
import { SeverityConfig } from "@/model/severityConfig";
import { inferCategory } from "./inferCategory";

export function applySeverityOverrides(
  diagnostics: OxlintDiagnostic[],
  config: SeverityConfig,
): OxlintDiagnostic[] {
  const result = [];
  for (const diag of diagnostics) {
    const category = inferCategory(diag.code);
    const override = config.overrides[category as keyof typeof config.overrides];

    if (override === "ignore") continue;

    if (override) {
      result.push({ ...diag, severity: override });
    } else {
      result.push(diag);
    }
  }
  return result;
}
