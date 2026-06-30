'use client'
// ============================================================
// FILE: components/blog/BlogPostBody.tsx  — REPLACE ENTIRE FILE
// ============================================================

import Link from 'next/link'
import { PortableText } from '@portabletext/react'

// ── Junk text patterns from Duda template ─────────────────
const JUNK_PATTERNS = [
  /^add a title$/i,
  /^add a link$/i,
  /^place an image/i,
  /^add a paragraph/i,
  /^add your text here/i,
  /^click to edit/i,
  /^lorem ipsum/i,
]

function isJunk(text: string): boolean {
  const t = text?.trim() || ''
  if (t.length < 3) return true
  return JUNK_PATTERNS.some(p => p.test(t))
}

function filterBlocks(blocks: any[]): any[] {
  if (!blocks) return []
  return blocks.filter(block => {
    if (block._type !== 'block') return true
    const text = block.children?.map((c: any) => c.text || '').join('') || ''
    return !isJunk(text)
  })
}

// ── Portable Text components ───────────────────────────────
const ptComponents = {
  block: {
    normal: ({ children }: any) => <p className="font-jost text-gray-700 leading-relaxed text-base mb-4">{children}</p>,
    h1: ({ children }: any) => <h1 className="font-urbanist font-black text-3xl mt-8 mb-4" style={{ color: '#06103C' }}>{children}</h1>,
    h2: ({ children }: any) => <h2 className="font-urbanist font-black text-2xl mt-8 mb-3" style={{ color: '#06103C' }}>{children}</h2>,
    h3: ({ children }: any) => <h3 className="font-urbanist font-bold text-xl mt-6 mb-3" style={{ color: '#06103C' }}>{children}</h3>,
    h4: ({ children }: any) => <h4 className="font-urbanist font-bold text-lg mt-5 mb-2" style={{ color: '#06103C' }}>{children}</h4>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 pl-5 my-6 font-jost text-gray-600 italic" style={{ borderColor: '#A8228A' }}>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-4 space-y-1.5 font-jost text-gray-700">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-4 space-y-1.5 font-jost text-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold" style={{ color: '#06103C' }}>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ children, value }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="underline transition-colors" style={{ color: '#A8228A' }}>{children}</a>
    ),
  },
}

// ── CTA ────────────────────────────────────────────────────
function BlogCTA({ heading, subheading, primaryText, primaryLink, secondaryText, secondaryLink, variant = 'mid' }: {
  heading?: string, subheading?: string, primaryText?: string, primaryLink?: string,
  secondaryText?: string, secondaryLink?: string, variant?: 'mid' | 'bottom'
}) {
  const isMid = variant === 'mid'
  return (
    <div className="rounded-2xl p-7 sm:p-8 my-10" style={isMid ? { background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 100%)' } : { background: 'linear-gradient(135deg, #A8228A 0%, #5B2A86 100%)' }}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
        <div className="flex-1">
          <h3 className="font-urbanist font-black text-xl sm:text-2xl text-white mb-2 leading-tight">
            {heading || (isMid ? 'Need Power System Engineering Support?' : 'Ready to Get Started?')}
          </h3>
          <p className="font-jost text-white/70 text-sm leading-relaxed">
            {subheading || (isMid ? 'Our licensed engineers are available for consultations, studies, and compliance work.' : 'Schedule a free consultation with our team today.')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <Link href={primaryLink || 'https://calendly.com/keentel-engineering/15min'} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-jost font-semibold text-sm transition-all hover:scale-105 whitespace-nowrap"
            style={isMid ? { background: '#A8228A', color: '#fff' } : { background: '#fff', color: '#5B2A86' }}>
            {primaryText || 'Schedule a Consultation'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          {secondaryText && secondaryLink && (
            <Link href={secondaryLink} target="_blank" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-jost font-semibold text-sm border border-white/30 text-white hover:border-white/60 transition-all whitespace-nowrap">
              {secondaryText}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Author Section (bottom of article) ────────────────────
function AuthorSection({ name, title, bio, image, linkedIn }: { name?: string, title?: string, bio?: string, image?: string, linkedIn?: string }) {
  const authorName = name || 'Sonny Patel P.E. EC'
  const authorTitle = title || 'IEEE Senior Member | Licensed PE & EC, Florida'
  const authorBio = bio || "In 1995, Sandip (Sonny) R. Patel earned his Electrical Engineering degree from the University of Illinois. For three decades, he's been shaping the future of engineering as a licensed Professional Engineer across multiple states (Florida, California, New York, West Virginia, and Minnesota). A Licensed Electrical Contractor in Florida with an Unlimited EC license. The founder and CEO of KEENTEL LLC—where expertise meets execution. Three decades. Multiple states. Endless impact."
  const authorImg = image || '/images/author-sandip.jpeg'

  return (
    <div className="bg-white rounded-2xl p-7 sm:p-8 border border-gray-100 shadow-sm mt-10">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex-shrink-0">
          <img
            src={authorImg}
            alt={authorName}
            className="w-20 h-20 rounded-2xl object-cover object-top"
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.style.display = 'none'
              img.parentElement!.innerHTML = `<div style="width:80px;height:80px;border-radius:1rem;background:linear-gradient(135deg,#06103C,#A8228A);display:flex;align-items:center;justify-content:center;font-family:Urbanist,sans-serif;font-weight:900;font-size:1.5rem;color:white">S</div>`
            }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="font-jost text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#A8228A' }}>Written by</p>
              <h3 className="font-urbanist font-black text-xl" style={{ color: '#06103C' }}>{authorName}</h3>
              <p className="font-jost text-gray-500 text-sm mt-0.5">{authorTitle}</p>
            </div>
            {linkedIn && (
              <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-jost text-sm font-semibold px-4 py-2 rounded-full border transition-all" style={{ borderColor: '#0077B5', color: '#0077B5' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
                LinkedIn
              </a>
            )}
          </div>
          <p className="font-jost text-gray-600 text-sm leading-relaxed mt-3">{authorBio}</p>
        </div>
      </div>
    </div>
  )
}

// ── Sidebar ────────────────────────────────────────────────
function Sidebar({ post, originalUrl }: { post: any, slug: string, originalUrl: string }) {
  const authorImg = post.authorImage || '/images/author-sandip.jpeg'

  const services = [
    { name: 'Power System Studies', href: '/service/power-system-studies' },
    { name: 'NERC Compliance', href: '/service/nerc-compliance' },
    { name: 'Substation Design', href: '/service/substation-design' },
    { name: 'Owners Engineer', href: '/service/owners-engineer' },
    { name: 'POI Interconnection', href: '/service/poi-interconnection-engineering-support' },
  ]

  const caseStudies = [
    { name: 'Grounding Design with SES RESAP', href: '/case-studies/grounding-design-ses-resap' },
    { name: 'Industrial Motor Optimization', href: '/case-studies/industrial-motor-optimization-rectifier-simulation' },
    { name: 'View All Case Studies', href: '/our-work' },
  ]

  return (
    <div className="space-y-5">

      {/* Author widget */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <p className="font-jost text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>About the Author</p>
        <div className="flex items-center gap-3 mb-3">
          <img
            src={authorImg}
            alt={post.authorName || 'Sonny Patel'}
            className="w-14 h-14 rounded-xl object-cover object-top flex-shrink-0"
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.style.display = 'none'
              img.parentElement!.innerHTML = `<div style="width:56px;height:56px;border-radius:0.75rem;background:linear-gradient(135deg,#06103C,#A8228A);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1.25rem;color:white;flex-shrink:0">S</div>`
            }}
          />
          <div>
            <p className="font-urbanist font-bold text-sm leading-tight" style={{ color: '#06103C' }}>{post.authorName || 'Sonny Patel P.E. EC'}</p>
            <p className="font-jost text-gray-400 text-xs mt-0.5">{post.authorTitle || 'IEEE Senior Member'}</p>
          </div>
        </div>
        <p className="font-jost text-gray-500 text-xs leading-relaxed mb-4">
          Founder & CEO of Keentel Engineering. Licensed PE in FL, CA, NY, WV, MN. 30+ years in HV/MV/EHV power engineering.
        </p>
        {post.authorLinkedIn && (
          <a href={post.authorLinkedIn} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 font-jost text-xs font-semibold py-2.5 rounded-xl border transition-all w-full"
            style={{ borderColor: '#0077B5', color: '#0077B5' }}>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
            Connect on LinkedIn
          </a>
        )}
      </div>

      {/* Services */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <p className="font-urbanist font-bold text-sm mb-4" style={{ color: '#06103C' }}>Our Services</p>
        <div className="flex flex-col gap-2">
          {services.map((s) => (
            <Link key={s.href} href={s.href}
              className="flex items-center gap-2 font-jost text-sm text-gray-600 hover:text-gray-900 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-all group">
              <svg className="w-3.5 h-3.5 flex-shrink-0 group-hover:text-[#A8228A] transition-colors" style={{ color: '#A8228A' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              {s.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <p className="font-urbanist font-bold text-sm mb-4" style={{ color: '#06103C' }}>Case Studies</p>
        <div className="flex flex-col gap-2">
          {caseStudies.map((cs) => (
            <Link key={cs.href} href={cs.href}
              className="flex items-center gap-2 font-jost text-sm text-gray-600 hover:text-gray-900 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-all group">
              <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#A8228A' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              {cs.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Share */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <p className="font-urbanist font-bold text-sm mb-4" style={{ color: '#06103C' }}>Share Article</p>
        <div className="flex flex-col gap-2">
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(originalUrl)}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 font-jost text-sm text-gray-600 hover:text-gray-900 p-2.5 rounded-xl hover:bg-gray-50 transition-all">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#0077B5' }}>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
            </div>
            Share on LinkedIn
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(originalUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 font-jost text-sm text-gray-600 hover:text-gray-900 p-2.5 rounded-xl hover:bg-gray-50 transition-all">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-black">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </div>
            Share on X
          </a>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #06103C, #0B1A5B)' }}>
        <p className="font-urbanist font-bold text-white text-base mb-1">Need Engineering Help?</p>
        <p className="font-jost text-white/60 text-sm mb-5 leading-relaxed">Talk to one of our licensed power engineers today</p>
        <Link href="https://calendly.com/keentel-engineering/15min" target="_blank"
          className="block text-center font-jost text-sm font-semibold py-3 rounded-xl mb-2 hover:opacity-90 transition-all"
          style={{ background: '#A8228A', color: '#fff' }}>
          Schedule Free Consultation
        </Link>
        <Link href="/contact"
          className="block text-center font-jost text-sm font-semibold py-3 rounded-xl border border-white/20 hover:border-white/40 text-white/70 hover:text-white transition-all">
          Contact Us
        </Link>
      </div>

    </div>
  )
}

// ── Main Component ─────────────────────────────────────────
interface BlogPostBodyProps {
  post: {
    title: string
    slug: { current: string }
    category: string
    excerpt: string
    body?: any[]
    authorName?: string
    authorTitle?: string
    authorBio?: string
    authorImage?: string
    authorLinkedIn?: string
    midCtaEnabled?: boolean
    midCtaHeading?: string
    midCtaSubheading?: string
    midCtaPrimaryText?: string
    midCtaPrimaryLink?: string
    midCtaSecondaryText?: string
    midCtaSecondaryLink?: string
    bottomCtaEnabled?: boolean
    bottomCtaHeading?: string
    bottomCtaSubheading?: string
    bottomCtaPrimaryText?: string
    bottomCtaPrimaryLink?: string
    bottomCtaSecondaryText?: string
    bottomCtaSecondaryLink?: string
  }
  slug: string
}

export default function BlogPostBody({ post, slug }: BlogPostBodyProps) {
  const originalUrl = `https://keentelengineering.com/${slug}`
  const showMidCta = post.midCtaEnabled !== false
  const showBottomCta = post.bottomCtaEnabled !== false

  // Filter junk blocks from Duda template artifacts
  const cleanBody = filterBlocks(post.body || [])
  const hasBody = cleanBody.length > 2

  // Split at midpoint for CTA insertion
  const midPoint = hasBody ? Math.floor(cleanBody.length / 2) : 0
  const firstHalf = hasBody ? cleanBody.slice(0, midPoint) : []
  const secondHalf = hasBody ? cleanBody.slice(midPoint) : []

  return (
    <section className="py-12" style={{ background: '#F6F7FB' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── MAIN CONTENT ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-gray-100">

              {!hasBody && (
                <div className="flex items-start gap-4 p-5 rounded-xl mb-8 border" style={{ background: 'rgba(6,16,60,0.03)', borderColor: '#E6E8F0' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(168,34,138,0.1)' }}>
                    <svg className="w-4 h-4" style={{ color: '#A8228A' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="font-jost font-semibold text-sm mb-1" style={{ color: '#06103C' }}>Full article available</p>
                    <p className="font-jost text-gray-500 text-sm mb-3">Read the complete version with all technical content:</p>
                    <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-jost text-sm font-semibold hover:underline" style={{ color: '#A8228A' }}>
                      Read Full Article on keentelengineering.com
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>
                </div>
              )}

              {/* First half */}
              {hasBody && firstHalf.length > 0 && (
                <div className="mb-2">
                  <PortableText value={firstHalf} components={ptComponents} />
                </div>
              )}

              {/* Mid CTA */}
              {showMidCta && <BlogCTA variant="mid" heading={post.midCtaHeading} subheading={post.midCtaSubheading} primaryText={post.midCtaPrimaryText} primaryLink={post.midCtaPrimaryLink} secondaryText={post.midCtaSecondaryText} secondaryLink={post.midCtaSecondaryLink} />}

              {/* Second half */}
              {hasBody && secondHalf.length > 0 && (
                <div>
                  <PortableText value={secondHalf} components={ptComponents} />
                </div>
              )}

              {/* Bottom CTA */}
              {showBottomCta && <BlogCTA variant="bottom" heading={post.bottomCtaHeading} subheading={post.bottomCtaSubheading} primaryText={post.bottomCtaPrimaryText} primaryLink={post.bottomCtaPrimaryLink} secondaryText={post.bottomCtaSecondaryText} secondaryLink={post.bottomCtaSecondaryLink} />}

              {/* Author section */}
              <AuthorSection name={post.authorName} title={post.authorTitle} bio={post.authorBio} image={post.authorImage} linkedIn={post.authorLinkedIn} />

            </div>
          </div>

          {/* ── SIDEBAR — sticky ── */}
          <div className="lg:col-span-1 lg:sticky lg:top-28 lg:self-start">
            <Sidebar post={post} slug={slug} originalUrl={originalUrl} />
          </div>

        </div>
      </div>
    </section>
  )
}
