'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, ReactNode } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollTriggeredPopupProps {
  children: ReactNode
  triggerOffset?: number
  showDelay?: number
  autoHide?: boolean
  autoHideDelay?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center'
  className?: string
  backdrop?: boolean
  onShow?: () => void
  onHide?: () => void
}

export default function ScrollTriggeredPopup({
  children,
  triggerOffset = 0.3,
  showDelay = 500,
  autoHide = false,
  autoHideDelay = 5000,
  position = 'bottom-right',
  className = '',
  backdrop = false,
  onShow,
  onHide
}: ScrollTriggeredPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: triggerOffset })

  useEffect(() => {
    if (isInView && !hasTriggered) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        setHasTriggered(true)
        onShow?.()
      }, showDelay)

      return () => clearTimeout(timer)
    }
  }, [isInView, hasTriggered, showDelay, onShow])

  useEffect(() => {
    if (isVisible && autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onHide?.()
      }, autoHideDelay)

      return () => clearTimeout(timer)
    }
  }, [isVisible, autoHide, autoHideDelay, onHide])

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4'
      case 'top-left':
        return 'top-4 left-4'
      case 'bottom-right':
        return 'bottom-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'center':
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
      default:
        return 'bottom-4 right-4'
    }
  }

  const popupVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: position.includes('bottom') ? 20 : -20,
      x: position.includes('right') ? 20 : position.includes('left') ? -20 : 0
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 500,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: position.includes('bottom') ? 20 : -20,
      x: position.includes('right') ? 20 : position.includes('left') ? -20 : 0,
      transition: {
        duration: 0.2
      }
    }
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const handleClose = () => {
    setIsVisible(false)
    onHide?.()
  }

  return (
    <>
      {/* Trigger Element (invisible) */}
      <div ref={ref} className="absolute inset-0 pointer-events-none" />

      {/* Popup Portal */}
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Backdrop */}
            {backdrop && (
              <motion.div
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={handleClose}
              />
            )}

            {/* Popup */}
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`
                fixed z-50 max-w-sm w-full
                ${getPositionClasses()}
                ${className}
              `}
            >
              <div className="relative bg-background-light dark:bg-background-dark-secondary rounded-xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background-light-secondary dark:bg-background-dark-tertiary hover:bg-background-light-tertiary dark:hover:bg-background-dark text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary transition-all duration-200 flex items-center justify-center z-10"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content */}
                <div className="p-6">
                  {children}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Predefined popup types for common use cases
export function CTAPopup({
  title,
  description,
  buttonText = 'Get Started',
  onButtonClick,
  ...props
}: {
  title: string
  description: string
  buttonText?: string
  onButtonClick?: () => void
} & Omit<ScrollTriggeredPopupProps, 'children'>) {
  return (
    <ScrollTriggeredPopup {...props}>
      <div className="text-center">
        <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-2">
          {title}
        </h3>
        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-4">
          {description}
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onButtonClick}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
        >
          {buttonText}
        </motion.button>
      </div>
    </ScrollTriggeredPopup>
  )
}

export function NewsletterPopup({
  onSubscribe,
  ...props
}: {
  onSubscribe?: (email: string) => void
} & Omit<ScrollTriggeredPopupProps, 'children'>) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      onSubscribe?.(email)
      setEmail('')
    }
  }

  return (
    <ScrollTriggeredPopup {...props}>
      <div>
        <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-2">
          Stay Updated
        </h3>
        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-4">
          Get the latest insights and updates delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light-primary dark:text-text-dark-primary focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            required
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
          >
            Subscribe
          </motion.button>
        </form>
      </div>
    </ScrollTriggeredPopup>
  )
} 