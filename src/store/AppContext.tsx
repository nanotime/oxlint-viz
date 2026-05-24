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

interface WorkerIncomingMsg {
  report: string;
  severityConfig: SeverityConfig;
  name: string;
}

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
  analyze: (payload: WorkerIncomingMsg) => Promise<NormalizedReport>;
  presetState: PresetState;
  setPresetState: SetStoreFunction<PresetState>;
  severityConfig: () => SeverityConfig;
}

export const AppContext = createContext<AppContextType>();

const createWorker = () => {
  return new Worker(new URL("../logic/worker", import.meta.url), { type: "module" });
};

export const AppProvider: ParentComponent = (props) => {
  // State init
  const [data, setData] = createStore<NormalizedReport>(baseStore);
  const [workerState, setWorkerState] = createStore<WorkerState>({
    done: false,
    error: null,
  });
  const [presetState, setPresetState] = createStore<PresetState>({
    selected: "cleanCode",
  });

  // Worker pending resolver
  let pending: {
    resolve: (data: NormalizedReport) => void;
    reject: (error: Error) => void;
  } | null = null;

  // Worker init
  const severityConfig = (): SeverityConfig => SEVERITY_PRESETS[presetState.selected];
  const worker = createWorker();

  worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
    if (!pending) return;

    if (!e.data.success) {
      setWorkerState({ error: e.data.error.message, done: false });
      pending.reject(e.data.error);
      pending = null;
      return;
    }

    setData(e.data.data);
    pending.resolve(e.data.data);
    pending = null;
    setWorkerState({ done: true });
  };

  // Analyze promise wrapper
  const analyze = (payload: WorkerIncomingMsg): Promise<NormalizedReport> => {
    if (pending) throw new Error("Analysis already in progress");
    return new Promise((resolve, reject) => {
      pending = { resolve, reject };
      setWorkerState({ done: false, error: null });
      worker.postMessage(payload);
    });
  };

  const value: AppContextType = {
    analyze,
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
