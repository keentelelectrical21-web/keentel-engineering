import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BlogPostHero from '@/components/blog/BlogPostHero'
import BlogPostBody from '@/components/blog/BlogPostBody'
import BlogRelated from '@/components/blog/BlogRelated'

async function getPost(slug: string) {
  try {
    const post = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0] {
        _id, title, slug, publishedAt, excerpt, category, body,
        metaTitle, metaDescription,
        authorName, authorTitle, authorBio,
        "authorImage": authorImage.asset->url,
        authorLinkedIn,
        midCtaEnabled, midCtaHeading, midCtaSubheading,
        midCtaPrimaryText, midCtaPrimaryLink,
        midCtaSecondaryText, midCtaSecondaryLink,
        bottomCtaEnabled, bottomCtaHeading, bottomCtaSubheading,
        bottomCtaPrimaryText, bottomCtaPrimaryLink,
        bottomCtaSecondaryText, bottomCtaSecondaryLink,
      }`,
      { slug }
    )
    return post || null
  } catch(e) {
    console.error('getPost error:', e)
    return null
  }
}

async function getRelatedPosts(category: string, currentSlug: string) {
  try {
    const posts = await client.fetch(
      `*[_type == "blogPost" && category == $category && slug.current != $currentSlug] | order(publishedAt desc) [0...3] {
        _id, title, slug, publishedAt, excerpt, category
      }`,
      { category, currentSlug }
    )
    return posts || []
  } catch(e) {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Article Not Found' }
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
  }
}

export const revalidate = 3600

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  const related = await getRelatedPosts(post.category || 'Power System Studies', slug)
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
