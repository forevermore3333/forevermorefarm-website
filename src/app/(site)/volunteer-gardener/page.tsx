import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import HeroSection from '@/components/HeroSection'

const broadcastSchedule = [
  {
    outlet: 'Nashville PBS debut',
    time: 'Thursday, April 30, 2026 at 7:30 PM',
  },
  {
    outlet: 'Nashville PBS repeat',
    time: 'Sunday, May 3, 2026 at 9:30 AM',
  },
  {
    outlet: 'WCTE Cookeville',
    time: 'Saturday, May 2, 2026 at 3:00 PM',
  },
  {
    outlet: 'WKNO Memphis',
    time: 'Saturday, May 2, 2026 at 2:30 PM',
  },
  {
    outlet: 'WTCI Chattanooga',
    time: 'Saturday, May 2, 2026 at 10:00 AM',
  },
  {
    outlet: 'West TN PBS',
    time: 'Saturday, May 2, 2026 at 1:30 PM and Sunday, May 3, 2026 at 5:30 PM',
  },
]

interface ConfirmedVendor {
  name: string
  cover?: string
  profile?: string
}

const confirmedVendors: ConfirmedVendor[] = [
  {
    name: 'Papa K Joe’s BBQ',
    cover: '/images/vendors/papa-kayjoes-bbq-cover.jpg',
    profile: '/images/vendors/papa-kayjoes-bbq-profile.jpg',
  },
  {
    name: 'Twin Creek Woodworks',
    cover: '/images/vendors/twin-creek-woodworks-cover.jpg',
    profile: '/images/vendors/twin-creek-woodworks-profile.jpg',
  },
  {
    name: 'Rustic Roots',
    cover: '/images/vendors/rustic-roots-homestead-cover.jpg',
    profile: '/images/vendors/rustic-roots-homestead-profile.jpg',
  },
  {
    name: 'The Old Country Church Stead',
    cover: '/images/vendors/the-old-country-churchstead-cover.jpg',
    profile: '/images/vendors/the-old-country-churchstead-profile.jpg',
  },
  {
    name: 'Sourdough by Katerina',
    cover: '/images/vendors/sourdough-by-katerina-cover.jpg',
    profile: '/images/vendors/sourdough-by-katerina-profile.jpg',
  },
]

const pressLinks = [
  {
    title: 'Watch Volunteer Gardener online',
    href: 'https://volunteergardener.org/',
    description: 'Online availability begins April 30 at volunteergardener.org.',
  },
  {
    title: 'WKRN News 2, “Hickman County Homesteaders Living Off Grid”',
    href: 'https://www.wkrn.com/special-reports/hickman-county-homesteaders-living-off-grid/',
    description: 'Older off-grid coverage lives down here where it belongs, useful context after the main garden story.',
  },
]

export const metadata: Metadata = {
  title: 'Volunteer Gardener PBS Feature | Straw Bale Garden at Forevermore Farm',
  description:
    'Watch the Volunteer Gardener PBS feature on Forevermore Farm, get the exact broadcast schedule, and plan your Ag & Arts Tour visit to see the straw bale garden in person.',
  openGraph: {
    type: 'website',
    title: 'Volunteer Gardener PBS Feature | Straw Bale Garden at Forevermore Farm',
    description:
      'Get the full Volunteer Gardener broadcast schedule, then plan your visit to Forevermore Farm during the June 19–20, 2026 Ag & Arts Tour.',
    images: [
      {
        url: '/images/press/volunteer-gardener-seo.png',
        width: 1200,
        height: 630,
        alt: 'Volunteer Gardener feature graphic for Forevermore Farm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Volunteer Gardener PBS Feature | Straw Bale Garden at Forevermore Farm',
    description:
      'Watch the PBS feature, see the schedule, and come visit the straw bale garden at Forevermore Farm.',
    images: ['/images/press/volunteer-gardener-seo.png'],
  },
  alternates: {
    canonical: '/volunteer-gardener',
  },
}

export default function VolunteerGardenerPage() {
  return (
    <>
      <HeroSection
        title="Volunteer Gardener is coming to Forevermore Farm"
        subtitle="Watch the PBS feature, then come see the straw bale garden in person during the June 19–20, 2026 Ag & Arts Tour at Forevermore Farm."
        ctaText="See the watch schedule"
        ctaHref="#watch-schedule"
        bgImage="/images/garden/zinnias-sunflowers-white-tent.jpg"
        bgPositionMobile="50% 52%"
        bgPositionDesktop="50% 58%"
        bgScaleDesktop={1.15}
        contentClassName="flex min-h-[85vh] flex-col justify-end pb-[max(5.5rem,38.2vh)] pt-36 md:min-h-[95vh] md:pb-[38.2vh] md:pt-40"
      >
        <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-full border border-farm-cream/20 bg-farm-charcoal/20 px-4 py-2 text-farm-cream/90 shadow-sm backdrop-blur-sm">
          <Image
            src="/images/press/volunteer-gardener-gardener.svg"
            alt="Volunteer Gardener mark"
            width={30}
            height={30}
            className="h-[30px] w-[30px]"
          />
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-farm-cream/85">
            Featured on Volunteer Gardener
          </span>
        </div>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="#ag-arts-tour"
            className="inline-block rounded-sm border border-farm-cream/70 px-6 py-3 text-sm font-medium tracking-widest text-farm-cream uppercase transition-colors hover:bg-farm-cream/10"
          >
            Plan your visit
          </Link>
          <Link
            href="/straw-bale-garden"
            className="inline-block rounded-sm border border-farm-cream/30 px-6 py-3 text-sm font-medium tracking-widest text-farm-cream/90 uppercase transition-colors hover:border-farm-cream/60 hover:text-farm-cream"
          >
            Explore the garden
          </Link>
        </div>
      </HeroSection>

      <section id="watch-schedule" className="bg-farm-cream px-4 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-farm-tan">Broadcast / Watch Schedule</span>
            <h2 className="mt-3 font-serif text-3xl text-farm-green md:text-4xl">Here&apos;s exactly when to watch.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-farm-charcoal/70">
              No hunting for listings, no vague “coming soon.” These are the confirmed Volunteer Gardener air dates for the Forevermore Farm feature.
            </p>
            <div className="mt-10 grid gap-4">
              {broadcastSchedule.map((item) => (
                <div key={item.outlet} className="rounded-sm border border-farm-tan/25 bg-white/70 p-5 shadow-sm">
                  <p className="font-serif text-xl text-farm-green">{item.outlet}</p>
                  <p className="mt-2 text-sm leading-relaxed text-farm-charcoal/70">{item.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm bg-farm-green p-8 text-farm-cream shadow-md">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-farm-cream/60">Online Availability</span>
            <h3 className="mt-3 font-serif text-3xl">Stream it after the debut.</h3>
            <p className="mt-4 leading-relaxed text-farm-cream/80">
              Online availability begins April 30 at{' '}
              <a
                href="https://volunteergardener.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-farm-cream/40 underline-offset-4 transition-colors hover:text-farm-cream"
              >
                volunteergardener.org
              </a>
              .
            </p>
            <div className="mt-8 overflow-hidden rounded-sm border border-farm-cream/15 bg-farm-charcoal/20 shadow-lg">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/images/press/volunteer-gardener-seo.png"
                  alt="Volunteer Gardener feature graphic for Forevermore Farm"
                  fill
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-3 border-t border-farm-cream/10 px-4 py-4">
                <Image
                  src="/images/press/volunteer-gardener-gardener.svg"
                  alt="Volunteer Gardener mark"
                  width={28}
                  height={28}
                  className="h-7 w-7 shrink-0"
                />
                <p className="text-sm leading-relaxed text-farm-cream/75">
                  Volunteer Gardener spotlighted the straw bale garden visitors can come see in person during Ag &amp; Arts Tour weekend.
                </p>
              </div>
            </div>
            <p className="mt-6 leading-relaxed text-farm-cream/70">
              If the episode sends you here, good. The next move is simple: come walk the straw bale garden for yourself.
            </p>
            <div className="mt-8 rounded-sm border border-farm-cream/15 bg-farm-charcoal/20 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-farm-cream/50">Next stop</p>
              <Link href="#see-it-in-person" className="mt-2 inline-block font-serif text-2xl text-farm-cream hover:text-farm-cream/85">
                See it in person →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="see-it-in-person" className="bg-white/70 px-4 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-farm-tan">See It In Person</span>
            <h2 className="mt-3 font-serif text-3xl text-farm-green md:text-4xl">The straw bale garden is the real thing, not a set piece.</h2>
            <p className="mt-5 text-lg leading-relaxed text-farm-charcoal/70">
              The garden featured on Volunteer Gardener is the same straw bale garden growing at Forevermore Farm. Concetta teaches the method, works it, and keeps learning from it season after season.
            </p>
            <p className="mt-4 leading-relaxed text-farm-charcoal/70">
              She is a certified Straw Bale Gardening instructor trained under Joel Karsten, so when visitors come out, they are seeing a method with deep roots and real results.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/straw-bale-garden"
                className="inline-block rounded-sm bg-farm-green px-6 py-3 text-center text-sm font-medium uppercase tracking-widest text-farm-cream transition-colors hover:bg-farm-green/90"
              >
                Read the full garden story
              </Link>
              <Link
                href="/events"
                className="inline-block rounded-sm border border-farm-green/25 px-6 py-3 text-center text-sm font-medium uppercase tracking-widest text-farm-green transition-colors hover:border-farm-green/50 hover:bg-farm-green/5"
              >
                Check the events page
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-md">
            <Image
              src="/images/garden/raised-bed-garden-overview-summer-2.jpg"
              alt="The straw bale garden at Forevermore Farm in summer"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="ag-arts-tour" className="bg-farm-tan/20 px-4 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-md">
            <Image
              src="/images/garden/garden-beds-with-white-tent.jpg"
              alt="Garden beds and the tent at Forevermore Farm"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-farm-tan">Visit During Ag &amp; Arts Tour</span>
            <h2 className="mt-3 font-serif text-3xl text-farm-green md:text-4xl">June 19–20, 2026, come see why PBS came out.</h2>
            <p className="mt-5 text-lg leading-relaxed text-farm-charcoal/70">
              Forevermore Farm is a tour stop for the 2026 Ag &amp; Arts Tour. If you want the best version of this story, it is not just on a screen. It is walking the garden, seeing the sunflower fields, and stepping into the rhythm of the farm for yourself.
            </p>
            <p className="mt-4 leading-relaxed text-farm-charcoal/70">
              The straw bale garden will be front and center, and there will be a flea market under the tent all weekend.
            </p>
            <div className="mt-8 rounded-sm border border-farm-tan/35 bg-farm-cream p-6">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-farm-tan">Worth seeing up close</p>
              <ul className="mt-4 space-y-3 text-farm-charcoal/75">
                <li>→ The straw bale garden featured on Volunteer Gardener</li>
                <li>→ Sunflower fields in season</li>
                <li>→ Heritage animals and a working off-grid, solar-powered farm</li>
                <li>→ The flea market under the tent during Ag &amp; Arts Tour</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-farm-cream px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-farm-tan">Vendors + Flea Market Under The Tent</span>
            <h2 className="mt-3 font-serif text-3xl text-farm-green md:text-4xl">Confirmed so far.</h2>
            <p className="mt-4 text-lg leading-relaxed text-farm-charcoal/70">
              These are the confirmed names so far for the Ag &amp; Arts Tour weekend at Forevermore Farm. More vendors are still being finalized.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {confirmedVendors.map((vendor) =>
              vendor.cover && vendor.profile ? (
                <div key={vendor.name} className="overflow-hidden rounded-sm border border-farm-tan/25 bg-white shadow-sm">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={vendor.cover}
                      alt={`${vendor.name} vendor image`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative p-6 pt-10">
                    <div className="absolute left-6 top-0 h-16 w-16 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white shadow-md">
                      <Image
                        src={vendor.profile}
                        alt={`${vendor.name} profile image`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-farm-tan">Confirmed vendor</p>
                    <p className="mt-2 font-serif text-2xl text-farm-green">{vendor.name}</p>
                    <p className="mt-3 text-sm leading-relaxed text-farm-charcoal/60">Confirmed for the Ag &amp; Arts Tour weekend.</p>
                  </div>
                </div>
              ) : (
                <div key={vendor.name} className="flex min-h-[220px] flex-col justify-between rounded-sm border border-dashed border-farm-green/30 bg-farm-green/5 p-6 shadow-sm">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-farm-green/60">Confirmed vendor</p>
                    <p className="mt-3 font-serif text-2xl text-farm-green">{vendor.name}</p>
                  </div>
                  <p className="mt-6 text-sm leading-relaxed text-farm-charcoal/60">
                    Confirmed for the Ag &amp; Arts Tour weekend.
                  </p>
                </div>
              )
            )}
            <div className="rounded-sm border border-dashed border-farm-green/30 bg-farm-green/5 p-6">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-farm-green/60">Still coming together</p>
              <p className="mt-3 font-serif text-2xl text-farm-green">Plus other vendors still being finalized</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/80 px-4 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-farm-tan">Plan Your Visit</span>
            <h2 className="mt-3 font-serif text-3xl text-farm-green md:text-4xl">Come ready to spend a little time here.</h2>
            <p className="mt-5 text-lg leading-relaxed text-farm-charcoal/70">
              Forevermore Farm sits at 302 Hickory Trace, Lyles, TN 37098. The Ag &amp; Arts Tour weekend is the best built-in chance to watch the story on PBS, then come stand in the middle of it yourself a few weeks later.
            </p>
            <p className="mt-4 leading-relaxed text-farm-charcoal/70">
              Expect the straw bale garden, sunflower fields, heritage animals, and the flea market under the tent. It is a working farm, so give yourself room to slow down and take it in.
            </p>
          </div>

          <div className="rounded-sm bg-farm-charcoal p-8 text-farm-cream shadow-md">
            <h3 className="font-serif text-2xl">Forevermore Farm</h3>
            <p className="mt-4 leading-relaxed text-farm-cream/75">302 Hickory Trace<br />Lyles, TN 37098</p>
            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-farm-cream/50">Helpful links</p>
            <div className="mt-4 flex flex-col gap-3">
              <Link href="/events" className="inline-block text-farm-cream transition-colors hover:text-farm-tan">
                See the events page →
              </Link>
              <Link href="/straw-bale-garden" className="inline-block text-farm-cream transition-colors hover:text-farm-tan">
                Read more about the straw bale garden →
              </Link>
              <a
                href="https://volunteergardener.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-farm-cream transition-colors hover:text-farm-tan"
              >
                Watch Volunteer Gardener online →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-farm-green px-4 py-20 text-farm-cream">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-farm-cream/60">About The PBS Feature</span>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Why this episode matters.</h2>
            <p className="mt-5 text-lg leading-relaxed text-farm-cream/80">
              Volunteer Gardener is putting a real spotlight on the straw bale garden at Forevermore Farm and on the method Concetta has spent years teaching and refining.
            </p>
            <p className="mt-4 leading-relaxed text-farm-cream/75">
              It matters because this is not trend-chasing garden content. It is practical growing knowledge, taught by a certified instructor, lived out on an off-grid, solar-powered Tennessee farm.
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-md">
            <Image
              src="/images/garden-build/concetta-placing-bales-golden-hour.jpg"
              alt="Concetta placing straw bales in the garden at Forevermore Farm"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>


      <section className="bg-white/80 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-farm-tan">Filmed On Site</span>
            <h2 className="mt-3 font-serif text-3xl text-farm-green md:text-4xl">Nashville PBS was here filming at the farm.</h2>
          </div>
          <div className="overflow-hidden rounded-sm border border-farm-tan/20 bg-white shadow-md">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/press/forevermorefarm-pbs-van.jpg"
                alt="Nashville PBS van at Forevermore Farm during filming for the Volunteer Gardener episode"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
            <p className="px-5 py-4 text-sm leading-relaxed text-farm-charcoal/65">
              Nashville PBS on-site at Forevermore Farm during filming for the <em>Volunteer Gardener</em> straw bale garden episode.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-farm-charcoal px-4 py-20 text-farm-cream">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-farm-tan">Press &amp; Media</span>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">A little context, without turning this into a history lesson.</h2>
            <p className="mt-4 text-lg leading-relaxed text-farm-cream/75">
              The main story right now is Volunteer Gardener. If you want a little more background after that, here are the useful links.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {pressLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-farm-tan/20 bg-farm-cream/5 p-6 transition-colors hover:bg-farm-cream/10"
              >
                <p className="font-serif text-2xl text-farm-cream">{link.title}</p>
                <p className="mt-3 leading-relaxed text-farm-cream/65">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
