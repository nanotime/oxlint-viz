import { it, describe, expect } from "vite-plus/test";
import { inferCategory, normalizer } from "./normalizer";
import { OxlintRawReport } from "../model/input";
import data from "../mocks/oxlint-excerpt.json";

describe("inferCategory", () => {
  it("should infer the correct category for a given rule code based on namespace", () => {
    expect(inferCategory("eslint(no-unused-vars)")).toBe("correctness");

    expect(inferCategory("eslint-plugin-unicorn(filename-case)")).toBe("style");

    expect(inferCategory("eslint-plugin-import(no-self-import)")).toBe("pedantic");

    expect(inferCategory("oxc(no-map-spread)")).toBe("perf");

    expect(inferCategory("eslint-plugin-react(jsx-no-undef)")).toBe("correctness");
  });

  it("should parse rules overrides correctly", () => {
    expect(inferCategory("eslint(no-var)")).toBe("pedantic");
    expect(inferCategory("eslint(eqeqeq)")).toBe("suspicious");
    expect(inferCategory("eslint(no-debugger)")).toBe("correctness");
    expect(inferCategory("eslint(no-console)")).toBe("suspicious");
    expect(inferCategory("eslint(max-lines)")).toBe("perf");
    expect(inferCategory("eslint-plugin-unicorn(no-null)")).toBe("style");
  });

  it("should return correctness as fallback for unknown namespaces", () => {
    expect(inferCategory("unknown-plugin(some-rule)")).toBe("correctness");
  });
});

describe("Normalizer", () => {
  describe("Normalize summary", () => {
    it("should calculate total issues correctly", () => {
      const report = data as OxlintRawReport;
      const normalized = normalizer(report);
      expect(normalized.summary.totalIssues).toBe(20);
    });

    it("should calculate total files correctly", () => {
      const report = data as OxlintRawReport;
      const normalized = normalizer(report);
      expect(normalized.summary.totalFiles).toBe(156);
    });

    it("should calculate files with issues correctly", () => {
      const report = data as OxlintRawReport;
      const normalized = normalizer(report);
      expect(normalized.summary.filesWithIssues).toBe(
        new Set(report.diagnostics.map((d) => d.filename)).size,
      );
    });
  });

  describe("Normalize distribution", () => {
    it("should count severity distribution correctly", () => {
      const report = data as OxlintRawReport;
      const normalized = normalizer(report);
      expect(normalized.distribution.severity.error).toBe(20);
      expect(normalized.distribution.severity.warning).toBe(0);
      expect(normalized.distribution.severity.advice).toBe(0);
    });

    it("should count category distribution correctly", () => {
      const report = data as OxlintRawReport;
      const normalized = normalizer(report);
      // capitalized-comments and sort-keys are style (2 diagnostics in excerpt)
      expect(normalized.distribution.categories.correctness).toBe(3);
      expect(normalized.distribution.categories.style).toBe(17);
    });
  });

  describe("Normalize rules", () => {
    it("should aggregate rules correctly", () => {
      const report = data as OxlintRawReport;
      const normalized = normalizer(report);

      expect(normalized.rules["eslint(capitalized-comments)"]).toEqual({
        name: "eslint(capitalized-comments)",
        count: 10,
        category: "style",
      });

      expect(normalized.rules["eslint(sort-keys)"]).toEqual({
        name: "eslint(sort-keys)",
        count: 3,
        category: "style",
      });
    });
  });

  describe("Normalize hotspots", () => {
    it("should calculate file metrics correctly for specific hotspots", () => {
      const report = data as OxlintRawReport;
      const normalized = normalizer(report);

      // File with 10 capitalized-comments (style)
      const styles = normalized.hotspots["src/components/paymentHistory/styles.ts"];
      expect(styles.issueCount).toBe(10);
      expect(styles.errorCount).toBe(10);
      expect(styles.toxicityScore).toBe(10); // 10 issues * 1 weight (style)
      expect(styles.status).toBe("warning");

      // File with mixed categories
      const dialog =
        normalized.hotspots["src/components/paymentHistory/dialogs/ExportDialog.test.tsx"];
      // 2 no-unused-vars (correctness) + 1 sort-imports (style) + 1 unicorn/filename-case (style)
      expect(dialog.issueCount).toBe(4);
      expect(dialog.errorCount).toBe(4);
      expect(dialog.toxicityScore).toBe(22); // 2*10 (correctness) + 2*1 (style)
      expect(dialog.status).toBe("warning");

      // File with single issue correctness
      const blurs = normalized.hotspots["src/theme/light/create-blurs.js"];
      expect(blurs.issueCount).toBe(1);
      expect(blurs.toxicityScore).toBe(10);
      expect(blurs.status).toBe("warning");
    });
  });
});
