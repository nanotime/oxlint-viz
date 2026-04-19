import { it, describe, expect } from "vite-plus/test";
import { applySeverityOverrides } from "../applySeverityOverrides";
import { SeverityConfig, SEVERITY_PRESETS } from "@/model/severityConfig";
import mockReport from "@/mocks/oxlint-excerpt.json";
import { OxlintDiagnostic } from "@/model/input";

describe("applySeverityOverrides", () => {
  const diagnostics = mockReport.diagnostics as OxlintDiagnostic[];

  describe("Filtering 'ignore' overrides", () => {
    it("filters out diagnostics with category set to 'ignore'", () => {
      const config: SeverityConfig = {
        preset: "balanced",
        overrides: { style: "ignore" },
      };

      const result = applySeverityOverrides(diagnostics, config);

      expect(result.length).toBeLessThan(50);
      expect(result.some((d) => d.code === "eslint(sort-keys)")).toBe(false);
      expect(result.some((d) => d.code === "eslint-plugin-unicorn(filename-case)")).toBe(false);
    });

    it("filters multiple categories when multiple are set to 'ignore'", () => {
      const config: SeverityConfig = {
        preset: "balanced",
        overrides: {
          style: "ignore",
          perf: "ignore",
        },
      };

      const result = applySeverityOverrides(diagnostics, config);

      expect(result.some((d) => d.code === "eslint(sort-keys)")).toBe(false);
      expect(result.some((d) => d.code === "eslint(max-lines)")).toBe(false);
      expect(result.some((d) => d.code === "eslint(max-lines-per-function)")).toBe(false);
    });

    it("preserves only non-ignored categories", () => {
      const config: SeverityConfig = {
        preset: "balanced",
        overrides: {
          style: "ignore",
          pedantic: "ignore",
        },
      };

      const result = applySeverityOverrides(diagnostics, config);

      expect(result.some((d) => d.code === "eslint(sort-imports)")).toBe(false);
      expect(result.some((d) => d.code === "eslint(no-unused-vars)")).toBe(true);
    });

    it("returns new array (does not mutate original)", () => {
      const config: SeverityConfig = {
        preset: "balanced",
        overrides: { style: "ignore" },
      };
      const originalLength = diagnostics.length;

      const result = applySeverityOverrides(diagnostics, config);

      expect(result).not.toBe(diagnostics);
      expect(diagnostics).toHaveLength(originalLength);
    });

    it("returns empty array when all categories are ignored", () => {
      const config: SeverityConfig = {
        preset: "balanced",
        overrides: {
          style: "ignore",
          correctness: "ignore",
          perf: "ignore",
          pedantic: "ignore",
          suspicious: "ignore",
          restriction: "ignore",
          nursery: "ignore",
        },
      };

      const result = applySeverityOverrides(diagnostics, config);

      expect(result).toHaveLength(0);
    });
  });

  describe("Severity remapping", () => {
    it("remaps style severity to warning", () => {
      const config: SeverityConfig = {
        preset: "balanced",
        overrides: { style: "warning" },
      };

      const result = applySeverityOverrides(diagnostics, config);

      const styleDiag = result.find((d) => d.code === "eslint(sort-keys)");
      expect(styleDiag?.severity).toBe("warning");
    });

    it("remaps perf severity to error", () => {
      const config: SeverityConfig = {
        preset: "balanced",
        overrides: { perf: "error" },
      };

      const result = applySeverityOverrides(diagnostics, config);

      const perfDiag = result.find((d) => d.code === "eslint(max-lines)");
      expect(perfDiag?.severity).toBe("error");
    });

    it("preserves original severity when no override exists", () => {
      const config: SeverityConfig = {
        preset: "balanced",
        overrides: { style: "warning" },
      };

      const result = applySeverityOverrides(diagnostics, config);

      const correctnessDiag = result.find((d) => d.code === "eslint(no-unused-vars)");
      expect(correctnessDiag?.severity).toBe("error");
    });

    it("creates new objects when remapping (immutable)", () => {
      const config: SeverityConfig = {
        preset: "balanced",
        overrides: { style: "warning" },
      };
      const originalDiag = diagnostics.find((d) => d.code === "eslint(sort-keys)");

      const result = applySeverityOverrides(diagnostics, config);
      const remappedDiag = result.find((d) => d.code === "eslint(sort-keys)");

      expect(remappedDiag).not.toBe(originalDiag);
      expect(originalDiag?.severity).toBe("error");
    });

    it("removes ignored categories and remaps others in same pass", () => {
      const config: SeverityConfig = {
        preset: "balanced",
        overrides: { style: "warning", correctness: "ignore" },
      };

      const result = applySeverityOverrides(diagnostics, config);

      const hasStyle = result.some((d) => d.code === "eslint(sort-keys)");
      const hasCorrectness = result.some((d) => d.code === "eslint(no-unused-vars)");
      const remappedStyle = result.find((d) => d.code === "eslint(sort-keys)");

      expect(hasStyle).toBe(true);
      expect(hasCorrectness).toBe(false);
      expect(remappedStyle?.severity).toBe("warning");
    });
  });

  describe("Preset configurations", () => {
    it("strict preset returns all diagnostics unchanged", () => {
      const config = SEVERITY_PRESETS.strict;

      const result = applySeverityOverrides(diagnostics, config);

      expect(result).toHaveLength(50);
    });

    it("performance preset ignores style, pedantic, restriction, suspicious", () => {
      const config = SEVERITY_PRESETS.performance;

      const result = applySeverityOverrides(diagnostics, config);

      expect(result.some((d) => d.code === "eslint(sort-keys)")).toBe(false);
      expect(result.some((d) => d.code === "eslint-plugin-unicorn(filename-case)")).toBe(false);
      expect(result.some((d) => d.code === "eslint(no-unused-vars)")).toBe(true);
    });

    it("balanced preset remaps style to advice and ignores pedantic", () => {
      const config = SEVERITY_PRESETS.balanced;

      const result = applySeverityOverrides(diagnostics, config);

      const styleDiag = result.find((d) => d.code === "eslint(sort-keys)");
      expect(styleDiag?.severity).toBe("advice");
      expect(result.some((d) => d.code === "eslint(no-unused-vars)")).toBe(true);
    });

    it("cleanCode preset ignores pedantic and keeps other categories", () => {
      const config = SEVERITY_PRESETS.cleanCode;

      const result = applySeverityOverrides(diagnostics, config);

      expect(result.some((d) => d.code === "eslint-plugin-unicorn(new-for-builtins)")).toBe(false);
      expect(result.some((d) => d.code === "eslint(no-unused-vars)")).toBe(true);
      expect(result.some((d) => d.code === "eslint(sort-keys)")).toBe(true);
    });
  });
});
