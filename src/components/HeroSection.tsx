import Image from 'next/image'

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
  return (
    <section className="relative flex items-center justify-center min-h-screen">
      {bgImage && (
        <Image
          src={bgImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-farm-charcoal/55" />
      <div className="relative z-10 text-center px-4 max-w-3xl">
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
            className="inline-block bg-farm-green text-farm-cream px-8 py-3 rounded-sm text-sm font-medium tracking-wide hover:bg-farm-green/90 transition-colors mb-10"
          >
            {ctaText}
          </a>
        )}
        {showLogo && (
          <div className="flex justify-center mt-6">
            <Image
              src="/images/forevermore-farm-logo.jpg"
              alt="Forevermore Farm"
              width={120}
              height={120}
              className="rounded-full ring-4 ring-white/30 shadow-2xl"
            />
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
