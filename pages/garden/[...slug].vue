<script lang="ts" setup>
definePageMeta({
  layout: "garden",
});
const contentPath = useRoute().path.replace(/^\/garden/, "");
const { data: page } = await useAsyncData("page", () => {
  return queryCollection("content").path(contentPath).first();
});
</script>

<template>
  <template v-if="page">
    <ContentRenderer :value="page" />
  </template>
  <template v-else>
    <div class="empty-page">
      <h1>Page Not Found</h1>
      <p>Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/garden">Go back home</NuxtLink>
    </div>
  </template>
</template>
