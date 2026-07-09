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
    defineField({
      name: 'relatedService',
      title: 'Related Service',
      type: 'string',
      options: {
        list: [
          { title: 'Power System Studies', value: 'power-system-studies' },
          { title: 'Substation Design', value: 'substation-design' },
          { title: 'POI Interconnection Engineering', value: 'poi-interconnection-engineering-support' },
          { title: 'Transmission Line Design', value: 'transmission-line-design' },
          { title: 'Utility-Scale Renewable Energy', value: 'utility-scale-renewable-energy' },
          { title: "Owner's Engineer", value: 'owners-engineer' },
          { title: 'NERC Compliance', value: 'nerc-compliance' },
          { title: 'MEP Engineering', value: 'mep-engineering' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
  ],
})
