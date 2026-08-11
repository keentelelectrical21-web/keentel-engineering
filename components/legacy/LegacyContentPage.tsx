import type { ReactNode } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

type Section = {
  title: string
  body?: string
  points?: string[]
}

export default function LegacyContentPage({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  sections,
  children,
}: {
  eyebrow: string
  title: string
  intro: string
  image?: string
  imageAlt?: string
  sections?: Section[]
  children?: ReactNode
}) {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <section className="relative overflow-hidden bg-[#06103C] px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-40 lg:px-8">
          <div className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-[#A8228A]/25 blur-[100px]" />
          <div className="relative mx-auto max-w-5xl text-center">
            <p className="mb-4 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#F075D2]">{eyebrow}</p>
            <h1 className="font-urbanist text-4xl font-black leading-[1.06] text-white sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="mx-auto mt-6 max-w-3xl font-jost text-lg leading-relaxed text-white/80 sm:text-xl">{intro}</p>
          </div>
        </section>

        {image && (
          <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 sm:-mt-10 sm:px-6 lg:px-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={imageAlt ?? title} className="aspect-[16/7] w-full rounded-3xl border border-white/30 object-cover shadow-[0_24px_70px_rgba(6,16,60,0.2)]" />
          </div>
        )}

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            {children}
            {sections && <div className="grid gap-6 md:grid-cols-2">{sections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-[#E1E4EC] bg-[#F8F9FC] p-6 shadow-sm sm:p-8">
                <h2 className="font-urbanist text-2xl font-black text-[#06103C]">{section.title}</h2>
                {section.body && <p className="mt-4 font-jost leading-7 text-slate-600">{section.body}</p>}
                {section.points && <ul className="mt-5 space-y-3">{section.points.map((point) => <li key={point} className="flex gap-3 font-jost text-sm leading-6 text-slate-700"><span className="font-bold text-[#A8228A]">•</span>{point}</li>)}</ul>}
              </article>
            ))}</div>}
          </div>
        </section>

        <section className="bg-[#071543] px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <h2 className="font-urbanist text-3xl font-black text-white sm:text-4xl">Discuss your engineering requirements with our team.</h2>
          <p className="mx-auto mt-4 max-w-2xl font-jost leading-7 text-white/70">Get practical, project-specific support from planning and modeling through design, compliance, and delivery.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center justify-center rounded-full bg-[#B3239B] px-7 py-3.5 font-jost font-bold text-white transition hover:bg-[#CF37B3]">Book a Consultation</Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 font-jost font-bold text-white transition hover:bg-white/10">Contact Keentel</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
