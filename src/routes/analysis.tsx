import { createFileRoute } from "@tanstack/solid-router";
import { Analysis } from "@/components/analysis/Analysis";

export const Route = createFileRoute("/analysis")({
  component: Analysis,
});
