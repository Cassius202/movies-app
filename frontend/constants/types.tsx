import { MovieUnsanitized } from "@/lib/helpers";
import { LucideIcon } from "lucide-react";

export interface NavLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface Movie {
  title: string;
  genre: string;
  id: string;
  watched: boolean;
}

export interface User {
  username: string
  email: string
  password: string
}

export interface GeneralMoviesResult {
  data: MovieUnsanitized[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }
}

export interface GeneralMoviesResultCleaned {
  data: Movie[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }
}