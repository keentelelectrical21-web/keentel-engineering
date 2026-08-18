import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import blogPost from './sanity/schemas/blogPost'
import servicePage from './sanity/schemas/servicePage'
import industryPage from './sanity/schemas/industryPage'
import caseStudy from './sanity/schemas/caseStudy'
import whitePaper from './sanity/schemas/whitePaper'
import newsletter from './sanity/schemas/newsletter'
import category from './sanity/schemas/category'

export default defineConfig({
  name: 'keentel-engineering',
  title: 'Keentel Engineering CMS',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [blogPost, servicePage, industryPage, caseStudy, whitePaper, newsletter, category],
  },
})
