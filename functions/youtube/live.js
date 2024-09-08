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
    text = text.substring(text.indexOf('rel="canonical"'))

    const uStart = text.indexOf('href="') + 6
    const uEnd = text.indexOf('>') - 1
    let canonicalURL = text.substring(uStart, uEnd - uStart)

    const tStart = text.indexOf('<title>') + 7
    const tEnd = text.indexOf('</title>')
    let title = text.substring(tStart, tEnd - tStart)
    if (title.includes("-")) {
      title = title.substring(0, title.lastIndexOf("-"))
    }
    title = title.trim()

    let isStreaming = canonicalURL?.includes("/watch?v=")
    if (isStreaming === true) {
      return {
        title: title,
        url: canonicalURL,
      }
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
    let liveData = await fetchLiveStream(channelID)
    let thumb = getThumbnailUrl(liveUrl)

    response = {
      title: liveData.title,
      url: liveData.url,
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