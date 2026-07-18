import OurWorkCaseStudyPage, {
  generateStaticParams as getCaseStudyStaticParams,
  generateMetadata as getCaseStudyMetadata,
} from '../../our-work/[slug]/page'
import type { Metadata } from 'next'

export default OurWorkCaseStudyPage

export async function generateStaticParams() {
  return getCaseStudyStaticParams()
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return getCaseStudyMetadata({ params })
}

export const revalidate = 3600
