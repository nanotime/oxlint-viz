import "@testing-library/jest-dom";
import { vi } from "vite-plus/test";

vi.hoisted(() => {
  const MockResizeObserver = class ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  };
  (global as Record<string, unknown>).ResizeObserver = MockResizeObserver;
});
