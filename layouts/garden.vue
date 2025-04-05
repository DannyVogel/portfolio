<script lang="ts" setup></script>

<template>
  <div
    class="px-4 md:px-20 sm:grid sm:grid-cols-[200px_1fr_200px] gap-12 max-h-[calc(100vh-1rem)] overflow-y-auto"
  >
    <GardenSidebar />
    <div class="pt-10 prose dark:prose-invert min-w-full">
      <slot />
    </div>
    <GardenGraph />
  </div>
</template>
