'use client'

import Link from "next/link"
import { ArrowLeft, Home, Film } from "lucide-react" // or your preferred icon library

export const NotFound = () => {
  return (
    <div className="min-h-screen w-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Illustration/Text */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-zinc-900 dark:text-zinc-100">404</h1>
      
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
            Page Not Found
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            {`Oops! The page you're looking for seems to have wandered off into the digital wilderness.`}
          </p>
        </div>

        {/* Navigation Options */}
        <div className="space-y-3">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            Go Back Home
          </Link>
          
          <div className="flex gap-3 justify-center">
            <Link 
              href="/movies"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 font-medium rounded-lg transition-all duration-200"
            >
              <Film className="w-4 h-4" />
              Browse Movies
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>

        {/* Helpful Hint */}
        <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-500">
          Lost? Check the URL or return to a familiar place above.
        </p>
      </div>
    </div>
  )
}

export default NotFound