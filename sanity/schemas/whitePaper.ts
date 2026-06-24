import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'whitePaper',
  title: 'White Papers',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'featuredImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'pdfFile', title: 'PDF File', type: 'file', options: { accept: '.pdf' } }),
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
  ],
})
