// ============================================================
// SERVICE DATA — Power System Studies
// File: lib/serviceData.ts
// ============================================================

export const powerSystemStudiesData = {
  hero: {
    heading: 'Advanced Power System Studies Delivered by HV, MV & EHV Specialists',
    subheading: 'Keentel Engineering provides comprehensive power system studies nationwide, empowering utilities, industrial plants, renewable projects, and commercial facilities with reliable, data-driven solutions',
    ctaText: 'Schedule a Consultation',
    ctaLink: 'https://calendly.com/keentel-engineering/15min',
    certImage: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/new+image-1920w.png',
    bgImage: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ChatGPT+Image+Feb+22-+2026-+05_55_57+PM+%281%29-1920w.png',
  },

  overview: {
    paragraphs: [
      'Our licensed professional engineers perform detailed MV and HV system studies, including transmission planning, load flow analysis, short-circuit studies, harmonic assessments, protection coordination, and NERC compliance studies. We utilize industry-leading platforms such as PSS®E, PSCAD, DIgSILENT PowerFactory, and ETAP to ensure technical precision and regulatory alignment.',
      'With more than 30 years of engineering expertise, we deliver accurate system modeling, compliance-ready technical reports, and actionable recommendations that enhance electrical reliability and safeguard high-value infrastructure',
    ],
    bullets: [
      'Nationwide engineering support',
      'Utility-grade simulation tools',
      'IEEE, NERC & OSHA compliance',
      'Trusted by utilities, EPC firms, and industrial Professionals',
    ],
    image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ChatGPT+Image+Feb+22-+2026-+05_55_57+PM+%281%29-1920w.png',
  },

  whyChoose: {
    heading: 'Why Utilities and Renewable Owners Choose Keentel Engineering',
    items: [
      { title: '30+ Years of Specialized Experience in high-voltage power engineering' },
      { title: 'Certified Power System Engineers with deep technical expertise' },
      { title: 'Nationwide Project Support across utility, industrial, and renewable sectors' },
      { title: 'Advanced Simulation & Modeling Tools for precise system analysis' },
      { title: 'Compliance-Focused Reporting aligned with IEEE, NERC, NFPA, and OSHA standards' },
    ],
    closing: 'When system reliability and safety are mission-critical, organizations trust Keentel Engineering to deliver engineering clarity and proven results.',
    ctaText: 'Learn More About Us',
    ctaLink: '/about',
  },

  studies: {
    heading: 'Our Power System Study Services',
    subheading: 'We provide comprehensive electrical system studies designed to improve safety, ensure compliance, and optimize performance across HV, MV, and EHV networks.',
    items: [
      {
        title: 'Transmission Planning',
        desc: 'Support grid expansion through power flow, contingency, and stability studies to identify constraints and improve system reliability.',
        link: '/service/power-system-studies/transmission-planning-studies',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/transmission_planning_studies_correct_logos-1920w.png',
      },
      {
        title: 'Load Flow Analysis',
        desc: 'Evaluate voltage stability, load distribution, and losses to ensure efficient power performance during normal and peak demand.',
        link: '/service/power-system-studies/load-flow-analysis-services',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ae649c9f9982d1727f1d40be7d72666e-1920w.webp',
      },
      {
        title: 'Short Circuit Studies',
        desc: 'Determine fault current levels, validate equipment ratings, and verify protection devices operate correctly during abnormal system events.',
        link: '/service/power-system-studies/short-circuit-analysis-power-system',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/images-1920w.jpg',
      },
      {
        title: 'Protective Coordination',
        desc: 'Optimize relay and breaker settings using time-current analysis to isolate faults quickly, improve coordination, and minimize system disruption.',
        link: '/service/power-system-studies/protective-device-coordination-studies',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/protection-coordination-practices-distribution-generation-920x613-1920w.jpg',
      },
      {
        title: 'Harmonic Analysis',
        desc: 'Detect waveform distortion from inverter sources and nonlinear loads through harmonic analysis, resonance evaluation, and advanced mitigation studies.',
        link: '/service/power-system-studies/harmonic-analysis-power-systems',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/studi-dan-analisis-harmonik-harmonic-study-and-analysis-1920w.jpg',
      },
      {
        title: 'Grounding Protection',
        desc: 'Reduce step and touch voltage risks through grounding studies, fault analysis, and protection performance evaluation for safer system operation.',
        link: '/service/power-system-studies/grounding-system-studies',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/c5e7c86d-60f2-4b2e-8f31-ce7c0a3d1b64-1920w.png',
      },
    ],
  },

  process: {
    heading: 'High Voltage Power System Study Execution Framework',
    subheading: 'Our Power System Studies Process',
    subtitle: 'Transmission-Level Modeling Using PSS®E, PSCAD, ETAP & DIgSILENT',
    description: 'Keentel Engineering performs HV and EHV power system studies using a structured, multi-platform methodology aligned with ISO interconnection standards, IEEE requirements, and NERC reliability criteria. Our execution framework ensures modeling accuracy, cross-software validation, and compliance-ready deliverables from transmission-level analysis to detailed facility protection.',
    steps: [
      {
        title: 'Scope Definition & Compliance Alignment',
        desc: 'Every project begins with a clearly defined technical framework and study matrix.',
        bullets: [
          'Define POI-to-grid limits',
          'Set N-0, N-1, N-1-1 cases',
          'Model peak and light load scenarios',
          'Identify weak grid / low SCR cases',
          'Align with IEEE, NERC, ANSI/IEC standards',
          'Assign appropriate study software',
        ],
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Phase+1+-+Scope+Definition+-+Compliance+Alignment+7878-1920w.png',
      },
      {
        title: 'Structured Data Collection & Model Integrity',
        desc: 'Accurate studies require verified inputs and documented assumptions.',
        bullets: [
          'Utility base case files (.sav, .raw, .dyr)',
          'Transformer ratings, impedance, vector group',
          'Line R/X/B data and thermal ratings',
          'Generator/inverter dynamic models',
          'Breaker duties, CT/PT data, relay settings',
          'Ground grid layout and soil parameters',
        ],
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/4520f800-a491-4d33-b1ff-ae4edbf9515f-1920w.png',
      },
      {
        title: 'Transmission-Level RMS & EMT Modeling',
        desc: 'Using PSS®E, DIgSILENT, and PSCAD, we validate system behavior under real conditions.',
        bullets: [
          'Load flow and voltage validation',
          'Reactive margin and loading checks',
          'N-1 / N-1-1 contingency analysis',
          'POI short-circuit screening',
          'Transient stability simulations',
          'Inverter ride-through verification',
          'EMT modeling for weak grid and fast transients',
        ],
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/41e62c42-8f51-424a-9476-ad838dbbeb21-1920w.png',
      },
      {
        title: 'Detailed Short Circuit & Protection Coordination',
        desc: 'Facility-level integrity is validated using ETAP or DIgSILENT.',
        bullets: [
          'ANSI / IEC short-circuit calculations (3ph, SLG, LL, DLG)',
          'Breaker interrupting and withstand duty verification',
          'Protection coordination and TCC curve development',
          'Selectivity and grading margin confirmation',
          'HV, MV, and LV relay philosophy validation',
        ],
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/d63284e8-cf40-4eec-bc82-04927b6dea79-1920w.png',
      },
      {
        title: 'Arc Flash, Harmonics & Grounding Analysis',
        desc: 'Safety and power quality are evaluated using realistic clearing times and operating conditions.',
        bullets: [
          'Arc flash study per IEEE 1584',
          'Incident energy and PPE category determination',
          'Harmonic distortion and resonance analysis (IEEE 519)',
          'Frequency scan and filter adequacy review',
          'Ground grid step and touch voltage verification',
        ],
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/d3f39548-fac0-44d9-913e-a4a45ddfbe2d-1920w.png',
      },
      {
        title: 'Cross-Platform Validation & QA/QC',
        desc: 'Transmission-grade studies require final reconciliation and independent review prior to issuance.',
        bullets: [
          'Cross-verify transformer impedance, fault levels, and X/R ratios',
          'Confirm RMS and EMT model consistency',
          'Resolve identified variances',
          'Implement mitigation measures',
          'Issue version-controlled, compliance-ready reports',
        ],
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/asd-1920w.png',
      },
    ],
    ctaText: 'See Detailed Process',
    ctaLink: '/power-system-study-process',
  },

  industries: {
    heading: 'Industries We Support',
    subheading: 'Keentel Engineering delivers power system studies for complex electrical environments across multiple sectors:',
    items: [
      {
        title: 'Utilities & Transmission Operators',
        link: '/industries/electric-utilities-transmission',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/shutterstock_551404123-1920w.jpg',
      },
      {
        title: 'Renewable Energy Developers',
        link: '/industries/renewable-interconnection-engineering',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/GettyImages-2174080781-508c0aae85a94ae6a7c4f9c303eae4f1-1920w.jpg',
      },
      {
        title: 'Industrial & Manufacturing Facilities',
        link: '/industries/industrial-power-engineering',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/factory-1920w+%281%29-1920w.webp',
      },
      {
        title: 'Oil, Gas & Mining Operations',
        link: '/industries/oil-gas-mining',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Trends-in-Oil-and-Gas-guide-1920w.jpg',
      },
      {
        title: 'Data Centers & Commercial Infrastructure',
        link: '/industries/data-center-electrical',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/corporate-data-center-1920w.jpg',
      },
    ],
  },

  caseStudies: {
    heading: 'Case Studies',
    subheading: 'Harmonic & Power System Studies by Keentel Engineering',
    items: [
      {
        title: 'Grid Interconnection & Renewable Penetration Analysis (ERCOT)',
        desc: 'Keentel Engineering supported a major renewable developer with interconnection studies for multiple solar and wind projects in a constrained ERCOT corridor. We performed detailed load flow, short-circuit, and stability analyses to evaluate high inverter-based resource penetration scenarios. Sensitivity studies identified hosting capacity limits and required mitigation measures. The final study package achieved ISO approval and enabled phased project deployment with reduced technical risk.',
        link: '/power-system-study-case-studies',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/36988c7b-c24f-4e4d-91b6-f0fd406661fc-1920w.png',
      },
      {
        title: 'Hybrid Solar & Wind Farm Electrical Design and System Studies',
        desc: 'For an independent power producer in the Southwest U.S., Keentel delivered full electrical design and compliance studies for a combined solar and wind facility. Our team designed MV collector systems, developed POI substation interfaces, and performed protection coordination and grid code compliance analysis. Voltage drop, reactive power performance, and ride-through requirements were validated. The project received on-time interconnection approval with an optimized, loss-efficient design.',
        link: '/power-system-study-case-studies',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/4f895de6-666e-41fb-a2dc-f877c3d37929-1920w.png',
      },
      {
        title: 'Reactive Power Compensation & Capacitor Bank Optimization (MISO)',
        desc: 'A transmission-connected industrial facility experienced poor power factor and voltage regulation issues. Keentel conducted reactive power compensation studies to optimize capacitor bank sizing, placement, and switching strategies. Multiple operating conditions were evaluated to avoid resonance and overcompensation risks. The final solution improved voltage performance, reduced utility penalties, and delivered a cost-effective, scalable compensation design.',
        link: '/power-system-study-case-studies',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ecd37f5c-72d7-412f-ba6d-6468fb016d94-1920w.png',
      },
    ],
    ctaText: 'See More Case Studies',
    ctaLink: '/power-system-study-case-studies',
  },

  faqs: {
    heading: 'Frequently Asked Questions',
    items: [
      {
        q: 'Which power system studies does Keentel perform?',
        a: 'Keentel performs load flow, contingency, short-circuit and duty analysis, protection coordination, arc-flash, harmonic and power quality studies, motor starting, voltage drop, transient stability where applicable, and grounding studies. We tailor the study set to the system voltage class (EHV, HV, or MV), facility type, and specific regulatory and utility requirements.',
      },
      {
        q: 'Why are short-circuit studies critical for EHV, HV, and MV systems?',
        a: 'Short-circuit studies confirm equipment interrupting ratings and momentary withstand capabilities. They also define protective device settings, ensure breaker duty compliance, and reduce the risk of catastrophic equipment failure. These studies are often required for utility approval and safe long-term operation.',
      },
      {
        q: 'What is the difference between coordination studies and arc-flash studies?',
        a: 'Coordination studies ensure protective devices operate selectively and quickly for electrical faults. Arc-flash studies estimate incident energy exposure and define PPE boundaries and equipment labeling requirements. Because coordination directly impacts arc-flash results, Keentel typically performs these as an integrated workflow to balance safety and system selectivity.',
      },
      {
        q: 'How does Keentel evaluate harmonics and power quality?',
        a: 'We model harmonic sources such as inverters, variable frequency drives, and large rectifiers, calculate distortion levels at key buses, and verify compliance with applicable limits, often IEEE 519 or specific utility requirements. If mitigation is required, we evaluate filter options, transformer configurations, and system impedance changes to develop a practical solution.',
      },
      {
        q: 'Can Keentel study weak grid and inverter-based resource interconnections?',
        a: 'Yes. Weak grid conditions affect voltage stability, fault response, and protection performance. Keentel evaluates short-circuit ratio, reactive power margin, voltage regulation, and control interactions to recommend mitigation such as STATCOMs, synchronous condensers, or tuned control strategies to ensure stable and compliant operation.',
      },
      {
        q: 'What data does Keentel need to begin a power system study?',
        a: 'Typically required information includes one-line diagrams, equipment ratings, transformer impedances and tap settings, cable and conductor data, protective device details, load profiles, generator or inverter parameters, and utility source equivalents. Keentel can also work with partial data early in a project and refine models as detailed design progresses.',
      },
      {
        q: 'How do you ensure study results are defensible for utility and ISO review?',
        a: 'Keentel documents assumptions, model sources, and validation checks throughout the analysis process. We provide clear base case descriptions, sensitivity runs, and traceable references to equipment data sheets. Deliverables are formatted to match common utility and ISO expectations to reduce review cycles and approval delays.',
      },
      {
        q: 'How are study results converted into actionable design changes?',
        a: 'We translate study results into specific design actions such as breaker upgrades, relay setting updates, CT and PT changes, cable sizing adjustments, reactive compensation sizing, filter selection, or layout modifications. The true value is not just the report itself, but the practical engineering decisions supported by detailed analysis.',
      },
    ],
  },

  blogs: {
    heading: 'Power System Studies - Blogs',
    items: [
      {
        title: 'ASPEN OneLiner V15 Guide for Protection Modeling',
        meta: 'By SANDIP R PATEL • May 3, 2026',
        excerpt: 'Master ASPEN OneLiner V15 for protection system modeling, relay coordination, and fault analysis. Learn advanced power system workflows today.',
        link: '/aspen-oneliner-relay-coordination',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ChatGPT+Image+May+5-+2026-+01_14_48+PM-1920w.webp',
      },
      {
        title: 'PSCAD (EMT) vs RMS Simulation: Choosing the Right Tool for Modern Power System Studies',
        meta: 'By SANDIP R PATEL • April 22, 2026',
        excerpt: 'Compare RMS vs EMT simulation using PSCAD. Learn when to use each for power system studies, inverter modeling, and grid stability.',
        link: '/rms-vs-emt-simulation-pscad-guide',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Screenshot+2026-04-21+182620-ad713666-1920w.png',
      },
      {
        title: 'Advanced PSCAD Modeling and EMT Simulation for Power System Studies',
        meta: 'By SANDIP R PATEL • April 22, 2026',
        excerpt: 'Explore PSCAD modeling, EMT simulation, and grid interconnection studies with expert insights. Learn advanced power system analysis techniques today.',
        link: '/pscad-modeling-power-system-studies',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Screenshot+2026-04-21+175626-1920w.png',
      },
      {
        title: 'Advanced Power System Analysis Using ASPEN Software',
        meta: 'By SANDIP R PATEL • April 17, 2026',
        excerpt: 'Optimize grids with ASPEN Power System Analysis, OneLiner and planning tools. Improve protection coordination and compliance.',
        link: '/aspen-power-system-analysis',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/Screenshot+2026-04-16+162106+%281%29-1920w.webp',
      },
      {
        title: 'MISO Planning Modeling Manual: A Complete Technical Guide',
        meta: 'By SANDIP R PATEL • April 17, 2026',
        excerpt: 'Master the MISO Planning Modeling Manual with expert insights on power system modeling, compliance, and generator requirements.',
        link: '/miso-planning-modeling-manual-guide',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/ChatGPT+Image+Apr+17-+2026-+12_17_30+PM-1920w.png',
      },
      {
        title: 'ERCOT Data & Modeling Requirements (2026): A Complete Engineering Guide',
        meta: 'By SANDIP R PATEL • April 16, 2026',
        excerpt: 'Master ERCOT 2026 data and modeling requirements. Learn steady state, dynamic modeling, validation, and compliance strategies.',
        link: '/ercot-data-modeling-requirements-2026-guide',
        image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/3149fd6b-bcfc-4f36-a05b-86e5d8690aa0-1920w.png',
      },
    ],
  },

  download: {
    heading: 'Download Power System Studies flyer',
    subheading: 'Please click the Download button to get our Power System Studies flyer',
    ctaText: 'Download The Flyer',
    ctaLink: 'https://irp.cdn-website.com/1253891b/files/uploaded/advance+power+system.pdf',
  },

  cta: {
    heading: 'Ensure Your Electrical Infrastructure Is Safe, Compliant, and Future-Ready',
    subheading: 'Speak with an engineer experienced in POI design, utility coordination, and interconnection approvals.',
    primaryCta: { text: 'Schedule A Consultation', link: 'https://calendly.com/keentel-engineering/15min' },
    secondaryCta: { text: 'Speak With an Engineer', link: 'tel:813-389-7871' },
    image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/e857ee18-180f-48b2-bfa8-38daf048d05c-1920w.png',
  },
}
