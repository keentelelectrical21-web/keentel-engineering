import RenewableSpecialtyPage from '@/components/service/RenewableSpecialtyPage'

export default function UtilityScaleSolarFarmsPage() {
  return <RenewableSpecialtyPage config={{
    eyebrow: 'Utility-Scale Solar', title: 'Utility-Scale Solar Farm Engineering Services',
    heroCopy: 'Grid-ready electrical engineering for solar projects—from early interconnection strategy through compliant, construction-ready delivery.',
    approachTitle: 'Solar Engineering That Connects Generation to the Grid with Confidence',
    approachCopy: 'Keentel integrates collector systems, inverter-based resource studies, protection, reactive power, and utility requirements into a coordinated engineering path for utility-scale solar facilities.',
    image: '/images/services/utility-scale-renewable-energy/card-solar.webp', imageAlt: 'Utility-scale solar farm infrastructure',
    servicesTitle: 'Our Electrical Engineering Capabilities for Solar Farms', servicesIntro: 'Focused services for development, interconnection, detailed engineering, and operational reliability.',
    services: [
      { title: 'Feasibility Studies & Site Assessment', description: 'Evaluate grid access, site constraints, preliminary equipment needs, and interconnection risk.' },
      { title: 'Electrical System Design', description: 'Develop collector systems, MV distribution, grounding, and substation interfaces.' },
      { title: 'Solar Panel & Equipment Selection', description: 'Coordinate inverter, transformer, conductor, protection, and auxiliary equipment requirements.' },
      { title: 'Grid Connection & Interconnection', description: 'Support POI studies, utility submittals, IEEE 2800 requirements, and compliance validation.' },
      { title: 'Power Quality & System Stability', description: 'Perform harmonic, flicker, voltage, reactive-power, and dynamic performance analysis.' },
      { title: 'Performance Testing & Optimization', description: 'Validate controls and operating performance for reliable energization and long-term output.' },
    ],
    processTitle: 'Our Solar Farm Engineering Process', process: ['Scope and interconnection strategy', 'Baseline modeling and studies', 'Detailed electrical design', 'Utility review and compliance', 'Construction and commissioning support'],
    faqTitle: 'FAQ for Utility-Scale Solar Farm Engineering Services',
    faqs: [
      { question: 'What is a utility-scale solar farm?', answer: 'It is a large solar generation facility designed to deliver power to the transmission or distribution grid.' },
      { question: 'What engineering is required for solar interconnection?', answer: 'Projects commonly require electrical design, POI support, load flow, short-circuit, dynamic, harmonic, protection, and utility compliance studies.' },
      { question: 'Do you support IEEE 2800 compliance?', answer: 'Yes. We support inverter-based resource performance, interconnection studies, and compliance documentation aligned with applicable utility requirements.' },
      { question: 'Can you coordinate with EPC and utility teams?', answer: 'Yes. Our deliverables are structured to support utility review, EPC coordination, construction, and commissioning.' },
    ],
    caseStudyService: 'utility-scale-solar-farms', blogTerms: ['solar', 'renewable', 'interconnection'],
  }} />
}
