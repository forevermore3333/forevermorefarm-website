import Link from 'next/link'

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
)

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
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs tracking-widest uppercase text-farm-cream/40 mb-6">
          <Link href="/our-farm" className="hover:text-farm-cream transition-colors py-1">Our Farm</Link>
          <Link href="/straw-bale-garden" className="hover:text-farm-cream transition-colors py-1">Garden</Link>
          <Link href="/events" className="hover:text-farm-cream transition-colors py-1">Events</Link>
          <Link href="/stay" className="hover:text-farm-cream transition-colors py-1">Stay</Link>
          <Link href="/contact" className="hover:text-farm-cream transition-colors py-1">Contact</Link>
        </div>
        <div className="flex justify-center mb-8">
          <a
            href="https://www.facebook.com/ForevermoreFarm.tn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-farm-cream/40 hover:text-farm-cream transition-colors p-3 -m-3"
            aria-label="Forevermore Farm on Facebook"
          >
            <FacebookIcon />
          </a>
        </div>
        <p className="text-farm-cream/20 text-xs">&copy; 2026 Forevermore Farm. All rights reserved.</p>
      </div>
    </footer>
  )
}
