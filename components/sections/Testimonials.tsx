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
  href?: string
}

const fallback: CaseStudy[] = [
  { _id: 'grid-interconnection-renewable-penetration', title: 'Grid Interconnection & Renewable Penetration Study', subtitle: 'Grid interconnection and renewable-penetration assessment under high renewable scenarios.', category: 'power-system', slug: { current: 'power-system-study-case-studies' }, client: 'Confidential Renewable Developer', region: 'ERCOT', outcome: ['ISO-approved interconnection study results with identified hosting-capacity limits and mitigation paths.'] },
  { _id: 'reactive-power-compensation', title: 'Reactive Power Compensation & Capacitor Bank Optimization Study', subtitle: 'Reactive compensation study for a transmission-connected facility.', category: 'power-system', slug: { current: 'power-system-study-case-studies' }, client: 'Confidential Transmission-Connected Facility', region: 'MISO', outcome: ['Improved voltage profile and power-factor compliance.'] },
  { _id: 'insulation-coordination', title: 'Insulation Coordination, Lightning, TOV, and TRV Studies', subtitle: 'Insulation coordination verification for a new high-voltage substation.', category: 'power-system', slug: { current: 'power-system-study-case-studies' }, client: 'Confidential Utility', region: 'Southeast U.S.', outcome: ['Reduced insulation-failure risk and enhanced substation reliability and safety.'] },
  { _id: '345kv-greenfield-substation', title: '345 kV EHV Greenfield Substation', subtitle: 'New 345 kV / 138 kV transmission substation integrating wind generation.', category: 'substation', slug: { current: 'substation-design-power-system-case-studies' }, outcome: ['Successful substation energization with zero safety incidents.'] },
  { _id: '230kv-gis-expansion', title: '230 kV GIS Substation Expansion', subtitle: 'Expansion and modernization of an existing gas-insulated substation.', category: 'substation', slug: { current: 'substation-design-power-system-case-studies' }, outcome: ['Expansion completed without a substation outage.'] },
  { _id: 'wecc-poi-hybrid', title: 'WECC 230 kV POI for Solar + BESS Hybrid', subtitle: 'POI interconnection engineering for a 150 MW PV and 75 MW / 300 MWh BESS hybrid.', category: 'power-system', slug: { current: 'casestudies-poi-interconnection-support' }, client: 'Confidential Renewable Developer', region: 'WECC', outcome: ['EMT modeling report approved without major comments.'] },
]

function displayTitle(title: string) {
  const titles: Record<string, string> = {
    'Effectively Grounded System & Grounding Performance Analysis': 'Grounding System Performance Analysis',
    'Fast Front, Slow Front & GIS Very Fast Transient Studies': 'GIS Very Fast Transient Study',
    'Transformer Inrush, POI Rapid Voltage Change (RVC) & Flicker Study': 'Transformer Inrush & Voltage Flicker Study',
    'Power, Energy Loss & Substation Layout Optimization Study': 'Substation Layout Optimization Study',
  }
  return titles[title] || title
}

function categoryLabel(cs: CaseStudy) {
  const value = `${cs.category} ${cs.title} ${cs.slug.current}`.toLowerCase()
  if (value.includes('nerc')) return 'NERC Compliance'
  if (value.includes('substation')) return 'Substation Engineering'
  if (value.includes('interconnection') || value.includes('renewable') || value.includes('poi')) return 'Grid Interconnection'
  if (value.includes('protection') || value.includes('ground') || value.includes('insulation') || value.includes('arc flash') || value.includes('short circuit')) return 'Protection Engineering'
  if (value.includes('transmission') || value.includes('load flow') || value.includes('voltage stability')) return 'Transmission Planning'
  return 'Power System Studies'
}

function CaseCard({ cs }: { cs: CaseStudy }) {
  const label = categoryLabel(cs)
  return (
    <Link
      href={cs.href || `/clients-and-projects/${cs.slug.current}`}
      className="mx-2 w-[calc(100vw-2rem)] max-w-[340px] flex-shrink-0 overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 sm:mx-3"
      style={{ background: '#fff', border: '1px solid #E6E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Top color bar */}
      <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #0B1A5B 0%, #5B2A86 55%, #C72E9E 100%)' }} />

      <div className="p-6">
        {/* Category badge */}
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(168,34,138,0.08)', color: '#A8228A' }}>
          {label}
        </span>

        <h3 className="font-urbanist font-black text-base leading-snug mb-2 group-hover:text-[#A8228A] transition-colors" style={{ color: '#0B1230' }}>
          {displayTitle(cs.title)}
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
      .then((response) => response.json())
      .then((data) => {
        if (data?.length > 0) {
          setCases([fallback[0], ...data.filter((study: CaseStudy) => study.slug.current !== fallback[0].slug.current)])
        }
      })
      .catch(() => {})
  }, [])

  const uniqueCases = cases.filter((cs, index, all) => index === all.findIndex((item) => item.slug.current === cs.slug.current))
  const portfolioCases = uniqueCases.some((cs) => cs.title.toLowerCase().includes('protective device coordination'))
    ? uniqueCases
    : [...uniqueCases, {
        _id: 'protective-device-coordination',
        title: 'Protective Device Coordination Study',
        subtitle: 'Selective protection settings that isolate faults safely while maintaining system reliability.',
        category: 'Protection Engineering',
        slug: { current: 'protective-device-coordination-study' },
        href: '/service/power-system-studies',
      }]
  const doubled = [...portfolioCases, ...portfolioCases]

  return (
    <section className="py-20 overflow-hidden" style={{ background: '#F6F7FB' }}>
      <div className="mb-12 text-center px-4">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Featured Case Studies</p>
        <h2 className="font-urbanist font-black text-4xl sm:text-5xl mb-4" style={{ color: '#0B1230' }}>Engineering Projects That Deliver Results</h2>
        <p className="text-lg font-jost max-w-3xl mx-auto" style={{ color: '#4B5563' }}>
          Power system studies, substation engineering, grid interconnection, and protection projects delivered for utilities, renewable developers, EPC contractors, and industrial facilities.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #F6F7FB, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #F6F7FB, transparent)' }} />
        <div
          className="flex"
          style={{ width: 'max-content', animation: 'marquee-left 85s linear infinite' }}
        >
          {doubled.map((cs, i) => (
            <CaseCard key={`${cs._id}-${i}`} cs={cs} />
          ))}
        </div>
      </div>

      <div className="text-center mt-12 px-4">
        <Link href="/clients-and-projects" className="inline-flex items-center gap-2 font-jost font-semibold px-8 py-4 rounded-full text-white transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #0B1A5B, #5B2A86)' }}>
          View All Case Studies
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </Link>
      </div>
    </section>
  )
}
