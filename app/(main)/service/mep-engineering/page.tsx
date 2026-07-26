'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
import SoftwareTools from '@/components/sections/SoftwareTools'
import SoftwareCapabilities from '@/components/sections/SoftwareCapabilities'
import Industries from '@/components/sections/Industries'
import WhoWeServed from '@/components/service/WhoWeServed'
import RelatedServiceBlogs from '@/components/service/RelatedServiceBlogs'
import ServiceCaseStudies from '@/components/service/ServiceCaseStudies'
import { client } from '@/lib/sanity'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  category: string
  mainImage?: { asset: { url: string } }
}

interface CaseStudy {
  _id: string
  title: string
  slug: { current: string }
  category: string
  cardImage?: string
  excerpt?: string
}

function FaqAccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer" style={{ border: `1.5px solid ${open ? '#A8228A' : '#E6E8F0'}`, boxShadow: open ? '0 4px 24px rgba(168,34,138,0.1)' : 'none' }} onClick={() => setOpen(!open)}>
      <div className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6">
        <span className="font-urbanist font-black text-xl sm:text-2xl flex-shrink-0 w-7 sm:w-8" style={{ color: open ? '#A8228A' : '#E6E8F0' }}>{String(index + 1).padStart(2, '0')}</span>
        <h4 className="font-urbanist font-bold text-base sm:text-xl leading-snug flex-1" style={{ color: '#0B1230' }}>{q}</h4>
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300" style={{ background: open ? '#A8228A' : '#F6F7FB', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: open ? '#fff' : '#A8228A' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
        </div>
      </div>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '260px' : '0px' }}>
        <p className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[52px] sm:pl-[72px] text-sm sm:text-base font-jost leading-relaxed" style={{ color: '#4B5563' }}>{a}</p>
      </div>
    </div>
  )
}

function FaqSection({ eyebrow, heading, headingLine2, intro, items }: { eyebrow: string; heading: string; headingLine2?: string; intro: string; items: { q: string; a: string }[] }) {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-widest mb-4 font-jost" style={{ color: '#A8228A' }}>{eyebrow}</p>
            <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6" style={{ color: '#0B1230' }}>{heading}{headingLine2 && <><br />{headingLine2}</>}</h2>
            <p className="text-base font-jost leading-relaxed mb-8" style={{ color: '#4B5563' }}>{intro}</p>
            <a href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-jost font-semibold text-white px-7 py-4 rounded-full transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
              Ask Us Directly
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

const whyChoose = [
  { t: 'Multidisciplinary Delivery', d: 'In-house experts across HVAC, electrical, and plumbing ensure cohesive designs that reduce coordination delays and costly field changes.' },
  { t: 'BIM-Driven Coordination', d: 'Our Revit-based workflows and clash detection modeling improve constructability, reduce RFIs, and align MEP systems with architectural and structural elements.' },
  { t: 'Code-Compliant, Future-Ready Systems', d: 'We design every system to meet ASHRAE, NEC, NFPA, IPC, and IECC standards — supporting inspection approval, operational safety, and energy performance goals.' },
  { t: 'Cost-Effective MEP Design Services', d: 'We optimize systems not just for performance but also for budget, lifecycle efficiency, and maintenance simplicity.' },
  { t: 'Client-First Process', d: 'From concept through commissioning, our team communicates transparently, resolves technical risks early, and tailors every solution to your facility\u2019s unique needs.' },
]

const electricalCards = [
  { t: 'Electrical Design Services', d: 'Complete electrical design coordinated with architectural, structural, mechanical, and plumbing systems.', img: '/images/services/mep-engineering/Electrical Design Services.jpg' },
  { t: 'Electrical System Analysis & Optimization', d: 'Load flow, short-circuit, protection coordination, arc-flash, and power-quality analysis for safe, reliable performance.', img: '/images/services/mep-engineering/Electrical System Analysis & Optimization.webp' },
  { t: 'Power Distribution Solutions', d: 'Medium- and low-voltage distribution, transformers, switchgear, panelboards, feeders, and equipment layouts designed around facility demand.', img: '/images/services/mep-engineering/Power Distribution Solutions.webp' },
  { t: 'Lighting Systems & Smart Controls', d: 'Energy-efficient interior, exterior, and emergency lighting with automated controls supporting safety and productivity.', img: '/images/services/mep-engineering/Lighting Systems & Smart Controls.jpg' },
  { t: 'Emergency Power & Backup Systems', d: 'Generators, UPS systems, transfer schemes, and critical-power distribution engineered for operational continuity.', img: '/images/services/mep-engineering/Emergency Power & Backup Systems.jpg' },
  { t: 'Electrical Code Compliance', d: 'Designs aligned with NEC, NFPA, energy codes, and local requirements for permitting, inspection, and safe operation.', img: '/images/services/mep-engineering/Electrical Code Compliance.jpg' },
  { t: 'Security Systems Integration', d: 'Coordinated power and pathways for access control, surveillance, intrusion detection, communications, and security infrastructure.', img: '/images/services/mep-engineering/Security Systems Integration.webp' },
  { t: 'MEP BIM Modeling', d: 'Coordinated BIM models and clash detection improve constructability, reduce field conflicts, and align all building-system disciplines.', img: '/images/services/mep-engineering/MEP BIM Modeling.jpg' },
]

const mechanicalCards = [
  { t: 'HVAC System Design', d: 'We specialize in HVAC system design for temperature control, air quality, and long-term energy savings — from ductwork layout to system sizing and VRF integration.' },
  { t: 'Mechanical Systems Analysis & Optimization', d: 'We use advanced software tools to simulate and assess mechanical performance, recommending data-driven improvements that boost efficiency and extend asset life.' },
  { t: 'Energy-Efficient Mechanical Design', d: 'Our systems incorporate renewable energy, green building practices, and energy modeling tools to meet LEED and sustainability goals.' },
  { t: 'Regulatory Code Compliance', d: 'Every mechanical design follows the latest ASHRAE, IECC, and local mechanical codes, ensuring approval readiness for inspections and permitting.' },
]

const mechanicalIconPaths = [
  'M4 8h16M4 12h16M4 16h10M7 5v14m10-14v8',
  'M4 17l4-5 4 3 6-8m0 0h-4m4 0v4',
  'M12 3c4 3 6 6 6 10a6 6 0 11-12 0c0-3 2-6 6-10zm0 6v8m-3-4h6',
  'M7 3h8l3 3v15H7V3zm3 6h5m-5 4h5m-5 4h3',
]

const faqs = [
  { q: 'What is MEP engineering?', a: 'MEP engineering refers to the integrated design and management of the Mechanical, Electrical, and Plumbing systems within a building or infrastructure project, ensuring comfort, safety, and functionality.' },
  { q: 'Why is MEP engineering important for construction projects?', a: 'It ensures comfort, optimizes energy use, enhances safety, ensures regulatory compliance, and supports sustainable building practices.' },
  { q: 'What types of projects require MEP engineering services?', a: 'Commercial buildings, residential buildings, industrial facilities, healthcare facilities, educational institutions, public infrastructure, and data centers.' },
  { q: 'How do you ensure energy efficiency in MEP designs?', a: 'Through optimized HVAC systems, energy-efficient lighting, building energy modeling, water efficiency measures, and renewable energy integration.' },
  { q: 'How much do MEP design services cost for a warehouse or industrial facility?', a: 'Pricing typically ranges from $1.50 to $3.00 per square foot depending on project size, complexity, and system requirements. Contact us for a detailed quote.' },
  { q: 'How long does it take to complete MEP engineering plans?', a: 'Typical designs take 2\u20136 weeks depending on project size, coordination needs, and permitting timelines. Fast-track delivery is available for urgent projects.' },
]

export default function MEPEngineeringPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost" && (
        category match "*MEP*" || category match "*HVAC*"
        || category match "*mechanical*" || category match "*electrical*" || category match "*plumbing*"
      )] | order(publishedAt desc) [0...6] {
        _id, title, slug, publishedAt, excerpt, "category": category->title,
        "mainImage": mainImage { asset->{ url } }
      }`
    ).then(data => {
      if (data.length >= 3) { setBlogs(data); return }
      client.fetch<BlogPost[]>(
        `*[_type == "blogPost"] | order(publishedAt desc) [0...6] {
          _id, title, slug, publishedAt, excerpt, "category": category->title,
          "mainImage": mainImage { asset->{ url } }
        }`
      ).then(setBlogs).catch(() => {})
    }).catch(() => {})
  }, [])

  useEffect(() => {
    client.fetch<CaseStudy[]>(
      `*[_type == "caseStudy" && (relatedService == "mep-engineering")] | order(_createdAt desc) [0...3] {
        _id, title, slug, relatedService,
        cardImage,
        "excerpt": challenge
      }`
    ).then(setCaseStudies).catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName, last_name: formData.lastName, phone: formData.phone,
          email: formData.email, service: 'MEP Engineering Services',
          message: formData.message, source: 'mep-engineering',
        }),
      })
      if (res.ok) { setFormStatus('success'); setFormData({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' }) }
      else setFormStatus('error')
    } catch { setFormStatus('error') }
  }

  const blogImageUrl = (post: BlogPost) => post.mainImage?.asset?.url || `https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-96f20648-1920w.png`

  return (
    <>
      <Header />
      <main>

{/* ═══ 1. HERO ═══ */}
        <section className="relative min-h-[75vh] sm:min-h-[80vh] flex items-center overflow-hidden" style={{ background: '#06103C' }}>
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/videos/MEP Engineering Services.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 w-full">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <Link href="/services" className="text-xs font-semibold uppercase tracking-widest font-jost" style={{ color: '#C72E9E' }}>Services</Link>
                <span className="text-white/30">/</span>
                <span className="text-white/50 text-xs font-jost">MEP Engineering Services</span>
              </div>
              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.5rem)' }}>MEP Engineering Services</h1>
              <p className="font-jost text-white/90 mb-10 max-w-3xl leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)' }}>
                From HVAC and electrical systems to plumbing, fire protection, and energy modeling, we deliver high-quality MEPF engineering services across North America — optimized for warehouse, industrial, and commercial facilities, including retrofitting, upgrades, and sustainable systems.
              </p>
              <div className="flex flex-wrap gap-4 mb-14 sm:mb-16">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule A Call</Link>
              </div>

              <div className="border-t border-white/10 pt-8">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-5 font-jost font-semibold">Certifications &amp; Memberships</p>
                <div className="inline-block rounded-2xl px-6 py-5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <img
                    src="/images/cert-logos-hero-white-spaced-v3.png"
                    alt="BBB Accredited IEEE Member NERC Certified FL Licensed"
                    className="h-20 sm:h-24 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/new+image-640w.png' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 2. OVERVIEW ═══ */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 font-urbanist font-black leading-tight text-[#06103C] text-3xl sm:text-4xl">MEP Engineering Services for Industrial and Warehouse Facilities</h2>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-jost text-gray-600 leading-relaxed mb-6 text-lg">We specialize in MEP engineering services for industrial plants, warehouse buildings, and large-scale commercial projects. From retrofitting MEP systems to energy efficiency upgrades, we design infrastructure that meets operational demands and evolving energy codes.</p>
            <ul className="space-y-2 font-jost text-sm text-gray-600">
              {['Custom MEP layouts for warehouse cooling and ventilation', 'High-load electrical system coordination for industrial sites', 'Stormwater, gas piping, and sanitary design', 'BIM-based modeling, clash detection, and design optimization'].map((t, i) => (
                <li key={i} className="flex gap-2"><span style={{ color: '#A8228A' }}>•</span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-2xl"><img src="/images/services/mep-engineering/MEP Engineering Services.jpg" alt="MEP engineers coordinating electrical and mechanical building systems" className="h-72 w-full object-cover sm:h-96" /></div>
          </div>
          </div>
        </section>

        <ContactForm />
        <SoftwareTools />
        <SoftwareCapabilities />
        <Industries />
        <ServiceCaseStudies service="mep-engineering" />

        {/* Integrated MEP delivery */}
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div>
              <p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#A8228A]">Integrated Project Delivery</p>
              <h2 className="mb-5 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl">Integrated MEP Engineering Services for Complex Facility Projects</h2>
              <p className="mb-5 font-jost text-base leading-relaxed text-gray-600 sm:text-lg">Mechanical, electrical, plumbing, fire protection, controls, and BIM coordination work best as one connected design process. Our multidisciplinary team resolves system interfaces early, improving constructability and reducing costly field changes.</p>
              <p className="font-jost text-base leading-relaxed text-gray-600 sm:text-lg">From concept and load assessment through detailed design, permitting, construction support, and commissioning, Keentel delivers coordinated documents aligned with facility operations, energy targets, and applicable codes.</p>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img src="/images/services/mep-engineering/Integrated MEP Engineering Services for Complex Facility Projects.jpg" alt="Integrated MEP engineering for a complex industrial facility" className="h-80 w-full object-cover sm:h-[440px]" />
            </div>
          </div>
        </section>

        {/* Coordinated MEP delivery pillars */}
        <section className="py-20 sm:py-24" style={{ background: '#06103C' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#E548B5]">Coordinated Engineering</p>
              <h2 className="mb-4 font-urbanist text-3xl font-black leading-tight text-white sm:text-4xl">One Team for Complete MEP System Delivery</h2>
              <p className="font-jost text-base leading-relaxed text-white/70 sm:text-lg">Integrated disciplines, rigorous reviews, and constructible documents help projects move from design through installation with fewer conflicts.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { t: 'Electrical System Design', d: 'Coordinated distribution, lighting, controls, and critical-power systems designed around facility loads and operating requirements.', img: '/images/services/mep-engineering/Electrical System Design.webp' },
                { t: 'Mechanical Design Services', d: 'HVAC, ventilation, controls, and energy strategies developed for occupant comfort, process needs, and lifecycle efficiency.', img: '/images/services/mep-engineering/Mechanical Design Services.jpg' },
                { t: 'Integrated MEP Coordination', d: 'Mechanical, electrical, plumbing, fire protection, and BIM teams work together to resolve interfaces before construction.', img: '/images/services/mep-engineering/MEP Engineering.jpg' },
                { t: 'Quality Assurance & Safety', d: 'Independent checks, code reviews, and disciplined QA/QC improve document accuracy, permitting readiness, and system safety.', img: '/images/services/mep-engineering/Quality Assurance & Safety.webp' },
              ].map((c) => (
                <article key={c.t} className="group overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="overflow-hidden"><img src={c.img} alt={c.t} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                  <div className="p-6"><h3 className="mb-3 font-urbanist text-lg font-bold text-[#06103C]">{c.t}</h3><p className="font-jost text-sm leading-relaxed text-gray-600">{c.d}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Electrical engineering services restored from the original page */}
        <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#A8228A]">Electrical</p>
              <h2 className="mb-4 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl">Electrical Engineering Services</h2>
              <p className="font-jost text-base leading-relaxed text-gray-600 sm:text-lg">Safe, reliable, and code-compliant electrical systems engineered for demanding industrial, warehouse, and commercial facilities.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {electricalCards.map((c) => (
                <article key={c.t} className="group overflow-hidden rounded-2xl border border-[#E6E8F0] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="overflow-hidden"><img src={c.img} alt={c.t} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                  <div className="p-6"><h3 className="mb-3 font-urbanist text-lg font-bold leading-snug text-[#06103C]">{c.t}</h3><p className="font-jost text-sm leading-relaxed text-gray-600">{c.d}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>


        {/* ═══ 3. WHY CHOOSE — branded two-column ═══ */}
        <section className="hidden" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#C72E9E' }}>Why Keentel</span>
                <h2 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Why Choose Keentel for MEP Engineering Services</h2>
                <p className="font-jost text-white/70 text-lg leading-relaxed mb-8">We bring 30+ years of cross-discipline expertise to every MEP engineering project, delivering fully integrated mechanical, electrical, and plumbing solutions.</p>
                <Link href="/about" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                  Learn More About Us
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8" style={{ background: 'linear-gradient(160deg, rgba(168,34,138,0.12), rgba(91,42,134,0.12))', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="space-y-4">
                  {whyChoose.map((c, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 font-urbanist font-black text-white" style={{ background: '#A8228A' }}>{i + 1}</div>
                      <div>
                        <p className="font-urbanist font-bold text-white text-base sm:text-lg mb-1">{c.t}</p>
                        <p className="font-jost text-white/65 text-sm leading-relaxed">{c.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 4. MECHANICAL ENGINEERING SERVICES ═══ */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
              <span className="mb-4 inline-block font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#A8228A]">Mechanical</span>
              <h2 className="mb-4 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl lg:text-5xl">Mechanical Engineering Services</h2>
              <p className="mb-5 font-urbanist text-lg font-medium leading-snug text-[#5B2A86] sm:text-xl">For Industrial, Warehouse &amp; Commercial Facilities</p>
              <p className="mx-auto max-w-3xl font-jost text-base leading-relaxed text-gray-600 sm:text-lg">We deliver high-performance mechanical engineering services for industrial, warehouse, and commercial clients across the United States.</p>
            </div>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {mechanicalCards.map((c, i) => (
                <article key={i} className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[#DDE2EE] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#A8228A] sm:p-7">
                  <div className="absolute inset-x-0 top-0 h-1 bg-[#06103C] transition-colors duration-300 group-hover:bg-[#A8228A]" />
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F1F3F8] text-[#06103C] transition-colors duration-300 group-hover:bg-[#A8228A] group-hover:text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={mechanicalIconPaths[i]} /></svg>
                  </div>
                  <h3 className="mb-3 font-urbanist text-xl font-bold leading-snug text-[#06103C]">{c.t}</h3>
                  <p className="font-jost text-base leading-relaxed text-gray-600">{c.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6. CASE STUDIES — dynamic from Sanity, this service only ═══ */}
        <section className="hidden" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Real Projects</span>
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Case Studies</h2>
            <p className="font-jost text-gray-600 text-lg mb-12">MEP Engineering by Keentel Engineering</p>
            {false && caseStudies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {caseStudies.map((cs) => (
                  <Link key={cs._id} href={`/our-work/${cs.slug.current}`} className="group rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ borderColor: '#E6E8F0' }}>
                    <div className="relative h-52 overflow-hidden flex items-center justify-center" style={{ background: '#F6F7FB' }}>
                      {cs.cardImage ? (
                        <img src={cs.cardImage} alt={cs.title} className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #06103C, #1a1050)' }}>
                          <span className="font-urbanist font-black text-white/20 text-6xl">MEP</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-urbanist font-bold text-lg mb-3 leading-snug" style={{ color: '#06103C' }}>{cs.title}</h3>
                      {cs.excerpt && <p className="font-jost text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{cs.excerpt}</p>}
                      <span className="inline-flex items-center gap-2 text-sm font-semibold font-jost" style={{ color: '#A8228A' }}>
                        See Full Case Study
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="font-jost text-gray-400 mb-10">Case studies coming soon.</p>
            )}
            <div className="text-center">
              <Link href="/our-work" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold border-2 transition-all hover:bg-gray-50" style={{ borderColor: '#06103C', color: '#06103C' }}>
                See All Case Studies
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ 7. GET IN TOUCH — full redesign ═══ */}


        {/* ═══ 8. OUR CLIENTS — redesigned ═══ */}


        {/* ═══ 9. FINAL CTA — prominent desc ═══ */}
        <section className="py-20 sm:py-24" style={{ background: '#06103C' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#C72E9E' }}>Get Started</span>
            <h2 className="font-urbanist font-black mb-5 text-white leading-tight" style={{ fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Ready to Power Your Next Facility with Precision-Engineered MEP Solutions?</h2>
            <p className="font-jost text-white/85 max-w-3xl mx-auto mb-8 leading-relaxed" style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)' }}>
              Whether you&apos;re planning a new industrial plant, retrofitting a warehouse, or upgrading commercial infrastructure, we deliver cost-effective, code-compliant, and energy-efficient MEPF engineering services tailored to your project&apos;s demands.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule A Consultation</Link>
              <Link href="tel:813-389-7871" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/25 hover:border-white/60 transition-all">813-389-7871</Link>
            </div>
          </div>
        </section>

        {/* ═══ 10. FAQ — homepage match ═══ */}


        {/* ═══ 11. BLOGS — prominent date, full image ═══ */}
        {false && blogs.length > 0 && (
          <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Technical Reading</span>
                  <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl" style={{ color: '#06103C' }}>MEP Engineering – Blogs</h2>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-2 font-jost font-semibold text-sm" style={{ color: '#A8228A' }}>
                  View All Articles
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((post) => (
                  <Link key={post._id} href={`/${post.slug.current}`} className="group block bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ borderColor: '#E6E8F0' }}>
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      <img src={blogImageUrl(post)} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-96f20648-1920w.png' }} />
                      <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full font-jost text-xs font-bold text-white" style={{ background: '#A8228A' }}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="font-jost text-xs text-gray-400 mb-2 uppercase tracking-wide font-semibold">{post.category}</p>
                      <h3 className="font-urbanist font-bold text-lg mb-3 leading-snug line-clamp-2" style={{ color: '#06103C' }}>{post.title}</h3>
                      <p className="font-jost text-gray-600 text-sm leading-relaxed line-clamp-3 mb-5">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-2 font-jost text-sm font-semibold" style={{ color: '#A8228A' }}>
                        Read More
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <WhoWeServed />
        <FaqSection
          eyebrow="Questions We Hear"
          heading="Answers,"
          headingLine2="before you ask."
          intro="The MEP engineering questions facility owners and developers ask us most."
          items={faqs}
        />
      </main>
      <RelatedServiceBlogs terms={["MEP","electrical design","industrial"]} />
      <Footer />
    </>
  )
}
