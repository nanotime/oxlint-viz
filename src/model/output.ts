export type HealthStatus = "healthy" | "warning" | "toxic" | "critical";

export interface FileMetrics {
  filename: string;
  issueCount: number;
  errorCount: number;
  warningCount: number;
  toxicityScore: number; // El cálculo del Refacto-o-meter
  mainSmell: string; // La regla que más se repite en este archivo
  status: HealthStatus;
}

export interface RuleMetric {
  name: string;
  count: number;
  category: string;
}

export interface NormalizedReport {
  summary: {
    totalIssues: number;
    totalFiles: number;
    filesWithIssues: number;
  };
  distribution: {
    severity: { error: number; warning: number; advice: number };
    categories: Record<string, number>; // Ej: { correctness: 10, perf: 5 }
  };
  rules: Record<string, RuleMetric>; // Ordenado por count descendente para el Treemap
  hotspots: Record<string, FileMetrics>; // Ordenado por toxicityScore para el Refacto-o-meter
}
