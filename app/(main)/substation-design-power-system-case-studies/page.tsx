import CaseStudyCollectionPage, { caseStudyMetadata } from '@/components/case-studies/CaseStudyCollectionPage'
import { substationEngineeringCaseStudies } from '@/lib/caseStudyContent'

export const metadata = caseStudyMetadata('Substation Engineering Case Studies')

export default function SubstationEngineeringCaseStudiesPage() {
  return <CaseStudyCollectionPage collection={substationEngineeringCaseStudies} />
}
