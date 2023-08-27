export async function onRequest({ request, env }) {
    const { searchParams } = new URL(request.url)
    let longitude = searchParams.get('longitude')
    let latitude = searchParams.get('latitude')
    let response = { longitude, latitude }

    if (!longitude || !latitude) return new Response("Unknown location")
    const storageKey = `weather-${longitude}-${latitude}`

    const rawData = await env.API.get(storageKey);
    const weatherInfo = JSON.parse(rawData)
    const currentTime = new Date().getTime()

    if (weatherInfo?.data) {
        response = weatherInfo.data
        if (currentTime > weatherInfo.expireAt) {
            const weatherResponse = {}
            if (weatherResponse.ok) {
                await env.API.put(storageKey, JSON.stringify({
                    expireAt: currentTime + 10 * 60 * 1000,
                    data: await weatherResponse.json()
                }))
                response = weatherResponse
            }
        }
    }

    return new Response(JSON.stringify(response), {
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
    })
}