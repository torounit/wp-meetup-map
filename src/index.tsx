import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import Index from "./components/App"
import Leaflet from "leaflet"
import "leaflet/dist/leaflet.css"

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

// Configure Leaflet to use locally bundled marker icons instead of a CDN path
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (Leaflet.Icon.Default.prototype as any)._getIconUrl
Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const container = document.getElementById("root")
if (container) {
  const root = createRoot(container)
  root.render(<Index />)
}
