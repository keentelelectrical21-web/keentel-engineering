'use client'

import Link from 'next/link'

const industries = [
  {
    title: 'Utilities & Transmission',
    tag: 'Transmission',
    desc: 'Transmission planning, system studies, protection coordination, grid reliability, NERC support, and substation infrastructure engineering.',
    href: '/industries/electric-utilities-transmission',
       image: '/images/industries/hub/utilities-transmission.jpg',
  },
  {
    title: 'Renewable Energy Developers',
    tag: 'Utility Scale',
    desc: 'Interconnection feasibility, system-impact studies, dynamic modeling, grid-code compliance, and solar, wind, and BESS integration.',
    href: '/industries/renewable-interconnection-engineering',
    image: '/images/industries/hub/renewable-developers.jpg',
  },
  {
    title: 'Data Centers & AI Infrastructure',
    tag: 'Mission Critical',
    desc: 'Electrical infrastructure, load-flow and capacity analysis, backup-power evaluation, redundancy analysis, and harmonic studies.',
    href: '/industries/data-center-electrical',
     image: '/images/industries/hub/data-centers.jpg',
  },
  {
    title: 'Oil & Gas',
    tag: 'Industrial',
    desc: 'Electrical-system design, motor starting, short-circuit and protection studies, microgrid evaluation, and hazardous-location engineering.',
    href: '/industries/oil-gas-mining',
    image: '/images/industries/hub/oil-gas-mining.jpg',
  },
  {
    title: 'Manufacturing & Industrial',
    tag: 'Industrial',
    desc: 'Load-flow, short-circuit, coordination, harmonic, grounding, and electrical-distribution engineering.',
    href: '/industries/industrial-power-engineering',
      image: '/images/industries/hub/industrial-manufacturing.webp',
  },
  {
    title: 'EPC Contractors',
    tag: 'Project Delivery',
    desc: 'Constructible substation, POI, protection, study, and documentation packages aligned to EPC schedules.',
    href: '/industries/epc-contractors',
    image: '/images/services/substation-design/ind-epc.png',
  },
]

export default function Industries() {
  return (
    <section className="py-24" style={{ background: '#F6F7FB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Sectors We Serve</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#0B1230' }}>Industries We Serve</h2>
          </div>
          <Link href="/industries" className="inline-flex items-center gap-2 font-semibold text-sm whitespace-nowrap" style={{ color: '#A8228A' }}>
            View all sectors
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((ind, i) => (
            <Link
              key={i}
              href={ind.href}
              className="group relative rounded-2xl overflow-hidden block"
              style={{ height: '320px' }}
            >
              <img
                src={ind.image}
                alt={ind.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
              />
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all bg-white/95 shadow-sm" style={{ border: '1px solid rgba(6,16,60,0.12)' }}>
                <svg className="w-4 h-4" style={{ color: '#06103C' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: 'linear-gradient(to top, rgba(6,16,60,0.96) 0%, rgba(6,16,60,0.9) 78%, rgba(6,16,60,0) 100%)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#C72E9E' }}>{ind.tag}</p>
                <h3 className="font-urbanist font-bold text-white text-2xl mb-2 leading-tight">{ind.title}</h3>
                <p className="text-white/80 text-sm font-jost leading-snug max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-300">
                  {ind.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
