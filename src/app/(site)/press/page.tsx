import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import EmailCapture from '@/components/EmailCapture'
import HeroSection from '@/components/HeroSection'

const wkrnAgArtsEmbedUrl =
  'https://redir1.wkrn.com/nxs-video/vid-anvato-11894633/embed/?autoplay=0&injected_via=embed&post_id=3055433'
const wkrnAgArtsStoryUrl = 'https://www.wkrn.com/news/local-news/hickman-county-ag-and-arts-tour-2026/'
const pbsVideoUrl = 'https://www.pbs.org/video/volunteer-gardener-3417-ehycpx/'
const pbsEmbedUrl = 'https://player.pbs.org/viralplayer/3108801736/'
const wkrnOffGridStoryUrl = 'https://www.wkrn.com/special-reports/hickman-county-homesteaders-living-off-grid/'

const videoSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Experience the Rural Life in Hickman County — Forevermore Farm on WKRN News 2',
  description:
    'WKRN News 2 visited Hickman County to spotlight rural life ahead of the 2026 Ag & Arts Tour — the self-guided tour of small farms, gardens, and artisans held Friday, June 19 and Saturday, June 20, 2026. Forevermore Farm is one of the featured stops on the tour.',
  thumbnailUrl: 'https://forevermorefarmtn.com/images/property/stage-sunrise-fog-valley.jpg',
  uploadDate: '2026-06-18',
  embedUrl:
    'https://redir1.wkrn.com/nxs-video/vid-anvato-11894633/embed/?injected_via=embed&post_id=3055433',
  publisher: {
    '@type': 'Organization',
    name: 'Forevermore Farm',
    logo: {
      '@type': 'ImageObject',
      url: 'https://forevermorefarmtn.com/images/forevermore-farm-logo.jpg',
    },
  },
}

export const metadata: Metadata = {
  title: 'Forevermore Farm in the News — WKRN News 2 & PBS Features | Lyles, TN',
  description:
    'Forevermore Farm featured on WKRN News 2 and PBS Volunteer Gardener — off-grid living, the straw bale garden, and the Hickman County Ag & Arts Tour in Lyles, Tennessee, 45 minutes from Nashville.',
  openGraph: {
    type: 'website',
    title: 'Forevermore Farm in the News — WKRN News 2 & PBS Features | Lyles, TN',
    description:
      'Forevermore Farm featured on WKRN News 2 and PBS Volunteer Gardener — off-grid living, the straw bale garden, and the Hickman County Ag & Arts Tour in Lyles, Tennessee, 45 minutes from Nashville.',
    images: [
      {
        url: '/images/property/stage-sunrise-fog-valley.jpg',
        width: 1200,
        height: 630,
        alt: 'The stage at Forevermore Farm overlooking a fog-filled valley at sunrise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forevermore Farm in the News — WKRN News 2 & PBS Features | Lyles, TN',
    description:
      'Forevermore Farm featured on WKRN News 2 and PBS Volunteer Gardener — off-grid living, the straw bale garden, and the Hickman County Ag & Arts Tour in Lyles, Tennessee, 45 minutes from Nashville.',
    images: ['/images/property/stage-sunrise-fog-valley.jpg'],
  },
  alternates: {
    canonical: '/press',
  },
}

function ExternalLink({
  href,
  children,
}: Readonly<{
  href: string
  children: React.ReactNode
}>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block text-sm font-medium uppercase tracking-widest text-farm-green underline-offset-4 transition-colors hover:text-farm-charcoal hover:underline"
    >
      {children}
    </a>
  )
}

function InternalButton({
  href,
  children,
}: Readonly<{
  href: string
  children: React.ReactNode
}>) {
  return (
    <Link
      href={href}
      className="inline-block rounded-sm border border-farm-green/25 px-5 py-3 text-center text-sm font-medium uppercase tracking-widest text-farm-green transition-colors hover:border-farm-green/50 hover:bg-farm-green/5"
    >
      {children}
    </Link>
  )
}

export default function PressPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      <HeroSection
        title="Forevermore Farm in the News"
        subtitle="Our little off-grid farm in Lyles, Tennessee has caught some attention. Here are the stories WKRN News 2 and PBS have told about life at Forevermore Farm — from solar-powered homesteading to Concetta's straw bale garden and the Hickman County Ag & Arts Tour."
        ctaText="Watch the newest feature"
        ctaHref="#wkrn-ag-arts"
        bgImage="/images/property/stage-sunrise-fog-valley.jpg"
        bgPositionMobile="50% 70%"
        bgPositionDesktop="50% 80%"
        bgScaleDesktop={1.25}
        contentClassName="flex min-h-[78vh] flex-col justify-end pb-[max(5rem,28vh)] pt-32 md:min-h-[86vh] md:pb-[30vh] md:pt-40"
      />

      <section className="bg-farm-cream px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-farm-charcoal/75 md:text-xl">
            Our little off-grid farm in Lyles, Tennessee has caught some attention. Here are the stories WKRN News 2 and PBS have told about life at Forevermore Farm — from solar-powered homesteading to Concetta&apos;s straw bale garden and the Hickman County Ag &amp; Arts Tour.
          </p>
        </div>
      </section>

      <section id="wkrn-ag-arts" className="bg-white/70 px-4 py-20">
        <article className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-farm-tan">
              WKRN News 2 · June 2026 · Hickman County Ag &amp; Arts Tour
            </span>
            <h2 className="mt-3 font-serif text-3xl text-farm-green md:text-4xl">
              WKRN News 2 — Experience the Rural Life in Hickman County
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-farm-charcoal/75">
              WKRN News 2 visited Hickman County to spotlight rural life ahead of the 2026 Ag &amp; Arts Tour — the self-guided tour of small farms, gardens, and artisans held Friday, June 19 and Saturday, June 20, 2026. Forevermore Farm is one of the featured stops on the tour. Tucked into the hills of Lyles, Tennessee about 45 minutes from Nashville, the farm runs almost entirely on solar power with no grid electricity, raises heritage Berkshire and Gloucestershire Old Spot pigs, and grows Concetta&apos;s well-known straw bale garden. Visitors who watched the segment can come see it all in person during the tour weekend.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ExternalLink href={wkrnAgArtsStoryUrl}>Read the full story on WKRN News 2 →</ExternalLink>
              <InternalButton href="/ag-arts-tour">Plan your visit — Ag &amp; Arts Tour details →</InternalButton>
              <InternalButton href="/events">See all events →</InternalButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-sm border border-farm-tan/25 bg-farm-charcoal shadow-md">
            <div className="relative aspect-video">
              <iframe
                src={wkrnAgArtsEmbedUrl}
                title="WKRN News 2 — Experience the Rural Life in Hickman County"
                loading="lazy"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </article>
      </section>

      <section className="bg-farm-green px-4 py-20 text-farm-cream">
        <article className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="overflow-hidden rounded-sm border border-farm-cream/15 bg-farm-charcoal/20 shadow-lg">
            <div className="relative aspect-video bg-farm-charcoal">
              <iframe
                src={pbsEmbedUrl}
                title="PBS Volunteer Gardener 3417 video player"
                loading="lazy"
                allow="encrypted-media"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
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
                Volunteer Gardener spotlighted Concetta&apos;s straw bale garden at Forevermore Farm.
              </p>
            </div>
          </div>

          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-farm-cream/60">
              PBS · Volunteer Gardener · Streaming now
            </span>
            <h2 className="mt-3 font-serif text-3xl text-farm-cream md:text-4xl">
              PBS Volunteer Gardener — Concetta&apos;s Straw Bale Garden
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-farm-cream/80">
              Nashville PBS featured Forevermore Farm on Volunteer Gardener, where Concetta shows how her straw bale garden works — a no-dig method of growing vegetables and flowers directly in conditioned straw bales. It&apos;s one of the most-asked-about parts of the farm, and the full episode is streaming now. Watch it, then visit the garden in person and learn the method yourself.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={pbsVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-sm bg-farm-cream px-5 py-3 text-center text-sm font-medium uppercase tracking-widest text-farm-green transition-colors hover:bg-farm-cream/90"
              >
                Watch on PBS →
              </a>
              <Link
                href="/straw-bale-garden"
                className="inline-block rounded-sm border border-farm-cream/25 px-5 py-3 text-center text-sm font-medium uppercase tracking-widest text-farm-cream transition-colors hover:bg-farm-cream/10"
              >
                About the straw bale garden →
              </Link>
              <Link
                href="/volunteer-gardener"
                className="inline-block rounded-sm border border-farm-cream/25 px-5 py-3 text-center text-sm font-medium uppercase tracking-widest text-farm-cream transition-colors hover:bg-farm-cream/10"
              >
                Volunteer Gardener visit info →
              </Link>
            </div>
          </div>
        </article>
      </section>

      <section className="bg-farm-cream px-4 py-20">
        <article className="mx-auto max-w-4xl">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-farm-tan">
            WKRN News 2 · July 3, 2025
          </span>
          <h2 className="mt-3 font-serif text-3xl text-farm-green md:text-4xl">
            WKRN News 2 — Hickman County Homesteaders Living Off-Grid
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-farm-charcoal/75">
            In a 2025 special report, WKRN News 2 covered how the West family lives off-grid in Hickman County — running their Lyles, Tennessee farm almost entirely on solar power with no grid electricity. The story followed everyday life on a working homestead: heritage pigs, goats, sheep, chickens, gardens, and a family choosing a slower, more self-reliant way of living close to the land.
          </p>
          <blockquote className="mt-8 border-l-2 border-farm-tan/40 pl-6">
            <p className="text-farm-charcoal/70 italic leading-relaxed">
              &ldquo;It tastes better knowing that it came out of your garden. And it tastes better knowing that you raised the animal that you&apos;re eating. It&apos;s healthier.&rdquo;
            </p>
            <cite className="mt-3 block text-sm not-italic text-farm-tan/80">
              — Olin West, WKRN News 2 · July 3, 2025
            </cite>
          </blockquote>
          <div className="mt-8">
            <ExternalLink href={wkrnOffGridStoryUrl}>Read the special report on WKRN News 2 →</ExternalLink>
          </div>
        </article>
      </section>

      <section className="bg-white/70 px-4 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center">
          <p className="font-serif text-2xl text-farm-green md:text-3xl">
            Want to follow along? Get farm updates and visit announcements.
          </p>
          <Link
            href="/ag-arts-tour"
            className="inline-block rounded-sm bg-farm-green px-6 py-3 text-sm font-medium uppercase tracking-widest text-farm-cream transition-colors hover:bg-farm-green/90"
          >
            Come visit →
          </Link>
        </div>
      </section>

      <EmailCapture
        headline="Get Farm Updates"
        subtitle="Want to follow along? Get farm updates and visit announcements."
      />
    </>
  )
}
