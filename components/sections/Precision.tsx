'use client'

import Link from 'next/link'

export default function Precision() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

          {/* Left text */}
          <div className="lg:w-2/5 flex-shrink-0">
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-gray-900 leading-[1.1] mb-5">
              Electrical Power{' '}
              <span className="relative inline-block">
                Engineering
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-[#030DA6]/15 -z-10 rounded" />
              </span>
              {' '}with<br />
              Precision &<br />Compliance
            </h2>

            <p className="text-gray-500 font-jost text-base leading-relaxed mb-6">
              Our comprehensive engineering services handle every stage of your power project with precision, from grid interconnection and substation design to full NERC compliance and renewable energy integration.
            </p>
            <p className="text-gray-500 font-jost text-base leading-relaxed mb-8">
              Trusted by utilities, developers, EPCs, and public agencies across the U.S. for over 30 years.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Grid-ready designs rooted in field experience',
                'Deep understanding of IEEE, NERC, and PJM standards',
                'Expert modeling with ETAP, SKM, PSCAD, and GIS tools',
                'IEC 61850 implementation and SCADA integration',
                'HVDC consulting for modernized transmission',
                'IBR & DER grid interconnection queue navigation',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-600 text-sm font-jost">
                  <svg className="w-4 h-4 text-[#030DA6] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold px-7 py-4 rounded-full hover:bg-[#030DA6] transition-all group"
            >
              Explore Services
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Right — lightning bolt shaped image collage */}
          <div className="lg:w-3/5 relative h-[500px] sm:h-[560px]">

            {/* Lightning bolt SVG clipping background accent */}
            <svg
              className="absolute inset-0 w-full h-full opacity-5"
              viewBox="0 0 400 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M220 20L60 280H200L140 480L360 200H220L280 20Z"
                fill="#030DA6"
              />
            </svg>

            {/* Large image top-right */}
            <div className="absolute top-0 right-0 w-[58%] h-[52%] rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-455w.jpg"
                alt="Power engineering"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#030DA6]/20 to-transparent" />
            </div>

            {/* Medium image left */}
            <div className="absolute top-[8%] left-0 w-[44%] h-[44%] rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10002+%282%29-455w.png"
                alt="Substation design"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Center overlap card - blue accent */}
            <div className="absolute top-[38%] left-[28%] z-10 bg-[#030DA6] text-white rounded-2xl p-5 shadow-2xl w-48">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70">Our Edge</span>
              </div>
              <p className="font-urbanist font-bold text-lg leading-tight">Precision. Compliance. Results.</p>
            </div>

            {/* Bottom-left image */}
            <div className="absolute bottom-0 left-0 w-[44%] h-[40%] rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10005-455w.jpg"
                alt="NERC compliance"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Bottom-right image */}
            <div className="absolute bottom-0 right-0 w-[54%] h-[40%] rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10003-455w.jpg"
                alt="Solar power engineering"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-[#8C1D1C]/20 to-transparent" />
            </div>

            {/* Floating stat badge */}
            <div className="absolute top-[54%] right-2 z-10 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <p className="font-urbanist font-black text-3xl text-gray-900">30+</p>
              <p className="text-gray-500 text-xs font-jost">Years Experience</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}