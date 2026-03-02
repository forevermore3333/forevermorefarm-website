'use client'

import { useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/our-farm', label: 'Our Farm' },
  { href: '/straw-bale-garden', label: 'Garden' },
  { href: '/events', label: 'Events' },
  { href: '/stay', label: 'Stay' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-farm-cream/95 backdrop-blur-sm border-b border-farm-tan/30">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/images/forevermore-farm-logo.svg"
            alt="Forevermore Farm"
            className="w-10 h-10"
          />
          <span className="font-serif text-base font-bold text-farm-green tracking-wide hidden sm:block">
            FOREVERMORE FARM
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs tracking-widest uppercase text-farm-charcoal/70 hover:text-farm-green transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-farm-charcoal transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-farm-charcoal transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-farm-charcoal transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-farm-cream border-t border-farm-tan/30 px-4 pb-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-xs tracking-widest uppercase text-farm-charcoal/70 hover:text-farm-green"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
