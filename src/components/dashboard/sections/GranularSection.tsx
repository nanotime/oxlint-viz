import { Card } from "@/components/shared/Card";
import { Section } from "./SectionFactory";
import { TreeByToxicity } from "../charts/TreeByToxicity";

export const GranularSection = () => {
  return (
    <Section id="section-granular">
      <Section.Left class="col-span-12 p-2 rounded-xl min-h-[500px]">
        <Card class="h-full">
          <Card.Body>
            <Card.Header tooltip="Treemap visualization where block size and color indicate violation density">
              <h3 class="text-sm font-bold uppercase tracking-wider">Files by Toxicity Score</h3>
            </Card.Header>
            <h4 class="text-sm text-base-content/70 mb-2">
              Larger, redder blocks indicate files with the highest toxicity scores
            </h4>
            <div class="w-full h-full">
              <TreeByToxicity />
            </div>
          </Card.Body>
        </Card>
      </Section.Left>
    </Section>
  );
};
