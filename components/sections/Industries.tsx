'use client'

import Link from 'next/link'

const industries = [
  {
    title: 'Utilities & Transmission',
    tag: 'Transmission',
    desc: 'Grid reliability, NERC compliance, and transmission planning for PJM, ERCOT, WECC, and CAISO operators.',
    href: '/industry/utilities-transmission-operators',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&q=80',
  },
  {
    title: 'Renewable Energy Developers',
    tag: 'Utility Scale',
    desc: 'Grid interconnection, IEEE 2800 compliance, IBR modeling, and storage integration for solar, wind, and BESS.',
    href: '/industry/renewable-energy-developers',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=80',
  },
  {
    title: 'Data Centers & AI Infrastructure',
    tag: 'Mission Critical',
    desc: 'Large load interconnection, grid stability analysis, and power supply design for hyperscale AI facilities.',
    href: '/industry/data-centers-ai-infrastructure',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80',
  },
  {
    title: 'Oil & Gas',
    tag: 'Industrial',
    desc: 'Generator protection, power quality analysis, and industrial reliability engineering for oil & gas operations.',
    href: '/industry/oil-gas',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=700&q=80',
  },
  {
    title: 'Manufacturing & Industrial',
    tag: 'Industrial',
    desc: 'Equipment protection, fault analysis, and system stability for heavy industrial and chemical plants.',
    href: '/industry/manufacturing-industrial',
    image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=700&q=80',
  },
  {
    title: 'Public Sector & Infrastructure',
    tag: 'Infrastructure',
    desc: 'Regulatory compliance, resilience planning, and infrastructure modernization for municipalities.',
    href: '/industry/public-sector-infrastructure',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80',
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
              {/* Dark gradient overlay - same style as reference image */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,16,60,0.95) 0%, rgba(6,16,60,0.6) 45%, rgba(6,16,60,0.15) 100%)' }} />

              {/* Arrow top right */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>

              {/* Content bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#C72E9E' }}>{ind.tag}</p>
                <h3 className="font-urbanist font-bold text-white text-2xl mb-2 leading-tight">{ind.title}</h3>
                <p className="text-white/60 text-sm font-jost leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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