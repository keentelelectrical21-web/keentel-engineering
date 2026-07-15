'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  category: string
  featuredImage?: string
}

const POSTS_PER_PAGE = 12

function BlogCard({ post }: { post: Post }) {
  const slug = post.slug?.current || ''
  const sources = [
    `/images/blog/${slug}-featured.jpg`,
    `/images/blog/${slug}-featured.png`,
    `/images/blog/${slug}-featured.jpeg`,
    `/images/blog/${slug}-featured.webp`,
    ...(post.featuredImage ? [post.featuredImage] : []),
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
    <Link
      href={`/${slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* FIX: natural image height — no fixed h-48, image shows fully at its own height */}
      <div
        className="w-full overflow-hidden flex-shrink-0"
        style={failed ? { background: 'linear-gradient(135deg, #06103C, #0B1A5B)', minHeight: '200px' } : {}}
      >
        {!failed && (
          <img
            src={sources[idx]}
            alt={post.title}
            className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
            onError={() => {
              if (idx + 1 < sources.length) {
                setIdx(i => i + 1)
              } else {
                setFailed(true)
              }
            }}
          />
        )}
        {failed && (
          <div className="w-full flex items-center justify-center" style={{ minHeight: '200px' }}>
            <span style={{ color: 'rgba(255,255,255,0.08)', fontSize: '2.5rem', fontWeight: 900 }}>K</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="font-jost text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(168,34,138,0.08)', color: '#A8228A' }}>
            {post.category}
          </span>
          <span className="font-jost text-xs text-gray-400">{formatDate(post.publishedAt)}</span>
        </div>
        <h3 className="font-urbanist font-bold text-base leading-snug mb-3 group-hover:text-[#A8228A] transition-colors line-clamp-2 flex-1" style={{ color: '#06103C' }}>
          {post.title}
        </h3>
        <p className="font-jost text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-1.5 font-jost text-sm font-semibold mt-auto" style={{ color: '#A8228A' }}>
          Read More
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default function BlogGrid({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // FIX: read active category from URL ?category= param
  // This means clicking a chip in BlogHero (which sets the URL param) automatically filters here
  const urlCategory = searchParams.get('category') || 'All'
  const [activeCategory, setActiveCategory] = useState(urlCategory)
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  // Sync when URL param changes (e.g. hero chip clicked)
  useEffect(() => {
    setActiveCategory(urlCategory)
    setVisibleCount(POSTS_PER_PAGE)
  }, [urlCategory])

  // Build categories dynamically from actual post data
  const categories = useMemo(() => {
    const seen = new Set<string>()
    const cats: string[] = ['All']
    for (const p of posts) {
      if (p.category && !seen.has(p.category)) {
        seen.add(p.category)
        cats.push(p.category)
      }
    }
    return cats
  }, [posts])

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return posts
    return posts.filter(p => p.category === activeCategory)
  }, [posts, activeCategory])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat)
    setVisibleCount(POSTS_PER_PAGE)
    // FIX: update URL so hero chips stay in sync
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'All') {
      params.delete('category')
    } else {
      params.set('category', cat)
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <section id="blog-grid" className="py-16" style={{ background: '#F6F7FB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Mobile dropdown */}
        <div className="mb-10 sm:hidden">
          <select
            value={activeCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl font-jost font-semibold text-sm border-2 focus:outline-none"
            style={{ borderColor: '#E6E8F0', color: '#06103C', background: '#fff' }}
          >
            {categories.map((cat) => {
              const count = cat === 'All' ? posts.length : posts.filter(p => p.category === cat).length
              return <option key={cat} value={cat}>{cat} ({count})</option>
            })}
          </select>
        </div>

        {/* Desktop filter chips */}
        <div className="mb-10 hidden sm:flex flex-wrap gap-2">
          {categories.map((cat) => {
            const count = cat === 'All' ? posts.length : posts.filter(p => p.category === cat).length
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full font-jost font-semibold text-sm transition-all duration-200"
                style={isActive
                  ? { background: '#06103C', color: '#fff' }
                  : { background: '#fff', color: '#555', border: '1.5px solid #E6E8F0' }
                }
              >
                {cat}
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-normal"
                  style={isActive
                    ? { background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }
                    : { background: '#F0F1F8', color: '#999' }
                  }
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <p className="font-jost text-gray-500 text-sm mb-6">
          Showing <span className="font-semibold text-gray-800">{visible.length}</span> of <span className="font-semibold text-gray-800">{filtered.length}</span> articles
          {activeCategory !== 'All' && <span> in <span className="font-semibold" style={{ color: '#A8228A' }}>{activeCategory}</span></span>}
        </p>

        {visible.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-jost text-gray-400 text-lg">No articles in this category yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount(v => v + POSTS_PER_PAGE)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold border-2 transition-all hover:shadow-lg"
              style={{ borderColor: '#06103C', color: '#06103C' }}
            >
              Load More Articles
              <span className="text-sm font-normal opacity-60">({filtered.length - visibleCount} remaining)</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
