'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface CursorTrailProps {
  variant?: 'ripple' | 'particle' | 'magnetic' | 'trail'
  trailLength?: number
  color?: string
  size?: number
  disabled?: boolean
}

interface TrailPoint {
  x: number
  y: number
  opacity: number
  scale: number
  id: number
  timestamp: number
}

export default function CursorTrail({
  variant = 'ripple',
  trailLength = 15,
  color = 'rgba(255,255,255,0.3)',
  size = 20,
  disabled = false
}: CursorTrailProps) {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [isActive, setIsActive] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 })
  const pointId = useRef(0)
  const rafId = useRef<number | undefined>(undefined)
  const lastUpdate = useRef(0)
  const hideTimeout = useRef<NodeJS.Timeout | undefined>(undefined)

  // Smooth mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = performance.now()
    
    // Throttle updates for performance
    if (now - lastUpdate.current < 16) return // ~60fps
    
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
    setIsActive(true)
    lastUpdate.current = now

    // Clear hide timeout
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current)
    }

    // Add new trail point
    const newPoint: TrailPoint = {
      x: e.clientX,
      y: e.clientY,
      opacity: 1,
      scale: 1,
      id: pointId.current++,
      timestamp: now
    }

    setTrail(prev => [newPoint, ...prev.slice(0, trailLength - 1)])

    // Set hide timeout
    hideTimeout.current = setTimeout(() => {
      setIsActive(false)
    }, 150) // Quick fade after stopping
  }, [trailLength, mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    setIsActive(false)
    setTrail([])
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isActive && trail.length === 0) return

    const animate = () => {
      const now = performance.now()
      
      setTrail(prev => {
        const updated = prev
          .map((point, index) => {
            const age = now - point.timestamp
            const maxAge = isActive ? 800 : 400 // Faster fade when inactive
            const progress = Math.min(age / maxAge, 1)
            
            // Smooth easing
            const easeOut = 1 - Math.pow(progress, 2)
            
            return {
              ...point,
              opacity: easeOut * (1 - index * 0.1), // Fade based on position and age
              scale: easeOut * (1 - index * 0.05)
            }
          })
          .filter(point => point.opacity > 0.01)

        return updated
      })

      if (isActive || trail.length > 0) {
        rafId.current = requestAnimationFrame(animate)
      }
    }

    rafId.current = requestAnimationFrame(animate)

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [isActive, trail.length])

  // Event listeners
  useEffect(() => {
    if (disabled) return

    const options = { passive: true }
    document.addEventListener('mousemove', handleMouseMove, options)
    document.addEventListener('mouseleave', handleMouseLeave, options)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current)
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [disabled, handleMouseMove, handleMouseLeave])

  if (disabled || trail.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {variant === 'ripple' && trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: point.x - (size * point.scale) / 2,
            top: point.y - (size * point.scale) / 2,
            width: size * point.scale,
            height: size * point.scale,
            background: `radial-gradient(circle, 
              rgba(255,255,255,${0.3 * point.opacity}) 0%, 
              rgba(255,255,255,${0.1 * point.opacity}) 50%, 
              transparent 80%)`,
            border: `1px solid rgba(255,255,255,${0.1 * point.opacity})`,
            opacity: point.opacity,
            filter: `blur(${Math.max(0, 1 - index * 0.1)}px)`,
            transform: `scale(${point.scale})`,
            transition: 'none'
          }}
        />
      ))}

      {variant === 'trail' && trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: point.x - 2,
            top: point.y - 2,
            width: 4,
            height: 4,
            background: color,
            opacity: point.opacity,
            transform: `scale(${point.scale})`,
            transition: 'none'
          }}
        />
      ))}

      {variant === 'particle' && trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute will-change-transform"
          style={{
            left: point.x - 1,
            top: point.y - 1,
            width: 2,
            height: 2,
            background: color,
            opacity: point.opacity * 0.8,
            borderRadius: '50%',
            transform: `scale(${point.scale})`,
            transition: 'none'
          }}
        />
      ))}

      {variant === 'magnetic' && trail.length > 0 && (
        <motion.div
          className="absolute rounded-full will-change-transform"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%'
          }}
        >
          <div
            className="w-6 h-6 rounded-full border-2 border-white/20"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              filter: 'blur(0.5px)'
            }}
          />
        </motion.div>
      )}
    </div>
  )
}

// Simplified particle cursor for lightweight use
export function ParticleCursor({
  enabled = true,
  particleCount = 3,
  particleSize = 2,
  color = 'rgba(255,255,255,0.4)'
}: {
  enabled?: boolean
  particleCount?: number
  particleSize?: number
  color?: string
}) {
  const [particles, setParticles] = useState<Array<{ 
    x: number; y: number; id: number; life: number
  }>>([])
  const particleId = useRef(0)

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      const newParticles = Array.from({ length: particleCount }, () => ({
        x: e.clientX + (Math.random() - 0.5) * 8,
        y: e.clientY + (Math.random() - 0.5) * 8,
        id: particleId.current++,
        life: 20
      }))

      setParticles(prev => [...prev, ...newParticles].slice(-15))
    }

    const animate = () => {
      setParticles(prev => 
        prev
          .map(particle => ({ ...particle, life: particle.life - 1 }))
          .filter(particle => particle.life > 0)
      )
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    const animationId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [enabled, particleCount])

  if (!enabled) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particleSize,
            height: particleSize,
            background: color,
            opacity: particle.life / 20,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  )
}

// Magnetic cursor effect
export function MagneticCursor({
  enabled = true,
  magneticElements = '.magnetic',
  strength = 0.3
}: {
  enabled?: boolean
  magneticElements?: string
  strength?: number
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      const magneticEls = document.querySelectorAll(magneticElements)
      magneticEls.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        )

        if (distance < 80) {
          const deltaX = (e.clientX - centerX) * strength
          const deltaY = (e.clientY - centerY) * strength
          ;(el as HTMLElement).style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`
        } else {
          ;(el as HTMLElement).style.transform = 'translate3d(0px, 0px, 0)'
        }
      })
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [enabled, magneticElements, strength, mouseX, mouseY])

  return null
} 