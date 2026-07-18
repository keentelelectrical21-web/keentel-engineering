'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const coreServices = [
  {
    title: 'Core Utility Engineering Services',
    image: '/images/industries/electric-utilities-transmission/card-core-services.webp',
    items: [
      'Load flow analysis',
      'Transmission planning studies',
      'Short circuit and protection coordination studies',
      'Stability and dynamic system studies',
      'Renewable energy interconnection analysis',
      'Arc flash and electrical safety studies',
      'Harmonic and power quality analysis',
      'Grounding system design and verification',
    ],
  },
  {
    title: 'Transmission System Planning and Grid Expansion',
    image: '/images/industries/electric-utilities-transmission/card-transmission-planning.webp',
    desc: 'Transmission planning is essential for ensuring that electric utilities can support increasing demand and evolving generation resources.',
    items: [
      'Long-term transmission planning studies',
      'Congestion and transfer capability analysis',
      'Reactive power and voltage stability studies',
      'Transmission expansion evaluation',
      'Renewable integration studies',
    ],
  },
  {
    title: 'Grid Reliability and NERC Compliance Support',
    image: '/images/industries/electric-utilities-transmission/card-nerc-compliance.webp',
    desc: 'Utilities must comply with strict reliability standards to maintain stable and secure power system operation.',
    items: [
      'NERC TPL transmission planning standards',
      'PRC protection system compliance',
      'MOD modeling and validation requirements',
      'GMD vulnerability assessments',
    ],
  },
  {
    title: 'Substation and Transmission Infrastructure Engineering',
    image: '/images/industries/electric-utilities-transmission/card-substation.webp',
    items: [
      'Substation design and upgrades',
      'Protection and control system design',
      'Equipment specification and verification',
    ],
  },
  {
    title: 'Renewable Energy Integration Support',
    image: '/images/industries/electric-utilities-transmission/card-renewable.webp',
    items: [
      'Interconnection feasibility studies',
      'System impact studies',
      'Inverter-based resource modeling',
      'Grid stability analysis',
      'Reactive power and voltage control evaluation',
    ],
  },
  {
    title: 'Advanced Power System Modeling and Simulation',
    image: '/images/industries/electric-utilities-transmission/card-modeling.webp',
    items: ['PSS®E', 'DigSILENT PowerFactory', 'PSCAD / EMTDC', 'PowerWorld Simulator', 'ETAP'],
  },
];

const benefits = [
  {
    step: 'Step 1',
    title: 'Experienced Power System Engineers',
    desc: 'Our engineers have extensive experience working with transmission systems and utility infrastructure.',
  },
  {
    step: 'Step 2',
    title: 'Compliance-Focused Engineering',
    desc: 'We ensure that all studies align with IEEE, NERC, ANSI, and IEC standards.',
  },
  {
    step: 'Step 3',
    title: 'Advanced Simulation Capabilities',
    desc: 'Our team uses industry-leading software to perform detailed power system analysis.',
  },
  {
    step: 'Step 4',
    title: 'Reliable Engineering Solutions',
    desc: 'We provide practical solutions that improve system reliability and operational efficiency.',
  },
];

const softwareTabs = [
  {
    key: 'psse',
    name: 'PSS®E',
    logo: '/images/software-logos/psse.png',
    faqs: [
      ['What is PSS®E software?', 'PSS®E is a power system simulation software developed by Siemens for analyzing and planning electrical transmission networks.'],
      ['What is PSS®E used for?', 'Transmission planning, interconnection studies, contingency analysis, stability simulations, and grid expansion planning.'],
      ['Who uses PSS®E?', 'Electric utilities, transmission planners, system operators, renewable developers, and consulting firms.'],
      ['Can it model renewables?', 'Yes, including solar plants, wind farms, and battery energy storage systems.'],
    ],
  },
  {
    key: 'etap',
    name: 'ETAP',
    logo: '/images/software-logos/etap.png',
    faqs: [
      ['What is ETAP software?', 'An electrical power system engineering platform for design, simulation, analysis, and operation of utility and industrial networks.'],
      ['What studies can ETAP perform?', 'Power flow, short circuit, arc flash, protection coordination, harmonic, and dynamic stability studies.'],
      ['What is the ETAP Electrical Digital Twin?', 'A virtual model that mirrors the physical network for predictive simulation and real-time monitoring.'],
    ],
  },
  {
    key: 'pscad',
    name: 'PSCAD',
    logo: '/images/software-logos/pscad.png',
    faqs: [
      ['What is PSCAD?', 'An electromagnetic transient (EMT) simulation software used to analyze fast electrical phenomena in power systems.'],
      ['What is it used for?', 'HVDC studies, converter modeling, renewable inverter simulations, and lightning surge analysis.'],
    ],
  },
  {
    key: 'powerworld',
    name: 'PowerWorld',
    logo: '/images/software-logos/powerworld.jpg',
    faqs: [
      ['What is PowerWorld Simulator?', 'An interactive tool for power flow, contingency analysis, and voltage stability studies.'],
      ['How large a system can it handle?', 'Up to approximately 250,000 buses.'],
    ],
  },
  {
    key: 'skm',
    name: 'SKM PTW',
    logo: '/images/software-logos/skm.png',
    faqs: [
      ['What is SKM PowerTools?', 'An electrical engineering platform for power system design, analysis, and safety evaluation.'],
      ['What is SKM CAPTOR?', "SKM's protective device coordination module using time-current curves."],
    ],
  },
  {
    key: 'acade',
    name: 'AutoCAD Elec.',
    logo: '/images/software-logos/autocad-electrical.png',
    faqs: [
      ['Difference from AutoCAD?', 'AutoCAD Electrical provides intelligent automation: wire numbering, component tagging, and error checking.'],
      ['Suitable for substation design?', 'Yes, including protection schematics, relay panels, and AC/DC diagrams.'],
    ],
  },
  {
    key: 'aspen',
    name: 'ASPEN',
    logo: '/images/software-logos/aspen.png',
    faqs: [
      ['What is ASPEN OneLiner used for?', 'Advanced short circuit analysis and relay coordination to validate protection schemes against ANSI, IEC, and NERC standards.'],
      ['How does ASPEN support renewables?', 'It models inverter-based resources such as solar, wind, and BESS systems.'],
    ],
  },
];

const clientLogos = [
  'RRC-ae225119', 'PAE-864f5ced', '49-752adf6f', '48-816ccd8f', '47-363a19ec',
  '46-ff7bc11f', '45-dfb687e0', '44-18370d1d', '43-10240e91',
];

const faqs = [
  ['What types of utilities does Keentel Engineering support?', 'We support investor-owned utilities, municipal utilities, cooperative utilities, and transmission system operators.'],
  ['What services do utilities typically require?', 'Power system studies, transmission planning, protection coordination studies, substation design, and grid reliability assessments.'],
  ['Why are transmission planning studies important?', 'They help utilities identify system constraints, evaluate future grid needs, and plan infrastructure upgrades.'],
  ['What are NERC reliability standards?', 'Regulatory requirements that ensure reliable operation of the bulk electric power system in North America.'],
  ['How do renewable energy projects impact utilities?', 'Renewable generation can change power flow patterns, affect system stability, and require additional transmission capacity or reactive power support.'],
  ['What software tools are used for utility power system studies?', 'Commonly used tools include PSS®E, PowerWorld, DigSILENT PowerFactory, PSCAD, and ETAP.'],
  ['What is a transmission operator?', 'An entity that manages the real-time operation and reliability of the transmission system.'],
  ['What is a system impact study?', 'A study that evaluates how a new generation or load project affects the transmission system.'],
  ['How does Keentel Engineering support grid modernization?', 'We provide advanced modeling, planning studies, and engineering design services that support transmission upgrades and renewable integration.'],
  ['Why do utilities work with engineering consultants?', 'Consultants provide specialized expertise, advanced modeling capabilities, and additional engineering resources to support utility projects.'],
];

function SoftwareFaqWidget() {
  const [active, setActive] = useState('psse');
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const tab = softwareTabs.find((t) => t.key === active)!;

  return (
    <div className="rounded-2xl border bg-white overflow-hidden" style={{ borderColor: '#E6E8F0' }}>
      <div className="flex flex-wrap justify-center gap-3 p-6 border-b" style={{ borderColor: '#E6E8F0' }}>
        {softwareTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setActive(t.key);
              setOpenIdx(0);
            }}
            className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
              active === t.key ? 'shadow-md' : ''
            }`}
            style={{
              borderColor: active === t.key ? '#A8228A' : '#E6E8F0',
              background: active === t.key ? '#FDF5FC' : '#fff',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.logo} alt={t.name} className="h-9 max-w-[100px] object-contain" />
            <span
              className="font-jost text-[10px] font-bold uppercase tracking-wider"
              style={{ color: active === t.key ? '#A8228A' : '#999' }}
            >
              {t.name}
            </span>
          </button>
        ))}
      </div>
      <div className="p-6 md:p-8">
        {tab.faqs.map(([q, a], i) => (
          <div key={i} className="border-b last:border-b-0" style={{ borderColor: '#EEF0F8' }}>
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-start justify-between gap-4 py-4 text-left"
            >
              <span className="font-jost font-bold text-sm" style={{ color: '#06103C' }}>
                {q}
              </span>
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs"
                style={{
                  borderColor: openIdx === i ? '#06103C' : '#E6E8F0',
                  background: openIdx === i ? '#06103C' : 'transparent',
                  color: openIdx === i ? '#fff' : '#999',
                }}
              >
                {openIdx === i ? '−' : '+'}
              </span>
            </button>
            {openIdx === i && (
              <p className="font-jost text-sm text-gray-600 pb-4 leading-relaxed">{a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map(([q, a], i) => (
        <div
          key={i}
          className="rounded-xl border bg-white overflow-hidden"
          style={{ borderColor: '#E6E8F0' }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
          >
            <span className="font-jost font-bold text-sm md:text-base" style={{ color: '#06103C' }}>
              {i + 1}. {q}
            </span>
            <span className="flex-shrink-0 text-lg" style={{ color: '#A8228A' }}>
              {open === i ? '−' : '+'}
            </span>
          </button>
          {open === i && (
            <p className="font-jost text-sm text-gray-600 px-5 pb-5 leading-relaxed">{a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ElectricUtilitiesTransmissionPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          className="min-h-[70vh] flex items-center relative overflow-hidden"
          style={{ background: '#06103C' }}
        >
          <video src="/videos/Utilities & Transmission Operators.mov" autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" aria-label="Utilities and transmission power infrastructure" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
            <div className="max-w-3xl">
              <span className="font-jost text-sm uppercase tracking-wider" style={{ color: '#A8228A' }}>
                Industries We Serve
              </span>
              <h1 className="font-urbanist font-black text-3xl md:text-4xl text-white mt-4 mb-6 leading-tight">
                Engineering Support for Reliable, Compliant, and Future Ready Power Systems
              </h1>
              <p className="font-jost text-white/80 mb-8">
                We provide transmission planning, power system studies, substation
                engineering, renewable energy integration, and NERC compliance support
                to help utilities maintain reliable, resilient, and efficient power
                systems.
              </p>
              <a
                href="https://calendly.com/keentel-engineering/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full px-8 py-4 font-jost font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
              >
                Schedule a Consultation
              </a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="font-jost text-gray-600 mb-10 leading-relaxed">
              At Keentel Engineering, we provide specialized engineering services to
              electric utilities, transmission owners, and grid operators. Our team
              supports grid reliability, infrastructure planning, regulatory
              compliance, and system modernization through advanced power system
              analysis and engineering solutions.
            </p>
            <h2 className="font-urbanist font-black text-2xl md:text-3xl mb-4" style={{ color: '#06103C' }}>
              Engineering Services for Utilities and Transmission Operators
            </h2>
            <p className="font-jost text-gray-600">
              Utilities require comprehensive engineering support across multiple
              areas of grid operation and planning. Keentel Engineering provides a
              wide range of services tailored to the needs of transmission system
              operators and electric utilities.
            </p>
          </div>
        </section>

        {/* Core services grid */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreServices.map((s) => (
                <div
                  key={s.title}
                  className="bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: '#E6E8F0' }}
                >
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3
                      className="font-urbanist font-bold text-base mb-3"
                      style={{ color: '#06103C' }}
                    >
                      {s.title}
                    </h3>
                    {s.desc && (
                      <p className="font-jost text-sm text-gray-600 mb-3">{s.desc}</p>
                    )}
                    <ul className="font-jost text-sm text-gray-600 space-y-1.5 list-disc pl-4">
                      {s.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2
              className="font-urbanist font-black text-3xl text-center mb-12"
              style={{ color: '#06103C' }}
            >
              Benefits of Working with Keentel Engineering
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  style={{ borderColor: '#E6E8F0' }}
                >
                  <div
                    className="w-20 h-20 rounded-full border-4 mx-auto mb-4 flex items-center justify-center font-urbanist font-bold"
                    style={{ borderColor: '#8C1C1C', color: '#06103C' }}
                  >
                    {b.step}
                  </div>
                  <h3 className="font-urbanist font-bold text-base mb-2" style={{ color: '#06103C' }}>
                    {b.title}
                  </h3>
                  <p className="font-jost text-sm text-gray-600">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supporting utilities */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-urbanist font-black text-2xl md:text-3xl mb-4" style={{ color: '#06103C' }}>
                Supporting Utilities in a Changing Grid
              </h2>
              <p className="font-jost text-gray-600 mb-4">
                Electric utilities are navigating a rapidly evolving energy
                landscape. Increased electrification, renewable integration, and
                grid modernization initiatives require advanced engineering
                solutions.
              </p>
              <p className="font-jost text-gray-600">
                Keentel Engineering works closely with utilities and transmission
                operators to deliver engineering studies, system planning support,
                and infrastructure design that enable a more reliable and resilient
                electric grid.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/industries/electric-utilities-transmission/grid-techs.webp"
                alt="Two technicians working on electrical equipment, one using a laptop."
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Software FAQ widget */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2
              className="font-urbanist font-black text-3xl text-center mb-12"
              style={{ color: '#06103C' }}
            >
              Our Software Capabilities
            </h2>
            <SoftwareFaqWidget />
          </div>
        </section>

        {/* Why choose us */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-urbanist font-black text-3xl mb-4" style={{ color: '#06103C' }}>
              Why Choose Keentel Engineering
            </h2>
            <p className="font-jost text-gray-600 mb-10 max-w-2xl">
              Keentel Engineering delivers practical engineering solutions for
              transmission systems, substations, renewable energy integration, and
              power system reliability, helping clients navigate the challenges of
              a rapidly evolving electric grid.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                'Expertise in HV, MV, and EHV power systems',
                'Advanced power system modeling capabilities',
                'Experience with utility and ISO planning requirements',
                'Deep understanding of NERC reliability standards',
                'Practical engineering solutions for complex power system challenges',
              ].map((t) => (
                <div
                  key={t}
                  className="bg-white rounded-2xl border p-6"
                  style={{ borderColor: '#E6E8F0' }}
                >
                  <h3 className="font-urbanist font-bold text-base" style={{ color: '#06103C' }}>
                    {t}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Contact */}
        <section className="py-24" style={{ background: '#06103C' }}>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-urbanist font-black text-3xl text-white mb-4">
                Contact Keentel Engineering
              </h2>
              <p className="font-jost text-white/80 mb-4">
                Whether you are planning transmission upgrades, integrating
                renewable energy resources, improving grid reliability, or
                addressing regulatory compliance requirements, Keentel Engineering
                provides the technical expertise needed to support critical
                utility infrastructure projects.
              </p>
              <p className="font-jost text-white/80 mb-8">
                Our team works closely with electric utilities, transmission
                operators, renewable energy developers, and industrial facilities
                to deliver practical engineering solutions that improve system
                performance, reliability, and long-term operational success.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://calendly.com/keentel-engineering/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full px-8 py-4 font-jost font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
                >
                  Schedule A Consultation
                </a>
                <a
                  href="tel:813-389-7871"
                  className="inline-block rounded-full px-8 py-4 font-jost font-semibold text-white border border-white/20"
                >
                  813-389-7871
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/industries/electric-utilities-transmission/contact-techs.png"
                alt="Two technicians working on electrical equipment, one using a laptop."
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mb-10">
              <h2 className="font-urbanist font-black text-3xl mb-3" style={{ color: '#06103C' }}>
                Who We&apos;ve Served
              </h2>
              <p className="font-jost text-gray-600">
                Serving utilities, EPCs, developers, and infrastructure
                organizations supporting critical power systems nationwide.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {clientLogos.map((logo) => (
                <div
                  key={logo}
                  className="rounded-2xl border flex items-center justify-center p-8 min-h-[150px]"
                  style={{ borderColor: '#E6E8F0' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/clients/${logo}.png`}
                    alt="Client logo"
                    className="max-h-20 max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
          <div className="max-w-6xl mx-auto px-6">
            <h2
              className="font-urbanist font-black text-3xl text-center mb-12"
              style={{ color: '#06103C' }}
            >
              Frequently Asked Questions
            </h2>
            <FaqAccordion />
          </div>
        </section>

        {/* Blog CTA (lightweight, links to blog hub) */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-urbanist font-black text-2xl mb-4" style={{ color: '#06103C' }}>
              Keentel&apos;s Grid IQ
            </h2>
            <p className="font-jost text-gray-600 mb-6">
              Explore our latest insights on grid reliability, NERC compliance,
              and power system engineering.
            </p>
            <Link
              href="/blog"
              className="inline-block rounded-full px-8 py-4 font-jost font-semibold"
              style={{ background: '#06103C', color: '#fff' }}
            >
              View All Articles
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
