import React from "react";
import {MeetupEvent} from "../Events";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";

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
export default EventsMap
