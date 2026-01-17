# Places API

Base URL: `https://your-api-domain.com`

All requests require the `x-api-key` header.

---

## Get All Places

Retrieve all venues with stats.

**Request**
```
GET /places
Headers:
  x-api-key: YOUR_API_KEY
```

**Response**
```json
{
  "venues": [
    {
      "id": "v_abc123",
      "name": "Coffee Shop",
      "lat": 41.3698,
      "lng": 2.1332,
      "country": "Spain",
      "visitCount": 5,
      "firstVisit": "2024-01-15",
      "lastVisit": "2024-06-20"
    }
  ],
  "stats": {
    "totalVenues": 150,
    "totalCheckins": 320,
    "countries": ["Spain", "Japan", "Austria"],
    "dateRange": {
      "first": "2020-01-15",
      "last": "2024-06-20"
    },
    "topVenues": [
      // Top 10 venues by visit count
    ]
  }
}
```

---

## Check In

Record a new check-in. If within 50m of an existing venue, increments visit count. Otherwise creates a new venue.

**Request**
```
POST /places/checkin
Headers:
  x-api-key: YOUR_API_KEY
  Content-Type: application/json
```

**Body Option 1: Google Maps URL**
```json
{
  "url": "https://maps.app.goo.gl/abc123"
}
```

**Body Option 2: Coordinates**
```json
{
  "name": "Coffee Shop",
  "lat": 41.3698,
  "lng": 2.1332
}
```

**Response (new venue)**
```json
{
  "status_code": 201,
  "message": "New venue created",
  "data": {
    "venue": {
      "id": "v_abc123",
      "name": "Coffee Shop",
      "lat": 41.3698,
      "lng": 2.1332,
      "country": "Spain",
      "visitCount": 1,
      "firstVisit": "2024-06-20",
      "lastVisit": "2024-06-20"
    },
    "isNew": true
  }
}
```

**Response (existing venue)**
```json
{
  "status_code": 200,
  "message": "Check-in recorded for existing venue",
  "data": {
    "venue": {
      "id": "v_abc123",
      "name": "Coffee Shop",
      "lat": 41.3698,
      "lng": 2.1332,
      "country": "Spain",
      "visitCount": 6,
      "firstVisit": "2024-01-15",
      "lastVisit": "2024-06-20"
    },
    "isNew": false
  }
}
```

---

## TypeScript Types

```ts
interface Venue {
  id: string
  name: string
  lat: number
  lng: number
  country: string | null
  visitCount: number
  firstVisit: string  // YYYY-MM-DD
  lastVisit: string   // YYYY-MM-DD
}

interface PlacesResponse {
  venues: Venue[]
  stats: {
    totalVenues: number
    totalCheckins: number
    countries: string[]
    dateRange: { first: string; last: string }
    topVenues: Venue[]
  }
}

interface CheckinRequest {
  url?: string
  name?: string
  lat?: number
  lng?: number
}

interface CheckinResponse {
  status_code: number
  message: string
  data: {
    venue: Venue
    isNew: boolean
  }
}
```
