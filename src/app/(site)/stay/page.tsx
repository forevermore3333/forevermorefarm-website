import type { Metadata } from "next"
import HeroSection from '@/components/HeroSection'

export const metadata: Metadata = {
  title: "Stay at the Farm | Forevermore Farm | Lyles, TN",
  description: "Experience farm life in Lyles, Tennessee. Lodging and overnight stays at Forevermore Farm — 45 minutes from Nashville.",
  openGraph: {
    type: "website",
    title: "Stay at the Farm | Forevermore Farm | Lyles, TN",
    description: "Experience farm life in Lyles, Tennessee. Lodging and overnight stays at Forevermore Farm — 45 minutes from Nashville.",
    images: [
      {
        url: "/images/property/stage-reverse-valley-frost.jpg",
        width: 1200,
        height: 630,
        alt: "The stage at Forevermore Farm with a frost-covered valley in the background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stay at the Farm | Forevermore Farm | Lyles, TN",
    description: "Experience farm life in Lyles, Tennessee. Lodging and overnight stays at Forevermore Farm — 45 minutes from Nashville.",
    images: ["/images/property/stage-reverse-valley-frost.jpg"],
  },
  alternates: {
    canonical: "/stay",
  },
}

import EmailCapture from '@/components/EmailCapture'

export default function Stay() {
  return (
    <>
      <HeroSection
        title="Stay at Forevermore"
        bgImage="/images/property/stage-reverse-valley-frost.jpg"
      />

      <section className="py-24 px-4 bg-farm-cream">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-medium tracking-widest text-farm-tan uppercase tracking-widest">Coming Soon</span>
          <p className="font-serif text-2xl md:text-3xl text-farm-charcoal leading-relaxed mt-6">
            Something quiet is being built here.
          </p>
          <p className="text-farm-charcoal/60 leading-relaxed mt-6 text-lg">
            A place to unplug, wake up to roosters, walk the land, and leave slower than you arrived. Farm stays are coming to Forevermore Farm — we&apos;ll let you know when reservations open.
          </p>
        </div>
      </section>

      <EmailCapture
        headline="Be the first to know."
        subtitle="We'll announce farm stays to our list first."
      />
    </>
  )
}
