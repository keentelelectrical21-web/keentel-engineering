// scripts/migrate-case-studies.mjs
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'xayja2f8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const substationStudies = [
  {
    title: '110 kV Outdoor Grid Substation – Rural Electrification',
    slug: 'substation-110kv-outdoor-rural-electrification',
    subtitle: 'Reliable high-voltage infrastructure designed for extreme environmental conditions and remote grid expansion.',
    background: 'Designed to support long-distance rural electrification across high-temperature, high-wind, and dust-prone environments with minimal maintenance dependency.',
    challenges: [],
    solution: [
      'Double-bus with transfer bus configuration for operational flexibility',
      'Grounding system optimized for high soil resistivity',
      'Protection coordination for long feeder distances',
      'Utility-grade reliability compliance design',
    ],
    outcome: ['Stable power distribution achieved across remote agricultural and industrial zones with improved grid resilience and fault tolerance.'],
    stack: 'PSS®E • ETAP • PSCAD • SKM',
    cardImage: '/images/our-work/substation/110kv-outdoor-rural-electrification.png',
    order: 1,
  },
  {
    title: 'Upgrade of Aging Indoor Substation – Smart City Infrastructure',
    slug: 'substation-indoor-retrofit-smart-city',
    subtitle: 'Modernization of legacy electrical infrastructure to support smart city load expansion and digital grid control.',
    background: 'Retrofit of an aging indoor substation to improve capacity, reliability, and digital monitoring capabilities without full system shutdown.',
    challenges: [],
    solution: [
      'Equipment replacement with modern protection relays',
      'Load capacity expansion for urban demand growth',
      'SCADA-ready automation integration',
      'Phased upgrade to ensure zero critical downtime',
    ],
    outcome: ['Improved operational efficiency and future-ready substation performance for smart city integration.'],
    stack: 'ETAP • SKM • DIgSILENT PowerFactory',
    cardImage: '/images/our-work/substation/indoor-retrofit-smart-city.png',
    order: 2,
  },
  {
    title: 'GIS-Based Urban Substation – Space-Constrained Deployment',
    slug: 'substation-gis-urban-space-constrained',
    subtitle: 'Compact high-voltage GIS substation designed for dense urban environments with strict land limitations.',
    background: 'Delivered a fully enclosed gas-insulated substation solution optimized for metropolitan deployment where footprint, safety, and EMI control are critical.',
    challenges: [],
    solution: [
      'GIS switchgear layout optimization',
      'High insulation performance design',
      'Electromagnetic interference reduction',
      'Urban safety clearance compliance',
    ],
    outcome: ['High-capacity power delivery achieved in a minimal footprint urban site with enhanced safety and reliability.'],
    stack: 'PSCAD • ETAP • CDEGS',
    cardImage: '/images/our-work/substation/gis-urban-space-constrained.png',
    order: 3,
  },
  {
    title: '230 kV Renewable POI Collector Substation',
    slug: 'substation-230kv-renewable-poi-collector',
    subtitle: 'Utility-scale renewable interconnection hub enabling stable grid integration of large energy generation assets.',
    background: 'Designed a Point of Interconnection (POI) substation for renewable energy evacuation into the transmission network.',
    challenges: [],
    solution: [
      'Grid synchronization for variable generation',
      'Voltage stability under fluctuating input',
      'Reactive power management',
      'Utility compliance for interconnection standards',
    ],
    outcome: ['Reliable and compliant integration of renewable energy into the regional transmission grid.'],
    stack: 'PSS®E • PSCAD • PowerWorld',
    cardImage: '/images/our-work/substation/230kv-renewable-poi-collector.png',
    order: 4,
  },
  {
    title: 'Battery Energy Storage System (BESS) Substation – 138 kV',
    slug: 'substation-bess-138kv',
    subtitle: 'Grid stabilization infrastructure enabling fast-response energy storage and frequency regulation.',
    background: 'Engineered a BESS interconnection substation for peak shaving, load balancing, and grid support services.',
    challenges: [],
    solution: [
      'Fast response power injection design',
      'Frequency regulation support system',
      'Bidirectional power flow protection',
      'Energy dispatch coordination',
    ],
    outcome: ['Enhanced grid stability and peak load management through scalable storage integration.'],
    stack: 'ETAP • PSCAD • DIgSILENT',
    cardImage: '/images/our-work/substation/bess-138kv.png',
    order: 5,
  },
  {
    title: 'Renewable Energy Collector Substation – Solar PV (345/34.5 kV)',
    slug: 'substation-renewable-collector-solar-pv',
    subtitle: 'Large-scale solar aggregation system designed for high-voltage transmission integration.',
    background: 'Developed collector infrastructure to aggregate distributed solar PV generation into a centralized transmission interface.',
    challenges: [],
    solution: [
      'Step-up transformer configuration',
      'Fault current handling for PV variability',
      'Voltage regulation under intermittent generation',
      'Grid export optimization',
    ],
    outcome: ['Efficient solar power evacuation with improved transmission stability and reduced losses.'],
    stack: 'PSS®E • ETAP • SKM',
    cardImage: '/images/our-work/substation/renewable-collector-solar-pv.png',
    order: 6,
  },
  {
    title: 'Medium-Voltage Distribution Substation – Urban Load Growth (115/35 kV)',
    slug: 'substation-mv-distribution-urban-load-growth',
    subtitle: 'Urban distribution infrastructure designed to manage rapid load expansion in growing metropolitan areas.',
    background: 'Strengthened medium-voltage distribution capacity to support residential and commercial expansion.',
    challenges: [],
    solution: [
      'Load forecasting-based design',
      'Voltage drop optimization',
      'Distribution reliability improvement',
      'Protection coordination enhancement',
    ],
    outcome: ['Stable voltage delivery and improved distribution efficiency across high-growth urban zones.'],
    stack: 'ETAP • SKM • PowerFactory',
    cardImage: '/images/our-work/substation/mv-distribution-urban-load-growth.png',
    order: 7,
  },
  {
    title: '230 kV High-Voltage Transmission Substation – Greenfield Project',
    slug: 'substation-230kv-hv-transmission-greenfield',
    subtitle: 'Greenfield transmission infrastructure enabling long-distance bulk power transfer and grid expansion.',
    background: 'Designed a new transmission-level substation for regional grid strengthening and future scalability.',
    challenges: [],
    solution: [
      'High-voltage switching configuration',
      'Transmission stability analysis',
      'Grid expansion readiness',
      'Fault level management design',
    ],
    outcome: ['Reliable long-distance power transmission with scalable infrastructure for future demand growth.'],
    stack: 'PSS®E • PSCAD • ETAP',
    cardImage: '/images/our-work/substation/230kv-hv-transmission-greenfield.png',
    order: 8,
  },
];

const powerSystemStudies = [
  {
    title: 'Grid Interconnection & Renewable Penetration Study',
    slug: 'power-system-grid-interconnection-renewable-penetration',
    client: 'Confidential Renewable Developer',
    region: 'ERCOT',
    background: 'A large renewable developer planned multiple solar and wind projects within a constrained transmission corridor. The ISO required a comprehensive grid interconnection and renewable penetration assessment to evaluate system impacts under high renewable scenarios.',
    challenges: [
      'Increasing inverter-based resource (IBR) penetration',
      'Weak grid conditions and limited short-circuit strength',
      'Voltage stability and reactive power concerns',
      'ISO compliance requirements for planning approval',
    ],
    solution: [
      'Performed grid interconnection studies, including load flow, short-circuit, and stability analysis',
      'Conducted renewable penetration sensitivity studies under multiple dispatch scenarios',
      'Evaluated voltage stability and system strength impacts',
      'Provided mitigation recommendations, including reactive support and control tuning',
    ],
    outcome: [
      'ISO-approved interconnection study results',
      'Identified hosting capacity limits and mitigation paths',
      'Enabled phased renewable deployment with reduced risk',
    ],
    cardImage: '/images/our-work/power-system/grid-interconnection-renewable-penetration.webp',
    order: 1,
  },
  {
    title: 'Solar & Wind Farm Electrical Design and System Studies',
    slug: 'power-system-solar-wind-farm-electrical-design',
    client: 'Confidential IPP',
    region: 'Southwest U.S.',
    background: 'An independent power producer required full electrical design and system studies for a hybrid solar and wind facility, including collector systems, substation interface, and POI compliance.',
    challenges: [
      'Long MV collector circuits with voltage drop concerns',
      'Coordinating wind turbine and inverter controls',
      'Ensuring compliance with utility and ISO grid codes',
    ],
    solution: [
      'Designed MV collector systems and substation interfaces',
      'Performed load flow, short-circuit, and protection coordination studies',
      'Verified compliance with reactive power and ride-through requirements',
      'Supported utility and ISO technical reviews',
    ],
    outcome: [
      'Fully compliant electrical design package',
      'Optimized collector system sizing and losses',
      'Achieved on-time interconnection approval',
    ],
    cardImage: '/images/our-work/power-system/solar-wind-farm-electrical-design.webp',
    order: 2,
  },
  {
    title: 'Reactive Power Compensation & Capacitor Bank Optimization Study',
    slug: 'power-system-reactive-power-compensation-capacitor-bank',
    client: 'Confidential Transmission-Connected Facility',
    region: 'MISO',
    background: 'A grid-connected facility experienced voltage fluctuations and poor power factor under varying load conditions. The utility required a reactive power compensation study.',
    challenges: [
      'Voltage regulation across multiple operating conditions',
      'Avoiding overcompensation and resonance risks',
      'Minimizing capital and operational costs',
    ],
    solution: [
      'Conducted reactive power compensation studies',
      'Optimized capacitor bank sizing and placement',
      'Evaluated switched vs fixed compensation options',
      'Verified system performance under contingency conditions',
    ],
    outcome: [
      'Improved voltage profile and power factor compliance',
      'Reduced reactive power penalties',
      'Cost-effective and scalable compensation solution',
    ],
    cardImage: '/images/our-work/power-system/reactive-power-compensation-capacitor-bank.png',
    order: 3,
  },
  {
    title: 'Insulation Coordination, Lightning, TOV, and TRV Studies',
    slug: 'power-system-insulation-coordination-lightning-tov-trv',
    client: 'Confidential Utility',
    region: 'Southeast U.S.',
    background: 'A new high-voltage substation required insulation coordination verification to ensure equipment protection against lightning, switching surges, and temporary overvoltages.',
    challenges: [
      'High lightning density region',
      'Equipment insulation margin optimization',
      'Coordination with surge arresters and breaker ratings',
    ],
    solution: [
      'Performed insulation coordination studies',
      'Analyzed lightning, TOV, and TRV conditions',
      'Verified surge arrester placement and ratings',
      'Ensured compliance with IEEE and utility standards',
    ],
    outcome: [
      'Reduced insulation failure risk',
      'Optimized equipment BIL selection',
      'Enhanced substation reliability and safety',
    ],
    cardImage: '/images/our-work/power-system/insulation-coordination-lightning-tov-trv.webp',
    order: 4,
  },
  {
    title: 'Fast Front, Slow Front & GIS Very Fast Transient Studies',
    slug: 'power-system-fast-front-slow-front-gis-vfto',
    client: 'Confidential Utility',
    region: 'Northeast U.S.',
    background: 'A GIS-based substation required transient analysis to address very fast front overvoltages caused by switching operations and GIS disconnector actions.',
    challenges: [
      'Space-constrained GIS environment',
      'Risk of VFTO affecting connected equipment',
      'Compliance with OEM and IEEE limits',
    ],
    solution: [
      'Performed fast-front and slow-front transient studies',
      'Conducted GIS Very Fast Transient Overvoltage (VFTO) analysis',
      'Evaluated mitigation measures such as damping resistors',
      'Coordinated with GIS OEM specifications',
    ],
    outcome: [
      'Verified insulation and equipment protection',
      'Reduced VFTO exposure risks',
      'Ensured long-term GIS reliability',
    ],
    cardImage: '/images/our-work/power-system/fast-front-slow-front-gis-vfto.webp',
    order: 5,
  },
  {
    title: 'Transformer Inrush, POI Rapid Voltage Change (RVC) & Flicker Study',
    slug: 'power-system-transformer-inrush-poi-rvc-flicker',
    client: 'Confidential Renewable Facility',
    region: 'CAISO',
    background: 'A renewable POI experienced concerns related to transformer energization, voltage flicker, and rapid voltage changes affecting neighboring loads.',
    challenges: [
      'Large transformer inrush currents',
      'POI voltage flicker sensitivity',
      'ISO power quality compliance requirements',
    ],
    solution: [
      'Analyzed transformer inrush current behavior',
      'Performed Rapid Voltage Change (RVC) studies',
      'Conducted flicker and power quality analysis',
      'Recommended controlled energization and mitigation strategies',
    ],
    outcome: [
      'ISO-accepted power quality compliance',
      'Reduced flicker and voltage disturbance risk',
      'Improved customer and grid performance',
    ],
    cardImage: '/images/our-work/power-system/transformer-inrush-poi-rvc-flicker.webp',
    order: 6,
  },
  {
    title: 'Power, Energy Loss & Substation Layout Optimization Study',
    slug: 'power-system-energy-loss-substation-layout-optimization',
    client: 'Confidential Transmission Owner',
    region: 'WECC',
    background: 'A transmission owner sought to reduce losses and optimize substation footprint while maintaining reliability and maintenance access.',
    challenges: [
      'High conductor and transformer losses',
      'Land use constraints',
      'Balancing efficiency with constructability',
    ],
    solution: [
      'Conducted power and energy loss studies',
      'Evaluated alternative conductor sizes and configurations',
      'Performed substation layout optimization analysis',
      'Coordinated with civil and structural teams',
    ],
    outcome: [
      'Reduced system losses and operating costs',
      'Optimized substation footprint',
      'Improved maintenance safety and access',
    ],
    cardImage: '/images/our-work/power-system/energy-loss-substation-layout-optimization.png',
    order: 7,
  },
  {
    title: 'Effectively Grounded System & Grounding Performance Analysis',
    slug: 'power-system-effectively-grounded-system-analysis',
    client: 'Confidential Utility',
    region: 'Multi-State',
    background: "A utility required verification that its system met effectively grounded criteria to ensure proper protection coordination and equipment insulation performance.",
    challenges: [
      'Mixed grounding practices across substations',
      'Overvoltage and protection coordination risks',
      'Regulatory and IEEE compliance expectations',
    ],
    solution: [
      'Performed effectively grounded system analysis',
      'Evaluated zero-sequence impedance ratios',
      'Reviewed grounding transformer and neutral grounding designs',
      'Provided mitigation recommendations where required',
    ],
    outcome: [
      'Verified effective grounding compliance',
      'Improved protection performance and equipment life',
      'Reduced risk of temporary overvoltage damage',
    ],
    cardImage: '/images/our-work/power-system/effectively-grounded-system-analysis.webp',
    order: 8,
  },
];

async function run() {
  console.log('Migrating case studies to Sanity...\n');

  for (const s of substationStudies) {
    const doc = {
      _id: `caseStudy-${s.slug}`,
      _type: 'caseStudy',
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
      category: 'substation',
      subtitle: s.subtitle,
      background: s.background,
      challenges: s.challenges,
      solution: s.solution,
      outcome: s.outcome,
      stack: s.stack,
      cardImage: s.cardImage,
      order: s.order,
    };
    await client.createOrReplace(doc);
    console.log(`✅ [substation] ${s.title}`);
  }

  for (const s of powerSystemStudies) {
    const doc = {
      _id: `caseStudy-${s.slug}`,
      _type: 'caseStudy',
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
      category: 'power-system',
      client: s.client,
      region: s.region,
      background: s.background,
      challenges: s.challenges,
      solution: s.solution,
      outcome: s.outcome,
      cardImage: s.cardImage,
      order: s.order,
    };
    await client.createOrReplace(doc);
    console.log(`✅ [power-system] ${s.title}`);
  }

  console.log('\nDone. 16 case studies migrated.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
