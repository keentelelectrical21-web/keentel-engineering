'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { client } from '@/lib/sanity'

// ── Types ────────────────────────────────────────────────
interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  category: string
}

// ── Static service data (exact from Duda) ────────────────
const services = [
  {
    title: 'POI Interconnection Engineering Support',
    desc: 'Our skilled and knowledgeable engineering team has a rich history in designing, developing and commissioning various substation and interconnection engineering support projects.',
    href: '/service/poi-interconnection-engineering-support',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/poi+Interconecting.pdf',
    image: '/images/services/service-poi.jpg',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-453w.jpg',
  },
  {
    title: 'Substation Design Services',
    desc: 'At Keentel Engineering, we are experts in substation and interconnection engineering support services. Our experienced and knowledgeable team has a solid history in engineering, developing, and commissioning projects.',
    href: '/service/substation-design',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/substation+design.pdf',
    image: '/images/services/service-substation.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10002+%282%29-453w.png',
  },
  {
    title: 'EHV, HV & MV Power System Studies',
    desc: 'Ensure electrical safety, minimize downtime, and meet compliance standards with our expert power system studies across Extra High Voltage (EHV), High Voltage (HV), and Medium Voltage (MV) systems.',
    href: '/service/power-system-studies',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/advance+power+system.pdf',
    image: '/images/services/service-power-system.jpg',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10003-453w.jpg',
  },
  {
    title: "Owner's Engineer Services",
    desc: "At Keentel Engineering, we specialize in providing comprehensive owner's engineer services tailored to meet your project's unique needs. With a commitment to excellence.",
    href: '/service/owners-engineer',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/owner+engineersing.pdf',
    image: '/images/services/service-owners-engineer.jpg',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10004-453w.jpg',
  },
  {
    title: 'NERC O&P 693 Compliance Services',
    desc: 'At Keentel Engineering, our NERC compliance consultants specialize in helping power sector clients meet NERC 693 standards, including all aspects of O&P and RSAW requirements.',
    href: '/service/nerc-compliance',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/nercs.pdf',
    image: '/images/services/service-nerc.jpg',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10005-453w.jpg',
  },
  {
    title: 'Utility Scale Solar Farm Engineering',
    desc: 'Welcome to our comprehensive suite of electrical engineering services designed specifically for utility-scale solar farms. Our dedicated team of experienced professionals is committed to delivering innovative and reliable solutions.',
    href: '/service/utility-scale-solar-farms',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/utility+scale+solar+farm.pdf',
    image: '/images/services/service-solar.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10006-453w.png',
  },
  {
    title: 'Utility Scale BESS Engineering',
    desc: 'Welcome to our comprehensive range of electrical engineering services designed exclusively for utility-scale battery storage projects. Our team of experienced professionals is dedicated to providing innovative and reliable solutions.',
    href: '/service/utility-scale-battery-storage',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/utility+scale+bettry+energy+strorage.pdf',
    image: '/images/services/service-bess.jpg',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10003-f13fa323-452w.jpg',
  },
  {
    title: 'MEP Engineering Services',
    desc: 'From HVAC and electrical systems to plumbing and fire protection, Keentel delivers integrated MEP engineering solutions across the U.S. — tailored for complex facility needs.',
    href: '/service/mep-engineering',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/Keentel+Engineering+Company+Profile.pdf',
    image: '/images/services/service-mep.jpg',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10004-4a6fb974-452w.jpg',
  },
  {
    title: 'Utility Scale Wind Farm Engineering',
    desc: 'Welcome to our comprehensive electrical engineering services tailored specifically for utility-scale wind farms. Our team of experienced professionals is dedicated to providing innovative and reliable solutions.',
    href: '/service/utility-scale-wind-farms',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/utility+scale+wind+farm.pdf',
    image: '/images/services/service-wind.jpg',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10002-cc58913c-452w.jpg',
  },
]

const whyChoose = [
  {
    title: 'Client-Focused Work Approach',
    desc: 'Our team works cohesively on every project and with every client. We first develop a solid understanding of your project goals, requirements, and needs. From concept to commissioning, we assist you in every step.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: '30 Years of Experience',
    desc: 'We have over two decades of experience in design and interconnection. Rest assured, we have the knowledge, understanding, and expertise to handle and execute all types of projects with sheer perfection and superior workmanship.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Quality with Innovation',
    desc: 'At Keentel Engineering, we have established our stellar market reputation on quality, work ethics, and innovation.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: 'Attention to Detail',
    desc: 'We work on every project with laser focus and attention to detail. This enables our team to deliver desired results with complete satisfaction.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
]

// ── Service Card ─────────────────────────────────────────
function ServiceCard({ service }: { service: typeof services[0] }) {
  const [imgSrc, setImgSrc] = useState(service.image)
  return (
    <div className="rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl" style={{ border: '1px solid #E6E8F0', background: '#fff' }}>
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <img
          src={imgSrc}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgSrc(service.fallback)}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(6,16,60,0.25) 100%)' }} />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-urbanist font-bold text-xl mb-3 leading-tight" style={{ color: '#06103C' }}>{service.title}</h3>
        <p className="text-sm font-jost leading-relaxed flex-1 mb-5" style={{ color: '#6B7280' }}>{service.desc}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <Link href={service.href} className="text-xs font-bold px-4 py-2 rounded-full text-white transition-all hover:opacity-90" style={{ background: '#06103C' }}>
            Learn More
          </Link>
          <a href={service.flyer} target="_blank" rel="noopener noreferrer"
            className="text-xs font-semibold flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all hover:bg-gray-50"
            style={{ borderColor: '#E6E8F0', color: '#A8228A' }}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Flyer
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Blog Card ────────────────────────────────────────────
function BlogCard({ post }: { post: BlogPost }) {
  const base = `/images/blog/${post.slug.current}-featured`
  const extensions = ['jpg', 'png', 'jpeg', 'webp']
  const [extIdx, setExtIdx] = useState(0)
  const [useFallback, setUseFallback] = useState(false)
  const src = useFallback
    ? `https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${post.slug.current}-1920w.jpg`
    : `${base}.${extensions[extIdx]}`

  const handleError = () => {
    if (extIdx < extensions.length - 1) {
      setExtIdx(extIdx + 1)
    } else {
      setUseFallback(true)
    }
  }

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : ''

  return (
    <article className="group rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-xl flex flex-col" style={{ background: '#fff', border: '1px solid #E6E8F0' }}>
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <img
          src={src}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={handleError}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(6,16,60,0.2) 100%)' }} />
        <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: '#A8228A' }}>
          {post.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-urbanist font-bold text-base leading-snug mb-2 group-hover:underline line-clamp-2" style={{ color: '#06103C' }}>
          <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
        </h3>
        <p className="text-xs font-jost mb-3" style={{ color: '#9CA3AF' }}>By Sandip R Patel · {date}</p>
        <p className="text-sm font-jost leading-relaxed line-clamp-2 flex-1 mb-4" style={{ color: '#6B7280' }}>{post.excerpt}</p>
        <Link href={`/blog/${post.slug.current}`} className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all mt-auto" style={{ color: '#06103C' }}>
          Read post
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

// ── Main Page ────────────────────────────────────────────
export default function ServicesPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])

  useEffect(() => {
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost"] | order(publishedAt desc) [0...6] {
        _id, title, slug, publishedAt, excerpt, "category": category->title
      }`
    ).then(setBlogs).catch(() => {})
  }, [])

  return (
    <>
      <Header />
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-[500px] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/services/service-hero.jpeg"
              alt="Keentel Engineering electrical power services"
              className="w-full h-full object-cover object-center"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/pexels-photo-171428-1920w.jpeg' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(6,16,60,0.95) 0%, rgba(6,16,60,0.6) 60%, rgba(6,16,60,0.3) 100%)' }} />
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16">
            <nav className="flex items-center gap-2 mb-6 text-xs font-jost">
              <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-white/80">Services</span>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-1.5 mb-5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/70 text-sm font-jost">Full-Spectrum Electrical Power Engineering</span>
              </div>
              <h1 className="font-urbanist font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.06] mb-5">
                Full-Scale Electrical Power System{' '}
                <span style={{ color: '#C72E9E' }}>Engineering Services.</span>
              </h1>
              <p className="text-white/65 text-lg font-jost leading-relaxed max-w-2xl mb-8">
                At Keentel Engineering, we strive to provide our clients across industries with the best-in-class services to their complete satisfaction. We deliver promptly, with comprehensive attention to detail.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #C72E9E, #5B2A86)' }}>
                  Schedule A Call
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              {/* Cert logos */}
              <div className="mt-8">
                <p className="text-white/35 text-xs uppercase tracking-widest mb-3">Trusted and Certified</p>
                <img src="/images/cert-logos.png" alt="BBB Accredited IEEE Member NERC Certified FL Licensed"
                  className="h-10 w-auto object-contain opacity-80"
                  style={{ filter: 'brightness(0) invert(1)' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/new+image-670w.png' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16">

              {/* Left sticky label */}
              <div className="lg:w-80 flex-shrink-0">
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>Our Difference</p>
                <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-[1.1] mb-6" style={{ color: '#06103C' }}>Why Choose Us</h2>
                <p className="font-jost text-base leading-relaxed mb-8" style={{ color: '#4B5563' }}>
                  At Keentel Engineering, we take pride in being the go-to engineering firm for power and utility system planning, design, control, and analysis.
                </p>
                <Link href="/about" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full text-white transition-all hover:-translate-y-0.5" style={{ background: '#06103C' }}>
                  Learn More About Us
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>

              {/* Right — stacked items */}
              <div className="flex-1 flex flex-col divide-y" style={{ borderColor: '#E6E8F0' }}>
                {whyChoose.map((item, i) => (
                  <div key={i} className="flex items-start gap-6 py-8 first:pt-0 last:pb-0 group">
                    {/* Number */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-urbanist font-black text-lg transition-all group-hover:scale-110"
                      style={{ background: i % 2 === 0 ? '#06103C' : '#A8228A', color: '#fff' }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-start gap-4 mb-2">
                        <div className="mt-0.5 flex-shrink-0" style={{ color: '#A8228A' }}>{item.icon}</div>
                        <h3 className="font-urbanist font-bold text-xl leading-tight" style={{ color: '#06103C' }}>{item.title}</h3>
                      </div>
                      <p className="font-jost text-sm leading-relaxed" style={{ color: '#6B7280' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT WE OFFER ── */}
        <section className="py-6 text-center" style={{ background: '#06103C' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-white mb-5">What We Offer</h2>
            <p className="font-jost text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              At Keentel Engineering, we offer unparalleled expertise in electrical power system engineering and power system planning, design, and integration in and across all three interconnections in accordance with regulatory compliance requirements. Our decades of experience cover the entire spectrum of generation, transmission, and distribution.
            </p>
          </div>
        </section>

        {/* ── SERVICES GRID ── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <ServiceCard key={i} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOG SECTION ── */}
        <section className="py-20" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Grid IQ</p>
                <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>Blog and Updates</h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-sm transition-all" style={{ color: '#06103C' }}>
                View All Posts
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
            {blogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3].map(i => (
                  <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-48 rounded-2xl" style={{ background: '#E6E8F0' }} />
                    <div className="pt-4 space-y-2">
                      <div className="h-4 rounded" style={{ background: '#E6E8F0', width: '80%' }} />
                      <div className="h-3 rounded" style={{ background: '#E6E8F0', width: '50%' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 50%, #5B2A86 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#C72E9E' }}>Let's Work Together</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-white leading-tight mb-5">
              Let's Discuss How to Optimize Your Next Project
            </h2>
            <p className="font-jost text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Our engineers are ready to discuss your specific project requirements and help you find the best path forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}>
                Schedule a Free Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full border border-white/25 hover:bg-white/10 transition-all">
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}