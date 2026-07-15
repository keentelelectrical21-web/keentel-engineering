'use client'

import Image from 'next/image'
import { type FormEvent, useState } from 'react'

type Props = {
  serviceName: string
  bottomTitle: string
  bottomDescription: string
  bottomFeatures: string[]
  bottomImage: string
}

const softwareTools = [
  ['⚡', 'Power Flow Analysis', 'Advanced load flow and transient stability analysis'],
  ['🛡️', 'Protection Coordination', 'Comprehensive protection system design and testing'],
  ['🗺️', 'Geospatial Mapping', 'GIS-based analysis and visualization tools'],
  ['💰', 'Financial Modeling', 'ROI analysis and feasibility studies'],
  ['📊', 'Real-Time Monitoring', 'SCADA and real-time data collection systems'],
  ['🔧', 'Custom Integration', 'Tailored software solutions for your needs'],
]

export default function ServicePageBottomSection({ serviceName, bottomTitle, bottomDescription, bottomFeatures, bottomImage }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const anchor = `contact-${serviceName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  const input = 'w-full rounded-xl border border-gray-300 px-4 py-3 font-jost text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', company: '', message: '' })
  }

  return <>
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 md:grid-cols-2 md:gap-12 lg:px-8">
        <div className="order-2 md:order-1">
          <h2 className="mb-5 font-urbanist text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">{bottomTitle}</h2>
          <p className="mb-7 font-jost text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">{bottomDescription}</p>
          <ul className="space-y-3">{bottomFeatures.map(feature => <li key={feature} className="flex gap-3 font-jost text-sm text-gray-700 md:text-base"><span className="font-bold text-blue-600">✓</span>{feature}</li>)}</ul>
        </div>
        <div className="relative order-1 h-56 overflow-hidden rounded-2xl shadow-lg sm:h-72 md:order-2 md:h-96"><Image src={bottomImage} alt={bottomTitle} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
      </div>
    </section>

    <section id={anchor} className="bg-gradient-to-r from-blue-950 to-blue-800 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center"><h2 className="mb-3 font-urbanist text-2xl font-bold text-white sm:text-3xl md:text-4xl">Ready to Get Started?</h2><p className="font-jost text-sm text-blue-100 sm:text-base md:text-lg">Contact our team for a free consultation on {serviceName}</p></div>
        <form onSubmit={submit} className="rounded-2xl bg-white p-5 shadow-xl sm:p-8">
          {submitted && <p role="status" className="mb-5 rounded-lg bg-green-100 p-4 font-jost text-sm text-green-700">✓ Thank you! We&apos;ll contact you within 24 hours.</p>}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="font-jost text-sm font-semibold text-gray-700">Full Name *<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} className={`${input} mt-2`} /></label>
            <label className="font-jost text-sm font-semibold text-gray-700">Email Address *<input type="email" required value={form.email} onChange={e => setForm({...form, email:e.target.value})} className={`${input} mt-2`} /></label>
            <label className="font-jost text-sm font-semibold text-gray-700">Phone Number<input type="tel" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} className={`${input} mt-2`} /></label>
            <label className="font-jost text-sm font-semibold text-gray-700">Company Name<input value={form.company} onChange={e => setForm({...form, company:e.target.value})} className={`${input} mt-2`} /></label>
          </div>
          <label className="mt-5 block font-jost text-sm font-semibold text-gray-700">Service Interested In<input value={serviceName} disabled className={`${input} mt-2 bg-gray-100 text-gray-600`} /></label>
          <label className="mt-5 block font-jost text-sm font-semibold text-gray-700">Message *<textarea rows={4} required value={form.message} onChange={e => setForm({...form, message:e.target.value})} className={`${input} mt-2`} /></label>
          <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-jost text-sm font-bold text-white hover:bg-blue-700" type="submit">Send Inquiry</button>
        </form>
      </div>
    </section>

    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14"><h2 className="mb-3 font-urbanist text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Our Software Capabilities</h2><p className="mx-auto max-w-3xl font-jost text-sm text-gray-600 md:text-lg">We leverage cutting-edge software platforms and advanced analytical tools to deliver superior engineering solutions for your projects.</p></div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">{softwareTools.map(([icon,name,description]) => <div key={name} className="rounded-xl border border-gray-200 p-6 transition hover:border-blue-600 hover:shadow-lg"><span className="text-3xl" aria-hidden>{icon}</span><h3 className="mb-2 mt-4 font-urbanist text-lg font-bold text-gray-900">{name}</h3><p className="font-jost text-sm text-gray-600">{description}</p></div>)}</div>
        <div className="mt-12 text-center"><a href={`#${anchor}`} className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-jost text-sm font-semibold text-white hover:bg-blue-700">Contact Our Team</a></div>
      </div>
    </section>
  </>
}
