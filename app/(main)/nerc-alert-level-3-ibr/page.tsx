'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'

// ── FAQ data ─────────────────────────────────────────────────────────────
const faqGroups = [
  {
    group: 'General',
    items: [
      { q: 'What is the purpose of the NERC Level 3 Alert on IBR Performance and Modeling?', a: 'This alert aims to improve modeling accuracy and reliability of Inverter-Based Resources (IBRs) on the Bulk Power System (BPS) by urging GOs, TOs, TPs, and PCs to enhance criteria, policies, and procedures for interconnection, modeling, and performance verification. Keentel Service: Regulatory gap analysis and NERC alert compliance planning.' },
      { q: 'Who must comply with the NERC Level 3 Alert?', a: 'All registered entities in the roles of GO, TO, TP, or PC are expected to acknowledge and respond. Although not enforceable like Reliability Standards, failure to follow may still lead to reliability risks and scrutiny. Keentel Service: Entity-specific action plan development and documentation submission support.' },
      { q: 'Is compliance with this alert mandatory?', a: 'No, but it is strongly urged. While it is not a Reliability Standard, entities are expected to implement the Essential Actions to maintain grid reliability. Keentel Service: Strategic advisory on voluntary action implementation and future compliance alignment.' },
      { q: 'What is an Inverter-Based Resource (IBR)?', a: 'IBRs are energy facilities like solar PV, Type 3/4 wind, BESS, or fuel cells that inject real power via inverters or converters. Keentel Service: IBR modeling support and PSSE/TSAT integration for solar, wind, and BESS.' },
    ],
  },
  {
    group: 'Engineering & Interconnection',
    items: [
      { q: 'What are TOs and TPs expected to update in their interconnection requirements?', a: 'They must include performance-based criteria for voltage control, frequency response, ride-through capability, post-disturbance behavior, and reactive power support. Keentel Service: Development and publication of standardized IBR performance specs.' },
      { q: 'Why is uniform IBR performance necessary?', a: 'It ensures predictable behavior across the grid during normal and disturbed conditions, minimizing cascading failures. Keentel Service: System studies to verify conformity and recommend tuning.' },
      { q: 'What are the key technical criteria to be defined in interconnection studies?', a: 'Interconnection studies for IBRs must clearly define technical performance criteria to ensure compliance with NERC reliability standards and maintain BPS stability, including voltage control deadbands, frequency droop response limits, ride-through thresholds, and current priority logic. Keentel Service: Development of IBR commissioning plans, model validation protocols, and customized interconnection test procedures.' },
      { q: 'What engineering studies are required?', a: 'The required scope depends on the facility and planning region, but commonly includes load flow, short-circuit, protection coordination, dynamic stability, ride-through, model benchmarking, and EMT studies. Keentel develops the study matrix with the utility, TP, or PC and prepares traceable technical deliverables.' },
      { q: 'What is IEEE 2800?', a: 'IEEE 2800 establishes interconnection and interoperability requirements for inverter-based resources connected to transmission and sub-transmission systems, including voltage and frequency ride-through, reactive power, control, protection, modeling, and validation expectations.' },
      { q: 'What is PRC-024?', a: 'PRC-024 addresses frequency and voltage protection settings for generating resources. For IBR facilities, protection settings must be coordinated with equipment capability and applicable ride-through requirements so the plant does not trip unnecessarily during grid disturbances.' },
    ],
  },
  {
    group: 'Modeling and Verification',
    items: [
      { q: 'What does "model quality" mean in the context of IBRs?', a: 'It refers to the fidelity and accuracy of dynamic models (PSPD/EMT) used to represent real-world behavior of IBRs during disturbances. Keentel Service: Model validation reports and EMT benchmarking.' },
      { q: 'What documentation should TPs and PCs obtain from GOs?', a: 'TPs and PCs must receive validated dynamic model reports (EMT or PSPD), parameter mapping summaries, and formal attestations verifying model quality and accuracy. Keentel Service: Full coordination with OEMs and project stakeholders to generate and deliver NERC-compliant documentation packages.' },
      { q: 'How should entities verify that models match as-built performance?', a: 'Through field data comparison, performance testing during commissioning, and post-event analysis. Keentel Service: Site commissioning supervision and field-model correlation analysis.' },
      { q: 'What is the purpose of performance testing in the modeling process?', a: 'To confirm that simulated response of models mirrors real-world operation, enabling reliable planning and protection studies. Keentel Service: Development of performance test protocols and automated test reports.' },
      { q: 'Why are EMT models emphasized?', a: 'Because they capture high-frequency dynamics and are more accurate for studying fast control responses in modern IBRs. Keentel Service: EMT modeling using PSCAD and real-time simulation with HYPERSIM or RTDS.' },
    ],
  },
  {
    group: 'Change Management & Lifecycle',
    items: [
      { q: 'What is required under enhanced change management for GOs?', a: 'Tracking and communication of any changes (firmware, settings, model parameters) to TPs and PCs, ensuring all representations remain accurate. Keentel Service: Lifecycle management system design and configuration tracking solutions.' },
      { q: 'What IBR data must GOs retain as part of compliance?', a: 'Generator Owners must retain inverter and plant make/model information, firmware versions, voltage and frequency ride-through curves, plant controller specifications, and protection system settings. Keentel Service: Centralized IBR data repository setup with automated update alerts.' },
      { q: 'What\u2019s the importance of tracking firmware updates?', a: 'Firmware changes can alter control behavior. If not tracked, they may lead to discrepancies between models and field performance. Keentel Service: Firmware tracking and post-upgrade verification protocols.' },
      { q: 'Does the alert apply to BESS?', a: 'Yes. Battery energy storage systems use inverter-based controls and must be represented with accurate equipment, plant-controller, protection, ride-through, and dynamic-model information when they fall within the applicable registered-entity and Bulk Power System scope.' },
      { q: 'Does the alert apply to hybrid plants?', a: 'Yes. Hybrid facilities combining solar, wind, BESS, or other resources require coordinated plant-level controls and models that accurately represent the interaction between technologies across expected operating modes.' },
    ],
  },
  {
    group: 'Reporting & Coordination',
    items: [
      { q: 'What is the status of the original alert response period?', a: 'The original acknowledgment and response windows have closed. Generator Owners should now preserve approved submissions, close identified gaps, maintain current models and firmware records, and be prepared to demonstrate ongoing alignment during audits and future standards implementation. Keentel Service: Post-alert gap closure, evidence management, and lifecycle compliance support.' },
      { q: 'What systems are used for acknowledgment and submission?', a: 'The NERC Alert System, which requires acknowledgment, submission, and approval of each response. Keentel Service: End-to-end support in navigating the NERC Alert System portal.' },
    ],
  },
  {
    group: 'Strategic & Future Planning',
    items: [
      { q: 'How does this alert connect with future Reliability Standards?', a: 'The alert directly supports development of future Reliability Standards by collecting data that will influence updates to FAC-001, FAC-002, and other NERC standards, shaped in response to FERC Order 901. Keentel Service: NERC Reliability Standards alignment consulting and IBR future-readiness strategy development.' },
      { q: 'Why is accurate IBR modeling critical to Bulk Power System reliability?', a: 'Transmission planning, protection coordination, and operational stability all rely on precise system models. Inaccurate EMT or PSPD models can lead to misinformed grid responses and cascading failures. Keentel Service: Comprehensive IBR model validation, benchmarking, and correction services.' },
      { q: 'How can Keentel Engineering help across the lifecycle of NERC compliance?', a: 'From interconnection studies, EMT modeling, and commissioning to change management, Keentel offers complete IBR lifecycle services: PSSE/TSAT/EMT model development, performance testing and validation, NERC Alert reporting assistance, change management system setup, real-time model tuning, and regulatory training workshops.' },
    ],
  },
  {
    group: 'Know More About NERC Alert Level 3',
    items: [
      { q: 'What is the NERC Severity Risk Index (SRI)?', a: 'A score that shows how serious power system problems are each day, adding up electricity lost from transmission, generation, and load issues. It ranges from 0 to 1000, higher means more grid impact.' },
      { q: 'What are NERC Alerts?', a: 'Official messages sent to power companies to warn them about urgent reliability or modeling issues, helping prevent blackouts and keep the grid running safely.' },
      { q: 'How many NERC standards are there?', a: 'NERC has about 100 different rules covering how the power grid should be planned, operated, and protected.' },
      { q: 'What does NERC stand for?', a: 'North American Electric Reliability Corporation, a nonprofit group that sets and enforces rules to keep the electric grid safe and reliable across North America.' },
      { q: 'What is a NERC Violation Severity Level (VSL)?', a: 'A rating of how serious a rule violation is: Low, Moderate, High, or Severe, based on how much risk it causes to the power grid.' },
      { q: 'What are NERC Reliability Standards?', a: 'Rules that power companies must follow to keep the grid running safely and reliably, focused on performance, safety, and risk management.' },
      { q: 'What does the NERC Alert system do?', a: 'Sends out critical updates and instructions to registered power companies, helping ensure they follow the latest safety and reliability rules.' },
      { q: 'What is the difference between Level 2 and Level 3 NERC Alerts?', a: 'Level 2 alerts request action with some urgency. Level 3 alerts, like the May 2025 IBR alert, require immediate attention, coordinated response, and evidence submission, and often signal system-wide risks.' },
      { q: 'What is meant by "equipment-specific PSPD models"?', a: 'Positive-sequence phasor domain models tailored to each IBR\u2019s design and control characteristics, OEM-validated and field-benchmarked to align with site-specific inverter behavior.' },
      { q: 'How does Keentel support NERC compliance for IBRs in ERCOT and PJM?', a: 'Keentel delivers PSSE, PSCAD, and TSAT modeling, benchmark testing, firmware audit trails, and alert submission prep specific to ERCOT and PJM compliance protocols.' },
      { q: 'What are the risks after the original response deadline?', a: 'Incomplete submissions, unresolved modeling gaps, or outdated equipment records can create audit exposure, weaken planning-study accuracy, and attract scrutiny under FAC requirements and emerging IBR performance standards.' },
      { q: 'What happens after the response deadline?', a: 'Entities should retain approved responses, close identified gaps, update models and records as equipment changes, coordinate revisions with TPs and PCs, and maintain evidence that supports future audits, planning studies, and standards implementation.' },
      { q: 'Does Keentel help with firmware tracking and model updates?', a: 'Yes. Keentel provides full change management system support, including firmware logs, parameter adjustments, and update notifications to TPs/PCs, all recorded with audit-ready trails.' },
      { q: 'Can Keentel handle both modeling and NERC submission?', a: 'Absolutely. From IBR benchmarking and conformity testing to RSAW response prep and NERC Alert System submission, Keentel manages the full lifecycle of Level 3 alert compliance.' },
    ],
  },
]

function FaqAccordion({ items, startIndex }: { items: { q: string; a: string }[]; startIndex: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className="overflow-hidden rounded-2xl border transition-all duration-300" style={{ borderColor: isOpen ? '#A8228A' : '#E6E8F0', boxShadow: isOpen ? '0 4px 24px rgba(168,34,138,0.1)' : 'none' }}>
            <button onClick={() => setOpenIndex(isOpen ? null : i)} className="flex w-full items-center gap-3 p-4 text-left sm:gap-5 sm:p-6">
              <span className="w-7 flex-shrink-0 font-urbanist text-xl font-black text-black sm:w-8 sm:text-2xl">{String(startIndex + i + 1).padStart(2, '0')}</span>
              <span className="flex-1 font-urbanist text-base font-bold leading-snug sm:text-xl" style={{ color: '#0B1230' }}>{item.q}</span>
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300" style={{ background: isOpen ? '#A8228A' : '#F6F7FB', color: isOpen ? '#fff' : '#A8228A', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              </span>
            </button>
            {isOpen && <div className="px-4 pb-5 pl-14 sm:px-6 sm:pb-6 sm:pl-[72px]"><p className="font-jost text-sm leading-relaxed text-gray-600 sm:text-base">{item.a}</p></div>}
          </div>
        )
      })}
    </div>
  )
}

export default function NercAlertLevel3IbrPage() {
  const [openGroups, setOpenGroups] = useState<number[]>([0])

  const requirements = [
    { t: 'Validate Models', d: 'Ensure EMT and PSPD models match actual equipment behavior.' },
    { t: 'Conduct Benchmark Tests', d: 'Use field and commissioning tests to verify inverter response and align models with real-world behavior.' },
    { t: 'Track Firmware & Design Changes', d: 'Document all equipment settings, control logic, and firmware updates, and notify grid planners whenever inverter parameters change.' },
    { t: 'Maintain Critical Data', d: 'Archive inverter and turbine specifications, control strategies, and configuration files for audits.' },
    { t: 'Engineering Documentation', d: 'Review relay settings, protection coordination, equipment parameters, dynamic models, and compliance evidence before utility or NERC review.' },
  ]

  const services = [
    { t: 'Compliance Documentation', d: 'Technical write-ups for model settings, control hierarchy, and plant design; custom reports for TPs and PCs; IBR lifecycle information management.' },
    { t: 'Model Validation & Benchmarking', d: 'EMT/PSPD benchmarking reports using PSSE, TSAT, PSCAD/EMTDC; simulation-vs-field data comparisons; OEM collaboration on model accuracy.' },
    { t: 'Conformity Assessments', d: 'Custom test plans aligned with NERC\u2019s essential actions; field commissioning audits and inverter performance verification.' },
    { t: 'Change Management Systems', d: 'Firmware update tracking, real-time model adjustment support, and audit-trail logs to capture any equipment or model change.' },
    { t: 'Submission Assistance', d: 'Help with NERC Alert acknowledgment, response preparation, and deadline tracking; liaison with TPs and PCs throughout the process.' },
    { t: 'Protection Coordination', d: 'Evaluate protective-device selectivity, clearing performance, and coordination with facility and grid ride-through requirements.' },
    { t: 'Relay Setting Review', d: 'Review voltage, frequency, overcurrent, and plant protection settings against equipment capability and applicable reliability criteria.' },
    { t: 'PSS®E Dynamic Modeling', d: 'Develop, validate, and tune positive-sequence dynamic models for planning studies and utility submission.' },
    { t: 'PSCAD EMT Studies', d: 'Perform electromagnetic transient analysis for fast controls, weak-grid behavior, ride-through, and inverter interactions.' },
    { t: 'Utility Interconnection Support', d: 'Coordinate technical requirements, model exchanges, study comments, and corrective actions with utilities, TPs, and PCs.' },
    { t: 'NERC Evidence Package Preparation', d: 'Assemble traceable calculations, settings, model records, test results, attestations, and change-management evidence.' },
  ]

  return (
    <>
      <Header />
      <main>
        {/* ── HERO ── */}
        <section className="relative flex min-h-[700px] items-center overflow-hidden bg-[#06103C] pb-14 pt-28 sm:min-h-[760px] sm:pb-20 sm:pt-36 lg:min-h-[780px]">
          <Image src="/images/home/nerc.webp" alt="High-voltage substation supporting inverter-based resource compliance" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,60,0.96)_0%,rgba(6,16,60,0.86)_58%,rgba(6,16,60,0.68)_100%)]" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(199,46,158,0.18),transparent_38%)]" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#06103C]/70 to-transparent" aria-hidden="true" />
          <div className="relative mx-auto min-w-0 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="min-w-0 max-w-5xl">
              <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 font-jost text-xs text-white/65"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><Link href="/service/nerc-compliance">NERC Compliance</Link><span>/</span><span className="text-white">Level 3 IBR Alert</span></nav>
              <span className="mb-5 inline-flex max-w-full items-start gap-2 rounded-2xl border border-[#E44BB8]/30 bg-[#A8228A]/15 px-4 py-2 font-jost text-[0.68rem] font-bold uppercase leading-relaxed tracking-[0.12em] text-[#F075D2] sm:items-center sm:rounded-full sm:text-xs sm:tracking-[0.16em]"><span className="mt-1 h-2 w-2 flex-none rounded-full bg-[#F075D2] sm:mt-0" /><span className="min-w-0">NERC Compliance &amp; IBR Modeling Specialists</span></span>
              <h1 className="mb-6 max-w-5xl font-urbanist text-[2.35rem] font-black leading-[1.04] text-white sm:text-5xl lg:text-[4.25rem]">NERC Level 3 Compliance for IBRs, <span className="text-[#E44BB8]">Done Right.</span></h1>
              <p className="mb-8 max-w-4xl font-jost text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl">The original response window has closed, but model quality, equipment-change tracking, evidence retention, and audit readiness remain active responsibilities for inverter-based resources across ERCOT, PJM, and the broader Bulk Power System.</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C72E9E] to-[#8D237F] px-7 py-4 font-jost font-semibold text-white shadow-[0_12px_30px_rgba(168,34,138,0.3)] transition-all hover:-translate-y-0.5 sm:w-auto">Schedule A Consultation <span aria-hidden="true">→</span></Link>
                <Link href="/services" className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-white/30 bg-white/[0.04] px-7 py-4 font-jost font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto">Our Services</Link>
              </div>
              <div className="mt-9 max-w-3xl border-t border-white/15 pt-6 sm:mt-11 sm:pt-7">
                <p className="mb-4 font-jost text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/45">Certifications &amp; Memberships</p>
                <Image src="/images/cert-logos.png" alt="BBB Accredited, IEEE Member, NERC Certified, Florida Licensed" width={640} height={180} className="h-auto max-h-16 w-auto max-w-full object-contain brightness-0 invert sm:max-h-24" />
              </div>
            </div>
          </div>
        </section>

        {/* ── ALERT ISSUED / INTRO ── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#06103C] shadow-[0_24px_60px_rgba(6,16,60,0.18)]">
              <Image src="/images/nerc-alert-level-3-ibr-compliance-engineers.png" alt="Engineers validating inverter-based resource models in a grid control room" width={1536} height={1024} sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06103C] via-[#06103C]/80 to-transparent p-6 pt-20 sm:p-8 sm:pt-24">
                <p className="font-jost text-xs font-bold uppercase tracking-[0.17em] text-[#EE6CCF]">Reliability Event</p>
                <p className="mt-2 font-urbanist text-3xl font-black text-white sm:text-4xl">1,178 MW</p>
                <p className="mt-1 max-w-md font-jost text-sm leading-relaxed text-white/70">Widespread solar PV generation loss documented during the 2016 Blue Cut Fire disturbance.</p>
              </div>
            </div>
            <div>
              <span className="mb-4 inline-flex rounded-full bg-[#A8228A]/[0.08] px-4 py-2 font-jost text-xs font-bold uppercase tracking-[0.16em] text-[#A8228A]">2025 Level 3 Alert — Ongoing Readiness</span>
              <h2 className="mb-6 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl lg:text-5xl">The Industry Is Under Alert. <span className="text-[#A8228A]">Are You Prepared?</span></h2>
              <div className="space-y-4 font-jost text-base leading-relaxed text-gray-600">
                <p>In 2025, NERC issued a Level 3 alert addressing IBR performance and modeling. Generator Owners of solar, wind, storage, and other inverter-based resources were directed to validate equipment models and performance. The underlying reliability concern remains current.</p>
                <p>This alert primarily affects solar PV, wind generation, battery energy storage systems (BESS), hybrid generation facilities, and other inverter-based resources connected to the Bulk Power System.</p>
                <p>Although the original response period has closed, maintaining accurate models, traceable equipment records, and verified performance remains essential for planning accuracy, audit readiness, and system reliability.</p>
              </div>
              <Link href="/about" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#06103C] px-7 py-3.5 font-jost font-semibold text-[#06103C] transition-all hover:bg-[#06103C] hover:text-white sm:w-auto">Learn More About Us <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        {/* ── INDUSTRY IMPACT ── */}
        <section className="border-y border-[#E2E5EE] bg-[#F6F7FB] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.17em] text-[#A8228A]">Industry Impact</p>
                <h2 className="font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl">Why NERC Issued the Level 3 Alert</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#DDE1EB] bg-white p-6 shadow-[0_8px_30px_rgba(6,16,60,0.05)]">
                  <p className="mb-3 font-urbanist text-lg font-black text-[#06103C]">System-wide consequences</p>
                  <p className="font-jost text-sm leading-relaxed text-gray-600">NERC&apos;s disturbance analysis documented a 1,178 MW widespread solar PV generation loss during the 2016 Blue Cut Fire, illustrating how inaccurate settings and models can create system-wide consequences.</p>
                </div>
                <div className="rounded-2xl border border-[#DDE1EB] bg-white p-6 shadow-[0_8px_30px_rgba(6,16,60,0.05)]">
                  <p className="mb-3 font-urbanist text-lg font-black text-[#06103C]">Model and performance gaps</p>
                  <p className="font-jost text-sm leading-relaxed text-gray-600">The alert was driven by multiple grid disturbances that exposed weaknesses in inverter performance, model accuracy, ride-through capability, and equipment configuration management.</p>
                </div>
                <div className="rounded-2xl border border-[#A8228A]/20 bg-[#A8228A]/[0.05] p-6 sm:col-span-2">
                  <p className="font-jost text-sm leading-relaxed text-gray-700">The alert demands urgent compliance from Generator Owners, Transmission Planners, Transmission Owners, and Planning Coordinators. Non-compliance won&apos;t incur direct penalties, but can trigger audit flags, FERC scrutiny, and future violations under FAC-001, FAC-002, or related standards.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT GENERATOR OWNERS MUST DO ── */}
        <section className="relative overflow-hidden bg-[#06103C] py-20 sm:py-28">
          <div className="absolute -right-24 top-12 h-80 w-80 rounded-full bg-[#A8228A]/20 blur-[100px]" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 max-w-3xl">
              <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.17em] text-[#E44BB8]">Essential Actions</p>
              <h2 className="mb-4 font-urbanist text-3xl font-black text-white sm:text-4xl lg:text-5xl">What Generator Owners Must Do</h2>
              <p className="font-jost text-base leading-relaxed text-white/65 sm:text-lg">A practical engineering path from model validation through evidence retention and ongoing configuration governance.</p>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {requirements.map((r, i) => (
                <div key={i} className={`group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.055] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#E44BB8]/40 hover:bg-white/[0.08] sm:p-7 ${i === 4 ? 'lg:col-span-2' : ''}`}>
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E44BB8]/20 bg-[#A8228A]/20 font-urbanist text-sm font-black text-[#F075D2]">{String(i + 1).padStart(2, '0')}</div>
                    <span className="h-px w-12 bg-gradient-to-r from-[#E44BB8]/70 to-transparent transition-all group-hover:w-20" />
                  </div>
                  <h3 className="mb-3 font-urbanist text-xl font-bold leading-snug text-white">{r.t}</h3>
                  <p className="font-jost text-sm leading-relaxed text-white/60">{r.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 grid items-center gap-4 rounded-2xl border border-[#E44BB8]/25 bg-gradient-to-r from-[#A8228A]/20 to-white/[0.04] p-6 sm:grid-cols-[auto_1fr] sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#F075D2]/30 bg-[#A8228A]/30 text-[#F075D2]"><svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M12 8v5l3 2" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="9" strokeWidth="2"/></svg></div>
              <div><p className="mb-1 font-jost text-xs font-bold uppercase tracking-widest text-[#F075D2]">Post-Alert Readiness</p><p className="font-urbanist text-2xl font-black text-white sm:text-3xl">Response Window Closed</p><p className="mt-1 font-jost text-sm text-white/60 sm:text-base">Gap closure, evidence retention, and model governance continue.</p></div>
            </div>
          </div>
        </section>

        {/* ── KEENTEL SERVICES ── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div><p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.17em] text-[#A8228A]">Engineering + Compliance</p><h2 className="font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl lg:text-5xl">Keentel&apos;s NERC Alert Response Services</h2></div>
              <p className="max-w-2xl font-jost text-base leading-relaxed text-gray-600 lg:justify-self-end">Keentel Engineering offers end-to-end support for NERC L3 Alert compliance, with a focus on engineering, procurement, construction and associated regulatory compliance.</p>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <div key={i} className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E0E4ED] bg-[#F8F9FC] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#A8228A]/30 hover:bg-white hover:shadow-[0_16px_40px_rgba(6,16,60,0.09)]">
                  <span className="absolute right-5 top-4 font-urbanist text-4xl font-black text-[#06103C]/[0.045]">{String(i + 1).padStart(2, '0')}</span>
                  <div className="mb-5 h-1 w-10 rounded-full bg-gradient-to-r from-[#C72E9E] to-[#5B2A86] transition-all duration-300 group-hover:w-16" />
                  <h3 className="mb-3 pr-8 font-urbanist text-lg font-bold leading-snug text-[#06103C]">{s.t}</h3>
                  <p className="font-jost text-sm leading-relaxed text-gray-600">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#06103C] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="mb-2 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#C72E9E' }}>Engineering Software</p>
              <h2 className="font-urbanist text-2xl font-black text-white sm:text-3xl">Advanced IBR Modeling &amp; Analysis Platforms</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {['ETAP', 'PSS®E', 'PSCAD', 'TSAT', 'SKM', 'PowerFactory'].map(tool => (
                <div key={tool} className="flex min-h-20 items-center justify-center rounded-xl px-4 py-5 text-center font-urbanist text-lg font-bold text-white" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>{tool}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#E6E8F0] bg-[#F6F7FB] py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
            <div>
              <p className="mb-1 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#A8228A' }}>Proven Power-System Experience</p>
              <p className="font-urbanist text-xl font-bold" style={{ color: '#06103C' }}>30+ Years <span className="text-[#A8228A]">•</span> 21 Licensed Engineers <span className="text-[#A8228A]">•</span> Utilities <span className="text-[#A8228A]">•</span> Developers <span className="text-[#A8228A]">•</span> EPC Contractors</p>
            </div>
            <Link href="/our-work" className="inline-flex flex-shrink-0 items-center justify-center rounded-full px-7 py-3.5 font-jost text-sm font-semibold text-white" style={{ background: '#0B1A5B' }}>View Case Studies</Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        {/* ── URGENCY / INDUSTRY RESPONSE ── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
            <div>
              <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.17em] text-[#A8228A]">Ongoing Compliance</p>
              <h2 className="mb-6 font-urbanist text-3xl font-black leading-tight text-[#06103C] sm:text-4xl lg:text-5xl">NERC Level 3 Alert: Urgency, Compliance, and Industry Response</h2>
              <div className="space-y-4 font-jost text-base leading-relaxed text-gray-600">
                <p>The 2025 NERC Level 3 Alert established essential industry actions related to inverter-based resource performance. Generator Owners must continue to maintain accurate PSPD and EMT representations, equipment-specific records, and defensible verification evidence.</p>
                <p>Keentel Engineering provides tailored compliance engineering services that directly respond to this alert, covering every aspect from IBR model validation to documentation submission and change management tracking.</p>
                <p>Keentel Engineering supports Generator Owners throughout the complete compliance lifecycle, including engineering studies, model validation, protection review, utility coordination, documentation preparation, and ongoing change management.</p>
                <p>Whether you&apos;re working in ERCOT, PJM, or another planning region, our team helps align your IBR fleet with NERC, FAC, and PRC requirements while preparing records for audits, model updates, and emerging standards.</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] bg-[#06103C] shadow-[0_24px_60px_rgba(6,16,60,0.16)]">
              <Image src="/images/services/nerc-compliance/Engineering-Driven Compliance for the Power Gri.jpg" alt="Engineering-driven compliance for the modern power grid" width={1000} height={900} sizes="(max-width: 1024px) 100vw, 45vw" className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06103C]/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8"><p className="font-jost text-xs font-bold uppercase tracking-[0.17em] text-[#EE6CCF]">Lifecycle Coverage</p><p className="mt-2 font-urbanist text-2xl font-black text-white sm:text-3xl">Model. Validate. Document. Maintain.</p></div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE KEENTEL ── */}
        {/* ── CTA ── */}
        <section className="py-20 sm:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 50%, #5B2A86 100%)' }}>
          <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black text-white mb-6" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)' }}>Get Started, Risk-Free Compliance Assessment</h2>
            <p className="font-jost text-white/80 mb-8 leading-relaxed">The response date has passed, but unresolved model, firmware, testing, and documentation gaps still create reliability and audit risk. Schedule a consultation to review your current readiness and corrective-action priorities.</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-jost font-semibold text-white transition-all hover:scale-105 sm:min-w-[240px] sm:flex-1" style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}>Schedule a Consultation</Link>
              <Link href="tel:813-389-7871" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-4 font-jost font-semibold text-white transition-all hover:border-white/60 sm:min-w-[240px] sm:flex-1">Call 813-389-7871</Link>
              <Link href="mailto:contact@keentelengineering.com" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-4 font-jost font-semibold text-white transition-all hover:border-white/60 sm:min-w-[240px] sm:flex-1">Email Us</Link>
            </div>
          </div>
        </section>

        <ContactForm />

        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
            <div className="lg:sticky lg:top-28 lg:col-span-4">
              <p className="mb-4 font-jost text-xs font-bold uppercase tracking-widest" style={{ color: '#A8228A' }}>Questions We Hear</p>
              <h2 className="mb-6 font-urbanist text-4xl font-black leading-tight sm:text-5xl" style={{ color: '#0B1230' }}>Answers,<br />before you ask.</h2>
              <p className="mb-8 font-jost text-base leading-relaxed" style={{ color: '#4B5563' }}>Detailed guidance on the NERC Level 3 Alert, IBR modeling, compliance, verification, reporting, and lifecycle requirements.</p>
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 rounded-full px-7 py-4 font-jost font-semibold text-white transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Ask Us Directly <span aria-hidden>→</span></Link>
            </div>
            <div className="lg:col-span-8">
              {faqGroups.map((group, groupIndex) => {
                const startIndex = faqGroups.slice(0, groupIndex).reduce((total, previousGroup) => total + previousGroup.items.length, 0)
                const isGroupOpen = openGroups.includes(groupIndex)
                return (
                  <div key={group.group} className="mb-6 overflow-hidden rounded-2xl border border-[#E6E8F0] bg-white shadow-sm last:mb-0">
                    <button
                      type="button"
                      aria-expanded={isGroupOpen}
                      onClick={() => setOpenGroups(current => current.includes(groupIndex) ? current.filter(index => index !== groupIndex) : [...current, groupIndex])}
                      className="flex w-full items-center justify-between gap-4 bg-[#F6F7FB] px-4 py-4 text-left transition-colors hover:bg-[#F0EDF7] sm:px-6 sm:py-5"
                    >
                      <span className="flex min-w-0 items-center gap-3 sm:gap-4">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl font-urbanist text-sm font-black text-white" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>{String(groupIndex + 1).padStart(2, '0')}</span>
                        <span className="min-w-0">
                          <span className="block font-urbanist text-sm font-black uppercase tracking-wider sm:text-base" style={{ color: '#0B1230' }}>{group.group}</span>
                          <span className="mt-1 block font-jost text-xs text-gray-500">Questions {String(startIndex + 1).padStart(2, '0')}–{String(startIndex + group.items.length).padStart(2, '0')}</span>
                        </span>
                      </span>
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold transition-transform" style={{ background: '#fff', color: '#A8228A', transform: isGroupOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                    </button>
                    {isGroupOpen && <div className="border-t border-[#E6E8F0] p-3 sm:p-5"><FaqAccordion items={group.items} startIndex={startIndex} /></div>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
