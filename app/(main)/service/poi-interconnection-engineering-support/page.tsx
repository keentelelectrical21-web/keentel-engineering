'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
import WhoWeServed from '@/components/service/WhoWeServed'
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

const whoFor = [
  { t: 'Renewable energy developers', d: 'Solar, wind, BESS, and hybrid project developers navigating utility interconnection.', img: '/images/services/poi-interconnection/who-1-renewable.jpeg' },
  { t: 'EPC contractors', d: 'Contractors managing interconnection scope across design and construction.', img: '/images/services/poi-interconnection/who-2-epc.jpeg' },
  { t: 'Independent power producers', d: 'IPPs needing utility-compliant POI design and study support.', img: '/images/services/poi-interconnection/who-3-ipp.jpeg' },
  { t: 'Industrial & utility-scale owners', d: 'Generation owners requiring schedule certainty and compliance.', img: '/images/services/poi-interconnection/who-4-industrial.jpeg' },
]

const commonIssues = [
  { t: 'Utility rejection', d: 'Due to incomplete or non-compliant POI designs.', img: '/images/services/poi-interconnection/issue-1-rejection.jpeg' },
  { t: 'Costly redesigns', d: 'After feasibility, system impact, or facilities studies.', img: '/images/services/poi-interconnection/issue-2-redesign.jpeg' },
  { t: 'Missed milestones', d: 'Delayed queue progress and commercial operation dates.', img: '/images/services/poi-interconnection/issue-3-delayed.jpeg' },
  { t: 'Study misalignment', d: 'Mismatch between study assumptions and final engineering.', img: '/images/services/poi-interconnection/issue-4-misalignment.jpeg' },
  { t: 'Poor coordination', d: 'Between developers, EPCs, and utilities.', img: '/images/services/poi-interconnection/issue-5-coordination.jpeg' },
]

const deliverables = [
  { n: '01', t: 'POI Electrical & Physical Engineering', d: 'POI one-line and three-line diagrams, switching station layouts, equipment sizing, protection concepts, metering design support, and ownership demarcation.', img: 'deliver-electrical.jpeg', fb: '62283b9f-a86f-478f-bcb6-588bb4cab9f8-md-1920w.jpeg' },
  { n: '02', t: 'Interconnection Application & Utility Submittal', d: 'Support for interconnection request packages, utility data requests, study-phase design support, and comment resolution.', img: 'deliver-application.jpeg', fb: '1e70b0a5-1cf0-44c3-8085-6d3bc636e6e0-md-1920w.jpeg' },
  { n: '03', t: 'Studies & Technical Analysis Support', d: 'Short-circuit and fault duty evaluations, grounding analysis, reactive power support, and protection coordination inputs.', img: 'deliver-studies.jpeg', fb: '550130c1-92e0-4893-98a6-db2b68216579-md-1920w.jpeg' },
  { n: '04', t: 'Construction-Ready & Approval Support', d: 'IFC-level drawings, EPC coordination, utility review responses, and as-built documentation.', img: 'deliver-construction.jpeg', fb: '6ec88272-4076-477e-9503-c12646c4f0d2-md-1920w.jpeg' },
]

const whenToEngage = [
  'Before submitting an interconnection application',
  'During transitions between study phases',
  'After a failed or rejected utility review',
  'When moving from developer design to EPC execution',
  'When modifying or repowering an existing interconnection',
  'When integrating BESS or hybrid generation at an existing POI',
]

const capabilities = [
  'Transmission-level and distribution-level POIs',
  'Greenfield and brownfield interconnections',
  'Utility-owned and customer-owned POI facilities',
  'Renewable, storage, and hybrid generation projects',
  'New interconnections, expansions, and modifications',
]

const processSteps = [
  { step: 'Step 1', t: 'Utility & Queue Review', d: 'Review interconnection requirements, queue position, voltage level, and ownership boundaries.' },
  { step: 'Step 2', t: 'Conceptual POI Engineering', d: 'Develop compliant preliminary layouts, schematics, and technical assumptions.' },
  { step: 'Step 3', t: 'Study & Application Support', d: 'Support feasibility, system impact, and facilities studies with aligned engineering inputs.' },
  { step: 'Step 4', t: 'Detailed POI Design', d: 'Advance engineering to permit- and construction-ready documentation.' },
  { step: 'Step 5', t: 'Utility Review & Resolution', d: 'Address utility comments, revisions, and final approvals efficiently.' },
]

const faqs = [
  { q: 'What is a Point of Interconnection (POI)?', a: 'The Point of Interconnection (POI) is the location where a renewable energy project or power generation facility connects to the existing electrical grid. It is the physical or electrical point where the generated power is transferred from the plant to the transmission or distribution network.' },
  { q: 'What are POI Interconnection Engineering Support Services?', a: 'These services involve the technical assistance required for the successful design, planning, analysis, and execution of the interconnection process between a power generation system and the electrical grid, ensuring compliance with grid codes and standards.' },
  { q: 'Why are POI Interconnection Services important?', a: 'They help identify potential challenges in grid capacity, voltage stability, and protection schemes, while ensuring the system meets local, regional, and national grid codes and standards.' },
  { q: 'What specific services are included in POI Interconnection Engineering Support?', a: 'Feasibility studies, grid impact studies, transmission system studies, power flow analysis, short circuit analysis, protection coordination, regulatory compliance, interconnection agreement support, and system upgrade recommendations.' },
  { q: 'How do you determine the best Point of Interconnection for my project?', a: 'We assess transmission line proximity, grid capacity, distance from the plant, and regulatory requirements through feasibility studies and grid impact analyses to find the POI that minimizes cost, risk, and technical challenges.' },
  { q: 'What is a typical timeline for completing the POI interconnection engineering process?', a: 'Feasibility, grid impact, and related studies typically take several weeks to a few months, depending on project complexity and grid operator requirements.' },
]

export default function POIInterconnectionPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost" && (
        category match "*interconnection*" || category match "*Interconnection*"
        || category match "*POI*" || category match "*grid*" || category match "*Grid*"
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
      `*[_type == "caseStudy" && (lower(relatedService) match "*poi*" || lower(relatedService) match "*interconnection*")] | order(_createdAt desc) [0...3] {
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
          email: formData.email, service: 'POI Interconnection Engineering Support',
          message: formData.message, source: 'poi-interconnection',
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
            <source src="/videos/poi.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,16,60,0.82) 0%, rgba(6,16,60,0.55) 55%, rgba(91,42,134,0.28) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 w-full">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <Link href="/services" className="text-xs font-semibold uppercase tracking-widest font-jost" style={{ color: '#C72E9E' }}>Services</Link>
                <span className="text-white/30">/</span>
                <span className="text-white/50 text-xs font-jost">POI Interconnection</span>
              </div>
              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.5rem)' }}>POI Interconnection Engineering Support</h1>
              <p className="font-jost text-white/90 mb-10 max-w-3xl leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)' }}>
                Engineering, documentation, and utility coordination designed to reduce interconnection risk, prevent redesigns, and accelerate project approvals — for renewable developers, EPC contractors, IPPs, and utilities across North America.
              </p>
              <div className="flex flex-wrap gap-4 mb-14 sm:mb-16">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule A Call</Link>
                <a href="/files/poi-interconnection.pdf" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/25 hover:border-white/60 transition-all">Download The Flyer</a>
              </div>

              <div className="border-t border-white/10 pt-8">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-5 font-jost font-semibold">Certifications &amp; Memberships</p>
                <div className="inline-block rounded-2xl px-6 py-5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <img
                    src="/images/cert-logos.png"
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
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#A8228A' }}>Our Approach</span>
              <h2 className="font-urbanist font-black mb-5 leading-tight" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>POI Interconnection Engineering Support</h2>
              <p className="font-jost text-gray-600 mb-6 max-w-xl text-lg leading-relaxed">POI interconnection engineering support provides the technical design, documentation, and utility coordination required to successfully connect generation facilities to the electrical grid at the point of interconnection (POI).</p>
              <h3 className="font-urbanist font-bold text-lg mb-3" style={{ color: '#06103C' }}>This service helps developers, EPCs, and owners:</h3>
              <ul className="space-y-3 font-jost text-base text-gray-700 mb-8">
                {['Meet utility-specific interconnection requirements', 'Align POI design with approved study assumptions', 'Reduce utility rejections and redesign cycles', 'Accelerate interconnection approvals and energization'].map((t, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#A8228A' }}>
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="font-jost text-gray-500 text-sm leading-relaxed">POI engineering is typically required during interconnection applications, study phases, and detailed design for renewable, storage, and conventional generation projects.</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Img src="/images/services/poi-interconnection/overview.png" fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ChatGPT+Image+Jan+30-+2026-+10_36_51+AM-1920w.png" alt="Control desk operator with power lines and digital grid overlays" className="w-full h-72 sm:h-96 object-cover" />
            </div>
          </div>
        </section>

        <ContactForm />

        <WhoWeServed />

        {/* ═══ 3. WHY CHOOSE — branded two-column ═══ */}
        <section className="py-20 sm:py-24" style={{ background: '#06103C' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#C72E9E' }}>Why Keentel</span>
                <h2 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Why Developers Trust Keentel for POI Engineering</h2>
                <p className="font-jost text-white/70 text-lg leading-relaxed mb-8">We design POIs to meet utility-specific requirements, not generic assumptions — reducing risk before it becomes a schedule or cost problem.</p>
                <Link href="/about" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                  Learn More About Us
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8" style={{ background: 'linear-gradient(160deg, rgba(168,34,138,0.12), rgba(91,42,134,0.12))', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="space-y-4">
                  {[
                    { t: 'Utility-Specific POI Engineering', d: 'Designs built to each utility\u2019s actual interconnection requirements, not templates.' },
                    { t: 'Nationwide Interconnection Experience', d: 'Transmission and distribution-level POIs across ERCOT, PJM, CAISO, MISO, and more.' },
                    { t: 'Fewer Utility Rejections', d: 'Study-aligned engineering that reduces redesign cycles and review delays.' },
                    { t: 'Renewable & Storage Expertise', d: 'Deep experience with solar, wind, BESS, and hybrid generation interconnections.' },
                    { t: 'Schedule-Focused Delivery', d: 'Engineering paced to protect queue position and commercial operation dates.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#A8228A' }}>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div>
                        <p className="font-urbanist font-bold text-white text-base sm:text-lg mb-1">{item.t}</p>
                        <p className="font-jost text-white/65 text-sm leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 4. WHO THIS SERVICE IS FOR ═══ */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Fit Check</span>
            <h2 className="font-urbanist font-black mb-4" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Who This Service Is For</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12 text-lg leading-relaxed">Our POI interconnection engineering support is designed for projects where utility acceptance, schedule certainty, and compliance matter — not template-driven or low-risk projects.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whoFor.map((c, i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ borderColor: '#E6E8F0' }}>
                  <div className="h-40 overflow-hidden"><Img src={c.img} fallback={c.img} alt={c.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                  <div className="p-6">
                    <h3 className="font-urbanist font-bold text-base mb-2" style={{ color: '#06103C' }}>{c.t}</h3>
                    <p className="font-jost text-gray-600 text-sm leading-relaxed">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 5. WHY POI IS HIGH-RISK ═══ */}
        <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Why POI Interconnection Is One of the Highest-Risk Phases of a Power Project</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-3 text-lg leading-relaxed">Many power projects don&apos;t fail during construction — they fail during interconnection review. Our role is to reduce this risk before it becomes a schedule or cost problem.</p>
            <p className="font-urbanist font-bold text-sm mb-10 uppercase tracking-wide" style={{ color: '#A8228A' }}>Common POI-related issues include:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {commonIssues.map((c, i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-all duration-300" style={{ borderColor: '#E6E8F0' }}>
                  <div className="h-32 overflow-hidden"><Img src={c.img} fallback={c.img} alt={c.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                  <div className="p-4">
                    <h3 className="font-urbanist font-bold text-sm mb-1" style={{ color: '#06103C' }}>{c.t}</h3>
                    <p className="font-jost text-gray-600 text-xs leading-relaxed">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6. WHAT WE DELIVER ═══ */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>What We Deliver</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12 text-lg leading-relaxed">End-to-end POI engineering — from electrical design through utility submittal, technical studies, and construction-ready documentation.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deliverables.map((c, i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden border flex flex-col sm:flex-row hover:shadow-xl transition-all duration-300" style={{ borderColor: '#E6E8F0' }}>
                  <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                    <Img src={`/images/services/poi-interconnection/${c.img}`} fallback={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${c.fb}`} alt={c.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="font-urbanist font-black text-2xl block mb-1" style={{ color: '#A8228A' }}>{c.n}</span>
                    <h3 className="font-urbanist font-bold text-lg mb-2" style={{ color: '#06103C' }}>{c.t}</h3>
                    <p className="font-jost text-gray-600 text-sm leading-relaxed">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 7. WHEN TO ENGAGE + CAPABILITIES ═══ */}
        <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-urbanist font-black mb-4" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,2.5vw,2.25rem)' }}>When to Engage POI Engineering Support</h2>
              <p className="font-jost text-gray-600 mb-6 text-lg leading-relaxed">Engaging POI engineering at the right time can prevent months of delay later. This service is typically engaged:</p>
              <ul className="space-y-3 font-jost text-base text-gray-700">
                {whenToEngage.map((t, i) => (
                  <li key={i} className="flex gap-3 items-center"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#A8228A' }} />{t}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg" style={{ border: '1px solid #E6E8F0' }}>
              <h3 className="font-urbanist font-bold text-xl mb-4" style={{ color: '#06103C' }}>Keentel Engineering POI Capabilities</h3>
              <p className="font-jost text-gray-600 text-sm mb-4">We design POIs to meet utility-specific requirements, not generic assumptions. Our experience includes:</p>
              <ul className="space-y-3 font-jost text-sm text-gray-700">
                {capabilities.map((t, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#A8228A' }}>
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ═══ 8. PROCESS ═══ */}
        <section className="py-20 sm:py-24" style={{ background: '#06103C' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost text-center w-full" style={{ color: '#C72E9E' }}>Process</span>
            <h2 className="font-urbanist font-black text-center mb-3 text-white" style={{ fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Our POI Interconnection Engineering Process</h2>
            <p className="font-jost text-white/70 text-center max-w-3xl mx-auto mb-12 text-lg leading-relaxed">A structured framework from utility review through final approval and resolution.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
              {processSteps.map((s, i) => (
                <div key={i} className="rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 font-urbanist font-black text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>{i + 1}</div>
                  <p className="text-[10px] font-jost uppercase tracking-widest mb-2" style={{ color: '#C72E9E' }}>{s.step}</p>
                  <h3 className="font-urbanist font-bold text-white text-sm mb-2">{s.t}</h3>
                  <p className="font-jost text-white/60 text-xs leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule A Call</Link>
            </div>
          </div>
        </section>

        {/* ═══ 9. CASE STUDIES — dynamic from Sanity, this service only ═══ */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Real Projects</span>
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Case Studies</h2>
            <p className="font-jost text-gray-600 text-lg mb-12">POI Interconnection Engineering by Keentel Engineering</p>
            {caseStudies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {caseStudies.map((cs) => (
                  <Link key={cs._id} href={`/our-work/${cs.slug.current}`} className="group rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ borderColor: '#E6E8F0' }}>
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
              <Link href="/our-work" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold border-2 transition-all hover:bg-gray-50" style={{ borderColor: '#06103C', color: '#06103C' }}>
                See All Case Studies
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ 10. GET IN TOUCH — full redesign, split from download ═══ */}


        {/* ═══ 11. DOWNLOAD FLYER — standalone, centered, branded ═══ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center rounded-2xl p-10 sm:p-12" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 100%)' }}>
              <h3 className="font-urbanist font-black text-2xl sm:text-3xl text-white mb-3">Download our POI Interconnection Engineering Support flyer</h3>
              <p className="font-jost text-white/70 mb-8 max-w-xl mx-auto">Please click the Download button to get our POI Interconnection Engineering Support flyer.</p>
              <a href="/files/poi-interconnection.pdf" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: '#A8228A' }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download The Flyer
              </a>
            </div>
          </div>
        </section>

        {/* ═══ 12. WHO WE'VE SERVED ═══ */}


        {/* ═══ 13. FAQ — homepage FAQ.tsx match ═══ */}


        {/* ═══ 14. BLOGS — prominent date, full image ═══ */}
        {blogs.length > 0 && (
          <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Technical Reading</span>
                  <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl" style={{ color: '#06103C' }}>POI Interconnection – Blogs</h2>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-2 font-jost font-semibold text-sm" style={{ color: '#A8228A' }}>
                  View All Articles
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((post) => (
                  <Link key={post._id} href={`/blog/${post.slug.current}`} className="group block bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ borderColor: '#E6E8F0' }}>
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

<FaqSection
          eyebrow="Questions We Hear"
          heading="Answers,"
          headingLine2="before you ask."
          intro="The interconnection questions developers, EPCs, and IPPs ask us most."
          items={faqs}
        />
      </main>
      <Footer />
    </>
  )
}
