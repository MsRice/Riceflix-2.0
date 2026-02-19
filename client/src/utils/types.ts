import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  to?: string;
  className?: string;
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
  categoriesList: CategoriesList | null;
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

export interface MovieCategory {
  page: number;
  results: CategoryMovie[];
  total_pages: number;
  total_results: number;
}

export interface CategoriesList {
  trendingAll: MovieCategory;
  trendingMovies: MovieCategory;
  trendingTV: MovieCategory;
}
export interface TrendingCardProps {
  index: number;
  movie: CategoryMovie;
}

interface Profile {
  _id: string;
  name: string;
  avatar_img: string;
  role: "owner" | "guest";
  watchlist: string[];
  history: string[];
  favorites: string[];
  isKid: boolean;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  profiles: Profile[];
  subscription_tier: "basic" | "premium";
  next_billing_date: Date;
  is_subscription_active: boolean;
  role: "user" | "admin";
}

export interface Credentials {
  email: string;
  password: string;
}
export interface CreateCredentials extends Omit<ProfileCredentials, "_id"> {
  avatar_img: string | null;
}

export interface ProfileCredentials {
  _id: string;
  name?: string;
  isKid?: boolean;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  activeProfileId: string | null;
  setActiveProfileId: (id: string | null) => void;
  login: (userData: Credentials) => Promise<void>;
  register: (userData: Credentials) => Promise<void>;
  logout: () => void;
  createProfile: (data: CreateCredentials) => Promise<void>;
  updateProfile: (updateData: ProfileCredentials) => Promise<void>;
  deleteProfile: (profileId: string) => Promise<void>;
}

export interface AuthenticationProviderProps {
  children: React.ReactNode;
}
