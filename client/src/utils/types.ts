import type { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  to: string;
  className: string;
}
export interface SectionTitleProps {
  children: ReactNode;
  className: string;
}

export interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}
export interface LanguageProviderProps {
  children: ReactNode;
}
export interface MovieContextType {
  categoriesList: [];
  loading: boolean;
}
export interface MovieProviderProps {
  children: ReactNode;
}

export interface CategoryMovie {
  id: number;
  adult: boolean;
  backdrop_path: string | null;

  // Movie fields
  title?: string;
  original_title?: string;

  // TV fields
  name?: string;
  original_name?: string;

  overview?: string;
  poster_path?: string | null;
  media_type?: "movie" | "tv";

  genre_ids?: number[];
  popularity?: number;
  vote_average?: number;
  vote_count?: number;

  release_date?: string;
  first_air_date?: string;
}

export interface TrendingCardProps {
  index: number;
  movie: CategoryMovie;
}
