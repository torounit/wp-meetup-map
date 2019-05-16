import React from 'react';
import './App.css';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

const {useState, useEffect} = React;

const fetchEvents = async ({number = 20, country = 'JP'} = {}) => {
  const api = `https://api.wordpress.org/events/1.0/?country=${country}&number=${number}`
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
              A pretty CSS3 popup. <br/> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </Map>
    )
  }

  return (<div />)
}


const App: React.FC = () => {
  const [meetupEvents, setMeetupEvents] = useState<Array<MeetupEvent>>([]);
  useEffect(() => {
    fetchEvents().then(setMeetupEvents)
  }, [meetupEvents]);
  return (
    <div className="App">
      <EventsMap meetupEvents={meetupEvents}/>
      {meetupEvents.map((meetupEvent: MeetupEvent, i: number) => (
        <div key={i}>
          <div><a href={meetupEvent.url}>{meetupEvent.title}</a></div>
          <time>{meetupEvent.date}</time>
          <div><a href={meetupEvent.meetupEvent_url}>{meetupEvent.meetupEvent}</a></div>
        </div>
      ))}
    </div>
  );
}

export default App;
