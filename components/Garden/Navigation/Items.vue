<script lang="ts" setup>
defineProps<{
  items: { label: string; to: string }[];
}>();
</script>

<template>
  <ul class="list-disc list-inside">
    <li
      v-for="child in items"
      :key="child.to"
    >
      <NuxtLink
        :to="child.to"
        active-class="text-blue-500"
        class="hover:text-blue-500 transition-all duration-300"
      >
        {{ child.label }}
      </NuxtLink>
    </li>
  </ul>
</template>
