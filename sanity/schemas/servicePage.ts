import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicePage',
  title: 'Service Pages',
  type: 'document',
  fields: [

    // ── BASIC INFO ──
    defineField({ name: 'title', title: 'Service Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() }),

    // ── HERO ──
    defineField({ name: 'heroHeading', title: 'Hero Heading (H1)', type: 'string' }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'text', rows: 3 }),
    defineField({ name: 'heroCtaText', title: 'Hero CTA Button Text', type: 'string' }),
    defineField({ name: 'heroCtaLink', title: 'Hero CTA Button Link', type: 'string' }),
    defineField({ name: 'heroCertImage', title: 'Hero Certification Logos Image URL', type: 'string' }),
    defineField({ name: 'heroBgImage', title: 'Hero Background Image URL', type: 'string' }),

    // ── OVERVIEW ──
    defineField({ name: 'overviewParagraphs', title: 'Overview Paragraphs', type: 'array', of: [{ type: 'text' }] }),
    defineField({ name: 'overviewBullets', title: 'Overview Bullet Points', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'overviewImage', title: 'Overview Image URL', type: 'string' }),

    // ── WHY CHOOSE ──
    defineField({ name: 'whyChooseHeading', title: 'Why Choose Heading', type: 'string' }),
    defineField({ name: 'whyChooseItems', title: 'Why Choose Items', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', type: 'string', title: 'Item Text' },
    ]}]}),
    defineField({ name: 'whyChooseClosing', title: 'Why Choose Closing Statement', type: 'text', rows: 2 }),
    defineField({ name: 'whyChooseCtaText', title: 'Why Choose CTA Text', type: 'string' }),
    defineField({ name: 'whyChooseCtaLink', title: 'Why Choose CTA Link', type: 'string' }),

    // ── STUDY TYPES ──
    defineField({ name: 'studiesHeading', title: 'Studies Section Heading', type: 'string' }),
    defineField({ name: 'studiesSubheading', title: 'Studies Section Subheading', type: 'text', rows: 2 }),
    defineField({ name: 'studyItems', title: 'Study Type Cards', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', type: 'string', title: 'Study Title' },
      { name: 'desc', type: 'text', title: 'Description' },
      { name: 'link', type: 'string', title: 'Link URL' },
      { name: 'image', type: 'string', title: 'Image URL' },
    ]}]}),

    // ── PROCESS ──
    defineField({ name: 'processHeading', title: 'Process Heading', type: 'string' }),
    defineField({ name: 'processSubheading', title: 'Process Subheading (eyebrow)', type: 'string' }),
    defineField({ name: 'processSubtitle', title: 'Process Subtitle', type: 'string' }),
    defineField({ name: 'processDescription', title: 'Process Description', type: 'text', rows: 3 }),
    defineField({ name: 'processSteps', title: 'Process Steps', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', type: 'string', title: 'Step Title' },
      { name: 'desc', type: 'text', title: 'Step Description' },
      { name: 'bullets', type: 'array', title: 'Bullet Points', of: [{ type: 'string' }] },
      { name: 'image', type: 'string', title: 'Step Image URL' },
    ]}]}),
    defineField({ name: 'processCtaText', title: 'Process CTA Text', type: 'string' }),
    defineField({ name: 'processCtaLink', title: 'Process CTA Link', type: 'string' }),

    // ── INDUSTRIES ──
    defineField({ name: 'industriesHeading', title: 'Industries Heading', type: 'string' }),
    defineField({ name: 'industriesSubheading', title: 'Industries Subheading', type: 'text', rows: 2 }),
    defineField({ name: 'industryItems', title: 'Industry Cards', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', type: 'string', title: 'Industry Title' },
      { name: 'link', type: 'string', title: 'Link URL' },
      { name: 'image', type: 'string', title: 'Image URL' },
    ]}]}),

    // ── CASE STUDIES ──
    defineField({ name: 'caseStudiesHeading', title: 'Case Studies Heading', type: 'string' }),
    defineField({ name: 'caseStudiesSubheading', title: 'Case Studies Subheading', type: 'text', rows: 2 }),
    defineField({ name: 'caseStudyItems', title: 'Case Study Cards', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', type: 'string', title: 'Title' },
      { name: 'desc', type: 'text', title: 'Description' },
      { name: 'link', type: 'string', title: 'Link URL' },
      { name: 'image', type: 'string', title: 'Image URL' },
    ]}]}),
    defineField({ name: 'caseStudiesCtaText', title: 'Case Studies CTA Text', type: 'string' }),
    defineField({ name: 'caseStudiesCtaLink', title: 'Case Studies CTA Link', type: 'string' }),

    // ── FAQS ──
    defineField({ name: 'faqHeading', title: 'FAQ Heading', type: 'string' }),
    defineField({ name: 'faqs', title: 'FAQ Items', type: 'array', of: [{ type: 'object', fields: [
      { name: 'question', type: 'string', title: 'Question' },
      { name: 'answer', type: 'text', title: 'Answer' },
    ]}]}),

    // ── BLOGS ──
    defineField({ name: 'blogsHeading', title: 'Blogs Section Heading', type: 'string' }),
    defineField({ name: 'blogItems', title: 'Blog Cards', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', type: 'string', title: 'Blog Title' },
      { name: 'meta', type: 'string', title: 'Author & Date' },
      { name: 'excerpt', type: 'text', title: 'Excerpt' },
      { name: 'link', type: 'string', title: 'Blog URL' },
      { name: 'image', type: 'string', title: 'Image URL' },
    ]}]}),

    // ── DOWNLOAD ──
    defineField({ name: 'downloadHeading', title: 'Download Section Heading', type: 'string' }),
    defineField({ name: 'downloadSubheading', title: 'Download Section Subheading', type: 'string' }),
    defineField({ name: 'downloadCtaText', title: 'Download Button Text', type: 'string' }),
    defineField({ name: 'downloadCtaLink', title: 'Download File URL', type: 'string' }),

    // ── CTA ──
    defineField({ name: 'ctaHeading', title: 'CTA Section Heading', type: 'string' }),
    defineField({ name: 'ctaSubheading', title: 'CTA Section Subheading', type: 'text', rows: 2 }),
    defineField({ name: 'ctaPrimaryText', title: 'Primary CTA Button Text', type: 'string' }),
    defineField({ name: 'ctaPrimaryLink', title: 'Primary CTA Button Link', type: 'string' }),
    defineField({ name: 'ctaSecondaryText', title: 'Secondary CTA Button Text', type: 'string' }),
    defineField({ name: 'ctaSecondaryLink', title: 'Secondary CTA Button Link', type: 'string' }),
    defineField({ name: 'ctaImage', title: 'CTA Section Image URL', type: 'string' }),

    // ── SEO ──
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
    defineField({ name: 'metaKeywords', title: 'Meta Keywords', type: 'string' }),
  ],
})
