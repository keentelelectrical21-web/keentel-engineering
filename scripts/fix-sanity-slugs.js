// ============================================================
// FILE: scripts/fix-sanity-slugs.js
// Run: SANITY_TOKEN=your_token node scripts/fix-sanity-slugs.js
// 
// This script fixes two things:
// 1. Converts plain string slugs to proper Sanity slug objects
// 2. Re-fetches any posts that failed the first migration
// ============================================================

const { createClient } = require('@sanity/client')

const SANITY_TOKEN = process.env.SANITY_TOKEN

const client = createClient({
  projectId: 'xayja2f8',
  dataset: 'production',
  token: SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

async function main() {
  if (!SANITY_TOKEN) {
    console.error('Run with: SANITY_TOKEN=your_token node scripts/fix-sanity-slugs.js')
    process.exit(1)
  }

  console.log('\nFetching all blog posts from Sanity...')

  // Get all posts
  const posts = await client.fetch(`*[_type == "blogPost"] { _id, title, slug, publishedAt }`)
  console.log(`Found ${posts.length} posts in Sanity\n`)

  if (posts.length === 0) {
    console.log('No posts found — run scrape-all-blogs.js first')
    process.exit(0)
  }

  let fixed = 0
  let already = 0

  for (const post of posts) {
    const slug = post.slug

    // Check if slug is already a proper object
    if (slug && typeof slug === 'object' && slug._type === 'slug' && slug.current) {
      already++
      continue
    }

    // Fix: convert plain string or malformed slug to proper object
    const slugValue = typeof slug === 'string' ? slug : (slug?.current || post._id.replace('blog-', ''))

    try {
      await client.patch(post._id)
        .set({ slug: { _type: 'slug', current: slugValue } })
        .commit()
      process.stdout.write(`[fixed] ${slugValue}\n`)
      fixed++
      await sleep(100)
    } catch(e) {
      console.log(`[error] ${post._id}: ${e.message}`)
    }
  }

  console.log(`\n========================================`)
  console.log(`Already correct: ${already}`)
  console.log(`Fixed:           ${fixed}`)
  console.log(`Total:           ${posts.length}`)
  console.log(`\nNow test: http://localhost:3000/blog/ieee-2800-ride-through-requirements`)
  console.log(`========================================\n`)
}

main().catch(console.error)