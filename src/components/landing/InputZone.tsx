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

  const handleResetError = () => context.setWorkerError(null);

  const handleClick = () => {
    context.setWorkerDone(false);
    context.worker.postMessage({
      report: text(),
      severityConfig: context.severityConfig(),
    });
  };

  const handleChange: JSX.EventHandler<HTMLTextAreaElement, InputEvent> = (ev) => {
    setText(ev.currentTarget.value);
  };

  effect(async () => {
    if (context.workerDone() && context.workerError() === null && !hasNavigated()) {
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

          <select
            name="preset"
            class="select select-bordered w-full mb-4"
            value={context.selectedPreset()}
            onChange={(e) => context.setSelectedPreset(e.currentTarget.value as any)}
          >
            <For each={Object.entries(PRESET_LABELS)}>
              {(item) => <option value={item[0]}>{item[1]}</option>}
            </For>
          </select>

          <Show when={context.workerError()}>
            <ErrorCard error={context.workerError()} reset={handleResetError} />
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
