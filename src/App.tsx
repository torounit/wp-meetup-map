import React from "react"
import "./App.css"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"
import CountrySelect from "./CountrySelect"
import Events, { MeetupEvent } from "./Events"
import { fetchCountryCode, fetchEvents } from "./api"
import config from "./config"

const { useState, useEffect } = React
const { defaultCountry } = config

const EventsMap: React.FC<{ meetupEvents: MeetupEvent[] }> = ({ meetupEvents }) => {
  if (meetupEvents.length > 0) {
    const bounds: [number, number][] = meetupEvents.map((meetup: MeetupEvent) => {
      const { latitude, longitude } = meetup.location
      return [latitude, longitude]
    })
    return (
      <Map bounds={bounds}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {meetupEvents.map((meetupEvent: MeetupEvent, i: number) => (
          <Marker key={i} position={[meetupEvent.location.latitude, meetupEvent.location.longitude]}>
            <Popup>
              <a href={meetupEvent.url}>{meetupEvent.title}</a>
            </Popup>
          </Marker>
        ))}
      </Map>
    )
  }

  return <div />
}

const App: React.FC = () => {
  const [meetupEvents, setMeetupEvents] = useState<Array<MeetupEvent>>([])
  const [country, setCountry] = useState<string>(defaultCountry)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async position => {
      const code = await fetchCountryCode(position.coords.latitude, position.coords.longitude)
      setCountry(code)
    })
  }, [])

  useEffect(() => {
    fetchEvents({
      country,
    }).then(setMeetupEvents)
  }, [country])
  return (
    <div className="app">
      <div className="app-map">
        <EventsMap meetupEvents={meetupEvents} />
      </div>
      <div className="app-events">
        <p>
          <CountrySelect value={country} onChange={setCountry} />
        </p>
        <Events meetupEvents={meetupEvents} />
      </div>
    </div>
  )
}

export default App
