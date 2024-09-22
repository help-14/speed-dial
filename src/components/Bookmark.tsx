import { createSignal, type Component, Show } from "solid-js"
import { BookmarkItem } from "../types/bookmark"
import { IsLocal } from "../utils/ping"

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
    if (
      bookmark.icon.endsWith(".svg") ||
      bookmark.icon.startsWith("data:image/svg+xml")
    ) {
      let svgMask = `url(${bookmark.icon}) no-repeat center / contain`
      return (
        <div
          class="align-middle w-8 h-8 foreground"
          style={{ mask: svgMask, "-webkit-mask": svgMask }}
        ></div>
      )
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
      <a
        href={url()}
        class="button p-4 items-center mb-0 rounded-xl leading-loose flex no-underline"
      >
        <div class="mt-0 ml-2 mr-3 w-8 h-8 items-center text-center">
          {showIcon()}
        </div>
        <p class="items-center mb-0 ml-2 align-bottom font-medium">
          {bookmark.title}
        </p>
      </a>
    </Show>
  )
}

export default Bookmark
