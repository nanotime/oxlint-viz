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

### 🔧 Generating Oxlint Reports

To analyze your project with Oxlint Visualizer, generate a JSON report. Oxlint is extremely fast, so running a full scan takes only milliseconds.

#### Quick Commands

````bash
# Recommended: Standard audit (Best balance of noise/value)
oxlint -f json . > oxlint-report.json

# Comprehensive audit (All categories except nursery/experimental)
oxlint -f json -D correctness -D perf -D suspicious -D pedantic -D style . > oxlint-report.json

# Maximum coverage for Modern React Apps
oxlint -f json -D all \
  --react-plugin \
  --jsx-a11y-plugin \
  --import-plugin \
  --vitest-plugin \
  . > oxlint-report.json

# Backend/Node.js Optimized
oxlint -f json -D all \
  --promise-plugin \
  --node-plugin \
  . > oxlint-report.json

### Quick Test

Clone and test on a real project:

```bash
git clone https://github.com/solidjs/solid-site --depth 1
cd solid-site
oxlint -f json -D all --react-plugin . > oxlint-report.json
````

## 🛠 Tech Stack

- **Framework:** [SolidJS](https://solidjs.com/) (v1.9.9) for fine-grained reactivity and performance.
- **Toolchain:** [Vite+](https://github.com/voidzero-dev/vite-plus) for a seamless dev/build experience.
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/) for a modern, accessible UI.
- **Visualization:** [Apache ECharts](https://echarts.apache.org/) for highly interactive data representation.
- **Language:** TypeScript for end-to-end type safety.

## 🗺 Roadmap

- [x] **4.1 Logic - Normalizer:** Core engine to process raw JSON reports into structured metrics.
- [x] **4.2 Scripts, hooks and quality enforcing:** Git hooks via `.vite-hooks` and automated CI quality checks.
- [x] **4.3 UI Config:** Theming, layout definition, and chart configuration.
- [x] **4.4 UI Development:** Implementation of the main dashboard, TreeMap, and Refacto-o-meter components.

## 📋 Implementation TODO

### Phase 1: Error Handling & Robustness

- [x] **1.1 Worker Error Handling** (`src/logic/worker.ts`)
  - Wrap parser/normalizer in try/catch
  - Send structured response: `{ success: boolean, data?: NormalizedReport, error?: { message: string, details: string } }`
  - Dashboard handles both success and error responses

- [x] **1.2 Dashboard Error Handling** (`src/components/dashboard/Dashboard.tsx`)
  - Update `worker.onmessage` to handle structured response
  - On error: `throw new Error(response.error.message)` to trigger ErrorBoundary

### Phase 2: Dashboard UX Improvements

- [x] **2.1 Top 15 Rules - Grayscale Rank Coloring** (`src/components/dashboard/charts/TopRulesBar.tsx`)
  - Update title: "Most Violated Rules (Top 15)"
  - Implement grayscale grouping using `palette.grayscale`:
    - Ranks 1-3 → `palette.grayscale.dark`
    - Ranks 4-6 → `palette.grayscale.mid`
    - Ranks 7-9 → `palette.grayscale.light`
    - Ranks 10-15 → `palette.base[300]`

- [x] **2.2 Categories Rose Chart** (`src/components/dashboard/charts/CategoriesRoseChart.tsx`)
  - Convert horizontal bar to pie with `roseType: 'radius'`
  - Size represents issue count (human measures shapes)
  - Rename `CategorieBarChart.tsx` → `CategoriesRoseChart.tsx`

- [ ] **2.3 TreeMap Legend** (`src/components/dashboard/charts/TreeByToxicity.tsx`)
  - Create `TreemapLegend.tsx` component
  - Horizontal legend showing: [Healthy] ---- [Warning] ---- [Toxic] ---- [Critical]
  - Using grayscale colors from palette

- [ ] **2.4 Stats Icons** (`src/components/dashboard/charts/Stats.tsx`)
  - Add Lucide icons for each stat type:
    - Total Issues → `AlertCircle`
    - Total Files → `FileText`
    - Files With Issues → `FileWarning`
    - Error → `AlertTriangle`
    - Warning → `AlertCircle`
    - Advice → `InfoCircle`

### Phase 3: Insights Section

- [ ] **3.1 Insights Component** (`src/components/dashboard/sections/InsightsSection.tsx`)
  - New section below StatsSection
  - Grid of insight cards (max 4-6)

- [ ] **3.2 Insights Logic** (`src/logic/analyzeInsights.ts`)
  - Create `analyzeInsights(report: NormalizedReport): Insight[]`
  - Insight types:
    - `health` - General toxicity assessment
    - `priority` - What to fix first based on dominant category
    - `impact` - Top rules impact percentage
    - `concentration` - Files with issues ratio
    - `focus` - Dominant category recommendation

- [ ] **3.3 Insight Messages**

  ```
  Health Assessment:
  - toxicity <= 0.33 → "Codebase is healthy"
  - toxicity <= 0.50 → "Moderate technical debt"
  - toxicity <= 0.70 → "Significant issues"
  - else → "Critical state - immediate refactoring needed"

  Priority Focus:
  - correctness dominant → "Focus on fixing bugs (potential runtime errors)"
  - suspicious dominant → "Review code patterns (runtime risk)"
  - perf dominant → "Performance optimization opportunities"
  - style dominant → "Low priority - cosmetic improvements"

  Impact Estimate:
  - "Fixing top 5 rules would address X% of all issues"

  File Concentration:
  - High ratio → "Issues spread across many files"
  - Low ratio → "Issues concentrated in few files - targeted refactor possible"
  ```

### Phase 4: Popovers & Context (Optional)

- [ ] **4.1 InfoPopover Component** (`src/components/shared/InfoPopover.tsx`)
  - DaisyUI tooltip or dropdown based
  - Props: `title`, `content`
  - Usage: Add info icon next to chart titles

- [ ] **4.2 Popover Content**
      | Chart | Popover Content |
      |-------|----------------|
      | Top 15 Rules | "Most frequently violated rules. Darker color = higher priority (top 3)." |
      | Categories Rose | "Issue distribution by domain. Larger slice = more issues." |
      | Toxicity Gauge | "Overall health score (0-100%). Lower is better." |
      | TreeMap | "File hotspots. Size = toxicity, Color = health status." |

### Phase 5: Category Severity Overrides

- [ ] **5.1 Severity Configuration Model** (`src/model/severityConfig.ts`)
  - Define `SeverityLevel` type: `error | warning | advice | ignore`
  - Define `CategorySeverityOverride` type: `Record<CategoryType, SeverityLevel>`
  - Define `SeverityConfig` interface with `overrides` and `preset` fields
  - Create `SEVERITY_PRESETS` constant with opinionated defaults:
    - `balanced`: style→advice, pedantic→ignore, restriction→warning
    - `strict`: no overrides
    - `performance`: style/pedantic/restriction/suspicious→ignore
    - `reactOptimized`: style/pedantic→ignore

- [ ] **5.2 Override Logic** (`src/logic/applySeverityOverrides.ts`)
  - Create pure function to transform diagnostics based on config
  - Filter out diagnostics with "ignore" severity
  - Remap severity based on category overrides
  - Update toxicity calculation to use new severities

- [ ] **5.3 Update Normalizer** (`src/logic/normalizer.ts`)
  - Accept optional `SeverityConfig` parameter
  - Apply overrides before normalization
  - Update type signatures

- [ ] **5.4 Landing Page UI** (`src/components/landing/Landing.tsx`)
  - Add preset selector dropdown
  - Add category override toggle buttons (error/warning/advice/ignore)
  - Show impact preview (issues count before/after)
  - Integrate with analysis workflow

- [ ] **5.5 LocalStorage Persistence**
  - Save custom overrides to localStorage
  - Load saved overrides on page load
  - Clear/reset functionality

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
