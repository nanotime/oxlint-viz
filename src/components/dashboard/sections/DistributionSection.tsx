import { Section } from "./SectionFactory";

const leftClass = "col-span-12 lg:col-span-5 bg-base-200 p-6 rounded-xl min-h-[350px]";
const rightClass = "col-span-12 lg:col-span-7 bg-base-200 p-6 rounded-xl min-h-[350px]";

export const DistributionSection = () => (
  <Section id="section-distribution">
    <Section.Left class={leftClass}>
      <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
        Severity Distribution
      </h3>
    </Section.Left>

    <Section.Right class={rightClass}>
      <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
        Categories Breakdown
      </h3>
    </Section.Right>
  </Section>
);
