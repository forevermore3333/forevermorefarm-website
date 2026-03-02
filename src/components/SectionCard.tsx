interface SectionCardProps {
  title: string
  description: string
  ctaText?: string
  ctaLink?: string
  badge?: string
}

export default function SectionCard({ title, description, ctaText, ctaLink, badge }: SectionCardProps) {
  return (
    <div className="bg-farm-cream border border-farm-tan rounded-sm p-6 flex flex-col">
      {badge && (
        <span className="self-start bg-farm-brown/10 text-farm-brown text-xs px-3 py-1 rounded-full font-medium mb-3">
          {badge}
        </span>
      )}
      <h3 className="font-serif text-xl text-farm-green mb-2">{title}</h3>
      <p className="text-farm-charcoal/80 text-sm leading-relaxed mb-4 flex-1">{description}</p>
      {ctaText && ctaLink && (
        <a
          href={ctaLink}
          className="inline-block text-sm font-medium text-farm-green hover:text-farm-brown transition-colors"
        >
          {ctaText} &rarr;
        </a>
      )}
    </div>
  )
}
