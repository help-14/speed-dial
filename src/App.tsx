import { Show, type Component, Suspense } from "solid-js"
import { WebsiteData } from "./data"
import Groups from "./components/Groups"
import Timer from "./components/Timer"
import Weather from "./components/Weather"
import SearchBox from "./components/SearchBox"
import Youtube from "./components/Youtube"
import Honeygain from "./components/Honeygain"
import Calendar from "./components/Calendar"
import "flowbite"

const App: Component = () => {
  return (
    <div class="flex md:flex-row flex-col">
      <div id="left" class="flex-1"></div>
      <div id="middle" class="flex-none">
        <div id="main" class="container px-5 flex flex-col max-w-5xl">
          <Show when={WebsiteData.showSearchBox}>
            <div class="mt-10">
              <SearchBox />
            </div>
          </Show>
          <div id="header" class="flex flex-row pt-10 pb-2">
            <div class="grow">
              <Timer />
            </div>
            <div
              id="header-right"
              class="my-auto pl-5 pr-5 content-center float-right z-50"
            >
              <Weather />
            </div>
          </div>
          <div class="">
            <Groups data={WebsiteData.groups} />
          </div>
          <div id="footer" class="row mb-10"></div>
        </div>
      </div>
      <div id="right" class="flex-1 flex items-start justify-end">
        <div class="flex flex-col pt-10 p-3">
          <Honeygain />
          <Youtube data={WebsiteData.youtube} />
        </div>
      </div>
    </div>
  )
}

export default App
