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
  href?: string;
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const studies = await client.fetch<CaseStudy[]>(
      `*[_type == "caseStudy"] | order(category asc, order asc) {
        _id, title, slug, category, subtitle, client, region, cardImage,
        background, challenges, solution, outcome, stack, order
      }`
    );
    return studies;
  } catch {
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    return await client.fetch(
      `*[_type == "caseStudy" && slug.current == $slug][0] {
        _id, title, slug, category, subtitle, client, region, cardImage,
        background, challenges, solution, outcome, stack, order
      }`,
      { slug }
    );
  } catch {
    return null;
  }
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  try {
    const slugs: { slug: string }[] = await client.fetch(
      `*[_type == "caseStudy"]{ "slug": slug.current }`
    );
    return slugs.map((s) => s.slug);
  } catch {
    return [];
  }
}
