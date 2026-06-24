import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'newsletter',
  title: 'Newsletters',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Newsletter Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() }),
    defineField({ name: 'issueDate', title: 'Issue Date', type: 'datetime' }),
    defineField({ name: 'excerpt', title: 'Excerpt / Summary', type: 'text', rows: 3 }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
  ],
})
