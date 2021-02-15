import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TermContext, TermProvider } from "./term.context";
import { useContext } from "react";
import { Search } from "../components/Search/Search";

const Consumer = () => {
  const { term } = useContext(TermContext);
  return <p>The term is: {term}</p>;
};

describe("TermContext", () => {
  beforeEach(() =>
    render(
      <TermProvider>
        <Consumer />
      </TermProvider>
    )
  );
  it("should be rendered", () => {});

  it("The consumer should be: The term is: ", () => {
    expect(screen.getByText(/the term is/i)).toHaveTextContent("The term is:");
  });
});

describe("TermCotext with search", () => {
  it("The consumer should be: The term is: Matrix; when setContext", () => {
    render(
      <TermProvider>
        <Search />
        <Consumer />
      </TermProvider>
    );
    const input = screen.getByRole("searchbox");
    const button = screen.getByRole("button");
    fireEvent.change(input, { target: { value: "Matrix" } });
    fireEvent.click(button);

    expect(screen.getByText(/the term is/i)).toHaveTextContent(
      "The term is: Matrix"
    );
  });
});
