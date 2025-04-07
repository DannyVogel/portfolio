<script lang="ts" setup>
const { open } = useAppState();
</script>

<template>
  <div class="sm:sticky sm:top-0 max-h-[calc(100vh-1rem)] mb-10 sm:mb-0 pt-4">
    <div class="flex items-center gap-2">
      <UButton
        icon="i-heroicons-bars-4"
        variant="ghost"
        color="white"
        class="sm:hidden mt-0.5"
        @click="open"
      />
      <NuxtLink to="/garden">
        <h1
          class="text-2xl font-bold italic hover:scale-105 hover:text-blue-500 transition-all duration-300"
        >
          Digital Garden
        </h1>
      </NuxtLink>
    </div>
    <GardenGraph />
    <GardenNavigation />
  </div>
</template>
