import queryString from "query-string"

const {location} = window

export const parseQuery = () => {
  return queryString.parse(location.search)
}

export const getCurrentPosition = () => {
  return new Promise((resolve: (value?: Position) => void, reject: (reason?: PositionError) => void) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}
