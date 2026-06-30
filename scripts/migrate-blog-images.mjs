import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const client = createClient({
  projectId: 'xayja2f8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const IMG_DIR = path.join(process.cwd(), 'public/images/blog')

async function run() {
  const posts = await client.fetch(`*[_type == "blogPost" && !defined(mainImage)]{_id, "slug": slug.current, title}`)
  console.log(`Found ${posts.length} posts missing mainImage`)

  let success = 0, skipped = 0

  for (const post of posts) {
    const filePath = path.join(IMG_DIR, `${post.slug}-featured.jpg`)
    if (!fs.existsSync(filePath)) {
      console.log(`SKIP (no file): ${post.slug}`)
      skipped++
      continue
    }

    try {
      const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
        filename: `${post.slug}-featured.jpg`,
      })

      await client
        .patch(post._id)
        .set({
          mainImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
          },
        })
        .commit()

      console.log(`✅ ${post.slug}`)
      success++
    } catch (err) {
      console.error(`❌ ${post.slug}:`, err.message)
    }
  }

  console.log(`\nDone. ${success} updated, ${skipped} skipped.`)
}

run()
