import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Layout } from "./Layout";

describe("Layout", () => {
  beforeEach(() => render(<Layout>Test</Layout>));
  it("should be rendered", () => {});

  it("must be a title: Movie search", () => {
    expect(screen.getByRole("heading")).toHaveTextContent(/movie search/i);
  });
});
