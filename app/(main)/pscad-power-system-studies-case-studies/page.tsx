import CaseStudyCollectionPage, { caseStudyMetadata } from '@/components/case-studies/CaseStudyCollectionPage'
import { pscadPowerSystemStudiesCaseStudies } from '@/lib/caseStudyContent'

export const metadata = caseStudyMetadata('PSCAD Power System Studies Case Studies')

export default function PscadPowerSystemStudiesCaseStudiesPage() {
  return <CaseStudyCollectionPage collection={pscadPowerSystemStudiesCaseStudies} />
}
