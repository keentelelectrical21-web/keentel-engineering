'use client'

const testimonials = [
  {
    name: 'Michael Torres',
    role: 'Project Director',
    company: 'SunPath Energy',
    text: 'Keentel delivered our 250MW solar farm power system studies on time and with zero compliance issues. Their NERC expertise saved us months of back-and-forth with the utility.',
    rating: 5,
    avatar: 'MT',
    bg: 'bg-blue-100',
  },
  {
    name: 'Jennifer Walsh',
    role: 'VP Engineering',
    company: 'GridTech Solutions',
    text: 'Their POI interconnection team is second to none. The PSCAD modeling work they did for our 500kV substation was exceptional. Highly recommend for complex transmission projects.',
    rating: 5,
    avatar: 'JW',
    bg: 'bg-purple-100',
  },
  {
    name: 'David Chen',
    role: 'Director of Operations',
    company: 'Western Renewables LLC',
    text: 'Keentel handled our NERC compliance audit prep flawlessly. Their documentation was thorough and their pre-audit support gave us complete confidence walking in.',
    rating: 5,
    avatar: 'DC',
    bg: 'bg-green-100',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Chief Engineer',
    company: 'NovaPower Utilities',
    text: 'We have worked with many engineering firms, but Keentel stands out for their technical depth and regulatory knowledge. Our BESS integration project was completed ahead of schedule.',
    rating: 5,
    avatar: 'SM',
    bg: 'bg-orange-100',
  },
  {
    name: 'Robert Perez',
    role: 'Senior PM',
    company: 'Trident EPC Group',
    text: 'Outstanding substation design work for our 345kV project. Keentel attention to detail and proactive communication made this one of our smoothest projects to date.',
    rating: 5,
    avatar: 'RP',
    bg: 'bg-rose-100',
  },
  {
    name: 'Amanda Foster',
    role: 'Director of Development',
    company: 'BlueSky Wind Partners',
    text: 'Their relay protection engineering team is world-class. They handled our complex protection coordination challenges with ease and delivered results that exceeded our expectations.',
    rating: 5,
    avatar: 'AF',
    bg: 'bg-cyan-100',
  },
  {
    name: 'Thomas Grant',
    role: 'Operations Manager',
    company: 'PacificGrid Corp',
    text: 'Keentel ETAP and PSCAD work for our fault analysis was incredibly detailed. Their compliance-first mindset aligns perfectly with how we operate. A true technical partner.',
    rating: 5,
    avatar: 'TG',
    bg: 'bg-teal-100',
  },
  {
    name: 'Lisa Hartman',
    role: 'President',
    company: 'Hartman Electric',
    text: 'We engaged Keentel for MEP engineering on a major data center project. Their integration of electrical systems with mechanical was seamless. Exceptional professionalism.',
    rating: 5,
    avatar: 'LH',
    bg: 'bg-yellow-100',
  },
]

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4 mx-1">
      <div className="flex gap-0.5 mb-4">
        {Array(t.rating).fill(null).map((_, i) => (
          <svg key={i} className="w-4 h-4 text-[#030DA6]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-700 text-sm font-jost leading-relaxed mb-5">"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full ${t.bg} flex items-center justify-center flex-shrink-0`}>
          <span className="text-xs font-bold text-gray-700">{t.avatar}</span>
        </div>
        <div>
          <p className="font-urbanist font-semibold text-gray-900 text-sm">{t.name}</p>
          <p className="text-gray-400 text-xs font-jost">{t.role} · {t.company}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const col1 = testimonials.slice(0, 4)
  const col2 = testimonials.slice(4, 8)

  return (
    <section className="py-24 bg-[#f5f5f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">Client Stories</span>
          <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-gray-500 font-jost text-lg max-w-xl mx-auto">
            Trusted by utilities, developers, and EPCs across the United States for over three decades.
          </p>
        </div>

        {/* Two column marquee */}
        <div className="relative flex gap-4 h-[520px] overflow-hidden">

          {/* Fade top */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#f5f5f7] to-transparent z-10 pointer-events-none" />
          {/* Fade bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f5f5f7] to-transparent z-10 pointer-events-none" />

          {/* Column 1 - scroll UP */}
          <div className="flex-1 overflow-hidden">
            <div className="marquee-up-col">
              {[...col1, ...col1, ...col1].map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </div>
          </div>

          {/* Column 2 - scroll DOWN */}
          <div className="flex-1 overflow-hidden hidden sm:block">
            <div className="marquee-down-col">
              {[...col2, ...col2, ...col2].map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </div>
          </div>

        </div>

      </div>

      <style jsx>{`
        .marquee-up-col {
          display: flex;
          flex-direction: column;
          animation: scrollUp 30s linear infinite;
          will-change: transform;
        }

        .marquee-down-col {
          display: flex;
          flex-direction: column;
          animation: scrollDown 36s linear infinite;
          will-change: transform;
        }

        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.333%); }
        }

        @keyframes scrollDown {
          0% { transform: translateY(-33.333%); }
          100% { transform: translateY(0); }
        }

        .marquee-up-col:hover,
        .marquee-down-col:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}