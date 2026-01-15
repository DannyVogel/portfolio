<script setup lang="ts">
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import type { Venue } from '~/types/places'

const props = defineProps<{
  venues: Venue[]
}>()

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let markerBounds: L.LatLngBounds | null = null
let markerClusterGroup: L.MarkerClusterGroup | null = null
const venueMarkers = new Map<string, L.Marker>()

function resetZoom() {
  if (map && markerBounds) {
    map.fitBounds(markerBounds, { padding: [20, 20] })
    map.once('zoomend', () => {
      map?.setZoom((map.getZoom() || 2) + 1)
    })
  }
}

function focusVenue(venueName: string) {
  const marker = venueMarkers.get(venueName)
  if (marker && map && markerClusterGroup) {
    markerClusterGroup.zoomToShowLayer(marker, () => {
      marker.openPopup()
    })
  }
}

defineExpose({ resetZoom, focusVenue })

onMounted(() => {
  if (!mapContainer.value) return

  // Initialize map centered on a middle point
  map = L.map(mapContainer.value).setView([40, 0], 2)

  // Add OpenStreetMap tiles with dark style
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19
  }).addTo(map)

  // Create marker cluster group
  markerClusterGroup = L.markerClusterGroup({
    chunkedLoading: true,
    maxClusterRadius: 50,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false
  })

  // Fix default marker icon path issue
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
  })

  // Add markers for each venue
  for (const venue of props.venues) {
    const marker = L.marker([venue.lat, venue.lng])

    const visitText = venue.visitCount === 1 ? 'visit' : 'visits'
    const dateInfo = venue.firstVisit === venue.lastVisit
      ? venue.firstVisit
      : `${venue.firstVisit} - ${venue.lastVisit}`

    marker.bindPopup(`
      <div class="venue-popup">
        <strong>${venue.name}</strong>
        <br>
        <span class="text-gray-400">${venue.visitCount} ${visitText}</span>
        <br>
        <span class="text-gray-500 text-xs">${dateInfo}</span>
      </div>
    `)

    venueMarkers.set(venue.name, marker)
    markerClusterGroup.addLayer(marker)
  }

  map.addLayer(markerClusterGroup)

  // Fit bounds to show all markers, then zoom in one level
  if (props.venues.length > 0) {
    markerBounds = markerClusterGroup.getBounds()
    map.fitBounds(markerBounds, { padding: [20, 20] })
    map.once('zoomend', () => {
      map?.setZoom((map.getZoom() || 2) + 1)
    })
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div ref="mapContainer" class="w-full h-full min-h-[400px] rounded-lg" />
</template>

<style>
.venue-popup {
  min-width: 150px;
}

.leaflet-popup-content-wrapper {
  background: rgb(30, 30, 30);
  color: white;
  border-radius: 8px;
}

.leaflet-popup-tip {
  background: rgb(30, 30, 30);
}

.leaflet-popup-close-button {
  color: white !important;
}

.marker-cluster-small {
  background-color: rgba(110, 204, 57, 0.6);
}

.marker-cluster-small div {
  background-color: rgba(110, 204, 57, 0.8);
}

.marker-cluster-medium {
  background-color: rgba(240, 194, 12, 0.6);
}

.marker-cluster-medium div {
  background-color: rgba(240, 194, 12, 0.8);
}

.marker-cluster-large {
  background-color: rgba(241, 128, 23, 0.6);
}

.marker-cluster-large div {
  background-color: rgba(241, 128, 23, 0.8);
}

.marker-cluster {
  background-clip: padding-box;
  border-radius: 20px;
}

.marker-cluster div {
  width: 30px;
  height: 30px;
  margin-left: 5px;
  margin-top: 5px;
  text-align: center;
  border-radius: 15px;
  font: 12px "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: white;
}

.marker-cluster span {
  line-height: 30px;
}
</style>
