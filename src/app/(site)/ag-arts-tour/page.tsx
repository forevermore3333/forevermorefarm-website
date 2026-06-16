import type { Metadata } from 'next'

import AgArtsTourClient from './AgArtsTourClient'

export const metadata: Metadata = {
  title: 'Forevermore Farm | Hickman County Ag & Arts Tour',
  description: 'Forevermore Farm details for the 2026 Hickman County Ag & Arts Tour in Lyles, Tennessee.',
  alternates: {
    canonical: '/ag-arts-tour',
  },
  openGraph: {
    type: 'website',
    siteName: 'Forevermore Farm',
    url: '/ag-arts-tour',
    title: 'Forevermore Farm | Hickman County Ag & Arts Tour',
    description: 'Visit Forevermore Farm during the 2026 Hickman County Ag & Arts Tour.',
    images: [
      {
        url: '/ag-arts-tour/forevermore-farm.jpg',
        width: 820,
        height: 459,
        alt: 'Forevermore Farm during the 2026 Hickman County Ag & Arts Tour',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forevermore Farm | Hickman County Ag & Arts Tour',
    description: 'Visit Forevermore Farm during the 2026 Hickman County Ag & Arts Tour.',
    images: ['/ag-arts-tour/forevermore-farm.jpg'],
  },
}

export default function AgArtsTourPage() {
  return <AgArtsTourClient />
}
