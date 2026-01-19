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

const emit = defineEmits<{
  delete: [venueId: string]
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
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
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

    const locationParts = [venue.city, venue.state, venue.country].filter(Boolean)
    const locationText = locationParts.length > 0 ? locationParts.join(', ') : ''
    const addressText = venue.address ? `${venue.address}<br>` : ''

    const mapsLink = venue.googleMapsUrl
      ? `<a href="${venue.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="maps-link">View on Google Maps</a>`
      : ''

    marker.bindPopup(`
      <div class="venue-popup">
        <strong>${venue.name}</strong>
        ${locationText ? `<br><span class="popup-location">${locationText}</span>` : ''}
        ${addressText ? `<span class="popup-address">${addressText}</span>` : ''}
        <br>
        <span class="popup-visits">${venue.visitCount} ${visitText}</span>
        <br>
        <span class="popup-date">${dateInfo}</span>
        <div class="popup-actions">
          ${mapsLink}
          <button class="delete-btn" data-venue-id="${venue.id}">Delete</button>
        </div>
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

  // Event delegation for delete buttons in popups
  mapContainer.value?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target.classList.contains('delete-btn')) {
      const venueId = target.dataset.venueId
      if (venueId) {
        emit('delete', venueId)
      }
    }
  })
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

.popup-location {
  color: rgb(80, 80, 80);
  font-size: 0.875rem;
}

.popup-address {
  color: rgb(120, 120, 120);
  font-size: 0.75rem;
}

.popup-visits {
  color: rgb(100, 100, 100);
}

.popup-date {
  color: rgb(140, 140, 140);
  font-size: 0.75rem;
}

.popup-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-top: 0.5rem;
}

.maps-link {
  color: #2563eb;
  font-size: 0.75rem;
  text-decoration: none;
}

.maps-link:hover {
  text-decoration: underline;
}

.delete-btn {
  color: #dc2626;
  font-size: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.delete-btn:hover {
  text-decoration: underline;
}

.leaflet-popup-content-wrapper {
  background: rgb(250, 250, 250);
  color: rgb(30, 30, 30);
  border-radius: 8px;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.2);
}

.leaflet-popup-tip {
  background: rgb(250, 250, 250);
}

.leaflet-popup-close-button {
  color: rgb(100, 100, 100) !important;
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
