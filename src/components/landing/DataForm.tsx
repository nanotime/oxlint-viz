import { Accessor, Component, createSignal, For, Show } from "solid-js";
import { ErrorCard } from "../shared/ErrorCard";
import { placeholder } from "./constants";
import { PRESET_LABELS, PresetType } from "@/model/severityConfig";
import { useAppContext } from "@/store/AppContext";

export interface AnalyzeData {
  name: string;
  report: string;
  preset: PresetType;
}

interface DataFormProps {
  onAnalyze: (data: AnalyzeData) => void;
  analyzing: Accessor<boolean>;
}

export const DataForm: Component<DataFormProps> = (props) => {
  const context = useAppContext();
  const [name, setName] = createSignal("");
  const [report, setReport] = createSignal("");

  const handleResetError = () => context.setWorkerState({ error: null, done: false });

  const isValid = () => name().trim().length > 0 && report().trim().length > 0;

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!isValid()) return;
    props.onAnalyze({
      name: name(),
      report: report(),
      preset: context.presetState.selected,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Analysis name</legend>
        <input
          type="text"
          class="input w-full"
          name="analysisName"
          id="oxlint-analysis-name"
          placeholder="e.g., Project Alpha - April 2024"
          maxlength="100"
          required
          aria-required="true"
          aria-label="Analysis name"
          value={name()}
          onInput={(e) => setName(e.currentTarget.value)}
        />
        <p class="fieldset-hint">Give your analysis a descriptive name to identify it later</p>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Preset</legend>
        <select
          name="preset"
          class="select select-bordered w-full"
          value={context.presetState.selected}
          onChange={(e) => context.setPresetState({ selected: e.currentTarget.value as any })}
        >
          <For each={Object.entries(PRESET_LABELS)}>
            {(item) => <option value={item[0]}>{item[1]}</option>}
          </For>
        </select>
      </fieldset>

      <Show when={context.workerState.error}>
        <ErrorCard error={context.workerState.error} reset={handleResetError} />
      </Show>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Analysis content</legend>
        <textarea
          class="textarea w-full mb-6 font-mono"
          rows={10}
          name="oxLintJson"
          id="oxlint-analysis-input"
          data-testid="oxlint-analysis-input"
          placeholder={placeholder}
          value={report()}
          onInput={(e) => setReport(e.currentTarget.value)}
        />
        <button type="submit" class="btn btn-primary" disabled={!isValid()}>
          <Show
            when={!props.analyzing()}
            fallback={<span class="loading loading-dots loading-sm"></span>}
          >
            Analyze
          </Show>
        </button>
      </fieldset>
    </form>
  );
};
