import { OxlintRawReport } from "../model/input";
import { NormalizedReport } from "../model/output";

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
  "eslint(max-lines)": "perf", // Proxy de complejidad/rendimiento
  "eslint(max-lines-per-function)": "perf",
  "eslint-plugin-unicorn(no-null)": "style",
};

const WEIGHTS = {
  correctness: 10,
  suspicious: 7,
  perf: 5,
  pedantic: 3,
  style: 1,
  nursery: 2,
};
const SEVERITY_MULT = { error: 1, warning: 0.5, advice: 0.1 };

export function inferCategory(code: string): string {
  if (RULE_OVERRIDES[code]) return RULE_OVERRIDES[code];

  // everything before the first (
  const match = code.match(/^([^(]+)/);
  if (!match) return "correctness"; // Default de seguridad
  const namespace = match[1];
  return RULE_NAMESPACE_MAP[namespace] || "correctness";
}

export const normalizer = (rawReport: OxlintRawReport): NormalizedReport => {
  const normalized = {
    summary: {
      totalIssues: rawReport.diagnostics.length,
      totalFiles: rawReport.number_of_files,
      filesWithIssues: new Set(rawReport.diagnostics.map((d) => d.filename))
        .size,
      scanTime: Date.now() - rawReport.start_time,
      efficiency:
        (rawReport.diagnostics.length / (Date.now() - rawReport.start_time)) *
        1000, // issues per second
    },
    // * this iterations should be done in just one reduce to avoid multiple iterations over the diagnostics, but for clarity we separate them
    distribution: {
      severity: rawReport.diagnostics.reduce(
        (acc, diag) => {
          acc[diag.severity] = (acc[diag.severity] || 0) + 1;
          return acc;
        },
        { error: 0, warning: 0, advice: 0 },
      ),
      categories: rawReport.diagnostics.reduce<Record<string, number>>(
        (acc, diag) => {
          const inferredCategory = inferCategory(diag.code);
          acc[inferredCategory] = (acc[inferredCategory] || 0) + 1;
          return acc;
        },
        { correctness: 0, style: 0, pedantic: 0, suspicious: 0, perf: 0 },
      ),
    },
    rules: [], // Aquí se implementaría la lógica para calcular las métricas de las reglas
    hotspots: [], // Aquí se implementaría la lógica para calcular las métricas de los archivos
  };
  return normalized;
};
