import { describe, expect, it, vi } from "vite-plus/test";
import { render, screen } from "@solidjs/testing-library";
import { AppProvider } from "@/store/AppContext";
import { DataForm } from "../DataForm";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

const wrapper = (props: any) => <AppProvider {...props} />;

describe("DataForm", () => {
  it("Should render all form fields", () => {
    const onAnalyze = vi.fn();
    render(() => <DataForm onAnalyze={onAnalyze} analyzing={() => false} />, { wrapper });

    expect(screen.getByRole("textbox", { name: /analysis name/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByTestId("oxlint-analysis-input")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /analyze/i })).toBeInTheDocument();
  });

  it("Should disable submit button when name is empty", async () => {
    const onAnalyze = vi.fn();
    render(() => <DataForm onAnalyze={onAnalyze} analyzing={() => false} />, { wrapper });

    const textarea = screen.getByTestId("oxlint-analysis-input");
    const submitBtn = screen.getByRole("button", { name: /analyze/i });

    expect(submitBtn).toBeDisabled();

    await user.click(textarea);
    await user.paste("test data");

    expect(submitBtn).toBeDisabled();
    expect(onAnalyze).not.toHaveBeenCalled();
  });

  it("Should disable submit button when report is empty", async () => {
    const onAnalyze = vi.fn();
    render(() => <DataForm onAnalyze={onAnalyze} analyzing={() => false} />, { wrapper });

    const nameInput = screen.getByRole("textbox", { name: /analysis name/i });
    const submitBtn = screen.getByRole("button", { name: /analyze/i });

    expect(submitBtn).toBeDisabled();

    await user.click(nameInput);
    await user.paste("My Analysis");

    expect(submitBtn).toBeDisabled();
    expect(onAnalyze).not.toHaveBeenCalled();
  });

  it("Should enable submit button when both fields have content", async () => {
    const onAnalyze = vi.fn();
    render(() => <DataForm onAnalyze={onAnalyze} analyzing={() => false} />, { wrapper });

    const nameInput = screen.getByRole("textbox", { name: /analysis name/i });
    const textarea = screen.getByTestId("oxlint-analysis-input");
    const submitBtn = screen.getByRole("button", { name: /analyze/i });

    expect(submitBtn).toBeDisabled();

    await user.click(nameInput);
    await user.paste("My Analysis");
    await user.click(textarea);
    await user.paste("test data");

    expect(submitBtn).not.toBeDisabled();
  });

  it("Should call onAnalyze with correct data on submit", async () => {
    const onAnalyze = vi.fn();
    render(() => <DataForm onAnalyze={onAnalyze} analyzing={() => false} />, { wrapper });

    const nameInput = screen.getByRole("textbox", { name: /analysis name/i });
    const textarea = screen.getByTestId("oxlint-analysis-input");
    const submitBtn = screen.getByRole("button", { name: /analyze/i });

    await user.click(nameInput);
    await user.paste("Project Alpha - April 2024");
    await user.click(textarea);
    await user.paste('{"diagnosis": []}');

    await user.click(submitBtn);

    expect(onAnalyze).toHaveBeenCalledTimes(1);
    expect(onAnalyze).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Project Alpha - April 2024",
        report: '{"diagnosis": []}',
        preset: "cleanCode",
      }),
    );
  });
});
