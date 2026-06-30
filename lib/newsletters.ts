// lib/newsletters.ts
import { client } from '@/lib/sanity';

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
  body?: any[];
  author?: string;
  authorTitle?: string;
  authorImage?: string;
  order?: number;
}

export async function getAllNewsletters(): Promise<Newsletter[]> {
  return client.fetch(
    `*[_type == "newsletter"] | order(order desc, publishDate desc) {
      _id, title, slug, edition, publishDate, subtitle, excerpt, heroImage, stats, order
    }`
  );
}

export async function getNewsletterBySlug(slug: string): Promise<Newsletter | null> {
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
  return slugs.map((s) => s.slug);
}
