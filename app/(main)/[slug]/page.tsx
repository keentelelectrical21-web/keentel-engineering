// app/(main)/[slug]/page.tsx
//
// IMPORTANT: This catches ALL slugs at the root level.
// You MUST make sure your other top-level pages (/about, /services, /contact, etc.)
// are NOT inside this (main) route group, or they'll be caught here.
// If you have static pages, list them in generateStaticParams or ensure they come
// before this dynamic catch-all in the router.
//
// URL structure: /advanced-power-system-modeling-guide (no /blog/ prefix)

import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BlogPostHero from '@/components/blog/BlogPostHero'
import BlogPostBody from '@/components/blog/BlogPostBody'
import BlogRelated from '@/components/blog/BlogRelated'

// FIX: revalidate every 60 seconds — new posts appear within 1 minute of publishing
// Previously was 3600 (1 hour) which is why new posts didn't show immediately
export const revalidate = 60

async function getPost(slug: string) {
  try {
    const post = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        // FIX: support both reference-based category (new) and string category (old)
        "category": coalesce(category->title, category),
        body,
        metaTitle,
        metaDescription,
        authorName,
        authorTitle,
        authorBio,
        "authorImage": authorImage.asset->url,
        authorLinkedIn,
        // FIX: resolve featuredImage URL (new field) with fallback to mainImage (old field)
        "featuredImage": coalesce(
          featuredImage.asset->url,
          mainImage.asset->url
        ),
        midCtaEnabled,
        midCtaHeading,
        midCtaSubheading,
        midCtaPrimaryText,
        midCtaPrimaryLink,
        midCtaSecondaryText,
        midCtaSecondaryLink,
        bottomCtaEnabled,
        bottomCtaHeading,
        bottomCtaSubheading,
        bottomCtaPrimaryText,
        bottomCtaPrimaryLink,
        bottomCtaSecondaryText,
        bottomCtaSecondaryLink,
      }`,
      { slug },
      { cache: 'no-store' }
    )
    return post || null
  } catch (e) {
    console.error('getPost error:', e)
    return null
  }
}

async function getRelatedPosts(category: string, currentSlug: string) {
  try {
    return await client.fetch(
      `*[_type == "blogPost" && coalesce(category->title, category) == $category && slug.current != $currentSlug]
        | order(publishedAt desc) [0...3] {
          _id, title, slug, publishedAt, excerpt,
          "category": coalesce(category->title, category),
          "featuredImage": coalesce(featuredImage.asset->url, mainImage.asset->url),
        }`,
      { category, currentSlug }
    )
  } catch { return [] }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Article Not Found' }
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  // If no blog post found for this slug, 404 — lets other [slug] pages work
  if (!post) notFound()

  const related = await getRelatedPosts(post.category || '', slug)

  return (
    <>
      <Header />
      <main>
        <BlogPostHero post={post} slug={slug} />
        <BlogPostBody post={post} slug={slug} />
        <BlogRelated posts={related} />
      </main>
      <Footer />
    </>
  )
}
