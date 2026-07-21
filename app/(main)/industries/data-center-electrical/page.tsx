'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SoftwareTools from '@/components/sections/SoftwareTools'
import WhoWeServed from '@/components/service/WhoWeServed'
import FAQ from '@/components/sections/FAQ'
import ContactForm from '@/components/sections/ContactForm'
import RelatedServiceBlogs from '@/components/service/RelatedServiceBlogs'

const services = [
  {
    title: 'Electrical Power System Design for Data Centers',
    image: '/images/industries/data-center-electrical/server-racks.webp',
    desc: 'Keentel Engineering provides power infrastructure engineering for data centers, ensuring reliable and scalable electrical systems capable of supporting high-density computing loads and continuous operations.',
    items: ['Expert system design for high-density computing loads', 'Advanced backup power systems with redundancy for fault tolerance', 'Power quality analysis to address harmonic distortion', 'Risk management and reliability assessments for critical infrastructure', 'Cutting-edge technologies for energy efficiency and sustainability'],
  },
  {
    title: 'Electrical Infrastructure for High-Density Loads',
    image: '/images/industries/data-center-electrical/transformer-substation.webp',
    desc: 'Modern data centers require advanced power system engineering to support large electrical loads and reliable critical-facility operation.',
    items: ['Load flow and capacity analysis', 'Electrical distribution system design', 'Backup power system design'],
  },
  {
    title: 'Backup Power and Redundancy Analysis',
    image: '/images/industries/data-center-electrical/relay-protection.jpg',
    desc: 'Data centers rely on redundant power systems to maintain uptime. Keentel Engineering evaluates the complete backup-power architecture.',
    items: ['Generator backup systems', 'UPS system performance', 'Redundant power distribution paths', 'Continuous operation during equipment failures'],
  },
  {
    title: 'Power Quality and Harmonic Analysis',
    image: '/images/industries/data-center-electrical/blueprint-cnc.webp',
    desc: 'High-density electronic equipment can introduce harmonics into data center electrical systems. Our engineers evaluate power-quality risks to support reliable and efficient distribution.',
    items: ['Harmonic distortion levels', 'Neutral conductor loading', 'Transformer heating effects', 'Power distribution efficiency'],
  },
]

const faqs = [
  ['Why is electrical reliability critical for data centers?', 'Because downtime can cause data loss and major financial impacts.'],
  ['What is N+1 redundancy?', 'A system design that includes an additional backup component beyond what is required.'],
  ['Why are harmonic studies important for data centers?', 'Because power electronics can introduce harmonic distortion.'],
  ['What backup power systems are used in data centers?', 'Generators and uninterruptible power supplies (UPS).'],
  ['How does Keentel Engineering support data center design?', 'By performing electrical system studies, reliability assessments, and power quality analysis.'],
  ['What is data center power system engineering?', 'It involves designing reliable electrical infrastructure to support high-density computing loads and ensure continuous operation.'],
  ['Why is electrical power system design critical for data centers?', 'It ensures system reliability, prevents downtime, and supports backup power and redundancy strategies.'],
  ['What is data center electrical infrastructure engineering?', 'It includes designing power distribution systems, backup power, and power quality solutions for data center operations.'],
] as const

export default function DataCenterElectricalPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip bg-white">
        <section className="relative flex min-h-[780px] items-end overflow-hidden bg-[#050D31] pt-32 sm:min-h-[820px] lg:min-h-[760px] lg:items-center">
          <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover"><source src="/videos/Data Centers & Commercial Infrastructure.mp4" type="video/mp4" /></video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,13,49,.97)_0%,rgba(5,13,49,.88)_43%,rgba(5,13,49,.25)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,13,49,.96)_0%,transparent_58%)] lg:hidden" />
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:py-24">
            <div className="max-w-4xl">
              <div className="mb-6 flex items-center gap-3"><span className="h-px w-10 bg-[#EE58C4]" /><span className="font-jost text-xs font-bold uppercase tracking-[.22em] text-[#F38AD7]">Industries We Serve · Data Centers</span></div>
              <h1 className="max-w-4xl font-urbanist text-4xl font-black leading-[1.03] tracking-[-.035em] text-white sm:text-5xl lg:text-[4.25rem]">Power system engineering for data centers.</h1>
              <p className="mt-7 max-w-2xl font-jost text-base leading-7 text-white/75 sm:text-lg">Data centers and commercial infrastructure require highly reliable electrical systems to support critical operations. Even brief power interruptions can result in significant financial losses and operational disruptions.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#C82DA0] to-[#832478] px-7 font-jost text-sm font-bold text-white shadow-[0_16px_35px_rgba(168,34,138,.32)]">Schedule a Consultation <span className="ml-2">→</span></a><a href="#data-center-capabilities" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 font-jost text-sm font-bold text-white backdrop-blur-sm">Explore capabilities</a></div>
            </div>
            <div className="mt-14 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-4">{[['N+1','Redundancy planning'],['UPS / BESS','Backup systems'],['24 / 7','Mission-critical uptime'],['Grid-ready','Engineering output']].map(([value,label]) => <div key={label} className="bg-[#07113D]/85 px-4 py-4 backdrop-blur-md sm:px-5"><p className="font-urbanist text-sm font-black text-white sm:text-base">{value}</p><p className="mt-1 font-jost text-[.65rem] uppercase tracking-wider text-white/50">{label}</p></div>)}</div>
          </div>
        </section>

        <section className="py-20 sm:py-24 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-20 lg:px-10"><div><p className="font-jost text-xs font-bold uppercase tracking-[.2em] text-[#A8228A]">Mission-critical power partner</p><h2 className="mt-4 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl">Electrical infrastructure engineered for uptime.</h2></div><div className="border-l-2 border-[#A8228A]/20 pl-6 sm:pl-9"><p className="font-jost text-lg leading-8 text-[#343B55]">Our data center power system engineering services combine electrical infrastructure design, power system analysis, and reliability optimization.</p><p className="mt-5 font-jost leading-7 text-gray-600">From utility capacity and distribution architecture to backup power, harmonics, and fault tolerance, our engineers connect every critical decision into a scalable power strategy.</p></div></div></section>

        <section id="data-center-capabilities" className="bg-[#F3F5FA] py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mb-12 grid gap-5 lg:grid-cols-[1fr_.55fr] lg:items-end"><div><p className="font-jost text-xs font-bold uppercase tracking-[.2em] text-[#A8228A]">Critical infrastructure capabilities</p><h2 className="mt-4 font-urbanist text-3xl font-black tracking-[-.025em] text-[#06103C] sm:text-4xl lg:text-5xl">Reliable power from utility service to server rack.</h2></div><p className="max-w-lg font-jost leading-7 text-gray-600 lg:justify-self-end">Explore the design, redundancy, and power-quality work behind resilient high-density computing environments.</p></div>
            <div className="border-t-2 border-[#06103C]">{services.map((service,index) => <article key={service.title} className="grid gap-6 border-b border-[#BFC5D2] py-10 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-16"><div className="flex items-center gap-4 lg:col-span-1 lg:block lg:self-start"><span className="font-urbanist text-4xl font-black text-[#A8228A]/20 sm:text-5xl">0{index+1}</span><span className="h-px flex-1 bg-[#A8228A]/30 lg:mt-5 lg:block lg:w-full" /></div><div className={`relative min-h-[250px] overflow-hidden sm:min-h-[360px] lg:col-span-5 lg:min-h-[390px] ${index%2===1?'lg:order-3':''}`}><Image src={service.image} alt={service.title} fill sizes="(max-width:1024px) 100vw,42vw" className="object-cover transition-transform duration-700 hover:scale-[1.025]" /><div className="absolute inset-0 ring-1 ring-inset ring-[#06103C]/10" /></div><div className={`lg:col-span-6 ${index%2===1?'lg:order-2 lg:pr-10':'lg:pl-6'}`}><p className="font-jost text-[.65rem] font-bold uppercase tracking-[.2em] text-[#A8228A]">Data center capability · 0{index+1}</p><h3 className="mt-3 font-urbanist text-2xl font-black leading-tight text-[#06103C] sm:text-3xl lg:text-4xl">{service.title}</h3><p className="mt-5 max-w-xl font-jost text-base leading-7 text-gray-600 sm:text-lg">{service.desc}</p><div className="mt-7 grid gap-x-7 gap-y-3 sm:grid-cols-2">{service.items.map(item => <div key={item} className="flex items-start gap-3 border-t border-[#CDD2DD] pt-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A8228A]" /><span className="font-jost text-sm leading-5 text-[#343B55]">{item}</span></div>)}</div></div></article>)}</div>
          </div>
        </section>

        <SoftwareTools heading="Our Software Capabilities" />
        <ContactForm source="data-center-electrical" />
        <WhoWeServed showHeading />
        <FAQ items={faqs.map(([q,a]) => ({ q, a }))} eyebrow="Data Center Engineering FAQ" title={<>Technical<br />FAQs</>} description="Straight answers about reliability, redundancy, backup power, harmonics, and data center electrical infrastructure." />
        <section className="py-16 sm:py-20"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><div className="flex flex-col items-start justify-between gap-7 rounded-[1.75rem] bg-[linear-gradient(115deg,#F6EAF3,#EEF1FA)] p-7 sm:p-10 lg:flex-row lg:items-center"><div><p className="font-jost text-xs font-bold uppercase tracking-[.2em] text-[#A8228A]">Keentel&apos;s Grid IQ</p><h2 className="mt-3 font-urbanist text-2xl font-black text-[#06103C] sm:text-3xl">Engineering insight for mission-critical power.</h2><p className="mt-3 font-jost text-gray-600">Explore our latest insights on power system studies, grid modeling, and reliability engineering.</p></div><Link href="/blog" className="inline-flex min-h-13 shrink-0 items-center justify-center rounded-full bg-[#06103C] px-7 py-4 font-jost text-sm font-bold text-white">View All Articles <span className="ml-2">→</span></Link></div></div></section>
        <RelatedServiceBlogs terms={['data center', 'large load', 'ERCOT', 'interconnection']} title="Data Center Engineering Insights" />
      </main>
      <Footer />
    </>
  )
}
