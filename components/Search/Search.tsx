import { useContext, useState } from "react";
import { TermContext } from "../../context/term.context";

export const Search = () => {
  const [search, setSearch] = useState("");
  const { dispatch } = useContext(TermContext);
  return (
    <>
      <input
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
        type="search"
      />
      <button
        disabled={!!!search}
        onClick={() => dispatch({ type: "SET_TERM", value: search })}
      >
        search
      </button>
    </>
  );
};
