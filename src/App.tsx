import type { Component } from "solid-js";
import { ErrorBoundary, Show, Suspense } from "solid-js";
import { AppProvider, view } from "@/store/AppContext";
import { InputZone } from "./components/landing/InputZone";
import { Dashboard } from "./components/dashboard/Dashboard";

const ErrorCard: Component<{ error: any; reset: () => void }> = (props) => {
  return (
    <div class="card card-border shadow">
      <div class="card-body">
        <div role="alert" class="alert alert-error">
          <span>Error! {props.error.message ?? "Something happened"}</span>
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
      <div class="min-h-screen flex flex-col w-full" id="app" data-testid="app">
        <div class="w-[85%] flex flex-col flex-1 max-w-7xl h-full mx-auto">
          <ErrorBoundary fallback={(error, reset) => <ErrorCard error={error} reset={reset} />}>
            <Show when={view() === "input"}>
              <InputZone />
            </Show>

            <Show when={view() === "dashboard"}>
              <Suspense fallback="Loading...">
                <Dashboard />
              </Suspense>
            </Show>
          </ErrorBoundary>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
