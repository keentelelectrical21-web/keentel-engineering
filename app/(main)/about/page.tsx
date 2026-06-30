'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// ── Animated counter hook ─────────────────────────────────
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
    <div className="rounded-2xl p-7 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-300" style={{ background: '#fff', border: '1px solid #E6E8F0' }}>
      <div className="font-urbanist font-black text-5xl" style={{ color: '#06103C' }}>{count}{suffix}</div>
      <div>
        <p className="font-urbanist font-bold text-base mb-1" style={{ color: '#06103C' }}>{label}</p>
        <p className="text-sm font-jost leading-snug" style={{ color: '#6B7280' }}>{desc}</p>
      </div>
    </div>
  )
}

export default function AboutPage() {
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

  const stats = [
    { value: 30, suffix: '+', label: 'Years of Experience', desc: 'Three decades of hands-on power engineering across the U.S.', delay: 0 },
    { value: 98, suffix: '%', label: 'Client Satisfaction', desc: 'Rated 5-stars across platforms. We deliver technical precision every time.', delay: 150 },
    { value: 21, suffix: '', label: 'Licensed Engineers', desc: 'Three specialized groups: designers, grid whisperers, and compliance watchdogs.', delay: 300 },
    { value: 120, suffix: '+', label: 'Technical Articles', desc: 'Industry-leading thought leadership on NERC, IEEE, and grid modernization.', delay: 450 },
  ]

  const licenses = [
    'Florida — PE & Unlimited Electrical Contractor (EC)',
    'California — Licensed Professional Engineer',
    'New York — Licensed Professional Engineer',
    'West Virginia — Licensed Professional Engineer',
    'Minnesota — Licensed Professional Engineer',
  ]

  const expertise = [
    'EHV, HV & MV Power System Studies',
    'Substation Design & Protection',
    'POI Interconnection Engineering',
    'NERC Compliance & Modeling',
    'IEEE 2800 / IBR Compliance',
    'Utility-Scale Solar, Wind & BESS',
    'PSCAD / EMT Simulation',
    "Owner's Engineer Services",
    'Relay Coordination & Arc Flash',
    'SCADA & IEC 61850 Integration',
    'MEP Engineering',
    'Transmission Line Design',
  ]

  const certifications = [
    { name: 'BBB Accredited Business', detail: 'A+ Rating' },
    { name: 'IEEE Senior Member', detail: 'Institute of Electrical & Electronics Engineers' },
    { name: 'NERC Certified', detail: 'Grid Reliability Compliance' },
    { name: 'Florida Licensed PE', detail: 'Professional Engineer' },
    { name: 'Florida Unlimited EC', detail: 'Electrical Contractor' },
    { name: '21 Licensed Engineers', detail: 'Multi-state coverage' },
  ]

  return (
    <>
      <Header />
      <main>
      {/* ── HERO ── */}
      <section className="relative min-h-[540px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about-team.jpg"
            alt="Keentel Engineering power systems team"
            className="w-full h-full object-cover object-center"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-b7a9735b-907h.jpg' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,16,60,0.95) 0%, rgba(91,42,134,0.75) 100%)' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 blur-3xl rounded-full opacity-25" style={{ background: 'radial-gradient(circle, #A8228A 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16">
          <nav className="flex items-center gap-2 mb-6 text-xs font-jost">
            <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80">About Us</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-1.5 mb-5" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/70 text-sm font-jost">U.S. Licensed Electrical Power Engineers</span>
            </div>
            <h1 className="font-urbanist font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.06] mb-5">
              Engineering Certainty for{' '}
              <span style={{ color: '#C72E9E' }}>30+ Years</span>
            </h1>
            <p className="text-white/65 text-lg font-jost leading-relaxed max-w-2xl mb-8">
              We are Keentel Engineering — a specialized electrical power engineering firm delivering precision, compliance, and reliability for utilities, developers, and EPCs across the U.S.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #C72E9E, #5B2A86)' }}>
                Schedule A Call
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-full border border-white/25 hover:bg-white/10 transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/about-team.jpg"
                  alt="Keentel Engineering power systems work"
                  className="w-full object-cover object-top"
                  style={{ maxHeight: '500px' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-b7a9735b-907h.jpg' }}
                />
              </div>
              <div className="absolute -bottom-5 -right-5 rounded-2xl p-5 shadow-xl" style={{ background: 'linear-gradient(135deg, #06103C, #5B2A86)' }}>
                <p className="font-urbanist font-black text-3xl text-white">30+</p>
                <p className="font-jost text-xs text-white/60 mt-0.5">Years of Experience</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>Our Mission</p>
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-[1.1] mb-6" style={{ color: '#06103C' }}>
                We Don't Just Design Systems.{' '}
                <span style={{ color: '#A8228A' }}>We Engineer Certainty.</span>
              </h2>
              <p className="font-jost text-base leading-relaxed mb-4" style={{ color: '#4B5563' }}>
                At Keentel Engineering, our mission is to deliver sustainable, innovative, and high-quality electrical power engineering solutions tailored to your unique project requirements. From substation design and POI interconnection engineering to utility-scale solar, wind, and BESS, we're your trusted partner in delivering NERC-compliant, future-ready infrastructure across the U.S.
              </p>
              <p className="font-jost text-base leading-relaxed mb-4" style={{ color: '#4B5563' }}>
                As a leader in electrical power engineering, we help utilities, developers, and EPCs overcome modern grid challenges. Our expert team specializes in grid reliability, interconnection, and compliance — bringing together technical depth and engineering accuracy on every MV, HV, and EHV project.
              </p>
              <p className="font-jost text-base leading-relaxed mb-8" style={{ color: '#4B5563' }}>
                Unlike firms that sacrifice technical depth to chase billable hours, we prioritize doing it right the first time. NERC-compliant studies, real-world modeling, and solutions that hold up under regulatory scrutiny.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/services" className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full transition-all hover:-translate-y-0.5" style={{ background: '#06103C' }}>
                  Explore Our Services
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <a href="/files/keentel-company-profile.pdf" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border-2 transition-all" style={{ borderColor: '#E6E8F0', color: '#06103C' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Download Company Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16" style={{ background: '#F6F7FB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => <StatCard key={i} {...s} started={statsStarted} />)}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>Meet Our Founder</p>
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-[1.1] mb-2" style={{ color: '#06103C' }}>Sonny Patel P.E. EC</h2>
              <p className="font-jost font-semibold text-base mb-6" style={{ color: '#A8228A' }}>IEEE Senior Member · Founder & CEO, Keentel Engineering</p>
              <p className="font-jost text-base leading-relaxed mb-4" style={{ color: '#4B5563' }}>
                In 1995, Sandip (Sonny) R. Patel earned his Electrical Engineering degree from the University of Illinois, specializing in Electrical Engineering. But degrees don't build legacies — action does.
              </p>
              <p className="font-jost text-base leading-relaxed mb-4" style={{ color: '#4B5563' }}>
                For three decades, he's been shaping the future of engineering — not just as a licensed Professional Engineer across multiple states (Florida, California, New York, West Virginia, and Minnesota), but as a doer. A builder. A leader.
              </p>
              <p className="font-jost text-base leading-relaxed mb-6" style={{ color: '#4B5563' }}>
                Not just an engineer. A Licensed Electrical Contractor in Florida with an Unlimited EC license. Not just an executive. The founder and CEO of KEENTEL LLC — where expertise meets execution. Three decades. Multiple states. Endless impact.
              </p>
              <div className="rounded-2xl p-6 mb-6" style={{ background: '#F6F7FB', border: '1px solid #E6E8F0' }}>
                <p className="font-urbanist font-bold text-sm mb-4" style={{ color: '#06103C' }}>Licensed In:</p>
                <ul className="space-y-2">
                  {licenses.map((lic, i) => (
                    <li key={i} className="flex items-center gap-3 font-jost text-sm" style={{ color: '#4B5563' }}>
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#A8228A' }}>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {lic}
                    </li>
                  ))}
                </ul>
              </div>
              <a href="https://www.linkedin.com/in/sandip-patel-pe-ec/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-jost font-semibold text-sm px-5 py-3 rounded-full border transition-all" style={{ borderColor: '#0077B5', color: '#0077B5' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
                Connect on LinkedIn
              </a>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/author-sandip.jpeg"
                  alt="Sonny Patel P.E. EC — Founder & CEO, Keentel Engineering"
                  className="w-full object-cover object-top"
                  style={{ maxHeight: '580px' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/WhatsApp+Image+2026-04-10+at+6.43.17+PM-1920w.jpeg' }}
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl p-5 shadow-xl" style={{ background: 'linear-gradient(135deg, rgba(6,16,60,0.95), rgba(91,42,134,0.9))', backdropFilter: 'blur(10px)' }}>
                <p className="font-urbanist font-black text-white text-lg mb-1">Sonny Patel P.E. EC</p>
                <p className="font-jost text-xs text-white/60">IEEE Senior Member · PE in FL, CA, NY, WV, MN</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-20" style={{ background: '#F6F7FB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/about-team-group.jpeg"
                  alt="Keentel Engineering team — 21 licensed engineers"
                  className="w-full object-cover object-top"
                  style={{ maxHeight: '500px' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/WhatsApp+Image+2026-05-02+at+10.14.11+AM-788w.jpeg' }}
                />
                <div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(to top, rgba(6,16,60,0.7) 0%, transparent 50%)' }} />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2" style={{ background: 'rgba(199,46,158,0.25)', color: '#C72E9E', border: '1px solid rgba(199,46,158,0.3)' }}>Our Team</span>
                <p className="font-urbanist font-bold text-white text-xl leading-snug">21 Licensed Engineers<br />Across 3 Specialized Groups</p>
                <p className="font-jost text-sm mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>Designers, Grid Whisperers, and Compliance Watchdogs</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>Our Team</p>
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-[1.1] mb-6" style={{ color: '#06103C' }}>Three Groups.<br />One Goal.</h2>
              <p className="font-jost text-base leading-relaxed mb-6" style={{ color: '#4B5563' }}>
                Our 21-member licensed engineering team is organized into three specialized groups — each with deep expertise in their domain, and all working together to deliver grid-ready projects.
              </p>
              <div className="space-y-4">
                {[
                  { group: 'Designers', color: '#06103C', desc: 'Substation and transmission line design engineers with expertise in EHV, HV, and MV systems. Specialists in protection and control, secondary systems, and asset management.' },
                  { group: 'Grid Whisperers', color: '#5B2A86', desc: 'Power system analysts and modeling experts using PSCAD, ETAP, PSS/E, SKM, and DIgSILENT for load flow, fault, harmonic, and EMT studies.' },
                  { group: 'Compliance Watchdogs', color: '#A8228A', desc: 'NERC compliance specialists with deep expertise in MOD, PRC, and O&P standards. They keep your projects audit-ready and penalties-free.' },
                ].map((g) => (
                  <div key={g.group} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: '#fff', border: '1px solid #E6E8F0' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-urbanist font-black text-white text-sm" style={{ background: g.color }}>{g.group[0]}</div>
                    <div>
                      <p className="font-urbanist font-bold text-base mb-1" style={{ color: '#06103C' }}>{g.group}</p>
                      <p className="font-jost text-sm leading-relaxed" style={{ color: '#6B7280' }}>{g.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Our Difference</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>Why Choose Keentel</h2>
            <p className="font-jost text-base mt-4 max-w-xl mx-auto" style={{ color: '#6B7280' }}>
              We don't chase every job. Just the right ones — where precision matters, compliance isn't optional, and experience makes the difference.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Client-Focused Approach', accent: false,
                desc: 'We work collaboratively from design and modeling to commissioning, ensuring we understand your goals and deliver tailored power system engineering services for your exact project needs.',
                icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
              },
              {
                title: '30 Years of Experience', accent: false,
                desc: 'Our team brings decades of success in power system interconnection, transmission line design, and renewable energy engineering including BESS, solar PV, and wind farm projects across the U.S.',
                icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
              },
              {
                title: 'Attention to Detail', accent: true,
                desc: 'We approach each project with detailed modeling, relay coordination, and fault analysis, delivering results that meet or exceed regulatory benchmarks and performance standards.',
                icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
              },
              {
                title: 'Quality and Innovation', accent: false,
                desc: 'ETAP, PSCAD, SKM, DIgSILENT — cutting-edge simulation with a compliance-first mindset, delivering IEC 61850 solutions and real-world results for complex grid environments.',
                icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
              },
            ].map((v, i) => (
              <div key={i} className="rounded-2xl p-7 flex flex-col gap-4 hover:shadow-md transition-all"
                style={v.accent ? { background: 'linear-gradient(135deg, #06103C, #5B2A86)' } : { background: '#F6F7FB', border: '1px solid #E6E8F0' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: v.accent ? 'rgba(255,255,255,0.12)' : 'rgba(168,34,138,0.08)' }}>
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-urbanist font-bold text-lg mb-2" style={{ color: v.accent ? '#fff' : '#06103C' }}>{v.title}</h3>
                  <p className="font-jost text-sm leading-relaxed" style={{ color: v.accent ? 'rgba(255,255,255,0.65)' : '#6B7280' }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERTISE + INTERCONNECTS ── */}
      <section className="py-20" style={{ background: '#F6F7FB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>Our Expertise</p>
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-[1.1] mb-6" style={{ color: '#06103C' }}>Full-Spectrum Power Engineering</h2>
              <p className="font-jost text-base leading-relaxed mb-8" style={{ color: '#4B5563' }}>
                We are a U.S.-based electrical engineering firm focused on engineering, procurement, construction, and regulatory compliance — providing full-spectrum services for grid modernization, power system reliability, and renewable energy integration.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {expertise.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-jost text-sm" style={{ color: '#4B5563' }}>
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#A8228A' }}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl p-8" style={{ background: '#06103C' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#C72E9E' }}>Interconnects We Cover</p>
              <h3 className="font-urbanist font-black text-3xl text-white mb-6">All 3 U.S. Interconnections</h3>
              <div className="space-y-3 mb-6">
                {[
                  { name: 'Eastern Interconnection', isos: 'PJM, MISO, NYISO, ISO-NE, SPP, SERC' },
                  { name: 'Western Interconnection', isos: 'CAISO, WAPA, NV Energy, WECC' },
                  { name: 'Texas (ERCOT)', isos: 'ERCOT — fully independent grid' },
                ].map((ic) => (
                  <div key={ic.name} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="font-urbanist font-bold text-white text-sm mb-0.5">{ic.name}</p>
                    <p className="font-jost text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{ic.isos}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[{ val: 'All 50', label: 'States Served' }, { val: '100%', label: 'In-House' }, { val: '27+', label: 'Yrs AutoCAD' }, { val: '10', label: 'Software Platforms' }].map((s, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="font-urbanist font-black text-2xl text-white">{s.val}</p>
                    <p className="font-jost text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Credentials</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>Trusted, Certified & Licensed</h2>
          </div>
          <div className="flex justify-center mb-10">
            <img
              src="/images/cert-logos.png"
              alt="BBB Accredited IEEE Member NERC Certified FL Licensed"
              className="h-12 w-auto object-contain"
              style={{ opacity: 0.85 }}
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/new+image-670w.png' }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl hover:shadow-md transition-all" style={{ background: '#F6F7FB', border: '1px solid #E6E8F0' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(168,34,138,0.1)' }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#A8228A' }}>
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-urbanist font-bold text-sm mb-0.5" style={{ color: '#06103C' }}>{cert.name}</p>
                  <p className="font-jost text-xs" style={{ color: '#6B7280' }}>{cert.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 50%, #5B2A86 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#C72E9E' }}>Let's Work Together</p>
          <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-white leading-tight mb-5">Ready to Discuss Your Next Project?</h2>
          <p className="font-jost text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Our licensed engineers are ready to discuss your project requirements — from grid interconnection and substation design to NERC compliance and renewable energy integration.
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