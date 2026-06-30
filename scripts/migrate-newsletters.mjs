// scripts/migrate-newsletters.mjs
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'xayja2f8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const key = () => Math.random().toString(36).slice(2, 10);

function h2(text) {
  return { _type: 'block', _key: key(), style: 'h2', children: [{ _type: 'span', _key: key(), text }] };
}
function h3(text) {
  return { _type: 'block', _key: key(), style: 'h3', children: [{ _type: 'span', _key: key(), text }] };
}
function p(text) {
  return { _type: 'block', _key: key(), style: 'normal', children: [{ _type: 'span', _key: key(), text }] };
}
function quote(text) {
  return { _type: 'block', _key: key(), style: 'blockquote', children: [{ _type: 'span', _key: key(), text }] };
}
function bullet(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: key(), text }],
  };
}
function bullets(arr) {
  return arr.map(bullet);
}

// ===================================================================
// NEWSLETTER 1: ERCOT Energy Market Update — July 2026
// ===================================================================
const ercotJuly2026 = {
  slug: 'ercot-energy-market-update-july-2026',
  title: 'ERCOT Energy Market Update — July 2026',
  edition: 'July 2026 Edition',
  publishDate: '2026-07-01',
  subtitle:
    'Large-Load Growth, Senate Bill 6, the Batch Study Redesign, and the Road to a Disciplined Interconnection Queue',
  excerpt:
    'Large-load growth, Senate Bill 6, Batch Zero interconnection redesign, 4CP to 12CP shift, RTC+B market impacts, and the road to a disciplined ERCOT queue.',
  heroImage: '/images/newsletters/ercot-energy-market-update-july-2026.png',
  stats: [
    { value: '440', unit: 'k MW', label: 'Queue Requests' },
    { value: '~30', unit: 'k MW', label: 'Study-Backed Firm' },
    { value: '~6', unit: 'k MW', label: 'Actually Energized' },
    { value: '95', unit: '%', label: 'Data Center Share' },
  ],
  body: [
    p('The Electric Reliability Council of Texas is in the middle of the most consequential demand-side transformation in its history. Hundreds of thousands of megawatts of large-load interconnection requests, overwhelmingly data centers, have arrived faster than the grid can study, plan, and build for them. This brief distills the policy and market signals that matter most heading into the back half of 2026, framed through the lens that defines our practice: interconnection-first engineering.'),

    h2('Reading the Large-Load Queue'),
    h3('440,000 MW of Requests, ~30,000 MW of Reality'),
    p('The large-load interconnection queue sits near 440,000 MW as of spring 2026. That figure represents interconnection requests submitted by data centers and other large customers. It is emphatically not a forecast of what will energize.'),
    p('What separates request from reality is study progression. By the stricter measure of engineering phase — observed taking service, approved to energize, or planning study approved by the TSP and ERCOT — roughly 30,000 MW is firm through year-end 2030, and only about 6,000 MW has actually been observed energized.'),
    h3('Queue Composition Shift'),
    p('Three years ago, West Texas oil-and-gas electrification drove growth; then crypto mining surged. Today the queue is approximately 95% data center, with crypto near 3.3%, industrial ~1%, and hydrogen below 1% and declining. More than 180 projects above 1,000 MW account for nearly 300,000 MW of requested capacity.'),
    quote('A single 1,000 MW campus is not just a bigger version of a 100 MW load — it is a different stability problem. If a facility of that size trips offline instantaneously, the resulting imbalance can stress frequency and voltage across the interconnection. — Keentel Engineering Analysis'),
    p('ERCOT has moved toward ride-through requirements for large loads, alongside emerging synchronous-oscillation requirements and consequential-load-loss limits. A data center whose trip causes 1,000 MW or more of consequential load loss runs afoul of reliability criteria. For developers, this means the electrical design of the facility is now a gating interconnection issue, not an afterthought.'),

    h2('From Request to Reality'),
    h3("ERCOT's 2026 Load Forecast & Inclusion Criteria"),
    p("ERCOT's updated 2026 forecast shows a peak-demand trajectory rising from roughly 112,000 MW at year-end 2026 toward 367,000 MW by year-end 2032 — load growth without precedent in the market's history."),
    p("Context: ERCOT's all-time summer peak is about 85,500 MW (August 2023). A forecast crossing 100,000 MW in the near term collides with hard limits on what the transmission system and generation fleet can physically support."),
    h3('Inclusion Criteria: What Gets a Load Into the 2026 Forecast'),
    bullets([
      'Disclosure of duplicative sites — to prevent double-counting the same project at multiple locations.',
      'Site control — demonstrated through an executed lease or deed.',
      'One of three financial commitments: $100,000/MW of financial security based on contracted peak demand; 100% payment of long-lead-time equipment; or 100% of the contribution in aid of construction (CIAC) for interconnection facilities.',
    ]),
    p('Under criteria adopted following Senate Bill 6, a load will need a signed interconnection agreement to enter the forecast starting in 2027 — requiring completed studies, an accepted allocation, posted financial security, paid interconnection costs, and reported development progress. We expect a materially more accurate forecast once that standard takes hold.'),

    h2('Two Policy Tracks Reshaping Interconnection'),
    h3('Batch Zero: Clearing the Backlog'),
    p('Rather than studying large loads one at a time, ERCOT is moving to a batched approach. Batch Zero carries unique rules because its job is to clear a two-to-three-year backlog of loads that have already energized or advanced far through the process.'),
    p('ERCOT filed rules for controllable load resources (CLR) and bring-your-own-generation (BYOG) arrangements. Under BYOG, a campus that brings new generation to ERCOT can energize on a timeline tied to commissioning of that generation, without waiting for new transmission.'),
    p('We expect on the order of 40,000–60,000 MW of Batch Zero load to qualify as "baseload," receiving 100% of its interconnection allowance. Where transmission is oversubscribed, a large load has three options:'),
    bullets([
      'Wait for the next batch study',
      'Accept a reduced allocation until new transmission is built',
      'Pursue a BYOG arrangement, energizing the full campus behind on-site generation subject to a withdrawal limit',
    ]),
    h3('Senate Bill 6 & Financial Standards'),
    p('Senate Bill 6 supplies the statutory backbone. Completed rulemakings include load-forecast criteria and net-metering-with-existing-generation rules. In progress: large-load interconnection standards and a proposed reliability service for large loads, a demand-response-style product compensating data centers that voluntarily drop off the grid.'),
    p('Proposed financial standards include a $100k–$300k intermediate study fee depending on size, optional pre-funding of long-lead equipment, roughly $50,000/MW of financial security (mostly non-refundable as drafted), and non-refundable interconnection-agreement fees plus long-lead-time security.'),

    h2('Paying for the Grid: 4CP to 12CP'),
    p('Transmission cost is now a first-order issue, potentially bigger than energy itself. The PUCT studied alternatives to the Four Coincident Peak (4CP) method of allocating transmission costs. Staff recommended moving to a 12CP approach with a 30-minute measurement interval, plus a minimum demand charge for large loads of 250 MW and above.'),
    p('The transmission "postage-stamp" delivery charge has already risen to about 74 cents (from 68), with continued increases expected. Operational flexibility to manage peak exposure is now a core cost-control discipline.'),

    h2('Reliability, Reserve Margins & Supply'),
    p("ERCOT's most recent CDR shows projected reserve margins going negative across 2027, 2028, and 2029 under the current load forecast. We read that less as a prediction of certain blackouts and more as a forcing function: supply must scale with demand, and demand itself will be constrained by physical and economic limits."),
    bullets([
      'Updating the Cost of New Entry (CONE), which has risen materially',
      'Strengthening the Dispatchable Reliability Reserve Service (DRRS)',
      'Revisiting the system-wide offer cap and peak/net-margin pricing circuit breaker',
      'Recalibrating the value of lost load and operating-reserve demand curves',
    ]),
    p('Roughly 3,500 MW of Texas Energy Fund loans have been approved and another ~3,700 MW are in due diligence, pointing toward perhaps 7,000–8,000 MW of new ERCOT-dedicated gas generation.'),

    h2('Market Mechanics: RTC+B'),
    p('A structural change went live in December 2025: real-time co-optimization plus batteries (RTC+B). RTC dispatches energy and ancillary services together in real time, and battery resources are now modeled as a single device with a state-of-charge constraint.'),
    p('ERCOT projected efficiency savings on the order of $2.5–$6.4 billion annually. Early performance through March 2026, including a winter stress event with peaks near 85 GW, has been stable. RTC+B is not inherently inflationary; it reallocates risk from averages toward the tails, making real-time events and tight ancillary-service hours more consequential.'),

    h2('Fundamentals & Forward Pricing'),
    p('ERCOT forward prices softened modestly into mid-2026 on mild weather and low seasonal demand, then began ticking up as the long-term load forecast firmed. A late-developing El Niño anchors the summer outlook, favoring a warm west and south, with 2018 and 2023 cited as analog years, both of which produced significant price volatility.'),

    h2('What This Means for Stakeholders'),
    p('The throughline across every topic above is that interconnection is now the binding constraint, on schedule, on cost, and on whether a project happens at all.'),
    bullets([
      'For large-load developers: treat ride-through capability, protection coordination, controllable-load behavior, and BYOG sequencing as gating design decisions, not late-stage add-ons.',
      'For utilities and TSPs: the batch redesign and transmission expansion plans demand disciplined load and transmission modeling that can distinguish credible projects from speculative queue volume.',
      'For energy buyers: transmission and coincident-peak exposure now rival energy as a cost driver, rewarding operational flexibility and a hedging strategy reassessed for nodal and tail risk.',
    ]),
    quote("ERCOT's headline numbers — 440,000 MW of requests, a forecast reaching 367,000 MW — are not the story. The story is the ~30,000 MW that is real today and the engineering and policy machinery now being built to separate real from speculative. Projects that engineer interconnection first will define the next phase of the Texas grid."),
  ],
};

// ===================================================================
// NEWSLETTER 2: BESS Growth, Grid Reliability & Compliance — June 2026
// ===================================================================
const bessJune2026 = {
  slug: 'bess-growth-grid-reliability-compliance-2026',
  title: 'BESS Growth, Grid Reliability & Compliance in 2026',
  edition: 'June 2026 Edition',
  publishDate: '2026-06-01',
  subtitle:
    'Three deals, two continents, and one big bet on what comes after lithium — the BESS stories that mattered this fortnight, with engineering context for project developers and grid operators.',
  excerpt:
    'Sodium-ion vs LFP lifecycle economics, 61.5 GWh of CATL supply deals, four US projects across Texas, California, Colorado, and Georgia, and what long-dated offtakes mean for grid reliability engineering.',
  heroImage: '/images/newsletters/bess-growth-grid-reliability-compliance-2026.png',
  stats: [
    { value: '61.5', unit: 'GWh', label: 'CATL Supply Deals' },
    { value: '2.18', unit: 'GWh', label: 'US Projects Advanced' },
    { value: '1.38', unit: 'GWh', label: 'Spain Tolled Capacity' },
    { value: '20', unit: 'yr', label: 'Longest Offtake Term' },
  ],
  body: [
    h2('HyperStrong Bets on Sodium-Ion for the Long Game'),
    p('Two weeks after signing a 60 GWh multi-year sodium-ion supply agreement with CATL, HyperStrong founder and CEO Dr. Jianhui Zhang explained the firm\'s playbook, and it isn\'t about replacing lithium iron phosphate, at least not yet.'),
    p("The pitch is lifecycle economics. Sodium-ion may not win on day-one procurement cost against LFP, but in projects where the math runs over 15-plus years of operation, the chemistry's advantages in cycle life, wide-temperature performance, and supply-chain resilience begin to compound meaningfully."),
    quote('Sodium-ion may become increasingly competitive in applications where total lifecycle economics matter more than initial procurement cost alone. — Dr. Jianhui Zhang, CEO, HyperStrong'),
    p("HyperStrong's engineering thesis is that no all-new platform architecture is required. Existing utility-scale systems can absorb sodium-ion with targeted changes to battery management strategy, thermal management, operational logic, and lifecycle optimisation."),
    p('The longer-term thesis is plural rather than winner-take-all. Zhang expects multiple chemistries to coexist, each carving out applications where its specific electrochemical profile pays off, a useful framing as renewable penetration pushes operators to think harder about resilience and lifecycle efficiency, not just nameplate cost.'),

    h2("CATL Lands 1.5 GWh of LFP for Grenergy's Spanish Flagships"),
    p('CATL will supply 252 stackable Tener Stack units across two flagship Spanish projects, the 700 MWh Oviedo standalone BESS and the 680 MWh Escuderos solar-plus-storage site, both wrapped in decade-plus tolling agreements with unnamed international utilities.'),
    p('The deal arrives as Spanish storage finally finds its regulatory footing. The Iberian blackout sharpened the conversation around grid stability, and a new law prioritising hybridised renewables-plus-storage has accelerated activity from operators including Engie, Return, FRV, and Zelestra.'),
    bullets([
      'Oviedo: 700 MWh standalone BESS, 10-year toll signed February 2026',
      'Escuderos: 680 MWh solar-plus-storage, 12-year toll, operations from July 2028',
      'Both projects targeted for commercial operation in 2027',
      'Hardware: 252 LFP-based CATL Tener Stack units in a two-unit stacking design',
    ]),
    p('Escuderos replicates the develop-lock-sell model Grenergy has built out in Chile across the Oasis de Atacama and Oasis Central portfolios.'),

    h2('US in Motion: Four Projects, Four States, Four Operators'),
    p('A busy week for US BESS development saw OCI Energy, MN8 Energy, GridStor, and Grenergy each advance projects, collectively spanning more than 2.1 GWh across Texas, California, Colorado, and Georgia.'),
    bullets([
      'OCI Energy (TX) — Alamo City: 120 MW / 480 MWh in Bexar County, broke ground May 19; 20-year capacity agreement with CPS Energy; targeted COD 2027.',
      'MN8 Energy (CA) — Pome BESS: 100 MW / 400 MWh in Poway, San Diego County, fully contracted and now dispatching into CAISO under a 10-year toll with Sonoma Clean Power.',
      "GridStor (CO) — Birdseye: 199 MW / 796 MWh in Adams County, GridStor's 5th acquisition in 18 months; targeted late 2028.",
      'Grenergy (GA) — Beaver Creek: 229 MW PV with 183 MWh BESS in Baldwin County, hybrid solar plus storage under a 20-year PPA with Georgia Power, targeted Q3 2028.',
    ]),

    h2("What We're Watching"),
    p("Whether sodium-ion's lifecycle pitch translates into firm long-duration orders by year-end. The technology has the narrative, it now needs bankable operational data from real projects at commercial scale."),
    h3('Pattern of the Week'),
    p('Long-dated offtakes are the connective tissue across all three stories, 10, 12, and 20-year terms binding developers, utilities, and chemistries together well into the 2040s.'),
  ],
};

// ===================================================================
// NEWSLETTER 3: Energy Storage and Grid Modernization Solutions — May 2026
// ===================================================================
const nercBessMay2026 = {
  slug: 'nerc-compliance-bess',
  title: 'Energy Storage and Grid Modernization Solutions',
  edition: 'May 2026 Edition',
  publishDate: '2026-05-01',
  subtitle:
    'Grid reliability focus, accelerated resource development, and major breakthroughs in energy storage technologies define May 2026.',
  excerpt:
    "NERC Milestone 4 workshop, MISO reliability outlook, DTE's $474M rate case, record European BESS deployment, and next-gen LFP battery evolution.",
  heroImage: '/images/newsletters/nerc-compliance-bess.png',
  body: [
    h2('From the Desk of Keentel Engineering'),
    p('As the power industry continues to evolve under increasing demand, regulatory pressure, and rapid technology advancement, May 2026 brings a strong mix of grid reliability focus, accelerated resource development, and major breakthroughs in energy storage technologies.'),
    p('At Keentel Engineering, we remain committed to supporting utilities, developers, and asset owners with NERC compliance, system studies, substation design, and advanced BESS integration solutions to navigate this dynamic landscape.'),

    h2('Industry Engagement Opportunity'),
    h3('NERC Milestone 4 Industry Engagement Workshop — Detroit'),
    p('The upcoming Milestone 4 Industry Engagement Workshop presents a key opportunity for stakeholders to engage directly in the evolution of reliability standards. Date: May 19, 2026. Location: Wayne State University, Detroit, MI. Time: 9:00 AM – 5:00 PM (ET).'),
    bullets([
      'Address key industry comments from the standards balloting process',
      'Provide breakout sessions for in-depth technical discussions',
      'Facilitate integration of stakeholder feedback into evolving standards',
    ]),
    p('Registration deadline: May 5, 2026.'),

    h2('Grid Reliability & Market Outlook'),
    h3('NERC Highlights Elevated Risk in MISO Region'),
    p("NERC's latest sensitivity analysis for the 2025 Long-Term Reliability Assessment (LTRA) highlights a cautiously optimistic outlook: roughly 25 GW of new generation (via MISO ERAS) is included in the analysis, and risk remains elevated through 2027, improving to normal by 2030."),
    p('Key risks persist due to supply chain constraints, transmission interconnection delays, natural gas infrastructure limitations, and regulatory and permitting challenges.'),
    quote('Even with significant generation additions, timely execution remains the biggest risk driver for grid reliability.'),

    h2('NERC Q2 2026 Standards Quarterly Outlook'),
    bullets([
      'Ongoing revisions aligned with FERC Order No. 909',
      'New initiatives addressing large load reliability risks (e.g. data centers)',
      'Upcoming compliance requirements for Category 2 Generator Owners (GO) and Generator Operators (GOP)',
    ]),
    p('Asset owners must proactively prepare for evolving compliance frameworks and increased scrutiny on inverter-based resources and large load impacts.'),

    h2('Utility & Market Developments'),
    h3('DTE Energy Proposes $474M Rate Case Amid Grid Transformation'),
    p('DTE Energy plans to file a $474.3 million rate increase to support major infrastructure investments: conversion of the Belle River plant from coal to natural gas, development of a 220 MW BESS facility, and total planned investment of $30 billion from 2026 to 2030.'),
    bullets([
      'Proposed 2-year rate freeze (conditional)',
      'Increased focus on data center-driven load growth',
      'Expansion of energy storage portfolio to roughly 3 GW by 2042',
    ]),
    p('Utilities are balancing affordability pressures, grid modernization investments, and rapid load growth from AI and data centers.'),

    h2('Global Energy Storage Trends'),
    h3('Europe Achieves Record BESS Deployment'),
    p('March 2026 marked a historic milestone: 3.4 GWh deployed in Europe (approximately 19% of the global total), exceeding the entire 2023 deployment in a single month, with a global total of 18.4 GWh commissioned in March.'),
    bullets([
      'China: approximately 40% of global deployment',
      'Europe: rapid acceleration across multiple countries',
      'Strong growth across North America, Asia, and Oceania',
    ]),
    p('Battery storage is transitioning from emerging technology to core grid infrastructure worldwide.'),

    h2('Technology Deep Dive: LFP Battery Evolution'),
    h3('Moving Beyond 314Ah to 587Ah+'),
    p('The BESS industry is undergoing a major shift in battery design. LFP market share grew from 48% to 85% between 2021 and 2024, costs have fallen roughly 93% since 2010, and LFP is now approximately 40% cheaper than NMC.'),
    p('Manufacturers including CATL, BYD, CALB, EVE, and Hithium are moving toward 587Ah and larger cells, with up to 12,000+ cycle life, 20+ year lifespan, and roughly 95–96% round-trip efficiency.'),
    h3('Why 587Ah Is the "Sweet Spot"'),
    bullets([
      'Higher energy density per container',
      'Reduced component complexity',
      'Improved thermal management (fewer cells)',
      'Maintains transport limits (~45-ton container threshold)',
    ]),
    p('Engineering implications include simplified system design, enhanced reliability and lifecycle performance, and increased importance of thermal management and BMS optimization. While LFP dominates today, emerging technologies like LMFP and sodium-ion batteries may influence future BESS architectures.'),

    h2('How Keentel Engineering Supports You'),
    h3('Power System Studies'),
    bullets(['PSSE, PSCAD, TSAT, PowerFactory modeling', 'Interconnection and grid compliance studies']),
    h3('NERC Compliance Services'),
    bullets(['PRC, TPL, MOD standards compliance', 'Model validation and audit support']),
    h3('Substation & BESS Design'),
    bullets(['HV/MV substation engineering', 'BESS system integration and layout design', 'Protection and control (SEL relay expertise)']),
    h3('Renewable & Grid Integration'),
    bullets(['Solar, wind, and storage interconnection support', 'ERCOT, PJM, MISO, CAISO compliance expertise']),

    h2('Closing Thought'),
    p('The energy industry is at a critical inflection point, where reliability, affordability, and innovation must coexist. Success will depend on engineering precision, regulatory alignment, and strategic execution. Keentel Engineering is proud to be your partner in building the grid of the future.'),
  ],
};

// ===================================================================
// NEWSLETTER 4: AI Power Surge Reshaping Data Center Infrastructure — April 2026
// ===================================================================
const aiDataCenterApril2026 = {
  slug: 'ai-data-center-infrastructure',
  title: 'AI Power Surge Reshaping Data Center Infrastructure in 2026',
  edition: 'April 2026 Edition',
  publishDate: '2026-04-01',
  subtitle: 'Keentel Engineering Industry Insight — April 1, 2026',
  excerpt:
    'Explore how AI is driving hyperscale data center growth, rising power demand, behind-the-meter energy systems, and next-generation engineering design.',
  heroImage: '/images/newsletters/ai-data-center-infrastructure.png',
  body: [
    p('The global data center industry is undergoing a fundamental transformation driven by artificial intelligence, unprecedented power demand, and large-scale infrastructure investments. What was once a real-estate-driven market has now become a power-first engineering challenge, redefining how projects are designed, financed, and executed.'),

    h2('Record-Breaking Growth Driven by AI'),
    p('Data center expansion has accelerated at historic levels, with global capital investment exceeding hundreds of billions annually. AI workloads are the primary catalyst, pushing facilities toward gigawatt-scale campuses and significantly increasing energy consumption.'),
    bullets([
      'AI-driven facilities are evolving into "intelligence factories" rather than traditional data centers',
      'Power demand is growing at multiples of historical industrial loads',
      'Large hyperscale operators now dominate infrastructure expansion',
    ]),
    p('By the end of the decade, data centers are expected to represent a significant share of total electrical demand, forcing utilities and developers to rethink grid capacity and system planning.'),

    h2('Shift Toward Mega-Scale and Hyperscale Development'),
    bullets([
      'Mega campuses exceeding 500+ acres',
      'Multi-gigawatt load requirements per project',
      'Pre-leased developments driven by hyperscalers',
    ]),
    p('Recent market behavior shows that over 70% of new capacity commitments are controlled by large-scale operators, indicating consolidation and long-term infrastructure planning. This shift is forcing engineering firms like Keentel to focus on high-voltage interconnection strategies, load flow and dynamic stability studies, and scalable substation and transmission design.'),

    h2('Behind-the-Meter (BTM) Power: The New Standard'),
    p('One of the most important industry changes is the rapid rise of Behind-the-Meter power systems, where data centers develop their own dedicated energy infrastructure.'),
    bullets([
      'On-site gas generation',
      'Solar + battery storage systems',
      'Small modular nuclear reactors (SMRs)',
      'Hybrid microgrid configurations',
    ]),
    p('BTM solutions are no longer optional, they are becoming essential due to long interconnection queue delays (often 4–7 years), grid congestion in major markets, and reliability requirements for AI workloads. Keentel notes that modern data centers are increasingly designed as self-sufficient energy ecosystems, capable of operating independently from the grid when required.'),

    h2('Regional Engineering Trends Across the U.S.'),
    h3('Virginia'),
    bullets([
      'Remains the largest data center hub',
      'Experiencing continued expansion into rural areas',
      'Strong alignment with renewable energy targets',
    ]),
    h3('Texas (ERCOT Market)'),
    bullets([
      'Rapid growth driven by flexible interconnection models',
      'Major increase in BTM and large-load projects',
      'Emerging as a leader in gigawatt-scale developments',
    ]),
    h3('California'),
    bullets([
      'Focus on high-efficiency and regulated growth',
      'Increased emphasis on sustainability and reporting',
      'Longer interconnection timelines due to constraints',
    ]),
    h3('Emerging Markets'),
    bullets([
      'Midwest, Arizona, Georgia, and Pennsylvania gaining momentum',
      'Driven by land availability, power access, and incentives',
      'Supporting large-scale AI campuses and hyperscale expansion',
    ]),
    p('These regional dynamics are reshaping transmission planning, interconnection strategies, and long-term grid reliability requirements.'),

    h2('Engineering Challenges Defining 2026'),
    h3('1. Power Availability'),
    p('Energy has become the primary limiting factor. Many utilities report demand levels far exceeding historical forecasts.'),
    h3('2. Interconnection Delays'),
    p('Queue timelines now exceed construction timelines, reversing traditional project sequencing.'),
    h3('3. Equipment Constraints'),
    p('Lead times for transformers, switchgear, and HV equipment now extend beyond 24–36 months.'),
    h3('4. Labor Shortages'),
    p('Specialized high-voltage workforce demand is increasing, driving costs and project delays.'),
    h3('5. Community and Regulatory Pressure'),
    p('Projects must now address noise, water usage, environmental impact, and zoning restrictions. Keentel Engineering emphasizes that successful projects now require integrated planning across power, permitting, and environmental compliance.'),

    h2('Next-Generation Data Center Design'),
    bullets([
      'Liquid cooling and immersion systems replacing air cooling',
      'Rack densities reaching 50–100 kW per rack',
      'AI-optimized chips increasing power density requirements',
      'Deployment of 800V architectures and high-efficiency power systems',
    ]),
    p('Cooling is now becoming AI-optimized itself, with real-time energy management and adaptive load control.'),

    h2('Investment and Market Outlook'),
    bullets([
      'Multi-billion-dollar projects are now standard',
      'Infrastructure funds and private capital are entering aggressively',
      'Data centers are emerging as a core asset class',
    ]),
    p('Large-scale AI infrastructure programs are setting new benchmarks, with hundreds of billions allocated toward energy and digital infrastructure development.'),

    h2('Keentel Engineering Perspective'),
    p('At Keentel Engineering we see 2026 as a turning point where:'),
    bullets([
      'Power engineering becomes the foundation of digital infrastructure',
      'Grid integration and BTM design will define project success',
      'Advanced modeling (PSSE, PSCAD, TSAT) is critical for compliance and performance',
      'HV/EHV system design will be the backbone of AI-driven growth',
    ]),
    p('The convergence of energy and technology is creating a new era where engineering expertise is the key differentiator.'),
  ],
};

const newsletters = [ercotJuly2026, bessJune2026, nercBessMay2026, aiDataCenterApril2026];

async function run() {
  console.log('Migrating newsletters to Sanity...\n');
  let order = newsletters.length;
  for (const nl of newsletters) {
    const doc = {
      _id: `newsletter-${nl.slug}`,
      _type: 'newsletter',
      title: nl.title,
      slug: { _type: 'slug', current: nl.slug },
      edition: nl.edition,
      publishDate: nl.publishDate,
      subtitle: nl.subtitle,
      excerpt: nl.excerpt,
      heroImage: nl.heroImage,
      stats: nl.stats || [],
      body: nl.body,
      author: 'Sonny Patel P.E. EC',
      authorTitle: 'IEEE Senior Member',
      authorImage: '/images/newsletters/author-sonny-patel.jpeg',
      order: order--,
    };
    await client.createOrReplace(doc);
    console.log(`✅ ${nl.title}`);
  }
  console.log('\nDone. 4 newsletters migrated.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
