import RenewableSpecialtyPage from '@/components/service/RenewableSpecialtyPage'

export default function UtilityScaleWindFarmsPage() {
  return <RenewableSpecialtyPage config={{
    eyebrow: 'Utility-Scale Wind', title: 'Utility-Scale Wind Farm Engineering Services',
    heroCopy: 'Electrical and power-system engineering for wind projects navigating complex collector systems, interconnection studies, and grid-performance requirements.',
    approachTitle: 'Wind Engineering Built for Variable Generation and Grid Reliability',
    approachCopy: 'Keentel coordinates turbine collection, substation interfaces, dynamic behavior, protection, and utility requirements to move wind projects from concept through energization.',
    image: '/images/services/utility-scale-renewable-energy/card-wind.webp', imageAlt: 'Utility-scale wind farm and transmission infrastructure',
    servicesTitle: 'End-to-End Electrical Engineering Services for Wind Farms', servicesIntro: 'Practical technical support for the changing generation, controls, and transmission conditions that define wind projects.',
    services: [
      { title: 'Wind Resource & Site Assessment', description: 'Coordinate electrical planning with site conditions, turbine layout, access, and collector-system requirements.' },
      { title: 'Electrical System Design', description: 'Develop collector circuits, substations, grounding, protection, and cable-system design.' },
      { title: 'Equipment Sourcing Support', description: 'Define technical requirements for transformers, switchgear, relays, and auxiliary systems.' },
      { title: 'Grid Connection & Interconnection', description: 'Support utility applications, POI studies, dynamic models, and compliance evidence.' },
      { title: 'Power Quality & Stability Analysis', description: 'Assess voltage, reactive power, harmonics, fault duty, controls, and weak-grid performance.' },
      { title: 'Operations, Maintenance & Upgrades', description: 'Support repowering, system modifications, troubleshooting, and continued reliability.' },
    ],
    processTitle: 'Our Wind Farm Engineering Process', process: ['Resource and grid review', 'Collector and POI concept design', 'Dynamic modeling and compliance studies', 'Detailed engineering packages', 'Construction and operational support'],
    faqTitle: 'FAQ for Utility-Scale Wind Farm Engineering Services',
    faqs: [
      { question: 'What is a utility-scale wind farm?', answer: 'It is a multi-turbine generation facility that delivers commercial-scale electricity through a collector system and grid interconnection.' },
      { question: 'What is wake loss?', answer: 'Wake loss is the reduction in turbine output caused by airflow disruption from other turbines; it informs layout and generation planning.' },
      { question: 'Do wind farms require dynamic studies?', answer: 'Yes. Dynamic studies validate turbine controls, voltage response, frequency behavior, and grid-code performance.' },
      { question: 'Can Keentel support a wind-farm repower?', answer: 'Yes. We evaluate changed turbines, collector systems, protection, studies, and interconnection requirements.' },
    ],
    caseStudyService: 'utility-scale-wind-farms', blogTerms: ['wind', 'renewable', 'transmission'],
  }} />
}
