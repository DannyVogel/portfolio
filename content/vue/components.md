---
title: "Composable Components in Vue 3"
description: "Creating reusable component patterns with Vue 3's Composition API"
date: 2025-03-27
tags: ["vue", "components", "composition-api"]
status: "evergreen"
---

# Composable Components in Vue 3

:badge[Vue 3]{type="success"} :badge[Composition API]{type="info"}

Vue 3's **Composition API** has revolutionized how we build reusable components. Instead of the Options API's separation of concerns by options type, the Composition API allows us to organize code by **logical concerns**.

::alert{type="info"}
The Composition API was introduced in Vue 3 as a new way to organize component logic.
::

## The Problem with Mixins

In Vue 2, we often reached for mixins to share code between components:

```js
// userMixin.js
export default {
  data() {
    return {
      user: null,
      loading: false
    }
  },
  methods: {
    async fetchUser(id) {
      this.loading = true
      try {
        this.user = await api.getUser(id)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
}
```

But mixins had **several problems**:

::list{type="warning"}
- **Name collisions** between properties from different mixins
- **Unclear source** of properties in your component
- **Implicit dependencies** between mixins and components
::

## Composition Functions to the Rescue

With Vue 3, we can extract the same logic into a **composition function**:

```js
// useUser.js
import { ref } from 'vue'

export function useUser() {
  const user = ref(null)
  const loading = ref(false)
  
  const fetchUser = async (id) => {
    loading.value = true
    try {
      user.value = await api.getUser(id)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  
  return {
    user,
    loading,
    fetchUser
  }
}
```

::callout
#summary
Why composition functions are better
#content
Composition functions provide a cleaner, more explicit way to share code between components while maintaining full TypeScript support.
::

## Using Our Composition Function

Now we can use this in any component with **clear origins and dependencies**:

```vue
<script setup>
import { useUser } from '@/composables/useUser'

const { user, loading, fetchUser } = useUser()

// Fetch user when component mounts
onMounted(() => {
  fetchUser(props.userId)
})
</script>

<template>
  <div>
    <div v-if="loading">Loading user...</div>
    <div v-else-if="user">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>
```

## Benefits Over Mixins

::list{type="success"}
- **Explicit imports** make dependencies clear
- **No namespace collisions** between different composition functions
- **Type inference works properly** with TypeScript
- **Functions can be composed together** for complex behaviors
::

::alert{type="warning"}
Remember that the Composition API doesn't replace the Options API - use the approach that makes the most sense for your project.
::
