import { Component, createSignal, For, JSX } from "solid-js";
import {
  setView,
  worker,
  selectedPreset,
  setSelectedPreset,
  severityConfig,
} from "@/store/AppContext";
import { placeholder } from "./constants";
import { PRESET_LABELS } from "@/model/severityConfig";

export const InputZone: Component = () => {
  const [text, setText] = createSignal("");

  const handleClick = () => {
    worker.postMessage({
      report: text(),
      severityConfig: severityConfig(),
    });
    setView("dashboard");
  };

  const handleChange: JSX.EventHandler<HTMLTextAreaElement, InputEvent> = (ev) => {
    setText(ev.currentTarget.value);
  };

  // const presetLabels = Object.entries(PRESET_LABELS).map(([value, label]) => ({}));

  return (
    <section
      class="flex flex-col flex-1 items-center justify-center"
      id="input-zone"
      data-testid="input-zone"
    >
      <div class="card card-border shadow-sm">
        <div class="card-body">
          <div class="card-title">
            <h1 class="text-xl color-accent">Welcome, please paste your JSON output here</h1>
          </div>

          <select
            class="select select-bordered w-full mb-4"
            value={selectedPreset()}
            onChange={(e) => setSelectedPreset(e.currentTarget.value as any)}
          >
            <For each={Object.entries(PRESET_LABELS)}>
              {(item) => <option value={item[0]}>{item[1]}</option>}
            </For>
          </select>

          <div class="w-xl flex flex-col">
            <textarea
              class="textarea w-full mb-6 font-mono"
              rows={10}
              name="oxLintJson"
              id="oxlint-input"
              placeholder={placeholder}
              onInput={handleChange}
            />
            <button class="btn btn-primary" onClick={handleClick} disabled={text() === ""}>
              Analyze
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
