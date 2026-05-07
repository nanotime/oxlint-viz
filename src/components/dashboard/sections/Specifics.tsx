import { Card } from "@/components/shared/Card";
import { Section } from "./SectionFactory";
import { TopRulesBar } from "../charts/TopRulesBar";
import { ComplexityScatter } from "../charts/ComplexityScatter";

const halfClass = "col-span-6 p-2 rounded-xl min-h-[400px]";
const mostViolatedTooltip =
  "Rules ranked by violation count. Darker bars equals more occurrences. Click a rule to filter by it.";

const Top15RulesCard = () => {
  return (
    <Card class="h-full">
      <Card.Body>
        <Card.Header tooltip={mostViolatedTooltip}>
          <h3 class="text-sm font-bold uppercase tracking-wider">Most Violated Rules (Top 15)</h3>
        </Card.Header>
        <h4 class="text-sm text-base-content/70">
          Horizontal bars show rule frequency — darker bars indicate higher occurrences
        </h4>
        <div class="h-full w-full">
          <TopRulesBar />
        </div>
      </Card.Body>
    </Card>
  );
};

const ComplexityScatterCard = () => {
  return (
    <Card class="h-full">
      <Card.Body>
        <Card.Header>
          <h3 class="text-sm font-bold uppercase tracking-wider">Complexity vs Errors in files</h3>
        </Card.Header>
        <h4 class="text-sm text-base-content/70">
          X axis shows complexity - Y axis shows errors - Bubbles represent files/functions - Bubble
          size total issues
        </h4>
        <div class="h-full w-full">
          <ComplexityScatter />
        </div>
      </Card.Body>
    </Card>
  );
};

export const SpecificsSection = () => {
  return (
    <Section id="section-specific">
      <Section.Left class={halfClass}>
        <Top15RulesCard />
      </Section.Left>

      <Section.Right class={halfClass}>
        <ComplexityScatterCard />
      </Section.Right>
    </Section>
  );
};
