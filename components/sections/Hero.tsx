'use client'

const marqueeItems = [
  'NERC Compliant Solutions', 'IEEE Certified Engineers', '30+ Years Experience',
  'Utility-Scale Renewables', 'Power System Studies', 'Substation Design',
  'POI Interconnection', 'BESS Engineering', 'Grid Reliability', 'Compliance-First Approach',
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/home/hero-bg.jpg"
          alt="Keentel Engineering power systems"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(6,16,60,0.82)' }} />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 blur-3xl rounded-full" style={{ background: 'radial-gradient(circle, rgba(167,34,138,0.2) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 flex-1 flex items-center pt-36 lg:pt-44 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-1.5 mb-6" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/70 text-sm font-medium">U.S. Licensed Electrical Power Engineers</span>
            </div>

            <h1 className="font-urbanist text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.06] mb-6">
              Your Trusted Partner in{' '}
              <span className="gradient-text">EHV, HV & MV</span>{' '}
              Electrical Power Engineering
            </h1>

            <p className="text-white/80 text-xl sm:text-2xl font-jost font-light leading-relaxed mb-10 max-w-2xl">
              From substation design and POI interconnection to utility-scale solar, wind, and BESS engineering. NERC-compliant, future-ready infrastructure across the U.S.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="https://calendly.com/keentel-engineering/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-semibold text-base px-7 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #C72E9E, #5B2A86)' }}
              >
                Schedule A Call
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="https://irp.cdn-website.com/1253891b/files/uploaded/Keentel+Engineering+Company+Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-semibold text-base px-7 py-4 rounded-full border border-white/25 transition-all duration-300 hover:bg-white/10"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Profile
              </a>
            </div>

            {/* Certification logos — prominent */}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Trusted and Certified</p>
              <img
                src="/images/home/certifications.png"
                alt="BBB Accredited IEEE Member NERC Certified FL Licensed"
                className="w-auto object-contain opacity-90"
                style={{ height: '64px', maxWidth: '420px', filter: 'brightness(0) invert(1)' }}
              />
            </div>

          </div>
        </div>
      </div>

      <div className="relative z-10 py-3.5 overflow-hidden" style={{ background: 'linear-gradient(90deg, #0B1A5B, #5B2A86)' }}>
        <div className="flex animate-marquee-left whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 mx-8 text-white/80 text-sm font-medium font-jost">
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#C72E9E' }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
