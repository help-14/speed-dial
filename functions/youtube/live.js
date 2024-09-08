const getThumbnailUrl = (videoUrl) => {
  let videoID = videoUrl.substring(videoUrl.lastIndexOf("v=") + 2)
  if (videoID.includes("&")) {
    videoID = videoID.substring(0, videoID.indexOf("&"))
  }
  return `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`
}

const fetchChannelID = async (url) => {
  let response = await fetch(url)
  let text = await response.text()
  let match = text.match(/channel_id=([^"]+)/)
  return match ? match[1] : null
}

const fetchLiveStream = async (channelID) => {
  try {
    let response = await fetch(
      `https://youtube.com/channel/${channelID}/live`
    )
    let text = await response.text()
    let html = document.createElement("html")
    html.innerHTML = text
    let canonicalURLTag = html.querySelector("link[rel=canonical]")
    let canonicalURL = canonicalURLTag?.getAttribute("href")
    let isStreaming = canonicalURL?.includes("/watch?v=")
    if (isStreaming === true) {
      return canonicalURL
    }
  } catch {
    console.error
  }
  return null
}

export async function onRequest({ request, env }) {
  const { searchParams } = new URL(request.url)
  let url = searchParams.get('url')
  let response = {}

  if (!url) return new Response("Bad request")
  const storageKey = `yt-live-${url}`

  const rawData = await env.API.get(storageKey)
  const liveInfo = JSON.parse(rawData)
  const currentTime = new Date().getTime() - new Date('2023-01-01').getTime()


  const expireAt = liveInfo?.expireAt || 0
  if (currentTime > expireAt) {
    let channelID = liveInfo?.data?.channelID
    if (!channelID) channelID = await fetchChannelID(url)
    let liveUrl = await fetchLiveStream(channelID)
    let thumb = getThumbnailUrl(liveUrl)

    response = {
      title: "",
      url: liveUrl,
      image: thumb,
      channelID: channelID,
    }
    await env.API.put(storageKey, JSON.stringify({
      expireAt: currentTime + 10 * 60000,
      data: response
    }))
  } else if (liveInfo?.data) {
    response = liveInfo.data
  }

  return new Response(JSON.stringify(response), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  })
}