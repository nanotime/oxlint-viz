import { describe, expect, it } from "vite-plus/test";
import { render, waitFor } from "@solidjs/testing-library";
import App from "../App";
import { AppProvider } from "@/store/AppContext";
import userEvent from "@testing-library/user-event";

const wrapper = (props: any) => <AppProvider {...props} />;
const user = userEvent.setup();

describe("App", () => {
  it("Should render the app correctly", () => {
    const r = render(() => <App />, { wrapper });

    expect(r.getByTestId("input-zone")).toBeInTheDocument();
    expect(r.queryByTestId("dashboard")).not.toBeInTheDocument();
    expect(r.getByRole("button", { name: /analyze/i })).toBeInTheDocument();
  });

  it("Should render dashboard on click", async () => {
    const r = render(() => <App />, { wrapper });

    const textarea = r.getByRole("textbox");
    const analyzeBtn = r.getByRole("button", { name: /analyze/i });

    expect(r.queryByTestId("dashboard")).not.toBeInTheDocument();

    await user.click(textarea);
    await user.paste("test data");

    await user.click(analyzeBtn);

    await waitFor(() => {
      expect(r.queryByTestId("dashboard")).toBeInTheDocument();
    });
  });
});
