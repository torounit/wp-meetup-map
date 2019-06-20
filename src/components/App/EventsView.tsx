import classes from "./EventsView.module.css"
import React from "react";
import EventsMap from "../EventsMap";
import NotFound from "./NotFound";
import Events, {MeetupEvent} from "../Events";

const EventsView: React.FC<{meetupEvents: MeetupEvent[]}> = ({meetupEvents}) => (
  <div className={classes.container}>
    <div className={classes.map}>
      {meetupEvents.length > 0 ?
        <EventsMap meetupEvents={meetupEvents}/> :
        <NotFound/>
      }
    </div>
    <div className={classes.events}>
      <Events meetupEvents={meetupEvents}/>
    </div>
  </div>
)

export default EventsView
