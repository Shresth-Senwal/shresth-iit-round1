'use client'

import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface InteractiveCardProps {
  title: string
  description?: string
  children?: ReactNode
  icon?: ReactNode
  badge?: string
  badgeColor?: 'primary' | 'success' | 'warning' | 'error' | 'purple'
  variant?: 'default' | 'gradient' | 'glass' | 'bordered'
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  onHover?: () => void
  className?: string
}

export default function InteractiveCard({
  title,
  description,
  children,
  icon,
  badge,
  badgeColor = 'primary',
  variant = 'default',
  size = 'md',
  interactive = true,
  loading = false,
  disabled = false,
  onClick,
  onHover,
  className = ''
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick()
    }
  }

  const handleMouseEnter = () => {
    if (!disabled && !loading) {
      setIsHovered(true)
      if (onHover) onHover()
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsPressed(false)
  }

  const handleMouseDown = () => {
    if (!disabled && !loading) {
      setIsPressed(true)
    }
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  // Size variants
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  // Variant styles
  const variantClasses = {
    default: 'bg-background-light dark:bg-background-dark-secondary border border-border-light dark:border-border-dark',
    gradient: 'bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border border-primary-200 dark:border-primary-700',
    glass: 'glass dark:glass-dark',
    bordered: 'bg-transparent border-2 border-primary-200 dark:border-primary-700'
  }

  // Badge colors
  const badgeColors = {
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
    success: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-300',
    warning: 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-300',
    error: 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-300',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
  }

  const baseClasses = `
    relative rounded-xl transition-all duration-300 overflow-hidden
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${interactive && !disabled && !loading ? 'cursor-pointer' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `

  const hoverClasses = interactive && !disabled && !loading ? `
    hover:shadow-medium dark:hover:shadow-dark-medium
    hover:-translate-y-1
    ${variant === 'gradient' ? 'hover:shadow-primary-200/50 dark:hover:shadow-primary-900/50' : ''}
  ` : ''

  const pressedClasses = isPressed ? 'scale-[0.98]' : ''

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${pressedClasses}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      whileHover={interactive && !disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={interactive && !disabled && !loading ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm flex items-center justify-center z-10"
          >
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Loading...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Glow Effect */}
      {interactive && isHovered && !disabled && !loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 pointer-events-none" />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="flex-shrink-0 p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-1">
                {description}
              </p>
            )}
          </div>
        </div>

        {badge && (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeColors[badgeColor]}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      {children && (
        <div className="space-y-4">
          {children}
        </div>
      )}

      {/* Interactive Indicator */}
      {interactive && !disabled && !loading && (
        <motion.div
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      )}

      {/* Focus Ring */}
      {interactive && (
        <div className="absolute inset-0 rounded-xl ring-2 ring-transparent focus-within:ring-primary-500 dark:focus-within:ring-primary-400 transition-all duration-200" />
      )}
    </motion.div>
  )
}

// Specialized Card Variants
export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon,
  loading = false,
  ...props 
}: {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: ReactNode
  loading?: boolean
} & Omit<InteractiveCardProps, 'children'>) {
  const changeColors = {
    positive: 'text-success-600 dark:text-success-400',
    negative: 'text-error-600 dark:text-error-400',
    neutral: 'text-text-light-secondary dark:text-text-dark-secondary'
  }

  return (
    <InteractiveCard
      title={title}
      icon={icon}
      loading={loading}
      {...props}
    >
      <div className="space-y-2">
        <div className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
          {loading ? (
            <div className="loading-skeleton h-8 w-24 rounded"></div>
          ) : (
            value
          )}
        </div>
        {change && !loading && (
          <div className={`text-sm font-medium ${changeColors[changeType]}`}>
            {change}
          </div>
        )}
      </div>
    </InteractiveCard>
  )
}

export function ActionCard({
  title,
  description,
  actionLabel,
  onAction,
  loading = false,
  disabled = false,
  ...props
}: {
  actionLabel: string
  onAction: () => void
} & InteractiveCardProps) {
  return (
    <InteractiveCard
      title={title}
      description={description}
      loading={loading}
      disabled={disabled}
      {...props}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onAction()
        }}
        disabled={loading || disabled}
        className="btn-primary w-full"
      >
        {loading ? 'Processing...' : actionLabel}
      </button>
    </InteractiveCard>
  )
} 