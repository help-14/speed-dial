import { createSignal, type Component, Show, createResource } from "solid-js"
import { WeatherApi } from "../types/weather"
import { coordsSettings } from "../utils/settings"

const Weather: Component = () => {
  const [coords, setCoords] = coordsSettings()
  const [show, setShow] = createSignal(false)

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
    } finally {
      setShow(true)
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
      <Show when={show()}>
        <div class="mr-5 my-auto">
          <canvas id="weather-icon" width="50" height="50"></canvas>
        </div>
        <div id="weather-info" class="flex flex-col" style="ml-3 my-auto">
          <div id="temp text-center">{temp()}</div>
          <hr class="my-1" />
          <div id="humidity text-center">{humidity()}</div>
        </div>
        <input id="weatherCode" value={weatherCode()} type="hidden" />
      </Show>
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
