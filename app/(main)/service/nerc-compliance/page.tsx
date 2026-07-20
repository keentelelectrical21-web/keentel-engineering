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

function Img({ src, fallback, alt, className }: { src: string; fallback: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={className} onError={(e) => { (e.target as HTMLImageElement).src = fallback }} />
}

function FaqAccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer" style={{ border: `1.5px solid ${open ? '#A8228A' : '#E6E8F0'}`, boxShadow: open ? '0 4px 24px rgba(168,34,138,0.1)' : 'none' }} onClick={() => setOpen(!open)}>
      <div className="flex items-center gap-3 p-4 sm:gap-5 sm:p-6">
        <span className="font-urbanist font-black text-xl sm:text-2xl flex-shrink-0 w-7 sm:w-8" style={{ color: '#000000' }}>{String(index + 1).padStart(2, '0')}</span>
        <h4 className="font-urbanist font-bold text-base sm:text-xl leading-snug flex-1" style={{ color: '#0B1230' }}>{q}</h4>
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300" style={{ background: open ? '#A8228A' : '#F6F7FB', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: open ? '#fff' : '#A8228A' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
        </div>
      </div>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '800px' : '0px' }}>
        <p className="px-4 pb-5 font-jost text-sm leading-relaxed sm:px-6 sm:pb-6 sm:pl-[72px] sm:text-base" style={{ color: '#4B5563' }}>{a}</p>
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
            <a href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 font-jost font-semibold text-white transition-all hover:-translate-y-0.5 sm:w-auto" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
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
  { t: 'Client-Focused Work Approach', d: 'Our team works cohesively on every project and with every client. We first develop a solid understanding of your project goals, requirements, and needs. From concept to commissioning, we assist you every step of the way.' },
  { t: '30 Years of Experience', d: 'We have over three decades of experience in design and interconnection. Rest assured, we have the knowledge, understanding, and expertise to handle and execute all types of projects with sheer perfection and superior workmanship.' },
  { t: 'Quality with Innovation', d: 'At Keentel Engineering, we have established our stellar market reputation on quality, work ethics, and innovation — delivering defensible NERC compliance programs backed by engineering precision.' },
  { t: 'Attention-to-Detail', d: 'We work on every project with laser focus and attention to detail. This enables our team to deliver desired results with complete satisfaction across every RSAW, protection study, and audit deliverable.' },
]

const coreServices = [
  { t: 'Compliance Program Development', d: 'We build full-scope NERC compliance programs tailored to O&P 693 and CIP standards. Our engineering-first approach includes internal controls, audit defense strategies, and implementation plans specific to your asset classes and registered functions.' },
  { t: 'Gap Analysis & Risk Assessment', d: 'Our former NERC Auditors and Audit Team Leads (ATLs) conduct comprehensive gap analyses to identify potential noncompliance areas. This service includes mitigation planning and actionable strategies to reduce your regulatory exposure.' },
  { t: 'RSAW Technical Documentation', d: 'We prepare technically defensible RSAW packages authored by Licensed Professional Engineers (P.E.s) and NERC Subject Matter Experts (SMEs). Each RSAW is designed to meet strict O&P 693 and CIP audit scrutiny.' },
  { t: 'PRC-028-1 & PRC-002-5 RSAW Support', d: 'We develop RSAW documentation and evidence packages for disturbance monitoring (PRC-002-5) and fault recording (PRC-028-1), helping ensure defensibility across event-driven audits.' },
  { t: 'FAC-008-3, PRC-019, and Model Validation', d: 'Our NERC compliance testing services include validation of facility ratings (FAC-008-3), protection coordination (PRC-019), and steady-state/dynamic model performance. We ensure data accuracy, relay coordination, and traceability.' },
  { t: 'Inverter-Based Resource (IBR) Model Validation', d: 'We offer PRC-024-4 and PRC-029-1 ride-through and protection studies tailored for IBRs. We support renewable developers and Generator Owners (GOs) operating in CAISO, ERCOT, PJM, and other regions.' },
  { t: 'TPL-007-1 GIC Risk Mitigation', d: 'Our engineering team evaluates transformer vulnerability and system exposure to geomagnetic disturbances (GMD) under TPL-007-1, providing compliance support and thermal impact analysis.' },
  { t: 'NERC Align Portal Support & Mitigation Planning', d: 'We guide clients through the full NERC Align workflow including pre-submittal reviews, mitigation plan development, evidence uploads, and correspondence with Regional Entities.' },
  { t: 'Pre-Audit & Post-Audit Support', d: 'We provide mock audit preparation, on-site or remote audit assistance, and post-audit mitigation strategy development. We ensure year-round audit readiness through proactive technical and regulatory guidance.' },
  { t: 'Integrated Substation Design for NERC Alignment', d: 'Our substation and interconnection engineering services incorporate NERC compliance from the ground up — supporting protection studies, grounding design, relay logic, and PRC/FAC standard requirements.' },
]

const benefitsList = [
  { t: 'Real-Time Alignment with Regulatory Requirements', d: 'We deliver NERC compliance services that ensure your operations stay aligned with evolving O&P and CIP standards. Through accurate assessments and continuous engineering support, we help you maintain audit-ready status year-round.' },
  { t: 'Improved Grid Reliability Through Protection & Planning', d: 'Our team reviews protection coordination, planning studies, and inter-utility communications to enhance grid performance. This proactive approach reduces the risk of noncompliance and strengthens overall system reliability.' },
  { t: 'Enhanced Worker Safety Through Engineering Precision', d: 'Compliance with NERC standards isn\u2019t just about documentation — it\u2019s about safety. By implementing verified engineering practices and protection schemes, we help reduce operational hazards for your workforce.' },
  { t: 'Optimized Infrastructure Performance', d: 'We continuously test and refine your systems to boost infrastructure efficiency. Our engineers focus on improving protection schemes and addressing vulnerabilities that could impact compliance or uptime.' },
  { t: 'Comprehensive Support for NERC & Regional Reliability Standards', d: 'We provide full-scope NERC compliance services — from mock audits and RSAW preparation to detailed assessments of your existing program. Our team has decades of combined experience, including former NERC auditors and SMEs.' },
  { t: 'Audit-Ready Evidence & Continuous Improvement', d: 'We don\u2019t stop at identifying compliance gaps — we implement corrective actions, prepare auditable evidence, and ensure you\u2019re fully aligned with both NERC 693 and regional reliability requirements. Every engagement is tailored to your operational goals.' },
]

const benefitIconPaths = [
  'M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3zm-3 9l2 2 4-4',
  'M4 17l4-4 3 3 6-7m0 0h-4m4 0v4',
  'M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1',
  'M4 18V9m5 9V5m5 13v-7m5 7V3',
  'M6 3h9l3 3v15H6V3zm3 6h6m-6 4h6m-6 4h4',
  'M4 12a8 8 0 1016 0 8 8 0 00-16 0zm4 0l2.5 2.5L16 9',
]

const faqs = [
  { q: 'What is NERC, and what do the NERC O&P compliance standards cover?', a: 'The North American Electric Reliability Corporation (NERC) is a nonprofit organization responsible for establishing and enforcing reliability standards for the electric grid in North America. The O&P compliance standards cover system operations and contingency planning, grid planning and design, transmission system reliability, and monitoring, analysis, and reporting.' },
  { q: 'What are RSAWs and how does Keentel support their preparation?', a: 'Reliability Standard Audit Worksheets (RSAWs) are essential documents used during NERC compliance audits. We support RSAW preparation by providing detailed engineering analysis, system studies, and technical documentation — ensuring alignment with standards such as PRC-019, FAC-008-3, and TPL-001, and conducting internal pre-audit reviews.' },
  { q: 'What is NERC 693 compliance?', a: 'NERC 693 refers to the suite of Operations and Planning (O&P) reliability standards mandated under FERC Order 693. It covers standards across communications, emergency operations, facility ratings, model data, protection, and transmission planning.' },
  { q: 'Does Keentel offer engineering support during a NERC audit?', a: 'Yes. We provide hands-on engineering and compliance support during NERC audits, helping clients respond in real-time to technical audit questions and clarifying complex NERC standards including PRC, FAC, MOD, and CIP requirements.' },
  { q: 'Who needs NERC compliance services?', a: 'Entities that benefit most include Generator Owners (GOs), Generator Operators (GOPs), Transmission Owners (TOs), Transmission Operators (TOPs), Load-Serving Entities (LSEs), and Balancing Authorities (BAs).' },
  { q: 'How do you help with NERC compliance audits?', a: 'We assist by conducting internal audits and gap analysis, identifying compliance gaps and developing action plans, compiling all necessary documentation, and supporting your team throughout the audit process.' },
]


export default function NercCompliancePage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')

  useEffect(() => {
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost" && (
        category match "*nerc*" || category match "*NERC*"
        || category match "*compliance*" || category match "*Compliance*"
        || category match "*IBR*" || category match "*PRC*"
        || category match "*reliability*" || category match "*grid*"
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
      `*[_type == "caseStudy" && (relatedService == "nerc-compliance")] | order(_createdAt desc) [0...3] {
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
          email: formData.email, service: 'NERC O&P 693 Compliance Services',
          message: formData.message, source: 'nerc-compliance',
        }),
      })
      if (res.ok) { setFormStatus('success'); setFormData({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' }) }
      else setFormStatus('error')
    } catch { setFormStatus('error') }
  }

  const blogImageUrl = (post: BlogPost) => post.mainImage?.asset?.url || `https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-b7a9735b-1920w.jpg`

  return (
    <>
      <Header />
      <main className="overflow-x-hidden">

{/* ═══ 1. HERO ═══ */}
        <section className="relative min-h-[75vh] sm:min-h-[80vh] flex items-center overflow-hidden" style={{ background: '#06103C' }}>
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/videos/nerc compilance service.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 w-full">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <Link href="/services" className="text-xs font-semibold uppercase tracking-widest font-jost" style={{ color: '#C72E9E' }}>Services</Link>
                <span className="text-white/30">/</span>
                <span className="text-white/50 text-xs font-jost">NERC O&amp;P 693 Compliance Services</span>
              </div>
              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.5rem)' }}>NERC Compliance Services You Can Trust</h1>
              <p className="font-jost text-white/90 mb-10 max-w-3xl leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)' }}>
                Meet NERC O&amp;P 693 Compliance and CIP standards with engineering-first solutions from licensed experts and former NERC auditors. Our consultants specialize in helping power sector clients meet NERC 693 standards, including all aspects of O&amp;P and RSAW requirements.
              </p>
              <div className="mb-14 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:flex-wrap">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-center font-jost font-semibold text-white transition-all hover:scale-105 sm:w-auto sm:px-8" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule A Call</Link>
                <Link href="/ieee-2800-compliance-operational-planning-services" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#E44BB8]/60 bg-[#A8228A]/20 px-6 py-4 text-center font-jost font-semibold text-white transition-all hover:border-[#F075D2] hover:bg-[#A8228A]/35 sm:w-auto sm:px-8">Explore IEEE 2800 Services</Link>
                <a href="/files/nerc-compliance.pdf" target="_blank" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-4 text-center font-jost font-semibold text-white transition-all hover:border-white/60 sm:w-auto sm:px-8">Download The Flyer</a>
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

        {/* ═══ 2. WHAT ARE NERC COMPLIANCE SERVICES ═══ */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="rounded-3xl border border-[#E6E8F0] bg-[#F8F9FC] p-6 shadow-sm sm:p-8 lg:p-10">
            <h2 className="mb-7 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl">What Are NERC Compliance Services, and Who Needs Them?</h2>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Overview</span>
            <p className="font-jost text-gray-600 mb-4 leading-relaxed text-lg">NERC compliance services help power-sector organizations meet mandatory O&amp;P 693 and CIP cybersecurity standards while keeping their systems reliable, secure, and audit-ready.</p>
            <p className="font-jost text-gray-600 leading-relaxed text-lg">We support Generator and Transmission Owners and Operators, Load-Serving Entities, and Balancing Authorities with defensible documentation, RSAW responses, risk reduction, and preparation for FERC and Regional Entity audits.</p>
          </div>
          <div className="aspect-video self-center overflow-hidden rounded-3xl border border-[#E6E8F0] bg-[#F8F9FC] shadow-xl"><Img src="/images/services/nerc-compliance/NERC Compliance Services.jfif" fallback="/images/services/nerc-compliance/technicians-server-rack.jpg" alt="NERC compliance services for utility and power system organizations" className="h-full w-full object-cover object-center" /></div>
          </div>
          </div>
        </section>

        <ContactForm />
        <SoftwareTools />
        <SoftwareCapabilities />
        <Industries />
        <ServiceCaseStudies service="nerc-compliance" />


        {/* ═══ 3. TRUSTED, AUDIT-READY SUPPORT (dark, image split) ═══ */}
        <section className="py-20 sm:py-24" style={{ background: '#0B1A5B' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Img src="/images/services/nerc-compliance/Trusted, Audit-Ready NERC.png" fallback="/images/services/nerc-compliance/technicians-server-rack.jpg" alt="Trusted audit-ready NERC compliance engineering support" className="w-full h-72 sm:h-[420px] object-cover object-center" />
              </div>
              <div>
                <h2 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem,3.5vw,2.5rem)' }}>Trusted, Audit-Ready NERC Compliance Support Backed by Real Engineering Expertise</h2>
                <p className="font-jost text-white/75 mb-4 leading-relaxed">With over 27 years of experience, Keentel Engineering delivers trusted, full-scope NERC compliance services tailored to your operational roles and system functions. Our team includes former NERC audit team leads (ATLs), Subject Matter Experts (SMEs), and licensed professional engineers (P.E.s) who understand both sides of the compliance process.</p>
                <p className="font-jost text-white/75 mb-4 leading-relaxed">We support utilities across North America with specialized services including:</p>
                <ul className="space-y-2 mb-8">
                  {['NERC audit support', 'RSAW documentation', 'Compliance testing and engineering validation', 'PRC-005-6, FAC-008-5, PRC-019, PRC-024, PRC-025, PRC-027 and PRC-029 studies', 'Ongoing NERC compliance program development'].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 font-jost text-white/75 text-sm">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#A8228A' }}>
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-center font-jost font-semibold text-white transition-all hover:scale-105 sm:w-auto sm:px-8" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule A Call</Link>
                  <a href="/files/nerc-compliance.pdf" target="_blank" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-4 text-center font-jost font-semibold text-white transition-all hover:border-white/60 sm:w-auto sm:px-8">Download The Flyer</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 4. WHY CHOOSE US — branded two-column ═══ */}
        <section className="hidden" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#C72E9E' }}>Why Keentel</span>
                <h2 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Why Choose Us</h2>
                <p className="font-jost text-white/70 text-lg leading-relaxed mb-8">At Keentel Engineering, we take pride in being the go-to engineering firm for power and utility system planning, design, control, and analysis.</p>
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

        {/* ═══ 5. COMPLIANCE TAILORED (3 columns) ═══ */}
        <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { t: 'NERC Compliance Services Tailored to Your Grid Needs', d: 'We support Generator Owners (GO), Transmission Operators (TOP), and Balancing Authorities (BA) across North America in achieving and maintaining full compliance with NERC 693 O&P and CIP standards. Our engineering-first approach ensures every audit requirement is met with technical accuracy, regulatory clarity, and field-proven solutions.' },
                { t: 'Real Audit Expertise from Former NERC Auditors', d: 'Our team includes licensed engineers, former NERC audit team leads (ATLs), and seasoned subject matter experts (SMEs) who have participated in both sides of the audit process. This gives us a unique ability to provide hands-on support — from technical documentation to pre-audit readiness and post-audit mitigation.' },
                { t: 'Comprehensive NERC 693 O&P & CIP Support', d: 'We help power sector entities across the energy landscape remain aligned with evolving reliability standards. Whether you operate renewable energy assets, thermal generation, or high-voltage transmission systems, we deliver scalable compliance solutions aligned with FERC, regional reliability entities, and NERC mandates.' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border hover:shadow-lg transition-all duration-300" style={{ borderColor: '#E6E8F0' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 font-urbanist font-black text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>{i + 1}</div>
                  <h3 className="font-urbanist font-bold text-lg mb-3" style={{ color: '#06103C' }}>{c.t}</h3>
                  <p className="font-jost text-gray-600 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6. CORE SERVICES GRID ═══ */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-10 text-center" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Core NERC Compliance &amp; Engineering Services</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
              {coreServices.slice(0, 9).map((c, i) => (
                <div key={i} className="flex flex-col justify-center rounded-lg px-5 py-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[220px] sm:px-6" style={{ background: '#991B1B' }}>
                  <h3 className="mb-4 font-urbanist text-lg font-bold leading-snug text-white">{c.t}</h3>
                  <p className="font-jost text-sm leading-relaxed text-white/95">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NERC Level 3 Alert engineering support */}
        <section className="py-20 sm:py-24" style={{ background: '#20266F' }}>
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div>
              <p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#E548B5]">Specialized Compliance Support</p>
              <h2 className="font-urbanist text-3xl font-black leading-tight text-white sm:text-4xl">NERC Level 3 Alert Engineering Support</h2>
            </div>
            <div>
              <p className="mb-7 font-jost text-base leading-relaxed text-white/85">We specialize in NERC Level 3 Alert compliance services, helping U.S.-based generator owners meet evolving reliability standards. Our team stays ahead of regulatory developments, offering peace of mind and technical accuracy in every submission.</p>
              <Link href="/nerc-alert-level-3-ibr" className="inline-flex rounded-lg px-6 py-3 font-jost font-semibold text-white transition hover:-translate-y-0.5" style={{ background: '#A8228A' }}>NERC Level 3 Compliance</Link>
            </div>
          </div>
        </section>

        {/* ═══ 7. ENGINEERING-DRIVEN (text-heavy split) ═══ */}
        <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="font-urbanist font-black mb-6 leading-tight" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.5rem)' }}>Engineering-Driven Compliance for the Power Grid</h2>
                <p className="font-jost text-gray-600 mb-4 leading-relaxed text-lg">Unlike generic compliance consultants, Keentel integrates power system engineering with regulatory strategy. Our team ensures every NERC requirement is backed by validated system models, accurate data, and strong documentation.</p>
                <p className="font-jost text-gray-600 mb-4 leading-relaxed">We are well-experienced across industries, assisting:</p>
                <ul className="space-y-2 mb-8">
                  {['Renewable Owners and Operators (GO, GOP Functions)', 'Transmission operators and owners (TO and TOP Functions)', 'Balancing authorities', 'Load-serving entities', 'Generation owners and operators (Conventional GO / GOP Assets)'].map((t, i) => (
                    <li key={i} className="flex items-center gap-2 font-jost text-gray-700 text-sm"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#A8228A' }} />{t}</li>
                  ))}
                </ul>
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-center font-jost font-semibold text-white transition-all hover:scale-105 sm:w-auto sm:px-8" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule A Consultation</Link>
                  <a href="tel:813-389-7871" className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 px-6 py-4 text-center font-jost font-semibold transition-all hover:bg-white sm:w-auto sm:px-8" style={{ borderColor: '#06103C', color: '#06103C' }}>813-389-7871</a>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#E6E8F0' }}>
                  <h3 className="font-urbanist font-bold text-base mb-2" style={{ color: '#06103C' }}>Integrated Approach: O&amp;P + CIP Compliance Under One Roof</h3>
                  <p className="font-jost text-gray-600 text-sm leading-relaxed">Our integrated NERC compliance program unites CIP standards, critical infrastructure protection, and O&amp;P 693 RSAW processes. This end-to-end approach simplifies management, ensures accuracy, and streamlines regulatory coordination.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#E6E8F0' }}>
                  <h3 className="font-urbanist font-bold text-base mb-2" style={{ color: '#06103C' }}>Tailored Compliance Solutions Across the Power Sector</h3>
                  <p className="font-jost text-gray-600 text-sm leading-relaxed">Whether you&apos;re a generator owner, transmission operator, or balancing authority, our engineering consultants deliver NERC audit support, RSAW documentation, and ongoing compliance consulting designed for your system and region. See our service: <Link href="/service/poi-interconnection-engineering-support" className="underline font-semibold" style={{ color: '#A8228A' }}>POI interconnection engineering support</Link>.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 8. BENEFITS ═══ */}
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
              <span className="mb-3 inline-block font-jost text-xs font-bold uppercase tracking-widest text-[#A8228A]">NERC Compliance Benefits</span>
              <h2 className="mb-5 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl lg:text-5xl">Engineering-Led Compliance That Strengthens Your Operation</h2>
              <p className="font-jost text-base leading-relaxed text-gray-600 sm:text-lg">From audit readiness to system reliability, our engineering-first compliance support reduces regulatory risk and helps your organization operate with confidence.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {benefitsList.map((c, i) => (
                <article key={i} className="group flex items-start gap-4 rounded-2xl border border-[#E6E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#A8228A]/40 hover:shadow-xl sm:gap-5 sm:p-7">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#06103C] transition-colors group-hover:bg-[#A8228A] sm:h-14 sm:w-14">
                    <svg className="h-6 w-6 text-white sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={benefitIconPaths[i]} /></svg>
                  </div>
                  <div>
                    <h3 className="mb-3 font-urbanist text-lg font-bold leading-snug text-[#06103C] sm:text-xl">{c.t}</h3>
                    <p className="font-jost text-sm leading-relaxed text-gray-600 sm:text-base">{c.d}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#DDE2EE] bg-[#F6F7FB] p-7 sm:p-8">
                <p className="mb-2 font-jost text-xs font-bold uppercase tracking-widest text-[#A8228A]">Explore Our Expertise</p>
                <h3 className="mb-3 font-urbanist text-2xl font-bold text-[#06103C]">Need a clearer compliance roadmap?</h3>
                <p className="mb-6 font-jost leading-relaxed text-gray-600">Learn how our engineers combine regulatory strategy, system studies, and defensible documentation.</p>
                <Link href="/about" className="inline-flex items-center gap-2 rounded-full border-2 border-[#06103C] px-6 py-3 font-jost font-semibold text-[#06103C] transition hover:bg-[#06103C] hover:text-white">Learn More <span aria-hidden="true">→</span></Link>
              </div>
              <div className="rounded-2xl bg-[#06103C] p-7 text-white shadow-lg sm:p-8">
                <p className="mb-2 font-jost text-xs font-bold uppercase tracking-widest text-[#E548B5]">Talk With an Expert</p>
                <h3 className="mb-3 font-urbanist text-2xl font-bold">Prepare for your next audit with confidence.</h3>
                <p className="mb-6 font-jost leading-relaxed text-white/70">Discuss your registered functions, compliance risks, and technical support requirements with our NERC specialists.</p>
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 rounded-full bg-[#A8228A] px-6 py-3 font-jost font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#C72E9E]">Get Consulting <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 9. CASE STUDIES — dynamic from Sanity, this service only ═══ */}
        <section className="hidden" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#C72E9E' }}>Real Projects</span>
            <h2 className="font-urbanist font-black mb-3 text-white" style={{ fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Case Studies</h2>
            <p className="font-jost text-white/70 text-lg mb-12">NERC Compliance Engineering by Keentel Engineering</p>
            {false && caseStudies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {caseStudies.map((cs) => (
                  <Link key={cs._id} href={`/our-work/${cs.slug.current}`} className="group rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {cs.cardImage && (
                      <div className="relative h-44 overflow-hidden flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <img src={cs.cardImage} alt={cs.title} className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-urbanist font-bold text-lg mb-3 leading-snug text-white">{cs.title}</h3>
                      {cs.excerpt && <p className="font-jost text-white/65 text-sm leading-relaxed mb-5 line-clamp-3">{cs.excerpt}</p>}
                      <span className="inline-flex items-center gap-2 text-sm font-semibold font-jost" style={{ color: '#C72E9E' }}>
                        See Full Case Study
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="font-jost text-white/50">Case studies coming soon.</p>
            )}
            <div className="text-center mt-10">
              <Link href="/our-work" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold border-2 border-white/25 text-white transition-all hover:border-white/60">
                See All Case Studies
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ 10. GET IN TOUCH — full redesign ═══ */}


        {/* ═══ 11. DOWNLOAD FLYER — standalone, centered, branded ═══ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl p-6 text-center sm:p-12" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 100%)' }}>
              <h3 className="font-urbanist font-black text-2xl sm:text-3xl text-white mb-3">Download the NERC Compliance Services flyer</h3>
              <p className="font-jost text-white/70 mb-8 max-w-xl mx-auto">Please click the Download button to get our NERC Compliance Services flyer.</p>
              <a href="/files/nerc-compliance.pdf" target="_blank" className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-center font-jost font-semibold text-white transition-all hover:scale-105 sm:w-auto sm:px-8" style={{ background: '#A8228A' }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download The Flyer
              </a>
            </div>
          </div>
        </section>

        {/* ═══ 12. OUR CLIENTS — redesigned ═══ */}


        {/* ═══ 13. FAQ — homepage match ═══ */}


        {/* ═══ 14. BLOGS — prominent date, full image ═══ */}
        {false && blogs.length > 0 && (
          <section className="py-20 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Technical Reading</span>
                  <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl" style={{ color: '#06103C' }}>NERC Compliance – Blogs</h2>
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
                      <img src={blogImageUrl(post)} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-b7a9735b-1920w.jpg' }} />
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
          eyebrow="Compliance FAQs"
          heading="Answers,"
          headingLine2="before you ask."
          intro="NERC Compliance Service FAQs — the questions Generator Owners, TOPs, and BAs ask us most."
          items={faqs}
        />
      </main>
      <RelatedServiceBlogs terms={["NERC","compliance","reliability"]} />
      <Footer />
    </>
  )
}
