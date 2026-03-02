import HeroSection from '@/components/HeroSection'
import SectionCard from '@/components/SectionCard'
import EmailCapture from '@/components/EmailCapture'
import EventCard from '@/components/EventCard'
import { events } from '@/data/events'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        title="Rooted in Lyles, Tennessee"
        subtitle="A regenerative farm where people gather, grow, and slow down."
        ctaText="Join Our List"
        ctaHref="#email-capture"
      />

      {/* Definition */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl text-farm-charcoal leading-relaxed mb-6">
            fo&middot;rev&middot;er&middot;more{' '}
            <span className="text-farm-charcoal/50 text-lg">/f&#601;r-&#x2C8;ev-&#601;r-&#x2CC;m&#xF4;r/</span>
            {' '}&mdash; not a place you visit once. a place that stays with you.
          </p>
          <p className="text-farm-charcoal/70 leading-relaxed max-w-2xl mx-auto">
            Forevermore Farm is a small, regenerative homestead in the hills of Hickman County. We raise heritage pigs, tend a straw bale garden, and open our gates to anyone who wants to remember what real food and real land feel like.
          </p>
        </div>
      </section>

      {/* 3-column cards */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <SectionCard
            title="Off-Grid Living"
            description="Solar power, rain catchment, and a rhythm set by the sun. Forevermore runs on intention, not infrastructure."
            ctaText="Read More"
            ctaLink="/our-farm"
          />
          <SectionCard
            title="The Straw Bale Garden"
            description="Concetta is a certified Straw Bale Gardening instructor. The garden at Forevermore is a living classroom — productive, sustainable, and open to visitors."
            ctaText="Read More"
            ctaLink="/our-farm"
          />
          <SectionCard
            title="The Animals"
            description="Heritage Berkshire and Gloucestershire Old Spot pigs, chickens, goats, and more. Free-range, no pharmaceutical vaccines — the way it used to be done."
            ctaText="Read More"
            ctaLink="/our-farm"
          />
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 px-4">
        <h2 className="font-serif text-3xl text-farm-green text-center mb-10">Coming Soon</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <SectionCard
            title="Farm Stay"
            description="Wake up to roosters, walk the land, and leave slower than you arrived. A place to unplug surrounded by open fields and real Tennessee air."
            badge="Coming Soon"
            ctaText="Learn More"
            ctaLink="/stay"
          />
          <SectionCard
            title="Event Venue"
            description="An intimate, outdoor setting for gatherings that feel different — weddings, dinners, celebrations rooted in the land."
            badge="Coming Soon"
          />
          <SectionCard
            title="Workshops & Events"
            description="Hands-on learning — from straw bale gardening to heritage livestock. Workshops designed for people who want to do, not just watch."
            badge="Coming Soon"
            ctaText="See Events"
            ctaLink="/events"
          />
        </div>
      </section>

      {/* Email Capture */}
      <div id="email-capture">
        <EmailCapture
          headline="Be the first to know."
          subtitle="Events, workshops, farm stays — announced here first."
        />
      </div>

      {/* Events Preview */}
      <section className="py-16 px-4">
        <h2 className="font-serif text-3xl text-farm-green text-center mb-10">Upcoming Events</h2>
        <div className="max-w-4xl mx-auto grid gap-6">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </section>
    </>
  )
}
