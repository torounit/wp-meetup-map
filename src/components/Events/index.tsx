import React from "react"
import classes from './index.module.css'

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
            <a href={meetupEvent.url}>{meetupEvent.title}</a>
          </h1>
          <div className={classes.footer}>
            <time>{meetupEvent.date}</time>
            <a href={meetupEvent.meetup_url} target="_blank">{meetupEvent.meetup}</a>
          </div>
        </article>
      ))}
    </div>
  )
}

export default Events
