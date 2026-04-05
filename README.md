# Oxlint Visualizer

**Oxlint Visualizer** is a high-performance, privacy-first web tool designed to transform raw `oxlint` JSON output into a comprehensive, human-readable analytics report. Our goal is to provide developers with a clear "Refacto-o-meter" to identify code hotspots and prioritize technical debt reduction without ever letting data leave the local environment.

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

## 🛠 Tech Stack

- **Framework:** [SolidJS](https://solidjs.com/) (v1.9.9) for fine-grained reactivity and performance.
- **Toolchain:** [Vite+](https://github.com/voidzero-dev/vite-plus) for a seamless dev/build experience.
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/) for a modern, accessible UI.
- **Visualization:** [Apache ECharts](https://echarts.apache.org/) for highly interactive data representation.
- **Language:** TypeScript for end-to-end type safety.

## 🗺 Roadmap

- [x] **4.1 Logic - Normalizer:** Core engine to process raw JSON reports into structured metrics.
- [ ] **4.2 Scripts, hooks and quality enforcing:** Git hooks via `.vite-hooks` and automated CI quality checks.
- [ ] **4.3 UI Config:** Theming, layout definition, and chart configuration.
- [ ] **4.4 UI Development:** Implementation of the main dashboard, TreeMap, and Refacto-o-meter components.

## 🔬 Technical Explanations

### The Normalizer

The `normalizer` is a pure function that takes a `OxlintRawReport` and produces a `NormalizedReport`. It performs the following operations:

1. **Category Inference:** Rules are mapped to domains like `correctness`, `style`, `perf`, `pedantic`, and `suspicious`.
2. **Aggregated Metrics:** Calculates total issues, affected files, and severity distribution.
3. **Hotspot Analysis:** Identifies which files require immediate attention.

### Category Inference

The normalizer determines what _kind_ of issue each lint error represents:

```
"eslint(no-unused-vars)"
        ↓
    Extract: "no-unused-vars"
        ↓
    Look up in Categories: { category: "correctness" }
        ↓
    Result: "correctness"
```

**Priority order:**

1. **RULE_OVERRIDES** — User-defined exceptions take highest priority
2. **Categories lookup** — The oxlint source-of-truth mapping (flat `Record<string, Category>`)
3. **Fallback** — Defaults to `"correctness"` if rule not found

This enables O(1) lookup for rule categorization, critical for processing large codebases efficiently.

### Metrics & Calculation

#### Aggregation

| Metric                    | How it's calculated                                           |
| ------------------------- | ------------------------------------------------------------- |
| **Total Issues**          | Count all diagnostics                                         |
| **Files Affected**        | Unique filenames with issues                                  |
| **Severity Breakdown**    | Count `{ error, warning, advice }`                            |
| **Category Distribution** | Count by `{ correctness, style, pedantic, suspicious, perf }` |

#### Toxicity Score (Per-File)

Each file receives a **toxicity score** — a weighted sum of its issues:

$$Toxicity = \sum (CategoryWeight \times SeverityMultiplier)$$

| Category    | Weight | Rationale                           |
| ----------- | ------ | ----------------------------------- |
| correctness | 10     | Bugs, type errors — fix immediately |
| suspicious  | 7      | Code smells — risky patterns        |
| perf        | 5      | Performance issues                  |
| pedantic    | 3      | Style preferences                   |
| style       | 1      | Cosmetic, non-critical              |

| Severity | Multiplier |
| -------- | ---------- |
| error    | 1.0        |
| warning  | 0.5        |
| advice   | 0.1        |

**Example:**

```
File: src/api/payments.ts
Issues:
  - 20 correctness errors × 10 × 1.0 = 200
  - 5 style warnings × 1 × 0.5 = 2.5
Toxicity Score = 202.5 → capped at 100
```

#### General Toxicity (Project-Wide)

$$GeneralToxicity = \frac{\sum \min(FileScore, 100)}{TotalFiles}$$

Each file's score is capped at 100, then averaged across all files. This prevents one terrible file from skewing the entire project's score.

### Health Status

Based on the Toxicity Score, files are classified into:

- 🟢 **Healthy (< 10):** Low impact issues or clean.
- 🟡 **Warning (10 - 49):** Requires review; accumulation of minor issues.
- 🟠 **Toxic (50 - 149):** Significant technical debt; high risk of bugs.
- 🔴 **Critical (>= 150):** "Radioactive" files that should be refactored immediately.

### Visualization Strategy

Our dashboard uses a hierarchical approach to data visualization:

- **Donut Chart (Severity):** Displays the distribution of error/warning/advice. The center shows the total issue count for immediate context.
- **Horizontal Bar Chart (Categories):** Shows which domains (Correctness, Style, etc.) are most affected. Horizontal layout ensures long category names remain readable.
- **Top 15 Rules (Horizontal Bar):** Pinpoints the specific linter rules being triggered most often across the project.
- **General Toxicity Gauge:** A normalized 0-100% "Health Check" of the entire codebase.
- **Treemap (Files by Toxicity):** Visualizes the "weight" of each file based on its toxicity score. Larger blocks indicate higher priority for refactoring.
- **Heatmap (Top 20 Files vs Categories):** A deep-dive matrix crossing the most toxic files with Oxlint categories to reveal _why_ a file is problematic (e.g., is it a performance issue or a style violation?).

Our goal is to represent the **density of risk** rather than just a flat count of errors, allowing teams to focus on the files that truly hinder maintainability.
