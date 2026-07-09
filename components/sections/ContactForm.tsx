'use client'

import { useState } from 'react'
import Link from 'next/link'

const servicesList = [
  'Power System Studies', 'Substation Design', 'POI Interconnection Engineering',
  "Owner's Engineer Services", 'NERC Compliance Services', 'Utility Scale Renewable Energy',
  'MEP Engineering', 'Relay Protection Engineering', 'BESS Engineering', 'Other',
]

export default function ContactForm() {
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          company: form.company,
          service: form.service,
          message: form.message,
        }),
      })
      if (!res.ok) throw new Error('Submit failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please call us directly at 813-389-7871.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section className="py-20" style={{ background: '#06103C' }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(168,34,138,0.2)', border: '2px solid #A8228A' }}>
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-urbanist font-black text-4xl text-white mb-4">Message Received</h3>
          <p className="font-jost text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Thank you for reaching out to Keentel Engineering. One of our engineers will contact you within one business day.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 font-jost font-semibold text-white px-8 py-4 rounded-full" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
            Back to Home
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20" style={{ background: '#06103C' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#C72E9E' }}>Get In Touch</p>
          <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-white mb-4">
            Let's Discuss Your Next Project
          </h2>
          <p className="text-xl font-jost max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Our licensed engineers are ready to discuss your specific requirements and help you find the best path forward.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left contact info */}
          <div className="lg:col-span-2 space-y-4">
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                label: 'Phone', value: '813-389-7871', href: 'tel:813-389-7871',
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                label: 'Email', value: 'contact@keentelengineering.com', href: 'mailto:contact@keentelengineering.com',
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
                label: 'Schedule', value: 'Book a Free Consultation', href: 'https://calendly.com/keentel-engineering/15min',
              },
            ].map((item) => (
              <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(199,46,158,0.2)' }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#C72E9E' }}>{item.icon}</svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.label}</p>
                  <p className="font-urbanist font-bold text-white text-base">{item.value}</p>
                </div>
              </a>
            ))}

            {/* Offices */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#C72E9E' }}>Our Offices</p>
              <div className="space-y-3">
                {['Tampa, FL (HQ)', 'Austin, TX', 'Sacramento, CA', 'Baltimore, MD'].map((loc) => (
                  <div key={loc} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#C72E9E' }} />
                    <p className="font-jost text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{loc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="rounded-3xl p-8 sm:p-10" style={{ background: '#fff' }}>
              <h3 className="font-urbanist font-black text-2xl mb-6" style={{ color: '#0B1230' }}>Send Us a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>First Name *</label>
                  <input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-base font-jost focus:outline-none transition-all"
                    style={{ border: '1.5px solid #E6E8F0', color: '#0B1230', background: '#F9FAFB' }}
                    placeholder="John" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Last Name</label>
                  <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-base font-jost focus:outline-none"
                    style={{ border: '1.5px solid #E6E8F0', color: '#0B1230', background: '#F9FAFB' }}
                    placeholder="Smith" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Phone *</label>
                  <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-base font-jost focus:outline-none"
                    style={{ border: '1.5px solid #E6E8F0', color: '#0B1230', background: '#F9FAFB' }}
                    placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-base font-jost focus:outline-none"
                    style={{ border: '1.5px solid #E6E8F0', color: '#0B1230', background: '#F9FAFB' }}
                    placeholder="john@company.com" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Company</label>
                <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl text-base font-jost focus:outline-none"
                  style={{ border: '1.5px solid #E6E8F0', color: '#0B1230', background: '#F9FAFB' }}
                  placeholder="Your company name" />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Service Interested In</label>
                <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl text-base font-jost focus:outline-none appearance-none"
                  style={{ border: '1.5px solid #E6E8F0', color: form.service ? '#0B1230' : '#9CA3AF', background: '#F9FAFB' }}>
                  <option value="">Select a service...</option>
                  {servicesList.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Message</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4} className="w-full px-4 py-3.5 rounded-xl text-base font-jost focus:outline-none resize-none"
                  style={{ border: '1.5px solid #E6E8F0', color: '#0B1230', background: '#F9FAFB' }}
                  placeholder="Describe your project, MW scale, grid, timeline..." />
              </div>

              {error && <p className="text-red-500 text-sm font-jost mb-4">{error}</p>}

              <button type="submit" disabled={loading}
                className="w-full text-white font-bold text-base py-4 rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #0B1A5B, #5B2A86)' }}>
                {loading ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                ) : (
                  <>Submit Request <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
