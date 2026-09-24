'use server'

import {cookies} from 'next/headers'

import { GeneralMoviesResult, Movie } from "@/constants/types";
import { MovieUnsanitized, sanitizeMovieArray, sanitizeMovie } from "./helpers";

const API_URL = 'http://localhost:3001/movies'

interface GetMoviesProps {
  genre: string | undefined;
  watched: boolean | undefined;
  page: number | undefined;
}

export const getMovies = async (movieData: GetMoviesProps) => {
  const {genre, watched, page = 1 } = movieData;

  const params = new URLSearchParams();

  if (genre) params.append('genre', genre);
  if (watched !== undefined) params.append('watched', String(watched));
  params.append('page', String(page));
  params.append('limit', '10');
  
  const response = await fetch(`${API_URL}?${params.toString()}`);
  if (!response.ok) {
    console.error(response);
    return { error: "Error fetching movies", success: false, data: null};
  };
  const data : GeneralMoviesResult = await response.json();

  const movies = sanitizeMovieArray(data.data);

  return {
    error: null,
    success: true,
    data: {
      movies,
      pagination: data.pagination,
    }
  }
}

export const createMovie = async (title: string, genre: string) => {
  const cookieStore = await cookies(); //get cookies from the request

  const token = cookieStore.get('jwt')?.value;
  
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
    'Cookie': `jwt=${token}` //forward the cookie to express
    },
    body: JSON.stringify({title, genre})
  }
  const res = await fetch(API_URL, options);

  const data = await res.json();
  console.log(data);

  return sanitizeMovie(data) as Movie;
}

export const markAsWatched = async (id: string) => {
   const cookieStore = await cookies(); //get cookies from the request

  const token = cookieStore.get('jwt')?.value;
  const res = await fetch(`${API_URL}/${id}/watched`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json',
    'Cookie': `jwt=${token}` //forward the cookie to express
    },
  })
  if (!res.ok) {
    console.log(res);
    return {
      error: "Error marking movie as watched",
      success: false,
      data: null
    }
  }
  return {
    error: null,
    success: res.status === 200,
    data: null
  }
}

export const deleteMovie = async (id: string) => {
   const cookieStore = await cookies(); //get cookies from the request

  const token = cookieStore.get('jwt')?.value;
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Cookie': `jwt=${token}` //forward the cookie to express
    }
  })
  if (res.status === 204) return null
  return res.json()
}

export const getMovieById = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`);

  const data = await res.json();

  if (!res.ok || !data) return {
    error: "Error fetching movie",
    success: false,
    data: null
  };

  let movie = data;

  if (data._id) {
    movie = sanitizeMovie(data);
  }
  
  return movie as Movie;
}

export const updateMovieDetails = async (data: { id: string, title: string, genre: string }) => {
  const token = cookieStore.get('jwt');
  const { id, ...details } = data;
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json',
    'Cookie': `jwt=${token}` //forward the cookie to express
    },
    body: JSON.stringify(details)
  });

  if (!res.ok) {
    console.error(res);
    return {
      success: false,
      error: "Error updating movie",
      data: null
    }
  }

  const movie = sanitizeMovie(await res.json());

  return {
    success: true,
    error: null,
    data: movie as Movie
  }
}

export const getWatchedMovies = async () => {
  const result = await fetch(`${API_URL}/watched`);

  const data = await result.json();
  if (!result.ok || !data) return {
    error: "Error fetching watched movies",
    success: false,
    data: null
  };

  const watchedMovies = sanitizeMovieArray(data);

  return {
    error: null,
    success: true,
    data: watchedMovies as Movie[]
  }
}