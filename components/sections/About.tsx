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
    { value: 32, suffix: '', label: 'Electrical Power Engineers', desc: 'Led by experienced senior directors and managers.', delay: 0 },
    { value: 150, suffix: '+', label: 'Combined Years', desc: 'Deep power-industry engineering experience across the team.', delay: 100 },
    { value: 50, suffix: '', label: 'State Coverage', desc: 'P.E. stamped deliverables available nationwide.', delay: 200 },
    { value: 98, suffix: '%', label: 'Repeat Clients', desc: 'Utilities, developers, OEMs, and engineering partners return.', delay: 300 },
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-24" style={{ background: '#F6F7FB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12 flex flex-col gap-10 sm:gap-12 lg:mb-16 lg:flex-row lg:gap-16">

          {/* Left - label + image */}
          <div className="lg:w-1/4 flex-shrink-0">
            <span className="font-urbanist font-black text-2xl block mb-6" style={{ color: '#0B1230' }}>Keentel Engineering</span>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E6E8F0' }}>
              <img
                src="/images/home/about-engineerings.jpg"
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
              Led by a Principal Engineer with 31 years in the power industry and backed by 150+ years of combined team experience, our 32-member engineering organization supports critical infrastructure nationwide—from substation design and relay protection to NERC compliance and utility-scale renewable integration. We don&apos;t just design systems. We engineer certainty.
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
        <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => <StatCard key={i} {...s} started={started} />)}
        </div>

      </div>
    </section>
  )
}
