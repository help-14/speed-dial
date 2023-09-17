import { For, type Component } from "solid-js"
import { GroupItem } from "../types/group"
import Bookmark from "./Bookmark"
import { BookmarkItem } from "../types/bookmark"

const Groups: Component<{ data: GroupItem[] }> = (props) => {
  return (
    <div id="content" class="flex flex-col">
      <For each={props.data}>
        {(group) => (
          <div class="flex flex-col">
            <span class="font-bold text-3xl mt-10 mb-5">{group.title}</span>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
              <For each={group.data}>
                {(col) => (
                  <div class="group-items flex flex-col gap-2">
                    <span class="accent">{col.title}</span>
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
