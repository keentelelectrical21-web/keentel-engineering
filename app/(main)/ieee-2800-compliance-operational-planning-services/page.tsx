import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
import FAQ from '@/components/sections/FAQ'
import SoftwareTools from '@/components/sections/SoftwareTools'
import WhoWeServed from '@/components/service/WhoWeServed'

export const metadata: Metadata = {
  title: 'IEEE 2800 Compliance & Operational Planning Services | Keentel',
  description: 'IEEE 2800 compliance, RMS and EMT modeling, ride-through validation, reactive power planning, and operational planning for solar, wind, BESS, and hybrid IBR projects.',
}

const requirements = [
  { title: 'Voltage & Frequency Ride-Through', text: 'Validate LVRT, HVRT, frequency, and ROCOF performance against IEEE 2800 envelopes.' },
  { title: 'Reactive Power & Voltage Control', text: 'Confirm capability, voltage regulation, power-factor modes, and dynamic reactive current support.' },
  { title: 'Active Power & Frequency Response', text: 'Assess primary and fast frequency response, active-power control, and recovery behavior.' },
  { title: 'Modeling & Performance Validation', text: 'Align RMS and EMT models with OEM data, plant controls, commissioning tests, and as-built performance.' },
]

const services = [
  {
    title: 'IEEE 2800 Compliance Gap Assessment',
    points: ['Evaluate inverter capabilities and plant-level controls', 'Review ride-through performance against IEEE 2800 limits', 'Assess reactive-power capability and control modes', 'Identify protection, modeling, and RPA alignment gaps'],
    outcome: 'Clear compliance roadmap with prioritized action items.',
  },
  {
    title: 'Dynamic Modeling & Simulation',
    points: ['PSS®E RMS modeling for system-wide stability studies', 'PSCAD EMT modeling for weak-grid conditions', 'Align RMS and EMT model behavior', 'Validate OEM models against IEEE 2800 criteria'],
    outcome: 'Utility-accepted models ready for submission.',
  },
  {
    title: 'Voltage, Frequency & Ride-Through Validation',
    points: ['Low- and high-voltage ride-through validation', 'Frequency and ROCOF ride-through studies', 'FFR and PFR performance assessment', 'Dynamic voltage and reactive-current support review'],
    outcome: 'Demonstrated compliance with IEEE 2800 envelopes.',
  },
  {
    title: 'Reactive Power & Voltage Control Planning',
    points: ['Reactive-power capability curve development', 'Voltage-regulation and power-factor control modes', 'Coordinate STATCOMs, capacitor banks, and plant controllers', 'Plan fast reactive-current injection for voltage support'],
    outcome: 'Stable voltage performance and improved grid support.',
  },
  {
    title: 'Protection & Low Fault Current Coordination',
    points: ['Evaluate inverter fault-current contribution strategies', 'Coordinate relays in low short-circuit environments', 'Assess ROCOF, voltage, and islanding protection', 'Align settings with IEEE 2800 protection guidance'],
    outcome: 'Reliable protection without unnecessary tripping.',
  },
  {
    title: 'Operational Planning & Compliance Documentation',
    points: ['Operational planning aligned with IEEE 2800', 'Compliance documentation for utilities and ISOs', 'Commissioning, testing, and model-validation support', 'Change management for repowering and control updates'],
    outcome: 'Long-term compliance and operational certainty.',
  },
]

const ieee2800Faqs = [
  {
    q: 'Which projects need IEEE 2800 compliance support?',
    a: 'Transmission- and sub-transmission-connected solar, wind, battery energy storage, and hybrid inverter-based resource projects may need IEEE 2800 studies when required by the utility, ISO, RTO, or interconnection agreement.',
  },
  {
    q: 'What is included in an IEEE 2800 compliance gap assessment?',
    a: 'We review ride-through capability, active and reactive power controls, frequency response, protection settings, RMS and EMT models, plant-level controls, and the evidence needed to demonstrate compliance.',
  },
  {
    q: 'Do you provide both RMS and EMT model validation?',
    a: 'Yes. Keentel supports RMS studies in platforms such as PSS®E and detailed EMT analysis in PSCAD, including model benchmarking, control review, and performance validation against applicable requirements.',
  },
  {
    q: 'Can you support existing or repowered IBR facilities?',
    a: 'Yes. We assess legacy and repowered facilities, identify compliance gaps created by equipment or control changes, and develop practical mitigation, testing, and documentation plans.',
  },
  {
    q: 'What deliverables will our utility or ISO receive?',
    a: 'Deliverables can include validated study models, simulation results, compliance matrices, settings and control recommendations, study reports, mitigation plans, and traceable evidence packages for technical review.',
  },
  {
    q: 'When should IEEE 2800 engineering begin?',
    a: 'The best time is during early interconnection and equipment selection. Early review reduces redesign risk, supports better OEM coordination, and helps prevent delays during utility studies, commissioning, or final approval.',
  },
]

const engagementTriggers = [
  'Your project interconnects at transmission or sub-transmission voltage',
  'The utility or ISO requires IEEE 2800 compliance',
  'You are experiencing modeling or ride-through study challenges',
  'You are repowering or upgrading legacy IBR facilities',
  'You want to reduce interconnection risk and approval timelines',
]

export default function Ieee2800CompliancePage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[760px] items-center overflow-hidden bg-[#06103C] pb-16 pt-32 sm:min-h-[820px] sm:pb-20 sm:pt-40">
          <Image src="/images/industries/renewable-interconnection-engineering/solar-wind-bess.webp" alt="Utility-scale solar, wind, and battery energy storage resources" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,60,0.97)_0%,rgba(6,16,60,0.87)_54%,rgba(6,16,60,0.48)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_45%,rgba(199,46,158,0.2),transparent_36%)]" />
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl">
              <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 font-jost text-xs text-white/65"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span className="text-white">IEEE 2800 Compliance</span></nav>
              <p className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#E44BB8]/30 bg-[#A8228A]/15 px-4 py-2 font-jost text-[0.68rem] font-bold uppercase tracking-[0.13em] text-[#F075D2] sm:text-xs"><span className="h-2 w-2 flex-none rounded-full bg-[#F075D2]" /> Transmission-Level IBR Compliance</p>
              <h1 className="mb-6 font-urbanist text-[2.35rem] font-black leading-[1.04] text-white sm:text-5xl lg:text-[4.25rem]">IEEE P2800™ / IEEE 2800 <span className="text-[#E44BB8]">Compliance & Operational Planning</span></h1>
              <p className="mb-8 max-w-4xl font-jost text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl">Keentel Engineering provides end-to-end IEEE 2800 compliance and operational planning services, helping solar, wind, battery energy storage, and hybrid projects meet evolving grid-performance requirements with confidence.</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#C72E9E] to-[#8D237F] px-7 py-4 font-jost font-semibold text-white shadow-[0_12px_30px_rgba(168,34,138,0.32)] transition hover:-translate-y-0.5 sm:w-auto">Schedule a Consultation <span className="ml-2" aria-hidden="true">→</span></Link>
                <Link href="/service/nerc-compliance" className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-white/35 bg-white/[0.06] px-7 py-4 font-jost font-semibold text-white backdrop-blur-sm transition hover:bg-white/12 sm:w-auto">Explore NERC Compliance</Link>
                <Link href="/services" className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-white/20 px-7 py-4 font-jost font-semibold text-white transition hover:border-white/55 sm:w-auto">Our Services</Link>
              </div>
              <div className="mt-10 max-w-3xl border-t border-white/15 pt-6">
                <p className="mb-4 font-jost text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/45">Trusted and Certified</p>
                <Image src="/images/cert-logos.png" alt="Keentel Engineering certifications and memberships" width={640} height={180} className="h-auto max-h-16 w-auto max-w-full object-contain brightness-0 invert sm:max-h-24" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(6,16,60,0.16)]">
              <Image src="/images/services/power-system-studies/overview-engineers.jpg" alt="Power-system engineers reviewing transmission interconnection requirements" width={1000} height={850} sizes="(max-width: 1024px) 100vw, 45vw" className="aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06103C] to-transparent p-6 pt-20 sm:p-8"><p className="font-urbanist text-2xl font-black text-white">Study-driven. Utility-focused. Defensible.</p></div>
            </div>
            <div>
              <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.17em] text-[#A8228A]">Why It Matters</p>
              <h2 className="mb-6 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl lg:text-5xl">Why IEEE 2800 Compliance Matters</h2>
              <p className="mb-5 font-jost text-base leading-relaxed text-gray-600">IEEE Std 2800™-2022 establishes uniform technical minimum requirements for inverter-based resources connected to transmission and sub-transmission systems.</p>
              <p className="font-jost text-base leading-relaxed text-gray-600">Utilities, ISOs, and regulators increasingly require demonstrated IEEE 2800 compliance before granting interconnection approval. Non-compliance can lead to costly redesigns, schedule delays, and operational restrictions.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {requirements.map((item, index) => <div key={item.title} className="rounded-2xl border border-[#E1E5EE] bg-[#F8F9FC] p-5"><span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#A8228A]/10 font-urbanist text-xs font-black text-[#A8228A]">0{index + 1}</span><h3 className="mb-2 font-urbanist text-base font-bold text-[#06103C]">{item.title}</h3><p className="font-jost text-sm leading-relaxed text-gray-600">{item.text}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#06103C] py-20 sm:py-28 lg:py-32">
          <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#5B2A86]/25 blur-[120px]" aria-hidden="true" />
          <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#A8228A]/20 blur-[100px]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.42fr_1fr] lg:gap-14 lg:px-8 xl:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.18em] text-[#E44BB8]">Full-Scope Support</p>
              <h2 className="font-urbanist text-3xl font-black leading-[1.05] text-white sm:text-4xl lg:text-[2.8rem]">IEEE 2800 Compliance Services</h2>
              <p className="mt-5 font-jost text-base leading-relaxed text-white/65">A structured, study-driven approach tailored to each project&apos;s technology, interconnection point, and regulatory environment.</p>
              <div className="mt-8 grid grid-cols-3 gap-3 lg:grid-cols-1">
                {[['06', 'Core scopes'], ['RMS + EMT', 'Model coverage'], ['End-to-end', 'Project support']].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 lg:flex lg:items-center lg:gap-4">
                    <p className="font-urbanist text-lg font-black text-white sm:text-xl">{value}</p>
                    <p className="mt-1 font-jost text-[0.68rem] uppercase leading-tight tracking-wider text-white/45 lg:mt-0">{label}</p>
                  </div>
                ))}
              </div>
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="mt-8 hidden w-full items-center justify-center rounded-full bg-gradient-to-r from-[#C72E9E] to-[#8D237F] px-6 py-4 font-jost font-semibold text-white shadow-[0_12px_30px_rgba(168,34,138,0.3)] transition hover:-translate-y-0.5 lg:inline-flex">Discuss Your Project <span className="ml-2" aria-hidden="true">→</span></Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {services.map((service, index) => (
                <article key={service.title} className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-3xl border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.09),rgba(255,255,255,0.035))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#E44BB8]/45 hover:shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:p-7">
                  <span className="absolute -right-2 -top-5 font-urbanist text-[6rem] font-black leading-none text-white/[0.035]">{String(index + 1).padStart(2, '0')}</span>
                  <div className="relative mb-6 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E44BB8]/25 bg-[#A8228A]/25 font-urbanist text-sm font-black text-[#F075D2]">{String(index + 1).padStart(2, '0')}</span>
                    <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#E44BB8] transition-all duration-300 group-hover:w-24" />
                  </div>
                  <h3 className="relative mb-5 max-w-sm font-urbanist text-xl font-bold leading-snug text-white sm:text-2xl">{service.title}</h3>
                  <ul className="relative mb-6 space-y-3">{service.points.map(point => <li key={point} className="flex gap-3 font-jost text-sm leading-relaxed text-white/65"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#E44BB8] shadow-[0_0_8px_rgba(228,75,184,0.65)]" />{point}</li>)}</ul>
                  <div className="relative mt-auto rounded-xl border border-white/10 bg-[#06103C]/45 p-4"><p className="font-jost text-sm font-semibold leading-relaxed text-white/88"><span className="mr-1 text-[#F075D2]">Outcome:</span>{service.outcome}</p></div>
                </article>
              ))}
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#C72E9E] to-[#8D237F] px-6 py-4 font-jost font-semibold text-white shadow-[0_12px_30px_rgba(168,34,138,0.3)] lg:hidden md:col-span-2">Discuss Your Project <span className="ml-2" aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <SoftwareTools heading="Technologies We Support" theme="light" />

        <FAQ
          items={ieee2800Faqs}
          eyebrow="IEEE 2800 FAQs"
          title={<>IEEE 2800 questions,<br />answered clearly.</>}
          description="Practical answers about applicability, modeling, validation, documentation, and project timing."
        />

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
            <div><p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.17em] text-[#A8228A]">Why Keentel</p><h2 className="mb-6 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl lg:text-5xl">Independent Engineering. Utility-Accepted Results.</h2><p className="font-jost text-base leading-relaxed text-gray-600">Our independent, OEM-agnostic approach keeps compliance strategies practical, transparent, and aligned with real utility expectations. We do not just interpret IEEE 2800—we help implement it efficiently and defensibly.</p><Link href="/our-work" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#06103C] px-7 py-4 font-jost font-semibold text-white transition hover:bg-[#A8228A] sm:w-auto">View Project Highlights</Link></div>
            <div className="space-y-4">{['Expert-led power-system engineering', 'Utility and ISO review-focused deliverables', 'Validated PSS®E, PSCAD, and TSAT modeling', 'Standards-driven, OEM-agnostic recommendations', 'Practical compliance solutions with traceable evidence'].map((item, index) => <div key={item} className="flex items-center gap-4 rounded-2xl border border-[#E1E5EE] bg-[#F8F9FC] p-5"><span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#A8228A]/10 font-urbanist text-sm font-black text-[#A8228A]">{index + 1}</span><p className="font-urbanist text-base font-bold text-[#06103C] sm:text-lg">{item}</p></div>)}</div>
          </div>
        </section>

        <WhoWeServed />

        <section className="relative overflow-hidden bg-[#06103C] py-20 sm:py-28">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_18%_30%,#A8228A_0,transparent_32%),radial-gradient(circle_at_85%_75%,#5B2A86_0,transparent_35%)]" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl sm:mb-14">
              <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.18em] text-[#E44BB8]">When to Engage</p>
              <h2 className="font-urbanist text-3xl font-black leading-[1.08] text-white sm:text-4xl lg:text-5xl">Know When IEEE 2800 Support Becomes Critical.</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8">
              <div className="overflow-hidden rounded-3xl border border-white/12 bg-white/[0.055] p-5 backdrop-blur-sm sm:p-7">
                <div className="space-y-3">
                  {engagementTriggers.map((item, index) => (
                    <div key={item} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#071447]/60 p-4 transition duration-300 hover:border-[#E44BB8]/35 hover:bg-white/[0.07] sm:p-5">
                      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#A8228A]/25 font-urbanist text-xs font-black text-[#F075D2]">0{index + 1}</span>
                      <p className="flex-1 font-jost text-sm font-medium leading-relaxed text-white/80 sm:text-base">{item}</p>
                      <span className="hidden text-[#F075D2] transition-transform group-hover:translate-x-1 sm:block" aria-hidden="true">→</span>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="relative overflow-hidden rounded-3xl border border-[#E44BB8]/35 bg-[linear-gradient(145deg,rgba(168,34,138,0.32),rgba(91,42,134,0.16))] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.25)] sm:p-9 lg:p-10">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[32px] border-white/[0.035]" aria-hidden="true" />
                <div className="relative">
                  <span className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#F075D2]/25 bg-[#A8228A]/30 text-[#F075D2]"><svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M8 2v3M16 2v3M3 9h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" strokeWidth="1.8" strokeLinecap="round"/><path d="m9 15 2 2 4-5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.18em] text-[#F075D2]">Start With Clarity</p>
                  <h3 className="mb-5 font-urbanist text-3xl font-black leading-tight text-white sm:text-4xl">Start Your IEEE 2800 Compliance Journey</h3>
                  <p className="mb-8 font-jost text-base leading-relaxed text-white/70">Whether you are in early development or approaching commissioning, Keentel can help you navigate IEEE Std 2800™-2022 with confidence.</p>
                  <div className="space-y-3">
                    <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#E144B5] to-[#A8228A] px-6 py-4 text-center font-jost font-semibold text-white shadow-[0_12px_30px_rgba(168,34,138,0.32)] transition hover:-translate-y-0.5">Schedule a Free Consultation <span className="ml-2" aria-hidden="true">→</span></Link>
                    <Link href="tel:813-389-7871" className="flex min-h-14 w-full items-center justify-center rounded-full border border-white/30 bg-white/[0.04] px-6 py-4 font-jost font-semibold text-white transition hover:bg-white/10">Call 813-389-7871</Link>
                  </div>
                  <p className="mt-6 text-center font-jost text-xs text-white/45">No-obligation project readiness conversation</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
