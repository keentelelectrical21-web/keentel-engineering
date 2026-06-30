// ============================================================
// FILE: app/api/search/route.ts
// ============================================================
import { client } from '@/lib/sanity'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || ''

  if (!q.trim() || q.trim().length < 2) {
    return NextResponse.json({ results: [] })
  }

  try {
    const results = await client.fetch(`
      *[_type == "blogPost" && (
        title match $query ||
        excerpt match $query ||
        category match $query
      )] | order(publishedAt desc) [0...20] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        category,
        "featuredImage": featuredImage.asset->url
      }
    `, { query: `*${q}*` })

    return NextResponse.json({ results: results || [] })
  } catch(e) {
    return NextResponse.json({ results: [] })
  }
}