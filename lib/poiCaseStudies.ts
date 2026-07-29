export type PoiCaseStudy = {
  slug: string
  title: string
  shortTitle: string
  client: string
  region: string
  image: string
  scope: string
  services: string[]
  challenges: string[]
  results: string[]
}

export const poiCaseStudies: PoiCaseStudy[] = [
  {
    slug: 'pjm-230kv-solar-storage-poi',
    title: 'PJM 230 kV POI Interconnection for 250 MW Solar + Storage',
    shortTitle: 'PJM 230 kV Solar + Storage POI',
    client: 'Confidential Renewable Developer',
    region: 'PJM',
    image: '/images/poi.webp',
    scope: 'Full POI engineering for a 250 MW solar PV + BESS interconnection to a 230 kV PJM transmission line.',
    services: ['PJM Feasibility, SIS, and Facilities Studies review', 'PSS®E v35 dynamic and short-circuit model development', 'Reactive capability verification at the POI', 'One-lines, relay protection schemes, and switching plans', 'PRC-019, PRC-024, and PRC-025 relay-setting compliance'],
    challenges: ['Tight voltage-regulation and transient-stability criteria', 'Aggressive PJM and neighboring-utility coordination schedule'],
    results: ['Models accepted on first submission', 'Facilities Study finalized ahead of plan', 'POI energized successfully on the first attempt', 'Preferred partner status for future PJM projects'],
  },
  {
    slug: 'ercot-345kv-wind-expansion-poi',
    title: 'ERCOT 345 kV POI Support for 300 MW Wind Expansion',
    shortTitle: 'ERCOT 345 kV Wind Expansion POI',
    client: 'Confidential Wind Developer',
    region: 'ERCOT',
    image: '/images/services/poi-interconnection/electrical-engineer-wind-farmadvancing-energy-sustainabilitygenerating-clean-power-from-wind-sustainable-futurerenewable-energy-solution-climate-change.jpg',
    scope: 'POI interconnection of a 300 MW wind-farm expansion into the ERCOT 345 kV network under the Resource Interconnection Handbook.',
    services: ['PSS®E creation and TSAT dynamic-model validation', 'Steady-state, stability, and short-circuit packages', 'ERCOT Planning and TSP RFI coordination', 'Protection design to ERCOT Nodal requirements', 'ICCP point mapping for telemetry compliance'],
    challenges: ['Fast-frequency-response validation under evolving conditions', 'Integration of legacy and new turbine models'],
    results: ['Zero RFI follow-ups after initial review', 'Certification granted ahead of schedule', 'On-time market entry with no penalties or delays'],
  },
  {
    slug: 'wecc-230kv-solar-bess-hybrid-poi',
    title: 'WECC 230 kV POI for 150 MW PV + 75 MW / 300 MWh BESS Hybrid',
    shortTitle: 'WECC Solar + BESS Hybrid POI',
    client: 'Confidential Renewable Developer',
    region: 'WECC',
    image: '/images/services/poi-interconnection/Studies & Technical Analysis Support.webp',
    scope: 'POI interconnection engineering for a 225 MW hybrid solar + BESS project into WECC’s 230 kV transmission system.',
    services: ['PSS®E and PSCAD models per WECC MVWG standards', 'Harmonic and sub-synchronous-resonance analysis', 'Electromagnetic-transient inverter studies', 'SCADA/RTU signal lists and testing support'],
    challenges: ['Rigorous IBR and fast-transient model review', 'SSR analysis for series-compensated lines'],
    results: ['EMT report approved without major comments', 'Full PRC-024, PRC-019, and PRC-027 compliance', 'Preemptive modeling avoided major cost overruns'],
  },
  {
    slug: 'nyiso-138kv-wind-farm-poi',
    title: 'NYISO 138 kV POI Interconnection for 120 MW Wind Farm',
    shortTitle: 'NYISO 138 kV Wind Farm POI',
    client: 'Confidential Wind Developer',
    region: 'NYISO',
    image: '/images/services/poi-interconnection/POI Electrical & Physical Engineering.jpg',
    scope: 'End-to-end POI interconnection for a 120 MW wind farm tying into the 138 kV NYISO system under the Generator Interconnection Process.',
    services: ['PSS®E steady-state and dynamic models', 'FERC LGIA Facilities Study appendices', 'NYISO-aligned protection coordination plan', 'Short-circuit and relay-coordination studies'],
    challenges: ['Stringent voltage and frequency ride-through criteria', 'Complex developer, NYISO, and transmission-owner coordination'],
    results: ['First-round model acceptance', 'Agreement finalized without material changes', 'Energization completed on the original timeline', 'Ongoing O&M engineering engagement'],
  },
]
