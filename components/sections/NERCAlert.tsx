'use client'

import Link from 'next/link'

export default function NERCAlert() {
  return (
    <section className="bg-[#C72E9E] py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4 sm:items-center">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-urbanist text-xl font-bold text-white">NERC Compliance Engineering Services</h3>
              <p className="mt-1 max-w-3xl font-jost text-sm leading-relaxed text-white/80">
                Full-scope compliance programs, gap assessments, RSAW documentation, model validation, and audit support for NERC O&amp;P, PRC, FAC, MOD, TPL, and CIP requirements.
              </p>
            </div>
          </div>
          <Link
            href="/service/nerc-compliance"
            className="inline-flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition-all hover:bg-white hover:text-[#8C1D1C] sm:w-auto"
          >
            Explore NERC Compliance
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
