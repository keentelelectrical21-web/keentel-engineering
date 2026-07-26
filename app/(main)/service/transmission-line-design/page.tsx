'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
import SoftwareTools from '@/components/sections/SoftwareTools'
import SoftwareCapabilities from '@/components/sections/SoftwareCapabilities'
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

function Img({ src, fallback, alt, className }: { src: string; fallback: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={className} onError={(e) => { (e.target as HTMLImageElement).src = fallback }} />
}

function FaqAccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer" style={{ border: `1.5px solid ${open ? '#A8228A' : '#E6E8F0'}`, boxShadow: open ? '0 4px 24px rgba(168,34,138,0.1)' : 'none' }} onClick={() => setOpen(!open)}>
      <div className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6">
        <span className="font-urbanist font-black text-xl sm:text-2xl flex-shrink-0 w-7 sm:w-8" style={{ color: '#0B1230' }}>{String(index + 1).padStart(2, '0')}</span>
        <h4 className="font-urbanist font-bold text-base sm:text-xl leading-snug flex-1" style={{ color: '#0B1230' }}>{q}</h4>
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300" style={{ background: open ? '#A8228A' : '#F6F7FB', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: open ? '#fff' : '#A8228A' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
        </div>
      </div>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '520px' : '0px' }}>
        <p className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[52px] sm:pl-[72px] text-sm sm:text-base font-jost leading-relaxed" style={{ color: '#4B5563' }}>{a}</p>
      </div>
    </div>
  )
}

function FaqSection({ eyebrow, heading, headingLine2, intro, items }: { eyebrow: string; heading: string; headingLine2?: string; intro: string; items: { q: string; a: string }[] }) {
  return (
    <section className="py-12 sm:py-16 bg-white">
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

const capabilities = [
  { t: 'Line Routing & Corridor Optimization', d: 'Terrain-based route optimization, ROW analysis, constraint mapping, GIS-integrated alignment studies, and multi-route feasibility comparisons.', img: 'cap-routing.webp' },
  { t: 'Structural Design & Modeling', d: 'Transmission towers (lattice, monopole, H-frame), distribution poles, foundations, insulator assemblies, and structural integrity validation.', img: 'cap-structural.webp' },
  { t: 'Conductor & Ground Wire Design', d: 'Ampacity, thermal and mechanical strength, corona/RI considerations, conductor selection (ACSR, AAAC, ACSS), and shield wire / OPGW design.', img: 'cap-conductor.webp' },
  { t: 'Sag-Tension & Mechanical Analysis', d: 'Sag and tension under multiple loading conditions, wind/ice loading, clearance checks, and NESC/IEC/IEEE compliance.', img: 'cap-sag-tension.jpg' },
  { t: 'Electrical Design & System Integration', d: 'Voltage profile, insulation coordination, lightning protection, grounding/bonding, EMF studies, and loss minimization.', img: 'cap-electrical.jpg' },
  { t: 'Digital Modeling & Intelligent Engineering', d: '2D construction drawings, 3D intelligent models, data-rich digital twins, material specs, and clash detection.', img: 'cap-digital-modeling.webp' },
  { t: 'Automated Engineering Calculations', d: 'Automated sag-tension reports, load calculations, structural loading reports, BOM generation, and compliance documentation.', img: 'cap-calculations.webp' },
  { t: 'Multi-Standard & Global Compliance', d: 'NESC, NEC, IEEE, IEC standards, and utility/ISO/RTO requirements across ERCOT, PJM, CAISO, SPP, and WECC.', img: 'cap-compliance.webp' },
  { t: 'Visualization & Stakeholder Engagement', d: '3D project views, construction simulation for phasing analysis, client presentation visuals, and faster regulatory approvals.', img: 'cap-visualization.webp' },
]

const processSteps = [
  { t: 'Project Definition', d: 'Scope development, load and system requirements, voltage and capacity analysis.' },
  { t: 'Conceptual Design', d: 'Route selection, preliminary structure layout, feasibility studies.' },
  { t: 'Detailed Engineering', d: 'Structural and electrical design, sag-tension analysis, grounding and protection design.' },
  { t: 'Digital Modeling', d: '2D + 3D model development, design validation, coordination with other disciplines.' },
  { t: 'Construction Deliverables', d: 'Issued-for-construction (IFC) drawings, material lists, engineering reports.' },
  { t: 'Project Support', d: 'Engineering review during construction, field issue resolution, design updates.' },
]

const industries = [
  { t: 'Utility Companies', img: '/images/services/power-system-studies/industry-utilities.jpg' },
  { t: 'Renewable Energy Developers', img: '/images/services/power-system-studies/industry-renewable.jpg' },
  { t: 'Transmission Developers', img: '/images/services/transmission-line-design/renewable-towers.webp' },
  { t: 'Industrial & Manufacturing Facilities', img: '/images/industries/hub/industrial-manufacturing.webp' },
  { t: 'EPC Contractors', img: '/images/industries/hub/oil-gas-mining.jpg' },
  { t: 'Municipal & Public-Sector Utilities', img: '/images/industries/hub/data-centers.jpg' },
]

const faqs = [
  { q: 'What is transmission line design?', a: 'Transmission line design involves engineering the physical and electrical components required to transfer electrical power safely and efficiently from one location to another.' },
  { q: 'What factors influence transmission line design?', a: 'Key factors include voltage level, terrain, conductor type, environmental conditions, mechanical loading, and regulatory requirements.' },
  { q: 'What is sag-tension analysis?', a: 'Sag-tension analysis determines how conductors behave under different loads such as temperature, wind, and ice, ensuring safe clearances and structural stability.' },
  { q: 'Why is 3D modeling important in transmission design?', a: '3D modeling improves accuracy, enables clash detection, enhances visualization, and supports better coordination among engineering teams.' },
  { q: 'What standards are used in transmission line design?', a: 'Common standards include NESC, IEEE, IEC, NEC, and utility-specific requirements.' },
  { q: 'How does digital design improve project efficiency?', a: 'Digital design connects calculations, drawings, models, and material data so teams can identify conflicts earlier, automate repetitive work, and issue coordinated construction packages faster.' },
  { q: 'What is a digital twin in transmission projects?', a: 'A digital twin is a data-rich virtual representation of the line, structures, conductors, and corridor. It supports design validation, stakeholder coordination, construction planning, and future asset management.' },
  { q: 'How are transmission lines optimized for cost?', a: 'We compare route constraints, structure spacing, conductor options, loading cases, foundation requirements, losses, and constructability to find a compliant lifecycle solution—not simply the lowest initial material cost.' },
  { q: 'What types of transmission structures are used?', a: 'Projects may use lattice towers, steel or concrete monopoles, H-frame structures, wood poles, guyed structures, and specialized dead-end or angle structures depending on voltage, loading, terrain, and utility standards.' },
  { q: 'Do you support renewable energy interconnections?', a: 'Yes. Keentel specializes in collector systems and interconnection design for solar, wind, and battery energy storage projects.' },
  { q: 'How do environmental factors affect design?', a: 'Wind, ice, temperature, terrain, flooding, corrosion, wildfire exposure, access, and permitting constraints influence conductor behavior, structural loading, foundation selection, clearances, routing, and construction methods.' },
  { q: 'What deliverables are provided?', a: 'Deliverables can include route and plan-profile drawings, structure and foundation details, sag-tension reports, loading calculations, grounding and shielding design, material lists, specifications, models, and issued-for-construction packages.' },
]

export default function TransmissionLineDesignPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost" && (
        category match "*transmission*" || category match "*Transmission*"
        || category match "*line*" || category match "*sag*" || category match "*conductor*"
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
      `*[_type == "caseStudy" && (lower(relatedService) match "*transmission*")] | order(_createdAt desc) [0...3] {
        _id, title, slug, relatedService,
        "cardImage": featuredImage.asset->url,
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
          email: formData.email, service: 'Transmission Line Design Services',
          message: formData.message, source: 'transmission-line-design',
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
      <main className="flex flex-col">

{/* ═══ 1. HERO ═══ */}
        <section className="order-[10] relative min-h-[75vh] sm:min-h-[80vh] flex items-center overflow-hidden" style={{ background: '#06103C' }}>
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/videos/transmission-line-design.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 w-full">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <Link href="/services" className="text-xs font-semibold uppercase tracking-widest font-jost" style={{ color: '#C72E9E' }}>Services</Link>
                <span className="text-white/30">/</span>
                <span className="text-white/50 text-xs font-jost">Transmission Line Design</span>
              </div>
              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.5rem)' }}>Transmission Line Design Services</h1>
              <p className="font-jost text-white/90 mb-10 max-w-3xl leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)' }}>
                Advanced engineering solutions for reliable, efficient, and future-ready power infrastructure, specializing in transmission line design, sag-tension analysis, and high-voltage system optimization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-14 sm:mb-16">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule A Call</Link>
                <a href="/files/transmission-line-design.pdf" target="_blank" className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/25 hover:border-white/60 transition-all">Download The Flyer</a>
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

        {/* ═══ 2. CORE CAPABILITIES — 9 cards ═══ */}
        <section className="order-[15] py-12 sm:py-16 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <div>
              <h2 className="mt-4 mb-5 font-urbanist font-black leading-tight text-[#06103C]" style={{ fontSize: 'clamp(2rem,3.5vw,2.85rem)' }}>Engineering Transmission Corridors for Safety, Reliability, and Long-Term Performance</h2>
              <p className="mb-5 font-jost text-base leading-relaxed text-gray-600 sm:text-lg">Keentel Engineering coordinates electrical performance, structural loading, route constraints, constructability, and utility standards as one integrated transmission-line engineering system.</p>
              <p className="mb-7 font-jost text-base leading-relaxed text-gray-600">From early corridor studies through issued-for-construction packages, we validate conductor behavior, structure loading, clearances, grounding, environmental conditions, and field requirements to reduce redesign and support dependable delivery.</p>
            </div>
            <div className="flex flex-col gap-4 sm:gap-5">
            <div className="relative h-[350px] overflow-hidden rounded-[1.75rem] border border-[#E3E7F0] bg-[#F6F7FB] shadow-xl sm:h-[420px]">
              <Img src="/images/services/transmission-line-design/renewable-towers.webp" fallback="/images/services/transmission-line-design/Line Routing & Corridor Optimization.webp" alt="Transmission corridor and high-voltage infrastructure" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06103C] via-[#06103C]/20 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                <div className="mb-3 rounded-2xl border border-white/20 bg-[#06103C]/90 p-4 backdrop-blur-md sm:p-5">
                <p className="font-urbanist text-lg font-bold text-white">Integrated from route selection to construction support</p>
                <p className="mt-1 font-jost text-sm leading-relaxed text-white/70">One coordinated engineering path for electrical, structural, civil, and permitting requirements.</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>

        <section className="order-[40] py-12 sm:py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Capabilities</span>
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Keentel Engineering&apos;s Core Transmission Line Design Capabilities</h2>
          </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
              {capabilities.map((c, i) => (
                <article key={i} className="group flex h-full flex-col bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#A8228A]/50" style={{ borderColor: '#E6E8F0' }}>
                  <div className="h-48 overflow-hidden bg-gray-100"><Img src={`/images/services/transmission-line-design/${c.img}`} fallback={`/images/services/transmission-line-design/${c.img}`} alt={c.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                  <div className="p-6 flex-1">
                    <h3 className="font-urbanist font-bold text-base mb-2 border-l-4 pl-2" style={{ color: '#06103C', borderColor: '#A8228A' }}>{c.t}</h3>
                    <p className="font-jost text-gray-600 text-sm leading-relaxed">{c.d}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="order-[20]"><ContactForm /></div>
        <div className="order-[50]"><SoftwareTools /></div>
        <div className="order-[30]"><SoftwareCapabilities /></div>
        <div className="order-[90]"><ServiceCaseStudies service="transmission-line-design" /></div>


        {/* ═══ 3. GET IN TOUCH — full redesign ═══ */}


        {/* ═══ 5. PROCESS ═══ */}
        <section className="order-[70] py-12 sm:py-16" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Our Engineering Process</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
              {processSteps.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border hover:shadow-lg transition-all duration-300" style={{ borderColor: '#E6E8F0' }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#A8228A' }}>STEP {i + 1}</p>
                  <h3 className="font-urbanist font-bold text-lg mb-2" style={{ color: '#06103C' }}>{s.t}</h3>
                  <p className="font-jost text-gray-600 text-sm leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6. INDUSTRIES WE SERVE — exact match to Power System Studies ═══ */}
        <section className="order-[80] py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Sectors</span>
              <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ color: '#06103C' }}>Industries We Serve</h2>
              <p className="font-jost text-gray-600 text-lg max-w-2xl">Serving the evolving needs of power and infrastructure markets through responsive, high-quality engineering support.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {industries.map((item, i) => (
                <Link key={i} href="/industries" className="group relative rounded-2xl overflow-hidden block min-h-[240px] sm:min-h-[280px]">
                  <Img src={item.img} fallback={item.img} alt={item.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: 'linear-gradient(to top, rgba(6,16,60,0.96) 0%, rgba(6,16,60,0.88) 72%, rgba(6,16,60,0) 100%)' }}>
                    <p className="font-urbanist font-bold text-white text-sm leading-tight">{item.t}</p>
                    <span className="inline-flex items-center gap-1 mt-2 text-xs font-jost font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#C72E9E' }}>
                      See More
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 7. CASE STUDIES — dynamic from Sanity, this service only ═══ */}
        <section className="hidden" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Real Projects</span>
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Case Studies</h2>
            <p className="font-jost text-gray-600 text-lg mb-12">Transmission Line Design by Keentel Engineering</p>
            {false && caseStudies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {caseStudies.map((cs) => (
                  <Link key={cs._id} href={`/our-work/${cs.slug.current}`} className="group rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white" style={{ borderColor: '#E6E8F0' }}>
                    <div className="relative h-52 overflow-hidden flex items-center justify-center" style={{ background: '#F6F7FB' }}>
                      {cs.cardImage && (
                        <img src={cs.cardImage} alt={cs.title} className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
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
              <Link href="/our-work" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold border-2 transition-all hover:bg-white" style={{ borderColor: '#06103C', color: '#06103C' }}>
                See All Case Studies
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ 8. FINAL CTA — exact match to Power System Studies ═══ */}
        <section className="order-[130] py-12 sm:py-16 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 50%, #5B2A86 100%)' }}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-3xl rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #C72E9E 0%, transparent 70%)' }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#C72E9E' }}>Get Started</span>
              <h2 className="font-urbanist font-black text-white mb-5 leading-tight" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.25rem)' }}>Ensure Your Electrical Infrastructure Is Safe, Compliant, and Future-Ready</h2>
              <p className="font-jost text-white/85 mb-8 leading-relaxed" style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)' }}>Work with a specialized team of transmission line engineers delivering cost-optimized, code-compliant, and approval-ready designs for utility-scale and infrastructure projects.</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105 hover:shadow-xl" style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}>Schedule A Consultation</Link>
                <Link href="tel:813-389-7871" className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/25 hover:border-white/60 transition-all">Speak With an Engineer</Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Img src="/images/services/transmission-line-design/final-cta.png" fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/e857ee18-180f-48b2-bfa8-38daf048d05c-1920w.png" alt="Keentel engineers" className="w-full h-72 sm:h-96 object-cover" />
            </div>
          </div>
        </section>

        {/* ═══ 9. WHO WE'VE SERVED ═══ */}


        {/* ═══ 10. FAQ — homepage match ═══ */}


        {/* ═══ 11. BLOGS — prominent date, full image ═══ */}
        {false && blogs.length > 0 && (
          <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Technical Reading</span>
                  <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl" style={{ color: '#06103C' }}>Transmission Line Design – Blogs</h2>
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

        <div className="order-[110]"><WhoWeServed /></div>
        <div className="order-[120]"><FaqSection
          eyebrow="Technical FAQs"
          heading="Answers,"
          headingLine2="before you ask."
          intro="The transmission line design questions our clients ask most."
          items={faqs}
        /></div>
      </main>
      <RelatedServiceBlogs terms={["transmission","line design","utility"]} />
      <Footer />
    </>
  )
}
