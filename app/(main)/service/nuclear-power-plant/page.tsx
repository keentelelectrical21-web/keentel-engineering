'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
import SoftwareTools from '@/components/sections/SoftwareTools'
import Industries from '@/components/sections/Industries'
import WhoWeServed from '@/components/service/WhoWeServed'
import RelatedServiceBlogs from '@/components/service/RelatedServiceBlogs'
import ServiceCaseStudies from '@/components/service/ServiceCaseStudies'

const capabilities = [
  ['Detailed Short Circuit & Protection Coordination', 'Equipment duty, relay settings, selective coordination, and fault-clearing performance for safety-related and balance-of-plant systems.'],
  ['Full Lifecycle Engineering', 'Planning, design, modification support, procurement reviews, construction engineering, testing, and turnover documentation.'],
  ['Cable & Raceway Design', 'Cable sizing, ampacity, voltage drop, separation, routing, raceway fill, and fire-barrier coordination.'],
  ['Equipment Upgrades & Obsolescence Management', 'Technical evaluations, replacement specifications, equivalency reviews, and modernization planning for aging assets.'],
  ['Regulatory & Licensing Support', 'Traceable calculations, design-basis documentation, configuration control, and responses supporting regulatory commitments.'],
  ['Maintenance & Diagnostics', 'Condition assessments, power-quality review, grounding verification, equipment testing, and actionable reliability recommendations.'],
]

const systems = [
  ['Off-Site Power Systems', 'Transmission and switchyard interfaces that provide reliable normal and alternate power to the station.'],
  ['On-Site Power Systems', 'Safety-related and non-safety AC/DC distribution, emergency generation, batteries, chargers, and UPS systems.'],
  ['Preferred Power Supply', 'Independent source paths, transfer schemes, protection, and voltage support designed for dependable plant operation.'],
]

const why = [
  '30+ years of specialized electrical power engineering experience',
  'Licensed professional engineers with utility and industrial expertise',
  'Engineering grounded in IEEE, NFPA, NRC, NERC, and OSHA requirements',
  'Independent calculations, QA/QC, and configuration-conscious delivery',
  'Practical recommendations aligned with outage and construction schedules',
]

const faqs = [
  ['What electrical engineering services does Keentel provide for nuclear power plants?', 'Power system studies, protection coordination, grounding, cable and raceway design, equipment upgrades, modification support, testing, and compliance-ready documentation.'],
  ['How is nuclear power plant electrical system reliability evaluated?', 'We review source diversity, fault duty, voltage performance, protection selectivity, equipment ratings, DC system capacity, and credible operating configurations.'],
  ['Does Keentel support nuclear regulatory and licensing requirements?', 'Yes. Our work emphasizes traceable inputs, documented assumptions, independent review, configuration control, and alignment with applicable regulatory commitments.'],
  ['Who performs the engineering work?', 'Licensed power engineers with experience across generation, substations, protection, utility systems, industrial facilities, and critical infrastructure.'],
]

export default function NuclearPowerPlantPage() {
  const [open, setOpen] = useState<number | null>(0)

  return <>
    <Header />
    <main>
      <section className="relative flex min-h-[78vh] items-center overflow-hidden">
        <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" aria-label="Nuclear power generation facility"><source src="/videos/nuclear-power-plant.mp4" type="video/mp4" /></video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,rgba(6,16,60,.94),rgba(6,16,60,.66) 60%,rgba(6,16,60,.25))' }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="max-w-3xl"><nav className="mb-7 flex gap-2 font-jost text-xs text-white/50"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span className="text-white/80">Nuclear Power Plant</span></nav><p className="mb-4 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#C72E9E' }}>Generation Engineering</p><h1 className="mb-6 font-urbanist text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">Nuclear Power Plant Electrical Engineering</h1><p className="mb-9 max-w-2xl font-jost text-lg leading-relaxed text-white/80">Comprehensive electrical engineering for safe, reliable nuclear generation—from off-site and on-site power systems to protection, modifications, compliance, and lifecycle asset support.</p><Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex rounded-full px-8 py-4 font-jost font-semibold text-white" style={{ background: 'linear-gradient(135deg,#C72E9E,#5B2A86)' }}>Schedule a Consultation</Link></div>
          <div className="mt-12 max-w-3xl border-t border-white/10 pt-8">
            <p className="mb-5 font-jost text-xs font-semibold uppercase tracking-widest text-white/50">Certifications &amp; Memberships</p>
            <div className="inline-block max-w-full rounded-2xl px-4 py-4 sm:px-6 sm:py-5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <img src="/images/cert-logos.png" alt="BBB Accredited IEEE Member NERC Certified FL Licensed" className="h-20 w-auto max-w-full object-contain sm:h-24" onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/new+image-640w.png' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24"><div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8"><div><p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#A8228A' }}>Our Approach</p><h2 className="mb-6 font-urbanist text-3xl font-black sm:text-4xl" style={{ color: '#06103C' }}>Full-Lifecycle Engineering, Grounded in Safety</h2><p className="mb-5 font-jost text-lg leading-relaxed text-gray-600">Nuclear facilities require disciplined engineering, defensible calculations, and configuration-aware execution. Keentel supports electrical modifications, system studies, equipment upgrades, and ongoing plant reliability from concept through commissioning.</p><ul className="space-y-3">{why.map(item => <li key={item} className="flex gap-3 font-jost text-gray-700"><span className="font-bold" style={{ color: '#A8228A' }}>✓</span>{item}</li>)}</ul></div><div className="overflow-hidden rounded-3xl shadow-xl"><img src="/images/services/owners-engineer/construction-workers.jpg" alt="Engineers supporting power plant construction and operations" className="h-[430px] w-full object-cover" /></div></div></section>

        <ContactForm />
        <SoftwareTools heading="Our Software Capabilities" />
        <Industries />
        <ServiceCaseStudies service="nuclear-power-plant" />

        <WhoWeServed />

      <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#A8228A' }}>Plant Electrical Architecture</p><h2 className="mb-4 font-urbanist text-3xl font-black sm:text-4xl" style={{ color: '#06103C' }}>Understanding the Nuclear Plant Electrical Power System</h2><p className="font-jost text-lg text-gray-600">Reliable generation depends on coordinated normal, preferred, standby, emergency, and DC power systems.</p></div><div className="grid grid-cols-1 gap-6 md:grid-cols-3">{systems.map(([title,desc],i) => <article key={title} className="overflow-hidden rounded-2xl border border-gray-200 bg-white"><img src={['/images/services/power-system-studies/industry-utilities.jpg','/images/services/mep-engineering/electrical-substation.jpg','/images/services/substation-design/type-transmission.png'][i]} alt={title} className="h-52 w-full object-cover" /><div className="p-6"><h3 className="mb-3 font-urbanist text-xl font-bold" style={{ color: '#06103C' }}>{title}</h3><p className="font-jost text-sm leading-relaxed text-gray-600">{desc}</p></div></article>)}</div></div></section>

      <section className="bg-white py-20 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-12"><p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#A8228A' }}>Our Services</p><h2 className="font-urbanist text-3xl font-black sm:text-4xl" style={{ color: '#06103C' }}>Comprehensive Nuclear Electrical Engineering Services</h2></div><div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(([title,desc],i) => <article key={title} className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl font-urbanist font-black text-white" style={{ background: 'linear-gradient(135deg,#A8228A,#5B2A86)' }}>{String(i+1).padStart(2,'0')}</div><h3 className="mb-3 font-urbanist text-lg font-bold" style={{ color: '#06103C' }}>{title}</h3><p className="font-jost text-sm leading-relaxed text-gray-600">{desc}</p></article>)}</div></div></section>

      <section className="py-20 sm:py-24" style={{ background: '#06103C' }}><div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8"><div><p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#C72E9E' }}>Deep Technical Experience</p><h2 className="mb-6 font-urbanist text-3xl font-black text-white sm:text-4xl">Expert Nuclear Electrical Engineering From Design to Reliable Operation</h2><p className="mb-8 font-jost text-lg leading-relaxed text-white/70">Our team combines power-system analysis, utility interconnection, protection, substation, and industrial engineering expertise to support high-consequence nuclear environments with disciplined technical delivery.</p><Link href="/contact" className="inline-flex rounded-full px-8 py-4 font-jost font-semibold text-white" style={{ background: '#C72E9E' }}>Discuss Your Project</Link></div><div className="overflow-hidden rounded-3xl"><img src="/images/services/power-system-studies/industries-1.jpg" alt="Large power generation facility electrical infrastructure" className="h-[420px] w-full object-cover" /></div></div></section>

<section className="bg-white py-20 sm:py-24"><div className="mx-auto max-w-4xl px-4 sm:px-6"><div className="mb-10 text-center"><p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#A8228A' }}>Common Questions</p><h2 className="font-urbanist text-3xl font-black sm:text-4xl" style={{ color: '#06103C' }}>Nuclear Engineering FAQs</h2></div><div className="space-y-3">{faqs.map(([q,a],i) => <div key={q} className="overflow-hidden rounded-2xl border border-gray-200"><button onClick={() => setOpen(open===i?null:i)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-urbanist font-bold" style={{ color: '#06103C' }}>{q}<span style={{ color: '#A8228A' }}>{open===i?'−':'+'}</span></button>{open===i && <p className="px-5 pb-5 font-jost leading-relaxed text-gray-600">{a}</p>}</div>)}</div></div></section>
    </main>
      <RelatedServiceBlogs terms={["nuclear","power plant","reliability"]} />
      <Footer />
  </>
}
