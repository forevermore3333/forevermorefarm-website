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

          {/* Ag & Arts Tour Detail */}
          <div className="mt-16 border-t border-farm-tan/30 pt-16">
            <h2 className="font-serif text-3xl text-farm-green mb-2">Forevermore Farm at the Ag &amp; Arts Tour</h2>
            <p className="text-farm-charcoal/50 text-sm mb-10">June 19–20, 2026 · 302 Hickory Trace, Lyles, TN 37098</p>

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
        </div>
      </section>

      <EmailCapture
        headline="Join the list."
        subtitle="Events are announced here first — before they go anywhere else."
      />
    </>
  )
}
