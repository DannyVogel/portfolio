import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const noteSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.date(),
  tags: z.array(z.string()).default([]),
  status: z.enum(['seedling', 'budding', 'evergreen']).default('seedling')
})

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md'
    }),
    vue: defineCollection({
      source: 'vue/**/*.md',
      type: 'page',
      schema: noteSchema
    }),
    nuxt: defineCollection({
      source: 'nuxt/**/*.md',
      type: 'page',
      schema: noteSchema
    }),
    typescript: defineCollection({
      source: 'typescript/**/*.md',
      type: 'page',
      schema: noteSchema
    }),
    practices: defineCollection({
      source: 'practices/**/*.md',
      type: 'page',
      schema: noteSchema
    }),
    ai: defineCollection({
      source: 'ai/**/*.md',
      type: 'page',
      schema: noteSchema
    })
  }
})