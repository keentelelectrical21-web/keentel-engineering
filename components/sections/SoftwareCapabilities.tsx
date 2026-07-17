'use client'

import { useState } from 'react'
import Link from 'next/link'

const tools = [
  { key: 'psse', name: 'PSS®E', logo: '/images/services/power-system-studies/logo-psse.png', description: 'Power System Simulator for Engineering by Siemens — industry standard for large-scale transmission network analysis.', faqs: [
    ['What size networks can PSS®E handle?', 'We model networks ranging from focused interconnection cases to large ISO-scale transmission systems.'],
    ['Can PSS®E model renewable energy assets?', 'Yes. We build solar, wind, and BESS models for load flow, contingency, and dynamic studies.'],
    ['Do you automate PSS®E workflows?', 'Yes. Python-based automation helps us run large study matrices accurately and efficiently.'],
  ] },
  { key: 'etap', name: 'ETAP', logo: '/images/services/power-system-studies/logo-etap.png', description: 'Integrated electrical power system platform for design, simulation, analysis, and operational studies.', faqs: [
    ['Does ETAP cover arc flash studies?', 'Yes. We perform IEEE 1584 and NFPA 70E arc-flash analysis and develop compliant recommendations.'],
    ['Can ETAP model microgrids and BESS?', 'Yes. We model renewable generation, storage, islanding, and protection scenarios.'],
    ['Which ETAP study methods do you use?', 'We apply ANSI and IEC methods for short circuit, coordination, load flow, and safety studies.'],
  ] },
  { key: 'pscad', name: 'PSCAD', logo: '/images/services/power-system-studies/logo-pscad.png', description: 'Electromagnetic transient simulation for HVDC, converters, switching events, and inverter-based resources.', faqs: [
    ['When is PSCAD used?', 'PSCAD is used for fast EMT phenomena that require more detail than RMS simulation tools provide.'],
    ['Can PSCAD model HVDC systems?', 'Yes. We evaluate HVDC controls, fault response, and interaction with the surrounding grid.'],
    ['Do you simulate grid-forming inverters?', 'Yes. We assess grid-forming and grid-following control behavior in weak-grid conditions.'],
  ] },
  { key: 'powerworld', name: 'PowerWorld', logo: '/images/services/power-system-studies/logo-powerworld.jpg', description: 'Interactive power-system simulation for power flow, contingencies, and transmission planning visualization.', faqs: [
    ['What is PowerWorld best used for?', 'It is well suited to interactive power flow, contingency analysis, and clear system visualization.'],
    ['Can PowerWorld run optimal power flow?', 'Yes. We use it for OPF, transfer analysis, and voltage-stability evaluation.'],
    ['Can it support large planning models?', 'Yes. PowerWorld can efficiently analyze large regional transmission cases.'],
  ] },
  { key: 'skm', name: 'SKM PTW', logo: '/images/services/power-system-studies/logo-skm.png', description: 'Electrical engineering platform for industrial power-system design, protection, analysis, and safety.', faqs: [
    ['What studies does SKM PTW cover?', 'We use SKM for load flow, short circuit, arc flash, and protection coordination studies.'],
    ['Can SKM evaluate harmonics?', 'Yes. SKM supports harmonic evaluation against applicable IEEE limits.'],
    ['Where is SKM commonly applied?', 'It is widely used for industrial, utility, commercial, and data-center electrical systems.'],
  ] },
  { key: 'autocad', name: 'AutoCAD Elec.', logo: '/images/services/power-system-studies/logo-autocad.png', description: 'Electrical design automation for schematics, component tagging, wire numbering, and coordinated documentation.', faqs: [
    ['What deliverables use AutoCAD Electrical?', 'We produce one-lines, schematics, wiring diagrams, panel designs, cable schedules, and coordinated drawing packages.'],
    ['Which symbol standards are supported?', 'We work with ANSI, IEC, and client-specific libraries and drafting standards.'],
    ['How is revision control maintained?', 'Drawings follow structured review, revision, and document-control workflows.'],
  ] },
  { key: 'aspen', name: 'ASPEN', logo: '/images/services/power-system-studies/logo-aspen.png', description: 'Short-circuit and relay-coordination software used for detailed protection-system engineering.', faqs: [
    ['What is ASPEN used for?', 'ASPEN supports short-circuit, relay coordination, and protection-system studies.'],
    ['Can ASPEN model relay logic?', 'Yes. We model installed relay characteristics and verify selective coordination.'],
    ['Does ASPEN support renewable systems?', 'Yes. It can support fault and protection studies involving inverter-based resources.'],
  ] },
]

export default function SoftwareCapabilities() {
  const [activeKey, setActiveKey] = useState(tools[0].key)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const active = tools.find((tool) => tool.key === activeKey) ?? tools[0]

  return (
    <section className="bg-[#F6F7FB] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#A8228A]">Tools We Use</p>
          <h2 className="mb-4 font-urbanist text-3xl font-black text-[#06103C] sm:text-4xl lg:text-5xl">Our Software Capabilities</h2>
          <p className="font-jost text-base text-gray-600 sm:text-lg">Select a platform to see what it&apos;s built for and the questions clients ask most.</p>
        </div>

        <div className="mb-8 flex gap-3 overflow-x-auto pb-3 lg:flex-wrap lg:justify-center lg:overflow-visible">
          {tools.map((tool) => (
            <button key={tool.key} type="button" onClick={() => { setActiveKey(tool.key); setOpenIndex(null) }} className="flex min-w-[105px] flex-col items-center gap-2 rounded-xl border-2 bg-white px-4 py-3 transition" style={{ borderColor: activeKey === tool.key ? '#A8228A' : '#E6E8F0', boxShadow: activeKey === tool.key ? '0 4px 18px rgba(168,34,138,0.14)' : 'none' }}>
              <img src={tool.logo} alt={tool.name} className="h-9 max-w-[90px] object-contain" />
              <span className="font-jost text-xs font-bold uppercase tracking-wide" style={{ color: activeKey === tool.key ? '#A8228A' : '#777' }}>{tool.name}</span>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-[#E6E8F0] bg-white p-5 sm:p-8">
          <div className="mb-3 flex items-center gap-4"><img src={active.logo} alt="" className="h-9 max-w-[90px] object-contain" /><h3 className="font-urbanist text-xl font-bold text-[#06103C] sm:text-2xl">{active.name}</h3></div>
          <p className="mb-8 max-w-3xl font-jost leading-relaxed text-gray-600">{active.description}</p>
          <div className="space-y-3">
            {active.faqs.map(([question, answer], index) => {
              const open = openIndex === index
              return <div key={question} className="overflow-hidden rounded-xl border border-[#E6E8F0]">
                <button type="button" onClick={() => setOpenIndex(open ? null : index)} className="flex w-full items-center gap-3 p-4 text-left sm:gap-5 sm:p-5">
                  <span className="font-urbanist text-lg font-black text-black sm:text-xl">{String(index + 1).padStart(2, '0')}</span>
                  <span className="flex-1 font-urbanist text-base font-bold text-[#06103C] sm:text-lg">{question}</span>
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#F6F7FB] text-[#A8228A]">{open ? '−' : '+'}</span>
                </button>
                {open && <p className="px-4 pb-5 font-jost text-sm leading-relaxed text-gray-600 sm:px-5 sm:pl-[68px] sm:text-base">{answer}</p>}
              </div>
            })}
          </div>
          <div className="mt-8 text-center"><Link href="/service/software-capabilities-faqs" className="font-jost text-sm font-semibold text-[#A8228A]">See all software FAQs →</Link></div>
        </div>
      </div>
    </section>
  )
}
