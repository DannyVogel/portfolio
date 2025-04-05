---
title: "Vue Vapor Mode: Zero-JS by Default"
description: "Exploring Vue's approach to island architecture with zero JavaScript by default"
date: 2025-04-01
tags: ["vue", "vapor-mode", "performance", "islands"]
status: "evergreen"
---

# Vue Vapor Mode: Zero-JS by Default

:badge[Vue 3]{type="success"} :badge[Performance]{type="info"} :badge[Islands]{type="warning"}

Vue's Vapor Mode represents a significant evolution in the Vue ecosystem, focusing on zero-JavaScript by default while preserving the developer experience that Vue is known for.

## What is Vapor Mode?

Vapor Mode is Vue's approach to island architecture, where only the interactive parts of your application ship JavaScript to the client. This contrasts with traditional Vue applications where JavaScript is required for the entire page rendering.

In Vapor Mode:
::list{type="success"}
- Static parts of your application render as pure HTML with no JavaScript
- Interactive components (islands) only ship the minimal JavaScript needed
- The developer experience remains consistent with regular Vue
::

::alert{type="info"}
Vapor Mode builds on many of the same principles as Vue's [Composition API](/vue/components), but takes optimization even further.
::

## Advantages of Vapor Mode

### Improved Performance

The most obvious benefit is significantly improved performance metrics:

::list{type="success"}
- Dramatically reduced JavaScript payload
- Faster initial page load
- Better Core Web Vitals scores
- Improved SEO potential
::

### Progressive Enhancement Built-in

Vapor Mode embraces progressive enhancement by default:

::list{type="success"}
- Basic content and navigation work without JavaScript
- Interactive features enhance the experience when JavaScript loads
- Better accessibility and resilience
::

### Developer Experience Maintained

Unlike some zero-JS frameworks that require learning new paradigms:

::list{type="success"}
- Continue using Vue's Composition API
- Same component structure and conventions
- Seamless integration with the Vue ecosystem
::

### Flexible Hydration

Vapor Mode offers fine-grained control over hydration:

::list{type="success"}
- Selectively hydrate only interactive components
- Progressively hydrate components as needed
- Maintain full SPA-like experiences where required
::

## Using Vapor Mode with Nuxt

Nuxt's integration with Vapor Mode makes it particularly powerful for content-focused sites like digital gardens. The combination provides an excellent balance of performance and developer experience.

```vue
<script setup>
// Components still use familiar Vue patterns
const count = ref(0)

// But static content ships zero-JS by default
</script>

<template>
  <!-- Static content -->
  <article class="prose">
    <h1>My Digital Garden</h1>
    <p>This content ships as pure HTML!</p>
  </article>
  
  <!-- Interactive island -->
  <ClientOnly>
    <button @click="count++">Clicked {{ count }} times</button>
  </ClientOnly>
</template>
```

::callout
#summary
When to use Vapor Mode
#content
Vapor Mode is ideal for content-heavy sites, blogs, digital gardens, and marketing sites where most content is static but you want targeted interactivity.
::

## Conclusion

Vue's Vapor Mode represents an exciting direction for the framework, allowing developers to build faster, more resilient applications without sacrificing the developer experience that makes Vue so popular.

For digital gardens and content-focused sites, this approach means better performance and accessibility while maintaining all the benefits of a modern framework.

::alert{type="warning"}
Remember that Vapor Mode is optimized for static-first content. For apps with high interactivity throughout, traditional Vue rendering may still be more appropriate.
::
