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
  { q: 'How do you ensure the commissioning and testing processes are completed successfully?', a: 'We provide oversight throughout commissioning and testing, reviewing test protocols, ensuring proper system integration, and confirming performance benchmarks before handover.' },
  { q: 'Can you help with risk management for renewable power plant projects?', a: 'Yes, we identify potential technical, financial, or regulatory risks throughout the project lifecycle and work proactively to mitigate them.' },
  { q: 'What\u2019s the difference between an Owner\u2019s Engineer and an EPC contractor?', a: 'An Owner\u2019s Engineer represents the project owner and provides independent oversight, while an EPC contractor handles design, procurement, and construction. The Owner\u2019s Engineer ensures the EPC\u2019s work meets standards without conflicts of interest.' },
  { q: 'When should I bring in an Owner\u2019s Engineer during project development?', a: 'Ideally at the feasibility or conceptual design stage — early involvement ensures better technical planning, smoother interconnection applications, and fewer design revisions during EPC execution.' },
  { q: 'Does an Owner\u2019s Engineer help with NERC compliance or utility coordination?', a: 'Yes. A qualified Owner\u2019s Engineer assists with NERC compliance support, relay and protection studies, and navigating utility interconnection standards.' },
  { q: 'Can an Owner\u2019s Engineer support both AC and HVDC power projects?', a: 'Absolutely. Our Owner\u2019s Engineer services cover both traditional AC transmission systems and HVDC tasks such as converter station reviews, grounding analysis, and grid interface modeling.' },
]

export default function OwnersEngineerPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', message: '' })
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
                <span className="text-white/50 text-xs font-jost">Owner&apos;s Engineer Services</span>
              </div>
              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
                Owner&apos;s Engineer Services for Power &amp; Renewable Projects
              </h1>
              <p className="font-jost text-white/70 text-lg mb-4 max-w-3xl leading-relaxed">
                At Keentel Engineering, we provide comprehensive owner&apos;s engineer services for utility-scale power and renewable energy projects across the U.S. Our team acts as your engineering owner representative ensuring performance, safety, compliance, and cost-efficiency from concept to commissioning.
              </p>
              <p className="font-jost text-white/60 text-base mb-10 max-w-3xl leading-relaxed">
                With over 30 years of industry expertise, we deliver trusted owner&apos;s engineering services designed to optimize every stage of the project lifecycle.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                  Schedule A Call
                </Link>
                <a href="/files/owners-engineer.pdf" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/20 hover:border-white/50 transition-all">
                  Download The Flyer
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. WHY CHOOSE */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Why Choose Keentel for Owner&apos;s Engineer Services</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12">Choosing the right owner&apos;s engineer services provider is critical to your project&apos;s long-term performance. At Keentel Engineering, we bring decades of hands-on experience in complex power systems, renewable integration, and utility-scale owner&apos;s engineer support.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whyChoose.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border" style={{ borderColor: '#E6E8F0' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 font-urbanist font-black text-white" style={{ background: '#A8228A' }}>{i + 1}</div>
                  <h3 className="font-urbanist font-bold text-lg mb-3" style={{ color: '#06103C' }}>{c.t}</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
            <p className="font-jost text-gray-500 text-sm mt-8">Want to see how we support deeper system reliability? Explore our <Link href="/service/power-system-studies" className="underline" style={{ color: '#A8228A' }}>Power System Studies</Link> capabilities.</p>
            <div className="mt-6">
              <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Learn More About Us</Link>
            </div>
          </div>
        </section>

        {/* 3. CONTACT FORM */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
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

        {/* 4. WHAT IS OWNER'S ENGINEER */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-6" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>What Is an Owner&apos;s Engineer and Why It Matters</h2>
            <p className="font-jost text-gray-600 mb-4 leading-relaxed">An Owner&apos;s Engineer is your technical advocate throughout the lifecycle of an energy infrastructure project. From power plant owner&apos;s engineering to construction QA/QC and system commissioning, this role ensures that your contractors, vendors, and EPC teams meet performance expectations, safety codes, and regulatory standards.</p>
            <p className="font-jost text-gray-600 mb-4 leading-relaxed">At Keentel, we specialize in owner&apos;s engineer services for power plants, transmission systems, and renewable energy projects. Our approach reduces risk, improves accountability, and ensures your project remains on schedule and within budget.</p>
            <p className="font-jost text-gray-600 leading-relaxed">We support compliance with regulatory frameworks such as <Link href="/service/nerc-compliance" className="underline" style={{ color: '#A8228A' }}>NERC compliance requirements</Link> and deliver proven results across a wide range of utility environments. Learn more about our technical experience in <Link href="/service/substation-design" className="underline" style={{ color: '#A8228A' }}>Substation Design</Link> and <Link href="/service/poi-interconnection-engineering-support" className="underline" style={{ color: '#A8228A' }}>POI Interconnection Engineering Support</Link> — services often coordinated with our Owner&apos;s Engineer role.</p>
          </div>
        </section>

        {/* 5. FULL SCOPE */}
        <section className="py-20" style={{ background: '#06103C' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-10 text-white text-center" style={{ fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Full Scope of Our Owner&apos;s Engineering Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fullScope.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6">
                  <h3 className="font-urbanist font-bold text-lg mb-3 border-l-4 pl-3" style={{ color: '#06103C', borderColor: '#A8228A' }}>{c.t}</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. HVDC/SOLAR/WIND SEGMENTS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3 text-center" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>HVDC, Solar &amp; Wind Owner&apos;s Engineer Support</h2>
            <p className="font-jost text-gray-600 max-w-3xl mx-auto mb-12 text-center">Keentel Engineering supports a wide range of utility-scale and renewable energy projects with dedicated owner&apos;s engineer services, tailored to the specific requirements of each technology type and grid interconnection model.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {segments.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#E6E8F0' }}>
                  <h3 className="font-urbanist font-bold text-lg mb-3" style={{ color: '#06103C' }}>{c.t}</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. WHY CHOOSE KEENTEL (icons row) */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-10 text-center" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Why Choose Keentel Engineering?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { t: 'Expertise', d: 'Our team brings years of industry experience and expertise to every project we undertake.' },
                { t: 'Tailored Solutions', d: 'We understand that every project is unique, offering customized solutions tailored to your needs.' },
                { t: 'Commitment to Quality', d: 'We deliver exceptional results, ensuring every project meets the highest standards of quality.' },
                { t: 'Dedicated Support', d: 'From start to finish, our team provides the support and guidance you need to achieve success.' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border text-center" style={{ borderColor: '#E6E8F0' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-urbanist font-black text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>{i + 1}</div>
                  <h4 className="font-urbanist font-bold text-sm mb-2" style={{ color: '#06103C' }}>{c.t}</h4>
                  <p className="font-jost text-gray-500 text-xs leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. CLIENTS */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-2" style={{ color: '#06103C', fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>Our Clients</h2>
            <p className="font-jost text-gray-600 mb-8">Serving utilities, EPCs, developers, and infrastructure organizations supporting critical power systems nationwide.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {['RRC-ae225119', 'PAE-864f5ced', '49-752adf6f', '48-816ccd8f', '47-363a19ec', '46-ff7bc11f', '45-dfb687e0', '44-18370d1d', '43-10240e91'].map((slug, i) => (
                <div key={i} className="border-2 rounded-2xl flex items-center justify-center p-8" style={{ borderColor: '#E6E8F0', minHeight: 150 }}>
                  <img src={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${slug}-1920w.png`} alt="Client" className="max-h-24 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-10" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>FAQ for Owner&apos;s Engineer Services</h2>
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
                  <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>Owner&apos;s Engineer – Blogs</h2>
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
