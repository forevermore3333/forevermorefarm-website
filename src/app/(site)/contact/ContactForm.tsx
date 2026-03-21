'use client'

import { useState } from 'react'

const categories = ['General', 'Events', 'Farm Stay', 'Media', 'Workshops']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', category: 'General', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'contact' }),
      })
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="font-serif text-4xl text-farm-green mb-8 text-center">Get in Touch</h1>

        {submitted ? (
          <div className="text-center py-12">
            <p className="text-xl text-farm-green font-serif mb-2">Thanks! We&apos;ll be in touch soon.</p>
            <p className="text-farm-charcoal/60 text-sm">Lyles, TN 37098</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-farm-charcoal mb-1">Name</label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-farm-tan rounded-sm bg-white text-farm-charcoal"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-farm-charcoal mb-1">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border border-farm-tan rounded-sm bg-white text-farm-charcoal"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-farm-charcoal mb-1">Category</label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 border border-farm-tan rounded-sm bg-white text-farm-charcoal"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-farm-charcoal mb-1">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 border border-farm-tan rounded-sm bg-white text-farm-charcoal resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-farm-green text-farm-cream py-3 rounded-sm font-medium hover:bg-farm-green/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            <p className="text-center text-sm text-farm-charcoal/50 mt-4">Lyles, TN 37098</p>
          </form>
        )}

        {/* Map Section */}
        <div className="mt-12">
          <p className="font-serif text-farm-green text-sm mb-2">Find Us</p>
          <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-sm overflow-hidden border border-farm-tan/30">
            <iframe
              src="https://maps.google.com/maps?q=302+Hickory+Trce,+Lyles,+TN+37098&output=embed"
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Forevermore Farm location"
            />
          </div>
          <p className="text-sm text-farm-charcoal/60 mt-2 text-center">302 Hickory Trce, Lyles, TN 37098</p>
        </div>
      </div>
    </section>
  )
}
