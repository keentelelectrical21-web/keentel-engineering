'use client'

import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
import SoftwareTools from '@/components/sections/SoftwareTools'
import SoftwareCapabilities from '@/components/sections/SoftwareCapabilities'
import Industries from '@/components/sections/Industries'
import RelatedServiceBlogs from '@/components/service/RelatedServiceBlogs'
import ServiceCaseStudies from '@/components/service/ServiceCaseStudies'
import FAQ from '@/components/sections/FAQ'

const capabilities = [
  ['Detailed Short Circuit & Protection Coordination', 'Equipment duty, relay settings, selective coordination, and fault-clearing performance for safety-related and balance-of-plant systems.'],
  ['Full Lifecycle Engineering', 'Planning, design, modification support, procurement reviews, construction engineering, testing, and turnover documentation.'],
  ['Cable & Raceway Design', 'Cable sizing, ampacity, voltage drop, separation, routing, raceway fill, and fire-barrier coordination.'],
  ['Equipment Upgrades & Obsolescence Management', 'Technical evaluations, replacement specifications, equivalency reviews, and modernization planning for aging assets.'],
  ['Regulatory & Licensing Support', 'Traceable calculations, design-basis documentation, configuration control, and responses supporting regulatory commitments.'],
  ['Maintenance & Diagnostics', 'Condition assessments, power-quality review, grounding verification, equipment testing, and actionable reliability recommendations.'],
]

const systems = [
  ['Off-Site Power System', <><Link href="https://keentelengineering.com/service/power-system-studies/transmission-planning-studies" className="font-semibold text-[#A8228A] underline decoration-[#A8228A]/40 underline-offset-2 transition hover:decoration-[#A8228A]">The transmission grid</Link> and switchyard connecting the plant. Supplies AC power across all operating modes and carries generated power to the grid. Robust design dampens disturbances and limits voltage and frequency deviations.</>],
  ['On-Site Power System', 'Distribution systems within the plant providing AC and DC supplies for controlled shutdown. Includes main generator, transformers, switchgear, batteries, UPS, and standby AC sources organised by safety significance.'],
  ['Preferred Power Supply', 'The normal source for every plant system important to safety. Spans off-site and on-site systems, with reliability dependent on engineering that treats grid connection, generator path, and in-plant distribution as one coordinated whole.'],
]

const capabilityImages = [
  '/images/services/nuclear/Detailed Short Circuit & Protection Coordination.webp',
  '/images/services/nuclear/Full Lifecycle Engineering, Grounded in Safety.webp',
  '/images/services/nuclear/Cable & Raceway Design.webp',
  '/images/services/nuclear/Equipment Upgrades & Obsolescence Management.webp',
  '/images/services/nuclear/Regulatory & Licensing Support.webp',
  '/images/services/nuclear/Maintenance & Diagnostics.webp',
]

const why = [
  '30+ years of specialized electrical power engineering experience',
  'Licensed professional engineers with utility and industrial expertise',
  'Engineering grounded in IEEE, NFPA, NRC, NERC, and OSHA requirements',
  'Independent calculations, QA/QC, and configuration-conscious delivery',
  'Practical recommendations aligned with outage and construction schedules',
]

const nuclearFaqs = [
  { q: 'What electrical engineering services does Keentel offer for nuclear power plants?', a: 'Keentel Engineering provides end-to-end electrical engineering for nuclear facilities — from Safety & Protection System Design with Class 1E power to Grid & Power System Analysis using ETAP and SKM. Our services also cover Cable & Raceway Design, Equipment Upgrades, Regulatory & Licensing Support including NFPA 805 and EQ compliance, and ongoing Maintenance & Diagnostics. We serve developers, operators, and engineering managers across the full plant lifecycle.' },
  { q: "How is a nuclear power plant's electrical system structured?", a: "A nuclear plant's electrical system has three integrated subsystems: the Off-Site Power System (transmission grid and switchyard), the On-Site Power System (in-plant AC/DC distribution, batteries, UPS, and standby sources), and the Preferred Power Supply (the primary source for all safety systems). Each is engineered for safety and reliability, and all three must work as one coordinated whole for dependable plant operation." },
  { q: 'Does Keentel Engineering handle nuclear regulatory and licensing requirements?', a: 'Yes, we deliver nuclear-grade regulatory support including Environmental Qualification (EQ) of safety equipment, NFPA 805 fire protection compliance, and complete licensing documentation. Every design meets safety classification, redundancy, and independence standards unique to nuclear facilities, ensuring your plant maintains a defensible licensing position through all operational phases.' },
  { q: 'Who does Keentel Engineering serve in the nuclear power industry?', a: 'We serve nuclear power plant developers needing new-build electrical design and grid-connected architecture, power plant operators requiring maintenance programs and equipment upgrades, and engineering managers seeking specialist support for outages, modifications, and design changes. Every engagement is backed by nuclear-grade rigor and regulatory expertise.' },
  { q: 'What makes Keentel Engineering different from other nuclear electrical engineering firms?', a: "Keentel brings four distinct advantages: nuclear-grade rigor on every design, whole-life-cycle coverage from development through decommissioning, a systems perspective that engineers off-site, on-site, and preferred power as one coordinated whole, and regulatory fluency with documentation built to withstand scrutiny. We don't treat subsystems in isolation — we engineer the complete electrical backbone." },
]

export default function NuclearPowerPlantPage() {
  return <>
    <Header />
    <main>
      <section className="relative flex min-h-[78vh] items-center overflow-hidden">
        <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" aria-label="Nuclear power generation facility"><source src="/videos/nuclear-power-plant.mp4" type="video/mp4" /></video>
        <div className="absolute inset-0 bg-black/40" />
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

      <section className="bg-white py-20 sm:py-24"><div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8"><div><h2 className="mb-6 font-urbanist text-3xl font-black sm:text-4xl" style={{ color: '#06103C' }}>Full-Lifecycle Engineering, Grounded in Safety</h2><p className="mb-5 font-jost text-lg leading-relaxed text-gray-600">From greenfield development through decades of operation and modernisation, our work spans the off-site, on-site, and preferred power systems that define a nuclear facility's electrical backbone.

We support nuclear power plant developers, power plant operators, and engineering managers with design, analysis, regulatory, and maintenance expertise grounded in the rigorous safety standards the industry demands.</p><ul className="space-y-3">{why.map(item => <li key={item} className="flex gap-3 font-jost text-gray-700"><span className="font-bold" style={{ color: '#A8228A' }}>✓</span>{item}</li>)}</ul></div><div className="overflow-hidden rounded-3xl shadow-xl"><img src="/images/services/nuclear/Full-Lifecycle Engineering, Grounded in Safety(1).jpg" alt="Aerial view of a nuclear facility supported through its full engineering lifecycle" className="h-[430px] w-full object-cover" /></div></div></section>

        <ContactForm />
        <SoftwareCapabilities />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-4xl sm:mb-12">
            <p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#A8228A' }}>Our Services</p>
            <h2 className="mb-4 font-urbanist text-3xl font-black sm:text-4xl" style={{ color: '#06103C' }}>Comprehensive Electrical Engineering Services</h2>
            <p className="font-jost text-base leading-relaxed text-gray-600 sm:text-lg">Our nuclear electrical scope is built around six service areas covering the full life cycle—from design and analysis through modernization, regulatory support, and decades-long maintenance.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(([title,desc],i) => (
              <article key={title} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="overflow-hidden"><img src={capabilityImages[i]} alt={title} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                <div className="p-6 text-center sm:p-7"><h3 className="mb-3 font-urbanist text-lg font-bold leading-snug" style={{ color: '#06103C' }}>{title}</h3><p className="font-jost text-sm leading-relaxed text-gray-600">{desc}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24" style={{ background: '#06103C' }}><div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8"><div><p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#C72E9E' }}>Deep Technical Experience</p><h2 className="mb-6 font-urbanist text-3xl font-black text-white sm:text-4xl">Expert Nuclear Electrical Engineering From Design to Reliable Operation</h2><p className="mb-8 font-jost text-lg leading-relaxed text-white/70">Our team combines power-system analysis, utility interconnection, protection, substation, and industrial engineering expertise to support high-consequence nuclear environments with disciplined technical delivery.</p><Link href="/contact" className="inline-flex w-full justify-center rounded-full px-8 py-4 font-jost font-semibold text-white sm:w-auto" style={{ background: '#C72E9E' }}>Discuss Your Project</Link></div><div className="overflow-hidden rounded-3xl"><img src="/images/services/nuclear/Expert Nuclear Electrical Engineering From Design to Decades of Reliable Operation.webp" alt="Aerial view of a nuclear power generation facility" className="h-72 w-full object-cover sm:h-[420px]" /></div></div></section>

      <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-12 w-full"><p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#A8228A' }}>Plant Electrical Architecture</p><h2 className="mb-4 font-urbanist text-3xl font-black sm:text-4xl lg:whitespace-nowrap" style={{ color: '#06103C' }}>Understanding the Nuclear Plant Electrical Power System</h2><p className="font-jost text-lg text-gray-600">Reliable generation depends on coordinated normal, preferred, standby, emergency, and DC power systems.</p></div><div className="grid grid-cols-1 gap-6 md:grid-cols-3">{systems.map(([title,desc],i) => <article key={title as string} className="overflow-hidden rounded-2xl border border-gray-200 bg-white"><img src={['/images/services/nuclear/Off-Site Power System.webp','/images/services/nuclear/On-Site Power System.webp','/images/services/nuclear/Preferred Power Supply.webp'][i]} alt={title as string} className="h-52 w-full object-cover" /><div className="p-6"><h3 className="mb-3 font-urbanist text-xl font-bold" style={{ color: '#06103C' }}>{title}</h3><p className="font-jost text-sm leading-relaxed text-gray-600">{desc}</p></div></article>)}</div></div></section>

        <SoftwareTools />

        <Industries />

        <ServiceCaseStudies service="nuclear-power-plant" />

      <FAQ
        items={nuclearFaqs}
        eyebrow="Nuclear Engineering FAQs"
        title={<>Nuclear answers,<br />before you ask.</>}
        description="Clear answers about nuclear electrical systems, regulatory support, plant lifecycle services, and Keentel's engineering approach."
      />
    </main>
      <RelatedServiceBlogs terms={["nuclear","power plant","reliability"]} />
      <Footer />
  </>
}
