import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'xayja2f8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const nercPage = {
  _id: 'servicePage-nerc-compliance',
  _type: 'servicePage',

  title: 'NERC O&P 693 Compliance Services',
  slug: { _type: 'slug', current: 'nerc-compliance' },

  seo: {
    metaTitle: 'NERC Compliance Services | O&P 693 & CIP Engineering Support | Keentel Engineering',
    metaDescription: 'Meet NERC O&P 693 and CIP standards with engineering-first solutions from licensed experts and former NERC auditors. Gap analysis, RSAW documentation, IBR support, and full audit readiness.',
  },

  hero: {
    heading: 'NERC Compliance Services You Can Trust',
    subheading: 'Meet NERC O&P 693 Compliance and CIP standards with engineering-first solutions from licensed experts and former NERC auditors.',
    body: 'Our NERC compliance consultants specialize in helping power sector clients meet NERC 693 standards, including all aspects of O&P and RSAW requirements. With comprehensive NERC audit support and engineering services, we ensure regulatory alignment and operational excellence.',
    ctaPrimary: { label: 'Schedule A Call', href: 'https://calendly.com/keentel-engineering/15min' },
    ctaSecondary: { label: 'Download The Flyer', href: '/files/nerc-compliance.pdf' },
  },

  overview: {
    heading: 'What Are NERC Compliance Services, and Who Needs Them?',
    body: 'NERC compliance services are engineering and regulatory support solutions designed to help power sector organizations meet the mandatory standards established by the North American Electric Reliability Corporation (NERC). These services include alignment with both NERC O&P 693 compliance standards and CIP cybersecurity requirements, ensuring that utilities remain secure, reliable, and audit-ready.',
  },

  whyChoose: [
    { title: 'Client-Focused Work Approach', body: 'Our team works cohesively on every project and with every client. We first develop a solid understanding of your project goals, requirements, and needs. From concept to commissioning, we assist you every step of the way.' },
    { title: '30 Years of Experience', body: 'We have over three decades of experience in design and interconnection. Rest assured, we have the knowledge, understanding, and expertise to handle and execute all types of projects with sheer perfection and superior workmanship.' },
    { title: 'Quality with Innovation', body: 'At Keentel Engineering, we have established our stellar market reputation on quality, work ethics, and innovation — delivering defensible NERC compliance programs backed by engineering precision.' },
    { title: 'Attention-to-Detail', body: 'We work on every project with laser focus and attention to detail. This enables our team to deliver desired results with complete satisfaction across every RSAW, protection study, and audit deliverable.' },
  ],

  coreServices: [
    { title: 'Compliance Program Development', body: 'We build full-scope NERC compliance programs tailored to O&P 693 and CIP standards.' },
    { title: 'Gap Analysis & Risk Assessment', body: 'Former NERC ATLs conduct comprehensive gap analyses to identify potential noncompliance areas with actionable mitigation strategies.' },
    { title: 'RSAW Technical Documentation', body: 'We prepare technically defensible RSAW packages authored by Licensed P.E.s and NERC SMEs to meet strict audit scrutiny.' },
    { title: 'PRC-028-1 & PRC-002-5 RSAW Support', body: 'RSAW documentation and evidence packages for disturbance monitoring and fault recording.' },
    { title: 'FAC-008-3, PRC-019, and Model Validation', body: 'Validation of facility ratings, protection coordination, and steady-state/dynamic model performance.' },
    { title: 'IBR Model Validation', body: 'PRC-024-4 and PRC-029-1 ride-through and protection studies tailored for inverter-based resources.' },
    { title: 'TPL-007-1 GIC Risk Mitigation', body: 'Transformer vulnerability and GMD exposure analysis with compliance support and thermal impact assessment.' },
    { title: 'NERC Align Portal Support & Mitigation Planning', body: 'Full NERC Align workflow guidance including pre-submittal reviews, mitigation plans, and Regional Entity correspondence.' },
    { title: 'Pre-Audit & Post-Audit Support', body: 'Mock audit preparation, on-site or remote audit assistance, and post-audit mitigation strategy development.' },
    { title: 'Integrated Substation Design for NERC Alignment', body: 'Substation and interconnection engineering services incorporating NERC compliance from the ground up.' },
  ],

  faqs: [
    { question: 'What is NERC, and what do the NERC O&P compliance standards cover?', answer: 'NERC is a nonprofit responsible for establishing and enforcing reliability standards for the electric grid in North America. O&P compliance standards cover system operations, contingency planning, grid planning, transmission reliability, and monitoring and reporting.' },
    { question: 'What are RSAWs and how does Keentel support their preparation?', answer: 'Reliability Standard Audit Worksheets (RSAWs) are documents used during NERC audits to demonstrate compliance. Keentel supports RSAW preparation with detailed engineering analysis, system studies, technical documentation, and pre-audit internal reviews.' },
    { question: 'Does Keentel offer engineering support during a NERC audit?', answer: 'Yes. Keentel provides hands-on engineering and compliance support during NERC audits including real-time responses to technical audit questions, clarification of PRC, FAC, MOD, and CIP requirements, and collaboration with internal compliance teams.' },
    { question: 'Who needs NERC compliance services?', answer: 'Generator Owners (GOs), Generator Operators (GOPs), Transmission Owners (TOs), Transmission Operators (TOPs), Load-Serving Entities (LSEs), and Balancing Authorities (BAs) all benefit from NERC compliance services.' },
    { question: 'How does Keentel support NERC compliance audits?', answer: 'Keentel provides end-to-end NERC audit support including engineering analysis, disturbance reporting, compliance gap assessments, RSAW evidence development, and live support during CIP and O&P audits — onsite or remotely.' },
  ],

  downloadFlyer: {
    heading: 'Download the NERC Compliance Services flyer',
    fileUrl: '/files/nerc-compliance.pdf',
    label: 'Download The Flyer',
  },

  blogSection: {
    heading: 'NERC Compliance – Blogs',
    category: 'nerc-compliance',
  },

  finalCta: {
    heading: 'Need help with NERC audits, RSAW documentation, or compliance assessments?',
    body: 'Call 813-389-7871 to speak with a certified NERC compliance consultant, or contact us online to ensure you\'re fully aligned with NERC 693 O&P standards.',
    phone: '813-389-7871',
  },
}

async function run() {
  console.log('Creating NERC Compliance service page in Sanity...')
  try {
    const result = await client.createOrReplace(nercPage)
    console.log(`✅ Created: ${result.title} (${result.slug.current})`)
  } catch (err) {
    console.error('❌ Error:', err.message)
  }

  // Verify
  const pages = await client.fetch(`*[_type == "servicePage"]{title, "slug": slug.current}`)
  console.log('\nAll service pages in Sanity:')
  pages.forEach((p, i) => console.log(`  ${i + 1}. ${p.title} — /service/${p.slug}`))
}

run()
