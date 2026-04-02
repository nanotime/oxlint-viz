import type { Component } from "solid-js";
import { ErrorBoundary, Show, Suspense } from "solid-js";
import { AppProvider, view } from "@/store/AppContext";
import { InputZone } from "./components/InputZone";
import { Dashboard } from "./components/Dashboard";

const ErrorCard: Component<{ error: any; reset: () => void }> = (props) => {
  return (
    <div class="card card-border shadow">
      <div class="card-body">
        <div role="alert" class="alert alert-error">
          <span>Error! {props.error.message ?? "Somethhing happened"}</span>
        </div>
      </div>
      <div class="card-actions">
        <button class="btn btn-neutral" onClick={props.reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

const App: Component = () => {
  return (
    <AppProvider>
      <div class="min-h-screen flex flex-col w-full">
        <div class="w-[85%] flex flex-col flex-1 max-w-7xl h-full mx-auto">
          <Show when={view() === "input"}>
            <ErrorBoundary fallback={(error, reset) => <ErrorCard error={error} reset={reset} />}>
              <InputZone />
            </ErrorBoundary>
          </Show>

          <Show when={view() === "dashboard"}>
            <Suspense fallback="Loading...">
              <Dashboard />
            </Suspense>
          </Show>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
