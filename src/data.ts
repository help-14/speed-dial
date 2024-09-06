import { WebData } from "./types/data"

export const WebsiteData: WebData = {
  localPingUrl: "10.0.0.1",
  localPingTimeout: 300,
  longitude: 105.808534,
  latitude: 21.042698,
  showSearchBox: false,
  groups: [
    {
      title: "Applications",
      data: [
        {
          title: "Servers",
          data: [
            {
              title: "Router OS",
              icon: "fa-solid fa-ethernet",
              url: "http://10.0.0.1/",
            },
            {
              title: "UniFi",
              icon: "fa-solid fa-u",
              url: "http://192.168.1.1/network",
            },
            {
              title: "iHost",
              icon: "https://help-14.github.io/files/icons/matter.svg",
              url: "http://ihost.local/",
            },
            {
              title: "Zimaboard",
              icon: "fa-solid fa-server",
              url: "http://zima.local:8888",
            }
          ],
        },
        {
          title: "Nas",
          data: [
            {
              title: "jDownloader",
              icon: "fa-solid fa-cloud-arrow-down",
              url: "http://zima.local:5800",
            },
            {
              title: "Torrent",
              icon: "https://help-14.github.io/files/icons/utorrent.svg",
              url: "http://zima.local:8181",
            },
            {
              title: "Jellyfin",
              icon: "https://help-14.github.io/files/icons/jellyfin.svg",
              url: "https://phim.nhan.pt",
              urlLocal: "http://zima.local:8097",
            },
            {
              title: "Maps",
              icon: "fa-solid fa-map",
              url: "https://www.google.com/maps",
            }
          ],
        },
        {
          title: "Service",
          data: [
            {
              title: "Cloudflare",
              icon: "https://help-14.github.io/files/icons/cloudflare.svg",
              url: "https://dash.cloudflare.com",
            },
            {
              title: "Github",
              icon: "fa-brands fa-github-alt",
              url: "https://github.com",
            },
            // {
            //   title: "Music",
            //   icon: "fa-solid fa-music",
            //   url: "https://music.nhan.pt",
            //   urlLocal: "http://10.0.0.242:10006/",
            // },
          ],
        },
        {
          title: "Tools",
          data: [
            {
              title: "Color",
              icon: "fa-solid fa-palette",
              url: "https://htmlcolorcodes.com",
            },
            {
              title: "SVG viewer",
              icon: "fa-solid fa-vector-square",
              url: "https://www.svgviewer.dev",
            },
          ],
        },
      ],
    },
    {
      title: "Bookmarks",
      data: [
        {
          title: "Social Media",
          data: [
            {
              title: "Facebook",
              icon: "fa-brands fa-facebook",
              url: "https://www.facebook.com",
            },
            {
              title: "Reddit",
              icon: "fa-brands fa-reddit",
              url: "https://www.reddit.com",
            },
            {
              title: "Voz",
              icon: "https://help-14.github.io/files/icons/voz.svg",
              url: "https://voz.vn",
            },
            {
              title: "Youtube",
              icon: "fa-brands fa-youtube",
              url: "https://www.youtube.com",
            },
          ],
        },
        {
          title: "Shopping",
          data: [
            {
              title: "Shopee",
              icon: "fa-solid fa-bag-shopping",
              url: "https://shopee.vn",
            },
            {
              title: "Lazada",
              icon: "fa-solid fa-heart",
              url: "https://www.lazada.vn/",
            },
            // {
            //   title: "Nhập hàng",
            //   icon: "fa-solid fa-truck",
            //   url: "http://nhaphang.com/i/",
            // },
            {
              title: "Giang Huy",
              icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IS0tIExpY2Vuc2U6IE1JVC4gTWFkZSBieSBBbnQgRGVzaWduOiBodHRwczovL2dpdGh1Yi5jb20vYW50LWRlc2lnbi9hbnQtZGVzaWduLWljb25zIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiIGZpbGw9IndoaXRlIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIj4KICA8cGF0aCBkPSJNMTY4LjUgMjczLjdhNjguNyA2OC43IDAgMSAwIDEzNy40IDAgNjguNyA2OC43IDAgMSAwLTEzNy40IDB6bTczMCA3OS4ycy0yMy43LTE4NC40LTQyNi45LTcwLjFjMTcuMy0zMCAyNS42LTQ5LjUgMjUuNi00OS41TDM5Ni40IDIwNXMtNDAuNiAxMzIuNi0xMTMgMTk0LjRjMCAwIDcwLjEgNDAuNiA2OS40IDM5LjQgMjAuMS0yMC4xIDM4LjItNDAuNiA1My43LTYwLjQgMTYuMS03IDMxLjUtMTMuNiA0Ni43LTE5LjgtMTguNiAzMy41LTQ4LjcgODMuOC03OC44IDExNS42bDQyLjQgMzdzMjguOC0yNy43IDYwLjQtNjEuMmgzNnY2MS44SDM3Mi45djQ5LjVoMTQwLjN2MTE4LjVjLTEuNyAwLTMuNiAwLTUuNC0uMi0xNS40LS43LTM5LjUtMy4zLTQ5LTE4LjItMTEuNS0xOC4xLTMtNTEuNS0yLjQtNzEuOWgtOTdsLTMuNCAxLjhzLTM1LjUgMTU5LjEgMTAyLjMgMTU1LjVjMTI5LjEgMy42IDIwMy0zNiAyMzguNi02My4xbDE0LjIgNTIuNiA3OS42LTMzLjItNTMuOS0xMzEuOS02NC42IDIwLjEgMTIuMSA0NS4yYy0xNi42IDEyLjQtMzUuNiAyMS43LTU2LjIgMjguNFY1NjEuM2gxMzcuMXYtNDkuNUg2MjguMVY0NTBoMTM3LjZ2LTQ5LjVINTIxLjNjMTcuNi0yMS40IDMxLjUtNDEuMSAzNS01My42bC00Mi41LTExLjZjMTgyLjgtNjUuNSAyODQuNS01NC4yIDI4My42IDUzLjJ2MjgyLjhzMTAuOCA5Ny4xLTEwMC40IDkwLjFsLTYwLjItMTIuOS0xNC4yIDU3LjFTODgyLjUgODgwIDkwMy43IDY4MC4yYzIxLjMtMjAwLTUuMi0zMjcuMy01LjItMzI3LjN6bS03MDcuNCAxOC4zbC00NS40IDY5LjcgODMuNiA1Mi4xczU2IDI4LjUgMjkuNCA4MS45QzIzMy44IDYyNS41IDExMiA3MzYuMyAxMTIgNzM2LjNsMTA5IDY4LjFjNzUuNC0xNjMuNyA3MC41LTE0MiA4OS41LTIwMC43IDE5LjUtNjAuMSAyMy43LTEwNS45LTkuNC0xMzkuMS00Mi40LTQyLjYtNDctNDYuNi0xMTAtOTMuNHoiLz4KPC9zdmc+Cg==",
              url: "https://hethong.gianghuy.com/danh-sach-don-hang?t=3",
            },
          ],
        },
        {
          title: "Games",
          data: [
            {
              title: "Steam",
              icon: "fa-brands fa-steam",
              url: "https://store.steampowered.com",
            },
            {
              title: "Epic Games",
              icon: "https://help-14.github.io/files/icons/epic.svg",
              url: "https://store.epicgames.com",
            },
          ],
        },
      ],
    },
  ],
}
