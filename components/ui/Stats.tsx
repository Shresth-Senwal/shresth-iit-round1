'use client'

import { motion } from 'framer-motion'
import { useCountUp } from '@/utils/hooks/useCountUp'
import { StatItem } from '@/utils/data/statsData'

interface StatCardProps {
  stat: StatItem
  delay?: number
}

function StatCard({ stat, delay = 0 }: StatCardProps) {
  const { displayValue, ref } = useCountUp({
    end: stat.value,
    duration: 2.5,
    delay,
    suffix: stat.suffix || '',
    prefix: stat.prefix || ''
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full -translate-y-8 translate-x-8 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
      
      {/* Icon */}
      <motion.div 
        className="text-4xl mb-4 relative z-10"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        {stat.icon}
      </motion.div>

      {/* Number */}
      <motion.div 
        className="text-4xl font-bold text-gradient mb-2 relative z-10"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
        viewport={{ once: true }}
      >
        {displayValue}
      </motion.div>

      {/* Label */}
      <motion.h3 
        className="text-xl font-semibold text-gray-900 mb-2 relative z-10 group-hover:text-primary-600 transition-colors duration-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.5 }}
        viewport={{ once: true }}
      >
        {stat.label}
      </motion.h3>

      {/* Description */}
      <motion.p 
        className="text-gray-600 text-sm relative z-10 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.7 }}
        viewport={{ once: true }}
      >
        {stat.description}
      </motion.p>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-blue-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    </motion.div>
  )
}

interface StatsProps {
  stats: StatItem[]
  title?: string
  subtitle?: string
  className?: string
}

export default function Stats({ 
  stats, 
  title = "Our Achievements", 
  subtitle = "Numbers that speak for our success and dedication",
  className = ""
}: StatsProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              stat={stat}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="relative mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute left-1/2 top-0 w-2 h-2 bg-primary-400 rounded-full -translate-x-1/2"
          />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 1, delay: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
          />
        </div>
      </div>
    </section>
  )
} 