import { type Component } from "solid-js"
import { createSignal } from "solid-js"

const Weather: Component = () => {
  //   const [clock, setClock] = createSignal("")
  //   async function loadWeather() {
  //     // Get info from api
  //     const weather = await (await fetch("./weather")).json()
  //     if (!weather) return
  //     // Parse weather id
  //     let icon = null
  //     let hour = new Date().getHours()
  //     let isDay = hour >= 6 && hour < 18
  //     const weatherCode = weather.weather[0].id
  //     if (
  //       [200, 201, 202, 210, 211, 212, 221, 230, 231, 232].includes(weatherCode)
  //     ) {
  //       icon = Skycons.RAIN //Thunderstorm
  //     } else if (
  //       [300, 301, 302, 310, 311, 312, 313, 314, 321].includes(weatherCode)
  //     ) {
  //       icon = Skycons.RAIN //Drizzle
  //     } else if (
  //       [500, 501, 502, 503, 504, 511, 520, 521, 522, 531].includes(weatherCode)
  //     ) {
  //       icon = Skycons.RAIN
  //     } else if (
  //       [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622].includes(
  //         weatherCode
  //       )
  //     ) {
  //       icon = Skycons.SNOW
  //     } else if (weatherCode === 800) {
  //       icon = isDay ? Skycons.CLEAR_DAY : Skycons.CLEAR_NIGHT
  //     } else if ([801, 802, 803, 804].includes(weatherCode)) {
  //       if (weatherCode >= 803) {
  //         icon = Skycons.CLOUDY
  //       } else {
  //         icon = isDay ? Skycons.PARTLY_CLOUDY_DAY : Skycons.PARTLY_CLOUDY_NIGHT
  //       }
  //     } else if ([762, 761, 751, 731, 721].includes(weatherCode)) {
  //       icon = Skycons.SLEET
  //     } else if ([771, 781].includes(weatherCode)) {
  //       icon = Skycons.WIND
  //     } else if ([701, 711, 741].includes(weatherCode)) {
  //       icon = Skycons.FOG
  //     } else {
  //       return
  //     }
  //     // Set weather icon to canvas
  //     var skycons = new Skycons({ color: window.cssRoot["--accentColor"] })
  //     skycons.add("weather-icon", icon)
  //     skycons.play()
  //     // Set weather info
  //     if (window.config.useMetric) {
  //       document.querySelector("#temp").innerText =
  //         Math.floor(weather.main.temp - 273.15) + "°C"
  //     } else {
  //       document.querySelector("#temp").innerText =
  //         Math.floor(((weather.main.temp - 32) * 5) / 9) + "°F"
  //     }
  //     document.querySelector("#humidity").innerText =
  //       Math.floor(weather.main.humidity) + "%"
  //     document.querySelector("#weather-info").style.visibility = "visible"
  //   }

  //   ;(function weatherTick() {
  //     loadWeather()
  //     setTimeout(weatherTick, 3600000)
  //   })()

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
    </div>
  )
}

export default Weather
