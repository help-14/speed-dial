import { type Component } from "solid-js"
import { WebsiteData } from "../data"

const Weather: Component = () => {
  return (
    <div class="row">
      <div class="one-half column">
        <canvas id="weather-icon" width="50" height="50"></canvas>
      </div>
      <div
        id="weather-info"
        class="one-half column hidden"
        style="padding-left: 15px;"
      >
        <div id="temp" class="row strong"></div>
        <hr style="margin: 0px;" />
        <div id="humidity" class="row strong"></div>
      </div>
      <input
        id="longitude"
        value={WebsiteData.longitude}
        style="display: none"
      />
      <input id="latitude" value={WebsiteData.latitude} style="display: none" />
    </div>
  )
}

export default Weather
