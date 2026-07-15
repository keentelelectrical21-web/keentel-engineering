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
}

// ── Clients extracted from Duda HTML ─────────────────────
const clients = [
  {
    name: 'RRC Companies',
    desc: 'Trusted electrical engineering partner for utility transmission and infrastructure projects.',
    image: '/images/clients/rrc-companies.webp',
  },
  {
    name: 'PAE Engineers',
    desc: 'Delivering advanced power system solutions for complex energy and infrastructure projects.',
    image: '/images/clients/pae-engineers.webp',
  },
  {
    name: 'EDF Power Solutions',
    desc: 'Supporting utility-scale renewable energy integration and grid interconnection services.',
    image: '/images/clients/edf-power-solutions.webp',
  },
  {
    name: 'Pike Engineering',
    desc: 'Providing transmission and distribution engineering support across utility networks nationwide.',
    image: '/images/clients/pike-engineering.webp',
  },
  {
    name: 'Risk Work',
    desc: 'Providing safety-focused engineering and compliance support for critical infrastructure projects.',
    image: '/images/clients/risk-work.webp',
  },
  {
    name: 'Siemens Energy',
    desc: 'Delivering advanced power engineering and grid modernization solutions across the U.S.',
    image: '/images/clients/siemens-energy-1.webp',
  },
  {
    name: 'Avangrid',
    desc: 'Partnering on renewable energy and utility infrastructure engineering projects nationwide.',
    image: '/images/clients/avangrid.webp',
  },
  {
    name: 'Siemens Energy',
    desc: 'Delivering advanced power engineering and grid modernization solutions across the U.S.',
    image: '/images/clients/siemens-energy-2.webp',
  },
  {
    name: 'AYPA Power',
    desc: 'Providing battery storage and renewable energy interconnection engineering support services.',
    image: '/images/clients/aypa-power.webp',
  },
]

// ── Why Choose items (exact from Duda) ───────────────────
const whyItems = [
  { title: 'Expertise in HV, MV, and EHV power systems' },
  { title: 'Advanced power system modeling capabilities' },
  { title: 'Experience with utility and ISO planning requirements' },
  { title: 'Deep understanding of NERC reliability standards' },
  { title: 'Practical engineering solutions for complex power system challenges' },
]

// ── FAQs (exact from Duda accordion schema JSON) ─────────
const faqs = [
  {
    q: '1. What electrical engineering services does Keentel Engineering provide?',
    a: 'Keentel Engineering provides substation design, power system studies, relay coordination, POI interconnection support, NERC compliance consulting, SCADA integration, and utility-scale renewable energy engineering services across the United States.',
  },
  {
    q: '2. What industries does Keentel Engineering support?',
    a: 'We support utilities, renewable energy developers, EPC contractors, municipalities, industrial facilities, battery energy storage projects, and large-scale infrastructure clients nationwide.',
  },
  {
    q: '3. What is POI interconnection engineering support?',
    a: 'POI (Point of Interconnection) engineering support involves system studies, protection coordination, grid compliance analysis, and utility coordination required to safely connect generation or industrial facilities to the electrical grid.',
  },
  {
    q: '4. What types of power system studies do you perform?',
    a: 'Our team performs load flow studies, short circuit analysis, arc flash studies, relay coordination, grounding studies, transient stability analysis, and harmonic studies for MV, HV, and EHV systems.',
  },
  {
    q: '5. Do you provide NERC compliance services?',
    a: 'Yes. We provide NERC O&P 693 compliance support, RSAW documentation assistance, reliability compliance consulting, and engineering support for utility and generation facilities.',
  },
]

// ── Blog card ─────────────────────────────────────────────
function BlogCard({ post }: { post: BlogPost }) {
  const base = `/images/blog/${post.slug.current}-featured`
  const exts = ['jpg', 'png', 'jpeg', 'webp']
  const [idx, setIdx] = useState(0)
  const [useFallback, setUseFallback] = useState(false)
  const src = useFallback
    ? `https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${post.slug.current}-1920w.jpg`
    : `${base}.${exts[idx]}`
  const handleError = () => idx < exts.length - 1 ? setIdx(idx + 1) : setUseFallback(true)
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : ''
  return (
    <article className="group rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300 hover:shadow-xl" style={{ background: '#fff', border: '1px solid #E6E8F0' }}>
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <img src={src} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={handleError} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(6,16,60,0.2) 100%)' }} />
        <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: '#A8228A' }}>{post.category}</span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-urbanist font-bold text-base leading-snug mb-2 group-hover:underline line-clamp-2" style={{ color: '#06103C' }}>
          <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
        </h3>
        <p className="text-xs font-jost mb-3" style={{ color: '#9CA3AF' }}>By Sandip R Patel · {date}</p>
        <p className="text-sm font-jost leading-relaxed line-clamp-2 flex-1 mb-4" style={{ color: '#6B7280' }}>{post.excerpt}</p>
        <Link href={`/blog/${post.slug.current}`} className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#06103C' }}>
          Read post
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" /></svg>
        </Link>
      </div>
    </article>
  )
}

// ── FAQ item ──────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-2xl p-5 cursor-pointer transition-all hover:shadow-sm"
      style={{ border: `1px solid ${open ? '#06103C' : '#E6E8F0'}`, background: open ? '#F6F7FB' : '#fff' }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-4">
        <h4 className="font-urbanist font-semibold text-base leading-snug" style={{ color: '#06103C' }}>{q}</h4>
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
          style={{ background: open ? '#06103C' : '#F6F7FB', border: `1px solid ${open ? '#06103C' : '#E6E8F0'}` }}>
          <span className="font-bold text-lg leading-none" style={{ color: open ? '#fff' : '#A8228A' }}>{open ? '−' : '+'}</span>
        </div>
      </div>
      {open && <p className="mt-4 text-sm font-jost leading-relaxed" style={{ color: '#6B7280' }}>{a}</p>}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────
export default function OurClientsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])

  useEffect(() => {
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost"] | order(publishedAt desc) [0...6] { _id, title, slug, publishedAt, excerpt, category }`
    ).then(setBlogs).catch(() => {})
  }, [])

  return (
    <>
      <Header />
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-[480px] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/our-clients-hero.webp" alt="" className="w-full h-full object-cover absolute inset-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,16,60,0.92) 0%, rgba(11,26,91,0.85) 50%, rgba(91,42,134,0.80) 100%)' }} />
            <div className="absolute bottom-0 right-0 w-96 h-96 blur-3xl rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #A8228A 0%, transparent 70%)' }} />
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16">
            <nav className="flex items-center gap-2 mb-6 text-xs font-jost">
              <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-white/80">Our Clients</span>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-1.5 mb-5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/70 text-sm font-jost">Trusted by Leading Energy Companies</span>
              </div>
              <h1 className="font-urbanist font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.06] mb-5">
                Our <span style={{ color: '#C72E9E' }}>Clients</span>
              </h1>
              <p className="text-white/65 text-lg font-jost leading-relaxed max-w-2xl mb-8">
                From investor-owned utilities and renewable developers to EPC contractors and industrial facilities — Keentel Engineering delivers compliance-focused electrical engineering solutions nationwide.
              </p>
              <Link
                href="https://calendly.com/keentel-engineering/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #C72E9E, #5B2A86)' }}
              >
                Schedule a Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <div className="mt-8">
                <img src="/images/cert-logos.png" alt="BBB Accredited IEEE Member NERC Certified"
                  className="h-10 w-auto object-contain opacity-80" style={{ filter: 'brightness(0) invert(1)' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/new+image-640w.png' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-jost text-lg leading-relaxed" style={{ color: '#4B5563' }}>
              Keentel Engineering supports utilities, renewable energy developers, EPC contractors, municipalities, industrial facilities, and infrastructure owners with reliable electrical engineering and field support services across the United States.
            </p>
          </div>
        </section>

        {/* ── CLIENT GRID ── */}
        <section className="py-16" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Who We Work With</p>
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>Trusted by Industry Leaders</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((c, i) => (
                <div key={i} className="group rounded-2xl overflow-hidden bg-white hover:-translate-y-1 transition-all duration-300 hover:shadow-xl" style={{ border: '1px solid #E6E8F0' }}>
                  <div className="relative overflow-hidden flex items-center justify-center" style={{ height: '200px', background: '#fff' }}>
                    {c.image && (
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    )}
                    {!c.image && (
                      <span className="font-urbanist font-black text-2xl text-white/30 text-center px-4">{c.name}</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-urbanist font-bold text-xl mb-2" style={{ color: '#06103C' }}>{c.name}</h3>
                    <p className="font-jost text-sm leading-relaxed" style={{ color: '#6B7280' }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>Why Choose Us</p>
                <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-[1.1] mb-6" style={{ color: '#06103C' }}>
                  Why should we choose you instead of another engineering firm?
                </h2>
                <p className="font-jost text-base leading-relaxed mb-6" style={{ color: '#4B5563' }}>
                  30+ Years Delivering Reliable Power Infrastructure Solutions. Decades of hands-on expertise across transmission, substation, renewable energy, and NERC compliance engineering projects.
                </p>
                <p className="font-jost text-base leading-relaxed mb-8" style={{ color: '#4B5563' }}>
                  Our engineers offer:
                </p>
                <div className="space-y-3">
                  {whyItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: '#F6F7FB', border: '1px solid #E6E8F0' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-urbanist font-black text-sm text-white"
                        style={{ background: i % 2 === 0 ? '#06103C' : '#A8228A' }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <p className="font-jost text-sm font-semibold" style={{ color: '#06103C' }}>{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact form */}
              <div className="rounded-3xl p-8" style={{ background: '#F6F7FB', border: '1px solid #E6E8F0' }}>
                <h3 className="font-urbanist font-black text-2xl mb-2" style={{ color: '#06103C' }}>Let's Discuss How to Optimize Your Next Project</h3>
                <p className="font-jost text-sm mb-6" style={{ color: '#6B7280' }}>Fill out the form and our engineers will get back to you within 24 hours.</p>
                <ContactFormInline />
              </div>
            </div>
          </div>
        </section>

        {/* ── TECHNICAL FAQs ── */}
        <section className="py-20" style={{ background: '#F6F7FB' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Questions We Hear</p>
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>Technical FAQs</h2>
            </div>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
            </div>
          </div>
        </section>

        {/* ── BLOGS ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Power System Studies</p>
                <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>Technical Blogs</h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-sm" style={{ color: '#06103C' }}>
                View All Posts
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
            {blogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map(post => <BlogCard key={post._id} post={post} />)}
                </div>
                <div className="text-center mt-10">
                  <Link href="/blog" className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full border-2 transition-all" style={{ borderColor: '#E6E8F0', color: '#06103C' }}>
                    Show More Blogs
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </Link>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-48" style={{ background: '#E6E8F0' }} />
                    <div className="p-5 space-y-2">
                      <div className="h-4 rounded" style={{ background: '#E6E8F0', width: '80%' }} />
                      <div className="h-3 rounded" style={{ background: '#E6E8F0', width: '50%' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

// ── Inline Contact Form (Supabase) ────────────────────────
function ContactFormInline() {
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const services = [
    'POI Interconnection Engineering Support',
    'Substation Design Services',
    'EHV, HV, MV Power System Studies',
    'Owners Engineering Services',
    'NERC O&P 693 Compliance Services',
    'Utility Scale Solar Farm Engineering',
    'Nuclear Power Plant Electrical Engineering',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'our-clients' }),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(168,34,138,0.1)' }}>
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-urbanist font-bold text-xl mb-2" style={{ color: '#06103C' }}>Message Received</p>
        <p className="font-jost text-sm" style={{ color: '#6B7280' }}>Thank you for contacting us. We will get back to you as soon as possible.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#6B7280' }}>First Name *</label>
          <input required value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-jost focus:outline-none" placeholder="John"
            style={{ border: '1.5px solid #E6E8F0', background: '#fff', color: '#06103C' }} />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#6B7280' }}>Last Name</label>
          <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-jost focus:outline-none" placeholder="Smith"
            style={{ border: '1.5px solid #E6E8F0', background: '#fff', color: '#06103C' }} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#6B7280' }}>Phone *</label>
          <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-jost focus:outline-none" placeholder="+1 (555) 000-0000"
            style={{ border: '1.5px solid #E6E8F0', background: '#fff', color: '#06103C' }} />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#6B7280' }}>Email *</label>
          <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-jost focus:outline-none" placeholder="john@company.com"
            style={{ border: '1.5px solid #E6E8F0', background: '#fff', color: '#06103C' }} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#6B7280' }}>Service Interested In</label>
        <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl text-sm font-jost focus:outline-none"
          style={{ border: '1.5px solid #E6E8F0', background: '#fff', color: form.service ? '#06103C' : '#9CA3AF' }}>
          <option value="">Select a service...</option>
          {services.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#6B7280' }}>Message</label>
        <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
          rows={3} placeholder="Describe your project or question..."
          className="w-full px-4 py-2.5 rounded-xl text-sm font-jost focus:outline-none resize-none"
          style={{ border: '1.5px solid #E6E8F0', background: '#fff', color: '#06103C' }} />
      </div>
      {error && <p className="text-sm font-jost" style={{ color: '#ef4444' }}>{error}</p>}
      <button type="submit" disabled={loading}
        className="w-full text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
        style={{ background: 'linear-gradient(135deg, #06103C, #5B2A86)' }}>
        {loading ? (
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
        ) : 'Submit Request'}
      </button>
    </form>
  )
}
