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
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-2 gap-4">
      <UCard>
        <div class="text-center">
          <div class="text-3xl font-bold text-primary">{{ stats.totalVenues }}</div>
          <div class="text-sm text-gray-400">Unique Places</div>
        </div>
      </UCard>
      <UCard>
        <div class="text-center">
          <div class="text-3xl font-bold text-primary">{{ stats.totalCheckins }}</div>
          <div class="text-sm text-gray-400">Total Check-ins</div>
        </div>
      </UCard>
    </div>

    <UCard>
      <template #header>
        <h3 class="font-semibold">Activity Period</h3>
      </template>
      <div class="text-center">
        <div class="text-lg">{{ stats.dateRange.start }}</div>
        <div class="text-gray-500">to</div>
        <div class="text-lg">{{ stats.dateRange.end }}</div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="font-semibold">Most Visited Places</h3>
      </template>
      <ul class="space-y-1">
        <li
          v-for="(venue, index) in stats.topVenues"
          :key="venue.name"
          class="flex items-center gap-2 p-1.5 -mx-1.5 rounded cursor-pointer hover:bg-gray-800 transition-colors"
          @click="emit('venueClick', venue.name)"
        >
          <span class="text-gray-500 w-5 text-right">{{ index + 1 }}.</span>
          <span class="flex-1 truncate">{{ venue.name }}</span>
          <UBadge color="primary" variant="subtle">{{ venue.count }}</UBadge>
        </li>
      </ul>
    </UCard>
  </div>
</template>
