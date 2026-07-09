// scripts/migrate-categories.mjs
// Converts existing string category values on blogPost documents
// into proper category document references.
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'xayja2f8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function run() {
  // 1. Fetch all blog posts that still have a string category
  const posts = await client.fetch(`*[_type == "blogPost"] { _id, category }`)
  console.log(`Found ${posts.length} blog posts`)

  // 2. Collect unique category strings
  const uniqueCategories = [...new Set(
    posts
      .map(p => typeof p.category === 'string' ? p.category : null)
      .filter(Boolean)
  )]

  if (uniqueCategories.length === 0) {
    console.log('No string categories found — already migrated or no posts.')
    return
  }

  console.log(`\nUnique categories to create: ${uniqueCategories.join(', ')}\n`)

  // 3. Create a category document for each unique value
  const categoryIdMap = {}

  for (const title of uniqueCategories) {
    const slug = slugify(title)
    const docId = `category-${slug}`

    await client.createOrReplace({
      _id: docId,
      _type: 'category',
      title,
      slug: { _type: 'slug', current: slug },
    })

    categoryIdMap[title] = docId
    console.log(`✅ Created category: "${title}" → ${docId}`)
  }

  // 4. Update each blog post to use a reference instead of string
  console.log('\nUpdating blog posts...')

  for (const post of posts) {
    if (typeof post.category !== 'string' || !post.category) continue

    const categoryId = categoryIdMap[post.category]
    if (!categoryId) continue

    await client.patch(post._id).set({
      category: {
        _type: 'reference',
        _ref: categoryId,
      },
    }).commit()

    console.log(`✅ Updated post ${post._id} → category: "${post.category}"`)
  }

  console.log('\nMigration complete.')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
