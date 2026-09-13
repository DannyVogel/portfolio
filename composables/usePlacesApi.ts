import type { PlacesResponse, CheckinRequest, CheckinResponse, DeleteResponse } from '~/types/places'

const NOT_CONFIGURED = 'Places API not configured'

export const usePlacesApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.placesApiUrl
  const apiKey = config.public.placesApiKey

  const isConfigured = computed(() => Boolean(baseUrl && apiKey))

  const fetchPlaces = () => {
    if (!isConfigured.value) {
      return {
        data: ref(null),
        status: ref('error' as const),
        error: ref(new Error(NOT_CONFIGURED)),
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
    // Without this the empty baseUrl resolves against our own origin and the
    // request 404s here instead of naming the missing configuration.
    if (!isConfigured.value) {
      throw new Error(NOT_CONFIGURED)
    }

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
    if (!isConfigured.value) {
      throw new Error(NOT_CONFIGURED)
    }

    const response = await $fetch<DeleteResponse>(`${baseUrl}/places/${venueId}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': apiKey,
      },
    })
    return response
  }

  return {
    isConfigured,
    fetchPlaces,
    checkin,
    deletePlace,
  }
}
