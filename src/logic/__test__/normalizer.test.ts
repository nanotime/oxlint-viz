import { it, describe, expect } from "vite-plus/test";
import { normalizer } from "../normalizer";
import { OxlintRawReport } from "@/model/input";
import data from "@/mocks/oxlint-excerpt.json";
import { inferCategory } from "../inferCategory";
import { SEVERITY_PRESETS } from "@/model/severityConfig";

describe("inferCategory", () => {
  it("should infer the correct category for a given rule code based on categories.ts", () => {
    expect(inferCategory("eslint(no-unused-vars)")).toBe("correctness");

    expect(inferCategory("eslint-plugin-unicorn(filename-case)")).toBe("style");

    expect(inferCategory("eslint-plugin-import(no-self-import)")).toBe("suspicious");

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
      const normalized = normalizer(report, SEVERITY_PRESETS.strict);
      expect(normalized.summary.totalIssues).toBe(50);
    });

    it("should calculate total files correctly", () => {
      const report = data as OxlintRawReport;
      const normalized = normalizer(report, SEVERITY_PRESETS.strict);
      expect(normalized.summary.totalFiles).toBe(156);
    });

    it("should calculate files with issues correctly", () => {
      const report = data as OxlintRawReport;
      const normalized = normalizer(report, SEVERITY_PRESETS.strict);
      expect(normalized.summary.filesWithIssues).toBe(
        new Set(report.diagnostics.map((d) => d.filename)).size,
      );
    });
  });

  describe("Normalize distribution", () => {
    it("should count severity distribution correctly", () => {
      const report = data as OxlintRawReport;
      const normalized = normalizer(report, SEVERITY_PRESETS.strict);
      expect(normalized.distribution.severity.error).toBe(50);
      expect(normalized.distribution.severity.warning).toBe(0);
      expect(normalized.distribution.severity.advice).toBe(0);
    });

    it("should count category distribution correctly", () => {
      const report = data as OxlintRawReport;
      const normalized = normalizer(report, SEVERITY_PRESETS.strict);
      expect(normalized.distribution.categories.correctness).toBe(5);
      expect(normalized.distribution.categories.style).toBe(36);
    });
  });

  describe("Normalize rules", () => {
    it("should aggregate rules correctly", () => {
      const report = data as OxlintRawReport;
      const normalized = normalizer(report, SEVERITY_PRESETS.strict);

      expect(normalized.rules["eslint(capitalized-comments)"]).toEqual({
        name: "eslint(capitalized-comments)",
        count: 1,
        category: "style",
      });

      expect(normalized.rules["eslint(sort-keys)"]).toEqual({
        name: "eslint(sort-keys)",
        count: 6,
        category: "style",
      });
    });
  });

  describe("Normalize hotspots", () => {
    it("should calculate file metrics correctly for specific hotspots", () => {
      const report = data as OxlintRawReport;
      const normalized = normalizer(report, SEVERITY_PRESETS.strict);

      const styles = normalized.hotspots["src/components/paymentHistory/styles.ts"];
      expect(styles.issueCount).toBe(3);
      expect(styles.errorCount).toBe(3);
      expect(styles.warningCount).toBe(0);

      const dialog =
        normalized.hotspots["src/components/paymentHistory/dialogs/ExportDialog.test.tsx"];
      expect(dialog.issueCount).toBe(4);
      expect(dialog.errorCount).toBe(4);
      expect(dialog.warningCount).toBe(0);

      const blurs = normalized.hotspots["src/theme/light/create-blurs.js"];
      expect(blurs.issueCount).toBe(1);
      expect(blurs.errorCount).toBe(1);
      expect(blurs.warningCount).toBe(0);
    });
  });
});
