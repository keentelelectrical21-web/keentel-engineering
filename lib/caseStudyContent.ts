export type CaseStudyEntry = {
  title: string
  lines: string[]
}

export type CaseStudyCollection = {
  title: string
  introduction?: string
  entries: CaseStudyEntry[]
}

export const powerSystemStudyCaseStudies: CaseStudyCollection = {
  title: 'POWER SYSTEM STUDY CASE STUDIES',
  introduction: 'A collection of real-world power-system engineering projects showing Keentel Engineering’s work for utilities, renewable developers, IPPs, and transmission-connected facilities.',
  entries: [
    { title: 'CASE STUDY 1 — Grid Interconnection & Renewable Penetration Study', lines: ['Client/Region: Confidential renewable developer — ERCOT', 'Focus: Solar/wind integration in a constrained transmission corridor. Work included load flow, short-circuit, stability, renewable-penetration sensitivity, voltage stability and system-strength review. Outcome: approved interconnection results, identified hosting limits and mitigation paths.'] },
    { title: 'CASE STUDY 2 — Solar & Wind Farm Electrical Design and System Studies', lines: ['Client/Region: Confidential IPP — Southwest U.S.', 'Focus: Hybrid solar/wind collector and POI engineering, including load flow, short-circuit and protection coordination. Outcome: compliant design package and on-time interconnection approval.'] },
    { title: 'CASE STUDY 3 — Reactive Power Compensation & Capacitor Bank Optimization', lines: ['Region: MISO. Focus: voltage regulation, power factor and capacitor-bank optimization.'] },
    { title: 'CASE STUDY 4 — Insulation Coordination, Lightning, TOV & TRV Studies', lines: ['Region: Southeast U.S. Focus: HV substation insulation and surge protection.'] },
    { title: 'CASE STUDY 5 — Fast/Slow Front & GIS Very Fast Transient Studies', lines: ['Region: Northeast U.S. Focus: GIS VFTO and switching-transient risk.'] },
    { title: 'CASE STUDY 6 — Transformer Inrush, POI RVC & Flicker Study', lines: ['Region: CAISO. Focus: transformer energization and power-quality compliance.'] },
    { title: 'CASE STUDY 7 — Power, Energy Loss & Substation Layout Optimization', lines: ['Region: WECC. Focus: reducing losses and optimizing footprint.'] },
    { title: 'CASE STUDY 8 — Effectively Grounded System & Grounding Performance Analysis', lines: ['Region: Multi-State. Focus: grounding compliance, zero-sequence impedance and protection performance.'] },
  ],
}

export const substationEngineeringCaseStudies: CaseStudyCollection = {
  title: 'SUBSTATION ENGINEERING CASE STUDIES',
  introduction: 'Four flagship projects demonstrating integrated primary/secondary substation design and supporting power-system studies.',
  entries: [
    { title: 'CASE STUDY 1 — 345 kV / 138 kV EHV Greenfield Substation', lines: ['Scope: New transmission substation integrating 400 MW of wind generation.', 'Primary work: GA/layout, major equipment specifications, 4,000 A rigid bus and IEEE 80 grounding analysis.', 'Secondary/studies: P&C drawings, AC/DC systems, SCADA, short-circuit, load flow, relay coordination, arc flash and step/touch assessment.', 'Impact: 150+ IFC drawing sets, PE-sealed certification and successful energization.'] },
    { title: 'CASE STUDY 2 — 230 kV GIS Substation Expansion', lines: ['Scope: Add two feeders and modernize protection while working within an existing GIS footprint.', 'Work: 3D GIS layout, feeder/duct routing, IEC 61850 protection, relay replacement, DFR, breaker duty, relay coordination, stability and TRV analysis.', 'Impact: Expansion completed without a substation outage.'] },
    { title: 'CASE STUDY 3 — 115/34.5 kV BESS Collector Substation', lines: ['Scope: EPC-level design for a 100 MW / 400 MWh BESS collector station.', 'Work: constrained-site layout, transformer/bus configuration, 87T/87B protection, BMS, redundant SCADA, load flow, fault, harmonic and EMT studies.', 'Impact: Delivered in under 12 months; performance exceeded interconnection guarantees.'] },
    { title: 'CASE STUDY 4 — 500 kV Bulk Power Substation', lines: ['Scope: Major interregional transmission project increasing transfer capability by 1,200 MW.', 'Work: breaker-and-a-half design, HV equipment/bus specifications, redundant protection, SIS/EMT/GIC/NERC TPL studies.', 'Impact: early energization ahead of compliance deadlines.'] },
  ],
}

export const pscadPowerSystemStudiesCaseStudies: CaseStudyCollection = {
  title: 'PSCAD POWER SYSTEM STUDIES — CASE STUDIES',
  entries: [
    { title: 'CASE STUDY 1 — Transient Stability for a 345 kV Renewable Interconnection', lines: ['Client: Confidential renewable developer, Midwest USA.', 'Scope: 600 MW wind + BESS at a weak-grid 345 kV POI.', 'Challenge: ride-through, clearing times and voltage recovery.', 'Solution: PSCAD models for generation, converters, collector system and substation; multiple fault simulations; dynamic reactive-support assessment.', 'Result: compliance demonstrated without additional reactive equipment; approximately $2M in hardware upgrades avoided.'] },
    { title: 'CASE STUDY 2 — EMT Simulation of IBRs in a Weak 115 kV Grid', lines: ['Client: Confidential utility, Southwest USA.', 'Scope: 200 MW solar PV interconnection.', 'Focus: high-frequency/sub-synchronous instability, inverter/control interactions and mitigation tuning.', 'Result: damaging resonance identified and mitigated without unnecessary over-design.'] },
    { title: 'CASE STUDY 3 — PSCAD Lightning Surge Study for a 500 kV Transmission Line', lines: ['Client: Confidential transmission owner, Southeast USA.', 'Focus: insulation coordination, lightning/back-flashover modeling, surge-arrester optimization.', 'Result: improved protection margins with an 8% equipment-capital reduction.'] },
    { title: 'CASE STUDY 4 — Controlled Switching & TRV Analysis for 345 kV Breakers', lines: ['Client: Confidential IPP, Texas.', 'Focus: transformer inrush, TRV/restrike and point-on-wave switching.', 'Result: 40% lower inrush current, TRV compliance and avoided breaker upgrades.'] },
  ],
}

export const pjmDynamicModelingCaseStudies: CaseStudyCollection = {
  title: 'PJM DYNAMIC MODELING & INTERCONNECTION CASE STUDIES',
  entries: [
    { title: 'CASE STUDY 1 — 150 MW Solar PV Dynamic Modeling, New Jersey', lines: ['Challenge: Prepare PJM-compliant IBR dynamic models under an aggressive queue timeline.', 'Solution: `.idv`/`.dyr` models using REGCA1, REECA1 and REPCA1; flat-start, VRT and frequency-response simulations; PQ capability validation.', 'Outcome: PJM accepted the submission without data-deficiency flags.'] },
    { title: 'CASE STUDY 2 — 50 MW BESS As-Built Model Resubmission, Pennsylvania', lines: ['Challenge: Proprietary inverter required a validated user-defined model.', 'Solution: coordinated with OEM, built/tested UDMs and prepared model documentation/test records.', 'Outcome: PJM review passed and interconnection compliance was achieved within 30 days of resubmission.'] },
    { title: 'CASE STUDY 3 — 120 MW Solar + 40 MW BESS Hybrid, Maryland', lines: ['Challenge: Different inverter technologies and plant-level coordination had to be represented accurately.', 'Solution: separate REGC/REEC modules, PLNTBU1 coordination, PQ limits and PRC-024-3 protection curves.', 'Outcome: first-cycle approval with no supplemental data requests.'] },
    { title: 'CASE STUDY 4 — 100 MW Synchronous Generator Repowering, West Virginia', lines: ['Challenge: Updated excitation/governor behavior and operating validation were required.', 'Solution: upgraded generator/excitation models, added stabilizer/AVR limiter models and performed MFO/power-factor assessments.', 'Outcome: PJM approved the repowering study and accelerated re-energization.'] },
  ],
}

export const poiInterconnectionSupportCaseStudies: CaseStudyCollection = {
  title: 'POI INTERCONNECTION SUPPORT CASE STUDIES',
  entries: [
    { title: 'CASE STUDY 1 — PJM 230 kV POI for 250 MW Solar + Storage', lines: ['Client: Confidential renewable developer.', 'Scope: Full POI engineering for solar PV + BESS.', 'Work: PJM study review, PSS®E dynamic/short-circuit models, reactive capability, one-lines, protection/switching plans and PRC relay-setting support.', 'Result: models accepted on first submission; facilities work completed ahead of plan; successful first-attempt energization.'] },
    { title: 'CASE STUDY 2 — ERCOT 345 kV POI for 300 MW Wind Expansion', lines: ['Work: PSS®E/TSAT models, steady-state/dynamic/fault packages, ERCOT coordination, protection and ICCP telemetry mapping.', 'Result: no follow-up RFIs, early model certification and on-time market entry.'] },
    { title: 'CASE STUDY 3 — WECC 230 kV POI for 150 MW PV + 75 MW/300 MWh BESS', lines: ['Work: PSS®E/PSCAD dynamic models, harmonics/SSR, EMT and SCADA/RTU support.', 'Result: EMT report approved without major comments; PRC compliance achieved; modeling avoided major potential overruns.'] },
    { title: 'CASE STUDY 4 — NYISO 138 kV POI for 120 MW Wind Farm', lines: ['Work: steady-state/dynamic models, LGIA technical appendices, protection coordination and short-circuit review.', 'Result: first-round model acceptance, interconnection terms finalized without material changes and energization stayed on schedule.'] },
  ],
}
