import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
import SoftwareCapabilities from '@/components/sections/SoftwareCapabilities'
import SoftwareTools from '@/components/sections/SoftwareTools'
import ServiceCaseStudies from '@/components/service/ServiceCaseStudies'
import WhoWeServed from '@/components/service/WhoWeServed'
import FAQ from '@/components/sections/FAQ'
import Blog from '@/components/sections/Blog'

export const metadata: Metadata = {
  title: 'Transmission Planning Studies | Grid Reliability | Keentel Engineering',
  description: 'Transmission planning, power flow, contingency, congestion, voltage stability, renewable integration, and grid expansion studies for utilities and developers.',
}

const differentiators = [
  ['30+', 'Years of specialized high-voltage power engineering experience'],
  ['P.E.', 'Certified power-system engineers with deep technical expertise'],
  ['50', 'States supported across utility, industrial, and renewable sectors'],
  ['Advanced', 'Simulation and modeling tools for precise system analysis'],
  ['Defensible', 'Compliance-focused reporting aligned with NERC, FERC, IEEE, and regional criteria'],
]

const importance = [
  { title: 'Inverter-Based Resource Integration', text: 'Solar, wind, and BESS introduce new power-flow patterns, voltage-control requirements, congestion risk, and stability concerns.' },
  { title: 'Surging Transmission Load Demand', text: 'Data centers, hydrogen production, manufacturing, and transportation electrification are accelerating demand for transmission capacity.' },
  { title: 'Proactive Reliability Engineering', text: 'Early constraint identification supports targeted investment, reduces outage exposure, and prevents costly emergency interventions.' },
]

const methodologyBase = [
  { title: 'Data Collection & Model Development', image: '/images/services/power-system-studies/overview-engineers.jpg', text: 'Build a traceable system representation from line parameters, load forecasts, transformer data, generation models, substation configurations, and ISO or utility cases.', points: ['Transmission line parameters', 'Transformer ratings and impedance', 'Load and generation forecasts', 'ISO and utility system models'] },
  { title: 'Base Case Power Flow Analysis', image: '/images/services/power-system-studies/study-load-flow.webp', text: 'Establish the normal operating baseline and determine how real and reactive power move through the network under expected conditions.', points: ['Voltage profile assessment', 'Corridor and transformer loading', 'Reactive-power requirements', 'System-wide phase-angle review'] },
  { title: 'Contingency Analysis', image: '/images/services/power-system-studies/study-transmission-planning.png', text: 'Test the network against single and sequential equipment outages while monitoring thermal, voltage, and stability limits.', points: ['N-1 and N-1-1 events', 'Line and transformer outages', 'Generator and reactive-support loss', 'Bus and substation contingencies'] },
  { title: 'Future Scenario Analysis', image: '/images/industries/renewable-interconnection-engineering/solar-wind-bess.webp', text: 'Evaluate planning horizons against projected demand, generation changes, seasonal cases, large-load additions, and decarbonization pathways.', points: ['Peak and off-peak demand', 'Seasonal system conditions', 'Large industrial load additions', 'Renewable expansion scenarios'] },
]

const studyTypesBase = [
  { title: 'Power Flow Studies', image: '/images/services/power-system-studies/study-load-flow.webp', text: 'Evaluate voltage profiles, line and transformer loading, reactive-power flows, and operating-limit violations.' },
  { title: 'Contingency Analysis', image: '/images/services/power-system-studies/study-transmission-planning.png', text: 'Assess N-1 and N-1-1 security following line, transformer, generator, bus, or substation outages.' },
  { title: 'Transfer Capability Studies', image: '/images/industries/electric-utilities-transmission/card-transmission-planning.webp', text: 'Determine TTC and ATC while respecting thermal, voltage, and stability constraints across transmission interfaces.' },
  { title: 'Congestion Analysis', image: '/images/services/transmission-line-design/cap-routing.webp', text: 'Identify bottlenecks, curtailment exposure, market-cost impacts, and practical network-upgrade options.' },
  { title: 'Voltage Stability Studies', image: '/images/services/power-system-studies/Transmission Planning.jfif', text: 'Use PV and QV analysis to quantify reactive margins, voltage-collapse risk, and compensation requirements.' },
  { title: 'Renewable Integration Studies', image: '/images/our-work/power-system/grid-interconnection-renewable-penetration.webp', text: 'Evaluate solar, wind, and BESS variability, inverter behavior, congestion, curtailment, and grid-support requirements.' },
  { title: 'Transmission Expansion Planning', image: '/images/industries/hub/utilities-transmission.jpg', text: 'Develop cost-effective line, substation, transformer, and reactive-compensation strategies across near-, mid-, and long-term horizons.' },
]

const methodologyImages = ['Data Collection & Model Development.webp', 'Base Case Power Flow Analysis.webp', 'Contingency Analysis.webp', 'Future Scenario Analysis.webp']
const methodology = methodologyBase.map((item, index) => ({ ...item, image: `/images/power-system-study-process/transmission-planning-studies/${methodologyImages[index]}` }))

const studyTypeImages = ['Power+Flow+Studies-1920w.webp', 'Contingency+Analysis+Studies+E-1920w.webp', 'study-transmission-planning.png', 'cap-routing.webp', 'card-transmission-planning.webp', 'grid-interconnection-renewable-penetration.webp', 'Contact Keentel Engineering.webp']
const studyTypeRoots = ['/images/power-system-study-process/transmission-planning-studies/', '/images/power-system-study-process/transmission-planning-studies/', '/images/services/power-system-studies/', '/images/services/transmission-line-design/', '/images/industries/electric-utilities-transmission/', '/images/our-work/power-system/', '/images/power-system-study-process/transmission-planning-studies/']
const studyTypes = studyTypesBase.map((item, index) => ({ ...item, image: `${studyTypeRoots[index]}${studyTypeImages[index]}` }))

const standards = [
  ['NERC TPL', 'Transmission planning reliability'],
  ['FERC', 'Federal planning requirements'],
  ['ISO / RTO', 'Regional planning procedures'],
  ['Utility Criteria', 'Local reliability standards'],
]

const regions = ['ERCOT', 'PJM', 'CAISO', 'MISO', 'SPP', 'WECC']

const benefits = [
  ['Improved Grid Reliability', 'Identify constraints before they become outages, protecting infrastructure and service continuity.'],
  ['Cost-Effective Infrastructure Planning', 'Prioritize practical upgrades instead of relying on reactive emergency capital programs.'],
  ['Renewable Energy Integration', 'Connect large-scale solar, wind, and BESS without compromising transmission reliability.'],
  ['Regulatory Compliance', 'Align planning evidence with NERC, FERC, ISO/RTO, and utility requirements.'],
  ['Market Efficiency', 'Reduce congestion, curtailment, and avoidable consumer cost through better network utilization.'],
]

const faqs = [
  { q: 'What is a transmission planning study?', a: 'A transmission planning study evaluates the long-term performance, adequacy, and reliability of a high-voltage network under current operating conditions, contingencies, and future scenarios.' },
  { q: 'Why are transmission planning studies important?', a: 'They verify that the grid can support load growth and generation expansion while maintaining thermal, voltage, and stability performance.' },
  { q: 'What is N-1 contingency analysis?', a: 'N-1 analysis evaluates system performance after the loss of one transmission element, such as a line, transformer, generator, or reactive-support device.' },
  { q: 'What is N-1-1 analysis?', a: 'N-1-1 analysis evaluates sequential outages, including the system adjustments allowed between the first and second event.' },
  { q: 'What is transfer capability?', a: 'Transfer capability is the amount of electric power that can move across a transmission interface without violating thermal, voltage, or stability limits.' },
  { q: 'What causes transmission congestion?', a: 'Congestion occurs when desired power transfers exceed the physical or reliability limits of lines, transformers, or transmission interfaces.' },
  { q: 'What is transmission expansion planning?', a: 'Expansion planning identifies future lines, substations, transformers, and reactive resources required to support reliable system growth.' },
  { q: 'Which software is used for transmission planning?', a: 'Common platforms include PSS®E, PowerWorld, PSLF, DIgSILENT PowerFactory, PSCAD, and TSAT.' },
  { q: 'What is voltage stability?', a: 'Voltage stability is the ability of the network to maintain acceptable voltages during disturbances and heavy loading without progressing toward voltage collapse.' },
  { q: 'How do renewable projects affect transmission planning?', a: 'Solar, wind, and BESS change power-flow patterns, dispatch, ramping, reactive support, and system-strength requirements, so planners must evaluate multiple operating scenarios.' },
  { q: 'What are seasonal planning cases?', a: 'Seasonal cases represent expected summer, winter, shoulder, peak, and off-peak conditions to test system performance across the year.' },
  { q: 'How often should transmission studies be updated?', a: 'Utilities typically update planning studies annually and whenever material changes occur in load, generation, topology, equipment ratings, or reliability criteria.' },
]

function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"><p className={`mb-3 font-jost text-xs font-bold uppercase tracking-[0.2em] ${light ? 'text-[#F58ADB]' : 'text-[#A8228A]'}`}>{eyebrow}</p><h2 className={`font-urbanist text-3xl font-black leading-[1.1] sm:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-[#06103C]'}`}>{title}</h2>{text && <p className={`mx-auto mt-5 max-w-2xl font-jost text-base leading-7 sm:text-lg ${light ? 'text-white/78' : 'text-gray-600'}`}>{text}</p>}</div>
}

export default function TransmissionPlanningStudiesPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <section className="relative flex min-h-[720px] items-center overflow-hidden bg-[#06103C] pb-16 pt-36 sm:min-h-[780px] sm:pt-40">
          <Image src="/images/power-system-study-process/transmission-planning-studies/Power Transmission Planning Analysis for Modern Electrical Grids.webp" alt="High-voltage transmission infrastructure supporting long-term grid planning" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,60,0.97)_0%,rgba(6,16,60,0.84)_56%,rgba(6,16,60,0.45)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_36%,rgba(199,46,158,0.2),transparent_34%)]" />
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 font-jost text-xs text-white/60"><Link href="/">Home</Link><span>/</span><Link href="/service/power-system-studies">Power System Studies</Link><span>/</span><span className="text-white">Transmission Planning</span></nav>
              <p className="mb-5 inline-flex items-center rounded-full border border-[#E44BB8]/30 bg-[#A8228A]/20 px-4 py-2 font-jost text-xs font-bold uppercase tracking-[0.16em] text-[#F075D2]">Grid Reliability &amp; Expansion</p>
              <h1 className="font-urbanist text-[2.45rem] font-black leading-[1.03] text-white sm:text-5xl lg:text-[4.3rem]">Transmission Planning Studies for <span className="text-[#E44BB8]">Power Grid Reliability</span></h1>
              <p className="mt-6 max-w-3xl font-jost text-base leading-relaxed text-white/78 sm:text-lg lg:text-xl">Evaluate network constraints, contingency performance, renewable integration, and cost-effective expansion strategies for a reliable modern transmission system.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#C72E9E] to-[#8D237F] px-7 py-4 font-jost font-semibold text-white shadow-[0_12px_30px_rgba(168,34,138,0.3)] transition hover:-translate-y-0.5 sm:w-auto">Schedule a Consultation <span className="ml-2" aria-hidden="true">→</span></Link>
                <Link href="/service/power-system-studies" className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-white/30 bg-white/[0.05] px-7 py-4 font-jost font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 sm:w-auto">Explore Power System Studies</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
            <div><p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.18em] text-[#A8228A]">Modern Grid Analysis</p><h2 className="font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl lg:text-5xl">Power Transmission Planning for Evolving Electrical Grids</h2><p className="mt-6 font-jost text-base leading-relaxed text-gray-600">Transmission planning studies identify network constraints, evaluate performance across operating conditions, and determine the infrastructure required to support future energy demand. Keentel helps utilities, developers, and system operators translate complex simulations into actionable grid-development decisions.</p><p className="mt-4 font-jost text-base leading-relaxed text-gray-600">Our engineers apply proven methodologies and accepted simulation platforms to assess system security, reliability, congestion, voltage performance, and long-term expansion needs.</p></div>
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(6,16,60,0.18)]"><Image src="/images/industries/electric-utilities-transmission/card-transmission-planning.webp" alt="Transmission planners evaluating high-voltage grid performance" width={1000} height={760} sizes="(max-width: 1024px) 100vw, 45vw" className="aspect-[4/3] w-full object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06103C] to-transparent p-6 pt-20"><p className="font-urbanist text-xl font-black text-white sm:text-2xl">Reliable today. Ready for tomorrow.</p></div></div>
          </div>
          <div className="mx-auto mt-12 grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">{differentiators.map(([value, label]) => <div key={label} className="rounded-2xl border border-[#E1E5EE] bg-[#F7F8FB] p-5 sm:p-6"><p className="font-urbanist text-2xl font-black text-[#A8228A]">{value}</p><p className="mt-2 font-jost text-base leading-6 text-gray-600">{label}</p></div>)}</div>
        </section>

        <SoftwareCapabilities />

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Planning Fundamentals" title="What Are Transmission Planning Studies?" text="A disciplined evaluation of high-voltage network adequacy under normal, contingency, and future operating conditions." />
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="rounded-3xl bg-[#06103C] p-7 text-white sm:p-9"><p className="font-jost text-base leading-7 text-white/82 sm:text-lg">Transmission planning confirms that the grid can safely support changing demand and generation while remaining within thermal, voltage, and stability limits.</p><ul className="mt-7 space-y-4">{['System power flows across operating scenarios', 'Transmission line and transformer loading limits', 'Voltage stability and reactive-power requirements', 'Contingency performance and expansion needs'].map(item => <li key={item} className="flex gap-3 font-jost text-base leading-6 text-white/88"><span className="mt-2 h-2 w-2 flex-none rounded-full bg-[#E44BB8]" />{item}</li>)}</ul></div>
              <div className="grid grid-cols-2 gap-4"><div className="col-span-2 overflow-hidden rounded-3xl"><Image src="/images/services/power-system-studies/Transmission Planning.jfif" alt="High-voltage network used for transmission planning analysis" width={1000} height={620} className="aspect-[16/8] w-full object-cover" /></div>{[['200k', 'Bus-scale model capability'], ['6+', 'Core study categories'], ['N-1-1', 'Sequential contingency review'], ['End-to-end', 'Model-to-solution delivery']].map(([v, l]) => <div key={l} className="rounded-2xl border border-[#E1E5EE] bg-[#F7F8FB] p-5"><p className="font-urbanist text-2xl font-black text-[#A8228A] sm:text-3xl">{v}</p><p className="mt-1 font-jost text-xs text-gray-500 sm:text-sm">{l}</p></div>)}</div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#06103C] py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_25%,rgba(168,34,138,0.2),transparent_34%)]" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Why Planning Matters" title="Modern Power Systems Demand Forward-Looking Analysis" text="New resource types and unprecedented load growth require planning decisions that remain reliable across many plausible futures." light /><div className="grid gap-5 md:grid-cols-3">{importance.map((item, index) => <article key={item.title} className="rounded-3xl border border-white/15 bg-white/[0.075] p-6 sm:p-7"><span className="font-urbanist text-sm font-black text-[#F58ADB]">0{index + 1}</span><h3 className="mt-5 font-urbanist text-xl font-bold leading-snug text-white">{item.title}</h3><p className="mt-3 font-jost text-base leading-7 text-white/78">{item.text}</p></article>)}</div><div className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-3xl border border-[#E44BB8]/30 bg-[#A8228A]/15 p-7"><p className="font-jost text-xs font-bold uppercase tracking-widest text-[#F58ADB]">Risks of Deferring Studies</p><div className="mt-5 flex flex-wrap gap-2">{['Transmission overloads', 'Voltage instability', 'Congestion costs', 'Renewable curtailment', 'Reduced reliability'].map(risk => <span key={risk} className="rounded-full border border-white/20 bg-white/[0.07] px-4 py-2 font-jost text-sm text-white/85">{risk}</span>)}</div></div><div className="rounded-3xl border border-white/15 bg-white/[0.065] p-7"><p className="font-jost text-xs font-bold uppercase tracking-widest text-[#F58ADB]">Keentel Engineering Solutions</p><p className="mt-5 font-jost text-base leading-7 text-white/80">Targeted line, transformer, substation, reactive-compensation, operating-procedure, and generation-control recommendations backed by traceable study evidence.</p></div></div></div>
        </section>

        <section className="bg-[#F5F6FA] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Study Workflow" title="Transmission Planning Study Methodology" text="A structured four-stage process that turns utility data into defensible planning decisions." /><div className="grid gap-5 md:grid-cols-2">{methodology.map((step, index) => <article key={step.title} className="group overflow-hidden rounded-3xl border border-[#DEE2EB] bg-white shadow-[0_8px_26px_rgba(6,16,60,0.06)]"><div className="relative aspect-[16/8] overflow-hidden"><Image src={step.image} alt={step.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-xl bg-[#06103C]/90 px-3 py-2 font-urbanist text-xs font-black text-white">STEP 0{index + 1}</span></div><div className="p-6 sm:p-7"><h3 className="font-urbanist text-xl font-black leading-snug text-[#06103C] sm:text-2xl">{step.title}</h3><p className="mt-3 font-jost text-base leading-7 text-gray-600">{step.text}</p><ul className="mt-5 grid gap-3 sm:grid-cols-2">{step.points.map(point => <li key={point} className="flex gap-2 font-jost text-sm leading-5 text-gray-600"><span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[#A8228A]" />{point}</li>)}</ul></div></article>)}</div></div>
        </section>

        <section className="bg-gradient-to-r from-[#0B1A5B] to-[#5B2A86] py-10"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left"><div><h2 className="font-urbanist text-2xl font-black text-white sm:text-3xl">Plan the grid before constraints define the project.</h2><p className="mt-2 font-jost text-base leading-7 text-white/80">Speak with a transmission-planning engineer about your system, study horizon, and required deliverables.</p></div><Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex min-h-14 w-full flex-none items-center justify-center rounded-full bg-white px-7 py-4 font-jost font-semibold text-[#06103C] transition hover:-translate-y-0.5 sm:w-auto">Speak With an Engineer</Link></div></section>

        <section className="bg-white py-16 sm:py-20 lg:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Study Portfolio" title="Types of Transmission Planning Studies" text="Analysis supporting system operations, interconnection decisions, reliability compliance, and long-term infrastructure investment." /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{studyTypes.map((study, index) => <article key={study.title} className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-[#E0E4EC] bg-white shadow-[0_7px_24px_rgba(6,16,60,0.055)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(6,16,60,0.12)] ${index === studyTypes.length - 1 ? 'sm:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-2' : ''}`}><div className="relative aspect-[16/9] overflow-hidden"><Image src={study.image} alt={study.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute right-4 top-4 rounded-full bg-[#06103C]/90 px-3 py-1.5 font-urbanist text-xs font-black text-white">{String(index + 1).padStart(2, '0')}</span></div><div className="flex flex-1 flex-col p-6 sm:p-7"><h3 className="font-urbanist text-xl font-bold leading-snug text-[#06103C]">{study.title}</h3><p className="mt-3 font-jost text-base leading-7 text-gray-600">{study.text}</p></div></article>)}</div></div></section>

        <section className="bg-[#F5F6FA] py-16 sm:py-20 lg:py-24"><div className="mx-auto grid max-w-7xl items-stretch gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8"><div><p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.18em] text-[#A8228A]">Reliability Framework</p><h2 className="font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl">Industry Standards &amp; Regulatory Compliance</h2><div className="mt-7 grid gap-3 sm:grid-cols-2">{standards.map(([name, desc]) => <div key={name} className="rounded-2xl border border-[#DEE2EB] bg-white p-5 sm:p-6"><p className="font-urbanist text-lg font-black text-[#A8228A]">{name}</p><p className="mt-2 font-jost text-base leading-6 text-gray-600">{desc}</p></div>)}</div></div><div className="rounded-3xl bg-[#06103C] p-7 sm:p-9"><p className="font-jost text-xs font-bold uppercase tracking-[0.18em] text-[#F58ADB]">Transmission Regions Served</p><h3 className="mt-3 font-urbanist text-2xl font-black text-white sm:text-3xl">Major U.S. Planning Regions</h3><div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">{regions.map(region => <div key={region} className="rounded-xl border border-white/15 bg-white/[0.075] p-4 text-center font-urbanist text-lg font-black text-white">{region}</div>)}</div><p className="mt-6 font-jost text-base leading-7 text-white/78">Supporting interconnection, reliability, and long-term expansion work across regional transmission organizations and utility territories nationwide.</p></div></div></section>

        <SoftwareTools heading="Our Engineering Tools" />

        <section className="bg-white py-16 sm:py-20 lg:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Business & Grid Outcomes" title="Benefits of Transmission Planning Studies" /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{benefits.map(([title, text], index) => <article key={title} className={`rounded-3xl border p-6 sm:p-7 ${index === 0 ? 'border-[#A8228A]/30 bg-gradient-to-br from-[#0B1A5B] to-[#5B2A86] text-white md:col-span-2 lg:col-span-1 lg:row-span-2' : 'border-[#E1E5EE] bg-[#F7F8FB]'}`}><span className={`font-urbanist text-sm font-black ${index === 0 ? 'text-[#F58ADB]' : 'text-[#A8228A]'}`}>{String(index + 1).padStart(2, '0')}</span><h3 className={`mt-5 font-urbanist text-xl font-black leading-snug ${index === 0 ? 'text-white sm:text-3xl' : 'text-[#06103C]'}`}>{title}</h3><p className={`mt-3 font-jost text-base leading-7 ${index === 0 ? 'text-white/80' : 'text-gray-600'}`}>{text}</p></article>)}</div><div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-3xl bg-[#F5F6FA] p-6 sm:flex-row sm:items-center sm:p-8"><div><h3 className="font-urbanist text-xl font-black leading-snug text-[#06103C] sm:text-2xl">Download the Power System Studies Flyer</h3><p className="mt-2 font-jost text-base leading-6 text-gray-600">Review our broader study capabilities and deliverables.</p></div><Link href="https://irp.cdn-website.com/1253891b/files/uploaded/advance+power+system.pdf" target="_blank" className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#A8228A] px-7 py-4 font-jost font-semibold text-white sm:w-auto">Download the Flyer</Link></div></div></section>

        <ServiceCaseStudies service="power-system-studies" />
        <ContactForm />
        <WhoWeServed showHeading />
        <FAQ items={faqs} eyebrow="Transmission Planning FAQs" title={<>Planning questions,<br />answered clearly.</>} description="Technical answers for utilities, developers, operators, and large-load customers evaluating transmission performance." />
        <Blog limit={6} />
      </main>
      <Footer />
    </>
  )
}
