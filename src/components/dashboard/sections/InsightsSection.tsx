import { useAppContext } from "@/store/AppContext";
import { analyzeInsights } from "@/logic/analyzeInsights";

export const InsightsSection = () => {
  const context = useAppContext();
  const insights = analyzeInsights(context.data);

  return (
    <section id="insights">
      <div>
        <h3>Health</h3>
        <p>{insights.health}</p>
      </div>
      <div>
        <h3>Priority</h3>
        <p>{insights.priority}</p>
      </div>
      <div>
        <h3>Impact</h3>
        <p>{insights.impact}</p>
      </div>
    </section>
  );
};
