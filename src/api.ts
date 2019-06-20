import queryString from "query-string"

export const fetchCountryCode = async (latitude: number, longitude: number) => {
  const reverseGeo = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  )
  const result = await reverseGeo.json()
  return result.address.country_code.toUpperCase()
}

type APIQuery = {
  number?: number
  country: string
  latitude?: number
  longitude?: number
  location?: string
  locale?: string
}
export const fetchEvents = async (query: APIQuery) => {
  const param: Partial<APIQuery> = {
    number: 100,
    latitude: undefined,
    longitude: undefined,
    location: undefined,
    locale: undefined,
  }
  const stringified = queryString.stringify({...param, ...query})
  const api = `https://api.wordpress.org/events/1.0/?${stringified}`
  const response = await fetch(api)
  const {events} = await response.json()
  return events
}
