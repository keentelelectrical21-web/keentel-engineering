'use client'

export default function WhyChoose() {
  return (
    <section className="py-24 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white rounded-3xl p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

            {/* Left heading */}
            <div className="lg:col-span-3 flex flex-col justify-start pt-2">
              <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-gray-900 leading-[1.05] mb-4">
                Why<br />Choose<br />Keentel
              </h2>
              <p className="text-gray-500 font-jost text-sm leading-relaxed">
                We don't chase every job. Just the right ones, where precision matters, compliance isn't optional, and experience makes the difference.
              </p>
            </div>

            {/* Top right 2 cards */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-[#030DA6]/20 transition-colors group">
                <div className="w-10 h-10 bg-[#030DA6]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#030DA6]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#030DA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-urbanist font-bold text-gray-900 text-lg mb-2">Client-Focused Approach</h3>
                <p className="text-gray-500 text-sm font-jost leading-relaxed">
                  We work collaboratively from design and modeling to commissioning, ensuring we understand your goals and deliver tailored power system engineering services.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-[#030DA6]/20 transition-colors group">
                <div className="w-10 h-10 bg-[#8C1D1C]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#8C1D1C]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#8C1D1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-urbanist font-bold text-gray-900 text-lg mb-2">30 Years of Experience</h3>
                <p className="text-gray-500 text-sm font-jost leading-relaxed">
                  Our team brings decades of success in power system interconnection, transmission line design, and renewable energy engineering including BESS, solar PV, and wind.
                </p>
              </div>
            </div>

            {/* Bottom row */}
            {/* Large image card — same height as the two right cards combined */}
            <div className="lg:col-span-7">
              <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-full min-h-[280px]">
                <img
                  src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/WhatsApp+Image+2026-05-02+at+10.14.11+AM-788w.jpeg"
                  alt="Keentel Engineering team"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30 mb-2">
                    Real Results
                  </span>
                  <p className="font-urbanist font-bold text-white text-xl leading-snug">
                    21 Licensed Engineers<br />Across 3 Specialized Groups
                  </p>
                  <p className="text-white/70 text-sm font-jost mt-1">
                    Designers, Grid Whisperers, and Compliance Watchdogs
                  </p>
                </div>
              </div>
            </div>

            {/* Two right cards stacked — equal combined height to image */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              <div className="bg-[#030DA6] rounded-2xl p-7 group flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="font-urbanist font-bold text-white text-lg mb-2">Attention to Detail</h3>
                  <p className="text-white/70 text-sm font-jost leading-relaxed">
                    We approach each project with detailed modeling, relay coordination, and fault analysis, delivering results that meet or exceed regulatory benchmarks.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-[#030DA6]/20 transition-colors group flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-urbanist font-bold text-gray-900 text-lg mb-2">Quality & Innovation</h3>
                  <p className="text-gray-500 text-sm font-jost leading-relaxed">
                    ETAP, PSCAD, SKM, DIgSILENT, cutting-edge simulation with a compliance-first mindset delivering IEC 61850 solutions.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}