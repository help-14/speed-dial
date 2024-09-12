export async function onRequest({ request, env }) {
  const reqOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${env.HONEYGAIN_AUTH}`
    }
  }
  let res = await fetch("https://dashboard.honeygain.com/api/v1/users/balances", reqOptions)
  let data = await res.json()

  const resOptions = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  }
  return new Response(data, resOptions)
}