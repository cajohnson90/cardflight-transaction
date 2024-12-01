import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Page", () => {
  it("renders the main landing page", () => {
    render(<Page />);

    const main = screen.getByRole("main");
    const textbox = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /submit/i });

    expect(main).toBeInTheDocument();
    expect(textbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
