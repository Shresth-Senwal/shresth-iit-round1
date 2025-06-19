'use client'

import { motion } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/ThemeProvider'

interface RatingBadgeProps {
  platform: string
  rating: number
  maxRating?: number
  reviews?: string
  icon?: string
  delay?: number
}

function RatingBadge({ platform, rating, maxRating = 5, reviews, icon, delay = 0 }: RatingBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex items-center gap-3 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20 dark:border-gray-700/50"
    >
      {icon && (
        <div className="flex-shrink-0 w-6 h-6 bg-white rounded-sm flex items-center justify-center">
          <span className="text-xs font-bold text-gray-800">{icon}</span>
        </div>
      )}
      <div className="flex items-center gap-1">
        <span className="text-white font-semibold">★ {rating}</span>
        <span className="text-white/80 text-sm">rating on</span>
        <span className="text-white font-medium">{platform}</span>
      </div>
      {reviews && (
        <span className="text-white/60 text-sm">{reviews}</span>
      )}
    </motion.div>
  )
}

interface HeroProps {
  className?: string
}

export default function Hero({ className = '' }: HeroProps) {
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Hero Gradient Background */}
      <div className="absolute inset-0 hero-gradient">
        {/* Overlay Pattern */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Orbs */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />
        </div>
      </div>

      {/* Theme Toggle - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle size="lg" variant="icon" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <div className="max-w-5xl mx-auto">
          {/* Rating Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <RatingBadge 
              platform="Capterra" 
              rating={4.8} 
              reviews=""
              icon="C"
              delay={0.2}
            />
            <RatingBadge 
              platform="G2" 
              rating={4.8} 
              reviews=""
              icon="G"
              delay={0.4}
            />
            <RatingBadge 
              platform="Xero" 
              rating={4.7}
              reviews="350+ reviews"
              icon="X"
              delay={0.6}
            />
            <RatingBadge 
              platform="QuickBooks" 
              rating={4.9}
              reviews="550+ reviews"
              icon="Q"
              delay={0.8}
            />
          </div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Intelligent Data Solutions for
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-cyan-400 to-primary-500 bg-clip-text text-transparent">
              Sustainable Business Growth
            </span>
          </motion.h1>

          {/* AI Insights Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 mb-8"
          >
            <span className="text-2xl">✨</span>
            <span className="text-lg font-semibold">Now with AI-insights</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(34, 211, 238, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden bg-gradient-to-r from-cyan-400 to-blue-400 text-gray-900 font-bold px-8 py-4 rounded-lg transition-all duration-300 group"
            >
              <span className="relative z-10">Start 14-day free trial →</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
              className="relative border-2 border-white/30 text-white px-8 py-4 rounded-lg transition-all duration-300 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">📊</span>
                See what we do
              </span>
            </motion.button>
          </motion.div>

          {/* Dashboard Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative max-w-4xl mx-auto"
          >
            {/* Dashboard Container */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
                <div className="text-white/60 text-sm">Professional Dashboard</div>
              </div>

              {/* Dashboard Content */}
              <div className="space-y-4">
                {/* Top Row - Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Revenue", value: "$2.4M", change: "+12%" },
                    { label: "Active Users", value: "18.7K", change: "+8%" },
                    { label: "Conversion", value: "4.2%", change: "+0.3%" },
                    { label: "Growth Rate", value: "23%", change: "+5%" }
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                      className="bg-white/5 rounded-lg p-4 border border-white/10"
                    >
                      <div className="text-white/60 text-xs mb-1">{metric.label}</div>
                      <div className="text-white text-xl font-bold">{metric.value}</div>
                      <div className="text-green-400 text-xs">{metric.change}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Chart Area */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="bg-white/5 rounded-lg p-6 border border-white/10 h-48 flex items-center justify-center"
                >
                  {/* Simulated Chart */}
                  <div className="flex items-end justify-center gap-2 h-32 w-full max-w-md">
                    {[65, 85, 45, 95, 75, 60, 80, 90, 70, 85, 95, 88].map((height, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: 1.8 + index * 0.1 }}
                        className="bg-gradient-to-t from-cyan-400 to-blue-400 w-6 rounded-t-sm"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-success-400 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
            >
              Live Data
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
            >
              AI Powered
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2 }}
            className="mt-12 text-white/60 text-sm"
          >
            Trusted by 10,000+ businesses worldwide
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
    </section>
  )
} 