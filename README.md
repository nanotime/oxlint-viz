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
- **Visualization:** [ApexCharts](https://apexcharts.com/) for interactive data representation.
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

### Metrics & Calculation

We use a property **Toxicity Score** to represent the "health" of a file:

$$Score = \sum (Weight_{category} \times Multiplier_{severity})$$

- **Weights:** `correctness` (10), `suspicious` (7), `perf` (5), `pedantic` (3), `style` (1).
- **Multipliers:** `error` (1.0), `warning` (0.5), `advice` (0.1).

### Health Status

Based on the Toxicity Score, files are classified into:

- 🟢 **Healthy (< 10):** Low impact issues or clean.
- 🟡 **Warning (< 50):** Requires review; accumulation of minor issues.
- 🟠 **Toxic (< 150):** Significant technical debt; high risk of bugs.
- 🔴 **Critical (>= 150):** "Radioactive" files that should be refactored immediately.

Our goal is to represent the **density of risk** rather than just a flat count of errors, allowing teams to focus on the files that truly hinder maintainability.
