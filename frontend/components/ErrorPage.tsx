'use client'

import { useRouter } from 'next/navigation'
import { AlertCircle, ArrowLeft, Home, RefreshCw } from 'lucide-react'

export const ErrorPage = ({ href, error, callback }: { href: string, error: string, callback?: () => void }) => {
  const router = useRouter();

  const handleTryAgain = () => {
    if (callback) {
      callback();
    } else {
      window.location.reload();
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
      <div className="text-center px-4">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">{error}</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Try Again - Main option */}
          <button
            onClick={handleTryAgain}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          
          {/* Go Back */}
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-md text-sm hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          
          {/* Go Home */}
          <button
            onClick={handleGoHome}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};