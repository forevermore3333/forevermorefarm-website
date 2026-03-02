'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface HeroSectionProps {
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  bgImage?: string
  showLogo?: boolean
  children?: React.ReactNode
}

export default function HeroSection({ title, subtitle, ctaText, ctaHref, bgImage, showLogo, children }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section ref={ref} className="relative flex items-center justify-center min-h-[85vh] md:min-h-[90vh] overflow-hidden">
      {bgImage && (
        <motion.div style={{ y }} className="absolute inset-0">
          {/* Mobile bg — was perfect, don't touch */}
          <div
            className="absolute inset-0 md:hidden"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: '60% 70%',
            }}
          />
          {/* Desktop bg — independent adjustments */}
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: '20% bottom',
              transform: 'scale(1.45) translateX(-10%)',
              transformOrigin: 'right bottom',
            }}
          />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-farm-charcoal/55" />

      <div className="relative z-10 text-center px-4 max-w-3xl pb-48">
        <h1 className="font-serif text-4xl md:text-6xl text-farm-cream mb-6 leading-tight drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-farm-cream/85 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {ctaText && ctaHref && (
          <a
            href={ctaHref}
            className="inline-block bg-farm-green text-farm-cream px-8 py-3 rounded-sm text-sm font-medium tracking-widest uppercase hover:bg-farm-green/90 transition-colors"
          >
            {ctaText}
          </a>
        )}
        {children}
      </div>

      {showLogo && (
        <div className="absolute bottom-20 left-0 right-0 flex justify-center z-10">
          <img
            src="/images/forevermore-farm-logo.svg"
            alt="Forevermore Farm"
            className="w-56 h-56 md:w-64 md:h-64 drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.5))' }}
          />
        </div>
      )}
    </section>
  )
}
