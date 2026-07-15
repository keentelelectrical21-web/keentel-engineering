'use client'

import { useState } from 'react'

const faqs = [
  { q: 'How long does a power system study actually take?', a: '4 to 12 weeks depending on grid complexity. We are honest about timelines upfront — nobody benefits from rushed studies.' },
  { q: 'What if the grid says no?', a: 'Then we redesign to what the grid will say yes to. Mitigation. Equipment changes. Facility redesign. We find the path.' },
  { q: 'Do you work on small projects?', a: 'Yes. And we tell you if we are overkill for your budget. A 5 MW solar project might need a consultant, not a full engineering firm. We will say so.' },
  { q: 'What is the cost range?', a: '$15K to $150K+ depending on study scope and grid complexity. We quote after initial assessment, not before.' },
  { q: 'How do you stay current on NERC standards?', a: '27 years of standards changes. Real clients. Real compliance deadlines. We are not consultants. We are practitioners.' },
  { q: 'Which interconnects do you cover?', a: 'PJM, MISO, ERCOT, CAISO, NYISO, ISO-NE, SPP and WECC — plus most major IOUs and municipal utilities.' },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        border: `1.5px solid ${open ? '#A8228A' : '#E6E8F0'}`,
        boxShadow: open ? '0 4px 24px rgba(168,34,138,0.1)' : 'none',
      }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center gap-3 p-4 sm:gap-5 sm:p-6">
        <span className="w-7 flex-shrink-0 font-urbanist text-xl font-black sm:w-8 sm:text-2xl" style={{ color: '#000000' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h4 className="flex-1 font-urbanist text-base font-bold leading-snug sm:text-xl" style={{ color: '#0B1230' }}>{q}</h4>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{ background: open ? '#A8228A' : '#F6F7FB', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: open ? '#fff' : '#A8228A' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '200px' : '0px' }}
      >
        <p className="px-4 pb-5 pl-14 font-jost text-sm leading-relaxed sm:px-6 sm:pb-6 sm:pl-[72px] sm:text-base" style={{ color: '#4B5563' }}>{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left heading - sticky */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>Questions We Hear</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-tight mb-6" style={{ color: '#0B1230' }}>
              Answers,<br />before you ask.
            </h2>
            <p className="text-base font-jost leading-relaxed mb-8" style={{ color: '#4B5563' }}>
              30 years of client questions. Here are the ones that come up every time.
            </p>
            <a
              href="https://calendly.com/keentel-engineering/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-jost font-semibold text-white px-7 py-4 rounded-full transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
            >
              Ask Us Directly
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>

          {/* Right accordions */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
