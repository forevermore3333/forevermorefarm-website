'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// Hard expiry: Saturday, June 20, 2026, 8:00 PM Central (CDT = UTC-5) -> 2026-06-21T01:00:00Z.
// After this instant the pop-up renders nothing, permanently. No cleanup required.
const EXPIRES_AT = Date.parse('2026-06-21T01:00:00Z')
const DISMISS_KEY = 'agArtsTourPopupDismissed-2026'
const TOUR_URL = '/ag-arts-tour/'

export default function AgArtsTourPopup() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  const close = useCallback(() => {
    setVisible(false)
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    // Never on the tour page itself.
    if (pathname && pathname.startsWith('/ag-arts-tour')) return
    // Self-expire after the tour weekend.
    if (Date.now() > EXPIRES_AT) return
    // Respect prior dismissal.
    try {
      if (localStorage.getItem(DISMISS_KEY)) return
    } catch {
      /* localStorage unavailable — still show */
    }
    const t = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(t)
  }, [pathname])

  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, close])

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Hickman County Ag & Arts Tour"
      onClick={close}
      className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-farm-charcoal/60 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-sm border border-farm-tan/40 bg-farm-cream shadow-2xl"
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-farm-charcoal/10 text-farm-charcoal/70 transition-colors hover:bg-farm-charcoal/20"
        >
          ✕
        </button>

        <div className="bg-farm-green px-6 py-5">
          <span className="text-xs font-medium uppercase tracking-widest text-farm-cream/80">This Weekend · June 19–20</span>
          <h2 className="mt-1 font-serif text-2xl text-farm-cream">Hickman County Ag &amp; Arts Tour</h2>
        </div>

        <div className="px-6 py-5">
          <p className="leading-relaxed text-farm-charcoal/80">
            Forevermore Farm is <strong>Stop #11</strong> on this free, self-guided tour of farms, art &amp; music across
            the county. See all 13 stops on the interactive map — tap any stop for details and directions.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={TOUR_URL}
              className="flex-1 rounded-sm bg-farm-green px-5 py-3 text-center text-sm font-medium uppercase tracking-widest text-farm-cream transition-colors hover:bg-farm-green/90"
            >
              View the Tour Map →
            </a>
            <button
              onClick={close}
              className="rounded-sm px-5 py-3 text-center text-sm font-medium uppercase tracking-widest text-farm-charcoal/60 transition-colors hover:text-farm-charcoal"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
