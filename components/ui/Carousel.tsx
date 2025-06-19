'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

interface CarouselSlide {
  id: string
  title: string
  subtitle?: string
  description: string
  image: string
  buttonText?: string
  buttonAction?: () => void
}

interface CarouselProps {
  slides: CarouselSlide[]
  autoplay?: boolean
  effect?: 'slide' | 'fade'
  speed?: number
  className?: string
}

export default function Carousel({ 
  slides, 
  autoplay = true, 
  effect = 'slide',
  speed = 1000,
  className = '' 
}: CarouselProps) {
  return (
    <div className={`relative ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-custom',
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active-custom',
        }}
        autoplay={autoplay ? {
          delay: 5000,
          disableOnInteraction: false,
        } : false}
        effect={effect}
        speed={speed}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-full w-full overflow-hidden"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex h-full items-center">
                <div className="container-custom">
                  <div className="max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {slide.subtitle && (
                        <p className="mb-4 text-lg font-medium text-blue-200">
                          {slide.subtitle}
                        </p>
                      )}
                      <h2 className="mb-6 text-4xl font-bold text-white md:text-6xl">
                        {slide.title}
                      </h2>
                      <p className="mb-8 text-xl text-gray-200 max-w-2xl">
                        {slide.description}
                      </p>
                      {slide.buttonText && (
                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={slide.buttonAction}
                          className="btn-primary px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          {slide.buttonText}
                        </motion.button>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button 
        className="swiper-button-prev-custom absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button 
        className="swiper-button-next-custom absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {/* Pagination bullets will be rendered here by Swiper */}
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active-custom {
          background: white;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  )
} 