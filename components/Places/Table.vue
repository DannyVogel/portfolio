<script setup lang="ts">
import type { Venue } from '~/types/places'
import type { TableColumn } from '@nuxt/ui'

const props = defineProps<{
  venues: Venue[]
  countries: string[]
}>()

const emit = defineEmits<{
  venueClick: [venueName: string]
}>()

const search = ref('')
const selectedCountry = ref<string | null>(null)

const countryOptions = computed(() => [
  { label: 'All Countries', value: null },
  ...props.countries.map(c => ({ label: c, value: c }))
])

const filteredVenues = computed(() => {
  let result = props.venues

  if (selectedCountry.value) {
    result = result.filter(v => v.country === selectedCountry.value)
  }

  if (search.value) {
    const query = search.value.toLowerCase()
    result = result.filter(v => v.name.toLowerCase().includes(query))
  }

  return result
})

const columns: TableColumn<Venue>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'country',
    header: 'Country',
  },
  {
    accessorKey: 'visitCount',
    header: 'Visits',
  },
  {
    accessorKey: 'firstVisit',
    header: 'First Visit',
  },
  {
    accessorKey: 'lastVisit',
    header: 'Last Visit',
  },
]

function onRowSelect(_event: Event, row: { original: Venue }) {
  emit('venueClick', row.original.name)
}
</script>

<template>
  <div class="border border-gray-700 rounded-lg p-4 flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-4">
      <UInput
        v-model="search"
        placeholder="Search places..."
        icon="i-ph-magnifying-glass"
        class="w-64"
      />
      <USelectMenu
        v-model="selectedCountry"
        :items="countryOptions"
        value-key="value"
        class="w-48"
      />
      <span class="text-sm text-gray-400">
        {{ filteredVenues.length }} places
      </span>
    </div>

    <UTable
      :data="filteredVenues"
      :columns="columns"
      virtualize
      class="h-[400px]"
      :ui="{ tr: 'cursor-pointer' }"
      @select="onRowSelect"
    />
  </div>
</template>
