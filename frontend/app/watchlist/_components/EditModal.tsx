"use client";

import { Movie } from "@/constants/types";
import { deleteMovie, updateMovieDetails } from "@/lib/movies";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { X, CheckCircle, Clock, Trash2 } from "lucide-react";

interface EditModalProps {
  isOpen: boolean;
  id: string;
  setIsOpen: (isOpen: boolean) => void;
  isWatched: boolean;
  updateMovie: (id: string, data: Movie) => void;
  initialName?: string;
  initialGenre?: string;
}

const EditModal = ({
  isOpen,
  id,
  setIsOpen,
  isWatched,
  updateMovie,
  initialName = "",
  initialGenre = "",
}: Readonly<EditModalProps>) => {
  const [name, setName] = useState(initialName);
  const [genre, setGenre] = useState(initialGenre);
  const router = useRouter();

  // Reset form when modal opens with new movie data
  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setGenre(initialGenre);
    }
  }, [isOpen, initialName, initialGenre]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { id, title: name, genre: genre };

    if (data.title.trim() === "" && data.genre.trim() === "") {
      toast.error("Please add a movie name or genre");
      return;
    }

    if (name.trim() === initialName.trim() && genre.trim() === initialGenre.trim()) {
      toast.error("No changes detected");
      return;
    }

    const result = await updateMovieDetails(data);

    if (result.error || !result.data) {
      toast.error("Error updating movie");
      console.error(result.error);
      return;
    }

    updateMovie(id, result.data);
    setIsOpen(false);
    return;
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this movie from your watchlist?",
      )
    ) {
      const result = await deleteMovie(id);

      if (!result.success) {
        toast.error("Error deleting movie");
        return;
      }
      router.refresh();
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col transform transition-all border border-gray-200 dark:border-gray-700"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Edit Movie
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Name Input */}
          <div className="mb-5">
            <label
              htmlFor="movieName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Movie Name
            </label>
            <input
              id="movieName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., The Dark Knight"
              className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-shadow"
              required
              autoFocus
            />
          </div>

          {/* Genre Input */}
          <div className="mb-6">
            <label
              htmlFor="movieGenre"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Genre
            </label>
            <input
              id="movieGenre"
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="e.g., Action, Drama, Comedy"
              className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-shadow"
              required
            />
          </div>

          {/* Watch Status Badge */}
          <div
            className={`mb-8 p-3.5 rounded-lg flex items-center gap-3 border ${
              isWatched
                ? "bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-800/30"
                : "bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800/30"
            }`}
          >
            {isWatched ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-800 dark:text-green-300">
                  Movie already watched
                </span>
              </>
            ) : (
              <>
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
                  You haven&apos;t watched this yet
                </span>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;