# Places Backend Design

## Overview

Move Foursquare check-in data to a SQL backend that:
1. Serves existing venue data to the frontend
2. Accepts new check-ins via iOS Shortcut (Google Maps share links)

---

## Data Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Google Maps    │────▶│  iOS Shortcut   │────▶│    Backend      │
│  (Share Link)   │     │  (HTTP POST)    │     │   (Parse/Store) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                                ┌─────────────────┐
                                                │   SQLite/SQL    │
                                                └─────────────────┘
                                                        │
                                                        ▼
                                                ┌─────────────────┐
                                                │  Nuxt Frontend  │
                                                │  /places page   │
                                                └─────────────────┘
```

---

## Database Schema

```sql
CREATE TABLE venues (
  id            TEXT PRIMARY KEY,  -- UUID or nanoid
  name          TEXT NOT NULL,
  lat           REAL NOT NULL,
  lng           REAL NOT NULL,
  country       TEXT,
  visit_count   INTEGER DEFAULT 1,
  first_visit   TEXT NOT NULL,     -- ISO date
  last_visit    TEXT NOT NULL,     -- ISO date
  created_at    TEXT DEFAULT (datetime('now')),
  updated_at    TEXT DEFAULT (datetime('now'))
);

-- Index for coordinate-based lookups
CREATE INDEX idx_venues_coords ON venues(lat, lng);
```

---

## API Endpoints

### GET /api/places

Returns all venues for the frontend.

**Response:**
```json
{
  "venues": [
    {
      "id": "abc123",
      "name": "Kobuta Ramen",
      "lat": 41.3698,
      "lng": 2.1332,
      "country": "Spain",
      "visitCount": 5,
      "firstVisit": "2019-06-12",
      "lastVisit": "2024-01-15"
    }
  ],
  "stats": {
    "totalVenues": 1150,
    "totalCheckins": 1797,
    "totalCountries": 19,
    "countries": ["Spain", "Japan", ...],
    "dateRange": { "start": "2011-08-26", "end": "2024-01-15" },
    "topVenues": [...]
  }
}
```

### POST /api/places/checkin

Accepts a new check-in from iOS Shortcut.

**Request:**
```json
{
  "url": "https://maps.app.goo.gl/abc123"
}
```

Or with pre-parsed data:
```json
{
  "name": "Kobuta Ramen",
  "lat": 41.3698,
  "lng": 2.1332
}
```

**Backend Logic:**
1. If `url` provided, parse/follow redirect to extract name + coordinates
2. Reverse geocode to get country (using `country-reverse-geocoding` or similar)
3. Search for existing venue within ~50m radius
4. **If found:** increment `visit_count`, update `last_visit`
5. **If not found:** create new venue with `visit_count: 1`

**Response:**
```json
{
  "success": true,
  "venue": {
    "id": "abc123",
    "name": "Kobuta Ramen",
    "isNew": false,
    "visitCount": 6
  }
}
```

---

## Google Maps URL Parsing

**Shortened URL:**
```
https://maps.app.goo.gl/abc123
```
→ Follow redirect to get full URL

**Full URL formats:**
```
https://www.google.com/maps/place/Kobuta+Ramen/@41.3698132,2.1332596,17z/...
https://maps.google.com/?q=41.3698,2.1332
https://www.google.com/maps?q=41.3698,2.1332
```

**Extraction regex examples:**
```javascript
// Extract name from path
const nameMatch = url.match(/\/place\/([^/@]+)/);
const name = nameMatch ? decodeURIComponent(nameMatch[1].replace(/\+/g, ' ')) : null;

// Extract coordinates
const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
const lat = coordMatch ? parseFloat(coordMatch[1]) : null;
const lng = coordMatch ? parseFloat(coordMatch[2]) : null;

// Or from query string
const qMatch = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
```

---

## iOS Shortcut

**Simple flow:**
1. Receive shared URL from Google Maps
2. HTTP POST to `https://yoursite.com/api/places/checkin`
3. Show notification with result

**Shortcut actions:**
```
1. Receive [URLs] input from Share Sheet
2. Get URLs from [Shortcut Input]
3. Get Contents of URL:
   - URL: https://yoursite.com/api/places/checkin
   - Method: POST
   - Headers: { "Authorization": "Bearer YOUR_TOKEN" }
   - Body: JSON { "url": [URLs] }
4. Show Notification: "Checked in!"
```

---

## Coordinate Matching

To avoid duplicates from different name formats, match by proximity:

```javascript
function findNearbyVenue(lat, lng, radiusMeters = 50) {
  // Haversine formula or simple approximation
  // 0.0005 degrees ≈ 50 meters
  const delta = 0.0005;

  return db.query(`
    SELECT * FROM venues
    WHERE lat BETWEEN ? AND ?
      AND lng BETWEEN ? AND ?
    LIMIT 1
  `, [lat - delta, lat + delta, lng - delta, lng + delta]);
}
```

---

## Migration

Import existing `places.json` data:

```javascript
import places from './public/data/places.json';

for (const venue of places.venues) {
  db.run(`
    INSERT INTO venues (id, name, lat, lng, country, visit_count, first_visit, last_visit)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [venue.id, venue.name, venue.lat, venue.lng, venue.country,
      venue.visitCount, venue.firstVisit, venue.lastVisit]);
}
```

---

## Security Considerations

- Add authentication token for POST endpoint
- Rate limiting to prevent abuse
- Validate coordinates are within reasonable bounds (-90 to 90 lat, -180 to 180 lng)
