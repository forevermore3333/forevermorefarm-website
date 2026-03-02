'use client'

import { useState } from 'react'

interface EmailCaptureProps {
  headline: string
  subtitle?: string
}

export default function EmailCapture({ headline, subtitle }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'email_signup', email }),
      })
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-farm-green py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-serif text-3xl text-farm-cream mb-2">{headline}</h2>
        {subtitle && <p className="text-farm-cream/70 mb-8">{subtitle}</p>}

        {submitted ? (
          <p className="text-farm-cream font-medium">You&apos;re on the list. We&apos;ll be in touch.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-sm bg-farm-cream text-farm-charcoal placeholder:text-farm-charcoal/40 flex-1 max-w-sm"
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
