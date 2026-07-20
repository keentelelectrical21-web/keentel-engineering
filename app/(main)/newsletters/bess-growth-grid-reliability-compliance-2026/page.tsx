import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { NewsletterArticleClosing, NewsletterConnectCta } from '@/components/newsletter/NewsletterClosing'

export const metadata: Metadata = {
  title: 'BESS Growth, Grid Reliability & Compliance in 2026 | Keentel Engineering',
  description: 'The BESS deals, technologies, and market signals that mattered in June 2026, with engineering context for developers and grid operators.',
}

const demandRows = [
  ['Strongest pull', 'Utility-scale standalone storage; long-duration; high-cycling dispatch applications'],
  ['Emerging', 'Data centres and AI + energy infrastructure co-location'],
  ['Asset lifetime', 'Projects targeting 15-year-plus operating windows'],
  ['Supply-chain', 'Abundant, geographically diverse sodium reserves reduce concentration risk'],
]

const spanishProjects = [
  ['Oviedo', '700 MWh standalone BESS · 10-year toll signed February 2026'],
  ['Escuderos', '680 MWh solar-plus-storage · 12-year toll · operations from July 2028'],
  ['COD', 'Both projects targeted for commercial operation in 2027'],
  ['Hardware', '252 LFP-based CATL Tener Stack units (two-unit stacking design)'],
]

const projects = [
  { operator: 'OCI Energy · TX', project: 'Alamo City', note: 'Bexar County — broke ground 19 May. Four-hour duration is unusual for ERCOT merchant projects.', capacity: '120 MW / 480 MWh', offtake: '20-year capacity agreement with CPS Energy', cod: '2027' },
  { operator: 'MN8 Energy · CA', project: 'Pome BESS', note: 'Poway, San Diego County — fully contracted and now dispatching into CAISO.', capacity: '100 MW / 400 MWh', offtake: '10-year toll with Sonoma Clean Power', cod: 'Live' },
  { operator: 'GridStor · CO', project: 'Birdseye', note: "Adams County — GridStor's fifth acquisition in 18 months and second in the western US.", capacity: '199 MW / 796 MWh', offtake: 'TBD', cod: 'Late 2028' },
  { operator: 'Grenergy · GA', project: 'Beaver Creek', note: 'Baldwin County — hybrid solar plus storage; Georgia Power operates the battery.', capacity: '229 MW PV / 183 MWh BESS', offtake: '20-year PPA with Georgia Power', cod: 'Q3 2028' },
]

function DataTable({ rows }: { rows: string[][] }) {
  return <div className="mt-7 overflow-hidden rounded-xl border border-slate-200 bg-[#f8faff]">{rows.map(([label,value]) =>
    <div key={label} className="grid gap-1 border-b border-slate-200 px-5 py-4 last:border-b-0 sm:grid-cols-[150px_1fr]">
      <p className="text-xs font-black uppercase tracking-wider text-[#06103c]">{label}</p>
      <p className="font-jost text-sm leading-6 text-slate-600">{value}</p>
    </div>)}</div>
}

function StoryHeader({ category, title, date, region }: { category: string; title: string; date: string; region: string }) {
  return <><span className="inline-flex rounded-full bg-[#fdebf7] px-3 py-1 text-[10px] font-black uppercase tracking-[.17em] text-[#a8228a]">{category}</span>
    <h2 className="mt-4 font-urbanist text-3xl font-black leading-[1.12] text-[#06103c] sm:text-4xl">{title}</h2>
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-b border-slate-200 pb-5 text-[10px] font-black uppercase tracking-[.13em] text-slate-500"><span>{date}</span><span>{region}</span><span>Grid Scale</span></div></>
}

export default function BessGrowthNewsletterPage() {
  return <><Header /><main className="bg-white">
    <section className="relative flex min-h-[720px] items-center overflow-hidden bg-[#06103c] px-5 pb-20 pt-32 sm:min-h-[780px] sm:px-8 sm:pb-24 sm:pt-36">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_85%_15%,#c72e9e,transparent_35%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
        <div><Link href="/newsletters" className="mb-9 inline-flex text-sm font-semibold text-white/60 hover:text-white">← Back to newsletters</Link>
          <p className="text-xs font-black uppercase tracking-[.22em] text-[#ef48b8]">June 2026 Edition</p>
          <h1 className="mt-4 font-urbanist text-4xl font-black leading-[1.04] text-white sm:text-6xl">BESS Growth, Grid Reliability <span className="text-[#ef48b8]">& Compliance</span> in 2026</h1>
          <p className="mt-6 max-w-2xl font-jost text-lg leading-8 text-white/70">Three deals, two continents, and one big bet on what comes after lithium—the BESS stories that mattered this fortnight, with engineering context for project developers and grid operators.</p>
        </div>
        <div className="rounded-3xl border border-white/15 bg-white/5 p-3 shadow-2xl"><Image src="/images/newsletters/bess-growth-grid-reliability-compliance-2026.png" width={1200} height={750} priority alt="BESS Growth, Grid Reliability and Compliance in 2026" className="h-auto w-full rounded-2xl object-contain" /></div>
      </div>
    </section>

    <section className="relative z-10 mx-auto -mt-9 max-w-5xl px-5 sm:px-8"><div className="grid grid-cols-2 overflow-hidden rounded-2xl bg-[#071052] shadow-2xl md:grid-cols-4">{[['61.5','GWh','CATL supply deals'],['2.18','GWh','US projects advanced'],['1.38','GWh','Spain tolled capacity'],['20','yr','Longest offtake term']].map(([value,unit,label])=><div key={label} className="border-b border-r border-white/10 p-5 text-center last:border-r-0 md:border-b-0 sm:p-7"><p className="font-urbanist text-2xl font-black text-white sm:text-3xl">{value}<small className="ml-1 text-xs text-[#f06ac5]">{unit}</small></p><p className="mt-2 text-[9px] font-black uppercase tracking-wider text-white/55">{label}</p></div>)}</div></section>

    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,1fr)_300px]">
      <article className="min-w-0">
        <section><StoryHeader category="Technology · Q&A" title="HyperStrong bets on sodium-ion for the long game" date="20 May 2026" region="Asia & Oceania" />
          <div className="mt-7 space-y-5 font-jost text-[17px] leading-8 text-slate-600"><p>Two weeks after signing a 60 GWh multi-year sodium-ion supply agreement with CATL, HyperStrong founder and CEO Dr. Jianhui Zhang sat down to explain the firm&apos;s playbook—and it isn&apos;t about replacing lithium iron phosphate, at least not yet.</p><p>The pitch is lifecycle economics. Sodium-ion may not win on day-one procurement cost against LFP, but in projects where the math runs over 15-plus years, its advantages in cycle life, wide-temperature performance, and supply-chain resilience begin to compound.</p></div>
          <blockquote className="my-8 border-l-4 border-[#c72e9e] bg-[#fff5fb] px-6 py-6 font-jost text-lg italic leading-8 text-[#06103c]">“Sodium-ion may become increasingly competitive in applications where total lifecycle economics matter more than initial procurement cost alone.”<footer className="mt-3 text-sm font-bold not-italic text-[#a8228a]">— Dr. Jianhui Zhang, CEO, HyperStrong</footer></blockquote>
          <p className="font-jost text-[17px] leading-8 text-slate-600">Existing utility-scale systems can absorb sodium-ion through targeted changes to battery management, thermal management, operational logic, and lifecycle optimisation. Meaningful engineering investment is still needed to achieve commercial consistency and reliability.</p>
          <h3 className="mt-9 font-urbanist text-xl font-black text-[#06103c]">Where Zhang sees demand</h3><DataTable rows={demandRows} />
          <p className="mt-7 font-jost text-[17px] leading-8 text-slate-600">The longer-term thesis is plural rather than winner-take-all. Multiple chemistries can coexist, each serving applications where its electrochemical profile pays off as renewable penetration pushes operators toward resilience and lifecycle efficiency.</p>
        </section>

        <section className="mt-20 border-t-2 border-[#06103c] pt-14"><StoryHeader category="Deal · Europe" title="CATL lands 1.5 GWh of LFP for Grenergy's Spanish flagships" date="26 May 2026" region="Europe" />
          <div className="mt-7 space-y-5 font-jost text-[17px] leading-8 text-slate-600"><p>CATL will supply 252 stackable Tener Stack units across Grenergy&apos;s 700 MWh Oviedo standalone BESS and 680 MWh Escuderos solar-plus-storage site—both backed by decade-plus tolling agreements.</p><p>The Iberian blackout sharpened the grid-stability conversation, while a new law prioritising hybridised renewables-plus-storage has accelerated activity across Spain.</p></div>
          <h3 className="mt-9 font-urbanist text-xl font-black text-[#06103c]">The two projects</h3><DataTable rows={spanishProjects} />
          <p className="mt-7 font-jost text-[17px] leading-8 text-slate-600">Escuderos replicates the develop-lock-sell model Grenergy built in Chile. Long-term offtakes are the through-line, while the Tener Stack&apos;s modular architecture supports staged commissioning for hybrid sites.</p>
        </section>

        <section className="mt-20 border-t-2 border-[#06103c] pt-14"><StoryHeader category="Roundup · US & Canada" title="US in motion: four projects, four states, four operators" date="21 May 2026" region="US & Canada" />
          <p className="mt-7 font-jost text-[17px] leading-8 text-slate-600">OCI Energy, MN8 Energy, GridStor, and Grenergy each advanced projects collectively spanning more than 2.1 GWh across Texas, California, Colorado, and Georgia.</p>
          <div className="mt-8 hidden overflow-hidden rounded-xl border border-slate-200 md:block"><table className="w-full border-collapse text-left"><thead className="bg-[#071052] text-white"><tr>{['Operator','Project','Capacity','Offtake','COD'].map(h=><th key={h} className="px-4 py-4 text-[10px] uppercase tracking-wider">{h}</th>)}</tr></thead><tbody>{projects.map(p=><tr key={p.project} className="border-b border-slate-200 last:border-0"><td className="px-4 py-5 align-top text-xs font-black text-[#a8228a]">{p.operator}</td><td className="px-4 py-5 align-top"><p className="font-bold text-[#06103c]">{p.project}</p><p className="mt-2 text-xs leading-5 text-slate-500">{p.note}</p></td><td className="px-4 py-5 align-top text-sm font-bold text-[#06103c]">{p.capacity}</td><td className="px-4 py-5 align-top text-xs leading-5 text-slate-600">{p.offtake}</td><td className="px-4 py-5 align-top text-xs font-bold text-[#06103c]">{p.cod}</td></tr>)}</tbody></table></div>
          <div className="mt-7 grid gap-4 md:hidden">{projects.map(p=><div key={p.project} className="rounded-2xl border border-slate-200 bg-[#f8faff] p-5"><div className="flex items-center justify-between gap-3"><span className="text-xs font-black text-[#a8228a]">{p.operator}</span><span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-[#06103c]">{p.cod}</span></div><h3 className="mt-3 font-urbanist text-xl font-black text-[#06103c]">{p.project}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{p.note}</p><dl className="mt-4 grid gap-3 border-t border-slate-200 pt-4 text-sm"><div><dt className="text-[10px] font-black uppercase text-slate-400">Capacity</dt><dd className="font-bold text-[#06103c]">{p.capacity}</dd></div><div><dt className="text-[10px] font-black uppercase text-slate-400">Offtake</dt><dd className="text-slate-600">{p.offtake}</dd></div></dl></div>)}</div>
        </section>

        <section className="mt-16 rounded-2xl bg-[#071052] p-7 text-white sm:p-9"><p className="text-xs font-black uppercase tracking-[.18em] text-[#f06ac5]">Related engineering resources</p><div className="mt-6 space-y-5">{[
          ['/service/utility-scale-battery-storage','Utility-Scale Battery Storage Engineering Services','End-to-end BESS engineering, interconnection studies, modeling, and compliance.'],
          ['/bess-design-engineering-for-data-centers-and-utility-scale-deployments-sizing-selection-and-operation','BESS Design Engineering: Sizing, Selection & Operation','A technical deep-dive into utility-scale and data-centre BESS design.'],
          ['/newsletters/nerc-compliance-bess','NERC Compliance for BESS','Practical guidance for applying evolving NERC standards to storage assets.'],
        ].map(([href,title,desc])=><Link key={href} href={href} className="group block border-b border-white/10 pb-5 last:border-0 last:pb-0"><p className="font-urbanist font-bold group-hover:text-[#f06ac5]">{title} <span className="inline-block transition group-hover:translate-x-1">→</span></p><p className="mt-1 text-sm leading-6 text-white/55">{desc}</p></Link>)}</div></section>

        <div className="mt-10 grid gap-5 sm:grid-cols-2"><div className="rounded-2xl border border-slate-200 p-6"><p className="text-xs font-black uppercase tracking-wider text-[#a8228a]">What we&apos;re watching</p><p className="mt-3 font-jost leading-7 text-slate-600">Whether sodium-ion&apos;s lifecycle pitch translates into firm long-duration orders by year-end. The technology now needs bankable operating data at commercial scale.</p></div><div className="rounded-2xl border border-slate-200 p-6"><p className="text-xs font-black uppercase tracking-wider text-[#a8228a]">Pattern of the week</p><p className="mt-3 font-jost leading-7 text-slate-600">Long-dated offtakes connect all three stories—10, 12, and 20-year terms binding developers, utilities, and chemistries into the 2040s.</p></div></div>
        <NewsletterArticleClosing />
      </article>

      <aside className="lg:sticky lg:top-28 lg:self-start"><div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl"><p className="text-xs font-black uppercase tracking-[.16em] text-[#a8228a]">Let&apos;s discuss your project</p><h2 className="mt-3 font-urbanist text-2xl font-black text-[#06103c]">Move from market signal to bankable design.</h2><p className="mt-4 font-jost leading-7 text-slate-600">Talk with our engineers about BESS interconnection, modeling, NERC compliance, or owner&apos;s engineering.</p><Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="mt-6 flex justify-center rounded-xl bg-gradient-to-r from-[#c72e9e] to-[#7d258e] px-5 py-3.5 text-sm font-bold text-white">Schedule a consultation</Link><Link href="/contact" className="mt-3 flex justify-center rounded-xl border border-[#06103c]/15 px-5 py-3.5 text-sm font-bold text-[#06103c]">Contact Keentel</Link></div></aside>
    </div>
    <NewsletterConnectCta />
  </main><Footer /></>
}
