'use client'

import { useState, useEffect } from 'react'

export function usePageLoader(delay: number = 2000) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return { isLoading, setIsLoading }
} 