import { CategoryType } from "./categories";

export type SeverityLevel = "error" | "warning" | "advice" | "ignore";

export interface SeverityConfig {
  overrides: Partial<Record<CategoryType, SeverityLevel>>;
}
