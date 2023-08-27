import { For, type Component } from "solid-js"
import { GroupItem } from "../types/group"
import Bookmark from "./Bookmark"
import { BookmarkItem } from "../types/bookmark"

const Groups: Component<{ data: GroupItem[] }> = (props) => {
  return (
    <div id="content" class="column twelve">
      <For each={props.data}>
        {(group) => (
          <div>
            <div class="row group-title">
              <h4 class="strong">{group.title}</h4>
            </div>
            <div class="row">
              <For each={group.data}>
                {(col) => (
                  <div class="three columns group-items">
                    <h6 class="accent">{col.title}</h6>
                    <For each={(col as GroupItem).data}>
                      {(bm) => <Bookmark data={bm as BookmarkItem} />}
                    </For>
                  </div>
                )}
              </For>
            </div>
          </div>
        )}
      </For>
    </div>
  )
}

export default Groups
