import queryString from "query-string"

const { location } = window

export const parseQuery = () => {
  return queryString.parse(location.search)
}

export const getCurrentPosition = () => {
  return new Promise((resolve: (value?: GeolocationPosition) => void, reject: (reason?: GeolocationPositionError) => void) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export const getCountryFromLocalStorage = (): string | null => localStorage.getItem("country")
export const setCountryFromLocalStorage = (value: string):void => localStorage.setItem("country", value)
