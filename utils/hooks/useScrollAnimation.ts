'use client'

import { useEffect, useState, useRef, RefObject } from 'react'
import { useInView } from 'framer-motion'

// Custom hook for scroll-triggered animations
export function useScrollAnimation(threshold = 0.1, triggerOnce = true) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { 
    once: triggerOnce
  })

  return { ref, isInView }
}

// Hook for scroll progress
export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return scrollProgress
}

// Hook for element scroll progress
export function useElementScrollProgress(elementRef: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      if (!elementRef.current) return

      const element = elementRef.current
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate how much of the element is visible
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
      const elementHeight = rect.height
      
      if (elementHeight === 0) return
      
      const scrollProgress = Math.max(0, Math.min(1, visibleHeight / elementHeight))
      setProgress(scrollProgress)
    }

    window.addEventListener('scroll', updateProgress)
    window.addEventListener('resize', updateProgress)
    updateProgress() // Initial calculation

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [elementRef])

  return progress
}

// Hook for scroll direction
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction)
      }
      
      setLastScrollY(scrollY > 0 ? scrollY : 0)
    }

    window.addEventListener('scroll', updateScrollDirection)
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [scrollDirection, lastScrollY])

  return scrollDirection
}

// Hook for parallax effect
export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const updateOffset = () => {
      setOffset(window.scrollY * speed)
    }

    window.addEventListener('scroll', updateOffset)
    return () => window.removeEventListener('scroll', updateOffset)
  }, [speed])

  return offset
}

// Hook for scroll-triggered counter animation
export function useScrollCounter(
  end: number,
  start = 0,
  duration = 2000,
  trigger = true
) {
  const [count, setCount] = useState(start)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!trigger || isAnimating) return

    setIsAnimating(true)
    const startTime = Date.now()
    const startValue = start
    const endValue = end

    const updateCount = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = startValue + (endValue - startValue) * easeOut
      
      setCount(Math.round(currentValue))

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setIsAnimating(false)
      }
    }

    requestAnimationFrame(updateCount)
  }, [trigger, end, start, duration, isAnimating])

  return count
}

// Hook for stagger animations
export function useStaggerAnimation(
  items: any[],
  delay = 0.1,
  triggerOnce = true
) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const { ref, isInView } = useScrollAnimation(0.1, triggerOnce)

  useEffect(() => {
    if (!isInView) return

    const showItems = () => {
      items.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, index])
        }, index * delay * 1000)
      })
    }

    showItems()
  }, [isInView, items.length, delay])

  return { ref, visibleItems, isInView }
}

// Hook for scroll-triggered text reveal
export function useTextReveal(text: string, triggerOnce = true) {
  const [revealedText, setRevealedText] = useState('')
  const { ref, isInView } = useScrollAnimation(0.1, triggerOnce)

  useEffect(() => {
    if (!isInView) return

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setRevealedText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 50) // Adjust speed as needed

    return () => clearInterval(interval)
  }, [isInView, text])

  return { ref, revealedText, isComplete: revealedText === text }
}

// Hook for section navigation
export function useSectionNavigation(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id)
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.5 }
      )

      observer.observe(element)
      return observer
    }).filter(Boolean)

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [sectionIds])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return { activeSection, scrollToSection }
}

// Animation variants for common scroll animations
export const scrollAnimationVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  },
  slideInUp: {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }
} 