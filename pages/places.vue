<script setup lang="ts">
definePageMeta({
  layout: 'fullwidth',
  middleware: 'places-auth',
})

const { fetchPlaces } = usePlacesApi()
const { data, status, refresh } = await fetchPlaces()
const mapRef = ref<{ resetZoom: () => void; focusVenue: (name: string) => void } | null>(null)
const showCheckinForm = ref(false)

async function onCheckinSuccess() {
  showCheckinForm.value = false
  await refresh()
}
</script>

<template>
  <div>
    <div class="mb-4 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Places I've Been</h1>
        <p class="text-gray-400">Check-in history visualized</p>
      </div>
      <div class="flex gap-2">
        <UButton
          icon="i-ph-plus"
          color="primary"
          @click="showCheckinForm = true"
        >
          Check In
        </UButton>
      </div>
    </div>

    <div v-if="status === 'pending'" class="flex items-center justify-center h-96">
      <UIcon name="i-eos-icons-loading" class="text-4xl" />
    </div>

    <div v-else-if="data?.venues && data?.stats" class="flex flex-col gap-6">
      <!-- Map and Stats -->
      <div class="flex flex-col gap-4">
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
        <div class="shrink-0">
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

    <div v-else class="text-center py-8">
      <p class="text-gray-400">Failed to load places data</p>
      <p class="text-sm text-gray-500 mt-2">Make sure the API is configured in your environment variables.</p>
    </div>

    <!-- Checkin Modal -->
    <UModal v-model:open="showCheckinForm" title="New Check-in" description="Add a new place to your map">
      <template #body>
        <PlacesCheckinForm @success="onCheckinSuccess" @cancel="showCheckinForm = false" />
      </template>
    </UModal>
  </div>
</template>
