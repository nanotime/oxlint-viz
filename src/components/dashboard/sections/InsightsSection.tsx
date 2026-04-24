import { Component } from "solid-js";
import { useAppContext } from "@/store/AppContext";
import { analyzeInsights } from "@/logic/analyzeInsights";
import { Card } from "@/components/shared/Card";
import { Flag, Zap } from "lucide-solid";

const iconMap = {
  priority: <Flag class="size-5" />,
  impact: <Zap class="size-5" />,
} as const;

const titleMap = {
  priority: "Priority",
  impact: "Impact",
} as const;

export const InsightsSection: Component = () => {
  const context = useAppContext();
  const insights = analyzeInsights(context.data);

  const insightEntries = [
    { key: "priority" as const, value: insights.priority },
    { key: "impact" as const, value: insights.impact },
  ];

  return (
    <section id="insights">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insightEntries.map(({ key, value }) => (
          <Card>
            <Card.Body class="flex flex-row items-center gap-4">
              <div class="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                {iconMap[key]}
              </div>
              <div class="flex-1 min-w-0">
                <Card.Header class="p-0">
                  <h3 class="text-sm font-bold uppercase tracking-wider">{titleMap[key]}</h3>
                </Card.Header>
                <p class="text-base-content/70 text-sm mt-1 truncate">{value}</p>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </section>
  );
};
