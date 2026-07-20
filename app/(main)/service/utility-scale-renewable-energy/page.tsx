'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
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

const segments = [
  { t: 'Utility-Scale Solar Farm Engineering', d: 'POI interconnection studies, IEEE 2800 compliance, harmonic analysis, short-circuit studies, protection coordination, and NERC PRC-024/PRC-029 support.', img: 'card-solar.webp', link: '/service/utility-scale-solar-farms' },
  { t: 'Utility-Scale Wind Farm Engineering', d: 'Type 3 and Type 4 turbine systems, dynamic stability, weak grid analysis, synthetic inertia, subsynchronous oscillation studies, IEEE 2800 validation, and transmission planning.', img: 'card-wind.webp', link: '/service/utility-scale-wind-farms' },
  { t: 'Battery Energy Storage System Engineering', d: 'Grid-forming and grid-supporting inverter controls, frequency response studies, harmonic analysis, fault contribution review, protection coordination, and EMS validation.', img: 'card-bess.webp', link: '/service/utility-scale-battery-storage' },
]

const softwareTools = [
  { name: 'PSS®E', years: '14+ Years', type: 'Dynamic Modeling', img: 'logo-psse.png' },
  { name: 'PowerWorld', years: '10+ Years', type: 'Power Flow Studies', img: 'logo-powerworld.jpg' },
  { name: 'PSLF', years: '8+ Years', type: 'Stability Analysis', img: '' },
  { name: 'DIgSILENT', years: '8+ Years', type: 'Grid Simulation', img: 'logo-digsilent.png' },
  { name: 'SKM PowerTools', years: '6+ Years', type: 'Protection Studies', img: 'logo-skm.png' },
  { name: 'ETAP', years: '10+ Years', type: 'Power System Design', img: 'logo-etap.png' },
]

const processSteps = [
  { t: 'Standards Assessment and Scope Definition', d: 'Define applicable standards, project scope, technical requirements, and compliance objectives.' },
  { t: 'Baseline Power System Modeling', d: 'Develop steady-state and dynamic models to establish the baseline power system performance.' },
  { t: 'Interconnection Studies and Compliance Validation', d: 'Perform interconnection studies and validate compliance with utility and regulatory requirements.' },
  { t: 'Mitigation Recommendations and Documentation', d: 'Identify technical risks, recommend mitigation measures, and prepare supporting documentation.' },
  { t: 'Operational Planning and Grid Operator Support', d: 'Support operational planning, grid operator coordination, and final project readiness.' },
]

const whyChoose = [
  { t: 'Expertise in HV, MV, and EHV Power Systems', d: 'Deep technical grounding across every voltage class relevant to renewable interconnection.' },
  { t: 'Advanced Power System Modeling', d: 'Dynamic, EMT, and stability modeling using PSS\u00aeE, DIgSILENT, PSLF, and ETAP.' },
  { t: 'Utility & ISO Planning Experience', d: 'Direct experience navigating utility and ISO/RTO interconnection requirements.' },
  { t: 'NERC Reliability Standards Knowledge', d: 'Deep understanding of PRC-024/PRC-029 and NERC reliability standards.' },
  { t: 'Practical Engineering Solutions', d: 'Real answers to complex power system challenges, not just study reports.' },
]

const faqs = [
  { q: 'What is a utility-scale solar farm?', a: 'A utility-scale solar farm is a large solar power generation facility designed to produce significant amounts of electricity, typically in the range of several megawatts (MW) to gigawatts (GW), connected directly to the electrical grid.' },
  { q: 'Why is engineering important for a utility-scale solar farm project?', a: 'Proper design and planning ensure the system is efficient, reliable, and cost-effective. Engineering services optimize energy production, ensure grid code compliance, address safety concerns, and minimize operational costs.' },
  { q: 'How much do utility-scale solar farm engineering services cost?', a: 'Cost depends on project size, site conditions, grid requirements, study scope, interconnection complexity, and the level of design documentation required. We define scope and deliverables early so developers can plan engineering budgets with confidence.' },
  { q: 'What is a utility-scale wind farm?', a: 'A utility-scale wind farm is a multi-turbine generation facility that connects to the transmission or distribution grid and is designed to deliver power at commercial scale.' },
  { q: 'What engineering services are needed for a wind farm?', a: 'Wind farm engineering commonly includes collector system design, turbine and substation interconnection, power flow and dynamic studies, protection coordination, grounding, reactive power planning, and utility compliance support.' },
  { q: 'How much do utility-scale wind farm engineering services cost?', a: 'The required effort varies with turbine count, collector voltage, POI complexity, terrain, grid strength, study requirements, and permitting constraints. A scoped engineering plan identifies the work needed before detailed design begins.' },
  { q: 'What is wake loss, and why does it matter in wind farm design?', a: 'Wake loss happens when one turbine blocks or disturbs the airflow to another, reducing overall efficiency. We use advanced modeling to optimize turbine layouts and minimize wake effects.' },
  { q: 'How is wind measured and modeled for building a wind farm?', a: 'Meteorological data, terrain, turbine characteristics, wake behavior, and long-term weather patterns are analyzed to estimate energy production and determine suitable turbine placement and electrical collection requirements.' },
  { q: 'How much do utility-scale battery storage engineering services cost?', a: 'BESS engineering cost is driven by MW/MWh capacity, interconnection requirements, controls, protection, fire safety, site civil conditions, and the level of utility and EPC coordination required.' },
  { q: 'What is the difference between utility-scale BESS and commercial battery systems?', a: 'Utility-scale BESS are large-scale systems rated in megawatts designed to support the grid and renewable integration. Commercial battery systems are smaller, serving individual facilities for energy savings and backup power.' },
  { q: 'How does a BESS improve grid reliability during peak demand or outages?', a: 'A BESS can respond rapidly to frequency and voltage events, shift energy to peak periods, provide reserve capacity, support renewable output, and help maintain grid stability when generation or load conditions change.' },
  { q: 'What battery chemistries are best suited for utility-scale storage?', a: 'Lithium-ion is widely used because of its energy density and response speed, while other chemistries may be evaluated based on duration, safety, lifecycle, environmental conditions, operating strategy, and project economics.' },
  { q: 'What is BESS performance optimization at commissioning?', a: 'Commissioning optimization verifies controls, protection, thermal management, EMS integration, response settings, and operating modes so the system performs as intended under utility and project-specific conditions.' },
  { q: 'What are the fire safety and thermal management requirements for BESS?', a: 'Compliance with UL 9540A testing, fire suppression systems, thermal runaway detection, proper enclosure ventilation, and adherence to NFPA 855 and site-specific safety codes.' },
  { q: 'Can BESS systems be co-located with solar or wind farms?', a: 'Yes, utility-scale BESS are commonly co-located with solar or wind farms to store excess generation and discharge during low production or peak demand, enhancing renewable utilization.' },
]

export default function UtilityScaleRenewableEnergyPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost" && (
        category match "*renewable*" || category match "*Renewable*"
        || category match "*solar*" || category match "*wind*" || category match "*BESS*" || category match "*battery*"
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
      `*[_type == "caseStudy" && (lower(relatedService) match "*solar*" || lower(relatedService) match "*renewable*" || lower(relatedService) match "*wind*" || lower(relatedService) match "*bess*" || lower(relatedService) match "*utility scale*")] | order(_createdAt desc) [0...3] {
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
          email: formData.email, service: 'Utility Scale Renewable Energy',
          message: formData.message, source: 'utility-scale-renewable-energy',
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
            <source src="/videos/renewable-energy.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 w-full">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <Link href="/services" className="text-xs font-semibold uppercase tracking-widest font-jost" style={{ color: '#C72E9E' }}>Services</Link>
                <span className="text-white/30">/</span>
                <span className="text-white/50 text-xs font-jost">Utility Scale Renewable Energy</span>
              </div>
              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.5rem)' }}>Utility-Scale Renewable Energy Engineering</h1>
              <p className="font-jost text-white/90 mb-10 max-w-3xl leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)' }}>
                Engineering support for solar, wind, and BESS projects — from POI studies and IEEE 2800 compliance to grid integration and NERC reliability support.
              </p>
              <div className="flex flex-wrap gap-4 mb-14 sm:mb-16">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule a Consultation</Link>
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
        <section className="order-[20] py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <h2 className="font-urbanist font-black mb-5 leading-tight" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Utility-Scale Renewable Engineering Built for Real Grid Conditions</h2>
              <p className="font-jost text-gray-700 text-lg leading-relaxed mb-5">Utility-scale renewable energy projects require advanced power system engineering to ensure reliable and compliant grid integration. Keentel Engineering supports solar, wind, and BESS developers with POI interconnection studies, IEEE 2800 compliance, dynamic modeling, and NERC reliability support.</p>
              <p className="font-jost text-gray-600 leading-relaxed">We connect interconnection requirements, inverter controls, protection, and operating performance into a coordinated design path that supports approval, construction, and long-term reliability.</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-[#E6E8F0]">
              <Img src="/images/services/utility-scale-renewable-energy/hero-towers.webp" fallback="/images/services/utility-scale-renewable-energy/why-specialized.webp" alt="Utility-scale renewable energy infrastructure" className="w-full h-72 sm:h-96 object-cover" />
            </div>
          </div>
        </section>

{/* ═══ 3. THREE SEGMENTS ═══ */}
        <section className="order-[50] py-16 sm:py-20" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 sm:mb-12">
              <span className="inline-flex rounded-full bg-[#A8228A]/[0.08] px-3 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#A8228A' }}>Our Services</span>
              <h2 className="font-urbanist font-black mb-4 leading-tight" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Utility-Scale Renewable Energy Engineering Services</h2>
              <p className="font-jost text-gray-600 text-base sm:text-lg leading-relaxed">Specialized electrical and power system engineering for solar, wind, and battery storage projects—from interconnection strategy through compliant, construction-ready design.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {segments.map((s, i) => (
                <article key={i} className="group bg-white rounded-2xl overflow-hidden border flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#A8228A]/50" style={{ borderColor: '#E6E8F0' }}>
                  <div className="relative h-52 overflow-hidden"><Img src={`/images/services/utility-scale-renewable-energy/${s.img}`} fallback={`/images/services/utility-scale-renewable-energy/${s.img}`} alt={s.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><span className="absolute top-4 left-4 grid h-9 w-9 place-items-center rounded-full font-urbanist text-sm font-black text-white" style={{ background: '#A8228A' }}>0{i + 1}</span></div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-urbanist font-bold text-xl mb-3" style={{ color: '#06103C' }}>{s.t}</h3>
                    <p className="font-jost text-gray-600 text-sm leading-relaxed mb-5 flex-1">{s.d}</p>
                    <Link href={s.link} className="inline-flex items-center gap-2 text-sm font-semibold font-jost" style={{ color: '#A8228A' }}>
                      Learn more
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 4. WHY SPECIALIZED ENGINEERING — prominent ═══ */}
        <section className="hidden" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-urbanist font-black mb-5 leading-tight" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Why Renewable Projects Require Specialized Engineering</h2>
              <p className="font-jost text-gray-600 mb-5 text-lg leading-relaxed">Solar, wind, and BESS projects operate differently from traditional power plants. These inverter-based resources rely on software controls, fast response times, and detailed grid modeling to remain stable.</p>
              <p className="font-jost text-gray-700 mb-3 font-semibold">We help developers address:</p>
              <ul className="space-y-3 font-jost text-base text-gray-700 mb-6">
                {['Fast control interactions and oscillation risks', 'Weak grid conditions and grid-forming inverter need', 'Synthetic inertia and frequency support requirements', 'Protection coordination for active power electronics'].map((t, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#A8228A' }}>
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="font-jost text-gray-500 text-sm">We ensure IEEE 2800 and NERC PRC-024/PRC-029 compliance so your project gets approved and operates reliably.</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Img src="/images/services/utility-scale-renewable-energy/why-specialized.webp" fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ChatGPT+Image+May+20-+2026-+03_39_11+PM-640w.webp" alt="Compliant power infrastructure" className="w-full h-72 sm:h-96 object-cover" />
            </div>
          </div>
        </section>

        <div className="order-[30]"><ContactForm /></div>
        <div className="order-[40]"><SoftwareCapabilities /></div>
        <div className="order-[80]"><Industries /></div>
        <div className="order-[90]"><ServiceCaseStudies service="utility-scale-renewable-energy" /></div>


        {/* ═══ 5. SOFTWARE TOOLS ═══ */}
        <section className="hidden" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Software Tools Used for Renewable Energy Engineering</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12 text-lg leading-relaxed">Keentel Engineering uses advanced power system simulation platforms to support utility-scale solar, wind, and BESS projects — including POI interconnection studies, dynamic stability analysis, harmonic studies, EMT modeling, and IEEE 2800 compliance validation.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {softwareTools.map((t, i) => (
                <div key={i} className="bg-white rounded-xl border p-4 text-center hover:shadow-md transition-all" style={{ borderColor: '#E6E8F0' }}>
                  <div className="h-12 flex items-center justify-center mb-2">
                    {t.img ? <Img src={`/images/services/utility-scale-renewable-energy/${t.img}`} fallback={`/images/services/utility-scale-renewable-energy/${t.img}`} alt={t.name} className="max-h-12 max-w-full object-contain" /> : <span className="font-urbanist font-bold text-sm" style={{ color: '#06103C' }}>{t.name}</span>}
                  </div>
                  <p className="font-urbanist font-bold text-xs" style={{ color: '#06103C' }}>{t.name}</p>
                  <p className="font-jost text-[10px]" style={{ color: '#A8228A' }}>{t.years}</p>
                  <p className="font-jost text-[10px] text-gray-400">{t.type}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6. PROCESS ═══ */}
        <section className="order-[70] py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-10 text-center" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Our Renewable Engineering Process</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
              {processSteps.map((s, i) => (
                <div key={i} className="bg-white border rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300" style={{ borderColor: '#E6E8F0' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 font-urbanist font-black text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>{i + 1}</div>
                  <h3 className="font-urbanist font-bold text-sm mb-2" style={{ color: '#06103C' }}>{s.t}</h3>
                  <p className="font-jost text-gray-500 text-xs leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 7. WHY CHOOSE KEENTEL — branded two-column ═══ */}
        <section className="hidden" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#C72E9E' }}>Why Keentel</span>
                <h2 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Why Choose Keentel Engineering</h2>
                <p className="font-jost text-white/70 text-lg leading-relaxed mb-8">Our engineers help developers, utilities, and EPC teams reduce technical risk, validate grid performance, and move renewable projects toward safe, compliant interconnection.</p>
                <Link href="/about" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                  Learn More About Us
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8" style={{ background: 'linear-gradient(160deg, rgba(168,34,138,0.12), rgba(91,42,134,0.12))', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="space-y-4">
                  {whyChoose.map((c, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#A8228A' }}>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
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

        {/* ═══ 8. CASE STUDIES — dynamic from Sanity, this service only ═══ */}
        <section className="hidden" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Real Projects</span>
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Case Studies</h2>
            <p className="font-jost text-gray-600 text-lg mb-12">Utility-Scale Renewable Engineering by Keentel Engineering</p>
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

        {/* ═══ 9. GET IN TOUCH — full redesign ═══ */}


        {/* ═══ 10. WHO WE'VE SERVED ═══ */}


        {/* ═══ 11. FAQ — homepage match ═══ */}


        {/* ═══ 12. BLOGS — prominent date, full image ═══ */}
        {false && blogs.length > 0 && (
          <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Technical Reading</span>
                  <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl" style={{ color: '#06103C' }}>Utility Scale Renewable Blogs</h2>
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

        <section className="order-[100] py-12 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl px-6 py-8 sm:px-10 sm:py-9 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
              <div>
                <p className="font-urbanist font-black text-2xl text-white mb-2">Need Renewable Engineering Support?</p>
                <p className="font-jost text-white/80 leading-relaxed">Talk with an engineer about solar, wind, BESS, and grid interconnection requirements.</p>
              </div>
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex w-full sm:w-auto justify-center flex-shrink-0 items-center px-7 py-3.5 rounded-full font-jost font-semibold text-white border border-white/40 hover:bg-white/10 transition-colors">Schedule a Call</Link>
            </div>
          </div>
        </section>

        <div className="order-[110]"><WhoWeServed /></div>
        <div className="order-[120]"><FaqSection
          eyebrow="Technical FAQs"
          heading="Answers,"
          headingLine2="before you ask."
          intro="The solar, wind, and BESS engineering questions developers ask us most."
          items={faqs}
        /></div>
      </main>
      <RelatedServiceBlogs terms={["renewable","solar","BESS"]} />
      <Footer />
    </>
  )
}
