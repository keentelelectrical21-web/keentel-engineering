'use client'
// ============================================================
// FILE: components/blog/BlogRelated.tsx  — REPLACE ENTIRE FILE
// ============================================================

import Link from 'next/link'
import { useState } from 'react'

interface RelatedPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  category: string
  featuredImage?: string
}

function RelatedCard({ post }: { post: RelatedPost }) {
  const slug = post.slug?.current || ''
  const sources = [
    `/images/blog/${slug}-featured.jpg`,
    `/images/blog/${slug}-featured.png`,
    `/images/blog/${slug}-featured.jpeg`,
    `/images/blog/${slug}-featured.webp`,
  ]
  const [idx, setIdx] = useState(0)
  const [failed, setFailed] = useState(false)

  function formatDate(dateStr: string) {
    if (!dateStr) return ''
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } catch { return '' }
  }

  return (
    <Link href={`/blog/${slug}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="h-44 overflow-hidden flex-shrink-0" style={failed ? { background: 'linear-gradient(135deg, #06103C, #0B1A5B)' } : { background: '#f3f4f6' }}>
        {!failed ? (
          <img
            src={sources[idx]}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => {
              if (idx + 1 < sources.length) setIdx(i => i + 1)
              else setFailed(true)
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span style={{ color: 'rgba(255,255,255,0.08)', fontSize: '2.5rem', fontWeight: 900 }}>K</span>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="font-jost text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(168,34,138,0.08)', color: '#A8228A' }}>{post.category}</span>
          <span className="font-jost text-xs text-gray-400">{formatDate(post.publishedAt)}</span>
        </div>
        <h3 className="font-urbanist font-bold text-base leading-snug line-clamp-2 group-hover:text-[#A8228A] transition-colors" style={{ color: '#06103C' }}>{post.title}</h3>
        <p className="font-jost text-gray-500 text-sm line-clamp-2 mt-2 leading-relaxed">{post.excerpt}</p>
      </div>
    </Link>
  )
}

export default function BlogRelated({ posts }: { posts: RelatedPost[] }) {
  if (!posts || posts.length === 0) return null
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="font-jost text-xs font-semibold uppercase tracking-widest" style={{ color: '#A8228A' }}>Keep Reading</span>
            <h2 className="font-urbanist font-black text-3xl mt-1" style={{ color: '#06103C' }}>Related Articles</h2>
          </div>
          <Link href="/blog" className="font-jost text-sm font-semibold flex items-center gap-1.5 transition-colors" style={{ color: '#A8228A' }}>
            View All
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => <RelatedCard key={post._id} post={post} />)}
        </div>
      </div>
    </section>
  )
}
