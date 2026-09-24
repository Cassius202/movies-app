'use client'

import { ErrorPage } from "@/components/ErrorPage";
import { Movie } from "@/constants/types";
import { getWatchedMovies } from "@/lib/movies";
import { Film, AlertCircle, RefreshCw, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export const WatchedMoviesPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await getWatchedMovies();

        if (!result.success || !result.data) {
          setError("Error fetching watched movies");
          return;
        }
        
        setMovies(result.data);
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Error fetching movies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="text-center">
          <Film className="w-12 h-12 text-zinc-400 dark:text-zinc-600 animate-pulse mx-auto mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">Loading your watched movies...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) return <ErrorPage href="/watchlist" error={error} callback={() => window.location.reload()} />;

  // Empty state
  if (movies.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="text-center max-w-md mx-auto p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <Film className="w-12 h-12 text-zinc-400 dark:text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-800 dark:text-zinc-200 text-lg font-semibold mb-2">No watched movies yet</p>
          <p className="text-zinc-500 dark:text-zinc-400">
            Start exploring and add movies to your watched list!
          </p>
        </div>
      </div>
    );
  }

  // Success state with movies
  return (
    <div className="w-full pt-16 min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-8 h-8 text-zinc-700 dark:text-zinc-300" />
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              Watched Movies
            </h1>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400">
            You&apos;ve watched {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200"
            >
              
              {/* Movie Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2 line-clamp-1">
                  {movie.title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {movie.genre || 'No genre'}
                  </p>
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-500">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Watched</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};