'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { workGalleryData, galleryCategories, WorkGalleryItem } from '@/utils/data/workGalleryData'
import { useParallax } from '@/utils/hooks/useParallax'
import RippleButton from './RippleButton'

interface WorkGalleryProps {
  className?: string
}

export default function WorkGallery({ className = '' }: WorkGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lightboxItem, setLightboxItem] = useState<WorkGalleryItem | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { y } = useParallax(sectionRef as React.RefObject<HTMLElement>, { speed: 0.3 })

  const filteredItems = selectedCategory === 'all' 
    ? workGalleryData 
    : workGalleryData.filter(item => item.category === selectedCategory)

  const openLightbox = (item: WorkGalleryItem) => {
    setLightboxItem(item)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setTimeout(() => setLightboxItem(null), 300)
  }

  return (
    <section ref={sectionRef} className={`py-16 bg-background-light dark:bg-background-dark ${className}`}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4">
            Our Work
          </h2>
          <p className="text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto">
            Explore our portfolio of innovative solutions that drive sustainable business growth.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {galleryCategories.map((category) => (
            <RippleButton
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? 'primary' : 'secondary'}
            >
              {category.name} ({category.count})
            </RippleButton>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          style={{ y }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(item)}
              >
                <div className="card card-hover">
                  <div className="relative h-64 overflow-hidden rounded-t-xl">
                    <div className={`w-full h-full bg-gradient-to-br ${
                      item.category === 'dashboard' ? 'from-blue-500 to-blue-700' :
                      item.category === 'analytics' ? 'from-green-500 to-green-700' :
                      item.category === 'automation' ? 'from-purple-500 to-purple-700' :
                      item.category === 'integration' ? 'from-orange-500 to-orange-700' :
                      'from-primary-500 to-primary-700'
                    } group-hover:scale-105 transition-transform duration-500 flex items-center justify-center`}>
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">
                          {item.category === 'dashboard' ? '📊' : 
                           item.category === 'analytics' ? '📈' : 
                           item.category === 'automation' ? '⚡' : 
                           item.category === 'integration' ? '🔗' : '💡'}
                        </div>
                        <div className="text-sm font-medium opacity-80 uppercase tracking-wider">
                          {item.category}
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-text-light-secondary dark:text-text-dark-secondary mb-4">
                      {item.description.substring(0, 100)}...
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Simple Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && lightboxItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 z-50 flex items-center justify-center"
            >
              <div className="bg-background-light dark:bg-background-dark rounded-2xl p-8 max-w-4xl w-full max-h-full overflow-auto">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold">{lightboxItem.title}</h2>
                  <button onClick={closeLightbox} className="text-2xl">&times;</button>
                </div>
                <div className={`w-full h-64 bg-gradient-to-br ${
                  lightboxItem.category === 'dashboard' ? 'from-blue-500 to-blue-700' :
                  lightboxItem.category === 'analytics' ? 'from-green-500 to-green-700' :
                  lightboxItem.category === 'automation' ? 'from-purple-500 to-purple-700' :
                  lightboxItem.category === 'integration' ? 'from-orange-500 to-orange-700' :
                  'from-primary-500 to-primary-700'
                } rounded-lg mb-6 flex items-center justify-center`}>
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4">
                      {lightboxItem.category === 'dashboard' ? '📊' : 
                       lightboxItem.category === 'analytics' ? '📈' : 
                       lightboxItem.category === 'automation' ? '⚡' : 
                       lightboxItem.category === 'integration' ? '🔗' : '💡'}
                    </div>
                    <div className="text-lg font-medium opacity-80 uppercase tracking-wider">
                      {lightboxItem.category}
                    </div>
                  </div>
                </div>
                <p className="text-lg mb-4">{lightboxItem.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {lightboxItem.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                {lightboxItem.metrics && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {lightboxItem.metrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-background-light-secondary dark:bg-background-dark-secondary rounded-lg">
                        <div className="text-2xl font-bold text-primary-600">{metric.value}</div>
                        <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
} 