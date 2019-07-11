import React from "react"
import CountrySelect from "../CountrySelect"
import { MeetupEvent } from "../Events"
import { fetchCountryCode, fetchEvents } from "../../api"
import config from "../../config"
import classes from "./index.module.css"
import { getCountryFromLocalStorage, getCurrentPosition, parseQuery, setCountryFromLocalStorage } from "../../utility"
import Notes from "./Notes"
import MeetupSelect from "./MeetupSelect"
import EventsView from "./EventsView"

const { useState, useEffect } = React
const { defaultCountry } = config

const getCountryCode = (): string => {
  const query = parseQuery()
  if (query.country && typeof query.country === "string") {
    return query.country.toUpperCase()
  }
  const country = getCountryFromLocalStorage()
  if (country) {
    return country
  }
  return ""
}

/**
 * Hooks for country code.
 */
const useCountryState = (): [string, (state: string) => void] => {
  const [country, setCountry] = useState<string>(getCountryCode() || defaultCountry)

  const saveCountry = (state: string) => {
    setCountry(state)
    setCountryFromLocalStorage(state)
  }

  useEffect(() => {
    (async () => {
      let code = getCountryCode()
      if (code) {
        saveCountry(code)
      } else {
        const position = await getCurrentPosition()
        code = await fetchCountryCode(position.coords.latitude, position.coords.longitude)
        saveCountry(code)
      }
    })()
  }, [])
  return [country, saveCountry]
}

/**
 * App Components.
 * @constructor
 */
const Index: React.FC = () => {
  const [country, setCountry] = useCountryState()

  const [meetupEvents, setMeetupEvents] = useState<Array<MeetupEvent>>([])
  useEffect(() => {
    (async () => {
      if (country) {
        const events = await fetchEvents({ country })
        setMeetupEvents(events)
      }
    })()
  }, [country])

  const [meetup, setMeetup] = useState<string>("")
  useEffect(() => setMeetup(""), [meetupEvents])


  const [selectedEvents, setSelectedEvents] = useState<Array<MeetupEvent>>([])
  useEffect(() => {
    const filteredEvents = meetupEvents.filter(meetupEvent => {
      if (!meetup) {
        return true
      }
      return meetupEvent.meetup && meetupEvent.meetup.includes(meetup)
    })
    setSelectedEvents(filteredEvents)
  }, [meetup, meetupEvents])

  const [mode, setMode] = useState<"map" | "events">("map")
  const [showNotes, setShowNotes] = useState<boolean>(false)

  return (
    <div className={classes.app} data-app-mode={mode}>
      <header className={classes.header}>
        <h1 className={classes.title}>WordPress Meetup Map</h1>
        <button className={classes.notesButton} onClick={() => setShowNotes(!showNotes)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
          <span className={classes.screenReaderText}>notes</span>
        </button>
        <CountrySelect label="Country:" className={classes.countrySelect} value={country} onChange={setCountry} />
        <MeetupSelect label="Meetup:" meetupEvents={meetupEvents} onChange={e => setMeetup(e.target.value)} />
      </header>
      <main className={classes.main}>
        <EventsView meetupEvents={selectedEvents} />
      </main>
      <footer className={classes.footer}>
        <div className={classes.menu}>
          <button onClick={() => setMode("map")}>Map</button>
          <button onClick={() => setMode("events")}>Events</button>
        </div>
      </footer>
      {showNotes && <Notes onClose={() => setShowNotes(false)} />}
    </div>
  )
}

export default Index
