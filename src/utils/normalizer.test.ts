import { it, describe, expect } from "vite-plus/test";
import { inferCategory, normalizer } from "./normalizer";
import { OxlintRawReport } from "../model/input";
import data from "../mocks/oxlint-excerpt.json";

describe("inferCategory", () => {
  describe("inferCategory", () => {
    it("should infer the correct category for a given rule code based on namespace", () => {
      expect(inferCategory("eslint(no-unused-vars)")).toBe("correctness");

      expect(inferCategory("eslint-plugin-unicorn(filename-case)")).toBe(
        "style",
      );

      expect(inferCategory("eslint-plugin-import(no-self-import)")).toBe(
        "pedantic",
      );

      expect(inferCategory("oxc(no-map-spread)")).toBe("perf");

      expect(inferCategory("eslint-plugin-react(jsx-no-undef)")).toBe(
        "correctness",
      );
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

    it("should calculate scan time correctly", () => {
      const report = data as OxlintRawReport;
      const normalized = normalizer(report);
      // this depends on the machine running the test, so we just check it's a number
      expect(typeof normalized.summary.scanTime).toBe("number");
    });

    it("should calculate efficiency correctly", () => {
      const report = data as OxlintRawReport;
      const normalized = normalizer(report);
      // this depends on the machine running the test, so we just check it's a number
      expect(typeof normalized.summary.efficiency).toBe("number");
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
      expect(normalized.distribution.categories.correctness).toBe(18);
      expect(normalized.distribution.categories.style).toBe(2);
      expect(normalized.distribution.categories.pedantic).toBe(0);
      expect(normalized.distribution.categories.suspicious).toBe(0);
      expect(normalized.distribution.categories.perf).toBe(0);
    });
  });
});
