'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
import SoftwareCapabilities from '@/components/sections/SoftwareCapabilities'
import SoftwareTools from '@/components/sections/SoftwareTools'
import Industries from '@/components/sections/Industries'
import WhoWeServed from '@/components/service/WhoWeServed'
import ServiceCaseStudies from '@/components/service/ServiceCaseStudies'
import RelatedServiceBlogs from '@/components/service/RelatedServiceBlogs'

type ServiceItem = { title: string; description: string }
type Faq = { question: string; answer: string }

export type RenewableSpecialtyConfig = {
  eyebrow: string
  title: string
  heroCopy: string
  approachTitle: string
  approachCopy: string
  image: string
  imageAlt: string
  servicesTitle: string
  servicesIntro: string
  services: ServiceItem[]
  processTitle: string
  process: string[]
  faqTitle: string
  faqs: Faq[]
  caseStudyService: string
  blogTerms: string[]
}

function Accordion({ item, index }: { item: Faq; index: number }) {
  const [open, setOpen] = useState(false)
  return <button type="button" onClick={() => setOpen(!open)} className="w-full rounded-xl border p-5 text-left transition-colors" style={{ borderColor: open ? '#A8228A' : '#E6E8F0', background: open ? '#FDF7FC' : '#fff' }}>
    <span className="flex items-center gap-4"><span className="font-urbanist text-lg font-black text-[#06103C]">{String(index + 1).padStart(2, '0')}</span><span className="flex-1 font-urbanist text-base font-bold text-[#06103C] sm:text-lg">{item.question}</span><span className="grid h-8 w-8 place-items-center rounded-full bg-[#F6F7FB] text-xl text-[#A8228A]">{open ? '−' : '+'}</span></span>
    {open && <span className="ml-10 mt-4 block font-jost text-sm leading-relaxed text-gray-600 sm:text-base">{item.answer}</span>}
  </button>
}

export default function RenewableSpecialtyPage({ config }: { config: RenewableSpecialtyConfig }) {
  return <><Header /><main>
    <section className="relative flex min-h-[72vh] items-center overflow-hidden bg-[#06103C]">
      <img src={config.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#06103C]/95 via-[#06103C]/80 to-[#06103C]/30" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8"><p className="mb-5 font-jost text-xs font-bold uppercase tracking-widest text-[#F05BCB]">{config.eyebrow}</p><h1 className="max-w-3xl font-urbanist text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">{config.title}</h1><p className="mt-6 max-w-2xl font-jost text-base leading-relaxed text-white/85 sm:text-xl">{config.heroCopy}</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex justify-center rounded-full bg-[#A8228A] px-7 py-4 font-jost font-semibold text-white">Schedule a Consultation</Link><a href="#services" className="inline-flex justify-center rounded-full border border-white/40 px-7 py-4 font-jost font-semibold text-white">Explore Services</a></div></div>
    </section>

    <section className="bg-white py-12 sm:py-16"><div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8"><div><h2 className="mb-5 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl">{config.approachTitle}</h2><p className="font-jost text-base leading-relaxed text-gray-600 sm:text-lg">{config.approachCopy}</p></div><img src={config.image} alt={config.imageAlt} className="h-72 w-full rounded-2xl object-cover shadow-xl sm:h-96" /></div></section>
    <ContactForm />
    <SoftwareCapabilities />

    <section id="services" className="bg-[#F6F7FB] py-12 sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-10 max-w-3xl"><p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#A8228A]">Specialist Services</p><h2 className="mb-4 font-urbanist text-3xl font-black text-[#06103C] sm:text-4xl">{config.servicesTitle}</h2><p className="font-jost text-base leading-relaxed text-gray-600 sm:text-lg">{config.servicesIntro}</p></div><div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{config.services.map((service, index) => <article key={service.title} className="group rounded-2xl border border-[#E6E8F0] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#A8228A]/50 hover:shadow-xl"><span className="mb-5 grid h-10 w-10 place-items-center rounded-full bg-[#A8228A]/10 font-urbanist text-sm font-black text-[#A8228A]">{String(index + 1).padStart(2, '0')}</span><h3 className="mb-3 font-urbanist text-xl font-bold text-[#06103C]">{service.title}</h3><p className="font-jost text-sm leading-relaxed text-gray-600">{service.description}</p></article>)}</div></div></section>

    <section className="bg-white py-12 sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-10 text-center"><p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#A8228A]">Project Delivery</p><h2 className="font-urbanist text-3xl font-black text-[#06103C] sm:text-4xl">{config.processTitle}</h2></div><div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">{config.process.map((step, index) => <div key={step} className="rounded-2xl border border-[#E6E8F0] bg-[#F8F9FC] p-5"><span className="mb-4 block font-urbanist text-2xl font-black text-[#A8228A]">0{index + 1}</span><p className="font-jost text-sm font-semibold leading-relaxed text-[#06103C]">{step}</p></div>)}</div></div></section>
    <SoftwareTools />
    <Industries />
    <ServiceCaseStudies service={config.caseStudyService} />
    <WhoWeServed />
    <section className="bg-[#06103C] py-12 sm:py-16"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="mb-10 text-center"><p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#F05BCB]">Technical FAQs</p><h2 className="font-urbanist text-3xl font-black text-white sm:text-4xl">{config.faqTitle}</h2></div><div className="space-y-3">{config.faqs.map((item, index) => <Accordion key={item.question} item={item} index={index} />)}</div></div></section>
  </main><RelatedServiceBlogs terms={config.blogTerms} title={`${config.eyebrow} Insights`} /><Footer /></>
}
