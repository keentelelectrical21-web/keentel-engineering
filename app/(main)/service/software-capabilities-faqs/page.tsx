'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
import SoftwareTools from '@/components/sections/SoftwareTools'
import Industries from '@/components/sections/Industries'
import WhoWeServed from '@/components/service/WhoWeServed'
import RelatedServiceBlogs from '@/components/service/RelatedServiceBlogs'
import ServiceCaseStudies from '@/components/service/ServiceCaseStudies'

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
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '400px' : '0px' }}>
        <p className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[52px] sm:pl-[72px] text-sm sm:text-base font-jost leading-relaxed" style={{ color: '#4B5563' }}>{a}</p>
      </div>
    </div>
  )
}

interface Tool {
  key: string
  name: string
  logo: string
  fallback: string
  description: string
  usedIn: { label: string; href: string }[]
  faqs: { q: string; a: string }[]
}

const tools: Tool[] = [
  {
    key: 'psse',
    name: 'PSS®E',
    logo: '/images/services/power-system-studies/logo-psse.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/PSSE-1920w.png',
    description: 'Power System Simulator for Engineering by Siemens — our primary platform for transmission planning, contingency analysis, and stability simulations.',
    usedIn: [
      { label: 'Power System Studies', href: '/service/power-system-studies' },
      { label: 'Substation Design', href: '/service/substation-design' },
      { label: 'Utility-Scale Renewable Energy', href: '/service/utility-scale-renewable-energy' },
    ],
    faqs: [
      { q: 'What is PSS®E used for?', a: 'PSS®E is a power system simulation tool used for transmission planning, load flow, contingency (N-1/N-2) analysis, short-circuit studies, and dynamic stability simulations across large interconnected grids.' },
      { q: 'Why does Keentel use PSS®E for interconnection studies?', a: 'PSS®E is the industry-standard platform accepted by most ISOs and RTOs for interconnection studies, which means our results are directly usable in utility and ISO review processes without reformatting.' },
      { q: 'Can PSS®E model inverter-based resources (IBR)?', a: 'Yes. We build detailed IBR dynamic models in PSS®E to evaluate stability, ride-through performance, and grid code compliance for solar, wind, and BESS interconnections.' },
      { q: 'What is the difference between PSS®E steady-state and dynamic studies?', a: 'Steady-state studies (load flow, short-circuit) evaluate the grid at a fixed operating point. Dynamic studies simulate how the system behaves over time following a disturbance, such as a fault or generator trip.' },
      { q: 'Does PSS®E support renewable energy grid-code compliance testing?', a: 'Yes, we use PSS®E to validate compliance with IEEE 2800, NERC PRC-024, and PRC-029 ride-through requirements for inverter-based generation.' },
      { q: 'How accurate are PSS®E models compared to real grid behavior?', a: 'Accuracy depends on the quality of input data and model calibration. We validate our PSS®E models against utility base cases and equipment datasheets to keep results defensible for utility review.' },
    ],
  },
  {
    key: 'etap',
    name: 'ETAP',
    logo: '/images/services/power-system-studies/logo-etap.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ETAP-1920w.png',
    description: 'Electrical power system engineering platform used for design, simulation, arc-flash analysis, and protection coordination.',
    usedIn: [
      { label: 'Power System Studies', href: '/service/power-system-studies' },
      { label: 'Substation Design', href: '/service/substation-design' },
      { label: 'Utility-Scale Renewable Energy', href: '/service/utility-scale-renewable-energy' },
    ],
    faqs: [
      { q: 'What studies does ETAP support?', a: 'ETAP handles power flow, short-circuit, arc-flash, protection coordination, harmonics, motor starting, and cable sizing studies within a single integrated model.' },
      { q: 'What is an arc-flash study and why is it required?', a: 'An arc-flash study calculates incident energy at electrical equipment to determine safe working distances and required PPE, satisfying NFPA 70E and OSHA requirements.' },
      { q: 'Can ETAP model a Digital Twin of an electrical system?', a: 'Yes, ETAP\u2019s Electrical Digital Twin links live SCADA data to the simulation model, giving real-time visibility into system loading, protection status, and available fault current.' },
      { q: 'How does ETAP support protection coordination?', a: 'ETAP\u2019s Star protective device coordination module lets us plot time-current curves for relays, fuses, and breakers to confirm selective coordination across the system.' },
      { q: 'Is ETAP suitable for both AC and DC systems?', a: 'Yes, ETAP supports both AC power system analysis and DC system studies, including battery sizing and DC arc-flash for BESS applications.' },
    ],
  },
  {
    key: 'pscad',
    name: 'PSCAD',
    logo: '/images/services/power-system-studies/logo-pscad.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Logo+-+PSCAD+MHI+BLUE-+2018-1920w.png',
    description: 'Electromagnetic transient (EMT) simulation software used for HVDC, converter modeling, and lightning/switching surge analysis.',
    usedIn: [
      { label: 'Power System Studies', href: '/service/power-system-studies' },
      { label: 'Substation Design', href: '/service/substation-design' },
      { label: 'Transmission Line Design', href: '/service/transmission-line-design' },
    ],
    faqs: [
      { q: 'What is EMT simulation and when is it needed?', a: 'Electromagnetic transient (EMT) simulation models microsecond-to-millisecond events such as switching surges, lightning strikes, and converter control interactions — detail that RMS tools like PSS®E cannot capture.' },
      { q: 'Why is PSCAD used for HVDC projects?', a: 'PSCAD is the industry standard for modeling HVDC converter stations, control system interactions, and commutation behavior under fault conditions.' },
      { q: 'Does PSCAD support inverter-based resource studies?', a: 'Yes, we use PSCAD to evaluate weak-grid stability, subsynchronous oscillation risk, and detailed inverter control interactions for solar, wind, and BESS projects.' },
      { q: 'What is a lightning surge study?', a: 'A lightning surge study evaluates overvoltage stress on transmission lines and substation equipment from direct or induced lightning strikes, informing insulation coordination and shielding design.' },
    ],
  },
  {
    key: 'powerworld',
    name: 'PowerWorld',
    logo: '/images/services/power-system-studies/logo-powerworld.jpg',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/PowerWorld-1920w.jpg',
    description: 'Power system visualization and simulation software used for interactive one-line diagrams, contingency analysis, and voltage stability review.',
    usedIn: [
      { label: 'Power System Studies', href: '/service/power-system-studies' },
      { label: 'Substation Design', href: '/service/substation-design' },
    ],
    faqs: [
      { q: 'What makes PowerWorld different from other power flow tools?', a: 'PowerWorld\u2019s animated, color-coded one-line diagrams make it easy to visualize loading, voltage, and contingency results, which helps when walking clients and utility reviewers through study findings.' },
      { q: 'What is Optimal Power Flow (OPF) and how is it used?', a: 'OPF determines the most economical generation dispatch while respecting system constraints like line limits and voltage bounds — useful for evaluating transmission upgrade economics.' },
      { q: 'Can PowerWorld handle contingency analysis for large systems?', a: 'Yes, PowerWorld efficiently screens thousands of N-1 and N-2 contingencies across large interconnected systems, flagging thermal and voltage violations for further review.' },
    ],
  },
  {
    key: 'skm',
    name: 'SKM PTW',
    logo: '/images/services/power-system-studies/logo-skm.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/SKM+PowerTools-1920w.png',
    description: 'Electrical engineering platform for power system design, analysis, and safety evaluation, including arc-flash and harmonics.',
    usedIn: [
      { label: 'Power System Studies', href: '/service/power-system-studies' },
      { label: 'Substation Design', href: '/service/substation-design' },
    ],
    faqs: [
      { q: 'What is CAPTOR used for in SKM?', a: 'CAPTOR is SKM\u2019s arc-flash analysis module, used to calculate incident energy and generate NFPA 70E-compliant arc-flash labels for electrical equipment.' },
      { q: 'What is HI_WAVE in SKM PTW?', a: 'HI_WAVE is SKM\u2019s harmonics analysis module, used to evaluate voltage and current distortion from nonlinear loads such as VFDs, inverters, and rectifiers.' },
      { q: 'Does SKM support protection coordination studies?', a: 'Yes, SKM\u2019s coordination module plots time-current curves for relays, fuses, and breakers to verify selective protection coordination across the system.' },
    ],
  },
  {
    key: 'autocad',
    name: 'AutoCAD Elec.',
    logo: '/images/services/power-system-studies/logo-autocad.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/aeimages-1920w.png',
    description: 'Intelligent automation for electrical schematics — wire numbering, tagging, error checking, and automatic bill-of-materials generation.',
    usedIn: [
      { label: 'Power System Studies', href: '/service/power-system-studies' },
      { label: 'Substation Design', href: '/service/substation-design' },
    ],
    faqs: [
      { q: 'What drawings does AutoCAD Electrical produce?', a: 'Relay protection schematics, AC/DC substation control diagrams, panel layouts, and construction-ready wiring diagrams with automatic wire numbering and cross-referencing.' },
      { q: 'How does AutoCAD Electrical reduce drafting errors?', a: 'Its automated error-checking flags duplicate wire numbers, missing components, and unconnected terminals before drawings are issued for construction.' },
      { q: 'Does it support IEC and ANSI symbol standards?', a: 'Yes, AutoCAD Electrical includes both IEC and ANSI/IEEE symbol libraries, letting us match the drawing standard your utility or region requires.' },
    ],
  },
  {
    key: 'aspen',
    name: 'ASPEN',
    logo: '/images/services/power-system-studies/logo-aspen.png',
    fallback: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/6a12ed_77c665e4ee2c4db2b3fbb92a34f3b12e-mv2-1920w.png',
    description: 'Advanced short-circuit analysis and relay coordination platform used for protection engineering.',
    usedIn: [
      { label: 'Power System Studies', href: '/service/power-system-studies' },
      { label: 'Substation Design', href: '/service/substation-design' },
    ],
    faqs: [
      { q: 'Why use ASPEN OneLiner for relay coordination?', a: 'ASPEN lets us build manufacturer-specific relay logic models (SEL, GE, ABB, Siemens) to verify coordination against the actual protective devices being installed, not generic curves.' },
      { q: 'What is phase-domain modeling in ASPEN?', a: 'Phase-domain modeling represents each phase independently rather than using symmetrical components, giving more accurate results for unbalanced fault and mutual coupling scenarios.' },
      { q: 'Does ASPEN support breaker rating verification?', a: 'Yes, the breaker rating module compares calculated fault duties against breaker interrupting ratings to confirm equipment is adequately rated across the system.' },
    ],
  },
  {
    key: 'digsilent',
    name: 'DIgSILENT',
    logo: '/images/services/utility-scale-renewable-energy/logo-digsilent.png',
    fallback: '/images/services/utility-scale-renewable-energy/logo-digsilent.png',
    description: 'PowerFactory grid simulation platform used for renewable integration studies, dynamic modeling, and grid-code compliance validation.',
    usedIn: [
      { label: 'Utility-Scale Renewable Energy', href: '/service/utility-scale-renewable-energy' },
      { label: 'Owner\u2019s Engineer', href: '/service/owners-engineer' },
    ],
    faqs: [
      { q: 'What is DIgSILENT PowerFactory used for?', a: 'PowerFactory is used for grid simulation, dynamic stability analysis, and grid-code compliance validation, particularly for renewable and inverter-based resource projects.' },
      { q: 'Does DIgSILENT support IEEE 2800 compliance testing?', a: 'Yes, we use PowerFactory to validate ride-through performance, reactive power capability, and frequency response against IEEE 2800 and utility-specific interconnection requirements.' },
      { q: 'Can DIgSILENT model grid-forming inverter controls?', a: 'Yes, PowerFactory supports detailed grid-forming and grid-following inverter control models, which we use to validate BESS performance ahead of commissioning tests.' },
    ],
  },
  {
    key: 'pslf',
    name: 'PSLF',
    logo: '',
    fallback: '',
    description: 'GE\u2019s Positive Sequence Load Flow platform used for large-scale stability analysis, primarily in WECC and other western interconnection studies.',
    usedIn: [
      { label: 'Utility-Scale Renewable Energy', href: '/service/utility-scale-renewable-energy' },
    ],
    faqs: [
      { q: 'When does Keentel use PSLF instead of PSS®E?', a: 'PSLF is required for interconnection studies submitted to WECC and several western utilities that standardize on GE\u2019s modeling platform rather than PSS®E.' },
      { q: 'What types of studies run in PSLF?', a: 'Dynamic stability analysis, transient response to disturbances, and large-scale interconnected system studies across the western interconnection.' },
    ],
  },
]

export default function SoftwareCapabilitiesFaqsPage() {
  const [activeTool, setActiveTool] = useState('psse')
  const current = tools.find(t => t.key === activeTool) || tools[0]

  return (
    <>
      <Header />
      <main>

        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden" style={{ background: '#06103C' }}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              <Link href="/services" className="text-xs font-semibold uppercase tracking-widest font-jost" style={{ color: '#C72E9E' }}>Services</Link>
              <span className="text-white/30">/</span>
              <span className="text-white/50 text-xs font-jost">Software Capabilities FAQs</span>
            </div>
            <h1 className="font-urbanist font-black text-white mb-6 leading-tight max-w-4xl" style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.25rem)' }}>
              Software Capabilities &amp; Engineering Tools FAQs
            </h1>
            <p className="font-jost text-white/90 max-w-3xl leading-relaxed mb-14 sm:mb-16" style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)' }}>
              Answers to the most common questions about the power system simulation and design platforms we use across every Keentel Engineering service — PSS&reg;E, ETAP, PSCAD, PowerWorld, SKM PTW, AutoCAD Electrical, ASPEN, DIgSILENT, and PSLF.
            </p>

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
        </section>
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div>
              <p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#A8228A]">Our Approach</p>
              <h2 className="mb-5 font-urbanist text-3xl font-black text-[#06103C] sm:text-4xl">The Right Engineering Platform for Every Study</h2>
              <p className="font-jost text-base leading-relaxed text-gray-600 sm:text-lg">We select and cross-check industry-standard software based on the required study, system voltage, utility criteria, model fidelity, and compliance objective.</p>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-2xl"><img src="/images/services/service-power-system.jpg" alt="Power system engineering software and analysis" className="h-72 w-full object-cover sm:h-96" /></div>
          </div>
        </section>

        <ContactForm />
        <SoftwareTools />
        <Industries />
        <ServiceCaseStudies service="software-capabilities-faqs" />

        <WhoWeServed />

        {/* ═══ TOOL SELECTOR + CONTENT ═══ */}


        {/* ═══ FINAL CTA ═══ */}
        <section className="py-16 sm:py-20" style={{ background: '#F6F7FB' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-urbanist font-black mb-4" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Don&apos;t See Your Question?</h2>
            <p className="font-jost text-gray-600 mb-8 max-w-xl mx-auto">Our engineers are happy to walk through the specific tools and study types your project needs.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule A Call</Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold border-2 transition-all hover:bg-white" style={{ borderColor: '#06103C', color: '#06103C' }}>Contact Us</Link>
            </div>
          </div>
        </section>

<section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {tools.map(tool => (
                <button
                  key={tool.key}
                  onClick={() => setActiveTool(tool.key)}
                  className="flex flex-col items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all min-w-[110px]"
                  style={{
                    borderColor: activeTool === tool.key ? '#A8228A' : '#E6E8F0',
                    background: activeTool === tool.key ? 'rgba(168,34,138,0.05)' : '#fff',
                    boxShadow: activeTool === tool.key ? '0 4px 18px rgba(168,34,138,0.18)' : 'none',
                  }}
                >
                  {tool.logo ? (
                    <img src={tool.logo} alt={tool.name} className="h-8 max-w-[90px] object-contain" onError={(e) => { if (tool.fallback) (e.target as HTMLImageElement).src = tool.fallback }} />
                  ) : (
                    <span className="h-8 flex items-center font-urbanist font-black text-sm" style={{ color: activeTool === tool.key ? '#A8228A' : '#06103C' }}>{tool.name}</span>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-wide font-jost" style={{ color: activeTool === tool.key ? '#A8228A' : '#999' }}>{tool.name}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <div className="flex items-center gap-4 mb-4">
                  {current.logo && <img src={current.logo} alt={current.name} className="h-10 object-contain" onError={(e) => { if (current.fallback) (e.target as HTMLImageElement).src = current.fallback }} />}
                  <h2 className="font-urbanist font-black text-2xl sm:text-3xl" style={{ color: '#06103C' }}>{current.name}</h2>
                </div>
                <p className="font-jost text-gray-600 leading-relaxed mb-6">{current.description}</p>
                <p className="text-xs font-bold uppercase tracking-widest mb-3 font-jost" style={{ color: '#A8228A' }}>Used In</p>
                <div className="flex flex-col gap-2 mb-8">
                  {current.usedIn.map((u, i) => (
                    <Link key={i} href={u.href} className="inline-flex items-center gap-2 text-sm font-semibold font-jost" style={{ color: '#A8228A' }}>
                      {u.label}
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  ))}
                </div>
                <a href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-jost font-semibold text-white px-7 py-4 rounded-full transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                  Ask Us Directly
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
              <div className="lg:col-span-8 flex flex-col gap-3">
                {current.faqs.map((f, i) => <FaqAccordionItem key={i} q={f.q} a={f.a} index={i} />)}
              </div>
            </div>
          </div>
        </section>
      </main>
      <RelatedServiceBlogs terms={["PSCAD","ETAP","PSS/E"]} />
      <Footer />
    </>
  )
}
