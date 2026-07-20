// lib/newsletters.ts
import { client } from '@/lib/sanity';
import type { PortableTextBlock } from '@portabletext/types';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export interface NewsletterStat {
  value: string;
  unit?: string;
  label: string;
}

export interface Newsletter {
  _id: string;
  title: string;
  slug: { current: string };
  edition?: string;
  publishDate?: string;
  subtitle?: string;
  excerpt?: string;
  heroImage?: string;
  stats?: NewsletterStat[];
  body?: PortableTextBlock[];
  author?: string;
  authorTitle?: string;
  authorImage?: string;
  order?: number;
}

type LocalNewsletter = Newsletter & { sourceFile?: string };

const localNewsletters: LocalNewsletter[] = [
  {
    _id: 'local-ai-data-center-infrastructure', title: 'AI Power Surge Reshaping Data Center Infrastructure in 2026',
    slug: { current: 'ai-data-center-infrastructure' }, edition: 'April 2026', publishDate: '2026-04-01',
    excerpt: 'Explore how AI is driving hyperscale data center growth, rising power demand, behind-the-meter energy systems, and next-generation engineering design.',
    heroImage: '/images/newsletters/ai-data-center-infrastructure.png', sourceFile: 'ai-data-center-infrastructure.txt', order: 90,
  },
  {
    _id: 'local-navigating-nerc-compliance', title: 'Navigating NERC Compliance in the Era of Inverter-Based Resources',
    slug: { current: 'navigating-nerc-compliance-in-the-era-of-inverter-based-resources' }, edition: 'January 2026', publishDate: '2026-01-01',
    excerpt: 'A comprehensive overview of the IBR Registration Initiative, new PRC/CIP standards, and what asset owners must do now to remain compliant heading into 2026 enforcement.',
    heroImage: '/images/newsletters/Navigating NERC Compliance in the Era of Inverter-Based Resources.webp', sourceFile: 'navigating-nerc-compliance-in-the-era-of-inverter-based-resources.txt', order: 70,
  },
  {
    _id: 'local-powering-reliability-ai-large-load', title: 'Powering Reliability in the Age of AI and Large Load Growth',
    slug: { current: 'february-2026-ai-data-centers-grid-reliability' }, edition: 'February 2026 Edition', publishDate: '2026-02-01',
    excerpt: 'Insights on AI-driven demand, data center impacts, transmission challenges, and NERC reliability trends shaping the bulk power system in 2026.',
    heroImage: '/images/newsletters/Powering Reliability in the Age of AI and Large Load Growth.webp', sourceFile: 'february-2026-ai-data-centers-grid-reliability.txt', order: 78,
  },
  {
    _id: 'local-march-2026', title: 'NERC Strategic & Reliability Updates',
    slug: { current: 'march-2026-nerc-grid-reliability-updates' }, edition: 'March 2026 Edition', publishDate: '2026-03-01',
    excerpt: 'Key insights on grid reliability, cyber security resilience, NERC standards activity, and global battery energy storage developments shaping the bulk power system.',
    heroImage: '/images/newsletters/Grid Reliability Cyber Security Standards Development Global Energy Storage.webp', sourceFile: 'march-2026-nerc-grid-reliability-updates.txt', order: 80,
  },
  {
    _id: 'local-nerc-compliance-bess', title: 'Grid Reliability, BESS Breakthroughs & Energy Transition',
    slug: { current: 'nerc-compliance-bess' }, edition: 'May 2026 Edition', publishDate: '2026-05-01',
    excerpt: 'NERC Milestone 4 workshop, MISO reliability outlook, DTE’s $474M rate case, record European BESS deployment, and next-gen LFP battery evolution.',
    heroImage: '/images/newsletters/nerc-compliance-bess.png', sourceFile: 'nerc-compliance-bess.txt', order: 92,
  },
  {
    _id: 'local-bess-growth', title: 'BESS Growth, Grid Reliability & Compliance in 2026',
    slug: { current: 'bess-growth-grid-reliability-compliance-2026' }, edition: 'June 2026 Edition', publishDate: '2026-06-01',
    subtitle: 'Battery energy storage systems with wind turbines supporting grid reliability and renewable energy.',
    excerpt: 'Sodium-ion vs LFP lifecycle economics, 61.5 GWh of CATL supply deals, four US projects across Texas, California, Colorado, and Georgia, and what long-dated offtakes mean for grid reliability engineering.',
    heroImage: '/images/newsletters/bess-growth-grid-reliability-compliance-2026.png', sourceFile: 'bess-growth-grid-reliability-compliance-2026.txt', order: 95,
    stats: [
      { value: '61.5', unit: 'GWh', label: 'CATL Supply Deals' },
      { value: '2.18', unit: 'GWh', label: 'US Projects Advanced' },
      { value: '1.38', unit: 'GWh', label: 'Spain Tolled Capacity' },
      { value: '20', unit: 'yr', label: 'Longest Offtake Term' },
    ],
  },
  {
    _id: 'local-grid-reliability-2025', title: 'Grid Reliability, IBR Compliance & Engineering Readiness',
    slug: { current: '2025-grid-reliability-ibr-compliance-newsletter' }, edition: 'July 2025 Newsletter', publishDate: '2025-07-01',
    excerpt: 'NERC’s 2025 State of Reliability report, the new IBR Registration Initiative for GOs and GOPs, energy adequacy rethink, and upcoming NERC compliance deadlines.',
    heroImage: '/images/newsletters/2025 Grid Reliability, IBR Compliance & Engineering Readiness - July 2025 Newsletter.webp', sourceFile: '2025-grid-reliability-ibr-compliance-newsletter.txt', order: 50,
  },
  {
    _id: 'local-power-pulse-april-2025', title: 'Keentel Power Pulse – Engineering the Future of the Grid',
    slug: { current: 'keentel-power-pulse-engineering-the-future-of-the-grid-april-2025' }, edition: 'April 2025 Edition', publishDate: '2025-04-23',
    subtitle: 'Insight, Innovation, and Impact in Electrical Power Systems',
    excerpt: 'Global energy trends, IEEE 2800 and NERC PRC-006-5 compliance updates, BESS going mainstream, 345 kV interconnection projects, and digital substation innovations.',
    heroImage: '/images/newsletters/Keental Engineering Power Pulse Newsletter – April 2025 Edition.jpg', sourceFile: 'keentel-power-pulse-engineering-the-future-of-the-grid-april-2025.txt', order: 30,
    author: 'Sandip (Sonny) Patel, P.E. EC', authorTitle: 'Principal Engineer & CEO · IEEE Senior Member', authorImage: '/images/newsletters/author-sonny-patel.jpeg',
  },
  {
    _id: 'local-nerc-february-2026', title: 'February 2026 NERC Event Calendar: Statistical & Strategic Breakdown',
    slug: { current: 'nerc-february-2026-event-calendar' }, edition: 'February 2026', publishDate: '2026-02-11',
    excerpt: 'A date-by-date guide to NERC standards, governance, cybersecurity, IBR reliability, and large-load integration activity.',
    heroImage: '/images/newsletters/February 2026 NERC Event Calendar Statistical & Strategic Breakdown.jpg',
    sourceFile: 'nerc-february-2026-event-calendar.txt', order: 75,
  },
  {
    _id: 'local-industry-nerc-may-2025', title: 'Industry NERC News – May 2025 Update',
    slug: { current: 'industry-nerc-news-may-2025' }, edition: 'May 2025 Update', publishDate: '2025-05-19',
    subtitle: 'Key Compliance Deadlines, IBR Modeling Deficiencies & Grid Reliability Insights',
    excerpt: 'Cold weather preparedness deadlines, IBR modeling deficiency alert exposing 15,000+ MW of risk, ballot results, and upcoming NERC standards taking effect 2025–2027.',
    heroImage: '/images/newsletters/Industry NERC News – May 2025 Update.jpg', sourceFile: 'industry-nerc-news-may-2025.txt', order: 40,
    author: 'Sandip (Sonny) Patel, P.E. EC', authorTitle: 'Principal Engineer & CEO · IEEE Senior Member', authorImage: '/images/newsletters/author-sonny-patel.jpeg',
  },
  {
    _id: 'local-re-plus-2025', title: 'Connect With Keentel Engineering at RE+ Las Vegas 2025',
    slug: { current: 're-plus-las-vegas-2025' }, edition: 'Event Update', publishDate: '2025-08-30',
    excerpt: 'Meet our engineers at Booth #1423 to discuss renewable energy, substations, NERC compliance, and advanced power-system studies.',
    heroImage: '/images/newsletters/Connect With Keentel Engineering at RE+ Las Vegas 2025.jpg', sourceFile: 're-plus-las-vegas-2025.txt', order: 60,
  },
];

function toPortableText(text: string, title: string): PortableTextBlock[] {
  const normalized = text.replace(/\r/g, '').replace(/﻿/g, '').split('\n').map((line) => line.trim());
  const titleIndex = normalized.findIndex((line) => line === title || line.includes(title));
  const dateIndex = normalized.findIndex((line) =>
    /(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[^\n]*20\d{2}|20\d{2}[^\n]*edition/i.test(line)
  );
  const contentStart = dateIndex >= 0 ? dateIndex + 1 : titleIndex >= 0 ? titleIndex + 1 : 0;
  const untrimmedContent = normalized.slice(contentStart);
  const footerIndex = untrimmedContent.findIndex((line) =>
    ['About the Author:', 'Menu Links', 'Connect with Us', 'Copyright 1995-2026', '813-389-7871'].includes(line)
  );
  const content = footerIndex >= 0 ? untrimmedContent.slice(0, footerIndex) : untrimmedContent;
  const ignored = new Set(['Home', 'About', 'Services', 'Our Work', 'Keentel’s Grid IQ', 'Contact', 'Schedule A Consultation', 'Keentel Engineering Newsletter']);
  const bodyLines = content
    .map((line, sourceIndex) => ({ line, sourceIndex }))
    .filter(({ line }) => line && !ignored.has(line) && !line.startsWith('Page URL:') && !line.startsWith('URL:'));

  const majorHeadings = new Set(['IN THIS ISSUE', 'Global Trends in Electrical Power Engineering', 'Regulatory & Compliance Highlights', 'Keentel in Action: Recent Engineering Projects', 'Tech Spotlight: Advancing Electrical Engineering', 'Upcoming Events to Watch', 'Message from Keentel Engineering', 'Let’s Power the Future, Together', 'Key NERC Compliance Deadlines & Events – May 2025', 'Active NERC Ballots & Comment Periods', 'Spotlight: IBR Modeling Deficiencies – April 2025 Alert', 'Standards News: Ballot Results & Pending Standards', 'System Maintenance Updates', 'Upcoming NERC Events – May & June 2025', 'Summary – Key Takeaways', 'Frequently Asked Questions (FAQ)']);
  const minorHeadings = new Set(['Grid Resilience is Now a Global Priority', 'Surge in Renewable Energy Integration', 'Battery Energy Storage Systems (BESS) Go Mainstream', 'IEEE 2800™-2022 Compliance in Focus', 'NERC PRC-006-5 Implementation', 'MOD-032 Dynamic Model Accuracy', 'May 15: Cold Weather Preparedness Reporting Due', 'Key Findings:', 'NERC Recommendations:', 'Recently Approved:', 'Standards to Watch:', 'Align System Scheduled Downtime:']);

  return bodyLines.map(({ line, sourceIndex }, index) => {
    const isolated = !content[sourceIndex - 1];
    const majorHeading = majorHeadings.has(line);
    const heading = minorHeadings.has(line) || /^\d+\.\s/.test(line) || (index > 0 && line.length < 100 && !/[.!?]$/.test(line) && !line.startsWith('http') && isolated);
    const tableLike = line.includes('\t');
    const linkMatch = line.match(/^(.*?)\[([^\]]+)\]\((https?:\/\/[^)]+)\)(.*)$/);
    const markDefs = linkMatch ? [{ _key: `link-${index}`, _type: 'link', href: linkMatch[3] }] : [];
    const children = linkMatch
      ? [
          { _type: 'span', _key: `span-${index}-before`, text: linkMatch[1], marks: [] },
          { _type: 'span', _key: `span-${index}-link`, text: linkMatch[2], marks: [`link-${index}`] },
          { _type: 'span', _key: `span-${index}-after`, text: linkMatch[4], marks: [] },
        ]
      : [{ _type: 'span', _key: `span-${index}`, text: line.replace(/\t+/g, ' — '), marks: [] }];
    return {
      _type: 'block', _key: `local-${index}`, style: majorHeading ? 'h2' : heading ? 'h3' : tableLike ? 'blockquote' : 'normal', markDefs,
      children,
    } satisfies PortableTextBlock;
  });
}

const ercotMarketUpdate: Newsletter = {
  _id: 'ercot-energy-market-update-2026',
  title: 'ERCOT Energy Market Update – July 2026',
  slug: { current: 'ercot-energy-market-update-2026' },
  edition: 'July 2026 Edition',
  publishDate: '2026-07-01',
  subtitle: 'Large-Load Growth, Senate Bill 6, the Batch Study Redesign, and the Road to a Disciplined Interconnection Queue',
  excerpt: 'Large-load growth, Senate Bill 6, Batch Zero interconnection redesign, 4CP to 12CP shift, RTC+B market impacts, and the road to a disciplined ERCOT queue.',
  heroImage: '/images/newsletters/ercot-energy-market-update-july-2026.png',
  stats: [
    { value: '440k', unit: 'MW', label: 'Queue Requests' },
    { value: '~30k', unit: 'MW', label: 'Study-Backed Firm' },
    { value: '~6k', unit: 'MW', label: 'Actually Energized' },
    { value: '95', unit: '%', label: 'Data Center Share' },
  ],
  order: 100,
}

export async function getAllNewsletters(): Promise<Newsletter[]> {
  const newsletters: Newsletter[] = await client.fetch(
    `*[_type == "newsletter"] | order(order desc, publishDate desc) {
      _id, title, slug, edition, publishDate, subtitle, excerpt, heroImage, stats, order
    }`
  );
  const locals = [ercotMarketUpdate, ...localNewsletters];
  const localSlugs = new Set(locals.map((newsletter) => newsletter.slug.current));
  const merged = [...locals, ...newsletters.filter((newsletter) => !localSlugs.has(newsletter.slug.current))]
    .sort((a, b) => (b.publishDate || '').localeCompare(a.publishDate || ''));
  const seenTitles = new Set<string>();
  return merged.filter((newsletter) => {
    const titleKey = newsletter.title.toLowerCase().replace(/[–—-]/g, ' ').replace(/\s+/g, ' ').trim();
    if (seenTitles.has(titleKey)) return false;
    seenTitles.add(titleKey);
    return true;
  });
}

export async function getNewsletterBySlug(slug: string): Promise<Newsletter | null> {
  const local = localNewsletters.find((newsletter) => newsletter.slug.current === slug);
  if (local?.sourceFile) {
    const source = await readFile(path.join(process.cwd(), 'content', 'newsletters', local.sourceFile), 'utf8');
    return { ...local, body: toPortableText(source, local.title) };
  }
  return client.fetch(
    `*[_type == "newsletter" && slug.current == $slug][0] {
      _id, title, slug, edition, publishDate, subtitle, excerpt, heroImage, stats, body,
      author, authorTitle, authorImage, order
    }`,
    { slug }
  );
}

export async function getAllNewsletterSlugs(): Promise<string[]> {
  const slugs: { slug: string }[] = await client.fetch(
    `*[_type == "newsletter"]{ "slug": slug.current }`
  );
  return Array.from(new Set([
    ...localNewsletters.map((newsletter) => newsletter.slug.current),
    ...slugs.map((s) => s.slug),
  ]));
}
