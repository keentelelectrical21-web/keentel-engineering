// app/(main)/blog/page.tsx

import { client } from '@/lib/sanity'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BlogHero from '@/components/blog/BlogHero'
import BlogGrid from '@/components/blog/BlogGrid'

export const metadata: Metadata = {
  title: 'Blog | Keentel Engineering — Power System Technical Insights',
  description: 'Expert articles on NERC compliance, power system studies, substation design, and renewable energy engineering.',
}

// New posts show within 60 seconds of publishing
export const revalidate = 60

async function getAllPosts() {
  try {
    return await client.fetch(
      `*[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        "category": coalesce(category->title, category),
        "featuredImage": coalesce(
          featuredImage.asset->url,
          mainImage.asset->url
        ),
      }`,
      {},
      { cache: 'no-store' }
    )
  } catch (e) {
    console.error('Blog listing fetch error:', e)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  // Build unique categories from posts to pass to BlogHero chips
  const categorySet = new Set<string>()
  for (const p of posts) {
    if (p.category) categorySet.add(p.category)
  }
  const categories = Array.from(categorySet)

  return (
    <>
      <Header />
      <main>
        {/* Suspense required because BlogHero uses useSearchParams */}
        <Suspense>
          <BlogHero totalPosts={posts.length} categories={categories} />
        </Suspense>
        <Suspense>
          <BlogGrid posts={posts} />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
