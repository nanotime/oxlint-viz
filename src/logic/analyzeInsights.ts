import { NormalizedReport, RuleMetric } from "@/model/output";

const TOX_HEALTHY_MAX = 0.33;
const TOX_MODERATE_MAX = 0.5;
const TOX_SIGNIFICANT_MAX = 0.7;

const IMPACT_CONCENTRATED_THRESHOLD = 70;
const IMPACT_MODERATE_THRESHOLD = 40;

/** Human-readable messages mapped to category names. */
const CATEGORY_MESSAGES: Record<string, string> = {
  correctness: "Codebase has mostly correctness issues",
  suspicious: "Codebase has mostly suspicious patterns",
  restriction: "Codebase has mostly restriction violations",
  perf: "Codebase has mostly performance issues",
  style: "Codebase has mostly style issues",
};

/**
 * Converts toxicity score to health assessment message.
 * @param tox - Toxicity score (0-1 scale)
 * @returns Message: "Codebase is healthy" | "Moderate technical debt" | "Significant issues" | "Critical state..." | "Unable to assess health"
 */
const analyzeHealthFromToxicity = (tox: number): string => {
  if (!Number.isFinite(tox) || tox < 0) return "Unable to assess health";
  if (tox <= TOX_HEALTHY_MAX) return "Codebase is healthy";
  if (tox <= TOX_MODERATE_MAX) return "Moderate technical debt";
  if (tox <= TOX_SIGNIFICANT_MAX) return "Significant issues";
  return "Critical state - immediate refactoring needed";
};

/**
 * Finds dominant category (excluding pedantic/nursery) and returns priority message.
 * @param categories - Record mapping category names to violation counts
 * @returns Message describing the dominant category or fallback if none found
 */
const calculatePriority = (categories: Record<string, number>): string => {
  const cats = Object.entries(categories).filter(
    ([cat]) => cat !== "pedantic" && cat !== "nursery",
  );
  const sorted = cats.toSorted(([, a], [, b]) => b - a);
  const dominant = sorted[0]?.[0];

  if (!dominant) return "No actionable categories found";
  return CATEGORY_MESSAGES[dominant] ?? `Predominantly ${dominant} issues`;
};

/**
 * Calculates how concentrated issues are in the top 5 rules.
 * @param rules - Record of rule metrics
 * @param totalIssues - Total issue count from report
 * @returns Impact message with rounded percentage and concentration level
 */
const calculateRuleConcentration = (
  rules: Record<string, RuleMetric>,
  totalIssues: number,
): string => {
  if (totalIssues === 0) return "Wow, everything is ok";

  const top5BrokenRules = Object.values(rules)
    .toSorted((a, b) => b.count - a.count)
    .slice(0, 5);
  const top5Sum = top5BrokenRules.reduce((acc, rule) => acc + rule.count, 0);
  const impact = (top5Sum / totalIssues) * 100;

  if (impact > IMPACT_CONCENTRATED_THRESHOLD)
    return `Top 5 rules account for ${Math.ceil(impact)}% of issues - concentrated fix potential`;
  if (impact >= IMPACT_MODERATE_THRESHOLD)
    return `Top 5 rules account for ${Math.ceil(impact)}% of issues - moderate concentration`;

  return `Top 5 rules account for ${Math.ceil(impact)}% of issues - widespread distribution`;
};

export interface Insight {
  health: string;
  priority: string;
  impact: string;
}

/**
 * Generates three insight messages from a normalized oxlint report.
 * @param report - NormalizedReport with summary, distribution, rules
 * @returns Insight object with health, priority, and impact messages
 * @example
 * const report = normalizer(rawJson);
 * const insights = analyzeInsights(report);
 * { health: "Codebase is healthy", priority: "Codebase has mostly style issues", impact: "Top 5 rules account for 60%..." }
 */
export const analyzeInsights = (report: NormalizedReport): Insight => ({
  health: analyzeHealthFromToxicity(report.distribution.generalToxicity),
  priority: calculatePriority(report.distribution.categories),
  impact: calculateRuleConcentration(report.rules, report.summary.totalIssues),
});
