import React from 'react';
import './App.css';
const { useState, useEffect } = React;

const fetchEvents = async ({number = 20, country = 'JP'} = {}) => {
  const api = `https://api.wordpress.org/events/1.0/?country=${country}&number=${number}`
  const response = await fetch(api)
  const {events} = await response.json()
  console.log(events)
  return events
}


const App: React.FC = () => {
  const [meetups, setMeetups] = useState<Array<any>>([]);

  useEffect(() => {
    fetchEvents().then(setMeetups)
  }, [meetups]);

  return (
    <div className="App">
      {meetups.map((meetup:any, i:number) => (
        <div key={i}>
          <div><a href={meetup.url}>{meetup.title}</a></div>
          <time>{meetup.date}</time>
          <div><a href={meetup.meetup_url}>{meetup.meetup}</a></div>
        </div>
      ))}
    </div>
  );
}

export default App;
