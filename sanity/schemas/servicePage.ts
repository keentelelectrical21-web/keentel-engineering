import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicePage',
  title: 'Service Pages',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Service Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() }),
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string' }),
    defineField({ name: 'overview', title: 'Service Overview', type: 'text', rows: 5 }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'subServices', title: 'Sub Services', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', type: 'string', title: 'Title' },
      { name: 'description', type: 'text', title: 'Description' },
    ]}]}),
    defineField({ name: 'faqs', title: 'FAQs', type: 'array', of: [{ type: 'object', fields: [
      { name: 'question', type: 'string', title: 'Question' },
      { name: 'answer', type: 'text', title: 'Answer' },
    ]}]}),
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
  ],
})
