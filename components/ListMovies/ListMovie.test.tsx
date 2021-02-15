import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { ListMovies } from "./ListMovie";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { TermProvider } from "../../context/term.context";
import { Search } from "../Search/Search";
import React from "react";

const server = setupServer(
  rest.get(
    "http://www.omdbapi.com/?s=matrix&apikey=b1a42023",
    (req, res, ctx) => {
      return res(
        ctx.json({
          Search: [
            {
              Title: "The Matrix",
              Year: "1999",
              imdbID: "tt0133093",
              Type: "movie",
              Poster:
                "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
            },
            {
              Title: "The Matrix Reloaded",
              Year: "2003",
              imdbID: "tt0234215",
              Type: "movie",
              Poster:
                "https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
            },
            {
              Title: "The Matrix Revolutions",
              Year: "2003",
              imdbID: "tt0242653",
              Type: "movie",
              Poster:
                "https://m.media-amazon.com/images/M/MV5BNzNlZTZjMDctZjYwNi00NzljLWIwN2QtZWZmYmJiYzQ0MTk2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
            },
            {
              Title: "The Matrix Revisited",
              Year: "2001",
              imdbID: "tt0295432",
              Type: "movie",
              Poster:
                "https://m.media-amazon.com/images/M/MV5BMTIzMTA4NDI4NF5BMl5BanBnXkFtZTYwNjg5Nzg4._V1_SX300.jpg",
            },
            {
              Title: "Enter the Matrix",
              Year: "2003",
              imdbID: "tt0277828",
              Type: "game",
              Poster:
                "https://m.media-amazon.com/images/M/MV5BNWM3MDU2MWQtYjdlNC00NDBlLTkyNGMtNjdhYjdlNTdiNTFlXkEyXkFqcGdeQXVyNTEwNDY2MjU@._V1_SX300.jpg",
            },
            {
              Title: "The Matrix: Path of Neo",
              Year: "2005",
              imdbID: "tt0451118",
              Type: "game",
              Poster:
                "https://m.media-amazon.com/images/M/MV5BZGFiNGU4MjEtODM2ZC00OTg0LThkNmEtZTBlN2FkMmFjOWYzXkEyXkFqcGdeQXVyNTEwNDY2MjU@._V1_SX300.jpg",
            },
            {
              Title: "Armitage III: Dual Matrix",
              Year: "2002",
              imdbID: "tt0303678",
              Type: "movie",
              Poster:
                "https://m.media-amazon.com/images/M/MV5BOTUwOTY3Mjg1MF5BMl5BanBnXkFtZTcwODI2MTAyMQ@@._V1_SX300.jpg",
            },
            {
              Title: "CR: Enter the Matrix",
              Year: "2009",
              imdbID: "tt1675286",
              Type: "game",
              Poster:
                "https://m.media-amazon.com/images/M/MV5BMTExMzY3NTQ1NjleQTJeQWpwZ15BbWU3MDAyMjk2NzM@._V1_SX300.jpg",
            },
            {
              Title: "Sex and the Matrix",
              Year: "2000",
              imdbID: "tt0274085",
              Type: "movie",
              Poster: "N/A",
            },
            {
              Title: "Making 'The Matrix'",
              Year: "1999",
              imdbID: "tt0365467",
              Type: "movie",
              Poster:
                "https://m.media-amazon.com/images/M/MV5BZjJjMTg5MTEtMDkwMy00ZjUyLTg5ODYtMmNmY2ZiNGVlZTdjXkEyXkFqcGdeQXVyODA1NjQ0OTY@._V1_SX300.jpg",
            },
          ],
          totalResults: "110",
          Response: "True",
        })
      );
    }
  )
);

const renderAndSearch = () => {
  render(
    <TermProvider>
      <Search />
      <ListMovies />
    </TermProvider>
  );

  const input = screen.getByRole("searchbox");
  const button = screen.getByRole("button");
  fireEvent.change(input, { target: { value: "Matrix" } });
  fireEvent.click(button);
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("ListMovie", () => {
  beforeEach(() => {
    render(<ListMovies />);
  });
  it("should be rendered", () => {});
});

describe("ListMovie > context", () => {
  beforeEach(() => renderAndSearch());
  it("must be not show it if term search is empty", () => {
    expect(screen.getByText(/no results/i)).toHaveTextContent("No results");
  });
  it("should be show if term search is filled and list", async () => {
    await waitFor(() => {
      expect(screen.getByRole("list")).toBeInTheDocument();
    });
  });
});

describe("ListMovies > fetching", () => {
  it("should be fetch a list of movies if term is fill", async () => {
    renderAndSearch();
    await waitFor(() => {
      expect(screen.getAllByRole("heading")[0]).toHaveTextContent("The Matrix");
      expect(screen.getAllByRole("heading")[4]).toHaveTextContent(
        "Enter the Matrix"
      );
    });
  });

  it("should be fetch a error if not found any movie", async () => {
    server.use(
      rest.get(
        "http://www.omdbapi.com/?s=matrix&apikey=b1a42023",
        (req, res, ctx) => {
          return res(
            ctx.json({ Response: "False", Error: "Movie not found!" })
          );
        }
      )
    );
    renderAndSearch();
    await waitFor(() => {
      expect(screen.getByText(/no results/i)).toBeInTheDocument();
    });
  });
});
