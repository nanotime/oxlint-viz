import { Component } from "solid-js";
import { setView } from "@/store/AppContext";
import { parser } from "@/logic/parser";
import { normalizer } from "@/logic/normalizer";
import { useAppContext } from "@/store/AppContext";
import data from "@/mocks/oxlint-excerpt.json";

const placeholder = `
{
  diagnosis: [
    {
      "message": "Unexpected block statement surrounding arrow body.",
      "code": "eslint(arrow-body-style)",
      "severity": "error",
      "causes": [],
      "url": "https://oxc.rs/docs/guide/usage/linter/rules/eslint/arrow-body-style.html",
      "help": "Move the returned value to be immediately after the =>.",
      "filename": "src/theme/light/create-blurs.js",
      "labels": [
        {
          "span": { "offset": 33, "length": 27, "line": 1, "column": 34 }
        }
      ],
      "related": []
    },
  ],
  "number_of_files": 156,
  "number_of_rules": 311,
  "threads_count": 8,
  "start_time": 0.074235209
}`;

export const InputZone: Component = () => {
  const context = useAppContext();

  const analyze = () => {
    const parsed = parser(JSON.stringify(data));
    const normalized = normalizer(parsed);
    context.setData(normalized);
  };

  const handleClick = () => {
    setView("dashboard");
    analyze();
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
            />
            <button class="btn btn-primary" onClick={handleClick}>
              Analyze
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
