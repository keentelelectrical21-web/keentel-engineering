// ============================================================
// FILE: app/blog/page.tsx
// ============================================================
import { client } from '@/lib/sanity'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BlogHero from '@/components/blog/BlogHero'
import BlogGrid from '@/components/blog/BlogGrid'

async function getBlogPosts() {
  try {
    const posts = await client.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        "category": category->title,
        "featuredImage": featuredImage.asset->url
      }
    `)
    return posts || []
  } catch(e) {
    return []
  }
}

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <Header />
      <main>
        <BlogHero totalPosts={posts.length} />
        <BlogGrid posts={posts} />
      </main>
      <Footer />
    </>
  )
}