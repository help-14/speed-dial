export async function onRequest({ request, env }) {
    const { searchParams } = new URL(request.url)
    let longitude = searchParams.get('longitude')
    let latitude = searchParams.get('latitude')

    if (!longitude || !latitude) return new Response({})
    const storageKey = `weather-${longitude}-${latitude}`

    const rawData = await env.API.get(storageKey);
    const weatherInfo = JSON.parse(rawData)
    const currentTime = new Date().getTime()

    if (!weatherInfo || currentTime > weatherInfo.expireAt) {
        const weatherResponse = {}
        if (weatherResponse.ok) {
            await env.API.put(storageKey, JSON.stringify({
                expireAt: currentTime + 10 * 60 * 1000,
                data: await weatherResponse.json()
            }))
            return new Response(weatherResponse)
        }
    }
    return new Response(weatherInfo.data)
}