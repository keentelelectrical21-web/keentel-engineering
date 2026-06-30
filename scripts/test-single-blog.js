const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const SITE = 'https://keentelengineering.com'
const SLUG = 'ieee-2800-ride-through-requirements'
const IMAGE_DIR = path.join(process.cwd(), 'public', 'images', 'blog')

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

async function downloadImage(url, filename) {
  try {
    if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true })
    const rawExt = url.split('.').pop().split('?')[0].toLowerCase().replace(/[^a-z]/g,'')
    const ext = ['jpg','jpeg','png','webp','gif'].includes(rawExt) ? rawExt : 'jpg'
    const filepath = path.join(IMAGE_DIR, `${filename}.${ext}`)
    const res = await fetch(url, {
      headers: {
        'Referer': SITE,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    })
    if (!res.ok) { console.log(`  [img fail] ${res.status} — ${url}`); return null }
    const buffer = await res.buffer()
    fs.writeFileSync(filepath, buffer)
    const kb = (buffer.length / 1024).toFixed(1)
    console.log(`  [img ok] ${filename}.${ext} (${kb} KB)`)
    return `/images/blog/${filename}.${ext}`
  } catch(e) {
    console.log(`  [img error] ${e.message}`)
    return null
  }
}

async function main() {
  console.log(`\nFetching: ${SITE}/${SLUG}\n`)

  const res = await fetch(`${SITE}/${SLUG}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
  })
  console.log(`HTTP Status: ${res.status}`)
  const html = await res.text()
  const $ = cheerio.load(html)

  // Remove noise
  $('nav, header, footer, script, style, noscript, iframe').remove()
  $('#dmFlexHeaderContainer, .dmFooterContainer, .hamburger-drawer, #flex-sticky').remove()
  $('[class*="social"], [class*="cookie"], [id*="snipcart"]').remove()

  // Title
  const title = $('h1').first().text().trim()
    || $('meta[property="og:title"]').attr('content')
    || SLUG.replace(/-/g,' ')
  console.log(`\nTITLE: ${title}`)

  // Excerpt
  const excerpt = $('meta[name="description"]').attr('content')
    || $('meta[property="og:description"]').attr('content')
    || ''
  console.log(`\nEXCERPT: ${excerpt.substring(0,200)}`)

  // Date
  const dateRaw = $('time').attr('datetime')
    || $('meta[property="article:published_time"]').attr('content')
    || $('[class*="date"]').first().text().trim()
    || ''
  console.log(`\nDATE: ${dateRaw}`)

  // Author
  const author = $('[class*="author"]').first().text().trim()
    || $('meta[name="author"]').attr('content')
    || 'Sandip R Patel'
  console.log(`\nAUTHOR: ${author.substring(0,80)}`)

  // Featured image
  const featuredImg = $('meta[property="og:image"]').attr('content') || null
  console.log(`\nFEATURED IMAGE: ${featuredImg}`)

  // All images
  const allImages = []
  $('img').each((i, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || ''
    const alt = $(el).attr('alt') || ''
    if (src && src.startsWith('http') && !src.includes('logo') && !src.includes('icon') && src.length > 20) {
      allImages.push({ src, alt })
    }
  })
  console.log(`\nALL IMAGES (${allImages.length}):`)
  allImages.forEach((img, i) => {
    console.log(`  ${i+1}. ${img.src.substring(0,90)}`)
    console.log(`      alt: "${img.alt.substring(0,50)}"`)
  })

  // Body content
  const blocks = []
  $('p, h2, h3, h4, li').each((i, el) => {
    const text = $(el).text().trim()
    if (text.length > 40) blocks.push({ tag: el.name, text: text.substring(0,250) })
  })
  console.log(`\nBODY CONTENT (first 20 of ${blocks.length} blocks):`)
  blocks.slice(0,20).forEach((b,i) => console.log(`  [${b.tag}] ${b.text}`))

  // Meta keywords
  const metaKeywords = $('meta[name="keywords"]').attr('content') || ''
  console.log(`\nKEYWORDS: ${metaKeywords.substring(0,150)}`)

  // Download images
  console.log('\n--- Downloading images ---')
  if (featuredImg) {
    await downloadImage(featuredImg, `${SLUG}-featured`)
  }
  for (let i = 0; i < Math.min(5, allImages.length); i++) {
    await downloadImage(allImages[i].src, `${SLUG}-img${i+1}`)
    await sleep(400)
  }

  // Save JSON
  const result = {
    slug: SLUG,
    title,
    excerpt,
    date: dateRaw,
    author,
    featuredImageUrl: featuredImg,
    totalImages: allImages.length,
    allImages,
    totalContentBlocks: blocks.length,
    sampleContent: blocks.slice(0, 30),
    metaKeywords,
  }
  fs.writeFileSync('scripts/test-result.json', JSON.stringify(result, null, 2))
  console.log('\n✓ Full result saved to: scripts/test-result.json')
  console.log('✓ Images saved to: public/images/blog/')
}

main().catch(console.error)