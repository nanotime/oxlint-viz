export interface OxlintSpan {
  offset: number;
  length: number;
  line: number;
  column: number;
}

export interface OxlintLabel {
  span: OxlintSpan;
  label?: string | null;
}

export interface OxlintDiagnostic {
  message: string;
  code: string;
  severity: "error" | "warning" | "advice";
  causes: any[];
  url?: string;
  help?: string;
  filename: string;
  labels: OxlintLabel[];
  related: any[];
}

export interface OxlintRawReport {
  diagnostics: OxlintDiagnostic[];
  number_of_files: number;
  number_of_rules: number;
  threads_count: number;
  start_time: number;
}
