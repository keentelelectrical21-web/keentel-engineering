import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Thank You | Keentel Engineering',
  description: 'Thank you for contacting Keentel Engineering. We will be in touch shortly.',
}

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-20" style={{ background: '#F6F7FB' }}>
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ background: 'linear-gradient(135deg, #06103C, #5B2A86)' }}>
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>Message Received</p>
          <h1 className="font-urbanist font-black text-4xl sm:text-5xl mb-5" style={{ color: '#06103C' }}>
            Thank You!
          </h1>
          <p className="font-jost text-lg leading-relaxed mb-10" style={{ color: '#6B7280' }}>
            Thank you for contacting Keentel Engineering. One of our licensed engineers will review your message and get back to you as soon as possible — typically within 1 business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3 rounded-full transition-all hover:-translate-y-0.5"
              style={{ background: '#06103C' }}>
              Back to Home
            </Link>
            <Link href="/blog"
              className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3 rounded-full border-2 transition-all"
              style={{ borderColor: '#E6E8F0', color: '#06103C' }}>
              Read Our Blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
