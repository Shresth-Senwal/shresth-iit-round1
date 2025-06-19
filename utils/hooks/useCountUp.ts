'use client'

import { useEffect, useState } from 'react'
import { useAnimation, useInView } from 'framer-motion'
import { useRef } from 'react'

interface UseCountUpProps {
  end: number
  start?: number
  duration?: number
  delay?: number
  suffix?: string
  prefix?: string
}

export function useCountUp({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = ''
}: UseCountUpProps) {
  const [count, setCount] = useState(start)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        let startTime: number
        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime
          const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
          
          // Easing function (ease-out)
          const easeOut = 1 - Math.pow(1 - progress, 3)
          const currentCount = Math.floor(start + (end - start) * easeOut)
          
          setCount(currentCount)
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            setCount(end)
            setHasAnimated(true)
          }
        }
        
        requestAnimationFrame(animate)
      }, delay * 1000)

      return () => clearTimeout(timer)
    }
  }, [isInView, hasAnimated, start, end, duration, delay])

  const displayValue = `${prefix}${count.toLocaleString()}${suffix}`

  return { count, displayValue, ref }
} 