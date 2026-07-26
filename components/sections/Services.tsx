'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const services = [
  { short: 'POI', title: 'POI Interconnection Support', desc: 'Interconnection strategy, power flow, transient stability, and affected-system support across ERCOT, CAISO, PJM, SPP, and other organized markets.', href: '/service/poi-interconnection-engineering-support', image: '/images/services/service-poi.jpg', scope: 'ERCOT · SPP · PJM · CAISO' },
  { short: 'Substations', title: 'Substation Design Services', desc: 'Primary and secondary HV/MV design, one-lines, layouts, P&C schematics, relay settings, CT/VT sizing, and IEC 61850 automation.', href: '/service/substation-design', image: '/images/services/service-substation.png', scope: 'HV · MV · IEC 61850' },
  { short: 'Studies', title: 'EHV, HV & MV Power Studies', desc: 'Load flow, short circuit, protection coordination, arc flash, harmonics, transient stability, grounding, and cable thermal analysis.', href: '/service/power-system-studies', image: '/images/services/power-system-studies/overview-engineers.jpg', scope: 'PSS®E · ETAP · PSCAD' },
  { short: "Owner's Engineer", title: "Owner's Engineer Services", desc: 'Independent technical oversight, design reviews, procurement support, and project coordination from development through commissioning.', href: '/service/owners-engineer', image: '/images/services/owners-engineer/construction-workers.jpg', scope: 'Design · Procurement · Delivery' },
  { short: 'Compliance', title: 'NERC Compliance Services', desc: 'FAC-008, PRC, TPL, and MOD testing and modeling, with experienced audit preparation and compliance support.', href: '/service/nerc-compliance', image: '/images/services/service-nerc.jpg', scope: 'MOD · PRC · FAC · TPL' },
  { short: 'Solar', title: 'Utility Scale Solar Engineering', desc: 'Complete electrical engineering and grid-integration support for reliable, compliant utility-scale solar facilities.', href: '/service/utility-scale-solar-farms', image: '/images/services/service-solar.png', scope: 'Solar · Collection · Interconnection' },
  { short: 'BESS', title: 'Utility Scale BESS Engineering', desc: 'Electrical design, studies, controls coordination, and interconnection engineering for grid-scale battery storage projects.', href: '/service/utility-scale-battery-storage', image: '/images/services/service-bess.jpg', scope: 'BESS · Controls · Grid Integration' },
  { short: 'MEP', title: 'MEP Engineering Services', desc: 'Integrated mechanical, electrical, plumbing, and fire-protection engineering for complex commercial and industrial facilities.', href: '/service/mep-engineering', image: '/images/services/mep-engineering/Integrated MEP Engineering Services for Complex Facility Projects.jpg', scope: 'Mechanical · Electrical · Plumbing' },
  { short: 'Wind', title: 'Utility Scale Wind Engineering', desc: 'Electrical engineering, collection-system design, studies, and interconnection support for utility-scale wind farms.', href: '/service/utility-scale-wind-farms', image: '/images/services/service-wind.jpg', scope: 'Wind · Collection · Interconnection' },
]

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = services[activeIndex]

  return (
    <section className="relative overflow-hidden bg-[#F4F5F9] py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A8228A]/40 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 top-16 h-[30rem] w-[30rem] rounded-full bg-[#A8228A]/[0.07] blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="font-urbanist text-3xl font-black leading-[1.06] text-[#06103C] sm:text-4xl lg:text-5xl">One team. Every critical<br className="hidden sm:block" /> power-system discipline.</h2>
          </div>
          <div className="max-w-xl">
            <p className="font-jost text-sm leading-relaxed text-gray-600 sm:text-base">Move through our capabilities to see how Keentel connects modeling, design, compliance, and field delivery into one accountable engineering workflow.</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#DDE1EA] bg-[#06103C] p-2.5 shadow-[0_30px_80px_rgba(6,16,60,0.18)] sm:p-3 lg:p-4">
          <div className="mb-2 rounded-[1.5rem] border border-white/10 bg-[#07113D] p-3 lg:hidden" role="tablist" aria-label="Engineering services">
            <div className="flex items-center justify-between px-3 py-2.5"><span className="font-jost text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/[0.68]">Select capability</span><span className="font-urbanist text-xs font-black text-[#F075D2]">01—09</span></div>
            <div className="grid gap-1 sm:grid-cols-2">
              {services.map((service, index) => (
                <button key={service.title} type="button" role="tab" aria-selected={activeIndex === index} onClick={() => setActiveIndex(index)} className={`flex min-h-14 items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${activeIndex === index ? 'border-[#E44BB8]/55 bg-[linear-gradient(100deg,rgba(168,34,138,0.3),rgba(255,255,255,0.06))]' : 'border-transparent bg-white/[0.025]'}`}>
                  <span className={`font-urbanist text-xs font-black ${activeIndex === index ? 'text-[#F075D2]' : 'text-white/50'}`}>{String(index + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1"><span className="block font-urbanist text-xs font-bold leading-tight text-white">{service.title}</span><span className={`mt-1 block font-jost text-[0.6rem] uppercase tracking-wider ${activeIndex === index ? 'text-[#F075D2]' : 'text-white/45'}`}>{service.short}</span></span>
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${activeIndex === index ? 'bg-[#E44BB8] shadow-[0_0_10px_rgba(228,75,184,0.8)]' : 'bg-white/35'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="grid overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#09164A] lg:min-h-[570px] lg:grid-cols-[1.4fr_0.6fr]">
            <div className="relative min-h-[520px] overflow-hidden sm:min-h-[590px] lg:min-h-full">
              {services.map((service, index) => (
                <Image key={service.title} src={service.image} alt={service.title} fill priority={index === 0} sizes="(max-width: 1024px) 100vw, 68vw" className={`object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIndex === index ? 'scale-100 opacity-100' : 'pointer-events-none scale-[1.035] opacity-0'}`} />
              ))}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,60,0.04)_0%,rgba(6,16,60,0.14)_48%,rgba(6,16,60,0.78)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8 lg:max-w-3xl lg:p-10">
                <div className="mb-4 flex flex-wrap items-center gap-3"><span className="rounded-full border border-[#F075D2]/35 bg-[#A8228A]/30 px-3 py-1.5 font-jost text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#F6A5E3]">Capability {String(activeIndex + 1).padStart(2, '0')}</span><span className="font-jost text-xs font-semibold text-white/[0.88]">{active.scope}</span></div>
                <h3 className="max-w-2xl font-urbanist text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">{active.title}</h3>
                <p className="mt-4 max-w-2xl font-jost text-sm leading-relaxed text-white/[0.92] sm:text-base lg:text-lg">{active.desc}</p>
                <div className="mt-6">
                  <Link href={active.href} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#C72E9E] to-[#8D237F] px-6 py-3 font-jost text-sm font-semibold text-white shadow-[0_10px_26px_rgba(168,34,138,0.28)] transition hover:-translate-y-0.5 sm:w-auto">Explore This Service <span className="ml-2" aria-hidden="true">→</span></Link>
                </div>
              </div>
            </div>

            <div className="hidden border-l border-white/10 bg-[#07113D] p-3 lg:flex lg:flex-col" role="tablist" aria-label="Engineering services">
              <div className="mb-2 flex items-center justify-between px-4 py-3"><span className="font-jost text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/[0.68]">Select capability</span><span className="font-urbanist text-xs font-black text-[#F075D2]">01—09</span></div>
              <div className="flex flex-1 flex-col gap-1.5">
                {services.map((service, index) => (
                  <button key={service.title} type="button" role="tab" aria-selected={activeIndex === index} onClick={() => setActiveIndex(index)} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} className={`group/item flex flex-1 items-center gap-4 rounded-2xl border px-4 text-left transition-all duration-300 ${activeIndex === index ? 'border-[#E44BB8]/45 bg-[linear-gradient(100deg,rgba(168,34,138,0.28),rgba(255,255,255,0.05))] shadow-[0_8px_24px_rgba(0,0,0,0.16)]' : 'border-transparent hover:border-white/10 hover:bg-white/[0.045]'}`}>
                    <span className={`font-urbanist text-sm font-black transition ${activeIndex === index ? 'text-[#F075D2]' : 'text-white/[0.5]'}`}>{String(index + 1).padStart(2, '0')}</span>
                    <span className="min-w-0 flex-1"><span className={`block font-urbanist text-sm font-bold leading-tight transition ${activeIndex === index ? 'text-white' : 'text-white/[0.86]'}`}>{service.title}</span><span className={`mt-1 block font-jost text-[0.65rem] uppercase tracking-wider transition ${activeIndex === index ? 'text-[#F075D2]' : 'text-white/[0.5]'}`}>{service.short}</span></span>
                    <span className={`h-1.5 w-1.5 rounded-full transition ${activeIndex === index ? 'bg-[#E44BB8] shadow-[0_0_10px_rgba(228,75,184,0.8)]' : 'bg-white/35'}`} />
                  </button>
                ))}
              </div>
              <Link href="/services" className="mt-3 flex items-center justify-center rounded-2xl border border-white/25 bg-white/[0.08] px-5 py-4 font-jost text-sm font-semibold text-white transition hover:border-[#E44BB8]/60 hover:bg-white/[0.12]">View Complete Service Portfolio <span className="ml-2" aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
