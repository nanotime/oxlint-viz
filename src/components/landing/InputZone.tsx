import { Component, createSignal, JSX } from "solid-js";
import { setView, worker } from "@/store/AppContext";
import { placeholder } from "./constants";

export const InputZone: Component = () => {
  const [text, setText] = createSignal("");

  const handleClick = () => {
    worker.postMessage(text());
    setView("dashboard");
  };

  const handleChange: JSX.EventHandler<HTMLTextAreaElement, InputEvent> = (ev) => {
    setText(ev.currentTarget.value);
  };

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
