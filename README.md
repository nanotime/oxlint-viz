# Oxlint Visualizer

**Oxlint Visualizer** is a high-performance, privacy-first web tool designed to transform raw `oxlint` JSON output into a comprehensive, human-readable analytics report. Our goal is to provide developers with a clear understanding of their codebase's lint health without ever letting data leave the local environment.

## 🚀 Getting Started

This project uses **Vite+** (`vp`), a unified toolchain that wraps the entire development lifecycle.

### Prerequisites

Ensure you have the `vp` binary installed globally and a package manager (pnpm is preferred).

### Commands

```bash
# Install dependencies
vp install

# Start development server
vp dev

# Run linting and type-checks
vp check

# Execute unit tests
vp test

# Build for production
vp build
```

### Generating Oxlint Reports

*Coming soon — more examples and documentation for generating oxlint JSON reports.*

## 🛠 Tech Stack

- **Framework:** [SolidJS](https://solidjs.com/) (v1.9.9) for fine-grained reactivity and performance.
- **Toolchain:** [Vite+](https://github.com/voidzero-dev/vite-plus) for a seamless dev/build experience.
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/) for a modern, accessible UI.
- **Visualization:** [Apache ECharts](https://echarts.apache.org/) for highly interactive data representation.
- **Language:** TypeScript for end-to-end type safety.

## 📊 Dashboard Overview

The dashboard presents linting data through a series of progressively detailed visualizations, each designed to answer specific questions about your codebase.

### Stats Bar

The header section displays high-level summary metrics:

- **Total Issues** — The aggregate count of all lint violations detected
- **Files with Issues** — How many files contain at least one violation
- **Severity Breakdown** — Count of errors, warnings, and advice-level issues

This gives you an immediate sense of the overall scope of lint issues without requiring any deeper analysis.

### Insights Cards

Two contextual insight cards that synthesize the data into actionable observations:

- **Priority** — Identifies the dominant category of issues in your codebase (correctness, suspicious, restriction, perf, or style). This helps you understand the *kind* of problems you're dealing with — are they actual bugs, risky patterns, or stylistic preferences?

- **Impact** — Analyzes how concentrated the issues are across rules. If the top 5 rules account for 70%+ of all violations, you have "concentrated fix potential" — addressing a few rules will dramatically reduce the issue count. If distribution is spread across many rules, the issues are more "widespread" and may require broader refactoring.

### Distribution Section

Two charts working together to show *what* is wrong:

- **Severity Donut** — Shows the proportion of issues by severity level (error/warning/advice). Errors are problems that will fail at runtime; warnings are suspicious patterns that may cause issues; advice is suggestions for improvement.

- **Categories Rose Chart** — Groups issues by oxlint category: correctness, style, pedantic, suspicious, perf, restriction, and nursery. This reveals the *type* of issues — for example, a codebase heavy on "style" issues is likely maintainable but inconsistent, while one heavy on "correctness" issues may have actual bugs.

### Specifics Section

- **Top 15 Rules Bar Chart** — Ranks the most frequently triggered linter rules. Each bar represents a rule, with length indicating violation count. This helps identify *which* specific rules are causing the most noise. Clicking a bar filters the view to focus on that rule.

This is particularly useful when the "Impact" insight shows concentrated issues — you can see exactly which rules to address first.

### Granular Section

- **Files by Errors Treemap** — A treemap visualization where each tile represents a file. Tile size reflects the number of issues in that file, and color indicates error density (darker = more errors relative to total issues).

This answers: *Which files are causing the most problems?* Large, red blocks are your hotspots — the files that deserve immediate attention.

### Deep Dive Section

- **Heatmap: Files vs Categories** — A matrix crossing the top 20 most problematic files against all category types. Each cell's color intensity shows how many violations of that category exist in that file.

This answers: *Why is this file problematic?* If a file shows up red in the "correctness" row but green in "style," you know it has real bugs rather than cosmetic issues. This helps prioritize which files to tackle first and what kind of issues you'll find when you open them.

## 🎛 Presets

Presets are severity configurations that bias how oxlint categories are interpreted. They override the raw severity levels from oxlint to match different team workflows.

| Preset | Behavior | Best For |
|--------|----------|----------|
| **Clean Code** *(Recommended)* | Restrictions are errors; style is advice; correctness/suspicious are warnings | Daily development — strict on rules that matter, silent on cosmetics |
| **Balanced** | Style/pedantic are advice/ignored; restrictions are warnings; correctness remains error | Legacy codebases or quick audits — reduces noise while keeping focus |
| **Strict** | Raw oxlint severities with no overrides | Teams wanting unfiltered oxlint output |
| **Performance** | Ignores style/pedantic; perf issues are errors; restrictions/suspicious are warnings | Performance optimization sprints |

**Note:** Correctness issues are always treated as errors regardless of preset — they represent actual bugs or high-risk regressions.

## 🔧 How It Works

### Category Mapping

Each lint rule is mapped to an oxlint category using a comprehensive lookup table (`src/model/categories.ts`). The mapping is performed by extracting the rule identifier from the diagnostic code (e.g., `eslint(no-unused-vars)` → `no-unused-vars`) and looking it up in the categories registry.

Some rules have custom overrides defined in `src/logic/inferCategory.ts` that take precedence over the default mapping. This allows fine-tuning the categorization for rules where the default may not match your team's standards.

When a rule is not found in the categories registry, it defaults to `correctness` — a conservative choice that ensures unknown issues are treated as potentially problematic.

### Data Flow

1. **Input** — Paste oxlint JSON output into the input zone
2. **Normalize** — The raw report is processed into structured metrics (severity counts, category counts, rule frequencies, file-level diagnostics)
3. **Analyze** — Insights are computed to determine priority categories and rule concentration
4. **Visualize** — All charts are rendered from the normalized data

All processing happens client-side in your browser. No data is ever transmitted anywhere.