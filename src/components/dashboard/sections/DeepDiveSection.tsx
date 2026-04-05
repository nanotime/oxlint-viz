import { Card } from "@/components/shared/Card";
import { Section } from "./SectionFactory";
import { FilesHeatmap } from "../charts/FilesHeatmap";

export const DeepDiveSection = () => {
  return (
    <Section id="deep-dive">
      <Section.Left class="col-span-12 p-2 rounded-xl min-h-[600px]">
        <Card class="h-full">
          <Card.Body>
            <Card.Header>
              <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
                Heatmap Deep Dive
              </h3>
            </Card.Header>

            <div class="h-full w-full">
              <FilesHeatmap />
            </div>
          </Card.Body>
        </Card>
      </Section.Left>
    </Section>
  );
};
