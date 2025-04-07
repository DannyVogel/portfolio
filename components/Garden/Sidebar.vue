<script lang="ts" setup></script>

<template>
  <div class="sticky top-0 max-h-[calc(100vh-1rem)] mb-10 sm:mb-0 pt-4">
    <NuxtLink to="/garden">
      <h1
        class="text-2xl font-bold italic hover:scale-105 hover:text-blue-500 transition-all duration-300"
      >
        Digital Garden
      </h1>
    </NuxtLink>
    <GardenGraph />
    <GardenNavigation />
  </div>
</template>
