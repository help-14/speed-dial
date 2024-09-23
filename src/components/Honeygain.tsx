import {
  createSignal,
  createEffect,
  type Component,
  Show,
  For,
  createResource,
} from "solid-js"
import "./css/Honeygain.css"

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

  const formatAmount = (amount: number): string => {
    if (amount >= 100) {
      let thousand = Math.floor(amount / 100)
      let cents = amount - thousand * 100
      return `${thousand}.${cents}`
    } else {
      return `0.${amount}`
    }
  }

  const [showing, setShowing] = createSignal(false)
  const [info, { refetch }] = createResource<HoneygainInfo>(fetchHoneygain)
  const [income, setIncome] = createSignal<string>("0")
  const [totalIncome, setTotalIncome] = createSignal<string>("0")

  createEffect(() => {
    if (info() == null) {
      setShowing(false)
      return
    }
    setIncome(formatAmount(info()?.data.realtime.usd_cents ?? 0))
    setTotalIncome(formatAmount(info()?.data.payout.usd_cents ?? 0))
    setShowing(true)
  })

  const hexagonsMask = `url(https://help-14.github.io/files/icons/hexagons.svg) no-repeat center / contain`
  const dollarMask = `url(https://help-14.github.io/files/icons/dollar.svg) no-repeat center / contain`

  return (
    <Show when={showing()}>
      <div class="py-3 px-5 mb-2 panel widget">
        <a href="https://dashboard.honeygain.com">
          <p class="font-bold mb-3">Honeygain:</p>
        </a>
        <table class="border-0">
          <tbody>
            <tr>
              <td>
                <p>Today:</p>
              </td>
              <td>
                <div class="my-1 flex flex-row items-center">
                  <div
                    class="small-icon mx-3"
                    style={{ mask: hexagonsMask, "-webkit-mask": hexagonsMask }}
                  ></div>
                  <span>{Math.floor(info()?.data.realtime.credits ?? 0)}</span>
                </div>
              </td>
              <td>
                <div class="my-1 flex flex-row items-center">
                  <div
                    class="small-icon mx-3"
                    style={{ mask: dollarMask, "-webkit-mask": dollarMask }}
                  ></div>
                  <span>{income()}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p>Payout:</p>
              </td>
              <td>
                <div class="my-1 flex flex-row items-center">
                  <div
                    class="small-icon mx-3"
                    style={{ mask: hexagonsMask, "-webkit-mask": hexagonsMask }}
                  ></div>
                  <span>{Math.floor(info()?.data.payout.credits ?? 0)}</span>
                </div>
              </td>
              <td>
                <div class="my-1 flex flex-row items-center">
                  <div
                    class="small-icon mx-3"
                    style={{ mask: dollarMask, "-webkit-mask": dollarMask }}
                  ></div>
                  <span>{totalIncome()}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Show>
  )
}

export default Honeygain
