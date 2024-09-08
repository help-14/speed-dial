import { GroupItem } from "./group"
import { YoutubeItem } from "./youtube"

export type WebData = {
  localPingUrl: string
  localPingTimeout: number
  longitude: number
  latitude: number
  showSearchBox: boolean
  groups: GroupItem[]
  youtube: YoutubeItem
}
