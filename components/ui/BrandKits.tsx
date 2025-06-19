'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface BrandKit {
  id: string
  name: string
  icon: string
  color: string
  isSelected: boolean
  status: 'active' | 'pending' | 'inactive'
  lastUpdated: string
  files: number
  size: string
}

interface BrandKitsProps {
  className?: string
}

export default function BrandKits({ className = '' }: BrandKitsProps) {
  const [brandKits, setBrandKits] = useState<BrandKit[]>([
    {
      id: '1',
      name: 'ECorp',
      icon: '☁️',
      color: 'emerald',
      isSelected: false,
      status: 'active',
      lastUpdated: '2 hours ago',
      files: 24,
      size: '2.3 GB'
    },
    {
      id: '2',
      name: 'ICorp',
      icon: '☁️',
      color: 'orange',
      isSelected: false,
      status: 'active',
      lastUpdated: '1 day ago',
      files: 18,
      size: '1.8 GB'
    },
    {
      id: '3',
      name: 'The Agency',
      icon: '☁️',
      color: 'red',
      isSelected: true,
      status: 'active',
      lastUpdated: '3 hours ago',
      files: 42,
      size: '3.7 GB'
    },
    {
      id: '4',
      name: 'TechFlow',
      icon: '☁️',
      color: 'blue',
      isSelected: false,
      status: 'pending',
      lastUpdated: '5 days ago',
      files: 12,
      size: '0.9 GB'
    },
    {
      id: '5',
      name: 'DataViz Co',
      icon: '☁️',
      color: 'purple',
      isSelected: false,
      status: 'inactive',
      lastUpdated: '2 weeks ago',
      files: 8,
      size: '0.4 GB'
    }
  ])

  const toggleSelection = (id: string) => {
    setBrandKits(prev => 
      prev.map(kit => 
        kit.id === id ? { ...kit, isSelected: !kit.isSelected } : kit
      )
    )
  }

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      emerald: 'from-emerald-500 to-emerald-600',
      orange: 'from-orange-500 to-orange-600',
      red: 'from-red-500 to-red-600',
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600'
    }
    return colorMap[color] || 'from-gray-500 to-gray-600'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success-400'
      case 'pending': return 'text-warning-400'
      case 'inactive': return 'text-error-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <section className={`py-16 bg-background-dark text-text-dark-primary ${className}`}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Brand Kits</h2>
          <p className="text-text-dark-secondary text-lg max-w-2xl">
            Manage and organize your brand assets with our cloud-based brand kit management system. 
            Keep your brand consistency across all projects.
          </p>
        </motion.div>

        {/* Brand Kits Grid */}
        <div className="space-y-4">
          {brandKits.map((kit, index) => (
            <motion.div
              key={kit.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                kit.isSelected
                  ? 'bg-gradient-border border-transparent shadow-glow-purple'
                  : 'bg-background-dark-secondary border-border-dark hover:border-primary-500/50'
              }`}
            >
              {/* Gradient Border for Selected Items */}
              {kit.isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-20 animate-gradient-border" />
              )}

              <div className="relative p-6 flex items-center justify-between">
                {/* Left Section - Checkbox, Icon, Name */}
                <div className="flex items-center gap-4">
                  {/* Custom Checkbox */}
                  <button
                    onClick={() => toggleSelection(kit.id)}
                    className={`relative w-6 h-6 rounded-md border-2 transition-all duration-300 ${
                      kit.isSelected
                        ? 'bg-primary-500 border-primary-500'
                        : 'border-border-dark hover:border-primary-500'
                    }`}
                  >
                    {kit.isSelected && (
                      <motion.svg
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-4 h-4 text-white absolute inset-0 m-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    )}
                  </button>

                  {/* Brand Icon */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getColorClasses(kit.color)} flex items-center justify-center shadow-lg`}>
                    <span className="text-white text-xl">{kit.icon}</span>
                  </div>

                  {/* Brand Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-dark-primary mb-1">
                      {kit.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-text-dark-tertiary">
                      <span className={`${getStatusColor(kit.status)} capitalize font-medium`}>
                        ● {kit.status}
                      </span>
                      <span>•</span>
                      <span>{kit.files} files</span>
                      <span>•</span>
                      <span>{kit.size}</span>
                    </div>
                  </div>
                </div>

                {/* Right Section - Actions */}
                <div className="flex items-center gap-4">
                  {/* Last Updated */}
                  <div className="text-right hidden sm:block">
                    <div className="text-sm text-text-dark-tertiary">Last updated</div>
                    <div className="text-sm text-text-dark-secondary font-medium">{kit.lastUpdated}</div>
                  </div>

                  {/* Settings Button */}
                  <button className="w-10 h-10 rounded-lg bg-background-dark-tertiary hover:bg-background-dark border border-border-dark hover:border-primary-500 transition-all duration-300 flex items-center justify-center group-hover:scale-110">
                    <svg
                      className="w-5 h-5 text-text-dark-tertiary hover:text-primary-400 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Hover Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <button className="btn btn-primary btn-md">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Brand Kit
          </button>
          
          <button className="btn btn-secondary btn-md">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Selected
          </button>

          <button className="btn btn-outline btn-md border-border-dark text-text-dark-secondary hover:text-text-dark-primary">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Manage Settings
          </button>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Total Brand Kits', value: brandKits.length, color: 'primary' },
            { label: 'Active Kits', value: brandKits.filter(kit => kit.status === 'active').length, color: 'success' },
            { label: 'Selected', value: brandKits.filter(kit => kit.isSelected).length, color: 'purple' },
            { label: 'Total Storage', value: '8.1 GB', color: 'warning' }
          ].map((stat, index) => (
            <div key={stat.label} className="metric-card">
              <div className="text-text-dark-tertiary text-sm mb-1">{stat.label}</div>
              <div className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 