import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PoiCaseStudyCards from '@/components/sections/PoiCaseStudyCards'

export const metadata: Metadata = {
  title: 'Point-of-Interconnection (POI) Support Case Studies | Keentel Engineering',
  description: 'Explore Keentel Engineering POI interconnection case studies across PJM, ERCOT, WECC, and NYISO for solar, wind, BESS, and hybrid projects.',
  alternates: { canonical: '/casestudies-poi-interconnection-support' },
  openGraph: { title: 'Point-of-Interconnection (POI) Support Case Studies', description: 'Utility-scale POI engineering results across PJM, ERCOT, WECC, and NYISO.', images: ['/images/poi.webp'] },
}

type Study = { title: string; client?: string; scope?: string; work: string[]; results: string[] }

const studies: Study[] = [
  { title: 'CASE STUDY 1 — PJM 230 kV POI for 250 MW Solar + Storage', client: 'Client: Confidential renewable developer.', scope: 'Scope: Full POI engineering for solar PV + BESS.', work: ['Work: PJM study review, PSS®E dynamic/short-circuit models, reactive capability, one-lines, protection/switching plans and PRC relay-setting support.'], results: ['Result: models accepted on first submission; facilities work completed ahead of plan; successful first-attempt energization.'] },
  { title: 'CASE STUDY 2 — ERCOT 345 kV POI for 300 MW Wind Expansion', work: ['Work: PSS®E/TSAT models, steady-state/dynamic/fault packages, ERCOT coordination, protection and ICCP telemetry mapping.'], results: ['Result: no follow-up RFIs, early model certification and on-time market entry.'] },
  { title: 'CASE STUDY 3 — WECC 230 kV POI for 150 MW PV + 75 MW/300 MWh BESS', work: ['Work: PSS®E/PSCAD dynamic models, harmonics/SSR, EMT and SCADA/RTU support.'], results: ['Result: EMT report approved without major comments; PRC compliance achieved; modeling avoided major potential overruns.'] },
  { title: 'CASE STUDY 4 — NYISO 138 kV POI for 120 MW Wind Farm', work: ['Work: steady-state/dynamic models, LGIA technical appendices, protection coordination and short-circuit review.'], results: ['Result: first-round model acceptance, interconnection terms finalized without material changes and energization stayed on schedule.'] },
]

function BulletList({ items, result = false }: { items: string[]; result?: boolean }) {
  return <ul className="mt-3 space-y-3">{items.map((item) => <li key={item} className="flex gap-3 font-jost text-sm leading-6 text-[#4B5563] sm:text-base"><span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${result ? 'bg-emerald-100 text-emerald-700' : 'bg-[#A8228A]/10 text-[#A8228A]'}`}>{result ? '✓' : '→'}</span><span>{item}</span></li>)}</ul>
}

export default function PoiCaseStudiesPage() {
  return <><Header /><main className="overflow-x-clip bg-white">
    <section className="relative isolate overflow-hidden bg-[#06103C] pb-16 pt-36 sm:pb-20 sm:pt-44 lg:pb-24">
      <Image src="/images/poi.webp" alt="Point-of-interconnection electrical engineering for a utility-scale renewable project" fill priority className="object-cover opacity-55" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#06103C] via-[#06103C]/90 to-[#06103C]/45" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 font-jost text-sm text-white/65"><Link href="/" className="hover:text-white">Home</Link><span>/</span><Link href="/clients-and-projects" className="hover:text-white">Case Studies</Link><span>/</span><span className="text-white">POI Support</span></nav><p className="mb-4 font-jost text-xs font-bold uppercase tracking-[0.22em] text-[#F14BB9]">Client &amp; Project Experience</p><h1 className="max-w-5xl font-urbanist text-4xl font-black leading-[1.07] text-white sm:text-5xl lg:text-7xl">POI INTERCONNECTION SUPPORT CASE STUDIES</h1></div>
    </section>
    <PoiCaseStudyCards compact />
    <section className="border-y border-[#E3E6EF] bg-[#F6F7FB] py-16 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-10 max-w-3xl sm:mb-14"><p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#A8228A]">Selected Experience</p><h2 className="font-urbanist text-3xl font-black text-[#06103C] sm:text-5xl">POI INTERCONNECTION SUPPORT CASE STUDIES</h2></div><div className="space-y-8">{studies.map((study, index) => <article key={study.title} className="overflow-hidden rounded-3xl border border-[#DDE1EB] bg-white shadow-[0_12px_38px_rgba(6,16,60,0.07)]"><div className="grid lg:grid-cols-[0.36fr_0.64fr]"><div className="bg-[#06103C] p-6 text-white sm:p-8 lg:p-10"><span className="font-urbanist text-sm font-black tracking-[0.18em] text-[#F14BB9]">CASE STUDY {String(index + 1).padStart(2, '0')}</span><h3 className="mt-5 font-urbanist text-2xl font-black leading-tight sm:text-3xl">{study.title}</h3>{study.client && <div className="mt-7 border-t border-white/15 pt-6"><p className="font-jost text-xs font-bold uppercase tracking-[0.15em] text-white/50">Client</p><p className="mt-2 font-jost text-sm text-white/85">{study.client}</p></div>}{study.scope && <div className="mt-6"><p className="font-jost text-xs font-bold uppercase tracking-[0.15em] text-white/50">Scope</p><p className="mt-2 font-jost text-sm leading-6 text-white/80">{study.scope}</p></div>}</div><div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:p-10"><div><h4 className="font-urbanist text-lg font-black text-[#06103C]">Work</h4><BulletList items={study.work} /></div><div><h4 className="font-urbanist text-lg font-black text-[#06103C]">Result</h4><BulletList items={study.results} result /></div></div></div></article>)}</div></div></section>
  </main><Footer /></>
}
