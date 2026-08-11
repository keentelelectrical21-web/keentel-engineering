import type { Metadata } from 'next'
import NewsletterDetailPage from '../[slug]/page'

// Keep this established URL while using the common newsletter presentation.
export const metadata: Metadata = {
  title: 'BESS Growth, Grid Reliability & Compliance in 2026 | Keentel Engineering Newsletter',
  description: 'The BESS deals, technologies, and market signals that mattered in June 2026, with engineering context for developers and grid operators.',
}

export default function BessGrowthNewsletterPage() {
  return <NewsletterDetailPage params={Promise.resolve({ slug: 'bess-growth-grid-reliability-compliance-2026' })} />
}
