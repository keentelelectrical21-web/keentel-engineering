'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>Grid IQ Newsletter</p>
        <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-tight mb-4" style={{ color: '#0B1230' }}>
          Stay Updated with Keentel's <span style={{ color: '#0B1A5B' }}>Grid IQ</span> Newsletter
        </h2>
        <p className="text-base font-jost leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: '#6B7280' }}>
          Monthly insights on NERC compliance, IEEE standards, renewable energy integration, and power system engineering — straight from our expert team.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              required
              className="flex-1 px-5 py-4 rounded-full text-sm font-jost focus:outline-none"
              style={{ border: '1.5px solid #E6E8F0', color: '#0B1230', background: '#F6F7FB' }}
            />
            <button
              type="submit"
              disabled={loading}
              className="text-white font-semibold text-sm px-7 py-4 rounded-full transition-all disabled:opacity-70 flex items-center justify-center gap-2 whitespace-nowrap"
              style={{ background: '#0B1A5B' }}
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>Subscribe Now <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></>
              )}
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-3 mb-6 py-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(167,34,138,0.1)' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-semibold font-jost" style={{ color: '#0B1230' }}>You're subscribed! Welcome to Grid IQ.</p>
          </div>
        )}

        <p className="text-sm font-jost" style={{ color: '#9CA3AF' }}>
          500+ engineers already subscribed. No spam. Unsubscribe anytime.
        </p>

      </div>
    </section>
  )
}