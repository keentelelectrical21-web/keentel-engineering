'use client'

export default function WhyChoose() {
  return (
    <section className="py-20" style={{ background: '#F6F7FB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-10" style={{ background: '#fff', border: '1px solid #E6E8F0' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

            {/* Left heading */}
            <div className="lg:col-span-3 flex flex-col justify-start pt-2">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Our Difference</p>
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-[1.05] mb-4" style={{ color: '#0B1230' }}>
                Why<br />Choose<br />Keentel
              </h2>
              <p className="text-base font-jost leading-relaxed" style={{ color: '#4B5563' }}>
                We don't chase every job. Just the right ones, where precision matters, compliance isn't optional, and experience makes the difference.
              </p>
            </div>

            {/* Top right 2 cards */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl p-7 transition-all hover:shadow-md" style={{ background: '#F6F7FB', border: '1px solid #E6E8F0' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(11,26,91,0.08)' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#0B1A5B' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-urbanist font-bold text-xl mb-3" style={{ color: '#0B1230' }}>Client-Focused Approach</h3>
                <p className="text-base font-jost leading-relaxed" style={{ color: '#4B5563' }}>
                  We work collaboratively from design and modeling to commissioning, ensuring we understand your goals and deliver tailored power system engineering services.
                </p>
              </div>

              <div className="rounded-2xl p-7 transition-all hover:shadow-md" style={{ background: '#F6F7FB', border: '1px solid #E6E8F0' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(168,34,138,0.08)' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-urbanist font-bold text-xl mb-3" style={{ color: '#0B1230' }}>30 Years of Experience</h3>
                <p className="text-base font-jost leading-relaxed" style={{ color: '#4B5563' }}>
                  Our team brings decades of success in power system interconnection, transmission line design, and renewable energy engineering including BESS, solar PV, and wind.
                </p>
              </div>
            </div>

            {/* Bottom left - team image */}
            <div className="lg:col-span-7">
              <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-full min-h-[280px]">
                <img
                  src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/WhatsApp+Image+2026-05-02+at+10.14.11+AM-788w.jpeg"
                  alt="Keentel Engineering team"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,16,60,0.85) 0%, rgba(6,16,60,0.2) 60%, transparent 100%)' }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2" style={{ background: 'rgba(199,46,158,0.25)', color: '#C72E9E', border: '1px solid rgba(199,46,158,0.3)' }}>
                    Real Results
                  </span>
                  <p className="font-urbanist font-bold text-white text-xl leading-snug">
                    21 Licensed Engineers<br />Across 3 Specialized Groups
                  </p>
                  <p className="text-base font-jost mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    Designers, Grid Whisperers, and Compliance Watchdogs
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom right - 2 cards */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              <div className="rounded-2xl p-7 flex flex-col" style={{ background: 'linear-gradient(135deg, #0B1A5B, #5B2A86)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.12)' }}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-urbanist font-bold text-white text-xl mb-3">Attention to Detail</h3>
                <p className="text-base font-jost leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  We approach each project with detailed modeling, relay coordination, and fault analysis, delivering results that meet or exceed regulatory benchmarks.
                </p>
              </div>

              <div className="rounded-2xl p-7 flex flex-col transition-all hover:shadow-md" style={{ background: '#F6F7FB', border: '1px solid #E6E8F0' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(91,42,134,0.08)' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#5B2A86' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-urbanist font-bold text-xl mb-3" style={{ color: '#0B1230' }}>Quality and Innovation</h3>
                <p className="text-base font-jost leading-relaxed" style={{ color: '#4B5563' }}>
                  ETAP, PSCAD, SKM, DIgSILENT, cutting-edge simulation with a compliance-first mindset delivering IEC 61850 solutions.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
