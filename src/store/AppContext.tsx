import { createContext, ParentComponent, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { NormalizedReport } from "@/model/output";
import { PresetType, SEVERITY_PRESETS, SeverityConfig } from "@/model/severityConfig";
import { WorkerMessage } from "@/logic/worker";

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

interface WorkerState {
  done: boolean;
  error?: string | null;
}

interface PresetState {
  selected: PresetType;
}

interface AppContextType {
  data: NormalizedReport;
  setData: SetStoreFunction<NormalizedReport>;
  worker: Worker;
  workerState: WorkerState;
  setWorkerState: SetStoreFunction<WorkerState>;
  presetState: PresetState;
  setPresetState: SetStoreFunction<PresetState>;
  severityConfig: () => SeverityConfig;
}

export const AppContext = createContext<AppContextType>();

const createWorker = () => {
  return new Worker(new URL("../logic/worker", import.meta.url), { type: "module" });
};

export const AppProvider: ParentComponent = (props) => {
  const [data, setData] = createStore<NormalizedReport>(baseStore);
  const [workerState, setWorkerState] = createStore<WorkerState>({
    done: false,
    error: null,
  });
  const [presetState, setPresetState] = createStore<PresetState>({
    selected: "cleanCode",
  });

  const severityConfig = (): SeverityConfig => SEVERITY_PRESETS[presetState.selected];

  const worker = createWorker();

  worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
    console.log("message", e);
    if (!e.data.success) {
      setWorkerState({ error: e.data.error.message, done: false });
      return;
    }

    setData(e.data.data);
    setWorkerState({ done: true });
  };

  const value: AppContextType = {
    data,
    setData,
    worker,
    workerState,
    setWorkerState,
    presetState,
    setPresetState,
    severityConfig,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return ctx;
};
