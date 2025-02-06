export async function onRequest({ request, env }) {
    const { searchParams } = new URL(request.url)
    let longitude = searchParams.get('longitude')
    let latitude = searchParams.get('latitude')
    let response = { longitude, latitude }

    if (!longitude || !latitude) return new Response("Unknown location")
    const storageKey = `weather-${longitude}-${latitude}`

    const rawData = await env.API.get(storageKey)
    const weatherInfo = JSON.parse(rawData)
    const currentTime = new Date().getTime() - new Date('2023-01-01').getTime()

    const expireAt = weatherInfo?.expireAt || 0
    if (currentTime > expireAt) {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&limit=1&appid=${env.WEATHER_API}`)
        if (weatherResponse.ok) {
            response = await weatherResponse.json()
            await env.API.put(storageKey, JSON.stringify({
                expireAt: currentTime + 10 * 60000,
                data: response
            }))
        }
    } else if (weatherInfo?.data) {
        response = weatherInfo.data
    }

    return new Response(JSON.stringify(response), {
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
    })
}