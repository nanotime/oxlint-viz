import { describe, expect, it } from "vite-plus/test";
import { render } from "@solidjs/testing-library";
import { Card } from "../Card";

describe("Card Component", () => {
  it("Should render with children", () => {
    const { getByText } = render(() => (
      <Card>
        <Card.Header>Title</Card.Header>
        <Card.Body>Content</Card.Body>
        <Card.Actions>
          <button>Action</button>
        </Card.Actions>
      </Card>
    ));

    expect(getByText("Title")).toBeInTheDocument();
    expect(getByText("Content")).toBeInTheDocument();
    expect(getByText("Action")).toBeInTheDocument();
  });

  it("Should apply custom classes", () => {
    const { container } = render(() => (
      <Card class="custom-card">
        <Card.Header class="custom-header">Title</Card.Header>
        <Card.Body class="custom-body">Content</Card.Body>
        <Card.Actions class="custom-actions">
          <button>Action</button>
        </Card.Actions>
      </Card>
    ));

    expect(container.firstChild).toHaveClass("custom-card");
    expect(container.querySelector(".card-title")).toHaveClass("custom-header");
    expect(container.querySelector(".card-body")).toHaveClass("custom-body");
    expect(container.querySelector(".card-actions")).toHaveClass("custom-actions");
  });
});
