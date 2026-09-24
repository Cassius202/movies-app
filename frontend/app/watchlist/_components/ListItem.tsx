"use client";

import { cssColors } from "@/constants/assets";
import { Movie } from "@/constants/types";
import { MoreHorizontal, MoreVertical, Trash } from "lucide-react";
import React, { useState } from "react";
import EditModal from "./EditModal";

export const MovieListItem = ({
  movie,
  markMovieAsWatched,
  updateMovie,
}: { movie: Movie; markMovieAsWatched: (id: string) => void, updateMovie: (id: string, data: Movie) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [color] = useState(() => {
    return cssColors[Math.floor(Math.random() * cssColors.length)];
  });

  const handleOptionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  return (
    <>
    <li
      style={{ backgroundColor: !movie.watched ? color.hex : "#222" }}
      className="flex justify-between px-4 rounded-xl transition-colors py-3"
      key={"movie-" + movie.id + movie.title}
    >
      <div>
        <p
        className={`text-lg font-medium ${movie.watched && "line-through italic text-stone-500"}`}
      >
        {movie.title}
      </p>
      <p className={`text-xs text-stone-400 ${movie.watched && "text-zinc-200/20!"}`} >{movie.genre}</p>
      </div>
      <div className="gap-5 flex items-center">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
          checked={movie.watched}
          onChange={() => markMovieAsWatched(movie.id)}
        />
        <div className="relative group cursor-pointer">
          <Trash size={18} className="transition-colors hover:text-red-400" />
          <span className="text-xs absolute text-stone-300 whitespace-nowrap -translate-x-1/2 translate-y-3 left-1/2 top-full hidden group-hover:block bg-zinc-700 rounded-md px-3 py-1.5">
            Delete Movie
          </span>
        </div>
        <div className="relative group cursor-pointer p-1 rounded-lg bg-zinc-500/20"
        onClick={() => {
          //creates a modal for changes to be made (either to change the genre or the movie name or delete the movie)
          setSelectedId(movie.id);
          setIsOpen(true);
        }}
        >
          <MoreVertical size={18} className="transition-colors hover:text-red-400" />
          <span className="text-xs absolute text-stone-300 whitespace-nowrap -translate-x-1/2 translate-y-3 left-1/2 top-full hidden group-hover:block bg-zinc-700 rounded-md px-3 py-1.5">
            More Options
          </span>
        </div>
      </div>
    </li>
    {selectedId && <EditModal isOpen={isOpen} id={selectedId} setIsOpen={setIsOpen} isWatched={movie.watched} updateMovie={updateMovie} initialName={movie.title} initialGenre={movie.genre} />}
    </>
  );
};
