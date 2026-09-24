import { Movie } from "@/constants/types";

export interface MovieUnsanitized {
  title: string;
  genre: string;
  _id: string;
  watched: boolean;
}

export const sanitizeMovieArray = (data: MovieUnsanitized[]): Movie[] => {
  const cleanData = data.map((movie: MovieUnsanitized) => {
    const cleanedMovie = {
      title: movie.title,
      genre: movie.genre,
      id: movie._id,
      watched: movie.watched
    }
    return cleanedMovie as Movie;
  })
  return cleanData;
}

export const sanitizeMovie = (movie: MovieUnsanitized): Movie => {
  const cleanedMovie = {
    title: movie.title,
    genre: movie.genre,
    id: movie._id,
    watched: movie.watched
  }
  return cleanedMovie as Movie;
}

export interface serverDataStructure<T> {
  error: string | null;
  success: boolean;
  data: T | null;
}

export const sanitize = (data: any) => {
  if (Array.isArray(data)) {
    data.map(d => {
      d.id = d._id;
      delete d._id;
    });
    return data;
  } 
  if (typeof data === "object") {
    data.id = data._id;
    delete data._id;
    return data;
  }
}
export const isValidPassword = (password: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*\d).{6,}$/i;
  return regex.test(password);
};

// Validation function
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const capitalizeFirst = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};