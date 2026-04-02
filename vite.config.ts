import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite-plus";
import solidPlugin from "vite-plugin-solid";
import devtools from "solid-devtools/vite";
import path from "node:path";

const isTest = !!process.env.VITEST;

export default defineConfig({
  staged: {
    "*.{js,ts,tsx}": "vp check",
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  plugins: [!isTest && devtools(), solidPlugin({ hot: !isTest }), tailwindcss()].filter(
    Boolean,
  ) as any,
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__test__/setup.ts"],
    coverage: {
      provider: "v8",
    },
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
});
