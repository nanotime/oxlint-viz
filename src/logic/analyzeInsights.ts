import { NormalizedReport, RuleMetric } from "@/model/output";

const IMPACT_CONCENTRATED_THRESHOLD = 70;
const IMPACT_MODERATE_THRESHOLD = 40;

const CATEGORY_MESSAGES: Record<string, string> = {
  correctness: "Codebase has mostly correctness issues",
  suspicious: "Codebase has mostly suspicious patterns",
  restriction: "Codebase has mostly restriction violations",
  perf: "Codebase has mostly performance issues",
  style: "Codebase has mostly style issues",
};

const calculatePriority = (categories: Record<string, number>): string => {
  const cats = Object.entries(categories).filter(
    ([cat]) => cat !== "pedantic" && cat !== "nursery",
  );
  const sorted = cats.toSorted(([, a], [, b]) => b - a);
  const dominant = sorted[0]?.[0];

  if (!dominant) return "No actionable categories found";
  return CATEGORY_MESSAGES[dominant] ?? `Predominantly ${dominant} issues`;
};

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
  priority: string;
  impact: string;
}

export const analyzeInsights = (report: NormalizedReport): Insight => ({
  priority: calculatePriority(report.distribution.categories),
  impact: calculateRuleConcentration(report.rules, report.summary.totalIssues),
});
