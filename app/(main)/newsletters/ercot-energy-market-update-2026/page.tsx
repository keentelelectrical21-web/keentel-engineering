import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { NewsletterArticleClosing, NewsletterConnectCta } from '@/components/newsletter/NewsletterClosing'
import { NewsletterSidebar } from '../[slug]/page'

export const metadata: Metadata = {
  title: 'ERCOT Energy Market Update 2026 | Keentel Engineering',
  description: 'Large-load growth, Senate Bill 6, the batch study redesign, and the road to a disciplined ERCOT interconnection queue.',
}

const sections = [
  {
    number: '01',
    eyebrow: 'Reading the Large-Load Queue',
    title: '440,000 MW of Requests, ~30,000 MW of Reality',
    paragraphs: [
      'The large-load interconnection queue sits near 440,000 MW as of spring 2026. That figure represents interconnection requests submitted by data centers and other large customers. It is emphatically not a forecast of what will energize.',
      'What separates request from reality is study progression. By the stricter measure of engineering phase—observed taking service, approved to energize, or planning study approved by the TSP and ERCOT—roughly 30,000 MW is firm through year-end 2030, and only about 6,000 MW has actually been observed energized.',
    ],
    subheading: 'Queue Composition Shift',
    detail: 'Three years ago, West Texas oil-and-gas electrification drove growth; then crypto mining surged. Today the queue is approximately 95% data center, with crypto near 3.3%, industrial about 1%, and hydrogen below 1% and declining. More than 180 projects above 1,000 MW account for nearly 300,000 MW of requested capacity.',
    takeaway: 'A single 1,000 MW campus is not just a bigger version of a 100 MW load—it is a different stability problem. Ride-through, protection, and consequential-load-loss performance are now gating interconnection issues, not afterthoughts.',
  },
  {
    number: '02', eyebrow: 'From Request to Reality', title: "ERCOT's 2026 Load Forecast & Inclusion Criteria",
    paragraphs: ["ERCOT's updated 2026 forecast shows a peak-demand trajectory rising from roughly 112,000 MW at year-end 2026 toward 367,000 MW by year-end 2032—load growth without precedent in the market's history.", "ERCOT's all-time summer peak is about 85,500 MW. A forecast crossing 100,000 MW in the near term collides with hard limits on what the transmission system and generation fleet can physically support."],
    subheading: 'What Gets a Load Into the Forecast',
    detail: 'Projects must disclose duplicative sites, demonstrate site control through an executed lease or deed, and provide a meaningful financial commitment: $100,000/MW of security, full payment for long-lead equipment, or full payment of the interconnection contribution.',
    takeaway: 'Beginning in 2027, a signed interconnection agreement becomes the forecast gate. Completed studies, accepted allocation, posted security, paid costs, and reported progress should produce a materially more disciplined forecast.',
  },
  {
    number: '03', eyebrow: 'Two Policy Tracks Reshaping Interconnection', title: 'The Batch Study Redesign & Senate Bill 6',
    paragraphs: ['ERCOT and the PUCT are advancing a batch study redesign and Senate Bill 6 implementation in parallel—fundamentally reshaping how large loads connect to the grid.', 'Batch Zero is designed to clear a two-to-three-year backlog of loads that have already energized or advanced far through the process. ERCOT is also defining paths for controllable load resources and bring-your-own-generation arrangements.'],
    subheading: 'Three Paths Where Transmission Is Oversubscribed',
    detail: 'A large load can wait for the next batch, accept a reduced allocation until transmission is built, or pursue BYOG and energize the campus behind on-site generation subject to a withdrawal limit. Proposed study fees and financial security deliberately front-load project readiness.',
    takeaway: 'Projects that complete credible interconnection engineering early—and can secure long-lead equipment—will move faster and forfeit less if development plans change.',
  },
  {
    number: '04', eyebrow: 'Paying for the Grid', title: 'Transmission Cost Allocation Shifts from 4CP to 12CP',
    paragraphs: ['Transmission cost is now a first-order issue, potentially bigger than energy itself. The PUCT studied alternatives to the Four Coincident Peak method of allocating transmission costs.', 'Staff recommended a 12CP approach with a 30-minute measurement interval and a minimum demand charge for large loads of 250 MW and above. The transmission postage-stamp charge has already risen, with further increases expected.'],
    subheading: 'PUCT Staff Recommendation',
    detail: 'Move to 12 monthly coincident peaks and base the minimum charge for the largest customers on non-coincident peak demand or the contracted peak at which the facility was studied. The proposal remains subject to commission modification.',
    takeaway: 'Operational flexibility, equipment performance, and timely peak alerts are becoming core cost-control disciplines for large energy buyers.',
  },
  {
    number: '05', eyebrow: 'Reliability, Reserve Margins & Supply', title: 'Supply Must Scale With Demand',
    paragraphs: ["ERCOT's most recent capacity report shows projected reserve margins going negative across 2027, 2028, and 2029 under the current load forecast. We read this less as a prediction of certain blackouts and more as a forcing function: supply must scale, while demand will be constrained by physical and economic limits.", 'Potential measures include updating the Cost of New Entry, strengthening dispatchable reliability reserves, revisiting offer caps and scarcity pricing, and recalibrating the value of lost load.'],
    subheading: 'Texas Energy Fund & Demand Response',
    detail: 'Approved and pending Texas Energy Fund projects point toward approximately 7,000–8,000 MW of new ERCOT-dedicated gas generation. Yet generation alone will not serve all incoming load; commercial, industrial, and residential demand response must also scale rapidly.',
    takeaway: 'Demand response is the under-built resource in the ERCOT growth story.',
  },
  {
    number: '06', eyebrow: 'Market Mechanics: RTC+B', title: 'Real-Time Co-Optimization Plus Batteries',
    paragraphs: ['A structural market change went live in December 2025. Real-time co-optimization dispatches energy and ancillary services together, while battery resources are modeled as a single device with a state-of-charge constraint.', 'ERCOT projected substantial annual efficiency savings. Early 2026 performance, including a winter stress event with peaks near 85 GW, has been stable, with scarcity largely absorbed in ancillary-service markets.'],
    subheading: 'Risk Moves Toward the Tails',
    detail: 'RTC+B is not inherently inflationary. It makes real-time events and tight ancillary-service hours more consequential, while congestion and basis become increasingly localized, node-specific, and short-duration.',
    takeaway: 'CRR coverage and nodal-risk management matter more, particularly in the western region.',
  },
  {
    number: '07', eyebrow: 'Fundamentals & Forward Pricing', title: 'Summer 2026 Outlook & Market Conditions',
    paragraphs: ['ERCOT forward prices softened into mid-2026 on mild weather and low seasonal demand, then began ticking up as the long-term load forecast firmed. Calendar strips have traded near the lower end of their historical ranges.', 'A developing El Niño favors a warm west and south, with 2018 and 2023 cited as analog years—both periods of significant price volatility. Texas Gulf Coast LNG exports continue to grow, but deep local gas supply insulates ERCOT from much of the volatility seen in import-dependent markets.'],
    subheading: 'Planning Implication',
    detail: 'Low average forward prices should not be mistaken for low exposure. Local congestion, weather-driven peaks, and short scarcity intervals can dominate project economics.',
    takeaway: 'Hedging strategies should be tested against nodal and tail risk, not only average energy prices.',
  },
  {
    number: '08', eyebrow: 'What This Means for Stakeholders', title: 'Interconnection Is Now the Binding Constraint',
    paragraphs: ['The throughline across every topic is that interconnection now constrains schedule, cost, and whether a project happens at all.', 'For developers, ride-through, protection coordination, controllable-load behavior, and BYOG sequencing are gating design decisions. For utilities and TSPs, batch studies and new transmission demand disciplined modeling. For buyers, transmission exposure now rivals energy as a cost driver.'],
    subheading: 'The Signal Behind the Headline',
    detail: 'The story is not 440,000 MW of requests. It is the approximately 30,000 MW that is study-backed today—and the engineering and policy machinery being built to separate credible projects from speculative queue volume.',
    takeaway: 'Projects that engineer interconnection first will define the next phase of the Texas grid.',
  },
]

const faqs = [
  ['ERCOT’s large-load queue is around 440,000 MW. Is that how much new load is actually coming?', 'No. The queue is an inventory of interconnection requests, not a forecast. Roughly 30,000 MW is currently study-backed through 2030 and only about 6,000 MW has been observed taking service. Study progression, site control, financial commitment, and an executed interconnection agreement provide a much stronger signal of what can energize.'],
  ['What kind of load is driving the growth, and why do data-centre projects matter?', 'The queue is now overwhelmingly data-centre driven. Individual campuses can reach 1,000 MW or more, so a sudden trip becomes a regional frequency and voltage event rather than an ordinary customer interruption. Ride-through, protection, and staged energization must therefore be resolved early.'],
  ['How does projected 2026 ERCOT electrical demand compare with current conditions?', 'The forecast rises from roughly 112,000 MW at year-end 2026 toward 367,000 MW by 2032, compared with an all-time summer peak near 85,500 MW. This gap highlights why transmission, generation, and credible project screening are essential.'],
  ['Are ERCOT’s large-load queue and load forecast realistic?', 'They should be read as planning signals, not guaranteed demand. Duplicative sites, projects without site control, and loads without financial commitment will fall away as the new inclusion criteria and signed-interconnection-agreement requirement take effect.'],
  ['What is Batch Zero, and how does it differ from later batches?', 'Batch Zero is designed to clear the existing backlog of loads that have already energized or progressed far through the process. Later batches will operate under more standardized readiness, allocation, security, and study requirements.'],
  ['What is BYOG, and why is it attractive?', 'Bring-your-own-generation lets a campus pair new generation with its load and energize according to the generation commissioning schedule, subject to ERCOT rules and a defined grid-withdrawal limit. It can reduce dependence on near-term transmission availability but still requires detailed studies.'],
  ['What does Senate Bill 6 actually change?', 'Senate Bill 6 provides the statutory foundation for stronger large-load forecasting, interconnection standards, financial commitments, net-metering rules, and potential reliability services for flexible loads. It moves readiness and accountability earlier in development.'],
  ['What financial commitments are proposed under the new interconnection standards?', 'Draft concepts include study fees based on project size, optional early funding of long-lead equipment, approximately $50,000/MW of financial security, and non-refundable payments tied to the interconnection agreement. Final amounts and refundability may evolve.'],
  ['Why is transmission-cost allocation shifting from 4CP to 12CP?', 'A 12CP method with a 30-minute interval better reflects year-round transmission use and reduces the ability to avoid costs by curtailing during only four summer peaks. A minimum demand charge is also being considered for loads of 250 MW and above.'],
  ['ERCOT’s reserve margins go negative in 2027–2029. Does that mean blackouts are certain?', 'No. The forecast is a warning based on current assumptions, not a certainty. It signals that new supply, transmission, realistic load screening, demand response, and market reforms must develop faster to preserve reliability.'],
  ['What is RTC+B, and how does it affect price risk?', 'Real-time co-optimization plus batteries jointly dispatches energy and ancillary services while modeling storage as a single state-of-charge-constrained device. It improves efficiency but makes tight ancillary-service intervals, congestion, and nodal basis more consequential.'],
  ['Why are Texas power futures still relatively inexpensive given the bullish outlook?', 'Forward curves reflect mild recent weather, abundant Texas gas, and uncertainty over how much queued load will actually materialize. Lower average forwards do not eliminate exposure to localized congestion, scarcity intervals, and extreme-weather tails.'],
  ['How does conflict in the Middle East affect Texas power-contract prices?', 'ERCOT is partly insulated by deep local natural-gas supply, but global LNG demand, shipping risk, and geopolitical volatility can still influence Gulf Coast gas pricing and longer-dated power expectations. The effect is usually indirect rather than one-for-one.'],
  ['What is the market outlook for summer and through 2029?', 'Near-term average pricing remains comparatively moderate, but weather analogs, growing LNG exports, localized transmission constraints, and rapid large-load development create meaningful upside-tail risk. Flexible operations and nodal hedging remain important.'],
]

function ErcotStats() {
  return <div className="mb-10 grid grid-cols-2 overflow-hidden rounded-xl bg-[#06103C] md:grid-cols-4">{[['440k','MW queue requests'],['~30k','MW study-backed'],['~6k','MW energized'],['95%','data-center share']].map(([value,label])=><div key={label} className="border-b border-white/10 px-3 py-6 text-center md:border-b-0 md:border-r last:border-r-0"><p className="font-urbanist text-3xl font-black text-white">{value}</p><p className="mt-1 font-jost text-[11px] uppercase tracking-wide text-white/60">{label}</p></div>)}</div>
}

function ErcotIntroduction() {
  return <p className="mb-12 border-b border-[#06103C]/20 pb-8 font-jost text-[15px] leading-7 text-slate-700 sm:text-base">The Electric Reliability Council of Texas is in the middle of the most consequential demand-side transformation in its history. Hundreds of thousands of megawatts of large-load requests—overwhelmingly data centers—have arrived faster than the grid can study, plan, and build for them. This brief distills the policy and market signals that matter most through an <strong className="text-[#06103C]">interconnection-first engineering</strong> lens.</p>
}

export default function ErcotMarketUpdatePage() {
  return <><Header /><main className="overflow-hidden bg-white">
    <section className="relative flex min-h-[calc(100svh-var(--site-header-height))] items-center overflow-hidden bg-[#06103c] px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-36">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_85%_15%,#c72e9e,transparent_35%)]" />
      <div className="relative mx-auto w-full max-w-6xl">
        <Link href="/newsletters" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white">← Back to newsletters</Link>
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
          <div><p className="mb-3 font-jost text-sm uppercase tracking-wide text-[#C72E9E]">July 2026 Edition</p>
            <h1 className="mb-5 max-w-4xl font-urbanist text-4xl font-black leading-[1.06] text-white sm:text-5xl lg:text-6xl">ERCOT Energy Market Update 2026</h1>
            <p className="mt-5 max-w-2xl font-jost text-lg leading-8 text-white/70">Large-load growth, Senate Bill 6, the batch study redesign, and the road to a disciplined interconnection queue.</p>
          </div>
          <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-3xl border border-white/15 bg-white/[.07] p-3 shadow-2xl"><Image src="/images/newsletters/ercot-energy-market-update-july-2026.png" alt="ERCOT Energy Market Update July 2026" width={1200} height={750} priority className="h-auto w-full rounded-2xl bg-white object-contain" /></div>
        </div>
      </div>
    </section>

    <div className="bg-[#F6F7FB] px-5 pb-20 sm:px-8 sm:pb-28"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-10">
      <article className="min-w-0 rounded-2xl border border-[#E1E4EC] bg-white px-5 py-8 shadow-[0_10px_28px_rgba(6,16,60,0.06)] sm:px-9 sm:py-10"><ErcotStats /><ErcotIntroduction />{sections.map((section,index)=><section key={section.number} className={index ? 'mt-14 border-t border-[#06103C]/20 pt-8' : ''}><div className="py-6 first:pt-0">
      <div><p className="mb-3 font-jost text-sm font-bold uppercase tracking-[0.08em] text-[#A8228A]">{section.eyebrow}</p><h2 className="font-urbanist text-2xl font-black leading-tight text-[#06103C] md:text-3xl">{section.title}</h2>
        <div className="mt-6 space-y-5 font-jost text-[15px] leading-7 text-slate-700 sm:text-base">{section.paragraphs.map(p=><p key={p}>{p}</p>)}</div>
        <div className="mt-8 rounded-xl border border-[#E1E4EC] bg-[#F7F8FC] p-5 sm:p-6"><h3 className="font-urbanist text-xl font-black leading-snug text-[#A8228A]">{section.subheading}</h3><p className="mt-3 font-jost text-[15px] leading-7 text-slate-700 sm:text-base">{section.detail}</p></div>
        <blockquote className="my-8 rounded-r-lg border-l-[5px] border-[#A8228A] bg-[#FDF5F5] px-6 py-4 font-jost text-[15px] font-semibold leading-7 text-[#06103C] sm:text-base">{section.takeaway}</blockquote>
      </div></div></section>)}<NewsletterArticleClosing /></article>
      <NewsletterSidebar />
    </div></div>

    <section className="border-y border-slate-200 bg-white px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-4xl"><p className="text-xs font-black uppercase tracking-[.22em] text-[#a8228a]">Technical FAQ</p><h2 className="mt-3 font-urbanist text-4xl font-black text-[#06103c] sm:text-5xl">The 2026 ERCOT market, answered.</h2><p className="mt-5 max-w-2xl font-jost text-lg leading-8 text-slate-600">Questions we hear most often from developers, utilities, and large energy buyers. Answers reflect conditions as of mid-2026; several rulemakings remain in progress.</p>
      <div className="mt-10 space-y-4">{faqs.map(([question,answer],i)=><details key={question} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm open:shadow-md"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 bg-[#a8228a] p-4 font-urbanist text-base font-bold text-white sm:px-5"><span><span className="mr-2 text-white/70">Q{i+1}.</span>{question}</span><span className="text-xl text-white transition-transform group-open:rotate-45">+</span></summary><p className="px-5 py-5 font-jost leading-7 text-slate-600 sm:px-6">{answer}</p></details>)}</div>
    </div></section>

    <NewsletterConnectCta />
  </main><Footer /></>
}
