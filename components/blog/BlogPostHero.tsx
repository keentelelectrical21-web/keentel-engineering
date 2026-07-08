'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Post {
  title: string
  excerpt: string
  publishedAt: string
  category: string
  slug: { current: string } | string
  featuredImage?: string
  authorName?: string
  authorTitle?: string
  authorImage?: string
}

export default function BlogPostHero({ post, slug }: { post: Post; slug: string }) {
  const localImg      = `/images/blog/${slug}-featured.jpg`
  const localImgPng   = `/images/blog/${slug}-featured.png`
  const localImgWebp  = `/images/blog/${slug}-featured.webp`
  const fallbackImg   = post.featuredImage || null

  const [imgSrc, setImgSrc]       = useState(localImg)
  const [triedPng, setTriedPng]   = useState(false)
  const [triedWebp, setTriedWebp] = useState(false)
  const [triedSanity, setTriedSanity] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)

  function handleImgError() {
    if (!triedPng) { setTriedPng(true); setImgSrc(localImgPng) }
    else if (!triedWebp) { setTriedWebp(true); setImgSrc(localImgWebp) }
    else if (!triedSanity && fallbackImg) { setTriedSanity(true); setImgSrc(fallbackImg) }
    else { setImgFailed(true) }
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return ''
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      })
    } catch { return '' }
  }

  const readTime = post.excerpt
    ? Math.max(3, Math.ceil(post.excerpt.split(' ').length * 8 / 200))
    : 5

  return (
    <div>
      {/* ── DARK NAVY HERO ─────────────────────────────────── */}
      <section
        style={{
          background:
            'linear-gradient(135deg, rgba(6,16,60,0.97) 0%, rgba(6,16,60,0.85) 60%, rgba(91,42,134,0.4) 100%), #06103C',
        }}
        className="pt-32 pb-12 px-6"
      >
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-jost text-xs mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="line-clamp-1 max-w-[220px]" style={{ color: '#A8228A' }}>{post.title}</span>
          </nav>

          {/* Category badge */}
          <span
            className="inline-block font-jost text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
            style={{ background: 'rgba(168,34,138,0.2)', color: '#C72E9E', border: '1px solid rgba(168,34,138,0.3)' }}
          >
            {post.category}
          </span>

          {/* Title */}
          <h1
            className="font-urbanist font-black text-white leading-tight mb-5"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p
              className="font-jost text-lg leading-relaxed mb-8 pl-5"
              style={{ color: 'rgba(255,255,255,0.7)', borderLeft: '4px solid #A8228A' }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {/* Author */}
            <div className="flex items-center gap-3">
              {post.authorImage ? (
                <img
                  src={post.authorImage}
                  alt={post.authorName || 'Author'}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-urbanist font-bold text-white text-sm flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
                >
                  {(post.authorName || 'S').charAt(0)}
                </div>
              )}
              <div>
                <p className="font-jost font-semibold text-sm text-white">
                  {post.authorName || 'Sonny Patel P.E. EC'}
                </p>
                <p className="font-jost text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {post.authorTitle || 'IEEE Senior Member'}
                </p>
              </div>
            </div>

            <div className="w-px h-8 hidden sm:block" style={{ background: 'rgba(255,255,255,0.15)' }} />

            {/* Date */}
            {post.publishedAt && (
              <div className="flex items-center gap-1.5 font-jost text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.publishedAt)}
              </div>
            )}

            <div className="w-px h-8 hidden sm:block" style={{ background: 'rgba(255,255,255,0.15)' }} />

            {/* Read time */}
            <div className="flex items-center gap-1.5 font-jost text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readTime} min read
            </div>
          </div>
        </div>
      </section>

      {/* ── FULL IMAGE ─────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 -mt-0">
        <div
          className="w-full overflow-hidden rounded-b-2xl shadow-2xl"
          style={imgFailed
            ? { background: 'linear-gradient(135deg, #06103C, #0B1A5B)', minHeight: '320px' }
            : {}}
        >
          {!imgFailed ? (
            <img
              src={imgSrc}
              alt={post.title}
              className="w-full object-cover"
              style={{ maxHeight: '520px', width: '100%', display: 'block' }}
              onError={handleImgError}
            />
          ) : (
            <div className="w-full flex items-center justify-center" style={{ minHeight: '320px' }}>
              <span className="font-urbanist font-black" style={{ color: 'rgba(255,255,255,0.06)', fontSize: '6rem' }}>K</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
