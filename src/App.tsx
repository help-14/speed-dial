import { Show, type Component } from "solid-js"
import { WebsiteData } from "./data"
import Groups from "./components/Groups"
import Timer from "./components/Timer"
import Weather from "./components/Weather"
import SearchBox from "./components/SearchBox"

const App: Component = () => {
  return (
    <div class="container">
      <div class="row" style={{ "margin-top": "5%" }}>
        <Show when={WebsiteData.showSearchBox}>
          <SearchBox />
        </Show>
      </div>
      <div id="header" class="row">
        <Timer />
        <div id="header-right" style="padding-top: 2em;">
          <Weather />
        </div>
      </div>
      <div class="row">
        <Groups data={WebsiteData.groups} />
      </div>
      <div id="footer" class="row"></div>
    </div>
  )
}

export default App
