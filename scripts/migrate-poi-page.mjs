import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'xayja2f8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const doc = {
  _id: 'servicePage-poi-interconnection',
  _type: 'servicePage',
  title: 'POI Interconnection Engineering Support',
  slug: { _type: 'slug', current: 'poi-interconnection-engineering-support' },

  heroHeading: 'POI Interconnection Engineering Support',
  heroSubheading: 'Engineering, documentation, and utility coordination designed to reduce interconnection risk, prevent redesigns, and accelerate project approvals. Supporting renewable developers, EPC contractors, IPPs, and utilities across North America.',
  heroCtaText: 'Schedule A Call',
  heroCtaLink: 'https://calendly.com/keentel-engineering/15min',
  heroCertImage: '/images/cert-logos.png',
  heroBgImage: '/images/services/poi-interconnection/sunset-towers-hero2.jpeg',

  overviewParagraphs: [
    'POI interconnection engineering support provides the technical design, documentation, and utility coordination required to successfully connect generation facilities to the electrical grid at the point of interconnection (POI).',
    'This service helps developers, EPCs, and owners meet utility-specific interconnection requirements, align POI design with approved study assumptions, reduce utility rejections and redesign cycles, and accelerate interconnection approvals and energization.',
    'POI engineering is typically required during interconnection applications, study phases, and detailed design for renewable, storage, and conventional generation projects.',
  ],
  overviewBullets: [
    'Meet utility-specific interconnection requirements',
    'Align POI design with approved study assumptions',
    'Reduce utility rejections and redesign cycles',
    'Accelerate interconnection approvals and energization',
  ],
  overviewImage: '/images/services/poi-interconnection/overview.png',

  whyChooseHeading: 'Why Choose Us for POI Interconnection Engineering',
  whyChooseItems: [
    { title: 'Fewer Utility Rejections — we design POIs specifically to utility standards and reviewer expectations.' },
    { title: 'Faster Interconnection Timelines — clear, complete documentation reduces review cycles and resubmittals.' },
    { title: 'Strong Developer & EPC Coordination — we bridge the gap between studies, engineering, and construction teams.' },
    { title: 'Engineering That Scales — our POI designs support future expansion, repowering, and hybridization.' },
    { title: '30 Years of Experience — three decades of experience in interconnect engineering, from basic POI siting to advanced system impact studies and compliance documentation.' },
    { title: 'Quality with Innovation — detailed engineering, modern design tools, and strict quality control across battery storage, utility-scale solar, and hybrid systems.' },
  ],
  whyChooseClosing: "Let's discuss how to optimize your next project.",
  whyChooseCtaText: 'Learn More About Us',
  whyChooseCtaLink: '/about',

  studiesHeading: 'What We Deliver',
  studiesSubheading: 'POI engineering, application support, technical studies, and construction-ready documentation for utility-scale interconnections.',
  studyItems: [
    { title: 'POI Electrical & Physical Engineering', desc: 'POI one-line and three-line diagrams, switching station or POI substation layouts, equipment sizing, protection and control concepts, revenue metering design support, and ownership demarcation.', link: '', image: '/images/services/poi-interconnection/deliver-electrical.jpeg' },
    { title: 'Interconnection Application & Utility Submittal Support', desc: 'Engineering support for interconnection request packages, utility data requests, design support during Feasibility, System Impact, and Facilities Studies, and utility comment resolution.', link: '', image: '/images/services/poi-interconnection/deliver-application.jpeg' },
    { title: 'Studies & Technical Analysis Support', desc: 'Short-circuit and fault duty evaluations, grounding and step-touch analysis, reactive power and voltage control support, protection coordination inputs, and equipment duty checks.', link: '', image: '/images/services/poi-interconnection/deliver-studies.jpeg' },
    { title: 'Construction-Ready & Approval Support', desc: 'IFC-level POI drawings and documentation, coordination with EPC detailed engineering teams, utility review responses, and as-built documentation support.', link: '', image: '/images/services/poi-interconnection/deliver-construction.jpeg' },
  ],

  processHeading: 'Our POI Interconnection Engineering Process',
  processSubheading: 'Step-by-Step Workflow',
  processSubtitle: 'A structured framework from utility review through final approval and resolution.',
  processDescription: 'Keentel Engineering moves projects through utility and queue review, conceptual POI engineering, study and application support, detailed design, and utility review and resolution.',
  processSteps: [
    { title: 'Utility & Queue Review', desc: 'Review interconnection requirements, queue position, voltage level, and ownership boundaries.', bullets: [], image: '/images/services/poi-interconnection/when-1-before-app.jpeg' },
    { title: 'Conceptual POI Engineering', desc: 'Develop compliant preliminary layouts, schematics, and technical assumptions.', bullets: [], image: '/images/services/poi-interconnection/deliver-electrical.jpeg' },
    { title: 'Study & Application Support', desc: 'Support feasibility, system impact, and facilities studies with aligned engineering inputs.', bullets: [], image: '/images/services/poi-interconnection/deliver-studies.jpeg' },
    { title: 'Detailed POI Design', desc: 'Advance engineering to permit- and construction-ready documentation.', bullets: [], image: '/images/services/poi-interconnection/deliver-construction.jpeg' },
    { title: 'Utility Review & Resolution', desc: 'Address utility comments, revisions, and final approvals efficiently.', bullets: [], image: '/images/services/poi-interconnection/when-3-rejected.jpeg' },
  ],
  processCtaText: 'Schedule A Call',
  processCtaLink: 'https://calendly.com/keentel-engineering/15min',

  industriesHeading: 'Who This Service Is For',
  industriesSubheading: 'Our POI interconnection engineering support is designed for projects where utility acceptance, schedule certainty, and compliance matter.',
  industryItems: [
    { title: 'Renewable Energy Developers (Solar, Wind, BESS, Hybrid)', link: '', image: '/images/services/poi-interconnection/who-1-renewable.jpeg' },
    { title: 'EPC Contractors Managing Interconnection Scope', link: '', image: '/images/services/poi-interconnection/who-2-epc.jpeg' },
    { title: 'Independent Power Producers (IPPs)', link: '', image: '/images/services/poi-interconnection/who-3-ipp.jpeg' },
    { title: 'Industrial and Utility-Scale Generation Owners', link: '', image: '/images/services/poi-interconnection/who-4-industrial.jpeg' },
  ],

  caseStudiesHeading: 'Keentel Engineering POI Engineering Capabilities',
  caseStudiesSubheading: 'We design POIs to meet utility-specific requirements, not generic assumptions.',
  caseStudyItems: [
    { title: 'Transmission-Level and Distribution-Level POIs', desc: '', link: '', image: '/images/services/poi-interconnection/cap-transmission-distribution.jpeg' },
    { title: 'Greenfield and Brownfield Interconnections', desc: '', link: '', image: '/images/services/poi-interconnection/cap-greenfield-brownfield.jpeg' },
    { title: 'Utility-Owned and Customer-Owned POI Facilities', desc: '', link: '', image: '/images/services/poi-interconnection/cap-utility-customer.jpeg' },
    { title: 'Renewable, Storage, and Hybrid Generation Projects', desc: '', link: '', image: '/images/services/poi-interconnection/cap-renewable-storage.jpeg' },
    { title: 'New Interconnections, Expansions, and Modifications', desc: '', link: '', image: '/images/services/poi-interconnection/cap-new-expansion.jpeg' },
  ],
  caseStudiesCtaText: '',
  caseStudiesCtaLink: '',

  faqHeading: 'FAQ for POI Interconnection Engineering Support',
  faqs: [
    { question: 'What is a Point of Interconnection (POI)?', answer: 'The Point of Interconnection (POI) is the location where a renewable energy project or power generation facility connects to the existing electrical grid. It is the physical or electrical point where the generated power is transferred from the plant to the transmission or distribution network.' },
    { question: 'What are POI Interconnection Engineering Support Services?', answer: 'These services involve the technical assistance required for the successful design, planning, analysis, and execution of the interconnection process between a power generation system and the electrical grid, ensuring compliance with grid codes and standards.' },
    { question: 'Why are POI Interconnection Services important?', answer: 'They help identify potential challenges in grid capacity, voltage stability, and protection schemes, while ensuring the system meets local, regional, and national grid codes and standards.' },
    { question: 'What specific services are included in POI Interconnection Engineering Support?', answer: 'Feasibility studies, grid impact studies, transmission system studies, power flow analysis, short circuit analysis, protection coordination, regulatory compliance, interconnection agreement support, and system upgrade recommendations.' },
    { question: 'How do you determine the best Point of Interconnection for my project?', answer: 'We assess transmission line proximity, grid capacity, distance from the plant, and regulatory requirements through feasibility studies and grid impact analyses to find the POI that minimizes cost, risk, and technical challenges.' },
    { question: 'What is involved in a Grid Impact Study?', answer: 'A Grid Impact Study evaluates power flow, voltage stability, fault conditions, and overall grid reliability to identify upgrades or modifications needed to accommodate new generation capacity.' },
    { question: 'What regulatory requirements must be considered during the POI interconnection process?', answer: 'Grid codes and regulations set by transmission system operators, utility companies, and government bodies covering voltage control, frequency stability, protection coordination, and safety standards.' },
    { question: 'How do you ensure that the interconnection design is safe and reliable?', answer: 'Through detailed design reviews, comprehensive protection system design, short-circuit analysis, and continuous collaboration with grid operators on operational standards.' },
    { question: 'What is a typical timeline for completing the POI interconnection engineering process?', answer: 'Feasibility, grid impact, and related studies typically take several weeks to a few months, depending on project complexity and grid operator requirements.' },
    { question: 'What are the potential challenges in the POI interconnection process?', answer: 'Grid capacity limitations, regulatory hurdles, protection and safety concerns, and cost considerations from infrastructure upgrades or additional protective equipment.' },
    { question: 'How can you help with the interconnection agreement process?', answer: 'We assist in preparing and negotiating interconnection agreements with utilities and transmission system operators, covering technical requirements, financial arrangements, and timelines.' },
    { question: 'How do you manage costs during the POI interconnection process?', answer: 'Through early feasibility studies and grid impact analyses that identify issues and cost-effective solutions before they become expensive late-stage problems.' },
    { question: 'Do you provide support after the interconnection is completed?', answer: 'Yes, including performance monitoring and troubleshooting, addressing operational issues, and supporting ongoing regulatory or compliance requirements.' },
    { question: 'How much do your POI Interconnection Engineering Support Services cost?', answer: 'Pricing varies based on project complexity and scope of work. We offer customized pricing based on the studies and level of support needed.' },
    { question: 'What is the difference between Point of Interconnection (POI) and Point of Common Coupling (PCC)?', answer: 'POI is where a specific generation facility connects to the utility grid; PCC is a shared connection point used by multiple customers, typically under IEEE 1547 for distributed generation.' },
    { question: 'What are the different types of interconnections in power systems?', answer: 'Interconnections can be physical (transmission line tie-ins), network-based (between grid zones), or system-level (between balancing authorities). In renewable energy, the most common is a physical connection to a specific POI.' },
    { question: 'What is the difference between the Point of Delivery (POD) and the Point of Interconnection (POI)?', answer: 'The POI is where the project connects to the grid; the POD is where power is officially handed off for billing and metering. In many projects these are the same point.' },
    { question: 'Can you give a simple example of interconnection in the energy industry?', answer: 'A solar farm generates power and feeds it into the grid through a nearby substation, the POI. After studies and an approved interconnection application, the solar farm delivers power directly to the grid at that location.' },
  ],

  blogsHeading: 'POI Interconnection – Blogs',
  blogItems: [],

  downloadHeading: 'Download Our POI Interconnection Engineering Support Flyer',
  downloadSubheading: 'Please click the Download button to get our POI Interconnection Engineering Support flyer.',
  downloadCtaText: 'Download The Flyer',
  downloadCtaLink: '/files/poi-interconnection.pdf',

  ctaHeading: 'Ready to Reduce Interconnection Risk?',
  ctaSubheading: 'Speak with an engineer experienced in POI design, utility coordination, and interconnection approvals.',
  ctaPrimaryText: 'Schedule A Consultation',
  ctaPrimaryLink: 'https://calendly.com/keentel-engineering/15min',
  ctaSecondaryText: '813-389-7871',
  ctaSecondaryLink: 'tel:813-389-7871',
  ctaImage: '/images/services/poi-interconnection/cta-engineer-phone.jpeg',

  metaTitle: 'POI Interconnection Engineering Support | Keentel Engineering',
  metaDescription: 'POI interconnection engineering, utility submittal support, and technical studies for renewable, storage, and conventional generation projects across North America.',
  metaKeywords: 'POI interconnection, point of interconnection, interconnection engineering, utility submittal, feasibility study, system impact study, facilities study',
}

async function run() {
  try {
    const result = await client.createOrReplace(doc)
    console.log(`✅ ${result._id}`)
  } catch (err) {
    console.error(`❌ ${doc._id}:`, err.message)
  }
}

run()
