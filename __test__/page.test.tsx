import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Page from "../app/page";
import Form from "../components/form";
import { transactionFormatter } from "../actions/transactionFormatter";

// Test case for the main page rendering
describe("Page", () => {
  it("renders the main landing page with required elements", () => {
    render(<Page />);

    // Check that main, textbox, and submit button are rendered
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});

// Test case for handling input changes in the form
describe("Form Change", () => {
  it("should update input value on change", () => {
    render(<Form actionName={transactionFormatter} />);
    const input = screen.getByPlaceholderText(
      "Transaction Number"
    ) as HTMLInputElement;

    // Simulate typing into the input field
    fireEvent.change(input, { target: { value: "Test Value" } });

    expect(input.value).toBe("Test Value");
  });
});

jest.mock("../actions/transactionFormatter"); // Mock the transactionFormatter function

describe("Form Submit", () => {
  it("should submit the form and process the transaction", async () => {
    // Set up the mock for transactionFormatter
    (transactionFormatter as jest.Mock).mockResolvedValue({
      message: "Success",
      processedTransaction: {
        network: "VISA",
        amount: "22.00",
        merchant: "BURGERBARN",
      },
    });

    render(<Form actionName={transactionFormatter} />);

    const input = screen.getByPlaceholderText(
      "Transaction Number"
    ) as HTMLInputElement;
    const button = screen.getByText("Submit") as HTMLButtonElement;

    // Simulate typing in the transaction number
    fireEvent.change(input, {
      target: { value: "104VISA20522.00310BURGERBARN" },
    });

    // Simulate clicking the submit button
    fireEvent.click(button);

    // Verify that transactionFormatter was called with the expected arguments
    await waitFor(() => {
      expect(transactionFormatter).toHaveBeenCalledWith(
        expect.anything(), // previousState (we don't care here)
        expect.any(FormData) // formData (simulating form data)
      );
    });

    // Verify that the processed transaction data is displayed on the page
    await waitFor(() => {
      expect(screen.getByText('"network": "VISA"')).toBeInTheDocument();
      expect(screen.getByText('"amount": "22.00"')).toBeInTheDocument();
      expect(screen.getByText('"merchant": "BURGERBARN"')).toBeInTheDocument();
    });
  });
});
