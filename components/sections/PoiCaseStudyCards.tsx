import Image from 'next/image'
import Link from 'next/link'
import { poiCaseStudies } from '@/lib/poiCaseStudies'

export default function PoiCaseStudyCards({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`${compact ? 'py-16 sm:py-20' : 'border-t border-[#E1E4EC] py-16 sm:py-24'} bg-[#F4F5F9]`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl sm:mb-12">
          <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#A8228A]">Grid Interconnection</p>
          <h2 className="font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-5xl">Point-of-Interconnection Support Case Studies</h2>
          <p className="mt-4 max-w-3xl font-jost text-base leading-7 text-gray-600">Proven POI delivery across PJM, ERCOT, WECC, and NYISO—from modeling and utility coordination through protection design and energization.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {poiCaseStudies.map((study, index) => (
            <Link key={study.slug} href={`/casestudies-poi-interconnection-support/${study.slug}`} className="group mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-[#DDE1EB] bg-white shadow-[0_6px_22px_rgba(6,16,60,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#A8228A]/40 hover:shadow-[0_20px_42px_rgba(6,16,60,0.14)] sm:max-w-none">
              <div className="relative aspect-[2/3] overflow-hidden bg-[#06103C]">
                <Image src={study.image} alt={study.shortTitle} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06103C]/55 via-transparent to-transparent" />
                <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-[#06103C]/90 px-3 py-1.5 font-jost text-[9px] font-bold uppercase tracking-[0.12em] text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">Open full study</span>
                <span className="absolute bottom-4 left-4 rounded-full bg-[#A8228A] px-3 py-1 font-jost text-[10px] font-bold uppercase tracking-wider text-white">{study.region}</span>
              </div>
              <div className="flex min-h-28 flex-col border-t border-[#E6E8F0] px-4 py-4">
                <h3 className="font-urbanist text-sm font-black leading-snug text-[#06103C]">{study.shortTitle}</h3>
                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <span className="font-urbanist text-[10px] font-black uppercase tracking-[0.14em] text-[#A8228A]">Project {String(index + 1).padStart(2, '0')}</span>
                  <span className="font-jost text-sm font-bold text-[#A8228A]">View page →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/casestudies-poi-interconnection-support" className="inline-flex rounded-full bg-[#06103C] px-7 py-3.5 font-jost text-sm font-semibold text-white transition hover:bg-[#A8228A]">View POI Case Studies Overview →</Link>
        </div>
      </div>
    </section>
  )
}
