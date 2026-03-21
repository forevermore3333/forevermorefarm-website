'use client'

import { useState } from 'react'

export default function GuideDownload() {
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
        body: JSON.stringify({
          type: 'guide_download',
          name,
          email,
          phone,
          source: 'conditioning-guide',
        }),
      })

      // Trigger PDF download
      const link = document.createElement('a')
      link.href = '/downloads/straw-bale-conditioning-guide.pdf'
      link.download = 'straw-bale-conditioning-guide.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'px-4 py-3 rounded-sm bg-farm-cream text-farm-charcoal placeholder:text-farm-charcoal/40 w-full'

  return (
    <section className="bg-farm-green py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-serif text-3xl text-farm-cream mb-2">
          Download Concetta&apos;s Complete Conditioning Guide
        </h2>
        <p className="text-farm-cream/70 mb-8">
          The exact 12-day schedule she uses at Forevermore Farm — yours free.
        </p>

        {submitted ? (
          <div className="text-farm-cream space-y-3">
            <p className="font-medium text-lg">Your download has started.</p>
            <p className="text-farm-cream/80 text-sm leading-relaxed">
              We also sent a copy to your inbox. Happy growing — and don&apos;t hesitate to reach out if you have questions.
            </p>
            <a
              href="/downloads/straw-bale-conditioning-guide.pdf"
              download="straw-bale-conditioning-guide.pdf"
              className="inline-block mt-2 underline underline-offset-2 text-farm-cream/70 text-sm hover:text-farm-cream transition-colors"
            >
              Download again →
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto">
            <label htmlFor="guide-name" className="sr-only">Your name</label>
            <input
              id="guide-name"
              type="text"
              required
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
            <label htmlFor="guide-email" className="sr-only">Email address</label>
            <input
              id="guide-email"
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
            <label htmlFor="guide-phone" className="sr-only">Phone (optional)</label>
            <input
              id="guide-phone"
              type="tel"
              placeholder="Phone (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-farm-brown text-farm-cream px-6 py-3 rounded-sm font-medium hover:bg-farm-brown/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Getting your guide...' : 'Get the Free Guide'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
