import type { Metadata } from 'next'
import GalleryClient from './GalleryClient'

export const metadata: Metadata = {
  title: 'Photo Gallery | Forevermore Farm | Lyles, TN',
  description: 'Photos of life at Forevermore Farm — the straw bale gardens, heritage pigs, goats, sheep, wildflower pastures, and the family behind it all in Lyles, Tennessee.',
  openGraph: {
    type: "website",
    title: 'Photo Gallery | Forevermore Farm | Lyles, TN',
    description: 'Photos of life at Forevermore Farm — the straw bale gardens, heritage pigs, goats, sheep, wildflower pastures, and the family behind it all in Lyles, Tennessee.',
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
    title: 'Photo Gallery | Forevermore Farm | Lyles, TN',
    description: 'Photos of life at Forevermore Farm — the straw bale gardens, heritage pigs, goats, sheep, wildflower pastures, and the family behind it all in Lyles, Tennessee.',
    images: ['/images/property/stage-sunrise-fog-valley.jpg'],
  },
  alternates: {
    canonical: '/gallery',
  },
}

export default function GalleryPage() {
  return <GalleryClient />
}
