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
export interface FooterProps {
  className: string;
}

export interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}
export interface LanguageProviderProps {
  children: ReactNode;
}

interface Genre {
  id: number;
  name: string;
}
export interface RawTMDBMovieDetails {
  adult?: boolean;
  videos?: {
    results: TMDBDetails[];
  };
  backdrop_path: string | null;
  belongs_to_collection: string | null;
  budget: number;
  credits: {
    cast: {
      adult: boolean;
      gender: number; // 0 = unknown, 1 = female, 2 = male, 3 = non-binary
      id: number;
      known_for_department: string; // usually "Acting" | "Production" | "Directing"
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string | null;

      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
    }[];
    crew: {
      adult: boolean;
      gender: number;
      id: number;

      known_for_department: string; // e.g. "Production"
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string | null;

      credit_id: string;
      department: string; // e.g. "Visual Effects"
      job: string; // e.g. "Director", "Special Effects Supervisor"
    }[];
  };
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime?: number | null;
  similar: {
    page: number;
    results: CategoryMovie[];
    total_pages: number;
    total_results: number;
  };
  spoken_languages: {
    english_name: string;
    iso_639_1: string; // ISO 639-1 language code (e.g. "en")
    name: string; // Native language name
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface RawTMDBTVDetail {
  adult: boolean;
  backdrop_path: string | null;

  created_by: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string | null;
  }[];

  credits: {
    cast: {
      adult: boolean;
      gender: number;
      id: number;

      known_for_department: string; // "Acting"
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string | null;

      character: string;
      credit_id: string;
      order: number;
    };
    crew: {
      adult: boolean;
      gender: number;
      id: number;

      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string | null;

      credit_id: string;
      department: string; // e.g. "Writing", "Directing", "Crew"
      job: string; // e.g. "Director", "Creator"};
    };
  };
  episode_run_time: number[]; // can be empty []
  first_air_date: string;

  genres: Genre[];
  homepage: string | null;
  id: number;
  in_production: boolean;

  languages: string[]; // e.g. ["en"]
  last_air_date: string | null;

  last_episode_to_air?: {
    id: number;
    name: string;
    overview: string;

    air_date: string;
    episode_number: number;
    season_number: number;

    episode_type: string; // e.g. "standard"
    production_code: string; // can be empty string ""

    runtime: number | null;
    show_id: number;

    still_path: string | null;

    vote_average: number;
    vote_count: number;
  } | null;

  name: string;
  networks: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];

  next_episode_to_air?: {
    id: number;
    name: string;
    overview: string;

    air_date: string;
    episode_number: number;
    season_number: number;

    episode_type: string; // e.g. "standard"
    production_code: string; // can be empty string ""

    runtime: number | null;
    show_id: number;

    still_path: string | null;

    vote_average: number;
    vote_count: number;
  } | null;

  number_of_episodes: number;
  number_of_seasons: number;

  origin_country: string[];
  original_language: string;
  original_name: string;

  overview: string;
  popularity: number;
  poster_path: string | null;

  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];

  seasons: {
    id: number;

    name: string; // e.g. "Season 1"
    overview: string;

    air_date: string | null; // sometimes null for future seasons
    episode_count: number;

    season_number: number;
    poster_path: string | null;
  }[];

  similar: {
    page: number;
    results: CategoryMovie[];
    total_pages: number;
    total_results: number;
  };

  spoken_languages: {
    english_name: string;
    iso_639_1: string; // ISO 639-1 language code (e.g. "en")
    name: string; // Native language name
  }[];

  status: string; // e.g. "Returning Series"
  tagline: string | null;
  type: string; // "Scripted"

  videos?: {
    results: TMDBDetails[];
  };
  vote_average: number;
  vote_count: number;

  "watch/providers"?: {
    results: {
      [countryCode: string]: {
        link: string;
        flatrate: {
          logo_path: string;
          provider_id: number;
          provider_name: string;
          display_priority: number;
        }[];
      };
    };
  };
}
export type ContentDetails = MovieContentDetails | TVContentDetails;

export interface TVContentDetails {
  _id: string;
  tmdb_id: number;
  type: "tv";

  title: string;
  description: string;
  release_date?: string;
  poster_url?: string;
  plot_embedding?: number[];

  raw_tmdb: RawTMDBTVDetail;
}

export interface MovieContentDetails {
  _id: string;
  tmdb_id: number;
  type: "movie";

  title: string;
  description: string;
  release_date?: string;
  poster_url?: string;
  plot_embedding?: number[];

  raw_tmdb: RawTMDBMovieDetails;
}

interface MetaCategoryTVData {
  type: "tv";
  trailer?: TMDBDetails;
  season_ct: string;
  production_co?: ProductionCompany | null;
  genres: Genre[];
}
interface MetaCategoryMovieData {
  type: "movie";
  trailer?: TMDBDetails;
  runtime: string;
  production_co?: ProductionCompany | null;
  genres: Genre[];
}
export type MetaCategoryData = MetaCategoryMovieData | MetaCategoryTVData;

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string; // ISO 3166-1 country code
}
export interface ProductionCountry {
  iso_3166_1: string; // ISO country code (e.g. 'US', 'GB')
  name: string; // Full country name
}

interface TMDBDetails {
  id: string;
  key: string;
  name: string;
  site: "YouTube" | string;
  type: string;
}

export interface MovieContextType {
  categoriesList: CategoriesList | null;
  loading: boolean;
  getContentDetails: (
    contentId: number,
    type: "movie" | "tv" | undefined,
    language: "en-US" | "es-ES",
  ) => Promise<ContentDetails | null>;
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
  original_language?: string;
}

export interface CategorySectionProps {
  children: ReactNode;
  sectionResults?: MovieCategory;
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
  actionMovies: MovieCategory;
  comdeyMovies: MovieCategory;
  documentaries: MovieCategory;
  horrorMovies: MovieCategory;
  romanceMovies: MovieCategory;
  topRatedMovies: MovieCategory;
}
export interface TrendingCardProps {
  index: number;
  movie: CategoryMovie;
}

export interface Profile {
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

export type ProfileListTypes = "watchlist" | "history" | "favorites";

export interface ProfileListData {
  profileId: string;
  contentId: number;
  listName: ProfileListTypes;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  authLoading: boolean;
  activeProfile: Profile | null;
  activeProfileId: string | null;
  setActiveProfileId: (id: string | null) => void;
  login: (userData: Credentials) => Promise<void>;
  register: (userData: Credentials) => Promise<void>;
  logout: () => void;
  createProfile: (data: CreateCredentials) => Promise<void>;
  getProfile: (id: string) => Promise<void>;
  updateProfile: (updateData: ProfileCredentials) => Promise<void>;
  deleteProfile: (profileId: string) => Promise<void>;
  updateProfileList: (profileData: ProfileListData) => void;
}

export interface AuthenticationProviderProps {
  children: React.ReactNode;
}
