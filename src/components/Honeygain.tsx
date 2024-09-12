import {
  createSignal,
  createEffect,
  type Component,
  Show,
  For,
  createResource,
} from "solid-js"
import hexagons from "../assets/svg/hexagons.svg"
import dollar from "../assets/svg/dollar.svg"

type HoneygainInfo = {
  meta: string | null
  data: {
    realtime: {
      credits: number
      usd_cents: number
    }
    payout: {
      credits: number
      usd_cents: number
    }
    min_payout: {
      credits: number
      usd_cents: number
    }
  }
}

const Honeygain: Component = () => {
  const fetchHoneygain = async (): Promise<HoneygainInfo> => {
    try {
      return await (await fetch(`/api/honeygain`)).json()
    } catch {
      return {
        meta: null,
        data: {
          realtime: {
            credits: 232.1,
            usd_cents: 2300,
          },
          payout: {
            credits: 997.2,
            usd_cents: 100,
          },
          min_payout: {
            credits: 20000.0,
            usd_cents: 2000,
          },
        },
      }
    }
  }

  const [showing, setShowing] = createSignal(false)
  const [info, { refetch }] = createResource<HoneygainInfo>(fetchHoneygain)
  const [income, setIncome] = createSignal<string>("0")

  createEffect(() => {
    if (info() != null) {
      setShowing(true)

      let amount = info()?.data.realtime.usd_cents ?? 0
      if (amount >= 1000) {
        let thousand = Math.floor(amount / 1000)
        let cents = amount - thousand * 1000
        setIncome(`${thousand}.${cents}`)
      } else {
        setIncome(`0.${amount}`)
      }
    } else {
      setShowing(false)
    }
  })

  const hexagonsMask = `url(${hexagons}) no-repeat center / contain`
  const dollarMask = `url(${dollar}) no-repeat center / contain`

  return (
    <Show when={showing()}>
      <div class="py-3 px-5 mb-2 panel widget">
        <a href="https://dashboard.honeygain.com">
          <p class="font-bold">Honeygain:</p>
        </a>
        <div class="my-1 flex flex-row items-center">
          <div
            class="svg-icon small-icon mx-3"
            style={{ mask: hexagonsMask, "-webkit-mask": hexagonsMask }}
          ></div>
          <span>{info()?.data.realtime.credits}</span>
        </div>
        <div class="my-1 flex flex-row items-center">
          <div
            class="svg-icon small-icon mx-3"
            style={{ mask: dollarMask, "-webkit-mask": dollarMask }}
          ></div>
          <span>{income()}</span>
        </div>
      </div>
    </Show>
  )
}

export default Honeygain
