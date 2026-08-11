import type { Metadata } from 'next'
import LegacyContentPage from '@/components/legacy/LegacyContentPage'

export const metadata: Metadata = {
  title: 'Category 2 NERC Compliance Services for IBRs | Keentel Engineering',
  description: 'Engineering support for Category 2 inverter-based resource compliance readiness, model governance, and technical documentation.',
}

export default function Category2NercCompliancePage() {
  return <LegacyContentPage
    eyebrow="NERC Compliance · IBR Readiness"
    title="Category 2 NERC Compliance Services for Inverter-Based Resources"
    intro="Engineering-led readiness support for inverter-based resource owners navigating technical models, records, coordination, and ongoing compliance responsibilities."
    image="/images/nerc-alert-level-3-ibr-compliance-engineers.png"
    imageAlt="Engineers reviewing inverter-based resource compliance"
    sections={[
      { title: 'Readiness Assessment', body: 'We help teams organize the technical information, asset records, study inputs, and engineering evidence needed to assess their current compliance posture.' },
      { title: 'Engineering Support', points: ['IBR model review and validation support', 'Data-quality and configuration-management review', 'Protection and performance documentation support', 'Evidence organization for internal and external reviews', 'Utility, ISO, and stakeholder technical coordination'] },
      { title: 'Practical Focus Areas', points: ['Accurate facility and equipment representations', 'Traceable changes to controls, firmware, and settings', 'Clear ownership of technical compliance actions', 'Documented processes for ongoing maintenance', 'Engineering support aligned to project and operating needs'] },
      { title: 'Important Note', body: 'Registration thresholds and compliance obligations vary by facility, interconnection, and governing entity. Keentel provides engineering support; clients should confirm final regulatory obligations with their compliance and legal advisors.' },
    ]}
  />
}
