import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { poiCaseStudies } from '@/lib/poiCaseStudies'

export function generateStaticParams() {
  return poiCaseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = poiCaseStudies.find((item) => item.slug === slug)
  if (!study) return {}
  return {
    title: `${study.title} | Keentel Engineering`,
    description: study.scope,
    openGraph: { title: study.title, description: study.scope, images: [study.image] },
  }
}

function List({ items, results = false }: { items: string[]; results?: boolean }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 font-jost text-base leading-7 text-gray-700">
          <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${results ? 'bg-emerald-100 text-emerald-700' : 'bg-[#A8228A]/10 text-[#A8228A]'}`}>{results ? '✓' : '→'}</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default async function PoiCaseStudyDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = poiCaseStudies.find((item) => item.slug === slug)
  if (!study) notFound()

  return (
    <>
      <Header />
      <main>
        <section className="relative isolate flex min-h-[620px] items-end overflow-hidden bg-[#06103C] pb-16 pt-36 sm:pb-20">
          <Image src={study.image} alt={study.title} fill priority sizes="100vw" className="object-cover opacity-65" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06103C] via-[#06103C]/88 to-[#06103C]/35" />
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-7 flex flex-wrap gap-2 font-jost text-sm text-white/65" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link><span>/</span>
              <Link href="/clients-and-projects" className="hover:text-white">Case Studies</Link><span>/</span>
              <Link href="/casestudies-poi-interconnection-support" className="hover:text-white">POI Support</Link>
            </nav>
            <p className="mb-4 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#F14BB9]">{study.region} · Point-of-Interconnection</p>
            <h1 className="max-w-5xl font-urbanist text-4xl font-black leading-[1.07] text-white sm:text-5xl lg:text-6xl">{study.title}</h1>
            <div className="mt-7 flex flex-wrap gap-6 font-jost text-sm text-white/75"><span><strong className="text-white">Client:</strong> {study.client}</span><span><strong className="text-white">Published:</strong> April 29, 2025</span></div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_0.3fr] lg:px-8">
            <article>
              <div className="mb-12">
                <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.18em] text-[#A8228A]">Background &amp; Scope</p>
                <h2 className="font-urbanist text-3xl font-black text-[#06103C]">Project Overview</h2>
                <p className="mt-5 font-jost text-lg leading-8 text-gray-700">{study.scope}</p>
              </div>
              <div className="space-y-10">
                <section><h2 className="font-urbanist text-2xl font-black text-[#06103C]">Services Provided</h2><List items={study.services} /></section>
                <section><h2 className="font-urbanist text-2xl font-black text-[#06103C]">Key Challenges</h2><List items={study.challenges} /></section>
                <section className="rounded-3xl bg-[#F4F5F9] p-6 sm:p-8"><h2 className="font-urbanist text-2xl font-black text-[#06103C]">Results</h2><List items={study.results} results /></section>
              </div>
            </article>
            <aside>
              <div className="sticky top-28 rounded-3xl bg-[#06103C] p-7 text-white">
                <p className="font-jost text-xs font-bold uppercase tracking-[0.18em] text-[#F14BB9]">Need POI support?</p>
                <h2 className="mt-3 font-urbanist text-2xl font-black">Accelerate your interconnection.</h2>
                <p className="mt-4 font-jost text-sm leading-6 text-white/75">Move from feasibility and modeling through protection design and energization with one accountable engineering team.</p>
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="mt-6 inline-flex w-full justify-center rounded-full bg-[#A8228A] px-5 py-3.5 font-jost text-sm font-semibold">Book a Consultation</Link>
                <Link href="/casestudies-poi-interconnection-support" className="mt-3 inline-flex w-full justify-center rounded-full border border-white/25 px-5 py-3.5 font-jost text-sm font-semibold">View all POI studies</Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
