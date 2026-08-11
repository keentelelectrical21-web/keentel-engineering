import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getAllCaseStudies } from '@/lib/caseStudies'

export const metadata: Metadata = {
  title: 'Power System Study Case Studies | Keentel Engineering',
  description: 'Selected power-system engineering case studies covering grounding, interconnection, reactive power, insulation coordination, and more.',
}

export const revalidate = 3600

export default async function PowerSystemStudyCaseStudiesPage() {
  const studies = (await getAllCaseStudies()).filter((study) => study.category === 'power-system')

  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <section className="relative overflow-hidden bg-[#06103C] px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-40 lg:px-8">
          <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-[#A8228A]/25 blur-[110px]" />
          <div className="relative mx-auto max-w-5xl text-center">
            <p className="mb-4 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#F075D2]">Client &amp; Project Experience</p>
            <h1 className="font-urbanist text-4xl font-black leading-[1.06] text-white sm:text-5xl lg:text-6xl">Power System Study Case Studies</h1>
            <p className="mx-auto mt-6 max-w-3xl font-jost text-lg leading-relaxed text-white/80 sm:text-xl">Explore selected engineering work across grounding, interconnection, reactive power, insulation coordination, power quality, and renewable integration.</p>
          </div>
        </section>

        <section className="bg-[#F7F8FC] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {studies.length > 0 ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{studies.map((study) => (
              <Link key={study._id} href={study.href || `/clients-and-projects/${study.slug.current}`} className="group overflow-hidden rounded-2xl border border-[#E1E4EC] bg-white shadow-[0_8px_28px_rgba(6,16,60,0.07)] transition hover:-translate-y-1 hover:border-[#A8228A]/40 hover:shadow-[0_18px_42px_rgba(6,16,60,0.13)]">
                {study.cardImage && <div className="aspect-[16/9] overflow-hidden bg-[#06103C]"><img src={study.cardImage} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>}
                <div className="p-6"><p className="font-jost text-xs font-bold uppercase tracking-[0.15em] text-[#A8228A]">Power System Study</p><h2 className="mt-3 font-urbanist text-2xl font-black leading-tight text-[#06103C]">{study.title}</h2>{study.subtitle && <p className="mt-3 font-jost text-sm leading-6 text-slate-600">{study.subtitle}</p>}<span className="mt-6 inline-flex font-jost text-sm font-bold text-[#A8228A]">View case study →</span></div>
              </Link>
            ))}</div> : <div className="rounded-2xl border border-[#E1E4EC] bg-white p-8 text-center"><p className="font-jost text-slate-600">Case studies are being prepared. Please contact us to discuss relevant project experience.</p></div>}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
