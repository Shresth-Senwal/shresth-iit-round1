'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: 'light' | 'dark' // The actual resolved theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'dark', // Default to dark theme as per requirements
  storageKey = 'ui-theme' 
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load theme from localStorage on mount
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem(storageKey) as Theme
      if (storedTheme) {
        setTheme(storedTheme)
      }
    }
  }, [storageKey])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement

    // Remove previous theme classes
    root.classList.remove('light', 'dark')

    let resolvedTheme: 'light' | 'dark'

    if (theme === 'system') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
      resolvedTheme = theme
    }

    // Apply theme class to root element
    root.classList.add(resolvedTheme)
    setActualTheme(resolvedTheme)

    // Store theme in localStorage
    localStorage.setItem(storageKey, theme)

    // Listen for system theme changes when theme is set to 'system'
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleChange = (e: MediaQueryListEvent) => {
        const newTheme = e.matches ? 'dark' : 'light'
        root.classList.remove('light', 'dark')
        root.classList.add(newTheme)
        setActualTheme(newTheme)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme, storageKey, mounted])

  const value = {
    theme,
    setTheme,
    actualTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      <div className="theme-transition" suppressHydrationWarning={!mounted}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

// Theme Toggle Component
interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'icon' | 'button' | 'switch'
}

export function ThemeToggle({ 
  className = '', 
  size = 'md',
  variant = 'icon'
}: ThemeToggleProps) {
  const { theme, setTheme, actualTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  }

  if (variant === 'switch') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <span className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary">
          Light
        </span>
        <button
          onClick={toggleTheme}
          className={`relative inline-flex items-center ${sizeClasses[size]} rounded-full border-2 border-primary-200 dark:border-primary-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-800`}
          style={{ width: '3rem' }}
        >
          <span
            className={`inline-block w-4 h-4 transform rounded-full bg-white dark:bg-primary-500 transition-transform duration-300 ${
              actualTheme === 'dark' ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
        <span className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary">
          Dark
        </span>
      </div>
    )
  }

  if (variant === 'button') {
    return (
      <button
        onClick={toggleTheme}
        className={`inline-flex items-center justify-center ${sizeClasses[size]} rounded-lg bg-background-light-secondary dark:bg-background-dark-secondary hover:bg-background-light-tertiary dark:hover:bg-background-dark-tertiary border border-border-light dark:border-border-dark transition-all duration-300 ${className}`}
      >
        <span className="text-text-light-primary dark:text-text-dark-primary">
          {actualTheme === 'dark' ? '🌙' : '☀️'}
        </span>
        <span className="ml-2 text-sm font-medium text-text-light-primary dark:text-text-dark-primary capitalize">
          {theme}
        </span>
      </button>
    )
  }

  // Default icon variant
  return (
    <button
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center ${sizeClasses[size]} rounded-lg bg-background-light-secondary dark:bg-background-dark-secondary hover:bg-background-light-tertiary dark:hover:bg-background-dark-tertiary border border-border-light dark:border-border-dark transition-all duration-300 group ${className}`}
      title={`Current theme: ${theme} (${actualTheme})`}
    >
      {/* Sun Icon */}
      <svg
        className={`w-5 h-5 transition-all duration-300 ${
          actualTheme === 'dark' 
            ? 'scale-0 opacity-0 rotate-90' 
            : 'scale-100 opacity-100 rotate-0'
        } text-warning-500 group-hover:text-warning-600`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
      </svg>
      
      {/* Moon Icon */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-300 ${
          actualTheme === 'dark' 
            ? 'scale-100 opacity-100 rotate-0' 
            : 'scale-0 opacity-0 -rotate-90'
        } text-primary-400 group-hover:text-primary-300`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
      </svg>
    </button>
  )
}

// Theme Status Indicator (for debugging)
export function ThemeStatus() {
  const { theme, actualTheme } = useTheme()
  
  return (
    <div className="fixed bottom-4 right-4 p-2 bg-background-light-secondary dark:bg-background-dark-secondary border border-border-light dark:border-border-dark rounded-lg text-xs text-text-light-secondary dark:text-text-dark-secondary">
      Theme: {theme} | Actual: {actualTheme}
    </div>
  )
} 