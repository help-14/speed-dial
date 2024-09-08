import {
  createSignal,
  createEffect,
  type Component,
  Show,
  For,
  onMount,
} from "solid-js"
import { YoutubeItem } from "../types/youtube"

type VideoInfo = {
  title: string
  url: string
  image: string
}

const Youtube: Component<{ data: YoutubeItem }> = (props) => {
  const [showing, setShowing] = createSignal(false)
  const [live, setLive] = createSignal<VideoInfo[]>([])
  const youtubeInfo = props.data

  createEffect(() => {
    setShowing(live().length > 0)
  })

  return (
    <Show when={showing()}>
      <div>
        <For each={live()}>
          {(video) => (
            <div>
              <a href={video.url} class="button">
                <img src={video.image} />
              </a>
            </div>
          )}
        </For>
      </div>
    </Show>
  )
}

export default Youtube
