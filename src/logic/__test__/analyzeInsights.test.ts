import { it, describe, expect } from "vite-plus/test";
import { analyzeInsights } from "../analyzeInsights";
import { NormalizedReport } from "@/model/output";

const createMockReport = (overrides: Partial<NormalizedReport> = {}): NormalizedReport => ({
  summary: { totalIssues: 100, totalFiles: 10, filesWithIssues: 5, ...overrides.summary },
  distribution: {
    severity: { error: 30, warning: 40, advice: 30 },
    categories: { correctness: 50, style: 30 },
    generalToxicity: 0.5,
    ...overrides.distribution,
  },
  rules: {
    "rule-a": { name: "rule-a", count: 40, category: "correctness" },
    "rule-b": { name: "rule-b", count: 30, category: "style" },
    "rule-c": { name: "rule-c", count: 20, category: "suspicious" },
    "rule-d": { name: "rule-d", count: 5, category: "style" },
    "rule-e": { name: "rule-e", count: 3, category: "correctness" },
    "rule-f": { name: "rule-f", count: 2, category: "restriction" },
  },
  hotspots: {},
  ...overrides,
});

describe("analyzeInsights", () => {
  describe("Health Assessment", () => {
    it("should return healthy for low toxicity (0.10)", () => {
      const report = createMockReport({
        distribution: {
          generalToxicity: 0.1,
          categories: {},
          severity: { error: 0, warning: 0, advice: 0 },
        },
      });
      expect(analyzeInsights(report).health).toBe("Codebase is healthy");
    });

    it("should return healthy at boundary (0.33)", () => {
      const report = createMockReport({
        distribution: {
          generalToxicity: 0.33,
          categories: {},
          severity: { error: 0, warning: 0, advice: 0 },
        },
      });
      expect(analyzeInsights(report).health).toBe("Codebase is healthy");
    });

    it("should return moderate technical debt (0.40)", () => {
      const report = createMockReport({
        distribution: {
          generalToxicity: 0.4,
          categories: {},
          severity: { error: 0, warning: 0, advice: 0 },
        },
      });
      expect(analyzeInsights(report).health).toBe("Moderate technical debt");
    });

    it("should return moderate technical debt at boundary (0.50)", () => {
      const report = createMockReport({
        distribution: {
          generalToxicity: 0.5,
          categories: {},
          severity: { error: 0, warning: 0, advice: 0 },
        },
      });
      expect(analyzeInsights(report).health).toBe("Moderate technical debt");
    });

    it("should return significant issues (0.60)", () => {
      const report = createMockReport({
        distribution: {
          generalToxicity: 0.6,
          categories: {},
          severity: { error: 0, warning: 0, advice: 0 },
        },
      });
      expect(analyzeInsights(report).health).toBe("Significant issues");
    });

    it("should return significant issues at boundary (0.70)", () => {
      const report = createMockReport({
        distribution: {
          generalToxicity: 0.7,
          categories: {},
          severity: { error: 0, warning: 0, advice: 0 },
        },
      });
      expect(analyzeInsights(report).health).toBe("Significant issues");
    });

    it("should return critical state (0.85)", () => {
      const report = createMockReport({
        distribution: {
          generalToxicity: 0.85,
          categories: {},
          severity: { error: 0, warning: 0, advice: 0 },
        },
      });
      expect(analyzeInsights(report).health).toBe("Critical state - immediate refactoring needed");
    });
  });

  describe("Priority Detection", () => {
    it("should detect correctness as dominant", () => {
      const report = createMockReport({
        distribution: {
          categories: { correctness: 100, style: 50 },
          severity: { error: 0, warning: 0, advice: 0 },
          generalToxicity: 0.5,
        },
      });
      expect(analyzeInsights(report).priority).toBe("Codebase has mostly correctness issues");
    });

    it("should detect style as dominant", () => {
      const report = createMockReport({
        distribution: {
          categories: { style: 200, correctness: 10 },
          severity: { error: 0, warning: 0, advice: 0 },
          generalToxicity: 0.5,
        },
      });
      expect(analyzeInsights(report).priority).toBe("Codebase has mostly style issues");
    });

    it("should detect suspicious as dominant", () => {
      const report = createMockReport({
        distribution: {
          categories: { suspicious: 50, restriction: 30 },
          severity: { error: 0, warning: 0, advice: 0 },
          generalToxicity: 0.5,
        },
      });
      expect(analyzeInsights(report).priority).toBe("Codebase has mostly suspicious patterns");
    });

    it("should detect restriction as dominant", () => {
      const report = createMockReport({
        distribution: {
          categories: { restriction: 80, perf: 20 },
          severity: { error: 0, warning: 0, advice: 0 },
          generalToxicity: 0.5,
        },
      });
      expect(analyzeInsights(report).priority).toBe("Codebase has mostly restriction violations");
    });

    it("should detect perf as dominant", () => {
      const report = createMockReport({
        distribution: {
          categories: { perf: 100, style: 50 },
          severity: { error: 0, warning: 0, advice: 0 },
          generalToxicity: 0.5,
        },
      });
      expect(analyzeInsights(report).priority).toBe("Codebase has mostly performance issues");
    });

    it("should ignore pedantic category", () => {
      const report = createMockReport({
        distribution: {
          categories: { pedantic: 1000, style: 1 },
          severity: { error: 0, warning: 0, advice: 0 },
          generalToxicity: 0.5,
        },
      });
      expect(analyzeInsights(report).priority).toBe("Codebase has mostly style issues");
    });

    it("should ignore nursery category", () => {
      const report = createMockReport({
        distribution: {
          categories: { nursery: 1000, correctness: 1 },
          severity: { error: 0, warning: 0, advice: 0 },
          generalToxicity: 0.5,
        },
      });
      expect(analyzeInsights(report).priority).toBe("Codebase has mostly correctness issues");
    });

    it("should return Mixed Issues for empty categories", () => {
      const report = createMockReport({
        distribution: {
          categories: {},
          severity: { error: 0, warning: 0, advice: 0 },
          generalToxicity: 0.5,
        },
      });
      expect(analyzeInsights(report).priority).toBe("No actionable categories found");
    });

    it("should return Mixed Issues when only ignored categories exist", () => {
      const report = createMockReport({
        distribution: {
          categories: { pedantic: 100, nursery: 50 },
          severity: { error: 0, warning: 0, advice: 0 },
          generalToxicity: 0.5,
        },
      });
      expect(analyzeInsights(report).priority).toBe("No actionable categories found");
    });
  });

  describe("Impact Calculation", () => {
    it("should return high impact message for >70% concentration", () => {
      const report = createMockReport({
        summary: { totalIssues: 100, totalFiles: 10, filesWithIssues: 5 },
        rules: {
          "rule-a": { name: "rule-a", count: 40, category: "correctness" },
          "rule-b": { name: "rule-b", count: 25, category: "style" },
          "rule-c": { name: "rule-c", count: 20, category: "suspicious" },
          "rule-d": { name: "rule-d", count: 10, category: "style" },
          "rule-e": { name: "rule-e", count: 5, category: "correctness" },
        },
      });
      expect(analyzeInsights(report).impact).toBe(
        "Top 5 rules account for 100% of issues - concentrated fix potential",
      );
    });

    it("should return moderate concentration at exactly 70%", () => {
      const report = createMockReport({
        summary: { totalIssues: 100, totalFiles: 10, filesWithIssues: 5 },
        rules: {
          "rule-a": { name: "rule-a", count: 35, category: "correctness" },
          "rule-b": { name: "rule-b", count: 20, category: "style" },
          "rule-c": { name: "rule-c", count: 10, category: "suspicious" },
          "rule-d": { name: "rule-d", count: 3, category: "style" },
          "rule-e": { name: "rule-e", count: 2, category: "correctness" },
        },
      });
      expect(analyzeInsights(report).impact).toBe(
        "Top 5 rules account for 70% of issues - moderate concentration",
      );
    });

    it("should return moderate concentration for 40-70%", () => {
      const report = createMockReport({
        summary: { totalIssues: 100, totalFiles: 10, filesWithIssues: 5 },
        rules: {
          "rule-a": { name: "rule-a", count: 25, category: "correctness" },
          "rule-b": { name: "rule-b", count: 20, category: "style" },
          "rule-c": { name: "rule-c", count: 10, category: "suspicious" },
          "rule-d": { name: "rule-d", count: 3, category: "style" },
          "rule-e": { name: "rule-e", count: 2, category: "correctness" },
        },
      });
      expect(analyzeInsights(report).impact).toBe(
        "Top 5 rules account for 60% of issues - moderate concentration",
      );
    });

    it("should return moderate concentration at exactly 40%", () => {
      const report = createMockReport({
        summary: { totalIssues: 100, totalFiles: 10, filesWithIssues: 5 },
        rules: {
          "rule-a": { name: "rule-a", count: 20, category: "correctness" },
          "rule-b": { name: "rule-b", count: 10, category: "style" },
          "rule-c": { name: "rule-c", count: 5, category: "suspicious" },
          "rule-d": { name: "rule-d", count: 3, category: "style" },
          "rule-e": { name: "rule-e", count: 2, category: "correctness" },
        },
      });
      expect(analyzeInsights(report).impact).toBe(
        "Top 5 rules account for 40% of issues - moderate concentration",
      );
    });

    it("should return widespread distribution for <40%", () => {
      const report = createMockReport({
        summary: { totalIssues: 100, totalFiles: 10, filesWithIssues: 5 },
        rules: {
          "rule-a": { name: "rule-a", count: 10, category: "correctness" },
          "rule-b": { name: "rule-b", count: 8, category: "style" },
          "rule-c": { name: "rule-c", count: 5, category: "suspicious" },
          "rule-d": { name: "rule-d", count: 3, category: "style" },
          "rule-e": { name: "rule-e", count: 2, category: "correctness" },
        },
      });
      expect(analyzeInsights(report).impact).toBe(
        "Top 5 rules account for 29% of issues - widespread distribution",
      );
    });

    it("should round up percentage (73.1% -> 74%)", () => {
      const report = createMockReport({
        summary: { totalIssues: 104, totalFiles: 10, filesWithIssues: 5 },
        rules: {
          "rule-a": { name: "rule-a", count: 38, category: "correctness" },
          "rule-b": { name: "rule-b", count: 20, category: "style" },
          "rule-c": { name: "rule-c", count: 10, category: "suspicious" },
          "rule-d": { name: "rule-d", count: 5, category: "style" },
          "rule-e": { name: "rule-e", count: 3, category: "correctness" },
        },
      });
      expect(analyzeInsights(report).impact).toBe(
        "Top 5 rules account for 74% of issues - concentrated fix potential",
      );
    });

    it("should handle fewer than 5 rules", () => {
      const report = createMockReport({
        summary: { totalIssues: 100, totalFiles: 10, filesWithIssues: 5 },
        rules: {
          "rule-a": { name: "rule-a", count: 40, category: "correctness" },
          "rule-b": { name: "rule-b", count: 30, category: "style" },
          "rule-c": { name: "rule-c", count: 20, category: "suspicious" },
        },
      });
      expect(analyzeInsights(report).impact).toBe(
        "Top 5 rules account for 90% of issues - concentrated fix potential",
      );
    });
  });

  describe("Edge Cases", () => {
    it("should return wow message when no issues exist", () => {
      const report = createMockReport({
        summary: { totalIssues: 0, totalFiles: 10, filesWithIssues: 0 },
        rules: {},
      });
      expect(analyzeInsights(report).impact).toBe("Wow, everything is ok");
    });
  });

  describe("Integration", () => {
    it("should return correct insights for healthy codebase with low impact", () => {
      const report = createMockReport({
        distribution: {
          generalToxicity: 0.2,
          categories: { style: 100, correctness: 10 },
          severity: { error: 0, warning: 10, advice: 100 },
        },
        summary: { totalIssues: 110, totalFiles: 50, filesWithIssues: 10 },
        rules: {
          "rule-a": { name: "rule-a", count: 10, category: "style" },
          "rule-b": { name: "rule-b", count: 5, category: "style" },
          "rule-c": { name: "rule-c", count: 3, category: "style" },
          "rule-d": { name: "rule-d", count: 2, category: "correctness" },
          "rule-e": { name: "rule-e", count: 1, category: "style" },
        },
      });
      const insights = analyzeInsights(report);
      expect(insights.health).toBe("Codebase is healthy");
      expect(insights.priority).toBe("Codebase has mostly style issues");
      expect(insights.impact).toBe(
        "Top 5 rules account for 20% of issues - widespread distribution",
      );
    });

    it("should return correct insights for critical codebase with high impact", () => {
      const report = createMockReport({
        distribution: {
          generalToxicity: 0.85,
          categories: { correctness: 100, suspicious: 20 },
          severity: { error: 100, warning: 20, advice: 0 },
        },
        summary: { totalIssues: 120, totalFiles: 50, filesWithIssues: 30 },
        rules: {
          "rule-a": { name: "rule-a", count: 80, category: "correctness" },
          "rule-b": { name: "rule-b", count: 15, category: "correctness" },
          "rule-c": { name: "rule-c", count: 10, category: "suspicious" },
          "rule-d": { name: "rule-d", count: 8, category: "correctness" },
          "rule-e": { name: "rule-e", count: 5, category: "suspicious" },
        },
      });
      const insights = analyzeInsights(report);
      expect(insights.health).toBe("Critical state - immediate refactoring needed");
      expect(insights.priority).toBe("Codebase has mostly correctness issues");
      expect(insights.impact).toBe(
        "Top 5 rules account for 99% of issues - concentrated fix potential",
      );
    });
  });
});
