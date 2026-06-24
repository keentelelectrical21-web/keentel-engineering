import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'industryPage',
  title: 'Industry Pages',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Industry Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() }),
    defineField({ name: 'heroHeading', title: 'Hero Heading (H1)', type: 'string' }),
    defineField({ name: 'overview', title: 'Industry Overview', type: 'text', rows: 5 }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'challenges', title: 'Pain Points / Challenges', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', title: 'Challenge Title', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
    ]}]}),
    defineField({ name: 'faqs', title: 'FAQs', type: 'array', of: [{ type: 'object', fields: [
      { name: 'question', title: 'Question', type: 'string' },
      { name: 'answer', title: 'Answer', type: 'text' },
    ]}]}),
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
  ],
})
