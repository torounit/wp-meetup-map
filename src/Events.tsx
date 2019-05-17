import React from "react"

export type Location = {
  location: string
  country: string
  latitude: number
  longitude: number
}

export type MeetupEvent = {
  date: string
  location: Location
  meetupEvent: string
  meetupEvent_url: string
  title: string
  type: string
  url: string
}

const Events: React.FC<{ meetupEvents: MeetupEvent[] }> = ({ meetupEvents }) => {
  return (
    <div>
      {meetupEvents.map((meetupEvent: MeetupEvent, i: number) => (
        <article className="event" key={i}>
          <div>
            <a href={meetupEvent.url}>{meetupEvent.title}</a>
          </div>
          <time>{meetupEvent.date}</time>
          <div>
            <a href={meetupEvent.meetupEvent_url}>{meetupEvent.meetupEvent}</a>
          </div>
        </article>
      ))}
    </div>
  )
}

export default Events
