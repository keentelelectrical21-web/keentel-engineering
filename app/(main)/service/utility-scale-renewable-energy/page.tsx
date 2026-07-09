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

const segments = [
  { t: 'Utility-Scale Solar Farm Engineering', d: 'POI interconnection studies, IEEE 2800 compliance, harmonic analysis, short-circuit studies, protection coordination, and NERC PRC-024/PRC-029 support.', img: 'card-solar.webp', link: 'https://keentelengineering.com/service/utility-scale-solar-farms' },
  { t: 'Utility-Scale Wind Farm Engineering', d: 'Type 3 and Type 4 turbine systems, dynamic stability, weak grid analysis, synthetic inertia, subsynchronous oscillation studies, IEEE 2800 validation, and transmission planning.', img: 'card-wind.webp', link: 'https://keentelengineering.com/service/utility-scale-wind-farms' },
  { t: 'Battery Energy Storage System Engineering', d: 'Grid-forming and grid-supporting inverter controls, frequency response studies, harmonic analysis, fault contribution review, protection coordination, and EMS validation.', img: 'card-bess.webp', link: 'https://keentelengineering.com/service/utility-scale-battery-storage' },
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
  'Expertise in HV, MV, and EHV power systems',
  'Advanced power system modeling capabilities',
  'Experience with utility and ISO planning requirements',
  'Deep understanding of NERC reliability standards',
  'Practical engineering solutions for complex power system challenges',
]

const faqs = [
  { q: 'What is a utility-scale solar farm?', a: 'A utility-scale solar farm is a large solar power generation facility designed to produce significant amounts of electricity, typically in the range of several megawatts (MW) to gigawatts (GW), connected directly to the electrical grid.' },
  { q: 'Why is engineering important for a utility-scale solar farm project?', a: 'Proper design and planning ensure the system is efficient, reliable, and cost-effective. Engineering services optimize energy production, ensure grid code compliance, address safety concerns, and minimize operational costs.' },
  { q: 'What is a utility-scale wind farm?', a: 'A utility-scale wind farm is a large-scale wind power generation facility typically ranging from tens to hundreds of megawatts, connected to the electrical grid and consisting of multiple turbines, substations, and electrical infrastructure.' },
  { q: 'What is wake loss, and why does it matter in wind farm design?', a: 'Wake loss happens when one turbine blocks or disturbs the airflow to another, reducing overall efficiency. We use advanced modeling to optimize turbine layouts and minimize wake effects.' },
  { q: 'How is wind measured and modeled before building a wind farm?', a: 'We help deploy LiDAR, SODAR, or meteorological towers to collect data on wind speed, direction, and turbulence, guiding turbine placement and project feasibility.' },
  { q: 'What is the difference between utility-scale BESS and commercial battery systems?', a: 'Utility-scale BESS are large-scale systems rated in megawatts designed to support the grid and renewable integration. Commercial battery systems are smaller, serving individual facilities for energy savings and backup power.' },
  { q: 'How does a BESS improve grid reliability during peak demand or outages?', a: 'A utility-scale BESS stabilizes the grid by instantly discharging stored electricity during peak demand, frequency fluctuations, or outages, preventing grid overload and supporting black start capabilities.' },
  { q: 'What battery chemistries are best suited for utility-scale storage?', a: 'Lithium-ion batteries, particularly LFP (Lithium Iron Phosphate), are the most common choice due to high cycle life, fast response time, and safety profile. Flow batteries and sodium-ion systems are emerging for long-duration needs.' },
  { q: 'What are the fire safety and thermal management requirements for BESS?', a: 'Compliance with UL 9540A testing, fire suppression systems, thermal runaway detection, proper enclosure ventilation, and adherence to NFPA 855 and site-specific safety codes.' },
  { q: 'Can BESS systems be co-located with solar or wind farms?', a: 'Yes, utility-scale BESS are commonly co-located with solar or wind farms to store excess generation and discharge during low production or peak demand, enhancing renewable utilization.' },
]

export default function UtilityScaleRenewableEnergyPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', message: '' })
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
                <span className="text-white/50 text-xs font-jost">Utility Scale Renewable Energy</span>
              </div>
              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
                Utility-Scale Renewable Energy Engineering
              </h1>
              <p className="font-jost text-white/70 text-lg mb-10 max-w-3xl leading-relaxed">
                Engineering support for solar, wind, and BESS projects — from POI studies and IEEE 2800 compliance to grid integration and NERC reliability support.
              </p>
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>

        {/* 2. OVERVIEW */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-jost text-gray-600 text-lg leading-relaxed text-center">
              Utility-scale renewable energy projects require advanced power system engineering to ensure reliable and compliant grid integration. Keentel Engineering supports solar, wind, and BESS developers with POI interconnection studies, IEEE 2800 compliance, dynamic modeling, and NERC reliability support.
            </p>
          </div>
        </section>

        {/* 3. THREE SEGMENTS */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {segments.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border flex flex-col" style={{ borderColor: '#E6E8F0' }}>
                  <div className="h-48 overflow-hidden"><Img src={`/images/services/utility-scale-renewable-energy/${s.img}`} fallback={`/images/services/utility-scale-renewable-energy/${s.img}`} alt={s.t} className="w-full h-full object-cover" /></div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-urbanist font-bold text-lg mb-3" style={{ color: '#06103C' }}>{s.t}</h3>
                    <p className="font-jost text-gray-500 text-sm leading-relaxed mb-5 flex-1">{s.d}</p>
                    <Link href={s.link} target="_blank" className="inline-flex items-center gap-2 text-sm font-semibold font-jost" style={{ color: '#A8228A' }}>Learn more</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. WHY SPECIALIZED ENGINEERING */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-urbanist font-black mb-4" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Why Renewable Projects Require Specialized Engineering</h2>
              <p className="font-jost text-gray-600 mb-4">Solar, wind, and BESS projects operate differently from traditional power plants. These inverter-based resources rely on software controls, fast response times, and detailed grid modeling to remain stable.</p>
              <p className="font-jost text-gray-600 mb-2 font-semibold">We help developers address:</p>
              <ul className="space-y-2 font-jost text-sm text-gray-600 mb-6">
                {['Fast control interactions and oscillation risks', 'Weak grid conditions and grid-forming inverter need', 'Synthetic inertia and frequency support requirements', 'Protection coordination for active power electronics'].map((t, i) => (
                  <li key={i} className="flex gap-2"><span style={{ color: '#A8228A' }}>•</span>{t}</li>
                ))}
              </ul>
              <p className="font-jost text-gray-500 text-sm">We ensure IEEE 2800 and NERC PRC-024/PRC-029 compliance so your project gets approved and operates reliably.</p>
            </div>
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: '#E6E8F0' }}>
              <Img src="/images/services/utility-scale-renewable-energy/why-specialized.webp" fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ChatGPT+Image+May+20-+2026-+03_39_11+PM-640w.webp" alt="Compliant power infrastructure" className="w-full h-80 object-cover" />
            </div>
          </div>
        </section>

        {/* 5. SOFTWARE TOOLS */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Software Tools Used for Renewable Energy Engineering</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-10">Keentel Engineering uses advanced power system simulation platforms to support utility-scale solar, wind, and BESS projects — including POI interconnection studies, dynamic stability analysis, harmonic studies, EMT modeling, and IEEE 2800 compliance validation.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {softwareTools.map((t, i) => (
                <div key={i} className="bg-white rounded-xl border p-4 text-center" style={{ borderColor: '#E6E8F0' }}>
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

        {/* 6. PROCESS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-10 text-center" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Our Renewable Engineering Process</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
              {processSteps.map((s, i) => (
                <div key={i} className="bg-white border rounded-2xl p-6 text-center" style={{ borderColor: '#E6E8F0' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 font-urbanist font-black text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>{i + 1}</div>
                  <h3 className="font-urbanist font-bold text-sm mb-2" style={{ color: '#06103C' }}>{s.t}</h3>
                  <p className="font-jost text-gray-500 text-xs leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. WHY CHOOSE + CONTACT FORM */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-urbanist font-black mb-4" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Why Choose Keentel Engineering</h2>
              <p className="font-jost text-gray-600 mb-6">Our engineers help developers, utilities, and EPC teams reduce technical risk, validate grid performance, and move renewable projects toward safe, compliant interconnection.</p>
              <ul className="space-y-3 font-jost text-sm text-gray-600">
                {whyChoose.map((t, i) => (
                  <li key={i} className="flex gap-2"><span style={{ color: '#A8228A' }}>✓</span>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-urbanist font-black text-xl mb-4" style={{ color: '#06103C' }}>Let&apos;s Discuss How to Optimize Your Next Project</h3>
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

        {/* 8. FINAL CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-urbanist font-black text-xl mb-2" style={{ color: '#06103C' }}>Need Renewable Engineering Support?</p>
              <p className="font-jost text-gray-600 text-sm">Contact Keentel Engineering to discuss your solar, wind, BESS, or interconnection project.</p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Contact Us</Link>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-10" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Technical FAQs</h2>
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

        {/* 10. BLOGS */}
        {blogs.length > 0 && (
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Technical Reading</span>
                  <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>Utility Scale Renewable Blogs</h2>
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
