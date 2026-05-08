import { describe, expect, it } from "vite-plus/test";
import { render } from "@solidjs/testing-library";
import { Section } from "../SectionFactory";

describe("SectionFactory (Section Component)", () => {
  it("Should render children and apply id", () => {
    const { getByTestId } = render(() => (
      <Section id="test-section" class="custom-grid">
        <div data-testid="child">Content</div>
      </Section>
    ));

    const section = document.getElementById("test-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("custom-grid");
    expect(getByTestId("child")).toBeInTheDocument();
  });

  it("Should render Left and Right sub-components with classes", () => {
    const { getByText } = render(() => (
      <Section id="test-factory">
        <Section.Left class="left-class">Left content</Section.Left>
        <Section.Right class="right-class">Right content</Section.Right>
      </Section>
    ));

    const left = getByText("Left content");
    const right = getByText("Right content");

    expect(left).toHaveClass("left-class");
    expect(right).toHaveClass("right-class");
  });
});
