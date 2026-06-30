'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { client } from '@/lib/sanity'

// ── Types ──────────────────────────────────────────────────────────────────
interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  category: string
  mainImage?: { asset: { url: string } }
}

// ── Software Capabilities Data ─────────────────────────────────────────────
const softwareTools = [
  {
    key: 'psse',
    name: 'PSS®E',
    logo: '/images/services/power-system-studies/logo-psse.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/PSSE-1920w.png',
    description: 'Power System Simulator for Engineering by Siemens — industry standard for large-scale transmission network analysis.',
    capabilities: [
      'Transmission planning & contingency analysis',
      'Load flow & voltage stability studies',
      'Dynamic & transient stability simulations',
      'Renewable energy (solar, wind, BESS) modeling',
      'Networks up to 200,000 buses',
      'Python API automation for batch workflows',
    ],
  },
  {
    key: 'etap',
    name: 'ETAP',
    logo: '/images/services/power-system-studies/logo-etap.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ETAP-1920w.png',
    description: 'Integrated electrical power system platform for design, simulation, analysis, and real-time operation.',
    capabilities: [
      'Power flow & short circuit analysis (ANSI/IEC)',
      'Arc flash analysis per IEEE 1584 / NFPA 70E',
      'Protection coordination & TCC curves',
      'Harmonic distortion analysis',
      'Solar PV, wind, BESS & microgrid modeling',
      'Electrical Digital Twin for real-time monitoring',
    ],
  },
  {
    key: 'pscad',
    name: 'PSCAD',
    logo: '/images/services/power-system-studies/logo-pscad.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Logo+-+PSCAD+MHI+BLUE-+2018-1920w.png',
    description: 'Electromagnetic transient (EMT) simulation for fast electrical phenomena including HVDC, converters, and inverter-based resources.',
    capabilities: [
      'HVDC LCC and VSC system modeling',
      'Inverter-based resource (IBR) simulation',
      'Lightning surge & switching transient analysis',
      'Distributed parameter transmission line models',
      'Microsecond time-step EMT simulation',
      'Grid-forming & grid-following inverter control',
    ],
  },
  {
    key: 'powerworld',
    name: 'PowerWorld',
    logo: '/images/services/power-system-studies/logo-powerworld.jpg',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/PowerWorld-1920w.jpg',
    description: 'Interactive power system simulation with animated one-line diagrams and geographic visualization capabilities.',
    capabilities: [
      'Power flow & contingency analysis',
      'Optimal Power Flow (OPF) studies',
      'PV / QV voltage stability analysis',
      'Networks up to ~250,000 buses',
      'Newton-Raphson numerical algorithms',
      'Interactive animated one-line diagrams',
    ],
  },
  {
    key: 'skm',
    name: 'SKM PTW',
    logo: '/images/services/power-system-studies/logo-skm.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/SKM+PowerTools-1920w.png',
    description: 'Comprehensive electrical engineering platform for power system design, analysis, and safety evaluation.',
    capabilities: [
      'Load flow, short circuit & arc flash studies',
      'CAPTOR protection coordination module',
      'HI_WAVE harmonic distortion evaluation',
      'Grounding system analysis',
      'ANSI & IEC standards compliance',
      'Industrial, utility & data center applications',
    ],
  },
  {
    key: 'autocad',
    name: 'AutoCAD Elec.',
    logo: '/images/services/power-system-studies/logo-autocad.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/aeimages-1920w.png',
    description: 'Intelligent electrical design automation with automated wire numbering, component tagging, and error checking.',
    capabilities: [
      'Protection schematics & relay panel design',
      'AC/DC substation diagrams',
      'Automatic BOM & cable list generation',
      'IEC / ANSI / JIC symbol libraries',
      'Multi-user collaboration via Autodesk Vault',
      'NERC-traceable documentation & QA/QC',
    ],
  },
  {
    key: 'aspen',
    name: 'ASPEN',
    logo: '/images/services/power-system-studies/logo-aspen.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/6a12ed_77c665e4ee2c4db2b3fbb92a34f3b12e-mv2-1920w.png',
    description: 'Advanced short circuit analysis and relay coordination platform used by protection engineers worldwide.',
    capabilities: [
      'Short circuit & relay coordination (ANSI/IEC/NERC)',
      'ASPEN Power Flow for transmission planning',
      'DistriView phase-domain distribution analysis',
      'Breaker Rating Module per ANSI/IEC standards',
      'Manufacturer-specific relay logic modeling',
      'Inverter-based resource (IBR) support',
    ],
  },
]

// ── FAQ Data ───────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Which power system studies does Keentel perform?',
    a: 'Keentel performs load flow, contingency, short-circuit and duty analysis, protection coordination, arc-flash, harmonic and power quality studies, motor starting, voltage drop, transient stability where applicable, and grounding studies. We tailor the study set to the system voltage class (EHV, HV, or MV), facility type, and specific regulatory and utility requirements.',
  },
  {
    q: 'Why are short-circuit studies critical for EHV, HV, and MV systems?',
    a: 'Short-circuit studies confirm equipment interrupting ratings and momentary withstand capabilities. They also define protective device settings, ensure breaker duty compliance, and reduce the risk of catastrophic equipment failure. These studies are often required for utility approval and safe long-term operation.',
  },
  {
    q: 'What is the difference between coordination studies and arc-flash studies?',
    a: 'Coordination studies ensure protective devices operate selectively and quickly for electrical faults. Arc-flash studies estimate incident energy exposure and define PPE boundaries and equipment labeling requirements. Because coordination directly impacts arc-flash results, Keentel typically performs these as an integrated workflow to balance safety and system selectivity.',
  },
  {
    q: 'How does Keentel evaluate harmonics and power quality?',
    a: 'We model harmonic sources such as inverters, variable frequency drives, and large rectifiers, calculate distortion levels at key buses, and verify compliance with applicable limits, often IEEE 519 or specific utility requirements. If mitigation is required, we evaluate filter options, transformer configurations, and system impedance changes to develop a practical solution.',
  },
  {
    q: 'Can Keentel study weak grid and inverter-based resource interconnections?',
    a: 'Yes. Weak grid conditions affect voltage stability, fault response, and protection performance. Keentel evaluates short-circuit ratio, reactive power margin, voltage regulation, and control interactions to recommend mitigation such as STATCOMs, synchronous condensers, or tuned control strategies to ensure stable and compliant operation.',
  },
  {
    q: 'What data does Keentel need to begin a power system study?',
    a: 'Typically required information includes one-line diagrams, equipment ratings, transformer impedances and tap settings, cable and conductor data, protective device details, load profiles, generator or inverter parameters, and utility source equivalents. Keentel can also work with partial data early in a project and refine models as detailed design progresses.',
  },
  {
    q: 'How do you ensure study results are defensible for utility and ISO review?',
    a: 'Keentel documents assumptions, model sources, and validation checks throughout the analysis process. We provide clear base case descriptions, sensitivity runs, and traceable references to equipment data sheets. Deliverables are formatted to match common utility and ISO expectations to reduce review cycles and approval delays.',
  },
  {
    q: 'How are study results converted into actionable design changes?',
    a: 'We translate study results into specific design actions such as breaker upgrades, relay setting updates, CT and PT changes, cable sizing adjustments, reactive compensation sizing, filter selection, or layout modifications. The true value is not just the report itself, but the practical engineering decisions supported by detailed analysis.',
  },
]

// ── Img helper ─────────────────────────────────────────────────────────────
function Img({ src, fallback, alt, className }: { src: string; fallback: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => { (e.target as HTMLImageElement).src = fallback }}
    />
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function PowerSystemStudiesPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [activeSoftware, setActiveSoftware] = useState('psse')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const videoRef = useRef<HTMLVideoElement>(null)

  // Fetch blogs filtered by power-system category
  useEffect(() => {
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost" && (
        category match "*power*" || category match "*Power*" || category match "*system*"
        || category match "*System*" || category match "*study*" || category match "*Study*"
        || category match "*harmonic*" || category match "*protection*" || category match "*relay*"
      )] | order(publishedAt desc) [0...6] {
        _id, title, slug, publishedAt, excerpt, category,
        "mainImage": mainImage { asset->{ url } }
      }`
    ).then(data => {
      if (data.length >= 3) { setBlogs(data); return }
      // Fallback: any blogs
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
          service: formData.service || 'EHV, HV & MV Power System Studies',
          message: formData.message,
          source: 'power-system-studies',
        }),
      })
      if (res.ok) { setFormStatus('success'); setFormData({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' }) }
      else setFormStatus('error')
    } catch { setFormStatus('error') }
  }

  const activeTool = softwareTools.find(t => t.key === activeSoftware) || softwareTools[0]

  const blogImageUrl = (post: BlogPost) => {
    if (post.mainImage?.asset?.url) return post.mainImage.asset.url
    return `https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-96f20648-1920w.png`
  }

  return (
    <>
      <Header />
      <main>

        {/* ═══════════════════════════════════════════════════════
            1. HERO — Video Background
        ═══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden" style={{ background: '#06103C' }}>
          {/* Video bg */}
          <video
            ref={videoRef}
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            onError={() => {}}
          >
            <source src="/videos/power-system-hero.mp4" type="video/mp4" />
          </video>

          {/* Gradient overlays */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,16,60,0.97) 0%, rgba(6,16,60,0.75) 60%, rgba(91,42,134,0.4) 100%)' }} />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(168,34,138,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,34,138,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-8">
                <Link href="/services" className="text-xs font-semibold uppercase tracking-widest font-jost" style={{ color: '#A8228A' }}>Services</Link>
                <span className="text-white/30">/</span>
                <span className="text-white/50 text-xs font-jost">Power System Studies</span>
              </div>

              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
                Advanced Power System Studies Delivered by HV, MV &amp; EHV Specialists
              </h1>

              <p className="font-jost text-white/70 text-lg mb-10 max-w-3xl leading-relaxed">
                Keentel Engineering provides comprehensive power system studies nationwide, empowering utilities, industrial plants, renewable projects, and commercial facilities with reliable, data-driven solutions.
              </p>

              <div className="flex flex-wrap gap-4 mb-16">
                <Link
                  href="https://calendly.com/keentel-engineering/15min"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
                >
                  Schedule a Consultation
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link
                  href="tel:813-389-7871"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/20 hover:border-white/50 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  813-389-7871
                </Link>
              </div>

              {/* Cert logos */}
              <div className="border-t border-white/10 pt-8">
                <p className="text-white/30 text-xs uppercase tracking-widest mb-4 font-jost">Certifications &amp; Memberships</p>
                <img
                  src="/images/cert-logos.png"
                  alt="BBB Accredited IEEE Member NERC Certified FL Licensed"
                  className="h-12 object-contain opacity-70"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/new+image-640w.png' }}
                />
              </div>
            </div>
          </div>
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to bottom, transparent, #ffffff)' }} />
        </section>

        {/* ═══════════════════════════════════════════════════════
            2. OVERVIEW — 2-column text + image
        ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#A8228A' }}>Our Approach</span>
                <div className="space-y-5">
                  <p className="font-jost text-gray-600 leading-relaxed text-lg">
                    Our licensed professional engineers perform detailed MV and HV system studies, including transmission planning, <Link href="https://keentelengineering.com/service/power-system-studies/load-flow-analysis-services" className="underline" style={{ color: '#06103C' }} target="_blank">load flow analysis</Link>, short-circuit studies, harmonic assessments, protection coordination, and NERC compliance studies. We utilize industry-leading platforms such as PSS®E, PSCAD, DIgSILENT PowerFactory, and ETAP to ensure technical precision and regulatory alignment.
                  </p>
                  <p className="font-jost text-gray-600 leading-relaxed text-lg">
                    With more than 30 years of engineering expertise, we deliver accurate system modeling, compliance-ready technical reports, and actionable recommendations that enhance electrical reliability and safeguard high-value infrastructure.
                  </p>
                </div>
                <ul className="mt-8 space-y-3">
                  {['Nationwide engineering support', 'Utility-grade simulation tools', 'IEEE, NERC & OSHA compliance', 'Trusted by utilities, EPC firms, and industrial professionals'].map((b, i) => (
                    <li key={i} className="flex items-center gap-3 font-jost text-gray-700">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#A8228A' }}>
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <Img
                    src="/images/services/power-system-studies/overview-engineers.png"
                    fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ChatGPT+Image+Feb+22-+2026-+05_55_57+PM+%281%29-1920w.png"
                    alt="Two technicians in hard hats inspect electrical panel"
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl opacity-20" style={{ background: '#A8228A' }} />
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-xl opacity-10" style={{ background: '#5B2A86' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            3. WHY CHOOSE
        ═══════════════════════════════════════════════════════ */}
        <section className="py-24" style={{ background: '#06103C' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#A8228A' }}>Why Keentel</span>
                <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-white mb-6 leading-tight">
                  Why Utilities and Renewable Owners Choose Keentel Engineering
                </h2>
                <p className="font-jost text-white/60 text-lg leading-relaxed mb-8">
                  When system reliability and safety are mission-critical, organizations trust Keentel Engineering to deliver engineering clarity and proven results.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-jost font-semibold text-white border border-white/20 hover:border-white/50 transition-all"
                >
                  Learn More About Us
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { icon: '🎯', title: '30+ Years of Specialized Experience', desc: 'In high-voltage power engineering across EHV, HV, and MV systems.' },
                  { icon: '🏆', title: 'Certified Power System Engineers', desc: 'With deep technical expertise and licensed PE credentials.' },
                  { icon: '🌎', title: 'Nationwide Project Support', desc: 'Across utility, industrial, and renewable sectors in all 50 states.' },
                  { icon: '🔬', title: 'Advanced Simulation & Modeling Tools', desc: 'For precise system analysis using PSS®E, ETAP, PSCAD, and more.' },
                  { icon: '📋', title: 'Compliance-Focused Reporting', desc: 'Aligned with IEEE, NERC, NFPA, and OSHA standards.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-base" style={{ background: 'rgba(168,34,138,0.2)' }}>
                      <svg className="w-4 h-4" style={{ color: '#A8228A' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <p className="font-urbanist font-bold text-white mb-1">{item.title}</p>
                      <p className="font-jost text-white/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            4. CONTACT FORM
        ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Get in Touch</span>
              <h2 className="font-urbanist font-black text-4xl" style={{ color: '#06103C' }}>
                Let&apos;s Discuss How to Optimize Your Next Project
              </h2>
            </div>
            {formStatus === 'success' ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(168,34,138,0.1)' }}>
                  <svg className="w-8 h-8" style={{ color: '#A8228A' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-urbanist font-bold text-2xl mb-2" style={{ color: '#06103C' }}>Message Received</h3>
                <p className="font-jost text-gray-500">Thank you for contacting Keentel Engineering. We will get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>First Name *</label>
                    <input required type="text" value={formData.firstName} onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))} className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700 focus:ring-2 transition-all" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }} onFocus={e => { e.target.style.borderColor = '#A8228A'; e.target.style.background = '#fff' }} onBlur={e => { e.target.style.borderColor = '#E6E8F0'; e.target.style.background = '#F6F7FB' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>Last Name</label>
                    <input type="text" value={formData.lastName} onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))} className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700 transition-all" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }} onFocus={e => { e.target.style.borderColor = '#A8228A'; e.target.style.background = '#fff' }} onBlur={e => { e.target.style.borderColor = '#E6E8F0'; e.target.style.background = '#F6F7FB' }} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>Phone *</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700 transition-all" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }} onFocus={e => { e.target.style.borderColor = '#A8228A'; e.target.style.background = '#fff' }} onBlur={e => { e.target.style.borderColor = '#E6E8F0'; e.target.style.background = '#F6F7FB' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>Email *</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700 transition-all" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }} onFocus={e => { e.target.style.borderColor = '#A8228A'; e.target.style.background = '#fff' }} onBlur={e => { e.target.style.borderColor = '#E6E8F0'; e.target.style.background = '#F6F7FB' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>What Services Are You Interested In?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['POI Interconnection Engineering Support', 'Substation Design Services', 'EHV, HV, MV Power System Studies', 'Owners Engineering Services', 'NERC O&P 693 Compliance Services', 'Utility Scale Solar Farm Engineering'].map((svc) => (
                      <label key={svc} className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all hover:border-purple-300" style={{ borderColor: formData.service === svc ? '#A8228A' : '#E6E8F0', background: formData.service === svc ? 'rgba(168,34,138,0.05)' : '#F6F7FB' }}>
                        <input type="radio" name="service" value={svc} checked={formData.service === svc} onChange={e => setFormData(p => ({ ...p, service: e.target.value }))} className="accent-pink-600" />
                        <span className="font-jost text-sm text-gray-700">{svc}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>Message</label>
                  <textarea value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} rows={5} className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700 resize-none transition-all" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }} onFocus={e => { e.target.style.borderColor = '#A8228A'; e.target.style.background = '#fff' }} onBlur={e => { e.target.style.borderColor = '#E6E8F0'; e.target.style.background = '#F6F7FB' }} />
                </div>
                {formStatus === 'error' && (
                  <p className="text-sm text-red-500 font-jost p-3 rounded-xl border border-red-100 bg-red-50">Failed to send. Please try again.</p>
                )}
                <button type="submit" disabled={formStatus === 'loading'} className="w-full py-4 rounded-full font-jost font-semibold text-white text-lg transition-all hover:opacity-90 disabled:opacity-60" style={{ background: 'linear-gradient(135deg, #06103C, #5B2A86)' }}>
                  {formStatus === 'loading' ? 'Sending...' : 'Submit Request →'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            5. SOFTWARE CAPABILITIES (Simplified)
        ═══════════════════════════════════════════════════════ */}
        <section className="py-20" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Tools We Use</span>
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>Our Software Capabilities</h2>
            </div>

            {/* Tab strip */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {softwareTools.map(tool => (
                <button
                  key={tool.key}
                  onClick={() => setActiveSoftware(tool.key)}
                  className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 min-w-[100px]"
                  style={{
                    borderColor: activeSoftware === tool.key ? '#A8228A' : '#E6E8F0',
                    background: activeSoftware === tool.key ? 'rgba(168,34,138,0.05)' : '#fff',
                    boxShadow: activeSoftware === tool.key ? '0 4px 18px rgba(168,34,138,0.18)' : 'none',
                  }}
                >
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="h-9 max-w-[90px] object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).src = tool.fallback }}
                  />
                  <span className="text-xs font-bold uppercase tracking-wide font-jost" style={{ color: activeSoftware === tool.key ? '#A8228A' : '#999' }}>
                    {tool.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Active panel */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: '#E6E8F0' }}>
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <img src={activeTool.logo} alt={activeTool.name} className="h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = activeTool.fallback }} />
                      <h3 className="font-urbanist font-bold text-2xl" style={{ color: '#06103C' }}>{activeTool.name}</h3>
                    </div>
                    <p className="font-jost text-gray-600 leading-relaxed mb-6">{activeTool.description}</p>
                    <Link href="https://keentelengineering.com/software-capabilities-faqs" target="_blank" className="inline-flex items-center gap-2 font-jost font-semibold text-sm" style={{ color: '#A8228A' }}>
                      See All {activeTool.name} FAQs
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-4 font-jost" style={{ color: '#06103C' }}>Key Capabilities</p>
                    <ul className="space-y-3">
                      {activeTool.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-3 font-jost text-gray-700 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#A8228A' }} />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            6. OUR STUDY SERVICES — 6 cards
        ═══════════════════════════════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Study Types</span>
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl mb-4" style={{ color: '#06103C' }}>Our Power System Study Services</h2>
              <p className="font-jost text-gray-500 text-lg max-w-2xl">
                We provide comprehensive electrical system studies designed to improve safety, ensure compliance, and optimize performance across HV, MV, and EHV networks.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Transmission Planning', img: '/images/services/power-system-studies/study-transmission-planning.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/transmission_planning_studies_correct_logos-1920w.png', desc: 'Support grid expansion through power flow, contingency, and stability studies to identify constraints and improve system reliability.', link: 'https://keentelengineering.com/service/power-system-studies/transmission-planning-studies' },
                { title: 'Load Flow Analysis', img: '/images/services/power-system-studies/study-load-flow.webp', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ae649c9f9982d1727f1d40be7d72666e-1920w.webp', desc: 'Evaluate voltage stability, load distribution, and losses to ensure efficient power performance during normal and peak demand.', link: 'https://keentelengineering.com/service/power-system-studies/load-flow-analysis-services' },
                { title: 'Short Circuit Studies', img: '/images/services/power-system-studies/study-short-circuit.jpg', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/images-1920w.jpg', desc: 'Determine fault current levels, validate equipment ratings, and verify protection devices operate correctly during abnormal system events.', link: 'https://keentelengineering.com/service/power-system-studies/short-circuit-analysis-power-system' },
                { title: 'Protective Coordination', img: '/images/services/power-system-studies/study-protection-coordination.jpg', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/protection-coordination-practices-distribution-generation-920x613-1920w.jpg', desc: 'Optimize relay and breaker settings using time-current analysis to isolate faults quickly and minimize system disruption.', link: 'https://keentelengineering.com/services/power-system-studies/protective-device-coordination-studies' },
                { title: 'Harmonic Analysis', img: '/images/services/power-system-studies/study-harmonic-analysis.jpg', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/studi-dan-analisis-harmonik-harmonic-study-and-analysis-1920w.jpg', desc: 'Detect waveform distortion from inverter sources and nonlinear loads through harmonic analysis, resonance evaluation, and mitigation studies.', link: 'https://keentelengineering.com/service/power-system-studies/harmonic-analysis-power-systems' },
                { title: 'Grounding Protection', img: '/images/services/power-system-studies/study-grounding.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/c5e7c86d-60f2-4b2e-8f31-ce7c0a3d1b64-1920w.png', desc: 'Reduce step and touch voltage risks through grounding studies, fault analysis, and protection performance evaluation for safer system operation.', link: 'https://keentelengineering.com/service/power-system-studies/grounding-system-studies' },
              ].map((item, i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border" style={{ borderColor: '#E6E8F0' }}>
                  <div className="relative h-48 overflow-hidden">
                    <Img src={item.img} fallback={item.fallback} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, #06103C, transparent)' }} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-urbanist font-bold text-xl mb-3" style={{ color: '#06103C' }}>{item.title}</h3>
                    <p className="font-jost text-gray-500 text-sm leading-relaxed mb-5">{item.desc}</p>
                    <Link href={item.link} target="_blank" className="inline-flex items-center gap-2 text-sm font-semibold font-jost" style={{ color: '#A8228A' }}>
                      Learn More
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            7. DOWNLOAD FLYER (single instance)
        ═══════════════════════════════════════════════════════ */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 100%)' }}>
              <div>
                <h3 className="font-urbanist font-bold text-2xl text-white mb-1">Download Power System Studies Flyer</h3>
                <p className="font-jost text-white/60 text-sm">Click the download button to get our Power System Studies overview flyer</p>
              </div>
              <Link
                href="/files/advance-power-system.pdf"
                target="_blank"
                className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-jost font-semibold text-white transition-all hover:scale-105"
                style={{ background: '#A8228A' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download The Flyer
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            8+9+10. PROCESS — Header + 6 steps
        ═══════════════════════════════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14 max-w-3xl">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Our Power System Studies Process</span>
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl mb-4" style={{ color: '#06103C' }}>High Voltage Power System Study Execution Framework</h2>
              <h3 className="font-urbanist font-semibold text-xl mb-4" style={{ color: '#5B2A86' }}>Transmission-Level Modeling Using PSS®E, PSCAD, ETAP &amp; DIgSILENT</h3>
              <p className="font-jost text-gray-500 leading-relaxed">
                Keentel Engineering performs HV and EHV power system studies using a structured, multi-platform methodology aligned with ISO interconnection standards, IEEE requirements, and NERC reliability criteria. Our execution framework ensures modeling accuracy, cross-software validation, and compliance-ready deliverables from transmission-level analysis to detailed facility protection.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  num: '01', title: 'Scope Definition & Compliance Alignment',
                  img: '/images/services/power-system-studies/process-scope-definition.png',
                  fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Phase+1+-+Scope+Definition+-+Compliance+Alignment+7878-1920w.png',
                  desc: 'Every project begins with a clearly defined technical framework and study matrix.',
                  bullets: ['Define POI-to-grid limits', 'Set N-0, N-1, N-1-1 cases', 'Model peak and light load scenarios', 'Identify weak grid / low SCR cases', 'Align with IEEE, NERC, ANSI/IEC standards', 'Assign appropriate study software'],
                },
                {
                  num: '02', title: 'Structured Data Collection & Model Integrity',
                  img: '/images/services/power-system-studies/process-data-collection.png',
                  fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/4520f800-a491-4d33-b1ff-ae4edbf9515f-1920w.png',
                  desc: 'Accurate studies require verified inputs and documented assumptions.',
                  bullets: ['Utility base case files (.sav, .raw, .dyr)', 'Transformer ratings, impedance, vector group', 'Line R/X/B data and thermal ratings', 'Generator/inverter dynamic models', 'Breaker duties, CT/PT data, relay settings', 'Ground grid layout and soil parameters'],
                },
                {
                  num: '03', title: 'Transmission-Level RMS & EMT Modeling',
                  img: '/images/services/power-system-studies/process-rms-emt.png',
                  fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/41e62c42-8f51-424a-9476-ad838dbbeb21-1920w.png',
                  desc: 'Using PSS®E, DIgSILENT, and PSCAD, we validate system behavior under real conditions.',
                  bullets: ['Load flow and voltage validation', 'Reactive margin and loading checks', 'N-1 / N-1-1 contingency analysis', 'POI short-circuit screening', 'Transient stability simulations', 'EMT modeling for weak grid and fast transients'],
                },
                {
                  num: '04', title: 'Detailed Short Circuit & Protection Coordination',
                  img: '/images/services/power-system-studies/process-short-circuit.png',
                  fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/d63284e8-cf40-4eec-bc82-04927b6dea79-1920w.png',
                  desc: 'Facility-level integrity is validated using ETAP or DIgSILENT.',
                  bullets: ['ANSI / IEC short-circuit calculations (3ϕ, SLG, LL, DLG)', 'Breaker interrupting and withstand duty verification', 'Protection coordination and TCC curve development', 'Selectivity and grading margin confirmation', 'HV, MV, and LV relay philosophy validation'],
                },
                {
                  num: '05', title: 'Arc Flash, Harmonics & Grounding Analysis',
                  img: '/images/services/power-system-studies/process-arc-flash.png',
                  fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/d3f39548-fac0-44d9-913e-a4a45ddfbe2d-1920w.png',
                  desc: 'Safety and power quality are evaluated using realistic clearing times and operating conditions.',
                  bullets: ['Arc flash study per IEEE 1584', 'Incident energy and PPE category determination', 'Harmonic distortion and resonance analysis (IEEE 519)', 'Frequency scan and filter adequacy review', 'Ground grid step and touch voltage verification'],
                },
                {
                  num: '06', title: 'Cross-Platform Validation & QA/QC',
                  img: '/images/services/power-system-studies/process-qaqc.png',
                  fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/asd-1920w.png',
                  desc: 'Transmission-grade studies require final reconciliation and independent review prior to issuance.',
                  bullets: ['Cross-verify transformer impedance, fault levels, and X/R ratios', 'Confirm RMS and EMT model consistency', 'Resolve identified variances', 'Implement mitigation measures', 'Issue version-controlled, compliance-ready reports'],
                },
              ].map((step, i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-300" style={{ borderColor: '#E6E8F0' }}>
                  <div className="relative h-44 overflow-hidden">
                    <Img src={step.img} fallback={step.fallback} alt={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center font-urbanist font-black text-sm text-white" style={{ background: '#A8228A' }}>{step.num}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-urbanist font-bold text-lg mb-2 leading-snug" style={{ color: '#06103C' }}>{step.title}</h3>
                    <p className="font-jost text-gray-500 text-sm mb-4 leading-relaxed">{step.desc}</p>
                    <ul className="space-y-1.5">
                      {step.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2 font-jost text-xs text-gray-600">
                          <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#A8228A' }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            {/* Process CTA */}
            <div className="mt-10 text-center">
              <Link
                href="https://keentelengineering.com/power-system-study-process"
                target="_blank"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-jost font-semibold text-white transition-all hover:opacity-90"
                style={{ background: '#06103C' }}
              >
                See Detailed Process
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            12. INDUSTRIES WE SUPPORT
        ═══════════════════════════════════════════════════════ */}
        <section className="py-24" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Sectors</span>
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl mb-4" style={{ color: '#06103C' }}>Industries We Support</h2>
              <p className="font-jost text-gray-500 text-lg max-w-2xl">
                Keentel Engineering delivers power system studies for complex electrical environments across multiple sectors.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { title: 'Utilities & Transmission Operators', img: '/images/services/power-system-studies/industry-utilities.jpg', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/shutterstock_551404123-1920w.jpg', link: 'https://keentelengineering.com/industries/electric-utilities-transmission' },
                { title: 'Renewable Energy Developers', img: '/images/services/power-system-studies/industry-renewable.jpg', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/GettyImages-2174080781-508c0aae85a94ae6a7c4f9c303eae4f1-1920w.jpg', link: 'https://keentelengineering.com/industries/renewable-interconnection-engineering' },
                { title: 'Industrial & Manufacturing Facilities', img: '/images/services/power-system-studies/industry-industrial.webp', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/factory-1920w+%281%29-1920w.webp', link: 'https://keentelengineering.com/industries/industrial-power-engineering' },
                { title: 'Oil, Gas & Mining Operations', img: '/images/services/power-system-studies/industry-oil-gas.jpg', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Trends-in-Oil-and-Gas-guide-1920w.jpg', link: 'https://keentelengineering.com/industries/oil-gas-mining' },
                { title: 'Data Centers & Commercial Infrastructure', img: '/images/services/power-system-studies/industry-data-center.jpg', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/corporate-data-center-1920w.jpg', link: 'https://keentelengineering.com/industries/data-center-electrical' },
              ].map((item, i) => (
                <Link key={i} href={item.link} target="_blank" className="group relative rounded-xl overflow-hidden block" style={{ aspectRatio: '3/4' }}>
                  <Img src={item.img} fallback={item.fallback} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,16,60,0.9) 0%, rgba(6,16,60,0.3) 60%, transparent 100%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-urbanist font-bold text-white text-sm leading-tight">{item.title}</p>
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

        {/* ═══════════════════════════════════════════════════════
            14. CASE STUDIES
        ═══════════════════════════════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Real Projects</span>
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl mb-3" style={{ color: '#06103C' }}>Case Studies</h2>
              <p className="font-jost text-gray-500 text-lg">Harmonic &amp; Power System Studies by Keentel Engineering</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { title: 'Grid Interconnection & Renewable Penetration Analysis (ERCOT)', img: '/images/services/power-system-studies/case-ercot.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/36988c7b-c24f-4e4d-91b6-f0fd406661fc-1920w.png', desc: 'Keentel Engineering supported a major renewable developer with interconnection studies for multiple solar and wind projects in a constrained ERCOT corridor. We performed detailed load flow, short-circuit, and stability analyses to evaluate high inverter-based resource penetration scenarios.' },
                { title: 'Hybrid Solar & Wind Farm Electrical Design and System Studies', img: '/images/services/power-system-studies/case-solar-wind.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/4f895de6-666e-41fb-a2dc-f877c3d37929-1920w.png', desc: 'For an independent power producer in the Southwest U.S., Keentel delivered full electrical design and compliance studies for a combined solar and wind facility, including MV collector systems, POI substation interfaces, and protection coordination.' },
                { title: 'Reactive Power Compensation & Capacitor Bank Optimization (MISO)', img: '/images/services/power-system-studies/case-miso.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ecd37f5c-72d7-412f-ba6d-6468fb016d94-1920w.png', desc: 'A transmission-connected industrial facility experienced poor power factor and voltage regulation issues. Keentel conducted reactive power compensation studies to optimize capacitor bank sizing, placement, and switching strategies.' },
              ].map((cs, i) => (
                <div key={i} className="group rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ borderColor: '#E6E8F0' }}>
                  <div className="relative h-52 overflow-hidden">
                    <Img src={cs.img} fallback={cs.fallback} alt={cs.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity" style={{ background: '#06103C' }} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-urbanist font-bold text-lg mb-3 leading-snug" style={{ color: '#06103C' }}>{cs.title}</h3>
                    <p className="font-jost text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{cs.desc}</p>
                    <Link href="https://keentelengineering.com/power-system-study-case-studies" target="_blank" className="inline-flex items-center gap-2 text-sm font-semibold font-jost" style={{ color: '#A8228A' }}>
                      See Full Case Study
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="https://keentelengineering.com/power-system-study-case-studies" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold border-2 transition-all" style={{ borderColor: '#06103C', color: '#06103C' }}>
                See All Case Studies
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            16. FINAL CTA
        ═══════════════════════════════════════════════════════ */}
        <section className="py-24 overflow-hidden" style={{ background: '#06103C' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#A8228A' }}>Get Started</span>
                <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-white mb-4 leading-tight">
                  Ensure Your Electrical Infrastructure Is Safe, Compliant, and Future-Ready
                </h2>
                <p className="font-jost text-white/60 text-lg mb-8 leading-relaxed">
                  Speak with an engineer experienced in POI design, utility coordination, and interconnection approvals.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                    Schedule A Consultation
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                  <Link href="tel:813-389-7871" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/20 hover:border-white/50 transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    Speak With an Engineer
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <Img src="/images/services/power-system-studies/cta-engineers.png" fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/e857ee18-180f-48b2-bfa8-38daf048d05c-1920w.png" alt="Keentel engineers at work" className="w-full h-72 object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl opacity-20" style={{ background: '#A8228A' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            17. CLIENT LOGOS
        ═══════════════════════════════════════════════════════ */}
        <section className="py-20" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Trusted By</span>
              <h2 className="font-urbanist font-black text-3xl" style={{ color: '#06103C' }}>Who We&apos;ve Served</h2>
              <p className="font-jost text-gray-500 mt-2">Serving utilities, EPCs, developers, and infrastructure organizations supporting critical power systems nationwide.</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 gap-4">
              {[
                { src: '/images/clients/rrc-companies.webp', alt: 'RRC Companies' },
                { src: '/images/clients/pae-engineers.webp', alt: 'PAE Engineers' },
                { src: '/images/clients/edf-power-solutions.webp', alt: 'EDF Power Solutions' },
                { src: '/images/clients/pike-engineering.webp', alt: 'Pike Engineering' },
                { src: '/images/clients/risk-work.webp', alt: 'Risk Work' },
                { src: '/images/clients/siemens-energy-1.webp', alt: 'Siemens Energy' },
                { src: '/images/clients/avangrid.webp', alt: 'Avangrid' },
                { src: '/images/clients/siemens-energy-2.webp', alt: 'Siemens Energy' },
                { src: '/images/clients/aypa-power.webp', alt: 'AYPA Power' },
              ].map((logo, i) => (
                <div key={i} className="bg-white rounded-xl p-4 flex items-center justify-center border shadow-sm h-20" style={{ borderColor: '#E6E8F0' }}>
                  <img src={logo.src} alt={logo.alt} className="max-h-12 max-w-full object-contain" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            19. FAQ ACCORDION
        ═══════════════════════════════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Common Questions</span>
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border overflow-hidden transition-all duration-200" style={{ borderColor: openFaq === i ? '#A8228A' : '#E6E8F0' }}>
                  <button className="w-full text-left px-6 py-5 flex items-start justify-between gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-urbanist font-semibold text-base leading-snug" style={{ color: '#06103C' }}>{i + 1}. {item.q}</span>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300" style={openFaq === i ? { background: '#A8228A' } : { background: '#E6E8F0' }}>
                      <svg className="w-3.5 h-3.5 transition-transform duration-300" style={{ color: openFaq === i ? '#fff' : '#5B2A86', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <div className="border-t pt-4" style={{ borderColor: '#E6E8F0' }}>
                        <p className="font-jost text-gray-600 leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            20. BLOG SECTION — Dynamic from Sanity
        ═══════════════════════════════════════════════════════ */}
        {blogs.length > 0 && (
          <section className="py-24" style={{ background: '#F6F7FB' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Technical Reading</span>
                  <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>Power System Studies – Blogs</h2>
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
