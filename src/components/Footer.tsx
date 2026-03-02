import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-farm-charcoal text-farm-cream py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <img
            src="/images/forevermore-farm-logo.svg"
            alt="Forevermore Farm"
            className="w-20 h-20 opacity-70"
            style={{ filter: 'brightness(10)' }}
          />
        </div>
        <p className="font-serif text-lg text-farm-cream/90 mb-1 tracking-wide">Forevermore Farm</p>
        <p className="text-farm-tan text-xs tracking-widest uppercase mb-8">Lyles, Tennessee</p>
        <div className="flex justify-center gap-8 text-xs tracking-widest uppercase text-farm-cream/40 mb-10">
          <Link href="/our-farm" className="hover:text-farm-cream transition-colors">Our Farm</Link>
          <Link href="/straw-bale-garden" className="hover:text-farm-cream transition-colors">Garden</Link>
          <Link href="/events" className="hover:text-farm-cream transition-colors">Events</Link>
          <Link href="/stay" className="hover:text-farm-cream transition-colors">Stay</Link>
          <Link href="/contact" className="hover:text-farm-cream transition-colors">Contact</Link>
        </div>
        <p className="text-farm-cream/20 text-xs">&copy; 2026 Forevermore Farm. All rights reserved.</p>
      </div>
    </footer>
  )
}
