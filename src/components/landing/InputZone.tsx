import { Component, createSignal } from "solid-js";
import { DataForm, AnalyzeData } from "./DataForm";
import { SEVERITY_PRESETS } from "@/model/severityConfig";
import { useAppContext } from "@/store/AppContext";
import { useNavigate } from "@tanstack/solid-router";

export const InputZone: Component = () => {
  const context = useAppContext();
  const [analyzing, setAnalyzing] = createSignal<boolean>(false);
  const navigate = useNavigate({ from: "/" });

  const handleAnalyze = async (data: AnalyzeData) => {
    setAnalyzing(true);
    try {
      await context.analyze({
        report: data.report,
        severityConfig: SEVERITY_PRESETS[data.preset],
        name: data.name,
      });
      await navigate({ to: "/analysis" });
    } catch (error) {
      context.setWorkerState({
        error: error instanceof Error ? error.message : String(error),
        done: false,
      });
    } finally {
      setAnalyzing(false);
    }
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
            <h1 class="text-xl color-accent">Oxlint Analytics - Configure and run your analysis</h1>
          </div>
          <DataForm onAnalyze={handleAnalyze} analyzing={analyzing} />
        </div>
      </div>
    </section>
  );
};
