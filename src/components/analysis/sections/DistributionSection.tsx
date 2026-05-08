import { Card } from "@/components/shared/Card";
import { Section } from "./SectionFactory";
import { SeverityDonut } from "../charts/SeverityDonut";
import { CategoriesRoseChart } from "../charts/CategoriesRoseChart";

const leftClass = "col-span-12 lg:col-span-5 p-2 rounded-xl min-h-[350px]";
const rightClass = "col-span-12 lg:col-span-7 p-2 rounded-xl min-h-[350px]";

export const DistributionSection = () => (
  <Section id="section-distribution">
    <Section.Left class={leftClass}>
      <Card class="h-full">
        <Card.Body>
          <Card.Header tooltip="Proportion of issues classified by severity level">
            <h3 class="text-sm font-bold uppercase tracking-wider">Severity Distribution</h3>
          </Card.Header>
          <h4 class="text-sm text-base-content/70 mb-2">
            Donut chart showing error vs warning breakdown
          </h4>
          <div class="h-full w-full">
            <SeverityDonut />
          </div>
        </Card.Body>
      </Card>
    </Section.Left>

    <Section.Right class={rightClass}>
      <Card class="h-full">
        <Card.Body>
          <Card.Header tooltip="Issues grouped by linting category (correctness, style, performance)">
            <h3 class="text-sm font-bold uppercase tracking-wider">Categories Breakdown</h3>
          </Card.Header>
          <h4 class="text-sm text-base-content/70 mb-2">
            Rose chart showing issue count per category
          </h4>
          <div class="h-full w-full">
            <CategoriesRoseChart />
          </div>
        </Card.Body>
      </Card>
    </Section.Right>
  </Section>
);
