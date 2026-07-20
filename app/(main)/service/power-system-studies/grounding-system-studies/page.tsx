import type { Metadata } from 'next'
import PowerStudySpecialtyPage, { type PowerStudyConfig } from '@/components/service/PowerStudySpecialtyPage'

export const metadata: Metadata = {
  title: 'Grounding & Protection System Studies | Keentel Engineering',
  description: 'Ground-grid, soil resistivity, ground potential rise, step-and-touch voltage, and protection integration studies for safe electrical infrastructure.',
}

const config: PowerStudyConfig = {
  eyebrow: 'Electrical Safety Engineering',
  title: 'Grounding & Protection System Studies for',
  accent: 'Safer Electrical Infrastructure',
  intro: 'Evaluate ground-grid performance, fault-current dissipation, ground potential rise, and step-and-touch voltages to protect personnel, equipment, and critical power-system operations.',
  heroImage: '/images/services/power-system-studies/Grounding Protection.jpg',
  overviewTitle: 'Grounding Analysis Built Around Safety & Protection Performance',
  overview: ['Keentel Engineering performs detailed grounding and protection-system studies for substations, transmission systems, renewable facilities, and industrial electrical networks.', 'Our studies confirm safe voltage limits, effective fault-current dissipation, dependable protection operation, and compliance with recognized grounding standards.'],
  overviewImage: '/images/services/power-system-studies/study-grounding.png',
  proposalLabel: 'Request a Grounding Study Proposal',
  definitionTitle: 'What Are Grounding System Studies?',
  definition: 'Grounding studies model how an earthing network behaves during fault conditions and verify that its geometry, soil interface, and equipment connections control hazardous voltages.',
  definitionPoints: ['Ground-grid resistance', 'Fault-current dissipation', 'Step-voltage limits', 'Touch-voltage limits', 'Ground potential rise (GPR)', 'Equipment grounding continuity'],
  definitionImage: '/images/services/power-system-studies/study-grounding.png',
  importanceTitle: 'Why Grounding System Design Matters',
  importance: 'A properly engineered grounding system provides a controlled fault-current path, limits hazardous potential differences, supports correct relay operation, and protects equipment from fault and overvoltage stress.',
  importancePoints: ['Control dangerous step and touch voltages', 'Provide effective fault-current dissipation', 'Improve ground-fault detection and clearing', 'Protect equipment and operating personnel'],
  risks: ['Unsafe touch voltage', 'Unsafe step voltage', 'Excessive GPR', 'Protection underreach', 'Equipment damage', 'Standards noncompliance'],
  methodologyTitle: 'Grounding Study Methodology',
  methodologyIntro: 'The analysis combines measured site characteristics, detailed grid modeling, fault-current allocation, and personnel-safety evaluation.',
  methodology: [
    { title: 'GPR & Fault Analysis', image: '/images/services/power-system-studies/Detailed Short Circuit & Protection Coordination.jpg', text: 'Determine the fault current entering the grounding system and calculate the resulting ground potential rise.', points: ['Maximum GPR', 'Fault-current split', 'Equipment impact', 'Safety evaluation'] },
    { title: 'Ground Grid Modeling', image: '/images/services/power-system-studies/study-grounding.png', text: 'Develop a detailed representation of the complete grounding network.', points: ['Grid conductors', 'Ground rods', 'Structures and fences', 'Equipment bonds', 'Grid geometry'] },
    { title: 'Soil Resistivity', image: '/images/services/power-system-studies/Grounding Protection.jpg', text: 'Use site measurements and layered-soil interpretation to characterize current dissipation.', points: ['Wenner testing inputs', 'Soil-layer model', 'Seasonal conditions', 'Design sensitivity'] },
    { title: 'Voltage Evaluation', image: '/images/services/power-system-studies/overview-engineers.jpg', text: 'Compare calculated step and touch voltages with allowable safety limits and refine the design.', points: ['Step-voltage limits', 'Touch-voltage limits', 'Surface-layer effects', 'Compliance verification'] },
  ],
  applicationsTitle: 'Grounding Systems & Study Applications',
  applicationsIntro: 'The grounding method and study scope must reflect the system voltage, protection strategy, site conditions, and operational requirements.',
  applications: [
    { title: 'Substation Grounding Design', image: '/images/services/power-system-studies/Grounding Protection.jpg', text: 'Design and verify grounding grids that safely dissipate substation fault current.', points: ['Conductor sizing', 'Ground-rod placement', 'Step and touch limits', 'Ground potential rise'] },
    { title: 'Renewable Plant Grounding', image: '/images/services/power-system-studies/industry-renewable.jpg', text: 'Integrate collector, inverter, BESS, fence, and lightning-protection grounding.', points: ['Equipment grounding', 'Lightning grounding', 'Collector-system bonds', 'POI coordination'] },
    { title: 'Transmission System Grounding', image: '/images/services/power-system-studies/Transmission Planning.jfif', text: 'Evaluate tower grounding, shield-wire effects, and neutral grounding behavior.', points: ['Tower footing resistance', 'Fault-current distribution', 'Neutral methods', 'Protection performance'] },
    { title: 'Industrial Facility Grounding', image: '/images/services/power-system-studies/industries-1.jpg', text: 'Protect personnel, process equipment, and sensitive controls in complex facilities.', points: ['Solid grounding', 'Resistance grounding', 'Reactance grounding', 'Ungrounded-system review'] },
  ],
  toolsTitle: 'Software Tools Used for Grounding & Protection Studies',
  toolsIntro: 'Validated engineering models combine grounding calculations with short-circuit and protection analysis where system interactions matter.',
  tools: [['ETAP', 'Ground Grid', 'Safety and protection analysis'], ['DIgSILENT', 'PowerFactory', 'Fault and protection studies'], ['CDEGS', 'Grounding', 'Detailed earthing analysis'], ['SKM', 'Industrial systems', 'Fault and protection analysis'], ['PSS®E', 'Transmission', 'Network fault context']],
  benefitsTitle: 'Benefits of Grounding & Protection Studies',
  benefits: [['Improved Electrical Safety', 'Limit dangerous step and touch voltages under credible fault conditions.'], ['Reliable Protection Operation', 'Provide effective ground-fault paths and dependable relay response.'], ['Equipment Protection', 'Reduce damaging potential differences and overvoltage exposure.'], ['Fault-Current Control', 'Understand current distribution and maintain stable system behavior during faults.'], ['Regulatory Compliance', 'Document alignment with IEEE 80, IEEE 81, IEEE 142, IEC, and project criteria.']],
  whyPoints: ['Expertise across EHV, HV, and MV grounding applications', 'Integrated grounding, short-circuit, and protection analysis', 'Experience with utilities, renewables, substations, and industrial facilities', 'Advanced simulation and field-data interpretation', 'Clear safety findings and constructible recommendations'],
  contactText: 'Keentel provides complete grounding-system studies for substations, renewable projects, transmission facilities, and industrial networks—helping clients improve safety, demonstrate compliance, and reduce operational risk.',
  faqs: [
    { q: 'What is a grounding system study?', a: 'It is an engineering analysis of how a grounding network dissipates fault current and controls ground potential rise, step voltage, and touch voltage.' },
    { q: 'What is the difference between grounding and earthing?', a: 'The terms are often used interchangeably. Both describe intentional electrical connections to earth for safety, system reference, lightning performance, and fault-current control.' },
    { q: 'What are step and touch voltages?', a: 'Step voltage is the potential difference between a person’s feet. Touch voltage is the difference between grounded equipment being touched and the ground at the person’s feet.' },
    { q: 'What is ground potential rise?', a: 'GPR is the voltage rise of a grounding system relative to remote earth when fault current flows into the soil.' },
    { q: 'Why is soil resistivity testing required?', a: 'Soil resistivity determines how readily current disperses into earth and strongly influences grid geometry, conductor length, rod depth, and safety performance.' },
    { q: 'Which standards apply to grounding studies?', a: 'Common references include IEEE 80 for substation grounding, IEEE 81 for soil measurements, IEEE 142 for industrial grounding, and applicable IEC and utility requirements.' },
    { q: 'How does grounding affect protection systems?', a: 'Grounding determines ground-fault magnitude and return paths, directly influencing relay sensitivity, selectivity, and fault-clearing performance.' },
    { q: 'Which grounding methods can be evaluated?', a: 'Studies may address solid grounding, resistance grounding, reactance grounding, ungrounded systems, and project-specific hybrid arrangements.' },
    { q: 'When should a grounding study be updated?', a: 'Reassess grounding after site expansion, equipment or fault-level changes, grid modifications, soil changes, or any alteration to the protection or neutral-grounding design.' },
  ],
}

export default function GroundingSystemStudiesPage() {
  return <PowerStudySpecialtyPage config={config} />
}
