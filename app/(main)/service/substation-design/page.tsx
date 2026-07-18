'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
import SoftwareTools from '@/components/sections/SoftwareTools'
import SoftwareCapabilities from '@/components/sections/SoftwareCapabilities'
import WhoWeServed from '@/components/service/WhoWeServed'
import RelatedServiceBlogs from '@/components/service/RelatedServiceBlogs'
import ServiceCaseStudies from '@/components/service/ServiceCaseStudies'

const faqs = [
  { q: 'What are substation services, and why are they important in power systems?', a: 'Substation services include the design, engineering, protection, automation, and analysis of facilities that transform voltage levels, control power flow, and protect electrical networks. Substations are critical to ensuring safe, reliable, and efficient delivery of electricity from generation sources to transmission and distribution systems.' },
  { q: 'What does a substation designer do?', a: 'A substation designer develops detailed engineering drawings and technical documentation required to construct or upgrade substations, including general arrangements, equipment layouts, wiring diagrams, control schematics, material lists, and cable schedules.' },
  { q: 'What are the different types of substations?', a: 'Transmission substations step up or down voltage for long-distance transmission. Distribution substations deliver power to end-users at lower voltages. Switching substations perform switching/protection without transformation. Collector substations aggregate renewable power from wind, solar, or BESS facilities.' },
  { q: 'What are the key components of a substation?', a: 'Key components include power transformers, circuit breakers, disconnect switches, busbars, protection relays, surge or lightning arresters, and control/protection/SCADA systems.' },
  { q: 'What is the difference between AIS and GIS substations?', a: 'AIS (Air-Insulated Substations) use air as the insulating medium and require larger footprints at lower upfront cost. GIS (Gas-Insulated Substations) use SF6 or alternative gases for compact designs suitable for urban sites, at higher initial cost but reduced land requirements.' },
  { q: 'What is the typical timeline for constructing a substation?', a: 'Substation projects typically range from 12 to 36 months depending on voltage level, site conditions, equipment lead times, permitting, and utility review cycles.' },
]

function Img({ src, fallback, alt, className }: { src: string; fallback: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={className} onError={(e) => { (e.target as HTMLImageElement).src = fallback }} />
}
// ── Shared FAQ Accordion (matches homepage FAQ.tsx exactly) ────────────────
function FaqAccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
      style={{ border: `1.5px solid ${open ? '#A8228A' : '#E6E8F0'}`, boxShadow: open ? '0 4px 24px rgba(168,34,138,0.1)' : 'none' }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6">
        <span className="font-urbanist font-black text-xl sm:text-2xl flex-shrink-0 w-7 sm:w-8" style={{ color: open ? '#A8228A' : '#E6E8F0' }}>{String(index + 1).padStart(2, '0')}</span>
        <h4 className="font-urbanist font-bold text-base sm:text-xl leading-snug flex-1" style={{ color: '#0B1230' }}>{q}</h4>
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300" style={{ background: open ? '#A8228A' : '#F6F7FB', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: open ? '#fff' : '#A8228A' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
        </div>
      </div>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '600px' : '0px' }}>
        <p className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[52px] sm:pl-[72px] text-sm sm:text-base font-jost leading-relaxed" style={{ color: '#4B5563' }}>{a}</p>
      </div>
    </div>
  )
}

function FaqSection({ eyebrow, heading, headingLine2, intro, items, ctaText = 'Ask Us Directly', ctaHref = 'https://calendly.com/keentel-engineering/15min' }: {
  eyebrow: string; heading: string; headingLine2?: string; intro: string; items: { q: string; a: string }[]; ctaText?: string; ctaHref?: string
}) {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-widest mb-4 font-jost" style={{ color: '#A8228A' }}>{eyebrow}</p>
            <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6" style={{ color: '#0B1230' }}>{heading}{headingLine2 && <><br />{headingLine2}</>}</h2>
            <p className="text-base font-jost leading-relaxed mb-8" style={{ color: '#4B5563' }}>{intro}</p>
            <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 font-jost font-semibold text-white transition-all hover:-translate-y-0.5 sm:w-auto" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
              {ctaText}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-3">
            {items.map((item, i) => <FaqAccordionItem key={i} q={item.q} a={item.a} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function SubstationDesignPage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <>
      <Header />
      <main className="overflow-x-hidden">

{/* ═══ 1. HERO — video visible, overlay contained, big desc ═══ */}
        <section className="relative min-h-[75vh] sm:min-h-[80vh] flex items-center overflow-hidden" style={{ background: '#06103C' }}>
          <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/videos/substation.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 w-full">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <Link href="/services" className="text-xs font-semibold uppercase tracking-widest font-jost" style={{ color: '#C72E9E' }}>Services</Link>
                <span className="text-white/30">/</span>
                <span className="text-white/50 text-xs font-jost">Substation Design</span>
              </div>
              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.5rem)' }}>
                Substation Design, Protection, SCADA &amp; Power System Studies
              </h1>
              <p className="font-jost text-white/90 mb-10 max-w-3xl leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)' }}>
                Safe, reliable, and future-ready substation solutions engineered for grid performance, automation, and compliance — for utilities, renewable developers, EPCs, and industrial clients nationwide.
              </p>
              <div className="mb-14 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:flex-wrap">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-jost font-semibold text-white transition-all hover:scale-105 sm:w-auto" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                  Schedule A Call
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link href="tel:813-389-7871" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 font-jost font-semibold text-white transition-all hover:border-white/60 sm:w-auto">
                  813-389-7871
                </Link>
              </div>

              <div className="border-t border-white/10 pt-8">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-5 font-jost font-semibold">Certifications &amp; Memberships</p>
                <div className="block w-full rounded-2xl px-4 py-5 sm:inline-block sm:w-auto sm:px-6" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <img
                    src="/images/cert-logos.png"
                    alt="BBB Accredited IEEE Member NERC Certified FL Licensed"
                    className="h-auto max-h-20 w-full object-contain sm:h-24 sm:w-auto sm:max-h-24"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/new+image-640w.png' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 2. ENGINEERING EXCELLENCE — made prominent ═══ */}
        <section className="py-20 sm:py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost px-3 py-1.5 rounded-full" style={{ color: '#A8228A', background: 'rgba(168,34,138,0.08)' }}>Engineering Excellence</span>
              <h2 className="font-urbanist font-black mb-6 leading-tight" style={{ color: '#06103C', fontSize: 'clamp(2.2rem,4vw,3.25rem)' }}>30+ Years of Electrical Engineering Excellence</h2>
              <p className="font-jost text-gray-600 mb-8 max-w-xl leading-relaxed text-lg">Utility-grade substation design services and electrical engineering, including protection &amp; control, automation, and power system studies, trusted by utilities, EPCs, and energy developers nationwide.</p>
              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {[
                  { src: '/images/services/substation-design/logo-ieee.jpg', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/IEEE-Logo-1920w.jpg', alt: 'IEEE' },
                  { src: '/images/services/substation-design/logo-iec61850.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/61850_logo-1a-1-300x206-1920w.png', alt: 'IEC 61850' },
                  { src: '/images/services/substation-design/logo-nerc.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/nerc-1920w.png', alt: 'NERC' },
                  { src: '/images/services/substation-design/logo-nfpa.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/NFPA-Logo-RBG-2015-1920w.png', alt: 'NFPA' },
                  { src: '/images/services/power-system-studies/logo-psse.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/images-c9692ad1-1920w.png', alt: 'PSS E' },
                  { src: '/images/services/substation-design/logo-etap.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/etap-color-logo-png-1920w.png', alt: 'ETAP' },
                  { src: '/images/services/power-system-studies/logo-pscad.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Logo+-+PSCAD+MHI+BLUE-+2018-1920w.png', alt: 'PSCAD' },
                  { src: '/images/services/substation-design/logo-autocad-alt.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/autocad-logo-png_seeklogo-482394-1920w.png', alt: 'AutoCAD' },
                ].map((l, i) => (
                  <div key={i} className="bg-white border rounded-xl flex items-center justify-center p-3" style={{ borderColor: '#E6E8F0', minHeight: 70 }}>
                    <Img src={l.src} fallback={l.fb} alt={l.alt} className="max-h-10 max-w-full object-contain" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 font-jost mb-8">IEEE | NERC | NFPA | IEC 61850 • ETAP | PSCAD | PSS®E | AutoCAD • Substation Automation &amp; SCADA</p>
              <h3 className="font-urbanist font-bold text-lg mb-3" style={{ color: '#06103C' }}>Trusted by Utilities &amp; Energy Developers</h3>
              <ul className="space-y-2 font-jost text-sm text-gray-600">
                {['Licensed U.S. Professional Electrical Engineers with nationwide substation engineering coverage',
                  'Proven experience supporting utility EMS/DMS integration and ISO/RTO interfaces',
                  'Deep expertise in digital substation design, SCADA integration, and NERC CIP-aware electrical engineering',
                  'Trusted partner for utility-grade substation design services, EPCs, and energy developers nationwide'].map((t, i) => (
                  <li key={i} className="flex gap-2"><span style={{ color: '#A8228A' }}>•</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Img
                  src="/images/services/substation-design/expertise-ee.png"
                  fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-b7a9735b-907h.jpg"
                  alt="Keentel engineers reviewing substation design"
                  className="w-full h-80 sm:h-[28rem] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden sm:block rounded-2xl p-5 shadow-xl" style={{ background: '#06103C' }}>
                <p className="font-urbanist font-black text-3xl text-white">30+</p>
                <p className="font-jost text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Years Experience</p>
              </div>
            </div>
          </div>

        </section>

        <ContactForm />

        <SoftwareCapabilities />

        <div className="flex flex-col">

        {/* ═══ 8. WHAT WE DELIVER — 9 cards ═══ */}
        <section className="order-10 bg-[#EEF1F7] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
              <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#A8228A]">End-to-End Project Delivery</p>
              <h2 className="mb-4 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl lg:text-5xl">What Our Substation Design Services Deliver</h2>
              <p className="font-jost text-base leading-relaxed text-gray-600 sm:text-lg">End-to-end substation design services — from early feasibility through Issue-for-Construction (IFC) packages and commissioning support.</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {[
                { n: '01', t: 'Feasibility & Early Electrical Planning', d: 'Conceptual substation configurations, preliminary studies, and technical assessments supporting interconnection requirements.', img: 'card-01.png', fb: 'Feasibility+-+Early+Electrical+Planning-1920w.png' },
                { n: '02', t: 'Electrical, Protection & Control Engineering', d: 'Primary, secondary, and auxiliary substation electrical systems aligned with utility standards.', img: 'card-02.png', fb: 'Substation+Electrical-+Protection+-+Control+Engineering-1920w.png' },
                { n: '03', t: 'Layouts & Equipment Arrangement', d: 'General arrangements, equipment layouts, electrical clearances, and cable routing designed for constructability.', img: 'card-03.png', fb: 'Electrical+Layouts+-+Equipment+Arrangement-1920w.png' },
                { n: '04', t: 'Power System Studies & Safety', d: 'Comprehensive power system studies including load flow, short-circuit, grounding, arc-flash, and EMT analysis.', img: 'card-04.png', fb: 'Power+System+Studies+-+Safety+Analysis-1920w.png' },
                { n: '05', t: 'SCADA & Substation Automation', d: 'Secure SCADA architectures with EMS/DMS integration and cybersecurity-aware system planning.', img: 'card-05.png', fb: 'SCADA-+Substation+Automation+-+IT+Network+Architecture-1920w.png' },
                { n: '06', t: 'Design Calculations & Drawings', d: 'Construction-ready substation drawings and calculations including schematics, wiring, and logic diagrams.', img: 'card-06.png', fb: 'Design+Calculations+-+Detailed+Electrical+Drawings-1920w.png' },
                { n: '07', t: 'Specifications & Material Packages', d: 'Equipment and material specifications, relay and control requirements, and procurement support.', img: 'card-07.png', fb: 'Electrical+Specifications+-+Material+Packages-1920w.png' },
                { n: '08', t: 'QA/QC, Compliance & IFC Packages', d: 'Independent QA/QC reviews, compliance verification, and complete IFC substation design packages.', img: 'card-08.png', fb: 'QA_QC+-+Standards+Compliance+Reviews-1920w.png' },
                { n: '09', t: 'Construction & Commissioning Support', d: 'Engineering support during installation, testing, energization, and project handover.', img: 'card-09.png', fb: 'Construction-+Testing+-+Commissioning+Support-1920w.png' },
              ].map((c) => (
                <article key={c.n} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#DDE2EC] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#A8228A]/35 hover:shadow-[0_20px_50px_rgba(6,16,60,0.12)]">
                  <div className="h-52 overflow-hidden bg-[#E9ECF2] sm:h-56">
                    <Img src={`/images/services/substation-design/${c.img}`} fallback={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${c.fb}`} alt={c.t} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-5 flex items-center gap-4">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#06103C] font-urbanist text-sm font-black text-white transition-colors duration-300 group-hover:bg-[#A8228A]">{c.n}</span>
                      <div className="h-px flex-1 bg-[#DDE2EC]">
                        <div className="h-px w-10 bg-[#A8228A] transition-all duration-300 group-hover:w-20" />
                      </div>
                    </div>
                    <h3 className="mb-3 font-urbanist text-lg font-bold leading-snug text-[#06103C]">{c.t}</h3>
                    <p className="font-jost text-sm leading-relaxed text-gray-600">{c.d}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 9. EXPLORE OUR EXPERTISE ═══ */}
        <section className="relative order-20 overflow-hidden bg-[#050D32] py-16 sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#A8228A]/20 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
              <div className="max-w-3xl">
                <p className="mb-4 font-jost text-xs font-bold uppercase tracking-[0.22em] text-[#C72E9E]">Integrated Engineering Capabilities</p>
                <h2 className="mb-5 font-urbanist text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">Explore Our Expertise</h2>
                <p className="font-jost text-base leading-relaxed text-white/65 sm:text-lg">Utility-grade substation design services, including electrical engineering, protection &amp; control, SCADA, and power system studies.</p>
              </div>
              <div className="hidden items-center gap-4 border-l border-white/15 pl-8 lg:flex">
                <span className="font-urbanist text-5xl font-black text-white">04</span>
                <span className="max-w-24 font-jost text-xs font-bold uppercase leading-relaxed tracking-widest text-white/45">Integrated Disciplines</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
              {[
                { code: 'EE', t: 'Electrical Engineering & Power System Studies', img: 'expertise-ee.png', fb: 'Electrical+Engineering+-+Power+System+Studies-1920w.png',
                  list: ['Power system studies for substations, including load flow, short-circuit, grounding, and arc-flash analysis', 'Equipment rating verification and electrical system sizing aligned with utility requirements', 'Primary and auxiliary substation electrical design for MV, HV, and EHV systems', 'Interconnection and grid compliance studies supporting utility and ISO/RTO submissions'] },
                { code: 'P&C', t: 'Protection, Control & Automation', img: 'expertise-pc.png', fb: 'Protection-+Control+-+Automation-1920w.png',
                  list: ['Substation protection philosophies and coordination studies', 'Relay selection, configuration, and settings aligned with utility standards', 'IEC 61850 substation automation architectures', 'Protection system testing and commissioning support', 'Fault analysis, event recording, and disturbance monitoring'] },
                { code: 'SCADA', t: 'Substation Automation & IT Systems', img: 'expertise-scada.png', fb: 'SCADA-+Substation+Automation+-+IT+Systems-1920w.png',
                  list: ['SCADA architecture design and RTU / IED integration', 'Utility control center interfaces with EMS/DMS integration', 'Substation LAN / WAN network design', 'NERC CIP-aware system design for secure operations'] },
                { code: 'TEL', t: 'Communications & Network Engineering', img: 'expertise-tel.png', fb: 'Communications+-+Network+Engineering-1920w.png',
                  list: ['Substation fiber-optic and Ethernet communication networks', 'Redundant communication paths for operational reliability', 'Secure network segmentation and traffic separation', 'Renewable facility communications for solar, wind, and BESS projects'] },
              ].map((c, i) => (
                <article key={c.code} className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A1649]/90 transition-all duration-500 hover:-translate-y-1 hover:border-[#C72E9E]/50 hover:shadow-[0_24px_70px_rgba(0,0,0,0.35)] ${i === 0 || i === 3 ? 'lg:col-span-7' : 'lg:col-span-5'}`}>
                  <div className="relative h-52 overflow-hidden sm:h-64">
                    <Img src={`/images/services/substation-design/${c.img}`} fallback={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${c.fb}`} alt={c.t} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07123E] via-[#07123E]/35 to-transparent" />
                    <div className="absolute left-5 top-5 flex items-center gap-3">
                      <span className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/20 bg-[#06103C]/75 px-3 font-jost text-xs font-black tracking-wider text-white backdrop-blur-md">{c.code}</span>
                      <span className="font-jost text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">Capability 0{i + 1}</span>
                    </div>
                    <h3 className="absolute bottom-5 left-5 right-5 font-urbanist text-xl font-black leading-snug text-white sm:bottom-6 sm:left-6 sm:right-6 sm:text-2xl">{c.t}</h3>
                  </div>
                  <div className="relative p-5 sm:p-6">
                    <div className="absolute left-0 top-0 h-px w-24 bg-gradient-to-r from-[#C72E9E] to-transparent" />
                    <ul className="grid grid-cols-1 gap-3 font-jost text-sm leading-relaxed text-white/65 xl:grid-cols-2">
                      {c.list.map((l, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C72E9E] shadow-[0_0_10px_rgba(199,46,158,0.8)]" />
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 10. TYPES OF SUBSTATIONS — 9 cards ═══ */}
        <section className="order-[80] bg-[#F4F6FA] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-6 border-b border-[#DDE1EA] pb-8 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#A8228A]">Substation Portfolio</p>
                <h2 className="mb-4 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl lg:text-5xl">Types of Substations We Design</h2>
                <p className="font-jost text-base leading-relaxed text-gray-600 sm:text-lg">Utility-grade substation design services, including electrical, protection, and automation engineering across all voltage levels and applications.</p>
              </div>
              <div className="flex items-center gap-3 self-start lg:self-auto">
                <span className="font-urbanist text-4xl font-black text-[#06103C]">09</span>
                <span className="max-w-24 font-jost text-[10px] font-bold uppercase leading-relaxed tracking-[0.18em] text-gray-500">Design Applications</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {[
                { t: 'Transmission Substations (69 kV – 500 kV)', d: 'High-voltage transmission substation designs engineered for bulk power transfer, N-1 reliability, and grid stability.', img: 'type-transmission.png', fb: 'Transmission+Substation.jpg-1920w.png' },
                { t: 'Distribution Substations (4 kV – 35 kV)', d: 'Medium-voltage distribution substation designs supporting utility and municipal distribution systems.', img: 'type-distribution.png', fb: 'Distribution+Substations.jpg-1920w.png' },
                { t: 'Solar & Wind Collector Substations', d: 'Optimized collector substation electrical and protection designs for inverter-based renewable resources.', img: 'type-solar-wind.png', fb: 'Solar+-+Wind+Collector+Substations.jpg-1920w.png' },
                { t: 'BESS Interconnections', d: 'Substation designs supporting battery energy storage system interconnections and fast-response operation.', img: 'type-bess.png', fb: 'BESS+Interconnections.jpg-1920w.png' },
                { t: 'Industrial & Commercial Substations', d: 'Reliable substation designs serving data centers, manufacturing plants, and campus-style loads.', img: 'type-industrial.png', fb: 'Industrial+-+Commercial+Substations.jpg-1920w.png' },
                { t: 'GIS & AIS Substations', d: 'Compact GIS designs and traditional AIS substations engineered for operational flexibility and footprint constraints.', img: 'type-gis-ais.png', fb: 'GIS+-+AIS+Substations.jpg-1920w.png' },
                { t: 'Urban Compact & Space-Constrained Substations', d: 'Electrically optimized urban substation designs developed for dense environments and restricted footprints.', img: 'type-urban.png', fb: 'Urban+Compact+-+Space-Constrained+Substations.jpg-1920w.png' },
                { t: 'Brownfield Upgrades & Retrofit Projects', d: 'Substation modernization and retrofit designs supporting equipment replacement and protection upgrades.', img: 'type-brownfield.png', fb: 'Brownfield+Upgrades+-+Retrofit+Projects.jpg-1920w.png' },
                { t: 'Mobile & Temporary Substations', d: 'Rapid-deployment mobile and temporary substation solutions supporting emergency response and restoration.', img: 'type-mobile.png', fb: 'Mobile+-+Temporary+Substations.jpg-1920w.png' },
              ].map((c, i) => (
                <article key={c.t} className="group relative min-h-[310px] overflow-hidden rounded-3xl border border-white bg-[#06103C] shadow-[0_10px_30px_rgba(6,16,60,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(6,16,60,0.18)] sm:min-h-[340px]">
                  <Img src={`/images/services/substation-design/${c.img}`} fallback={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${c.fb}`} alt={c.t} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06103C] via-[#06103C]/65 to-[#06103C]/5" />
                  <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-[#C72E9E] to-[#5B2A86] transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="relative flex min-h-[310px] flex-col justify-between p-5 sm:min-h-[340px] sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full border border-white/20 bg-[#06103C]/55 px-3 py-1.5 font-jost text-[10px] font-bold uppercase tracking-[0.18em] text-white/75 backdrop-blur">Substation Type</span>
                      <span className="font-urbanist text-sm font-black text-white/75">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                      <div className="mb-4 h-px w-12 bg-[#C72E9E] transition-all duration-500 group-hover:w-20" />
                      <h3 className="mb-3 font-urbanist text-xl font-black leading-snug text-white">{c.t}</h3>
                      <p className="font-jost text-sm leading-relaxed text-white/70">{c.d}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 11. DESIGN PROCESS — 8 steps ═══ */}
        <section className="order-[50] bg-white py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Substation Design Process</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12 text-lg leading-relaxed">A clear, step-by-step substation design and engineering workflow aligned with utility standards, constructability, and long-term operational reliability.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { t: 'Requirements & Project Definition', d: 'Evaluation of load growth, voltage class, utility design standards, and protection philosophy.', img: 'step-01.png', fb: 'Requirements+-+Project+Definition-1920w.png' },
                { t: 'Site Analysis & Feasibility', d: 'Geotechnical review, grounding constraints, access planning, EMF considerations.', img: 'step-02.png', fb: 'Site+Analysis+-+Feasibility-1920w.png' },
                { t: 'Conceptual Design', d: 'Preliminary substation layouts, bus configurations, telecom architecture, and early-stage modeling.', img: 'step-03.png', fb: 'Conceptual+Design-1920w.png' },
                { t: 'Detailed Engineering', d: 'Integrated electrical engineering, civil/structural design, grounding, and P&C coordination.', img: 'step-04.png', fb: 'Detailed+Engineering-1920w.png' },
                { t: 'Calculations & IFC Drawings', d: 'Construction-ready calculations, power system studies, IFC drawings, bills of material.', img: 'step-05.png', fb: 'Calculations-+Drawings+-+BOM+Package-1920w.png' },
                { t: 'QA / QC Peer Review', d: 'Independent reviews, compliance verification, and cross-discipline validation.', img: 'step-06.png', fb: 'QA_QC+Peer+Review-1920w.png' },
                { t: 'IFC Submission & Permitting', d: 'Formal utility submissions, authority coordination, comment resolution, and final approvals.', img: 'step-07.png', fb: 'IFC+Submission+-+Permitting-1920w.png' },
                { t: 'Construction & Commissioning Support', d: 'Engineering support for RFIs, relay testing, commissioning, and energization coordination.', img: 'step-08.png', fb: 'Construction+-+Commissioning+Support-1920w.png' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-all duration-300" style={{ borderColor: '#E6E8F0' }}>
                  <div className="h-36 overflow-hidden"><Img src={`/images/services/substation-design/${s.img}`} fallback={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${s.fb}`} alt={s.t} className="w-full h-full object-cover" /></div>
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#A8228A' }}>STEP 0{i + 1}</p>
                    <h4 className="font-urbanist font-bold text-sm mb-1" style={{ color: '#06103C' }}>{s.t}</h4>
                    <p className="font-jost text-gray-500 text-xs leading-relaxed">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 12. WHY CHOOSE US FOR SUBSTATION DESIGN ═══ */}
        <section className="order-[30] bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
              <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#A8228A]">Why Keentel</p>
              <h2 className="mb-4 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl lg:text-5xl">Why Choose Us for Substation Design?</h2>
              <p className="font-jost text-base leading-relaxed text-gray-600 sm:text-lg">Our engineering approach combines deep technical knowledge, regulatory alignment, and constructible delivery — ensuring safer operations and predictable construction outcomes.</p>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
              {[
                { t: 'Proven Engineering Expertise', d: 'Delivered substation projects across utilities, voltage classes, and ISO/RTO regions with consistent, repeatable results.', img: 'why-proven.png', fb: 'Proven+Engineering+Expertise.png-1920w.png' },
                { t: 'Utility-Accepted Standards', d: 'Deliverables aligned to utility templates and compliance requirements to reduce review cycles.', img: 'why-standards.png', fb: 'Utility-Accepted+Standards.png-1920w.png' },
                { t: 'Faster, More Accurate Delivery', d: 'Digital workflows and model-based coordination reduce errors and shorten schedules.', img: 'why-faster.png', fb: 'Faster-+More+Accurate+Delivery.png-1920w.png' },
                { t: 'Deep Renewable & IBR Expertise', d: 'IBR modeling, EMT studies, and inverter-specific protection strategies embedded in our designs.', img: 'why-ibr.png', fb: 'Deep+Renewable+-+IBR+Expertise-1920w.png' },
                { t: 'Fewer Change Orders', d: 'Constructible packages and pre-construction reviews minimize rework and delays.', img: 'why-fewer-orders.png', fb: 'Fewer+Change+Orders.png-1920w.png' },
                { t: 'Nationwide Support', d: 'Licensed engineers across ERCOT, PJM, CAISO, MISO, NYISO, SPP, and municipal utilities.', img: 'why-nationwide.png', fb: 'Nationwide+Support.png-1920w.png' },
              ].map((c, i) => (
                <article key={c.t} className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E6E8F0] bg-[#F8F9FC] transition-all duration-300 hover:-translate-y-1 hover:border-[#A8228A]/35 hover:shadow-[0_18px_45px_rgba(6,16,60,0.10)] sm:flex-row">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#06103C] sm:aspect-auto sm:w-[42%] sm:shrink-0">
                    <Img src={`/images/services/substation-design/${c.img}`} fallback={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${c.fb}`} alt={c.t} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06103C]/35 to-transparent" />
                    <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white font-urbanist text-xs font-black text-[#06103C] shadow-md">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                    <div className="mb-4 h-1 w-10 rounded-full bg-gradient-to-r from-[#A8228A] to-[#5B2A86]" />
                    <h3 className="mb-2 font-urbanist text-lg font-bold leading-snug text-[#06103C]">{c.t}</h3>
                    <p className="font-jost text-sm leading-relaxed text-gray-600">{c.d}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="order-[40]"><SoftwareTools /></div>
        <div className="order-[70]"><ServiceCaseStudies service="substation-design" /></div>

        {/* ═══ 15. RENEWABLE SUBSTATIONS ═══ */}
        <section className="order-[60] py-20 sm:py-24" style={{ background: '#06103C' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost px-3 py-1.5 rounded-full" style={{ color: '#C72E9E', background: 'rgba(199,46,158,0.1)' }}>Renewable Focus</span>
            <h2 className="font-urbanist font-black mb-3 text-white" style={{ fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Substation Design for Renewable Projects</h2>
            <p className="font-jost text-white/70 max-w-3xl mb-12 text-lg leading-relaxed">We deliver high-performance renewable substation engineering built for fast-changing inverter technologies, variable generation, and modern grid requirements.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                ['Solar Collector Systems', 'Substation layouts, grounding, power flow, and protection tailored for high-density solar arrays.'],
                ['Wind Collector Substations', 'Engineered to handle variable wind generation, changing dispatch, and remote collection circuits.'],
                ['BESS + HV Integration', 'Full-scope substation design for hybrid resources, standalone batteries, and high-speed response systems.'],
                ['Inverter–Transformer Coordination', 'Correct matching of inverter output, transformer MVA, impedance, and protection for reliable performance.'],
                ['IBR Ride-Through Requirements', 'Design aligned with PRC, MOD, and evolving IBR interconnection and grid-support requirements.'],
                ['Harmonics & Flicker Mitigation', 'Analysis and design that ensure stable power quality on weak and constrained grids.'],
                ['Low-Short-Circuit Grid Support', 'Fault-level support strategies for weak-grid renewables, including advanced IBR behavior modeling.'],
                ['SCADA & Protocol Integration', 'IEC 61850 architecture, NERC CIP-aligned cybersecurity, and remote monitoring built for solar, wind, and BESS collector substations.'],
                ['POI & Interconnection Studies', 'Power flow, short-circuit, and stability studies to support point of interconnection approval under ERCOT, PJM, MISO, and other ISO planning processes.'],
              ].map(([t, d], i) => (
                <div key={i} className="group rounded-2xl p-6 transition-all hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-urbanist font-black text-sm mb-4 transition-colors group-hover:text-white" style={{ background: 'rgba(199,46,158,0.15)', color: '#C72E9E' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="font-urbanist font-bold text-white mb-2 text-lg leading-snug">{t}</h4>
                  <p className="font-jost text-white/60 text-sm leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <p className="font-jost text-white/60 text-sm mt-10 max-w-3xl">Our renewable-focused substation engineering aligns with the latest inverter-based resource standards, modeling practices, and NERC Level 3 IBR compliance expectations.</p>
          </div>
        </section>

        {/* ═══ 16. FREQUENTLY INCLUDED STUDIES ═══ */}
        <section className="order-[90] bg-white py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Frequently Included Studies</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-10 text-lg leading-relaxed">Most substation and grid-interconnection projects require a core set of power system studies.</p>
            <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: '#E6E8F0' }}>
              <table className="w-full text-sm font-jost min-w-[560px]">
                <thead>
                  <tr style={{ background: '#06103C' }}>
                    <th className="text-white text-left p-4 text-xs uppercase tracking-widest">Study</th>
                    <th className="text-white text-left p-4 text-xs uppercase tracking-widest">Purpose</th>
                    <th className="text-white text-left p-4 text-xs uppercase tracking-widest">Required For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['LF', 'Load Flow', 'Validate system capacity and identify thermal or voltage constraints.', 'Utilities, developers, and large-load customers.'],
                    ['SC', 'Short Circuit', 'Confirm breaker duties and protection coordination.', 'All substations and major equipment additions.'],
                    ['AF', 'Arc-Flash', 'Quantify incident energy and define safe working boundaries.', 'OSHA, NFPA 70E, and utility safety programs.'],
                    ['GR', 'Grounding', 'Verify touch and step voltages and grid performance.', 'IEEE 80 and utility requirements.'],
                    ['HM', 'Harmonics', 'Assess harmonic distortion from inverter-based resources.', 'Solar, wind, BESS, and IBR-heavy projects.'],
                    ['IC', 'Insulation Coordination', 'Select BIL levels and surge protection.', 'High-voltage and transmission-class substations.'],
                  ].map(([badge, name, purpose, req], i) => (
                    <tr key={i} className="border-t" style={{ borderColor: '#E6E8F0' }}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs border flex-shrink-0" style={{ borderColor: '#E6E8F0', color: '#06103C' }}>{badge}</div>
                          <span className="font-bold" style={{ color: '#06103C' }}>{name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{purpose}</td>
                      <td className="p-4 text-gray-600">{req}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="order-[100] bg-[#F6F7FB] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl sm:mb-12">
              <p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#A8228A]">Project Planning</p>
              <h2 className="mb-4 font-urbanist text-3xl font-black text-[#06103C] sm:text-4xl">Pricing &amp; Timeline Overview</h2>
              <p className="font-jost text-base leading-relaxed text-gray-600 sm:text-lg">Substation engineering schedules and fees depend on voltage class, project stage, utility requirements, site conditions, and the number of technical disciplines involved.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {[
                { phase: 'Concept & Feasibility', timeline: '4–8 Weeks', detail: 'Basis-of-design development, preliminary layouts, utility requirements review, and early technical studies.' },
                { phase: 'Detailed Engineering', timeline: '12–24 Weeks', detail: 'Integrated electrical, protection, SCADA, civil coordination, calculations, specifications, and drawing packages.' },
                { phase: 'IFC & Construction Support', timeline: 'Project Dependent', detail: 'Final utility comments, permit-ready deliverables, RFIs, commissioning support, and energization coordination.' },
              ].map((item, index) => (
                <article key={item.phase} className="rounded-2xl border border-[#E6E8F0] bg-white p-6 sm:p-7">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="font-urbanist text-sm font-black text-[#A8228A]">0{index + 1}</span>
                    <span className="rounded-full bg-[#A8228A]/10 px-3 py-1 font-jost text-xs font-bold text-[#A8228A]">{item.timeline}</span>
                  </div>
                  <h3 className="mb-3 font-urbanist text-xl font-bold text-[#06103C]">{item.phase}</h3>
                  <p className="font-jost text-sm leading-relaxed text-gray-600">{item.detail}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-[#E6E8F0] bg-white p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h3 className="mb-2 font-urbanist text-xl font-bold text-[#06103C]">How project pricing is established</h3>
                  <p className="font-jost text-sm leading-relaxed text-gray-600 sm:text-base">We prepare a scope-specific proposal after confirming voltage level, deliverables, study requirements, schedule, utility review cycles, and construction-support needs. This keeps pricing aligned with the actual engineering effort instead of using a generic package rate.</p>
                </div>
                <Link href="/contact" className="inline-flex w-full items-center justify-center rounded-full bg-[#A8228A] px-7 py-3.5 font-jost font-semibold text-white transition-transform hover:-translate-y-0.5 sm:w-auto">Request Project Pricing</Link>
              </div>
            </div>
          </div>
        </section>

        <div className="order-[130]"><WhoWeServed /></div>

        <section className="order-[110] bg-white py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl p-6 text-center sm:p-10 lg:p-12" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 100%)' }}>
              <h3 className="mb-3 font-urbanist text-2xl font-black text-white sm:text-3xl">Download our Substation Design Services flyer</h3>
              <p className="mx-auto mb-8 max-w-xl font-jost text-white/70">Please click the Download button to get our Substation Design Services flyer.</p>
              <a href="/files/substation-design.pdf" target="_blank" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#A8228A] px-8 py-4 font-jost font-semibold text-white transition-all hover:scale-105 sm:w-auto">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download The Flyer
              </a>
            </div>
          </div>
        </section>

        {/* ═══ 18. WE GO ABOVE AND BEYOND ═══ */}
        <section className="relative order-[120] overflow-hidden bg-[#06103C] py-16 sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#A8228A]/15 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#C72E9E]">Built for Long-Term Reliability</p>
                <h2 className="mb-6 font-urbanist text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">We Go Above and Beyond</h2>
                <p className="mb-4 font-jost text-base leading-relaxed text-white/75 sm:text-lg">We stay current on the latest utility and smart grid standards. Our engineers design substations that are built for future expansion, automation, and integration with digital relays, smart SCADA, and real-time monitoring systems.</p>
                <p className="mb-4 font-jost text-base leading-relaxed text-white/75 sm:text-lg">We don&apos;t just meet specs, we shape systems that align with your long-term grid strategy.</p>
                <p className="mb-8 font-jost text-sm text-white/60 sm:text-base">For more information or service assistance, call us on <a href="tel:813-389-7871" className="font-semibold text-white underline decoration-[#C72E9E] decoration-2 underline-offset-4">813-389-7871</a>.</p>
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#C72E9E] to-[#A8228A] px-8 py-4 font-jost font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto">Book Strategy Call</Link>
                  <Link href="/contact" className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-8 py-4 font-jost font-semibold text-white transition-all hover:border-white hover:bg-white/10 sm:w-auto">Get a Quote</Link>
                </div>
              </div>
              <div className="relative">
                <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                  <Img src="/images/services/substation-design/type-transmission.png" fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Transmission+Substation.jpg-1920w.png" alt="High-voltage transmission substation engineered for long-term reliability" className="h-72 w-full object-cover sm:h-[430px]" />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#06103C]/45 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-white/15 bg-[#0B1A5B]/95 p-5 shadow-xl backdrop-blur sm:left-6 sm:right-auto sm:max-w-xs">
                  <p className="font-urbanist text-lg font-bold text-white">Future-Ready by Design</p>
                  <p className="mt-1 font-jost text-sm leading-relaxed text-white/65">Reliable today, adaptable for tomorrow&apos;s grid.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 19. FAQ — exact homepage FAQ.tsx design ═══ */}


        <div className="order-[140]">
          <FaqSection
            eyebrow="Questions We Hear"
            heading="Answers,"
            headingLine2="before you ask."
            intro="30 years of client questions. Here are the ones that come up every time for substation design."
            items={faqs}
          />
        </div>
        </div>
      </main>
      <RelatedServiceBlogs terms={["substation","protection","transformer"]} />
      <Footer />
    </>
  )
}
