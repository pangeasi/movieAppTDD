import { createContext, Dispatch, useReducer, useState } from "react";

type TermContextProps = {
  term: string;
  dispatch?: Dispatch<any>;
};

let reducer = (state, action) => {
  switch (action.type) {
    case "SET_TERM":
      return { ...state, term: action.value };
    default:
      return;
  }
};

export const TermContext = createContext<TermContextProps>({ term: "" });

export const TermProvider = ({ children }) => {
  const [{ term }, dispatch] = useReducer(reducer, { term: "" });
  return (
    <TermContext.Provider value={{ term, dispatch }}>
      {children}
    </TermContext.Provider>
  );
};
