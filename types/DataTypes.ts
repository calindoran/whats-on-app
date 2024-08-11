export type CategoryType = {
  name: string
  icon: string
  image: any
  count: number
  id: number
}

export type EventType = {
  name: string
  type: string
  genre: string
  date: Date
  slot: string
  id: number
}

export type LocationType = {
  latitude: number
  longitude: number
  altitude: number | null
  accuracy: number | null
  altitudeAccuracy: number | null
  heading: number | null
  speed: number | null
} | null
