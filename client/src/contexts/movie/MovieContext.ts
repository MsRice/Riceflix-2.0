import { createContext, useContext } from "react";
import type { MovieContextType } from "../../utils/types";

export const MovieContext = createContext<MovieContextType | undefined>(
  undefined,
);

export function useMovie() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovie must be used within a MovieProvider");
  }
  return context;
}
