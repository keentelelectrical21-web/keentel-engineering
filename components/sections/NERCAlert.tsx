'use client'

import Link from 'next/link'

export default function NERCAlert() {
  return (
    <section className="py-12 bg-[#C72E9E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-urbanist font-bold text-white text-xl">NERC Level 3 Alert Engineering Support</h3>
              <p className="text-white/70 text-sm font-jost mt-0.5">
                Specialized compliance services helping U.S. generator owners meet evolving NERC reliability standards.
              </p>
            </div>
          </div>
          <Link
            href="/nerc-alert-level-3-ibr"
            className="flex-shrink-0 inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-[#8C1D1C] transition-all"
          >
            NERC Level 3 Compliance
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}