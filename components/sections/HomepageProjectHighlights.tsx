import Link from 'next/link'

const projects = [
  { value: '1 GW', title: 'Hyperscale Data Center — ERCOT', text: 'Among the largest single-site load interconnections in North America.' },
  { value: '600 / 500 / 250 MW', title: 'Data Center Campuses', text: 'Complete electrical design packages developed through IFC.' },
  { value: '385 MW', title: 'Utility-Scale BESS', text: 'Electrical design and coordinated engineering documentation.' },
  { value: '245 MW', title: 'Data Center — SPP', text: 'Dynamic load and PSCAD EMT modeling under the HILL study framework.' },
  { value: '9 GW', title: 'Renewable Fleet', text: 'Compliance and PSS®E modeling support led by our Principal Engineer.' },
]

export default function HomepageProjectHighlights() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#A8228A]">Selected Experience</p>
            <h2 className="font-urbanist text-4xl font-black leading-tight text-[#0B1230] sm:text-5xl">Project Highlights</h2>
            <p className="mt-4 font-jost text-sm leading-relaxed text-gray-500 sm:text-base">Client names and locations are withheld for confidentiality. Detailed case studies are available upon request.</p>
          </div>
          <Link href="/clients-and-projects" className="inline-flex w-full items-center justify-center rounded-full bg-[#06103C] px-7 py-4 font-jost font-semibold text-white transition hover:bg-[#A8228A] sm:w-auto">View Client &amp; Projects <span className="ml-2" aria-hidden="true">→</span></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article key={project.title} className={`group rounded-3xl border border-[#E4E7EF] bg-[#F7F8FB] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#A8228A]/30 hover:shadow-[0_18px_45px_rgba(6,16,60,0.09)] sm:p-7 ${index < 2 ? 'lg:col-span-1' : ''}`}>
              <div className="mb-8 flex items-start justify-between gap-4">
                <p className="font-urbanist text-3xl font-black text-[#A8228A] sm:text-4xl">{project.value}</p>
                <span className="font-urbanist text-sm font-black text-[#06103C]/20">0{index + 1}</span>
              </div>
              <h3 className="mb-3 font-urbanist text-xl font-bold text-[#06103C]">{project.title}</h3>
              <p className="font-jost text-sm leading-relaxed text-gray-600 sm:text-base">{project.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
