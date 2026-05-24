import { NormalizedReport } from "@/model/output";

export const createMockReport = (overrides: Partial<NormalizedReport> = {}): NormalizedReport => ({
  summary: { totalIssues: 100, totalFiles: 10, filesWithIssues: 5, ...overrides.summary },
  distribution: {
    severity: { error: 30, warning: 40, advice: 30, ...overrides.distribution?.severity },
    categories: { correctness: 50, style: 30, ...overrides.distribution?.categories },
    ...overrides.distribution,
  },
  rules: {
    "eslint(capitalized-comments)": {
      name: "eslint(capitalized-comments)",
      count: 1,
      category: "style",
    },
    "eslint(sort-keys)": { name: "eslint(sort-keys)", count: 6, category: "style" },
    "eslint(no-unused-vars)": { name: "eslint(no-unused-vars)", count: 5, category: "correctness" },
    "eslint-plugin-unicorn(filename-case)": {
      name: "eslint-plugin-unicorn(filename-case)",
      count: 3,
      category: "style",
    },
    "eslint(max-lines)": { name: "eslint(max-lines)", count: 2, category: "perf" },
    "typescript-eslint(array-type)": {
      name: "typescript-eslint(array-type)",
      count: 2,
      category: "correctness",
    },
    ...overrides.rules,
  },
  hotspots: {
    "src/components/paymentHistory/styles.ts": {
      filename: "src/components/paymentHistory/styles.ts",
      issueCount: 3,
      errorCount: 3,
      warningCount: 0,
      categories: { style: 3 },
    },
    "src/components/paymentHistory/dialogs/ExportDialog.test.tsx": {
      filename: "src/components/paymentHistory/dialogs/ExportDialog.test.tsx",
      issueCount: 4,
      errorCount: 4,
      warningCount: 0,
      categories: { correctness: 4 },
    },
    "src/theme/light/create-blurs.js": {
      filename: "src/theme/light/create-blurs.js",
      issueCount: 1,
      errorCount: 1,
      warningCount: 0,
      categories: { correctness: 1 },
    },
    ...overrides.hotspots,
  },
  ...overrides,
});
