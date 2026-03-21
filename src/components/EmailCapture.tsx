'use client'

import { useState } from 'react'

interface EmailCaptureProps {
  headline: string
  subtitle?: string
}

export default function EmailCapture({ headline, subtitle }: EmailCaptureProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'email_signup', name, email, phone, source: 'homepage' }),
      })
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'px-4 py-3 rounded-sm bg-farm-cream text-farm-charcoal placeholder:text-farm-charcoal/40 w-full'

  return (
    <section className="bg-farm-green py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-serif text-3xl text-farm-cream mb-2">{headline}</h2>
        {subtitle && <p className="text-farm-cream/70 mb-8">{subtitle}</p>}

        {submitted ? (
          <p className="text-farm-cream font-medium">You&apos;re on the list. We&apos;ll be in touch.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto">
            <label htmlFor="signup-name" className="sr-only">Your name</label>
            <input
              id="signup-name"
              type="text"
              required
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
            <label htmlFor="signup-phone" className="sr-only">Phone (optional)</label>
            <input
              id="signup-phone"
              type="tel"
              placeholder="Phone (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
            <label htmlFor="signup-email" className="sr-only">Email address</label>
            <input
              id="signup-email"
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-farm-brown text-farm-cream px-6 py-3 rounded-sm font-medium hover:bg-farm-brown/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Sign Up'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
