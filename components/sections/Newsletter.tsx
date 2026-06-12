'use client'

import { useState } from 'react'

const avatars = [
  { initials: 'JT', bg: 'bg-blue-200' },
  { initials: 'SR', bg: 'bg-purple-200' },
  { initials: 'AM', bg: 'bg-green-200' },
  { initials: 'DP', bg: 'bg-orange-200' },
]

const cornerAvatars = [
  { initials: 'TK', bg: 'bg-rose-200', position: 'top-4 left-4' },
  { initials: 'LE', bg: 'bg-cyan-200', position: 'top-4 right-4' },
  { initials: 'NM', bg: 'bg-amber-200', position: 'bottom-4 left-4' },
  { initials: 'PS', bg: 'bg-indigo-200', position: 'bottom-4 right-4' },
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative bg-[#f5f5f7] rounded-3xl overflow-hidden px-6 py-14 sm:py-16">

          {/* Corner avatars */}
          {cornerAvatars.map((a, i) => (
            <div
              key={i}
              className={`absolute ${a.position} w-12 h-12 rounded-full ${a.bg} flex items-center justify-center hidden sm:flex`}
            >
              <span className="text-xs font-bold text-gray-700">{a.initials}</span>
            </div>
          ))}

          {/* Center content */}
          <div className="relative max-w-xl mx-auto text-center">
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-gray-900 leading-tight mb-4">
              Stay Updated with Keentel's{' '}
              <span className="text-[#030DA6]">Grid IQ</span>{' '}
              Newsletter!
            </h2>
            <p className="text-gray-500 font-jost text-base leading-relaxed mb-8">
              Monthly insights on NERC compliance, IEEE standards, renewable energy integration, and power system engineering — straight from our expert team.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  required
                  className="flex-1 px-5 py-3.5 rounded-full border border-gray-200 bg-white text-gray-900 text-sm font-jost placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#030DA6]/30 focus:border-[#030DA6]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gray-900 text-white font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-[#030DA6] transition-all disabled:opacity-70 whitespace-nowrap flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <>
                      Subscribe Now
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-3 mb-6 py-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-900 font-semibold font-jost">You're subscribed! Welcome to Grid IQ.</p>
              </div>
            )}

            {/* Social proof */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {avatars.map((a, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${a.bg} border-2 border-white flex items-center justify-center`}
                  >
                    <span className="text-xs font-bold text-gray-700">{a.initials}</span>
                  </div>
                ))}
              </div>
              <span className="text-gray-500 text-sm font-jost">
                <span className="text-gray-900 font-semibold">500+</span> Engineers Already Subscribed
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}