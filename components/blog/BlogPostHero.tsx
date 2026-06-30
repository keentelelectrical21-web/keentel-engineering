'use client'
// ============================================================
// FILE: components/blog/BlogPostHero.tsx  — REPLACE EXISTING
// ============================================================

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

function getSlugString(slug: { current: string } | string): string {
  if (typeof slug === 'string') return slug
  return slug?.current || ''
}

export default function BlogPostHero({ post, slug }: { post: Post, slug: string }) {
  const slugStr = slug

  // Try local first, then Sanity CDN, then Duda CDN
  const localImg = `/images/blog/${slugStr}-featured.jpg`
  const localImgPng = `/images/blog/${slugStr}-featured.png`
  const localImgWebp = `/images/blog/${slugStr}-featured.webp`
  const fallbackImg = post.featuredImage || null

  const [imgSrc, setImgSrc] = useState(localImg)
  const [triedPng, setTriedPng] = useState(false)
  const [triedWebp, setTriedWebp] = useState(false)
  const [triedSanity, setTriedSanity] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)

  function handleImgError() {
    if (!triedPng) {
      setTriedPng(true)
      setImgSrc(localImgPng)
    } else if (!triedWebp) {
      setTriedWebp(true)
      setImgSrc(localImgWebp)
    } else if (!triedSanity && fallbackImg) {
      setTriedSanity(true)
      setImgSrc(fallbackImg)
    } else {
      setImgFailed(true)
    }
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return ''
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    } catch { return '' }
  }

  const readTime = post.excerpt ? Math.max(3, Math.ceil(post.excerpt.split(' ').length * 8 / 200)) : 5

  return (
    <section className="bg-white">
      {/* Featured image */}
      <div className="w-full h-64 sm:h-80 lg:h-[480px] overflow-hidden relative bg-gray-100" style={imgFailed ? { background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 100%)' } : {}}>
        {!imgFailed && (
          <img
            src={imgSrc}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={handleImgError}
          />
        )}
        {imgFailed && (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-urbanist font-black text-white/10 text-6xl">K</span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 40%, transparent 70%)' }} />
      </div>

      {/* Post header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-8">
        {/* Category badge */}
        <div className="mb-5">
          <span className="font-jost text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm inline-block" style={{ background: '#06103C', color: '#fff' }}>
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-urbanist font-black leading-tight mb-5" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#06103C' }}>
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="font-jost text-gray-600 text-lg leading-relaxed mb-6 border-l-4 pl-5" style={{ borderColor: '#A8228A' }}>
            {post.excerpt}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-4 flex-wrap pt-5 border-t border-gray-100">
          {/* Author */}
          <div className="flex items-center gap-3">
            {post.authorImage ? (
              <img src={post.authorImage} alt={post.authorName || 'Author'} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-urbanist font-bold text-white text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>
                {(post.authorName || 'S').charAt(0)}
              </div>
            )}
            <div>
              <p className="font-jost font-semibold text-sm" style={{ color: '#06103C' }}>{post.authorName || 'Sandip R Patel'}</p>
              <p className="font-jost text-gray-400 text-xs">{post.authorTitle || 'Power Systems Engineer, PE'}</p>
            </div>
          </div>

          <div className="w-px h-8 bg-gray-200 hidden sm:block" />

          {post.publishedAt && (
            <div className="flex items-center gap-1.5 font-jost text-sm text-gray-500">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(post.publishedAt)}
            </div>
          )}

          <div className="w-px h-8 bg-gray-200 hidden sm:block" />

          <div className="flex items-center gap-1.5 font-jost text-sm text-gray-500">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readTime} min read
          </div>

          <div className="ml-auto hidden sm:flex items-center gap-2 font-jost text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
            <span>/</span>
            <span className="line-clamp-1 max-w-[200px]" style={{ color: '#A8228A' }}>{post.title}</span>
          </div>
        </div>
      </div>
    </section>
  )
}