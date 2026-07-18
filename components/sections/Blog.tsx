'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client } from '@/lib/sanity'

const fallbackPosts = [
  { slug: 'nyiso-interconnection-study-large-loads', title: 'NYISO Interconnection Study Guide for Large Loads', excerpt: 'Learn how NYISO interconnection study, Load SIS, POI strategy, and modeling data requirements affect large load and generation projects in New York.', author: 'Sandip R Patel', date: 'June 10, 2026', category: 'Interconnection', image: '/images/blog-home/nyiso-interconnection.png' },
  { slug: 'ercot-ride-through-requirements', title: 'ERCOT Ride Through Requirements for Large Loads', excerpt: 'Learn ERCOT ride through requirements for Large Electronic Loads, data centers, and interconnection compliance. Discover NOGRR282 engineering steps.', author: 'Sandip R Patel', date: 'June 9, 2026', category: 'ERCOT', image: '/images/blog-home/ercot-ride-through.png' },
  { slug: 'cable-ampacity-sizing', title: 'Cable Ampacity and Sizing: Thermal Limits Explained', excerpt: 'Learn cable ampacity and sizing methods, conductor thermal limits, derating factors, and cable sizing calculations for reliable power systems.', author: 'Sandip R Patel', date: 'June 8, 2026', category: 'Power Systems', image: '/images/blog-home/cable-ampacity.png' },
]

type BlogPost = {
  _id: string
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  image: string
}

const catColors: Record<string, string> = {
  'Interconnection': '#0B1A5B', 'ERCOT': '#5B2A86', 'Power Systems': '#A8228A', 'NERC': '#C72E9E', 'ISO-NE': '#0B1A5B',
}

export default function BlogSection({ limit = 3 }: { limit?: number }) {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    client.fetch<Array<{
      _id: string
      title: string
      slug?: { current?: string }
      excerpt?: string
      publishedAt?: string
      category?: string
      featuredImage?: string
    }>>(
      `*[_type == "blogPost"] | order(publishedAt desc) [0...15] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        "category": coalesce(category->title, category->name, category, "Technical Insight"),
        "featuredImage": coalesce(featuredImage.asset->url, mainImage.asset->url)
      }`
    ).then((items) => {
      setPosts(items.map((post) => ({
        _id: post._id,
        slug: (post.slug?.current || '').replace(/^\/+/, ''),
        title: post.title,
        excerpt: post.excerpt || 'Explore this technical insight from Keentel Engineering.',
        author: 'Sandip R Patel',
        date: post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          : '',
        category: post.category || 'Technical Insight',
        image: post.featuredImage || `/images/blog/${(post.slug?.current || '').replace(/^\/+/, '')}-featured.jpg`,
      })))
    }).catch(() => setPosts([]))
  }, [])

  const visiblePosts = (posts.length > 0 ? posts : fallbackPosts.map((post, index) => ({ ...post, _id: `fallback-${index}` }))).slice(0, limit)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Grid IQ</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#0B1230' }}>Blog and Updates</h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-sm transition-all" style={{ color: '#0B1A5B' }}>
            View All Posts
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.map((post) => (
            <article key={post._id} className="group flex h-full flex-col overflow-hidden rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl" style={{ borderColor: '#E6E8F0' }}>
              <div className="relative overflow-hidden w-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                    style={{ background: catColors[post.category] || '#0B1A5B' }}
                  >
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-jost font-semibold" style={{ color: '#0B1230' }}>
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#A8228A' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {post.date}
                  </span>
                  <span className="text-sm font-jost" style={{ color: '#9CA3AF' }}>· {post.author}</span>
                </div>

                <h3 className="font-urbanist font-bold text-xl leading-snug mb-3 group-hover:text-[#A8228A] transition-colors" style={{ color: '#0B1230' }}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-base font-jost leading-relaxed mb-4 line-clamp-2" style={{ color: '#4B5563' }}>
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-all" style={{ color: '#0B1A5B' }}>
                  Read post
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog" className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full text-white transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #0B1A5B, #5B2A86)' }}>
            See All Blog Posts
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}
