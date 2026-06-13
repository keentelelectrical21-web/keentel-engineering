'use client'

const testimonials = [
  { name: 'Michael Torres', role: 'Project Director', company: 'SunPath Energy', text: 'Keentel delivered our 250MW solar farm power system studies on time and with zero compliance issues. Their NERC expertise saved us months of back-and-forth with the utility.', rating: 5, avatar: 'MT' },
  { name: 'Jennifer Walsh', role: 'VP Engineering', company: 'GridTech Solutions', text: 'Their POI interconnection team is second to none. The PSCAD modeling work they did for our 500kV substation was exceptional. Highly recommend for complex transmission projects.', rating: 5, avatar: 'JW' },
  { name: 'David Chen', role: 'Director of Operations', company: 'Western Renewables LLC', text: 'Keentel handled our NERC compliance audit prep flawlessly. Their documentation was thorough and their pre-audit support gave us complete confidence walking in.', rating: 5, avatar: 'DC' },
  { name: 'Sarah Mitchell', role: 'Chief Engineer', company: 'NovaPower Utilities', text: 'We have worked with many engineering firms, but Keentel stands out for their technical depth and regulatory knowledge. Our BESS integration project was completed ahead of schedule.', rating: 5, avatar: 'SM' },
  { name: 'Robert Perez', role: 'Senior PM', company: 'Trident EPC Group', text: 'Outstanding substation design work for our 345kV project. Keentel attention to detail and proactive communication made this one of our smoothest projects to date.', rating: 5, avatar: 'RP' },
  { name: 'Amanda Foster', role: 'Director of Development', company: 'BlueSky Wind Partners', text: 'Their relay protection engineering team is world-class. They handled our complex protection coordination challenges with ease and delivered results that exceeded our expectations.', rating: 5, avatar: 'AF' },
  { name: 'Thomas Grant', role: 'Operations Manager', company: 'PacificGrid Corp', text: 'Keentel ETAP and PSCAD work for our fault analysis was incredibly detailed. Their compliance-first mindset aligns perfectly with how we operate. A true technical partner.', rating: 5, avatar: 'TG' },
  { name: 'Lisa Hartman', role: 'President', company: 'Hartman Electric', text: 'We engaged Keentel for MEP engineering on a major data center project. Their integration of electrical systems with mechanical was seamless. Exceptional professionalism.', rating: 5, avatar: 'LH' },
]

const avatarColors = ['#0B1A5B', '#5B2A86', '#A8228A', '#C72E9E', '#0B1A5B', '#5B2A86', '#A8228A', '#C72E9E']

function TestimonialCard({ t, idx }: { t: typeof testimonials[0]; idx: number }) {
  return (
    <div
      className="flex-shrink-0 w-[340px] rounded-2xl p-6 mx-3"
      style={{ background: '#fff', border: '1px solid #E6E8F0' }}
    >
      <div className="flex gap-0.5 mb-4">
        {Array(t.rating).fill(null).map((_, i) => (
          <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#C72E9E' }}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-sm font-jost leading-relaxed mb-5" style={{ color: '#4B5563' }}>"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: avatarColors[idx % avatarColors.length] }}>
          <span className="text-xs font-bold text-white">{t.avatar}</span>
        </div>
        <div>
          <p className="font-urbanist font-semibold text-sm" style={{ color: '#0B1230' }}>{t.name}</p>
          <p className="text-xs font-jost" style={{ color: '#9CA3AF' }}>{t.role} · {t.company}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="py-24 overflow-hidden" style={{ background: '#F6F7FB' }}>
      <div className="mb-14 text-center px-4">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Client Stories</p>
        <h2 className="font-urbanist font-black text-4xl sm:text-5xl mb-4" style={{ color: '#0B1230' }}>What Our Clients Say</h2>
        <p className="text-lg font-jost max-w-xl mx-auto" style={{ color: '#6B7280' }}>
          Trusted by utilities, developers, and EPCs across the United States for over three decades.
        </p>
      </div>

      {/* Full width horizontal marquee - no max-width container */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #F6F7FB, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #F6F7FB, transparent)' }} />
        <div
          className="flex"
          style={{
            width: 'max-content',
            animation: 'marquee-left 40s linear infinite',
          }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} idx={i} />
          ))}
        </div>
      </div>

    </section>
  )
}