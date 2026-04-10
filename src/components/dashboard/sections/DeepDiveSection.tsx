import { Card } from "@/components/shared/Card";
import { Section } from "./SectionFactory";
import { FilesHeatmap } from "../charts/FilesHeatmap";

export const DeepDiveSection = () => {
  return (
    <Section id="deep-dive">
      <Section.Left class="col-span-12 p-2 rounded-xl min-h-[600px]">
        <Card class="h-full">
          <Card.Body>
            <Card.Header tooltip="Cross-analysis of top 20 files against violation categories">
              <h3 class="text-sm font-bold uppercase tracking-wider">Heatmap Deep Dive</h3>
            </Card.Header>
            <h4 class="text-sm text-base-content/70 mb-2">
              Color intensity shows violation concentration per file-category pair
            </h4>
            <div class="h-full w-full">
              <FilesHeatmap />
            </div>
          </Card.Body>
        </Card>
      </Section.Left>
    </Section>
  );
};
