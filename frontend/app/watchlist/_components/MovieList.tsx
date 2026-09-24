"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Movie } from "@/constants/types";
import { getMovies, markAsWatched } from "@/lib/movies";
import { Button, ButtonLink } from "@/components/utility/buttons";
import CreateMovieModal from "./CreateMovieModal";
import { FilmIcon, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { MovieListItem } from "./ListItem";
import { Pagination } from "@/components/general/pagination";
import useLocalStorage from "@/hooks/useLocalStorage";

export const MovieList = ({page}: {page: number}) => {
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useLocalStorage<number>("totalPages", 1);
  const [thereIsNextPage, setThereIsNextPage] = useLocalStorage<boolean>("thereIsNextPage", false);

  const searchParams = useSearchParams();

  const isWatchedRoute = searchParams.get("watched") === "true";

  const updateMovie = async (id: string, data: Partial<Movie>) => {
    const movie = movies.find((m) => m.id === id);
    if (!movie) return;

    if (!data.title && !data.genre) {
      return console.log("no data to update");
    }
    if (
      data.title?.trim() === movie.title.trim() &&
      data.genre?.trim() === movie.genre.trim()
    ) {
      return console.log("no changes detected");
    }
    const moviesCopy = [...movies];

    moviesCopy.map((movie) => {
      if (movie.id === id) {
        if (data.genre) movie.genre = data.genre;
        if (data.title) movie.title = data.title;
      }
    });
  };

  const markMovieAsWatched = async (id: string) => {
    const selectedMovie = movies.find((movie) => movie.id === id);

    if (!selectedMovie) return;
    const moviesRef = [...movies];

    moviesRef.map((movie) => {
      if (movie.id === id) {
        movie.watched = !movie.watched;
      }
    });

    setMovies(moviesRef);

    const result = await markAsWatched(id);

    if (!result.success) {
      toast.error("Error marking Movie as watched");
      return;
    }
    return;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const genre = searchParams.get("genre") || undefined;
      const watched = searchParams.get("watched") === "true" || undefined;
      const fetchData = {
        genre,
        watched,
        page,
      }
      const result = await getMovies(fetchData);

      const data = result.data;

      if (!result.success || !data) {
        setIsLoading(false);
        setError("Error fetching movies");
        return;
      }

      const numberOfPages = data.pagination.totalPages;
      setTotalPages(numberOfPages);
      setMovies(data.movies);
      setIsLoading(false);
      setThereIsNextPage(data.pagination.hasNextPage);
    };

    fetchMovies();
  }, [searchParams, page]);

  //helper function to get a random color from the lists in the movies
  //jsx returns

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full min-h-svh pt-15">
      <div className="text-2xl font-bold text-zinc-900 dark:text-white mx-auto flex items-center justify-center py-5 w-full px-auto">
        My Watchlist
      </div>
      {movies.length === 0 && !isLoading && (
        <div className="h-svh w-full flex items-center gap-y-2 justify-center flex-col">
          <p>No movies in your watchlist yet?</p>

          <Button
            handleClick={() => setIsOpen(true)}
            className="bg-blue-500 rounded-md font-medium text-white px-6 py-2"
          >
            Add Movies to Watchlist
          </Button>
        </div>
      )}

      <menu className="flex flex-col px-4 md:px-8 gap-2">
        {movies.length > 0 &&
          movies.map((movie) => {
            if (!movie || !movie.title || isLoading || error) {
              console.log(movie);
              return null;
            }
            if (movie.title.trim() === "" || movie.genre.trim() === "")
              return null;
            return (
              <MovieListItem
                key={movie.id + movie.title}
                movie={movie}
                markMovieAsWatched={markMovieAsWatched}
                updateMovie={updateMovie}
              />
            );
          })}
      </menu>
      {isWatchedRoute ? (
        <ButtonLink
          href="/watchlist"
          className="bg-blue-600 text-white w-max font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center gap-2 mx-auto mt-10"
        >
          See All Movies <FilmIcon />
        </ButtonLink>
      ) : (
        movies.length !== 0 && (
          <Button
            handleClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center gap-2 mx-auto mt-10"
          >
            Add another movie <Plus />
          </Button>
        )
      )}
      <Pagination totalPages={totalPages} thereIsNextPage={thereIsNextPage} />
      <CreateMovieModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setMovies={setMovies}
      />
    </div>
  );
};
