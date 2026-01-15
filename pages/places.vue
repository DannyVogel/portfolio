<script setup lang="ts">
import type { PlacesData } from '~/types/places'

definePageMeta({
  layout: 'fullwidth'
})

const { data, status } = await useFetch<PlacesData>('/data/places.json')
const mapRef = ref<{ resetZoom: () => void; focusVenue: (name: string) => void } | null>(null)
</script>

<template>
  <div>
    <div class="mb-4 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Places I've Been</h1>
        <p class="text-gray-400">Foursquare check-in history visualized</p>
      </div>
      <UButton to="/" variant="ghost" icon="i-ph-arrow-left">
        Back
      </UButton>
    </div>

    <div v-if="status === 'pending'" class="flex items-center justify-center h-96">
      <UIcon name="i-eos-icons-loading" class="text-4xl" />
    </div>

    <div v-else-if="data" class="flex flex-col gap-6">
      <!-- Map and Stats -->
      <div class="flex flex-col xl:flex-row gap-4">
        <div class="flex-1 h-[60vh] md:h-[60vh] relative">
          <PlacesMap ref="mapRef" :venues="data.venues" />
          <UButton
            class="absolute top-3 right-3 z-[1000]"
            icon="i-ph-arrows-out"
            color="gray"
            size="sm"
            @click="mapRef?.resetZoom()"
          >
            Reset
          </UButton>
        </div>
        <div class="xl:w-80 shrink-0">
          <PlacesStats :stats="data.stats" @venue-click="mapRef?.focusVenue($event)" />
        </div>
      </div>

      <!-- Places Table -->
      <PlacesTable
        :venues="data.venues"
        :countries="data.stats.countries"
        @venue-click="mapRef?.focusVenue($event)"
      />
    </div>

    <div v-else class="text-center text-gray-400 py-8">
      Failed to load places data
    </div>
  </div>
</template>
