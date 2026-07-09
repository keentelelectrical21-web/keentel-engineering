// sanity/schemas/blogPost.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    // ── BASIC ──
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),

    // ── AUTHOR ──
    defineField({ name: 'authorName', title: 'Author Name', type: 'string' }),
    defineField({ name: 'authorTitle', title: 'Author Job Title', type: 'string' }),
    defineField({ name: 'authorBio', title: 'Author Bio', type: 'text', rows: 3 }),
    defineField({ name: 'authorImage', title: 'Author Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'authorLinkedIn', title: 'Author LinkedIn URL', type: 'string' }),

    // ── MID-ARTICLE CTA ──
    defineField({ name: 'midCtaEnabled', title: 'Show Mid-Article CTA', type: 'boolean' }),
    defineField({ name: 'midCtaHeading', title: 'Mid CTA Heading', type: 'string' }),
    defineField({ name: 'midCtaSubheading', title: 'Mid CTA Subheading', type: 'string' }),
    defineField({ name: 'midCtaPrimaryText', title: 'Mid CTA Primary Button Text', type: 'string' }),
    defineField({ name: 'midCtaPrimaryLink', title: 'Mid CTA Primary Button Link', type: 'string' }),
    defineField({ name: 'midCtaSecondaryText', title: 'Mid CTA Secondary Button Text (optional)', type: 'string' }),
    defineField({ name: 'midCtaSecondaryLink', title: 'Mid CTA Secondary Button Link', type: 'string' }),

    // ── BOTTOM CTA ──
    defineField({ name: 'bottomCtaEnabled', title: 'Show Bottom CTA', type: 'boolean' }),
    defineField({ name: 'bottomCtaHeading', title: 'Bottom CTA Heading', type: 'string' }),
    defineField({ name: 'bottomCtaSubheading', title: 'Bottom CTA Subheading', type: 'string' }),
    defineField({ name: 'bottomCtaPrimaryText', title: 'Bottom CTA Primary Button Text', type: 'string' }),
    defineField({ name: 'bottomCtaPrimaryLink', title: 'Bottom CTA Primary Button Link', type: 'string' }),
    defineField({ name: 'bottomCtaSecondaryText', title: 'Bottom CTA Secondary Button Text (optional)', type: 'string' }),
    defineField({ name: 'bottomCtaSecondaryLink', title: 'Bottom CTA Secondary Button Link', type: 'string' }),

    // ── SEO ──
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      media: 'featuredImage',
    },
  },
})
