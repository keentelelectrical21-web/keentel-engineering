'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const services = [
  'POI Interconnection Engineering Support',
  'Substation Design Services',
  'EHV, HV, MV, Power System Studies',
  'Owners Engineering Services',
  'NERC O&P 693 Compliance Services',
  'Utility Scale Solar Farm Engineering',
  'MEP Engineering Services',
  'Utility Scale BESS Engineering',
  'Nuclear Power Plant Electrical Engineering',
  'Other',
]

const offices = [
  {
    label: 'Headquarters',
    address: '400 N Ashley Dr STE #2600',
    city: 'Tampa, FL 33602',
  },
  {
    label: 'Austin Office',
    address: '5900 Balcones Drive STE 100',
    city: 'Austin, TX 78731 USA',
  },
  {
    label: 'Sacramento Office',
    address: '1401 21st St Ste R',
    city: 'Sacramento, CA 95811 USA',
  },
  {
    label: 'Baltimore Office',
    address: '306 W Redwood St, STE 200',
    city: 'Baltimore, MD 21201 USA',
  },
]

// ── Scroll-reveal wrapper ────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [focusedField, setFocusedField] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact-page' }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit')
      }
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fieldStyle = (fieldName: string) => ({
    border: focusedField === fieldName ? '1.5px solid #A8228A' : '1.5px solid #E6E8F0',
    color: '#06103C',
    background: '#F6F7FB',
    boxShadow: focusedField === fieldName ? '0 0 0 4px rgba(168,34,138,0.08)' : 'none',
  })

  return (
    <>
      <Header />
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-[480px] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/contact-hero.jpg" alt="" className="w-full h-full object-cover absolute inset-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,16,60,0.94) 0%, rgba(11,26,91,0.88) 60%, rgba(91,42,134,0.82) 100%)' }} />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] blur-3xl rounded-full opacity-20 animate-pulse" style={{ background: 'radial-gradient(circle, #A8228A 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] blur-3xl rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #C72E9E 0%, transparent 70%)' }} />
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20">
            <nav className="flex items-center gap-2 mb-8 text-xs font-jost">
              <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-white/80">Contact</span>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-1.5 mb-6" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/70 text-sm font-jost">Available for New Projects</span>
              </div>
              <h1 className="font-urbanist font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.03] mb-6">
                Let's Discuss How to{' '}
                <span style={{ color: '#C72E9E' }}>Optimize Your Next Project</span>
              </h1>
              <p className="text-white/70 text-xl font-jost leading-relaxed max-w-2xl">
                Our engineers are ready to discuss your specific project requirements and help you find the best path forward.
              </p>
            </div>
          </div>
        </section>

        {/* ── CONTACT INFO + FORM ── */}
        <section className="py-24" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-14">

              {/* Left — contact info */}
              <Reveal className="lg:w-2/5">
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>Get In Touch</p>
                <h2 className="font-urbanist font-black text-5xl leading-[1.05] mb-6" style={{ color: '#06103C' }}>
                  Contact Our Engineering Team
                </h2>
                <p className="font-jost text-lg leading-relaxed mb-10" style={{ color: '#4B5563' }}>
                  Our engineers are ready to discuss your specific project requirements and help you find the best path forward. Reach out by phone, email, or schedule a consultation directly.
                </p>

                {/* Contact methods */}
                <div className="space-y-3 mb-10">
                  <a href="tel:813-389-7871"
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-0.5"
                    style={{ background: 'rgba(11,26,91,0.04)', border: '1px solid #E6E8F0' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#fff' }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#06103C' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#9CA3AF' }}>Phone</p>
                      <p className="font-urbanist font-bold text-lg" style={{ color: '#06103C' }}>813-389-7871</p>
                    </div>
                  </a>

                  <a href="mailto:contact@keentelengineering.com"
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-0.5"
                    style={{ background: 'rgba(168,34,138,0.04)', border: '1px solid #E6E8F0' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#fff' }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#9CA3AF' }}>Email</p>
                      <p className="font-urbanist font-bold text-lg" style={{ color: '#06103C' }}>contact@keentelengineering.com</p>
                    </div>
                  </a>

                  <a href="mailto:BD@keentelengineering.com"
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-0.5"
                    style={{ background: 'rgba(91,42,134,0.04)', border: '1px solid #E6E8F0' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#fff' }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#5B2A86' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#9CA3AF' }}>Business Development</p>
                      <p className="font-urbanist font-bold text-lg" style={{ color: '#06103C' }}>BD@keentelengineering.com</p>
                    </div>
                  </a>

                  <a href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-0.5"
                    style={{ background: 'rgba(199,46,158,0.04)', border: '1px solid #E6E8F0' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#fff' }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#C72E9E' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#9CA3AF' }}>Schedule</p>
                      <p className="font-urbanist font-bold text-lg" style={{ color: '#06103C' }}>Schedule a Consultation</p>
                    </div>
                  </a>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-3">
                  <a href="https://www.linkedin.com/company/keentel-engineering/" target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:opacity-90"
                    style={{ background: '#0077B5' }}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/keentelengineering" target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:opacity-90"
                    style={{ background: '#1877F2' }}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@KeentelEngineering" target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:opacity-90"
                    style={{ background: '#FF0000' }}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </Reveal>

              {/* Right — form */}
              <Reveal delay={150} className="lg:w-3/5">
                {submitted ? (
                  <div className="rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center" style={{ background: '#fff', border: '1px solid #E6E8F0' }}>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(168,34,138,0.1)' }}>
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-urbanist font-black text-4xl mb-4" style={{ color: '#06103C' }}>Message Received</h3>
                    <p className="font-jost text-lg mb-8" style={{ color: '#6B7280' }}>
                      Thank you for contacting Keentel Engineering. We will get back to you as soon as possible.
                    </p>
                    <Link href="/"
                      className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full transition-all hover:-translate-y-0.5"
                      style={{ background: '#06103C' }}>
                      Back to Home
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="rounded-3xl p-8 sm:p-10 shadow-lg" style={{ background: '#fff', border: '1px solid #E6E8F0' }}>
                    <h3 className="font-urbanist font-black text-2xl mb-6" style={{ color: '#06103C' }}>Send Us a Message</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>First Name *</label>
                        <input required value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
                          onFocus={() => setFocusedField('firstName')} onBlur={() => setFocusedField('')}
                          className="w-full px-4 py-3 rounded-xl text-sm font-jost focus:outline-none transition-all"
                          style={fieldStyle('firstName')}
                          placeholder="John" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Last Name</label>
                        <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
                          onFocus={() => setFocusedField('lastName')} onBlur={() => setFocusedField('')}
                          className="w-full px-4 py-3 rounded-xl text-sm font-jost focus:outline-none transition-all"
                          style={fieldStyle('lastName')}
                          placeholder="Smith" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Phone *</label>
                        <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                          onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField('')}
                          className="w-full px-4 py-3 rounded-xl text-sm font-jost focus:outline-none transition-all"
                          style={fieldStyle('phone')}
                          placeholder="+1 (555) 000-0000" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Email *</label>
                        <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                          onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField('')}
                          className="w-full px-4 py-3 rounded-xl text-sm font-jost focus:outline-none transition-all"
                          style={fieldStyle('email')}
                          placeholder="john@company.com" />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>What services are you interested in?</label>
                      <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                        onFocus={() => setFocusedField('service')} onBlur={() => setFocusedField('')}
                        className="w-full px-4 py-3 rounded-xl text-sm font-jost focus:outline-none transition-all"
                        style={{ ...fieldStyle('service'), color: form.service ? '#06103C' : '#9CA3AF' }}>
                        <option value="">Select a service...</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="mb-6">
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Message</label>
                      <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField('')}
                        rows={5} placeholder="Describe your project or question..."
                        className="w-full px-4 py-3 rounded-xl text-sm font-jost focus:outline-none resize-none transition-all"
                        style={fieldStyle('message')} />
                    </div>

                    {error && (
                      <div className="mb-4 p-3 rounded-xl text-sm font-jost" style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                        {error}
                      </div>
                    )}

                    <button type="submit" disabled={loading}
                      className="w-full text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-xl"
                      style={{ background: 'linear-gradient(135deg, #06103C, #5B2A86)' }}>
                      {loading ? (
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <>
                          Submit Request
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── OFFICES ── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Our Locations</p>
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>Our Offices</h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {offices.map((office, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="rounded-2xl p-6 h-full transition-all hover:shadow-lg hover:-translate-y-1" style={{ background: 'rgba(11,26,91,0.03)', border: '1px solid #E6E8F0' }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: i === 0 ? '#06103C' : 'rgba(168,34,138,0.1)' }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: i === 0 ? '#fff' : '#A8228A' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="font-jost text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#A8228A' }}>{office.label}</p>
                    <p className="font-urbanist font-bold text-base mb-0.5" style={{ color: '#06103C' }}>{office.address}</p>
                    <p className="font-jost text-sm" style={{ color: '#6B7280' }}>{office.city}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 50%, #5B2A86 100%)' }}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-3xl rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #C72E9E 0%, transparent 70%)' }} />
          <Reveal className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#C72E9E' }}>Prefer a Call?</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-6xl text-white leading-tight mb-6">
              Schedule a Free 15-Minute Consultation
            </h2>
            <p className="font-jost text-xl leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Talk directly with one of our licensed power engineers about your project. No commitment, no sales pitch, just engineering.
            </p>
            <a href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}>
              Book on Calendly
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </Reveal>
        </section>

      </main>
      <Footer />
    </>
  )
}
