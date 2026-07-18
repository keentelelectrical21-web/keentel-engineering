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
    slug: { current: 'ai-data-center-infrastructure' }, edition: 'April 2026 Industry Insight', publishDate: '2026-04-01',
    excerpt: 'How artificial intelligence and unprecedented power demand are redefining data-center planning, investment, and electrical infrastructure.',
    heroImage: '/images/newsletters/ai-data-center-infrastructure.png', sourceFile: 'ai-data-center-infrastructure.txt', order: 90,
  },
  {
    _id: 'local-navigating-nerc-compliance', title: 'Navigating NERC Compliance in the Era of Inverter-Based Resources',
    slug: { current: 'navigating-nerc-compliance-in-the-era-of-inverter-based-resources' }, edition: 'January 2026 Edition', publishDate: '2026-01-01',
    excerpt: 'A practical overview of changing IBR registration, planning, protection, operations, and cybersecurity requirements.',
    heroImage: '/images/newsletters/Navigating NERC Compliance in the Era of Inverter-Based Resources.webp', sourceFile: 'navigating-nerc-compliance-in-the-era-of-inverter-based-resources.txt', order: 70,
  },
  {
    _id: 'local-powering-reliability-ai-large-load', title: 'Powering Reliability in the Age of AI and Large Load Growth',
    slug: { current: 'february-2026-ai-data-centers-grid-reliability' }, edition: 'February 2026 Edition', publishDate: '2026-02-01',
    excerpt: 'How AI-driven demand, data centers, transmission constraints, and NERC reliability trends are reshaping the bulk power system.',
    heroImage: '/images/newsletters/Powering Reliability in the Age of AI and Large Load Growth.webp', sourceFile: 'february-2026-ai-data-centers-grid-reliability.txt', order: 78,
  },
  {
    _id: 'local-march-2026', title: 'Grid Reliability Cyber Security Standards Development Global Energy Storage',
    slug: { current: 'march-2026-nerc-grid-reliability-updates' }, edition: 'March 2026 Edition', publishDate: '2026-03-01',
    excerpt: 'NERC initiatives, cyber resilience, IBR performance, and international energy-storage developments shaping the bulk power system.',
    heroImage: '/images/newsletters/Grid Reliability Cyber Security Standards Development Global Energy Storage.webp', sourceFile: 'march-2026-nerc-grid-reliability-updates.txt', order: 80,
  },
  {
    _id: 'local-nerc-compliance-bess', title: 'Energy Storage and Grid Modernization Solutions',
    slug: { current: 'nerc-compliance-bess' }, edition: 'May 2026 Edition', publishDate: '2026-05-01',
    excerpt: 'Grid-reliability developments, resource growth, NERC engagement, and breakthroughs in energy-storage technology.',
    heroImage: '/images/newsletters/nerc-compliance-bess.png', sourceFile: 'nerc-compliance-bess.txt', order: 92,
  },
  {
    _id: 'local-bess-growth', title: 'BESS Growth, Grid Reliability & Compliance in 2026',
    slug: { current: 'bess-growth-grid-reliability-compliance-2026' }, edition: 'June 2026 Edition', publishDate: '2026-06-01',
    subtitle: 'Battery energy storage systems with wind turbines supporting grid reliability and renewable energy.',
    excerpt: 'The battery-storage deals, technology shifts, project milestones, and compliance signals that mattered this month.',
    heroImage: '/images/newsletters/bess-growth-grid-reliability-compliance-2026.png', sourceFile: 'bess-growth-grid-reliability-compliance-2026.txt', order: 95,
    stats: [
      { value: '61.5', unit: 'GWh', label: 'CATL Supply Deals' },
      { value: '2.18', unit: 'GWh', label: 'US Projects Advanced' },
      { value: '1.38', unit: 'GWh', label: 'Spain Tolled Capacity' },
      { value: '20', unit: 'yr', label: 'Longest Offtake Term' },
    ],
  },
  {
    _id: 'local-grid-reliability-2025', title: '2025 Grid Reliability, IBR Compliance & Engineering Readiness - July 2025 Newsletter',
    slug: { current: '2025-grid-reliability-ibr-compliance-newsletter' }, edition: 'July 2025 Newsletter', publishDate: '2025-07-01',
    excerpt: 'Reliability performance, IBR registration, energy adequacy, compliance dates, and engineering readiness for the future grid.',
    heroImage: '/images/newsletters/2025 Grid Reliability, IBR Compliance & Engineering Readiness - July 2025 Newsletter.webp', sourceFile: '2025-grid-reliability-ibr-compliance-newsletter.txt', order: 50,
  },
  {
    _id: 'local-power-pulse-april-2025', title: 'Keental Engineering Power Pulse Newsletter – April 2025 Edition',
    slug: { current: 'keentel-power-pulse-engineering-the-future-of-the-grid-april-2025' }, edition: 'April 2025 Edition', publishDate: '2025-04-23',
    excerpt: 'Global energy trends, compliance updates, substation and BESS innovation, and technical insights from Keentel Engineering.',
    heroImage: '/images/newsletters/Keental Engineering Power Pulse Newsletter – April 2025 Edition.webp', sourceFile: 'keentel-power-pulse-engineering-the-future-of-the-grid-april-2025.txt', order: 30,
  },
  {
    _id: 'local-nerc-february-2026', title: 'February 2026 NERC Event Calendar: Statistical & Strategic Breakdown',
    slug: { current: 'nerc-february-2026-event-calendar' }, edition: 'February 2026', publishDate: '2026-02-11',
    excerpt: 'A date-by-date guide to NERC standards, governance, cybersecurity, IBR reliability, and large-load integration activity.',
    sourceFile: 'nerc-february-2026-event-calendar.txt', order: 75,
  },
  {
    _id: 'local-industry-nerc-may-2025', title: 'Industry NERC News – May 2025 Update',
    slug: { current: 'industry-nerc-news-may-2025' }, edition: 'May 2025 Update', publishDate: '2025-05-19',
    excerpt: 'Critical compliance deadlines, IBR modeling deficiencies, active standards projects, and grid-reliability insights.',
    heroImage: '/images/newsletters/Industry NERC News – May 2025 Update.webp', sourceFile: 'industry-nerc-news-may-2025.txt', order: 40,
  },
  {
    _id: 'local-re-plus-2025', title: 'Connect With Keentel Engineering at RE+ Las Vegas 2025',
    slug: { current: 're-plus-las-vegas-2025' }, edition: 'Event Update', publishDate: '2025-08-30',
    excerpt: 'Meet our engineers at Booth #1423 to discuss renewable energy, substations, NERC compliance, and advanced power-system studies.',
    heroImage: '/images/newsletters/Keental Engineering Power Pulse Newsletter – April 2025 Edition.webp', sourceFile: 're-plus-las-vegas-2025.txt', order: 60,
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

  return bodyLines.map(({ line, sourceIndex }, index) => {
    const isolated = !content[sourceIndex - 1];
    const heading = index > 0 && line.length < 100 && !/[.!?]$/.test(line) && !line.startsWith('http') && isolated;
    const tableLike = line.includes('\t');
    return {
      _type: 'block', _key: `local-${index}`, style: heading ? 'h3' : tableLike ? 'blockquote' : 'normal', markDefs: [],
      children: [{ _type: 'span', _key: `span-${index}`, text: line.replace(/\t+/g, ' — '), marks: [] }],
    } satisfies PortableTextBlock;
  });
}

const ercotMarketUpdate: Newsletter = {
  _id: 'ercot-energy-market-update-2026',
  title: 'ERCOT Energy Market Update 2026',
  slug: { current: 'ercot-energy-market-update-2026' },
  edition: 'July 2026 Edition',
  publishDate: '2026-07-01',
  subtitle: 'Large-Load Growth, Senate Bill 6, the Batch Study Redesign, and the Road to a Disciplined Interconnection Queue',
  excerpt: 'A practical engineering brief on large-load growth, ERCOT policy, market mechanics, transmission costs, and interconnection readiness.',
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
  return [...locals, ...newsletters.filter((newsletter) => !localSlugs.has(newsletter.slug.current))]
    .sort((a, b) => (b.publishDate || '').localeCompare(a.publishDate || ''));
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
