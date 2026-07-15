import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const capabilities = [
  ['Power System Studies', 'Load flow, short-circuit, arc-flash, protection coordination, harmonic, and stability studies aligned with owner and utility requirements.'],
  ['Substation & POI Design', 'Coordinated physical, electrical, protection, control, SCADA, and interconnection packages from concept through IFC.'],
  ['Utility Coordination', 'Technical applications, study-data packages, review responses, and issue resolution that reduce approval and redesign risk.'],
  ['Construction Support', 'RFI responses, vendor drawing reviews, field engineering, testing support, and as-built documentation through energization.'],
  ['NERC & Grid Compliance', 'Engineering evidence, model validation, commissioning support, and compliance-ready technical documentation.'],
  ['Owner & Vendor Alignment', 'Clear scope boundaries and coordinated deliverables across owners, OEMs, utilities, contractors, and commissioning teams.'],
]

const outcomes = [
  'Fewer design conflicts and late-stage changes',
  'Constructible, clearly scoped engineering packages',
  'Faster utility review and comment resolution',
  'Consistent technical assumptions across disciplines',
  'Reliable handoff from design through commissioning',
]

export default function EpcContractorsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[620px] items-end overflow-hidden">
          <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" aria-label="EPC contractors coordinating power infrastructure construction"><source src="/videos/epc.mp4" type="video/mp4" /></video>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(6,16,60,.96) 0%, rgba(6,16,60,.78) 55%, rgba(6,16,60,.35) 100%)' }} />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-40 sm:px-6 lg:px-8">
            <nav className="mb-6 flex items-center gap-2 font-jost text-xs"><Link href="/" className="text-white/50">Home</Link><span className="text-white/30">/</span><Link href="/industries" className="text-white/50">Industries</Link><span className="text-white/30">/</span><span className="text-white/80">EPC Contractors</span></nav>
            <div className="max-w-3xl">
              <p className="mb-4 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#C72E9E' }}>Industries We Serve</p>
              <h1 className="mb-6 font-urbanist text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">Electrical Engineering Support for EPC Contractors</h1>
              <p className="mb-9 max-w-2xl font-jost text-lg leading-relaxed text-white/75">Keentel helps EPC teams deliver utility, renewable, industrial, and mission-critical power projects with coordinated studies, design packages, compliance support, and field-ready engineering.</p>
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex rounded-full px-8 py-4 font-jost font-semibold text-white" style={{ background: 'linear-gradient(135deg,#C72E9E,#5B2A86)' }}>Discuss Your EPC Project</Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div><p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#A8228A' }}>Engineering Partner</p><h2 className="mb-6 font-urbanist text-3xl font-black leading-tight sm:text-4xl" style={{ color: '#06103C' }}>Engineering That Fits the EPC Delivery Model</h2><p className="mb-5 font-jost text-lg leading-relaxed text-gray-600">EPC schedules depend on accurate interfaces, timely decisions, and deliverables that are ready for procurement and construction. Our licensed engineers work inside your project controls and design workflow to close technical gaps early.</p><p className="font-jost text-lg leading-relaxed text-gray-600">We support greenfield and brownfield substations, generation, renewables, BESS, transmission, industrial plants, and large-load interconnections nationwide.</p></div>
            <div className="overflow-hidden rounded-3xl shadow-xl"><img src="/images/services/poi-interconnection/who-2-epc.jpeg" alt="EPC engineering and construction coordination" className="h-[420px] w-full object-cover" /></div>
          </div>
        </section>

        <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#A8228A' }}>Capabilities</p><h2 className="font-urbanist text-3xl font-black sm:text-4xl" style={{ color: '#06103C' }}>EPC Engineering Services Across the Project Lifecycle</h2></div><div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(([title, desc]) => <article key={title} className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"><h3 className="mb-3 font-urbanist text-xl font-bold" style={{ color: '#06103C' }}>{title}</h3><p className="font-jost text-sm leading-relaxed text-gray-600">{desc}</p></article>)}</div></div>
        </section>

        <section className="bg-white py-20 sm:py-24"><div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8"><div className="overflow-hidden rounded-3xl"><img src="/images/services/poi-interconnection/when-4-epc-handoff.jpeg" alt="EPC project handoff and construction support" className="h-[420px] w-full object-cover" /></div><div><p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#A8228A' }}>Project Outcomes</p><h2 className="mb-7 font-urbanist text-3xl font-black sm:text-4xl" style={{ color: '#06103C' }}>Reduce Risk Between Design and Construction</h2><ul className="space-y-4">{outcomes.map(item => <li key={item} className="flex gap-3 font-jost text-gray-700"><span className="font-bold" style={{ color: '#A8228A' }}>✓</span>{item}</li>)}</ul></div></div></section>

        <section className="py-20 text-center" style={{ background: 'linear-gradient(135deg,#06103C,#0B1A5B 55%,#5B2A86)' }}><div className="mx-auto max-w-3xl px-4"><h2 className="mb-5 font-urbanist text-4xl font-black text-white">Need an Engineering Partner for Your Next EPC Project?</h2><p className="mb-9 font-jost text-lg text-white/70">Bring our licensed power engineers into your project early to strengthen scope, coordination, constructability, and compliance.</p><Link href="/contact" className="inline-flex rounded-full px-8 py-4 font-jost font-semibold text-white" style={{ background: '#C72E9E' }}>Contact Our Team</Link></div></section>
      </main>
      <Footer />
    </>
  )
}
