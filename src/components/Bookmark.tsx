import { createSignal, type Component } from "solid-js"
import { BookmarkItem } from "../types/bookmark"

const Bookmark: Component<{ data: BookmarkItem }> = (props) => {
  const bookmark = props.data
  const [url, setUrl] = createSignal(bookmark.url)

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
    <a href={url()}>
      <div class="icon-container">{showIcon()}</div>
      <h6>{bookmark.title}</h6>
    </a>
  )
}

export default Bookmark
