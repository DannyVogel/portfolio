<script setup lang="ts">
import type { Venue } from '~/types/places'

definePageMeta({
  layout: 'fullwidth',
  middleware: 'places-auth',
})

const toast = useToast()
const { fetchPlaces, deletePlace } = usePlacesApi()
const { data, status, refresh } = await fetchPlaces()
const mapRef = ref<{ resetZoom: () => void; focusVenue: (name: string) => void } | null>(null)
const showCheckinForm = ref(false)
const showDeleteConfirm = ref(false)
const venueToDelete = ref<Venue | null>(null)
const isDeleting = ref(false)

async function onCheckinSuccess() {
  showCheckinForm.value = false
  await refresh()
}

function onDeleteRequest(venueId: string) {
  const venue = data.value?.venues.find(v => v.id === venueId)
  if (venue) {
    venueToDelete.value = venue
    showDeleteConfirm.value = true
  }
}

async function confirmDelete() {
  if (!venueToDelete.value) return

  isDeleting.value = true
  try {
    await deletePlace(venueToDelete.value.id)
    toast.add({
      title: 'Place deleted',
      description: `${venueToDelete.value.name} has been removed.`,
      color: 'success',
    })
    showDeleteConfirm.value = false
    venueToDelete.value = null
    await refresh()
  } catch (error) {
    toast.add({
      title: 'Failed to delete',
      description: 'An error occurred while deleting the place.',
      color: 'error',
    })
  } finally {
    isDeleting.value = false
  }
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
          <PlacesMap ref="mapRef" :venues="data.venues" @delete="onDeleteRequest" />
          <UButton
            class="absolute top-3 right-3 z-[1000]"
            icon="i-ph-arrows-out"
            color="neutral"
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
        @delete="onDeleteRequest"
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

    <!-- Delete Confirmation Modal -->
    <UModal v-model:open="showDeleteConfirm" title="Delete Place" description="This action cannot be undone.">
      <template #body>
        <div class="flex flex-col gap-4">
          <p>
            Are you sure you want to delete <strong>{{ venueToDelete?.name }}</strong>?
          </p>
          <div class="flex justify-end gap-2">
            <UButton
              color="neutral"
              variant="outline"
              :disabled="isDeleting"
              @click="showDeleteConfirm = false"
            >
              Cancel
            </UButton>
            <UButton
              color="error"
              :loading="isDeleting"
              @click="confirmDelete"
            >
              Delete
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
