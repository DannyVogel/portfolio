<script setup lang="ts">
import type { PlacesStats } from '~/types/places'

defineProps<{
  stats: PlacesStats
}>()

const emit = defineEmits<{
  venueClick: [venueName: string]
}>()
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4">
    <div class="grid grid-cols-2 gap-4 flex-1">
      <UCard>
        <template #header>
          <h3 class="font-semibold">Unique Places</h3>
        </template>
          <div class="text-3xl font-bold text-primary">{{ stats.totalVenues }}</div>
      </UCard>
      <UCard>
        <template #header>
          <h3 class="font-semibold">Total Check-ins</h3>
        </template>
        <div class="text-3xl font-bold text-primary">{{ stats.totalCheckins }}</div>
      </UCard>
    </div>

    <UCard class="flex-1">
      <template #header>
        <h3 class="font-semibold">Activity Period</h3>
      </template>
      <div class="text-center flex flex-col md:flex-row gap-2 items-center justify-center">
        <div class="text-lg text-center md:text-left">{{ stats.dateRange.first }}</div>
        <div class="text-gray-500 text-center md:text-left">to</div>
        <div class="text-lg text-center md:text-left">{{ stats.dateRange.last }}</div>
      </div>
    </UCard>

  </div>
</template>
