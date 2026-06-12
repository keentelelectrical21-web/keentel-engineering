'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

function useCounter(target: number, duration: number = 2000, start: boolean = false) {
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

function StatCard({
  value,
  suffix,
  label,
  desc,
  gradient,
  prefix,
  started,
  delay,
}: {
  value: number
  suffix?: string
  prefix?: string
  label: string
  desc: string
  gradient: string
  started: boolean
  delay: number
}) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    if (started) {
      const t = setTimeout(() => setActive(true), delay)
      return () => clearTimeout(t)
    }
  }, [started, delay])
  const count = useCounter(value, 1800, active)

  return (
    <div className={`relative bg-gradient-to-br ${gradient} rounded-3xl p-7 flex flex-col justify-between min-h-[200px] overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/30 blur-2xl" />
      <div className="text-5xl sm:text-6xl font-black font-urbanist text-gray-900">
        {prefix}{count}{suffix}
      </div>
      <div>
        <p className="font-semibold text-gray-900 text-lg font-urbanist mb-1">{label}</p>
        <p className="text-gray-600 text-sm font-jost leading-snug">{desc}</p>
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
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { value: 30, suffix: '+', label: 'Years of Experience', desc: 'Three decades of hands-on power engineering across the U.S.', gradient: 'from-blue-100 to-blue-200', delay: 0 },
    { value: 98, suffix: '%', label: 'Client Satisfaction', desc: 'Rated 5-stars across platforms. We deliver technical precision every time.', gradient: 'from-indigo-100 to-purple-100', delay: 200 },
    { value: 21, suffix: '', label: 'Licensed Engineers', desc: 'Three specialized groups: designers, grid whisperers, and compliance watchdogs.', gradient: 'from-pink-100 to-rose-100', delay: 400 },
    { value: 120, suffix: '+', label: 'Technical Articles', desc: 'Industry-leading thought leadership on NERC, IEEE, and grid modernization.', gradient: 'from-sky-100 to-cyan-100', delay: 600 },
  ]

  return (
    <section className="py-24 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top row */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="lg:w-1/4 flex-shrink-0">
            <span className="font-urbanist font-black text-2xl text-gray-900">Keentel.</span>
          </div>
          <div className="lg:w-3/4">
            <p className="font-urbanist text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15]">
              We are{' '}
              <span className="text-[#030DA6]">Keentel Engineering</span> — a specialized electrical power engineering firm delivering{' '}
              <span className="text-[#030DA6]">precision, compliance, and reliability</span>{' '}
              for utilities, developers, and EPCs across the U.S.
            </p>
            <p className="mt-6 text-gray-600 text-lg font-jost leading-relaxed max-w-3xl">
              With over 30 years of experience, our 21-member licensed engineering team supports critical infrastructure projects, from substation design and relay protection to NERC compliance and utility-scale renewable energy integration. We don't just design systems. We engineer certainty.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 bg-[#030DA6] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#020a8a] transition-all hover:shadow-lg hover:shadow-blue-200"
            >
              Learn More About Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Counter cards */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} started={started} />
          ))}
        </div>

        {/* Extra info row */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 bg-white rounded-3xl p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:shadow-md transition-shadow">
            <div className="flex-1">
              <p className="font-urbanist font-bold text-xl text-gray-900 mb-1">3 U.S. Office Locations</p>
              <p className="text-gray-500 text-sm font-jost">Tampa FL (HQ) — Austin TX — Sacramento CA</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['Tampa, FL', 'Austin, TX', 'Sacramento, CA'].map((loc) => (
                <span key={loc} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                  <svg className="w-3 h-3 text-[#030DA6]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {loc}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-[#030DA6] rounded-3xl p-7 flex flex-col justify-between hover:bg-[#020a8a] transition-colors">
            <p className="font-urbanist font-bold text-white text-xl leading-snug">Nationwide U.S. Coverage</p>
            <p className="text-white/70 text-sm font-jost mt-2">Serving utilities, developers and EPCs across all three U.S. interconnections.</p>
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              {['PJM', 'ERCOT', 'WECC', 'CAISO'].map((flag) => (
                <span key={flag} className="text-white/80 text-xs bg-white/15 px-2 py-1 rounded-full">{flag}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}