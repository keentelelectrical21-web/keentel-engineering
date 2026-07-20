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

export type StudyItem = { title: string; text: string; image?: string; points?: string[] }

export type PowerStudyConfig = {
  eyebrow: string
  title: string
  accent: string
  intro: string
  heroImage: string
  overviewTitle: string
  overview: string[]
  overviewImage: string
  proposalLabel: string
  definitionTitle: string
  definition: string
  definitionPoints: string[]
  definitionImage: string
  importanceTitle: string
  importance: string
  importancePoints: string[]
  risks: string[]
  methodologyTitle: string
  methodologyIntro: string
  methodology: StudyItem[]
  applicationsTitle: string
  applicationsIntro: string
  applications: StudyItem[]
  toolsTitle: string
  toolsIntro: string
  tools: Array<[string, string, string]>
  benefitsTitle: string
  benefits: Array<[string, string]>
  whyPoints: string[]
  contactText: string
  faqs: { q: string; a: string }[]
}

const studyImageSets: Record<string, { hero: string; overview: string; definition: string; methodology: string[]; applications: string[] }> = {
  'Load Flow Analysis': {
    hero: '/images/power-system-study-process/load-flow-analysis-services/Power+Flow+Studies-1920w.webp', overview: '/images/power-system-study-process/load-flow-analysis-services/ChatGPT+Image+Apr+23-+2026-+09_00_54+PM-1920w.webp', definition: '/images/power-system-study-process/load-flow-analysis-services/Voltage magnitude and angle at each bus.webp',
    methodology: ['/images/power-system-study-process/load-flow-analysis-services/System Data Collection.webp', '/images/power-system-study-process/load-flow-analysis-services/Power System Modeling.webp', '/images/power-system-study-process/load-flow-analysis-services/Step+04-1920w.webp', '/images/power-system-study-process/load-flow-analysis-services/Scenario Analysis.webp'],
    applications: ['/images/power-system-study-process/load-flow-analysis-services/Transmission line loading.webp', '/images/power-system-study-process/load-flow-analysis-services/Reactive power flow throughout the system.webp', '/images/power-system-study-process/load-flow-analysis-services/Transformer loading levels.webp', '/images/power-system-study-process/load-flow-analysis-services/Real power flow through transmission lines.webp', '/images/power-system-study-process/load-flow-analysis-services/System losses.webp'],
  },
  'Short Circuit Studies': {
    hero: '/images/power-system-study-process/short-circuit-analysis-power-system/Power System Short Circuit Analysis and Electrical Fault Studies.webp', overview: '/images/power-system-study-process/short-circuit-analysis-power-system/Contact Keentel Engineering.webp', definition: '/images/power-system-study-process/short-circuit-analysis-power-system/What Are Short Circuit Studies.webp',
    methodology: ['/images/power-system-study-process/short-circuit-analysis-power-system/Line-to-Ground Fault.webp', '/images/power-system-study-process/short-circuit-analysis-power-system/Line-to-Line Fault.webp', '/images/power-system-study-process/short-circuit-analysis-power-system/Double Line-to-Ground Fault.webp', '/images/power-system-study-process/short-circuit-analysis-power-system/Importance of Short Circuit Studies.webp'],
    applications: ['/images/power-system-study-process/short-circuit-analysis-power-system/Transmission System Fault Studies.webp', '/images/power-system-study-process/short-circuit-analysis-power-system/Substation Short Circuit Studies.webp', '/images/power-system-study-process/short-circuit-analysis-power-system/Renewable Energy Fault Studies.webp', '/images/power-system-study-process/short-circuit-analysis-power-system/Industrial Power System Studies.webp', '/images/power-system-study-process/short-circuit-analysis-power-system/Industry Standards.webp'],
  },
  'Power System Protection': {
    hero: '/images/power-system-study-process/protective-device-coordination-studies/Electrical Protection Coordination and Relay Analysis in Power Systems.webp', overview: '/images/power-system-study-process/protective-device-coordination-studies/Importance of Coordination.webp', definition: '/images/power-system-study-process/protective-device-coordination-studies/What Are Protective Device Coordination Studies.webp',
    methodology: ['/images/power-system-study-process/protective-device-coordination-studies/01 — Detecting faults in real time.webp', '/images/power-system-study-process/protective-device-coordination-studies/02 — Interrupting fault currents safely.webp', '/images/power-system-study-process/protective-device-coordination-studies/03 — Simple, fast overcurrent protection.webp', '/images/power-system-study-process/protective-device-coordination-studies/04 — Restoring service automatically.webp'],
    applications: ['/images/power-system-study-process/protective-device-coordination-studies/Transmission System Protection Coordination.webp', '/images/power-system-study-process/protective-device-coordination-studies/Substation Protection Coordination.webp', '/images/power-system-study-process/protective-device-coordination-studies/Renewable Energy Plant Protection Studies.webp', '/images/power-system-study-process/protective-device-coordination-studies/Industrial Power System Protection Studies.webp'],
  },
  'Power Quality Engineering': {
    hero: '/images/power-system-study-process/harmonic-analysis-power-systems/Electrical Harmonic Distortion Analysis in Power Systems.webp', overview: '/images/services/power-system-studies/Harmonic Analysis.webp', definition: '/images/power-system-study-process/harmonic-analysis-power-systems/What Is Harmonic Analysis.webp',
    methodology: ['/images/power-system-study-process/harmonic-analysis-power-systems/Collect system data for accurate modeling..webp', '/images/power-system-study-process/harmonic-analysis-power-systems/Model harmonic sources..webp', '/images/power-system-study-process/harmonic-analysis-power-systems/Analyze harmonic propagation..webp', '/images/power-system-study-process/harmonic-analysis-power-systems/Apply mitigation solutions..webp'],
    applications: ['/images/power-system-study-process/harmonic-analysis-power-systems/Importance of Harmonic Studies.webp', '/images/services/power-system-studies/industries-1.jpg', '/images/services/substation-design/type-transmission.png', '/images/services/power-system-studies/overview-engineers.jpg'],
  },
}

function Heading({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"><p className={`mb-3 font-jost text-xs font-bold uppercase tracking-[0.2em] ${light ? 'text-[#F58ADB]' : 'text-[#A8228A]'}`}>{eyebrow}</p><h2 className={`font-urbanist text-3xl font-black leading-[1.1] sm:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-[#06103C]'}`}>{title}</h2>{text && <p className={`mx-auto mt-5 max-w-2xl font-jost text-base leading-7 sm:text-lg ${light ? 'text-white/78' : 'text-gray-600'}`}>{text}</p>}</div>
}

export default function PowerStudySpecialtyPage({ config: sourceConfig }: { config: PowerStudyConfig }) {
  const images = studyImageSets[sourceConfig.eyebrow]
  const config = images
    ? {
      ...sourceConfig,
      heroImage: images.hero,
      overviewImage: images.overview,
      definitionImage: images.definition,
      methodology: sourceConfig.methodology.map((item, index) => ({ ...item, image: images.methodology[index] ?? item.image })),
      applications: sourceConfig.applications.map((item, index) => ({ ...item, image: images.applications[index] ?? item.image })),
    }
    : sourceConfig
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <section className="relative flex min-h-[700px] items-center overflow-hidden bg-[#06103C] pb-16 pt-36 sm:min-h-[760px] sm:pt-40">
          <Image src={config.heroImage} alt={config.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,60,0.98)_0%,rgba(6,16,60,0.86)_58%,rgba(6,16,60,0.48)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(199,46,158,0.2),transparent_34%)]" />
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-4xl"><nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 font-jost text-xs text-white/65"><Link href="/">Home</Link><span>/</span><Link href="/service/power-system-studies">Power System Studies</Link><span>/</span><span className="text-white">{config.eyebrow}</span></nav><p className="mb-5 inline-flex rounded-full border border-[#E44BB8]/30 bg-[#A8228A]/20 px-4 py-2 font-jost text-xs font-bold uppercase tracking-[0.16em] text-[#F58ADB]">{config.eyebrow}</p><h1 className="font-urbanist text-[2.4rem] font-black leading-[1.03] text-white sm:text-5xl lg:text-[4.25rem]">{config.title} <span className="text-[#E44BB8]">{config.accent}</span></h1><p className="mt-6 max-w-3xl font-jost text-base leading-7 text-white/82 sm:text-lg lg:text-xl">{config.intro}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#C72E9E] to-[#8D237F] px-7 py-4 font-jost font-semibold text-white shadow-[0_12px_30px_rgba(168,34,138,0.3)] transition hover:-translate-y-0.5 sm:w-auto">Schedule a Consultation <span className="ml-2">→</span></Link><Link href="/service/power-system-studies" className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-white/30 bg-white/[0.05] px-7 py-4 font-jost font-semibold text-white transition hover:bg-white/10 sm:w-auto">All Power System Studies</Link></div></div></div>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24"><div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8"><div><p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.18em] text-[#A8228A]">Engineering Analysis</p><h2 className="font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl lg:text-5xl">{config.overviewTitle}</h2>{config.overview.map(text => <p key={text} className="mt-5 font-jost text-base leading-7 text-gray-600 sm:text-lg">{text}</p>)}<div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#06103C] px-7 py-4 font-jost font-semibold text-white transition hover:bg-[#A8228A] sm:w-auto">{config.proposalLabel}</Link><Link href="tel:+18133897871" className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-[#06103C]/20 px-7 py-4 font-jost font-semibold text-[#06103C] sm:w-auto">Call 813-389-7871</Link></div></div><div className="relative overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(6,16,60,0.18)]"><Image src={config.overviewImage} alt={config.overviewTitle} width={1000} height={760} sizes="(max-width: 1024px) 100vw, 45vw" className="aspect-[4/3] w-full object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06103C] to-transparent p-6 pt-20"><p className="font-urbanist text-xl font-black text-white sm:text-2xl">Accurate models. Actionable engineering.</p></div></div></div></section>

        <SoftwareCapabilities />

        <section className="bg-white py-16 sm:py-20 lg:py-24"><div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8"><div className="relative overflow-hidden rounded-3xl"><Image src={config.definitionImage} alt={config.definitionTitle} width={1000} height={760} className="aspect-[4/3] w-full object-cover" /></div><div><p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.18em] text-[#A8228A]">Study Fundamentals</p><h2 className="font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl">{config.definitionTitle}</h2><p className="mt-5 font-jost text-base leading-7 text-gray-600 sm:text-lg">{config.definition}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{config.definitionPoints.map(point => <div key={point} className="flex items-start gap-3 rounded-2xl border border-[#E1E5EE] bg-[#F7F8FB] p-4"><span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#A8228A]/10 text-xs font-black text-[#A8228A]">✓</span><p className="font-jost text-sm leading-6 text-gray-700">{point}</p></div>)}</div></div></div></section>

        <section className="relative overflow-hidden bg-[#06103C] py-16 sm:py-20 lg:py-24"><div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(168,34,138,0.2),transparent_35%)]" /><div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Heading eyebrow="Safety & Reliability" title={config.importanceTitle} text={config.importance} light /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{config.importancePoints.map((point, index) => <div key={point} className="rounded-3xl border border-white/15 bg-white/[0.075] p-6"><span className="font-urbanist text-sm font-black text-[#F58ADB]">0{index + 1}</span><p className="mt-4 font-urbanist text-lg font-bold leading-snug text-white">{point}</p></div>)}</div><div className="mt-8 rounded-3xl border border-[#E44BB8]/30 bg-[#A8228A]/15 p-6 sm:p-8"><p className="font-jost text-xs font-bold uppercase tracking-[0.18em] text-[#F58ADB]">Risks Without Proper Analysis</p><div className="mt-5 flex flex-wrap gap-2">{config.risks.map(risk => <span key={risk} className="rounded-full border border-white/20 bg-white/[0.07] px-4 py-2 font-jost text-sm text-white/85">{risk}</span>)}</div></div></div></section>

        <section className="bg-[#F5F6FA] py-16 sm:py-20 lg:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Heading eyebrow="Engineering Workflow" title={config.methodologyTitle} text={config.methodologyIntro} /><div className="grid gap-5 md:grid-cols-2">{config.methodology.map((step, index) => <article key={step.title} className="group overflow-hidden rounded-3xl border border-[#DEE2EB] bg-white shadow-[0_8px_26px_rgba(6,16,60,0.06)]"><div className="relative aspect-[16/8] overflow-hidden"><Image src={step.image!} alt={step.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-xl bg-[#06103C]/90 px-3 py-2 font-urbanist text-xs font-black text-white">STEP 0{index + 1}</span></div><div className="p-6 sm:p-7"><h3 className="font-urbanist text-xl font-black text-[#06103C] sm:text-2xl">{step.title}</h3><p className="mt-3 font-jost text-base leading-7 text-gray-600">{step.text}</p><ul className="mt-5 grid gap-3 sm:grid-cols-2">{step.points?.map(point => <li key={point} className="flex gap-2 font-jost text-sm leading-5 text-gray-600"><span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[#A8228A]" />{point}</li>)}</ul></div></article>)}</div></div></section>

        <section className="bg-gradient-to-r from-[#0B1A5B] to-[#5B2A86] py-10"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left"><div><h2 className="font-urbanist text-2xl font-black text-white sm:text-3xl">Engineering evidence before equipment or operations are exposed.</h2><p className="mt-2 font-jost text-base leading-7 text-white/80">Discuss your network, available data, required scenarios, and deliverable schedule with our engineering team.</p></div><Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex min-h-14 w-full flex-none items-center justify-center rounded-full bg-white px-7 py-4 font-jost font-semibold text-[#06103C] sm:w-auto">Schedule a Call</Link></div></section>

        <section className="bg-white py-16 sm:py-20 lg:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Heading eyebrow="Study Applications" title={config.applicationsTitle} text={config.applicationsIntro} /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{config.applications.map((item, index) => <article key={item.title} className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-[#E0E4EC] bg-white shadow-[0_7px_24px_rgba(6,16,60,0.055)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(6,16,60,0.12)] ${index === config.applications.length - 1 && config.applications.length % 3 === 1 ? 'sm:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-2' : ''}`}><div className="relative aspect-[16/9] overflow-hidden"><Image src={item.image!} alt={item.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute right-4 top-4 rounded-full bg-[#06103C]/90 px-3 py-1.5 font-urbanist text-xs font-black text-white">{String(index + 1).padStart(2, '0')}</span></div><div className="p-6 sm:p-7"><h3 className="font-urbanist text-xl font-bold leading-snug text-[#06103C]">{item.title}</h3><p className="mt-3 font-jost text-base leading-7 text-gray-600">{item.text}</p><ul className="mt-4 space-y-2">{item.points?.map(point => <li key={point} className="flex gap-2 font-jost text-sm text-gray-600"><span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[#A8228A]" />{point}</li>)}</ul></div></article>)}</div></div></section>

        <SoftwareTools heading="Our Engineering Tools" />

        <section className="bg-white py-16 sm:py-20 lg:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Heading eyebrow="Project Outcomes" title={config.benefitsTitle} /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{config.benefits.map(([title, text], index) => <article key={title} className={`rounded-3xl border p-6 sm:p-7 ${index === 0 ? 'border-[#A8228A]/30 bg-gradient-to-br from-[#0B1A5B] to-[#5B2A86] md:col-span-2 lg:col-span-1 lg:row-span-2' : 'border-[#E1E5EE] bg-[#F7F8FB]'}`}><span className={`font-urbanist text-sm font-black ${index === 0 ? 'text-[#F58ADB]' : 'text-[#A8228A]'}`}>{String(index + 1).padStart(2, '0')}</span><h3 className={`mt-5 font-urbanist text-xl font-black leading-snug ${index === 0 ? 'text-white sm:text-3xl' : 'text-[#06103C]'}`}>{title}</h3><p className={`mt-3 font-jost text-base leading-7 ${index === 0 ? 'text-white/80' : 'text-gray-600'}`}>{text}</p></article>)}</div></div></section>

        <section className="bg-[#F5F6FA] py-16 sm:py-20"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8"><div><p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.18em] text-[#A8228A]">Why Keentel</p><h2 className="font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl">Engineering clarity backed by field and utility experience.</h2><p className="mt-5 font-jost text-base leading-7 text-gray-600">{config.contactText}</p><Link href="/about" className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#06103C] px-7 py-4 font-jost font-semibold text-white sm:w-auto">Learn More About Us</Link></div><div className="space-y-3">{config.whyPoints.map((point, index) => <div key={point} className="flex items-center gap-4 rounded-2xl border border-[#DEE2EB] bg-white p-5"><span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#A8228A]/10 font-urbanist text-xs font-black text-[#A8228A]">0{index + 1}</span><p className="font-jost text-base font-medium leading-6 text-[#06103C]">{point}</p></div>)}</div></div></section>

        <ServiceCaseStudies service="power-system-studies" />
        <ContactForm />
        <WhoWeServed showHeading />
        <FAQ items={config.faqs} eyebrow={`${config.eyebrow} FAQs`} title={<>Technical questions,<br />answered clearly.</>} description="Practical answers for utilities, developers, EPCs, and facility owners planning power-system studies." />
        <Blog limit={6} />
      </main>
      <Footer />
    </>
  )
}
