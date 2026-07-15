'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const softwareTools = [
  {
    key: 'psse',
    name: 'PSS®E',
    logo: '/images/software-logos/psse.png',
    general: [
      ['What is PSS®E software?', 'PSS®E (Power System Simulator for Engineering) is a power system simulation software developed by Siemens for analyzing and planning electrical transmission networks. It allows engineers to model large-scale power systems and perform detailed studies related to grid reliability and system performance.'],
      ['What is PSS®E used for in power system studies?', 'PSS®E is used for transmission planning, interconnection studies, contingency analysis, stability simulations, and grid expansion planning.'],
      ['Who uses PSS®E software?', 'PSS®E is used by electric utilities, transmission planners, system operators, renewable energy developers, engineering consulting firms, and research institutions.'],
      ['Can PSS®E be used for renewable energy integration?', 'Yes. PSS®E supports modeling of inverter-based resources such as solar plants, wind farms, and battery energy storage systems.'],
      ['Why is PSS®E widely used in transmission planning?', 'It supports very large power system models, advanced dynamic simulations, and automated analysis workflows.'],
    ],
    technical: [
      ['How does PSS®E perform contingency analysis?', 'PSS®E evaluates system reliability by simulating outage scenarios and identifying voltage violations or thermal overloads.'],
      ['What types of dynamic simulations can be performed in PSS®E?', 'PSS®E supports transient stability analysis, generator dynamics simulation, renewable inverter modeling, and disturbance response studies.'],
      ['What is PV and QV analysis in PSS®E?', 'PV and QV analysis evaluate voltage stability margins under increasing load conditions.'],
      ['How does PSS®E support large power system models?', 'PSS®E uses optimized numerical algorithms and sparse matrix techniques to simulate networks with up to 200,000 buses.'],
      ['Can PSS®E simulations be automated?', 'Yes. PSS®E provides extensive Python APIs for automating contingency studies and batch simulations.'],
    ],
  },
  {
    key: 'etap',
    name: 'ETAP',
    logo: '/images/software-logos/etap.png',
    general: [
      ['What is ETAP software?', 'ETAP is an electrical power system engineering platform used for designing, simulating, analyzing, and operating electrical networks across industrial, utility, and commercial systems.'],
      ['What types of studies can be performed in ETAP?', 'ETAP supports power flow analysis, short circuit studies, arc flash analysis, protection coordination studies, harmonic analysis, and dynamic stability simulations.'],
      ['What industries use ETAP software?', 'ETAP is used by electric utilities, renewable energy plants, data centers, oil and gas facilities, and industrial manufacturing plants.'],
      ['What is the ETAP Electrical Digital Twin?', 'A virtual representation of a real electrical network used to simulate and monitor system performance before implementing changes.'],
      ['Why is ETAP widely used for electrical engineering studies?', 'ETAP provides an integrated platform for design, simulation, monitoring, and optimization of electrical systems.'],
    ],
    technical: [
      ['How does ETAP perform short circuit analysis?', 'ETAP calculates fault currents using ANSI/IEEE C37 and IEC 60909 standards to evaluate equipment ratings and protection requirements.'],
      ['What is ETAP arc flash analysis?', 'Arc flash analysis calculates incident energy levels and safety boundaries based on IEEE 1584 and NFPA 70E.'],
      ['How does ETAP perform protection coordination studies?', 'ETAP uses Time-Current Characteristic (TCC) curves to evaluate coordination between relays, breakers, and fuses.'],
      ['Can ETAP simulate renewable energy systems?', 'Yes. ETAP can model solar PV systems, wind generators, battery storage, and microgrids.'],
      ['What dynamic simulations can be performed in ETAP?', 'ETAP evaluates system behavior during generator trips, faults, motor starting events, and switching operations.'],
    ],
  },
  {
    key: 'pscad',
    name: 'PSCAD',
    logo: '/images/software-logos/pscad.png',
    general: [
      ['What is PSCAD software?', 'PSCAD is an electromagnetic transient (EMT) simulation software used to analyze fast electrical phenomena in power systems.'],
      ['What is PSCAD used for?', 'PSCAD is used for HVDC studies, converter modeling, renewable inverter simulations, and lightning surge analysis.'],
      ['Who typically uses PSCAD?', 'PSCAD is used by utilities, renewable developers, equipment manufacturers, and research institutions.'],
      ['Why is PSCAD important for renewable energy studies?', 'PSCAD allows engineers to simulate inverter-based resources and complex electromagnetic interactions.'],
      ['What types of systems can PSCAD model?', 'PSCAD can model transmission networks, HVDC systems, renewable plants, and power electronic converters.'],
    ],
    technical: [
      ['What is electromagnetic transient simulation?', 'EMT simulation analyzes high-frequency electrical phenomena that occur during switching events and converter operations.'],
      ['How does PSCAD model transmission lines?', 'PSCAD uses distributed parameter models that capture traveling wave behavior.'],
      ['What simulation time steps are used in PSCAD?', 'Typical EMT simulations use time steps ranging from microseconds to tens of microseconds.'],
      ['Can PSCAD simulate HVDC systems?', 'Yes. PSCAD provides detailed models for LCC and VSC HVDC systems.'],
      ['How does PSCAD simulate inverter-based resources?', 'PSCAD uses detailed converter control models to simulate grid-forming and grid-following inverter behavior.'],
    ],
  },
  {
    key: 'powerworld',
    name: 'PowerWorld',
    logo: '/images/software-logos/powerworld.jpg',
    general: [
      ['What is PowerWorld software?', 'PowerWorld is a power system simulation and visualization software used to analyze electrical transmission networks.'],
      ['What is PowerWorld Simulator?', 'An interactive tool used to perform power flow analysis, contingency analysis, and voltage stability studies.'],
      ['Who uses PowerWorld software?', 'PowerWorld is used by utilities, transmission planners, system operators, and consultants.'],
      ['What types of studies can be performed in PowerWorld?', 'Power flow, contingency analysis, optimal power flow, voltage stability, and fault analysis.'],
      ['What makes PowerWorld unique?', 'Interactive visualization tools such as animated one-line diagrams and geographic system displays.'],
    ],
    technical: [
      ['How does PowerWorld perform contingency analysis?', 'PowerWorld simulates outage scenarios and identifies violations such as overloaded lines or low voltage conditions.'],
      ['What numerical methods are used for power flow analysis?', 'PowerWorld typically uses Newton-Raphson algorithms for efficient large-system solutions.'],
      ['What is PV and QV analysis in PowerWorld?', 'PV and QV curves evaluate voltage stability limits and potential voltage collapse scenarios.'],
      ['What is Optimal Power Flow (OPF)?', 'OPF determines optimal generation dispatch while maintaining system constraints.'],
      ['How large of a system can PowerWorld simulate?', 'PowerWorld can simulate networks with up to approximately 250,000 buses.'],
    ],
  },
  {
    key: 'skm',
    name: 'SKM PTW',
    logo: '/images/software-logos/skm.png',
    general: [
      ['What is SKM PowerTools software?', 'SKM PowerTools is an electrical engineering platform used for power system design, analysis, and safety evaluation.'],
      ['What types of studies can SKM perform?', 'Load flow, short circuit, arc flash, protection coordination, harmonic, and grounding studies.'],
      ['What industries use SKM PowerTools?', 'Utilities, industrial plants, data centers, and oil and gas facilities.'],
      ['What is SKM CAPTOR used for?', 'CAPTOR is SKM\u2019s protective device coordination module used to analyze relay, breaker, and fuse coordination.'],
      ['Why is SKM widely used for electrical system analysis?', 'It provides integrated modules allowing engineers to perform multiple electrical studies in a single platform.'],
    ],
    technical: [
      ['How does SKM perform short circuit analysis?', 'SKM calculates fault currents using ANSI and IEC standards.'],
      ['What is arc flash analysis in SKM?', 'Arc flash analysis determines incident energy levels and hazard boundaries per IEEE 1584.'],
      ['How does SKM perform load flow analysis?', 'Load flow analysis calculates voltage levels, power flows, and system losses.'],
      ['Can SKM simulate harmonic distortion?', 'Yes. The HI_WAVE module evaluates harmonic distortion caused by non-linear loads.'],
      ['How does SKM evaluate protection coordination?', 'SKM analyzes protective device operation using time-current curves.'],
    ],
  },
];

const clientLogos = [
  'RRC-ae225119', 'PAE-864f5ced', '49-752adf6f', '48-816ccd8f', '47-363a19ec',
  '46-ff7bc11f', '45-dfb687e0', '44-18370d1d', '43-10240e91',
];

function SoftwareFaqWidget() {
  const [active, setActive] = useState('psse');
  const [openQ, setOpenQ] = useState<string | null>(null);
  const current = softwareTools.find((t) => t.key === active)!;

  return (
    <div className="bg-white">
      <div className="text-center pt-6 pb-2 px-4">
        <h2 className="font-urbanist font-black text-3xl md:text-4xl" style={{ color: '#1A1F6E' }}>
          Our Software Capabilities
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-3 px-4 py-4">
        {softwareTools.map((t) => (
          <button
            key={t.key}
            onClick={() => { setActive(t.key); setOpenQ(null); }}
            className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-4 py-3 min-w-[100px] transition-all ${
              active === t.key ? 'shadow-lg -translate-y-0.5' : 'hover:-translate-y-0.5'
            }`}
            style={{ borderColor: active === t.key ? '#A62490' : '#E4E7F2', background: active === t.key ? '#FDF5FC' : '#fff' }}
          >
            <img src={t.logo} alt={t.name} className="h-9 max-w-[100px] object-contain" />
            <span
              className="font-jost text-[10px] font-extrabold uppercase tracking-wide"
              style={{ color: active === t.key ? '#A62490' : '#bbb' }}
            >
              {t.name}
            </span>
          </button>
        ))}
      </div>
      <div className="h-[3px] mx-5 rounded" style={{ background: 'linear-gradient(90deg,#1A1F6E,#A62490,#8B1A1A)' }} />
      <div className="grid grid-cols-1 md:grid-cols-2">
        {[{ label: 'General FAQs', items: current.general, prefix: 'g' }, { label: 'Technical FAQs', items: current.technical, prefix: 't' }].map((col) => (
          <div key={col.prefix} className="p-5 md:p-6 md:border-r last:border-r-0" style={{ borderColor: '#EEF0F8' }}>
            <div
              className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest mb-3 pb-2.5 border-b-2"
              style={{ color: '#1A1F6E', borderColor: '#EEF0F8' }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: '#A62490' }} />
              {col.label}
            </div>
            {col.items.map(([q, a], i) => {
              const id = `${active}-${col.prefix}-${i}`;
              const isOpen = openQ === id;
              return (
                <div key={id} className="border-b last:border-b-0" style={{ borderColor: '#EEF0F8' }}>
                  <button
                    onClick={() => setOpenQ(isOpen ? null : id)}
                    className="w-full flex items-start gap-3 py-3 text-left"
                  >
                    <span
                      className="flex-1 font-jost text-sm font-bold pt-0.5"
                      style={{ color: isOpen ? '#A62490' : '#1A1F6E' }}
                    >
                      {q}
                    </span>
                    <span
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform"
                      style={{
                        borderColor: isOpen ? '#1A1F6E' : '#e4e7f2',
                        background: isOpen ? '#1A1F6E' : 'transparent',
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 4l4 4 4-4" stroke={isOpen ? '#fff' : '#999'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <p className="font-jost text-[13.5px] text-gray-500 pb-3.5 pl-0 leading-relaxed">{a}</p>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex justify-center border-t py-4 px-5" style={{ borderColor: '#EEF0F8' }}>
        <Link
          href="https://keentelengineering.com/software-capabilities-faqs"
          target="_blank"
          className="inline-flex items-center gap-2 rounded px-7 py-3 font-jost text-xs font-extrabold uppercase tracking-wider text-white"
          style={{ background: '#8B1A1A' }}
        >
          See All FAQs About {current.name}
        </Link>
      </div>
    </div>
  );
}

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs: [string, string][] = [
    ['Why are short circuit studies important for industrial plants?', 'They ensure electrical equipment can safely withstand fault currents and prevent catastrophic failure.'],
    ['What is arc flash analysis?', 'It evaluates energy released during an electrical arc fault to determine safety zones and PPE requirements.'],
    ['What causes harmonics in industrial systems?', 'Variable frequency drives, rectifiers, and other power electronic equipment can introduce harmonic distortion.'],
    ['What are NERC reliability standards?', 'NERC reliability standards ensure that only the faulted portion of the system is isolated, minimizing downtime.'],
    ['What industries require these studies?', 'Manufacturing, chemical processing, heavy industry, and industrial plants with complex electrical networks.'],
    ['How do load flow studies benefit industrial facilities?', 'They identify voltage drops, energy losses, and potential overloads before equipment failures occur.'],
    ['Can Keentel assist with renewable integration in industrial facilities?', 'Yes, we evaluate solar, wind, and storage integration to ensure stability and reliability.'],
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-white/15">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-jost text-base md:text-lg font-bold text-white">{i + 1}. {q}</span>
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full border border-white/30 flex items-center justify-center transition-transform"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            {isOpen && <p className="font-jost text-white/70 pb-5 leading-relaxed">{a}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default function IndustrialPowerEngineeringPage() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section
          className="relative min-h-[70vh] flex items-center overflow-hidden"
        >
          <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover"><source src="/videos/Industrial & Manufacturing Facilities.mp4" type="video/mp4" /></video>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(6,16,60,.96), rgba(6,16,60,.72) 60%, rgba(6,16,60,.35))' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
            <div className="max-w-3xl">
              <h1 className="font-urbanist font-black text-3xl md:text-5xl text-white leading-tight mb-6">
                Reliable Power System Engineering for Industrial Electrical Infrastructure
              </h1>
              <p className="font-jost text-white/80 text-lg mb-8">
                Specialized electrical solutions for manufacturing and industrial facilities to ensure safe, efficient, and uninterrupted operations.
              </p>
              <Link
                href="https://calendly.com/keentel-engineering/15min"
                target="_blank"
                className="inline-block rounded-full px-8 py-4 font-jost font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>

        {/* INDUSTRIAL POWER SYSTEM STUDIES */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-jost text-gray-700 mb-6">
              At Keentel Engineering, we provide specialized electrical engineering services tailored to industrial plants, manufacturing facilities, and processing operations. Our solutions help clients design safe, efficient, and compliant electrical systems, reduce downtime, and improve operational performance.
            </p>
            <h2 className="font-urbanist font-black text-3xl md:text-4xl mb-4">Industrial Power System Studies</h2>
            <p className="font-jost text-gray-600">
              Industrial electrical systems often involve complex distribution networks, multiple substations, and high-demand processes. Keentel Engineering performs detailed studies to ensure safety, reliability, and compliance, including:
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { title: 'Transmission Planning', desc: 'Support grid expansion through power flow, contingency, and stability studies to identify constraints and improve system reliability.', href: '/service/power-system-studies' },
              { title: 'Load Flow Analysis', desc: 'Evaluate voltage stability, load distribution, and losses to ensure efficient power performance during normal and peak demand.', href: '/service/power-system-studies' },
              { title: 'Short Circuit Studies', desc: 'Determine fault current levels, validate equipment ratings, and verify protection devices operate correctly during abnormal system events.', href: '/service/power-system-studies' },
              { title: 'Protective Coordination', desc: 'Optimize relay and breaker settings using time-current analysis to isolate faults quickly and minimize system disruption.', href: '/service/power-system-studies' },
              { title: 'Harmonic Analysis', desc: 'Detect waveform distortion from inverter sources and nonlinear loads through harmonic analysis and mitigation studies.', href: '/service/power-system-studies' },
              { title: 'Grounding Protection', desc: 'Reduce step and touch voltage risks through grounding studies, fault analysis, and protection performance evaluation.', href: '/service/power-system-studies' },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border bg-white p-6 hover:shadow-xl hover:-translate-y-1 transition-all" style={{ borderColor: '#E6E8F0' }}>
                <h3 className="font-urbanist font-bold text-lg mb-3">{c.title}</h3>
                <p className="font-jost text-sm text-gray-600 mb-4">{c.desc}</p>
                <Link href={c.href} className="font-jost text-sm font-semibold" style={{ color: '#A8228A' }}>
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ELECTRICAL SYSTEM DESIGN (dark section) */}
        <section className="py-20 px-6" style={{ background: '#06103C' }}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-urbanist font-black text-3xl md:text-4xl text-white mb-6">
                Electrical System Design and Optimization
              </h2>
              <p className="font-jost text-white/80 mb-4">
                Efficient power distribution is critical to operational success in industrial environments. Our engineers support facility teams with:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="font-jost text-white/80 flex gap-2">
                  <span style={{ color: '#A8228A' }}>●</span>
                  Electrical Distribution System Design — designing main and secondary feeders, bus configurations, and redundancy.
                </li>
                <li className="font-jost text-white/80 flex gap-2">
                  <span style={{ color: '#A8228A' }}>●</span>
                  Switchgear and Breaker Specification — selecting equipment rated for load, fault current, and plant safety requirements.
                </li>
              </ul>
              <p className="font-jost text-white/80">
                These designs ensure energy is distributed safely and efficiently across industrial and manufacturing facilities.
              </p>
            </div>
            <div>
              <img src="/images/industries/industrial-power-engineering/electrical-system-design.webp" alt="Electrical system design" className="w-full rounded-2xl" />
            </div>
          </div>
        </section>

        {/* SOFTWARE CAPABILITIES */}
        <section className="py-12 px-4 md:px-6 bg-white">
          <div className="max-w-6xl mx-auto rounded-2xl border overflow-hidden" style={{ borderColor: '#E6E8F0' }}>
            <SoftwareFaqWidget />
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-urbanist font-black text-3xl md:text-5xl mb-4">Why Choose Keentel Engineering</h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-10">
              Keentel Engineering delivers practical engineering solutions for transmission systems, substations, renewable energy integration, and power system reliability, helping clients navigate the challenges of a rapidly evolving electric grid.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                'Expertise in HV, MV, and EHV power systems',
                'Advanced power system modeling capabilities',
                'Experience with utility and ISO planning requirements',
                'Deep understanding of NERC reliability standards',
                'Practical engineering solutions for complex power system challenges',
              ].map((t) => (
                <div key={t} className="rounded-2xl border bg-white p-6 hover:shadow-xl hover:-translate-y-1 transition-all" style={{ borderColor: '#E6E8F0' }}>
                  <h3 className="font-urbanist font-bold text-base">{t}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="py-20 px-6" style={{ background: '#06103C' }}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-urbanist font-black text-3xl md:text-5xl text-white mb-6">
                Contact Keentel Engineering
              </h2>
              <p className="font-jost text-white/80 mb-8">
                Whether you are planning industrial power system upgrades, designing electrical distribution for manufacturing plants, or ensuring reliable operation of mining and processing facilities, Keentel Engineering provides the technical expertise needed to support critical industrial operations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://calendly.com/keentel-engineering/15min"
                  target="_blank"
                  className="inline-block rounded-full px-8 py-4 font-jost font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
                >
                  Schedule A Consultation
                </Link>
                <Link
                  href="tel:813-389-7871"
                  className="inline-block rounded-full px-8 py-4 font-jost font-semibold text-white border border-white/20"
                >
                  813-389-7871
                </Link>
              </div>
            </div>
            <div>
              <img src="/images/industries/industrial-power-engineering/contact-techs.png" alt="Keentel engineers" className="w-full rounded-2xl" />
            </div>
          </div>
        </section>

        {/* CLIENT LOGOS */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="font-urbanist font-black text-3xl md:text-4xl mb-4" style={{ color: '#020659' }}>
              Who We&apos;ve Served
            </h2>
            <p className="font-jost text-gray-600 max-w-2xl mx-auto">
              Serving utilities, EPCs, developers, and infrastructure organizations supporting critical power systems nationwide.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {clientLogos.map((logo) => (
              <div key={logo} className="rounded-2xl border bg-white flex items-center justify-center p-8 min-h-[170px]" style={{ borderColor: 'rgba(2,6,89,.2)' }}>
                <img src={`/images/clients/${logo}.png`} alt="Client logo" className="max-h-[130px] max-w-full object-contain" />
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6" style={{ background: '#06103C' }}>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="font-urbanist font-black text-3xl md:text-4xl text-white">Frequently Asked Questions (FAQ)</h2>
          </div>
          <FaqAccordion />
        </section>

        {/* BLOG CTA */}
        <section className="py-16 px-6 bg-white text-center">
          <h2 className="font-urbanist font-black text-3xl mb-6">Blogs</h2>
          <p className="font-jost text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore Keentel Engineering&apos;s latest insights on power system studies, substation design, and industrial electrical engineering.
          </p>
          <Link
            href="/blog"
            className="inline-block rounded-full px-8 py-4 font-jost font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
          >
            Show More Blogs
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
