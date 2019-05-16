import React from 'react';
import './App.css';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import queryString from 'query-string'
import CountrySelect from "./CountrySelect";

const {useState, useEffect} = React;
const defaultCountry = 'US';

type APIQuery = {
  number: number
  country: string
  latitude?: number
  longitude?: number
  location?: string
  locale?: string
}
const fetchEvents = async (query: Partial<APIQuery> = {}) => {

  const param:APIQuery = {
    number: 20,
    country: defaultCountry,
    latitude: undefined,
    longitude: undefined,
    location: undefined,
    locale: undefined
  }
  const stringified = queryString.stringify({ ...param, ...query });
  const api = `https://api.wordpress.org/events/1.0/?${stringified}`
  const response = await fetch(api)
  const {events} = await response.json()
  return events
}

type Location = {
  location: string
  country: string
  latitude: number
  longitude: number
}

type MeetupEvent = {
  date: string
  location: Location
  meetupEvent: string
  meetupEvent_url: string
  title: string
  type: string
  url: string
}

const EventsMap: React.FC<{ meetupEvents: MeetupEvent[] }> = ({meetupEvents}) => {
  if (meetupEvents.length > 0) {
    const bounds: [number, number][] = meetupEvents.map((meetup: MeetupEvent) => {
      const {latitude, longitude} = meetup.location;
      return [
        latitude,
        longitude
      ]
    })
    return (
      <Map bounds={bounds}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
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

  return (<div/>)
}

const Events: React.FC<{ meetupEvents: MeetupEvent[] }> = ({meetupEvents}) => {
  return (
    <div>
      {meetupEvents.map((meetupEvent: MeetupEvent, i: number) => (
        <article key={i}>
          <div><a href={meetupEvent.url}>{meetupEvent.title}</a></div>
          <time>{meetupEvent.date}</time>
          <div><a href={meetupEvent.meetupEvent_url}>{meetupEvent.meetupEvent}</a></div>
        </article>
      ))}
    </div>
  )
}

const App: React.FC = () => {
  const [meetupEvents, setMeetupEvents] = useState<Array<MeetupEvent>>([]);
  const [country, setCountry] = useState<string>(defaultCountry);
  useEffect(() => {
    console.log(country)
    fetchEvents({
      country
    }).then(setMeetupEvents)
  }, [country]);
  return (
    <div className="App">
      <div className="App-Map">
        <EventsMap meetupEvents={meetupEvents}/>
      </div>
      <div className="App-Events">
        <p><CountrySelect value={defaultCountry} onChange={ setCountry } /></p>
        <Events meetupEvents={meetupEvents}/>
      </div>

    </div>
  );
}

export default App;
