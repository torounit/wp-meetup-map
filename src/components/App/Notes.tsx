import React, {MouseEvent} from "react"
import classes from "./Notes.module.css"

const {location} = window
const Notes: React.FC<{ onClose: (event: MouseEvent<HTMLButtonElement>) => void }> = ({onClose}) => (
  <div className={classes.container}>
    <button className={classes.close} onClick={onClose}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <title>Close</title>
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </button>
    <section className={classes.body}>
      <h4>Support Parameter:</h4>
      <table>
        <tbody>
          <tr>
            <th>country</th>
            <td>Country Code (ISO 3166-1 alpha-2).</td>
          </tr>
        </tbody>
      </table>
      <h5>Example:</h5>
      <p>{location.origin}?country=jp</p>
      <h4>Contributor:</h4>
      <p className={classes.info}>Initial code by <a href="https://profiles.wordpress.org/toro_unit/" target="_blank"
                                                     rel="noreferrer noopener">@Toro_Unit</a>.</p>
      <p>Github Repository <a href="https://github.com/torounit/wp-meetup-map" target="_blank"
                              rel="noreferrer noopener">torounit/wp-meetup-map</a></p>
    </section>

  </div>
)

export default Notes
