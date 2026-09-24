'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'
import { X, Plus, Film, Tag, Sparkles } from 'lucide-react'
import { Movie } from '@/constants/types'
import toast from 'react-hot-toast'
import { createMovie } from '@/lib/movies'

export const CreateMovieModal = ({ 
  isOpen, 
  setIsOpen,
  setMovies
}: Readonly<{isOpen: boolean, setIsOpen: (isOpen: boolean) => void, setMovies: Dispatch<SetStateAction<Movie[]>>}>) => {
  
  // Handle escape key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, setIsOpen])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setIsOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formElement = e.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);

    const title = formData.get('title') as string;
    const genre = formData.get('genre') as string;

    try {
      if (!title || !genre) {
        toast.error("Please add movie details");
        throw new Error('title and genre are required');
      };
      const newMovie = await createMovie(title, genre);

      if (!newMovie) {
        toast.error("Error creating movie");
        throw new Error('Error creating movie');
      }

      setMovies((prev) => {
        const newMovies = [...prev, newMovie];
        return newMovies as Movie[];
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(errorMessage); 
    } finally {
      setIsOpen(false);
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-300" />
      
      {/* Modal */}
      <div className="relative p-7 w-full max-w-md bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl shadow-2xl transform transition-all duration-300 animate-in fade-in zoom-in">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded-lg p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            Add Movie to Watchlist
          </h2>
          
          {/* Title Input */}
          <div className="mb-5">
            <label htmlFor="title" className="block text-sm font-medium text-zinc-300 mb-2">
              Title
            </label>
            <div className="relative">
              <Film className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                id="title"
                name="title"
                placeholder="e.g., Inception, The Dark Knight"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Genre Input */}
          <div className="mb-6">
            <label htmlFor="genre" className="block text-sm font-medium text-zinc-300 mb-2">
              Genre
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                id="genre"
                name="genre"
                placeholder="e.g., Action, Drama, Romance/Comedy"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <span className='text-xs font-light text-zinc-500 mt-2'>
              You can add multiple genres seperated by a slash
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Movie
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateMovieModal