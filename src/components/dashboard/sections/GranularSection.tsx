import { Card } from "@/components/shared/Card";
import { Section } from "./SectionFactory";

export const GranularSection = () => {
  return (
    <Section id="section-granular">
      <Section.Left class="col-span-12 p-2 rounded-xl min-h-[500px]">
        <Card class="h-full">
          <Card.Body>
            <Card.Header>
              <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
                Files by Toxicity Score
              </h3>
            </Card.Header>
          </Card.Body>
        </Card>
      </Section.Left>
    </Section>
  );
};
