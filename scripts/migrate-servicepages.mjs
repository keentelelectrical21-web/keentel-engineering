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
    _id: 'servicePage-power-system-studies',
    _type: 'servicePage',
    title: 'EHV, HV, MV Power System Studies',
    slug: { _type: 'slug', current: 'power-system-studies' },

    heroHeading: 'Advanced Power System Studies Delivered by HV, MV & EHV Specialists',
    heroSubheading: 'Keentel Engineering provides comprehensive power system studies nationwide, empowering utilities, industrial plants, renewable projects, and commercial facilities with reliable, data-driven solutions.',
    heroCtaText: 'Schedule a Consultation',
    heroCtaLink: 'https://calendly.com/keentel-engineering/15min',
    heroCertImage: '/images/cert-logos.png',
    heroBgImage: '/videos/power-system-hero.mp4',

    overviewParagraphs: [
      'Our licensed professional engineers perform detailed MV and HV system studies, including transmission planning, load flow analysis, short-circuit studies, harmonic assessments, protection coordination, and NERC compliance studies. We utilize industry-leading platforms such as PSS®E, PSCAD, DIgSILENT PowerFactory, and ETAP to ensure technical precision and regulatory alignment.',
      'With more than 30 years of engineering expertise, we deliver accurate system modeling, compliance-ready technical reports, and actionable recommendations that enhance electrical reliability and safeguard high-value infrastructure.',
    ],
    overviewBullets: [
      'Nationwide engineering support',
      'Utility-grade simulation tools',
      'IEEE, NERC & OSHA compliance',
      'Trusted by utilities, EPC firms, and industrial professionals',
    ],
    overviewImage: '/images/services/power-system-studies/overview-engineers.png',

    whyChooseHeading: 'Why Utilities and Renewable Owners Choose Keentel Engineering',
    whyChooseItems: [
      { title: '30+ Years of Specialized Experience in high-voltage power engineering' },
      { title: 'Certified Power System Engineers with deep technical expertise' },
      { title: 'Nationwide Project Support across utility, industrial, and renewable sectors' },
      { title: 'Advanced Simulation & Modeling Tools for precise system analysis' },
      { title: 'Compliance-Focused Reporting aligned with IEEE, NERC, NFPA, and OSHA standards' },
    ],
    whyChooseClosing: 'When system reliability and safety are mission-critical, organizations trust Keentel Engineering to deliver engineering clarity and proven results.',
    whyChooseCtaText: 'Learn More About Us',
    whyChooseCtaLink: '/about',

    studiesHeading: 'Our Power System Study Services',
    studiesSubheading: 'We provide comprehensive electrical system studies designed to improve safety, ensure compliance, and optimize performance across HV, MV, and EHV networks.',
    studyItems: [
      { title: 'Transmission Planning', desc: 'Support grid expansion through power flow, contingency, and stability studies to identify constraints and improve system reliability.', link: 'https://keentelengineering.com/service/power-system-studies/transmission-planning-studies', image: '/images/services/power-system-studies/study-transmission-planning.png' },
      { title: 'Load Flow Analysis', desc: 'Evaluate voltage stability, load distribution, and losses to ensure efficient power performance during normal and peak demand.', link: 'https://keentelengineering.com/service/power-system-studies/load-flow-analysis-services', image: '/images/services/power-system-studies/study-load-flow.webp' },
      { title: 'Short Circuit Studies', desc: 'Determine fault current levels, validate equipment ratings, and verify protection devices operate correctly during abnormal system events.', link: 'https://keentelengineering.com/service/power-system-studies/short-circuit-analysis-power-system', image: '/images/services/power-system-studies/study-short-circuit.jpg' },
      { title: 'Protective Coordination', desc: 'Optimize relay and breaker settings using time-current analysis to isolate faults quickly and minimize system disruption.', link: 'https://keentelengineering.com/services/power-system-studies/protective-device-coordination-studies', image: '/images/services/power-system-studies/study-protection-coordination.jpg' },
      { title: 'Harmonic Analysis', desc: 'Detect waveform distortion from inverter sources and nonlinear loads through harmonic analysis, resonance evaluation, and mitigation studies.', link: 'https://keentelengineering.com/service/power-system-studies/harmonic-analysis-power-systems', image: '/images/services/power-system-studies/study-harmonic-analysis.jpg' },
      { title: 'Grounding Protection', desc: 'Reduce step and touch voltage risks through grounding studies, fault analysis, and protection performance evaluation for safer system operation.', link: 'https://keentelengineering.com/service/power-system-studies/grounding-system-studies', image: '/images/services/power-system-studies/study-grounding.png' },
    ],

    processHeading: 'High Voltage Power System Study Execution Framework',
    processSubheading: 'Our Power System Studies Process',
    processSubtitle: 'Transmission-Level Modeling Using PSS®E, PSCAD, ETAP & DIgSILENT',
    processDescription: 'Keentel Engineering performs HV and EHV power system studies using a structured, multi-platform methodology aligned with ISO interconnection standards, IEEE requirements, and NERC reliability criteria. Our execution framework ensures modeling accuracy, cross-software validation, and compliance-ready deliverables from transmission-level analysis to detailed facility protection.',
    processSteps: [
      { title: 'Scope Definition & Compliance Alignment', desc: 'Every project begins with a clearly defined technical framework and study matrix.', bullets: ['Define POI-to-grid limits', 'Set N-0, N-1, N-1-1 cases', 'Model peak and light load scenarios', 'Identify weak grid / low SCR cases', 'Align with IEEE, NERC, ANSI/IEC standards', 'Assign appropriate study software'], image: '/images/services/power-system-studies/process-scope-definition.png' },
      { title: 'Structured Data Collection & Model Integrity', desc: 'Accurate studies require verified inputs and documented assumptions.', bullets: ['Utility base case files (.sav, .raw, .dyr)', 'Transformer ratings, impedance, vector group', 'Line R/X/B data and thermal ratings', 'Generator/inverter dynamic models', 'Breaker duties, CT/PT data, relay settings', 'Ground grid layout and soil parameters'], image: '/images/services/power-system-studies/process-data-collection.png' },
      { title: 'Transmission-Level RMS & EMT Modeling', desc: 'Using PSS®E, DIgSILENT, and PSCAD, we validate system behavior under real conditions.', bullets: ['Load flow and voltage validation', 'Reactive margin and loading checks', 'N-1 / N-1-1 contingency analysis', 'POI short-circuit screening', 'Transient stability simulations', 'EMT modeling for weak grid and fast transients'], image: '/images/services/power-system-studies/process-rms-emt.png' },
      { title: 'Detailed Short Circuit & Protection Coordination', desc: 'Facility-level integrity is validated using ETAP or DIgSILENT.', bullets: ['ANSI / IEC short-circuit calculations (3ϕ, SLG, LL, DLG)', 'Breaker interrupting and withstand duty verification', 'Protection coordination and TCC curve development', 'Selectivity and grading margin confirmation', 'HV, MV, and LV relay philosophy validation'], image: '/images/services/power-system-studies/process-short-circuit.png' },
      { title: 'Arc Flash, Harmonics & Grounding Analysis', desc: 'Safety and power quality are evaluated using realistic clearing times and operating conditions.', bullets: ['Arc flash study per IEEE 1584', 'Incident energy and PPE category determination', 'Harmonic distortion and resonance analysis (IEEE 519)', 'Frequency scan and filter adequacy review', 'Ground grid step and touch voltage verification'], image: '/images/services/power-system-studies/process-arc-flash.png' },
      { title: 'Cross-Platform Validation & QA/QC', desc: 'Transmission-grade studies require final reconciliation and independent review prior to issuance.', bullets: ['Cross-verify transformer impedance, fault levels, and X/R ratios', 'Confirm RMS and EMT model consistency', 'Resolve identified variances', 'Implement mitigation measures', 'Issue version-controlled, compliance-ready reports'], image: '/images/services/power-system-studies/process-qaqc.png' },
    ],
    processCtaText: 'See Detailed Process',
    processCtaLink: 'https://keentelengineering.com/power-system-study-process',

    industriesHeading: 'Industries We Support',
    industriesSubheading: 'Keentel Engineering delivers power system studies for complex electrical environments across multiple sectors:',
    industryItems: [
      { title: 'Utilities & Transmission Operators', link: 'https://keentelengineering.com/industries/electric-utilities-transmission', image: '/images/services/power-system-studies/industry-utilities.jpg' },
      { title: 'Renewable Energy Developers', link: 'https://keentelengineering.com/industries/renewable-interconnection-engineering', image: '/images/services/power-system-studies/industry-renewable.jpg' },
      { title: 'Industrial & Manufacturing Facilities', link: 'https://keentelengineering.com/industries/industrial-power-engineering', image: '/images/services/power-system-studies/industry-industrial.webp' },
      { title: 'Oil, Gas & Mining Operations', link: 'https://keentelengineering.com/industries/oil-gas-mining', image: '/images/services/power-system-studies/industry-oil-gas.jpg' },
      { title: 'Data Centers & Commercial Infrastructure', link: 'https://keentelengineering.com/industries/data-center-electrical', image: '/images/services/power-system-studies/industry-data-center.jpg' },
    ],

    caseStudiesHeading: 'Case Studies',
    caseStudiesSubheading: 'Harmonic & Power System Studies by Keentel Engineering',
    caseStudyItems: [
      { title: 'Grid Interconnection & Renewable Penetration Analysis (ERCOT)', desc: 'Keentel Engineering supported a major renewable developer with interconnection studies for multiple solar and wind projects in a constrained ERCOT corridor. We performed detailed load flow, short-circuit, and stability analyses to evaluate high inverter-based resource penetration scenarios. Sensitivity studies identified hosting capacity limits and required mitigation measures.', link: 'https://keentelengineering.com/power-system-study-case-studies', image: '/images/services/power-system-studies/case-ercot.png' },
      { title: 'Hybrid Solar & Wind Farm Electrical Design and System Studies', desc: 'For an independent power producer in the Southwest U.S., Keentel delivered full electrical design and compliance studies for a combined solar and wind facility, including MV collector systems, POI substation interfaces, and protection coordination.', link: 'https://keentelengineering.com/power-system-study-case-studies', image: '/images/services/power-system-studies/case-solar-wind.png' },
      { title: 'Reactive Power Compensation & Capacitor Bank Optimization (MISO)', desc: 'A transmission-connected industrial facility experienced poor power factor and voltage regulation issues. Keentel conducted reactive power compensation studies to optimize capacitor bank sizing, placement, and switching strategies.', link: 'https://keentelengineering.com/power-system-study-case-studies', image: '/images/services/power-system-studies/case-miso.png' },
    ],
    caseStudiesCtaText: 'See More Case Studies',
    caseStudiesCtaLink: 'https://keentelengineering.com/power-system-study-case-studies',

    faqHeading: 'Frequently Asked Questions',
    faqs: [
      { question: 'Which power system studies does Keentel perform?', answer: 'Keentel performs load flow, contingency, short-circuit and duty analysis, protection coordination, arc-flash, harmonic and power quality studies, motor starting, voltage drop, transient stability where applicable, and grounding studies.' },
      { question: 'Why are short-circuit studies critical for EHV, HV, and MV systems?', answer: 'Short-circuit studies confirm equipment interrupting ratings and momentary withstand capabilities. They also define protective device settings, ensure breaker duty compliance, and reduce the risk of catastrophic equipment failure.' },
      { question: 'What is the difference between coordination studies and arc-flash studies?', answer: 'Coordination studies ensure protective devices operate selectively and quickly for electrical faults. Arc-flash studies estimate incident energy exposure and define PPE boundaries and equipment labeling requirements.' },
      { question: 'How does Keentel evaluate harmonics and power quality?', answer: 'We model harmonic sources such as inverters, variable frequency drives, and large rectifiers, calculate distortion levels at key buses, and verify compliance with applicable limits, often IEEE 519 or specific utility requirements.' },
      { question: 'Can Keentel study weak grid and inverter-based resource interconnections?', answer: 'Yes. Weak grid conditions affect voltage stability, fault response, and protection performance. Keentel evaluates short-circuit ratio, reactive power margin, voltage regulation, and control interactions.' },
      { question: 'What data does Keentel need to begin a power system study?', answer: 'Typically required information includes one-line diagrams, equipment ratings, transformer impedances and tap settings, cable and conductor data, protective device details, load profiles, generator or inverter parameters, and utility source equivalents.' },
      { question: 'How do you ensure study results are defensible for utility and ISO review?', answer: 'Keentel documents assumptions, model sources, and validation checks throughout the analysis process, with clear base case descriptions, sensitivity runs, and traceable references.' },
      { question: 'How are study results converted into actionable design changes?', answer: 'We translate study results into specific design actions such as breaker upgrades, relay setting updates, CT and PT changes, cable sizing adjustments, reactive compensation sizing, filter selection, or layout modifications.' },
    ],

    blogsHeading: 'Power System Studies – Blogs',
    blogItems: [],

    downloadHeading: 'Download Power System Studies flyer',
    downloadSubheading: 'Please click the Download button to get our Power System Studies flyer',
    downloadCtaText: 'Download The Flyer',
    downloadCtaLink: '/files/advance-power-system.pdf',

    ctaHeading: 'Ensure Your Electrical Infrastructure Is Safe, Compliant, and Future-Ready',
    ctaSubheading: 'Speak with an engineer experienced in POI design, utility coordination, and interconnection approvals.',
    ctaPrimaryText: 'Schedule A Consultation',
    ctaPrimaryLink: 'https://calendly.com/keentel-engineering/15min',
    ctaSecondaryText: 'Speak With an Engineer',
    ctaSecondaryLink: 'tel:813-389-7871',
    ctaImage: '/images/services/power-system-studies/final-cta-engineer.jpeg',

    metaTitle: 'EHV, HV, MV Power System Studies | Keentel Engineering',
    metaDescription: 'Comprehensive power system studies including load flow, short-circuit, protection coordination, harmonic, and grounding studies for utilities, industrial, and renewable clients nationwide.',
    metaKeywords: 'power system studies, load flow analysis, short circuit studies, protection coordination, harmonic analysis, grounding studies, NERC compliance',
  },

  {
    _id: 'servicePage-substation-design',
    _type: 'servicePage',
    title: 'Substation Design Services',
    slug: { _type: 'slug', current: 'substation-design' },

    heroHeading: 'Substation Design, Protection, SCADA & Power System Studies',
    heroSubheading: 'Safe, reliable, and future-ready substation solutions engineered for grid performance, automation, and compliance.',
    heroCtaText: 'Schedule A Call',
    heroCtaLink: 'https://calendly.com/keentel-engineering/15min',
    heroCertImage: '/images/cert-logos.png',
    heroBgImage: '/videos/power-system-hero.mp4',

    overviewParagraphs: [
      'We provide specialized substation design services, including substation electrical engineering, protection & control, SCADA, and power system studies for utilities, renewable energy developers, EPCs, and industrial clients across the United States. Our services focus exclusively on electrical systems, digital substations, communications, and grid integration, ensuring technically sound designs that meet modern operational and cybersecurity expectations.',
      'Our team delivers accurate, compliant, and review-ready substation design packages, engineered for long-term reliability, secure operations, and seamless integration with utility and ISO control environments.',
    ],
    overviewBullets: [
      'Licensed U.S. Professional Electrical Engineers with nationwide substation engineering coverage',
      'Proven experience supporting utility EMS/DMS integration and ISO/RTO interfaces',
      'Deep expertise in digital substation design, SCADA integration, and NERC CIP-aware electrical engineering',
      'Trusted partner for utility-grade substation design services, EPCs, and energy developers nationwide',
    ],
    overviewImage: '/images/services/substation-design/expertise-ee.png',

    whyChooseHeading: 'Why Choose Keentel Engineering?',
    whyChooseItems: [
      { title: '30 Years of Experience — three decades of hands-on project delivery in substation layout design, electrical and civil engineering, relay protection, and grid-tie solutions.' },
      { title: 'Quality with Innovation — applying AutoCAD 3D, BIM modeling, and system-level substation design practices for clash-free coordination.' },
      { title: 'Attention to Detail — engineering every detail from grounding grid studies to relay protection settings, with rigorous QA/QC for IEEE, NFPA, and ISO/TSO compliance.' },
    ],
    whyChooseClosing: 'At Keentel Engineering, we take pride in being the go-to electrical power engineering firm for power and utility system planning, substation design, protection, control, and power system analysis.',
    whyChooseCtaText: 'Learn More About Us',
    whyChooseCtaLink: '/about',

    studiesHeading: 'Types of Substations We Design',
    studiesSubheading: 'Utility-grade substation design services, including electrical, protection, and automation engineering across all voltage levels and applications.',
    studyItems: [
      { title: 'Transmission Substations (69 kV – 500 kV)', desc: 'High-voltage transmission substation designs engineered for bulk power transfer, N-1 reliability, and grid stability.', link: '', image: '/images/services/substation-design/type-transmission.png' },
      { title: 'Distribution Substations (4 kV – 35 kV)', desc: 'Medium-voltage distribution substation designs supporting utility and municipal distribution systems.', link: '', image: '/images/services/substation-design/type-distribution.png' },
      { title: 'Solar & Wind Collector Substations', desc: 'Optimized collector substation electrical and protection designs for inverter-based renewable resources.', link: '', image: '/images/services/substation-design/type-solar-wind.png' },
      { title: 'BESS Interconnections', desc: 'Substation designs supporting battery energy storage system interconnections and fast-response operation.', link: '', image: '/images/services/substation-design/type-bess.png' },
      { title: 'Industrial & Commercial Substations', desc: 'Reliable substation designs serving data centers, manufacturing plants, and campus-style loads.', link: '', image: '/images/services/substation-design/type-industrial.png' },
      { title: 'GIS & AIS Substations', desc: 'Compact GIS designs and traditional AIS substations engineered for operational flexibility and footprint constraints.', link: '', image: '/images/services/substation-design/type-gis-ais.png' },
      { title: 'Urban Compact & Space-Constrained Substations', desc: 'Electrically optimized urban substation designs developed for dense environments and restricted footprints.', link: '', image: '/images/services/substation-design/type-urban.png' },
      { title: 'Brownfield Upgrades & Retrofit Projects', desc: 'Substation modernization and retrofit designs supporting equipment replacement and protection upgrades.', link: '', image: '/images/services/substation-design/type-brownfield.png' },
      { title: 'Mobile & Temporary Substations', desc: 'Rapid-deployment mobile and temporary substation solutions supporting emergency response and restoration.', link: '', image: '/images/services/substation-design/type-mobile.png' },
    ],

    processHeading: 'Substation Design Process',
    processSubheading: 'Step-by-Step Workflow',
    processSubtitle: 'A clear, step-by-step substation design and engineering workflow aligned with utility standards, constructability, and long-term operational reliability.',
    processDescription: 'End-to-end substation design services, including substation electrical engineering, protection & control, SCADA, and power system studies — from early feasibility through Issue-for-Construction (IFC) packages and commissioning support.',
    processSteps: [
      { title: 'Requirements & Project Definition', desc: 'Evaluation of load growth, voltage class, utility design standards, permitting requirements, and protection philosophy.', bullets: [], image: '/images/services/substation-design/step-01.png' },
      { title: 'Site Analysis & Feasibility', desc: 'Site-specific geotechnical review, grounding constraints, access planning, EMF considerations, and early regulatory coordination.', bullets: [], image: '/images/services/substation-design/step-02.png' },
      { title: 'Conceptual Design', desc: 'Development of preliminary substation layouts, bus configurations, telecommunications architecture, and early-stage power system modeling.', bullets: [], image: '/images/services/substation-design/step-03.png' },
      { title: 'Detailed Engineering', desc: 'Integrated substation electrical engineering, civil and structural design, grounding, and protection & control coordination.', bullets: [], image: '/images/services/substation-design/step-04.png' },
      { title: 'Calculations & IFC Drawings', desc: 'Preparation of construction-ready calculations, power system studies, IFC drawings, and detailed bills of material.', bullets: [], image: '/images/services/substation-design/step-05.png' },
      { title: 'QA / QC Peer Review', desc: 'Independent QA/QC reviews, compliance verification, and cross-discipline validation aligned with utility and regulatory requirements.', bullets: [], image: '/images/services/substation-design/step-06.png' },
      { title: 'IFC Submission & Permitting', desc: 'Formal utility submissions, authority coordination, comment resolution, and final design approvals.', bullets: [], image: '/images/services/substation-design/step-07.png' },
      { title: 'Construction & Commissioning Support', desc: 'Engineering support for RFIs, field clarifications, relay testing, commissioning activities, and energization coordination.', bullets: [], image: '/images/services/substation-design/step-08.png' },
    ],
    processCtaText: 'Schedule A Call',
    processCtaLink: 'https://calendly.com/keentel-engineering/15min',

    industriesHeading: 'Industries We Serve',
    industriesSubheading: 'We partner with stakeholders across the power sector and critical infrastructure to deliver substation designs that align with regulatory, operational, and commercial objectives.',
    industryItems: [
      { title: 'Utilities & Municipalities', link: '', image: '/images/services/substation-design/ind-utilities.png' },
      { title: 'Independent Power Producers (IPP)', link: '', image: '/images/services/substation-design/ind-ipp.png' },
      { title: 'Renewable Developers (Solar, Wind, BESS)', link: '', image: '/images/services/substation-design/ind-renewable.png' },
      { title: 'EPC Contractors', link: '', image: '/images/services/substation-design/ind-epc.png' },
      { title: 'Industrial Facilities', link: '', image: '/images/services/substation-design/ind-industrial.png' },
      { title: 'Data Centers & Campuses', link: '', image: '/images/services/substation-design/ind-datacenter.png' },
    ],

    caseStudiesHeading: 'Substation Engineering Case Studies',
    caseStudiesSubheading: 'Real-world substation engineering delivered across rural electrification, smart cities, renewable energy, and space-constrained urban environments.',
    caseStudyItems: [
      { title: '110 kV Outdoor Grid Substation – Rural Electrification', desc: 'Designed to support long-distance rural electrification across high-temperature, high-wind, and dust-prone environments with minimal maintenance dependency. Stack: PSS®E, ETAP, PSCAD, SKM.', link: '', image: '/images/services/substation-design/case-01.png' },
      { title: 'Upgrade of Aging Indoor Substation – Smart City Infrastructure', desc: 'Retrofit of an aging indoor substation to improve capacity, reliability, and digital monitoring capabilities without full system shutdown. Stack: ETAP, SKM, DIgSILENT PowerFactory.', link: '', image: '/images/services/substation-design/case-02.png' },
      { title: 'GIS-Based Urban Substation – Space-Constrained Deployment', desc: 'Fully enclosed gas-insulated substation solution optimized for metropolitan deployment. Stack: PSCAD, ETAP, CDEGS.', link: '', image: '/images/services/substation-design/case-03.png' },
      { title: '230 kV Renewable POI Collector Substation', desc: 'Point of Interconnection substation for renewable energy evacuation into the transmission network. Stack: PSS®E, PSCAD, PowerWorld.', link: '', image: '/images/services/substation-design/case-04.png' },
      { title: 'Battery Energy Storage System (BESS) Substation – 138 kV', desc: 'BESS interconnection substation for peak shaving, load balancing, and grid support services. Stack: ETAP, PSCAD, DIgSILENT.', link: '', image: '/images/services/substation-design/case-05.png' },
      { title: 'Renewable Energy Collector Substation – Solar PV (345/34.5 kV)', desc: 'Collector infrastructure to aggregate distributed solar PV generation into a centralized transmission interface. Stack: PSS®E, ETAP, SKM.', link: '', image: '/images/services/substation-design/case-06.png' },
      { title: 'Medium-Voltage Distribution Substation – Urban Load Growth (115/35 kV)', desc: 'Strengthened medium-voltage distribution capacity to support residential and commercial expansion. Stack: ETAP, SKM, PowerFactory.', link: '', image: '/images/services/substation-design/case-07.png' },
      { title: '230 kV High-Voltage Transmission Substation – Greenfield Project', desc: 'New transmission-level substation for regional grid strengthening and future scalability. Stack: PSS®E, PSCAD, ETAP.', link: '', image: '/images/services/substation-design/case-08.png' },
    ],
    caseStudiesCtaText: '',
    caseStudiesCtaLink: '',

    faqHeading: 'Frequently Asked Questions',
    faqs: [
      { question: 'What are substation services, and why are they important in power systems?', answer: 'Substation services include the design, engineering, protection, automation, and analysis of facilities that transform voltage levels, control power flow, and protect electrical networks.' },
      { question: 'What does a substation designer do?', answer: 'A substation designer develops detailed engineering drawings and technical documentation required to construct or upgrade substations, including general arrangements, equipment layouts, wiring diagrams, control schematics, material lists, and cable schedules.' },
      { question: 'What are the different types of substations?', answer: 'Transmission Substations step up/down voltage for long-distance transmission. Distribution Substations deliver power to end-users at lower voltages. Switching Substations perform switching/protection functions. Collector Substations aggregate power from renewable sources.' },
      { question: 'What are the key components of a substation?', answer: 'Power transformers, circuit breakers, disconnect switches, busbars, protection relays, surge or lightning arresters, and control/protection/SCADA systems.' },
      { question: 'What are the primary considerations when designing a substation?', answer: 'Voltage level, load growth, fault levels, site conditions, grounding, safety, environmental constraints, constructability, and compliance with IEEE, NEC, NESC, IEC, and utility-specific requirements.' },
      { question: 'What is the difference between AIS and GIS substations?', answer: 'AIS (Air-Insulated Substations) use air as the insulating medium and require larger footprints at lower cost. GIS (Gas-Insulated Substations) use SF6 for compact designs in urban or space-constrained sites at higher initial cost.' },
      { question: 'How is a substation layout determined?', answer: 'Layout is determined based on available space, voltage class, bus configuration, reliability requirements, safety clearances, and operational flexibility using single-line diagrams and constructability reviews.' },
      { question: 'What standards are followed in substation design?', answer: 'IEEE standards (e.g., IEEE 80 for grounding), IEC standards (e.g., IEC 61850), NEC/NESC requirements, and local utility/ISO/RTO standards.' },
      { question: 'How is the substation voltage level determined?', answer: 'Voltage levels are selected based on system requirements, transmission distance, load demand, and interconnection constraints. Common levels include 69 kV, 115 kV, 230 kV, and 500 kV.' },
      { question: 'What are the considerations for grounding in a substation?', answer: 'Grounding design evaluates soil resistivity, ground grid resistance, and step-and-touch voltage limits per IEEE 80 and utility standards.' },
      { question: 'How is short-circuit current calculated for substation design?', answer: 'Calculated using power system analysis software such as ETAP, PSS®E, or PSCAD, considering system impedance, transformer ratings, and network configuration.' },
      { question: 'What is substation protection and control (P&C)?', answer: 'P&C systems monitor substation conditions and detect, isolate, and clear faults using protection relays, circuit breakers, and automation logic.' },
      { question: 'What are common protection schemes used in substations?', answer: 'Differential protection for transformers, distance and overcurrent protection for transmission lines, and busbar protection schemes for high-reliability substations.' },
      { question: 'How are protection relays selected for a substation?', answer: 'Relay selection is based on voltage level, fault characteristics, system configuration, and utility standards. Common platforms include SEL, GE, ABB, and Siemens.' },
      { question: 'What is the role of SCADA in substation design?', answer: 'SCADA provides remote monitoring, control, and data acquisition, improving operational visibility and reliability through utility EMS/DMS integration.' },
      { question: 'What is the typical timeline for constructing a substation?', answer: 'Substation projects typically range from 12 to 36 months depending on voltage level, site conditions, equipment lead times, permitting, and utility review cycles.' },
      { question: 'What are the key steps in commissioning a substation?', answer: 'Visual inspections, functional testing of relays and breakers, SCADA and communication testing, and energization/performance verification.' },
      { question: 'What safety precautions are taken during substation construction?', answer: 'PPE requirements, grounding practices, arc-flash assessments, lockout/tagout procedures, and compliance with OSHA and utility safety programs.' },
      { question: 'How are substations monitored and maintained?', answer: 'Substations are monitored through SCADA systems and maintained using routine inspections, testing, and condition-based maintenance.' },
      { question: 'Why is periodic testing important in substations?', answer: 'Periodic testing verifies equipment performance, identifies degradation early, and ensures continued compliance with reliability and safety standards.' },
      { question: 'What is the role of thermal imaging in substation maintenance?', answer: 'Thermal imaging identifies abnormal heating in transformers, breakers, and connections, helping prevent failures and unplanned outages.' },
      { question: 'What is a digital substation?', answer: 'A digital substation uses IEC 61850-based communication, replacing conventional copper wiring with fiber-optic networks to improve data accuracy and scalability.' },
      { question: 'How are renewable energy sources integrated into substation designs?', answer: 'Renewable resources are connected through collector systems and step-up substations, with designs addressing inverter behavior, protection coordination, harmonics, and grid-code compliance.' },
      { question: 'Where can I find companies specializing in electric substation protection and control engineering?', answer: 'Keentel Engineering specializes in utility-grade substation protection and control engineering, including relay coordination, SCADA/RTU configuration, and control building integration for transmission, distribution, and renewable substations across the U.S.' },
    ],

    blogsHeading: 'Substation Design – Blogs',
    blogItems: [],

    downloadHeading: 'Download our Substation Design Services flyer',
    downloadSubheading: 'Please click the Download button to get our Substation Design Services flyer',
    downloadCtaText: 'Download The Flyer',
    downloadCtaLink: '/files/substation-design.pdf',

    ctaHeading: 'We Go Above and Beyond',
    ctaSubheading: 'We stay current on the latest utility and smart grid standards. Our engineers design substations that are built for future expansion, automation, and integration with digital relays, smart SCADA, and real-time monitoring systems.',
    ctaPrimaryText: 'Book Strategy Call',
    ctaPrimaryLink: 'https://calendly.com/keentel-engineering/15min',
    ctaSecondaryText: 'Get a Quote',
    ctaSecondaryLink: '/contact',
    ctaImage: '/images/services/power-system-studies/study-2.jpg',

    metaTitle: 'Substation Design Services | Keentel Engineering',
    metaDescription: 'Utility-grade substation design services including electrical engineering, protection & control, SCADA, and power system studies for transmission, distribution, and renewable substations.',
    metaKeywords: 'substation design, protection and control, SCADA, GIS substation, AIS substation, BESS interconnection, transmission substation',
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
