'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'service' | 'testimonial' | 'feature'
  className?: string
  hover?: boolean
  delay?: number
}

export default function Card({ 
  children, 
  variant = 'default', 
  className = '',
  hover = true,
  delay = 0
}: CardProps) {
  const baseClasses = "rounded-lg overflow-hidden transition-all duration-300"
  
  const variantClasses = {
    default: "bg-background-light dark:bg-background-dark-secondary shadow-lg dark:shadow-dark-medium border border-border-light dark:border-border-dark p-6",
    service: "bg-background-light dark:bg-background-dark-secondary shadow-xl dark:shadow-dark-large border border-border-light dark:border-border-dark p-8 group hover:border-primary-500/50 dark:hover:border-primary-500/50",
    testimonial: "bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 shadow-lg dark:shadow-dark-medium border border-primary-200 dark:border-primary-700 p-6",
    feature: "bg-background-light dark:bg-background-dark-secondary shadow-lg hover:shadow-xl dark:hover:shadow-dark-large border border-border-light dark:border-border-dark p-6"
  }

  const hoverAnimation = hover ? {
    whileHover: { 
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3 }
    },
    whileTap: { scale: 0.98 }
  } : {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      {...hoverAnimation}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Service Card Component
interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  features?: string[]
  className?: string
  delay?: number
}

export function ServiceCard({ 
  icon, 
  title, 
  description, 
  features, 
  className = '',
  delay = 0 
}: ServiceCardProps) {
  return (
    <Card variant="service" className={className} delay={delay}>
      <div className="text-center">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 dark:group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300"
        >
          {icon}
        </motion.div>
        
        <h3 className="text-xl font-semibold mb-4 text-text-light-primary dark:text-text-dark-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-6 leading-relaxed">
          {description}
        </p>
        
        {features && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: delay + 0.1 * index }}
                className="flex items-center text-sm text-text-light-secondary dark:text-text-dark-secondary"
              >
                <span className="w-2 h-2 bg-primary-400 dark:bg-primary-500 rounded-full mr-3"></span>
                {feature}
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  )
}

// Testimonial Card Component
interface TestimonialCardProps {
  content: string
  author: string
  role: string
  company: string
  avatar?: string
  rating?: number
  className?: string
  delay?: number
}

export function TestimonialCard({ 
  content, 
  author, 
  role, 
  company, 
  avatar, 
  rating = 5,
  className = '',
  delay = 0 
}: TestimonialCardProps) {
  return (
    <Card variant="testimonial" className={className} delay={delay}>
      <div className="relative">
        {/* Quote Icon */}
        <div className="absolute -top-2 -left-2 text-4xl text-primary-300 dark:text-primary-600 opacity-50">
          &ldquo;
        </div>
        
        {/* Rating */}
        {rating && (
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: delay + 0.1 * i }}
                className={`text-lg ${i < rating ? 'text-yellow-400 dark:text-yellow-300' : 'text-gray-300 dark:text-gray-600'}`}
              >
                ★
              </motion.span>
            ))}
          </div>
        )}
        
        {/* Content */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
          className="text-text-light-primary dark:text-text-dark-primary italic mb-6 leading-relaxed"
        >
          {content}
        </motion.p>
        
        {/* Author */}
        <div className="flex items-center">
          {avatar && (
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: delay + 0.3 }}
              src={avatar}
              alt={author}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
          )}
          <div>
            <motion.h4
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: delay + 0.4 }}
              className="font-semibold text-text-light-primary dark:text-text-dark-primary"
            >
              {author}
            </motion.h4>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: delay + 0.5 }}
              className="text-sm text-text-light-secondary dark:text-text-dark-secondary"
            >
              {role} at {company}
            </motion.p>
          </div>
        </div>
      </div>
    </Card>
  )
} 