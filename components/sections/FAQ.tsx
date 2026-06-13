'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'How long does a power system study actually take?',
    a: '4 to 12 weeks depending on grid complexity. We are honest about timelines upfront — nobody benefits from rushed studies.',
  },
  {
    q: 'What if the grid says no?',
    a: 'Then we redesign to what the grid will say yes to. Mitigation. Equipment changes. Facility redesign. We find the path.',
  },
  {
    q: 'Do you work on small projects?',
    a: 'Yes. And we tell you if we are overkill for your budget. A 5 MW solar project might need a consultant, not a full engineering firm. We will say so.',
  },
  {
    q: 'What is the cost range?',
    a: '$15K to $150K+ depending on study scope and grid complexity. We quote after initial assessment, not before.',
  },
  {
    q: 'How do you stay current on NERC standards?',
    a: '27 years of standards changes. Real clients. Real compliance deadlines. We are not consultants. We are practitioners.',
  },
  {
    q: 'Which interconnects do you cover?',
    a: 'PJM, MISO, ERCOT, CAISO, NYISO, ISO-NE, SPP and WECC — plus most major IOUs and municipal utilities.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-2xl p-5 cursor-pointer transition-all hover:shadow-sm"
      style={{ border: `1px solid ${open ? '#0B1A5B' : '#E6E8F0'}`, background: open ? '#F6F7FB' : '#fff' }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-4">
        <h4 className="font-urbanist font-semibold text-base leading-snug" style={{ color: '#0B1230' }}>{q}</h4>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
          style={{ background: open ? '#0B1A5B' : '#F6F7FB', border: `1px solid ${open ? '#0B1A5B' : '#E6E8F0'}` }}
        >
          <span className="font-bold text-lg leading-none" style={{ color: open ? '#fff' : '#A8228A' }}>
            {open ? '−' : '+'}
          </span>
        </div>
      </div>
      {open && (
        <p className="mt-4 text-sm font-jost leading-relaxed" style={{ color: '#6B7280' }}>{a}</p>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="py-24" style={{ background: '#F6F7FB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Questions We Hear</p>
          <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#0B1230' }}>
            Answers, before you ask.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>

      </div>
    </section>
  )
}