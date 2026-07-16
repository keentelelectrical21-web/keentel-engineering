'use client'

const tools = [
  { name: 'AutoCAD', years: '27+', desc: 'Drafting & design', logo: '/images/software-logos/autocad.png' },
  { name: 'DIgSILENT', years: '8+', desc: 'Power system analysis', logo: '/images/software-logos/digsilent.png' },
  { name: 'ETAP', years: '15+', desc: 'Electrical analysis', logo: '/images/software-logos/etap.png' },
  { name: 'PSS/E', years: '14+', desc: 'Transmission planning', logo: '/images/software-logos/psse.png' },
  { name: 'Bentley', years: '14+', desc: 'Infrastructure design', logo: '/images/software-logos/bentley.png' },
  { name: 'SEL', years: '27+', desc: 'Relay protection', logo: '/images/software-logos/sel.png' },
  { name: 'EasyPower', years: '10+', desc: 'Arc flash & coordination', logo: '/images/software-logos/easypower.png' },
  { name: 'PSCAD', years: '5+', desc: 'EMT simulation', logo: '/images/software-logos/pscad.png' },
  { name: 'SKM PowerTools', years: '15+', desc: 'Power tools analysis', logo: '/images/software-logos/skm.png' },
  { name: 'CYME', years: '27+', desc: 'Distribution analysis', logo: '/images/software-logos/cyme.png' },
]

export default function SoftwareTools({ heading = 'Our Engineering Tools' }: { heading?: string }) {
  return (
    <section className="py-20 overflow-hidden" style={{ background: '#06103C' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#C72E9E' }}>Industry-Leading Software</p>
          <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-white mb-4">
            {heading}
          </h2>
          <p className="text-xl font-jost max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Precision modeling using the industry&apos;s most trusted power engineering software platforms, with decades of hands-on expertise.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {tools.map((tool, i) => (
            <div
              key={i}
              className="group rounded-2xl p-5 flex flex-col gap-4 hover:scale-[1.03] hover:shadow-xl transition-all duration-300 cursor-default bg-white"
            >
              <div className="h-14 flex items-center justify-start">
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="max-h-10 w-auto object-contain transition-opacity"
                  style={{ maxWidth: '100%' }}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="font-urbanist font-bold text-sm" style={{ color: '#0B1230' }}>{tool.name}</p>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(168,34,138,0.1)', color: '#A8228A' }}>
                    {tool.years}yr
                  </span>
                </div>
                <p className="text-sm font-jost font-medium" style={{ color: '#4B5563' }}>{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { val: '10', label: 'Software Platforms', sub: 'Industry-leading tools' },
            { val: '27+', label: 'Years AutoCAD', sub: 'Since inception' },
            { val: '100%', label: 'In-House Capability', sub: 'No outsourcing' },
            { val: 'All 3', label: 'U.S. Interconnections', sub: 'WECC, ERCOT, Eastern' },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="font-urbanist font-black text-3xl text-white mb-1">{s.val}</p>
              <p className="font-semibold text-base text-white mb-0.5">{s.label}</p>
              <p className="text-sm font-jost" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
