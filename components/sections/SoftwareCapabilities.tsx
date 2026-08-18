'use client'

import { useState } from 'react'
import Link from 'next/link'

const tools = [
  { key: 'psse', name: 'PSS®E', logo: '/images/services/power-system-studies/logo-psse.png', description: 'Power System Simulator for Engineering by Siemens — industry standard for large-scale transmission network analysis.', faqs: [
    ['What is PSS®E used for?', 'PSS®E is used for transmission planning, interconnection studies, contingency analysis, stability simulations, and grid expansion planning.'],
    ['Can PSS®E be used for renewable energy integration?', 'Yes. PSS®E supports modeling of inverter-based resources such as solar plants, wind farms, and battery storage.'],
    ['How does PSS®E perform contingency analysis?', 'It simulates outage scenarios and identifies voltage or thermal violations.'],
  ] },
  { key: 'etap', name: 'ETAP', logo: '/images/services/power-system-studies/logo-etap.png', description: 'Integrated electrical power system platform for design, simulation, analysis, and operational studies.', faqs: [
    ['What is ETAP used for?', 'ETAP supports detailed short-circuit, coordination, arc-flash, harmonic, and facility-level power system studies.'],
    ['What can short-circuit studies verify?', 'They determine fault-current levels, validate equipment ratings, and verify protection devices operate correctly during abnormal system events.'],
    ['What does harmonic analysis evaluate?', 'It evaluates waveform distortion from inverter sources and nonlinear loads through harmonic analysis, resonance evaluation, and mitigation studies.'],
  ] },
  { key: 'pscad', name: 'PSCAD', logo: '/images/services/power-system-studies/logo-pscad.png', description: 'Electromagnetic transient simulation for HVDC, converters, switching events, and inverter-based resources.', faqs: [
    ['When is PSCAD used?', 'PSCAD is used for high-fidelity electromagnetic transient and dynamic studies, including weak-grid and fast-transient evaluation.'],
    ['What does EMT modeling evaluate?', 'EMT modeling evaluates inverter switching impacts, weak-grid conditions, and fast control interactions.'],
    ['Can PSCAD support renewable interconnections?', 'PSCAD modeling supports utilities and renewable developers in validating grid-interconnection performance, ride-through compliance, and protection schemes.'],
  ] },
  { key: 'powerworld', name: 'PowerWorld', logo: '/images/services/power-system-studies/logo-powerworld.jpg', description: 'Interactive power-system simulation for power flow, contingencies, and transmission planning visualization.', faqs: [
    ['What is PowerWorld used for?', 'PowerWorld is used for power-flow, contingency, and transmission-planning visualization.'],
    ['What can transmission planning studies identify?', 'They identify system constraints, evaluate future grid needs, and plan infrastructure upgrades.'],
    ['What does load-flow analysis evaluate?', 'It evaluates voltage stability, load distribution, and losses during normal and peak demand.'],
  ] },
  { key: 'skm', name: 'SKM PTW', logo: '/images/services/power-system-studies/logo-skm.png', description: 'Electrical engineering platform for industrial power-system design, protection, analysis, and safety.', faqs: [
    ['What is SKM PTW used for?', 'SKM PTW supports electrical system design, protection, analysis, and safety studies.'],
    ['What is protective coordination?', 'It optimizes relay and breaker settings using time-current analysis to isolate faults quickly, improve coordination, and minimize system disruption.'],
    ['What is arc-flash analysis?', 'Arc-flash studies evaluate incident energy exposure and define PPE boundaries and equipment-labeling requirements.'],
  ] },
  { key: 'autocad', name: 'AutoCAD Elec.', logo: '/images/services/power-system-studies/logo-autocad.png', description: 'Electrical design automation for schematics, component tagging, wire numbering, and coordinated documentation.', faqs: [
    ['What is AutoCAD Electrical used for?', 'AutoCAD Electrical supports electrical design documentation, schematics, component tagging, wire numbering, and coordinated drawings.'],
    ['What does a substation designer produce?', 'Detailed engineering drawings and documentation including general arrangements, equipment layouts, wiring diagrams, control schematics, material lists, and cable schedules.'],
    ['What can construction-ready documentation include?', 'Construction-ready drawings and calculations can include schematics, wiring diagrams, logic diagrams, and detailed design documentation.'],
  ] },
  { key: 'aspen', name: 'ASPEN', logo: '/images/services/power-system-studies/logo-aspen.png', description: 'Short-circuit and relay-coordination software used for detailed protection-system engineering.', faqs: [
    ['What is ASPEN used for?', 'ASPEN supports short-circuit and relay-coordination analysis for protection-system engineering.'],
    ['Why are short-circuit studies critical?', 'They confirm equipment interrupting ratings, define protective-device settings, ensure breaker-duty compliance, and reduce equipment-failure risk.'],
    ['What does protection and control do?', 'Protection and control systems monitor conditions and detect, isolate, and clear faults using relays, breakers, and automation logic.'],
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
