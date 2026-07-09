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
  { q: 'What is wake loss, and why does it matter in wind farm design?', a: 'Wake loss happens when one turbine blocks or disturbs the airflow to another, reducing overall efficiency. We use advanced modeling to optimize turbine layouts and minimize wake effects.' },
  { q: 'What is the difference between utility-scale BESS and commercial battery systems?', a: 'Utility-scale BESS are large-scale systems rated in megawatts designed to support the grid and renewable integration. Commercial battery systems are smaller, serving individual facilities for energy savings and backup power.' },
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
      <main>

        {/* ═══ 1. HERO ═══ */}
        <section className="relative min-h-[75vh] sm:min-h-[80vh] flex items-center overflow-hidden" style={{ background: '#06103C' }}>
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-45">
            <source src="/videos/power-system-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,16,60,0.82) 0%, rgba(6,16,60,0.55) 55%, rgba(91,42,134,0.28) 100%)' }} />
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
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule a Consultation</Link>
            </div>
          </div>
        </section>

        {/* ═══ 2. OVERVIEW ═══ */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-jost text-gray-700 text-xl leading-relaxed text-center">
              Utility-scale renewable energy projects require advanced power system engineering to ensure reliable and compliant grid integration. Keentel Engineering supports solar, wind, and BESS developers with POI interconnection studies, IEEE 2800 compliance, dynamic modeling, and NERC reliability support.
            </p>
          </div>
        </section>

        {/* ═══ 3. THREE SEGMENTS ═══ */}
        <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {segments.map((s, i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden border flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ borderColor: '#E6E8F0' }}>
                  <div className="h-48 overflow-hidden"><Img src={`/images/services/utility-scale-renewable-energy/${s.img}`} fallback={`/images/services/utility-scale-renewable-energy/${s.img}`} alt={s.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-urbanist font-bold text-lg mb-3" style={{ color: '#06103C' }}>{s.t}</h3>
                    <p className="font-jost text-gray-600 text-sm leading-relaxed mb-5 flex-1">{s.d}</p>
                    <Link href={s.link} className="inline-flex items-center gap-2 text-sm font-semibold font-jost" style={{ color: '#A8228A' }}>
                      Learn more
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 4. WHY SPECIALIZED ENGINEERING — prominent ═══ */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#A8228A' }}>Our Approach</span>
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

        {/* ═══ 5. SOFTWARE TOOLS ═══ */}
        <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
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
        <section className="py-20 sm:py-24 bg-white">
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
        <section className="py-20 sm:py-24" style={{ background: '#06103C' }}>
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
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Real Projects</span>
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Case Studies</h2>
            <p className="font-jost text-gray-600 text-lg mb-12">Utility-Scale Renewable Engineering by Keentel Engineering</p>
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

        {/* ═══ 9. GET IN TOUCH — full redesign ═══ */}
        <section className="py-20 sm:py-24" style={{ background: 'linear-gradient(180deg, #F6F7FB 0%, #ffffff 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#A8228A' }}>Get in Touch</span>
                <h2 className="font-urbanist font-black mb-6 leading-tight" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Let&apos;s Discuss How to Optimize Your Next Project</h2>
                <p className="font-jost text-gray-600 text-lg leading-relaxed mb-8">Tell us about your solar, wind, or BESS project and timeline. A licensed engineer will follow up to discuss scope.</p>
                <div className="rounded-2xl p-6" style={{ background: '#06103C' }}>
                  <p className="font-urbanist font-bold text-white text-lg mb-1">Prefer to talk now?</p>
                  <Link href="tel:813-389-7871" className="font-jost text-2xl font-bold" style={{ color: '#C72E9E' }}>813-389-7871</Link>
                </div>
              </div>
              <div className="lg:col-span-7 bg-white rounded-2xl shadow-xl p-6 sm:p-10" style={{ border: '1px solid #E6E8F0' }}>
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
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>First Name *</label>
                        <input required type="text" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700 transition-all" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }} onFocus={e => { e.target.style.borderColor = '#A8228A'; e.target.style.background = '#fff' }} onBlur={e => { e.target.style.borderColor = '#E6E8F0'; e.target.style.background = '#F6F7FB' }} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>Last Name</label>
                        <input type="text" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700 transition-all" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }} onFocus={e => { e.target.style.borderColor = '#A8228A'; e.target.style.background = '#fff' }} onBlur={e => { e.target.style.borderColor = '#E6E8F0'; e.target.style.background = '#F6F7FB' }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>Phone *</label>
                        <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700 transition-all" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }} onFocus={e => { e.target.style.borderColor = '#A8228A'; e.target.style.background = '#fff' }} onBlur={e => { e.target.style.borderColor = '#E6E8F0'; e.target.style.background = '#F6F7FB' }} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>Email *</label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700 transition-all" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }} onFocus={e => { e.target.style.borderColor = '#A8228A'; e.target.style.background = '#fff' }} onBlur={e => { e.target.style.borderColor = '#E6E8F0'; e.target.style.background = '#F6F7FB' }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-3 font-jost" style={{ color: '#06103C' }}>What Services Are You Interested In?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {['POI Interconnection Engineering Support', 'Substation Design Services', 'EHV, HV, MV Power System Studies', 'Owners Engineering Services', 'NERC O&P 693 Compliance Services', 'Utility Scale Solar Farm Engineering'].map((svc) => (
                          <label key={svc} className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all" style={{ borderColor: formData.service === svc ? '#A8228A' : '#E6E8F0', background: formData.service === svc ? 'rgba(168,34,138,0.05)' : '#F6F7FB' }}>
                            <input type="radio" name="service" value={svc} checked={formData.service === svc} onChange={e => setFormData(p => ({ ...p, service: e.target.value }))} className="accent-pink-600" />
                            <span className="font-jost text-sm text-gray-700">{svc}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>Message</label>
                      <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={5} className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700 resize-none transition-all" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }} onFocus={e => { e.target.style.borderColor = '#A8228A'; e.target.style.background = '#fff' }} onBlur={e => { e.target.style.borderColor = '#E6E8F0'; e.target.style.background = '#F6F7FB' }} />
                    </div>
                    {formStatus === 'error' && <p className="text-sm text-red-500 font-jost p-3 rounded-xl border border-red-100 bg-red-50">Failed to send. Please try again.</p>}
                    <button type="submit" disabled={formStatus === 'loading'} className="w-full py-4 rounded-full font-jost font-semibold text-white text-lg transition-all hover:opacity-90 disabled:opacity-60" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                      {formStatus === 'loading' ? 'Sending...' : 'Submit Request →'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 10. WHO WE'VE SERVED ═══ */}
        <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Trusted By</span>
              <h2 className="font-urbanist font-black text-3xl sm:text-4xl" style={{ color: '#06103C' }}>Who We&apos;ve Served</h2>
              <p className="font-jost text-gray-600 mt-3 max-w-2xl mx-auto text-lg">Serving utilities, EPCs, developers, and infrastructure organizations supporting critical power systems nationwide.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
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
                <div key={i} className="bg-white rounded-xl p-5 flex items-center justify-center shadow-sm hover:shadow-md transition-all h-24" style={{ border: '1px solid #E6E8F0' }}>
                  <img src={logo.src} alt={logo.alt} className="max-h-12 max-w-full object-contain" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 11. FAQ — homepage match ═══ */}
        <FaqSection
          eyebrow="Technical FAQs"
          heading="Answers,"
          headingLine2="before you ask."
          intro="The solar, wind, and BESS engineering questions developers ask us most."
          items={faqs}
        />

        {/* ═══ 12. BLOGS — prominent date, full image ═══ */}
        {blogs.length > 0 && (
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

      </main>
      <Footer />
    </>
  )
}
