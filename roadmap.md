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

- [x] **2.3 TreeMap Legend** (`src/components/dashboard/charts/TreeByToxicity.tsx`)
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

- [x] **4.1 InfoPopover Component** (`src/components/shared/InfoPopover.tsx`)
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
