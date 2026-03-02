interface HeroSectionProps {
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  bgColor?: string
}

export default function HeroSection({ title, subtitle, ctaText, ctaHref, bgColor }: HeroSectionProps) {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <div className="absolute inset-0 bg-farm-charcoal/70" />
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="font-serif text-4xl md:text-6xl text-farm-cream mb-6 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-farm-cream/80 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {ctaText && ctaHref && (
          <a
            href={ctaHref}
            className="inline-block bg-farm-green text-farm-cream px-8 py-3 rounded-sm text-sm font-medium tracking-wide hover:bg-farm-green/90 transition-colors"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}
