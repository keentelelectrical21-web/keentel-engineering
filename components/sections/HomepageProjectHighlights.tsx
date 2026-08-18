import Link from 'next/link'

const projects = [
  { value: '345 / 138 kV', title: 'EHV Greenfield Substation', text: 'New transmission substation designed to integrate 400 MW of wind generation into the regional grid.' },
  { value: '250 MW', title: 'PJM Solar + Storage POI', text: 'Full POI engineering for a solar PV and BESS interconnection to a 230 kV PJM transmission line.' },
  { value: '300 MW', title: 'ERCOT Wind Expansion', text: 'POI interconnection support for a wind farm expansion into the ERCOT 345 kV network.' },
  { value: '150 MW', title: 'PJM Solar PV Dynamic Modeling', text: 'Dynamic-model development and validation for a New Jersey solar PV plant.' },
  { value: '100 MW / 400 MWh', title: 'BESS Collector Substation', text: 'EPC-level design for a 115 kV / 34.5 kV battery-energy-storage collector substation.' },
]

export default function HomepageProjectHighlights() {
  return (
    <section id="project-highlights" className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#A8228A]/[0.06] blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#0B1A5B]/[0.06] blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#A8228A]">Selected Experience</p>
            <h2 className="font-urbanist text-4xl font-black leading-tight text-[#0B1230] sm:text-5xl">Project Highlights</h2>
            <p className="mt-4 font-jost text-sm leading-relaxed text-gray-500 sm:text-base">Client names and locations are withheld for confidentiality. Detailed case studies are available upon request.</p>
          </div>
          <Link href="/clients-and-projects" className="inline-flex w-full items-center justify-center rounded-full bg-[#06103C] px-7 py-4 font-jost font-semibold text-white transition hover:bg-[#A8228A] sm:w-auto">View Client &amp; Projects</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`group relative flex min-h-[270px] cursor-default flex-col overflow-hidden rounded-3xl border border-[#E4E7EF] bg-[linear-gradient(145deg,#FFFFFF_0%,#F5F6FA_100%)] p-6 shadow-[0_12px_35px_rgba(6,16,60,0.05)] transition duration-500 hover:-translate-y-1.5 hover:border-[#A8228A]/45 hover:shadow-[0_24px_60px_rgba(6,16,60,0.2)] sm:p-8 ${
                index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
              } ${index === projects.length - 1 ? 'md:col-span-2 lg:col-span-3' : ''}`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(145deg,#101F58_0%,#06103C_62%,#35145A_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#C72E9E]/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
              <div className="absolute inset-x-0 top-0 z-20 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#F075D2] to-[#8D5CE6] transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
              <div className="relative z-10 mb-10 flex items-start justify-between gap-4">
                <p className="font-urbanist text-3xl font-black text-[#A8228A] transition-colors duration-500 group-hover:text-[#F075D2] sm:text-4xl">{project.value}</p>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#06103C]/10 bg-white font-urbanist text-xs font-black text-[#06103C]/35 transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white/70">0{index + 1}</span>
              </div>
              <div className="relative z-10 mt-auto">
                <h3 className="mb-3 font-urbanist text-xl font-bold text-[#06103C] transition-colors duration-500 group-hover:text-white">{project.title}</h3>
                <p className="font-jost text-sm leading-relaxed text-gray-600 transition-colors duration-500 group-hover:text-white/75 sm:text-base">{project.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
