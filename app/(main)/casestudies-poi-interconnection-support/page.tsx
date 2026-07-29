import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PoiCaseStudyCards from '@/components/sections/PoiCaseStudyCards'

export const metadata: Metadata = {
  title: 'Point-of-Interconnection (POI) Support Case Studies | Keentel Engineering',
  description: 'Explore Keentel Engineering POI interconnection case studies across PJM, ERCOT, WECC, and NYISO for solar, wind, BESS, and hybrid projects.',
  alternates: { canonical: '/casestudies-poi-interconnection-support' },
  openGraph: {
    title: 'Point-of-Interconnection (POI) Support Case Studies',
    description: 'Utility-scale POI engineering results across PJM, ERCOT, WECC, and NYISO.',
    images: ['/images/poi.webp'],
  },
}

type Study = {
  title: string
  client: string
  scope: string
  services: string[]
  challenges: string[]
  results: string[]
}

const studies: Study[] = [
  {
    title: 'PJM 230 kV POI Interconnection for 250 MW Solar + Storage',
    client: 'Confidential Renewable Developer',
    scope: 'Full POI engineering for a 250 MW solar PV + BESS interconnection to a 230 kV PJM transmission line.',
    services: [
      'PJM Feasibility, System Impact (SIS), and Facilities Studies review',
      'PSS®E v35 dynamic and short-circuit model development per the PJM modeling guide',
      'Reactive capability verification at the POI',
      'One-line diagrams, relay protection schemes, and switching plans',
      'Relay setting design for PRC-019, PRC-024, and PRC-025 compliance',
    ],
    challenges: [
      'Tight voltage-regulation and transient-stability criteria from PJM transmission owners',
      'Aggressive coordination schedule with PJM and neighboring utilities',
    ],
    results: [
      'PJM accepted all dynamic and short-circuit models on first submission',
      'Facilities Study finalized ahead of plan, mitigating commercial-operation-date risk',
      'POI energized and commissioned successfully on the first attempt',
      'Keentel named preferred POI partner for future PJM projects',
    ],
  },
  {
    title: 'ERCOT 345 kV POI Support for 300 MW Wind Expansion',
    client: 'Confidential Wind Developer',
    scope: 'POI interconnection of a 300 MW wind-farm expansion into the ERCOT 345 kV network under the ERCOT Resource Interconnection Handbook (RIN).',
    services: [
      'PSS®E model creation and TSAT dynamic-model validation to ERCOT DWG requirements',
      'Steady-state, dynamic-stability, and short-circuit data packages',
      'RFI responses and coordination with ERCOT Planning and the transmission service provider',
      'Protection-package design per ERCOT Nodal Operating Guide Section 2',
      'ICCP point mapping for telemetry compliance',
    ],
    challenges: [
      'ERCOT fast-frequency-response validation under evolving grid conditions',
      'Integration of legacy and new turbine models in a unified hybrid-code base',
    ],
    results: [
      'Zero RFI follow-ups after the initial package review',
      'Dynamic-model certification granted ahead of schedule',
      'Client entered the ERCOT market on time with no penalties or delays',
    ],
  },
  {
    title: 'WECC 230 kV POI for 150 MW PV + 75 MW / 300 MWh BESS Hybrid',
    client: 'Confidential Renewable Developer',
    scope: 'POI interconnection engineering for a 225 MW hybrid solar + BESS project into WECC’s 230 kV transmission system.',
    services: [
      'Dynamic models in PSS®E and PSCAD per WECC MVWG standards',
      'Harmonic analysis and sub-synchronous resonance risk assessment',
      'Electromagnetic-transient studies of inverter switching impacts',
      'SCADA/RTU signal-list development and point-to-point testing support',
    ],
    challenges: [
      'WECC’s rigorous review of inverter-based-resource models and fast-transient behavior',
      'Required SSR studies due to series-compensated transmission lines',
    ],
    results: [
      'EMT modeling report approved without major comments',
      'Full PRC-024, PRC-019, and PRC-027 compliance achieved',
      'Preemptive modeling saved the client millions in potential cost overruns',
    ],
  },
  {
    title: 'NYISO 138 kV POI Interconnection for 120 MW Wind Farm',
    client: 'Confidential Wind Developer',
    scope: 'End-to-end POI interconnection for a 120 MW wind farm tying into the 138 kV NYISO system under the NYISO Generator Interconnection Process.',
    services: [
      'PSS®E steady-state and dynamic models per NYISO submission requirements',
      'Technical appendices for the FERC LGIA Facilities Study',
      'Protection-coordination plan aligned with NYISO and transmission-owner philosophies',
      'Short-circuit contribution review and relay-coordination studies',
    ],
    challenges: [
      'NYISO’s stringent voltage and frequency ride-through criteria',
      'Complex coordination among the developer, NYISO, and transmission owner',
    ],
    results: [
      'First-round acceptance of the complete model submittal with no resubmissions',
      'Interconnection Agreement terms finalized without material changes',
      'Substation build-out and energization completed on the original timeline',
      'Client engaged Keentel for ongoing operations and maintenance engineering support',
    ],
  },
]

function BulletList({ items, result = false }: { items: string[]; result?: boolean }) {
  return (
    <ul className="mt-3 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 font-jost text-sm leading-6 text-[#4B5563] sm:text-base">
          <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${result ? 'bg-emerald-100 text-emerald-700' : 'bg-[#A8228A]/10 text-[#A8228A]'}`}>
            {result ? '✓' : '→'}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function PoiCaseStudiesPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip bg-white">
        <section className="relative isolate overflow-hidden bg-[#06103C] pb-16 pt-36 sm:pb-20 sm:pt-44 lg:pb-24">
          <Image src="/images/poi.webp" alt="Point-of-interconnection electrical engineering for a utility-scale renewable project" fill priority className="object-cover opacity-55" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06103C] via-[#06103C]/90 to-[#06103C]/45" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 font-jost text-sm text-white/65">
              <Link href="/" className="hover:text-white">Home</Link><span>/</span>
              <Link href="/clients-and-projects" className="hover:text-white">Case Studies</Link><span>/</span>
              <span className="text-white">POI Support</span>
            </nav>
            <p className="mb-4 font-jost text-xs font-bold uppercase tracking-[0.22em] text-[#F14BB9]">April 29, 2025 · Case Studies</p>
            <h1 className="max-w-5xl font-urbanist text-4xl font-black leading-[1.07] text-white sm:text-5xl lg:text-7xl">Point-of-Interconnection (POI) Support Case Studies</h1>
            <p className="mt-6 max-w-3xl font-jost text-base leading-8 text-white/80 sm:text-lg">End-to-end interconnection expertise for utility-scale solar, wind, storage, and hybrid projects across four major ISO regions.</p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <p className="font-jost text-lg leading-8 text-[#4B5563]">Connecting large-scale generation and storage projects to regional transmission grids demands deep expertise, seamless ISO coordination, and bulletproof engineering deliverables. Keentel Engineering has supported clients across PJM, ERCOT, WECC, and NYISO with end-to-end POI services—from feasibility studies and dynamic modeling to protection-scheme design and final energization.</p>
            <p className="mt-5 font-jost text-lg leading-8 text-[#4B5563]">Our proven approach minimizes RFIs, accelerates commercial-operation dates, and supports first-time ISO acceptance for renewable, storage, and hybrid projects seeking reliable, compliant transmission access.</p>
          </div>
        </section>

        <PoiCaseStudyCards compact />

        <section className="border-y border-[#E3E6EF] bg-[#F6F7FB] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl sm:mb-14">
              <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#A8228A]">Selected Experience</p>
              <h2 className="font-urbanist text-3xl font-black text-[#06103C] sm:text-5xl">Four regions. One accountable POI partner.</h2>
            </div>
            <div className="space-y-8">
              {studies.map((study, index) => (
                <article key={study.title} className="overflow-hidden rounded-3xl border border-[#DDE1EB] bg-white shadow-[0_12px_38px_rgba(6,16,60,0.07)]">
                  <div className="grid lg:grid-cols-[0.36fr_0.64fr]">
                    <div className="bg-[#06103C] p-6 text-white sm:p-8 lg:p-10">
                      <span className="font-urbanist text-sm font-black tracking-[0.18em] text-[#F14BB9]">CASE STUDY {String(index + 1).padStart(2, '0')}</span>
                      <h3 className="mt-5 font-urbanist text-2xl font-black leading-tight sm:text-3xl">{study.title}</h3>
                      <div className="mt-7 border-t border-white/15 pt-6">
                        <p className="font-jost text-xs font-bold uppercase tracking-[0.15em] text-white/50">Client</p>
                        <p className="mt-2 font-jost text-sm text-white/85">{study.client}</p>
                      </div>
                      <div className="mt-6">
                        <p className="font-jost text-xs font-bold uppercase tracking-[0.15em] text-white/50">Scope</p>
                        <p className="mt-2 font-jost text-sm leading-6 text-white/80">{study.scope}</p>
                      </div>
                    </div>
                    <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:p-10">
                      <div>
                        <h4 className="font-urbanist text-lg font-black text-[#06103C]">Services Provided</h4>
                        <BulletList items={study.services} />
                      </div>
                      <div className="space-y-8">
                        <div>
                          <h4 className="font-urbanist text-lg font-black text-[#06103C]">Key Challenges</h4>
                          <BulletList items={study.challenges} />
                        </div>
                        <div>
                          <h4 className="font-urbanist text-lg font-black text-[#06103C]">Results</h4>
                          <BulletList items={study.results} result />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="font-jost text-lg italic leading-8 text-[#4B5563]">Discover more about our <Link href="/service/poi-interconnection-engineering-support" className="font-bold not-italic text-[#A8228A] underline decoration-[#A8228A]/30 underline-offset-4 hover:decoration-[#A8228A]">Generation Interconnection Support Services</Link> for ISO-wide POI expertise.</p>
          </div>
        </section>

        <section className="bg-[#06103C] py-16 text-center sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#F14BB9]">Ready to accelerate your POI connection?</p>
            <h2 className="font-urbanist text-3xl font-black text-white sm:text-5xl">Move from feasibility to energization with confidence.</h2>
            <p className="mx-auto mt-5 max-w-2xl font-jost text-base leading-7 text-white/75 sm:text-lg">Contact Keentel Engineering for feasibility studies, dynamic modeling, protection design, utility coordination, and final energization support.</p>
            <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C72E9E] to-[#7A2A91] px-8 py-4 font-jost font-semibold text-white transition hover:-translate-y-0.5">Book a Consultation <span className="ml-2" aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
