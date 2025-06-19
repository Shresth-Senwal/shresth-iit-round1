'use client'

import { motion } from 'framer-motion'
import Loader from '@/components/ui/Loader'
import Hero from '@/components/ui/Hero'
import BrandKits from '@/components/ui/BrandKits'
import DataDashboard from '@/components/ui/DataDashboard'
import WorkGallery from '@/components/ui/WorkGallery'
import InteractiveCard, { MetricCard, ActionCard } from '@/components/ui/InteractiveCard'
import { CTAPopup, NewsletterPopup } from '@/components/ui/ScrollTriggeredPopup'
import CursorTrail from '@/components/ui/CursorTrail'
import RippleButton from '@/components/ui/RippleButton'
import { businessMetrics, clientTestimonials, caseStudies, serviceCategories, platformStats } from '@/utils/data/businessData'
import { useScrollAnimation, scrollAnimationVariants } from '@/utils/hooks/useScrollAnimation'
import { ServiceCard, TestimonialCard } from '@/components/ui/Card'
import Stats from '@/components/ui/Stats'
import { usePageLoader } from '@/utils/hooks/usePageLoader'
import { servicesData, testimonialsData } from '@/utils/data/servicesData'
import { statsData } from '@/utils/data/statsData'

export default function Home() {
  const { isLoading } = usePageLoader(2500)
  
  return (
    <>
      <Loader isVisible={isLoading} />
              <CursorTrail variant="ripple" disabled={isLoading} />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="min-h-screen"
      >
        {/* New Professional Hero Section */}
        <section id="hero">
          <Hero />
        </section>

        {/* Brand Kits Management Interface */}
        <section id="brand-kits">
          <BrandKits />
        </section>

        {/* Data Dashboard with Carbon Footprint Metrics */}
        <section id="dashboard">
          <DataDashboard />
        </section>

        {/* Services Section - Professional Dark Theme */}
        <section id="services" className="py-16 bg-background-dark">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark-primary mb-4">
                Intelligent Data Solutions
              </h2>
              <p className="text-lg text-text-dark-secondary max-w-2xl mx-auto">
                Comprehensive platform for sustainable business intelligence and carbon management
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { name: 'ANALYTICS', icon: '📊', gradient: 'from-primary-500 to-primary-600' },
                { name: 'AUTOMATION', icon: '⚡', gradient: 'from-purple-500 to-purple-600' },
                { name: 'INSIGHTS', icon: '🔍', gradient: 'from-success-500 to-success-600' },
                { name: 'REPORTING', icon: '📈', gradient: 'from-warning-500 to-warning-600' }
              ].map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl" 
                       style={{ background: `linear-gradient(135deg, var(--primary-500), var(--purple-500))` }} />
                  <div className="relative bg-background-dark-secondary border border-border-dark hover:border-primary-500/50 rounded-xl p-6 text-center transition-all duration-300">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white text-xl shadow-lg`}>
                      {service.icon}
                    </div>
                    <h3 className="font-bold text-sm tracking-wider text-text-dark-primary group-hover:text-primary-400 transition-colors">
                      {service.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  delay={0.1 * index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Platform Statistics Section */}
        <section id="stats" className="py-16 bg-gradient-to-br from-background-dark via-background-dark-secondary to-background-dark-tertiary">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark-primary mb-4">
                Platform Impact at Scale
              </h2>
              <p className="text-lg text-text-dark-secondary max-w-2xl mx-auto">
                Real results from organizations worldwide using DataFlow
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformStats.map((stat, index) => (
                <MetricCard
                  key={stat.id}
                  title={stat.label}
                  value={stat.displayValue}
                  description={stat.description}
                  variant="gradient"
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  }
                  onClick={() => console.log(`Clicked ${stat.id}`)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Customers/Client Logos Section - Redesigned for Dark Theme */}
        <section id="clients" className="py-16 bg-background-dark">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark-primary mb-4">
                Trusted by Industry Leaders
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {[
                { name: 'CURSOR', logo: '⚡' },
                { name: 'Brex', logo: '🏦' },
                { name: 'remote', logo: '🌐' },
                { name: 'ARC', logo: '🔵' },
                { name: 'runway', logo: '✈️' },
                { name: 'descript', logo: '📝' }
              ].map((company, index) => (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="bg-background-dark-secondary rounded-lg p-6 border border-border-dark hover:border-primary-500 transition-all duration-300 group-hover:scale-105">
                    <div className="text-2xl mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      {company.logo}
                    </div>
                    <div className="text-text-dark-secondary text-sm font-medium group-hover:text-text-dark-primary transition-colors">
                      {company.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - Professional Style */}
        <section id="testimonials" className="py-16 bg-background-dark-secondary">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark-primary mb-4">
                What Industry Leaders Say
              </h2>
              <p className="text-lg text-text-dark-secondary max-w-2xl mx-auto">
                Trusted by professionals worldwide for mission-critical operations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {clientTestimonials.slice(0, 4).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background-dark border border-border-dark rounded-xl p-8 hover:shadow-dark-medium hover:border-primary-500/50 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark-primary">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-text-dark-secondary">
                        {testimonial.position}
                      </p>
                      <p className="text-sm font-medium text-primary-400">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  
                                  <blockquote className="text-text-dark-primary mb-6 leading-relaxed">
                  &ldquo;{testimonial.testimonial}&rdquo;
                </blockquote>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-dark">
                    <div className="text-center">
                                              <div className="text-lg font-bold text-success-400">
                          {testimonial.metrics.carbonReduction}%
                        </div>
                        <div className="text-xs text-text-dark-secondary">
                          Carbon Reduction
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary-400">
                          ${(testimonial.metrics.costSavings / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-text-dark-secondary">
                          Cost Savings
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-warning-400">
                          {testimonial.metrics.efficiencyGain}%
                        </div>
                        <div className="text-xs text-text-dark-secondary">
                          Efficiency Gain
                        </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section id="case-studies" className="py-16 bg-background-dark">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark-primary mb-4">
                Success Stories
              </h2>
              <p className="text-lg text-text-dark-secondary max-w-2xl mx-auto">
                Real transformations achieved by organizations using DataFlow
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy, index) => (
                <ActionCard
                  key={caseStudy.id}
                  title={caseStudy.title}
                  description={caseStudy.subtitle}
                  actionLabel="Read Case Study"
                  onAction={() => console.log(`View case study: ${caseStudy.id}`)}
                  badge={caseStudy.industry}
                  badgeColor="primary"
                  variant="bordered"
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                >
                  <div className="space-y-3">
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      {caseStudy.challenge.slice(0, 120)}...
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {caseStudy.results.slice(0, 2).map((result, idx) => (
                        <div key={idx} className="text-center p-3 bg-background-light-secondary dark:bg-background-dark-secondary rounded-lg">
                          <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                            {result.value}
                          </div>
                          <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                            {result.metric}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ActionCard>
              ))}
            </div>
          </div>
        </section>

        {/* Work Gallery Section */}
        <section id="work-gallery">
          <WorkGallery />
        </section>

        {/* Featured Event Section */}
        <section id="events" className="py-16 bg-gradient-to-br from-primary-600 via-purple-600 to-primary-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                    🌍 GLOBAL
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                    📊 DATAFLOW EVENT
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  DataFlow Summit 2024
                  <span className="block text-2xl md:text-3xl font-normal text-white/80 mt-2">
                    Sustainable Future Conference
                  </span>
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                      🌱
                    </div>
                    <div>
                      <div className="text-xl font-bold">Carbon Intelligence</div>
                      <div className="text-sm opacity-80">Next-Gen Analytics</div>
                    </div>
                  </div>
                  <p className="text-lg mb-6 leading-relaxed">
                    Join industry leaders exploring the future of sustainable business intelligence and carbon management solutions.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/10 rounded-lg">
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-xs opacity-80">Attendees</div>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-lg">
                      <div className="text-2xl font-bold">50+</div>
                      <div className="text-xs opacity-80">Speakers</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          

        </section>

        {/* Scroll-Triggered Popups */}
        <CTAPopup
          title="Ready to Transform Your Business?"
          description="Join thousands of companies using DataFlow to achieve sustainable growth and operational excellence."
          buttonText="Start Free Trial"
          onButtonClick={() => console.log('CTA clicked')}
          triggerOffset={0.8}
          showDelay={2000}
          autoHide={true}
          autoHideDelay={8000}
          position="bottom-right"
        />

        <NewsletterPopup
          onSubscribe={(email) => console.log('Newsletter signup:', email)}
          triggerOffset={0.9}
          showDelay={5000}
          autoHide={true}
          autoHideDelay={10000}
          position="bottom-left"
        />
      </motion.div>
    </>
  )
}

 