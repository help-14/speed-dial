import { GroupItem } from "./group"

export type WebData = {
  localPingUrl: string
  localPingTimeout: number
  longitude: number
  latitude: number
  groups: GroupItem[]
}
