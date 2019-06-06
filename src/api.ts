import queryString from "query-string"
import config from "./config"

const { defaultCountry } = config

export const fetchCountryCode = async (latitude: number, longitude: number) => {
  const reverseGeo = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  )
  const result = await reverseGeo.json()
  return result.address.country_code.toUpperCase()
}

type Country = {
  name: string
  "alpha-2": string
  "alpha-3": string
  "country-code": string
  "iso_3166-2": string
  region: string
  "sub-region": string
  "intermediate-region": string
  "region-code": string
  "sub-region-code": string
  "intermediate-region-code": string
}

export const fetchCountries = async (): Promise<Array<Country>> => {
  const url = "https://cdn.jsdelivr.net/gh/lukes/ISO-3166-Countries-with-Regional-Codes@master/all/all.json"
  const result = await fetch(url)
  return await result.json()
}

type APIQuery = {
  number: number
  country: string
  latitude?: number
  longitude?: number
  location?: string
  locale?: string
}
export const fetchEvents = async (query: Partial<APIQuery> = {}) => {
  const param: APIQuery = {
    number: 100,
    country: defaultCountry,
    latitude: undefined,
    longitude: undefined,
    location: undefined,
    locale: undefined,
  }
  const stringified = queryString.stringify({ ...param, ...query })
  const api = `https://api.wordpress.org/events/1.0/?${stringified}`
  const response = await fetch(api)
  const { events } = await response.json()
  return events
}
