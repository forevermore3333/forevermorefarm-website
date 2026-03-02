import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-farm-charcoal text-farm-cream">
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-serif text-lg">Forevermore Farm &mdash; Lyles, TN</p>
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-farm-tan transition-colors">Instagram</a>
          <Link href="/contact" className="hover:text-farm-tan transition-colors">Contact</Link>
        </div>
      </div>
      <div className="border-t border-farm-cream/10 text-center py-4 text-xs text-farm-cream/60">
        &copy; 2026 Forevermore Farm. All rights reserved.
      </div>
    </footer>
  )
}
