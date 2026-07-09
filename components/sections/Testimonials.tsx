'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface CaseStudy {
  _id: string
  title: string
  subtitle?: string
  category: string
  cardImage?: string
  slug: { current: string }
  outcome?: string[]
  client?: string
  region?: string
}

const INTENT_COLORS: Record<string, string> = {
  substation: '#0B1A5B',
  'power-system': '#A8228A',
}

const fallback: CaseStudy[] = [
  { _id: '1', title: '110 kV Outdoor Grid Substation', subtitle: 'Rural electrification across extreme environments.', category: 'substation', slug: { current: 'substation-110kv-outdoor-rural-electrification' }, outcome: ['Stable power distribution achieved with improved grid resilience.'] },
  { _id: '2', title: 'Grid Interconnection & Renewable Penetration Study', subtitle: 'ISO-approved interconnection results for a major renewable developer.', category: 'power-system', slug: { current: 'power-system-grid-interconnection-renewable-penetration' }, client: 'Confidential Renewable Developer', region: 'ERCOT' },
  { _id: '3', title: '230 kV Renewable POI Collector Substation', subtitle: 'Utility-scale renewable interconnection hub.', category: 'substation', slug: { current: 'substation-230kv-renewable-poi-collector' } },
  { _id: '4', title: 'Insulation Coordination & Lightning Study', subtitle: 'Equipment protection for high-voltage substation.', category: 'power-system', slug: { current: 'power-system-insulation-coordination-lightning-tov-trv' }, region: 'Southeast U.S.' },
  { _id: '5', title: 'BESS Substation 138 kV', subtitle: 'Grid stabilization through fast-response energy storage.', category: 'substation', slug: { current: 'substation-bess-138kv' } },
  { _id: '6', title: 'Solar & Wind Farm Electrical Design', subtitle: 'Full compliance engineering for a hybrid solar-wind facility.', category: 'power-system', slug: { current: 'power-system-solar-wind-farm-electrical-design' }, client: 'Confidential IPP', region: 'Southwest U.S.' },
]

function CaseCard({ cs }: { cs: CaseStudy }) {
  const isSubstation = cs.category === 'substation'
  return (
    <Link
      href={`/our-work/${cs.slug.current}`}
      className="flex-shrink-0 w-[340px] rounded-2xl overflow-hidden mx-3 group hover:-translate-y-1 transition-all duration-300"
      style={{ background: '#fff', border: '1px solid #E6E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Top color bar */}
      <div className="h-1.5 w-full" style={{ background: isSubstation ? 'linear-gradient(90deg, #0B1A5B, #5B2A86)' : 'linear-gradient(90deg, #A8228A, #C72E9E)' }} />

      <div className="p-6">
        {/* Category badge */}
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4" style={{ background: isSubstation ? 'rgba(11,26,91,0.08)' : 'rgba(168,34,138,0.08)', color: isSubstation ? '#0B1A5B' : '#A8228A' }}>
          {isSubstation ? 'Substation Engineering' : 'Power System Studies'}
        </span>

        <h3 className="font-urbanist font-black text-base leading-snug mb-2 group-hover:text-[#A8228A] transition-colors" style={{ color: '#0B1230' }}>
          {cs.title}
        </h3>

        {cs.subtitle && (
          <p className="text-sm font-jost leading-relaxed mb-4" style={{ color: '#6B7280' }}>
            {cs.subtitle}
          </p>
        )}

        {(cs.client || cs.region) && (
          <div className="flex gap-4 mt-3 pt-3" style={{ borderTop: '1px solid #F0F1F5' }}>
            {cs.client && (
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{ color: '#9CA3AF' }}>Client</p>
                <p className="text-xs font-jost font-medium" style={{ color: '#4B5563' }}>{cs.client}</p>
              </div>
            )}
            {cs.region && (
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{ color: '#9CA3AF' }}>Region</p>
                <p className="text-xs font-jost font-medium" style={{ color: '#4B5563' }}>{cs.region}</p>
              </div>
            )}
          </div>
        )}

        {cs.outcome && cs.outcome[0] && (
          <p className="text-xs font-jost mt-3 pt-3 leading-relaxed" style={{ color: '#6B7280', borderTop: '1px solid #F0F1F5' }}>
            <span className="font-semibold" style={{ color: '#A8228A' }}>Outcome: </span>{cs.outcome[0]}
          </p>
        )}
      </div>
    </Link>
  )
}

export default function Testimonials() {
  const [cases, setCases] = useState<CaseStudy[]>(fallback)

  useEffect(() => {
    fetch('/api/case-studies')
      .then((r) => r.json())
      .then((data) => { if (data?.length > 0) setCases(data) })
      .catch(() => {})
  }, [])

  const doubled = [...cases, ...cases]

  return (
    <section className="py-20 overflow-hidden" style={{ background: '#F6F7FB' }}>
      <div className="mb-12 text-center px-4">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Project Portfolio</p>
        <h2 className="font-urbanist font-black text-4xl sm:text-5xl mb-4" style={{ color: '#0B1230' }}>Engineering Projects That Delivered</h2>
        <p className="text-lg font-jost max-w-xl mx-auto" style={{ color: '#4B5563' }}>
          Substation engineering and power system studies delivered across utilities, developers, and EPCs nationwide.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #F6F7FB, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #F6F7FB, transparent)' }} />
        <div
          className="flex"
          style={{ width: 'max-content', animation: 'marquee-left 50s linear infinite' }}
        >
          {doubled.map((cs, i) => (
            <CaseCard key={`${cs._id}-${i}`} cs={cs} />
          ))}
        </div>
      </div>

      <div className="text-center mt-12 px-4">
        <Link href="/our-work" className="inline-flex items-center gap-2 font-jost font-semibold px-8 py-4 rounded-full text-white transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #0B1A5B, #5B2A86)' }}>
          View All Case Studies
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </Link>
      </div>
    </section>
  )
}
