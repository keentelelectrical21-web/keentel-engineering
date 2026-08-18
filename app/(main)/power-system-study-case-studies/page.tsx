import CaseStudyCollectionPage, { caseStudyMetadata } from '@/components/case-studies/CaseStudyCollectionPage'
import { powerSystemStudyCaseStudies } from '@/lib/caseStudyContent'

export const metadata = caseStudyMetadata('Power System Study Case Studies')

export default function PowerSystemStudyCaseStudiesPage() {
  return <CaseStudyCollectionPage collection={powerSystemStudyCaseStudies} />
}
