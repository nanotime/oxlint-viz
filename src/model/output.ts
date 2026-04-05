export type HealthStatus = "healthy" | "warning" | "toxic" | "critical";

export interface FileMetrics {
  filename: string;
  issueCount: number;
  errorCount: number;
  warningCount: number;
  toxicityScore: number;
  categories: Record<string, number>;
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
    categories: Record<string, number>;
    generalToxicity: number;
  };
  rules: Record<string, RuleMetric>;
  hotspots: Record<string, FileMetrics>;
}
