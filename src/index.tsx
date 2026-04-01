import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import Index from "./components/App"
import Leaflet from "leaflet"
import "leaflet/dist/leaflet.css"

Leaflet.Icon.Default.imagePath = "//cdn.jsdelivr.net/npm/leaflet@1.5.1/dist/images/"

const container = document.getElementById("root")
if (container) {
  const root = createRoot(container)
  root.render(<Index />)
}
