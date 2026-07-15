'use client'

import { useState } from 'react'
import Link from 'next/link'

const points = [
  ['Expertise in HV, MV, and EHV power systems', 'M13 10V3L4 14h7v7l9-11h-7z', 'Grid-ready designs rooted in three decades of hands-on field experience.'],
  ['Advanced power system modeling capabilities', 'M4 19h16M6 16v-5m4 5V7m4 9V4m4 12V9', 'Expert modeling with ETAP, SKM, PSCAD, and DIgSILENT tools.'],
  ['Experience with utility and ISO planning requirements', 'M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z', 'Deep understanding of IEEE, NERC, and PJM, ERCOT, and CAISO planning standards.'],
  ['Deep understanding of NERC reliability standards', 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z', '27+ years navigating NERC standard revisions—not learning them on your project.'],
  ['Practical solutions for complex power system challenges', 'M5 13l4 4L19 7', 'From interconnection queues to grid mitigation, we find the path that works.'],
]

const services = [
  'Power System Studies',
  'Substation Design Services',
  'POI Interconnection Engineering Support',
  "Owner's Engineer Services",
  'NERC Compliance Services',
  'Utility Scale Renewable Energy',
  'MEP Engineering Services',
  'Transmission Line Design',
  'Nuclear Power Plant Electrical Engineering',
]

export default function ContactForm() {
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', services: [] as string[], message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function toggleService(service: string) {
    setForm(current => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter(item => item !== service)
        : [...current.services, service],
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          service: form.services.join(', '),
          message: form.message,
        }),
      })
      if (!response.ok) throw new Error('Submit failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please call us directly at 813-389-7871.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-24" style={{ background: '#FAFBFD' }}>
      <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-[0.06] blur-3xl" style={{ background: 'radial-gradient(circle,#A8228A 0%,transparent 70%)' }} />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-16 lg:grid-cols-2">
        <div className="flex flex-col">
          <div className="mb-4 flex items-center gap-2.5"><span className="h-px w-8" style={{ background: '#A8228A' }} /></div>
          <h2 className="mb-5 font-urbanist text-3xl font-black leading-tight sm:text-4xl" style={{ color: '#0B1A5B' }}>Why Choose Keentel Engineering</h2>
          <p className="mb-9 font-jost text-base leading-relaxed text-gray-600">Our licensed engineers help utilities, developers, EPC teams, and infrastructure owners reduce technical risk, validate system performance, and move complex projects toward safe, compliant operation.</p>
          <div className="mb-10 space-y-5">
            {points.map(([title, path, subtitle], index) => (
              <div key={title} className="flex items-start gap-4 pb-5" style={{ borderBottom: index < points.length - 1 ? '1px solid #ECEEF4' : 'none' }}>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl shadow-sm" style={{ background: 'linear-gradient(135deg,#C72E9E,#A8228A)' }}>
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} /></svg>
                </div>
                <div><p className="pt-1.5 font-jost text-sm font-semibold leading-snug" style={{ color: '#0B1A5B' }}>{title}</p><p className="mt-1 font-jost text-[13px] leading-snug" style={{ color: '#8891A8' }}>{subtitle}</p></div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full px-7 py-3.5 font-jost text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg" style={{ background: 'linear-gradient(135deg,#A8228A,#5B2A86)' }}>Schedule a Consultation</a>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border-2 px-7 py-3.5 font-jost text-sm font-semibold transition hover:-translate-y-0.5" style={{ borderColor: '#0B1A5B', color: '#0B1A5B' }}>Contact Us</Link>
          </div>
        </div>

        <div className="flex flex-col rounded-3xl border border-[#F0F1F6] bg-white p-6 shadow-[0_30px_70px_-25px_rgba(11,26,91,0.22)] sm:p-10">
          <p className="mb-3 text-center font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#A8228A' }}>Get In Touch</p>
          <h2 className="mb-1 text-center font-urbanist text-2xl font-black leading-snug sm:text-3xl" style={{ color: '#0B1A5B' }}>Let&apos;s Discuss Your Next Project</h2>
          <p className="mb-7 text-center font-jost text-xs text-gray-400">Our engineers typically respond within one business day.</p>

          {submitted ? (
            <div className="py-12 text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'rgba(168,34,138,.12)' }}><svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#A8228A"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg></div><h3 className="mb-2 font-urbanist text-2xl font-bold" style={{ color: '#0B1A5B' }}>Message Received</h3><p className="font-jost text-gray-600">Thank you. One of our engineers will contact you shortly.</p></div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="font-jost text-sm font-semibold" style={{ color: '#0B1A5B' }}>First Name *<input required value={form.firstName} onChange={e => setForm({...form, firstName:e.target.value})} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 font-jost text-sm outline-none focus:border-[#A8228A]" /></label>
                <label className="font-jost text-sm font-semibold" style={{ color: '#0B1A5B' }}>Last Name<input value={form.lastName} onChange={e => setForm({...form, lastName:e.target.value})} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 font-jost text-sm outline-none focus:border-[#A8228A]" /></label>
                <label className="font-jost text-sm font-semibold" style={{ color: '#0B1A5B' }}>Phone *<input required type="tel" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 font-jost text-sm outline-none focus:border-[#A8228A]" /></label>
                <label className="font-jost text-sm font-semibold" style={{ color: '#0B1A5B' }}>Email *<input required type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 font-jost text-sm outline-none focus:border-[#A8228A]" /></label>
              </div>

              <fieldset className="mb-5"><legend className="mb-3 font-jost text-sm font-semibold" style={{ color: '#0B1A5B' }}>What services are you interested in?</legend><div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">{services.map(service => <label key={service} className="flex cursor-pointer items-start gap-2.5 rounded-lg p-2 transition hover:bg-gray-50"><input type="checkbox" checked={form.services.includes(service)} onChange={() => toggleService(service)} className="mt-0.5 h-4 w-4" style={{ accentColor: '#A8228A' }} /><span className="font-jost text-sm text-gray-600">{service}</span></label>)}</div></fieldset>

              <label className="block font-jost text-sm font-semibold" style={{ color: '#0B1A5B' }}>Message<textarea rows={4} value={form.message} onChange={e => setForm({...form, message:e.target.value})} className="mt-2 w-full resize-y rounded-lg border border-gray-300 px-3 py-3 font-jost text-sm outline-none focus:border-[#A8228A]" placeholder="Tell us about your project, timeline, and engineering requirements..." /></label>
              {error && <p className="mt-4 font-jost text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={loading} className="mt-6 flex w-full items-center justify-center rounded-xl px-7 py-4 font-jost text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70" style={{ background: 'linear-gradient(135deg,#0B1A5B,#5B2A86)' }}>{loading ? 'Submitting...' : 'Submit Request'}</button>
              <p className="mt-4 text-center font-jost text-[11px] text-gray-400">Your information is confidential and never shared with third parties.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
