'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const services = [
    'Power System Studies', 'Substation Design', 'POI Interconnection Engineering',
    "Owner's Engineer Services", 'NERC Compliance Services', 'Utility Scale Renewable Energy',
    'MEP Engineering', 'Relay Protection Engineering', 'Other',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(167,34,138,0.1)' }}>
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-urbanist font-black text-3xl mb-3" style={{ color: '#0B1230' }}>Message Received</h3>
          <p className="font-jost text-base" style={{ color: '#6B7280' }}>Thank you for contacting Keentel Engineering. We will get back to you as soon as possible.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20" style={{ background: '#F6F7FB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-14">

          {/* Left */}
          <div className="lg:w-2/5">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>Get In Touch</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-[1.1] mb-5" style={{ color: '#0B1230' }}>
              Let's Discuss How to Optimize Your Next Project
            </h2>
            <p className="text-base font-jost leading-relaxed mb-8" style={{ color: '#6B7280' }}>
              Our engineers are ready to discuss your specific project requirements and help you find the best path forward.
            </p>
            <div className="space-y-4">
              <a href="tel:813-389-7871" className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:shadow-md" style={{ background: '#fff', border: '1px solid #E6E8F0' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(11,26,91,0.08)' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#0B1A5B' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#9CA3AF' }}>Phone</p>
                  <p className="font-urbanist font-bold" style={{ color: '#0B1230' }}>813-389-7871</p>
                </div>
              </a>
              <a href="mailto:contact@keentelengineering.com" className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:shadow-md" style={{ background: '#fff', border: '1px solid #E6E8F0' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168,34,138,0.08)' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#9CA3AF' }}>Email</p>
                  <p className="font-urbanist font-bold" style={{ color: '#0B1230' }}>contact@keentelengineering.com</p>
                </div>
              </a>
              <a href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:shadow-md" style={{ background: '#fff', border: '1px solid #E6E8F0' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(91,42,134,0.08)' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#5B2A86' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#9CA3AF' }}>Schedule</p>
                  <p className="font-urbanist font-bold" style={{ color: '#0B1230' }}>Schedule a Consultation</p>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-3/5">
            <form onSubmit={handleSubmit} className="rounded-3xl p-8" style={{ background: '#fff', border: '1px solid #E6E8F0' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>First Name *</label>
                  <input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm font-jost focus:outline-none transition-all" style={{ border: '1.5px solid #E6E8F0', color: '#0B1230', background: '#F6F7FB' }} placeholder="John" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Last Name</label>
                  <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm font-jost focus:outline-none" style={{ border: '1.5px solid #E6E8F0', color: '#0B1230', background: '#F6F7FB' }} placeholder="Smith" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Phone *</label>
                  <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm font-jost focus:outline-none" style={{ border: '1.5px solid #E6E8F0', color: '#0B1230', background: '#F6F7FB' }} placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm font-jost focus:outline-none" style={{ border: '1.5px solid #E6E8F0', color: '#0B1230', background: '#F6F7FB' }} placeholder="john@company.com" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Service Interested In</label>
                <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm font-jost focus:outline-none" style={{ border: '1.5px solid #E6E8F0', color: form.service ? '#0B1230' : '#9CA3AF', background: '#F6F7FB' }}>
                  <option value="">Select a service...</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>Message</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-xl text-sm font-jost focus:outline-none resize-none" style={{ border: '1.5px solid #E6E8F0', color: '#0B1230', background: '#F6F7FB' }} placeholder="Describe your project or question..." />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #0B1A5B, #5B2A86)' }}
              >
                {loading ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                ) : 'Submit Request'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}