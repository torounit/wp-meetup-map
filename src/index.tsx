import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Index from "./components/App"
import * as serviceWorker from "./serviceWorker"
import Leaflet from "leaflet"
import "leaflet/dist/leaflet.css"
Leaflet.Icon.Default.imagePath = "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/images/"

ReactDOM.render(<Index />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
