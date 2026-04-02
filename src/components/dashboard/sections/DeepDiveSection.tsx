import { Section } from "./SectionFactory";

export const DeepDiveSection = () => {
  return (
    <Section id="deep-dive">
      <Section.Left class="col-span-12 bg-base-200 p-6 rounded-xl min-h-[600px]">
        <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
          Heatmap Deep Dive
        </h3>
      </Section.Left>
    </Section>
  );
};
