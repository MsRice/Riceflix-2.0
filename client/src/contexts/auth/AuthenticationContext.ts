import { createContext, useContext } from "react";
import type { AuthContextType } from "../../utils/types";

export const AuthenticationContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function useAuthentication() {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider",
    );
  }

  return context;
}
