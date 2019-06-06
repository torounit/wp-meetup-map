import React from "react"
import classes from "./index.module.css"
import DateTime from "../DateTime";

export type Location = {
  location: string
  country: string
  latitude: number
  longitude: number
}

export type MeetupEvent = {
  date: string
  location: Location
  meetup: string
  meetup_url: string
  title: string
  type: string
  url: string
}

const Events: React.FC<{ meetupEvents: MeetupEvent[] }> = ({ meetupEvents }) => {
  return (
    <div className={classes.events}>
      {meetupEvents.map((meetupEvent: MeetupEvent, i: number) => (
        <article className={classes.event} key={i}>
          <h1 className={classes.title}>
            <a href={meetupEvent.url} rel="noopener noreferrer" target="_blank">{meetupEvent.title}</a>
          </h1>
          <div className={classes.footer}>
            <DateTime datetime={meetupEvent.date} format={ 'YYYY/MM/DD HH:mm'} />
            <a href={meetupEvent.meetup_url} rel="noopener noreferrer" target="_blank">
              {meetupEvent.meetup}
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}

export default Events
