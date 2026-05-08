import { Component, Show } from "solid-js";
import { useAppContext } from "@/store/AppContext";
import { DistributionSection } from "./sections/DistributionSection";
import { StatsSection } from "./sections/StatsSection";
import { SpecificsSection } from "./sections/Specifics";
import { GranularSection } from "./sections/GranularSection";
import { DeepDiveSection } from "./sections/DeepDiveSection";
import { InsightsSection } from "./sections/InsightsSection";

export const Analysis: Component = () => {
  const context = useAppContext();

  return (
    <div class="flex flex-col gap-6 py-8" data-testid="dashboard">
      <Show when={context.workerDone()} fallback={<>loading...</>}>
        <StatsSection />

        <InsightsSection />

        <DistributionSection />

        <SpecificsSection />

        <GranularSection />

        <DeepDiveSection />
      </Show>
    </div>
  );
};
