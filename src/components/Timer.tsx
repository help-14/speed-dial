import { type Component, createSignal } from "solid-js"

const Timer: Component = () => {
  const [clock, setClock] = createSignal("")
  const [greeting, setGreeting] = createSignal("")

  function clockTick() {
    setClock(
      new Date().toLocaleTimeString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    )
    setTimeout(clockTick, 2000)
  }
  clockTick()

  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) {
    setGreeting("Chào buổi sáng!")
  } else if (hour >= 12 && hour < 17) {
    setGreeting("Chiều làm việc hiệu quả!")
  } else if (hour >= 17 && hour < 20) {
    setGreeting("Chiều tối vui vẻ!")
  } else {
    setGreeting("Chúc ngủ ngon!")
  }

  return (
    <div class="two-thirds column">
      <h5 id="clock">{clock()}</h5>
      <h1 id="greeting" class="strong">
        {greeting()}
      </h1>
    </div>
  )
}

export default Timer
