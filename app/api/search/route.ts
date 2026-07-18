// ============================================================
// FILE: app/api/search/route.ts
// ============================================================
import { client } from '@/lib/sanity'
import { NextRequest, NextResponse } from 'next/server'

const searchQuery: string = `
  *[_type == "blogPost" && (
    title match $query ||
    excerpt match $query ||
    coalesce(category->title, category) match $query
  )] | order(publishedAt desc) [0...20] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "category": coalesce(category->title, category, "Technical Insight"),
    "featuredImage": coalesce(featuredImage.asset->url, mainImage.asset->url)
  }
`

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get('q') || '').trim()

  if (q.length < 2) {
    return NextResponse.json({ results: [] })
  }

  try {
    const results = await client.fetch(searchQuery, { query: `*${q}*` } as never)

    return NextResponse.json({ results: results || [] })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ results: [], error: 'Search is temporarily unavailable.' }, { status: 500 })
  }
}
