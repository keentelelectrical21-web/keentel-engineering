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
    _id: 'servicePage-owners-engineer',
    _type: 'servicePage',
    title: "Owner's Engineer Services for Power & Renewable Projects",
    slug: { _type: 'slug', current: 'owners-engineer' },
    heroHeading: "Owner's Engineer Services for Power & Renewable Projects",
    heroSubheading: "At Keentel Engineering, we provide comprehensive owner's engineer services for utility-scale power and renewable energy projects across the U.S., ensuring performance, safety, compliance, and cost-efficiency from concept to commissioning.",
    heroCtaText: 'Schedule A Call',
    heroCtaLink: 'https://calendly.com/keentel-engineering/15min',
    heroBgImage: '/videos/power-system-hero.mp4',
    metaTitle: "Owner's Engineer Services | Keentel Engineering",
    metaDescription: "Comprehensive owner's engineer services for utility-scale power and renewable energy projects including EPC oversight, QA/QC, procurement, and commissioning support.",
    metaKeywords: "owner's engineer, EPC oversight, power plant owner engineering, renewable energy owner representative, HVDC owner's engineer",
    faqHeading: "FAQ for Owner's Engineer Services",
    faqs: [
      { question: "What is an Owner's Engineer?", answer: "An Owner's Engineer is an independent consulting expert who represents the project owner's interests during design, construction, and commissioning of a renewable, hybrid, or BESS energy project, providing technical oversight, project management, and quality assurance." },
      { question: "What types of renewable energy power plants do you provide Owner's Engineer services for?", answer: 'Solar PV power plants, wind power plants, hydropower, hybrid/standalone BESS projects, biomass energy plants, and geothermal power plants.' },
      { question: "Why do I need an Owner's Engineer for my renewable power plant project?", answer: "An Owner's Engineer ensures the project is executed efficiently and in line with the owner's objectives, providing expert technical guidance and managing project complexities." },
      { question: 'Do you assist with the procurement of equipment and contractors?', answer: 'Yes, we assist in selecting the right contractors, equipment, and materials, evaluating bids and negotiating contracts.' },
      { question: 'How do you ensure the commissioning and testing processes are completed successfully?', answer: 'We provide oversight throughout commissioning and testing, reviewing test protocols and confirming performance benchmarks before handover.' },
      { question: "What's the difference between an Owner's Engineer and an EPC contractor?", answer: "An Owner's Engineer represents the project owner and provides independent oversight, while an EPC contractor handles design, procurement, and construction." },
      { question: "When should I bring in an Owner's Engineer during project development?", answer: 'Ideally at the feasibility or conceptual design stage for better technical planning and fewer design revisions during EPC execution.' },
      { question: "Does an Owner's Engineer help with NERC compliance or utility coordination?", answer: "Yes, a qualified Owner's Engineer assists with NERC compliance support, relay studies, and navigating utility interconnection standards." },
    ],
  },
  {
    _id: 'servicePage-mep-engineering',
    _type: 'servicePage',
    title: 'MEP Engineering Services',
    slug: { _type: 'slug', current: 'mep-engineering' },
    heroHeading: 'MEP Engineering Services',
    heroSubheading: 'From HVAC and electrical systems to plumbing, fire protection, and energy modeling, Keentel delivers high-quality MEPF engineering services across North America for warehouse, industrial, and commercial facilities.',
    heroCtaText: 'Schedule A Call',
    heroCtaLink: 'https://calendly.com/keentel-engineering/15min',
    heroBgImage: '/videos/power-system-hero.mp4',
    metaTitle: 'MEP Engineering Services | Keentel Engineering',
    metaDescription: 'Mechanical, electrical, and plumbing engineering services for industrial, warehouse, and commercial facilities including HVAC, electrical distribution, fire protection, and BIM modeling.',
    metaKeywords: 'MEP engineering, mechanical electrical plumbing, HVAC design, electrical system design, plumbing engineering, fire protection design',
    faqHeading: 'FAQ for MEP (Mechanical, Electrical, and Plumbing) Engineering Services',
    faqs: [
      { question: 'What is MEP engineering?', answer: 'MEP engineering refers to the integrated design and management of the Mechanical, Electrical, and Plumbing systems within a building or infrastructure project.' },
      { question: 'What MEP engineering services do you offer?', answer: 'System design, energy modeling, HVAC design, electrical distribution & lighting design, plumbing & drainage systems, fire protection, sustainability consulting, and construction administration support.' },
      { question: 'Why is MEP engineering important for construction projects?', answer: 'It ensures comfort, optimizes energy use, enhances safety, ensures regulatory compliance, and supports sustainable building practices.' },
      { question: 'What types of projects require MEP engineering services?', answer: 'Commercial buildings, residential buildings, industrial facilities, healthcare facilities, educational institutions, public infrastructure, and data centers.' },
      { question: 'How do you ensure energy efficiency in MEP designs?', answer: 'Through optimized HVAC systems, energy-efficient lighting, building energy modeling, water efficiency measures, and renewable energy integration.' },
      { question: 'Do you provide ongoing support after MEP systems are installed?', answer: 'Yes, including system monitoring, preventive maintenance plans, and troubleshooting & upgrade recommendations.' },
      { question: 'How much do MEP design services cost for a warehouse or industrial facility?', answer: 'Pricing typically ranges from $1.50 to $3.00 per square foot depending on project size and complexity.' },
      { question: 'How long does it take to complete MEP engineering plans?', answer: 'Typical designs take 2-6 weeks depending on project size, coordination needs, and permitting timelines.' },
    ],
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
