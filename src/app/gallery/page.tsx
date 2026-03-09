import type { Metadata } from 'next'
import GalleryClient from './GalleryClient'

export const metadata: Metadata = {
  title: 'Photo Gallery | Forevermore Farm | Lyles, TN',
  description: 'Photos of life at Forevermore Farm — the straw bale gardens, heritage pigs, goats, sheep, wildflower pastures, and the family behind it all in Lyles, Tennessee.',
}

export default function GalleryPage() {
  return <GalleryClient />
}
