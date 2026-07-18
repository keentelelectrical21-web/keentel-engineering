'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const softwareTabs = [
  {
    key: 'psse',
    name: 'PSS®E',
    logo: '/images/software-logos/psse.png',
    faqs: [
      ['What is PSS®E software?', 'PSS®E is a power system simulation software developed by Siemens for analyzing and planning electrical transmission networks.'],
      ['Can it model renewables?', 'Yes, including solar plants, wind farms, and battery energy storage systems.'],
      ['Who uses PSS®E?', 'Electric utilities, transmission planners, system operators, renewable developers, and consulting firms.'],
    ],
  },
  {
    key: 'etap',
    name: 'ETAP',
    logo: '/images/software-logos/etap.png',
    faqs: [
      ['What is ETAP software?', 'An electrical power system engineering platform for design, simulation, analysis, and operation of utility and industrial networks.'],
      ['Can ETAP simulate renewables?', 'Yes, solar PV systems, wind generators, battery energy storage systems, and microgrids.'],
    ],
  },
  {
    key: 'pscad',
    name: 'PSCAD',
    logo: '/images/software-logos/pscad.png',
    faqs: [
      ['What is PSCAD used for?', 'HVDC studies, converter modeling, renewable inverter simulations, and lightning surge analysis.'],
      ['Why is PSCAD important for renewables?', 'It simulates inverter-based resources and complex electromagnetic interactions within modern power systems.'],
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
      ['Can SKM simulate harmonics?', 'Yes, the HI_WAVE module evaluates harmonic distortion caused by non-linear loads and power electronic devices.'],
    ],
  },
];

const services = [
  {
    title: 'Engineering Services for Renewable Energy Projects',
    image: '/images/industries/renewable-interconnection-engineering/data-center.webp',
    desc: 'Keentel Engineering provides comprehensive power system studies and engineering services tailored to renewable energy developers.',
    items: [
      'Interconnection feasibility studies',
      'System impact and facility studies',
      'Load flow and power flow analysis',
      'Short circuit and protection coordination studies',
      'Transient stability and dynamic modeling',
      'Harmonic and power quality analysis',
      'Reactive power and voltage stability studies',
      'Grid compliance verification',
    ],
  },
  {
    title: 'Solar, Wind and Battery Energy Storage Projects',
    image: '/images/industries/renewable-interconnection-engineering/solar-wind-bess.webp',
    desc: 'Renewable energy systems introduce unique challenges due to inverter-based technology and variable generation output. Our engineers support projects including:',
    items: [
      'Utility-scale solar farms',
      'Onshore wind power plants',
      'Battery energy storage systems (BESS)',
      'Hybrid renewable facilities',
    ],
  },
  {
    title: 'Grid Code Compliance',
    image: '/images/industries/renewable-interconnection-engineering/grid-code-hvac.webp',
    desc: 'Renewable developers must demonstrate compliance with regional interconnection requirements. Keentel Engineering supports studies required by:',
    items: ['ERCOT', 'PJM', 'CAISO', 'MISO', 'SPP', 'WECC utilities'],
  },
  {
    title: 'Advanced Modeling of Inverter-Based Resources',
    image: '/images/industries/renewable-interconnection-engineering/inverter-modeling.webp',
    desc: 'Modern renewable plants rely on advanced inverter technologies. Keentel Engineering performs detailed modeling of:',
    items: [
      'Inverter control systems',
      'Reactive power capabilities',
      'Fault ride-through performance',
      'Weak grid interactions',
    ],
  },
];

const whyChoose = [
  'Expertise in HV, MV, and EHV power systems',
  'Advanced power system modeling capabilities',
  'Experience with utility and ISO planning requirements',
  'Deep understanding of NERC reliability standards',
  'Practical engineering solutions for complex power system challenges',
];

const faqs = [
  ['Why is electrical reliability critical for renewable interconnection?', 'Because grid instability or noncompliance can cause project delays, curtailment, or financial penalties.'],
  ['What is a system impact study?', 'A study that evaluates how a new generation or load project affects the transmission system.'],
  ['Why are harmonic studies important for renewable projects?', 'Because power electronics and inverters can introduce harmonic distortion that affects grid power quality.'],
  ['What grid codes apply to renewable interconnection?', 'Requirements vary by region and may include ERCOT, PJM, CAISO, MISO, SPP, and WECC interconnection standards.'],
  ['How does Keentel Engineering support renewable interconnection?', 'By performing feasibility, system impact, and facility studies along with inverter modeling and grid compliance verification.'],
  ['What is fault ride-through performance?', 'The ability of inverter-based resources to remain connected and stable during grid voltage or frequency disturbances.'],
  ['What is reactive power capability?', 'A measure of how much reactive power a generation resource can supply or absorb to support grid voltage.'],
  ['Why do battery storage projects need interconnection studies?', 'To verify the system can charge, discharge, and respond to grid conditions without compromising reliability.'],
  ['What is weak grid interaction?', 'A phenomenon where inverter-based resources behave unpredictably on transmission systems with low short-circuit strength.'],
  ['Why do renewable developers work with engineering consultants?', 'Consultants provide specialized modeling expertise and help navigate complex interconnection and compliance requirements.'],
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

export default function RenewableInterconnectionEngineeringPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          className="min-h-[70vh] flex items-center relative overflow-hidden"
          style={{ background: '#06103C' }}
        >
          <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover"><source src="/videos/Renewable Energy Developers.mp4" type="video/mp4" /></video>
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
            <div className="max-w-3xl">
              <span className="font-jost text-sm uppercase tracking-wider" style={{ color: '#A8228A' }}>
                Industries We Serve
              </span>
              <h1 className="font-urbanist font-black text-3xl md:text-4xl text-white mt-4 mb-6 leading-tight">
                Engineering Support for Grid Integration and Renewable Power Projects
              </h1>
              <p className="font-jost text-white/80 mb-8">
                Renewable energy developers face complex technical and regulatory
                challenges when connecting solar, wind, and battery energy storage
                projects to the electric grid. Successful project development
                requires accurate power system studies, grid compliance
                verification, and reliable interconnection modeling.
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

        {/* Services with alternating image/text */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 space-y-20">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.title} className="w-full" />
                </div>
                <div>
                  <h2
                    className="font-urbanist font-black text-2xl md:text-3xl mb-4"
                    style={{ color: '#06103C' }}
                  >
                    {s.title}
                  </h2>
                  <p className="font-jost text-gray-600 mb-4">{s.desc}</p>
                  <ul className="font-jost text-gray-600 space-y-2 list-disc pl-5">
                    {s.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Software FAQ widget */}
        <section className="py-20" style={{ background: '#F7F8FC' }}>
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
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-urbanist font-black text-3xl mb-4" style={{ color: '#06103C' }}>
              Why Choose Keentel Engineering
            </h2>
            <p className="font-jost text-gray-600 mb-10 max-w-2xl">
              Keentel Engineering provides mission-critical power system
              engineering solutions for renewable energy developers navigating
              complex interconnection and grid compliance requirements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {whyChoose.map((t) => (
                <div
                  key={t}
                  className="rounded-2xl border p-6"
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

        {/* Contact CTA */}
        <section className="py-24" style={{ background: '#06103C' }}>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-urbanist font-black text-3xl text-white mb-4">
                Let&apos;s Discuss How to Optimize Your Next Project
              </h2>
              <p className="font-jost text-white/80 mb-4">
                Planning a renewable interconnection project? Keentel Engineering
                helps developers improve compliance, reliability, and power system
                performance.
              </p>
              <p className="font-jost text-white/80 mb-8">
                Our engineers support feasibility studies, system impact studies,
                inverter modeling, and grid compliance verification for solar,
                wind, and battery energy storage projects.
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
                src="/images/industries/renewable-interconnection-engineering/contact-techs.png"
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
              {[
                'RRC-ae225119', 'PAE-864f5ced', '49-752adf6f', '48-816ccd8f',
                '47-363a19ec', '46-ff7bc11f', '45-dfb687e0', '44-18370d1d', '43-10240e91',
              ].map((logo) => (
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
              Technical FAQs
            </h2>
            <FaqAccordion />
          </div>
        </section>

        {/* Blog CTA */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-urbanist font-black text-2xl mb-4" style={{ color: '#06103C' }}>
              Keentel&apos;s Grid IQ
            </h2>
            <p className="font-jost text-gray-600 mb-6">
              Explore our latest insights on renewable interconnection, grid
              compliance, and power system engineering.
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
