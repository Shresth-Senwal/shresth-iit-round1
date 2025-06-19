'use client'

import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { RefObject } from 'react'

interface ParallaxOptions {
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  range?: [number, number]
}

export function useParallax(
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) {
  const { speed = 0.5, direction = 'up', range = [0, 1] } = options

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  let transform: MotionValue<number>

  switch (direction) {
    case 'up':
      transform = useTransform(scrollYProgress, range, [-100 * speed, 100 * speed])
      break
    case 'down':
      transform = useTransform(scrollYProgress, range, [100 * speed, -100 * speed])
      break
    case 'left':
      transform = useTransform(scrollYProgress, range, [-100 * speed, 100 * speed])
      break
    case 'right':
      transform = useTransform(scrollYProgress, range, [100 * speed, -100 * speed])
      break
    default:
      transform = useTransform(scrollYProgress, range, [-100 * speed, 100 * speed])
  }

  return {
    y: direction === 'up' || direction === 'down' ? transform : 0,
    x: direction === 'left' || direction === 'right' ? transform : 0,
    scrollYProgress
  }
}

export function useParallaxScale(
  ref: RefObject<HTMLElement>,
  scaleRange: [number, number] = [0.8, 1.2]
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], 1, scaleRange[1]])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return { scale, opacity, scrollYProgress }
}

export function useParallaxRotate(
  ref: RefObject<HTMLElement>,
  rotateRange: [number, number] = [-10, 10]
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange)

  return { rotate, scrollYProgress }
}

// Advanced parallax for background elements
export function useBackgroundParallax(speed: number = 0.5) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -1000 * speed])
  
  return { y }
}

// Staggered parallax for multiple elements
export function useStaggeredParallax(
  refs: RefObject<HTMLElement>[],
  baseSpeed: number = 0.5,
  staggerDelay: number = 0.1
) {
  return refs.map((ref, index) => {
    const speed = baseSpeed + (index * staggerDelay)
    return useParallax(ref, { speed })
  })
} 