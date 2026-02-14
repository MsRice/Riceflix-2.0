import type { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  to: string;
}

export interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}
export interface LanguageProviderProps {
  children: ReactNode;
}
