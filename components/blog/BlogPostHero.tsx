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
  const sources = [
    ...(post.featuredImage ? [post.featuredImage] : []),
    `/images/blog/${slug}-featured.jpg`,
    `/images/blog/${slug}-featured.png`,
    `/images/blog/${slug}-featured.jpeg`,
    `/images/blog/${slug}-featured.webp`,
  ]
  const [idx, setIdx] = useState(0)
  const [imgFailed, setImgFailed] = useState(false)

  function handleImgError() {
    if (idx + 1 < sources.length) {
      setIdx(i => i + 1)
    } else {
      setImgFailed(true)
    }
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
          background: 'linear-gradient(135deg, rgba(6,16,60,0.97) 0%, rgba(6,16,60,0.85) 60%, rgba(91,42,134,0.4) 100%), #06103C',
        }}
        className="pt-32 pb-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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

      {/* ── FULL IMAGE — natural height, no cropping ───────── */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        {!imgFailed ? (
          <div className="w-full overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={sources[idx]}
              alt={post.title}
              // FIX: w-full h-auto so the full image shows at its natural height — no cropping
              className="w-full h-auto block"
              onError={handleImgError}
            />
          </div>
        ) : (
          // Fallback gradient box when no image available
          <div
            className="w-full rounded-2xl shadow-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #06103C, #0B1A5B)', minHeight: '320px' }}
          >
            <span className="font-urbanist font-black" style={{ color: 'rgba(255,255,255,0.06)', fontSize: '6rem' }}>K</span>
          </div>
        )}
      </div>
    </div>
  )
}
