import type { Metadata } from "next"
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Events & Workshops | Forevermore Farm | Lyles, TN",
  description: "Farm days, straw bale gardening workshops, and seasonal events at Forevermore Farm in Lyles, Tennessee.",
  openGraph: {
    type: "website",
    title: "Events & Workshops | Forevermore Farm | Lyles, TN",
    description: "Farm days, straw bale gardening workshops, and seasonal events at Forevermore Farm in Lyles, Tennessee.",
    images: [
      {
        url: "/images/pasture-land/tulips-driveway-pig-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Tulips lining the driveway at Forevermore Farm with a pig in the background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events & Workshops | Forevermore Farm | Lyles, TN",
    description: "Farm days, straw bale gardening workshops, and seasonal events at Forevermore Farm in Lyles, Tennessee.",
    images: ["/images/pasture-land/tulips-driveway-pig-bg.jpg"],
  },
  alternates: {
    canonical: "/events",
  },
}

export const revalidate = 3600 // revalidate every hour so "Happening Today" stays fresh

import EventCard from '@/components/EventCard'
import EmailCapture from '@/components/EmailCapture'
import { client } from '../../../../sanity/client'

interface SanityEvent {
  _id: string
  title: string
  /** Legacy display field — kept as dateDisplay in schema */
  dateDisplay?: string
  /** Fallback: old 'date' field if still present in documents */
  date?: string
  startDate: string
  endDate?: string
  featured?: boolean
  time: string
  description: string
  cta: string
  ctaLink: string
  ctaExternal: boolean
  badge?: string
}

async function getUpcomingEvents(): Promise<SanityEvent[]> {
  try {
    const today = new Date().toISOString().slice(0, 10)
    // Include events where startDate is today or future, OR endDate is today or future (multi-day events)
    return await client.fetch(
      `*[_type == "event" && (startDate >= $today || endDate >= $today)] | order(featured desc, startDate asc)`,
      { today }
    )
  } catch {
    return []
  }
}

async function getPastEvents(): Promise<SanityEvent[]> {
  try {
    const today = new Date().toISOString().slice(0, 10)
    // Past = endDate < today (or startDate < today if no endDate)
    return await client.fetch(
      `*[_type == "event" && (
        (defined(endDate) && endDate < $today) ||
        (!defined(endDate) && startDate < $today)
      )] | order(startDate desc)[0...20]`,
      { today }
    )
  } catch {
    return []
  }
}

function getEventStatus(event: SanityEvent): 'happening-now' | 'upcoming' | 'past' {
  const today = new Date().toISOString().slice(0, 10)
  const start = event.startDate
  const end = event.endDate ?? event.startDate
  if (start <= today && end >= today) return 'happening-now'
  if (start > today) return 'upcoming'
  return 'past'
}

/** Resolve the display date regardless of which field holds it */
function resolveDate(event: SanityEvent): string {
  return event.dateDisplay ?? event.date ?? event.startDate ?? ''
}

export default async function Events() {
  const [upcomingEvents, pastEvents] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ])

  return (
    <>
      {/* Photo header */}
      <div className="relative h-64 md:h-96">
        <Image
          src="/images/pasture-land/tulips-driveway-pig-bg.jpg"
          alt="Tulips lining the driveway at Forevermore Farm with a pig in the background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-farm-charcoal/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-serif text-4xl md:text-5xl text-farm-cream drop-shadow-lg">What&apos;s Happening</h1>
        </div>
      </div>

      <section className="py-16 px-4 bg-farm-cream">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-farm-charcoal/60 mb-12 text-lg">Events are announced to the email list first. Join below to hear before tickets go wide.</p>

          <div className="mb-14 overflow-hidden rounded-sm border border-farm-tan/30 bg-white shadow-sm">
            <div className="grid md:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[280px]">
                <Image
                  src="/images/garden/garden-beds-with-white-tent.jpg"
                  alt="Garden beds and the tent at Forevermore Farm"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-10">
                <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">Featured</span>
                <h2 className="font-serif text-3xl text-farm-green mt-3 mb-4">Volunteer Gardener is coming to Forevermore Farm.</h2>
                <p className="text-farm-charcoal/70 leading-relaxed mb-4">
                  Get the exact PBS air dates, online watch details, and the Ag &amp; Arts Tour visit plan in one place.
                </p>
                <p className="text-farm-charcoal/60 leading-relaxed mb-6">
                  If you want to watch the feature and then come see the straw bale garden in person, start here.
                </p>
                <Link href="/volunteer-gardener" className="inline-block bg-farm-green text-farm-cream px-6 py-3 rounded-sm text-sm font-medium tracking-widest uppercase hover:bg-farm-green/90 transition-colors">
                  Open the feature page
                </Link>
              </div>
            </div>
          </div>

          {/* PBS Volunteer Gardener featured block */}
          <div className="mb-12 border border-farm-tan/40 rounded-sm overflow-hidden bg-farm-green/5">
            <div className="grid md:grid-cols-2">
              <div className="relative h-56 md:h-auto">
                <Image
                  src="/images/garden-build/concetta-placing-bales-golden-hour.jpg"
                  alt="Concetta placing straw bales at Forevermore Farm"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">As Seen on PBS</span>
                <h2 className="font-serif text-2xl text-farm-green mt-2 mb-3">
                  <em>Volunteer Gardener</em> — Premiering April 30
                </h2>
                <p className="text-farm-charcoal/70 text-sm leading-relaxed mb-5">
                  Concetta&apos;s straw bale garden is featured on PBS <em>Volunteer Gardener</em>. Nashville PBS premiere is Thursday, April 30 at 7:30 PM. Then come see the garden yourself at the Ag &amp; Arts Tour in June.
                </p>
                <Link
                  href="/volunteer-gardener"
                  className="inline-block self-start bg-farm-green text-farm-cream px-6 py-2.5 rounded-sm text-xs font-medium tracking-widest uppercase hover:bg-farm-green/90 transition-colors"
                >
                  Watch Schedule &amp; Visit Info
                </Link>
              </div>
            </div>
          </div>

          {/* Upcoming events */}
          {upcomingEvents.length > 0 ? (
            <div className="grid gap-6">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event._id}
                  title={event.title}
                  date={resolveDate(event)}
                  time={event.time}
                  description={event.description}
                  cta={event.cta}
                  ctaLink={event.ctaLink}
                  ctaExternal={event.ctaExternal}
                  badge={event.featured ? (event.badge ?? 'Featured') : event.badge}
                  status={getEventStatus(event)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-farm-charcoal/40 italic py-8">No upcoming events — check back soon, or join the list below.</p>
          )}

          {/* Ag & Arts Tour Detail */}
          <div className="mt-16 border-t border-farm-tan/30 pt-16">
            <h2 className="font-serif text-3xl text-farm-green mb-2">Forevermore Farm at the Ag &amp; Arts Tour</h2>
            <p className="text-farm-charcoal/50 text-sm mb-10">June 19–20, 2026 · 302 Hickory Trace, Lyles, TN 37098</p>

            {/* PBS volunteer-gardener callout */}
            <div className="mb-10 p-5 bg-farm-green/5 border-l-4 border-farm-tan rounded-sm">
              <p className="text-farm-charcoal/80 text-sm leading-relaxed">
                <strong>Watch before you visit:</strong> Concetta&apos;s straw bale garden is featured on PBS <em>Volunteer Gardener</em> — Nashville PBS premiere April 30 at 7:30 PM.{' '}
                <Link href="/volunteer-gardener" className="text-farm-green font-medium hover:underline underline-offset-4">Full watch schedule and visit details →</Link>
              </p>
            </div>

            {/* What's happening */}
            <div className="mb-10">
              <h3 className="font-serif text-xl text-farm-green mb-3">What&apos;s Happening</h3>
              <p className="text-farm-charcoal/70 leading-relaxed mb-4">The barn has been fully renovated and filled with vendors — handmade goods, crafts, and local makers all under one roof. Step outside and you&apos;re on a working homestead: free-range Berkshire pigs, Nigerian Dwarf goats, chickens, rabbits, and — if you&apos;re lucky — Clementine, our miniature pig who lives in the house and occasionally makes her rounds.</p>
              <p className="text-farm-charcoal/70 leading-relaxed">Concetta will be giving straw bale garden demos throughout the weekend. She trained directly under Joel Karsten, the method&apos;s creator, and the garden is soon to be featured on PBS <em>Volunteer Gardener</em> — so you&apos;ll be seeing it before most people even know it exists.</p>
            </div>

            {/* Don't miss */}
            <div className="mb-10">
              <h3 className="font-serif text-xl text-farm-green mb-3">Don&apos;t Miss</h3>
              <ul className="space-y-3">
                <li className="flex gap-3"><span className="text-farm-tan mt-1">→</span><div><strong className="text-farm-charcoal">The Straw Bale Garden</strong><span className="text-farm-charcoal/60"> — Concetta&apos;s certified straw bale setup is genuinely one of a kind. Come find out why PBS came calling.</span></div></li>
                <li className="flex gap-3"><span className="text-farm-tan mt-1">→</span><div><strong className="text-farm-charcoal">The Sunflower Fields</strong><span className="text-farm-charcoal/60"> — Bring your camera. Seriously. This is the shot.</span></div></li>
                <li className="flex gap-3"><span className="text-farm-tan mt-1">→</span><div><strong className="text-farm-charcoal">Clementine</strong><span className="text-farm-charcoal/60"> — She&apos;s a free-roaming miniature pig. She lives in the house. She has opinions. Enough said.</span></div></li>
                <li className="flex gap-3"><span className="text-farm-tan mt-1">→</span><div><strong className="text-farm-charcoal">The Solar Barn</strong><span className="text-farm-charcoal/60"> — The farm runs almost entirely on solar power. No grid electricity. We&apos;ll show you what that actually looks like.</span></div></li>
              </ul>
            </div>

            {/* 2-col: purchase + practical */}
            <div className="grid md:grid-cols-2 gap-10 mb-10">
              <div>
                <h3 className="font-serif text-xl text-farm-green mb-3">Available to Purchase</h3>
                <ul className="space-y-2 text-farm-charcoal/70">
                  <li>→ <strong>Heritage Pork Sausage</strong> — USDA-processed, raised right here on pasture. <em>Bring a cooler.</em></li>
                  <li>→ Frozen chocolate-dipped bananas</li>
                  <li>→ Food from The LOCAL Place café</li>
                  <li>→ Baked goods</li>
                  <li>→ Handmade crafts from barn vendors</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl text-farm-green mb-3">Good to Know</h3>
                <ul className="space-y-2 text-farm-charcoal/70">
                  <li>→ Parking on-site — follow signage from the road</li>
                  <li>→ Restrooms available</li>
                  <li>→ Kid-friendly — animals, open space, frozen bananas</li>
                  <li>→ <strong>Wear shoes you don&apos;t mind getting dirty.</strong> This is a working farm.</li>
                  <li>→ Free and open to the public</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div className="mt-16 border-t border-farm-tan/30 pt-16">
              <h2 className="font-serif text-2xl text-farm-charcoal mb-2">Past Events</h2>
              <p className="text-farm-charcoal/50 text-sm mb-8">A look at what we&apos;ve hosted before.</p>
              <div className="grid gap-4">
                {pastEvents.map((event) => (
                  <div key={event._id} className="border border-farm-tan/20 rounded-sm p-5 opacity-70">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-lg text-farm-charcoal">{event.title}</h3>
                        <p className="text-farm-charcoal/50 text-sm mt-1">{resolveDate(event)} · {event.time}</p>
                        <p className="text-farm-charcoal/60 text-sm mt-2 leading-relaxed">{event.description}</p>
                      </div>
                      {event.badge && (
                        <span className="shrink-0 text-xs font-medium bg-farm-tan/20 text-farm-charcoal/60 px-2 py-1 rounded-full">{event.badge}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <EmailCapture
        headline="Join the list."
        subtitle="Events are announced here first — before they go anywhere else."
      />
    </>
  )
}
