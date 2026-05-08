import { createRootRoute, Outlet } from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { Component, ErrorBoundary } from "solid-js";
import { AppProvider } from "@/store/AppContext";

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

const RootLayout = () => (
  <>
    <AppProvider>
      <div class="min-h-screen flex flex-col w-full" id="app" data-testid="app">
        <div class="w-[85%] flex flex-col flex-1 max-w-7xl h-full mx-auto">
          <ErrorBoundary fallback={(error, reset) => <ErrorCard error={error} reset={reset} />}>
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
    </AppProvider>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
