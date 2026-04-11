import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import GuideDownload from '@/components/GuideDownload'
import Link from 'next/link'
import { client } from '../../../../sanity/client'
import { urlFor } from '../../../../sanity/image'

import type { Metadata } from 'next'
import type { SanityImageSource } from '@sanity/image-url'

export const revalidate = 0 // always fetch fresh from Sanity

export const metadata: Metadata = {
  title: 'Straw Bale Gardening | Forevermore Farm',
  description: 'Learn straw bale gardening from a certified instructor. Concetta West studied under Joel Karsten and grew a 30-member CSA from her very first straw bale garden.',
  openGraph: {
    type: "website",
    title: 'Straw Bale Gardening | Forevermore Farm',
    description: 'Learn straw bale gardening from a certified instructor. Concetta West studied under Joel Karsten and grew a 30-member CSA from her very first straw bale garden.',
    images: [
      {
        url: '/images/garden-build/concetta-placing-bales-golden-hour.jpg',
        width: 1200,
        height: 630,
        alt: 'Concetta placing straw bales in the garden at golden hour',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Straw Bale Gardening | Forevermore Farm',
    description: 'Learn straw bale gardening from a certified instructor. Concetta West studied under Joel Karsten and grew a 30-member CSA from her very first straw bale garden.',
    images: ['/images/garden-build/concetta-placing-bales-golden-hour.jpg'],
  },
  alternates: {
    canonical: '/straw-bale-garden',
  },
}

// ── Fallback data (used when Sanity doc is missing) ───────────────────────────

const FALLBACK_STEPS = [
  {
    number: '01',
    title: 'Choose Your Bales',
    body: 'Use straw bales — not hay. Hay contains seeds that will sprout and compete with your plants. Wheat, oat, or barley straw all work well. Orient bales with the cut ends facing up — this is where roots will grow.',
    image: '/images/garden-build/trailer-full-straw-bales-arrive.jpg',
    imageAlt: 'Trailer full of straw bales arriving at Forevermore Farm',
  },
  {
    number: '02',
    title: 'Condition the Bales',
    body: "Conditioning triggers decomposition inside the bale, creating a warm, nutrient-rich growing medium. For 12 days, alternate watering and applying a high-nitrogen fertilizer (blood meal or ammonium nitrate). The bale interior will heat up — this is good. It means it's working.",
    image: '/images/garden-build/bales-compost-added-stakes.jpg',
    imageAlt: 'Straw bales being conditioned with compost and fertilizer',
  },
  {
    number: '03',
    title: 'Plant Your Garden',
    body: "Once the bale cools (below 99°F), you're ready to plant. Create holes with a trowel or your hand and fill with potting mix before transplanting starts. Seeds can be planted directly into a thin layer of potting mix spread across the top. Water daily — bales dry out faster than soil.",
    image: '/images/garden-build/concetta-placing-bales-golden-hour.jpg',
    imageAlt: 'Concetta working in the straw bale garden at golden hour',
  },
  {
    number: '04',
    title: 'Build a Trellis',
    body: 'Tall plants like tomatoes, cucumbers, and beans need support. Run stakes at each end of your bale rows and string wire or twine horizontally every 10 inches. The bale rows naturally become the base of a vertical growing system — maximizing yield in a small footprint.',
    image: '/images/garden-build/garden-pergola-interior-complete.jpg',
    imageAlt: 'Completed pergola garden structure with trellis system',
  },
  {
    number: '05',
    title: 'Grow & Harvest',
    body: 'Water deeply each day. Bale gardens are highly productive — the decomposing straw continuously feeds your plants. Tomatoes, squash, peppers, herbs, cucumbers, and melons all thrive. At Forevermore, we run the full season from late spring through first frost.',
    image: '/images/garden-build/raised-beds-filled-straw-wide.jpg',
    imageAlt: 'Raised beds filled and ready for growing season',
  },
  {
    number: '06',
    title: 'Close the Loop',
    body: "Nothing goes to waste. After the season, the partially composted bales go straight to the compost pile or directly onto garden beds as mulch. Next year's soil is richer for it. That's the straw bale method — it feeds the garden and improves the land at the same time.",
    image: '/images/garden-build/olin-concetta-working-garden.jpg',
    imageAlt: 'Olin and Concetta working together in the completed garden',
  },
]

const FALLBACK_BENEFITS = [
  { title: 'No Soil Needed', body: 'Grow anywhere — gravel, concrete, rocky ground. The bale is the garden bed.' },
  { title: 'Simple Setup', body: 'No tilling, no raised bed lumber, no hauling cubic yards of soil. Bales arrive, you condition them, you plant.' },
  { title: 'Plant Anywhere', body: 'Patio, driveway, field, hillside. If you can set a bale there, you can grow there.' },
  { title: 'Fewer Weeds', body: "Weed pressure is dramatically lower. You're growing in straw, not native soil loaded with weed seeds." },
  { title: 'No Crop Rotation', body: "Because you start fresh with new bales each season, the soil disease problems that require crop rotation simply don't exist." },
  { title: 'High Yield', body: 'The warm, decomposing interior of a conditioned bale is extraordinarily fertile. Plants grow fast and produce abundantly.' },
]

const FALLBACK_GALLERY = [
  { src: '/images/garden-build/garden-enclosure-wide-blue-sky.jpg', alt: 'Garden enclosure exterior' },
  { src: '/images/garden-build/garden-pergola-interior-complete.jpg', alt: 'Garden pergola interior' },
  { src: '/images/garden-build/olin-family-filling-beds.jpg', alt: 'Family building the garden together' },
  { src: '/images/garden-build/garden-enclosure-closeup-frame.jpg', alt: 'Garden frame construction detail' },
]

// ── Types ──────────────────────────────────────────────────────────────────────

interface SanityBenefit {
  _key: string
  title: string
  body: string
}

interface SanityStepImage {
  _type: 'image'
  alt?: string
  asset?: { _ref: string; _type: string }
  hotspot?: { x: number; y: number; height: number; width: number }
}

interface SanityStep {
  _key: string
  number: string
  title: string
  body: string
  image?: SanityStepImage
}

interface SanityGalleryPhoto {
  _key: string
  alt?: string
  asset?: { _ref: string }
}

interface StrawBalePageData {
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: SanityImageSource
  heroVideo?: string
  heroCta?: string
  heroCtaLink?: string
  instructorName?: string
  instructorQuote?: string
  instructorQuoteAttribution?: string
  instructorBio?: string
  instructorImage?: SanityImageSource
  benefitsTitle?: string
  benefitsSubtitle?: string
  benefits?: SanityBenefit[]
  stepsTitle?: string
  stepsSubtitle?: string
  steps?: SanityStep[]
  galleryTitle?: string
  galleryPhotos?: SanityGalleryPhoto[]
  workshopLabel?: string
  workshopTitle?: string
  workshopBody?: string
  workshopCtaText?: string
  workshopCtaLink?: string
  emailHeadline?: string
  emailSubtitle?: string
}

async function getPageData(): Promise<StrawBalePageData | null> {
  try {
    return await client.fetch(`*[_type == "strawBaleGardenPage"][0]`)
  } catch {
    return null
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function sanityImgUrl(source: SanityImageSource, width: number, height: number): string {
  return urlFor(source).width(width).height(height).fit('crop').auto('format').url()
}

export default async function StrawBaleGarden() {
  const data = await getPageData()

  // ── Hero ──
  const heroTitle = data?.heroTitle ?? 'The Straw Bale Method'
  const heroSubtitle = data?.heroSubtitle ?? 'Grow anywhere. No soil required. Concetta has been doing this for over a decade.'
  const heroBgVideo = data?.heroVideo ?? '/videos/garden-drone-reveal.mp4'
  const heroBgImage = data?.heroImage
    ? sanityImgUrl(data.heroImage, 1920, 1080)
    : '/images/garden-build/garden-enclosure-wide-blue-sky.jpg'
  const heroCta = data?.heroCta ?? 'Learn from Concetta'
  const heroCtaLink = data?.heroCtaLink ?? '#workshops'

  // ── Instructor ──
  const instructorName = data?.instructorName ?? 'Concetta West'
  const instructorQuote = data?.instructorQuote ?? '10+ years ago I had the honor of attending a straw bale gardening class taught by Joel Karsten. His methods inspired and equipped me to grow a market garden and 30-member CSA with the produce from my very first Straw Bale Garden in Washington State.'
  const instructorAttribution = data?.instructorQuoteAttribution ?? 'Concetta West, Certified Straw Bale Gardening Instructor'
  const instructorBio = data?.instructorBio ?? "Concetta is one of a small number of certified instructors trained directly under Joel Karsten — the creator of the straw bale gardening method. She's been practicing and teaching this technique for over a decade, across two states and two different growing zones."
  const instructorImgSrc = data?.instructorImage
    ? sanityImgUrl(data.instructorImage, 800, 600)
    : '/images/garden-build/concetta-placing-bales-golden-hour.jpg'

  // ── Benefits ──
  const benefitsTitle = data?.benefitsTitle ?? 'Why Straw Bale?'
  const benefitsSubtitle = data?.benefitsSubtitle ?? 'Five reasons this method changes how people think about growing food.'
  const benefits = data?.benefits?.length ? data.benefits : FALLBACK_BENEFITS

  // ── Steps ──
  const stepsTitle = data?.stepsTitle ?? 'How It Works'
  const stepsSubtitle = data?.stepsSubtitle ?? 'Six steps from empty bale to full harvest. This is the exact method Concetta teaches.'

  // Merge Sanity steps with fallback image paths where Sanity image is absent
  const steps = data?.steps?.length
    ? data.steps.map((step, i) => ({
        number: step.number ?? FALLBACK_STEPS[i]?.number ?? String(i + 1).padStart(2, '0'),
        title: step.title ?? FALLBACK_STEPS[i]?.title ?? '',
        body: step.body ?? FALLBACK_STEPS[i]?.body ?? '',
        imageSrc: step.image?.asset
          ? sanityImgUrl(step.image as SanityImageSource, 800, 600)
          : FALLBACK_STEPS[i]?.image ?? '',
        imageAlt: step.image?.alt ?? FALLBACK_STEPS[i]?.imageAlt ?? '',
      }))
    : FALLBACK_STEPS.map((s) => ({
        number: s.number,
        title: s.title,
        body: s.body,
        imageSrc: s.image,
        imageAlt: s.imageAlt,
      }))

  // ── Gallery ──
  const galleryTitle = data?.galleryTitle ?? 'The Garden at Forevermore'
  const galleryPhotos = data?.galleryPhotos?.length
    ? data.galleryPhotos.map((p) => ({
        src: p.asset ? sanityImgUrl(p as SanityImageSource, 600, 600) : '',
        alt: p.alt ?? '',
      })).filter((p) => p.src)
    : FALLBACK_GALLERY

  // ── Workshop CTA ──
  const workshopLabel = data?.workshopLabel ?? 'This Season'
  const workshopTitle = data?.workshopTitle ?? 'Workshops with Concetta'
  const workshopBody = data?.workshopBody ?? 'Learn straw bale gardening hands-on at Forevermore Farm. Small groups, real instruction, real soil — or rather, real bales. Workshop dates will be announced to the email list first.'
  const workshopCtaText = data?.workshopCtaText ?? 'See Upcoming Events'
  const workshopCtaLink = data?.workshopCtaLink ?? '/events'

  return (
    <>
      <HeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        bgVideo={heroBgVideo}
        bgImage={heroBgImage}
        ctaText={heroCta}
        ctaHref={heroCtaLink}
      />

      {/* Concetta intro */}
      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-medium tracking-widest text-farm-tan uppercase tracking-widest">From the Instructor</span>
            <h2 className="font-serif text-3xl text-farm-green mt-3 mb-6">{instructorName}</h2>
            <blockquote className="border-l-4 border-farm-tan pl-6 mb-6">
              <p className="font-serif text-xl text-farm-charcoal leading-relaxed italic">
                &ldquo;{instructorQuote}&rdquo;
              </p>
              <footer className="mt-4 text-farm-charcoal/60 text-sm">— {instructorAttribution}</footer>
            </blockquote>
            <p className="text-farm-charcoal/70 leading-relaxed">
              {instructorBio}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md">
            <Image
              src={instructorImgSrc}
              alt={`${instructorName} in the straw bale garden`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white/70">
        <div className="max-w-5xl mx-auto rounded-sm border border-farm-tan/25 bg-farm-green p-8 md:p-10 text-farm-cream shadow-md">
          <div className="max-w-3xl">
            <span className="text-xs font-medium tracking-widest text-farm-cream/60 uppercase">PBS Feature</span>
            <h2 className="font-serif text-3xl mt-3 mb-4">Volunteer Gardener is featuring this garden.</h2>
            <p className="text-farm-cream/80 leading-relaxed text-lg">
              Want the air dates, online watch details, and the Ag &amp; Arts Tour plan for seeing the garden in person? We built a single page for that so it&apos;s actually easy to find.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/volunteer-gardener" className="inline-block bg-farm-cream text-farm-green px-6 py-3 rounded-sm text-sm font-medium tracking-widest uppercase hover:bg-farm-cream/90 transition-colors text-center">
                See the Volunteer Gardener page
              </Link>
              <Link href="/events" className="inline-block border border-farm-cream/25 text-farm-cream px-6 py-3 rounded-sm text-sm font-medium tracking-widest uppercase hover:bg-farm-cream/10 transition-colors text-center">
                Check upcoming events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-farm-tan/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-farm-green text-center mb-4">{benefitsTitle}</h2>
          <p className="text-center text-farm-charcoal/60 mb-12 max-w-xl mx-auto">{benefitsSubtitle}</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-farm-cream p-6 rounded-sm">
                <h3 className="font-serif text-lg text-farm-green mb-2">{b.title}</h3>
                <p className="text-farm-charcoal/70 text-sm leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by step */}
      <section className="py-20 px-4 bg-farm-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-farm-green text-center mb-4">{stepsTitle}</h2>
          <p className="text-center text-farm-charcoal/60 mb-16 max-w-xl mx-auto">{stepsSubtitle}</p>
          <div className="space-y-20">
            {steps.map((step, i) => (
              <div key={step.number} className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? '' : ''}`}>
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <span className="font-serif text-6xl text-farm-tan leading-none">{step.number}</span>
                  <h3 className="font-serif text-2xl text-farm-green mt-2 mb-4">{step.title}</h3>
                  <p className="text-farm-charcoal/70 leading-relaxed">{step.body}</p>
                  {step.number === '02' && (
                    <Link
                      href="/straw-bale-garden/conditioning-guide"
                      className="inline-block mt-4 text-farm-green font-medium text-sm hover:text-farm-green/70 transition-colors"
                    >
                      See the complete 12-day conditioning schedule →
                    </Link>
                  )}
                </div>
                {step.imageSrc && (
                  <div className={`relative aspect-[4/3] rounded-sm overflow-hidden shadow-md ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                    <Image src={step.imageSrc} alt={step.imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garden build gallery */}
      <section className="py-16 px-4 bg-farm-tan/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl text-farm-charcoal text-center mb-10">{galleryTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryPhotos.map((photo, i) => (
              <div key={i} className="relative aspect-square rounded-sm overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PBS Volunteer Gardener callout */}
      <section className="py-16 px-4 bg-farm-charcoal">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-medium tracking-widest text-farm-tan uppercase">As Seen on PBS</span>
              <h2 className="font-serif text-2xl md:text-3xl text-farm-cream mt-3 mb-4">
                This Garden Is on <em>Volunteer Gardener</em>
              </h2>
              <p className="text-farm-cream/75 leading-relaxed mb-6">
                Nashville PBS is airing a feature on Forevermore&apos;s straw bale garden. The premiere is Thursday, April 30 at 7:30 PM — or come see the real thing at the Hickman County Ag &amp; Arts Tour in June.
              </p>
              <Link
                href="/volunteer-gardener"
                className="inline-block bg-farm-tan text-farm-charcoal px-8 py-3 rounded-sm text-sm font-medium tracking-widest uppercase hover:bg-farm-tan/90 transition-colors"
              >
                Watch Schedule &amp; Visit Info
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md">
              <Image
                src="/images/garden-build/garden-beds-straw-bale-construction-4.jpg"
                alt="Straw bale construction at Forevermore Farm"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Workshops CTA */}
      <section id="workshops" className="py-24 px-4 bg-farm-green">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-medium tracking-widest text-farm-cream/60 uppercase">{workshopLabel}</span>
          <h2 className="font-serif text-3xl md:text-4xl text-farm-cream mt-3 mb-6">{workshopTitle}</h2>
          <p className="text-farm-cream/80 leading-relaxed mb-8">
            {workshopBody}
          </p>
          <Link href={workshopCtaLink} className="inline-block bg-farm-cream text-farm-green px-8 py-3 rounded-sm text-sm font-medium hover:bg-farm-cream/90 transition-colors">
            {workshopCtaText}
          </Link>
        </div>
      </section>

      <GuideDownload />
    </>
  )
}
