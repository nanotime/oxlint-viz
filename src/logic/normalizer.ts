import { OxlintRawReport } from "../model/input";
import { FileMetrics, NormalizedReport, RuleMetric } from "../model/output";

export const RULE_NAMESPACE_MAP: Record<string, string> = {
  eslint: "correctness",
  "typescript-eslint": "correctness",
  "eslint-plugin-unicorn": "style",
  "eslint-plugin-import": "pedantic",
  "eslint-plugin-jsx-a11y": "suspicious",
  oxc: "perf",
  "eslint-plugin-react": "correctness",
};

export const RULE_OVERRIDES: Record<string, string> = {
  "eslint(no-var)": "pedantic",
  "eslint(eqeqeq)": "suspicious",
  "eslint(no-debugger)": "correctness",
  "eslint(no-console)": "suspicious",
  "eslint(max-lines)": "perf",
  "eslint(max-lines-per-function)": "perf",
  "eslint-plugin-unicorn(no-null)": "style",
  "eslint(sort-keys)": "style",
  "eslint(sort-imports)": "style",
  "eslint(capitalized-comments)": "style",
};

const WEIGHTS: Record<string, number> = {
  correctness: 10,
  suspicious: 7,
  perf: 5,
  pedantic: 3,
  style: 1,
  nursery: 2,
};

const SEVERITY_MULT = { error: 1, warning: 0.5, advice: 0.1 };

export function inferCategory(code: string): string {
  // Overrides takes priority
  if (RULE_OVERRIDES[code]) return RULE_OVERRIDES[code];

  // everything before the first (
  const match = code.match(/^([^(]+)/);

  if (!match) return "correctness"; // Default de seguridad
  const namespace = match[1];
  return RULE_NAMESPACE_MAP[namespace] || "correctness";
}

function calculateHealthStatus(score: number): "healthy" | "warning" | "toxic" | "critical" {
  if (score < 10) return "healthy";
  if (score < 50) return "warning";
  if (score < 150) return "toxic";
  return "critical";
}

const calculateGeneralToxicity = (cappedScore: number, lines: number): number => {
  if (lines > 0) return cappedScore / lines;
  return 0;
};

export function normalizer(rawReport: OxlintRawReport): NormalizedReport {
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

  const filesWithIssues = new Set<string>();
  const severityBase = { error: 0, warning: 0, advice: 0 };
  const categoriesBase: Record<string, number> = {
    correctness: 0,
    style: 0,
    pedantic: 0,
    suspicious: 0,
    perf: 0,
  };
  const rulesBase: Record<string, RuleMetric> = {};
  const hotspotsBase: Record<string, FileMetrics> = {};

  for (const diag of rawReport.diagnostics) {
    const ruleName = diag.code;
    const category = inferCategory(diag.code);
    const severity = diag.severity;
    const filename = diag.filename;

    filesWithIssues.add(filename);

    severityBase[diag.severity] += 1;
    categoriesBase[category] = (categoriesBase[category] || 0) + 1;

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
        mainSmell: "",
        status: "healthy",
      };
    }

    hotspotsBase[filename].toxicityScore +=
      (WEIGHTS[category] || 1) * (SEVERITY_MULT[severity] || 0.1);

    hotspotsBase[filename].issueCount += 1;

    if (diag.severity === "error") {
      hotspotsBase[filename].errorCount += 1;
    } else if (diag.severity === "warning") {
      hotspotsBase[filename].warningCount += 1;
    }
  }

  // Finalize hotspots status and calculate total toxicity
  let sumCappedScore = 0;
  for (const filename in hotspotsBase) {
    const h = hotspotsBase[filename];
    h.status = calculateHealthStatus(h.toxicityScore);
    sumCappedScore += Math.min(h.toxicityScore, 100);
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
