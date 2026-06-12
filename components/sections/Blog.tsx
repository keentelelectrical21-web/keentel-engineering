'use client'

import Link from 'next/link'

const posts = [
  {
    slug: 'nyiso-interconnection-study-large-loads',
    title: 'NYISO Interconnection Study Guide for Large Loads',
    excerpt: 'Learn how NYISO interconnection study, Load SIS, POI strategy, and modeling data requirements affect large load and generation projects in New York.',
    author: 'Sandip R Patel',
    date: 'June 10, 2026',
    category: 'Interconnection',
    image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Screenshot+2026-06-10+160037+%281%29-1920w.png',
  },
  {
    slug: 'ercot-ride-through-requirements',
    title: 'ERCOT Ride Through Requirements for Large Loads',
    excerpt: 'Learn ERCOT ride through requirements for Large Electronic Loads, data centers, and interconnection compliance. Discover NOGRR282 engineering steps.',
    author: 'Sandip R Patel',
    date: 'June 9, 2026',
    category: 'ERCOT',
    image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Screenshot+2026-06-08+173417-1920w.png',
  },
  {
    slug: 'cable-ampacity-sizing',
    title: 'Cable Ampacity and Sizing: Thermal Limits Explained',
    excerpt: 'Learn cable ampacity and sizing methods, conductor thermal limits, derating factors, and cable sizing calculations for reliable power systems.',
    author: 'Sandip R Patel',
    date: 'June 8, 2026',
    category: 'Power Systems',
    image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Screenshot+2026-06-07+212855-1920w.png',
  },
  {
    slug: 'nerc-large-loads-grid-reliability',
    title: 'NERC Large Loads: Grid Reliability Risks Explained',
    excerpt: 'Learn how NERC large loads affect grid reliability, data centers, power electronic loads, and interconnection planning. Discover key risks now.',
    author: 'Sandip R Patel',
    date: 'June 7, 2026',
    category: 'NERC',
    image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/e09a8f8e-cb0a-4a0f-8740-a8b9c67ddac7-1920w.png',
  },
  {
    slug: 'tva-interconnection-queue-lgip',
    title: 'TVA Interconnection Queue: Cluster LGIP Guide',
    excerpt: 'Learn TVA interconnection queue rules, LGIP cluster study steps, deposits, network upgrade costs, and withdrawal penalties.',
    author: 'Sandip R Patel',
    date: 'June 7, 2026',
    category: 'Interconnection',
    image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/08205a15-205c-48e2-9333-f10db4c80083-b26f39cd-1920w.png',
  },
  {
    slug: 'iso-ne-interconnection-guide',
    title: 'ISO-NE Interconnection Guide: OATT, LGIP & ETU',
    excerpt: 'Learn ISO-NE interconnection rules, cluster study steps, LGIP, ETU IP, and readiness deposits. Discover how to plan reliable grid projects now.',
    author: 'Sandip R Patel',
    date: 'June 6, 2026',
    category: 'ISO-NE',
    image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/5f4513e2-6b7c-40da-b648-2c9b1fc4785a-1920w.png',
  },
]

const categoryColors: Record<string, string> = {
  'Interconnection': 'bg-blue-100 text-blue-700',
  'ERCOT': 'bg-orange-100 text-orange-700',
  'Power Systems': 'bg-purple-100 text-purple-700',
  'NERC': 'bg-red-100 text-red-700',
  'ISO-NE': 'bg-green-100 text-green-700',
}

export default function BlogSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">Grid IQ</span>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-gray-900">
              Blog & Updates
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#030DA6] font-semibold text-sm hover:gap-3 transition-all"
          >
            View All Posts
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* 3 col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden mb-5 h-52">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Author + Category overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between">
                  <div>
                    <p className="text-white text-xs font-medium">{post.author}</p>
                    <p className="text-white/70 text-xs">{post.date}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'} bg-white`}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-urbanist font-bold text-gray-900 text-xl leading-snug mb-2 group-hover:text-[#030DA6] transition-colors">
                  <Link href={`/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-500 text-sm font-jost leading-relaxed line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <Link
                  href={`/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-gray-900 text-sm font-semibold hover:text-[#030DA6] transition-colors group/link"
                >
                  Read post
                  <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Show more */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-full hover:border-[#030DA6] hover:text-[#030DA6] transition-all"
          >
            Show More Posts
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}