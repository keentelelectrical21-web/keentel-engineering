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
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to subscribe.')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
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
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#C72E9E' }}>Keentel Engineering Power Pulse</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-white leading-tight mb-5">
              Insight, Innovation, and Impact in Electrical Power Systems
            </h2>
            <p className="text-xl font-jost leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Engineering insights covering global energy trends, NERC and IEEE compliance updates, innovations in substation and BESS engineering, project highlights, technical insights, and industry events.
            </p>
            <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-3 min-[520px]:gap-3">
              {[
                {
                  icon: <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
                  text: 'NERC & IEEE updates',
                },
                {
                  icon: <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                  text: 'Grid technology insights',
                },
                {
                  icon: <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
                  text: 'Substation & BESS engineering',
                },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  {item.icon}
                  <span className="whitespace-nowrap font-jost text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="rounded-3xl p-8 sm:p-10" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
            {!submitted ? (
              <>
                <h3 className="font-urbanist font-black text-2xl text-white mb-2">Power Pulse Updates</h3>
                <p className="font-jost text-base mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Receive Keentel Engineering insights on power systems, grid reliability, compliance, and energy infrastructure.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    aria-label="Email address"
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
                      <>Subscribe to Power Pulse <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></>
                    )}
                  </button>
                </form>
                {error && <p className="mt-3 font-jost text-sm text-red-300" role="alert" aria-live="polite">{error}</p>}
              </>
            ) : (
              <div className="py-6 text-center" role="status" aria-live="polite">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(168,34,138,0.3)' }}>
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-urbanist font-black text-2xl text-white mb-2">You&apos;re subscribed!</h3>
                <p className="font-jost text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>Welcome to Keentel Engineering Power Pulse.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
