import type { Metadata } from 'next'
import PowerStudySpecialtyPage, { type PowerStudyConfig } from '@/components/service/PowerStudySpecialtyPage'

export const metadata: Metadata = {
  title: 'Protective Device Coordination Studies | Keentel Engineering',
  description: 'Protective relay, breaker, fuse, recloser, and time-current coordination studies for selective fault isolation and reliable power-system protection.',
}

const config: PowerStudyConfig = {
  eyebrow: 'Power System Protection',
  title: 'Protective Device Coordination Studies for',
  accent: 'Selective, Reliable Fault Isolation',
  intro: 'Coordinate relays, circuit breakers, fuses, and reclosers so the device nearest a fault operates first while healthy portions of the electrical system remain energized.',
  heroImage: '/images/services/power-system-studies/Protective Coordination.jfif',
  overviewTitle: 'Electrical Protection Coordination & Relay Analysis',
  overview: [
    'Keentel Engineering performs comprehensive protective device coordination studies for transmission systems, substations, renewable energy facilities, industrial plants, and distribution networks.',
    'Our engineers evaluate protection-system performance and develop defensible settings that isolate faults quickly, minimize unnecessary outages, protect critical equipment, and align with applicable protection standards.',
  ],
  overviewImage: '/images/services/power-system-studies/Detailed Short Circuit & Protection Coordination.jpg',
  proposalLabel: 'Request a Coordination Study Proposal',
  definitionTitle: 'What Are Protective Device Coordination Studies?',
  definition: 'A coordination study analyzes protective-device operating characteristics so primary protection clears a fault selectively and backup protection operates only when required.',
  definitionPoints: ['Relay operating characteristics', 'Fuse and breaker coordination', 'Time-current curves (TCC)', 'Fault-clearing times', 'Backup-protection performance'],
  definitionImage: '/images/services/power-system-studies/study-protection-coordination.jpg',
  importanceTitle: 'Why Protection Coordination Matters',
  importance: 'Without proper coordination, devices can trip incorrectly or out of sequence, turning a localized fault into unnecessary equipment loss or a widespread outage. Well-coordinated settings improve continuity, safety, and system stability.',
  importancePoints: ['Isolate only the faulted section', 'Reduce outages and operating disruption', 'Protect equipment from damaging fault energy', 'Support arc-flash risk reduction'],
  risks: ['Unnecessary outages', 'Equipment damage', 'Protection misoperation', 'Cascading trips', 'Extended restoration time', 'Personnel safety exposure'],
  methodologyTitle: 'Protective Device Coordination Study Methodology',
  methodologyIntro: 'The study combines verified system data, short-circuit results, TCC analysis, and setting optimization to deliver an implementable protection package.',
  methodology: [
    { title: 'System Data Collection', image: '/images/services/power-system-studies/process-data-collection.png', text: 'Build a reliable source model using current equipment and network data.', points: ['Fault-current levels', 'Relay models and settings', 'Breaker ratings', 'Fuse curves', 'Transformer, cable, and line data'] },
    { title: 'Short-Circuit Analysis', image: '/images/services/power-system-studies/Detailed Short Circuit & Protection Coordination.jpg', text: 'Calculate available fault current and verify equipment duties across credible fault conditions.', points: ['Relay pickup values', 'Breaker interrupting duty', 'Device operating times', 'Minimum and maximum faults'] },
    { title: 'TCC Development', image: '/images/services/power-system-studies/study-protection-coordination.jpg', text: 'Plot device characteristics and confirm adequate selectivity and backup margins.', points: ['Operating time versus current', 'Upstream/downstream margins', 'Transformer and conductor protection', 'Backup relationships'] },
    { title: 'Settings Optimization', image: '/images/services/power-system-studies/overview-engineers.jpg', text: 'Refine settings and document the final coordination strategy for field implementation.', points: ['Pickup current', 'Time delays', 'Instantaneous elements', 'Directional logic', 'Recommended setting changes'] },
  ],
  applicationsTitle: 'Applications of Protection Coordination Studies',
  applicationsIntro: 'Protection requirements vary by network topology, equipment, fault behavior, and operating objectives. Each study is tailored to the facility and governing criteria.',
  applications: [
    { title: 'Transmission System Protection', image: '/images/services/power-system-studies/Transmission Planning.jfif', text: 'Coordinate high-speed primary and dependable backup protection across high-voltage networks.', points: ['Distance protection', 'Differential schemes', 'Breaker-failure protection', 'Communication-assisted tripping'] },
    { title: 'Substation Protection Coordination', image: '/images/services/power-system-studies/Grounding Protection.jpg', text: 'Coordinate protection zones for transformers, buses, feeders, and transmission terminals.', points: ['Transformer protection', 'Bus protection', 'Feeder overcurrent', 'Main and backup devices'] },
    { title: 'Renewable Plant Protection', image: '/images/services/power-system-studies/industry-renewable.jpg', text: 'Account for inverter-based fault response and point-of-interconnection requirements.', points: ['Inverter behavior', 'Utility coordination', 'Anti-islanding', 'Ride-through requirements'] },
    { title: 'Industrial Power Systems', image: '/images/services/power-system-studies/industries-1.jpg', text: 'Protect motors, drives, feeders, and switchgear while preserving process continuity.', points: ['Motor and feeder protection', 'Selective coordination', 'Switchgear safety', 'Arc-flash mitigation support'] },
  ],
  toolsTitle: 'Software Tools Used for Coordination Studies',
  toolsIntro: 'Protection studies are completed in fit-for-purpose, industry-recognized platforms and supported by clear calculations, curves, settings, and assumptions.',
  tools: [['ETAP', 'Protection', 'TCC and relay analysis'], ['SKM PowerTools', 'Coordination', 'Device selectivity'], ['DIgSILENT', 'PowerFactory', 'Protection simulation'], ['ASPEN OneLiner', 'Fault analysis', 'Transmission protection'], ['PSS®E', 'Transmission', 'High-voltage network studies']],
  benefitsTitle: 'Benefits of a Defensible Coordination Study',
  benefits: [['Selective Fault Isolation', 'Disconnect only the affected portion of the system and keep healthy sections energized.'], ['System Reliability', 'Reduce avoidable trips, cascading operations, and restoration time.'], ['Equipment Protection', 'Coordinate device operation with transformer, cable, motor, and switchgear withstand limits.'], ['Personnel Safety', 'Support faster clearing and informed arc-flash mitigation decisions.'], ['Standards Alignment', 'Apply IEEE 242, IEEE 399, ANSI/IEEE C37, IEC, and applicable NERC criteria.']],
  whyPoints: ['30+ years of specialized high-voltage engineering experience', 'Protection engineers experienced with utility, industrial, and renewable systems', 'Nationwide project support and P.E.-stamped deliverables', 'Advanced fault, relay, and TCC modeling', 'Compliance-focused reporting with actionable settings'],
  contactText: 'For a new project, substation upgrade, renewable facility, or industrial system, Keentel delivers complete coordination analysis and optimized protection settings that teams can implement with confidence.',
  faqs: [
    { q: 'What is protective device coordination?', a: 'It is the engineering process of selecting and setting protective devices so the device closest to a fault operates first and upstream backup protection operates only if needed.' },
    { q: 'Why is coordination important?', a: 'Correct coordination limits outage scope, protects equipment, improves continuity, and reduces the likelihood of cascading device operations.' },
    { q: 'What is a time-current curve (TCC)?', a: 'A TCC plots how quickly a protective device operates at different current levels and allows engineers to compare primary and backup device behavior.' },
    { q: 'Which devices are included?', a: 'Studies commonly include protective relays, circuit breakers, fuses, reclosers, motor protection, transformer protection, and other overcurrent or differential devices.' },
    { q: 'What is primary and backup protection?', a: 'Primary protection is assigned to clear faults within its zone. Backup protection clears the fault if the primary device or breaker does not operate as intended.' },
    { q: 'What is relay pickup current?', a: 'Pickup current is the threshold at which a relay begins responding to an abnormal current condition.' },
    { q: 'Do renewable plants require coordination studies?', a: 'Yes. Inverter-based resources require protection settings that account for limited and controlled fault-current contribution, ride-through, anti-islanding, and utility interconnection requirements.' },
    { q: 'Which standards apply?', a: 'Typical references include IEEE 242, IEEE 399, ANSI/IEEE C37, IEC 60255, utility criteria, and applicable NERC reliability standards.' },
    { q: 'When should a coordination study be updated?', a: 'Update the study when equipment, topology, relay firmware or settings, available fault current, generation, load, or utility source conditions materially change.' },
    { q: 'Can coordination studies reduce arc-flash hazards?', a: 'They can support arc-flash mitigation by identifying opportunities for faster fault clearing while preserving selectivity and equipment protection.' },
  ],
}

export default function ProtectiveDeviceCoordinationPage() {
  return <PowerStudySpecialtyPage config={config} />
}
