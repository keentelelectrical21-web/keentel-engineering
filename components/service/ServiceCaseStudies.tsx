'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client } from '@/lib/sanity'

type Study = {
  _id: string
  title: string
  slug: { current: string }
  category?: string
  subtitle?: string
  client?: string
  region?: string
  outcome?: string
}

function categoryLabel(study: Study) {
  const value = `${study.category || ''} ${study.title} ${study.slug.current}`.toLowerCase()
  if (value.includes('nerc')) return 'NERC Compliance'
  if (value.includes('substation')) return 'Substation Engineering'
  if (value.includes('interconnection') || value.includes('renewable') || value.includes('poi')) return 'Grid Interconnection'
  if (value.includes('protection') || value.includes('ground') || value.includes('insulation') || value.includes('short circuit')) return 'Protection Engineering'
  if (value.includes('transmission') || value.includes('load flow') || value.includes('stability')) return 'Transmission Planning'
  return 'Power System Studies'
}

function StudyCard({ study }: { study: Study }) {
  return (
    <Link href={`/clients-and-projects/${study.slug.current}`} className="mx-2 flex min-h-[255px] w-[calc(100vw-2rem)] max-w-[350px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-[#E6E8F0] bg-white shadow-[0_5px_18px_rgba(6,16,60,0.08)] transition-all hover:-translate-y-1 hover:shadow-xl sm:mx-3 sm:min-h-[270px]">
      <div className="h-1.5 w-full bg-gradient-to-r from-[#0B1A5B] via-[#5B2A86] to-[#C72E9E]" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="mb-4 inline-block self-start rounded-full bg-[#A8228A]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#A8228A]">{categoryLabel(study)}</span>
        <h3 className="mb-2 font-urbanist text-base font-black leading-snug text-[#0B1230] sm:text-lg">{study.title}</h3>
        {study.subtitle && <p className="mb-4 font-jost text-sm leading-relaxed text-[#6B7280]">{study.subtitle}</p>}
        {(study.client || study.region) && (
          <div className="mt-2 grid grid-cols-2 gap-4 border-t border-[#F0F1F5] pt-3">
            {study.client && <div><p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">Client</p><p className="font-jost text-xs font-medium text-[#4B5563]">{study.client}</p></div>}
            {study.region && <div><p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">Region</p><p className="font-jost text-xs font-medium text-[#4B5563]">{study.region}</p></div>}
          </div>
        )}
        {study.outcome && <p className="mt-3 border-t border-[#F0F1F5] pt-3 font-jost text-xs leading-relaxed text-[#6B7280]"><span className="font-semibold text-[#A8228A]">Outcome: </span>{study.outcome}</p>}
      </div>
    </Link>
  )
}

export default function ServiceCaseStudies({ service }: { service: string }) {
  const [studies, setStudies] = useState<Study[]>([])

  useEffect(() => {
    const fields = `_id, title, slug, client, region, "category": coalesce(category->title, category), "subtitle": coalesce(subtitle, challenge), "outcome": coalesce(results, outcome[0])`
    client.fetch<Study[]>(`*[_type == "caseStudy" && relatedService == $service] | order(_createdAt desc)[0...12] {${fields}}`, { service })
      .then(async (specific) => {
        if (specific.length >= 3) return specific
        const portfolio = await client.fetch<Study[]>(`*[_type == "caseStudy"] | order(_createdAt desc)[0...12] {${fields}}`)
        const combined = [...specific, ...portfolio].filter((item, index, all) => index === all.findIndex((other) => other._id === item._id))
        return combined
      })
      .then(setStudies)
      .catch(() => setStudies([]))
  }, [service])

  if (!studies.length) return null
  const doubled = [...studies, ...studies]

  return (
    <section className="overflow-hidden bg-[#F6F7FB] py-16 sm:py-20">
      <div className="mb-10 px-4 text-center sm:mb-12">
        <p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#A8228A]">Featured Case Studies</p>
        <h2 className="mb-4 font-urbanist text-3xl font-black text-[#0B1230] sm:text-5xl">Engineering Projects That Deliver Results</h2>
        <p className="mx-auto max-w-3xl font-jost text-base leading-relaxed text-[#4B5563] sm:text-lg">Power system studies, substation engineering, grid interconnection, and protection projects delivered for utilities, developers, EPC contractors, and industrial facilities across the U.S.</p>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-20 bg-gradient-to-r from-[#F6F7FB] to-transparent sm:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-20 bg-gradient-to-l from-[#F6F7FB] to-transparent sm:block" />
        <div className="case-study-rail flex w-max overflow-visible hover:[animation-play-state:paused] max-sm:w-full max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:pb-4">
          {doubled.map((study, index) => <StudyCard key={`${study._id}-${index}`} study={study} />)}
        </div>
      </div>
      <div className="mt-10 px-4 text-center sm:mt-12">
        <Link href="/clients-and-projects" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0B1A5B] to-[#5B2A86] px-8 py-4 font-jost text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">View All Case Studies <span aria-hidden="true">→</span></Link>
      </div>
      <style jsx>{`
        .case-study-rail { animation: case-study-scroll 85s linear infinite; }
        @keyframes case-study-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (max-width: 639px), (prefers-reduced-motion: reduce) {
          .case-study-rail { animation: none; transform: none; }
        }
      `}</style>
    </section>
  )
}
