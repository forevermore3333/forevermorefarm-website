import type { Metadata } from "next"
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Forevermore Farm — Heritage Pigs, Gardens & Farm Life | Lyles, TN",
  description: "A regenerative farm in Lyles, Tennessee. Heritage Berkshire pigs, straw bale gardens, Nigerian Dwarf goats, and farm workshops — 45 minutes from Nashville.",
  openGraph: {
    type: "website",
    title: "Forevermore Farm — Heritage Pigs, Gardens & Farm Life | Lyles, TN",
    description: "A regenerative farm in Lyles, Tennessee. Heritage Berkshire pigs, straw bale gardens, Nigerian Dwarf goats, and farm workshops — 45 minutes from Nashville.",
    images: [
      {
        url: "/images/property/stage-sunrise-fog-valley.jpg",
        width: 1200,
        height: 630,
        alt: "The stage at Forevermore Farm overlooking a fog-filled valley at sunrise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forevermore Farm — Heritage Pigs, Gardens & Farm Life | Lyles, TN",
    description: "A regenerative farm in Lyles, Tennessee. Heritage Berkshire pigs, straw bale gardens, Nigerian Dwarf goats, and farm workshops — 45 minutes from Nashville.",
    images: ["/images/property/stage-sunrise-fog-valley.jpg"],
  },
  alternates: {
    canonical: "/",
  },
}

import HeroSection from '@/components/HeroSection'
import EmailCapture from '@/components/EmailCapture'
import EventCard from '@/components/EventCard'
import { events } from '@/data/events'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        title="Rooted in Lyles, Tennessee"
        subtitle="A regenerative farm where people gather, grow, and slow down."
        ctaText="Join Our List"
        ctaHref="#email-capture"
        bgImage="/images/property/stage-sunrise-fog-valley.jpg"
        bgPositionMobile="71% 70%"
        bgPositionDesktop="50% 80%"
        bgScaleDesktop={1.6}
        bgTranslateXDesktop="-10%"
        showLogo
      />

      {/* Definition */}
      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl text-farm-charcoal leading-relaxed mb-6">
            fo&middot;rev&middot;er&middot;more{' '}
            <span className="text-farm-tan text-lg">/f&#601;r-&#x2C8;ev-&#601;r-&#x2CC;m&#xF4;r/</span>
            {' '}&mdash; not a place you visit once. a place that stays with you.
          </p>
          <p className="text-farm-charcoal/70 leading-relaxed max-w-2xl mx-auto text-lg">
            Forevermore Farm is a small, regenerative homestead in the hills of Hickman County. We raise heritage pigs, tend a straw bale garden, and open our gates to anyone who wants to remember what real food and real land feel like.
          </p>
        </div>
      </section>


      {/* Press — social proof */}
      <section className="py-16 px-4 bg-farm-charcoal/95">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-medium tracking-widest text-farm-tan uppercase mb-8">As Seen In</p>

          {/* WKRN Feature */}
          <div className="mb-6">
            <a
              href="https://www.wkrn.com/special-reports/hickman-county-homesteaders-living-off-grid/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-farm-cream/70 hover:text-farm-cream transition-colors mb-4"
            >
              <span className="font-serif text-xl">WKRN News 2</span>
              <span className="text-farm-tan/50">—</span>
              <span className="text-sm italic text-farm-cream/50 group-hover:text-farm-cream/80 transition-colors">&ldquo;Hickman County Homesteaders Living Off Grid&rdquo;</span>
            </a>
            <blockquote className="mt-6 border-l-2 border-farm-tan/40 pl-6 text-left max-w-xl mx-auto">
              <p className="text-farm-cream/70 italic leading-relaxed">&ldquo;It tastes better knowing that it came out of your garden. And it tastes better knowing that you raised the animal that you&apos;re eating. It&apos;s healthier.&rdquo;</p>
              <cite className="block mt-3 text-farm-tan/70 text-sm not-italic">— Olin West, WKRN News 2 · July 3, 2025</cite>
            </blockquote>
          </div>

          {/* PBS teaser */}
          <p className="text-farm-cream/40 text-xs mt-8 max-w-lg mx-auto">Concetta&apos;s straw bale garden at Forevermore is soon to be featured on PBS <em>Volunteer Gardener</em> — the method she teaches, trained directly under creator Joel Karsten.</p>
        </div>
      </section>

      {/* Animals Section */}
      <section className="py-16 px-4 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-farm-green text-center mb-4">The Animals</h2>
          <p className="text-center text-farm-charcoal/60 mb-12 max-w-xl mx-auto">They all get along. Every single one of them. That tells you something about this place.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Clementine & Hazel */}
            <div className="bg-farm-cream rounded-sm overflow-hidden shadow-sm">
              <div className="relative h-64">
                <Image
                  src="/images/house-animals/clementine-hazel-pasture.jpg"
                  alt="Hazel the pot-belly pig nose-to-nose with Teddy the cat on the hardwood floor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-farm-green mb-3">Clementine &amp; Hazel</h3>
                <p className="text-farm-charcoal/70 leading-relaxed text-sm">Clementine is a Juliana pig. Hazel is a pot-belly. Both live in the house and both have strong opinions about it. Teddy the cat has appointed himself babysitter to both of them. Nobody asked. He just started doing it.</p>
              </div>
            </div>
            {/* Heritage Pigs */}
            <div className="bg-farm-cream rounded-sm overflow-hidden shadow-sm">
              <div className="relative h-64">
                <Image
                  src="/images/pigs/piglet-posing-shelter.jpg"
                  alt="Heritage Berkshire piglet posing in the shelter"
                  fill
                  className="object-cover object-[center_30%]"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-farm-green mb-3">Heritage Berkshire Pigs</h3>
                <p className="text-farm-charcoal/70 leading-relaxed text-sm">Free-range Berkshire pigs raised the way it used to be done — open pasture, no pharmaceutical vaccines, room to root. The pork is extraordinary. The reason why is simple.</p>
              </div>
            </div>
            {/* Baby Goats */}
            <div className="bg-farm-cream rounded-sm overflow-hidden shadow-sm">
              <div className="relative h-64">
                <Image
                  src="/images/goats/baby-nigerian-dwarf-trio.jpg"
                  alt="Three Nigerian Dwarf baby goat kids in the pasture"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-farm-green mb-3">Nigerian Dwarf Goats</h3>
                <p className="text-farm-charcoal/70 leading-relaxed text-sm">Three kids who arrived and immediately took over. They have no sense of personal space and zero regrets about it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Straw Bale Garden Feature */}
      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-farm-green mb-4">The Straw Bale Garden</h2>
            <p className="text-farm-charcoal/70 leading-relaxed max-w-2xl mx-auto text-lg">
              Concetta is a certified Straw Bale Gardening instructor — one of a handful in the country trained directly under Joel Karsten, the method&apos;s creator. At Forevermore, she&apos;s built a market-scale garden inside a hand-built pergola enclosure. Workshops coming this season.
            </p>
            <Link href="/straw-bale-garden" className="inline-block mt-6 text-farm-green text-sm font-medium hover:underline underline-offset-4">
              Learn the method →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image src="/images/garden-build/trailer-full-straw-bales-arrive.jpg" alt="Straw bales arriving at Forevermore Farm" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 bg-farm-charcoal/60 text-farm-cream text-xs px-3 py-2">The bales arrive</div>
            </div>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image src="/images/garden-build/concetta-placing-bales-golden-hour.jpg" alt="Concetta placing straw bales at golden hour" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 bg-farm-charcoal/60 text-farm-cream text-xs px-3 py-2">Conditioning begins</div>
            </div>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image src="/images/garden-build/garden-pergola-interior-complete.jpg" alt="The completed pergola garden enclosure" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 bg-farm-charcoal/60 text-farm-cream text-xs px-3 py-2">The finished garden</div>
            </div>
          </div>
        </div>
      </section>

      {/* Garden Build Gallery */}
      <section className="py-16 px-4 bg-farm-tan/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl text-farm-charcoal text-center mb-3">How We Built It</h2>
          <p className="text-center text-farm-charcoal/50 text-sm mb-10">Every board cut, every post set, every bale placed by hand.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="relative aspect-square rounded-sm overflow-hidden">
              <Image src="/images/garden-build/garden-enclosure-wide-blue-sky.jpg" alt="Garden enclosure build under blue sky" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-sm overflow-hidden">
              <Image src="/images/garden-build/olin-concetta-working-garden.jpg" alt="Olin and Concetta working in the garden" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-sm overflow-hidden">
              <Image src="/images/garden-build/olin-family-filling-beds.jpg" alt="Family filling raised beds with compost" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-sm overflow-hidden">
              <Image src="/images/garden-build/raised-beds-filled-straw-wide.jpg" alt="Raised beds filled and ready for planting" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* The Land */}
      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-serif text-3xl text-farm-green mb-4">The Land</h2>
            <p className="text-farm-charcoal/70 leading-relaxed text-lg mb-4">
              Forty-something acres of Tennessee hills, a natural bowl shaped by tree lines on all sides, and a stage that was built because this place deserves music in it.
            </p>
            <p className="text-farm-charcoal/60 leading-relaxed">
              Wildflowers fill the bowl in spring. Wild turkeys walk through without asking. The fog sits in the valley in the morning and burns off slow. Olin keeps the land — up before the sun, brush hogging the fields, doing the unglamorous work that makes all of it possible.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md">
            <Image src="/images/pasture-land/wildflower-meadow-wide-4.jpg" alt="Wildflower meadow in the bowl at Forevermore Farm" fill className="object-cover object-top" />
          </div>
        </div>
      </section>

      {/* Coming Soon — stripped clean */}
      <section className="py-16 px-4 bg-farm-charcoal">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-farm-cream mb-3">What&apos;s Coming</h2>
          <p className="text-farm-cream/50 mb-12">Join the list to hear first.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-farm-tan/30 rounded-sm p-8">
              <div className="relative h-48 rounded-sm overflow-hidden mb-6">
                <Image src="/images/property/stage-sunrise-fog-valley.jpg" alt="The stage at Forevermore Farm looking over the frost-covered valley" fill className="object-cover" />
              </div>
              <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">Coming Soon</span>
              <h3 className="font-serif text-2xl text-farm-cream mt-2">Event Venue</h3>
              <p className="text-farm-cream/60 text-sm mt-3 leading-relaxed">A renovated barn, an outdoor stage, and open sky. Forevermore Farm is becoming a place where people gather for music, community dinners, and the kind of evening that&apos;s hard to explain but easy to remember.</p>
            </div>
            <div className="border border-farm-tan/30 rounded-sm p-8">
              <div className="relative h-48 rounded-sm overflow-hidden mb-6">
                <Image src="/images/property/concetta-hazel-sheep-field.jpg" alt="Concetta in the field with sheep at evening light" fill className="object-cover" />
              </div>
              <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">Coming Soon</span>
              <h3 className="font-serif text-2xl text-farm-cream mt-2">Farm Stay</h3>
              <p className="text-farm-cream/60 text-sm mt-3 leading-relaxed">Wake up to roosters. Fall asleep under stars. The tiny home on the property is ready, and a camping area isn&apos;t far behind. Come for a night, leave moving a little slower than you arrived.</p>
            </div>
            <div className="border border-farm-tan/30 rounded-sm p-8">
              <div className="relative h-48 rounded-sm overflow-hidden mb-6">
                <Image src="/images/property/solar-barn-sheep.jpg" alt="The solar barn at Forevermore Farm with sheep" fill className="object-cover" />
              </div>
              <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">Coming Soon</span>
              <h3 className="font-serif text-2xl text-farm-cream mt-2">Harvest Hosts</h3>
              <p className="text-farm-cream/60 text-sm mt-3 leading-relaxed">If you travel by RV, the best stops aren&apos;t the RV parks. Forevermore is exploring Harvest Hosts — a real working homestead, solar powered, with animals and gardens. No hookups needed. Just show up curious.</p>
            </div>
            <div className="border border-farm-tan/30 rounded-sm p-8">
              <div className="relative h-48 rounded-sm overflow-hidden mb-6">
                <Image src="/images/property/solar-barn-sheep.jpg" alt="The solar barn at Forevermore Farm" fill className="object-cover" />
              </div>
              <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">As Seen On TV</span>
              <h3 className="font-serif text-2xl text-farm-cream mt-2">Off-Grid Living</h3>
              <p className="text-farm-cream/60 text-sm mt-3 leading-relaxed">The farm runs almost entirely on solar power — no grid electricity. WKRN News 2 covered how this family lives off-grid in Hickman County, and Concetta&apos;s straw bale garden is soon to be featured on PBS Volunteer Gardener.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <div id="email-capture">
        <EmailCapture
          headline="Be the first to know."
          subtitle="Events, workshops, farm stays — announced here first."
        />
      </div>

      {/* Events */}
      <section className="py-16 px-4 bg-white/40">
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
