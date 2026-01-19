export interface Venue {
  id: string
  name: string
  lat: number
  lng: number
  address: string | null
  city: string | null
  state: string | null
  country: string | null
  postcode: string | null
  googleMapsUrl: string | null
  visitCount: number
  firstVisit: string  // YYYY-MM-DD
  lastVisit: string   // YYYY-MM-DD
}

export interface PlacesStats {
  totalVenues: number
  totalCheckins: number
  countries: string[]
  dateRange: {
    first: string
    last: string
  }
  topVenues: Venue[]
}

export interface PlacesResponse {
  venues: Venue[]
  stats: PlacesStats
}

export interface CheckinRequest {
  url?: string
  name?: string
  lat?: number
  lng?: number
  date?: string  // YYYY-MM-DD, optional override
}

export interface CheckinResponse {
  status_code: number
  message: string
  data: {
    venue: Venue
    isNew: boolean
  }
}

export interface DeleteResponse {
  success: boolean
  deleted: {
    id: string
    name: string
  }
}
