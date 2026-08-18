'use client'

import Image from 'next/image'

const tools = [
  { name: 'AutoCAD', years: '27+', desc: 'Electrical design', logo: '/images/software-logos/autocad.png' },
  { name: 'DIgSILENT', years: '8+', desc: 'Grid simulation', logo: '/images/software-logos/digsilent.png' },
  { name: 'ETAP', years: '15+', desc: 'Power system studies', logo: '/images/software-logos/etap.png' },
  { name: 'PSS/E', years: '14+', desc: 'Dynamic modeling', logo: '/images/software-logos/psse.png' },
  { name: 'Bentley', years: '14+', desc: 'Infrastructure design', logo: '/images/software-logos/bentley.png' },
  { name: 'SEL', years: '27+', desc: 'Protection & control', logo: '/images/software-logos/sel.png' },
  { name: 'EasyPower', years: '10+', desc: 'Electrical analysis', logo: '/images/software-logos/easypower.png' },
  { name: 'PSCAD', years: '5+', desc: 'EMT studies', logo: '/images/software-logos/pscad.png' },
  { name: 'SKM PowerTools', years: '15+', desc: 'Protection studies', logo: '/images/software-logos/skm.png' },
  { name: 'CYME', years: '27+', desc: 'Distribution analysis', logo: '/images/software-logos/cyme.png' },
]

type SoftwareToolsProps = {
  heading?: string
  theme?: 'dark' | 'light'
}

export default function SoftwareTools({ heading = 'Our Engineering Tools', theme = 'dark' }: SoftwareToolsProps) {
  const isLight = theme === 'light'

  return (
    <section
      className={`relative overflow-hidden border-t py-16 sm:py-20 ${isLight ? 'border-[#E4E7EF] bg-[#F6F7FB]' : 'border-transparent bg-[#06103C]'}`}
    >
      {isLight && <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#06103C] via-[#C72E9E] to-[#06103C]" aria-hidden="true" />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#C72E9E' }}>Industry-Leading Software</p>
          <h2 className={`font-urbanist font-black text-4xl sm:text-5xl mb-4 ${isLight ? 'text-[#06103C]' : 'text-white'}`}>
            {heading}
          </h2>
          <p className={`text-base font-jost max-w-2xl mx-auto sm:text-lg ${isLight ? 'text-gray-600' : 'text-white/75'}`}>
            Expert modeling with ETAP, SKM, PSCAD, PSS®E, DIgSILENT, and other power engineering software platforms.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {tools.map((tool, i) => (
            <div
              key={i}
              className="group rounded-2xl p-5 flex flex-col gap-4 hover:scale-[1.03] hover:shadow-xl transition-all duration-300 cursor-default bg-white"
            >
              <div className="h-14 flex items-center justify-start">
                <Image
                  src={tool.logo}
                  alt={tool.name}
                  width={150}
                  height={56}
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
            { val: '10', label: 'Software Platforms', sub: 'Power engineering tools' },
            { val: '27+', label: 'Years AutoCAD', sub: 'Electrical design' },
            { val: 'ETAP', label: 'System Studies', sub: 'Analysis and modeling' },
            { val: 'PSCAD', label: 'EMT Studies', sub: 'Fast transient analysis' },
          ].map((s, i) => (
            <div key={i} className={`rounded-2xl border p-5 sm:p-6 ${isLight ? 'border-[#E0E4ED] bg-white shadow-[0_8px_24px_rgba(6,16,60,0.05)]' : 'border-white/10 bg-white/[0.05]'}`}>
              <p className={`font-urbanist font-black text-3xl mb-1 ${isLight ? 'text-[#A8228A]' : 'text-white'}`}>{s.val}</p>
              <p className={`font-semibold text-base mb-0.5 ${isLight ? 'text-[#06103C]' : 'text-white'}`}>{s.label}</p>
              <p className={`text-sm font-jost ${isLight ? 'text-gray-500' : 'text-white/50'}`}>{s.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
