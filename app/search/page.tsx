// ============================================================
// FILE: app/search/page.tsx
// ============================================================
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState, Suspense } from 'react'
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
  const router = useRouter()
  const query = searchParams.get('q') || ''
  const [searchInput, setSearchInput] = useState(query)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [searchError, setSearchError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function performSearch(searchTerm: string, signal?: AbortSignal) {
    setLoading(true)
    setSearched(false)
    setSearchError('')

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`, { signal })
      if (!response.ok) throw new Error(`Search failed with ${response.status}`)
      const data = await response.json()
      setResults(data.results || [])
      setSearched(true)
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setResults([])
      setSearched(true)
      setSearchError('Search could not be completed. Please try again.')
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }

  useEffect(() => {
    if (!query.trim()) return
    const controller = new AbortController()
    void performSearch(query, controller.signal)
    return () => controller.abort()
    // performSearch intentionally runs only when the URL query changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextQuery = searchInput.trim()

    if (nextQuery.length < 2) {
      setSearchError('Enter at least 2 characters to search.')
      inputRef.current?.focus()
      return
    }

    setSearchError('')
    if (nextQuery === query) {
      void performSearch(nextQuery)
      return
    }
    router.push(`/search?q=${encodeURIComponent(nextQuery)}`)
  }

  function getLocalImg(slug: string) {
    return `/images/blog/${slug.replace(/^\/+/, '')}-featured.jpg`
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return ''
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    } catch { return '' }
  }

  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <section className="relative isolate overflow-hidden bg-[#06103C] pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
        <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-[#A8228A]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 left-1/4 h-80 w-80 rounded-full bg-[#3047A5]/25 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#F14BB9]">Keentel Grid IQ</p>
            <h1 className="font-urbanist text-3xl font-black leading-tight text-white min-[380px]:text-4xl sm:text-5xl lg:text-6xl">Find Technical Insights</h1>
            <p className="mt-4 max-w-2xl font-jost text-base leading-relaxed text-white/65 sm:text-lg">
              Search practical guidance on power-system studies, grid interconnection, NERC compliance, and electrical infrastructure.
            </p>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="mt-8 max-w-4xl sm:mt-10" role="search">
            <div className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-white p-2 shadow-2xl shadow-black/20 focus-within:ring-4 focus-within:ring-[#C72E9E]/20 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-2 sm:px-1">
                <svg className="ml-1 h-5 w-5 flex-shrink-0 text-[#A8228A] sm:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  name="q"
                  value={searchInput}
                  onChange={(event) => {
                    setSearchInput(event.target.value)
                    if (searchError) setSearchError('')
                  }}
                  placeholder="Search technical articles..."
                  className="min-w-0 flex-1 bg-transparent py-3 font-jost text-base text-[#06103C] outline-none placeholder:text-gray-400 sm:text-lg"
                  autoComplete="off"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  aria-describedby={searchError ? 'search-error' : undefined}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 w-full flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C72E9E] to-[#8B278F] px-5 font-jost text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:px-6"
                aria-label="Search technical articles"
              >
                {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
                <span>{loading ? 'Searching' : 'Search'}</span>
              </button>
            </div>
            {searchError && <p id="search-error" className="mt-3 font-jost text-sm font-medium text-[#FFB4E8]" role="alert">{searchError}</p>}
          </form>

          {query && (
            <div className="mt-6 inline-flex max-w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2 font-jost text-xs leading-5 text-white/70 backdrop-blur-sm sm:rounded-full sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-[#F14BB9]" />
              {loading ? 'Searching articles…' : searched ? `${results.length} result${results.length !== 1 ? 's' : ''} for “${query}”` : 'Preparing results…'}
            </div>
          )}
          <div className="mt-7">
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2.5 font-jost text-sm font-semibold text-white/65 backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10 hover:text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
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
          <div>
            <div className="mb-8 flex flex-col gap-2 border-b border-[#DDE1EB] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-jost text-xs font-bold uppercase tracking-[0.18em] text-[#A8228A]">Search Results</p>
                <h2 className="mt-2 font-urbanist text-2xl font-black leading-tight text-[#06103C] sm:text-3xl">Articles matching your search</h2>
              </div>
              <p className="font-jost text-sm text-gray-500">{results.length} article{results.length !== 1 ? 's' : ''}</p>
            </div>
            <div className={`grid grid-cols-1 gap-6 ${results.length > 1 ? 'lg:grid-cols-2' : 'mx-auto max-w-4xl'}`}>
            {results.map((post) => (
              <Link
                key={post._id}
                href={`/${post.slug.current.replace(/^\/+/, '')}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#E0E3EC] bg-white shadow-[0_8px_30px_rgba(6,16,60,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#A8228A]/30 hover:shadow-[0_18px_45px_rgba(6,16,60,0.12)]"
              >
                {/* Image */}
                <div className="relative flex aspect-[3/2] w-full flex-shrink-0 items-center justify-center overflow-hidden border-b border-[#E6E8F0] bg-white">
                  <img
                    src={post.featuredImage || getLocalImg(post.slug.current)}
                    alt={post.title}
                    className="block h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement
                      if (!img.dataset.fallbackApplied) {
                        img.dataset.fallbackApplied = 'true'
                        img.src = getLocalImg(post.slug.current)
                      } else {
                        img.style.display = 'none'
                      }
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#A8228A]/10 px-3 py-1 font-jost text-[10px] font-bold uppercase tracking-[0.12em] text-[#A8228A]">
                      {post.category}
                    </span>
                    {post.publishedAt && (
                      <span className="text-xs text-gray-400 font-jost">{formatDate(post.publishedAt)}</span>
                    )}
                  </div>
                  <h3 className="mb-2 break-words font-urbanist text-lg font-bold leading-snug text-[#06103C] transition-colors group-hover:text-[#A8228A] sm:text-xl">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 font-jost text-sm leading-6 text-gray-500">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto flex items-center gap-2 pt-5 font-jost text-sm font-bold text-[#A8228A]">
                    Read technical article
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
            </div>
          </div>
        )}

        {!query && !loading && (
          <div className="text-center py-20">
            <p className="font-jost text-gray-500 text-lg">Enter a search term above to find articles</p>
          </div>
        )}
      </section>
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
