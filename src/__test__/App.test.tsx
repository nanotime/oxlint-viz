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

  it("Should enable analyze button when text is entered", async () => {
    render(() => <InputZone />, { wrapper });

    const textarea = screen.getByRole("textbox");
    const analyzeBtn = screen.getByRole("button", { name: /analyze/i });

    expect(analyzeBtn).toBeDisabled();

    await user.click(textarea);
    await user.paste("test data");

    expect(analyzeBtn).not.toBeDisabled();
  });
});
