import { SeverityConfig } from "@/model/severityConfig";
import { OxlintRawReport } from "../model/input";
import { FileMetrics, NormalizedReport, RuleMetric } from "../model/output";
import { inferCategory } from "./inferCategory";
import { applySeverityOverrides } from "./applySeverityOverrides";

const ALL_CATEGORIES = {
  correctness: 0,
  pedantic: 0,
  perf: 0,
  style: 0,
  suspicious: 0,
  restriction: 0,
  nursery: 0,
};

/**
 * Transforms oxlint raw report into structured analysis.
 * @param rawReport - Raw oxlint JSON output
 * @returns Normalized report with summary, distribution, rules, hotspots
 */
export function normalizer(rawReport: OxlintRawReport, config: SeverityConfig): NormalizedReport {
  const overridenDiagnostic = applySeverityOverrides(rawReport.diagnostics, config);
  const { severityBase, categoriesBase, rulesBase, hotspotsBase } =
    accumulateMetrics(overridenDiagnostic);

  return buildNormalizedReport({
    totalIssues: rawReport.diagnostics.length,
    totalFiles: rawReport.number_of_files,
    severityBase,
    categoriesBase,
    rulesBase,
    hotspotsBase,
  });
}

/**
 * Aggregates diagnostics into severity, category, rule, and file metrics.
 * @param diagnostics - Array of oxlint diagnostics
 * @returns Object with accumulated metrics
 */
function accumulateMetrics(diagnostics: OxlintRawReport["diagnostics"]) {
  const severityBase = { error: 0, warning: 0, advice: 0 };
  const categoriesBase = { ...ALL_CATEGORIES };
  const rulesBase: Record<string, RuleMetric> = {};
  const hotspotsBase: Record<string, FileMetrics> = {};

  for (const diag of diagnostics) {
    const ruleName = diag.code;
    const category = inferCategory(diag.code);
    const severity = diag.severity;
    const filename = diag.filename;

    severityBase[severity] += 1;
    categoriesBase[category] += 1;

    if (!rulesBase[ruleName]) {
      rulesBase[ruleName] = {
        name: ruleName,
        count: 0,
        category,
      };
    }
    rulesBase[ruleName].count += 1;

    if (!hotspotsBase[filename]) {
      hotspotsBase[filename] = {
        filename,
        issueCount: 0,
        errorCount: 0,
        warningCount: 0,
        categories: { ...ALL_CATEGORIES },
      };
    }

    hotspotsBase[filename].categories[category] += 1;
    hotspotsBase[filename].issueCount += 1;

    if (severity === "error") {
      hotspotsBase[filename].errorCount += 1;
    } else if (severity === "warning") {
      hotspotsBase[filename].warningCount += 1;
    }
  }

  return { severityBase, categoriesBase, rulesBase, hotspotsBase };
}

interface BuildNormalizedReportParams {
  totalIssues: number;
  totalFiles: number;
  severityBase: { error: number; warning: number; advice: number };
  categoriesBase: Record<string, number>;
  rulesBase: Record<string, RuleMetric>;
  hotspotsBase: Record<string, FileMetrics>;
}

/**
 * Constructs final NormalizedReport from accumulated metrics.
 * @param params - Aggregated data and totals
 * @returns Complete normalized report
 */
function buildNormalizedReport(params: BuildNormalizedReportParams): NormalizedReport {
  return {
    summary: {
      totalIssues: params.totalIssues,
      totalFiles: params.totalFiles,
      filesWithIssues: Object.keys(params.hotspotsBase).length,
    },
    distribution: {
      severity: params.severityBase,
      categories: params.categoriesBase,
    },
    rules: params.rulesBase,
    hotspots: params.hotspotsBase,
  };
}
