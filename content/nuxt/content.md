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

The simplest way to fetch content is using the `queryCollection()` composable:

```vue
<script setup>
const { data: articles } = await queryCollection("content").find();
</script>
```

But the real power comes from more sophisticated queries.

## Filtering Content

### By Frontmatter Properties

You can filter content based on any frontmatter property:

```js
const { data: evergreenContent } = await queryCollection("content")
  .where("status", "=", "evergreen")
  .find();

const { data: vueContent } = await queryCollection("content")
  .where("tags", "CONTAINS", "vue")
  .find();
```

### Using Operators

Nuxt Content supports MongoDB-like query operators:

```js
const thirtyDaysAgo = new Date(
  Date.now() - 30 * 24 * 60 * 60 * 1000
).toISOString();
const { data: recentContent } = await queryCollection("content")
  .where("date", ">", thirtyDaysAgo)
  .find();
```

## Sorting Results

Sort your content by any property:

```js
const { data: articles } = await queryCollection("content")
  .orderBy("date", "desc")
  .find();

const { data: alphabetical } = await queryCollection("content")
  .orderBy("title", "asc")
  .find();
```

## Limiting Results

For performance, you might want to limit results:

```js
const { data: recentArticles } = await queryCollection("content")
  .orderBy("date", "desc")
  .limit(5)
  .find();
```

## Aggregating Related Content

You can build "related content" features using tags:

```js
const getRelatedContent = async (currentPath, tags) => {
  return await queryCollection("content")
    .where("path", "!=", currentPath)
    .where("tags", "CONTAINS ANY", tags)
    .limit(3)
    .find();
};
```

## Full-Text Search

Nuxt Content v3 includes powerful full-text search:

```js
const { data: searchResults } = await queryCollectionSearchSections(
  "content",
  "composition api"
);
```

## Combining Multiple Query Conditions

Chain multiple conditions for complex queries:

```js
const { data: featuredTutorials } = await queryCollection("content")
  .where("tags", "CONTAINS", "tutorial")
  .where("featured", "=", true)
  .orderBy("date", "desc")
  .limit(10)
  .find();
```

## Next Steps

- See how Nuxt Content is used with AI to generate content in the [Claude Desktop with GitHub MCP for Digital Garden Content](/garden/ai/claude-github-mcp) guide
