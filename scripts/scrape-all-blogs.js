const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const { createClient } = require('@sanity/client')

const SITE = 'https://keentelengineering.com'
const IMAGE_DIR = path.join(process.cwd(), 'public', 'images', 'blog')
const SANITY_TOKEN = process.env.SANITY_TOKEN

const client = createClient({
  projectId: 'xayja2f8',
  dataset: 'production',
  token: SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const BLOG_SLUGS = [
  '18-substation-studies-guide',
  'advanced-power-system-modeling-guide',
  'advanced-power-system-studies-der-grid-modeling',
  'advancing-power-system-design-practices-with-ieee-pes-tr-126',
  'aspen-oneliner-relay-coordination',
  'aspen-power-system-analysis',
  'batch-zero-ercot-large-load',
  'caiso-appendix-h-compliance',
  'cdegs-grounding-analysis',
  'commissioning-mv-lv-electrical-systems',
  'comprehensive-power-system-analysis-industrial-reliability-safety',
  'concurrent-emtdc-parallel-simulation',
  'connecting-to-the-grid-under-ieee-2800',
  'data-center-electrical-design',
  'data-center-site-viability',
  'data-centers-large-loads-reshaping-us-power-grid',
  'der-hosting-capacity',
  'dynamic-equivalents-psse-power-system-modeling',
  'emerging-large-loads-characteristics-and-grid-risks',
  'emt-analysis-power-systems',
  'emt-analysis-services-for-inverter-based-resources',
  'ensuring-design-stability-in-power-system-projects-best-practices-and-upcoming-nerc-reporting-deadlines',
  'ercot-curl-url-verification',
  'ercot-data-modeling-requirements-2026-guide',
  'ferc-rm22-12-000-order-no-901-explained-engineering-modeling-and-compliance-implications-for-the-bulk-power-system',
  'five-phenomena-collapse-entire-power-system',
  'generation-injection-large-load-withdrawal',
  'generator-protection-control-engineering',
  'grid-forming-control-oscillation-damping',
  'how-can-synchrophasor-technology-be-utilized-for-monitoring-and-controlling-power-system-stability',
  'how-data-centers-work',
  'how-to-ensure-compliance-with-nerc-op-standards',
  'ieee-1110-2019-synchronous-generator-modeling-guide',
  'ieee-2800-2022-ibr-compliance-guide',
  'ieee-2800-ride-through-requirements',
  'importance-of-power-system-studies',
  'information-management-for-inverter-based-resources-ibrs-a-technical-guide-for-power-system-operators',
  'interconnection-cost-estimation',
  'large-load-interconnection-data-centers',
  'large-load-modeling-grid-reliability',
  'load-flow-studies-in-electrical-power-system',
  'medium-voltage-interconnection-engineering',
  'miso-planning-modeling-manual-guide',
  'mod-026-2-compliance-dynamic-model-validation',
  'mod-032-2-der-data-collection-guide',
  'nerc-compliance-generator-owners',
  'nerc-inverter-based-resources-ibr-strategy',
  'nyiso-grid-interconnection-modeling',
  'nyiso-interconnection-study-large-load',
  'owners-engineer-services-bess-substations',
  'pjm-expedited-interconnection-track-eit',
  'power-siting-feasibility-study',
  'power-system-modeling-services',
  'power-system-protection-substation-design',
  'power-system-resilience-metrics',
  'power-system-resource-adequacy',
  'power-system-studies-grid-integration',
  'power-system-study-solutions',
  'power-system-switching-duties',
  'prc-019-compliance-services',
  'prc-026-compliance-guide-for-transmission-relay-performance-during-stable-power-swings',
  'prc-029-1-nogrr245-caiso-compliance',
  'pscad-black-box-independent-c-code',
  'pscad-modeling-electric-arc-furnaces',
  'pscad-modeling-power-system-studies',
  'pscad-power-system-studies-case-studies',
  'relay-modeling-protection-simulation',
  'replus-las-vegas-2025-renewable-energy-keentel',
  'review-of-large-city-metropolitan-area-power-system-development-trends',
  'rms-vs-emt-simulation-pscad-guide',
  'sel-351s-nerc-prc-compliance',
  'sel-synchrophasor-technology-real-time-grid-monitoring-control',
  'solar-pv-energy-evaluation',
  'substation-electrical-design-process',
  'switching-overvoltage-studies-pscad-emtdc',
  'synchronous-condenser-protection',
  'thermal-management-chilled-water-containment',
  'transformer-failure-analysis-root-cause',
  'transmission-line-modeling-pscad',
  'understanding-iso-nes-dynamics-data-management-system',
  'understanding-power-system-stability-through-psse-tsat-and-pscad-emtdc-from-positive-sequence-to-emt-simulations',
  'virtual-power-plants-energy-storage-grid-resilience-2026',
  'virtual-power-plants-grid-2026',
  'white-paper-pscad-power-system-design',
  'why-is-power-system-analysis-important-for-bess-owners',
  'why-nerc-compliance-consultants-are-critical-for-safety',
]

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

function guessCategory(title, text) {
  const t = (title + ' ' + text).toLowerCase()
  if (t.includes('nerc')) return 'NERC Compliance'
  if (t.includes('ieee 2800') || t.includes('ibr')) return 'IEEE 2800'
  if (t.includes('substation')) return 'Substation Design'
  if (t.includes('renewable') || t.includes('solar') || t.includes('wind') || t.includes('bess')) return 'Renewable Energy'
  if (t.includes('data center')) return 'Grid Modernization'
  if (t.includes('pscad') || t.includes('emt') || t.includes('psse') || t.includes('etap')) return 'Power System Studies'
  if (t.includes('relay') || t.includes('protection')) return 'Power System Studies'
  return 'Power System Studies'
}

function parseDate(authorRaw) {
  if (!authorRaw) return null
  const match = authorRaw.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/)
  if (match) {
    try { return new Date(match[0]).toISOString() } catch(e) { return null }
  }
  return null
}

async function downloadImage(url, filename) {
  try {
    if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true })
    const rawExt = url.split('.').pop().split('?')[0].toLowerCase().replace(/[^a-z]/g, '')
    const ext = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(rawExt) ? rawExt : 'jpg'
    const filepath = path.join(IMAGE_DIR, filename + '.' + ext)
    if (fs.existsSync(filepath)) return '/images/blog/' + filename + '.' + ext
    const res = await fetch(url, {
      headers: {
        'Referer': SITE,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    })
    if (!res.ok) return null
    const buffer = await res.buffer()
    fs.writeFileSync(filepath, buffer)
    const kb = (buffer.length / 1024).toFixed(0)
    process.stdout.write(' [' + kb + 'kb]')
    return '/images/blog/' + filename + '.' + ext
  } catch(e) {
    return null
  }
}

async function scrapeBlog(slug) {
  const url = SITE + '/' + slug
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
    })
    if (res.status !== 200) return null
    const html = await res.text()
    const $ = cheerio.load(html)

    $('nav, header, footer, script, style, noscript, iframe').remove()
    $('#dmFlexHeaderContainer, .dmFooterContainer, .hamburger-drawer, #flex-sticky').remove()
    $('[id*="snipcart"]').remove()

    const title = $('h1').first().text().trim()
      || ($('meta[property="og:title"]').attr('content') || '').replace('| Keentel Engineering', '').trim()
      || slug.replace(/-/g, ' ')

    const excerpt = (
      $('meta[name="description"]').attr('content') ||
      $('meta[property="og:description"]').attr('content') ||
      ''
    ).substring(0, 300)

    const authorRaw = $('[class*="author"]').first().text().trim()
    const date = parseDate(authorRaw)

    const featuredImgUrl = $('meta[property="og:image"]').attr('content') || null

    const seenUrls = new Set()
    if (featuredImgUrl) seenUrls.add(featuredImgUrl)

    const contentImages = []
    $('img').each(function(i, el) {
      const src = $(el).attr('src') || $(el).attr('data-src') || ''
      const alt = $(el).attr('alt') || ''
      if (
        src &&
        src.startsWith('http') &&
        !seenUrls.has(src) &&
        !src.includes('logo') &&
        !src.includes('icon') &&
        !src.includes('favicon') &&
        src.length > 30
      ) {
        seenUrls.add(src)
        contentImages.push({ src: src, alt: alt })
      }
    })

    return {
      slug: slug,
      title: title,
      excerpt: excerpt,
      date: date,
      featuredImgUrl: featuredImgUrl,
      contentImages: contentImages,
      category: guessCategory(title, excerpt),
      originalUrl: url
    }
  } catch(e) {
    return null
  }
}

async function pushToSanity(post) {
  try {
    await client.createOrReplace({
      _type: 'blogPost',
      _id: 'blog-' + post.slug,
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      publishedAt: post.date || new Date().toISOString(),
      excerpt: post.excerpt,
      category: post.category,
      metaTitle: post.title,
      metaDescription: post.excerpt,
      body: [{
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [{ _type: 'span', _key: 'text', text: post.excerpt || post.title, marks: [] }]
      }]
    })
    return true
  } catch(e) {
    return false
  }
}

async function main() {
  if (!SANITY_TOKEN) {
    console.error('\nERROR: Sanity token missing.')
    console.error('Run with: SANITY_TOKEN=your_token node scripts/scrape-all-blogs.js\n')
    process.exit(1)
  }

  console.log('\n================================================')
  console.log('  Keentel Blog Migration — ' + BLOG_SLUGS.length + ' posts')
  console.log('================================================\n')

  if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true })

  const results = { success: [], failed: [], totalImages: 0 }
  const log = []

  for (let i = 0; i < BLOG_SLUGS.length; i++) {
    const slug = BLOG_SLUGS[i]
    const prefix = '[' + String(i + 1).padStart(2, '0') + '/' + BLOG_SLUGS.length + '] '
    process.stdout.write(prefix + slug.substring(0, 45).padEnd(45) + ' ')

    const post = await scrapeBlog(slug)
    if (!post) {
      console.log('FAILED (scrape)')
      results.failed.push(slug)
      continue
    }

    // Download featured image
    let localFeaturedImg = null
    if (post.featuredImgUrl) {
      localFeaturedImg = await downloadImage(post.featuredImgUrl, slug + '-featured')
    }

    // Download ALL content images
    let imgCount = 0
    for (let j = 0; j < post.contentImages.length; j++) {
      const local = await downloadImage(post.contentImages[j].src, slug + '-img' + (j + 1))
      if (local) {
        imgCount++
        results.totalImages++
      }
      await sleep(150)
    }

    // Push to Sanity
    const saved = await pushToSanity(post)
    if (saved) {
      console.log(' OK')
      results.success.push(slug)
      log.push({
        slug: slug,
        title: post.title,
        date: post.date,
        category: post.category,
        featuredImg: localFeaturedImg,
        contentImagesDownloaded: imgCount
      })
    } else {
      console.log(' FAILED (sanity)')
      results.failed.push(slug)
    }

    await sleep(1000)
  }

  fs.writeFileSync('scripts/migration-results.json', JSON.stringify({ results: results, log: log }, null, 2))

  console.log('\n================================================')
  console.log('  DONE')
  console.log('  Success:      ' + results.success.length + '/' + BLOG_SLUGS.length)
  console.log('  Failed:       ' + results.failed.length)
  console.log('  Images saved: ' + results.totalImages)
  console.log('  Log:          scripts/migration-results.json')
  console.log('  Images dir:   public/images/blog/')
  console.log('================================================\n')
}

main().catch(console.error)
