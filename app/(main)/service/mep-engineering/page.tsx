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
  { t: 'Multidisciplinary Delivery', d: 'In-house experts across HVAC, electrical, and plumbing ensure cohesive designs that reduce coordination delays and costly field changes.' },
  { t: 'BIM-Driven Coordination', d: 'Our Revit-based workflows and clash detection modeling improve constructability, reduce RFIs, and align MEP systems with architectural and structural elements.' },
  { t: 'Code-Compliant, Future-Ready Systems', d: 'We design every system to meet ASHRAE, NEC, NFPA, IPC, and IECC standards — supporting inspection approval, operational safety, and energy performance goals.' },
  { t: 'Cost-Effective MEP Design Services', d: 'We optimize systems not just for performance but also for budget, lifecycle efficiency, and maintenance simplicity.' },
  { t: 'Client-First Process', d: 'From concept through commissioning, our team communicates transparently, resolves technical risks early, and tailors every solution to your facility\u2019s unique needs.' },
]

const mechanicalCaps = [
  { t: 'MEP BIM Modeling', items: ['3D modeling of MEP systems using Revit', 'Coordinated layouts integrated with architectural and structural models', 'Clash detection and resolution using Navisworks', 'Supports modular construction and prefabrication'] },
  { t: 'Mechanical Design Services', items: ['HVAC system modeling including ductwork, air terminals, and equipment', 'Load calculations and equipment sizing integrated with simulation tools', 'Hydronic piping and VRF system layout', 'Optimized for energy-efficient mechanical design and ASHRAE compliance'] },
  { t: 'Electrical Design Services', items: ['Power distribution layouts: panels, feeders, receptacles, grounding', 'Lighting system design with photometric analysis', 'Fire alarm, low voltage, and emergency power system layouts', 'Conduit and cable tray routing modeled to avoid architectural conflicts'] },
]

const docCaps = [
  { t: 'Plumbing and Fire Protection Design', items: ['Domestic water, sanitary, and vent piping modeled for efficiency', 'Storm drainage and natural gas piping systems integrated into overall MEP layout', 'Fire sprinkler systems modeled per NFPA standards (wet, dry, standpipe)', 'Designed to meet plumbing code compliance across jurisdictions'] },
  { t: 'Construction Documentation', items: ['Generation of fully detailed construction documents from Revit models', 'Floor plans, sections, elevations, and 2D/3D detail drawings', 'Sheet set management, legend standardization, and annotation compliance', 'Improves construction coordination and inspection readiness'] },
  { t: 'Quantity Takeoffs and Cost Estimation', items: ['Automated takeoffs for ducts, pipes, fixtures, and equipment', 'Schedule extraction linked to estimation software for budgeting accuracy', 'Helps owners evaluate cost-effective MEP design decisions early', 'Useful in both warehouse retrofits and new industrial builds'] },
]

const mechanicalCards = [
  { t: 'HVAC System Design', d: 'We specialize in HVAC system design for temperature control, air quality, and long-term energy savings — from ductwork layout to system sizing and VRF integration.' },
  { t: 'Plumbing Systems Engineering', d: 'Full-scope plumbing design — from sanitary drainage to stormwater and natural gas systems, prioritizing low-maintenance plumbing and IPC code compliance.' },
  { t: 'Mechanical Systems Analysis & Optimization', d: 'We use advanced software tools to simulate and assess mechanical performance, recommending data-driven improvements that boost efficiency and extend asset life.' },
  { t: 'Energy-Efficient Mechanical Design', d: 'Our systems incorporate renewable energy, green building practices, and energy modeling tools to meet LEED and sustainability goals.' },
  { t: 'Regulatory Code Compliance', d: 'Every mechanical design follows the latest ASHRAE, IECC, and local mechanical codes, ensuring approval readiness for inspections and permitting.' },
  { t: 'Quality Assurance & Safety', d: 'From design review to commissioning, Keentel applies rigorous QA/QC protocols across each project phase.' },
]

const electricalCards = [
  { t: 'Electrical System Design', d: 'Comprehensive electrical system design for new facilities, retrofits, and automation projects — smart-ready, load-optimized systems for data centers, warehouses, and manufacturing.' },
  { t: 'Power Distribution Solutions', d: 'From main switchgear to branch circuit panels, our power distribution systems ensure safe, reliable energy delivery with flexibility for future scalability.' },
  { t: 'Lighting Systems & Smart Controls', d: 'High-efficiency LED lighting, motion sensors, and smart controls integrated with photometric analysis for code-compliant, energy-efficient illumination.' },
  { t: 'Electrical Code Compliance', d: 'Designs follow all relevant national and local codes — NEC, NFPA, and state-specific energy regulations — helping clients pass inspections smoothly.' },
  { t: 'Emergency Power & Backup Systems', d: 'Robust backup solutions featuring generators, UPS systems, and ATS panels to ensure operational continuity during grid failures or storm events.' },
  { t: 'Electrical System Analysis & Optimization', d: 'Detailed audits identify voltage drops, overloaded circuits, or harmonic distortion, with targeted recommendations for enhanced reliability.' },
]

const plumbingCards = [
  { t: 'Plumbing System Design', d: 'Complete plumbing system designs ensuring balanced water pressure, optimal flow rates, and effective drainage tailored to each facility.' },
  { t: 'Water Conservation & Sustainable Design', d: 'Low-impact development with low-flow fixtures, greywater reuse systems, and water-efficient layouts supporting LEED certifications.' },
  { t: 'Sanitary & Drainage Systems', d: 'Code-compliant, hydraulically balanced sanitary, stormwater, and vent systems that eliminate backups and minimize maintenance.' },
  { t: 'Fire Protection Systems', d: 'Wet and dry sprinkler systems, standpipes, and fire pumps designed and coordinated to meet NFPA-compliant life safety requirements.' },
  { t: 'Gas Piping Systems', d: 'Robust gas piping design for labs, kitchens, and industrial use cases, ensuring pressure control and leak prevention.' },
  { t: 'Plumbing Code Compliance', d: 'Expertise in IPC, UPC, and local plumbing codes ensures every project passes inspection without delays.' },
]

const faqs = [
  { q: 'What is MEP engineering?', a: 'MEP engineering refers to the integrated design and management of the Mechanical, Electrical, and Plumbing systems within a building or infrastructure project, ensuring comfort, safety, and functionality.' },
  { q: 'What MEP engineering services do you offer?', a: 'System design & engineering, energy modeling, HVAC design & optimization, electrical distribution & lighting design, plumbing & drainage systems, fire protection & life safety systems, sustainability consulting, and construction administration support.' },
  { q: 'Why is MEP engineering important for construction projects?', a: 'It ensures comfort, optimizes energy use, enhances safety, ensures regulatory compliance, and supports sustainable building practices.' },
  { q: 'What types of projects require MEP engineering services?', a: 'Commercial buildings, residential buildings, industrial facilities, healthcare facilities, educational institutions, public infrastructure, and data centers.' },
  { q: 'How do you ensure energy efficiency in MEP designs?', a: 'Through optimized HVAC systems, energy-efficient lighting, building energy modeling, water efficiency measures, and renewable energy integration.' },
  { q: 'How do you ensure compliance with building codes and regulations?', a: 'By continuously monitoring code changes, conducting thorough code reviews, collaborating with other disciplines, and preparing required permitting documentation.' },
  { q: 'Do you provide ongoing support after MEP systems are installed?', a: 'Yes, including system monitoring, preventive maintenance plans, and troubleshooting & upgrade recommendations.' },
  { q: 'How much do MEP design services cost for a warehouse or industrial facility?', a: 'Pricing typically ranges from $1.50 to $3.00 per square foot depending on project size, complexity, and system requirements. Contact us for a detailed quote.' },
  { q: 'What is included in a full-scope MEP engineering service?', a: 'HVAC design, electrical power and lighting systems, plumbing and drainage plans, fire protection, BIM modeling, code compliance checks, quantity takeoffs, and construction documentation.' },
  { q: 'How long does it take to complete MEP engineering plans?', a: 'Typical designs take 2–6 weeks depending on project size, coordination needs, and permitting timelines. Fast-track delivery is available for urgent projects.' },
]

export default function MEPEngineeringPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost" && (
        category match "*MEP*" || category match "*HVAC*"
        || category match "*mechanical*" || category match "*electrical*" || category match "*plumbing*"
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
          email: formData.email, service: 'MEP Engineering Services',
          message: formData.message, source: 'mep-engineering',
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

        {/* 1. HERO */}
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
                <span className="text-white/50 text-xs font-jost">MEP Engineering Services</span>
              </div>
              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
                MEP Engineering Services
              </h1>
              <p className="font-jost text-white/70 text-lg mb-10 max-w-3xl leading-relaxed">
                From HVAC and electrical systems to plumbing, fire protection, and energy modeling, Keentel delivers high-quality MEPF engineering services across North America — optimized for warehouse, industrial, and commercial facilities, including retrofitting, upgrades, and sustainable systems.
              </p>
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                Schedule A Call
              </Link>
            </div>
          </div>
        </section>

        {/* 2. OVERVIEW */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-4 text-center" style={{ color: '#06103C', fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>MEP Engineering Services for Industrial and Warehouse Facilities</h2>
            <p className="font-jost text-gray-600 leading-relaxed mb-4 text-center">Keentel specializes in MEP engineering services for industrial plants, warehouse buildings, and large-scale commercial projects. From retrofitting MEP systems to energy efficiency upgrades, we design infrastructure that meets operational demands and evolving energy codes.</p>
            <ul className="space-y-2 font-jost text-sm text-gray-600 max-w-xl mx-auto">
              {['Custom MEP layouts for warehouse cooling and ventilation', 'High-load electrical system coordination for industrial sites', 'Stormwater, gas piping, and sanitary design', 'BIM-based modeling, clash detection, and design optimization'].map((t, i) => (
                <li key={i} className="flex gap-2"><span style={{ color: '#A8228A' }}>•</span>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. WHY CHOOSE */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Why Choose Keentel for MEP Engineering Services</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12">At Keentel Engineering, we bring 30+ years of cross-discipline expertise to every MEP engineering project, delivering fully integrated mechanical, electrical, and plumbing solutions.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whyChoose.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#E6E8F0' }}>
                  <h3 className="font-urbanist font-bold text-base mb-2" style={{ color: '#06103C' }}>{c.t}</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Learn More About Us</Link>
            </div>
          </div>
        </section>

        {/* 4. CONTACT FORM */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black text-center mb-10" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Let&apos;s Discuss How to Optimize Your Next Project</h2>
            {formStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-green-700 font-jost text-center">Message Received — Thank you for contacting us. We will get back to you as soon as possible.</div>
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

        {/* 5. INTEGRATED MEP CAPABILITIES */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3 text-center" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Integrated MEP Engineering Services for Complex Facility Projects</h2>
            <p className="font-jost text-gray-600 max-w-3xl mx-auto mb-12 text-center">Keentel Engineering offers full-scope MEP engineering services for industrial, warehouse, and commercial facilities across the United States.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mechanicalCaps.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#E6E8F0' }}>
                  <h3 className="font-urbanist font-bold text-base mb-3 border-l-4 pl-3" style={{ color: '#06103C', borderColor: '#A8228A' }}>{c.t}</h3>
                  <ul className="space-y-2 font-jost text-sm text-gray-500">
                    {c.items.map((it, j) => (<li key={j} className="flex gap-2"><span style={{ color: '#A8228A' }}>•</span>{it}</li>))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {docCaps.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#E6E8F0' }}>
                  <h3 className="font-urbanist font-bold text-base mb-3 border-l-4 pl-3" style={{ color: '#06103C', borderColor: '#A8228A' }}>{c.t}</h3>
                  <ul className="space-y-2 font-jost text-sm text-gray-500">
                    {c.items.map((it, j) => (<li key={j} className="flex gap-2"><span style={{ color: '#A8228A' }}>•</span>{it}</li>))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. MECHANICAL */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3 text-center" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Mechanical Engineering Services<br/><span className="text-lg font-bold">For Industrial, Warehouse &amp; Commercial Facilities</span></h2>
            <p className="font-jost text-gray-600 max-w-3xl mx-auto mb-4 text-center">At Keentel Engineering, we deliver high-performance mechanical engineering services for industrial, warehouse, and commercial clients across the United States.</p>
            <p className="font-jost text-gray-500 text-sm text-center mb-12 italic">Also explore our <Link href="/service/power-system-studies" className="underline" style={{ color: '#A8228A' }}>Power System Studies</Link> to support integrated energy modeling and system analysis.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mechanicalCards.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#E6E8F0' }}>
                  <h3 className="font-urbanist font-bold text-base mb-2" style={{ color: '#06103C' }}>{c.t}</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. ELECTRICAL */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3 text-center" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Electrical Engineering Services<br/><span className="text-lg font-bold">Power-Focused, Future-Ready Solutions</span></h2>
            <p className="font-jost text-gray-600 max-w-3xl mx-auto mb-4 text-center">At Keentel Engineering, our electrical engineering team delivers scalable, code-compliant electrical systems for industrial, commercial, and warehouse facilities across the U.S.</p>
            <p className="font-jost text-gray-500 text-sm text-center mb-12 italic">Explore our <Link href="/service/substation-design" className="underline" style={{ color: '#A8228A' }}>Substation Design Services</Link> or <Link href="/service/power-system-studies" className="underline" style={{ color: '#A8228A' }}>Power System Studies</Link> to optimize your electrical infrastructure.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {electricalCards.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#E6E8F0' }}>
                  <h3 className="font-urbanist font-bold text-base mb-2" style={{ color: '#06103C' }}>{c.t}</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. PLUMBING */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3 text-center" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Plumbing Engineering Services<br/><span className="text-lg font-bold">Sustainable, Code-Compliant Solutions</span></h2>
            <p className="font-jost text-gray-600 max-w-3xl mx-auto mb-12 text-center">At Keentel Engineering, we deliver comprehensive plumbing engineering services for industrial, commercial, and specialized facilities across the U.S.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plumbingCards.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#E6E8F0' }}>
                  <h3 className="font-urbanist font-bold text-base mb-2" style={{ color: '#06103C' }}>{c.t}</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. CLIENTS */}
        <section className="py-16" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-2" style={{ color: '#06103C', fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>Our Clients</h2>
            <p className="font-jost text-gray-600 mb-8">Serving utilities, EPCs, developers, and infrastructure organizations supporting critical power systems nationwide.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {['RRC-ae225119', 'PAE-864f5ced', '49-752adf6f', '48-816ccd8f', '47-363a19ec', '46-ff7bc11f', '45-dfb687e0', '44-18370d1d', '43-10240e91'].map((slug, i) => (
                <div key={i} className="border-2 rounded-2xl flex items-center justify-center p-8 bg-white" style={{ borderColor: '#E6E8F0', minHeight: 150 }}>
                  <img src={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${slug}-1920w.png`} alt="Client" className="max-h-24 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. FINAL CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-urbanist font-black mb-4" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Ready to Power Your Next Facility with Precision-Engineered MEP Solutions?</h2>
            <p className="font-jost text-gray-600 max-w-3xl mx-auto mb-8">Whether you&apos;re planning a new industrial plant, retrofitting a warehouse, or upgrading commercial infrastructure, Keentel Engineering delivers cost-effective, code-compliant, and energy-efficient MEPF engineering services tailored to your project&apos;s demands.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule A Consultation</Link>
              <Link href="tel:813-389-7871" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold border-2" style={{ borderColor: '#06103C', color: '#06103C' }}>813-389-7871</Link>
            </div>
          </div>
        </section>

        {/* 11. FAQ */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-10" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>FAQ for MEP (Mechanical, Electrical, and Plumbing) Engineering Services</h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="bg-white border rounded-xl overflow-hidden" style={{ borderColor: '#E6E8F0' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center gap-4 p-5 text-left">
                    <span className="font-urbanist font-bold text-sm" style={{ color: '#06103C' }}>{i + 1}. {f.q}</span>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-xs" style={{ borderColor: '#E6E8F0', transform: openFaq === i ? 'rotate(180deg)' : 'none' }}>▾</span>
                  </button>
                  {openFaq === i && <div className="px-5 pb-5 font-jost text-sm text-gray-600 leading-relaxed">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. BLOGS */}
        {blogs.length > 0 && (
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Technical Reading</span>
                  <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>MEP Engineering – Blogs</h2>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-2 font-jost font-semibold text-sm" style={{ color: '#A8228A' }}>View All Articles</Link>
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
