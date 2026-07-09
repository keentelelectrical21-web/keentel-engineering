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

const capabilities = [
  { t: 'Line Routing & Corridor Optimization', d: 'Terrain-based route optimization, ROW analysis, constraint mapping, GIS-integrated alignment studies, and multi-route feasibility comparisons.', img: 'cap-routing.webp' },
  { t: 'Structural Design & Modeling', d: 'Transmission towers (lattice, monopole, H-frame), distribution poles, foundations, insulator assemblies, and structural integrity validation.', img: 'cap-structural.webp' },
  { t: 'Conductor & Ground Wire Design', d: 'Ampacity, thermal and mechanical strength, corona/RI considerations, conductor selection (ACSR, AAAC, ACSS), and shield wire / OPGW design.', img: 'cap-conductor.webp' },
  { t: 'Sag-Tension & Mechanical Analysis', d: 'Sag and tension under multiple loading conditions, wind/ice loading, clearance checks, and NESC/IEC/IEEE compliance.', img: 'cap-sag-tension.jpg' },
  { t: 'Electrical Design & System Integration', d: 'Voltage profile, insulation coordination, lightning protection, grounding/bonding, EMF studies, and loss minimization.', img: 'cap-electrical.jpg' },
  { t: 'Digital Modeling & Intelligent Engineering', d: '2D construction drawings, 3D intelligent models, data-rich digital twins, material specs, and clash detection.', img: 'cap-digital-modeling.webp' },
  { t: 'Automated Engineering Calculations', d: 'Automated sag-tension reports, load calculations, structural loading reports, BOM generation, and compliance documentation.', img: 'cap-calculations.webp' },
  { t: 'Multi-Standard & Global Compliance', d: 'NESC, NEC, IEEE, IEC standards, and utility/ISO/RTO requirements across ERCOT, PJM, CAISO, SPP, and WECC.', img: 'cap-compliance.webp' },
  { t: 'Visualization & Stakeholder Engagement', d: '3D project views, construction simulation for phasing analysis, client presentation visuals, and faster regulatory approvals.', img: 'cap-visualization.webp' },
]

const processSteps = [
  { t: 'Project Definition', d: 'Scope development, load and system requirements, voltage and capacity analysis.' },
  { t: 'Conceptual Design', d: 'Route selection, preliminary structure layout, feasibility studies.' },
  { t: 'Detailed Engineering', d: 'Structural and electrical design, sag-tension analysis, grounding and protection design.' },
  { t: 'Digital Modeling', d: '2D + 3D model development, design validation, coordination with other disciplines.' },
  { t: 'Construction Deliverables', d: 'Issued-for-construction (IFC) drawings, material lists, engineering reports.' },
  { t: 'Project Support', d: 'Engineering review during construction, field issue resolution, design updates.' },
]

const faqs = [
  { q: 'What is transmission line design?', a: 'Transmission line design involves engineering the physical and electrical components required to transfer electrical power safely and efficiently from one location to another.' },
  { q: 'What factors influence transmission line design?', a: 'Key factors include voltage level, terrain, conductor type, environmental conditions, mechanical loading, and regulatory requirements.' },
  { q: 'What is sag-tension analysis?', a: 'Sag-tension analysis determines how conductors behave under different loads such as temperature, wind, and ice, ensuring safe clearances and structural stability.' },
  { q: 'Why is 3D modeling important in transmission design?', a: '3D modeling improves accuracy, enables clash detection, enhances visualization, and supports better coordination among engineering teams.' },
  { q: 'What standards are used in transmission line design?', a: 'Common standards include NESC, IEEE, IEC, NEC, and utility-specific requirements.' },
  { q: 'How does digital design improve project efficiency?', a: 'Digital tools automate calculations, integrate data, and reduce manual errors, significantly accelerating design and improving accuracy.' },
  { q: 'What is a digital twin in transmission projects?', a: 'A digital twin is a virtual model of the transmission system that includes engineering data for planning, construction, and lifecycle management.' },
  { q: 'How are transmission lines optimized for cost?', a: 'Through route optimization, material selection, efficient structure design, and minimizing losses and construction complexity.' },
  { q: 'What types of transmission structures are used?', a: 'Common types include lattice towers, monopoles, H-frame structures, and wood or concrete poles.' },
  { q: 'Do you support renewable energy interconnections?', a: 'Yes. Keentel specializes in collector systems and interconnection design for solar, wind, and battery energy storage projects.' },
  { q: 'How do environmental factors affect design?', a: 'Wind, ice, temperature, and terrain significantly influence structural loading, conductor sag, and system reliability.' },
  { q: 'What deliverables are provided?', a: 'Typical deliverables include drawings, reports, calculations, models, and construction documentation.' },
]

export default function TransmissionLineDesignPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost" && (
        category match "*transmission*" || category match "*Transmission*"
        || category match "*line*" || category match "*sag*" || category match "*conductor*"
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
          email: formData.email, service: 'Transmission Line Design Services',
          message: formData.message, source: 'transmission-line-design',
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
                <span className="text-white/50 text-xs font-jost">Transmission Line Design</span>
              </div>
              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
                Transmission Line Design Services
              </h1>
              <p className="font-jost text-white/70 text-lg mb-10 max-w-3xl leading-relaxed">
                Advanced engineering solutions for reliable, efficient, and future-ready power infrastructure, specializing in transmission line design, sag-tension analysis, and high-voltage system optimization.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                  Schedule A Call
                </Link>
                <a href="/files/transmission-line-design.pdf" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/20 hover:border-white/50 transition-all">
                  Download The Flyer
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. WHY CHOOSE US */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Why Choose Us</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12">At Keentel Engineering, we take pride in being the go-to engineering firm for power and utility system planning, design, control, and analysis.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { t: 'Client-Focused Work Approach', d: 'Our team works cohesively on every project and with every client. We first develop a solid understanding of your project goals, requirements, and needs. From concept to commissioning, we assist you in every step.' },
                { t: '30 Years of Experience', d: 'We have over three decades of experience in design and interconnection — the knowledge, understanding, and expertise to handle and execute all types of projects with sheer perfection and superior workmanship.' },
                { t: 'Quality with Innovation', d: 'At Keentel Engineering, we have established our stellar market reputation on quality, work ethics, and innovation.' },
                { t: 'Attention to Detail', d: 'We work on every project with laser focus and attention to detail, delivering desired results with complete satisfaction.' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border" style={{ borderColor: '#E6E8F0' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 font-urbanist font-black text-white" style={{ background: '#A8228A' }}>{i + 1}</div>
                  <h3 className="font-urbanist font-bold text-lg mb-3" style={{ color: '#06103C' }}>{c.t}</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Learn More About Us</Link>
            </div>
          </div>
        </section>

        {/* 3. CORE CAPABILITIES — 9 cards */}
        <section className="py-20" style={{ background: '#06103C' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3 text-white" style={{ fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Keentel Engineering&apos;s Core Transmission Line Design Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {capabilities.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden">
                  <div className="h-44 overflow-hidden bg-gray-100"><Img src={`/images/services/transmission-line-design/${c.img}`} fallback={`/images/services/transmission-line-design/${c.img}`} alt={c.t} className="w-full h-full object-cover" /></div>
                  <div className="p-5">
                    <h3 className="font-urbanist font-bold text-base mb-2 border-l-4 pl-2" style={{ color: '#06103C', borderColor: '#A8228A' }}>{c.t}</h3>
                    <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                  </div>
                </div>
              ))}
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

        {/* 5. PROCESS */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Our Engineering Process</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
              {processSteps.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#E6E8F0' }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#A8228A' }}>STEP {i + 1}</p>
                  <h3 className="font-urbanist font-bold text-lg mb-2" style={{ color: '#06103C' }}>{s.t}</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. INDUSTRIES WE SERVE */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Industries We Serve</h2>
              <ul className="space-y-2 font-jost text-sm text-gray-600">
                {['Utility companies', 'Renewable energy developers', 'Transmission developers', 'Industrial and manufacturing facilities', 'EPC contractors', 'Infrastructure developers', 'Municipal and public-sector utilities', 'Energy storage and grid modernization projects'].map((t, i) => (
                  <li key={i} className="flex gap-2"><span style={{ color: '#A8228A' }}>•</span>{t}</li>
                ))}
              </ul>
              <p className="font-jost text-gray-500 text-sm mt-6">Serving the evolving needs of power and infrastructure markets through responsive, high-quality engineering support.</p>
            </div>
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: '#E6E8F0' }}>
              <Img src="/images/services/transmission-line-design/renewable-towers.webp" fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ChatGPT+Image+Apr+29-+2026-+12_14_23+PM-1920w.webp" alt="Utility-scale renewable infrastructure" className="w-full h-80 object-cover" />
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="py-20" style={{ background: '#06103C' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-urbanist font-black text-white mb-4" style={{ fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Ensure Your Electrical Infrastructure Is Safe, Compliant, and Future-Ready</h2>
              <p className="font-jost text-white/70 text-lg mb-8">Work with a specialized team of transmission line engineers delivering cost-optimized, code-compliant, and approval-ready designs for utility-scale and infrastructure projects.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule A Consultation</Link>
                <Link href="tel:813-389-7871" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/20">Speak With an Engineer</Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Img src="/images/services/transmission-line-design/final-cta.png" fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/e857ee18-180f-48b2-bfa8-38daf048d05c-1920w.png" alt="Keentel engineers" className="w-full h-72 object-cover" />
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-10" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Technical FAQs</h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="border rounded-xl overflow-hidden" style={{ borderColor: '#E6E8F0' }}>
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

        {/* 9. BLOGS */}
        {blogs.length > 0 && (
          <section className="py-24" style={{ background: '#F7F8FC' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Technical Reading</span>
                  <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>Transmission Line Design – Blogs</h2>
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
