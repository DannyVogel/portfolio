import type { PlacesResponse, CheckinRequest, CheckinResponse, DeleteResponse } from '~/types/places'

export const usePlacesApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.placesApiUrl
  const apiKey = config.public.placesApiKey

  const isConfigured = computed(() => Boolean(baseUrl && apiKey))

  const fetchPlaces = () => {
    if (!baseUrl || !apiKey) {
      return {
        data: ref(null),
        status: ref('error' as const),
        error: ref(new Error('Places API not configured')),
        refresh: async () => {},
      }
    }

    return useFetch<PlacesResponse>(`${baseUrl}/places`, {
      headers: {
        'x-api-key': apiKey,
      },
    })
  }

  const checkin = async (request: CheckinRequest): Promise<CheckinResponse> => {
    const response = await $fetch<CheckinResponse>(`${baseUrl}/places/checkin`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: request,
    })
    return response
  }

  const deletePlace = async (venueId: string): Promise<DeleteResponse> => {
    const response = await $fetch<DeleteResponse>(`${baseUrl}/places/${venueId}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': apiKey,
      },
    })
    return response
  }

  return {
    fetchPlaces,
    checkin,
    deletePlace,
  }
}
