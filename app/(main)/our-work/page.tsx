import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Services from '@/components/sections/Services'
import Industries from '@/components/sections/Industries'
import ContactForm from '@/components/sections/ContactForm'
import FAQ from '@/components/sections/FAQ'
import Blog from '@/components/sections/Blog'
import WhoWeServed from '@/components/service/WhoWeServed'
import { getAllCaseStudies } from '@/lib/caseStudies'

export const revalidate = 3600

const stats = [
  { value: '30+', label: 'Years of engineering experience' },
  { value: '120+', label: 'Engineering projects delivered' },
  { value: '21', label: 'Licensed engineering professionals' },
  { value: 'Nationwide', label: 'Utility and developer support' },
]


const projectFaqs = [
  { q: 'What does POI interconnection engineering support include from start to finish?', a: 'Keentel supports the full path from feasibility review and utility coordination through POI substation design, protection and control, grounding, studies, construction drawings, commissioning, and utility acceptance documentation.' },
  { q: 'How does Keentel help reduce interconnection delays and study rework?', a: 'We validate equipment data, transformer impedances, inverter controls, grounding parameters, and study assumptions early, then coordinate technically defensible responses to utility and ISO comments.' },
  { q: 'What are the most common POI risks for solar, wind, and BESS projects?', a: 'Typical risks include weak-grid conditions, voltage and reactive-power gaps, harmonics, flicker, protection miscoordination, transformer energization impacts, SCADA integration, and grounding noncompliance.' },
  { q: 'Which drawings and deliverables are typically required at the POI?', a: 'Typical deliverables include single-line diagrams, layouts, grounding plans, cable schedules, AC/DC station service, protection and control schematics, relay logic, metering, telecom/SCADA architecture, specifications, and commissioning procedures.' },
  { q: 'Which power system studies does Keentel perform?', a: 'We perform load flow, contingency, short-circuit, protection coordination, arc-flash, harmonic and power-quality, motor-starting, voltage-drop, transient-stability, and grounding studies tailored to the facility and utility requirements.' },
  { q: 'Why are short-circuit studies critical for EHV/HV/MV systems?', a: 'They verify equipment interrupting and withstand ratings, define protective-device settings, confirm breaker duty compliance, and support utility approval and safe operation.' },
  { q: 'Can Keentel study weak-grid and inverter-based resource interconnections?', a: 'Yes. We evaluate short-circuit ratio, reactive margin, voltage regulation, and control interactions, then recommend practical mitigation such as STATCOMs, synchronous condensers, or tuned controls.' },
  { q: 'How does Keentel support commissioning and energization readiness?', a: 'We prepare test plans, review FAT/SAT procedures, verify relay settings, check point-to-point wiring, validate SCADA signals, support witness testing, and help close energization punch lists.' },
  { q: 'What makes Keentel a strong engineering partner?', a: 'Our combined expertise in studies, substation design, protection and control, interconnection, and compliance helps clients reduce surprises, accelerate approvals, and deliver reliable energized assets.' },
  { q: 'What software platforms does Keentel use for interconnection engineering?', a: 'Depending on the utility and study type, we use ETAP, PSS®E, PSCAD, and other industry-standard platforms matched to project requirements and acceptance criteria.' },
  { q: 'What are typical project risks in substation construction and how do you mitigate them?', a: 'We address scope creep, equipment lead times, layout clashes, grounding issues, and late utility comments through early standards alignment, constructability reviews, coordinated layouts, clear specifications, and disciplined change management.' },
  { q: 'How does Keentel approach protection and control at the POI?', a: 'We develop a utility-aligned protection philosophy, perform coordination studies, confirm CT/PT sizing, validate relay settings, and integrate protection with SCADA and metering.' },
  { q: 'What data does Keentel need to begin a study?', a: 'Typical inputs include one-lines, equipment ratings, transformer impedances and taps, cable data, protective-device details, load profiles, generator or inverter parameters, and utility source equivalents. Partial data can be refined as design progresses.' },
  { q: 'How do you ensure study results are defensible for utility or ISO review?', a: 'We document assumptions, model sources, study criteria, validation checks, and recommendations clearly, then align results with applicable utility, ISO, NERC, and IEEE requirements.' },
  { q: 'How are study results converted into actionable design changes?', a: 'Results become specific actions such as breaker upgrades, relay-setting updates, CT/PT changes, cable sizing, reactive compensation, filter selection, or layout modifications.' },
  { q: 'What does Keentel do as Owner’s Engineer?', a: 'We represent the owner’s technical interests by reviewing EPC deliverables, validating study assumptions, checking compliance, supporting procurement evaluations, and verifying construction and commissioning quality.' },
  { q: 'When should an Owner’s Engineer be engaged?', a: 'Ideally at project initiation—before major procurement and interconnection milestones—so technical requirements are established early and costly redesigns and change orders are avoided.' },
  { q: 'What EPC deliverables does Keentel typically review?', a: 'We review the basis of design, single-line diagrams, layouts, grounding, protection and control drawings, equipment specifications, telecom/SCADA architecture, studies, commissioning procedures, and as-built packages.' },
  { q: 'How does Keentel reduce owner cost exposure?', a: 'We identify design gaps before procurement, prevent scope drift, reduce rework, minimize change orders, and support technical bid evaluations so owners select fit-for-purpose equipment.' },
  { q: 'How do you support schedules and milestones?', a: 'We track utility submittals, study approvals, equipment lead times, commissioning readiness, and cutover sequencing, aligning technical deliverables with critical-path milestones.' },
  { q: 'Do you support construction and commissioning?', a: 'Yes. We provide field engineering, witness testing, test-result review, relay-setting validation, energization-readiness support, and owner-side punch-list closure.' },
  { q: 'How do you manage interfaces among owner, EPC, utility, and OEMs?', a: 'We lead technical coordination meetings, maintain comment-resolution logs, track decisions, and document action items so every stakeholder follows consistent technical direction.' },
  { q: 'What is the difference between coordination studies and arc-flash studies?', a: 'Coordination studies ensure protective devices operate selectively; arc-flash studies calculate incident energy and PPE boundaries. We perform them together because coordination directly affects arc-flash results.' },
]

type CaseStudy = Awaited<ReturnType<typeof getAllCaseStudies>>[number]

const powerSystemImages: Record<string, string> = {
  'power-system-effectively-grounded-system-analysis': '/images/our-work/power-system/case-study-1.webp',
  'power-system-energy-loss-substation-layout-optimization': '/images/our-work/power-system/case-study-2.webp',
  'power-system-transformer-inrush-poi-rvc-flicker': '/images/our-work/power-system/case-study-3.webp',
  'power-system-fast-front-slow-front-gis-vfto': '/images/our-work/power-system/case-study-4.webp',
  'power-system-insulation-coordination-lightning-tov-trv': '/images/our-work/power-system/case-study-5.webp',
  'power-system-reactive-power-compensation-capacitor-bank': '/images/our-work/power-system/case-study-6.webp',
  'power-system-solar-wind-farm-electrical-design': '/images/our-work/power-system/case-study-7.webp',
  'power-system-grid-interconnection-renewable-penetration': '/images/our-work/power-system/case-study-8.webp',
}

function ProjectGrid({
  eyebrow,
  title,
  description,
  projects,
  background = 'bg-white',
}: {
  eyebrow: string
  title: string
  description: string
  projects: CaseStudy[]
  background?: string
}) {
  return (
    <section className={`${background} py-16 sm:py-20 lg:py-24`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#A8228A]">{eyebrow}</p>
            <h2 className="font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mt-4 font-jost text-base leading-relaxed text-gray-600 sm:text-lg">{description}</p>
          </div>
          <Link href="/our-work" className="inline-flex w-fit items-center gap-2 rounded-full border border-[#06103C]/15 bg-white px-6 py-3 font-jost text-sm font-semibold text-[#06103C] transition hover:border-[#A8228A] hover:text-[#A8228A]">
            Explore all projects <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {projects.map((project, index) => (
          <Link key={project._id} href={`/clients-and-projects/${project.slug.current}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E5EF] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EEF0F6]">
                {project.cardImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.cardImage} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center font-urbanist text-5xl font-black text-[#06103C]/15">K</div>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-[#06103C]/90 px-3 py-1.5 font-jost text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">{eyebrow}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#A8228A]">Project {String(index + 1).padStart(2, '0')}</p>
                <h3 className="font-urbanist text-lg font-bold leading-snug text-[#06103C]">{project.title}</h3>
                <span className="mt-auto pt-5 font-jost text-sm font-semibold text-[#A8228A]">View case study →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function OurWorkPage() {
  const caseStudies = await getAllCaseStudies()
  const substation = caseStudies.filter(caseStudy => caseStudy.category === 'substation')
  const powerSystem = caseStudies.filter(caseStudy => caseStudy.category === 'power-system')

  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <section className="relative isolate flex min-h-[680px] items-end overflow-hidden bg-[#06103C] sm:min-h-[720px]">
          <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover" aria-label="Electrical engineering projects">
            <source src="/videos/Our%20Clients%20%26%20Projects.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#06103C]/95 via-[#06103C]/80 to-[#06103C]/35" />
          <div className="relative z-10 mx-auto flex min-h-[680px] w-full max-w-7xl items-end px-4 pb-10 pt-32 sm:min-h-[720px] sm:px-6 sm:pb-16 sm:pt-40 lg:px-8">
            <div className="max-w-4xl">
              <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 font-jost text-sm text-white/65">
                <Link href="/" className="transition hover:text-white">Home</Link><span>/</span><span className="text-white">Our Clients &amp; Projects</span>
              </nav>
              <p className="mb-4 font-jost text-xs font-bold uppercase tracking-[0.22em] text-[#F14BB9]">Clients &amp; Project Experience</p>
              <h1 className="max-w-4xl font-urbanist text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-7xl">Engineering Projects That Deliver Results</h1>
              <p className="mt-6 max-w-3xl font-jost text-lg leading-relaxed text-white/80 sm:text-xl">Power system studies, substation engineering, grid interconnection, protection, and compliance projects delivered for utilities, developers, EPC contractors, and industrial facilities across the United States.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#case-studies" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C72E9E] to-[#7A2A91] px-7 py-4 font-jost font-semibold text-white transition hover:-translate-y-0.5">Explore Case Studies</Link>
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-4 font-jost font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">Schedule a Consultation</Link>
              </div>
              <div className="mt-12 border-t border-white/15 pt-7">
                <p className="mb-4 font-jost text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">Certifications &amp; Memberships</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/cert-logos.png" alt="Keentel certifications and professional memberships" className="h-16 max-w-full object-contain object-left brightness-0 invert sm:h-20" />
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 border-b border-[#E6E8F0] bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`px-3 py-7 text-center sm:px-6 sm:py-9 ${index % 2 ? 'border-l border-[#E6E8F0]' : ''} ${index > 1 ? 'border-t border-[#E6E8F0] lg:border-t-0' : ''} lg:border-l lg:first:border-l-0`}>
                <p className="font-urbanist text-2xl font-black text-[#06103C] sm:text-3xl">{stat.value}</p>
                <p className="mt-1 font-jost text-xs leading-snug text-gray-500 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <WhoWeServed />

        <div id="case-studies">
          <ProjectGrid eyebrow="Power System Studies" title="Power System Case Studies" description="Practical studies addressing renewable interconnection, reactive power, insulation coordination, grounding, GIS transients, equipment duty, and power-quality challenges." projects={powerSystem.map(project => ({ ...project, cardImage: powerSystemImages[project.slug.current] ?? project.cardImage }))} />
          <ProjectGrid eyebrow="Substation Engineering" title="Substation Engineering Case Studies" description="Substation projects delivered across transmission systems, renewable collector facilities, rural electrification, smart cities, BESS, and space-constrained urban sites." projects={substation} background="bg-[#F4F5F9]" />
        </div>

        <Services />
        <Industries />

        <section className="bg-[#06103C] py-14 sm:py-16">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#F14BB9]">Built on Engineering Discipline</p>
              <h2 className="font-urbanist text-3xl font-black leading-tight text-white sm:text-4xl">From complex studies to energized assets, we engineer certainty.</h2>
            </div>
            <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#C72E9E] to-[#7A2A91] px-7 py-4 font-jost font-semibold text-white transition hover:-translate-y-0.5">Discuss Your Project →</Link>
          </div>
        </section>

        <ContactForm />
        <FAQ items={projectFaqs} eyebrow="Project FAQs" title={<>Answers,<br />before you build.</>} description="Answers to the technical questions clients ask while planning, designing, and delivering power infrastructure." />
        <Blog />
      </main>
      <Footer />
    </>
  )
}
