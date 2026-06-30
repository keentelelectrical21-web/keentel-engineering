'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
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

const whyChoose = [
  { t: 'Client-Focused Work Approach', d: 'Our team works cohesively on every project and with every client. We first develop a solid understanding of your project goals, requirements, and needs. From concept to commissioning, we assist you every step of the way.' },
  { t: '30 Years of Experience', d: 'We have over three decades of experience in design and interconnection. Rest assured, we have the knowledge, understanding, and expertise to handle and execute all types of projects with sheer perfection and superior workmanship.' },
  { t: 'Quality with Innovation', d: 'At Keentel Engineering, we have established our stellar market reputation on quality, work ethics, and innovation — delivering defensible NERC compliance programs backed by engineering precision.' },
  { t: 'Attention-to-Detail', d: 'We work on every project with laser focus and attention to detail. This enables our team to deliver desired results with complete satisfaction across every RSAW, protection study, and audit deliverable.' },
]

const coreServices = [
  {
    t: 'Compliance Program Development',
    d: 'We build full-scope NERC compliance programs tailored to O&P 693 and CIP standards. Our engineering-first approach includes internal controls, audit defense strategies, and implementation plans specific to your asset classes and registered functions.',
  },
  {
    t: 'Gap Analysis & Risk Assessment',
    d: 'Our former NERC Auditors and Audit Team Leads (ATLs) conduct comprehensive gap analyses to identify potential noncompliance areas. This service includes mitigation planning and actionable strategies to reduce your regulatory exposure.',
  },
  {
    t: 'RSAW Technical Documentation',
    d: 'We prepare technically defensible RSAW packages authored by Licensed Professional Engineers (P.E.s) and NERC Subject Matter Experts (SMEs). Each RSAW is designed to meet strict O&P 693 and CIP audit scrutiny.',
  },
  {
    t: 'PRC-028-1 & PRC-002-5 RSAW Support',
    d: 'We develop RSAW documentation and evidence packages for disturbance monitoring (PRC-002-5) and fault recording (PRC-028-1), helping ensure defensibility across event-driven audits.',
  },
  {
    t: 'FAC-008-3, PRC-019, and Model Validation',
    d: 'Our NERC compliance testing services include validation of facility ratings (FAC-008-3), protection coordination (PRC-019), and steady-state/dynamic model performance. We ensure data accuracy, relay coordination, and traceability.',
  },
  {
    t: 'Inverter-Based Resource (IBR) Model Validation',
    d: 'Keentel Engineering offers PRC-024-4 and PRC-029-1 ride-through and protection studies tailored for IBRs. We support renewable developers and Generator Owners (GOs) operating in CAISO, ERCOT, PJM, and other regions.',
  },
  {
    t: 'TPL-007-1 GIC Risk Mitigation',
    d: 'Our engineering team evaluates transformer vulnerability and system exposure to geomagnetic disturbances (GMD) under TPL-007-1, providing compliance support and thermal impact analysis.',
  },
  {
    t: 'NERC Align Portal Support & Mitigation Planning',
    d: 'We guide clients through the full NERC Align workflow including pre-submittal reviews, mitigation plan development, evidence uploads, and correspondence with Regional Entities.',
  },
  {
    t: 'Pre-Audit & Post-Audit Support',
    d: 'We provide mock audit preparation, on-site or remote audit assistance, and post-audit mitigation strategy development. Keentel ensures year-round audit readiness through proactive technical and regulatory guidance.',
  },
  {
    t: 'Integrated Substation Design for NERC Alignment',
    d: 'Our substation and interconnection engineering services incorporate NERC compliance from the ground up — supporting protection studies, grounding design, relay logic, and PRC/FAC standard requirements.',
  },
]

const benefitsList = [
  {
    t: 'Real-Time Alignment with Regulatory Requirements',
    d: 'Keentel delivers NERC compliance services that ensure your operations stay aligned with evolving O&P and CIP standards. Through accurate assessments and continuous engineering support, we help you maintain audit-ready status year-round.',
  },
  {
    t: 'Improved Grid Reliability Through Protection & Planning',
    d: 'Our team reviews protection coordination, planning studies, and inter-utility communications to enhance grid performance. This proactive approach reduces the risk of noncompliance and strengthens overall system reliability.',
  },
  {
    t: 'Enhanced Worker Safety Through Engineering Precision',
    d: 'Compliance with NERC standards isn\'t just about documentation — it\'s about safety. By implementing verified engineering practices and protection schemes, we help reduce operational hazards for your workforce.',
  },
  {
    t: 'Optimized Infrastructure Performance',
    d: 'We continuously test and refine your systems to boost infrastructure efficiency. Our engineers focus on improving protection schemes and addressing vulnerabilities that could impact compliance or uptime.',
  },
  {
    t: 'Comprehensive Support for NERC & Regional Reliability Standards',
    d: 'At Keentel Engineering, we provide full-scope NERC compliance services — from mock audits and RSAW preparation to detailed assessments of your existing program. Our team has decades of combined experience, including former NERC auditors and SMEs.',
  },
  {
    t: 'Audit-Ready Evidence & Continuous Improvement',
    d: 'We don\'t stop at identifying compliance gaps — we implement corrective actions, prepare auditable evidence, and ensure you\'re fully aligned with both NERC 693 and regional reliability requirements. Every engagement is tailored to your operational goals.',
  },
]

const faqs = [
  {
    q: 'What is NERC, and what do the NERC O&P compliance standards cover?',
    a: 'The North American Electric Reliability Corporation (NERC) is a nonprofit organization responsible for establishing and enforcing reliability standards for the electric grid in North America. The O&P compliance standards cover system operations and contingency planning, grid planning and design, transmission system reliability, and monitoring, analysis, and reporting.',
  },
  {
    q: 'Why is NERC O&P compliance important for electric utilities?',
    a: 'Compliance with NERC O&P standards is essential because it helps ensure grid reliability and prevent system failures, meet regulatory requirements and avoid penalties, and enhance operational efficiency and resilience across all asset classes.',
  },
  {
    q: 'What are RSAWs and how does Keentel support their preparation?',
    a: 'Reliability Standard Audit Worksheets (RSAWs) are essential documents used during NERC compliance audits. Keentel supports RSAW preparation by providing detailed engineering analysis, system studies, and technical documentation — ensuring alignment with standards such as PRC-019, FAC-008-3, and TPL-001, and conducting internal pre-audit reviews.',
  },
  {
    q: 'What NERC O&P compliance engineering services do you offer?',
    a: 'We provide compliance audits and gap analysis, system modeling and analysis, emergency operations planning, transmission planning and reliability assessments, training and education, and full documentation and reporting. Our team includes licensed P.E.s and former NERC Audit Team Leads.',
  },
  {
    q: 'How do you help with NERC compliance audits?',
    a: 'We assist by conducting internal audits and gap analysis, identifying compliance gaps and developing action plans, helping compile all necessary documentation, and supporting your team throughout the audit process — clarifying requirements and responding to audit requests.',
  },
  {
    q: 'Does Keentel offer engineering support during a NERC audit?',
    a: 'Yes. Keentel provides hands-on engineering and compliance support during NERC audits. Our team helps clients respond in real-time to technical audit questions, explain the engineering basis for RSAW evidence, collaborate with internal compliance teams, and clarify complex NERC standards including PRC, FAC, MOD, and CIP requirements.',
  },
  {
    q: 'What is NERC 693 compliance?',
    a: 'NERC 693 refers to the suite of Operations and Planning (O&P) reliability standards mandated under FERC Order 693. It covers standards across communications, emergency operations, facility ratings, model data, protection, and transmission planning. Keentel provides end-to-end support for all NERC 693 O&P requirements.',
  },
  {
    q: 'How does Keentel support NERC compliance audits?',
    a: 'Keentel provides end-to-end NERC audit support services including engineering analysis, disturbance reporting, compliance gap assessments, RSAW evidence development, and live support during CIP and O&P audits — onsite or remotely.',
  },
  {
    q: 'How do you ensure your NERC O&P compliance services are cost-effective?',
    a: 'We conduct efficiency audits to identify cost-saving opportunities, offer scalable services aligned with your budget, utilize advanced modeling tools to optimize designs, and help prioritize compliance actions that deliver the greatest impact on grid reliability.',
  },
  {
    q: 'Who needs NERC compliance services?',
    a: 'Entities that benefit most include Generator Owners (GOs), Generator Operators (GOPs), Transmission Owners (TOs), Transmission Operators (TOPs), Load-Serving Entities (LSEs), and Balancing Authorities (BAs). By partnering with Keentel, these organizations can manage risk, avoid penalties, and meet stringent regional enforcement expectations.',
  },
]

const clientSlugs = [
  'RRC-ae225119', 'PAE-864f5ced', '49-752adf6f',
  '48-816ccd8f', '47-363a19ec', '46-ff7bc11f',
  '45-dfb687e0', '44-18370d1d', '43-10240e91',
]

export default function NercCompliancePage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost" && (
        category match "*nerc*" || category match "*NERC*"
        || category match "*compliance*" || category match "*Compliance*"
        || category match "*IBR*" || category match "*PRC*"
        || category match "*reliability*" || category match "*grid*"
      )] | order(publishedAt desc) [0...6] {
        _id, title, slug, publishedAt, excerpt, category,
        "mainImage": mainImage { asset->{ url } }
      }`
    ).then(data => {
      if (data.length >= 3) { setBlogs(data); return }
      client.fetch<BlogPost[]>(
        `*[_type == "blogPost"] | order(publishedAt desc) [0...6] {
          _id, title, slug, publishedAt, excerpt, category,
          "mainImage": mainImage { asset->{ url } }
        }`
      ).then(setBlogs).catch(() => {})
    }).catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          service: 'NERC O&P 693 Compliance Services',
          message: formData.message,
          source: 'nerc-compliance',
        }),
      })
      if (res.ok) {
        setFormStatus('success')
        setFormData({ firstName: '', lastName: '', phone: '', email: '', message: '' })
      } else setFormStatus('error')
    } catch { setFormStatus('error') }
  }

  const blogImageUrl = (post: BlogPost) =>
    post.mainImage?.asset?.url ||
    `https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-b7a9735b-1920w.jpg`

  return (
    <>
      <Header />
      <main>

        {/* ── 1. HERO ── */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden" style={{ background: '#06103C' }}>
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-25">
            <source src="/videos/power-system-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,16,60,0.97) 0%, rgba(6,16,60,0.75) 60%, rgba(91,42,134,0.4) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-8">
                <Link href="/services" className="text-xs font-semibold uppercase tracking-widest font-jost" style={{ color: '#A8228A' }}>Services</Link>
                <span className="text-white/30">/</span>
                <span className="text-white/50 text-xs font-jost">NERC O&amp;P 693 Compliance Services</span>
              </div>
              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
                NERC Compliance Services You Can Trust
              </h1>
              <p className="font-jost text-white/70 text-lg mb-4 max-w-3xl leading-relaxed">
                Meet NERC O&amp;P 693 Compliance and CIP standards with engineering-first solutions from licensed experts and former NERC auditors.
              </p>
              <p className="font-jost text-white/60 text-base mb-10 max-w-3xl leading-relaxed">
                Our NERC compliance consultants specialize in helping power sector clients meet NERC 693 standards, including all aspects of O&amp;P and RSAW requirements. With comprehensive NERC audit support and engineering services, we ensure regulatory alignment and operational excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://calendly.com/keentel-engineering/15min"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
                >
                  Schedule A Call
                </Link>
                <a
                  href="/files/nerc-compliance.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/20 hover:border-white/50 transition-all"
                >
                  Download The Flyer
                </a>
                <Link
                  href="/service/nerc-alert-level-3-ibr"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold border border-white/20 hover:border-white/50 transition-all"
                  style={{ color: '#A8228A' }}
                >
                  NERC Level 3 Alert
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. WHY CHOOSE ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>
              Why Choose Us
            </h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12">
              At <Link href="/" className="underline" style={{ color: '#A8228A' }}>Keentel Engineering</Link>, we take pride in being the go-to engineering firm for power and utility system planning, design, control, and analysis. Some of the many attributes of our company that set us apart are:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whyChoose.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border" style={{ borderColor: '#E6E8F0' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 font-urbanist font-black text-white" style={{ background: '#A8228A' }}>{i + 1}</div>
                  <h3 className="font-urbanist font-bold text-lg mb-3" style={{ color: '#06103C' }}>{c.t}</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                Learn More About Us
              </Link>
            </div>
          </div>
        </section>

        {/* ── 3. CONTACT FORM ── */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black text-center mb-10" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>
              Let&apos;s Discuss How to Optimize Your Next Project
            </h2>
            {formStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-green-700 font-jost text-center">
                Thank you for contacting us. We will get back to you as soon as possible.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="First Name" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} className="border rounded-lg px-4 py-3 font-jost text-sm" style={{ borderColor: '#E6E8F0' }} />
                  <input placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} className="border rounded-lg px-4 py-3 font-jost text-sm" style={{ borderColor: '#E6E8F0' }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input required type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="border rounded-lg px-4 py-3 font-jost text-sm" style={{ borderColor: '#E6E8F0' }} />
                  <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="border rounded-lg px-4 py-3 font-jost text-sm" style={{ borderColor: '#E6E8F0' }} />
                </div>
                <textarea placeholder="Message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full border rounded-lg px-4 py-3 font-jost text-sm" style={{ borderColor: '#E6E8F0' }} />
                <button type="submit" disabled={formStatus === 'loading'} className="w-full px-8 py-4 rounded-full font-jost font-semibold text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                  {formStatus === 'loading' ? 'Sending...' : 'Submit'}
                </button>
                {formStatus === 'error' && <p className="text-red-500 text-sm font-jost text-center">Oops, there was an error. Please try again.</p>}
              </form>
            )}
          </div>
        </section>

        {/* ── 4. WHAT ARE NERC COMPLIANCE SERVICES ── */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-6" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>
              What Are NERC Compliance Services, and Who Needs Them?
            </h2>
            <p className="font-jost text-gray-600 mb-4 leading-relaxed">
              NERC compliance services are engineering and regulatory support solutions designed to help power sector organizations meet the mandatory standards established by the North American Electric Reliability Corporation (NERC). These services include alignment with both NERC O&amp;P 693 compliance standards and CIP cybersecurity requirements, ensuring that utilities remain secure, reliable, and audit-ready.
            </p>
            <p className="font-jost text-gray-600 mb-4 leading-relaxed">
              Entities that benefit most from these services include Generator Owners (GOs), Generator Operators (GOPs), Transmission Owners (TOs), Transmission Operators (TOPs), Load-Serving Entities (LSEs), and Balancing Authorities (BAs). By partnering with certified NERC compliance consultants, these organizations can effectively manage their risk exposure, avoid costly penalties, and meet stringent regional enforcement expectations.
            </p>
            <p className="font-jost text-gray-600 leading-relaxed">
              Whether managing renewable energy portfolios, conventional generation fleets, or transmission infrastructure, working with an experienced team ensures all technical documentation, RSAW responses, and compliance evidence are defensible and aligned with FERC mandates and Regional Entity audits.
            </p>
          </div>
        </section>

        {/* ── 5. TRUSTED EXPERTISE (dark section) ── */}
        <section className="py-20" style={{ background: '#06103C' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <img
                  src="/images/services/nerc-compliance/technicians-server-rack.jpg"
                  alt="Two technicians working at a laptop in front of a server rack"
                  className="w-full rounded-2xl object-cover"
                  style={{ maxHeight: 420 }}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-b7a9735b-1920w.jpg' }}
                />
              </div>
              <div>
                <h2 className="font-urbanist font-black text-white mb-6" style={{ fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>
                  Trusted, Audit-Ready NERC Compliance Support Backed by Real Engineering Expertise
                </h2>
                <p className="font-jost text-white/70 mb-4 leading-relaxed">
                  With over 27 years of experience, Keentel Engineering delivers trusted, full-scope NERC compliance services tailored to your operational roles and system functions. Our team includes former NERC audit team leads (ATLs), Subject Matter Experts (SMEs), and licensed professional engineers (P.E.s) who understand both sides of the compliance process.
                </p>
                <p className="font-jost text-white/70 mb-4 leading-relaxed">We support utilities across North America with specialized services including:</p>
                <ul className="font-jost text-white/70 space-y-2 mb-8 list-disc list-inside">
                  <li>NERC audit support</li>
                  <li>RSAW documentation</li>
                  <li>Compliance testing and engineering validation</li>
                  <li>PRC-005-6, FAC-008-5, PRC-019, PRC-024, PRC-025, PRC-027 and PRC-029 studies</li>
                  <li>Ongoing NERC compliance program development</li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                    Schedule A Call
                  </Link>
                  <a href="/files/nerc-compliance.pdf" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/20 hover:border-white/50 transition-all">
                    Download The Flyer
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. COMPLIANCE TAILORED (3 columns) ── */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  t: 'NERC Compliance Services Tailored to Your Grid Needs',
                  d: 'We support Generator Owners (GO), Transmission Operators (TOP), and Balancing Authorities (BA) across North America in achieving and maintaining full compliance with NERC 693 O&P and CIP standards. Our engineering-first approach ensures every audit requirement is met with technical accuracy, regulatory clarity, and field-proven solutions.',
                },
                {
                  t: 'Real Audit Expertise from Former NERC Auditors',
                  d: 'Our team includes licensed engineers, former NERC audit team leads (ATLs), and seasoned subject matter experts (SMEs) who have participated in both sides of the audit process. This gives us a unique ability to provide hands-on support — from technical documentation to pre-audit readiness and post-audit mitigation.',
                },
                {
                  t: 'Comprehensive NERC 693 O&P & CIP Support',
                  d: 'We help power sector entities across the energy landscape remain aligned with evolving reliability standards. Whether you operate renewable energy assets, thermal generation, or high-voltage transmission systems, we deliver scalable compliance solutions aligned with FERC, regional reliability entities, and NERC mandates.',
                },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border" style={{ borderColor: '#E6E8F0' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 font-urbanist font-black text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>{i + 1}</div>
                  <h3 className="font-urbanist font-bold text-lg mb-3" style={{ color: '#06103C' }}>{c.t}</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. CORE SERVICES GRID ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-10 text-center" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>
              Core NERC Compliance &amp; Engineering Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coreServices.map((c, i) => (
                <div key={i} className="rounded-2xl p-6" style={{ background: '#06103C' }}>
                  <h3 className="font-urbanist font-bold text-lg mb-3 border-l-4 pl-3 text-white" style={{ borderColor: '#A8228A' }}>{c.t}</h3>
                  <p className="font-jost text-white/70 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. ENGINEERING-DRIVEN (text-heavy split) ── */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-urbanist font-black mb-6" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>
                  Engineering-Driven Compliance for the Power Grid
                </h2>
                <p className="font-jost text-gray-600 mb-4 leading-relaxed">
                  Unlike generic compliance consultants, Keentel integrates power system engineering with regulatory strategy. Our team ensures every NERC requirement is backed by validated system models, accurate data, and strong documentation.
                </p>
                <p className="font-jost text-gray-600 mb-4 leading-relaxed">We are well-experienced across industries, assisting:</p>
                <ul className="font-jost text-gray-600 space-y-2 mb-8 list-disc list-inside">
                  <li>Renewable Owners and Operators (GO, GOP Functions)</li>
                  <li>Transmission operators and owners (TO and TOP Functions)</li>
                  <li>Balancing authorities</li>
                  <li>Load-serving entities</li>
                  <li>Generation owners and operators (Conventional GO / GOP Assets)</li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                    Schedule A Consultation
                  </Link>
                  <a href="tel:813-389-7871" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold border border-gray-200 hover:border-gray-400 transition-all" style={{ color: '#06103C' }}>
                    813-389-7871
                  </a>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#E6E8F0' }}>
                  <h3 className="font-urbanist font-bold text-base mb-2" style={{ color: '#06103C' }}>Integrated Approach: O&amp;P + CIP Compliance Under One Roof</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">Our integrated NERC compliance program unites CIP standards, critical infrastructure protection, and O&amp;P 693 RSAW processes. This end-to-end approach simplifies management, ensures accuracy, and streamlines regulatory coordination.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#E6E8F0' }}>
                  <h3 className="font-urbanist font-bold text-base mb-2" style={{ color: '#06103C' }}>Tailored Compliance Solutions Across the Power Sector</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">Whether you're a generator owner, transmission operator, or balancing authority, our engineering consultants deliver NERC audit support, RSAW documentation, and ongoing compliance consulting designed for your system and region. See our service: <Link href="/service/poi-interconnection-engineering-support" className="underline" style={{ color: '#A8228A' }}>POI interconnection engineering support</Link>.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. BENEFITS ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-4 text-center" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>
              Our NERC Compliance Services Can Benefit Your Business in Several Ways
            </h2>
            <p className="font-jost text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Whether you&apos;re preparing for an audit or strengthening long-term system reliability, our NERC compliance services offer measurable value. From grid protection to documentation support, Keentel Engineering helps you stay aligned with regulatory expectations — accurately, efficiently, and audit-ready.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefitsList.map((c, i) => (
                <div key={i} className="rounded-2xl p-8 border" style={{ borderColor: '#E6E8F0', background: '#F7F8FC' }}>
                  <h3 className="font-urbanist font-bold text-lg mb-3" style={{ color: '#06103C' }}>{c.t}</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 10. LONG-FORM SEO (3 text blocks, dark bg) ── */}
        <section className="py-20" style={{ background: '#06103C' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div>
                <h3 className="font-urbanist font-black text-white mb-5" style={{ fontSize: 'clamp(1.4rem,2.2vw,1.75rem)' }}>
                  Ensure NERC Compliance with Expert Engineering &amp; Audit Support
                </h3>
                <p className="font-jost text-white/70 mb-4 leading-relaxed text-sm">
                  At Keentel Engineering, we deliver full-spectrum NERC compliance services to help Generator Owners (GOs), Transmission Operators (TOPs), and Balancing Authorities (BAs) align with the latest NERC 693 O&amp;P and CIP Reliability Standards. Whether you&apos;re preparing for your first audit or need validation for FAC-008-3 facility ratings, our engineering-driven approach ensures your systems are technically accurate and audit-ready.
                </p>
                <p className="font-jost text-white/70 leading-relaxed text-sm">
                  We support compliance efforts through RSAR preparation, PRC-019 protection coordination studies, model validation, and end-to-end guidance with the NERC Align system. Our field-proven team goes beyond advisory — we provide direct, on-the-ground NERC compliance testing services, root-cause gap analyses, and real-time audit support for both O&amp;P and CIP programs.
                </p>
              </div>
              <div>
                <h3 className="font-urbanist font-black text-white mb-5" style={{ fontSize: 'clamp(1.4rem,2.2vw,1.75rem)' }}>
                  Trusted NERC Compliance Consulting for Grid Reliability
                </h3>
                <p className="font-jost text-white/70 mb-4 leading-relaxed text-sm">
                  With over 27 years of power systems engineering leadership, Keentel Engineering is trusted nationwide for NERC compliance consulting and engineering compliance services. Our consultants include licensed P.E.s, former NERC audit team leads, and utility veterans with hands-on experience supporting NERC audit readiness and mitigation planning.
                </p>
                <p className="font-jost text-white/70 leading-relaxed text-sm">
                  We assist clients in building robust, audit-defensible compliance frameworks through RSAW documentation, TPL-007-1 assessments, engineering model reviews, and coordination with regional reliability entities. Whether you&apos;re overseeing a renewable portfolio, critical substation, or conventional generation fleet, our support ensures full NERC O&amp;P 693 compliance with tailored technical depth.
                </p>
              </div>
              <div>
                <h3 className="font-urbanist font-black text-white mb-5" style={{ fontSize: 'clamp(1.4rem,2.2vw,1.75rem)' }}>
                  Engineering-Focused NERC Audit Support &amp; Ongoing Consultation
                </h3>
                <p className="font-jost text-white/70 mb-4 leading-relaxed text-sm">
                  Keentel provides audit-ready NERC services built for evolving compliance needs. We specialize in helping asset owners and operators with ongoing NERC compliance consultation, IBR audit support, and regulatory updates across both cyber and operational domains.
                </p>
                <p className="font-jost text-white/70 leading-relaxed text-sm">
                  Our services include NERC RSAW documentation, coordination studies, compliance testing, and development of risk-informed internal controls. From pre-audit planning to long-term strategic support, our NERC compliance engineers and audit consultants deliver value that extends beyond checklists — offering reliable, defensible solutions trusted by utility partners across North America.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 11. CLIENTS ── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-2" style={{ color: '#06103C', fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>Our Clients</h2>
            <p className="font-jost text-gray-600 mb-8">Serving utilities, EPCs, developers, and infrastructure organizations supporting critical power systems nationwide.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {clientSlugs.map((slug, i) => (
                <div key={i} className="border-2 rounded-2xl flex items-center justify-center p-8" style={{ borderColor: '#E6E8F0', minHeight: 150 }}>
                  <img
                    src={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${slug}-1920w.png`}
                    alt="Client"
                    className="max-h-24 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 12. FAQ ── */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-10" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>
              NERC Compliance Service FAQs
            </h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="bg-white border rounded-xl overflow-hidden" style={{ borderColor: '#E6E8F0' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center gap-4 p-5 text-left"
                  >
                    <span className="font-urbanist font-bold text-sm" style={{ color: '#06103C' }}>{i + 1}. {f.q}</span>
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-xs transition-transform"
                      style={{ borderColor: '#E6E8F0', transform: openFaq === i ? 'rotate(180deg)' : 'none' }}
                    >▾</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 font-jost text-sm text-gray-600 leading-relaxed">{f.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 13. CTA STRIP ── */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-urbanist font-black mb-4" style={{ color: '#06103C', fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>
              Need help with NERC audits, RSAW documentation, or compliance assessments?
            </h2>
            <p className="font-jost text-gray-600 mb-8">
              Call <a href="tel:813-389-7871" className="font-semibold underline" style={{ color: '#A8228A' }}>813-389-7871</a> to speak with a certified NERC compliance consultant, or{' '}
              <Link href="/contact" className="font-semibold underline" style={{ color: '#A8228A' }}>contact us online</Link>{' '}
              to ensure you&apos;re fully aligned with NERC 693 O&amp;P standards.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:813-389-7871" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                813-389-7871
              </a>
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold border border-gray-200 hover:border-gray-400 transition-all" style={{ color: '#06103C' }}>
                Schedule A Consultation
              </Link>
            </div>
          </div>
        </section>

        {/* ── 14. DOWNLOAD FLYER ── */}
        <section className="py-20" style={{ background: '#06103C' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-urbanist font-black text-white mb-4" style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)' }}>
              Download the NERC Compliance Services flyer
            </h2>
            <p className="font-jost text-white/70 mb-8">
              Please click the <strong className="text-white">Download</strong> button to get our <strong className="text-white">NERC Compliance Services</strong> flyer.
            </p>
            <a
              href="/files/nerc-compliance.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
            >
              Download The Flyer
            </a>
          </div>
        </section>

        {/* ── 15. BLOGS ── */}
        {blogs.length > 0 && (
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Technical Reading</span>
                  <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>NERC Compliance – Blogs</h2>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-2 font-jost font-semibold text-sm" style={{ color: '#A8228A' }}>View All Articles</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug.current}`}
                    className="group block bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    style={{ borderColor: '#E6E8F0' }}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={blogImageUrl(post)}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-b7a9735b-1920w.jpg' }}
                      />
                    </div>
                    <div className="p-5">
                      <p className="font-jost text-xs text-gray-400 mb-2 uppercase tracking-wide">
                        {post.category} · {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <h3 className="font-urbanist font-bold text-base mb-2 leading-snug line-clamp-2" style={{ color: '#06103C' }}>{post.title}</h3>
                      <p className="font-jost text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                      <span className="font-jost text-sm font-semibold" style={{ color: '#A8228A' }}>Read More</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  )
}
