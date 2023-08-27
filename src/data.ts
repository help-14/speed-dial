import { WebData } from "./types/data"

export const WebsiteData: WebData = {
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
              title: "True NAS",
              icon: "fa-solid fa-server",
              url: "http://10.0.0.242/",
            },
            {
              title: "Cloudflare",
              icon: "https://help-14.github.io/files/icons/cloudflare.svg",
              url: "https://dash.cloudflare.com",
            },
          ],
        },
        {
          title: "Nas",
          data: [
            {
              title: "Kerberos",
              icon: "fa-solid fa-video",
              url: "http://10.0.0.242:10004",
            },
            {
              title: "jDownloader",
              icon: "fa-solid fa-cloud-arrow-down",
              url: "http://10.0.0.242:10003/",
            },
          ],
        },
        {
          title: "Media",
          data: [
            {
              title: "Music",
              icon: "fa-solid fa-music",
              url: "https://music.nhan.pt",
              urlLocal: "http://10.0.0.242:10006/",
            },
          ],
        },
        {
          title: "Tools",
          data: [
            {
              title: "SVG viewer",
              icon: "fa-solid fa-vector-square",
              url: "https://www.svgviewer.dev/",
            },
            {
              title: "Snibox",
              icon: "fa-regular fa-note-sticky",
              url: "https://snibox.nhan.pt/",
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
            {
              title: "Nhập hàng",
              icon: "fa-solid fa-truck",
              url: "http://nhaphang.com/i/",
            },
          ],
        },
        {
          title: "Tools",
          data: [
            {
              title: "Maps",
              icon: "fa-solid fa-map",
              url: "https://www.google.com/maps",
            },
            {
              title: "FireAnt",
              icon: "fa-solid fa-arrow-trend-up",
              url: "https://fireant.vn/dashboard",
            },
          ],
        },
      ],
    },
  ],
}
