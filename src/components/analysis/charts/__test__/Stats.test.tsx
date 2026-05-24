import { describe, expect, it } from "vite-plus/test";
import { render } from "@solidjs/testing-library";
import { StatCard } from "../Stats";

describe("StatCard Component", () => {
  it("should render with children", () => {
    const { getByText } = render(() => (
      <StatCard
        stats={[
          { statTitle: "Total Issues", stat: 100 },
          { statTitle: "Files", stat: 50 },
        ]}
      />
    ));

    expect(getByText("Total Issues")).toBeInTheDocument();
    expect(getByText("100")).toBeInTheDocument();
    expect(getByText("Files")).toBeInTheDocument();
    expect(getByText("50")).toBeInTheDocument();
  });

  it("should render multiple stats", () => {
    const { getByText } = render(() => (
      <StatCard
        stats={[
          { statTitle: "Issues", stat: 100 },
          { statTitle: "Warnings", stat: 30 },
          { statTitle: "Advice", stat: 20 },
        ]}
      />
    ));

    expect(getByText("Issues")).toBeInTheDocument();
    expect(getByText("Warnings")).toBeInTheDocument();
    expect(getByText("Advice")).toBeInTheDocument();
  });

  it("should render description when provided", () => {
    const { getByText } = render(() => (
      <StatCard stats={[{ statTitle: "Coverage", stat: 85, desc: "Above target" }]} />
    ));

    expect(getByText("Coverage")).toBeInTheDocument();
    expect(getByText("85")).toBeInTheDocument();
    expect(getByText("Above target")).toBeInTheDocument();
  });

  it("should not render description when not provided", () => {
    const { queryByText } = render(() => <StatCard stats={[{ statTitle: "Issues", stat: 50 }]} />);

    expect(queryByText("Above target")).not.toBeInTheDocument();
  });

  it("should apply DaisyUI stats class", () => {
    const { container } = render(() => <StatCard stats={[{ statTitle: "Test", stat: 1 }]} />);

    expect(container.querySelector(".stats")).toBeInTheDocument();
  });

  it("should render stat-figure when icon is provided", () => {
    const _TestIcon = () => <span data-testid="icon">Icon</span>;
    const { getByTestId } = render(() => (
      <StatCard
        stats={[
          {
            statTitle: "With Icon",
            stat: 10,
            icon: <span data-testid="icon">Icon</span>,
          },
        ]}
      />
    ));

    expect(getByTestId("icon")).toBeInTheDocument();
    expect(document.querySelector(".stat-figure")).toBeInTheDocument();
  });

  it("should not render stat-figure when icon is not provided", () => {
    const { queryByTestId } = render(() => (
      <StatCard stats={[{ statTitle: "No Icon", stat: 5 }]} />
    ));

    expect(queryByTestId("icon")).not.toBeInTheDocument();
  });

  it("should handle empty stats array", () => {
    const { container } = render(() => <StatCard stats={[]} />);

    expect(container.querySelector(".stats")).toBeInTheDocument();
    expect(container.querySelector(".stat")).not.toBeInTheDocument();
  });
});
