import { Component } from "solid-js";
import { StatCard } from "@/components/Charts/Stats";
import { useAppContext } from "@/store/AppContext";
import { words, capitalize } from "es-toolkit";

type Stat = { statTitle: string; stat: number };

export const Dashboard: Component = () => {
  const context = useAppContext();

  const deriveStatData = (data: Record<string, number>): Stat[] => {
    const extractedData = Object.entries(data);
    const derived = extractedData.map(([key, value]) => ({
      statTitle: capitalize(words(key).join(" ")),
      stat: value,
    }));
    return derived;
  };

  return (
    <div class="flex flex-col gap-6 py-8">
      <section class="grid grid-cols-12 gap-6" id="stats">
        <div class="col-span-12">
          <div class="flex flex-wrap gap-4">
            <StatCard stats={deriveStatData(context.data.summary)} />
            <StatCard stats={deriveStatData(context.data.distribution.severity)} />
          </div>
        </div>
      </section>

      <section class="grid grid-cols-12 gap-6" id="distribution">
        <div class="col-span-12 lg:col-span-5 bg-base-200 p-6 rounded-xl min-h-[350px]">
          <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
            Severity Distribution
          </h3>
          {/* Severity Donut Chart (40%) */}
        </div>
        <div class="col-span-12 lg:col-span-7 bg-base-200 p-6 rounded-xl min-h-[350px]">
          <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
            Categories Breakdown
          </h3>
          {/* Categories Bar Chart (60%) */}
        </div>
      </section>

      <section class="grid grid-cols-12 gap-6" id="specifics">
        <div class="col-span-12 lg:col-span-8 bg-base-200 p-6 rounded-xl min-h-[400px]">
          <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">Top 15 Rules</h3>
          {/* Top Rules Chart (70%) */}
        </div>
        <div class="col-span-12 lg:col-span-4 bg-base-200 p-6 rounded-xl min-h-[400px]">
          <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
            General Toxicity
          </h3>
          {/* Toxicity Gauge (30%) */}
        </div>
      </section>

      <section class="grid grid-cols-12 gap-6" id="granular">
        <div class="col-span-12 bg-base-200 p-6 rounded-xl min-h-[500px]">
          <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
            Files by Toxicity Score
          </h3>
          {/* Treemap (Full Width) */}
        </div>
      </section>

      <section class="grid grid-cols-12 gap-6" id="deep-dive">
        <div class="col-span-12 bg-base-200 p-6 rounded-xl min-h-[600px]">
          <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
            Heatmap Deep Dive
          </h3>
          {/* Heatmap (Full Width) */}
        </div>
      </section>
    </div>
  );
};
