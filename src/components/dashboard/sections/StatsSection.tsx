import { useAppContext } from "@/store/AppContext";
import { capitalize, words } from "es-toolkit";
import { StatCard } from "../charts/Stats";

type Stat = { statTitle: string; stat: number };

export const StatsSection = () => {
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
    <section class="grid grid-cols-12 gap-6" id="stats">
      <div class="col-span-12">
        <div class="flex flex-wrap gap-4">
          <StatCard stats={deriveStatData(context.data.summary)} />
          <StatCard stats={deriveStatData(context.data.distribution.severity)} />
        </div>
      </div>
    </section>
  );
};
