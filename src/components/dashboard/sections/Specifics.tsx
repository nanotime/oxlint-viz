import { Section } from "./SectionFactory";

const leftClass = "col-span-12 lg:col-span-8 bg-base-200 p-6 rounded-xl min-h-[400px]";
const rightClass = "col-span-12 lg:col-span-4 bg-base-200 p-6 rounded-xl min-h-[400px]";

export const SpecificsSection = () => {
  return (
    <Section id="section-specific">
      <Section.Left class={leftClass}>
        <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">Top 15 Rules</h3>
      </Section.Left>

      <Section.Right class={rightClass}>
        <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">General Toxicity</h3>
      </Section.Right>
    </Section>
  );
};
