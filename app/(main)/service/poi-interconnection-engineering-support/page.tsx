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

function Img({ src, fallback, alt, className }: { src: string; fallback: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={className} onError={(e) => { (e.target as HTMLImageElement).src = fallback }} />
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
  { q: 'What is involved in a Grid Impact Study?', a: 'A Grid Impact Study evaluates power flow, voltage stability, fault conditions, and overall grid reliability to identify upgrades needed to accommodate new generation capacity.' },
  { q: 'What regulatory requirements must be considered during the POI interconnection process?', a: 'Grid codes and regulations set by transmission system operators, utility companies, and government bodies covering voltage control, frequency stability, protection coordination, and safety standards.' },
  { q: 'How do you ensure that the interconnection design is safe and reliable?', a: 'Through detailed design reviews, comprehensive protection system design, short-circuit analysis, and continuous collaboration with grid operators on operational standards.' },
  { q: 'What is a typical timeline for completing the POI interconnection engineering process?', a: 'Feasibility, grid impact, and related studies typically take several weeks to a few months, depending on project complexity and grid operator requirements.' },
  { q: 'What are the potential challenges in the POI interconnection process?', a: 'Grid capacity limitations, regulatory hurdles, protection and safety concerns, and cost considerations from infrastructure upgrades or additional protective equipment.' },
  { q: 'How can you help with the interconnection agreement process?', a: 'We assist in preparing and negotiating interconnection agreements with utilities and transmission system operators, covering technical requirements, financial arrangements, and timelines.' },
  { q: 'How do you manage costs during the POI interconnection process?', a: 'Through early feasibility studies and grid impact analyses that identify issues and cost-effective solutions before they become expensive late-stage problems.' },
  { q: 'Do you provide support after the interconnection is completed?', a: 'Yes, including performance monitoring and troubleshooting, addressing operational issues, and supporting ongoing regulatory or compliance requirements.' },
  { q: 'What is the difference between Point of Interconnection (POI) and Point of Common Coupling (PCC)?', a: 'POI is where a specific generation facility connects to the utility grid; PCC is a shared connection point used by multiple customers, typically under IEEE 1547 for distributed generation.' },
  { q: 'What is the difference between the Point of Delivery (POD) and the Point of Interconnection (POI)?', a: 'The POI is where the project connects to the grid; the POD is where power is officially handed off for billing and metering. In many projects these are the same point.' },
]

export default function POIInterconnectionPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', message: '' })
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
      if (res.ok) { setFormStatus('success'); setFormData({ firstName: '', lastName: '', phone: '', email: '', message: '' }) }
      else setFormStatus('error')
    } catch { setFormStatus('error') }
  }

  const blogImageUrl = (post: BlogPost) => post.mainImage?.asset?.url || `https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-96f20648-1920w.png`

  return (
    <>
      <Header />
      <main>

        {/* 1. HERO — Video Background */}
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
                <span className="text-white/50 text-xs font-jost">POI Interconnection</span>
              </div>
              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
                POI Interconnection Engineering Support
              </h1>
              <p className="font-jost text-white/70 text-lg mb-4 max-w-3xl leading-relaxed">
                Engineering, documentation, and utility coordination designed to reduce interconnection risk, prevent redesigns, and accelerate project approvals.
              </p>
              <p className="font-jost text-white/60 text-base mb-10 max-w-3xl leading-relaxed">
                Supporting renewable developers, EPC contractors, IPPs, and utilities across North America.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                  Schedule A Call
                </Link>
                <a href="/files/poi-interconnection.pdf" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/20 hover:border-white/50 transition-all">
                  Download The Flyer
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. OVERVIEW */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-urbanist font-black mb-4" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>POI Interconnection Engineering Support</h2>
              <p className="font-jost text-gray-600 mb-6 max-w-xl">
                POI interconnection engineering support provides the technical design, documentation, and utility coordination required to successfully connect generation facilities to the electrical grid at the point of interconnection (POI).
              </p>
              <h3 className="font-urbanist font-bold text-lg mb-3" style={{ color: '#06103C' }}>This service helps developers, EPCs, and owners:</h3>
              <ul className="space-y-2 font-jost text-sm text-gray-600 mb-8">
                {['Meet utility-specific interconnection requirements',
                  'Align POI design with approved study assumptions',
                  'Reduce utility rejections and redesign cycles',
                  'Accelerate interconnection approvals and energization'].map((t, i) => (
                  <li key={i} className="flex gap-2"><span style={{ color: '#A8228A' }}>•</span>{t}</li>
                ))}
              </ul>
              <p className="font-jost text-gray-500 text-sm leading-relaxed">
                POI engineering is typically required during interconnection applications, study phases, and detailed design for renewable, storage, and conventional generation projects.
              </p>
            </div>
            <div className="bg-white border rounded-2xl overflow-hidden shadow-lg" style={{ borderColor: '#E6E8F0' }}>
              <Img
                src="/images/services/poi-interconnection/overview.png"
                fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ChatGPT+Image+Jan+30-+2026-+10_36_51+AM-1920w.png"
                alt="Control desk operator with power lines and digital grid overlays"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* 3. WHO THIS SERVICE IS FOR */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Who This Service Is For</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12">Our POI interconnection engineering support is designed for projects where utility acceptance, schedule certainty, and compliance matter — not template-driven or low-risk projects.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {whoFor.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border" style={{ borderColor: '#E6E8F0' }}>
                  <div className="h-40 overflow-hidden"><Img src={c.img} fallback={c.img} alt={c.t} className="w-full h-full object-cover" /></div>
                  <div className="p-6">
                    <h3 className="font-urbanist font-bold text-base mb-2" style={{ color: '#06103C' }}>{c.t}</h3>
                    <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. WHY POI IS HIGH-RISK */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Why POI Interconnection Is One of the Highest-Risk Phases of a Power Project</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-3">Many power projects don&apos;t fail during construction — they fail during interconnection review. Our role is to reduce this risk before it becomes a schedule or cost problem.</p>
            <p className="font-urbanist font-bold text-sm mb-10" style={{ color: '#06103C' }}>Common POI-related issues include:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {commonIssues.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border" style={{ borderColor: '#E6E8F0' }}>
                  <div className="h-32 overflow-hidden"><Img src={c.img} fallback={c.img} alt={c.t} className="w-full h-full object-cover" /></div>
                  <div className="p-4">
                    <h3 className="font-urbanist font-bold text-sm mb-1" style={{ color: '#06103C' }}>{c.t}</h3>
                    <p className="font-jost text-gray-500 text-xs leading-relaxed">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. WHAT WE DELIVER */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>What We Deliver</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12">End-to-end POI engineering — from electrical design through utility submittal, technical studies, and construction-ready documentation.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deliverables.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border flex flex-col sm:flex-row" style={{ borderColor: '#E6E8F0' }}>
                  <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                    <Img src={`/images/services/poi-interconnection/${c.img}`} fallback={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${c.fb}`} alt={c.t} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="font-urbanist font-black text-2xl block mb-1" style={{ color: '#A8228A' }}>{c.n}</span>
                    <h3 className="font-urbanist font-bold text-lg mb-2" style={{ color: '#06103C' }}>{c.t}</h3>
                    <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. WHEN TO ENGAGE + CAPABILITIES */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-urbanist font-black mb-4" style={{ color: '#06103C', fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>When to Engage POI Engineering Support</h2>
              <p className="font-jost text-gray-600 mb-6">Engaging POI engineering at the right time can prevent months of delay later. This service is typically engaged:</p>
              <ul className="space-y-3 font-jost text-sm text-gray-600">
                {whenToEngage.map((t, i) => (
                  <li key={i} className="flex gap-2"><span style={{ color: '#A8228A' }}>•</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white border rounded-2xl p-8 shadow-lg" style={{ borderColor: '#E6E8F0' }}>
              <h3 className="font-urbanist font-bold text-xl mb-4" style={{ color: '#06103C' }}>Keentel Engineering POI Capabilities</h3>
              <p className="font-jost text-gray-500 text-sm mb-4">We design POIs to meet utility-specific requirements, not generic assumptions. Our experience includes:</p>
              <ul className="space-y-3 font-jost text-sm text-gray-600">
                {capabilities.map((t, i) => (
                  <li key={i} className="flex gap-2"><span style={{ color: '#A8228A' }}>✓</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 7. PROCESS */}
        <section className="py-20" style={{ background: '#06103C' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black text-center mb-3 text-white" style={{ fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Our POI Interconnection Engineering Process</h2>
            <p className="font-jost text-white/70 text-center max-w-3xl mx-auto mb-12">A structured framework from utility review through final approval and resolution.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
              {processSteps.map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 font-urbanist font-black text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                    {i + 1}
                  </div>
                  <p className="text-[10px] font-jost uppercase tracking-widest mb-2" style={{ color: '#A8228A' }}>{s.step}</p>
                  <h3 className="font-urbanist font-bold text-white text-sm mb-2">{s.t}</h3>
                  <p className="font-jost text-white/60 text-xs leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule A Call</Link>
            </div>
          </div>
        </section>

        {/* 8. DOWNLOAD FLYER + CONTACT FORM */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>Download our POI Interconnection Engineering Support flyer</p>
              <p className="font-jost text-gray-600 mb-6">Please click the Download button to get our POI Interconnection Engineering Support flyer.</p>
              <a href="/files/poi-interconnection.pdf" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Download The Flyer</a>
            </div>
            <div>
              <h3 className="font-urbanist font-black text-xl mb-4" style={{ color: '#06103C' }}>Ready to Reduce Interconnection Risk?</h3>
              {formStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-green-700 font-jost">Message Received — Thank you for contacting us. We will get back to you as soon as possible.</div>
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
                  <button type="submit" disabled={formStatus === 'loading'} className="px-8 py-4 rounded-full font-jost font-semibold text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                    {formStatus === 'loading' ? 'Sending...' : 'Submit'}
                  </button>
                  {formStatus === 'error' && <p className="text-red-500 text-sm font-jost">Oops, there was an error. Please try again.</p>}
                </form>
              )}
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-10" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>FAQ for POI Interconnection Engineering Support</h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="bg-white border rounded-xl overflow-hidden" style={{ borderColor: '#E6E8F0' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-6 py-4 flex justify-between items-center gap-4">
                    <span className="font-urbanist font-bold text-sm" style={{ color: '#06103C' }}>{i + 1}. {f.q}</span>
                    <span className="font-jost text-lg flex-shrink-0" style={{ color: '#A8228A' }}>{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && <p className="font-jost text-gray-600 text-sm px-6 pb-5">{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. BLOGS — matches power-system-studies card style */}
        {blogs.length > 0 && (
          <section className="py-24" style={{ background: '#F6F7FB' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Technical Reading</span>
                  <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>POI Interconnection – Blogs</h2>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-2 font-jost font-semibold text-sm" style={{ color: '#A8228A' }}>
                  View All Articles
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((post) => (
                  <Link key={post._id} href={`/blog/${post.slug.current}`} className="group block bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ borderColor: '#E6E8F0' }}>
                    <div className="relative h-44 overflow-hidden">
                      <img src={blogImageUrl(post)} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-96f20648-1920w.png' }} />
                    </div>
                    <div className="p-5">
                      <p className="font-jost text-xs text-gray-400 mb-2 uppercase tracking-wide">{post.category} · {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
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
