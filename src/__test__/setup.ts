import "@testing-library/jest-dom";
import { vi } from "vite-plus/test";

class MockWorker {
  postMessage = vi.fn();
  onmessage: ((ev: MessageEvent) => void) | null = null;
  terminate = vi.fn();
}

vi.stubGlobal("Worker", MockWorker);

vi.hoisted(() => {
  const MockResizeObserver = class ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  };
  (global as Record<string, unknown>).ResizeObserver = MockResizeObserver;
});
