import { Show, type Component } from "solid-js"
import { WebsiteData } from "./data"
import Groups from "./components/Groups"
import Timer from "./components/Timer"
import Weather from "./components/Weather"
import SearchBox from "./components/SearchBox"
import "flowbite"

const App: Component = () => {
  return (
    <div id="main" class="container mx-auto flex flex-col max-w-5xl">
      <div class="mt-10">
        <Show when={WebsiteData.showSearchBox}>
          <SearchBox />
        </Show>
      </div>
      <div id="header" class="flex flex-row mt-10">
        <div class="grow">
          <Timer />
        </div>
        <div id="header-right" class="my-auto p-5 pr-10">
          <Weather />
        </div>
      </div>
      <div class="">
        <Groups data={WebsiteData.groups} />
      </div>
      <div id="footer" class="row"></div>
    </div>
  )
}

export default App
