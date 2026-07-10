'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

function Img({ src, fallback, alt, className }: { src: string; fallback: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={className} onError={(e) => { (e.target as HTMLImageElement).src = fallback }} />
}

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
    ],
  },
  {
    group: 'Reporting & Coordination',
    items: [
      { q: 'What are the important deadlines in this alert?', a: 'All Generator Owners must acknowledge receipt of the alert by May 27, 2025, and submit their full compliance response by August 18, 2025 via the NERC Alert System. Keentel Service: End-to-end project management for NERC compliance, including deadline tracking, milestone reporting, and coordination with TPs and PCs.' },
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
      { q: 'What\u2019s the risk of not submitting by the August 18, 2025 deadline?', a: 'Non-submission could trigger red flags during future NERC audits, impact registration status, and attract scrutiny under FAC-001, FAC-002, or future IBR performance standards, potentially raising Severity Risk Index exposure.' },
      { q: 'Does Keentel help with firmware tracking and model updates?', a: 'Yes. Keentel provides full change management system support, including firmware logs, parameter adjustments, and update notifications to TPs/PCs, all recorded with audit-ready trails.' },
      { q: 'Can Keentel handle both modeling and NERC submission?', a: 'Absolutely. From IBR benchmarking and conformity testing to RSAW response prep and NERC Alert System submission, Keentel manages the full lifecycle of Level 3 alert compliance.' },
    ],
  },
]

function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className="rounded-2xl border transition-colors" style={{ borderColor: isOpen ? '#A8228A' : '#E6E8F0', background: isOpen ? 'rgba(168,34,138,0.03)' : '#fff' }}>
            <button onClick={() => setOpenIndex(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 text-left px-5 py-4">
              <span className="font-jost font-semibold text-sm sm:text-base" style={{ color: '#06103C' }}>{item.q}</span>
              <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform" style={{ background: isOpen ? '#A8228A' : '#F3F1F8', color: isOpen ? '#fff' : '#06103C', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </button>
            {isOpen && <div className="px-5 pb-4"><p className="font-jost text-sm text-gray-600 leading-relaxed">{item.a}</p></div>}
          </div>
        )
      })}
    </div>
  )
}

export default function NercAlertLevel3IbrPage() {
  const requirements = [
    { t: 'Validate Models', d: 'Ensure EMT and PSPD models match actual equipment behavior.' },
    { t: 'Conduct Benchmark Tests', d: 'Use field and commissioning tests to verify inverter response and align models with real-world behavior.' },
    { t: 'Track Firmware & Design Changes', d: 'Document all equipment settings, control logic, and firmware updates, and notify grid planners whenever inverter parameters change.' },
    { t: 'Maintain Critical Data', d: 'Archive inverter and turbine specifications, control strategies, and configuration files for audits.' },
  ]

  const services = [
    { t: 'Compliance Documentation', d: 'Technical write-ups for model settings, control hierarchy, and plant design; custom reports for TPs and PCs; IBR lifecycle information management.' },
    { t: 'Model Validation & Benchmarking', d: 'EMT/PSPD benchmarking reports using PSSE, TSAT, PSCAD/EMTDC; simulation-vs-field data comparisons; OEM collaboration on model accuracy.' },
    { t: 'Conformity Assessments', d: 'Custom test plans aligned with NERC\u2019s essential actions; field commissioning audits and inverter performance verification.' },
    { t: 'Change Management Systems', d: 'Firmware update tracking, real-time model adjustment support, and audit-trail logs to capture any equipment or model change.' },
    { t: 'Submission Assistance', d: 'Help with NERC Alert acknowledgment, response preparation, and deadline tracking; liaison with TPs and PCs throughout the process.' },
  ]

  const whyChoose = [
    { t: '30+ Years of Grid Compliance and Power Systems Engineering' },
    { t: 'Proven Track Record in IBR Design, Modeling & Integration' },
    { t: 'Deep Familiarity with NERC, FAC Standards, and FERC Requirements' },
    { t: 'Hands-On Support from Validation to Documentation to Submission' },
  ]

  return (
    <>
      <Header />
      <main>
        {/* ── HERO ── */}
        <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 50%, #5B2A86 100%)' }}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-3xl rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #C72E9E 0%, transparent 70%)' }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 font-jost" style={{ color: '#C72E9E' }}>From Keentel Engineering</span>
              <h1 className="font-urbanist font-black text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>NERC Level 3 Compliance for IBRs, Done Right with Keentel Engineering</h1>
              <p className="font-jost text-white/80 text-lg leading-relaxed mb-8">Stay ahead of the August 18, 2025 deadline. Ensure your inverter-based resource (IBR) modeling, testing, and documentation are fully compliant with NERC&apos;s latest alert across ERCOT, PJM, and the broader Bulk Power System.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}>Schedule A Consultation</Link>
                <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/25 hover:border-white/60 transition-all">Our Services</Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Img src="/images/nerc-alert/hero.png" fallback="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/new+image-1920w.png" alt="NERC Level 3 IBR compliance" className="w-full h-72 sm:h-96 object-cover" />
            </div>
          </div>
        </section>

        {/* ── ALERT ISSUED / INTRO ── */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 font-jost px-4 py-2 rounded-full" style={{ color: '#A8228A', background: 'rgba(168,34,138,0.08)' }}>May 20, 2025 Alert Issued</span>
            <h2 className="font-urbanist font-black mb-6" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.5rem)' }}>The Industry Is Under Alert, Are You Prepared?</h2>
            <p className="font-jost text-gray-600 leading-relaxed mb-4 text-lg">On <strong style={{ color: '#A8228A' }}>May 20, 2025</strong>, NERC issued its highest-level (Level 3) alert for IBR performance. Generator Owners of solar, wind, storage and other Inverter-Based Resources must validate their equipment models (EMT and PSPD) and performance to prevent grid disruptions. This alert responds to systemic modeling issues that have already led to 15,000+ MW of lost generation on the grid.</p>
            <p className="font-jost text-gray-600 leading-relaxed mb-8">These actions are not optional. Failing to respond accurately could result in audit issues, modeling inaccuracies, reputational risks, and compromise system reliability.</p>
            <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold border-2 transition-all hover:bg-gray-50" style={{ borderColor: '#06103C', color: '#06103C' }}>Learn More About Us</Link>
          </div>
        </section>

        {/* ── CONSULTATION FORM ── */}
        <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-urbanist font-black mb-4" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.25rem)' }}>Request Your Free NERC Compliance Consultation</h2>
              <p className="font-jost text-gray-600">Contact Keentel for a risk-free consultation. Our experts will review your NERC compliance needs and model readiness in ERCOT, PJM, or any region.</p>
            </div>
            <form action="/api/contact" method="POST" className="rounded-3xl p-8 sm:p-10 bg-white shadow-sm" style={{ border: '1px solid #E6E8F0' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>Full Name *</label>
                  <input required name="fullName" className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>Company Name *</label>
                  <input required name="company" className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>Phone *</label>
                  <input required type="tel" name="phone" className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>Email *</label>
                  <input required type="email" name="email" className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }} />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>Facility Type / IBR Technology</label>
                <select name="facilityType" className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }}>
                  <option value="">Select...</option>
                  <option>Solar</option>
                  <option>Wind</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 font-jost" style={{ color: '#06103C' }}>Message</label>
                <textarea name="message" rows={5} className="w-full px-4 py-3.5 rounded-xl border outline-none font-jost text-gray-700 resize-none" style={{ borderColor: '#E6E8F0', background: '#F6F7FB' }} />
              </div>
              <button type="submit" className="w-full py-4 rounded-xl font-jost font-semibold text-white transition-all hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}>Submit</button>
            </form>
          </div>
        </section>

        {/* ── INDUSTRY IMPACT ── */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-urbanist font-black mb-6" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.5rem)' }}>Why NERC Issued the Level 3 Alert, Industry Impact</h2>
            <p className="font-jost text-gray-600 leading-relaxed mb-4">Since 2016, over 15,000 MW of generation loss has occurred due to IBR-related issues, unpredictable by current planning models.</p>
            <p className="font-jost text-gray-600 leading-relaxed mb-4">The alert demands urgent compliance from Generator Owners (GOs), Transmission Planners (TPs), Transmission Owners (TOs), and Planning Coordinators (PCs). Non-compliance won&apos;t incur direct penalties, but can trigger audit flags, FERC scrutiny, and future violations under FAC-001, FAC-002, or related standards.</p>
          </div>
        </section>

        {/* ── WHAT GENERATOR OWNERS MUST DO ── */}
        <section className="py-20 sm:py-24" style={{ background: '#06103C' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-urbanist font-black mb-3 text-white" style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)' }}>What Generator Owners Must Do</h2>
              <p className="font-jost text-white/70">Essential actions required by the NERC Level 3 Alert</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {requirements.map((r, i) => (
                <div key={i} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-urbanist font-black text-sm mb-4" style={{ background: 'rgba(199,46,158,0.15)', color: '#C72E9E' }}>{String(i + 1).padStart(2, '0')}</div>
                  <h4 className="font-urbanist font-bold text-white mb-2 text-lg leading-snug">{r.t}</h4>
                  <p className="font-jost text-white/60 text-sm leading-relaxed">{r.d}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-14 rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="font-jost text-xs uppercase tracking-widest mb-2" style={{ color: '#C72E9E' }}>Meet the Deadline Alert</p>
              <p className="font-urbanist font-black text-3xl text-white mb-2">August 18, 2025</p>
              <p className="font-jost text-white/60">NERC Response Deadline</p>
            </div>
          </div>
        </section>

        {/* ── KEENTEL SERVICES ── */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-urbanist font-black mb-3" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.5rem)' }}>Keentel&apos;s NERC Alert Response Services</h2>
              <p className="font-jost text-gray-600 max-w-2xl mx-auto">Keentel Engineering offers end-to-end support for NERC L3 Alert compliance, with a focus on engineering, procurement, construction and associated regulatory compliance.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {services.map((s, i) => (
                <div key={i} className="rounded-2xl p-6" style={{ background: '#F6F7FB', border: '1px solid #E6E8F0' }}>
                  <h4 className="font-urbanist font-bold mb-2 text-base leading-snug" style={{ color: '#06103C' }}>{s.t}</h4>
                  <p className="font-jost text-gray-600 text-sm leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 sm:py-24" style={{ background: '#F6F7FB' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black text-center mb-14" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.5rem)' }}>Frequently Asked Questions</h2>
            {faqGroups.map((g, gi) => (
              <div key={gi} className="mb-10">
                <h3 className="font-jost text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#A8228A' }}>{g.group}</h3>
                <FaqAccordion items={g.items} />
              </div>
            ))}
          </div>
        </section>

        {/* ── URGENCY / INDUSTRY RESPONSE ── */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-urbanist font-black mb-6" style={{ color: '#06103C', fontSize: 'clamp(1.75rem,3vw,2.5rem)' }}>NERC Level 3 Alert: Urgency, Compliance, and Industry Response</h2>
            <p className="font-jost text-gray-600 leading-relaxed mb-4">The May 20, 2025 NERC Level 3 Alert isn&apos;t just a guideline, it&apos;s the industry&apos;s most serious compliance action related to inverter-based resources. Generator Owners are now required to model, test, and validate PSPD and EMT representations with equipment-specific accuracy.</p>
            <p className="font-jost text-gray-600 leading-relaxed mb-4">Keentel Engineering provides tailored compliance engineering services that directly respond to this alert, covering every aspect from IBR model validation to documentation submission and change management tracking.</p>
            <p className="font-jost text-gray-600 leading-relaxed">Whether you&apos;re working in ERCOT, PJM, or other planning regions, our team ensures your IBR fleet meets the alert requirements and aligns with NERC 693, FAC, and PRC reliability standards. Stay ahead of FERC scrutiny and the August 18 deadline, schedule your free compliance review today.</p>
          </div>
        </section>

        {/* ── WHY CHOOSE KEENTEL ── */}
        <section className="py-20 sm:py-24" style={{ background: '#06103C' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-urbanist font-black text-center mb-14 text-white" style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)' }}>Why Choose Keentel Engineering?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChoose.map((w, i) => (
                <div key={i} className="rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p className="font-jost font-semibold text-white text-sm leading-relaxed">{w.t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 sm:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 50%, #5B2A86 100%)' }}>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-urbanist font-black text-white mb-6" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)' }}>Get Started, Risk-Free Compliance Assessment</h2>
            <p className="font-jost text-white/80 mb-8 leading-relaxed">The clock is ticking. Let&apos;s discuss your site&apos;s readiness before NERC does. Schedule a free consultation today to review your IBR models and compliance strategy.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}>Schedule a Free Consultation Call</Link>
              <Link href="tel:813-389-7871" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/25 hover:border-white/60 transition-all">Call 813-389-7871</Link>
              <Link href="mailto:contact@keentelengineering.com" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-jost font-semibold text-white border border-white/25 hover:border-white/60 transition-all">Email Us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
