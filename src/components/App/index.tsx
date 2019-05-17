import React from "react"
import CountrySelect from "../CountrySelect"
import Events, { MeetupEvent } from "../Events"
import EventsMap from '../EventsMap'
import { fetchCountryCode, fetchEvents } from "../../api"
import config from "../../config"
import classes from "./index.module.css"

const { useState, useEffect } = React
const { defaultCountry } = config

const Index: React.FC = () => {
  const [meetupEvents, setMeetupEvents] = useState<Array<MeetupEvent>>([])
  const [country, setCountry] = useState<string>(defaultCountry)
  const [mode, setMode] = useState<"map" | "events">("map")

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
    <div className={classes.app} data-app-mode={mode}>
      <header className={classes.header}>
        <h1>WordPress Meetup Map</h1>
        <div>
          <CountrySelect className={classes.countrySelect} value={country} onChange={setCountry} />
        </div>
      </header>
      <div className={classes.container}>
        <div className={classes.map}>
          <EventsMap meetupEvents={meetupEvents} />
        </div>
        <div className={classes.events}>

          <Events meetupEvents={meetupEvents} />
        </div>
      </div>
      <footer className={classes.footer}>
        <button onClick={() => setMode('map')}>Map</button>
        <button onClick={() => setMode('events')}>Events</button>
      </footer>
    </div>
  )
}

export default Index
