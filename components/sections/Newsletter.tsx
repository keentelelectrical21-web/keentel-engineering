'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1A5B 0%, #5B2A86 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#C72E9E' }}>Grid IQ Newsletter</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-white leading-tight mb-5">
              Stay Ahead of the Grid
            </h2>
            <p className="text-xl font-jost leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Monthly insights on NERC compliance, IEEE standards, renewable energy integration, and power system engineering — straight from our licensed engineering team.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              {[
                { icon: '📋', text: 'NERC standards updates' },
                { icon: '⚡', text: 'Grid technology insights' },
                { icon: '🔋', text: 'BESS & renewable trends' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-jost text-base font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="rounded-3xl p-8 sm:p-10" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
            {!submitted ? (
              <>
                <h3 className="font-urbanist font-black text-2xl text-white mb-2">Subscribe Free</h3>
                <p className="font-jost text-base mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  500+ engineers already subscribed. No spam. Unsubscribe anytime.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-5 py-4 rounded-xl text-base font-jost focus:outline-none text-white placeholder-white/40"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)' }}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-white font-bold text-base py-4 rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}
                  >
                    {loading ? (
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    ) : (
                      <>Subscribe to Grid IQ <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></>
                    )}
                  </button>
                </form>
                {error && <p className="text-red-300 text-sm font-jost mt-3">{error}</p>}
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(168,34,138,0.3)' }}>
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-urbanist font-black text-2xl text-white mb-2">You're subscribed!</h3>
                <p className="font-jost text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>Welcome to Grid IQ. Watch your inbox for the next edition.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
