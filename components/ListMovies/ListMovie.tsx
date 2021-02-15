import { useContext, useEffect, useState } from "react";
import { TermContext } from "../../context/term.context";

export const ListMovies = () => {
  const { term } = useContext(TermContext);
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    let unmounted = false;
    if (term) {
      fetch(`http://www.omdbapi.com/?s=${term}&apikey=b1a42023`)
        .then((res) => res.json())
        .then((data) => {
          if (!unmounted && data.Search) setList(data.Search);
        });
    }
    return () => {
      unmounted = true;
    };
  }, [term]);

  return term && list.length ? (
    <ul>
      {list.map((movie) => (
        <h2 key={movie.imdbID}>{movie.Title}</h2>
      ))}
    </ul>
  ) : (
    <p>No results</p>
  );
};
