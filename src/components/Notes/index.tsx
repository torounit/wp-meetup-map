import React, {MouseEvent} from "react"
import classes from "./index.module.css"
const Notes: React.FC<{onClose: (event: MouseEvent<HTMLButtonElement>) => void}> = ({ onClose }) => (
  <div className={classes.container}>
    <button className={classes.close} onClick={onClose}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <title>Close</title>
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </button>
    <div className={classes.body}>
      <p className={classes.info}>Initial code by <a href="https://profiles.wordpress.org/toro_unit/" target="_blank" rel="noreferrer noopener">@Toro_Unit</a>.</p>
      <p>Github Repository <a href="https://github.com/torounit/wp-meetup-map" target="_blank" rel="noreferrer noopener">torounit/wp-meetup-map</a></p>
    </div>

  </div>
)

export default Notes
