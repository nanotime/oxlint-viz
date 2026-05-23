import { Component, createSignal, For, JSX, Show } from "solid-js";
import { effect } from "solid-js/web";
import { ErrorCard } from "../shared/ErrorCard";
import { placeholder } from "./constants";
import { PRESET_LABELS } from "@/model/severityConfig";
import { useAppContext } from "@/store/AppContext";
import { useNavigate } from "@tanstack/solid-router";

export const InputZone: Component = () => {
  const context = useAppContext();
  const navigate = useNavigate({ from: "/" });
  const [text, setText] = createSignal("");
  const [hasNavigated, setHasNavigated] = createSignal(false);

  const handleResetError = () => context.setWorkerState({ error: null, done: false });

  const handleClick = () => {
    context.setWorkerState({ done: false });
    context.worker.postMessage({
      report: text(),
      severityConfig: context.severityConfig(),
    });
  };

  const handleChange: JSX.EventHandler<HTMLTextAreaElement, InputEvent> = (ev) => {
    setText(ev.currentTarget.value);
  };

  effect(async () => {
    if (context.workerState.done && context.workerState.error === null && !hasNavigated()) {
      setHasNavigated(true);
      await navigate({ to: "/analysis" });
    }
  });

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

          <fieldset class="fieldset">
            <legend class="fieldset-legend">Analysis name</legend>
            <input type="text" class="input w-full" placeholder="Analysis name" />
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
