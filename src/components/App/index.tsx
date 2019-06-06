import React from "react"
import CountrySelect from "../CountrySelect"
import Events, { MeetupEvent } from "../Events"
import EventsMap from "../EventsMap"
import { fetchCountryCode, fetchEvents } from "../../api"
import config from "../../config"
import classes from "./index.module.css"
import { getCurrentPosition, parseQuery } from "../../utility"

const { useState, useEffect } = React
const { defaultCountry } = config

const Index: React.FC = () => {
  const [meetupEvents, setMeetupEvents] = useState<Array<MeetupEvent>>([])
  const [country, setCountry] = useState<string>(defaultCountry)
  const [mode, setMode] = useState<"map" | "events">("map")

  useEffect(() => {
    (async () => {
      const { country } = parseQuery()
      if (country && typeof country === "string") {
        setCountry(country.toUpperCase())
      } else {
        const position = await getCurrentPosition()
        const code = await fetchCountryCode(position.coords.latitude, position.coords.longitude)
        setCountry(code)
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const events = await fetchEvents({ country })
      setMeetupEvents(events)
    })()
  }, [country])

  return (
    <div className={classes.app} data-app-mode={mode}>
      <header className={classes.header}>
        <h1>WordPress Meetup Map</h1>
        <CountrySelect className={classes.countrySelect} value={country} onChange={setCountry} />
      </header>
      <main className={classes.container}>
        <div className={classes.map}>
          {meetupEvents.length > 0 ? (
            <EventsMap meetupEvents={meetupEvents} />
          ) : (
            <div className={classes.notFound}>
              <div>
                <p>Sorry, no meetup events found.</p>
                <p>
                  If there is not a meetup group in your city but you would like to start one,{" "}
                  <a rel="noopener noreferrer" target="_blank" href="https://make.wordpress.org/community/handbook/meetup-organizer/getting-started/interest-form/">
                    fill out our meetup interest form
                  </a>{" "}
                  and we can set up a new group for your city and make you the first organizer.{" "}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className={classes.events}>
          <Events meetupEvents={meetupEvents} />
        </div>
      </main>
      <footer className={classes.footer}>
        <button onClick={() => setMode("map")}>Map</button>
        <button onClick={() => setMode("events")}>Events</button>
      </footer>
    </div>
  )
}

export default Index
