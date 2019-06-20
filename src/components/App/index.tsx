import React from "react"
import CountrySelect from "../CountrySelect"
import Events, {MeetupEvent} from "../Events"
import EventsMap from "../EventsMap"
import {fetchCountryCode, fetchEvents} from "../../api"
import config from "../../config"
import classes from "./index.module.css"
import {getCountryFromLocalStrage, getCurrentPosition, parseQuery, setCountryFromLocalStrage} from "../../utility"
import NotFound from "./NotFound"
import Notes from "./Notes";
import MeetupSelect from "./MeetupSelect";

const {useState, useEffect} = React
const {defaultCountry} = config

const Index: React.FC = () => {
  const [meetupEvents, setMeetupEvents] = useState<Array<MeetupEvent>>([])
  const [country, setCountry] = useState<string>(defaultCountry)

  const saveCountry = (state: string) => {
    setCountry(state)
    setCountryFromLocalStrage(state)
  }

  const [meetup, setMeetup] = useState<string>("")
  const [showNotes, setShowNotes] = useState<boolean>(false)
  const [mode, setMode] = useState<"map" | "events">("map")

  useEffect(() => {
    (async () => {
      const query = parseQuery()
      if (query.country && typeof query.country === "string") {
        saveCountry(query.country.toUpperCase())
        return;
      }
      const country = getCountryFromLocalStrage();
      if (country) {
        setCountry(country)
        return;
      }
      const position = await getCurrentPosition()
      const code = await fetchCountryCode(position.coords.latitude, position.coords.longitude)
      saveCountry(code)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const events = await fetchEvents({country})
      setMeetupEvents(events)
    })()
  }, [country])

  useEffect(() => {
    setMeetup("")
  }, [meetupEvents])

  const events = meetupEvents.filter((meetupEvent) => {
    if (!meetup) {
      return true
    }
    return meetupEvent.meetup && meetupEvent.meetup.includes(meetup);
  })

  const toggleShowNotes = () => {
    setShowNotes(!showNotes)
  }

  return (
    <div className={classes.app} data-app-mode={mode}>
      <header className={classes.header}>
        <h1 className={classes.title}>WordPress Meetup Map</h1>
        <button className={classes.notesButton} onClick={toggleShowNotes}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path
              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
          <span className={classes.screenReaderText}>notes</span>
        </button>
        <CountrySelect label="Country:" className={classes.countrySelect} value={country} onChange={saveCountry}/>
        <MeetupSelect label="Meetup:" meetupEvents={meetupEvents} onChange={(e) => setMeetup(e.target.value)}/>
      </header>
      <main className={classes.container}>
        <div className={classes.map}>
          {meetupEvents.length > 0 ?
            <EventsMap meetupEvents={events}/> :
            <NotFound/>
          }
        </div>
        <div className={classes.events}>
          <Events meetupEvents={events}/>
        </div>
      </main>
      <footer className={classes.footer}>
        <div className={classes.menu}>
          <button onClick={() => setMode("map")}>Map</button>
          <button onClick={() => setMode("events")}>Events</button>
        </div>
      </footer>
      {showNotes && <Notes onClose={() => setShowNotes(false)}/>}
    </div>
  )
}

export default Index
