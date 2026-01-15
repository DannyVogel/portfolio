export interface Venue {
  id: string
  name: string
  lat: number
  lng: number
  country: string
  visitCount: number
  firstVisit: string
  lastVisit: string
}

export interface PlacesStats {
  totalVenues: number
  totalCheckins: number
  totalCountries: number
  countries: string[]
  dateRange: {
    start: string
    end: string
  }
  topVenues: {
    name: string
    count: number
  }[]
}

export interface PlacesData {
  venues: Venue[]
  stats: PlacesStats
}
