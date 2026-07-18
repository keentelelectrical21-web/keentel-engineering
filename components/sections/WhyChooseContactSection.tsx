'use client'

import { useState } from 'react'

const benefits = [
  {
    title: 'Expertise in HV, MV, and EHV Power Systems',
    description: 'Design and analysis of high-, medium-, and extra-high-voltage electrical systems for utilities, industrial facilities, renewable energy projects, and critical infrastructure.',
  },
  {
    title: 'Advanced Power System Modeling Capabilities',
    description: 'Comprehensive engineering studies using ETAP, PSCAD, PSS®E, SKM, and DIgSILENT to deliver accurate analysis, system performance validation, and reliable project outcomes.',
  },
  {
    title: 'Experience with Utility and ISO Planning Requirements',
    description: 'Supporting projects across ERCOT, PJM, MISO, CAISO, and other utility territories with interconnection studies, planning support, and grid compliance expertise.',
  },
  {
    title: 'Deep Understanding of NERC Reliability Standards',
    description: 'Assisting clients with NERC compliance through engineering studies, protection coordination, documentation, and reliability-focused technical solutions.',
  },
  {
    title: 'Practical Engineering Solutions for Complex Power System Challenges',
    description: 'Delivering practical, cost-effective engineering recommendations backed by more than 30 years of real-world experience across utility, industrial, and renewable energy projects.',
  },
]

const services = [
  'Power System Studies Services',
  'Substation Design Services',
  'POI Interconnection Engineering Support',
  'Transmission Line Design Services',
  'Utility Scale Renewable Energy',
  "Owner's Engineer Services",
  'MEP Engineering Services',
  'NERC O&P 693 Compliance Services',
  'Nuclear Power Plant Services',
]

const emptyForm = { firstName: '', lastName: '', phone: '', email: '', message: '' }

export default function WhyChooseContactSection({ source = 'why-choose-contact-section' }: { source?: string }) {
  const [form, setForm] = useState(emptyForm)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      current.includes(service) ? current.filter((item) => item !== service) : [...current, service]
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          service: selectedServices.join(', '),
          message: form.message,
          source,
        }),
      })

      if (!response.ok) throw new Error(`Contact request failed with ${response.status}`)
      setStatus('success')
      setForm(emptyForm)
      setSelectedServices([])
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-20" style={{ background: '#F6F7FB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="pt-3">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Why Choose Us</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-[1.08] mb-6" style={{ color: '#06103C' }}>
              Why Choose Keentel Engineering
            </h2>
            <p className="font-jost text-base sm:text-lg leading-relaxed mb-8 max-w-xl" style={{ color: '#4B5563' }}>
              Keentel Engineering delivers specialized, compliance-focused power engineering support for utilities, developers, EPC contractors, and critical infrastructure projects.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-4">
                  <span className="mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#A8228A' }}>
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                      <path d="m5 12 4 4L19 6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="pt-1">
                    <p className="font-jost font-semibold leading-relaxed" style={{ color: '#06103C' }}>{benefit.title}</p>
                    <p className="font-jost text-sm leading-relaxed mt-1" style={{ color: '#4B5563' }}>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 sm:p-8 lg:p-10 shadow-sm" style={{ border: '1px solid #E6E8F0' }}>
            <h3 className="font-urbanist font-black text-2xl sm:text-3xl leading-tight mb-7" style={{ color: '#06103C' }}>
              Let&apos;s Discuss How to Optimize Your Next Project
            </h3>
            {status === 'success' ? (
              <div className="rounded-2xl p-8 text-center" style={{ background: '#F6F7FB' }} role="status">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-white" style={{ background: '#A8228A' }}>✓</div>
                <h4 className="font-urbanist font-bold text-xl mb-2" style={{ color: '#06103C' }}>Message Received</h4>
                <p className="font-jost" style={{ color: '#4B5563' }}>Thank you. One of our engineers will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" data-lpignore="true" data-1p-ignore="true">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="First Name" required value={form.firstName} onChange={(value) => setForm({ ...form, firstName: value })} />
                  <Field label="Last Name" value={form.lastName} onChange={(value) => setForm({ ...form, lastName: value })} />
                  <Field label="Phone" type="tel" required value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
                  <Field label="Email" type="email" required value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
                </div>
                <fieldset>
                  <legend className="font-jost font-bold text-sm mb-3" style={{ color: '#06103C' }}>What services are you interested in?*</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((service) => (
                      <label key={service} className="flex items-start gap-3 cursor-pointer font-jost text-sm leading-snug" style={{ color: '#4B5563' }}>
                        <input type="checkbox" checked={selectedServices.includes(service)} onChange={() => toggleService(service)} className="mt-0.5 h-4 w-4 accent-[#A8228A]" data-lpignore="true" data-1p-ignore="true" />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                  <input className="sr-only" tabIndex={-1} required value={selectedServices.join(',')} onChange={() => {}} aria-label="Selected services" data-lpignore="true" data-1p-ignore="true" />
                </fieldset>
                <label className="block font-jost font-bold text-sm" style={{ color: '#06103C' }}>
                  Message
                  <textarea rows={4} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="mt-2 w-full rounded-xl px-4 py-3 font-normal resize-y focus:outline-none focus:ring-2 focus:ring-[#A8228A]" style={{ border: '1.5px solid #D9DDE8' }} data-lpignore="true" data-1p-ignore="true" />
                </label>
                {status === 'error' && <p className="font-jost text-sm text-red-600" role="alert">Something went wrong. Please try again or call 813-389-7871.</p>}
                <button type="submit" disabled={status === 'loading'} className="w-full rounded-xl py-4 px-6 text-white font-jost font-bold transition-opacity disabled:opacity-60" style={{ background: '#06103C' }}>
                  {status === 'loading' ? 'Submitting…' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, type = 'text', required = false, value, onChange }: { label: string; type?: string; required?: boolean; value: string; onChange: (value: string) => void }) {
  const id = `contact-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="block">
      <label htmlFor={id} className="font-jost text-sm font-bold" style={{ color: '#06103C' }}>{label}{required ? ' *' : ''}</label>
      <input id={id} name={id} type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl px-4 py-3 font-jost font-normal focus:outline-none focus:ring-2 focus:ring-[#A8228A]" style={{ border: '1.5px solid #D9DDE8' }} data-lpignore="true" data-1p-ignore="true" data-bwignore="true" />
    </div>
  )
}
