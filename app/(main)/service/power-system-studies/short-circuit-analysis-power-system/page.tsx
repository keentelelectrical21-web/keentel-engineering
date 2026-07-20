import type { Metadata } from 'next'
import PowerStudySpecialtyPage, { type PowerStudyConfig } from '@/components/service/PowerStudySpecialtyPage'

export const metadata: Metadata = { title: 'Short Circuit Studies & Fault Current Analysis | Keentel', description: 'Short circuit and electrical fault-current studies for breaker ratings, equipment duty, protection coordination, safety, and compliance.' }

const config: PowerStudyConfig = {
  eyebrow: 'Short Circuit Studies',
  title: 'Short Circuit Studies and Fault Current Analysis for',
  accent: 'Power System Safety',
  intro: 'Calculate maximum and minimum fault-current levels, verify equipment interrupting and withstand ratings, and establish reliable protection inputs for transmission, substation, renewable, industrial, and distribution systems.',
  heroImage: '/images/services/power-system-studies/Short Circuit Studies.webp',
  overviewTitle: 'Power System Short Circuit Analysis & Electrical Fault Studies',
  overview: ['Electrical systems must safely withstand faults caused by insulation failure, equipment damage, conductor contact, and other disturbances.', 'Keentel Engineering calculates fault currents throughout the network and verifies that breakers, transformers, cables, switchgear, and protective devices are appropriately rated and coordinated.'],
  overviewImage: '/images/services/power-system-studies/Detailed Short Circuit & Protection Coordination.jpg',
  proposalLabel: 'Request Fault Analysis',
  definitionTitle: 'What Are Short Circuit Studies?',
  definition: 'Short circuit studies evaluate the electrical response of a power system during fault conditions and determine the maximum and minimum currents equipment and protection systems must safely manage.',
  definitionPoints: ['Three-phase faults', 'Single line-to-ground faults', 'Line-to-line faults', 'Double line-to-ground faults', 'Symmetrical and asymmetrical current', 'Momentary and interrupting duty'],
  definitionImage: '/images/services/power-system-studies/study-short-circuit.jpg',
  importanceTitle: 'Importance of Short Circuit Studies',
  importance: 'Fault currents can rise to destructive levels within milliseconds. Accurate calculations allow engineers to select appropriate equipment, verify installed ratings, and coordinate protective devices before a real event occurs.',
  importancePoints: ['Determine maximum fault-current levels', 'Verify breaker interrupting ratings', 'Protect transformers, cables, and switchgear', 'Improve protection and system reliability'],
  risks: ['Equipment damage', 'Safety hazards', 'Underrated switchgear', 'Breaker interruption failure', 'Transformer stress', 'Improper relay coordination', 'Arc-flash exposure', 'Extended system outages'],
  methodologyTitle: 'Short Circuit Study Methodology',
  methodologyIntro: 'A disciplined model-to-duty workflow establishes reliable fault levels and converts results into equipment and protection decisions.',
  methodology: [
    { title: 'Power System Data Collection', image: '/images/services/power-system-studies/process-data-collection.png', text: 'Collect source, network, equipment, and configuration data required for reliable fault calculations.', points: ['Generator parameters', 'Transformer impedance', 'Line and cable impedance', 'Equipment ratings'] },
    { title: 'Power System Modeling', image: '/images/services/power-system-studies/Structured Data Collection & Model Integrity.webp', text: 'Represent transmission, generation, substations, distribution networks, loads, and grounding assumptions in the study model.', points: ['Network topology', 'Utility source equivalents', 'Transformer connections', 'Operating configurations'] },
    { title: 'Fault Current Calculations', image: '/images/services/power-system-studies/process-short-circuit.png', text: 'Calculate the current duties produced by applicable fault types at buses and equipment locations.', points: ['Symmetrical current', 'Asymmetrical current', 'Initial and momentary duty', 'Interrupting current'] },
    { title: 'Equipment Duty Evaluation', image: '/images/services/power-system-studies/Protective Coordination.jfif', text: 'Compare calculated duties with installed ratings and develop practical mitigation where limits are exceeded.', points: ['Breaker interrupting duty', 'Switchgear withstand', 'Transformer stress', 'Protection performance'] },
  ],
  applicationsTitle: 'Applications of Short Circuit Studies',
  applicationsIntro: 'Fault-current analysis supports equipment selection, protection engineering, interconnection, grounding, and operational safety.',
  applications: [
    { title: 'Transmission System Fault Studies', image: '/images/services/power-system-studies/Transmission Planning.jfif', text: 'Evaluate high-voltage equipment duty and grid-level fault contributions.', points: ['Breaker duties', 'Substation fault levels', 'Generator contribution', 'Protection coordination'] },
    { title: 'Substation Short Circuit Studies', image: '/images/services/substation-design/type-transmission.png', text: 'Verify bus, breaker, transformer, and protection performance during substation faults.', points: ['Bus fault currents', 'Breaker duty', 'Transformer contribution', 'Relay operation'] },
    { title: 'Renewable Energy Fault Studies', image: '/images/services/power-system-studies/industry-renewable.jpg', text: 'Assess inverter fault contribution and interconnection protection requirements.', points: ['Inverter contribution', 'POI fault levels', 'Grid coordination', 'Equipment verification'] },
    { title: 'Industrial Power System Studies', image: '/images/services/power-system-studies/industries-1.jpg', text: 'Support breaker selection, equipment protection, safe switchgear operation, and arc-flash studies.', points: ['Breaker selection', 'Equipment protection', 'Switchgear safety', 'Arc-flash inputs'] },
    { title: 'Industry Standards & Compliance', image: '/images/services/power-system-studies/Grounding Protection.jpg', text: 'Document calculations against applicable short-circuit and equipment-duty requirements.', points: ['ANSI / IEEE C37', 'IEEE 399', 'IEC 60909', 'NERC and utility criteria'] },
  ],
  toolsTitle: 'Software Tools Used for Short Circuit Studies',
  toolsIntro: 'Advanced platforms support utility, industrial, renewable, protection, and equipment-duty analysis using accepted ANSI and IEC methods.',
  tools: [['ETAP', 'Integrated analysis', 'Fault and protection studies'], ['SKM', 'Industrial systems', 'Short circuit and coordination'], ['DIgSILENT', 'PowerFactory', 'Utility and dynamic networks'], ['ASPEN', 'OneLiner', 'Transmission fault and relay analysis'], ['PSS®E', 'Transmission', 'High-voltage fault analysis'], ['PSCAD', 'EMT detail', 'Converter and transient faults']],
  benefitsTitle: 'Benefits of Short Circuit Studies',
  benefits: [['Improved System Safety', 'Prevent equipment failures and reduce risk created by excessive fault currents.'], ['Proper Equipment Selection', 'Specify breakers and switchgear with appropriate interrupting and withstand ratings.'], ['Protection System Coordination', 'Provide dependable fault-current inputs for relays, breakers, and selective coordination.'], ['Standards Compliance', 'Demonstrate alignment with IEEE, ANSI, IEC, NERC, and utility requirements.'], ['Support for Arc Flash Analysis', 'Supply accurate maximum and minimum fault currents for incident-energy calculations.']],
  whyPoints: ['30+ years of high-voltage engineering experience', 'Certified power-system engineers', 'Nationwide utility, industrial, and renewable support', 'Advanced simulation and modeling tools', 'Compliance-focused, traceable reporting'],
  contactText: 'When safety and system reliability are mission-critical, Keentel provides accurate electrical fault analysis and practical recommendations for new projects, upgrades, interconnections, and existing facilities.',
  faqs: [
    { q: 'What is a short circuit study?', a: 'A short circuit study calculates fault-current levels throughout an electrical network and compares those duties with equipment and protection requirements.' },
    { q: 'Why are short circuit studies necessary?', a: 'They verify that equipment can safely withstand and interrupt faults and provide reliable inputs for protection coordination and arc-flash analysis.' },
    { q: 'What is the most severe type of fault?', a: 'A three-phase fault commonly produces the highest symmetrical current, although grounding and system configuration can make other fault types controlling in specific locations.' },
    { q: 'What is symmetrical fault current?', a: 'Symmetrical fault current is the balanced AC component of fault current after the DC offset is excluded.' },
    { q: 'What is asymmetrical fault current?', a: 'Asymmetrical current includes the AC component and the decaying DC offset that affects momentary and interrupting equipment duty.' },
    { q: 'Why must circuit-breaker ratings be verified?', a: 'A breaker must interrupt the available fault current and withstand the associated momentary duty without failing.' },
    { q: 'What causes electrical faults?', a: 'Common causes include insulation breakdown, equipment failure, conductor contact, contamination, lightning, animals, construction damage, and operating errors.' },
    { q: 'Do renewable plants contribute fault current?', a: 'Yes. Inverter-based resources contribute controlled fault current that differs from synchronous generation and must be represented using appropriate models.' },
    { q: 'What equipment must withstand short circuit current?', a: 'Breakers, switchgear, transformers, cables, bus, generators, motors, CTs, and other connected equipment may be subject to fault-current duty.' },
    { q: 'What standards govern short circuit analysis?', a: 'Applicable criteria commonly include ANSI/IEEE C37, IEEE 399, IEC 60909, NFPA 70, NERC requirements, and utility standards.' },
    { q: 'What software is used?', a: 'Keentel uses ETAP, SKM PowerTools, DIgSILENT PowerFactory, ASPEN OneLiner, PSS®E, and PSCAD as appropriate.' },
    { q: 'How often should studies be updated?', a: 'Update after utility-source changes, equipment replacement, topology changes, new generation or loads, transformer changes, or other modifications affecting fault levels.' },
  ],
}

export default function ShortCircuitAnalysisPage() { return <PowerStudySpecialtyPage config={config} /> }
