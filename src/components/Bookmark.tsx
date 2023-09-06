import { createSignal, type Component, Show } from "solid-js"
import { BookmarkItem } from "../types/bookmark"
import { IsLocal } from "./Local"

const Bookmark: Component<{ data: BookmarkItem }> = (props) => {
  const bookmark = props.data
  const [showing, setShowing] = createSignal(bookmark.url ? true : false)
  const [url, setUrl] = createSignal(bookmark.url)

  if (props.data.urlLocal) {
    IsLocal().then((result) => {
      if (!result) return
      setShowing(true)
      setUrl(props.data.urlLocal)
    })
  }

  const showIcon = () => {
    if (bookmark.icon.endsWith(".svg")) {
      return <img src={bookmark.icon} class="svg-icon" />
    } else if (
      /\.jpg|\.jpeg|\.png|\.gif|\.apng|\.bmp|\.ico|\.webp"/.test(bookmark.icon)
    ) {
      return <img src={bookmark.icon} class="icon" />
    } else {
      return <i class={bookmark.icon + " fa-2xl icon"}></i>
    }
  }

  return (
    <Show when={showing()}>
      <a href={url()} class="button">
        <div class="icon-container">{showIcon()}</div>
        <h6>{bookmark.title}</h6>
      </a>
    </Show>
  )
}

export default Bookmark
