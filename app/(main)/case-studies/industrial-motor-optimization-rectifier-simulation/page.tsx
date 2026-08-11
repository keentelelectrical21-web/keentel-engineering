import type { Metadata } from 'next'
import LegacyContentPage from '@/components/legacy/LegacyContentPage'

export const metadata: Metadata = {
  title: 'Industrial Motor Optimization & Rectifier Simulation | Keentel Engineering',
  description: 'A case study approach for evaluating industrial motor performance and rectifier-driven electrical systems.',
}

export default function IndustrialMotorCaseStudyPage() {
  return <LegacyContentPage
    eyebrow="Case Study · Industrial Power"
    title="Industrial Motor Optimization & Rectifier Simulation"
    intro="An engineering study framework for understanding motor, converter, and electrical-system interactions before operational changes are made."
    image="/images/blog/comprehensive-power-system-analysis-industrial-reliability-safety-featured.jpg"
    imageAlt="Industrial electrical engineering analysis"
    sections={[
      { title: 'Project Scope', body: 'The engagement examined how industrial motors and rectifier-fed loads interact with the surrounding electrical system, creating a structured basis for operational and design decisions.' },
      { title: 'Engineering Approach', points: ['Review motor, drive, transformer, and rectifier data.', 'Establish representative operating scenarios.', 'Model loading, voltage behavior, and converter-related harmonics.', 'Evaluate protection and equipment-duty considerations.', 'Compare practical improvement options with project constraints.'] },
      { title: 'Typical Deliverables', points: ['Model assumptions and equipment data log', 'Operating-scenario assessment', 'Motor and rectifier simulation results', 'Power-quality and protection observations', 'Prioritized engineering recommendations'] },
      { title: 'Value to the Project', body: 'A documented technical basis helps stakeholders evaluate changes with a clearer view of reliability, performance, protection, and implementation considerations.' },
    ]}
  />
}
