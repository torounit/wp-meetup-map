import React, { Fragment } from "react"
import { MeetupEvent } from "../Events"
import { uniq, head } from "lodash"
import { Map, MapProps, Marker, Popup, TileLayer } from "react-leaflet"
import classes from "./index.module.css"

type LatLng = [number, number]

const getBounds = (meetupEvents: MeetupEvent[]): LatLng[] => {
  return uniq<LatLng>(
    meetupEvents.map((meetup: MeetupEvent) => {
      const { latitude, longitude } = meetup.location
      return [latitude, longitude]
    })
  )
}

const EventsMap: React.FC<{ meetupEvents: MeetupEvent[] }> = ({ meetupEvents }) => {
  if (meetupEvents.length > 0) {
    const props: Partial<MapProps> =
      getBounds(meetupEvents).length < 2
        ? {
            center: head<LatLng>(getBounds(meetupEvents)),
            zoom: 13,
          }
        : {
            bounds: getBounds(meetupEvents),
          }

    return (
      <Map {...props}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {meetupEvents.map((meetupEvent: MeetupEvent, i: number) => (
          <Marker key={i} position={[meetupEvent.location.latitude, meetupEvent.location.longitude]}>
            <Popup>
              <div className={classes.popup}>
                <h2 className={classes.popupTitle}>
                  <a href={meetupEvent.url}>{meetupEvent.title}</a>
                </h2>
                <p>
                  <time>{meetupEvent.date}</time>
                </p>
                {meetupEvent.meetup_url && meetupEvent.meetup ? (
                  <p>
                    <a href={meetupEvent.meetup_url} rel="noopener noreferrer" target="_blank">
                      {meetupEvent.meetup}
                    </a>
                  </p>
                ) : null}
              </div>
            </Popup>
          </Marker>
        ))}
      </Map>
    )
  }
  return <Fragment />
}
export default EventsMap
