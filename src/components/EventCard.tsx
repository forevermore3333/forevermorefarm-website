interface EventCardProps {
  title: string
  date: string
  time: string
  description: string
  cta: string
  ctaLink: string
  badge?: string
}

export default function EventCard({ title, date, time, description, cta, ctaLink, badge }: EventCardProps) {
  return (
    <div className="bg-farm-cream border border-farm-tan rounded-sm p-6 flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-serif text-xl text-farm-green">{title}</h3>
        {badge && (
          <span className="shrink-0 bg-farm-green text-farm-cream text-xs px-3 py-1 rounded-full font-medium">
            {badge}
          </span>
        )}
      </div>
      <p className="text-sm text-farm-brown font-medium mb-2">
        {date} {time !== 'TBD' ? `· ${time}` : ''}
      </p>
      <p className="text-farm-charcoal/80 text-sm leading-relaxed mb-4 flex-1">{description}</p>
      <a
        href={ctaLink}
        className="inline-block text-sm font-medium text-farm-green hover:text-farm-brown transition-colors"
      >
        {cta} &rarr;
      </a>
    </div>
  )
}
