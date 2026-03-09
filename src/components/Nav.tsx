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

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
)

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
          <a
            href="https://www.facebook.com/ForevermoreFarm.tn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-farm-charcoal/50 hover:text-farm-green transition-colors"
            aria-label="Forevermore Farm on Facebook"
          >
            <FacebookIcon />
          </a>
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
          <a
            href="https://www.facebook.com/ForevermoreFarm.tn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-3 text-farm-charcoal/50 hover:text-farm-green transition-colors"
            aria-label="Forevermore Farm on Facebook"
          >
            <FacebookIcon />
            <span className="text-xs tracking-widest uppercase">Facebook</span>
          </a>
        </div>
      )}
    </nav>
  )
}
