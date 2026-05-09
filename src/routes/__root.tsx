import { createRootRoute, Outlet } from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { ErrorBoundary } from "solid-js";
import { AppProvider } from "@/store/AppContext";
import { ErrorCard } from "@/components/shared/ErrorCard";

const RootLayout = () => (
  <>
    <AppProvider>
      <div class="min-h-screen flex flex-col w-full" id="app" data-testid="app">
        <div class="w-[85%] flex flex-col flex-1 max-w-7xl h-full mx-auto">
          <ErrorBoundary
            fallback={(error: Error, reset) => <ErrorCard error={error.message} reset={reset} />}
          >
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
    </AppProvider>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
