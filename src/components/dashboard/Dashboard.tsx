import { Component, Show } from "solid-js";
import { worker, useAppContext, setWorkerDone, workerDone } from "@/store/AppContext";
import { DistributionSection } from "./sections/DistributionSection";
import { StatsSection } from "./sections/StatsSection";
import { SpecificsSection } from "./sections/Specifics";
import { GranularSection } from "./sections/GranularSection";
import { DeepDiveSection } from "./sections/DeepDiveSection";
import { NormalizedReport } from "@/model/output";

export const Dashboard: Component = () => {
  const context = useAppContext();

  worker.onmessage = (e: MessageEvent<NormalizedReport>) => {
    context.setData(e.data);
    setWorkerDone(true);
  };

  return (
    <div class="flex flex-col gap-6 py-8" data-testid="dashboard">
      <Show when={workerDone()} fallback={<>loading...</>}>
        <StatsSection />

        <DistributionSection />

        <SpecificsSection />

        <GranularSection />

        <DeepDiveSection />
      </Show>
    </div>
  );
};
