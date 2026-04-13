import { SeverityLevel } from "@/model/severityConfig";
import { OxlintRawReport } from "../model/input";
import { FileMetrics, NormalizedReport, RuleMetric } from "../model/output";
import { inferCategory } from "./inferCategory";

const MAX_FILE_TOXICITY = 100;

const ALL_CATEGORIES = {
  correctness: 0,
  pedantic: 0,
  perf: 0,
  style: 0,
  suspicious: 0,
  restriction: 0,
  nursery: 0,
};

const WEIGHTS: Record<string, number> = {
  correctness: 10,
  restriction: 8,
  suspicious: 7,
  perf: 5,
  pedantic: 3,
  style: 1,
  nursery: 2,
};

const SCORES = {
  healthy: 10,
  warning: 50,
  toxic: 150,
};

const SEVERITY_MULT: Record<SeverityLevel, number> = {
  error: 1,
  warning: 0.5,
  advice: 0.1,
  ignore: 0,
};

/**
 * Transforms oxlint raw report into structured analysis.
 * @param rawReport - Raw oxlint JSON output
 * @returns Normalized report with summary, distribution, rules, hotspots
 */
export function normalizer(rawReport: OxlintRawReport): NormalizedReport {
  const { severityBase, categoriesBase, rulesBase, hotspotsBase } = accumulateMetrics(
    rawReport.diagnostics,
  );

  const hotspotsWithStatus = addHealthStatus(hotspotsBase);

  return buildNormalizedReport({
    totalIssues: rawReport.diagnostics.length,
    totalFiles: rawReport.number_of_files,
    severityBase,
    categoriesBase,
    rulesBase,
    hotspotsWithStatus,
  });
}

/**
 * Derives health status from toxicity score.
 * @param score - Toxicity score value
 * @returns Health status: healthy | warning | toxic | critical
 */
function calculateHealthStatus(score: number): "healthy" | "warning" | "toxic" | "critical" {
  if (score < SCORES.healthy) return "healthy";
  if (score < SCORES.warning) return "warning";
  if (score < SCORES.toxic) return "toxic";
  return "critical";
}

/**
 * Calculates overall codebase toxicity.
 * @param cappedScore - Sum of capped file scores
 * @param totalFiles - Total number of files analyzed
 * @returns Toxicity metric (0-100 scale approximation)
 */
function calculateGeneralToxicity(cappedScore: number, totalFiles: number): number {
  if (totalFiles > 0) return cappedScore / totalFiles;
  return 0;
}

/**
 * Computes weighted toxicity for a diagnostic.
 * @param weight - Category weight (default 1)
 * @param multiplier - Severity multiplier (default 0.1)
 * @returns Weighted toxicity score
 */
function calculateToxicityScore(weight = 1, multiplier = 0.1) {
  return weight * multiplier;
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
        toxicityScore: 0,
        status: "healthy",
        categories: { ...ALL_CATEGORIES },
      };
    }

    hotspotsBase[filename].toxicityScore += calculateToxicityScore(
      WEIGHTS[category],
      SEVERITY_MULT[severity],
    );
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

/**
 * Adds health status to each hotspot based on toxicity score.
 * @param hotspots - Map of filename to FileMetrics
 * @returns New map with status field populated
 */
function addHealthStatus(hotspots: Record<string, FileMetrics>): Record<string, FileMetrics> {
  return Object.values(hotspots).reduce(
    (acc, spot) => {
      acc[spot.filename] = {
        ...spot,
        status: calculateHealthStatus(spot.toxicityScore),
      };
      return acc;
    },
    {} as Record<string, FileMetrics>,
  );
}

interface BuildNormalizedReportParams {
  totalIssues: number;
  totalFiles: number;
  severityBase: { error: number; warning: number; advice: number };
  categoriesBase: Record<string, number>;
  rulesBase: Record<string, RuleMetric>;
  hotspotsWithStatus: Record<string, FileMetrics>;
}

/**
 * Constructs final NormalizedReport from accumulated metrics.
 * @param params - Aggregated data and totals
 * @returns Complete normalized report
 */
function buildNormalizedReport(params: BuildNormalizedReportParams): NormalizedReport {
  const sumCappedScore = Object.values(params.hotspotsWithStatus).reduce(
    (sum, spot) => sum + Math.min(spot.toxicityScore, MAX_FILE_TOXICITY),
    0,
  );

  return {
    summary: {
      totalIssues: params.totalIssues,
      totalFiles: params.totalFiles,
      filesWithIssues: Object.keys(params.hotspotsWithStatus).length,
    },
    distribution: {
      severity: params.severityBase,
      categories: params.categoriesBase,
      generalToxicity: calculateGeneralToxicity(sumCappedScore, params.totalFiles),
    },
    rules: params.rulesBase,
    hotspots: params.hotspotsWithStatus,
  };
}
