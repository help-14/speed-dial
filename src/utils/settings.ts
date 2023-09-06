import { WebsiteData } from "../data"
import { Coordinate } from "../types/coords"
import { createObjectStore } from "./localStorage"

export const coordsSettings = () =>
  createObjectStore<Coordinate>("setting.coords", {
    longitude: WebsiteData.longitude,
    latitude: WebsiteData.latitude,
  })
