import { createSignal, type Component, Show, createResource } from "solid-js"
import { WeatherApi } from "../types/weather"
import { coordsSettings } from "../utils/settings"

import thunderstorms from "../assets/svg/thunderstorms.svg"
import thunderstormsDay from "../assets/svg/thunderstorms-day.svg"
import thunderstormsNight from "../assets/svg/thunderstorms-night.svg"
import thunderstormsDayRain from "../assets/svg/thunderstorms-day-rain.svg"
import thunderstormsNightRain from "../assets/svg/thunderstorms-night-rain.svg"
import thunderstormsDayExtremeRain from "../assets/svg/thunderstorms-day-extreme-rain.svg"
import thunderstormsNightExtremeRain from "../assets/svg/thunderstorms-night-extreme-rain.svg"

import drizzle from "../assets/svg/drizzle.svg"
import partlyDayDrizzle from "../assets/svg/partly-cloudy-day-drizzle.svg"
import partlyNightDrizzle from "../assets/svg/partly-cloudy-night-drizzle.svg"
import overcastDayDrizzle from "../assets/svg/overcast-day-drizzle.svg"
import overcastNightDrizzle from "../assets/svg/overcast-night-drizzle.svg"
import extremeDayDrizzle from "../assets/svg/extreme-day-drizzle.svg"
import extremeNightDrizzle from "../assets/svg/extreme-night-drizzle.svg"

import rain from "../assets/svg/rain.svg"
import extremeDayRain from "../assets/svg/extreme-day-rain.svg"
import extremeNightRain from "../assets/svg/extreme-night-rain.svg"
import partlyDayRain from "../assets/svg/partly-cloudy-day-rain.svg"
import partlyNightRain from "../assets/svg/partly-cloudy-night-rain.svg"
import overcastDayRain from "../assets/svg/overcast-day-rain.svg"
import overcastNightRain from "../assets/svg/overcast-night-rain.svg"

import sleet from "../assets/svg/sleet.svg"
import hail from "../assets/svg/hail.svg"
import snow from "../assets/svg/snow.svg"
import overcastDaySnow from "../assets/svg/overcast-day-snow.svg"
import overcastNightSnow from "../assets/svg/overcast-night-snow.svg"
import extremeDaySnow from "../assets/svg/extreme-day-snow.svg"
import extremeNightSnow from "../assets/svg/extreme-night-snow.svg"

import mist from "../assets/svg/mist.svg"
import smoke from "../assets/svg/smoke.svg"
import haze from "../assets/svg/haze.svg"
import dust from "../assets/svg/dust.svg"
import hurricane from "../assets/svg/hurricane.svg"
import cloudy from "../assets/svg/cloudy.svg"
import thermometer from "../assets/svg/thermometer.svg"

import fogDay from "../assets/svg/fog-day.svg"
import fogNight from "../assets/svg/fog-night.svg"

import clearDay from "../assets/svg/clear-day.svg"
import clearNight from "../assets/svg/clear-night.svg"

import cloudyDay from "../assets/svg/partly-cloudy-day.svg"
import cloudyNight from "../assets/svg/partly-cloudy-night.svg"

const Weather: Component = () => {
  const [coords, setCoords] = coordsSettings()

  function getWeatherIcon(weatherCode: number): string {
    let hour = new Date().getHours()
    let isDay = hour >= 6 && hour < 18

    if (weatherCode >= 200 && weatherCode < 300) {
      switch (weatherCode) {
        case 200:
        case 210:
        case 211:
        case 201:
        case 202:
          return isDay ? thunderstormsDayRain : thunderstormsNightRain
        case 211:
        case 212:
          return isDay ? thunderstormsDay : thunderstormsNight
        case 221:
        case 231:
        case 232:
          return isDay
            ? thunderstormsDayExtremeRain
            : thunderstormsNightExtremeRain
        default:
          return thunderstorms
      }
    }

    if (weatherCode >= 300 && weatherCode < 400) {
      switch (weatherCode) {
        case 300:
        case 301:
        case 302:
          return isDay ? partlyDayDrizzle : partlyNightDrizzle
        case 310:
        case 311:
          return isDay ? overcastDayDrizzle : overcastNightDrizzle
        case 312:
        case 313:
        case 314:
        case 321:
          return isDay ? extremeDayDrizzle : extremeNightDrizzle
        default:
          return drizzle
      }
    }

    if (weatherCode >= 500 && weatherCode < 600) {
      switch (weatherCode) {
        case 500:
        case 501:
          return isDay ? partlyDayRain : partlyNightRain
        case 502:
        case 503:
        case 504:
          return isDay ? overcastDayRain : overcastNightRain
        case 511:
          return sleet
        case 520:
        case 521:
        case 522:
        case 531:
          return isDay ? extremeDayRain : extremeNightRain
        default:
          return rain
      }
    }

    if (weatherCode >= 600 && weatherCode < 700) {
      switch (weatherCode) {
        case 600:
          return hail
        case 601:
        case 602:
          return isDay ? overcastDaySnow : overcastNightSnow
        case 611:
        case 612:
        case 613:
          return sleet
        case 615:
        case 616:
          return sleet
        case 620:
        case 621:
        case 622:
          return isDay ? extremeDaySnow : extremeNightSnow
        default:
          return snow
      }
    }

    switch (weatherCode) {
      case 701:
        return mist
      case 711:
        return smoke
      case 721:
        return haze
      case 731:
      case 751:
      case 761:
      case 762:
        return dust
      case 741:
        return isDay ? fogDay : fogNight
      case 771:
      case 781:
        return hurricane
      case 800:
        return isDay ? clearDay : clearNight
      case 801:
      case 802:
        return isDay ? cloudyDay : cloudyNight
      case 803:
      case 804:
        return cloudy
      default:
        return thermometer
    }
  }

  const fetchWeather = async (): Promise<WeatherApi> => {
    try {
      const data = await (
        await fetch(
          `/weather?longitude=${coords.longitude}&latitude=${coords.latitude}`
        )
      ).json()
      return data
    } catch {
      return {
        coord: { lon: 105.8085, lat: 21.0427 },
        weather: [
          { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
        ],
        base: "stations",
        main: {
          temp: 304.14,
          feels_like: 311.14,
          temp_min: 304.14,
          temp_max: 304.14,
          pressure: 1009,
          humidity: 74,
        },
        visibility: 10000,
        wind: { speed: 2.06, deg: 300 },
        clouds: { all: 0 },
        dt: 1693967516,
        sys: {
          type: 1,
          id: 9308,
          country: "VN",
          sunrise: 1693953701,
          sunset: 1693998569,
        },
        timezone: 25200,
        id: 1581130,
        name: "Hanoi",
        cod: 200,
      }
    }
  }

  const [weather, { refetch }] = createResource<WeatherApi>(fetchWeather)

  const toCelsius = (temp: number): string => `${Math.floor(temp - 273.15)}°C`
  const toFahrenheit = (temp: number): string =>
    `${Math.floor(((temp - 32) * 5) / 9)}°F`

  const temp = () => toCelsius(weather()?.main?.temp ?? 0)
  const humidity = () => `${Math.floor(weather()?.main?.humidity ?? 0)}%`
  const weatherCode = () => weather()?.weather[0]?.id ?? 0
  const city = () => weather()?.name
  const visibility = () => {
    if (!weather()) return ""
    let visibility = weather()?.visibility ?? 0
    if (visibility > 1000) return `${Math.floor(visibility / 1000)}km`
    return `${visibility}m`
  }

  function formatHour(timestamp: number): string {
    if (timestamp === 0) return ""
    const date = new Date(timestamp * 1000)
    const opts = {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }
    return `${date.getHours().toLocaleString("en-US", opts)}:${date
      .getMinutes()
      .toLocaleString("en-US", opts)}`
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(position.coords)
        refetch()
      })
    }
  }

  return (
    <div
      class="flex flex-row button p-3"
      title="Click to refresh location"
      data-tooltip-target="weather-tooltip"
      data-tooltip-placement="bottom"
      onclick={getLocation}
    >
      <div class="mr-5 my-auto">
        <img src={getWeatherIcon(weatherCode())} alt="logo" width="60" />
      </div>
      <div id="weather-info" class="flex flex-col" style="ml-3 my-auto">
        <div id="temp text-center">{temp()}</div>
        <hr class="my-1" />
        <div id="humidity text-center">{humidity()}</div>
      </div>
      <div
        id="weather-tooltip"
        role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white opacity-bg rounded-lg shadow-sm opacity-0 tooltip "
      >
        <div class="flex flex-col">
          <div class="flex flex-row">
            <div class="p-2 my-auto w-8" title="Location">
              <i class="fa-solid fa-location-dot mx-auto"></i>
            </div>
            <div class="flex flex-col ml-2">
              <div>
                <span class="">Name:</span>
                <span class="font-thin mx-2">{city()}</span>
              </div>
              <div>
                <span class="">Country:</span>
                <span class="font-thin mx-2">{weather()?.sys?.country}</span>
              </div>
            </div>
          </div>
          <hr class="my-1 opacity-50" />
          <div class="flex flex-row">
            <div class="p-2 my-auto w-8" title="Temperature">
              <i class="fa-solid fa-temperature-three-quarters mx-auto"></i>
            </div>
            <div class="flex flex-col ml-2">
              <div>
                <span class="">Temp:</span>
                <span class="font-thin mx-2">{temp()}</span>
              </div>
              <div>
                <span class="">Feel like:</span>
                <span class="font-thin mx-2">
                  {toCelsius(weather()?.main?.feels_like ?? 0)}
                </span>
              </div>
              <div>
                <span class="">Min:</span>
                <span class="font-thin mx-2">
                  {toCelsius(weather()?.main?.temp_min ?? 0)}
                </span>
              </div>
              <div>
                <span class="">Max:</span>
                <span class="font-thin mx-2">
                  {toCelsius(weather()?.main.temp_max ?? 0)}
                </span>
              </div>
              <div>
                <span class="">Humidity:</span>
                <span class="font-thin mx-2">{humidity()}</span>
              </div>
            </div>
          </div>
          <hr class="my-1 opacity-50" />
          <div class="flex flex-row">
            <div class="p-2 my-auto w-8" title="Wind">
              <i class="fa-solid fa-wind mx-auto"></i>
            </div>
            <div class="flex flex-col ml-2">
              <div>
                <span class="">Speed:</span>
                <span class="font-thin mx-2">
                  {weather()?.wind.speed + "m/s"}
                </span>
              </div>
              <div>
                <span class="">Degree:</span>
                <span class="font-thin mx-2">{weather()?.wind.deg}</span>
              </div>
            </div>
          </div>
          <hr class="my-1 opacity-50" />
          <div class="flex flex-row">
            <div class="p-2 my-auto w-8" title="Sky">
              <i class="fa-solid fa-cloud mx-auto"></i>
            </div>
            <div class="flex flex-col ml-2">
              <div>
                <span class="">Sky:</span>
                <span class="font-thin mx-2">{weather()?.weather[0].main}</span>
              </div>
              <div>
                <span class="">Visibility:</span>
                <span class="font-thin mx-2">{visibility()}</span>
              </div>
            </div>
          </div>
          <hr class="my-1 opacity-50" />
          <div class="flex flex-row">
            <div class="p-2 my-auto w-8" title="Sun">
              <i class="fa-solid fa-sun mx-auto"></i>
            </div>
            <div class="flex flex-col ml-2">
              <div>
                <span class="">Sunrise:</span>
                <span class="font-thin mx-2">
                  {formatHour(weather()?.sys.sunrise ?? 0)}
                </span>
              </div>
              <div>
                <span class="">Sunset:</span>
                <span class="font-thin mx-2">
                  {formatHour(weather()?.sys.sunset ?? 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  )
}

export default Weather
