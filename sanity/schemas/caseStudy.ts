import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() }),
    defineField({ name: 'client', title: 'Client / Project Type', type: 'string' }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'challenge', title: 'The Challenge', type: 'text', rows: 4 }),
    defineField({ name: 'solution', title: 'Our Solution', type: 'text', rows: 4 }),
    defineField({ name: 'results', title: 'Results', type: 'text', rows: 4 }),
    defineField({ name: 'relatedService', title: 'Related Service', type: 'string' }),
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
  ],
})
