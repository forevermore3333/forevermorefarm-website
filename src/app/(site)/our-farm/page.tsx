import type { Metadata } from "next"
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Our Farm | Forevermore Farm | Lyles, TN",
  description: "Meet Olin and Concetta West. Heritage Berkshire pigs, Nigerian Dwarf goats, straw bale gardens, and a way of life rooted in Lyles, Tennessee.",
  openGraph: {
    type: "website",
    title: "Our Farm | Forevermore Farm | Lyles, TN",
    description: "Meet Olin and Concetta West. Heritage Berkshire pigs, Nigerian Dwarf goats, straw bale gardens, and a way of life rooted in Lyles, Tennessee.",
    images: [
      {
        url: "/images/property/concetta-sheep-stage-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Concetta with sheep on the stage at Forevermore Farm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Farm | Forevermore Farm | Lyles, TN",
    description: "Meet Olin and Concetta West. Heritage Berkshire pigs, Nigerian Dwarf goats, straw bale gardens, and a way of life rooted in Lyles, Tennessee.",
    images: ["/images/property/concetta-sheep-stage-bg.jpg"],
  },
  alternates: {
    canonical: "/our-farm",
  },
}
import HeroSection from '@/components/HeroSection'
import EmailCapture from '@/components/EmailCapture'
import Link from 'next/link'

export default function OurFarm() {
  return (
    <>
      <HeroSection
        title="The Life Here"
        bgImage="/images/property/concetta-sheep-stage-bg.jpg"
        bgPositionMobile="38% 67%"
        bgPositionDesktop="38% 67%"
        bgScaleDesktop={1.0}
        showLogo
      />

      {/* Story */}
      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-3xl mx-auto">
          <p className="font-serif text-xl text-farm-charcoal leading-relaxed mb-6">
            In the hills of Lyles, Tennessee, Olin and Concetta West are building something that refuses to be rushed.
          </p>
          <p className="text-farm-charcoal/70 leading-relaxed mb-4">
            Forevermore Farm began in 2021, not as an investment or a hobby, but as a commitment to a more grounded way of life, one rooted in trusted soil, traceable food, and real connection to community.
          </p>
          <p className="text-farm-charcoal/70 leading-relaxed mb-4">
            Olin tends the land with the quiet steadiness farming requires, caring for the fields and animals with patience, consistency, and deep respect for the work. He does not talk much about stewardship, he simply lives it.
          </p>
          <p className="text-farm-charcoal/70 leading-relaxed mb-4">
            Concetta brings both knowledge and vision. She is a certified Straw Bale Gardening instructor and the founder of The LOCAL Place in Centerville, where she has nourished the community for years. At Forevermore, she raises miniature dairy goats, chickens, unbelievably soft rabbits, and heritage Berkshire and Gloucestershire Old Spot pigs, while also growing vegetables, herbs, and flowers that fill the farm with both nourishment and beauty. Everything is approached in a way that honors older, more natural farming traditions. The pork is exceptional, and the reason is simple: the animals are raised with care.
          </p>
          <p className="text-farm-charcoal/70 leading-relaxed mb-4">
            Together, Olin and Concetta have made Forevermore Farm a place where people can slow down, get their hands dirty, and reconnect with what food really is. Through workshops, farm days, time in the garden, and time with the animals, they invite others into a way of living that is more intentional, more nourishing, and more connected.
          </p>
          <p className="font-serif text-lg text-farm-green">Come wander. Come learn. Come back.</p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-4 bg-farm-tan/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md">
            <Image src="/images/people/olin-concetta-barn-snow.jpg" alt="Olin and Concetta West at Forevermore Farm" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <h2 className="font-serif text-3xl text-farm-green mb-6">Who We Are</h2>
            <p className="text-farm-charcoal/70 leading-relaxed mb-4">
              Olin spent 20 years in the United States Navy serving on submarines as a sonar technician, retiring as a Senior Chief Petty Officer. His work required focus, discipline, and a constant awareness of what could not always be seen. After the Navy, he spent another five years at Puget Sound Naval Shipyard, maintaining the combat systems he had spent his career operating. Along the way, his focus began to turn toward a different kind of calling, one rooted not in steel and sonar, but in land, animals, and the steady work of building something lasting.
            </p>
            <p className="text-farm-charcoal/70 leading-relaxed mb-4">
              Concetta&apos;s path was no less demanding. She worked as a trauma nurse on the OR at a Level One trauma center in Seattle, where the pace was relentless and the stakes were always high. When she moved to Tennessee, she brought that same grit, instinct, and care into a new chapter, opening{' '}
              <a href="https://thelocalplacetn.com" target="_blank" rel="noopener noreferrer" className="text-farm-green hover:underline underline-offset-4">The LOCAL Place</a>
              {' '}on the square in Centerville. What she created was more than a caf&eacute;. It became a gathering place, a place of warmth, welcome, and community. That vision continued to grow with{' '}
              <a href="https://thelocalplacetn.com/drive-thru" target="_blank" rel="noopener noreferrer" className="text-farm-green hover:underline underline-offset-4">The LOCAL Drive-Thru</a>
              {' '}and{' '}
              <a href="https://thelocalplacetn.com/made" target="_blank" rel="noopener noreferrer" className="text-farm-green hover:underline underline-offset-4">MADE @ The Local</a>
              , a creative space for pottery, candles, and hands-on beauty.
            </p>
            <p className="font-serif text-lg text-farm-green">
              They did not come to Tennessee to disappear into a quieter life. They came to build something honest, rooted, and real.
            </p>
          </div>
        </div>
      </section>

      {/* Olin on the land */}
      <section className="py-4 px-4 bg-farm-tan/20">
        <div className="max-w-6xl mx-auto">
          <div className="relative aspect-[4/3] max-w-2xl mx-auto rounded-sm overflow-hidden">
            <Image src="/images/property/olin-tractor-brushhog-pov.jpg" alt="Olin on the tractor brush hogging the property" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: '50% 76%' }} />
            <div className="absolute inset-0 bg-farm-charcoal/30" />
            <div className="absolute bottom-6 left-8">
              <p className="font-serif text-2xl text-farm-cream drop-shadow-lg">Olin keeps the land.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animals */}
      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-farm-green text-center mb-16">The Animals</h2>

          {/* Clementine & Hazel */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md">
              <Image src="/images/house-animals/clementine-hazel-birthday-couch.jpg" alt="Clementine and Hazel in birthday hats on the couch with a cake" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-farm-green mb-4">Clementine &amp; Hazel</h3>
              <p className="text-farm-charcoal/70 leading-relaxed mb-4">Clementine is a Juliana pig. Hazel is a pot-belly pig. They live in the house, sleep on the couch, and celebrate birthdays with cake and party hats. This is not a joke &mdash; there is photographic evidence.</p>
              <p className="text-farm-charcoal/70 leading-relaxed">They don&apos;t know they&apos;re pigs. Nobody&apos;s going to tell them.</p>
            </div>
          </div>

          {/* Teddy */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="md:order-2 relative aspect-[4/3] rounded-sm overflow-hidden shadow-md">
              <Image src="/images/house-animals/teddy-apple-crate-porch.jpg" alt="Teddy the cat on the apple crate on the porch" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: '100% 92%' }} />
            </div>
            <div className="md:order-1">
              <h3 className="font-serif text-2xl text-farm-green mb-4">Teddy</h3>
              <p className="text-farm-charcoal/70 leading-relaxed mb-4">We got Teddy for our daughter when she broke her neck and was stuck in bed for weeks. He was supposed to be a companion for her &mdash; and he was. But Teddy didn&apos;t stop there. He bonded with every animal on this farm. He babysits Clementine, supervises the garden, and has strong opinions about everything.</p>
              <p className="text-farm-charcoal/70 leading-relaxed">He runs this place. The rest of us just live here.</p>
            </div>
          </div>

          {/* Heritage Pigs */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md">
              <Image src="/images/pigs/piglet-posing-shelter.jpg" alt="Heritage Berkshire piglet in the shelter" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: '50% 17%' }} />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-farm-green mb-4">Heritage Berkshire Pigs</h3>
              <p className="text-farm-charcoal/70 leading-relaxed mb-4">Raised free-range on open pasture, no pharmaceutical vaccines, the way it used to be done before farming became a factory. Berkshires are known for exceptional flavor — dark, marbled, deeply rich pork that tastes like pork is supposed to taste.</p>
              <p className="text-farm-charcoal/70 leading-relaxed">The pork is extraordinary. The reason why is simple: these pigs lived well.</p>
            </div>
          </div>

          {/* Baby Goats */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2 relative aspect-[4/3] rounded-sm overflow-hidden shadow-md">
              <Image src="/images/goats/baby-nigerian-dwarf-trio.jpg" alt="Three Nigerian Dwarf baby goats in summer grass" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center" />
            </div>
            <div className="md:order-1">
              <h3 className="font-serif text-2xl text-farm-green mb-4">Nigerian Dwarf Goats</h3>
              <p className="text-farm-charcoal/70 leading-relaxed mb-4">Small, charismatic, and completely unaware of boundaries. The Nigerian Dwarfs arrived and immediately made themselves at home.</p>
              <p className="text-farm-charcoal/70 leading-relaxed">They have zero regrets. Neither do we.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Land */}
      <section className="py-20 px-4 bg-farm-tan/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-farm-green text-center mb-12">The Land</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md">
              <Image src="/images/pasture-land/wildflower-meadow-wide-4.jpg" alt="Wildflower meadow filling the bowl at Forevermore Farm" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-[center_20%]" />
              <div className="absolute bottom-0 left-0 right-0 bg-farm-charcoal/50 text-farm-cream text-sm px-4 py-2">The bowl fills every spring</div>
            </div>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md">
              <Image src="/images/pasture-land/tulips-driveway-pig-bg.jpg" alt="Tulips lining the driveway with a pig in the background" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-farm-charcoal/50 text-farm-cream text-sm px-4 py-2">The welcome committee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Straw Bale Garden */}
      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl text-farm-green mb-4">The Straw Bale Garden</h2>
            <p className="text-farm-charcoal/70 leading-relaxed mb-4">
              Concetta is a certified Straw Bale Gardening instructor who studied directly under Joel Karsten — the method&apos;s creator. She grew her first market garden and a 30-member CSA from straw bales alone.
            </p>
            <p className="text-farm-charcoal/70 leading-relaxed mb-6">
              At Forevermore, the garden lives inside a hand-built pergola enclosure — raised beds, straw bales, and a trellis system that fills wall to wall by midsummer. Workshops are coming this season.
            </p>
            <Link href="/straw-bale-garden" className="inline-block bg-farm-green text-farm-cream px-6 py-3 rounded-sm text-sm font-medium hover:bg-farm-green/90 transition-colors">
              Learn the Method
            </Link>
          </div>
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md">
            <Image src="/images/garden-build/concetta-placing-bales-golden-hour.jpg" alt="Concetta placing straw bales at golden hour" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* As Seen In */}
      <section className="py-20 px-4 bg-farm-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-medium tracking-widest text-farm-tan uppercase mb-10">As Seen In</p>
          <a
            href="https://www.wkrn.com/special-reports/hickman-county-homesteaders-living-off-grid/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-col items-center gap-4 hover:opacity-90 transition-opacity"
          >
            <div className="border border-farm-tan/30 rounded-sm px-6 sm:px-10 py-6 group-hover:border-farm-tan/60 transition-colors">
              <p className="font-serif text-2xl text-farm-cream mb-1">WKRN News 2</p>
              <p className="text-farm-tan text-sm tracking-wide">&ldquo;Hickman County Homesteaders Living Off Grid&rdquo;</p>
              <p className="text-farm-cream/30 text-xs mt-3 group-hover:text-farm-cream/60 transition-colors">Watch the feature →</p>
            </div>
          </a>
        </div>
      </section>

      <EmailCapture
        headline="Stay connected."
        subtitle="Events, farm days, and workshop announcements — to your inbox first."
      />
    </>
  )
}
