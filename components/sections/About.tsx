'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

function useCounter(target: number, duration: number = 1800, start: boolean = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function StatCard({ value, suffix, label, desc, delay, started }: {
  value: number; suffix?: string; label: string; desc: string; delay: number; started: boolean
}) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    if (started) { const t = setTimeout(() => setActive(true), delay); return () => clearTimeout(t) }
  }, [started, delay])
  const count = useCounter(value, 1800, active)
  return (
    <div className="rounded-2xl p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-300" style={{ background: '#F6F7FB', border: '1px solid #E6E8F0' }}>
      <div className="font-urbanist font-black text-5xl" style={{ color: '#0B1A5B' }}>{count}{suffix}</div>
      <div>
        <p className="font-urbanist font-bold text-base mb-1" style={{ color: '#0B1230' }}>{label}</p>
        <p className="text-sm font-jost leading-snug" style={{ color: '#6B7280' }}>{desc}</p>
      </div>
    </div>
  )
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { value: 30, suffix: '+', label: 'Years of Experience', desc: 'Three decades of hands-on power engineering across the U.S.', delay: 0 },
    { value: 98, suffix: '%', label: 'Client Satisfaction', desc: 'Rated 5-stars across platforms. We deliver technical precision every time.', delay: 150 },
    { value: 21, suffix: '', label: 'Licensed Engineers', desc: 'Three specialized groups: designers, grid whisperers, and compliance watchdogs.', delay: 300 },
    { value: 120, suffix: '+', label: 'Technical Articles', desc: 'Industry-leading thought leadership on NERC, IEEE, and grid modernization.', delay: 450 },
  ]

  return (
    <section className="py-24" style={{ background: '#F6F7FB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row gap-16 mb-16">

          {/* Left - label + image */}
          <div className="lg:w-1/4 flex-shrink-0">
            <span className="font-urbanist font-black text-2xl block mb-6" style={{ color: '#0B1230' }}>Keentel.</span>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E6E8F0' }}>
              <img
                src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-b7a9735b-907h.jpg"
                alt="Keentel Engineering power systems work"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right - content */}
          <div className="lg:w-3/4">
            <h2 className="font-urbanist text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] mb-6" style={{ color: '#0B1230' }}>
              We are{' '}
              <span style={{ color: '#0B1A5B' }}>Keentel Engineering</span> a specialized electrical power engineering firm delivering{' '}
              <span style={{ color: '#A8228A' }}>precision, compliance, and reliability</span>{' '}
              for utilities, developers, and EPCs across the U.S.
            </h2>
            <p className="text-lg font-jost leading-relaxed mb-8" style={{ color: '#4B5563' }}>
              With over 30 years of experience, our 21-member licensed engineering team supports critical infrastructure projects, from substation design and relay protection to NERC compliance and utility-scale renewable energy integration. We don't just design systems. We engineer certainty.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full transition-all hover:-translate-y-0.5"
              style={{ background: '#0B1A5B' }}
            >
              Learn More About Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Counter grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => <StatCard key={i} {...s} started={started} />)}
        </div>

      </div>
    </section>
  )
}