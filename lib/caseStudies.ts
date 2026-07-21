// lib/caseStudies.ts
import { client } from '@/lib/sanity';

export interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  category: 'substation' | 'power-system';
  subtitle?: string;
  client?: string;
  region?: string;
  cardImage?: string;
  background?: string;
  challenges?: string[];
  solution?: string[];
  outcome?: string[];
  stack?: string;
  order?: number;
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    return await client.fetch(
      `*[_type == "caseStudy"] | order(category asc, order asc) {
        _id, title, slug, category, subtitle, client, region, cardImage,
        background, challenges, solution, outcome, stack, order
      }`
    );
  } catch {
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return client.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0] {
      _id, title, slug, category, subtitle, client, region, cardImage,
      background, challenges, solution, outcome, stack, order
    }`,
    { slug }
  );
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  const slugs: { slug: string }[] = await client.fetch(
    `*[_type == "caseStudy"]{ "slug": slug.current }`
  );
  return slugs.map((s) => s.slug);
}
