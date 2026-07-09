// app/api/case-studies/route.ts
import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET() {
  try {
    const data = await client.fetch(
      `*[_type == "caseStudy"] | order(category asc, order asc) {
        _id, title, subtitle, category, cardImage, slug, outcome, client, region
      }`
    )
    return NextResponse.json(data || [])
  } catch {
    return NextResponse.json([])
  }
}
