import { describe, expect, it } from "vite-plus/test";
import { render, screen } from "@solidjs/testing-library";
import { AppProvider } from "@/store/AppContext";
import { InputZone } from "@/components/landing/InputZone";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

const wrapper = (props: any) => <AppProvider {...props} />;

describe("App", () => {
  it("Should render the input zone correctly", () => {
    render(() => <InputZone />, { wrapper });

    expect(screen.getByTestId("input-zone")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /analyze/i })).toBeInTheDocument();
  });

  it("Should disable analyze button when only textarea has content", async () => {
    render(() => <InputZone />, { wrapper });

    const textarea = screen.getByTestId("oxlint-analysis-input");
    const analyzeBtn = screen.getByRole("button", { name: /analyze/i });

    expect(analyzeBtn).toBeDisabled();

    await user.click(textarea);
    await user.paste("test data");

    expect(analyzeBtn).toBeDisabled();
  });

  it("Should enable analyze button when both name and text are entered", async () => {
    render(() => <InputZone />, { wrapper });

    const nameInput = screen.getByRole("textbox", { name: /analysis name/i });
    const textarea = screen.getByTestId("oxlint-analysis-input");
    const analyzeBtn = screen.getByRole("button", { name: /analyze/i });

    expect(analyzeBtn).toBeDisabled();

    await user.click(nameInput);
    await user.paste("My Analysis");
    await user.click(textarea);
    await user.paste("test data");

    expect(analyzeBtn).not.toBeDisabled();
  });

  it("Should render the analysis name input with correct attributes", () => {
    render(() => <InputZone />, { wrapper });

    const nameInput = screen.getByRole("textbox", { name: /analysis name/i });
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute("placeholder", "e.g., Project Alpha - April 2024");
    expect(nameInput).toHaveAttribute("maxlength", "100");
    expect(nameInput).toHaveAttribute("required");
    expect(nameInput).toHaveAttribute("aria-required", "true");
  });
});
