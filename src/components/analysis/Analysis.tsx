import { Component, onMount } from "solid-js";
import { DistributionSection } from "./sections/DistributionSection";
import { StatsSection } from "./sections/StatsSection";
import { SpecificsSection } from "./sections/Specifics";
import { GranularSection } from "./sections/GranularSection";
import { DeepDiveSection } from "./sections/DeepDiveSection";
import { InsightsSection } from "./sections/InsightsSection";
import { useAppContext } from "@/store/AppContext";
import { getAnalysis } from "@/db/operations";
import { useLocation } from "@tanstack/solid-router";

export const Analysis: Component = () => {
  const context = useAppContext();
  const location = useLocation();

  // TODO: use a route guard
  onMount(async () => {
    const id = new URLSearchParams(location().search).get("id");
    if (!id) return;

    try {
      const saved = await getAnalysis(id);
      if (saved) {
        context.setData(saved.normalizedData);
        context.setPresetState({ selected: saved.preset });
      }
    } catch (e) {
      console.error("Failed to load analysis:", e);
    }
  });

  return (
    <div class="flex flex-col gap-6 py-8" data-testid="dashboard">
      <StatsSection />

      <InsightsSection />

      <DistributionSection />

      <SpecificsSection />

      <GranularSection />

      <DeepDiveSection />
    </div>
  );
};
