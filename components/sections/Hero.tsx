'use client'

const marqueeItems = [
  'NERC Compliant Solutions',
  'IEEE Certified Engineers',
  '30+ Years Experience',
  'Utility-Scale Renewables',
  'Power System Studies',
  'Substation Design',
  'POI Interconnection',
  'BESS Engineering',
  'Grid Reliability',
  'Compliance-First Approach',
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10005-1920w.jpg"
          alt="Keentel Engineering"
          className="w-full h-full object-cover object-center"
        />
        {/* Black overlay at exactly 0.6 opacity */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#030DA6]/20 blur-3xl rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center pt-36 lg:pt-44 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/80 text-sm font-medium">U.S. Licensed Electrical Power Engineers</span>
            </div>

            {/* Heading */}
            <h1 className="font-urbanist text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] mb-6">
              Your Trusted Partner in{' '}
              <span className="animated-gradient-text">EHV, HV & MV</span>{' '}
              Electrical Power Engineering
            </h1>

            {/* Subtext */}
            <p className="text-white/75 text-lg sm:text-xl font-jost font-light leading-relaxed mb-4 max-w-2xl">
              From substation design and POI interconnection to utility-scale solar, wind, and BESS engineering. NERC-compliant, future-ready infrastructure across the U.S.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="https://calendly.com/keentel-engineering/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-[#030DA6] text-white font-semibold text-base px-7 py-4 rounded-full hover:bg-[#020a8a] transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/50 hover:-translate-y-0.5"
              >
                Schedule A Call
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="https://irp.cdn-website.com/1253891b/files/uploaded/Keentel+Engineering+Company+Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-base px-7 py-4 rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Profile
              </a>
            </div>

            {/* Cert badges */}
            <div className="flex items-center gap-4 mt-10 flex-wrap">
              <span className="text-white/40 text-xs uppercase tracking-widest">Trusted & Certified</span>
              <div className="flex items-center gap-3 flex-wrap">
                {['BBB Accredited', 'IEEE Member', 'NERC Certified', 'FL Licensed'].map((badge) => (
                  <span key={badge} className="inline-flex items-center px-3 py-1 rounded-full border border-white/20 text-white/60 text-xs font-medium bg-white/5">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling marquee bar */}
      <div className="relative z-10 bg-[#030DA6] py-4 overflow-hidden">
        <div className="flex animate-marquee-left whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 mx-8 text-white/90 text-sm font-medium font-jost">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animated-gradient-text {
          background: linear-gradient(
            90deg,
            #60a5fa,
            #a78bfa,
            #f472b6,
            #60a5fa,
            #34d399,
            #60a5fa
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}