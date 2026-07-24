'use client'

import { useEffect, useState, useRef } from 'react'
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

interface CaseStudy {
  _id: string
  title: string
  slug: { current: string }
  category: string
  cardImage?: string
  excerpt?: string
}


// ── Software Capabilities Data (tool FAQs, replaces bullet-point list) ─────
const softwareTools = [
  {
    key: 'psse',
    name: 'PSS®E',
    logo: '/images/services/power-system-studies/logo-psse.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/PSSE-1920w.png',
    description: 'Power System Simulator for Engineering by Siemens — industry standard for large-scale transmission network analysis.',
    faqs: [
      { q: 'What size networks can PSS®E handle?', a: 'We model transmission networks up to 200,000 buses in PSS®E, which covers everything from regional interconnection studies to full ISO-scale planning cases.' },
      { q: 'Can PSS®E model renewable energy assets?', a: 'Yes. We build detailed solar, wind, and BESS dynamic models in PSS®E for load flow, contingency, and transient stability studies.' },
      { q: 'Do you automate PSS®E workflows?', a: 'We use the PSS®E Python API to automate batch contingency runs and repetitive study cases, which shortens turnaround on large study matrices.' },
    ],
  },
  {
    key: 'etap',
    name: 'ETAP',
    logo: '/images/services/power-system-studies/logo-etap.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ETAP-1920w.png',
    description: 'Integrated electrical power system platform for design, simulation, analysis, and real-time operation.',
    faqs: [
      { q: 'Does ETAP cover arc flash studies?', a: 'Yes, we run arc flash analysis in ETAP per IEEE 1584 and NFPA 70E, and produce compliant labeling and PPE category recommendations.' },
      { q: 'Can ETAP model microgrids and BESS?', a: 'We model solar PV, wind, battery storage, and full microgrid configurations in ETAP, including islanding and protection scenarios.' },
      { q: 'What standards does ETAP support?', a: 'ETAP supports both ANSI and IEC short-circuit and protection coordination methods, so we can deliver studies for U.S. and international projects.' },
    ],
  },
  {
    key: 'pscad',
    name: 'PSCAD',
    logo: '/images/services/power-system-studies/logo-pscad.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Logo+-+PSCAD+MHI+BLUE-+2018-1920w.png',
    description: 'Electromagnetic transient (EMT) simulation for fast electrical phenomena including HVDC, converters, and inverter-based resources.',
    faqs: [
      { q: 'When do you use PSCAD instead of PSS®E?', a: 'PSCAD is our tool for microsecond-level EMT phenomena — lightning surges, switching transients, and inverter-based resource control interactions that RMS tools like PSS®E cannot capture.' },
      { q: 'Can PSCAD model HVDC systems?', a: 'Yes, we model both LCC and VSC HVDC configurations in PSCAD, including control system tuning and fault response.' },
      { q: 'Do you simulate grid-forming inverters?', a: 'We model grid-forming and grid-following inverter control strategies in PSCAD to evaluate weak grid stability and fast transient response.' },
    ],
  },
  {
    key: 'powerworld',
    name: 'PowerWorld',
    logo: '/images/services/power-system-studies/logo-powerworld.jpg',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/PowerWorld-1920w.jpg',
    description: 'Interactive power system simulation with animated one-line diagrams and geographic visualization capabilities.',
    faqs: [
      { q: 'What is PowerWorld best used for?', a: 'We use PowerWorld for interactive power flow and contingency analysis, especially when a visual, animated one-line helps a client understand system behavior quickly.' },
      { q: 'Can PowerWorld run optimal power flow studies?', a: 'Yes, we run Optimal Power Flow (OPF) and PV/QV voltage stability studies in PowerWorld for transmission planning work.' },
      { q: 'How large a network can PowerWorld model?', a: 'PowerWorld handles networks up to roughly 250,000 buses using Newton-Raphson solvers, comparable in scale to our PSS®E cases.' },
    ],
  },
  {
    key: 'skm',
    name: 'SKM PTW',
    logo: '/images/services/power-system-studies/logo-skm.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/SKM+PowerTools-1920w.png',
    description: 'Comprehensive electrical engineering platform for power system design, analysis, and safety evaluation.',
    faqs: [
      { q: 'What studies does SKM PTW cover?', a: 'We use SKM PTW for load flow, short-circuit, and arc flash studies, along with protection coordination through its CAPTOR module.' },
      { q: 'Can SKM evaluate harmonics?', a: 'Yes, the HI_WAVE module in SKM PTW lets us evaluate harmonic distortion levels against IEEE 519 limits.' },
      { q: 'Is SKM suitable for industrial and data center work?', a: 'SKM PTW is one of our primary platforms for industrial, utility, and data center electrical system studies under ANSI and IEC standards.' },
    ],
  },
  {
    key: 'autocad',
    name: 'AutoCAD Elec.',
    logo: '/images/services/power-system-studies/logo-autocad.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/aeimages-1920w.png',
    description: 'Intelligent electrical design automation with automated wire numbering, component tagging, and error checking.',
    faqs: [
      { q: 'What deliverables come out of AutoCAD Electrical?', a: 'We produce protection schematics, relay panel designs, and AC/DC substation diagrams, along with automated BOM and cable list generation.' },
      { q: 'Which symbol libraries do you use?', a: 'We work with IEC, ANSI, and JIC symbol libraries so drawings match the standards your utility or client requires.' },
      { q: 'How do you keep documentation NERC-traceable?', a: 'We manage revisions through Autodesk Vault with multi-user collaboration, keeping every drawing set version-controlled and traceable for compliance review.' },
    ],
  },
  {
    key: 'aspen',
    name: 'ASPEN',
    logo: '/images/services/power-system-studies/logo-aspen.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/6a12ed_77c665e4ee2c4db2b3fbb92a34f3b12e-mv2-1920w.png',
    description: 'Advanced short circuit analysis and relay coordination platform used by protection engineers worldwide.',
    faqs: [
      { q: 'What is ASPEN used for at Keentel?', a: 'ASPEN is our primary platform for short-circuit and relay coordination studies under ANSI, IEC, and NERC criteria.' },
      { q: 'Can ASPEN model manufacturer-specific relay logic?', a: 'Yes, we build manufacturer-specific relay logic models in ASPEN to verify coordination against actual installed protection equipment.' },
      { q: 'Does ASPEN support inverter-based resources?', a: 'ASPEN includes support for inverter-based resource modeling, which we use when evaluating fault response on renewable-heavy feeders.' },
    ],
  },
]

// ── Main Service FAQ Data ────────────────────────────────────────────────
const faqs = [
  {
    q: 'Which power system studies does Keentel perform?',
    a: 'We perform load flow, contingency, short-circuit and duty analysis, protection coordination, arc-flash, harmonic and power quality studies, motor starting, voltage drop, transient stability where applicable, and grounding studies. We tailor the study set to the system voltage class (EHV, HV, or MV), facility type, and specific regulatory and utility requirements.',
  },
  {
    q: 'Why are short-circuit studies critical for EHV, HV, and MV systems?',
    a: 'Short-circuit studies confirm equipment interrupting ratings and momentary withstand capabilities. They also define protective device settings, ensure breaker duty compliance, and reduce the risk of catastrophic equipment failure. These studies are often required for utility approval and safe long-term operation.',
  },
  {
    q: 'What is the difference between coordination studies and arc-flash studies?',
    a: 'Coordination studies ensure protective devices operate selectively and quickly for electrical faults. Arc-flash studies estimate incident energy exposure and define PPE boundaries and equipment labeling requirements. Because coordination directly impacts arc-flash results, we typically perform these as an integrated workflow to balance safety and system selectivity.',
  },
  {
    q: 'How does Keentel evaluate harmonics and power quality?',
    a: 'We model harmonic sources such as inverters, variable frequency drives, and large rectifiers, calculate distortion levels at key buses, and verify compliance with applicable limits, often IEEE 519 or specific utility requirements. If mitigation is required, we evaluate filter options, transformer configurations, and system impedance changes to develop a practical solution.',
  },
  {
    q: 'Can Keentel study weak grid and inverter-based resource interconnections?',
    a: 'Yes. Weak grid conditions affect voltage stability, fault response, and protection performance. We evaluate short-circuit ratio, reactive power margin, voltage regulation, and control interactions to recommend mitigation such as STATCOMs, synchronous condensers, or tuned control strategies to ensure stable and compliant operation.',
  },
  {
    q: 'What data does Keentel need to begin a power system study?',
    a: 'We typically need one-line diagrams, equipment ratings, transformer impedances and tap settings, cable and conductor data, protective device details, load profiles, generator or inverter parameters, and utility source equivalents. We can also work with partial data early in a project and refine models as detailed design progresses.',
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

// ── Shared FAQ Accordion Item (matches homepage FAQ.tsx design exactly) ────
function FaqAccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        border: `1.5px solid ${open ? '#A8228A' : '#E6E8F0'}`,
        boxShadow: open ? '0 4px 24px rgba(168,34,138,0.1)' : 'none',
      }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6">
        <span className="font-urbanist font-black text-xl sm:text-2xl flex-shrink-0 w-7 sm:w-8" style={{ color: '#000000' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h4 className="font-urbanist font-bold text-base sm:text-xl leading-snug flex-1" style={{ color: '#0B1230' }}>{q}</h4>
        <div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{ background: open ? '#A8228A' : '#F6F7FB', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: open ? '#fff' : '#A8228A' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '600px' : '0px' }}>
        <p className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[52px] sm:pl-[72px] text-sm sm:text-base font-jost leading-relaxed" style={{ color: '#4B5563' }}>{a}</p>
      </div>
    </div>
  )
}

// ── Shared FAQ Section (exact homepage layout: sticky left + accordion right)
function FaqSection({
  eyebrow, heading, headingLine2, intro, items, ctaText = 'Ask Us Directly', ctaHref = 'https://calendly.com/keentel-engineering/15min',
}: {
  eyebrow: string; heading: string; headingLine2?: string; intro: string
  items: { q: string; a: string }[]; ctaText?: string; ctaHref?: string
}) {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-widest mb-4 font-jost" style={{ color: '#A8228A' }}>{eyebrow}</p>
            <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6" style={{ color: '#0B1230' }}>
              {heading}{headingLine2 && <><br />{headingLine2}</>}
            </h2>
            <p className="text-base font-jost leading-relaxed mb-8" style={{ color: '#4B5563' }}>{intro}</p>
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 font-jost font-semibold text-white transition-all hover:-translate-y-0.5 sm:w-auto"
              style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
            >
              {ctaText}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-3">
            {items.map((item, i) => (
              <FaqAccordionItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function PowerSystemStudiesPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [activeSoftware, setActiveSoftware] = useState('psse')
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost" && (
        category match "*power*" || category match "*Power*" || category match "*system*"
        || category match "*System*" || category match "*study*" || category match "*Study*"
        || category match "*harmonic*" || category match "*protection*" || category match "*relay*"
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
      `*[_type == "caseStudy" && (relatedService == "power-system-studies")] | order(_createdAt desc) [0...3] {
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
      <main className="overflow-x-hidden">

{/* ═══════════════════════════════════════════════════════
            1. HERO — video visible, overlay contained, big desc
        ═══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center overflow-hidden" style={{ background: '#06103C' }}>
          <video
            ref={videoRef}
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => {}}
          >
            <source src="/videos/power-plant-electricity.mp4" type="video/mp4" />
          </video>

          {/* Lighter overlay so video reads through clearly, fully contained to section */}
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <Link href="/services" className="text-xs font-semibold uppercase tracking-widest font-jost" style={{ color: '#C72E9E' }}>Services</Link>
                <span className="text-white/30">/</span>
                <span className="text-white/50 text-xs font-jost">Power System Studies</span>
              </div>

              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.5rem)' }}>
                Advanced Power System Studies Delivered by HV, MV &amp; EHV Specialists
              </h1>

              {/* Bigger, more prominent description */}
              <p className="font-jost text-white/90 mb-10 max-w-3xl leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)' }}>
                Keentel Engineering provides comprehensive power system studies nationwide, empowering utilities, industrial plants, renewable projects, and commercial facilities with reliable, data-driven solutions.
              </p>

              <div className="flex flex-col gap-4 mb-14 sm:mb-16 sm:flex-row sm:flex-wrap">
                <Link
                  href="https://calendly.com/keentel-engineering/15min"
                  target="_blank"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-jost font-semibold text-white transition-all hover:scale-105 hover:shadow-lg sm:w-auto"
                  style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
                >
                  Schedule a Consultation
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link
                  href="tel:813-389-7871"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 font-jost font-semibold text-white transition-all hover:border-white/60 sm:w-auto"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  813-389-7871
                </Link>
              </div>

              <div className="border-t border-white/10 pt-8">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-5 font-jost font-semibold">Certifications &amp; Memberships</p>
                <div className="block w-full rounded-2xl px-4 py-5 sm:inline-block sm:w-auto sm:px-6" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <img
                    src="/images/cert-logos-nspe.png"
                    alt="BBB Accredited IEEE Member NERC Certified FL Licensed"
                    className="h-auto max-h-20 w-full object-contain sm:h-24 sm:w-auto sm:max-h-24"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/new+image-640w.png' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            2. OUR APPROACH — full modern redesign
        ═══════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="max-w-4xl font-urbanist font-black leading-tight mb-10" style={{ color: '#06103C', fontSize: 'clamp(2.2rem, 4vw, 3.25rem)' }}>
              Engineering-First Studies, Not Just Reports
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                {/* Pull-quote callout for prominence */}
                <div className="border-l-4 pl-5 mb-7" style={{ borderColor: '#A8228A' }}>
                  <p className="font-jost text-gray-800 leading-relaxed italic" style={{ fontSize: '1.2rem' }}>
                    We don&apos;t hand you a stack of numbers. We hand you engineering judgment, backed by data you can defend to any regulator.
                  </p>
                </div>

                <div className="space-y-5">
                  <p className="font-jost text-gray-600 leading-relaxed text-lg">
                    Our licensed professional engineers perform detailed MV and HV system studies, including transmission planning, <Link href="/service/power-system-studies/load-flow-analysis-services" className="font-semibold text-[#A8228A] underline underline-offset-2">load flow analysis</Link>, <Link href="/service/power-system-studies/short-circuit-analysis-power-system" className="font-semibold text-[#A8228A] underline underline-offset-2">short-circuit studies</Link>, harmonic assessments, protection coordination, and NERC compliance studies. We utilize industry-leading platforms such as PSS®E, PSCAD, DIgSILENT PowerFactory, and ETAP to ensure technical precision and regulatory alignment.
                  </p>
                  <p className="font-jost text-gray-600 leading-relaxed text-lg">
                    With more than 30 years of engineering expertise, we deliver accurate system modeling, compliance-ready technical reports, and actionable recommendations that enhance electrical reliability and safeguard high-value infrastructure.
                  </p>
                </div>

              </div>

              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <Img
                    src="/images/services/power-system-studies/overview-engineers.jpg"
                    fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ChatGPT+Image+Feb+22-+2026-+05_55_57+PM+%281%29-1920w.png"
                    alt="Two technicians in hard hats inspect electrical panel"
                    className="w-full h-72 sm:h-96 object-cover"
                  />
                </div>
                {/* Floating stat badge */}
                <div className="absolute -bottom-6 -left-6 hidden sm:block rounded-2xl p-5 shadow-xl" style={{ background: '#06103C' }}>
                  <p className="font-urbanist font-black text-3xl text-white">98%</p>
                  <p className="font-jost text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Client Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactForm />

        {/* Software capabilities — immediately after the contact form */}
        <section className="hidden" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Tools We Use</span>
              <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl" style={{ color: '#06103C' }}>Our Software Capabilities</h2>
              <p className="font-jost text-gray-500 text-lg mt-4 max-w-2xl mx-auto">Select a platform to see what it&apos;s built for and the questions clients ask most.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
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
                  <img src={tool.logo} alt={tool.name} className="h-9 max-w-[90px] object-contain" onError={(e) => { (e.target as HTMLImageElement).src = tool.fallback }} />
                  <span className="text-xs font-bold uppercase tracking-wide font-jost" style={{ color: activeSoftware === tool.key ? '#A8228A' : '#999' }}>{tool.name}</span>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border p-6 sm:p-8" style={{ borderColor: '#E6E8F0' }}>
              <div className="flex items-center gap-4 mb-3">
                <img src={activeTool.logo} alt={activeTool.name} className="h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = activeTool.fallback }} />
                <h3 className="font-urbanist font-bold text-xl sm:text-2xl" style={{ color: '#06103C' }}>{activeTool.name}</h3>
              </div>
              <p className="font-jost text-gray-600 leading-relaxed mb-8 max-w-3xl">{activeTool.description}</p>
              <div className="flex flex-col gap-3">
                {activeTool.faqs.map((f, i) => (
                  <FaqAccordionItem key={i} q={f.q} a={f.a} index={i} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/service/software-capabilities-faqs" className="inline-flex items-center gap-2 font-jost font-semibold text-sm" style={{ color: '#A8228A' }}>
                  See All {activeTool.name} FAQs
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <SoftwareCapabilities />


        {/* ═══════════════════════════════════════════════════════
            3. WHY CHOOSE — two-column, branded card panel
        ═══════════════════════════════════════════════════════ */}
        <section className="hidden" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#C72E9E' }}>Why Keentel</span>
                <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                  Why Utilities and Renewable Owners Choose Keentel Engineering
                </h2>
                <p className="font-jost text-white/70 text-lg leading-relaxed mb-8">
                  When system reliability and safety are mission-critical, organizations trust Keentel Engineering to deliver engineering clarity and proven results.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-jost font-semibold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
                >
                  Learn More About Us
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>

              {/* Right: branded card panel */}
              <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8" style={{ background: 'linear-gradient(160deg, rgba(168,34,138,0.12), rgba(91,42,134,0.12))', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="space-y-4">
                  {[
                    { title: '30+ Years of Specialized Experience', desc: 'In high-voltage power engineering across EHV, HV, and MV systems.' },
                    { title: 'Certified Power System Engineers', desc: 'With deep technical expertise and licensed PE credentials.' },
                    { title: 'Nationwide Project Support', desc: 'Across utility, industrial, and renewable sectors in all 50 states.' },
                    { title: 'Advanced Simulation & Modeling Tools', desc: 'For precise system analysis using PSS®E, ETAP, PSCAD, and more.' },
                    { title: 'Compliance-Focused Reporting', desc: 'Aligned with IEEE, NERC, NFPA, and OSHA standards.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-xl transition-all hover:bg-white/5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#A8228A' }}>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div>
                        <p className="font-urbanist font-bold text-white text-base sm:text-lg mb-1">{item.title}</p>
                        <p className="font-jost text-white/65 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            4. GET IN TOUCH — full branded redesign
        ═══════════════════════════════════════════════════════ */}


        {/* ═══════════════════════════════════════════════════════
            5. SOFTWARE CAPABILITIES — now FAQ-driven per tool
        ═══════════════════════════════════════════════════════ */}
        {/* ═══════════════════════════════════════════════════════
            6. STUDY TYPES — prominent desc
        ═══════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Study Types</span>
              <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ color: '#06103C' }}>Our Power System Study Services</h2>
              <p className="font-jost text-gray-600 leading-relaxed max-w-2xl" style={{ fontSize: '1.15rem' }}>
                We provide comprehensive electrical system studies designed to improve safety, ensure compliance, and optimize performance across HV, MV, and EHV networks.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Transmission Planning', img: '/images/services/power-system-studies/Transmission Planning.jfif', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/transmission_planning_studies_correct_logos-1920w.png', desc: 'Support grid expansion through power flow, contingency, and stability studies to identify constraints and improve system reliability.', link: '/service/power-system-studies/transmission-planning-studies' },
                { title: 'Load Flow Analysis', img: '/images/services/power-system-studies/study-load-flow.webp', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ae649c9f9982d1727f1d40be7d72666e-1920w.webp', desc: 'Evaluate voltage stability, load distribution, and losses to ensure efficient power performance during normal and peak demand.', link: '/service/power-system-studies/load-flow-analysis-services' },
                { title: 'Short Circuit Studies', img: '/images/services/power-system-studies/Short Circuit Studies.webp', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/images-1920w.jpg', desc: 'Determine fault current levels, validate equipment ratings, and verify protection devices operate correctly during abnormal system events.', link: '/service/power-system-studies/short-circuit-analysis-power-system' },
                { title: 'Protective Coordination', img: '/images/services/power-system-studies/Protective Coordination.jfif', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/protection-coordination-practices-distribution-generation-920x613-1920w.jpg', desc: 'Optimize relay and breaker settings using time-current analysis to isolate faults quickly and minimize system disruption.', link: '/service/power-system-studies/protective-device-coordination-studies' },
                { title: 'Harmonic Analysis', img: '/images/services/power-system-studies/Harmonic Analysis.webp', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/studi-dan-analisis-harmonik-harmonic-study-and-analysis-1920w.jpg', desc: 'Detect waveform distortion from inverter sources and nonlinear loads through harmonic analysis, resonance evaluation, and mitigation studies.', link: '/service/power-system-studies/harmonic-analysis-power-systems' },
                { title: 'Grounding Protection', img: '/images/services/power-system-studies/Grounding Protection.jpg', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/c5e7c86d-60f2-4b2e-8f31-ce7c0a3d1b64-1920w.png', desc: 'Reduce step and touch voltage risks through grounding studies, fault analysis, and protection performance evaluation for safer system operation.', link: '/service/power-system-studies/grounding-system-studies' },
              ].map((item, i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border" style={{ borderColor: '#E6E8F0' }}>
                  <div className="relative h-48 overflow-hidden">
                    <Img src={item.img} fallback={item.fallback} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, #06103C, transparent)' }} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-urbanist font-bold text-xl mb-3" style={{ color: '#06103C' }}>{item.title}</h3>
                    <p className="font-jost text-gray-600 text-sm leading-relaxed mb-5">{item.desc}</p>
                    <Link href={item.link} className="inline-flex items-center gap-2 text-sm font-semibold font-jost" style={{ color: '#A8228A' }}>
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
            7. DOWNLOAD FLYER
        ═══════════════════════════════════════════════════════ */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl p-5 text-center sm:flex-row sm:p-8 sm:text-left" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 100%)' }}>
              <div>
                <h3 className="font-urbanist font-bold text-2xl text-white mb-1">Download Power System Studies Flyer</h3>
                <p className="font-jost text-white/60 text-sm">Click the download button to get our Power System Studies overview flyer</p>
              </div>
              <Link
                href="/files/advance-power-system.pdf"
                target="_blank"
                className="inline-flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-full px-7 py-3.5 font-jost font-semibold text-white transition-all hover:scale-105 sm:w-auto"
                style={{ background: '#A8228A' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download The Flyer
              </Link>
            </div>
          </div>
        </section>

        <SoftwareTools />

        {/* ═══════════════════════════════════════════════════════
            8. PROCESS
        ═══════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14 max-w-3xl">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Our Power System Studies Process</span>
              <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ color: '#06103C' }}>High Voltage Power System Study Execution Framework</h2>
              <h3 className="font-urbanist font-semibold text-xl mb-4" style={{ color: '#5B2A86' }}>Transmission-Level Modeling Using PSS®E, PSCAD, ETAP &amp; DIgSILENT</h3>
              <p className="font-jost text-gray-600 leading-relaxed">
                Keentel Engineering performs HV and EHV power system studies using a structured, multi-platform methodology aligned with ISO interconnection standards, IEEE requirements, and NERC reliability criteria. Our execution framework ensures modeling accuracy, cross-software validation, and compliance-ready deliverables from transmission-level analysis to detailed facility protection.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { num: '01', title: 'Scope Definition & Compliance Alignment', img: '/images/services/power-system-studies/process-scope-definition.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Phase+1+-+Scope+Definition+-+Compliance+Alignment+7878-1920w.png', desc: 'Every project begins with a clearly defined technical framework and study matrix.', bullets: ['Define POI-to-grid limits', 'Set N-0, N-1, N-1-1 cases', 'Model peak and light load scenarios', 'Identify weak grid / low SCR cases', 'Align with IEEE, NERC, ANSI/IEC standards', 'Assign appropriate study software'] },
                { num: '02', title: 'Structured Data Collection & Model Integrity', img: '/images/services/power-system-studies/process-data-collection.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/4520f800-a491-4d33-b1ff-ae4edbf9515f-1920w.png', desc: 'Accurate studies require verified inputs and documented assumptions.', bullets: ['Utility base case files (.sav, .raw, .dyr)', 'Transformer ratings, impedance, vector group', 'Line R/X/B data and thermal ratings', 'Generator/inverter dynamic models', 'Breaker duties, CT/PT data, relay settings', 'Ground grid layout and soil parameters'] },
                { num: '03', title: 'Transmission-Level RMS & EMT Modeling', img: '/images/services/power-system-studies/process-rms-emt.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/41e62c42-8f51-424a-9476-ad838dbbeb21-1920w.png', desc: 'Using PSS®E, DIgSILENT, and PSCAD, we validate system behavior under real conditions.', bullets: ['Load flow and voltage validation', 'Reactive margin and loading checks', 'N-1 / N-1-1 contingency analysis', 'POI short-circuit screening', 'Transient stability simulations', 'EMT modeling for weak grid and fast transients'] },
                { num: '04', title: 'Detailed Short Circuit & Protection Coordination', img: '/images/services/power-system-studies/process-short-circuit.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/d63284e8-cf40-4eec-bc82-04927b6dea79-1920w.png', desc: 'Facility-level integrity is validated using ETAP or DIgSILENT.', bullets: ['ANSI / IEC short-circuit calculations (3ϕ, SLG, LL, DLG)', 'Breaker interrupting and withstand duty verification', 'Protection coordination and TCC curve development', 'Selectivity and grading margin confirmation', 'HV, MV, and LV relay philosophy validation'] },
                { num: '05', title: 'Arc Flash, Harmonics & Grounding Analysis', img: '/images/services/power-system-studies/process-arc-flash.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/d3f39548-fac0-44d9-913e-a4a45ddfbe2d-1920w.png', desc: 'Safety and power quality are evaluated using realistic clearing times and operating conditions.', bullets: ['Arc flash study per IEEE 1584', 'Incident energy and PPE category determination', 'Harmonic distortion and resonance analysis (IEEE 519)', 'Frequency scan and filter adequacy review', 'Ground grid step and touch voltage verification'] },
                { num: '06', title: 'Cross-Platform Validation & QA/QC', img: '/images/services/power-system-studies/process-qaqc.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/asd-1920w.png', desc: 'Transmission-grade studies require final reconciliation and independent review prior to issuance.', bullets: ['Cross-verify transformer impedance, fault levels, and X/R ratios', 'Confirm RMS and EMT model consistency', 'Resolve identified variances', 'Implement mitigation measures', 'Issue version-controlled, compliance-ready reports'] },
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
            <div className="mt-10 text-center">
              <Link
                href="/power-system-study-process"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 font-jost font-semibold text-white transition-all hover:opacity-90 sm:w-auto"
                style={{ background: '#06103C' }}
              >
                See Detailed Process
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>

        <Industries />

        {/* ═══════════════════════════════════════════════════════
            9. INDUSTRIES WE SUPPORT
        ═══════════════════════════════════════════════════════ */}
        <section className="hidden" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Sectors</span>
              <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ color: '#06103C' }}>Industries We Support</h2>
              <p className="font-jost text-gray-600 text-lg max-w-2xl">Keentel Engineering delivers power system studies for complex electrical environments across multiple sectors.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { title: 'Utilities & Transmission Operators', img: '/images/services/power-system-studies/industry-utilities.jpg', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/shutterstock_551404123-1920w.jpg', link: '/industries/electric-utilities-transmission' },
                { title: 'Renewable Energy Developers', img: '/images/services/power-system-studies/industry-renewable.jpg', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/GettyImages-2174080781-508c0aae85a94ae6a7c4f9c303eae4f1-1920w.jpg', link: '/industries/renewable-interconnection-engineering' },
                { title: 'Industrial & Manufacturing Facilities', img: '/images/industries/hub/industrial-manufacturing.webp', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/factory-1920w+%281%29-1920w.webp', link: '/industries/industrial-power-engineering' },
                { title: 'Oil, Gas & Mining Operations', img: '/images/industries/hub/oil-gas-mining.jpg', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Trends-in-Oil-and-Gas-guide-1920w.jpg', link: '/industries/oil-gas-mining' },
                { title: 'Data Centers & Commercial Infrastructure', img: '/images/industries/hub/data-centers.jpg', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/corporate-data-center-1920w.jpg', link: '/industries/data-center-electrical' },
              ].map((item, i) => (
                <Link key={i} href={item.link} className="group relative rounded-xl overflow-hidden block" style={{ aspectRatio: '3/4' }}>
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
            10. CASE STUDIES — dynamic from Sanity, this service only
        ═══════════════════════════════════════════════════════ */}
        <section className="hidden" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Real Projects</span>
              <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ color: '#06103C' }}>Case Studies</h2>
              <p className="font-jost text-gray-600 text-lg">Power System Studies by Keentel Engineering</p>
            </div>
            {false && caseStudies.length > 0 ? (
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

        {/* ═══════════════════════════════════════════════════════
            11. GET STARTED — final CTA, full redesign
        ═══════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-24 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 50%, #5B2A86 100%)' }}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-3xl rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #C72E9E 0%, transparent 70%)' }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#C72E9E' }}>Get Started</span>
                <h2 className="font-urbanist font-black text-white mb-5 leading-tight" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.25rem)' }}>
                  Ensure Your Electrical Infrastructure Is Safe, Compliant, and Future-Ready
                </h2>
                <p className="font-jost text-white/85 mb-8 leading-relaxed" style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)' }}>
                  Speak with a licensed engineer about your power system study, from load flow and short-circuit analysis to protection coordination and NERC compliance.
                </p>
                <div className="flex flex-col gap-4 mb-10 sm:flex-row sm:flex-wrap">
                  <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-jost font-semibold text-white transition-all hover:scale-105 hover:shadow-xl sm:w-auto" style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}>
                    Schedule A Consultation
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                  <Link href="tel:813-389-7871" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 font-jost font-semibold text-white transition-all hover:border-white/60 sm:w-auto">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    Speak With an Engineer
                  </Link>
                </div>
                <div className="grid max-w-md grid-cols-3 gap-2 sm:gap-4">
                  {[{ n: '30+', l: 'Years' }, { n: '21', l: 'Licensed PEs' }, { n: '50', l: 'States' }].map((s, i) => (
                    <div key={i} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <p className="font-urbanist font-black text-xl text-white">{s.n}</p>
                      <p className="font-jost text-[11px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Img src="/images/services/power-system-studies/final-cta-engineer.jpeg" fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/e857ee18-180f-48b2-bfa8-38daf048d05c-1920w.png" alt="Keentel engineers at work" className="w-full h-72 sm:h-96 object-cover" />
              </div>
            </div>
          </div>
        </section>

        <ServiceCaseStudies service="power-system-studies" />

        {/* ═══════════════════════════════════════════════════════
            12. WHO WE'VE SERVED — redesigned, more prominent
        ═══════════════════════════════════════════════════════ */}


        {/* ═══════════════════════════════════════════════════════
            13. FAQ — exact homepage FAQ.tsx design
        ═══════════════════════════════════════════════════════ */}


        {/* ═══════════════════════════════════════════════════════
            14. BLOG SECTION — prominent date, full image, related-blog style cards
        ═══════════════════════════════════════════════════════ */}
        {false && blogs.length > 0 && (
          <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Technical Reading</span>
                  <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl" style={{ color: '#06103C' }}>Power System Studies – Blogs</h2>
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
                      {/* Prominent date badge */}
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
          intro="30 years of client questions. Here are the ones that come up every time for power system studies."
          items={faqs}
        />
      </main>
      <RelatedServiceBlogs terms={["power system","load flow","short circuit"]} />
      <Footer />
    </>
  )
}
