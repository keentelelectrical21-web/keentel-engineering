'use client'

export default function EPCBanner() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top label */}
        <div className="mb-8">
          <span className="inline-block bg-[#030DA6]/10 text-[#030DA6] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
            EPC Conference NA 2026
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left content */}
          <div className="lg:w-1/2">
            <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.1] mb-6">
              Let's Connect at{' '}
              <span className="text-[#030DA6]">EPC Energy Projects</span>{' '}
              Conference & Expo NA 2026 in Houston
            </h2>
            <p className="text-gray-600 font-jost text-base leading-relaxed mb-4">
              The Keentel Engineering team will be attending the EPC Energy Projects Conference & Expo NA 2026 in Houston.
            </p>
            <p className="text-gray-600 font-jost text-base leading-relaxed mb-8">
              Interested in discussing power generation, renewable energy, BESS, substations, transmission & distribution, data centers, power system studies, or NERC compliance? Schedule a one-on-one meeting with our team.
            </p>

            <div className="flex flex-wrap gap-10 mb-8">
              {[
                { val: '2026', label: 'Conference Year' },
                { val: 'Houston', label: 'Location, TX' },
                { val: '1:1', label: 'Private Meetings' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-urbanist font-black text-3xl text-gray-900">{s.val}</p>
                  <p className="text-gray-500 text-sm font-jost">{s.label}</p>
                </div>
              ))}
            </div>

            <a
              href="https://calendly.com/keentel-engineering/epc-2026-one-on-one-meeting-with-sonny-patel-clone"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#030DA6] text-white font-semibold px-7 py-4 rounded-full hover:bg-[#020a8a] transition-all hover:shadow-lg hover:shadow-blue-200"
            >
              Schedule a Meeting
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right — image at its natural size, no crop, no forced dimensions */}
          <div className="lg:w-1/2 flex items-start justify-center lg:justify-end">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 w-full">
              <img
                src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Screenshot+2026-06-09+120731-652w.png"
                alt="EPC Energy Projects Conference 2026 - Keentel Engineering"
                className="w-full h-auto block"
                style={{ display: 'block', maxWidth: '100%' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}