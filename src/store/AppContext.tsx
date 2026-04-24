import { createContext, createSignal, ParentComponent, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { NormalizedReport } from "@/model/output";
import { PresetType, SEVERITY_PRESETS, SeverityConfig } from "@/model/severityConfig";

export const baseStore: NormalizedReport = {
  summary: {
    totalIssues: 0,
    totalFiles: 0,
    filesWithIssues: 0,
  },
  distribution: {
    severity: {
      error: 0,
      warning: 0,
      advice: 0,
    },
    categories: {},
  },
  rules: {},
  hotspots: {},
};

type ViewState = "input" | "dashboard";

export const AppContext = createContext<{
  data: NormalizedReport;
  setData: SetStoreFunction<NormalizedReport>;
}>();

const WorkerInstance = () => {
  const worker = new Worker(new URL("../logic/worker", import.meta.url), { type: "module" });
  return worker;
};

export const worker = WorkerInstance();
export const [view, setView] = createSignal<ViewState>("input");
export const [workerDone, setWorkerDone] = createSignal(false);
export const [selectedPreset, setSelectedPreset] = createSignal<PresetType>("cleanCode");
export const severityConfig = (): SeverityConfig => SEVERITY_PRESETS[selectedPreset()];

export const AppProvider: ParentComponent = (props) => {
  const [data, setData] = createStore(baseStore);
  return <AppContext.Provider value={{ data, setData }}>{props.children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("No context found");
  }

  return ctx;
};
