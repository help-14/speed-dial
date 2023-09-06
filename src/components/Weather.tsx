import { createSignal, type Component, Show, createResource } from "solid-js"
import { WebsiteData } from "../data"
import { WeatherApi } from "../types/weather"

const Weather: Component = () => {
  const fetchWeather = async () =>
    (
      await fetch(
        `/weather?longitude=${WebsiteData.longitude}&latitude=${WebsiteData.latitude}`
      )
    ).json()

  const [weather] = createResource<WeatherApi>(fetchWeather, {
    initialValue: {
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
    },
  })

  const toCelsius = (temp: number): string => `${Math.floor(temp - 273.15)}°C`
  const toFahrenheit = (temp: number): string =>
    `${Math.floor(((temp - 32) * 5) / 9)}°F`

  const temp = () => toCelsius(weather().main.temp)
  const humidity = () => `${Math.floor(weather().main.humidity)}%`
  const weatherCode = () => weather().weather[0].id
  const city = () => weather().name
  const visibility = () => {
    if (weather().visibility > 1000)
      return `${Math.floor(weather().visibility / 1000)}km`
    return `${weather().visibility}m`
  }

  return (
    <div
      class="flex flex-row button p-5"
      title="Click to refresh location"
      data-tooltip-target="weather-tooltip"
      data-tooltip-placement="bottom"
    >
      <div class="mr-5 my-auto">
        <canvas id="weather-icon" width="50" height="50"></canvas>
      </div>
      <div id="weather-info" class="flex flex-col" style="ml-3 my-auto">
        <div id="temp text-center">{temp()}</div>
        <hr class="my-1" />
        <div id="humidity text-center">{humidity()}</div>
      </div>
      <input id="weatherCode" value={weatherCode()} type="hidden" />
      <div
        id="weather-tooltip"
        role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white opacity-bg rounded-lg shadow-sm opacity-0 tooltip "
      >
        <div class="flex flex-col">
          <div class="flex flex-row">
            <div class="p-2 my-auto" title="Location">
              <i class="fa-solid fa-location-dot"></i>
            </div>
            <div class="flex flex-col ml-2">
              <div>
                <span class="">Name:</span>
                <span class="font-thin mx-2">{city()}</span>
              </div>
              <div>
                <span class="">Country:</span>
                <span class="font-thin mx-2">{weather().sys.country}</span>
              </div>
            </div>
          </div>
          <hr class="my-1 opacity-50" />
          <div class="flex flex-row">
            <div class="p-2 my-auto" title="Wind">
              <i class="fa-solid fa-temperature-three-quarters"></i>
            </div>
            <div class="flex flex-col ml-2">
              <div>
                <span class="">Temperature:</span>
                <span class="font-thin mx-2">{temp()}</span>
              </div>
              <div>
                <span class="">Feel like:</span>
                <span class="font-thin mx-2">
                  {toCelsius(weather().main.feels_like)}
                </span>
              </div>
              <div>
                <span class="">Min:</span>
                <span class="font-thin mx-2">
                  {toCelsius(weather().main.temp_min)}
                </span>
              </div>
              <div>
                <span class="">Max:</span>
                <span class="font-thin mx-2">
                  {toCelsius(weather().main.temp_max)}
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
            <div class="p-2" title="Wind">
              <i class="fa-solid fa-wind"></i>
            </div>
            <div class="flex flex-col ml-2">
              <div>
                <span class="">Speed:</span>
                <span class="font-thin mx-2">
                  {weather().wind.speed + "m/s"}
                </span>
              </div>
              <div>
                <span class="">Degree:</span>
                <span class="font-thin mx-2">{weather().wind.deg}</span>
              </div>
            </div>
          </div>
          <hr class="my-1 opacity-50" />
          <div class="flex flex-row">
            <div class="p-2 my-auto" title="Wind">
              <i class="fa-solid fa-cloud mx-auto"></i>
            </div>
            <div class="flex flex-col ml-2">
              <div>
                <span class="">Sky:</span>
                <span class="font-thin mx-2">{weather().weather[0].main}</span>
              </div>
              <div>
                <span class="">Visibility:</span>
                <span class="font-thin mx-2">{visibility()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
