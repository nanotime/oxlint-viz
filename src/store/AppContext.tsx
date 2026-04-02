import { createContext, createSignal, ParentComponent, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { NormalizedReport } from "@/model/output";

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
    generalToxicity: 0,
  },
  rules: {},
  hotspots: {},
};

type ViewState = "input" | "dashboard";

export const AppContext = createContext<{
  data: NormalizedReport;
  setData: SetStoreFunction<NormalizedReport>;
}>();

export const [view, setView] = createSignal<ViewState>("input");

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
