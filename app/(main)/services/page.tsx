'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
import SoftwareTools from '@/components/sections/SoftwareTools'
import FAQ from '@/components/sections/FAQ'
import WhoWeServed from '@/components/service/WhoWeServed'
import { client } from '@/lib/sanity'

// ── Types ────────────────────────────────────────────────
interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  category: string
  featuredImage?: string
}

const heroSlides = [
  {
    label: 'Full-Spectrum Electrical Power Engineering',
    title: 'Full-scale power system engineering services — delivered right the first time.',
    text: 'At Keentel Engineering, we serve utilities, developers, EPCs, and industrial clients with best-in-class engineering across every phase of a project. ',
    primary: ['Schedule a Consultation', 'https://calendly.com/keentel-engineering/15min'],
    secondary: ['Explore Our Services', '#service-portfolio'],
  },
  {
    label: 'Grid Studies & Interconnection',
    title: 'From POI strategy to utility-ready system performance.',
    text: 'Transmission planning, load flow, short circuit, protection, RMS and EMT modeling, and interconnection support—coordinated by one engineering team from early screening through approval.',
    primary: ['Explore Power System Studies', '/service/power-system-studies'],
    secondary: ['POI Interconnection Services', '/service/poi-interconnection-engineering-support'],
  },
  {
    label: 'Design, Compliance & Field Delivery',
    title: 'Engineering that stays defensible through energization.',
    text: 'Substation design, NERC compliance, owner’s engineering, renewable integration, SCADA, testing, and commissioning delivered with traceable assumptions and construction-ready detail.',
    primary: ['View Substation Services', '/service/substation-design'],
    secondary: ['Explore NERC Compliance', '/service/nerc-compliance'],
  },
] as const

// ── Static service data (exact from Duda) ────────────────
const services = [
  {
    title: 'POI Interconnection Engineering Support',
    desc: 'Our skilled and knowledgeable engineering team has a rich history in designing, developing and commissioning various substation and interconnection engineering support projects.',
    href: '/service/poi-interconnection-engineering-support',
    flyer: '/files/poi-interconnection.pdf',
    image: '/images/services/service-poi.jpg',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-453w.jpg',
  },
  {
    title: 'Substation Design Services',
    desc: 'At Keentel Engineering, we are experts in substation and interconnection engineering support services. Our experienced and knowledgeable team has a solid history in engineering, developing, and commissioning projects.',
    href: '/service/substation-design',
    flyer: '/files/substation-design.pdf',
    image: '/images/services/service-substation.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10002+%282%29-453w.png',
  },
  {
    title: 'EHV, HV & MV Power System Studies',
    desc: 'Ensure electrical safety, minimize downtime, and meet compliance standards with our expert power system studies across Extra High Voltage (EHV), High Voltage (HV), and Medium Voltage (MV) systems.',
    href: '/service/power-system-studies',
    flyer: '/files/advance-power-system.pdf',
    image: '/images/services/service-power-system.jpg',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10003-453w.jpg',
  },
  {
    title: "Owner's Engineer Services",
    desc: "At Keentel Engineering, we specialize in providing comprehensive owner's engineer services tailored to meet your project's unique needs. With a commitment to excellence.",
    href: '/service/owners-engineer',
    flyer: '/files/owners-engineer.pdf',
    image: '/images/services/service-owners-engineer.jpg',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10004-453w.jpg',
  },
  {
    title: 'NERC O&P 693 Compliance Services',
    desc: 'At Keentel Engineering, our NERC compliance consultants specialize in helping power sector clients meet NERC 693 standards, including all aspects of O&P and RSAW requirements.',
    href: '/service/nerc-compliance',
    flyer: '/files/nerc-compliance.pdf',
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
  {
    title: 'Nuclear Power Plant Electrical Engineering',
    desc: 'Lifecycle electrical engineering for nuclear generation, including system studies, protection, modifications, equipment upgrades, compliance support, and plant reliability.',
    href: '/service/nuclear-power-plant',
    flyer: '/files/nuclear-power-plant-electrical-engineering.pdf',
    image: '/images/services/power-system-studies/industry-utilities.jpg',
    fallback: '/images/services/power-system-studies/industry-utilities.jpg',
  },
]

const serviceByHref = new Map(services.map((service) => [service.href, service]))
const orderedServices = [
  { ...serviceByHref.get('/service/power-system-studies')!, title: 'Power System Studies', image: '/images/services/power-system-studies/overview-engineers.jpg' },
  { ...serviceByHref.get('/service/substation-design')!, title: 'Substation Design' },
  { ...serviceByHref.get('/service/nerc-compliance')!, title: 'NERC Compliance Services', image: '/images/services/nerc-compliance/NERC Compliance Services.png' },
  { ...serviceByHref.get('/service/poi-interconnection-engineering-support')!, title: 'POI Interconnection Engineering' },
  {
    ...serviceByHref.get('/service/utility-scale-solar-farms')!,
    title: 'Utility Scale Renewable Energy',
    desc: 'Integrated electrical engineering and grid support for utility-scale solar, wind, and battery energy storage projects.',
    href: '/service/utility-scale-renewable-energy',
    image: '/images/services/utility-scale-renewable-energy/hero-towers.webp',
  },
  {
    ...serviceByHref.get('/service/utility-scale-battery-storage')!,
    title: 'Transmission Line Design',
    desc: 'Electrical and structural engineering, routing, conductor selection, sag-tension analysis, and standards-compliant line design.',
    href: '/service/transmission-line-design',
    image: '/images/services/transmission-line-design/renewable-towers.webp',
  },
  { ...serviceByHref.get('/service/nuclear-power-plant')!, title: 'Nuclear Power Plant Engineering', image: '/images/services/nuclear/Expert Nuclear Electrical Engineering From Design to Decades of Reliable Operation.webp' },
  { ...serviceByHref.get('/service/owners-engineer')!, title: "Owner's Engineer Services", image: '/images/services/owners-engineer/construction-workers.jpg' },
  { ...serviceByHref.get('/service/mep-engineering')!, title: 'MEP Engineering Services', image: '/images/services/mep-engineering/Integrated MEP Engineering Services for Complex Facility Projects.jpg' },
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
  const sources = [
    ...(post.featuredImage ? [post.featuredImage] : []),
    ...extensions.map(extension => `${base}.${extension}`),
  ]
  const [sourceIndex, setSourceIndex] = useState(0)
  const [imageFailed, setImageFailed] = useState(false)
  const src = sources[sourceIndex]

  const handleError = () => {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex(index => index + 1)
    } else {
      setImageFailed(true)
    }
  }

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : ''

  return (
    <article className="group rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-xl flex flex-col" style={{ background: '#fff', border: '1px solid #E6E8F0' }}>
      <div className="relative h-64 overflow-hidden bg-white sm:h-72">
        {!imageFailed && src ? (
          <img
            src={src}
            alt={post.title}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            onError={handleError}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" style={{ background: 'linear-gradient(135deg, #06103C, #5B2A86)' }}>
            <span className="font-urbanist text-5xl font-black text-white/20">K</span>
          </div>
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(6,16,60,0.2) 100%)' }} />
      </div>
      <div className="p-5 flex flex-col flex-1">
        {post.category && (
          <span className="mb-3 inline-flex w-fit rounded-full px-3 py-1 font-jost text-xs font-bold text-white" style={{ background: '#A8228A' }}>
            {post.category}
          </span>
        )}
        <h3 className="font-urbanist font-bold text-base leading-snug mb-2 group-hover:underline line-clamp-2" style={{ color: '#06103C' }}>
          <Link href={`/${post.slug.current}`}>{post.title}</Link>
        </h3>
        <p className="text-xs font-jost mb-3" style={{ color: '#9CA3AF' }}>By Sandip R Patel · {date}</p>
        <p className="text-sm font-jost leading-relaxed line-clamp-2 flex-1 mb-4" style={{ color: '#6B7280' }}>{post.excerpt}</p>
        <Link href={`/${post.slug.current}`} className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all mt-auto" style={{ color: '#06103C' }}>
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
  const [activeHero, setActiveHero] = useState(0)
  const [heroPaused, setHeroPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost"] | order(publishedAt desc) [0...6] {
        _id, title, slug, publishedAt, excerpt,
        "category": coalesce(category->title, category),
        "featuredImage": coalesce(featuredImage.asset->url, mainImage.asset->url)
      }`
    ).then(setBlogs).catch(() => {})
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (heroPaused || reducedMotion) return
    const timer = window.setInterval(() => setActiveHero(current => (current + 1) % heroSlides.length), 6000)
    return () => window.clearInterval(timer)
  }, [heroPaused, reducedMotion])

  return (
    <>
      <Header />
      <main className="flex flex-col">

        {/* ── HERO ── */}
        <section className="relative flex min-h-[940px] items-start overflow-hidden sm:min-h-[920px] lg:min-h-[900px]" aria-roledescription="carousel" aria-label="Keentel engineering services" onMouseEnter={() => setHeroPaused(true)} onMouseLeave={() => setHeroPaused(false)} onFocusCapture={() => setHeroPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHeroPaused(false) }}>
          <div className="absolute inset-0 z-0">
            <video autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover object-center" aria-label="Keentel Engineering electrical power services">
              <source src="/videos/service.mp4" type="video/mp4" />
              Your browser does not support background video.
            </video>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(6,16,60,0.95) 0%, rgba(6,16,60,0.6) 60%, rgba(6,16,60,0.3) 100%)' }} />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-44 sm:px-6 sm:pb-16 sm:pt-48 lg:px-8 lg:pt-52">
            <nav className="flex items-center gap-2 mb-6 text-xs font-jost">
              <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-white/80">Services</span>
            </nav>
            <div className="max-w-4xl">
              <div className="relative h-[34rem] min-[390px]:h-[32rem] sm:h-[27rem] lg:h-[26rem]">
                {heroSlides.map((slide, index) => <article key={slide.label} aria-hidden={activeHero !== index} inert={activeHero !== index} className={`absolute inset-0 transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${activeHero === index ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-4 opacity-0'}`}>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2"><span className="h-2 w-2 rounded-full bg-green-400" /><span className="font-jost text-xs font-semibold text-white/[0.82] sm:text-sm">{slide.label}</span></div>
                  <h1 className="max-w-4xl font-urbanist text-3xl font-black leading-[1.06] text-white min-[390px]:text-4xl sm:text-5xl lg:text-6xl">{slide.title}</h1>
                  <p className="mt-6 max-w-3xl font-jost text-base leading-7 text-white/[0.84] sm:text-lg lg:text-xl">{slide.text}</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                    <Link href={slide.primary[1]} target={slide.primary[1].startsWith('http') ? '_blank' : undefined} rel={slide.primary[1].startsWith('http') ? 'noopener noreferrer' : undefined} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-br from-[#C72E9E] to-[#5B2A86] px-6 py-3.5 text-center font-jost text-sm font-semibold text-white transition hover:-translate-y-0.5 sm:w-auto">{slide.primary[0]} <span className="ml-2">→</span></Link>
                    <Link href={slide.secondary[1]} className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/30 bg-white/[0.05] px-6 py-3.5 text-center font-jost text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto">{slide.secondary[0]}</Link>
                  </div>
                </article>)}
              </div>

              <div className="mb-8 mt-3 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#06103C]/35 px-3 py-2 backdrop-blur-sm" role="group" aria-label="Choose a services slide">
                {heroSlides.map((slide, index) => <button key={slide.label} type="button" aria-label={`Show slide ${index + 1}: ${slide.label}`} aria-current={activeHero === index ? 'true' : undefined} onClick={() => setActiveHero(index)} className={`h-2.5 rounded-full border transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${activeHero === index ? 'w-12 border-[#EF73D0] bg-[#C72E9E] shadow-[0_0_16px_rgba(199,46,158,0.5)]' : 'w-8 border-white/30 bg-white/30 hover:bg-white/55'}`}><span className="sr-only">{slide.label}</span></button>)}
              </div>

              <div className="border-t border-white/10 pt-8">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-5 font-jost font-semibold">Certifications &amp; Memberships</p>
                <div className="inline-block rounded-2xl px-6 py-5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <img
                    src="/images/cert-logos-hero-white-spaced-v3.png"
                    alt="BBB Accredited IEEE Member NERC Certified FL Licensed"
                    className="h-20 sm:h-24 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/new+image-640w.png' }}
                  />
                </div>
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
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>Our Approach</p>
                <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-[1.1] mb-6" style={{ color: '#06103C' }}>Engineering Built Around Your Project</h2>
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
        <ContactForm />

        <SoftwareTools />

        <section className="relative border-t border-[#E1E5EE] bg-[#F6F7FB] py-14 text-center sm:py-16 lg:py-20">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#06103C] via-[#C72E9E] to-[#06103C]" aria-hidden="true" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#A8228A]">Integrated Engineering Services</p>
            <h2 className="mb-5 font-urbanist text-3xl font-black text-[#06103C] sm:text-4xl lg:text-5xl">What We Offer</h2>
            <p className="font-jost text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              At Keentel Engineering, we offer unparalleled expertise in electrical power system engineering and power system planning, design, and integration in and across all three interconnections in accordance with regulatory compliance requirements. Our decades of experience cover the entire spectrum of generation, transmission, and distribution.
            </p>
          </div>
        </section>

        {/* ── SERVICES GRID ── */}
        <section id="service-portfolio" className="scroll-mt-24 bg-white pb-16 pt-10 sm:pt-12 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {orderedServices.map((service, i) => (
                <ServiceCard key={i} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOG SECTION ── */}
        <section className="order-last py-20" style={{ background: '#F6F7FB' }}>
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
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#C72E9E' }}>Let&apos;s Work Together</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-white leading-tight mb-5">
              Let&apos;s Discuss How to Optimize Your Next Project
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

        <WhoWeServed />

        <FAQ />

      </main>
      <Footer />
    </>
  )
}
