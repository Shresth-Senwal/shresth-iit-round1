'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RippleButton from '@/components/ui/RippleButton'
import Link from 'next/link'

interface NavigationItem {
  id: string
  label: string
  href: string
  description?: string
  children?: NavigationItem[]
}

interface HeaderProps {
  className?: string
}

export default function Header({ className = '' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '#dashboard',
      description: 'Data insights and analytics'
    },
    {
      id: 'brand-kits',
      label: 'Brand Kits',
      href: '#brand-kits',
      description: 'Manage your brand assets'
    },
    {
      id: 'services',
      label: 'Services',
      href: '#services',
      description: 'Our service offerings'
    },
    {
      id: 'case-studies',
      label: 'Case Studies',
      href: '#case-studies',
      description: 'Success stories and insights'
    }
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle smooth scrolling
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }

  // Handle dropdown toggle
  const toggleDropdown = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg border-b border-border-light dark:border-border-dark' 
          : 'bg-transparent'
      } ${className}`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg lg:text-xl">D</span>
            </div>
            <span className="text-xl lg:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
              DataFlow
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.id} className="relative">
                {item.children ? (
                  <div className="relative">
                    <motion.button
                      onClick={() => toggleDropdown(item.id)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-1 text-text-light-secondary dark:text-text-dark-secondary hover:text-primary-400 transition-all duration-300 font-medium rounded-md px-3 py-2 hover:bg-transparent focus:outline-none focus:ring-0"
                    >
                      <span>{item.label}</span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.id ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.button>

                    <AnimatePresence>
                      {activeDropdown === item.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-background-light dark:bg-background-dark-secondary border border-border-light dark:border-border-dark rounded-lg shadow-medium dark:shadow-dark-medium overflow-hidden"
                        >
                          <div className="p-2">
                            {item.children.map((child) => (
                              <button
                                key={child.id}
                                onClick={() => handleNavClick(child.href)}
                                className="w-full text-left px-4 py-3 rounded-md text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary hover:bg-background-light-secondary dark:hover:bg-background-dark-tertiary transition-all duration-200"
                              >
                                {child.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button
                    onClick={() => handleNavClick(item.href)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-text-light-secondary dark:text-text-dark-secondary hover:text-primary-400 transition-all duration-300 font-medium rounded-md px-3 py-2 hover:bg-transparent focus:outline-none focus:ring-0"
                  >
                    {item.label}
                  </motion.button>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* CTA Button */}
            <RippleButton 
              variant="primary"
              className="hidden lg:inline-flex"
            >
              Get Started
            </RippleButton>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-2 rounded-md text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary hover:bg-transparent transition-all duration-200 focus:outline-none focus:ring-0"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-background-light dark:bg-background-dark-secondary border-t border-border-light dark:border-border-dark"
            >
              <div className="py-4 space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.id}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.id)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary hover:bg-transparent transition-all duration-200 focus:outline-none focus:ring-0"
                        >
                          <span className="font-medium">{item.label}</span>
                          <svg 
                            className={`w-4 h-4 transition-transform duration-300 ${
                              activeDropdown === item.id ? 'rotate-180' : ''
                            }`}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        <AnimatePresence>
                          {activeDropdown === item.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-background-light-secondary dark:bg-background-dark-tertiary"
                            >
                              {item.children.map((child) => (
                                <button
                                  key={child.id}
                                  onClick={() => handleNavClick(child.href)}
                                  className="w-full text-left px-8 py-3 text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary transition-colors duration-200 focus:outline-none focus:ring-0"
                                >
                                  {child.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="w-full text-left px-4 py-3 text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary hover:bg-transparent transition-all duration-200 font-medium focus:outline-none focus:ring-0"
                      >
                        {item.label}
                      </button>
                    )}
                  </div>
                ))}

                {/* Mobile CTA */}
                <div className="px-4 pt-4">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary focus:outline-none focus:ring-0"
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
} 