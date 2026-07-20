'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client } from '@/lib/sanity'

interface CaseStudy {
  _id: string
  title: string
  slug: { current: string }
  cardImage?: string
  background?: string
  client?: string
  region?: string
}

export default function CaseStudies() {
  const [studies, setStudies] = useState<CaseStudy[]>([])

  useEffect(() => {
    client.fetch(
      `*[_type == "caseStudy" && defined(cardImage)] | order(_createdAt desc) [0...4] {
        _id, title, slug, cardImage, background, client, region
      }`
    ).then(setStudies).catch(() => {})
  }, [])

  if (studies.length === 0) return null

  const [featured, ...others] = studies

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>What Success Looks Like</p>
          <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#0B1230' }}>
        Engineering Projects That Deliver Results
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Featured */}
          <Link href={`/clients-and-projects/${featured.slug.current}`} className="rounded-2xl overflow-hidden block group" style={{ border: '1px solid #E6E8F0' }}>
            <div className="relative h-56 overflow-hidden" style={{ background: '#F6F7FB' }}>
              {featured.cardImage && (
                <img src={featured.cardImage} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              )}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(6,16,60,0.5) 100%)' }} />
              <span className="absolute top-4 left-4 font-urbanist font-black text-3xl" style={{ color: 'rgba(255,255,255,0.9)' }}>01</span>
            </div>
            <div className="p-7">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 inline-block" style={{ background: 'rgba(167,34,138,0.1)', color: '#A8228A' }}>
                {featured.client || featured.region || 'Engineering Project'}
              </span>
              <h3 className="font-urbanist font-black text-2xl mb-3 leading-tight mt-3" style={{ color: '#0B1230' }}>
                {featured.title}
              </h3>
              {featured.background && (
                <p className="text-base font-jost leading-relaxed mb-6 line-clamp-4" style={{ color: '#4B5563' }}>
                  {featured.background}
                </p>
              )}
              <span className="inline-flex items-center gap-2 font-jost font-semibold text-sm" style={{ color: '#A8228A' }}>
                View All Case Studies
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </div>
          </Link>

          {/* Others */}
          <div className="flex flex-col gap-4">
            {others.map((c, i) => (
              <Link key={c._id} href={`/clients-and-projects/${c.slug.current}`} className="flex items-start gap-5 p-6 rounded-2xl hover:shadow-md transition-all" style={{ border: '1px solid #E6E8F0' }}>
                <span className="font-urbanist font-black text-2xl flex-shrink-0" style={{ color: '#A8228A' }}>{String(i + 2).padStart(2, '0')}</span>
                <div>
                  <h4 className="font-urbanist font-bold text-base mb-1.5" style={{ color: '#0B1230' }}>{c.title}</h4>
                  {c.background && (
                    <p className="text-base font-jost leading-relaxed line-clamp-2" style={{ color: '#4B5563' }}>{c.background}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
