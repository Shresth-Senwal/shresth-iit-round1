'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Customer } from '@/utils/data/customersData'

interface CustomerLogoProps {
  customer: Customer
  delay?: number
}

function CustomerLogo({ customer, delay = 0 }: CustomerLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-xl bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-primary-200">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Logo Container */}
        <div className="relative z-10 flex items-center justify-center h-16">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={customer.logo}
              alt={`${customer.name} logo`}
              className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
            />
          </div>
        </div>
        
        {/* Hover Overlay with Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-600 to-primary-500 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          <h4 className="font-semibold text-sm mb-1">{customer.name}</h4>
          {customer.description && (
            <p className="text-xs opacity-90 leading-relaxed">{customer.description}</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

interface CustomersProps {
  customers: Customer[]
  title?: string
  subtitle?: string
  className?: string
  showTitle?: boolean
}

export default function Customers({ 
  customers, 
  title = "Trusted by Industry Leaders", 
  subtitle = "Join hundreds of companies that trust us with their digital transformation",
  className = "",
  showTitle = true
}: CustomersProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container-custom">
        {/* Section Header */}
        {showTitle && (
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
        )}

        {/* Customers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {customers.map((customer, index) => (
            <CustomerLogo
              key={customer.id}
              customer={customer}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Trusted by 500+ companies</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>99.9% client satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>5+ years partnership average</span>
            </div>
          </div>
        </motion.div>

        {/* Infinite Scroll Animation (Optional) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
          className="mt-16 overflow-hidden"
        >
          <div className="flex animate-scroll">
            {/* Duplicate first few logos for infinite scroll effect */}
            {customers.slice(0, 6).map((customer, index) => (
              <div key={`scroll-${customer.id}`} className="flex-shrink-0 mx-4">
                <div className="w-32 h-16 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100">
                  <img
                    src={customer.logo}
                    alt={`${customer.name} logo`}
                    className="max-w-full max-h-full object-contain filter grayscale opacity-50"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  )
} 