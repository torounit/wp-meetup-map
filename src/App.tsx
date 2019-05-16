import React from 'react';
import './App.css';
const { useState, useEffect } = React;

const fetchEvents = async ({number = 20, country = 'JP'} = {}) => {
  console.log('fetch');
  const api = `https://api.wordpress.org/events/1.0/?country=${country}&number=${number}`
  const response = await fetch(api)
  const {events} = await response.json()
  return events
}


const App: React.FC = () => {
  const [meetups, setMeetups] = useState<Array<any>>([]);

  useEffect(() => {
    fetchEvents().then( (result) => {
      console.log(result)
      setMeetups(result)
    })
  });

  return (
    <div className="App">
      {meetups.map((meetup:any, i:number) => (
        <div key={i}>
          <div> {meetup.title}</div>
          <time>{meetup.date}</time>
          <div><a href={meetup.meetup_url}>{meetup.meetup}</a></div>
        </div>
      ))}
    </div>
  );
}

export default App;
