import { Card } from "@/components/shared/Card";
import { Section } from "./SectionFactory";
import { TopRulesBar } from "../charts/TopRulesBar";

const fullClass = "col-span-12 p-2 rounded-xl min-h-[400px]";

export const SpecificsSection = () => {
  return (
    <Section id="section-specific">
      <Section.Left class={fullClass}>
        <Card class="h-full">
          <Card.Body>
            <Card.Header tooltip="Rules ranked by violation count. Darker bars equals more occurrences. Click a rule to filter by it.">
              <h3 class="text-sm font-bold uppercase tracking-wider">
                Most Violated Rules (Top 15)
              </h3>
            </Card.Header>
            <h4 class="text-sm text-base-content/70">
              Horizontal bars show rule frequency — darker bars indicate higher occurrences
            </h4>
            <div class="h-full w-full">
              <TopRulesBar />
            </div>
          </Card.Body>
        </Card>
      </Section.Left>
    </Section>
  );
};
