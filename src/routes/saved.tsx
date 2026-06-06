import { createFileRoute } from "@tanstack/solid-router";
import { SavedAnalyses } from "@/components/saved/SavedAnalyses";

export const Route = createFileRoute("/saved")({
  component: SavedAnalyses,
});
