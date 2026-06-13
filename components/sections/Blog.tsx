'use client'

import Link from 'next/link'

const posts = [
  { slug: 'nyiso-interconnection-study-large-loads', title: 'NYISO Interconnection Study Guide for Large Loads', excerpt: 'Learn how NYISO interconnection study, Load SIS, POI strategy, and modeling data requirements affect large load and generation projects in New York.', author: 'Sandip R Patel', date: 'June 10, 2026', category: 'Interconnection', image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Screenshot+2026-06-10+160037+%281%29-1920w.png' },
  { slug: 'ercot-ride-through-requirements', title: 'ERCOT Ride Through Requirements for Large Loads', excerpt: 'Learn ERCOT ride through requirements for Large Electronic Loads, data centers, and interconnection compliance. Discover NOGRR282 engineering steps.', author: 'Sandip R Patel', date: 'June 9, 2026', category: 'ERCOT', image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Screenshot+2026-06-08+173417-1920w.png' },
  { slug: 'cable-ampacity-sizing', title: 'Cable Ampacity and Sizing: Thermal Limits Explained', excerpt: 'Learn cable ampacity and sizing methods, conductor thermal limits, derating factors, and cable sizing calculations for reliable power systems.', author: 'Sandip R Patel', date: 'June 8, 2026', category: 'Power Systems', image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Screenshot+2026-06-07+212855-1920w.png' },
  { slug: 'nerc-large-loads-grid-reliability', title: 'NERC Large Loads: Grid Reliability Risks Explained', excerpt: 'Learn how NERC large loads affect grid reliability, data centers, power electronic loads, and interconnection planning.', author: 'Sandip R Patel', date: 'June 7, 2026', category: 'NERC', image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/e09a8f8e-cb0a-4a0f-8740-a8b9c67ddac7-1920w.png' },
  { slug: 'tva-interconnection-queue-lgip', title: 'TVA Interconnection Queue: Cluster LGIP Guide', excerpt: 'Learn TVA interconnection queue rules, LGIP cluster study steps, deposits, network upgrade costs, and withdrawal penalties.', author: 'Sandip R Patel', date: 'June 7, 2026', category: 'Interconnection', image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/08205a15-205c-48e2-9333-f10db4c80083-b26f39cd-1920w.png' },
  { slug: 'iso-ne-interconnection-guide', title: 'ISO-NE Interconnection Guide: OATT, LGIP and ETU', excerpt: 'Learn ISO-NE interconnection rules, cluster study steps, LGIP, ETU IP, and readiness deposits. Discover how to plan reliable grid projects now.', author: 'Sandip R Patel', date: 'June 6, 2026', category: 'ISO-NE', image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/5f4513e2-6b7c-40da-b648-2c9b1fc4785a-1920w.png' },
]

const catColors: Record<string, string> = {
  'Interconnection': '#0B1A5B', 'ERCOT': '#5B2A86', 'Power Systems': '#A8228A', 'NERC': '#C72E9E', 'ISO-NE': '#0B1A5B',
}

export default function BlogSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Grid IQ</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl" style={{ color: '#0B1230' }}>Blog and Updates</h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-sm transition-all" style={{ color: '#0B1A5B' }}>
            View All Posts
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <div className="relative rounded-2xl overflow-hidden mb-4 h-52">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ background: catColors[post.category] || '#0B1A5B' }}
                >
                  {post.category}
                </span>
              </div>
              <div>
                <h3 className="font-urbanist font-bold text-xl leading-snug mb-2 group-hover:underline transition-all" style={{ color: '#0B1230' }}>
                  <Link href={`/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-sm font-jost mb-2" style={{ color: '#9CA3AF' }}>
                  {post.author} · {post.date}
                </p>
                <p className="text-sm font-jost leading-relaxed mb-4 line-clamp-2" style={{ color: '#6B7280' }}>
                  {post.excerpt}
                </p>
                <Link href={`/${post.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all" style={{ color: '#0B1A5B' }}>
                  Read post
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog" className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full border-2 transition-all" style={{ borderColor: '#E6E8F0', color: '#0B1230' }}>
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