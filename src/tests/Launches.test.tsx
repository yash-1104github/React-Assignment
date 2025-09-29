import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { setupFetchMock, cleanupMocks } from "./test-utils";

beforeEach(() => setupFetchMock());
afterEach(() => cleanupMocks());

test("renders launches and filters by name and year", async () => {
  render(<App />);
  await waitFor(() => screen.getByText("FalconSat"));

  expect(screen.getByText("FalconSat")).toBeInTheDocument();
  expect(screen.getByText("DemoSat")).toBeInTheDocument();
  expect(screen.getByText("Trailblazer")).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Search by mission name/i), {
    target: { value: "Trailblazer" },
  });

  await waitFor(() => expect(screen.getByText("Trailblazer")).toBeInTheDocument());
  expect(screen.queryByText("FalconSat")).not.toBeInTheDocument();

  const yearSelect = screen.getByRole("combobox", { name: /year/i });
  fireEvent.click(yearSelect);

  const listbox = await screen.findByRole("listbox");
  const option2006 = within(listbox).getByText("2006");
  fireEvent.click(option2006);

  await waitFor(() =>
    expect(screen.getByText(/No launches match your filters/i)).toBeInTheDocument()
  );
});