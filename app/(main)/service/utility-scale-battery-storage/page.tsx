import RenewableSpecialtyPage from '@/components/service/RenewableSpecialtyPage'

export default function UtilityScaleBatteryStoragePage() {
  return <RenewableSpecialtyPage config={{
    eyebrow: 'Utility-Scale BESS', title: 'Utility-Scale Battery Storage Engineering Services',
    heroCopy: 'Specialist electrical engineering for standalone and co-located battery storage systems designed for safe, reliable grid participation.',
    approachTitle: 'BESS Engineering for Safe, Responsive, Grid-Ready Storage',
    approachCopy: 'Keentel brings interconnection, protection, controls, thermal safety, and operating strategy into one coordinated BESS engineering program.',
    image: '/images/services/utility-scale-renewable-energy/card-bess.webp', imageAlt: 'Utility-scale battery energy storage system',
    servicesTitle: 'Our Utility-Scale BESS Engineering Services', servicesIntro: 'Engineering support across storage development, interconnection, safety, commissioning, and lifecycle upgrades.',
    services: [
      { title: 'Feasibility & System Design', description: 'Establish MW/MWh configuration, interconnection strategy, equipment interfaces, and operating requirements.' },
      { title: 'Battery Selection & Sizing', description: 'Evaluate technology, duration, controls, thermal conditions, and lifecycle objectives.' },
      { title: 'Electrical System Design', description: 'Develop MV collection, transformers, protection, grounding, auxiliary power, and control interfaces.' },
      { title: 'Grid Connection & Interconnection', description: 'Support POI studies, dynamic models, utility coordination, and grid-code compliance.' },
      { title: 'Safety & Compliance', description: 'Address fire protection, thermal management, NFPA considerations, and operational safeguards.' },
      { title: 'Monitoring, Maintenance & Upgrades', description: 'Support commissioning, EMS integration, diagnostics, performance optimization, and expansion.' },
    ],
    processTitle: 'Our BESS Engineering Process', process: ['Storage objective and site review', 'Interconnection and controls modeling', 'Safety and electrical design', 'Utility compliance and documentation', 'Commissioning and lifecycle support'],
    faqTitle: 'FAQ for Utility-Scale Battery Storage Engineering Services',
    faqs: [
      { question: 'What is utility-scale battery storage?', answer: 'It is a large MW/MWh battery system that stores and dispatches energy to support grid reliability, renewable integration, and market operations.' },
      { question: 'Can BESS be co-located with solar or wind?', answer: 'Yes. Co-located storage can capture generation, manage interconnection capacity, and provide more flexible dispatch.' },
      { question: 'What safety engineering is required for BESS?', answer: 'Projects require attention to thermal management, fire protection, equipment siting, controls, protection, and applicable codes and standards.' },
      { question: 'Do you support BESS commissioning?', answer: 'Yes. We support controls validation, protection testing coordination, EMS interfaces, and performance verification.' },
    ],
    caseStudyService: 'utility-scale-battery-storage', blogTerms: ['battery', 'BESS', 'storage'],
  }} />
}
