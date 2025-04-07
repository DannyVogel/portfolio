<script lang="ts" setup>
const { openSlideover, openGraph } = useAppState();
</script>

<template>
  <div class="sm:sticky sm:top-0 max-h-[calc(100vh-1rem)] sm:mb-0 pt-4">
    <div class="flex items-center gap-2">
      <UButton
        icon="i-heroicons-bars-4"
        variant="ghost"
        color="white"
        class="sm:hidden mt-0.5"
        @click="openSlideover"
      />
      <NuxtLink to="/garden">
        <h1
          class="text-2xl font-bold italic hover:scale-105 hover:text-blue-500 transition-all duration-300"
        >
          Digital Garden
        </h1>
      </NuxtLink>
      <UButton
        icon="i-heroicons-cube-transparent"
        variant="ghost"
        color="white"
        class="sm:hidden ml-auto mt-0.5"
        @click="openGraph"
      />
    </div>
    <div class="hidden sm:block">
      <GardenGraph />
    </div>
    <div class="sm:hidden">
      <GardenGraphModal />
    </div>
    <GardenNavigation />
  </div>
</template>
