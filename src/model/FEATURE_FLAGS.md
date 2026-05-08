# Feature Flags Registry

Format: All flags used in code must be registered here first.

| Flag         | Description                                      | Default | Production | Preview | Status |
| ------------ | ------------------------------------------------ | ------- | ---------- | ------- | ------ |
| `complexity` | Cyclomatic complexity visualization in dashboard | `true`  | `false`    | `true`  | beta   |
| `heatmap`    | Files vs categories heatmap                      | `true`  | `true`     | `true`  | stable |

## Conventions

- Environment variable prefix: `VITE_FEATURE_`
- Code prefix: `feature.` (e.g., `feature.complexity`)
- Status values: `stable`, `beta`, `experimental`, `deprecated`

## Usage

```tsx
import { isFeatureEnabled } from "@/config/features";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { Show } from "solid-js";

// Direct check
{
  isFeatureEnabled("complexity") && <ComplexityChart />;
}

// With reactive hook
const showComplexity = useFeatureFlag("complexity");
<Show when={showComplexity()}>
  <ComplexityChart />
</Show>;
```

## Cloudflare Pages Configuration

| Environment | Variables                       |
| ----------- | ------------------------------- |
| Production  | `VITE_FEATURE_COMPLEXITY=false` |
| Preview     | `VITE_FEATURE_COMPLEXITY=true`  |
