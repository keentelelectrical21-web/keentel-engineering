import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'xayja2f8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const docs = [
  {
    _id: 'servicePage-transmission-line-design',
    _type: 'servicePage',
    title: 'Transmission Line Design Services',
    slug: { _type: 'slug', current: 'transmission-line-design' },

    heroHeading: 'Transmission Line Design Services',
    heroSubheading: 'Advanced engineering solutions for reliable, efficient, and future-ready power infrastructure, specializing in transmission line design, sag-tension analysis, and high-voltage system optimization.',
    heroCtaText: 'Schedule A Call',
    heroCtaLink: 'https://calendly.com/keentel-engineering/15min',
    heroCertImage: '/images/cert-logos.png',
    heroBgImage: '/videos/power-system-hero.mp4',

    overviewParagraphs: [
      'At Keentel Engineering, we take pride in being the go-to engineering firm for power and utility system planning, design, control, and analysis.',
      'Our team works cohesively on every project and with every client, developing a solid understanding of project goals, requirements, and needs from concept to commissioning.',
    ],
    overviewBullets: ['Client-Focused Work Approach', '30 Years of Experience', 'Quality with Innovation', 'Attention to Detail'],
    overviewImage: '/images/services/transmission-line-design/final-cta.png',

    whyChooseHeading: 'Why Choose Us',
    whyChooseItems: [
      { title: 'Client-Focused Work Approach — we first develop a solid understanding of your project goals, requirements, and needs.' },
      { title: '30 Years of Experience — over three decades of experience in design and interconnection.' },
      { title: 'Quality with Innovation — our stellar market reputation is built on quality, work ethics, and innovation.' },
      { title: 'Attention to Detail — laser focus on every project for complete satisfaction.' },
    ],
    whyChooseClosing: '',
    whyChooseCtaText: 'Learn More About Us',
    whyChooseCtaLink: '/about',

    studiesHeading: "Keentel Engineering's Core Transmission Line Design Capabilities",
    studiesSubheading: '',
    studyItems: [
      { title: 'Line Routing & Corridor Optimization', desc: 'Terrain-based route optimization, ROW analysis, constraint mapping, GIS-integrated alignment studies.', link: '', image: '/images/services/transmission-line-design/cap-routing.webp' },
      { title: 'Structural Design & Modeling', desc: 'Transmission towers, distribution poles, foundations, insulator assemblies, and structural integrity validation.', link: '', image: '/images/services/transmission-line-design/cap-structural.webp' },
      { title: 'Conductor & Ground Wire Design', desc: 'Ampacity requirements, thermal limits, corona considerations, conductor selection, and shield wire design.', link: '', image: '/images/services/transmission-line-design/cap-conductor.webp' },
      { title: 'Sag-Tension & Mechanical Analysis', desc: 'Sag and tension under multiple loading conditions, wind/ice loading, and clearance checks.', link: '', image: '/images/services/transmission-line-design/cap-sag-tension.jpg' },
      { title: 'Electrical Design & System Integration', desc: 'Voltage profile, insulation coordination, lightning protection, grounding and bonding systems.', link: '', image: '/images/services/transmission-line-design/cap-electrical.jpg' },
      { title: 'Digital Modeling & Intelligent Engineering', desc: '2D construction drawings, 3D intelligent models, data-rich digital twins, and clash detection.', link: '', image: '/images/services/transmission-line-design/cap-digital-modeling.webp' },
    ],

    processHeading: 'Our Engineering Process',
    processSubheading: '',
    processSubtitle: '',
    processDescription: '',
    processSteps: [
      { title: 'Project Definition', desc: 'Scope development, load and system requirements, voltage and capacity analysis.', bullets: [], image: '' },
      { title: 'Conceptual Design', desc: 'Route selection, preliminary structure layout, feasibility studies.', bullets: [], image: '' },
      { title: 'Detailed Engineering', desc: 'Structural and electrical design, sag-tension analysis, grounding and protection design.', bullets: [], image: '' },
      { title: 'Digital Modeling', desc: '2D + 3D model development, design validation, coordination with other disciplines.', bullets: [], image: '' },
      { title: 'Construction Deliverables', desc: 'IFC drawings, material lists, engineering reports.', bullets: [], image: '' },
      { title: 'Project Support', desc: 'Engineering review during construction, field issue resolution, design updates.', bullets: [], image: '' },
    ],
    processCtaText: '',
    processCtaLink: '',

    industriesHeading: 'Industries We Serve',
    industriesSubheading: '',
    industryItems: [
      { title: 'Utility companies', link: '', image: '' },
      { title: 'Renewable energy developers', link: 'https://keentelengineering.com/service/poi-interconnection-engineering-support', image: '' },
      { title: 'Transmission developers', link: '', image: '' },
      { title: 'Industrial and manufacturing facilities', link: '', image: '' },
      { title: 'EPC contractors', link: '', image: '' },
      { title: 'Municipal and public-sector utilities', link: '', image: '' },
    ],

    caseStudiesHeading: '',
    caseStudiesSubheading: '',
    caseStudyItems: [],
    caseStudiesCtaText: '',
    caseStudiesCtaLink: '',

    faqHeading: 'Technical FAQs',
    faqs: [
      { question: 'What is transmission line design?', answer: 'Transmission line design involves engineering the physical and electrical components required to transfer electrical power safely and efficiently from one location to another.' },
      { question: 'What factors influence transmission line design?', answer: 'Key factors include voltage level, terrain, conductor type, environmental conditions, mechanical loading, and regulatory requirements.' },
      { question: 'What is sag-tension analysis?', answer: 'Sag-tension analysis determines how conductors behave under different loads such as temperature, wind, and ice, ensuring safe clearances and structural stability.' },
      { question: 'Why is 3D modeling important in transmission design?', answer: '3D modeling improves accuracy, enables clash detection, enhances visualization, and supports better coordination among engineering teams.' },
      { question: 'What standards are used in transmission line design?', answer: 'Common standards include NESC, IEEE, IEC, NEC, and utility-specific requirements.' },
      { question: 'How does digital design improve project efficiency?', answer: 'Digital tools automate calculations, integrate data, and reduce manual errors, significantly accelerating design and improving accuracy.' },
      { question: 'What is a digital twin in transmission projects?', answer: 'A digital twin is a virtual model of the transmission system that includes engineering data for planning, construction, and lifecycle management.' },
      { question: 'How are transmission lines optimized for cost?', answer: 'Through route optimization, material selection, efficient structure design, and minimizing losses and construction complexity.' },
      { question: 'What types of transmission structures are used?', answer: 'Common types include lattice towers, monopoles, H-frame structures, and wood or concrete poles.' },
      { question: 'Do you support renewable energy interconnections?', answer: 'Yes. Keentel specializes in collector systems and interconnection design for solar, wind, and battery energy storage projects.' },
      { question: 'How do environmental factors affect design?', answer: 'Wind, ice, temperature, and terrain significantly influence structural loading, conductor sag, and system reliability.' },
      { question: 'What deliverables are provided?', answer: 'Typical deliverables include drawings, reports, calculations, models, and construction documentation.' },
    ],

    blogsHeading: 'Transmission Line Design – Blogs',
    blogItems: [],

    downloadHeading: 'Download Our Transmission Line Design Flyer',
    downloadSubheading: 'Please click the Download button to get our flyer.',
    downloadCtaText: 'Download The Flyer',
    downloadCtaLink: '/files/transmission-line-design.pdf',

    ctaHeading: 'Ensure Your Electrical Infrastructure Is Safe, Compliant, and Future-Ready',
    ctaSubheading: 'Work with a specialized team of transmission line engineers delivering cost-optimized, code-compliant, and approval-ready designs for utility-scale and infrastructure projects.',
    ctaPrimaryText: 'Schedule A Consultation',
    ctaPrimaryLink: 'https://calendly.com/keentel-engineering/15min',
    ctaSecondaryText: 'Speak With an Engineer',
    ctaSecondaryLink: 'tel:813-389-7871',
    ctaImage: '/images/services/transmission-line-design/final-cta.png',

    metaTitle: 'Transmission Line Design Services | Keentel Engineering',
    metaDescription: 'Transmission line design, sag-tension analysis, structural and electrical engineering, and digital modeling for utility-scale and infrastructure projects.',
    metaKeywords: 'transmission line design, sag-tension analysis, conductor design, transmission tower design, NESC IEEE compliance',
  },

  {
    _id: 'servicePage-utility-scale-renewable-energy',
    _type: 'servicePage',
    title: 'Utility-Scale Renewable Energy Engineering',
    slug: { _type: 'slug', current: 'utility-scale-renewable-energy' },

    heroHeading: 'Utility-Scale Renewable Energy Engineering',
    heroSubheading: 'Engineering support for solar, wind, and BESS projects — from POI studies and IEEE 2800 compliance to grid integration and NERC reliability support.',
    heroCtaText: 'Schedule a Consultation',
    heroCtaLink: 'https://calendly.com/keentel-engineering/15min',
    heroCertImage: '/images/cert-logos.png',
    heroBgImage: '/videos/power-system-hero.mp4',

    overviewParagraphs: [
      'Utility-scale renewable energy projects require advanced power system engineering to ensure reliable and compliant grid integration. Keentel Engineering supports solar, wind, and BESS developers with POI interconnection studies, IEEE 2800 compliance, dynamic modeling, and NERC reliability support.',
    ],
    overviewBullets: [],
    overviewImage: '/images/services/utility-scale-renewable-energy/why-specialized.webp',

    whyChooseHeading: 'Why Choose Keentel Engineering',
    whyChooseItems: [
      { title: 'Expertise in HV, MV, and EHV power systems' },
      { title: 'Advanced power system modeling capabilities' },
      { title: 'Experience with utility and ISO planning requirements' },
      { title: 'Deep understanding of NERC reliability standards' },
      { title: 'Practical engineering solutions for complex power system challenges' },
    ],
    whyChooseClosing: 'Our engineers help developers, utilities, and EPC teams reduce technical risk, validate grid performance, and move renewable projects toward safe, compliant interconnection.',
    whyChooseCtaText: '',
    whyChooseCtaLink: '',

    studiesHeading: 'Renewable Energy Segments',
    studiesSubheading: '',
    studyItems: [
      { title: 'Utility-Scale Solar Farm Engineering', desc: 'POI interconnection studies, IEEE 2800 compliance, harmonic analysis, short-circuit studies, protection coordination, and NERC PRC-024/PRC-029 support.', link: 'https://keentelengineering.com/service/utility-scale-solar-farms', image: '/images/services/utility-scale-renewable-energy/card-solar.webp' },
      { title: 'Utility-Scale Wind Farm Engineering', desc: 'Type 3 and Type 4 turbine systems, dynamic stability, weak grid analysis, synthetic inertia, subsynchronous oscillation studies.', link: 'https://keentelengineering.com/service/utility-scale-wind-farms', image: '/images/services/utility-scale-renewable-energy/card-wind.webp' },
      { title: 'Battery Energy Storage System Engineering', desc: 'Grid-forming and grid-supporting inverter controls, frequency response studies, harmonic analysis, fault contribution review.', link: 'https://keentelengineering.com/service/utility-scale-battery-storage', image: '/images/services/utility-scale-renewable-energy/card-bess.webp' },
    ],

    processHeading: 'Our Renewable Engineering Process',
    processSubheading: '',
    processSubtitle: '',
    processDescription: '',
    processSteps: [
      { title: 'Standards Assessment and Scope Definition', desc: 'Define applicable standards, project scope, technical requirements, and compliance objectives.', bullets: [], image: '' },
      { title: 'Baseline Power System Modeling', desc: 'Develop steady-state and dynamic models to establish baseline power system performance.', bullets: [], image: '' },
      { title: 'Interconnection Studies and Compliance Validation', desc: 'Perform interconnection studies and validate compliance with utility and regulatory requirements.', bullets: [], image: '' },
      { title: 'Mitigation Recommendations and Documentation', desc: 'Identify technical risks, recommend mitigation measures, and prepare supporting documentation.', bullets: [], image: '' },
      { title: 'Operational Planning and Grid Operator Support', desc: 'Support operational planning, grid operator coordination, and final project readiness.', bullets: [], image: '' },
    ],
    processCtaText: '',
    processCtaLink: '',

    industriesHeading: 'Software Tools Used',
    industriesSubheading: 'Keentel Engineering uses advanced power system simulation platforms including PSS®E, PowerWorld, PSLF, DIgSILENT, SKM PowerTools, and ETAP.',
    industryItems: [
      { title: 'PSS®E', link: '', image: '/images/services/utility-scale-renewable-energy/logo-psse.png' },
      { title: 'PowerWorld', link: '', image: '/images/services/utility-scale-renewable-energy/logo-powerworld.jpg' },
      { title: 'DIgSILENT', link: '', image: '/images/services/utility-scale-renewable-energy/logo-digsilent.png' },
      { title: 'SKM PowerTools', link: '', image: '/images/services/utility-scale-renewable-energy/logo-skm.png' },
      { title: 'ETAP', link: '', image: '/images/services/utility-scale-renewable-energy/logo-etap.png' },
    ],

    caseStudiesHeading: '',
    caseStudiesSubheading: '',
    caseStudyItems: [],
    caseStudiesCtaText: '',
    caseStudiesCtaLink: '',

    faqHeading: 'Technical FAQs',
    faqs: [
      { question: 'What is a utility-scale solar farm?', answer: 'A utility-scale solar farm is a large solar power generation facility designed to produce significant amounts of electricity, typically in the range of several megawatts to gigawatts, connected directly to the electrical grid.' },
      { question: 'Why is engineering important for a utility-scale solar farm project?', answer: 'Proper design and planning ensure the system is efficient, reliable, and cost-effective, optimizing energy production and ensuring grid code compliance.' },
      { question: 'What is a utility-scale wind farm?', answer: 'A utility-scale wind farm is a large-scale wind power generation facility typically ranging from tens to hundreds of megawatts, connected to the electrical grid.' },
      { question: 'What is wake loss, and why does it matter in wind farm design?', answer: 'Wake loss happens when one turbine blocks or disturbs the airflow to another, reducing overall efficiency. We use advanced modeling to optimize turbine layouts.' },
      { question: 'How is wind measured and modeled before building a wind farm?', answer: 'We help deploy LiDAR, SODAR, or meteorological towers to collect data on wind speed, direction, and turbulence to guide turbine placement.' },
      { question: 'What is the difference between utility-scale BESS and commercial battery systems?', answer: 'Utility-scale BESS are large-scale systems rated in megawatts for grid support. Commercial battery systems are smaller, serving individual facilities for energy savings and backup power.' },
      { question: 'How does a BESS improve grid reliability during peak demand or outages?', answer: 'A utility-scale BESS stabilizes the grid by instantly discharging stored electricity during peak demand or outages, preventing grid overload.' },
      { question: 'What battery chemistries are best suited for utility-scale storage?', answer: 'Lithium-ion batteries, particularly LFP, are the most common choice due to high cycle life, fast response time, and safety profile.' },
      { question: 'What are the fire safety and thermal management requirements for BESS?', answer: 'Compliance with UL 9540A testing, fire suppression systems, thermal runaway detection, and adherence to NFPA 855.' },
      { question: 'Can BESS systems be co-located with solar or wind farms?', answer: 'Yes, utility-scale BESS are commonly co-located with solar or wind farms to store excess generation and discharge during peak demand.' },
    ],

    blogsHeading: 'Utility Scale Renewable Blogs',
    blogItems: [],

    downloadHeading: '',
    downloadSubheading: '',
    downloadCtaText: '',
    downloadCtaLink: '',

    ctaHeading: 'Need Renewable Engineering Support?',
    ctaSubheading: 'Contact Keentel Engineering to discuss your solar, wind, BESS, or interconnection project.',
    ctaPrimaryText: 'Contact Us',
    ctaPrimaryLink: '/contact',
    ctaSecondaryText: '',
    ctaSecondaryLink: '',
    ctaImage: '/images/services/utility-scale-renewable-energy/hero-towers.webp',

    metaTitle: 'Utility-Scale Renewable Energy Engineering | Keentel Engineering',
    metaDescription: 'Engineering support for solar, wind, and BESS projects including POI studies, IEEE 2800 compliance, dynamic modeling, and NERC reliability support.',
    metaKeywords: 'utility scale solar, utility scale wind, BESS engineering, IEEE 2800, renewable energy interconnection, NERC PRC-024',
  },
]

async function run() {
  for (const doc of docs) {
    try {
      const result = await client.createOrReplace(doc)
      console.log(`✅ ${result._id}`)
    } catch (err) {
      console.error(`❌ ${doc._id}:`, err.message)
    }
  }
  console.log('\nDone.')
}

run()
