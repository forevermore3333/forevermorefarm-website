interface EventCardProps {
  title: string
  date: string
  time: string
  description: string
  cta: string
  ctaLink: string
  ctaExternal?: boolean
  badge?: string
}

export default function EventCard({ title, date, time, description, cta, ctaLink, ctaExternal, badge }: EventCardProps) {
  return (
    <div className="border-t border-farm-tan/30 pt-10 pb-6">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h2 className="font-serif text-3xl text-farm-green">{title}</h2>
        {badge && (
          <span className="shrink-0 bg-farm-green text-farm-cream text-xs px-3 py-1 rounded-full font-medium mt-2">
            {badge}
          </span>
        )}
      </div>
      <p className="text-farm-charcoal/50 text-sm mb-6">
        {date} {time !== 'TBD' ? `· ${time}` : ''}
      </p>
      <p className="text-farm-charcoal/70 leading-relaxed mb-6">{description}</p>
      <a
        href={ctaLink}
        {...(ctaExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="inline-block font-medium text-farm-green hover:text-farm-brown transition-colors"
      >
        {cta} &rarr;
      </a>
    </div>
  )
}
