import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

function Img({ src, fallback, alt, className }: { src: string; fallback: string; alt: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />
}

const softwareTable = [
  ['Power Flow & RMS Stability', 'PSS\u00aeE / DIgSILENT'],
  ['EMT & Fast Transients', 'PSCAD / DIgSILENT EMT'],
  ['Short Circuit (ANSI/IEC)', 'ETAP / DIgSILENT'],
  ['Protection Coordination', 'ETAP / DIgSILENT'],
  ['Arc Flash', 'ETAP'],
  ['Harmonics / Frequency Scan', 'ETAP / DIgSILENT / PSCAD'],
  ['Ground Grid', 'ETAP / CDEGS'],
]

type PhaseBlockData = { h: string; items: string[]; table?: boolean }
type Phase = { n: string; title: string; sub?: string; intro?: string; note?: string; blocks: PhaseBlockData[] }

const phases: Phase[] = [
  {
    n: '01',
    title: 'Project Initiation & Study Matrix Development',
    intro: 'Every engagement begins with clearly defined objectives and modeling boundaries.',
    blocks: [
      { h: 'Scope Definition', items: ['Establish POI-to-grid modeling limits', 'Define voltage levels and equipment ratings', 'Identify N-0, N-1, and N-1-1 contingencies', 'Include peak, light load, seasonal, and export scenarios', 'Identify weak grid / minimum SCR cases (if applicable)'] },
      { h: 'Software Allocation', items: [], table: true },
      { h: 'Compliance Alignment', items: ['Utility / ISO interconnection standards', 'IEEE C37, C57, 1584, 519, 2800', 'NERC standards (if BES applicable)', 'ANSI / IEC duty verification', 'NFPA 70E arc flash requirements'] },
    ],
  },
  {
    n: '02',
    title: 'Structured Data Collection & Model Integrity',
    intro: 'Accurate modeling depends on validated technical inputs.',
    blocks: [
      { h: 'Transmission & Dynamic Data', items: ['Utility base case files (.sav, .raw, .dyr, PowerFactory)', 'Line R/X/B parameters and ratings', 'Transformer MVA, impedance %, vector group, tap range', 'Generator / inverter dynamic models', 'Plant controller models', 'Reactive devices (SVC, STATCOM, capacitor banks)', 'POI short-circuit levels'] },
      { h: 'Facility & Protection Data', items: ['As-built one-line diagrams', 'Breaker interrupting ratings', 'CT/PT ratios', 'Relay types and firmware', 'Cable lengths and conductor data', 'Ground grid layout and soil resistivity'] },
    ],
    note: 'All assumptions are logged in a controlled Model Assumption Register for audit traceability.',
  },
  {
    n: '03',
    title: 'Transmission-Level RMS Modeling',
    sub: '(PSS\u00aeE / DIgSILENT)',
    blocks: [
      { h: 'Base Case Development', items: ['Import and validate utility base model', 'Add POI, GSU, collector systems, and station buses', 'Verify transformer vector groups', 'Confirm per-unit base consistency', 'Set machine capability curves and reactive limits'] },
      { h: 'Power Flow & Contingency Analysis', items: ['Flat-start load flow validation', 'Voltage profile verification (0.95\u20131.05 pu)', 'MW/MVAR balance review', 'Equipment loading checks', 'N-1 and N-1-1 simulations', 'Violation documentation and corrective recommendations'] },
      { h: 'Short Circuit Screening', items: ['3-phase and SLG fault simulations', 'POI duty validation', 'Generator and remote system contribution review'] },
      { h: 'Transient Stability (RMS)', items: ['3\u03d5 POI fault simulations (4\u20139 cycles)', 'Line outages and generator trips', 'Frequency and voltage recovery analysis', 'Oscillation damping assessment', 'Ride-through validation per IEEE 2800 / PRC standards'] },
    ],
  },
  {
    n: '04',
    title: 'EMT & Fast Transient Validation',
    sub: '(PSCAD / DIgSILENT EMT)',
    intro: 'For inverter-based resources and weak grid applications, detailed EMT modeling is performed.',
    blocks: [
      { h: '', items: ['Inverter switching model development', 'Control block validation', 'Transformer saturation modeling', 'Frequency-dependent cable representation', 'Breaker switching logic', 'Weak grid stability (low SCR conditions)', 'Transformer energization and inrush', 'Switching surge and TRV analysis', 'SSR evaluation (if applicable)'] },
    ],
    note: 'Controller tuning from RMS studies is validated in EMT environment.',
  },
  {
    n: '05',
    title: 'Detailed Facility & Protection Studies',
    sub: '(ETAP / DIgSILENT)',
    blocks: [
      { h: 'Detailed Short Circuit (ANSI / IEC)', items: ['3\u03d5, SLG, LL, and DLG fault studies', 'Breaker interrupting and momentary duty verification', 'CT saturation risk analysis', 'Equipment withstand validation'] },
      { h: 'Protection Coordination', items: ['Distance protection (Zones 1\u20133)', 'Transformer differential', 'Breaker failure schemes', 'Overcurrent backup', 'TCC curve development', 'Selectivity and grading margin confirmation'] },
      { h: 'Arc Flash (IEEE 1584)', items: ['Incident energy calculation', 'PPE category determination', 'Arc flash boundary definition', 'Equipment labeling'] },
      { h: 'Harmonics & Grounding', items: ['Voltage THD and current distortion', 'Resonance and filter adequacy review', 'Ground grid step and touch voltage validation', 'GPR assessment'] },
    ],
  },
  {
    n: '06',
    title: 'Cross-Platform Validation',
    intro: 'Consistency across modeling platforms is critical.',
    blocks: [
      { h: '', items: ['Reconcile transformer impedance values', 'Validate fault current magnitudes and X/R ratios', 'Confirm POI strength consistency', 'Verify controller dynamic response alignment', 'Investigate mismatches exceeding engineering tolerance thresholds'] },
    ],
  },
  {
    n: '07',
    title: 'Mitigation & Optimization',
    intro: 'For identified violations, mitigation strategies are engineered and validated:',
    blocks: [
      { h: '', items: ['Capacitor banks / STATCOM / tap adjustments', 'Reconductoring or parallel circuit solutions', 'Reactor installation or breaker upgrades', 'Protection setting refinement', 'Controller tuning (AVR, PSS, plant controller)', 'Harmonic filter redesign'] },
    ],
    note: 'All mitigations are re-simulated to confirm compliance.',
  },
  {
    n: '08',
    title: 'QA/QC & Final Deliverables',
    intro: 'Independent technical review ensures defensible results.',
    blocks: [
      { h: 'QA/QC Review', items: ['Model topology validation', 'Protection logic verification', 'Stability plot review', 'EMT waveform review', 'Arc flash clearing time confirmation', 'Version control and case tracking'] },
      { h: 'Final Deliverables', items: ['Executive technical report', 'Assumption register', 'Violation summary & mitigation plan', 'PSS\u00aeE / PSCAD / ETAP / DIgSILENT model files', 'Stability plots and contingency reports', 'TCC curves and arc flash labels', 'Ground grid contour plots'] },
    ],
    note: 'All documentation is formatted for utility, ISO, and regulatory submission.',
  },
]

const relatedArticles = [
  ['Load Flow Studies in Electrical Power System', 'https://keentelengineering.com/load-flow-studies-in-electrical-power-system'],
  ['US Grid Code Compliance, Wind Farms Ride-Through & Reactive Power', 'https://keentelengineering.com/us-grid-code-compliance-wind-farms-ride-through-reactive-power'],
  ['Importance of Power System Studies', 'https://keentelengineering.com/importance-of-power-system-studies'],
  ['Substation Design Power System Case Studies', 'https://keentelengineering.com/substation-design-power-system-case-studies'],
  ['Why Is Power System Analysis Important for BESS Owners', 'https://keentelengineering.com/why-is-power-system-analysis-important-for-bess-owners'],
  ['Information Management for Inverter-Based Resources (IBRs)', 'https://keentelengineering.com/information-management-for-inverter-based-resources-ibrs-a-technical-guide-for-power-system-operators'],
  ['Advancing Power System Design Practices with IEEE PES TR-126', 'https://keentelengineering.com/advancing-power-system-design-practices-with-ieee-pes-tr-126'],
  ['Change Management Process in Power Systems', 'https://keentelengineering.com/change-management-process-in-power-systems-a-vital-link-between-operations-and-planning'],
  ['Advanced Power System Modeling Guide', 'https://keentelengineering.com/advanced-power-system-modeling-guide'],
  ['Ensuring Design Stability in Power System Projects', 'https://keentelengineering.com/ensuring-design-stability-in-power-system-projects-best-practices-and-upcoming-nerc-reporting-deadlines'],
]

const relatedServices = [
  ['All Engineering Services', '/services'],
  ['EHV, HV, MV Power System Studies', '/service/power-system-studies'],
  ['Substation Design Services', '/service/substation-design'],
  ['POI Interconnection Engineering Support', '/service/poi-interconnection-engineering-support'],
  ['Utility Scale Solar Farm Engineering', '/service/utility-scale-renewable-energy'],
  ['MEP Engineering Services', '/service/mep-engineering'],
]

function PhaseBlock({ h, items, table }: { h: string; items: string[]; table?: boolean }) {
  return (
    <div className="mb-6">
      {h && <p className="font-urbanist font-bold text-sm mb-3" style={{ color: '#06103C' }}>{h}</p>}
      {table ? (
        <div className="rounded-xl overflow-hidden border" style={{ borderColor: '#E6E8F0' }}>
          <table className="w-full text-sm">
            <thead style={{ background: '#06103C' }}>
              <tr>
                <th className="text-left px-4 py-3 font-jost text-white font-semibold">Study Type</th>
                <th className="text-left px-4 py-3 font-jost text-white font-semibold">Primary Platform</th>
              </tr>
            </thead>
            <tbody>
              {softwareTable.map(([a, b], i) => (
                <tr key={i} style={{ borderTop: '1px solid #E6E8F0' }} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-jost text-gray-700">{a}</td>
                  <td className="px-4 py-3 font-jost text-gray-700">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((it, i) => (
            <li key={i} className="flex gap-2 font-jost text-sm text-gray-600 leading-relaxed">
              <span style={{ color: '#A8228A' }}>&bull;</span>{it}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function PowerSystemStudyProcessPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── HERO ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#A8228A' }}>From Keentel Engineering</span>
              <h1 className="font-urbanist font-black mb-6 leading-tight" style={{ color: '#06103C', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Power System Studies Process</h1>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Img src="/images/power-system-study-process/hero.jpg" fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/protection-coordination-practices-distribution-generation-920x613-1920w.jpg" alt="Power system study process" className="w-full h-64 sm:h-80 object-cover" />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-24">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h2 className="font-urbanist font-black mb-4" style={{ color: '#06103C', fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>Transmission-Level HV &amp; EHV Engineering Methodology</h2>
            <p className="font-jost text-gray-600 leading-relaxed mb-4">High-voltage and extra-high-voltage (HV/EHV) systems demand a disciplined, multi-platform engineering workflow. Keentel Engineering follows a structured study process using <strong>PSS&reg;E, PSCAD, ETAP, and DIgSILENT PowerFactory</strong> to deliver ISO-ready, compliance-aligned, and technically defensible results.</p>
            <p className="font-jost text-gray-600 leading-relaxed mb-12">Our methodology is built for utilities, renewable developers, EPC firms, and large industrial operators requiring transmission-grade validation.</p>

            {phases.map((phase, pi) => (
              <div key={pi} className="mb-14 pt-10" style={{ borderTop: '1px solid #E6E8F0' }}>
                <span className="inline-block font-jost text-xs font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full" style={{ color: '#A8228A', background: 'rgba(168,34,138,0.08)' }}>Phase {phase.n}</span>
                <h3 className="font-urbanist font-black mb-1" style={{ color: '#06103C', fontSize: 'clamp(1.25rem,2vw,1.75rem)' }}>{phase.title}</h3>
                {phase.sub && <p className="font-jost text-sm text-gray-500 mb-4">{phase.sub}</p>}
                {phase.intro && <p className="font-jost text-gray-600 leading-relaxed mb-5">{phase.intro}</p>}
                {phase.blocks.map((b, bi) => <PhaseBlock key={bi} h={b.h} items={b.items} table={b.table} />)}
                {phase.note && <p className="font-jost text-sm text-gray-500 italic mt-4">{phase.note}</p>}
              </div>
            ))}

            <div className="rounded-2xl p-8 mb-14" style={{ background: '#F6F7FB' }}>
              <h3 className="font-urbanist font-black mb-3" style={{ color: '#06103C' }}>Explore Our Core Service</h3>
              <p className="font-jost text-gray-600">For full details on Keentel Engineering&apos;s study capabilities, visit: <Link href="/service/power-system-studies" className="underline font-semibold" style={{ color: '#A8228A' }}>Power System Studies Services</Link>.</p>
            </div>

            <div className="text-center rounded-3xl p-10" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 50%, #5B2A86 100%)' }}>
              <h3 className="font-urbanist font-black text-white mb-4 text-2xl sm:text-3xl">Ready to Solve Your Power System Challenges?</h3>
              <p className="font-jost text-white/80 mb-6 leading-relaxed">The projects above demonstrate how Keentel Engineering delivers practical, compliance-driven solutions for complex electrical systems. Whether you are interconnecting a renewable plant, expanding an industrial facility, or managing grid reliability, our engineers provide accurate analysis and actionable recommendations through our core Power System Studies Services.</p>
              <p className="font-jost text-white/80 mb-8 leading-relaxed">If you need support with harmonic analysis, load flow modeling, or protection coordination, we&apos;re here to help.</p>
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}>Request a Proposal or Schedule a Consultation</Link>
            </div>

            <div className="mt-16 pt-10" style={{ borderTop: '1px solid #E6E8F0' }}>
              <h3 className="font-urbanist font-black mb-4" style={{ color: '#06103C' }}>Related Technical Articles &amp; Resources</h3>
              <p className="font-jost text-gray-600 mb-5">For deeper technical insights into power system studies, harmonic analysis, and grid compliance, explore these expert resources from Keentel Engineering:</p>
              <ul className="space-y-2 list-disc pl-5">
                {relatedArticles.map(([title, url], i) => (
                  <li key={i}><a href={url} target="_blank" rel="noopener noreferrer" className="font-jost text-sm font-semibold underline" style={{ color: '#A8228A' }}>{title}</a></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="rounded-2xl p-6" style={{ background: '#F6F7FB', border: '1px solid #E6E8F0' }}>
              <p className="font-jost text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>About the Author</p>
              <Img src="/images/power-system-study-process/author.jpeg" fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/WhatsApp+Image+2026-04-10+at+6.43.17+PM-1920w.jpeg" alt="Sonny Patel P.E." className="w-20 h-20 rounded-full object-cover mb-4" />
              <p className="font-urbanist font-bold text-lg mb-1" style={{ color: '#06103C' }}>Sonny Patel P.E. EC</p>
              <p className="font-jost text-sm text-gray-500 mb-3">IEEE Senior Member</p>
              <p className="font-jost text-sm text-gray-600 leading-relaxed">In 1995, Sandip (Sonny) R. Patel earned his Electrical Engineering degree from the University of Illinois. For three decades, he has been shaping the future of engineering as a licensed Professional Engineer across multiple states, a Licensed Electrical Contractor in Florida, and the founder and CEO of Keentel LLC.</p>
            </div>

            <div className="rounded-2xl p-6" style={{ background: '#F6F7FB', border: '1px solid #E6E8F0' }}>
              <p className="font-urbanist font-black text-lg mb-4" style={{ color: '#06103C' }}>Services</p>
              <ul className="space-y-2">
                {relatedServices.map(([label, href], i) => (
                  <li key={i}><Link href={href} className="font-jost text-sm font-semibold" style={{ color: '#A8228A' }}>{label}</Link></li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border: '1px solid #E6E8F0' }}>
              <Img src="/images/power-system-study-process/cta-side.jpg" fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-ab1f3497-1920w.jpg" alt="Keentel field team" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="font-urbanist font-black mb-2" style={{ color: '#06103C' }}>Let&apos;s Discuss Your Project</h4>
                <p className="font-jost text-sm text-gray-600 mb-5">Let&apos;s book a call to discuss your electrical engineering project that we can help you with.</p>
                <div className="space-y-3">
                  <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="block text-center px-6 py-3 rounded-full font-jost font-semibold text-white text-sm transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Schedule A Consultation</Link>
                  <a href="https://irp.cdn-website.com/1253891b/files/uploaded/Keentel+Engineering+Company+Profile.pdf" target="_blank" rel="noopener noreferrer" className="block text-center px-6 py-3 rounded-full font-jost font-semibold text-sm border-2 transition-all hover:bg-gray-50" style={{ borderColor: '#06103C', color: '#06103C' }}>Download Company Profile</a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}
