import type { Metadata } from "next"
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Events & Workshops | Forevermore Farm | Lyles, TN",
  description: "Farm days, straw bale gardening workshops, and seasonal events at Forevermore Farm in Lyles, Tennessee.",
}

import EventCard from '@/components/EventCard'
import EmailCapture from '@/components/EmailCapture'
import { events } from '@/data/events'

export default function Events() {
  return (
    <>
      {/* Photo header */}
      <div className="relative h-64 md:h-96">
        <Image
          src="/images/pasture-land/tulips-driveway-pig-bg.jpg"
          alt="Tulips lining the driveway at Forevermore Farm with a pig in the background"
          fill
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
          <div className="grid gap-6">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>

      <EmailCapture
        headline="Join the list."
        subtitle="Events are announced here first — before they go anywhere else."
      />
    </>
  )
}
