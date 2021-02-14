import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Search } from "./Search";

describe("Search", () => {
  beforeEach(() => render(<Search />));
  it("should be rendered", () => {});
  it("must be have a input to search", () => {
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("button must be disable when input is empty", () => {
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("button must be enable when input is filled", () => {
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "matrix" } });
    expect(screen.getByRole("button")).toBeEnabled();
  });
});
