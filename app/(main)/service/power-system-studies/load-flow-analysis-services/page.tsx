import type { Metadata } from 'next'
import PowerStudySpecialtyPage, { type PowerStudyConfig } from '@/components/service/PowerStudySpecialtyPage'

export const metadata: Metadata = { title: 'Load Flow Analysis Services | Reliable Grid Operation | Keentel', description: 'Power system load flow and power flow analysis for transmission networks, substations, renewable plants, and industrial facilities.' }

const config: PowerStudyConfig = {
  eyebrow: 'Load Flow Analysis',
  title: 'Accurate Power System Load Flow Studies for',
  accent: 'Reliable Grid Operation',
  intro: 'Evaluate steady-state voltage, real and reactive power flow, equipment loading, system losses, and operating constraints across transmission, utility, renewable, and industrial networks.',
  heroImage: '/images/services/power-system-studies/study-load-flow.webp',
  overviewTitle: 'Power Flow Analysis for Safe, Efficient System Operation',
  overview: ['Load flow analysis—also called power flow analysis—is one of the most fundamental studies used to evaluate electrical-network operating conditions.', 'Keentel Engineering models transmission systems, substations, renewable plants, industrial facilities, and utility networks to identify constraints and develop practical solutions that maintain reliability.'],
  overviewImage: '/images/services/power-system-studies/industry-utilities.jpg',
  proposalLabel: 'Request a Load Flow Study Proposal',
  definitionTitle: 'What Is Load Flow Analysis?',
  definition: 'Load flow analysis is a mathematical steady-state study that calculates electrical conditions throughout a power system and confirms that each component operates within its allowable limits.',
  definitionPoints: ['Voltage magnitude and angle at each bus', 'Real power through transmission lines', 'Reactive power throughout the system', 'Transformer and transmission-line loading', 'System losses and voltage drop', 'Reactive compensation requirements'],
  definitionImage: '/images/services/power-system-studies/overview-engineers.jpg',
  importanceTitle: 'Importance of Load Flow Studies in Power Systems',
  importance: 'Generation, transmission lines, transformers, substations, and loads interact continuously. Proper analysis reveals how changes in demand, dispatch, topology, or renewable output affect the entire system.',
  importancePoints: ['Maintain acceptable system voltage levels', 'Identify reactive-power deficiencies', 'Evaluate system losses and equipment loading', 'Support transmission and expansion planning'],
  risks: ['Voltage violations', 'Transformer overloads', 'Excessive feeder voltage drop', 'Reactive-power shortages', 'High system losses', 'Renewable curtailment'],
  methodologyTitle: 'Load Flow Study Methodology',
  methodologyIntro: 'A structured four-step approach transforms equipment and operating data into validated scenarios and actionable recommendations.',
  methodology: [
    { title: 'System Data Collection', image: '/images/services/power-system-studies/process-data-collection.png', text: 'Gather the electrical and operating data needed to represent the network accurately.', points: ['Line and cable parameters', 'Transformer ratings and impedance', 'Generator characteristics', 'Load profiles'] },
    { title: 'Power System Modeling', image: '/images/services/power-system-studies/Structured Data Collection & Model Integrity.webp', text: 'Develop a detailed simulation model containing the complete network and its voltage-control resources.', points: ['Transmission lines', 'Transformers and substations', 'Generators and loads', 'Reactive-power devices'] },
    { title: 'Base Case Load Flow Analysis', image: '/images/services/power-system-studies/study-load-flow.webp', text: 'Establish the normal operating reference condition used to evaluate system performance.', points: ['Bus voltage levels', 'Line and transformer loading', 'Reactive-power requirements', 'System losses'] },
    { title: 'Scenario Analysis', image: '/images/services/power-system-studies/industry-renewable.jpg', text: 'Confirm safe operation across the expected range of system configurations and dispatch conditions.', points: ['Peak and light load', 'High renewable generation', 'Equipment outages', 'Future operating cases'] },
  ],
  applicationsTitle: 'Types of Load Flow Studies',
  applicationsIntro: 'Steady-state power flow analysis supports operating decisions, equipment design, interconnection, and long-term system planning.',
  applications: [
    { title: 'Transmission System Load Flow Analysis', image: '/images/services/power-system-studies/Transmission Planning.jfif', text: 'Evaluate high-voltage power transfer between generation and load centers.', points: ['Line overloads', 'Voltage violations', 'Reactive deficiencies', 'Transmission losses'] },
    { title: 'Renewable Energy Interconnection Studies', image: '/images/services/power-system-studies/industry-renewable.jpg', text: 'Determine how solar, wind, and BESS affect network loading and voltage performance.', points: ['Grid congestion', 'Voltage regulation', 'Reactive support', 'Interconnection impacts'] },
    { title: 'Substation Load Flow Analysis', image: '/images/services/substation-design/type-transmission.png', text: 'Confirm that transformers, buses, and operating configurations remain within design limits.', points: ['Transformer loading', 'Bus voltage levels', 'Bus configuration flows', 'Compensation needs'] },
    { title: 'Industrial Power System Studies', image: '/images/services/power-system-studies/industries-1.jpg', text: 'Analyze internal facility distribution systems for dependable equipment sizing and operation.', points: ['Equipment sizing', 'Feeder voltage drop', 'Overload identification', 'Efficiency improvement'] },
    { title: 'Voltage Control & Reactive Power Studies', image: '/images/services/power-system-studies/study-6.jpg', text: 'Develop practical voltage-control and compensation strategies for stable system operation.', points: ['Capacitor-bank sizing', 'Reactor requirements', 'Reactive margins', 'Voltage-control strategy'] },
  ],
  toolsTitle: 'Software Tools Used for Load Flow Analysis',
  toolsIntro: 'Utility-accepted platforms support steady-state analysis of networks containing thousands of buses and electrical elements.',
  tools: [['PSS®E', '14+ years', 'Siemens transmission platform'], ['PowerWorld', '10+ years', 'Power flow and visualization'], ['PSLF', '8+ years', 'GE Vernova planning'], ['DIgSILENT', '8+ years', 'PowerFactory analysis'], ['SKM', '6+ years', 'Industrial power analysis'], ['ETAP', '10+ years', 'Integrated system design']],
  benefitsTitle: 'Benefits of Load Flow Analysis',
  benefits: [['Improved System Reliability', 'Identify overloads and voltage problems before they affect equipment or operations.'], ['Efficient System Operation', 'Optimize dispatch and reactive-power control while reducing unnecessary operating losses.'], ['Support for Grid Planning', 'Provide data-driven evidence for transmission expansion and infrastructure investment.'], ['Renewable Energy Integration', 'Confirm that solar, wind, and BESS can connect without creating system violations.'], ['Regulatory Compliance', 'Document performance against grid codes, utility criteria, and reliability requirements.']],
  whyPoints: ['Expertise across EHV, HV, and MV power systems', 'Advanced steady-state modeling capabilities', 'Utility and ISO planning experience', 'Deep understanding of NERC reliability standards', 'Practical recommendations for complex system constraints'],
  contactText: 'We work with utilities, renewable developers, EPCs, and industrial clients to provide accurate, reliable, and actionable load-flow results for new and existing facilities.',
  faqs: [
    { q: 'What is load flow analysis?', a: 'Load flow analysis calculates steady-state bus voltages, voltage angles, real and reactive power flows, equipment loading, and system losses.' },
    { q: 'Why is load flow analysis important?', a: 'It verifies that the network can serve demand and transfer generation without voltage violations, equipment overloads, or excessive losses.' },
    { q: 'What is the difference between load flow and power flow?', a: 'The terms are generally interchangeable and describe the same steady-state network analysis.' },
    { q: 'What data is required?', a: 'Typical inputs include one-lines, line and cable impedance, transformer data, generator limits, load profiles, bus data, equipment ratings, and operating configurations.' },
    { q: 'What software is used?', a: 'Keentel uses platforms such as PSS®E, PowerWorld, PSLF, DIgSILENT PowerFactory, SKM, and ETAP depending on the network and client requirements.' },
    { q: 'What is a base case load flow?', a: 'The base case represents the expected normal operating condition and provides the reference for comparing alternate scenarios.' },
    { q: 'What is reactive power in load flow analysis?', a: 'Reactive power supports voltage and is supplied or absorbed by generators, inverters, capacitors, reactors, transformers, and loads.' },
    { q: 'What causes voltage violations?', a: 'Common causes include long electrical distance, high loading, inadequate reactive support, transformer tap settings, contingencies, and changing generation dispatch.' },
    { q: 'Can load flow evaluate renewable integration?', a: 'Yes. Studies evaluate renewable dispatch, voltage regulation, reactive requirements, congestion, curtailment, and equipment loading.' },
    { q: 'What is transformer loading analysis?', a: 'It compares calculated transformer MVA and current against continuous, emergency, and project-specific loading limits.' },
    { q: 'Which industries require load flow studies?', a: 'Utilities, renewable developers, data centers, manufacturing plants, oil and gas facilities, campuses, and other large electrical systems use load flow analysis.' },
    { q: 'How often should studies be updated?', a: 'Update the study whenever material changes occur in load, generation, topology, equipment ratings, controls, or operating strategy.' },
  ],
}

export default function LoadFlowAnalysisPage() { return <PowerStudySpecialtyPage config={config} /> }
