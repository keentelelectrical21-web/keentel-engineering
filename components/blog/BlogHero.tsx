'use client'
// ============================================================
// FILE: components/blog/BlogHero.tsx
// ============================================================

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SearchResult {
  _id: string
  title: string
  slug: { current: string }
  category: string
  featuredImage?: string
}

interface BlogHeroProps {
  totalPosts: number
}

export default function BlogHero({ totalPosts }: BlogHeroProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const debounceRef = useRef<NodeJS.Timeout>()

  // Open search
  function openSearch() {
    setSearchOpen(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  // Close search
  function closeSearch() {
    setSearchOpen(false)
    setQuery('')
    setResults([])
  }

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeSearch()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Live search with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!query.trim() || query.trim().length < 2) {
      setResults([])
      setSearching(false)
      return
    }
    setSearching(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results || [])
      } catch { setResults([]) }
      setSearching(false)
    }, 300)
  }, [query])

  // Submit — go to search results page
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    closeSearch()
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  function getLocalImg(slug: string) {
    return `/images/blog/${slug}-featured`
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 60%, #06103C 100%)' }}>
        <img src="/images/blog-hero.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(168,34,138,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(168,34,138,0.6) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5" style={{ background: '#A8228A' }} />
              <span className="font-jost text-xs font-semibold uppercase tracking-widest" style={{ color: '#A8228A' }}>
                Keentel's Grid IQ
              </span>
            </div>

            <h1 className="font-urbanist font-black text-white mb-4 leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Technical Insights for<br />
              <span style={{ color: '#C72E9E' }}>Power Engineers</span>
            </h1>

            <p className="font-jost text-white/60 text-lg mb-10 max-w-2xl leading-relaxed">
              Expert analysis on NERC compliance, IEEE standards, power system studies, and grid modernization. {totalPosts}+ technical articles.
            </p>

            {/* Search trigger button */}
            <button
              onClick={openSearch}
              className="flex items-center gap-3 w-full max-w-xl px-5 py-4 rounded-xl text-left transition-all border border-white/10 hover:border-white/30"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#A8228A' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="font-jost text-white/40 flex-1">Search articles, topics, standards...</span>
              <span className="font-jost text-xs text-white/20 border border-white/10 px-2 py-0.5 rounded hidden sm:block">ESC to close</span>
            </button>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-white/10">
              {[
                { num: `${totalPosts}+`, label: 'Technical Articles' },
                { num: '8', label: 'Topic Categories' },
                { num: '30+', label: 'Years of Expertise' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-urbanist font-black text-2xl text-white">{s.num}</div>
                  <div className="font-jost text-white/40 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: 'linear-gradient(to bottom, transparent, #F6F7FB)' }} />
      </section>

      {/* Full-screen search overlay */}
      {searchOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: 'rgba(6,16,60,0.97)' }}
          onClick={(e) => { if (e.target === overlayRef.current) closeSearch() }}
        >
          {/* Search input area */}
          <div className="border-b border-white/10 px-4 sm:px-8 py-6">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 flex-shrink-0" style={{ color: '#A8228A' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search power system articles..."
                    className="flex-1 bg-transparent font-jost text-white text-xl outline-none placeholder-white/30"
                  />
                  {searching && (
                    <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin flex-shrink-0" style={{ borderColor: '#A8228A', borderTopColor: 'transparent' }} />
                  )}
                  <button
                    type="button"
                    onClick={closeSearch}
                    className="flex-shrink-0 font-jost text-white/40 hover:text-white text-sm transition-colors border border-white/20 hover:border-white/40 px-3 py-1.5 rounded-lg"
                  >
                    ESC
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6">

              {/* Live results */}
              {query.trim().length >= 2 && !searching && results.length > 0 && (
                <>
                  <p className="font-jost text-white/40 text-xs uppercase tracking-widest mb-4">
                    {results.length} result{results.length !== 1 ? 's' : ''} — press Enter to see all
                  </p>
                  <div className="space-y-2">
                    {results.slice(0, 8).map((post) => (
                      <Link
                        key={post._id}
                        href={`/blog/${post.slug.current}`}
                        onClick={closeSearch}
                        className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        {/* Thumbnail */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                          <img
                            src={getLocalImg(post.slug.current)}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const img = e.target as HTMLImageElement
                              if (post.featuredImage) img.src = post.featuredImage
                              else img.style.display = 'none'
                            }}
                          />
                        </div>
                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className="font-urbanist font-semibold text-white text-sm leading-snug line-clamp-1 group-hover:text-[#C72E9E] transition-colors">
                            {post.title}
                          </p>
                          <p className="font-jost text-white/40 text-xs mt-0.5">{post.category}</p>
                        </div>
                        <svg className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                  {results.length > 8 && (
                    <button
                      onClick={handleSubmit as any}
                      className="w-full mt-3 py-3 rounded-xl font-jost font-semibold text-sm border border-white/20 text-white/60 hover:border-white/40 hover:text-white transition-all"
                    >
                      See all {results.length} results for "{query}"
                    </button>
                  )}
                </>
              )}

              {/* No results */}
              {query.trim().length >= 2 && !searching && results.length === 0 && (
                <div className="text-center py-12">
                  <p className="font-jost text-white/40 text-lg">No results for "{query}"</p>
                  <p className="font-jost text-white/20 text-sm mt-2">Try different keywords</p>
                </div>
              )}

              {/* Empty state — show categories */}
              {query.trim().length < 2 && (
                <div>
                  <p className="font-jost text-white/40 text-xs uppercase tracking-widest mb-4">Browse by category</p>
                  <div className="flex flex-wrap gap-2">
                    {['NERC Compliance', 'IEEE 2800', 'Power System Studies', 'Renewable Energy', 'Substation Design', 'Grid Modernization'].map((cat) => (
                      <Link
                        key={cat}
                        href={`/blog?category=${encodeURIComponent(cat)}`}
                        onClick={closeSearch}
                        className="px-4 py-2 rounded-full font-jost text-sm text-white/60 border border-white/20 hover:border-white/40 hover:text-white transition-all"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}