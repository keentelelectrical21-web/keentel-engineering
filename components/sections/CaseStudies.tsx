'use client'

import Link from 'next/link'

const featured = {
  num: '01',
  tag: 'Renewable Developer',
  title: '120 MW solar + 30 MW BESS unstuck from NYISO queue in 90 days.',
  body: 'Stuck for 14 months. POI study flagged equipment ratings nobody caught, facing a 6-month redesign. We re-assessed facility ratings, validated dynamic studies, and aligned the project to current grid codes.',
  image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
  stats: [
    { val: '14 to 0', label: 'Months Stuck' },
    { val: '$1.4M', label: 'Redesign Avoided' },
    { val: '90 days', label: 'To Construction' },
  ],
}

const others = [
  { num: '02', title: '100+ MW AI Data Center', desc: 'EMT modeling + MOD-032 data validation. Study passed on first submission. 6-month timeline maintained.' },
  { num: '03', title: 'Utility · 23 Substations', desc: 'Full device coordination study. 7 relays retuned. Arc flash risk quantified and resolved.' },
  { num: '04', title: 'Hyperscale Owner · Texas', desc: 'Large-load coordination for ERCOT. IBR ride-through validated; interconnection denial avoided.' },
  { num: '05', title: 'Municipal Utility', desc: 'NERC Level 3 Alert response plan delivered in 21 days; compliance audit closed clean.' },
]

export default function CaseStudies() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>What Success Looks Like</p>
          <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#0B1230' }}>
            Most agencies show promises.<br />Here are promises kept.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Featured */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E6E8F0' }}>
            <div className="relative h-56 overflow-hidden">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(6,16,60,0.5) 100%)' }} />
              <span className="absolute top-4 left-4 font-urbanist font-black text-3xl" style={{ color: 'rgba(255,255,255,0.9)' }}>{featured.num}</span>
            </div>
            <div className="p-7">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 inline-block" style={{ background: 'rgba(167,34,138,0.1)', color: '#A8228A' }}>
                {featured.tag}
              </span>
              <h3 className="font-urbanist font-black text-2xl mb-3 leading-tight mt-3" style={{ color: '#0B1230' }}>
                {featured.title}
              </h3>
              <p className="text-base font-jost leading-relaxed mb-6" style={{ color: '#4B5563' }}>
                {featured.body}
              </p>
              <div className="flex gap-8 mb-6">
                {featured.stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-urbanist font-black text-2xl" style={{ color: '#0B1A5B' }}>{s.val}</p>
                    <p className="text-xs font-jost uppercase tracking-wide" style={{ color: '#9CA3AF' }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/our-work" className="inline-flex items-center gap-2 font-jost font-semibold text-sm" style={{ color: '#A8228A' }}>
                View All Case Studies
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>

          {/* Others */}
          <div className="flex flex-col gap-4">
            {others.map((c) => (
              <div key={c.num} className="flex items-start gap-5 p-6 rounded-2xl hover:shadow-md transition-all" style={{ border: '1px solid #E6E8F0' }}>
                <span className="font-urbanist font-black text-2xl flex-shrink-0" style={{ color: '#A8228A' }}>{c.num}</span>
                <div>
                  <h4 className="font-urbanist font-bold text-base mb-1.5" style={{ color: '#0B1230' }}>{c.title}</h4>
                  <p className="text-base font-jost leading-relaxed" style={{ color: '#4B5563' }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
