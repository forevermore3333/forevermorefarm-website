import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'

export const metadata: Metadata = {
  title: 'Volunteer Gardener PBS Feature | Straw Bale Garden at Forevermore Farm',
  description:
    'Forevermore Farm is featured on PBS Volunteer Gardener — watch Concetta\'s straw bale garden on Nashville PBS April 30 at 7:30 PM. Then see it in person at the Ag & Arts Tour, June 19–20.',
  openGraph: {
    type: 'website',
    title: 'Volunteer Gardener PBS Feature | Straw Bale Garden at Forevermore Farm',
    description:
      'Watch Forevermore Farm\'s straw bale garden on Nashville PBS April 30 at 7:30 PM — then visit in person at the Ag & Arts Tour, June 19–20, 2026.',
    images: [
      {
        url: '/images/garden-build/concetta-placing-bales-golden-hour.jpg',
        width: 1200,
        height: 630,
        alt: 'Concetta placing straw bales at Forevermore Farm at golden hour',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Volunteer Gardener PBS Feature | Straw Bale Garden at Forevermore Farm',
    description:
      'Watch Forevermore Farm\'s straw bale garden on Nashville PBS April 30 at 7:30 PM — then visit in person at the Ag & Arts Tour, June 19–20, 2026.',
    images: ['/images/garden-build/concetta-placing-bales-golden-hour.jpg'],
  },
  alternates: {
    canonical: '/volunteer-gardener',
  },
}

export default function VolunteerGardener() {
  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex items-center justify-center min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/garden-build/concetta-placing-bales-golden-hour.jpg"
            alt="Concetta placing straw bales in the garden at Forevermore Farm at golden hour"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-farm-charcoal/55" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">As Seen on PBS</span>
          <h1 className="font-serif text-4xl md:text-6xl text-farm-cream mt-4 mb-6 leading-tight drop-shadow-lg">
            Forevermore Farm on<br />Volunteer Gardener
          </h1>
          <p className="text-lg md:text-xl text-farm-cream/85 mb-8 max-w-2xl mx-auto">
            Concetta&rsquo;s straw bale garden is coming to PBS — and you can see it in person this June at the Hickman County Ag &amp; Arts Tour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#watch"
              className="inline-block bg-farm-green text-farm-cream px-8 py-3 rounded-sm text-sm font-medium tracking-widest uppercase hover:bg-farm-green/90 transition-colors"
            >
              Watch Schedule
            </a>
            <a
              href="#ag-arts-tour"
              className="inline-block border border-farm-cream text-farm-cream px-8 py-3 rounded-sm text-sm font-medium tracking-widest uppercase hover:bg-farm-cream/10 transition-colors"
            >
              Visit in June
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. BROADCAST / WATCH SCHEDULE ───────────────────────────────────── */}
      <section id="watch" className="py-20 px-4 bg-farm-cream">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">Tennessee Premiere</span>
            <h2 className="font-serif text-3xl md:text-4xl text-farm-green mt-3 mb-4">When &amp; Where to Watch</h2>
            <p className="text-farm-charcoal/70 leading-relaxed max-w-2xl mx-auto">
              The episode featuring Forevermore Farm&rsquo;s straw bale garden airs across Tennessee public television stations in late April and early May 2026. Check your local listings or watch online at{' '}
              <a
                href="https://volunteergardener.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-farm-green underline underline-offset-4 hover:text-farm-green/70 transition-colors"
              >
                volunteergardener.org
              </a>{' '}
              starting April 30.
            </p>
          </div>

          {/* Featured broadcast */}
          <div className="bg-farm-green text-farm-cream rounded-sm p-8 mb-8 text-center">
            <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">Tennessee Debut</span>
            <h3 className="font-serif text-2xl md:text-3xl mt-2 mb-1">Nashville PBS</h3>
            <p className="text-farm-cream/90 text-lg font-medium">Thursday, April 30, 2026 &mdash; 7:30 PM</p>
            <p className="text-farm-cream/60 text-sm mt-2">Repeat: Sunday, May 3, 2026 at 9:30 AM</p>
          </div>

          {/* Regional stations grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-farm-tan/30 rounded-sm p-5 bg-white/50">
              <h4 className="font-serif text-lg text-farm-green mb-1">WCTE — Cookeville</h4>
              <p className="text-farm-charcoal/70 text-sm">Saturday, May 2, 2026 &mdash; 3:00 PM</p>
            </div>
            <div className="border border-farm-tan/30 rounded-sm p-5 bg-white/50">
              <h4 className="font-serif text-lg text-farm-green mb-1">WKNO — Memphis</h4>
              <p className="text-farm-charcoal/70 text-sm">Saturday, May 2, 2026 &mdash; 2:30 PM</p>
            </div>
            <div className="border border-farm-tan/30 rounded-sm p-5 bg-white/50">
              <h4 className="font-serif text-lg text-farm-green mb-1">WTCI — Chattanooga</h4>
              <p className="text-farm-charcoal/70 text-sm">Saturday, May 2, 2026 &mdash; 10:00 AM</p>
            </div>
            <div className="border border-farm-tan/30 rounded-sm p-5 bg-white/50">
              <h4 className="font-serif text-lg text-farm-green mb-1">West TN PBS</h4>
              <p className="text-farm-charcoal/70 text-sm">Saturday, May 2, 2026 &mdash; 1:30 PM</p>
              <p className="text-farm-charcoal/50 text-xs mt-1">Also: Sunday, May 3, 2026 &mdash; 5:30 PM</p>
            </div>
          </div>

          <p className="text-center text-farm-charcoal/50 text-sm mt-8">
            Online streaming available starting April 30 at{' '}
            <a
              href="https://volunteergardener.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-farm-green hover:underline underline-offset-4"
            >
              volunteergardener.org
            </a>
          </p>
        </div>
      </section>

      {/* ── 3. SEE IT IN PERSON — STRAW BALE GARDEN TIE-IN ─────────────────── */}
      <section className="py-20 px-4 bg-farm-tan/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md order-2 md:order-1">
            <Image
              src="/images/garden-build/garden-pergola-interior-complete.jpg"
              alt="The completed straw bale garden pergola at Forevermore Farm"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">After You Watch</span>
            <h2 className="font-serif text-3xl text-farm-green mt-3 mb-4">See the Garden in Person</h2>
            <p className="text-farm-charcoal/70 leading-relaxed mb-4">
              The garden you&rsquo;ll see on PBS is real, and it&rsquo;s right here on the farm. Concetta built it from scratch — a hand-constructed pergola enclosure with straw bale growing beds inside. Market-scale. Working. The kind of thing you have to see to really understand.
            </p>
            <p className="text-farm-charcoal/70 leading-relaxed mb-6">
              She trained directly under Joel Karsten, the creator of the straw bale gardening method. When the PBS <em>Volunteer Gardener</em> crew came to film, they came here.
            </p>
            <Link
              href="/straw-bale-garden"
              className="inline-block text-farm-green text-sm font-medium hover:underline underline-offset-4"
            >
              Learn the straw bale method →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. VISIT DURING AG & ARTS TOUR ──────────────────────────────────── */}
      <section id="ag-arts-tour" className="py-20 px-4 bg-farm-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">June 19–20, 2026</span>
          <h2 className="font-serif text-3xl md:text-4xl text-farm-cream mt-3 mb-4">
            Visit at the Hickman County Ag &amp; Arts Tour
          </h2>
          <p className="text-farm-cream/70 leading-relaxed max-w-2xl mx-auto mb-10">
            Forevermore Farm is a tour stop. Come out, walk the straw bale garden, meet the animals, and see what a real working homestead actually looks like. Free and open to the public.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left mb-12">
            <div className="bg-farm-charcoal/40 border border-farm-tan/20 rounded-sm p-6">
              <h3 className="font-serif text-lg text-farm-tan mb-3">The Straw Bale Garden</h3>
              <p className="text-farm-cream/60 text-sm leading-relaxed">
                Walk through the garden Concetta built and PBS came to film. She&rsquo;ll be giving demos throughout the weekend — the actual method, not a presentation about it.
              </p>
            </div>
            <div className="bg-farm-charcoal/40 border border-farm-tan/20 rounded-sm p-6">
              <h3 className="font-serif text-lg text-farm-tan mb-3">The Sunflower Fields</h3>
              <p className="text-farm-cream/60 text-sm leading-relaxed">
                Bring your camera. Rows and rows of sunflowers in full summer bloom. It&rsquo;s one of those places that earns the photos people take there.
              </p>
            </div>
            <div className="bg-farm-charcoal/40 border border-farm-tan/20 rounded-sm p-6">
              <h3 className="font-serif text-lg text-farm-tan mb-3">The Animals</h3>
              <p className="text-farm-cream/60 text-sm leading-relaxed">
                Heritage Berkshire pigs, Nigerian Dwarf goats, chickens, and Clementine — the miniature pig who lives in the house and makes her rounds. Kid-friendly doesn&rsquo;t begin to cover it.
              </p>
            </div>
          </div>

          <Link
            href="/events"
            className="inline-block bg-farm-tan text-farm-charcoal px-8 py-3 rounded-sm text-sm font-medium tracking-widest uppercase hover:bg-farm-tan/90 transition-colors"
          >
            Full Event Details
          </Link>
        </div>
      </section>

      {/* ── 5. VENDORS + FLEA MARKET UNDER THE TENT ─────────────────────────── */}
      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">Under the Tent</span>
              <h2 className="font-serif text-3xl text-farm-green mt-3 mb-4">Vendors &amp; Flea Market</h2>
              <p className="text-farm-charcoal/70 leading-relaxed mb-6">
                The weekend is more than a farm tour. We&rsquo;ve got a flea market and vendor market running under the tent — local makers, handmade goods, food, and things you won&rsquo;t find at a big-box store.
              </p>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <span className="text-farm-tan mt-0.5">→</span>
                  <div>
                    <strong className="text-farm-charcoal">Papa K Joe&rsquo;s BBQ</strong>
                    <span className="text-farm-charcoal/60"> — Smoked right, served fresh</span>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-farm-tan mt-0.5">→</span>
                  <div>
                    <strong className="text-farm-charcoal">Twin Creek Woodworks</strong>
                    <span className="text-farm-charcoal/60"> — Handcrafted wood pieces</span>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-farm-tan mt-0.5">→</span>
                  <div>
                    <strong className="text-farm-charcoal">Rustic Roots</strong>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-farm-tan mt-0.5">→</span>
                  <div>
                    <strong className="text-farm-charcoal">The Old Country Church Stead</strong>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-farm-tan mt-0.5">→</span>
                  <div>
                    <strong className="text-farm-charcoal">Sourdough by Katerina</strong>
                    <span className="text-farm-charcoal/60"> — Fresh baked, real sourdough</span>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-farm-tan mt-0.5">→</span>
                  <span className="text-farm-charcoal/60 italic">Plus more vendors still being added</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md">
              <Image
                src="/images/pasture-land/gladiolus-flowers-stage-event-tent-pasture.jpg"
                alt="Gladiolus flowers in front of the event tent at Forevermore Farm"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PLAN YOUR VISIT ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-farm-green">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-medium tracking-widest text-farm-cream/50 uppercase">Getting Here</span>
            <h2 className="font-serif text-3xl text-farm-cream mt-3 mb-4">Plan Your Visit</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-serif text-xl text-farm-tan mb-4">The Basics</h3>
              <ul className="space-y-3 text-farm-cream/80">
                <li className="flex gap-3">
                  <span className="text-farm-tan shrink-0">→</span>
                  <span><strong className="text-farm-cream">Ag &amp; Arts Tour Weekend:</strong> June 19–20, 2026</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-farm-tan shrink-0">→</span>
                  <span>
                    <strong className="text-farm-cream">Address:</strong>{' '}
                    <a
                      href="https://maps.google.com/?q=302+Hickory+Trace+Lyles+TN+37098"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-farm-cream transition-colors"
                    >
                      302 Hickory Trace, Lyles, TN 37098
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-farm-tan shrink-0">→</span>
                  <span>Free and open to the public</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-farm-tan shrink-0">→</span>
                  <span>Parking on-site — follow signage from the road</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-farm-tan shrink-0">→</span>
                  <span>Restrooms available</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl text-farm-tan mb-4">What to Expect</h3>
              <ul className="space-y-3 text-farm-cream/80">
                <li className="flex gap-3">
                  <span className="text-farm-tan shrink-0">→</span>
                  <span>A working homestead — animals out, garden open, nothing staged</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-farm-tan shrink-0">→</span>
                  <span>Straw bale garden tours and demos with Concetta</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-farm-tan shrink-0">→</span>
                  <span>Food, vendors, and flea market under the tent</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-farm-tan shrink-0">→</span>
                  <span>Sunflower fields — bring a camera</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-farm-tan shrink-0">→</span>
                  <span><strong className="text-farm-cream">Wear shoes you don&rsquo;t mind getting dirty.</strong> This is a real farm.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. ABOUT THE PBS FEATURE ────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md">
            <Image
              src="/images/garden-build/garden-enclosure-wide-blue-sky.jpg"
              alt="The straw bale garden enclosure at Forevermore Farm under blue sky"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">About the Episode</span>
            <h2 className="font-serif text-3xl text-farm-green mt-3 mb-4">How This Happened</h2>
            <p className="text-farm-charcoal/70 leading-relaxed mb-4">
              <em>Volunteer Gardener</em> is a Nashville PBS production that has been teaching Tennesseans how to grow for decades. When they came looking for a straw bale story, they found Concetta.
            </p>
            <p className="text-farm-charcoal/70 leading-relaxed mb-4">
              Concetta is a certified Straw Bale Gardening instructor — trained directly under Joel Karsten, the creator of the method. She&rsquo;s been growing this way for over a decade, across two states and two growing zones. The garden at Forevermore is the result of all of that.
            </p>
            <p className="text-farm-charcoal/70 leading-relaxed">
              The episode was filmed here at the farm. What you&rsquo;ll see on PBS is what&rsquo;s here — and you can come see it yourself.
            </p>
            <div className="mt-6">
              <Link
                href="/straw-bale-garden"
                className="inline-block text-farm-green text-sm font-medium hover:underline underline-offset-4"
              >
                Learn the straw bale method Concetta teaches →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. PRESS & MEDIA ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-farm-charcoal/95">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-medium tracking-widest text-farm-tan uppercase mb-8">Press &amp; Media</p>
          <div className="space-y-6">
            {/* PBS Volunteer Gardener */}
            <div className="border-b border-farm-tan/20 pb-6">
              <a
                href="https://volunteergardener.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-farm-cream/70 hover:text-farm-cream transition-colors"
              >
                <span className="font-serif text-xl">PBS Volunteer Gardener</span>
                <span className="text-farm-tan/50">—</span>
                <span className="text-sm italic text-farm-cream/50 group-hover:text-farm-cream/80 transition-colors">Straw Bale Garden at Forevermore Farm</span>
              </a>
              <p className="text-farm-cream/40 text-xs mt-3">Premiering April 30, 2026 on Nashville PBS</p>
            </div>
            {/* WKRN */}
            <div>
              <a
                href="https://www.wkrn.com/special-reports/hickman-county-homesteaders-living-off-grid/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-farm-cream/70 hover:text-farm-cream transition-colors"
              >
                <span className="font-serif text-xl">WKRN News 2</span>
                <span className="text-farm-tan/50">—</span>
                <span className="text-sm italic text-farm-cream/50 group-hover:text-farm-cream/80 transition-colors">&ldquo;Hickman County Homesteaders Living Off Grid&rdquo;</span>
              </a>
              <blockquote className="mt-4 border-l-2 border-farm-tan/40 pl-6 text-left max-w-xl mx-auto">
                <p className="text-farm-cream/70 italic leading-relaxed text-sm">
                  &ldquo;It tastes better knowing that it came out of your garden. And it tastes better knowing that you raised the animal that you&rsquo;re eating. It&rsquo;s healthier.&rdquo;
                </p>
                <cite className="block mt-3 text-farm-tan/70 text-xs not-italic">— Olin West, WKRN News 2 · July 3, 2025</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Email + back-links */}
      <EmailCapture
        headline="Get the word when the episode airs."
        subtitle="Join the list — we&apos;ll send a reminder before it premieres, and farm news after."
      />

      <section className="py-12 px-4 bg-farm-tan/10 border-t border-farm-tan/20">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-farm-charcoal/60">
          <Link href="/straw-bale-garden" className="hover:text-farm-green transition-colors">
            ← About the Straw Bale Garden
          </Link>
          <span className="hidden sm:block text-farm-tan/40">|</span>
          <Link href="/events" className="hover:text-farm-green transition-colors">
            Ag &amp; Arts Tour details →
          </Link>
        </div>
      </section>
    </>
  )
}
