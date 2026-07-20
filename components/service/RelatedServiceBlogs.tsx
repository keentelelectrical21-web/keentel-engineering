'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  categoryLabel?: string
  publishedAt?: string
  featuredImage?: unknown
}

export default function RelatedServiceBlogs({ terms, title = 'Related Technical Insights' }: { terms: string[]; title?: string }) {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    client.fetch<Post[]>(
      `*[_type == "blogPost" && (${terms.map((_, index) => `title match $term${index} || category->title match $term${index} || category->name match $term${index}`).join(' || ')})] | order(publishedAt desc)[0...3] {
        _id, title, slug, excerpt, publishedAt, featuredImage,
        "categoryLabel": coalesce(category->title, category->name)
      }`,
      Object.fromEntries(terms.map((term, index) => [`term${index}`, `*${term}*`]))
    ).then(setPosts).catch(() => setPosts([]))
  // The page supplies a static list; its joined value is the stable query identity.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terms.join('|')])

  if (!posts.length) return null

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#A8228A]">Engineering Knowledge</p>
            <h2 className="font-urbanist text-3xl font-black text-[#06103C] sm:text-4xl lg:text-5xl">{title}</h2>
          </div>
          <Link href="/blog" className="font-jost text-sm font-bold text-[#A8228A]">View All Blogs →</Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post._id} className="group overflow-hidden rounded-2xl border border-[#E6E8F0] bg-white transition-all hover:-translate-y-1 hover:shadow-xl">
              <Link href={`/${post.slug.current}`} className="block">
                <div className="h-52 overflow-hidden bg-[#F6F7FB] sm:h-56">
                  {Boolean(post.featuredImage) && <img src={urlFor(post.featuredImage).width(900).height(560).url()} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                </div>
                <div className="p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2 font-jost text-xs text-gray-500">
                    {post.categoryLabel && <span className="rounded-full bg-[#A8228A]/10 px-2.5 py-1 font-bold text-[#A8228A]">{post.categoryLabel}</span>}
                    {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                  </div>
                  <h3 className="mb-3 font-urbanist text-xl font-bold leading-snug text-[#06103C]">{post.title}</h3>
                  {post.excerpt && <p className="line-clamp-3 font-jost text-sm leading-relaxed text-gray-600">{post.excerpt}</p>}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
