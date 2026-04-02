import { Component } from "solid-js";
import { DistributionSection } from "./sections/DistributionSection";
import { StatsSection } from "./sections/StatsSection";
import { SpecificsSection } from "./sections/Specifics";
import { GranularSection } from "./sections/GranularSection";
import { DeepDiveSection } from "./sections/DeepDiveSection";

export const Dashboard: Component = () => {
  return (
    <div class="flex flex-col gap-6 py-8" data-testid="dashboard">
      <StatsSection />

      <DistributionSection />

      <SpecificsSection />

      <GranularSection />

      <DeepDiveSection />
    </div>
  );
};
