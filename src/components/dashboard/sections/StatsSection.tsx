import { createMemo, JSX } from "solid-js";
import { useAppContext } from "@/store/AppContext";
import { capitalize, words } from "es-toolkit";
import { StatCard } from "../charts/Stats";
import { OctagonX, TriangleAlert, Info } from "lucide-solid";

type Stat = { statTitle: string; stat: number };
type SeverityKey = "error" | "warning" | "advice";

export const StatsSection = () => {
  const context = useAppContext();
  const iconMap: Record<SeverityKey, JSX.Element> = {
    error: <OctagonX />,
    warning: <TriangleAlert />,
    advice: <Info />,
  };

  const derivedSummary = (data: Record<string, number>): Stat[] => {
    const extractedData = Object.entries(data);
    const derived = extractedData.map(([key, value]) => ({
      statTitle: capitalize(words(key).join(" ")),
      stat: value,
    }));
    return derived;
  };

  const descParser = (title: string) => {
    const ttl = title.toLowerCase();
    if (ttl === "error") return "Error diagnostics count";
    if (ttl === "warning") return "Warning diagnostic count";
    if (ttl === "advice") return "Advice diagnostic count";
    return "";
  };

  const derivedSeverity = (data: Record<SeverityKey, number>): Stat[] => {
    const extractedData = Object.entries(data);
    const derived = extractedData.map(([key, value]) => {
      const statTitle = capitalize(words(key).join(" "));
      return {
        statTitle,
        stat: value,
        icon: iconMap[key as SeverityKey],
        desc: descParser(statTitle),
      };
    });
    return derived;
  };

  const summaryStats = createMemo(() => derivedSummary(context.data.summary));
  const severityStats = createMemo(() => derivedSeverity(context.data.distribution.severity));

  return (
    <section class="grid grid-cols-12 gap-6" id="stats">
      <div class="col-span-12">
        <div class="flex flex-wrap gap-4">
          <StatCard stats={summaryStats()} />
          <StatCard stats={severityStats()} />
        </div>
      </div>
    </section>
  );
};
