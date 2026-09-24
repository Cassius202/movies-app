'use client'

import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    
    // Set initial value
    setMatches(mediaQuery.matches)

    // Callback for media query changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add event listener
    mediaQuery.addEventListener('change', handler)
    
    // Cleanup
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}