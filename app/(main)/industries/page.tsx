'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// ── Animated counter hook (same pattern as About page) ─────────────────────
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

function StatCard({ value, suffix, label, delay, started }: {
  value: number; suffix?: string; label: string; delay: number; started: boolean
}) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    if (started) { const t = setTimeout(() => setActive(true), delay); return () => clearTimeout(t) }
  }, [started, delay])
  const count = useCounter(value, 1800, active)
  return (
    <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="font-urbanist font-black text-4xl text-white mb-1">{count}{suffix}</div>
      <p className="font-jost text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</p>
    </div>
  )
}

const industries = [
  {
    title: 'Utilities & Transmission Operators',
    desc: 'Load flow, protection coordination, and NERC-compliant transmission planning for utility-scale networks.',
    image: '/images/industries/hub/utilities-transmission.jpg',
    href: '/industries/electric-utilities-transmission',
  },
  {
    title: 'Renewable Energy Developers',
    desc: 'Interconnection studies, IBR modeling, and grid code compliance for solar, wind, and BESS projects.',
    image: '/images/industries/hub/renewable-developers.jpg',
    href: '/industries/renewable-interconnection-engineering',
  },
  {
    title: 'Industrial & Manufacturing Facilities',
    desc: 'Power reliability, arc flash studies, and MEP engineering for demanding industrial operations.',
    image: '/images/industries/hub/industrial-manufacturing.webp',
    href: '/industries/industrial-power-engineering',
  },
  {
    title: 'Oil, Gas & Mining Operations',
    desc: 'Rugged power system design and protection engineering for remote and harsh-environment sites.',
    image: '/images/industries/hub/oil-gas-mining.jpg',
    href: '/industries/oil-gas-mining',
  },
  {
    title: 'Data Centers & Commercial Infrastructure',
    desc: 'High-reliability power distribution and redundancy planning for mission-critical facilities.',
    image: '/images/industries/hub/data-centers.jpg',
    href: '/industries/data-center-electrical',
  },
  {
    title: 'EPC Contractors',
    desc: 'Integrated power engineering, utility coordination, and construction-ready packages for complex EPC delivery.',
    image: '/images/services/substation-design/ind-epc.png',
    href: '/industries/epc-contractors',
  },
]

const approach = [
  'Standards-compliant engineering aligned with IEEE, NERC, and ANSI/IEC',
  'Cross-platform modeling across ETAP, PSS/E, PSCAD, and more',
  'Licensed PEs across multiple U.S. states',
  'Dedicated project engineers from kickoff to closeout',
]

export default function IndustriesPage() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsStarted, setStatsStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true) },
      { threshold: 0.2 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-[540px] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
          <video
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/videos/industries.mp4" type="video/mp4" />
</video>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,16,60,0.95) 0%, rgba(91,42,134,0.75) 100%)' }} />
            <div className="absolute bottom-0 right-0 w-96 h-96 blur-3xl rounded-full opacity-25" style={{ background: 'radial-gradient(circle, #A8228A 0%, transparent 70%)' }} />
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16">
            <nav className="flex items-center gap-2 mb-6 text-xs font-jost">
              <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-white/80">Industries</span>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-1.5 mb-5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/70 text-sm font-jost">Industries We Serve</span>
              </div>
              <h1 className="font-urbanist font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.06] mb-5">
                Power Engineering Solutions{' '}
                <span style={{ color: '#C72E9E' }}>Built for Your Industry</span>
              </h1>
              <p className="text-white/65 text-lg font-jost leading-relaxed max-w-2xl">
                From utilities and transmission operators to renewable developers, industrial facilities, and data centers, Keentel Engineering delivers practical, standards-compliant engineering solutions tailored to the unique reliability and regulatory demands of each industry we serve.
              </p>
            </div>
          </div>
        </section>

        {/* ── STATS STRIP ── */}
        <section ref={statsRef} className="py-14" style={{ background: '#06103C' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value={6} label="Industries Served" delay={0} started={statsStarted} />
            <StatCard value={30} suffix="+" label="Years of Experience" delay={150} started={statsStarted} />
            <StatCard value={21} label="Licensed Engineers" delay={300} started={statsStarted} />
            <StatCard value={50} label="States Covered" delay={450} started={statsStarted} />
          </div>
        </section>

        {/* ── INDUSTRY CARDS ── */}
        <section className="py-24" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-14">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>Where We Work</p>
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-[1.1]" style={{ color: '#06103C' }}>
                Six Industries, One Engineering Standard
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((ind) => (
                <Link
                  key={ind.href}
                  href={ind.href}
                  className="group block bg-white rounded-2xl overflow-hidden border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
                  style={{ borderColor: '#E6E8F0' }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={ind.image}
                      alt={ind.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                   
                   />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(6,16,60,0.75) 100%)' }} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-urbanist font-bold text-lg leading-snug mb-2" style={{ color: '#06103C' }}>
                      {ind.title}
                    </h3>
                    <p className="font-jost text-sm leading-relaxed mb-4" style={{ color: '#6B7280' }}>
                      {ind.desc}
                    </p>
                    <span className="font-jost text-sm font-semibold inline-flex items-center gap-1.5" style={{ color: '#A8228A' }}>
                      See More
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── APPROACH ── */}
        <section className="py-20" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>Our Approach</p>
                <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-[1.1] mb-6" style={{ color: '#06103C' }}>
                  One Engineering Standard, Every Industry
                </h2>
                <p className="font-jost text-base leading-relaxed mb-8" style={{ color: '#4B5563' }}>
                  Regardless of sector, every Keentel project follows the same rigorous engineering process, standards compliance, and quality control that our clients have relied on for over three decades.
                </p>
                <div className="space-y-4">
                  {approach.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 font-jost text-sm" style={{ color: '#4B5563' }}>
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#A8228A' }}>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden h-[420px]">
                <img
                  src="/images/industries/hub/approach-team.jpg"
                  alt="Keentel Engineering team at work"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/WhatsApp+Image+2026-05-02+at+10.14.11+AM-788w.jpeg' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,16,60,0.35) 0%, transparent 60%)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA — exact match to About page ── */}
        <section className="py-20" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 50%, #5B2A86 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#C72E9E' }}>Let's Work Together</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-white leading-tight mb-5">Ready to Discuss Your Next Project?</h2>
            <p className="font-jost text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Our licensed engineers are ready to discuss your project requirements, from grid interconnection and substation design to NERC compliance and renewable energy integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}>
                Schedule a Free Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full border border-white/25 hover:bg-white/10 transition-all">
                Contact Our Team
              </Link>
              <a href="/files/keentel-company-profile.pdf" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full border border-white/25 hover:bg-white/10 transition-all text-white">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download Profile
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
