---
title: "Advanced Nuxt Content Queries"
description: "Leveraging the full power of Nuxt Content v3's query capabilities"
date: 2025-03-26
tags: ["nuxt", "content", "queries"]
status: "budding"
toc: true
---

# Advanced Nuxt Content Queries

When building a digital garden with Nuxt Content, knowing how to effectively query your content is essential. This guide covers advanced query techniques to help you organize and display your content effectively.

## Basic Query Refresher

The simplest way to fetch content is using the `queryContent()` composable:

```vue
<script setup>
const { data: articles } = await queryContent('/').find()
</script>
```

But the real power comes from more sophisticated queries.

## Filtering Content

### By Frontmatter Properties

You can filter content based on any frontmatter property:

```js
// Find all "evergreen" status content
const { data: evergreenContent } = await queryContent('/')
  .where({ status: 'evergreen' })
  .find()

// Find all content with specific tags
const { data: vueContent } = await queryContent('/')
  .where({ tags: { $contains: 'vue' } })
  .find()
```

### Using Operators

Nuxt Content supports MongoDB-like query operators:

```js
// Content created in the last month
const { data: recentContent } = await queryContent('/')
  .where({ 
    date: { 
      $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() 
    } 
  })
  .find()
```

## Sorting Results

Sort your content by any property:

```js
// Sort by date, newest first
const { data: articles } = await queryContent('/')
  .sort({ date: -1 })
  .find()

// Sort alphabetically by title
const { data: alphabetical } = await queryContent('/')
  .sort({ title: 1 })
  .find()
```

## Limiting Results

For performance, you might want to limit results:

```js
// Get only the 5 most recent articles
const { data: recentArticles } = await queryContent('/')
  .sort({ date: -1 })
  .limit(5)
  .find()
```

## Aggregating Related Content

You can build "related content" features using tags:

```js
// Get related content based on shared tags
const getRelatedContent = async (currentPath, tags) => {
  return await queryContent('/')
    .where({ 
      _path: { $ne: currentPath },
      tags: { $containsAny: tags }
    })
    .limit(3)
    .find()
}
```

## Full-Text Search

Nuxt Content v3 includes powerful full-text search:

```js
// Search across all content
const { data: searchResults } = await queryContent('/')
  .search('composition api')
  .find()
```

## Combining Multiple Query Conditions

Chain multiple conditions for complex queries:

```js
// Advanced composite query
const { data: featuredTutorials } = await queryContent('/')
  .where({ 
    tags: { $contains: 'tutorial' },
    featured: true
  })
  .sort({ date: -1 })
  .limit(10)
  .find()
```

## Next Steps

- Create a [tag cloud component](/nuxt/components/tag-cloud)
- Build a [related posts feature](/nuxt/components/related-posts)
- Set up [content navigation](/nuxt/navigation)
