import { useState } from "react";

export const Search = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <input
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
        type="search"
      />
      <button disabled={!!!search}>search</button>
    </>
  );
};
