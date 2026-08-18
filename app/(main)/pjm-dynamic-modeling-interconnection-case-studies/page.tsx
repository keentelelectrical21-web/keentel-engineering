import CaseStudyCollectionPage, { caseStudyMetadata } from '@/components/case-studies/CaseStudyCollectionPage'
import { pjmDynamicModelingCaseStudies } from '@/lib/caseStudyContent'

export const metadata = caseStudyMetadata('PJM Dynamic Modeling & Interconnection Case Studies')

export default function PjmDynamicModelingInterconnectionCaseStudiesPage() {
  return <CaseStudyCollectionPage collection={pjmDynamicModelingCaseStudies} />
}
