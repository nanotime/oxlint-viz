export interface FileComplexity {
  functionName: string;
  maxComplexity: number;
  currentComplexity: number;
}

export interface FileMetrics {
  filename: string;
  issueCount: number;
  errorCount: number;
  warningCount: number;
  categories: Record<string, number>;
  complexity?: FileComplexity;
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
  };
  rules: Record<string, RuleMetric>;
  hotspots: Record<string, FileMetrics>;
}
