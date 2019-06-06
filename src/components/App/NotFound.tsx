import React from "react"
import classes from "./NotFound.module.css"

const NotFound: React.FC = () => (
  <div className={classes.notFound}>
    <div>
      <p>Sorry, no meetup events found.</p>
      <p>
        If there is not a meetup group in your city but you would like to start one,{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://make.wordpress.org/community/handbook/meetup-organizer/getting-started/interest-form/"
        >
          fill out our meetup interest form
        </a>{" "}
        and we can set up a new group for your city and make you the first organizer.{" "}
      </p>
    </div>
  </div>
)
export default NotFound
