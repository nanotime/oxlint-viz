import {
  Accessor,
  createContext,
  createSignal,
  ParentComponent,
  Setter,
  useContext,
} from "solid-js";
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

type AppContextType = {
  data: NormalizedReport;
  setData: SetStoreFunction<NormalizedReport>;
  worker: Worker;
  workerDone: () => boolean;
  setWorkerDone: (v: boolean) => void;
  workerError: Accessor<string | null>;
  setWorkerError: Setter<string | null>;
  selectedPreset: () => PresetType;
  setSelectedPreset: (v: PresetType) => void;
  severityConfig: () => SeverityConfig;
};

export const AppContext = createContext<AppContextType>();

const createWorker = () => {
  return new Worker(new URL("../logic/worker", import.meta.url), { type: "module" });
};

export const AppProvider: ParentComponent = (props) => {
  const [data, setData] = createStore<NormalizedReport>(baseStore);
  const [workerDone, setWorkerDone] = createSignal(false);
  const [selectedPreset, setSelectedPreset] = createSignal<PresetType>("cleanCode");
  const [workerError, setWorkerError] = createSignal<string | null>(null);

  const severityConfig = (): SeverityConfig => SEVERITY_PRESETS[selectedPreset()];

  const worker = createWorker();

  worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
    console.log("message", e);
    if (!e.data.success) {
      setWorkerError(e.data.error.message);
      setWorkerDone(false);
      return;
    }

    setData(e.data.data);
    setWorkerDone(true);
  };

  const value: AppContextType = {
    data,
    setData,
    worker,
    workerDone,
    setWorkerDone,
    workerError,
    setWorkerError,
    selectedPreset,
    setSelectedPreset,
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
