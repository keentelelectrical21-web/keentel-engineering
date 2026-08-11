import type { Metadata } from 'next'
import LegacyContentPage from '@/components/legacy/LegacyContentPage'

export const metadata: Metadata = {
  title: 'Grounding System Design with SES RESAP | Keentel Engineering',
  description: 'A grounding system design case study focused on soil resistivity modeling, safety evaluation, and constructible grounding recommendations.',
}

export default function GroundingDesignCaseStudyPage() {
  return <LegacyContentPage
    eyebrow="Case Study · Grounding Design"
    title="Grounding System Design with SES RESAP"
    intro="A disciplined grounding-design workflow that translates field data and fault-current assumptions into a safer, constructible grounding system."
    image="/images/blog/cdegs-grounding-analysis-featured.webp"
    imageAlt="Electrical grounding analysis"
    sections={[
      { title: 'Project Scope', body: 'The study evaluated the site grounding network under credible fault conditions, with attention to personnel safety, equipment bonding, and the local soil environment.' },
      { title: 'Engineering Approach', points: ['Review available site, system, and fault-current inputs.', 'Develop layered-soil resistivity representations from field measurements.', 'Model the grounding network and connected metallic paths in SES RESAP.', 'Evaluate ground potential rise and step-and-touch voltage criteria.', 'Document design refinements and construction-ready recommendations.'] },
      { title: 'Key Design Considerations', points: ['Soil resistivity variability across the site', 'Fault-current split and return paths', 'Grid geometry, conductor sizing, and rod placement', 'Fence, equipment, and structure bonding', 'Applicable IEEE and utility safety criteria'] },
      { title: 'Deliverables', points: ['Grounding model and assumptions register', 'Soil model summary', 'GPR and step-and-touch voltage assessment', 'Ground-grid design recommendations', 'Clear engineering report for project review and implementation'] },
    ]}
  />
}
