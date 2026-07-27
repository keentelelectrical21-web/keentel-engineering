import Image from 'next/image'
import Link from 'next/link'

const services = [
  { short: 'Studies', title: 'Power System Studies', desc: 'Load flow, short circuit, protection coordination, arc flash, harmonics, transient stability, grounding, and cable thermal analysis.', href: '/service/power-system-studies', image: '/images/services/power-system-studies/overview-engineers.jpg', scope: 'EHV · HV · MV' },
  { short: 'Substations', title: 'Substation Design', desc: 'Primary and secondary HV/MV design, one-lines, layouts, P&C schematics, relay settings, CT/VT sizing, and IEC 61850 automation.', href: '/service/substation-design', image: '/images/services/service-substation.png', scope: 'HV · MV · IEC 61850' },
  { short: 'POI', title: 'POI Interconnection Engineering', desc: 'Interconnection strategy, power flow, transient stability, and affected-system support across ERCOT, CAISO, PJM, SPP, and other organized markets.', href: '/service/poi-interconnection-engineering-support', image: '/images/services/service-poi.jpg', scope: 'ERCOT · SPP · PJM · CAISO' },
  { short: 'Transmission', title: 'Transmission Line Design', desc: 'Electrical and structural engineering, routing, conductor selection, sag-tension analysis, and standards-compliant line design.', href: '/service/transmission-line-design', image: '/images/services/transmission-line-design/renewable-towers.webp', scope: 'Routing · Structural · Electrical' },
  { short: 'Renewables', title: 'Utility Scale Renewable Energy', desc: 'Integrated electrical engineering and grid support for utility-scale solar, wind, and battery energy storage projects.', href: '/service/utility-scale-renewable-energy', image: '/images/services/utility-scale-renewable-energy/hero-towers.webp', scope: 'Solar · Wind · BESS' },
  { short: "Owner's Engineer", title: "Owner's Engineer Services", desc: 'Independent technical oversight, design reviews, procurement support, and project coordination from development through commissioning.', href: '/service/owners-engineer', image: '/images/services/owners-engineer/construction-workers.jpg', scope: 'Design · Procurement · Delivery' },
  { short: 'MEP', title: 'MEP Engineering Services', desc: 'Integrated mechanical, electrical, plumbing, and fire-protection engineering for complex commercial and industrial facilities.', href: '/service/mep-engineering', image: '/images/services/mep-engineering/Integrated MEP Engineering Services for Complex Facility Projects.jpg', scope: 'Mechanical · Electrical · Plumbing' },
  { short: 'Compliance', title: 'NERC Compliance Services', desc: 'FAC-008, PRC, TPL, and MOD testing and modeling, with experienced audit preparation and compliance support.', href: '/service/nerc-compliance', image: '/images/services/service-nerc.jpg', scope: 'MOD · PRC · FAC · TPL' },
  { short: 'Nuclear', title: 'Nuclear Power Plant Engineering', desc: 'Safety-focused electrical engineering, system studies, equipment upgrades, and lifecycle support for nuclear power facilities.', href: '/service/nuclear-power-plant', image: '/images/services/nuclear/Expert Nuclear Electrical Engineering From Design to Decades of Reliable Operation.webp', scope: 'Safety · Reliability · Lifecycle' },
]

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-[#F4F5F9] py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A8228A]/40 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-[#A8228A]/[0.06] blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 w-full lg:mb-12">
          <h2 className="w-full font-urbanist text-3xl font-black leading-[1.04] text-[#06103C] sm:text-4xl lg:text-5xl">One team. Every critical power-system discipline.</h2>
          <p className="mt-4 w-full font-jost text-sm leading-relaxed text-[#536078] sm:text-base">Specialized engineering expertise across the complete power-system lifecycle—from interconnection and studies to design, compliance, and delivery.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article key={service.title} className="group flex min-h-full flex-col overflow-hidden rounded-2xl border border-[#DDE1EA] bg-white shadow-[0_12px_35px_rgba(6,16,60,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#A8228A]/25 hover:shadow-[0_20px_45px_rgba(6,16,60,0.12)]">
              <Link href={service.href} className="relative block aspect-[16/9] overflow-hidden bg-[#06103C]" aria-label={`Explore ${service.title}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06103C]/60 via-transparent to-transparent" />
              </Link>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="mb-2 font-jost text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#A8228A]">{service.short}</p>
                <h3 className="font-urbanist text-xl font-black leading-tight text-[#06103C] sm:text-2xl">{service.title}</h3>
                <p className="mt-3 flex-1 font-jost text-sm leading-relaxed text-[#687287]">{service.desc}</p>
                <Link href={service.href} className="mt-5 inline-flex items-center font-jost text-sm font-bold text-[#06103C] transition group-hover:text-[#A8228A]">
                  Explore service
                  <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link href="/services" className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#06103C]/15 bg-white px-7 py-3 font-jost text-sm font-bold text-[#06103C] shadow-sm transition hover:-translate-y-0.5 hover:border-[#A8228A]/30 hover:text-[#A8228A] sm:w-auto">
            View All Services <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
