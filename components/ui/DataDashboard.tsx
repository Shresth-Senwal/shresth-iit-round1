'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { formatNumber } from '@/utils/format'

interface CarbonMetric {
  id: string
  title: string
  value: string
  unit: string
  change: number
  changeFromYear: string
  description: string
  data: number[]
  color: string
  progress?: number
}

interface FilterOption {
  id: string
  label: string
  active: boolean
}

interface DataDashboardProps {
  className?: string
}

export default function DataDashboard({ className = '' }: DataDashboardProps) {
  const [filters, setFilters] = useState<FilterOption[]>([
    { id: 'all', label: 'All', active: true },
    { id: 'refurbishment', label: 'Refurbishment', active: false },
    { id: 'new-build', label: 'New build', active: false }
  ])

  const [statusFilter, setStatusFilter] = useState<FilterOption[]>([
    { id: 'complete', label: 'Complete', active: true },
    { id: 'estimate', label: 'Estimate', active: false }
  ])

  const carbonMetrics: CarbonMetric[] = [
    {
      id: '1',
      title: 'Managed portfolio carbon footprint',
      value: '45,048',
      unit: 'tCO₂e',
      change: 16,
      changeFromYear: '2019',
      description: 'Total carbon emissions across managed portfolio',
      data: [38673, 32813, 14111, 45048],
      color: 'primary',
      progress: 75
    },
    {
      id: '2',
      title: 'Managed portfolio energy intensity',
      value: '123',
      unit: 'kWh/m²',
      change: -22,
      changeFromYear: '2019',
      description: 'Energy consumption per square meter',
      data: [157, 135, 128, 123],
      color: 'success',
      progress: 62
    },
    {
      id: '3',
      title: 'Managed portfolio energy consumption',
      value: '47,790,662',
      unit: 'kWh',
      change: -27,
      changeFromYear: '2019',
      description: 'Total energy consumption across portfolio',
      data: [65198706, 48784205, 49324077, 47790662],
      color: 'warning',
      progress: 88
    }
  ]

  const toggleFilter = (filterId: string, type: 'main' | 'status') => {
    if (type === 'main') {
      setFilters(prev => prev.map(filter => ({
        ...filter,
        active: filter.id === filterId
      })))
    } else {
      setStatusFilter(prev => prev.map(filter => ({
        ...filter,
        active: filter.id === filterId
      })))
    }
  }

  const getChangeColor = (change: number) => {
    return change > 0 ? 'text-error-500' : 'text-success-500'
  }

  const getChangeIcon = (change: number) => {
    return change > 0 ? '↑' : '↓'
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                EMBODIED CARBON EMISSIONS
              </h2>
              <p className="text-text-dark-secondary text-lg">
                Intensity measured by kgCO₂e/m²
              </p>
            </div>
            
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-background-dark-secondary hover:bg-background-dark-tertiary border border-border-dark rounded-lg transition-all duration-300 text-text-dark-primary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              Download the data
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 space-y-4"
        >
          {/* Type Filter */}
          <div>
            <h3 className="text-sm font-medium text-text-dark-secondary mb-3">Filter by</h3>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Type</span>
                              <div className="flex rounded-lg overflow-hidden border border-border-dark">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => toggleFilter(filter.id, 'main')}
                      className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        filter.active
                          ? 'bg-primary-600 text-white'
                          : 'bg-background-dark-secondary text-text-dark-secondary hover:bg-background-dark-tertiary'
                      }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Status</span>
              <div className="flex rounded-lg overflow-hidden border border-border-dark">
                {statusFilter.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id, 'status')}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      filter.active
                        ? 'bg-primary-600 text-white'
                        : 'bg-background-dark-secondary text-text-dark-secondary hover:bg-background-dark-tertiary'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Indicator */}
            <div className="bg-background-dark-secondary rounded-xl p-6 border border-border-dark">
              <h3 className="text-sm font-medium text-text-dark-secondary mb-2">Key</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-1 bg-primary-600 rounded-full"></div>
                  <span className="text-sm">500 kgCO₂e/m² - Embodied Carbon Target 2030</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-1 bg-gray-400 rounded-full"></div>
                  <span className="text-sm">600 kgCO₂e/m² - Embodied Carbon Target 2025</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-background-dark-secondary rounded-xl p-6 border border-border-dark">
              <h3 className="text-sm font-medium text-text-dark-secondary mb-2">Coverage</h3>
              <p className="text-sm">
                Measurements cover 85% of managed portfolio by floor area. 
                Data includes both operational and embodied carbon calculations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Carbon Emissions Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="bg-background-dark-secondary border border-border-dark rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Carbon Emissions Trends</h3>
                              <div className="flex items-center gap-2 text-sm text-text-dark-secondary">
                  <span>Last 4 years</span>
                </div>
            </div>
            
            <div className="relative">
              {/* Chart Container */}
              <div className="h-96 flex items-end justify-between gap-6 px-4">
                {carbonMetrics[0].data.map((value, index) => {
                  const year = ['2019', '2020', '2021', '2022'][index]
                  const height = Math.max((value / Math.max(...carbonMetrics[0].data)) * 100, 15) // Minimum 15% height
                  const colors = [
                    'bg-gradient-to-t from-red-500 to-red-400', // 2019 - Red
                    'bg-gradient-to-t from-orange-500 to-orange-400', // 2020 - Orange  
                    'bg-gradient-to-t from-yellow-500 to-yellow-400', // 2021 - Yellow
                    'bg-gradient-to-t from-green-500 to-green-400' // 2022 - Green (improvement)
                  ]
                  
                  return (
                    <div key={year} className="flex-1 flex flex-col items-center">
                      {/* Bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                        viewport={{ once: true }}
                        className={`w-full max-w-20 rounded-t-lg mb-3 ${colors[index]} relative group cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-white/10`}
                        style={{ minHeight: '30px' }}
                      >
                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-background-dark text-text-dark-primary text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-border-dark shadow-lg">
                          {formatNumber(value)} tCO₂e
                        </div>
                        
                        {/* Value on bar */}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold">
                          {formatNumber(value)}
                        </div>
                      </motion.div>
                      
                      {/* Year Label */}
                      <span className="text-sm text-text-dark-primary font-medium">
                        {year}
                      </span>
                      
                      {/* Change indicator */}
                      {index > 0 && (
                        <span className={`text-xs mt-1 ${
                          value < carbonMetrics[0].data[index - 1] 
                            ? 'text-green-400' 
                            : 'text-red-400'
                        }`}>
                          {value < carbonMetrics[0].data[index - 1] ? '↓' : '↑'}
                          {Math.abs(((value - carbonMetrics[0].data[index - 1]) / carbonMetrics[0].data[index - 1]) * 100).toFixed(1)}%
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-96 flex flex-col justify-between text-xs text-text-dark-secondary">
                <span>{formatNumber(Math.max(...carbonMetrics[0].data))}</span>
                <span>{formatNumber(Math.max(...carbonMetrics[0].data) * 0.75)}</span>
                <span>{formatNumber(Math.max(...carbonMetrics[0].data) * 0.5)}</span>
                <span>{formatNumber(Math.max(...carbonMetrics[0].data) * 0.25)}</span>
                <span>0</span>
              </div>
            </div>
            
            {/* Chart Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border-dark">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-400 rounded"></div>
                <span className="text-sm text-text-dark-secondary">2019</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-400 rounded"></div>
                <span className="text-sm text-text-dark-secondary">2020</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded"></div>
                <span className="text-sm text-text-dark-secondary">2021</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-400 rounded"></div>
                <span className="text-sm text-text-dark-secondary">2022</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Carbon Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {carbonMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-background-dark-secondary border border-border-dark rounded-xl p-6 hover:shadow-dark-medium transition-all duration-300"
            >
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{metric.title}</h3>
                <p className="text-sm text-text-dark-secondary">{metric.description}</p>
              </div>

              {/* Main Value */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold">{metric.value}</span>
                  <span className="text-sm text-text-dark-secondary">{metric.unit}</span>
                </div>
                
                {/* Change Indicator */}
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${getChangeColor(metric.change)}`}>
                    {getChangeIcon(metric.change)} {Math.abs(metric.change)}%
                  </span>
                  <span className="text-sm text-text-dark-secondary">
                    from {metric.changeFromYear}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              {metric.progress && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-text-dark-secondary">Progress to target</span>
                    <span className="text-xs font-medium">{metric.progress}%</span>
                  </div>
                                      <div className="w-full bg-background-dark-tertiary rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.progress}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                      viewport={{ once: true }}
                      className={`h-2 rounded-full bg-gradient-to-r ${
                        metric.color === 'primary' ? 'from-primary-500 to-primary-600' :
                        metric.color === 'success' ? 'from-success-500 to-success-600' :
                        'from-warning-500 to-warning-600'
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* Yearly Data */}
              <div className="space-y-2">
                {['2022', '2021', '2020', '2019'].map((year, yearIndex) => (
                  <div key={year} className="flex justify-between items-center text-sm">
                    <span className="text-text-dark-secondary">{year}</span>
                    <span className="font-medium">
                      {metric.data[yearIndex] ? 
                        formatNumber(metric.data[yearIndex]) 
                        : '—'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-border-dark">
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1 transition-colors">
                  See full breakdown
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Download Action */}
              <div className="mt-3">
                <button className="text-text-dark-secondary hover:text-text-dark-primary text-sm flex items-center gap-1 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                  </svg>
                  Download the data
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-background-dark-secondary rounded-xl p-6 border border-border-dark"
        >
          <h3 className="text-lg font-semibold mb-6">Portfolio Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Properties', value: '2,847', change: '+12%' },
              { label: 'Certified Buildings', value: '89%', change: '+3%' },
              { label: 'Avg. Efficiency Rating', value: 'B+', change: '↑2 grades' },
              { label: 'Target Achievement', value: '67%', change: '+15%' }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">{stat.value}</div>
                <div className="text-sm text-text-dark-secondary mb-1">{stat.label}</div>
                <div className="text-xs text-success-600 font-medium">{stat.change}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 