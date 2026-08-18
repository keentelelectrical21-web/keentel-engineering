import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import type { CaseStudyCollection } from '@/lib/caseStudyContent'

export function caseStudyMetadata(title: string): Metadata {
  return { title: `${title} | Keentel Engineering` }
}

export default function CaseStudyCollectionPage({ collection }: { collection: CaseStudyCollection }) {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <section className="relative overflow-hidden bg-[#06103C] px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-40 lg:px-8">
          <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-[#A8228A]/25 blur-[110px]" />
          <div className="relative mx-auto max-w-5xl text-center">
            <p className="mb-4 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#F075D2]">Client &amp; Project Experience</p>
            <h1 className="font-urbanist text-4xl font-black leading-[1.06] text-white sm:text-5xl lg:text-6xl">{collection.title}</h1>
            {collection.introduction && <p className="mx-auto mt-6 max-w-3xl font-jost text-lg leading-relaxed text-white/80 sm:text-xl">{collection.introduction}</p>}
          </div>
        </section>

        <section className="bg-[#F7F8FC] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collection.entries.map((entry) => (
                <Link key={entry.title} href="/clients-and-projects" className="group overflow-hidden rounded-2xl border border-[#E1E4EC] bg-white shadow-[0_8px_28px_rgba(6,16,60,0.07)] transition hover:-translate-y-1 hover:border-[#A8228A]/40 hover:shadow-[0_18px_42px_rgba(6,16,60,0.13)]">
                  <div className="p-6">
                    <p className="font-jost text-xs font-bold uppercase tracking-[0.15em] text-[#A8228A]">Power System Study</p>
                    <h2 className="mt-3 font-urbanist text-2xl font-black leading-tight text-[#06103C]">{entry.title}</h2>
                    <div className="mt-3 space-y-3">
                      {entry.lines.map((line) => <p key={line} className="font-jost text-sm leading-6 text-slate-600">{line}</p>)}
                    </div>
                    <span className="mt-6 inline-flex font-jost text-sm font-bold text-[#A8228A]">View case study →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
