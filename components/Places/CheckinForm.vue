<script setup lang="ts">
import type { CheckinResponse } from '~/types/places'

const emit = defineEmits<{
  success: [response: CheckinResponse]
  cancel: []
}>()

const { checkin } = usePlacesApi()
const toast = useToast()

const url = ref('')
const date = ref(new Date().toISOString().split('T')[0])
const loading = ref(false)

async function handleSubmit() {
  if (!url.value.trim()) {
    toast.add({
      title: 'Error',
      description: 'Please enter a Google Maps URL',
      color: 'error',
    })
    return
  }

  loading.value = true

  try {
    const response = await checkin({
      url: url.value.trim(),
      date: date.value,
    })

    const message = response.data.isNew
      ? `New place "${response.data.venue.name}" added!`
      : `Checked in at "${response.data.venue.name}"`

    toast.add({
      title: 'Success',
      description: message,
      color: 'success',
    })

    emit('success', response)
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error?.data?.message || error?.message || 'Failed to check in',
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
    <UFormField label="Google Maps URL" required class="flex-1">
      <UInput
        v-model="url"
        placeholder="https://maps.app.goo.gl/..."
        icon="i-ph-map-pin"
        :disabled="loading"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Date" class="flex-1" >
      <UInput
        v-model="date"
        type="date"
        icon="i-ph-calendar"
        :disabled="loading"
        class="w-full"
      />
    </UFormField>

    <div class="flex justify-end gap-2 pt-2">
      <UButton
        color="neutral"
        variant="ghost"
        :disabled="loading"
        @click="emit('cancel')"
      >
        Cancel
      </UButton>
      <UButton
        type="submit"
        :loading="loading"
        icon="i-ph-check"
      >
        Check In
      </UButton>
    </div>
  </form>
</template>
