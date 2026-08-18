'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SoftwareTools from '@/components/sections/SoftwareTools';
import WhoWeServed from '@/components/service/WhoWeServed';
import FAQ from '@/components/sections/FAQ';
import ContactForm from '@/components/sections/ContactForm';
import RelatedServiceBlogs from '@/components/service/RelatedServiceBlogs';

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

export default function ElectricUtilitiesTransmissionPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip bg-white">
        <section className="relative flex min-h-[calc(100svh-var(--site-header-height))] items-end overflow-hidden bg-[#050D31] pt-32 lg:items-center">
          <video src="/videos/Utilities & Transmission Operators.mov" autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" aria-label="Utilities and transmission power infrastructure" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,13,49,0.97)_0%,rgba(5,13,49,0.88)_42%,rgba(5,13,49,0.28)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,13,49,0.96)_0%,transparent_55%)] lg:hidden" />
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:py-24">
            <div className="max-w-4xl">
              <div className="mb-6 flex items-center gap-3"><span className="h-px w-10 bg-[#EE58C4]" /><span className="font-jost text-xs font-bold uppercase tracking-[0.22em] text-[#F38AD7]">Industries We Serve · Utilities & Transmission</span></div>
              <h1 className="max-w-4xl font-urbanist text-4xl font-black leading-[1.03] tracking-[-0.035em] text-white sm:text-5xl lg:text-[4.25rem]">Engineering support for reliable, compliant, and future-ready power systems.</h1>
              <p className="mt-7 max-w-2xl font-jost text-base leading-7 text-white/75 sm:text-lg">We provide transmission planning, power system studies, substation engineering, renewable energy integration, and NERC compliance support to help utilities maintain reliable, resilient, and efficient power systems.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#C82DA0] to-[#832478] px-7 font-jost text-sm font-bold text-white shadow-[0_16px_35px_rgba(168,34,138,.32)] transition hover:-translate-y-0.5">Schedule a Consultation <span className="ml-2">→</span></a>
                <a href="#utility-services" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 font-jost text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/15">Explore capabilities</a>
              </div>
            </div>
            <div className="mt-14 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-4">
              {[['EHV / HV / MV', 'System expertise'], ['NERC', 'Compliance support'], ['ISO / RTO', 'Planning alignment'], ['Grid-ready', 'Engineering output']].map(([value, label]) => <div key={label} className="bg-[#07113D]/85 px-4 py-4 backdrop-blur-md sm:px-5"><p className="font-urbanist text-sm font-black text-white sm:text-base">{value}</p><p className="mt-1 font-jost text-[0.65rem] uppercase tracking-wider text-white/50">{label}</p></div>)}
            </div>
          </div>
        </section>

        <section className="relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:px-10">
            <div><p className="font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#A8228A]">Utility engineering partner</p><h2 className="mt-4 font-urbanist text-3xl font-black leading-tight tracking-[-0.025em] text-[#06103C] sm:text-4xl">Engineering Services for Utilities and Transmission Operators</h2></div>
            <div className="border-l-2 border-[#A8228A]/20 pl-6 sm:pl-9"><p className="font-jost text-lg leading-8 text-[#343B55]">At Keentel Engineering, we provide specialized engineering services to electric utilities, transmission owners, and grid operators. Our team supports grid reliability, infrastructure planning, regulatory compliance, and system modernization through advanced power system analysis and engineering solutions.</p><p className="mt-5 font-jost leading-7 text-gray-600">Utilities require comprehensive engineering support across multiple areas of grid operation and planning. Keentel Engineering provides a wide range of services tailored to the needs of transmission system operators and electric utilities.</p></div>
          </div>
        </section>

        <section id="utility-services" className="bg-[#F3F5FA] py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mb-12 grid gap-5 lg:grid-cols-[1fr_.55fr] lg:items-end"><div><p className="font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#A8228A]">End-to-end capabilities</p><h2 className="mt-4 font-urbanist text-3xl font-black tracking-[-0.025em] text-[#06103C] sm:text-4xl lg:text-5xl">Critical support across the utility lifecycle.</h2></div><p className="max-w-lg font-jost leading-7 text-gray-600 lg:justify-self-end">Explore a coordinated range of planning, compliance, infrastructure, and modeling capabilities built for complex utility environments.</p></div>
            <div className="border-t-2 border-[#06103C]">
              {coreServices.map((service, index) => (
                <article key={service.title} className="grid gap-6 border-b border-[#BFC5D2] py-10 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-16">
                  <div className="flex items-center gap-4 lg:col-span-1 lg:block lg:self-start">
                    <span className="font-urbanist text-4xl font-black text-[#A8228A]/20 sm:text-5xl">0{index + 1}</span>
                    <span className="h-px flex-1 bg-[#A8228A]/30 lg:mt-5 lg:block lg:w-full" />
                  </div>

                  <div className={`relative min-h-[250px] overflow-hidden sm:min-h-[360px] lg:col-span-5 lg:min-h-[390px] ${index % 2 === 1 ? 'lg:order-3' : ''}`}>
                    <Image src={service.image} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover transition-transform duration-700 hover:scale-[1.025]" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-[#06103C]/10" />
                  </div>

                  <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2 lg:pr-10' : 'lg:pl-6'}`}>
                    <p className="font-jost text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#A8228A]">Utility capability · 0{index + 1}</p>
                    <h3 className="mt-3 font-urbanist text-2xl font-black leading-tight tracking-[-0.02em] text-[#06103C] sm:text-3xl lg:text-4xl">{service.title}</h3>
                    {service.desc && <p className="mt-5 max-w-xl font-jost text-base leading-7 text-gray-600 sm:text-lg">{service.desc}</p>}
                    <div className="mt-7 grid gap-x-7 gap-y-3 sm:grid-cols-2">
                      {service.items.map((item) => (
                        <div key={item} className="flex items-start gap-3 border-t border-[#CDD2DD] pt-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A8228A]" />
                          <span className="font-jost text-sm leading-5 text-[#343B55]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#06103C] py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20"><div><p className="font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#F075D2]">Why Keentel</p><h2 className="mt-4 font-urbanist text-3xl font-black leading-tight text-white sm:text-4xl">Benefits of Working with Keentel Engineering</h2><p className="mt-5 font-jost leading-7 text-white/60">A disciplined engineering workflow built around defensible analysis, compliance, and utility-ready delivery.</p></div><div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-2">{benefits.map((b, index) => <div key={b.title} className="bg-[#091647] p-7 sm:p-8"><div className="flex items-center justify-between"><span className="font-jost text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#F075D2]">{b.step}</span><span className="font-urbanist text-3xl font-black text-white/10">0{index + 1}</span></div><h3 className="mt-8 font-urbanist text-lg font-bold text-white">{b.title}</h3><p className="mt-3 font-jost text-sm leading-6 text-white/60">{b.desc}</p></div>)}</div></div>
          </div>
        </section>

        <section className="py-20 sm:py-24 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10"><div className="relative"><div className="absolute -inset-5 rounded-[2.25rem] bg-[#A8228A]/10" /><div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[0_30px_70px_rgba(6,16,60,.18)]"><Image src="/images/industries/electric-utilities-transmission/grid-techs.webp" alt="Two technicians working on electrical equipment, one using a laptop." fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div><div className="absolute -bottom-6 right-4 rounded-2xl bg-[#06103C] px-6 py-5 shadow-xl sm:right-8"><p className="font-urbanist text-xl font-black text-white">Reliable by design.</p><p className="mt-1 font-jost text-xs text-white/55">Planning through modernization</p></div></div><div><p className="font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#A8228A]">Modern grid demands</p><h2 className="mt-4 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl">Supporting Utilities in a Changing Grid</h2><p className="mt-6 font-jost text-lg leading-8 text-[#343B55]">Electric utilities are navigating a rapidly evolving energy landscape. Increased electrification, renewable integration, and grid modernization initiatives require advanced engineering solutions.</p><p className="mt-5 font-jost leading-7 text-gray-600">Keentel Engineering works closely with utilities and transmission operators to deliver engineering studies, system planning support, and infrastructure design that enable a more reliable and resilient electric grid.</p></div></div>
        </section>

        <SoftwareTools heading="Our Software Capabilities" />

        <ContactForm source="electric-utilities-transmission" />

        <WhoWeServed showHeading />

        <FAQ
          items={faqs.map(([q, a]) => ({ q, a }))}
          eyebrow="Utility Engineering FAQ"
          title={<>Frequently Asked<br />Questions</>}
          description="Straight answers to common questions about utility studies, planning, compliance, and grid modernization."
        />

        <section className="py-16 sm:py-20"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><div className="flex flex-col items-start justify-between gap-7 rounded-[1.75rem] bg-[linear-gradient(115deg,#F6EAF3,#EEF1FA)] p-7 sm:p-10 lg:flex-row lg:items-center"><div><p className="font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#A8228A]">Keentel&apos;s Grid IQ</p><h2 className="mt-3 font-urbanist text-2xl font-black text-[#06103C] sm:text-3xl">Engineering insight for a changing grid.</h2><p className="mt-3 font-jost text-gray-600">Explore our latest insights on grid reliability, NERC compliance, and power system engineering.</p></div><Link href="/blog" className="inline-flex min-h-13 shrink-0 items-center justify-center rounded-full bg-[#06103C] px-7 py-4 font-jost text-sm font-bold text-white transition hover:-translate-y-0.5">View All Articles <span className="ml-2">→</span></Link></div></div></section>
        <RelatedServiceBlogs terms={['utility', 'transmission', 'grid reliability', 'NERC']} title="Utility & Transmission Insights" />
      </main>
      <Footer />
    </>
  );
}
