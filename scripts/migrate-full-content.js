// ============================================================
// FILE: scripts/migrate-full-content.js
// Scrapes full HTML body from each blog post and saves to Sanity
// Run: SANITY_TOKEN=your_token node scripts/migrate-full-content.js
// ============================================================

const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { createClient } = require('@sanity/client')

const SITE = 'https://keentelengineering.com'
const SANITY_TOKEN = process.env.SANITY_TOKEN

const client = createClient({
  projectId: 'xayja2f8',
  dataset: 'production',
  token: SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// Convert HTML blocks to Sanity portable text
function htmlToBlocks(html) {
  const $ = cheerio.load(html)
  const blocks = []
  let key = 0

  function makeBlock(style, text) {
    if (!text || text.trim().length < 3) return null
    key++
    return {
      _type: 'block',
      _key: 'b' + key,
      style,
      children: [{ _type: 'span', _key: 's' + key, text: text.trim(), marks: [] }],
      markDefs: []
    }
  }

  // Process main content area
  $('h1, h2, h3, h4, h5, p, li').each((i, el) => {
    const tag = el.name
    const text = $(el).text().trim()
    if (!text || text.length < 3) return

    let style = 'normal'
    if (tag === 'h1') style = 'h1'
    else if (tag === 'h2') style = 'h2'
    else if (tag === 'h3') style = 'h3'
    else if (tag === 'h4') style = 'h4'
    else if (tag === 'li') style = 'normal'

    const block = makeBlock(style, text)
    if (block) blocks.push(block)
  })

  return blocks
}

async function scrapeFullContent(slug) {
  const url = `${SITE}/${slug}`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
    })
    if (res.status !== 200) return null
    const html = await res.text()
    const $ = cheerio.load(html)

    // Remove nav, header, footer, scripts
    $('nav, header, footer, script, style, noscript, iframe').remove()
    $('#dmFlexHeaderContainer, .dmFooterContainer, .hamburger-drawer, #flex-sticky').remove()
    $('[class*="social"], [class*="cookie"], [id*="snipcart"]').remove()

    // Remove the first h1 (already shown in hero)
    $('h1').first().remove()

    // Get the main content container
    // Duda usually wraps content in dmRespColsWrapper or similar
    let contentEl = $('[class*="blog-content"], [class*="article"], [class*="post-body"], main, article, .dmRespRow').first()
    if (!contentEl.length) contentEl = $('body')

    const blocks = htmlToBlocks(contentEl.html() || '')
    return blocks.length > 2 ? blocks : null
  } catch(e) {
    return null
  }
}

async function main() {
  if (!SANITY_TOKEN) {
    console.error('Run with: SANITY_TOKEN=your_token node scripts/migrate-full-content.js')
    process.exit(1)
  }

  console.log('\n================================================')
  console.log('  Full Content Migration')
  console.log('================================================\n')

  // Get all posts from Sanity
  const posts = await client.fetch('*[_type == "blogPost"] { _id, title, slug }')
  console.log(`Found ${posts.length} posts in Sanity\n`)

  let success = 0
  let failed = 0

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    const slug = post.slug?.current || post._id.replace('blog-', '')
    process.stdout.write(`[${String(i+1).padStart(2,'0')}/${posts.length}] ${slug.substring(0,50).padEnd(50)} `)

    const blocks = await scrapeFullContent(slug)
    if (!blocks || blocks.length === 0) {
      console.log('FAILED (no content)')
      failed++
      continue
    }

    try {
      await client.patch(post._id).set({ body: blocks }).commit()
      console.log(`OK (${blocks.length} blocks)`)
      success++
    } catch(e) {
      console.log('FAILED (sanity)')
      failed++
    }

    await sleep(1000)
  }

  console.log('\n================================================')
  console.log(`  Success: ${success}/${posts.length}`)
  console.log(`  Failed:  ${failed}`)
  console.log('================================================\n')
}

main().catch(console.error)
