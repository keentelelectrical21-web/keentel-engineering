// ============================================================
// FILE: app/search/page.tsx
// ============================================================
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface SearchResult {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  category: string
  publishedAt: string
  featuredImage?: string
}

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (!query.trim()) return
    setLoading(true)
    setSearched(false)
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then(r => r.json())
      .then(data => {
        setResults(data.results || [])
        setSearched(true)
        setLoading(false)
      })
      .catch(() => {
        setResults([])
        setSearched(true)
        setLoading(false)
      })
  }, [query])

  function getLocalImg(slug: string) {
    return `/images/blog/${slug}-featured`
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return ''
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    } catch { return '' }
  }

  return (
    <main className="min-h-screen" style={{ background: '#F6F7FB' }}>
      {/* Header */}
      <div className="py-16" style={{ background: '#06103C' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-jost mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <h1 className="font-urbanist font-black text-white text-4xl sm:text-5xl mb-4">
            Search Results
          </h1>
          {query && (
            <p className="font-jost text-white/60 text-lg">
              {loading ? 'Searching...' : searched ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"` : ''}
            </p>
          )}

          {/* Search bar */}
          <form action="/search" method="GET" className="mt-8">
            <div className="relative">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search articles..."
                className="w-full px-6 py-4 pr-14 rounded-xl font-jost text-gray-900 text-lg outline-none border-2 border-transparent focus:border-[#A8228A] transition-colors"
                style={{ background: 'rgba(255,255,255,0.95)' }}
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: '#A8228A' }}
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#A8228A', borderTopColor: 'transparent' }} />
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#E6E8F0' }}>
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="font-urbanist font-bold text-2xl mb-2" style={{ color: '#06103C' }}>No results found</h2>
            <p className="font-jost text-gray-500">Try different keywords or browse all articles</p>
            <Link href="/blog" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full font-jost font-semibold text-white transition-all" style={{ background: '#06103C' }}>
              Browse All Articles
            </Link>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-4">
            {results.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group flex gap-5 bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-200 p-4"
              >
                {/* Image */}
                <div className="w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={getLocalImg(post.slug.current)}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement
                      if (post.featuredImage) img.src = post.featuredImage
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold font-jost uppercase tracking-wide px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(168,34,138,0.1)', color: '#A8228A' }}>
                      {post.category}
                    </span>
                    {post.publishedAt && (
                      <span className="text-xs text-gray-400 font-jost">{formatDate(post.publishedAt)}</span>
                    )}
                  </div>
                  <h3 className="font-urbanist font-bold text-base sm:text-lg leading-snug mb-1.5 group-hover:text-[#A8228A] transition-colors line-clamp-2" style={{ color: '#06103C' }}>
                    {post.title}
                  </h3>
                  <p className="font-jost text-gray-500 text-sm line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex-shrink-0 self-center hidden sm:block">
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-[#A8228A] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!query && !loading && (
          <div className="text-center py-20">
            <p className="font-jost text-gray-500 text-lg">Enter a search term above to find articles</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="min-h-screen" style={{ background: '#F6F7FB' }} />}>
        <SearchResults />
      </Suspense>
      <Footer />
    </>
  )
}