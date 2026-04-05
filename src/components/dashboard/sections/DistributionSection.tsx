import { Card } from "@/components/shared/Card";
import { Section } from "./SectionFactory";
import { SeverityDonut } from "../charts/SeverityDonut";
import { CategoriesBarChart } from "../charts/CategorieBarChart";

const leftClass = "col-span-12 lg:col-span-5 p-2 rounded-xl min-h-[350px]";
const rightClass = "col-span-12 lg:col-span-7 p-2 rounded-xl min-h-[350px]";

export const DistributionSection = () => (
  <Section id="section-distribution">
    <Section.Left class={leftClass}>
      <Card class="h-full">
        <Card.Body>
          <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
            Severity Distribution
          </h3>
          <div class="h-full w-full">
            <SeverityDonut />
          </div>
        </Card.Body>
      </Card>
    </Section.Left>

    <Section.Right class={rightClass}>
      <Card class="h-full">
        <Card.Body>
          <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
            Categories Breakdown
          </h3>
          <div class="h-full w-full">
            <CategoriesBarChart />
          </div>
        </Card.Body>
      </Card>
    </Section.Right>
  </Section>
);
