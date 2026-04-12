import { SeverityLevel } from "@/model/severityConfig";
import { OxlintRawReport } from "../model/input";
import { FileMetrics, NormalizedReport, RuleMetric } from "../model/output";
import { inferCategory } from "./inferCategory";

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

const ALL_CATEGORIES = {
  correctness: 0,
  pedantic: 0,
  perf: 0,
  style: 0,
  suspicious: 0,
  restriction: 0,
  nursery: 0,
};

const SEVERITY_MULT: Record<SeverityLevel, number> = {
  error: 1,
  warning: 0.5,
  advice: 0.1,
  ignore: 0,
};

const InitializeValues = () => {
  const filesWithIssues = new Set<string>();
  const severityBase = { error: 0, warning: 0, advice: 0 };
  const categoriesBase: Record<string, number> = { ...ALL_CATEGORIES };
  const rulesBase: Record<string, RuleMetric> = {};
  const hotspotsBase: Record<string, FileMetrics> = {};

  return {
    filesWithIssues,
    severityBase,
    categoriesBase,
    rulesBase,
    hotspotsBase,
  };
};

/**
 * Normalizes oxlint raw report into structured analysis.
 * Aggregates by severity, category, rules, and files.
 * @param rawReport - Raw oxlint JSON output
 * @returns Normalized report with summary, distribution, rules, hotspots
 */
export function normalizer(rawReport: OxlintRawReport): NormalizedReport {
  // Initialize the normalized report structure
  const normalized: NormalizedReport = {
    summary: {
      totalIssues: rawReport.diagnostics.length,
      totalFiles: rawReport.number_of_files,
      filesWithIssues: 0,
    },
    distribution: {
      severity: {
        error: 0,
        warning: 0,
        advice: 0,
      },
      categories: {},
      generalToxicity: 0,
    },
    rules: {},
    hotspots: {},
  };

  // Initialize accumulators for aggregation
  const { filesWithIssues, severityBase, categoriesBase, rulesBase, hotspotsBase } =
    InitializeValues();

  // Iterate diagnostics, aggregating by severity, category, rules, and files
  for (const diag of rawReport.diagnostics) {
    const ruleName = diag.code;
    const category = inferCategory(diag.code);
    const severity = diag.severity;
    const filename = diag.filename;

    filesWithIssues.add(filename);

    severityBase[severity] += 1;
    categoriesBase[category] = (categoriesBase[category] || 0) + 1;

    // If there's no rulename on the object, initialize it
    if (!rulesBase[ruleName]) {
      rulesBase[ruleName] = {
        name: ruleName,
        count: 0,
        category,
      };
    }
    rulesBase[ruleName].count += 1;

    // If there's no filename in te hotspot, initialize it
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

    // Accumulate errors and warnings on the severity hotspot
    if (diag.severity === "error") {
      hotspotsBase[filename].errorCount += 1;
    } else if (diag.severity === "warning") {
      hotspotsBase[filename].warningCount += 1;
    }
  }

  // Finalize hotspots status and calculate total toxicity
  let sumCappedScore = 0;
  const hotspotsMetrics = Object.values(hotspotsBase);
  for (const metric of hotspotsMetrics) {
    const filename = metric.filename;
    const spot = hotspotsBase[filename];
    spot.status = calculateHealthStatus(spot.toxicityScore);
    sumCappedScore += Math.min(spot.toxicityScore, 100);
  }

  normalized.summary.filesWithIssues = filesWithIssues.size;
  normalized.distribution.severity = severityBase;
  normalized.distribution.categories = categoriesBase;

  normalized.distribution.generalToxicity = calculateGeneralToxicity(
    sumCappedScore,
    rawReport.number_of_files,
  );

  normalized.rules = rulesBase;
  normalized.hotspots = hotspotsBase;

  return normalized;
}

/**
 * Calculates health status from toxicity score.
 * @param score - Toxicity score value
 * @returns "healthy" | "warning" | "toxic" | "critical"
 */
function calculateHealthStatus(score: number): "healthy" | "warning" | "toxic" | "critical" {
  if (score < SCORES.healthy) return "healthy";
  if (score < SCORES.warning) return "warning";
  if (score < SCORES.toxic) return "toxic";
  return "critical";
}

function calculateGeneralToxicity(cappedScore: number, lines: number): number {
  if (lines > 0) return cappedScore / lines;
  return 0;
}

function calculateToxicityScore(weight = 1, multiplier = 0.1) {
  return weight * multiplier;
}
