'use client'

import { useEffect, useState, useRef } from 'react'
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

const softwareTools = [
  { key: 'psse', name: 'PSS®E', logo: '/images/services/power-system-studies/logo-psse.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/PSSE-1920w.png',
    description: 'Power System Simulator for Engineering by Siemens.',
    capabilities: ['Transmission planning', 'Contingency analysis', 'Stability simulations', 'IBR modeling'] },
  { key: 'etap', name: 'ETAP', logo: '/images/services/power-system-studies/logo-etap.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ETAP-1920w.png',
    description: 'Electrical power system engineering platform for design, simulation, and operation.',
    capabilities: ['Power flow & short circuit', 'Arc flash analysis', 'Protection coordination', 'Digital Twin monitoring'] },
  { key: 'pscad', name: 'PSCAD', logo: '/images/services/power-system-studies/logo-pscad.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Logo+-+PSCAD+MHI+BLUE-+2018-1920w.png',
    description: 'Electromagnetic transient (EMT) simulation software.',
    capabilities: ['HVDC studies', 'Converter modeling', 'Lightning surge analysis', 'Transmission line modeling'] },
  { key: 'powerworld', name: 'PowerWorld', logo: '/images/services/power-system-studies/logo-powerworld.jpg', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/PowerWorld-1920w.jpg',
    description: 'Power system visualization and simulation software.',
    capabilities: ['Interactive one-line diagrams', 'Contingency analysis', 'Voltage stability', 'OPF'] },
  { key: 'skm', name: 'SKM PTW', logo: '/images/services/power-system-studies/logo-skm.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/SKM+PowerTools-1920w.png',
    description: 'Electrical engineering platform for power system design, analysis, and safety.',
    capabilities: ['Load flow & short circuit', 'Arc flash (CAPTOR)', 'Harmonics (HI_WAVE)', 'Protection coordination'] },
  { key: 'autocad', name: 'AutoCAD Elec.', logo: '/images/services/power-system-studies/logo-autocad.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/aeimages-1920w.png',
    description: 'Intelligent automation for electrical schematics: wire numbering, tagging, error checking.',
    capabilities: ['Relay protection design', 'Automatic BOM', 'IEC/ANSI symbol libraries', 'Multi-user collaboration'] },
  { key: 'aspen', name: 'ASPEN', logo: '/images/services/power-system-studies/logo-aspen.png', fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/6a12ed_77c665e4ee2c4db2b3fbb92a34f3b12e-mv2-1920w.png',
    description: 'Advanced short circuit analysis and relay coordination platform.',
    capabilities: ['Breaker rating module', 'Phase-domain modeling', 'Relay modeling', 'Power flow for transmission planning'] },
]

const faqs = [
  { q: 'What are substation services, and why are they important in power systems?', a: 'Substation services include the design, engineering, protection, automation, and analysis of facilities that transform voltage levels, control power flow, and protect electrical networks. Substations are critical to ensuring safe, reliable, and efficient delivery of electricity from generation sources to transmission and distribution systems.' },
  { q: 'What does a substation designer do?', a: 'A substation designer develops detailed engineering drawings and technical documentation required to construct or upgrade substations, including general arrangements, equipment layouts, wiring diagrams, control schematics, material lists, and cable schedules.' },
  { q: 'What are the different types of substations?', a: 'Transmission substations step up or down voltage for long-distance transmission. Distribution substations deliver power to end-users at lower voltages. Switching substations perform switching/protection without transformation. Collector substations aggregate renewable power from wind, solar, or BESS facilities.' },
  { q: 'What are the key components of a substation?', a: 'Key components include power transformers, circuit breakers, disconnect switches, busbars, protection relays, surge or lightning arresters, and control/protection/SCADA systems.' },
  { q: 'What are the primary considerations when designing a substation?', a: 'Voltage level, load growth, fault levels, site conditions, grounding, safety, environmental constraints, constructability, and compliance with IEEE, NEC, NESC, IEC, and utility-specific requirements.' },
  { q: 'What is the difference between AIS and GIS substations?', a: 'AIS (Air-Insulated Substations) use air as the insulating medium and require larger footprints at lower upfront cost. GIS (Gas-Insulated Substations) use SF6 or alternative gases for compact designs suitable for urban sites, at higher initial cost but reduced land requirements.' },
  { q: 'How is a substation layout determined?', a: 'Layout is determined based on available space, voltage class, bus configuration, reliability requirements, safety clearances, and operational flexibility using single-line diagrams and constructability reviews.' },
  { q: 'What standards are followed in substation design?', a: 'IEEE standards (e.g., IEEE 80 for grounding), IEC standards (e.g., IEC 61850 for automation), NEC/NESC requirements, and local utility/ISO/RTO standards.' },
  { q: 'How is the substation voltage level determined?', a: 'Voltage levels are selected based on system requirements, transmission distance, load demand, and interconnection constraints. Common levels include 69 kV, 115 kV, 230 kV, and 500 kV.' },
  { q: 'What are the considerations for grounding in a substation?', a: 'Grounding design evaluates soil resistivity, ground grid resistance, and step-and-touch voltage limits in accordance with IEEE 80 and utility standards to ensure personnel safety and equipment protection.' },
  { q: 'How is short-circuit current calculated for substation design?', a: 'Short-circuit current is calculated using power system analysis software such as ETAP, PSS®E, or PSCAD, considering system impedance, transformer ratings, and network configuration.' },
  { q: 'What is substation protection and control (P&C)?', a: 'Protection and Control systems monitor substation conditions and detect, isolate, and clear faults using protection relays, circuit breakers, and automation logic.' },
  { q: 'What are common protection schemes used in substations?', a: 'Differential protection for transformers, distance and overcurrent protection for transmission lines, and busbar protection schemes for high-reliability substations.' },
  { q: 'How are protection relays selected for a substation?', a: 'Relay selection is based on voltage level, fault characteristics, system configuration, and utility standards. Common platforms include SEL, GE, ABB, and Siemens.' },
  { q: 'What is the role of SCADA in substation design?', a: 'SCADA provides remote monitoring, control, and data acquisition for substation equipment, improving visibility and reliability through EMS/DMS integration.' },
  { q: 'What is the typical timeline for constructing a substation?', a: 'Substation projects typically range from 12 to 36 months depending on voltage level, site conditions, equipment lead times, permitting, and utility review cycles.' },
  { q: 'What are the key steps in commissioning a substation?', a: 'Visual inspections, functional testing of relays and breakers, SCADA and communication testing, and energization/performance verification.' },
  { q: 'What safety precautions are taken during substation construction?', a: 'PPE requirements, grounding practices, arc-flash assessments, lockout/tagout procedures, and compliance with OSHA and utility safety programs.' },
  { q: 'How are substations monitored and maintained?', a: 'Substations are monitored through SCADA systems and maintained through routine inspections, testing, and condition-based maintenance.' },
  { q: 'Why is periodic testing important in substations?', a: 'Periodic testing verifies equipment performance, identifies degradation early, and ensures continued compliance with reliability and safety standards.' },
  { q: 'What is the role of thermal imaging in substation maintenance?', a: 'Thermal imaging identifies abnormal heating in transformers, breakers, and connections, helping prevent failures and unplanned outages.' },
  { q: 'What is a digital substation?', a: 'A digital substation uses IEC 61850-based communication, replacing conventional copper wiring with fiber-optic networks to improve data accuracy and scalability.' },
  { q: 'How are renewable energy sources integrated into substation designs?', a: 'Renewable resources are connected through collector systems and step-up substations, with designs addressing inverter behavior, protection coordination, harmonics, and grid-code compliance.' },
  { q: 'Where can I find companies specializing in electric substation protection and control engineering?', a: 'Keentel Engineering specializes in utility-grade substation protection and control engineering, including relay coordination, SCADA/RTU configuration, and control building integration for transmission, distribution, and renewable substations across the U.S.' },
]

function Img({ src, fallback, alt, className }: { src: string; fallback: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={className} onError={(e) => { (e.target as HTMLImageElement).src = fallback }} />
}

export default function SubstationDesignPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [activeSoftware, setActiveSoftware] = useState('psse')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    client.fetch<BlogPost[]>(
      `*[_type == "blogPost" && (
        category match "*substation*" || category match "*Substation*"
        || category match "*SCADA*" || category match "*scada*"
        || category match "*protection*" || category match "*relay*" || category match "*GIS*"
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
          email: formData.email, service: formData.service || 'Substation Design Services',
          message: formData.message, source: 'substation-design',
        }),
      })
      if (res.ok) { setFormStatus('success'); setFormData({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' }) }
      else setFormStatus('error')
    } catch { setFormStatus('error') }
  }

  const activeTool = softwareTools.find(t => t.key === activeSoftware) || softwareTools[0]
  const blogImageUrl = (post: BlogPost) => post.mainImage?.asset?.url || `https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-96f20648-1920w.png`

  return (
    <>
      <Header />
      <main>

        {/* 1. HERO — Video Background */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden" style={{ background: '#06103C' }}>
          <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-25">
            <source src="/videos/power-system-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,16,60,0.97) 0%, rgba(6,16,60,0.75) 60%, rgba(91,42,134,0.4) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-8">
                <Link href="/services" className="text-xs font-semibold uppercase tracking-widest font-jost" style={{ color: '#A8228A' }}>Services</Link>
                <span className="text-white/30">/</span>
                <span className="text-white/50 text-xs font-jost">Substation Design</span>
              </div>
              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
                Substation Design, Protection, SCADA &amp; Power System Studies
              </h1>
              <p className="font-jost text-white/70 text-lg mb-4 max-w-3xl leading-relaxed">
                Safe, reliable, and future-ready substation solutions engineered for grid performance, automation, and compliance.
              </p>
              <p className="font-jost text-white/60 text-base mb-10 max-w-3xl leading-relaxed">
                We provide specialized substation design services, including substation electrical engineering, protection &amp; control, SCADA, and power system studies for utilities, renewable energy developers, EPCs, and industrial clients across the United States.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                  Schedule A Call
                </Link>
                <a href="/files/substation-design.pdf" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/20 hover:border-white/50 transition-all">
                  Download The Flyer
                </a>
                <Link href="/service/power-system-studies" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/20 hover:border-white/50 transition-all">
                  IEEE P2800 Compliance Service
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ENGINEERING EXCELLENCE — logos + why choose / you will receive */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-urbanist font-black mb-4" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>30+ Years of Electrical Engineering Excellence</h2>
              <p className="font-jost text-gray-600 mb-8 max-w-xl">Utility-grade substation design services and electrical engineering, including protection &amp; control, automation, and power system studies, trusted by utilities, EPCs, and energy developers nationwide.</p>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { src: '/images/services/substation-design/logo-ieee.jpg', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/IEEE-Logo-1920w.jpg', alt: 'IEEE' },
                  { src: '/images/services/substation-design/logo-iec61850.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/61850_logo-1a-1-300x206-1920w.png', alt: 'IEC 61850' },
                  { src: '/images/services/substation-design/logo-nerc.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/nerc-1920w.png', alt: 'NERC' },
                  { src: '/images/services/substation-design/logo-nfpa.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/NFPA-Logo-RBG-2015-1920w.png', alt: 'NFPA' },
                  { src: '/images/services/power-system-studies/logo-psse.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/images-c9692ad1-1920w.png', alt: 'PSS E' },
                  { src: '/images/services/substation-design/logo-etap.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/etap-color-logo-png-1920w.png', alt: 'ETAP' },
                  { src: '/images/services/power-system-studies/logo-pscad.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Logo+-+PSCAD+MHI+BLUE-+2018-1920w.png', alt: 'PSCAD' },
                  { src: '/images/services/substation-design/logo-autocad-alt.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/autocad-logo-png_seeklogo-482394-1920w.png', alt: 'AutoCAD' },
                ].map((l, i) => (
                  <div key={i} className="bg-white border rounded-xl flex items-center justify-center p-3" style={{ borderColor: '#E6E8F0', minHeight: 70 }}>
                    <Img src={l.src} fallback={l.fb} alt={l.alt} className="max-h-10 max-w-full object-contain" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 font-jost mb-8">IEEE | NERC | NFPA | IEC 61850 • ETAP | PSCAD | PSS®E | AutoCAD • Substation Automation &amp; SCADA</p>
              <h3 className="font-urbanist font-bold text-lg mb-3" style={{ color: '#06103C' }}>Trusted by Utilities &amp; Energy Developers</h3>
              <ul className="space-y-2 font-jost text-sm text-gray-600">
                {['Licensed U.S. Professional Electrical Engineers with nationwide substation engineering coverage',
                  'Proven experience supporting utility EMS/DMS integration and ISO/RTO interfaces',
                  'Deep expertise in digital substation design, SCADA integration, and NERC CIP-aware electrical engineering',
                  'Trusted partner for utility-grade substation design services, EPCs, and energy developers nationwide'].map((t, i) => (
                  <li key={i} className="flex gap-2"><span style={{ color: '#A8228A' }}>•</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white border rounded-2xl p-8 shadow-lg" style={{ borderColor: '#E6E8F0' }}>
              <h3 className="font-urbanist font-bold text-xl mb-4" style={{ color: '#06103C' }}>You Will Receive</h3>
              <ul className="space-y-3 font-jost text-sm text-gray-600">
                {['Complete substation electrical design services (primary, secondary, and auxiliary systems)',
                  'Substation protection, control, and relay engineering aligned with utility standards and NERC requirements',
                  'SCADA and substation automation design, including RTUs, IEDs, gateways, and HMI systems',
                  'Substation IT and network architecture with redundancy, segmentation, and cybersecurity considerations',
                  'Comprehensive power system studies for substations (load flow, short-circuit, arc-flash, EMT analysis)',
                  'Compliance-driven engineering aligned with IEEE, NEC, NESC, NERC, IEC 61850, and utility standards',
                  'Permit-ready and IFC substation drawings, technical specifications, and engineering reports',
                  'Optimized substation designs for renewables, IBRs, DERs, and advanced grid automation'].map((t, i) => (
                  <li key={i} className="flex gap-2"><span style={{ color: '#A8228A' }}>✓</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. WHY CHOOSE KEENTEL — 3 items */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Why Choose Keentel Engineering?</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12">At Keentel Engineering, we take pride in being the go-to electrical power engineering firm for power and utility system planning, substation design, protection, control, and power system analysis.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { t: '30 Years of Experience', d: 'Three decades of hands-on project delivery, bringing unmatched expertise in substation layout design, electrical and civil engineering, relay protection, and grid-tie solutions.' },
                { t: 'Quality with Innovation', d: 'Our engineering process applies AutoCAD 3D, BIM modeling, and system-level substation design practices, enabling clash-free coordination between structural, electrical, and civil disciplines.' },
                { t: 'Attention to Detail', d: 'From grounding grid studies to relay protection settings, we engineer every detail to improve reliability, performance, and safety, with rigorous QA/QC for IEEE, NFPA, and ISO/TSO compliance.' },
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

        {/* 4. SOFTWARE CAPABILITIES (simplified, shared with power-system-studies assets) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest font-jost" style={{ color: '#A8228A' }}>Tools We Use</span>
              <h2 className="font-urbanist font-black mt-2" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Our Software Capabilities</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {softwareTools.map(tool => (
                <button key={tool.key} onClick={() => setActiveSoftware(tool.key)}
                  className={`flex flex-col items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all ${activeSoftware === tool.key ? 'shadow-lg' : ''}`}
                  style={{ borderColor: activeSoftware === tool.key ? '#A8228A' : '#E6E8F0', background: activeSoftware === tool.key ? '#FDF5FC' : '#fff' }}>
                  <img src={tool.logo} alt={tool.name} className="h-8 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = tool.fallback }} />
                  <span className="text-[10px] font-bold uppercase tracking-wide font-jost" style={{ color: activeSoftware === tool.key ? '#A8228A' : '#999' }}>{tool.name}</span>
                </button>
              ))}
            </div>
            <div className="border-t pt-10 grid grid-cols-1 md:grid-cols-2 gap-10" style={{ borderColor: '#E6E8F0' }}>
              <div className="flex items-center gap-4">
                <img src={activeTool.logo} alt={activeTool.name} className="h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = activeTool.fallback }} />
                <div>
                  <h3 className="font-urbanist font-bold text-lg" style={{ color: '#06103C' }}>{activeTool.name}</h3>
                  <p className="font-jost text-gray-500 text-sm">{activeTool.description}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Key Capabilities</p>
                <ul className="space-y-2 font-jost text-sm text-gray-600">
                  {activeTool.capabilities.map((c, i) => (
                    <li key={i} className="flex gap-2"><span style={{ color: '#A8228A' }}>•</span>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. MODERN SUBSTATION DESIGN — 6 cards */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Why Modern Substation Design Requires More Than Drawings</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12">Modern substations must be engineered as integrated electrical, protection, communication, and digital systems — not isolated drawings or disconnected studies.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { t: 'Dependable Capacity', d: 'Dependable substation capacity engineering designed for load growth, future expansion, N-1 contingencies, and renewable generation variability.', img: '/images/services/substation-design/card-capacity.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Dependable+Capacity.jpg-1920w.png' },
                { t: 'Protection & Automation', d: 'Selective, coordinated protection schemes and relay automation for fast fault isolation, system stability, and safe restoration.', img: '/images/services/substation-design/card-protection.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/substation+relay+engineering.jpg-1920w.png' },
                { t: 'SCADA & Digital Substations', d: 'Interoperable architectures integrated into utility EMS and DMS platforms for secure monitoring and operational control.', img: '/images/services/substation-design/card-scada.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/SCADA-+substation+automation.jpg-1920w.png' },
                { t: 'Standards & Compliance', d: 'Engineering aligned with NERC, IEEE, NEC, NESC, IEC 61850, and utility-specific requirements for smooth approvals.', img: '/images/services/substation-design/card-standards.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/substation+electrical+design.jpg-1920w.png' },
                { t: 'Cyber-Aware Architecture', d: 'Redundant, fault-tolerant network and control system designs addressing operational resilience and cybersecurity.', img: '/images/services/substation-design/card-cyber.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Substation+IT+and+network+architecture.jpg-1920w.png' },
                { t: 'IBR Integration', d: 'Advanced modeling, protection strategies, and control coordination for solar, wind, and BESS interconnections.', img: '/images/services/substation-design/card-ibr.png', fb: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Power+systam+studies.mov-1920w.png' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border" style={{ borderColor: '#E6E8F0' }}>
                  <div className="h-44 overflow-hidden"><Img src={c.img} fallback={c.fb} alt={c.t} className="w-full h-full object-cover" /></div>
                  <div className="p-6">
                    <h3 className="font-urbanist font-bold text-lg mb-2" style={{ color: '#06103C' }}>{c.t}</h3>
                    <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. DOWNLOAD FLYER + CONTACT FORM */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>Download our Substation Design Services flyer</p>
              <p className="font-jost text-gray-600 mb-6">Please click the Download button to get our Substation Design Services flyer.</p>
              <a href="/files/substation-design.pdf" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Download The Flyer</a>
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

        {/* 7. WHAT WE DELIVER — 9 cards */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>What Our Substation Design Services Deliver</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12">End-to-end substation design services — from early feasibility through Issue-for-Construction (IFC) packages and commissioning support.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { n: '01', t: 'Feasibility & Early Electrical Planning', d: 'Conceptual substation configurations, preliminary studies, and technical assessments supporting interconnection requirements.', img: 'card-01.png', fb: 'Feasibility+-+Early+Electrical+Planning-1920w.png' },
                { n: '02', t: 'Electrical, Protection & Control Engineering', d: 'Primary, secondary, and auxiliary substation electrical systems aligned with utility standards.', img: 'card-02.png', fb: 'Substation+Electrical-+Protection+-+Control+Engineering-1920w.png' },
                { n: '03', t: 'Layouts & Equipment Arrangement', d: 'General arrangements, equipment layouts, electrical clearances, and cable routing designed for constructability.', img: 'card-03.png', fb: 'Electrical+Layouts+-+Equipment+Arrangement-1920w.png' },
                { n: '04', t: 'Power System Studies & Safety', d: 'Comprehensive power system studies including load flow, short-circuit, grounding, arc-flash, and EMT analysis.', img: 'card-04.png', fb: 'Power+System+Studies+-+Safety+Analysis-1920w.png' },
                { n: '05', t: 'SCADA & Substation Automation', d: 'Secure SCADA architectures with EMS/DMS integration and cybersecurity-aware system planning.', img: 'card-05.png', fb: 'SCADA-+Substation+Automation+-+IT+Network+Architecture-1920w.png' },
                { n: '06', t: 'Design Calculations & Drawings', d: 'Construction-ready substation drawings and calculations including schematics, wiring, and logic diagrams.', img: 'card-06.png', fb: 'Design+Calculations+-+Detailed+Electrical+Drawings-1920w.png' },
                { n: '07', t: 'Specifications & Material Packages', d: 'Equipment and material specifications, relay and control requirements, and procurement support.', img: 'card-07.png', fb: 'Electrical+Specifications+-+Material+Packages-1920w.png' },
                { n: '08', t: 'QA/QC, Compliance & IFC Packages', d: 'Independent QA/QC reviews, compliance verification, and complete IFC substation design packages.', img: 'card-08.png', fb: 'QA_QC+-+Standards+Compliance+Reviews-1920w.png' },
                { n: '09', t: 'Construction & Commissioning Support', d: 'Engineering support during installation, testing, energization, and project handover.', img: 'card-09.png', fb: 'Construction-+Testing+-+Commissioning+Support-1920w.png' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border" style={{ borderColor: '#E6E8F0' }}>
                  <div className="relative h-40 overflow-hidden">
                    <Img src={`/images/services/substation-design/${c.img}`} fallback={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${c.fb}`} alt={c.t} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center font-urbanist font-black text-sm text-white" style={{ background: '#A8228A' }}>{c.n}</div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-urbanist font-bold text-base mb-2" style={{ color: '#06103C' }}>{c.t}</h4>
                    <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. EXPLORE OUR EXPERTISE — 4 dark cards */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Explore Our Expertise</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12">Utility-grade substation design services, including electrical engineering, protection &amp; control, SCADA, and power system studies.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { t: 'EE — Electrical Engineering & Power System Studies', img: 'expertise-ee.png', fb: 'Electrical+Engineering+-+Power+System+Studies-1920w.png',
                  list: ['Power system studies for substations, including load flow, short-circuit, grounding, and arc-flash analysis', 'Equipment rating verification and electrical system sizing aligned with utility requirements', 'Primary and auxiliary substation electrical design for MV, HV, and EHV systems', 'Interconnection and grid compliance studies supporting utility and ISO/RTO submissions'] },
                { t: 'P&C — Protection, Control & Automation', img: 'expertise-pc.png', fb: 'Protection-+Control+-+Automation-1920w.png',
                  list: ['Substation protection philosophies and coordination studies', 'Relay selection, configuration, and settings aligned with utility standards', 'IEC 61850 substation automation architectures', 'Protection system testing and commissioning support', 'Fault analysis, event recording, and disturbance monitoring'] },
                { t: 'SCADA — Substation Automation & IT Systems', img: 'expertise-scada.png', fb: 'SCADA-+Substation+Automation+-+IT+Systems-1920w.png',
                  list: ['SCADA architecture design and RTU / IED integration', 'Utility control center interfaces with EMS/DMS integration', 'Substation LAN / WAN network design', 'NERC CIP-aware system design for secure operations'] },
                { t: 'TEL — Communications & Network Engineering', img: 'expertise-tel.png', fb: 'Communications+-+Network+Engineering-1920w.png',
                  list: ['Substation fiber-optic and Ethernet communication networks', 'Redundant communication paths for operational reliability', 'Secure network segmentation and traffic separation', 'Renewable facility communications for solar, wind, and BESS projects'] },
              ].map((c, i) => (
                <div key={i} className="rounded-2xl overflow-hidden" style={{ background: '#06103C' }}>
                  <Img src={`/images/services/substation-design/${c.img}`} fallback={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${c.fb}`} alt={c.t} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="font-urbanist font-bold text-lg mb-4 text-white border-l-4 pl-3" style={{ borderColor: '#8aa9ff' }}>{c.t}</h3>
                    <ul className="space-y-2 font-jost text-sm text-white/85">
                      {c.list.map((l, j) => (<li key={j} className="flex gap-2"><span className="text-white/50">▹</span>{l}</li>))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

     

        {/* 10. TYPES OF SUBSTATIONS — 9 cards */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Types of Substations We Design</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12">Utility-grade substation design services, including electrical, protection, and automation engineering across all voltage levels and applications.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { t: 'Transmission Substations (69 kV – 500 kV)', d: 'High-voltage transmission substation designs engineered for bulk power transfer, N-1 reliability, and grid stability.', img: 'type-transmission.png', fb: 'Transmission+Substation.jpg-1920w.png' },
                { t: 'Distribution Substations (4 kV – 35 kV)', d: 'Medium-voltage distribution substation designs supporting utility and municipal distribution systems.', img: 'type-distribution.png', fb: 'Distribution+Substations.jpg-1920w.png' },
                { t: 'Solar & Wind Collector Substations', d: 'Optimized collector substation electrical and protection designs for inverter-based renewable resources.', img: 'type-solar-wind.png', fb: 'Solar+-+Wind+Collector+Substations.jpg-1920w.png' },
                { t: 'BESS Interconnections', d: 'Substation designs supporting battery energy storage system interconnections and fast-response operation.', img: 'type-bess.png', fb: 'BESS+Interconnections.jpg-1920w.png' },
                { t: 'Industrial & Commercial Substations', d: 'Reliable substation designs serving data centers, manufacturing plants, and campus-style loads.', img: 'type-industrial.png', fb: 'Industrial+-+Commercial+Substations.jpg-1920w.png' },
                { t: 'GIS & AIS Substations', d: 'Compact GIS designs and traditional AIS substations engineered for operational flexibility and footprint constraints.', img: 'type-gis-ais.png', fb: 'GIS+-+AIS+Substations.jpg-1920w.png' },
                { t: 'Urban Compact & Space-Constrained Substations', d: 'Electrically optimized urban substation designs developed for dense environments and restricted footprints.', img: 'type-urban.png', fb: 'Urban+Compact+-+Space-Constrained+Substations.jpg-1920w.png' },
                { t: 'Brownfield Upgrades & Retrofit Projects', d: 'Substation modernization and retrofit designs supporting equipment replacement and protection upgrades.', img: 'type-brownfield.png', fb: 'Brownfield+Upgrades+-+Retrofit+Projects.jpg-1920w.png' },
                { t: 'Mobile & Temporary Substations', d: 'Rapid-deployment mobile and temporary substation solutions supporting emergency response and restoration.', img: 'type-mobile.png', fb: 'Mobile+-+Temporary+Substations.jpg-1920w.png' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition-all" style={{ borderColor: '#E6E8F0' }}>
                  <div className="aspect-video overflow-hidden"><Img src={`/images/services/substation-design/${c.img}`} fallback={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${c.fb}`} alt={c.t} className="w-full h-full object-cover" /></div>
                  <div className="p-5">
                    <h4 className="font-urbanist font-bold text-base mb-2" style={{ color: '#06103C' }}>{c.t}</h4>
                    <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. DESIGN PROCESS — 8 steps */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Substation Design Process</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12">A clear, step-by-step substation design and engineering workflow aligned with utility standards, constructability, and long-term operational reliability.</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {[
                { t: 'Requirements & Project Definition', d: 'Evaluation of load growth, voltage class, utility design standards, and protection philosophy.', img: 'step-01.png', fb: 'Requirements+-+Project+Definition-1920w.png' },
                { t: 'Site Analysis & Feasibility', d: 'Geotechnical review, grounding constraints, access planning, EMF considerations.', img: 'step-02.png', fb: 'Site+Analysis+-+Feasibility-1920w.png' },
                { t: 'Conceptual Design', d: 'Preliminary substation layouts, bus configurations, telecom architecture, and early-stage modeling.', img: 'step-03.png', fb: 'Conceptual+Design-1920w.png' },
                { t: 'Detailed Engineering', d: 'Integrated electrical engineering, civil/structural design, grounding, and P&C coordination.', img: 'step-04.png', fb: 'Detailed+Engineering-1920w.png' },
                { t: 'Calculations & IFC Drawings', d: 'Construction-ready calculations, power system studies, IFC drawings, bills of material.', img: 'step-05.png', fb: 'Calculations-+Drawings+-+BOM+Package-1920w.png' },
                { t: 'QA / QC Peer Review', d: 'Independent reviews, compliance verification, and cross-discipline validation.', img: 'step-06.png', fb: 'QA_QC+Peer+Review-1920w.png' },
                { t: 'IFC Submission & Permitting', d: 'Formal utility submissions, authority coordination, comment resolution, and final approvals.', img: 'step-07.png', fb: 'IFC+Submission+-+Permitting-1920w.png' },
                { t: 'Construction & Commissioning Support', d: 'Engineering support for RFIs, relay testing, commissioning, and energization coordination.', img: 'step-08.png', fb: 'Construction+-+Commissioning+Support-1920w.png' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border" style={{ borderColor: '#E6E8F0' }}>
                  <div className="h-36 overflow-hidden"><Img src={`/images/services/substation-design/${s.img}`} fallback={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${s.fb}`} alt={s.t} className="w-full h-full object-cover" /></div>
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#A8228A' }}>STEP 0{i + 1}</p>
                    <h4 className="font-urbanist font-bold text-sm mb-1" style={{ color: '#06103C' }}>{s.t}</h4>
                    <p className="font-jost text-gray-500 text-xs leading-relaxed">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. WHY CHOOSE US (substation) — dark, 6 cards */}
        <section className="py-20" style={{ background: '#06103C' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3 text-white" style={{ fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Why Choose Us for Substation Design?</h2>
            <p className="font-jost text-white/80 max-w-3xl mb-12">Our engineering approach combines deep technical knowledge, regulatory alignment, and constructible delivery — ensuring safer operations and predictable construction outcomes.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { t: 'Proven Engineering Expertise', d: 'Delivered substation projects across utilities, voltage classes, and ISO/RTO regions with consistent, repeatable results.', img: 'why-proven.png', fb: 'Proven+Engineering+Expertise.png-1920w.png' },
                { t: 'Utility-Accepted Standards', d: 'Deliverables aligned to utility templates and compliance requirements to reduce review cycles.', img: 'why-standards.png', fb: 'Utility-Accepted+Standards.png-1920w.png' },
                { t: 'Faster, More Accurate Delivery', d: 'Digital workflows and model-based coordination reduce errors and shorten schedules.', img: 'why-faster.png', fb: 'Faster-+More+Accurate+Delivery.png-1920w.png' },
                { t: 'Deep Renewable & IBR Expertise', d: 'IBR modeling, EMT studies, and inverter-specific protection strategies embedded in our designs.', img: 'why-ibr.png', fb: 'Deep+Renewable+-+IBR+Expertise-1920w.png' },
                { t: 'Fewer Change Orders', d: 'Constructible packages and pre-construction reviews minimize rework and delays.', img: 'why-fewer-orders.png', fb: 'Fewer+Change+Orders.png-1920w.png' },
                { t: 'Nationwide Support', d: 'Licensed engineers across ERCOT, PJM, CAISO, MISO, NYISO, SPP, and municipal utilities.', img: 'why-nationwide.png', fb: 'Nationwide+Support.png-1920w.png' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 flex flex-col gap-3">
                  <div className="h-44 flex items-center"><Img src={`/images/services/substation-design/${c.img}`} fallback={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${c.fb}`} alt={c.t} className="w-full h-full object-contain" /></div>
                  <h3 className="font-urbanist font-bold text-sm" style={{ color: '#06103C' }}>{c.t}</h3>
                  <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 13. INDUSTRIES WE SERVE — 6 cards */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Industries We Serve</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-12">We partner with stakeholders across the power sector and critical infrastructure to deliver substation designs aligned with regulatory, operational, and commercial objectives.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { t: 'Utilities & Municipalities', d: 'Transmission and distribution substations designed to meet utility standards, reliability targets, and long-term asset plans.', img: 'ind-utilities.png', fb: 'Utilities+-+Municipalities-1920w.png' },
                { t: 'Independent Power Producers (IPP)', d: 'Project-ready substation designs aligned with PPA terms, interconnection milestones, and financing requirements.', img: 'ind-ipp.png', fb: 'Independent+Power+Producers+%28IPP%29-1920w.png' },
                { t: 'Renewable Developers (Solar, Wind, BESS)', d: 'Collector and POI substation designs tailored to inverter-based resources and grid-code compliance.', img: 'ind-renewable.png', fb: 'Renewable+Developers+%28Solar-+Wind-+BESS%29-1920w.png' },
                { t: 'EPC Contractors', d: 'Constructible, clearly scoped engineering packages that reduce change orders and align with EPC schedules.', img: 'ind-epc.png', fb: 'EPC+Contractors-1920w.png' },
                { t: 'Industrial Facilities', d: 'Dedicated substations for refineries, manufacturing plants, mining, steel, and other energy-intensive operations.', img: 'ind-industrial.png', fb: 'Industrial+-+Commercial+Substations.jpg-1920w.png' },
                { t: 'Data Centers & Campuses', d: 'High-availability substation designs for campus-style loads, Tier-certified data centers, and mission-critical facilities.', img: 'ind-datacenter.png', fb: 'Industrial+Facilities-1920w.png' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition-all" style={{ borderColor: '#E6E8F0' }}>
                  <div className="h-44 overflow-hidden"><Img src={`/images/services/substation-design/${c.img}`} fallback={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${c.fb}`} alt={c.t} className="w-full h-full object-cover" /></div>
                  <div className="p-5">
                    <h4 className="font-urbanist font-bold text-base mb-2" style={{ color: '#06103C' }}>{c.t}</h4>
                    <p className="font-jost text-gray-500 text-sm leading-relaxed">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 14. CASE STUDIES — 8 cards w/ modal */}
        <SubstationCaseStudies />

        {/* 15. RENEWABLE SUBSTATIONS */}
        <section className="py-20" style={{ background: '#06103C' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3 text-white" style={{ fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Substation Design for Renewable Projects</h2>
            <p className="font-jost text-white/80 max-w-3xl mb-10">We deliver high-performance renewable substation engineering built for fast-changing inverter technologies, variable generation, and modern grid requirements.</p>
            <div className="space-y-3">
              {[
                ['Solar Collector Systems', 'Substation layouts, grounding, power flow, and protection tailored for high-density solar arrays.'],
                ['Wind Collector Substations', 'Engineered to handle variable wind generation, changing dispatch, and remote collection circuits.'],
                ['BESS + HV Integration', 'Full-scope substation design for hybrid resources, standalone batteries, and high-speed response systems.'],
                ['Inverter–Transformer Coordination', 'Correct matching of inverter output, transformer MVA, impedance, and protection for reliable performance.'],
                ['IBR Ride-Through Requirements', 'Design aligned with PRC, MOD, and evolving IBR interconnection and grid-support requirements.'],
                ['Harmonics & Flicker Mitigation', 'Analysis and design that ensure stable power quality on weak and constrained grids.'],
                ['Low-Short-Circuit Grid Support', 'Fault-level support strategies for weak-grid renewables, including advanced IBR behavior modeling.'],
              ].map(([t, d], i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4 flex gap-4">
                  <div className="flex-1">
                    <h4 className="font-urbanist font-bold text-white mb-1">{t}</h4>
                    <p className="font-jost text-white/70 text-sm">{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-jost text-white/70 text-sm mt-8 max-w-3xl">Our renewable-focused substation engineering aligns with the latest inverter-based resource standards, modeling practices, and NERC Level 3 IBR compliance expectations.</p>
          </div>
        </section>

        {/* 16. FREQUENTLY INCLUDED STUDIES */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Frequently Included Studies</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-10">Most substation and grid-interconnection projects require a core set of power system studies.</p>
            <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: '#E6E8F0' }}>
              <table className="w-full text-sm font-jost">
                <thead>
                  <tr style={{ background: '#06103C' }}>
                    <th className="text-white text-left p-4 text-xs uppercase tracking-widest">Study</th>
                    <th className="text-white text-left p-4 text-xs uppercase tracking-widest">Purpose</th>
                    <th className="text-white text-left p-4 text-xs uppercase tracking-widest">Required For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['LF', 'Load Flow', 'Validate system capacity and identify thermal or voltage constraints.', 'Utilities, developers, and large-load customers.'],
                    ['SC', 'Short Circuit', 'Confirm breaker duties and protection coordination.', 'All substations and major equipment additions.'],
                    ['AF', 'Arc-Flash', 'Quantify incident energy and define safe working boundaries.', 'OSHA, NFPA 70E, and utility safety programs.'],
                    ['GR', 'Grounding', 'Verify touch and step voltages and grid performance.', 'IEEE 80 and utility requirements.'],
                    ['HM', 'Harmonics', 'Assess harmonic distortion from inverter-based resources.', 'Solar, wind, BESS, and IBR-heavy projects.'],
                    ['IC', 'Insulation Coordination', 'Select BIL levels and surge protection.', 'High-voltage and transmission-class substations.'],
                  ].map(([badge, name, purpose, req], i) => (
                    <tr key={i} className="border-t" style={{ borderColor: '#E6E8F0' }}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs border" style={{ borderColor: '#E6E8F0', color: '#06103C' }}>{badge}</div>
                          <span className="font-bold" style={{ color: '#06103C' }}>{name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{purpose}</td>
                      <td className="p-4 text-gray-600">{req}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 17. CLIENT LOGOS (shared with power-system-studies) */}
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

        {/* 18. FINAL FLYER CTA */}
        <section className="py-16" style={{ background: '#F7F8FC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-urbanist font-black text-xl mb-2" style={{ color: '#06103C' }}>Download our Substation Design Services flyer</p>
              <p className="font-jost text-gray-600 text-sm">Please click the Download button to get our Substation Design Services flyer.</p>
            </div>
            <a href="/files/substation-design.pdf" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Download The Flyer</a>
          </div>
        </section>

        {/* 19. WE GO ABOVE AND BEYOND */}
        <section className="relative py-20 overflow-hidden">
          <Img src="/images/services/power-system-studies/study-2.jpg" fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/pexels-photo-171428-1920w.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/85" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-urbanist font-black mb-4" style={{ color: '#000', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>We Go Above and Beyond</h2>
            <p className="font-jost text-gray-700 mb-3">We stay current on the latest utility and smart grid standards. Our engineers design substations that are built for future expansion, automation, and integration with digital relays, smart SCADA, and real-time monitoring systems.</p>
            <p className="font-jost text-gray-700 mb-3">We don&apos;t just meet specs — we shape systems that align with your long-term grid strategy.</p>
            <p className="font-jost text-gray-700 mb-8">For more information or service assistance, call us on <a href="tel:813-389-7871" className="underline font-semibold">813-389-7871</a>.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Book Strategy Call</Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold border-2" style={{ borderColor: '#06103C', color: '#06103C' }}>Get a Quote</Link>
            </div>
          </div>
        </section>

        {/* 20. FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black mb-10" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="border rounded-xl overflow-hidden" style={{ borderColor: '#E6E8F0' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center gap-4 p-5 text-left">
                    <span className="font-urbanist font-bold text-sm" style={{ color: '#06103C' }}>{f.q}</span>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-xs" style={{ borderColor: '#E6E8F0', transform: openFaq === i ? 'rotate(180deg)' : 'none' }}>▾</span>
                  </button>
                  {openFaq === i && <div className="px-5 pb-5 font-jost text-sm text-gray-600 leading-relaxed">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 21. BLOG SECTION — matches power-system-studies card style */}
        {blogs.length > 0 && (
          <section className="py-24" style={{ background: '#F7F8FC' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Technical Reading</span>
                  <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#06103C' }}>Substation Design – Blogs</h2>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-2 font-jost font-semibold text-sm" style={{ color: '#A8228A' }}>
                  View All Articles
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
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

function SubstationCaseStudies() {
  const [active, setActive] = useState<number | null>(null)
  const data = [
    { title: '110 kV Outdoor Grid Substation – Rural Electrification', subtitle: 'Reliable high-voltage infrastructure designed for extreme environmental conditions and remote grid expansion.', scope: 'Designed to support long-distance rural electrification across high-temperature, high-wind, and dust-prone environments with minimal maintenance dependency.', focus: ['Double-bus with transfer bus configuration', 'Grounding optimized for high soil resistivity', 'Protection coordination for long feeders', 'Utility-grade reliability compliance'], stack: 'PSS®E • ETAP • PSCAD • SKM', outcome: 'Stable power distribution achieved across remote agricultural and industrial zones with improved grid resilience.', img: 'case-01.png', fb: '110+kV+outdoor+grid+substation+to+support+rural+electrification-1920w.png' },
    { title: 'Upgrade of Aging Indoor Substation – Smart City Infrastructure', subtitle: 'Modernization of legacy electrical infrastructure to support smart city load expansion.', scope: 'Retrofit of an aging indoor substation to improve capacity, reliability, and digital monitoring without full system shutdown.', focus: ['Equipment replacement with modern relays', 'Load capacity expansion', 'SCADA-ready automation', 'Phased upgrade with zero critical downtime'], stack: 'ETAP • SKM • DIgSILENT PowerFactory', outcome: 'Improved operational efficiency and future-ready substation performance for smart city integration.', img: 'case-02.png', fb: 'Indoor+Substation+Retrofit-1920w.png' },
    { title: 'GIS-Based Urban Substation – Space-Constrained Deployment', subtitle: 'Compact high-voltage GIS substation designed for dense urban environments.', scope: 'Delivered a fully enclosed gas-insulated substation solution optimized for metropolitan deployment.', focus: ['GIS switchgear layout optimization', 'High insulation performance design', 'EMI reduction', 'Urban safety clearance compliance'], stack: 'PSCAD • ETAP • CDEGS', outcome: 'High-capacity power delivery in minimal footprint with enhanced safety and reliability.', img: 'case-03.png', fb: 'GIS+Based+Urban+Substation-1920w.png' },
    { title: '230 kV Renewable POI Collector Substation', subtitle: 'Utility-scale renewable interconnection hub for stable grid integration.', scope: 'Designed a Point of Interconnection substation for renewable energy evacuation into the transmission network.', focus: ['Grid synchronization', 'Voltage stability under fluctuating input', 'Reactive power management', 'Utility interconnection compliance'], stack: 'PSS®E • PSCAD • PowerWorld', outcome: 'Reliable and compliant integration of renewable energy into the regional transmission grid.', img: 'case-04.png', fb: '230+kv+POI+renewable+collector+substation-1920w.png' },
    { title: 'Battery Energy Storage System (BESS) Substation – 138 kV', subtitle: 'Grid stabilization infrastructure enabling fast-response energy storage.', scope: 'Engineered a BESS interconnection substation for peak shaving, load balancing, and grid support services.', focus: ['Fast response power injection', 'Frequency regulation support', 'Bidirectional power flow protection', 'Energy dispatch coordination'], stack: 'ETAP • PSCAD • DIgSILENT', outcome: 'Enhanced grid stability and peak load management through scalable storage integration.', img: 'case-05.png', fb: 'Battery+Energy+Storage+System+%28BESS%29+Substation+-+Grid+Support+Asset+%28138+kV%29-1920w.png' },
    { title: 'Renewable Energy Collector Substation – Solar PV (345/34.5 kV)', subtitle: 'Large-scale solar aggregation system for high-voltage transmission integration.', scope: 'Developed collector infrastructure to aggregate distributed solar PV generation into a centralized transmission interface.', focus: ['Step-up transformer configuration', 'Fault current handling', 'Voltage regulation under intermittent generation', 'Grid export optimization'], stack: 'PSS®E • ETAP • SKM', outcome: 'Efficient solar power evacuation with improved transmission stability and reduced losses.', img: 'case-06.png', fb: 'Image+Renewable+Energy+Collector+Substation+-+Solar+PV+%28345+kV+34.5+kV%29-1920w.png' },
    { title: 'Medium-Voltage Distribution Substation – Urban Load Growth (115/35 kV)', subtitle: 'Urban distribution infrastructure designed to manage rapid load expansion.', scope: 'Strengthened medium-voltage distribution capacity to support residential and commercial expansion.', focus: ['Load forecasting-based design', 'Voltage drop optimization', 'Distribution reliability improvement', 'Protection coordination enhancement'], stack: 'ETAP • SKM • PowerFactory', outcome: 'Stable voltage delivery and improved distribution efficiency across high-growth urban zones.', img: 'case-07.png', fb: 'Image+for+Medium-Voltage+Distribution+Substation+-+Urban+Load+Growth+%2815+kV+35+kV%29-1920w.png' },
    { title: '230 kV High-Voltage Transmission Substation – Greenfield Project', subtitle: 'Greenfield transmission infrastructure enabling long-distance bulk power transfer.', scope: 'Designed a new transmission-level substation for regional grid strengthening and future scalability.', focus: ['High-voltage switching configuration', 'Transmission stability analysis', 'Grid expansion readiness', 'Fault level management'], stack: 'PSS®E • PSCAD • ETAP', outcome: 'Reliable long-distance power transmission with scalable infrastructure for future demand growth.', img: 'case-08.png', fb: 'Image+-High-Voltage+Transmission+Substation+-+Greenfield+Utility+Project+%28230+kV%29-1920w.png' },
  ]
  return (
    <section className="py-20" style={{ background: '#06103C' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-urbanist font-black text-center mb-3 text-white" style={{ fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Substation Engineering Case Studies</h2>
        <p className="font-jost text-white/70 text-center max-w-3xl mx-auto mb-12">Real-world substation engineering delivered across rural electrification, smart cities, renewable energy, and space-constrained urban environments.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {data.map((d, i) => (
            <button key={i} onClick={() => setActive(i)} className="rounded-xl overflow-hidden hover:scale-105 transition-transform">
              <Img src={`/images/services/substation-design/${d.img}`} fallback={`https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/${d.fb}`} alt={d.title} className="w-full h-82 object-cover" />
            </button>
          ))}
        </div>
      </div>
      {active !== null && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 pt-10 overflow-y-auto" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setActive(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full relative mb-10" onClick={e => e.stopPropagation()}>
            <button onClick={() => setActive(null)} className="absolute top-4 right-4 text-2xl" style={{ color: '#8c1c1c' }}>×</button>
            <h3 className="font-urbanist font-black text-xl mb-2" style={{ color: '#06103C' }}>{data[active].title}</h3>
            <p className="font-jost text-sm text-gray-500 italic mb-6 pb-4 border-b">{data[active].subtitle}</p>
            <div className="mb-4 pb-4 border-b">
              <h4 className="font-urbanist font-bold text-xs uppercase mb-2 border-l-4 pl-2" style={{ color: '#06103C', borderColor: '#8c1c1c' }}>Engineering Scope</h4>
              <p className="font-jost text-sm text-gray-600">{data[active].scope}</p>
            </div>
            <div className="mb-4 pb-4 border-b">
              <h4 className="font-urbanist font-bold text-xs uppercase mb-2 border-l-4 pl-2" style={{ color: '#06103C', borderColor: '#8c1c1c' }}>Technical Focus</h4>
              <ul className="font-jost text-sm text-gray-600 space-y-1">{data[active].focus.map((f, j) => <li key={j}>▸ {f}</li>)}</ul>
            </div>
            <div className="mb-4 pb-4 border-b">
              <h4 className="font-urbanist font-bold text-xs uppercase mb-2 border-l-4 pl-2" style={{ color: '#06103C', borderColor: '#8c1c1c' }}>Engineering Stack</h4>
              <p className="font-jost text-sm font-bold" style={{ color: '#06103C' }}>{data[active].stack}</p>
            </div>
            <div>
              <h4 className="font-urbanist font-bold text-xs uppercase mb-2 border-l-4 pl-2" style={{ color: '#06103C', borderColor: '#8c1c1c' }}>Outcome</h4>
              <p className="font-jost text-sm text-gray-600">{data[active].outcome}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
