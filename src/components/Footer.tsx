import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-farm-charcoal text-farm-cream py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/forevermore-farm-logo.jpg"
            alt="Forevermore Farm"
            width={80}
            height={80}
            className="rounded-full opacity-80 ring-2 ring-farm-tan/40"
          />
        </div>
        <p className="font-serif text-lg text-farm-cream/90 mb-2">Forevermore Farm</p>
        <p className="text-farm-cream/50 text-sm mb-6">Lyles, TN 37098</p>
        <div className="flex justify-center gap-6 text-sm text-farm-cream/50 mb-8">
          <Link href="/our-farm" className="hover:text-farm-cream transition-colors">Our Farm</Link>
          <Link href="/straw-bale-garden" className="hover:text-farm-cream transition-colors">Garden</Link>
          <Link href="/events" className="hover:text-farm-cream transition-colors">Events</Link>
          <Link href="/stay" className="hover:text-farm-cream transition-colors">Stay</Link>
          <Link href="/contact" className="hover:text-farm-cream transition-colors">Contact</Link>
        </div>
        <p className="text-farm-cream/30 text-xs">&copy; 2026 Forevermore Farm. All rights reserved.</p>
      </div>
    </footer>
  )
}
