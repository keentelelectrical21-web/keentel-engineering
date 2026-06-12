'use client'

import Link from 'next/link'

const industries = [
  {
    title: 'Utilities & Transmission',
    desc: 'Grid reliability, NERC compliance, and transmission planning for PJM, ERCOT, WECC, and CAISO operators.',
    href: '/industry/utilities-transmission-operators',
    color: 'from-blue-500/10 to-blue-600/5',
    iconColor: '#030DA6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Renewable Energy Developers',
    desc: 'Grid interconnection, IEEE 2800 compliance, IBR modeling, and storage integration for solar, wind, and BESS.',
    href: '/industry/renewable-energy-developers',
    color: 'from-yellow-400/10 to-orange-400/5',
    iconColor: '#D97706',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: 'Data Centers & AI Infrastructure',
    desc: 'Large load interconnection, grid stability analysis, and power supply design for hyperscale AI facilities.',
    href: '/industry/data-centers-ai-infrastructure',
    color: 'from-purple-500/10 to-indigo-500/5',
    iconColor: '#7C3AED',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: 'Oil & Gas',
    desc: 'Generator protection, power quality analysis, and industrial reliability engineering for oil & gas operations.',
    href: '/industry/oil-gas',
    color: 'from-gray-400/10 to-gray-500/5',
    iconColor: '#374151',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    title: 'Manufacturing & Industrial',
    desc: 'Equipment protection, fault analysis, and system stability for heavy industrial and chemical plants.',
    href: '/industry/manufacturing-industrial',
    color: 'from-red-400/10 to-rose-400/5',
    iconColor: '#8C1D1C',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
      </svg>
    ),
  },
  {
    title: 'Public Sector & Infrastructure',
    desc: 'Regulatory compliance, resilience planning, and infrastructure modernization for municipalities.',
    href: '/industry/public-sector-infrastructure',
    color: 'from-green-500/10 to-emerald-400/5',
    iconColor: '#059669',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
]

export default function Industries() {
  return (
    <section className="py-24 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="inline-block text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">Sectors We Serve</span>
          <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-gray-900 mb-4">Industries We Serve</h2>
          <p className="text-gray-500 font-jost text-lg max-w-2xl mx-auto">
            From investor-owned utilities to renewable energy developers, our engineering expertise spans every major sector of the U.S. power industry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((ind, i) => (
            <Link
              key={i}
              href={ind.href}
              className={`group relative bg-gradient-to-br ${ind.color} bg-white border border-gray-200 rounded-3xl p-7 hover:border-[#030DA6]/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Animated SVG icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ backgroundColor: `${ind.iconColor}15`, color: ind.iconColor }}
              >
                {ind.icon}
              </div>

              <h3 className="font-urbanist font-bold text-gray-900 text-xl mb-2 group-hover:text-[#030DA6] transition-colors">
                {ind.title}
              </h3>
              <p className="text-gray-500 text-sm font-jost leading-relaxed mb-5">{ind.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-[#030DA6] text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-full hover:border-[#030DA6] hover:text-[#030DA6] transition-all"
          >
            View All Industries
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}