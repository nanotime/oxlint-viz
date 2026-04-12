import { Categories, CategoryType } from "@/model/categories";

export const RULE_OVERRIDES: Record<string, CategoryType> = {
  "eslint(no-var)": "pedantic",
  "eslint(eqeqeq)": "suspicious",
  "eslint(no-debugger)": "correctness",
  "eslint(no-console)": "suspicious",
  "eslint(max-lines)": "perf",
  "eslint(max-lines-per-function)": "perf",
  "eslint-plugin-unicorn(no-null)": "style",
  "eslint(sort-keys)": "style",
  "eslint(sort-imports)": "style",
  "eslint(capitalized-comments)": "style",
};

/**
 * Infers the category for a given rule code.
 * @param code - Rule code (e.g., "eslint(no-var)")
 * @returns Category string or "correctness" as default
 */
export function inferCategory(code: string): CategoryType {
  if (RULE_OVERRIDES[code]) return RULE_OVERRIDES[code];

  const match = code.match(/\(([^)]+)\)/);
  if (!match) return "correctness";

  return Categories[match[1]]?.category ?? "correctness";
}
