'use client'

const tools = [
  { name: 'AutoCAD', years: '27+', color: '#E51B24', textColor: 'white', desc: 'Drafting & design' },
  { name: 'DIgSILENT', years: '8+', color: '#7B2D8B', textColor: 'white', desc: 'Power system analysis' },
  { name: 'ETAP', years: '15+', color: '#E31937', textColor: 'white', desc: 'Electrical analysis' },
  { name: 'PSS/E', years: '14+', color: '#00A9CE', textColor: 'white', desc: 'Transmission planning' },
  { name: 'Bentley', years: '14+', color: '#1B7B3D', textColor: 'white', desc: 'Infrastructure design' },
  { name: 'SEL', years: '27+', color: '#003087', textColor: 'white', desc: 'Relay protection' },
  { name: 'EasyPower', years: '10+', color: '#6B7280', textColor: 'white', desc: 'Arc flash & coordination' },
  { name: 'PSCAD', years: '5+', color: '#F59E0B', textColor: '#111', desc: 'EMT simulation' },
  { name: 'SKM', years: '15+', color: '#D97706', textColor: 'white', desc: 'Power tools analysis' },
  { name: 'CYME', years: '27+', color: '#0EA5E9', textColor: 'white', desc: 'Distribution analysis' },
]

export default function SoftwareTools() {
  return (
    <section className="py-24 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Industry-Leading Software
          </span>
          <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-white mb-4">
            Our Engineering Tools
          </h2>
          <p className="text-gray-400 font-jost text-lg max-w-2xl mx-auto">
            Precision modeling using the industry's most trusted power engineering software platforms — with decades of hands-on expertise.
          </p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {tools.map((tool, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              {/* Background */}
              <div
                className="absolute inset-0 opacity-90"
                style={{ backgroundColor: tool.color }}
              />
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 70% 30%, white 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              />

              <div className="relative p-5 flex flex-col h-32">
                <div className="flex items-start justify-between mb-auto">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: tool.textColor,
                    }}
                  >
                    {tool.years} yrs
                  </span>
                </div>
                <div>
                  <p
                    className="font-urbanist font-black text-xl leading-none mb-0.5"
                    style={{ color: tool.textColor }}
                  >
                    {tool.name}
                  </p>
                  <p
                    className="text-xs font-jost"
                    style={{ color: tool.textColor, opacity: 0.7 }}
                  >
                    {tool.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { val: '10', label: 'Software Platforms', sub: 'Industry-leading tools' },
            { val: '27+', label: 'Years AutoCAD Expertise', sub: 'Since inception' },
            { val: '100%', label: 'In-House Capability', sub: 'No outsourcing' },
            { val: 'All 3', label: 'U.S. Interconnections', sub: 'WECC, ERCOT, Eastern' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-600 transition-colors">
              <p className="font-urbanist font-black text-3xl text-white mb-1">{s.val}</p>
              <p className="text-white font-semibold text-sm mb-0.5">{s.label}</p>
              <p className="text-gray-500 text-xs font-jost">{s.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}