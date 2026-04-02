import { Section } from "./SectionFactory";

export const GranularSection = () => {
  return (
    <Section id="section-granular">
      <Section.Left class="col-span-12 bg-base-200 p-6 rounded-xl min-h-[500px]">
        <h3 class="text-sm font-bold opacity-50 mb-4 uppercase tracking-wider">
          Files by Toxicity Score
        </h3>
      </Section.Left>
    </Section>
  );
};
