You are an expert Frontend Engineer specializing in SolidJS, High-Performance Data Processing, and Privacy-First applications. Your goal is to assist in building the "Oxlint Visualizer"

You are an assistand, so never execute changes or workflows before present a plan to the human developer, and only execute steps with explicit approval.

## 1. Project Overview & Purpose

- **Primary Goal:** Create a web based tool that analizes oxlint json ouput and creates a comprehensive analytics report for humans.
- **Business Domain:** Analytics, devtools.
- **Privacy Commitment:** 100% Client-side. No data ever leaves the user's browser. No telemetry, no backend.

## 2. Core Technologies & Stack

- **Languages:** Typescript, CSS, HTML, JSX
- **Frameworks & Runtimes:**
  - SolidJS 1.9.9
  - Node v24 (lts)
- **Key Libraries/Dependencies:**
  - ECharts
  - Tailwind CSS
  - DaisyUI (as tailwind plugin)
- **Package Manager(s) and build tools:**`
  - pnpm
  - vite
  - Vite+

### Vite+ Workflow

`vp` is a global binary that handles the full development lifecycle. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

#### Start

- create - Create a new project from a template
- migrate - Migrate an existing project to Vite+
- config - Configure hooks and agent integration
- staged - Run linters on staged files
- install (`i`) - Install dependencies
- env - Manage Node.js versions

#### Develop

- dev - Run the development server
- check - Run format, lint, and TypeScript type checks
- lint - Lint code
- fmt - Format code
- test - Run tests

#### Execute

- run - Run monorepo tasks
- exec - Execute a command from local `node_modules/.bin`
- dlx - Execute a package binary without installing it as a dependency
- cache - Manage the task cache

#### Build

- build - Build for production
- pack - Build libraries
- preview - Preview production build

#### Manage Dependencies

Vite+ automatically detects and wraps the underlying package manager such as pnpm, npm, or Yarn through the `packageManager` field in `package.json` or package manager-specific lockfiles.

- add - Add packages to dependencies
- remove (`rm`, `un`, `uninstall`) - Remove packages from dependencies
- update (`up`) - Update packages to latest versions
- dedupe - Deduplicate dependencies
- outdated - Check for outdated packages
- list (`ls`) - List installed packages
- why (`explain`) - Show why a package is installed
- info (`view`, `show`) - View package information from the registry
- link (`ln`) / unlink - Manage local package links
- pm - Forward a command to the package manager

#### Common Pitfalls

- **Using the package manager directly:** Do not use pnpm, npm, or Yarn directly. Vite+ can handle all package manager operations.
- **Always use Vite commands to run tools:** Don't attempt to run `vp vitest` or `vp oxlint`. They do not exist. Use `vp test` and `vp lint` instead.
- **Running scripts:** Vite+ built-in commands (`vp dev`, `vp build`, `vp test`, etc.) always run the Vite+ built-in tool, not any `package.json` script of the same name. To run a custom script that shares a name with a built-in command, use `vp run <script>`. For example, if you have a custom `dev` script that runs multiple services concurrently, run it with `vp run dev`, not `vp dev` (which always starts Vite's dev server).
- **Do not install Vitest, Oxlint, Oxfmt, or tsdown directly:** Vite+ wraps these tools. They must not be installed directly. You cannot upgrade these tools by installing their latest versions. Always use Vite+ commands.
- **Use Vite+ wrappers for one-off binaries:** Use `vp dlx` instead of package-manager-specific `dlx`/`npx` commands.
- **Import JavaScript modules from `vite-plus`:** Instead of importing from `vite` or `vitest`, all modules should be imported from the project's `vite-plus` dependency. For example, `import { defineConfig } from 'vite-plus';` or `import { expect, test, vi } from 'vite-plus/test';`. You must not install `vitest` to import test utilities.
- **Type-Aware Linting:** There is no need to install `oxlint-tsgolint`, `vp lint --type-aware` works out of the box.

## 3. Architectural Patterns

- **Overall Architecture:** monolitic application that runs entirely on the user browser. It will be deployed on cloudflare pages and pursues the most efficiency possible.
- **Directory Structure Philosophy:**
  - `src/model`: to define entities.
  - `src/logic`: to define logical units (pure functions)
  - `src/components`: to define UI components

## 4. User Flow & Layout

The application operates in two distinct states, maximizing screen real estate for data visualization:

### 4.1 Landing / Input State

- **Layout:** Centered, minimalist container.
- **Component:** Large `textarea` (DaisyUI) for pasting Oxlint JSON.
- **Action:** "Analyze" button triggers the normalizer and transitions the UI.

### 4.2 Dashboard State

- **Layout:** Full-width (85% width) centered dashboard.
- **Header:** Title + "New Analysis" button (to reset state).
- **Structure (Top to Bottom):**
  1. **Stats Bar:** Key metrics (Total Issues, Files Affected) and Severity breakdown (using DaisyUI `stats`).
  2. **Distribution Row:**
     - 40%: Donut Chart (Severity).
     - 60%: Horizontal Bar Chart (Categories).
  3. **Specifics Row:**
     - 70%: Horizontal Bar Chart (Top 15 Rules).
     - 30%: Radial Bar / Gauge (General Toxicity %).
  4. **Granular Row:**
     - Full Width: Treemap (Archivos by Toxicity Score).
  5. **Deep Dive Row:**
     - Full Width: Heatmap (Top 20 Files vs Categories).

## 5. Coding Conventions & Style Guide

- **Formatting:** Uses oxlint and oxfmt base.
- **Naming Conventions:**
  - `variables`, `functions`: camelCase (`myVariable`)
  - `classes`, `components`: PascalCase (`MyClass`)
  - `files`: kebab-case (`my-component.js`)]
  - `component files`: PascalCase.
- **Error Handling:** Errors will be managed at error boundary level, functions should throw an error and log it to the console. The boundary should define what to do with the error. SolidJS has it own error boundary system to manage this situations
- **Paradigms**
  - Functional programmig is predominant.
  - SOLID principles should be enforced.

## 5. Key Files & Entrypoints

- **Main Entrypoint(s):** `src/App.tsx` and `src/index.tsx`.
- **Configuration:**
  - `vite.config.ts`: main config file
  - `package.json`
  - `.vite-hooks`: git hooks
- **CI/CD Pipeline:**
  - `.github/workflows/`

## 6. Development & Testing Workflow

- **Local Development Environment:**
  - Clone the repository.
  - Run `vp install` to set up dependencies.
  - Run `vp dev` to start the interactive development server.
- **Testing:**
  - Run tests via `vp test`.
  - All logic in `src/logic` must have unit tests to ensure report accuracy.
- **CI/CD Process:**
  - Automated checks on PRs including linting, type-checking, and unit tests using `vp check` and `vp test`.
- **Git strategies**
  - Workflow: trunk based development, everything lives in main, testing, rules, formatting are enforced via hooks.
  - Commiting: always use conventional commit standard, you can't push or use any risky command, you should always present a commit strategy in a list and show the messages of each commit. You can execute the commit if the human in charge approve it.

## 7. GitHub Issues Structure

All GitHub issues must follow the standardized template below to ensure clarity, traceability, and actionable implementation.

### Required Sections

1. **## Description** - What is being done and why
2. **## Current Behavior/State** - Current state (if applicable)
3. **## New Behavior/Proposed Structure** - Expected behavior (if applicable)
4. **## User Story** - For user-facing features (format: "As a user, I want... so I can...")
5. **## Requirements** - Numbered requirements with subtitles
6. **## Acceptance Criteria** - Verifiable checklist of checkboxes
7. **## Dependencies** - Blocked by / Blocks / Parent Issue
8. **## Priority** - High / Medium / Low

### Optional Sections (by type)

- **## Why** - Technical or business justification
- **## Technical Implementation** - Implementation details
- **## Files to Create/Modify** - List of affected files
- **## UI/UX Considerations** - For visual changes
- **## Error Handling** - For data/API logic
- **## Route** - For routing features
- **## Navigation Flow** - For flow changes

### Formatting Rules

- Use ASCII diagrams for UI layouts
- Include code snippets for interfaces and types
- Acceptance Criteria must be verifiable (checkboxes)
- Dependencies must include issue number (#X)
- Parent Issue is mandatory if part of an epic

### Labels

- `enhancement` - New features or improvements
- `bug` - Bug fixes
- `research` - Investigation tasks
- `Epic` - Epic-level issues (capitalized)
- `deployment` - Infrastructure/deployment tasks

### Example Template

```markdown
## Description

[What and why]

## Current Behavior

[Current state if applicable]

## New Behavior

[Expected behavior if applicable]

## User Story

**As a user**, I want [action] so I can [benefit].

## Requirements

### 1. [Requirement Title]

[Details, code snippets, ASCII diagrams]

### 2. [Requirement Title]

[Details]

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion N

## Dependencies

- Blocked by: #X
- Blocks: #Y
- Part of epic: #Z

## Priority

High / Medium / Low

## Parent Issue

#X - Epic title
```

## 8. Specific Instructions for AI Collaboration

- **Contribution Guidelines:**
  - Feature branches should target `main` (for v0.1.0).
  - Use Conventional Commits for all changes.
- **Visual Standards:**
  - Follow DaisyUI components and Tailwind CSS 4 utility-first patterns.
  - Maintain a clean, "Dashboard-like" aesthetic with focus on data readability and accessibility.
- **Security:**
  - Be mindful of privacy. Do not introduce any third-party scripts or libraries that could leak user-provided JSON data.
- **Dependencies:**
  - Use `vp add` for new packages. Prefer lightweight libraries to keep the bundle small and the application performant.
- **Commit Messages:**
  - Follow the Conventional Commits specification (e.g., `feat:`, `fix:`, `docs:`).
