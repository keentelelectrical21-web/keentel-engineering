'use client'

import Link from 'next/link'

export default function Precision() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:gap-20">

          <div className="lg:w-2/5 flex-shrink-0">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>Our Edge</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-[1.1] mb-5" style={{ color: '#0B1230' }}>
              Electrical Power Engineering with Precision and Compliance
            </h2>
            <p className="text-base font-jost leading-relaxed mb-4" style={{ color: '#6B7280' }}>
              Our comprehensive engineering services handle every stage of your power project with precision, from grid interconnection and substation design to full NERC compliance and renewable energy integration.
            </p>
            <p className="text-base font-jost leading-relaxed mb-8" style={{ color: '#6B7280' }}>
              Trusted by utilities, developers, EPCs, and public agencies across the U.S. for over 30 years.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Grid-ready designs rooted in field experience',
                'Deep understanding of IEEE, NERC, and PJM standards',
                'Expert modeling with ETAP, SKM, PSCAD, and GIS tools',
                'IEC 61850 implementation and SCADA integration',
                'HVDC consulting for modernized transmission',
                'IBR and DER grid interconnection queue navigation',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-jost" style={{ color: '#4B5563' }}>
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#A8228A' }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white font-semibold px-7 py-4 rounded-full transition-all hover:-translate-y-0.5 group"
              style={{ background: '#0B1A5B' }}
            >
              Explore Services
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Compact mobile collage */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            <img
              src="https://smartpowerconsultancy.com/wp-content/uploads/2024/05/electrical-power-engineering-1024x684.jpg"
              alt="Electrical substation"
              className="h-32 w-full rounded-2xl object-cover shadow-lg sm:h-44"
            />
            <img
              src="https://images.unsplash.com/photo-1702446736200-6b9a345dea6f?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Electrical transmission infrastructure"
              className="h-32 w-full rounded-2xl object-cover shadow-lg sm:h-44"
            />
            <div className="col-span-2 grid grid-cols-[1fr_auto] items-stretch gap-3">
              <div className="rounded-2xl p-5 shadow-xl" style={{ background: 'linear-gradient(135deg, #0B1A5B, #5B2A86)' }}>
                <div className="mb-2 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#C72E9E' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.6)' }}>Our Edge</span>
                </div>
                <p className="font-urbanist text-lg font-bold leading-tight text-white">Precision. Compliance. Results.</p>
              </div>
              <div className="flex min-w-28 flex-col justify-center rounded-2xl border border-[#E6E8F0] bg-white p-4 shadow-xl">
                <p className="font-urbanist text-3xl font-black" style={{ color: '#0B1A5B' }}>30+</p>
                <p className="font-jost text-xs" style={{ color: '#6B7280' }}>Years<br />Experience</p>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80"
              alt="Solar power farm"
              className="h-28 w-full rounded-2xl object-cover shadow-lg sm:h-40"
            />
            <img
              src="https://images.unsplash.com/photo-1413882353314-73389f63b6fd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Power engineering control room"
              className="h-28 w-full rounded-2xl object-cover shadow-lg sm:h-40"
            />
          </div>

          {/* Desktop image collage */}
          <div className="relative hidden h-[520px] lg:block lg:w-3/5">

            {/* Top right - substation */}
         <div className="absolute top-[5%] left-0 w-[40%] h-[43%] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://smartpowerconsultancy.com/wp-content/uploads/2024/05/electrical-power-engineering-1024x684.jpg"
                alt="Electrical substation"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Top left - power lines */}
          <div className="absolute top-0 right-0 w-[52%] h-[50%] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1702446736200-6b9a345dea6f?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Electrical transmission infrastructure"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Center accent card */}
            <div className="absolute top-[38%] left-[26%] z-10 rounded-2xl p-5 shadow-2xl w-52" style={{ background: 'linear-gradient(135deg, #0B1A5B, #5B2A86)' }}>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#C72E9E' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.6)' }}>Our Edge</span>
              </div>
              <p className="font-urbanist font-bold text-white text-lg leading-tight">Precision. Compliance. Results.</p>
            </div>

            {/* Bottom left - solar */}
            <div className="absolute bottom-0 left-0 w-[43%] h-[38%] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80"
                alt="Solar power farm"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Bottom right - control room */}
            <div className="absolute bottom-0 right-0 w-[53%] h-[38%] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1413882353314-73389f63b6fd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Power engineering control room"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating stat */}
            <div className="absolute top-[52%] right-1 z-10 rounded-2xl p-4 shadow-xl" style={{ background: '#fff', border: '1px solid #E6E8F0' }}>
              <p className="font-urbanist font-black text-3xl" style={{ color: '#0B1A5B' }}>30+</p>
              <p className="text-xs font-jost" style={{ color: '#6B7280' }}>Years Experience</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
