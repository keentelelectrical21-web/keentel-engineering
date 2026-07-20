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
  { t: 'Engineering Owner Representative', d: 'We act as your technical ally, not just a vendor — reviewing designs, identifying risks, and protecting your investment at every project phase.' },
  { t: '30 Years of Experience', d: 'From substation upgrades to solar EPCs, our team has delivered owner\u2019s engineering services across a wide range of grid-scale projects.' },
  { t: 'EPC Oversight Services', d: 'We ensure your engineering, procurement, and construction (EPC) partners deliver exactly what was promised — on spec, on time, and on budget.' },
  { t: 'Customized QA/QC Services for Construction', d: 'Our attention to detail during field verification, factory testing, and site commissioning helps eliminate costly rework and delays.' },
]

const fullScope = [
  { t: 'Power System Studies', d: 'We conduct detailed power system studies to evaluate system performance, fault levels, relay coordination, and voltage stability — helping optimize electrical efficiency and meet interconnection requirements.' },
  { t: 'Technology Evaluation & Selection', d: 'We help evaluate and compare technologies across substation automation, protection relays, SCADA systems, and BESS integration based on your project\u2019s scale and long-term goals.' },
  { t: 'Electrical & Substation Equipment Procurement', d: 'We assist in sourcing, evaluating, and procuring high-performance electrical and substation equipment — ensuring cost-effective procurement that meets technical specs and lead time constraints.' },
  { t: 'Bidding Assistance for Power Projects', d: 'From RFP development to vendor qualification, we help structure bids and use evaluation matrices to rank proposals by cost, lead time, and compliance with performance standards.' },
  { t: 'Lead Time and Construction Management', d: 'Proactive lead time tracking and construction management across contractor mobilization, equipment delivery, sequencing, and utility coordination.' },
  { t: 'Construction Oversight & Commissioning', d: 'Active construction oversight from pre-mobilization through final commissioning, including FAT/SAT testing, relay validation, SCADA integration, and final energization.' },
]

const fullScopeImages = [
  '/images/services/owners-engineer/grid-diagram.jpg',
  '/images/services/owners-engineer/circuit-diagram.jpg',
  '/images/services/owners-engineer/switchgear.jpg',
  '/images/services/owners-engineer/blueprint-review.jpg',
  '/images/services/owners-engineer/construction-workers.jpg',
  '/images/services/owners-engineer/solar-panels.png',
]

const deliveryProcess = [
  { n: '01', t: 'Define the Owner’s Requirements', d: 'Align technical, commercial, schedule, and compliance objectives before design decisions are locked in.' },
  { n: '02', t: 'Review Design & Procurement', d: 'Independently review engineering packages, equipment selections, bids, and vendor deliverables.' },
  { n: '03', t: 'Oversee Construction', d: 'Track quality, interfaces, risk, and milestones during field execution, testing, and commissioning.' },
  { n: '04', t: 'Support Energization & Handover', d: 'Validate closeout documentation and support a reliable, compliant transition into operations.' },
]

const segments = [
  { t: 'HVDC Owner\u2019s Engineer Services', d: 'Specialized design review, system modeling validation, and technical oversight during converter station deployment, cable routing, and grounding system implementation for long-distance transmission and offshore wind projects.' },
  { t: 'Solar & BESS Projects', d: 'Full-lifecycle support for solar PV and battery energy storage installations — from site selection and interconnection application to commissioning and grid compliance.' },
  { t: 'Wind & Hybrid Systems', d: 'End-to-end oversight including site layout validation, turbine and controller integration, and performance test monitoring for wind farms and hybrid (solar + BESS) systems.' },
]

const faqs = [
  { q: 'What is an Owner\u2019s Engineer?', a: 'An Owner\u2019s Engineer is an independent consulting expert who represents the project owner\u2019s interests during design, construction, and commissioning of a renewable, hybrid, or BESS energy project, providing technical oversight, project management, and quality assurance.' },
  { q: 'What types of renewable energy power plants do you provide Owner\u2019s Engineer services for?', a: 'Solar PV power plants, wind power plants, hydropower, hybrid/standalone BESS projects, biomass energy plants, and geothermal power plants — covering the full lifecycle from concept through commissioning.' },
  { q: 'Why do I need an Owner\u2019s Engineer for my renewable power plant project?', a: 'An Owner\u2019s Engineer ensures the project is executed efficiently and in line with the owner\u2019s objectives, providing expert technical guidance, mitigating risks, and managing project complexities.' },
  { q: 'Do you assist with the procurement of equipment and contractors?', a: 'Yes, we assist in selecting the right contractors, equipment, and materials — evaluating bids, assessing vendor capabilities, and negotiating contracts for cost-effective, technically sound purchases.' },
  { q: 'What\u2019s the difference between an Owner\u2019s Engineer and an EPC contractor?', a: 'An Owner\u2019s Engineer represents the project owner and provides independent oversight, while an EPC contractor handles design, procurement, and construction. The Owner\u2019s Engineer ensures the EPC\u2019s work meets standards without conflicts of interest.' },
  { q: 'When should I bring in an Owner\u2019s Engineer during project development?', a: 'Ideally at the feasibility or conceptual design stage — early involvement ensures better technical planning, smoother interconnection applications, and fewer design revisions during EPC execution.' },
]

export default function OwnersEngineerPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost" && (
        category match "*owner*" || category match "*Owner*"
        || category match "*engineer*" || category match "*EPC*"
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
      `*[_type == "caseStudy" && (lower(relatedService) match "*owner*")] | order(_createdAt desc) [0...3] {
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
          email: formData.email, service: 'Owners Engineering Services',
          message: formData.message, source: 'owners-engineer',
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
            <source src="/videos/owners-engineer.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 w-full">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <Link href="/services" className="text-xs font-semibold uppercase tracking-widest font-jost" style={{ color: '#C72E9E' }}>Services</Link>
                <span className="text-white/30">/</span>
                <span className="text-white/50 text-xs font-jost">Owner&apos;s Engineer Services</span>
              </div>
              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.5rem)' }}>Owner&apos;s Engineer Services for Power &amp; Renewable Projects</h1>
              <p className="font-jost text-white/90 mb-10 max-w-3xl leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)' }}>
                We provide comprehensive owner&apos;s engineer services for utility-scale power and renewable energy projects across the U.S. — acting as your engineering owner representative to ensure performance, safety, compliance, and cost-efficiency from concept to commissioning.
              </p>
              <div className="flex flex-wrap gap-4 mb-14 sm:mb-16">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule A Call</Link>
                <a href="/files/owners-engineer.pdf" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/25 hover:border-white/60 transition-all">Download The Flyer</a>
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

        {/* ═══ 2. WHY CHOOSE — branded two-column ═══ */}
        <section className="hidden legacy-why-choose" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#C72E9E' }}>Why Keentel</span>
                <h2 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Why Choose Keentel for Owner&apos;s Engineer Services</h2>
                <p className="font-jost text-white/70 text-lg leading-relaxed mb-8">Choosing the right owner&apos;s engineer services provider is critical to your project&apos;s long-term performance. We bring decades of hands-on experience in complex power systems, renewable integration, and utility-scale owner&apos;s engineer support.</p>
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

{/* ═══ 3. WHAT IS OWNER'S ENGINEER ═══ */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl">What Is an Owner&apos;s Engineer and Why It Matters</h2>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-jost text-gray-600 mb-4 leading-relaxed text-lg">An Owner&apos;s Engineer is your technical advocate throughout the lifecycle of an energy infrastructure project. From power plant owner&apos;s engineering to construction QA/QC and system commissioning, this role ensures that your contractors, vendors, and EPC teams meet performance expectations, safety codes, and regulatory standards.</p>
            <p className="font-jost text-gray-600 mb-4 leading-relaxed text-lg">We specialize in owner&apos;s engineer services for power plants, transmission systems, and renewable energy projects. Our approach reduces risk, improves accountability, and ensures your project remains on schedule and within budget.</p>
            <p className="font-jost text-gray-600 leading-relaxed text-lg">We support compliance with regulatory frameworks such as <Link href="/service/nerc-compliance" className="underline font-semibold" style={{ color: '#A8228A' }}>NERC compliance requirements</Link> and deliver proven results across a wide range of utility environments. Learn more about our technical experience in <Link href="/service/substation-design" className="underline font-semibold" style={{ color: '#A8228A' }}>Substation Design</Link> and <Link href="/service/poi-interconnection-engineering-support" className="underline font-semibold" style={{ color: '#A8228A' }}>POI Interconnection Engineering Support</Link>.</p>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-2xl"><Img src="/images/services/owners-engineer/blueprint-review.jpg" fallback="/images/services/owners-engineer/construction-workers.jpg" alt="Owner's engineer reviewing project drawings" className="h-72 w-full object-cover sm:h-96" /></div>
          </div>
          </div>
        </section>

        <ContactForm />
        <SoftwareCapabilities />


        {/* ═══ 4. FULL SCOPE ═══ */}
        <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-10 text-center" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Full Scope of Our Owner&apos;s Engineering Support</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fullScope.map((c, i) => (
                <div key={i} className="overflow-hidden bg-white rounded-2xl border hover:shadow-lg transition-all duration-300" style={{ borderColor: '#E6E8F0' }}>
                  <Img src={fullScopeImages[i]} fallback="/images/services/owners-engineer/construction-workers.jpg" alt={c.t} className="w-full h-44 object-cover" />
                  <div className="p-6">
                    <h3 className="font-urbanist font-bold text-lg mb-3 border-l-4 pl-3" style={{ color: '#06103C', borderColor: '#A8228A' }}>{c.t}</h3>
                    <p className="font-jost text-gray-600 text-sm leading-relaxed">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 5. HVDC/SOLAR/WIND SEGMENTS ═══ */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Delivery Process</p>
              <h2 className="font-urbanist font-black leading-tight" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>From Project Concept to Commissioning</h2>
              <p className="font-jost text-gray-600 text-lg leading-relaxed mt-4">Independent technical oversight at every key decision point keeps delivery aligned with your objectives, budget, and schedule.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {deliveryProcess.map((step) => (
                <div key={step.n} className="rounded-2xl border p-6" style={{ background: '#F6F7FB', borderColor: '#E1E5EF' }}>
                  <span className="inline-flex w-10 h-10 items-center justify-center rounded-full font-urbanist font-black text-sm" style={{ color: '#A8228A', background: '#F9EAF6' }}>{step.n}</span>
                  <h3 className="font-urbanist font-bold text-lg leading-tight mt-5" style={{ color: '#06103C' }}>{step.t}</h3>
                  <p className="font-jost text-sm leading-relaxed mt-3" style={{ color: '#566078' }}>{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3 text-center" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>HVDC, Solar &amp; Wind Owner&apos;s Engineer Support</h2>
            <p className="font-jost text-gray-600 max-w-3xl mx-auto mb-12 text-center text-lg leading-relaxed">Keentel Engineering supports a wide range of utility-scale and renewable energy projects with dedicated owner&apos;s engineer services, tailored to the specific requirements of each technology type and grid interconnection model.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {segments.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border hover:shadow-lg transition-all duration-300" style={{ borderColor: '#E6E8F0' }}>
                  <h3 className="font-urbanist font-bold text-lg mb-3" style={{ color: '#06103C' }}>{c.t}</h3>
                  <p className="font-jost text-gray-600 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6. CASE STUDIES — dynamic from Sanity, this service only ═══ */}
        <Industries />
        <ServiceCaseStudies service="owners-engineer" />

        <section className="hidden" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Real Projects</span>
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Case Studies</h2>
            <p className="font-jost text-gray-600 text-lg mb-12">Owner&apos;s Engineer Services by Keentel Engineering</p>
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

        {/* ═══ 7. GET IN TOUCH — full redesign ═══ */}


        {/* ═══ 8. WHY CHOOSE KEENTEL ENGINEERING? — moved down one section per brief, icon row ═══ */}
        <section className="hidden" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-10 text-center" style={{ color: '#06103C', fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}>Why Choose Keentel Engineering?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { t: 'Expertise', d: 'Our team brings years of industry experience and expertise to every project we undertake.' },
                { t: 'Tailored Solutions', d: 'We understand that every project is unique, offering customized solutions tailored to your needs.' },
                { t: 'Commitment to Quality', d: 'We deliver exceptional results, ensuring every project meets the highest standards of quality.' },
                { t: 'Dedicated Support', d: 'From start to finish, our team provides the support and guidance you need to achieve success.' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border text-center hover:shadow-lg transition-all duration-300" style={{ borderColor: '#E6E8F0' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-urbanist font-black text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>{i + 1}</div>
                  <h4 className="font-urbanist font-bold text-sm mb-2" style={{ color: '#06103C' }}>{c.t}</h4>
                  <p className="font-jost text-gray-600 text-xs leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 9. OUR CLIENTS ═══ */}


        {/* ═══ 10. FAQ — homepage match ═══ */}


        {/* ═══ 11. BLOGS — prominent date, full image ═══ */}
        {false && blogs.length > 0 && (
          <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Technical Reading</span>
                  <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl" style={{ color: '#06103C' }}>Owner&apos;s Engineer – Blogs</h2>
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
        <section className="py-8 sm:py-10" style={{ background: '#F6F7FB' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl px-6 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5" style={{ background: '#06103C' }}>
              <div>
                <p className="font-urbanist font-bold text-lg sm:text-xl text-white">Download the Owner&apos;s Engineer Services Flyer</p>
                <p className="font-jost text-sm mt-1" style={{ color: 'rgba(255,255,255,0.72)' }}>A concise overview of our independent engineering oversight and delivery support.</p>
              </div>
              <a href="/files/owners-engineer.pdf" target="_blank" className="inline-flex shrink-0 items-center justify-center rounded-full px-6 py-3 font-jost text-sm font-semibold text-white transition-transform hover:scale-105" style={{ background: '#A8228A' }}>
                Download the Flyer
              </a>
            </div>
          </div>
        </section>
        <FaqSection
          eyebrow="Questions We Hear"
          heading="Answers,"
          headingLine2="before you ask."
          intro="The Owner's Engineer questions clients ask us most."
          items={faqs}
        />
      </main>
      <RelatedServiceBlogs terms={["owner's engineer","BESS","substation"]} />
      <Footer />
    </>
  )
}
