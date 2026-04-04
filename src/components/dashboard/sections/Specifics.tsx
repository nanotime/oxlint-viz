import { Card } from "@/components/shared/Card";
import { Section } from "./SectionFactory";

const leftClass = "col-span-12 lg:col-span-8 p-2 rounded-xl min-h-[400px]";
const rightClass = "col-span-12 lg:col-span-4 p-2 rounded-xl min-h-[400px]";

export const SpecificsSection = () => {
  return (
    <Section id="section-specific">
      <Section.Left class={leftClass}>
        <Card class="h-full">
          <Card.Body>
            <Card.Header>
              <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
                Top 15 Rules
              </h3>
            </Card.Header>
          </Card.Body>
        </Card>
      </Section.Left>

      <Section.Right class={rightClass}>
        <Card class="h-full">
          <Card.Body>
            <Card.Header>
              <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
                General Toxicity
              </h3>
            </Card.Header>
          </Card.Body>
        </Card>
      </Section.Right>
    </Section>
  );
};
