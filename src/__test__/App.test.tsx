import { describe, expect, it, vi } from "vite-plus/test";
import { render, waitFor } from "@solidjs/testing-library";
import App from "../App";
import * as AppContext from "@/store/AppContext";
import userEvent from "@testing-library/user-event";

const wrapper = (props: any) => <AppContext.AppProvider value={AppContext.baseStore} {...props} />;
const user = userEvent.setup();

describe("App", () => {
  it("Should render the app correctly", () => {
    const r = render(() => <App />, { wrapper });

    expect(r.getByTestId("input-zone")).toBeInTheDocument();
    expect(r.queryByTestId("dashboard")).not.toBeInTheDocument();
    expect(r.getByRole("button", { name: /analyze/i })).toBeInTheDocument();
  });

  it("Should render dashboard on click", async () => {
    const setViewSpy = vi.spyOn(AppContext, "setView");
    const r = render(() => <App />, { wrapper });

    const analyzeBtn = r.getByRole("button", { name: /analyze/i });

    expect(r.queryByTestId("dashboard")).not.toBeInTheDocument();

    await user.click(analyzeBtn);

    expect(setViewSpy).toHaveBeenCalledWith("dashboard");

    await waitFor(() => {
      expect(r.queryByTestId("dashboard")).toBeInTheDocument();
    });
  });
});
