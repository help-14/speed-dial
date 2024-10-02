import {
  createSignal,
  createEffect,
  type Component,
  Show,
  For,
  createResource,
} from "solid-js"
import { YoutubeItem } from "../types/youtube"
import "./css/Youtube.css"
import { IsDev } from "../utils"

type VideoInfo = {
  title: string
  url: string
  image: string
  channelID: string
}

const Youtube: Component<{ data: YoutubeItem }> = (props) => {
  const youtubeInfo = props.data
  const fetchYtLive = async (): Promise<VideoInfo[]> => {
    let liveArr: VideoInfo[] = []
    for (let channel of youtubeInfo.live) {
      try {
        const data = await (
          await fetch(`/api/youtube/live?url=${channel}`)
        ).json()
        if (data.url) liveArr.push(data)
      } catch (err) {
        if (IsDev()) {
          liveArr.push({
            title: "Lãnh đạo cấp cao CHDCND Triều Tiên kiểm tra quân đội",
            url: "https://www.youtube.com/watch?v=Szi79KJCPpI",
            image: "https://i.ytimg.com/vi/Szi79KJCPpI/mqdefault.jpg",
            channelID: "UC0hg0ahsQN4lH3w4ENPaeXA",
          })
        }
      }
    }
    return liveArr
  }

  const [showing, setShowing] = createSignal(false)
  const [live, { refetch }] = createResource<VideoInfo[]>(fetchYtLive)

  createEffect(() => {
    setShowing((live()?.length ?? 0) > 0)
  })

  return (
    <Show when={showing()}>
      <div class="py-3 pb-1 px-5 mb-2 panel widget">
        <a href="https://https://www.youtube.com">
          <p class="font-bold mb-3">Youtube:</p>
        </a>
        <div
          classList={{
            "mt-3 items-center content-center justify-center gap-4 mb-4": true,
            "flex flex-wrap md:grid md:grid-cols-1": true,
            "xl:grid-cols-2": (live()?.length ?? 0) > 4,
          }}
        >
          <For each={live()}>
            {(video) => (
              <a href={video.url}>
                <div class="button foreground min-w-24 max-w-80 md:opacity-60 relative">
                  <img src={video.image} class="round-corner" />
                  <span class="bg-red-800 text-red-100 text-xs font-medium px-2.5 py-0.5 rounded-l rounded-t absolute right-0 top-0">
                    LIVE
                  </span>
                  <div class="hidden title absolute bottom-0 left-0 right-0 p-2">
                    <p>{video.title}</p>
                  </div>
                </div>
              </a>
            )}
          </For>
        </div>
      </div>
    </Show>
  )
}

export default Youtube
