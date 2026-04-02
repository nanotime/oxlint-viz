import { describe, expect, it } from "vite-plus/test";
import { render } from "@solidjs/testing-library";
import { DistributionSection } from "../DistributionSection";

describe("DistributionSection Component", () => {
  it("Should render the correct section headers", () => {
    const { getByText } = render(() => <DistributionSection />);

    expect(getByText(/Severity Distribution/i)).toBeInTheDocument();
    expect(getByText(/Categories Breakdown/i)).toBeInTheDocument();
  });

  it("Should be wrapped in the correct section id", () => {
    const { container } = render(() => <DistributionSection />);
    const section = container.querySelector("#section-distribution");
    expect(section).toBeInTheDocument();
  });
});
