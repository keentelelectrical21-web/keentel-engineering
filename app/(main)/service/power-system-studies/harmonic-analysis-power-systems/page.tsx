import type { Metadata } from 'next'
import PowerStudySpecialtyPage, { type PowerStudyConfig } from '@/components/service/PowerStudySpecialtyPage'

export const metadata: Metadata = {
  title: 'Harmonic Analysis for Power Systems | Keentel Engineering',
  description: 'Power-system harmonic distortion, resonance, and IEEE 519 power-quality studies for renewable, utility, substation, and industrial facilities.',
}

const config: PowerStudyConfig = {
  eyebrow: 'Power Quality Engineering',
  title: 'Harmonic Analysis for Power Systems &',
  accent: 'Power Quality Compliance',
  intro: 'Quantify waveform distortion from VFDs, converters, solar and wind inverters, BESS, rectifiers, and other nonlinear equipment—then develop practical mitigation that protects the network.',
  heroImage: '/images/services/power-system-studies/Harmonic Analysis.webp',
  overviewTitle: 'Electrical Harmonic Distortion Analysis',
  overview: ['Keentel Engineering evaluates harmonic currents and voltages across transmission systems, substations, renewable energy facilities, and industrial networks.', 'Our engineers model harmonic sources, trace distortion through the network, identify resonance risk, and design mitigation solutions that maintain acceptable power quality and protect electrical equipment.'],
  overviewImage: '/images/services/power-system-studies/study-harmonic-analysis.jpg',
  proposalLabel: 'Request a Harmonic Study Proposal',
  definitionTitle: 'What Is Harmonic Analysis?',
  definition: 'Harmonic analysis evaluates electrical waveform distortion caused by nonlinear loads and power-electronic equipment. Harmonics occur at integer multiples of the fundamental system frequency and combine to distort voltage and current.',
  definitionPoints: ['Fundamental frequency: 60 Hz', '3rd harmonic: 180 Hz', '5th harmonic: 300 Hz', '7th harmonic: 420 Hz', 'Voltage and current total harmonic distortion (THD)'],
  definitionImage: '/images/services/power-system-studies/study-harmonic-analysis.jpg',
  importanceTitle: 'Why Harmonic Studies Matter',
  importance: 'Excessive harmonic distortion can overheat equipment, interfere with controls, amplify voltage distortion through resonance, and reduce system efficiency. A harmonic study establishes the evidence needed to manage those risks before energization or expansion.',
  importancePoints: ['Evaluate voltage and current distortion', 'Identify resonant frequencies', 'Prevent transformer and cable overheating', 'Demonstrate power-quality compliance'],
  risks: ['Transformer overheating', 'Cable and motor losses', 'Capacitor failures', 'Nuisance tripping', 'Control interference', 'IEEE 519 noncompliance'],
  methodologyTitle: 'Four-Step Harmonic Study Methodology',
  methodologyIntro: 'A complete study connects field and design data to frequency-domain simulations, compliance assessment, and targeted mitigation.',
  methodology: [
    { title: 'Collect System Data', image: '/images/services/power-system-studies/process-data-collection.png', text: 'Gather the parameters required for a dependable frequency-domain network model.', points: ['Transformer impedance', 'Line and cable parameters', 'Generator data', 'Nonlinear loads', 'Grounding configuration'] },
    { title: 'Model Harmonic Sources', image: '/images/services/power-system-studies/industry-renewable.jpg', text: 'Represent the characteristic spectra and operating modes of power-electronic equipment.', points: ['Solar and BESS inverters', 'VFD systems', 'Rectifiers and converters', 'Industrial nonlinear loads'] },
    { title: 'Analyze Propagation', image: '/images/services/power-system-studies/study-harmonic-analysis.jpg', text: 'Perform harmonic load flow and impedance scans to locate distortion and resonance concerns.', points: ['Voltage distortion', 'Current distribution', 'Resonance points', 'Frequency impedance', 'THD levels'] },
    { title: 'Develop Mitigation', image: '/images/services/power-system-studies/overview-engineers.jpg', text: 'Compare practical solutions and document the design that meets performance criteria.', points: ['Passive or active filters', 'Line reactors', 'Transformer changes', 'Equipment settings', 'System optimization'] },
  ],
  applicationsTitle: 'Where Harmonic Analysis Is Applied',
  applicationsIntro: 'Harmonic performance should be assessed wherever power-electronic conversion or concentrated nonlinear load can influence equipment or point-of-connection power quality.',
  applications: [
    { title: 'Solar, Wind & BESS', image: '/images/services/power-system-studies/industry-renewable.jpg', text: 'Evaluate inverter spectra, collector-system resonance, and point-of-interconnection distortion.', points: ['Plant-level aggregation', 'Grid impedance sensitivity', 'Filter interaction', 'IEEE 519 assessment'] },
    { title: 'Industrial Facilities', image: '/images/services/power-system-studies/industries-1.jpg', text: 'Assess VFDs, rectifiers, furnaces, UPS systems, and other nonlinear process loads.', points: ['Equipment heating', 'Neutral currents', 'Capacitor interaction', 'Power-factor equipment'] },
    { title: 'Substations & Utility Networks', image: '/images/services/power-system-studies/Grounding Protection.jpg', text: 'Trace distortion across buses and evaluate amplification under changing network conditions.', points: ['Bus distortion', 'System resonance', 'Planning scenarios', 'Compliance at the PCC'] },
    { title: 'Data Centers & Large Loads', image: '/images/services/power-system-studies/overview-engineers.jpg', text: 'Model UPS, power supplies, cooling drives, and staged load growth before commissioning.', points: ['Load aggregation', 'Redundancy modes', 'Filter performance', 'Expansion planning'] },
  ],
  toolsTitle: 'Software Tools Used for Harmonic Analysis',
  toolsIntro: 'We select the platform and model detail appropriate to the equipment, frequency range, network strength, and compliance objective.',
  tools: [['PSCAD', 'EMT', 'Frequency and transient analysis'], ['DIgSILENT', 'PowerFactory', 'Harmonic load flow'], ['SKM', 'Power analysis', 'Industrial harmonic studies'], ['ETAP', 'System design', 'Harmonic assessment'], ['PSS®E', 'Network context', 'Transmission operating cases']],
  benefitsTitle: 'Benefits of Harmonic Analysis',
  benefits: [['Improved Power Quality', 'Identify and control voltage and current distortion before it disrupts system performance.'], ['Equipment Protection', 'Reduce harmonic heating and dielectric stress on transformers, cables, motors, and capacitors.'], ['Standards Compliance', 'Assess performance against IEEE 519 and applicable utility power-quality criteria.'], ['Higher System Efficiency', 'Limit distortion-related losses and improve utilization of electrical equipment.'], ['Enhanced Reliability', 'Avoid resonance, nuisance operations, and premature component failures.']],
  whyPoints: ['Expertise across EHV, HV, and MV networks', 'Detailed inverter and nonlinear-load modeling', 'Utility and ISO interconnection experience', 'Frequency-domain and EMT simulation capability', 'Practical filter and equipment mitigation recommendations'],
  contactText: 'Whether you are planning a renewable project, integrating large nonlinear loads, or investigating an existing power-quality concern, Keentel delivers actionable harmonic analysis from model development through mitigation design.',
  faqs: [
    { q: 'What is harmonic distortion?', a: 'Harmonic distortion is the departure of voltage or current from a pure sinusoidal waveform due to frequency components at integer multiples of the fundamental frequency.' },
    { q: 'What equipment creates harmonics?', a: 'Common sources include VFDs, rectifiers, UPS systems, solar and BESS inverters, wind converters, arc furnaces, and switched-mode power supplies.' },
    { q: 'What is THD?', a: 'Total harmonic distortion expresses the combined magnitude of harmonic components relative to the fundamental component.' },
    { q: 'Why is IEEE 519 important?', a: 'IEEE 519 establishes recommended voltage and current distortion limits at the point of common coupling and guides power-quality evaluation.' },
    { q: 'What is harmonic resonance?', a: 'Resonance occurs when system inductance and capacitance create a low- or high-impedance condition near a harmonic frequency, potentially amplifying distortion.' },
    { q: 'Can solar and BESS projects cause harmonics?', a: 'Yes. Their inverters produce switching and characteristic harmonics whose combined behavior depends on controls, network impedance, operating level, and plant configuration.' },
    { q: 'How are harmonics mitigated?', a: 'Solutions may include passive filters, active filters, line reactors, transformer changes, equipment settings, detuning, or network reconfiguration.' },
    { q: 'What data is needed for a harmonic study?', a: 'Typical inputs include one-lines, equipment impedances, cable and line data, capacitor banks, nonlinear-load spectra, inverter models, operating cases, and applicable limits.' },
  ],
}

export default function HarmonicAnalysisPage() {
  return <PowerStudySpecialtyPage config={config} />
}
