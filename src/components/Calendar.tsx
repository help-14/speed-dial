import {
  createSignal,
  createEffect,
  type Component,
  Show,
  For,
  createResource,
  onMount,
} from "solid-js"
import "./css/Calendar.css"

const Calendar: Component = () => {
  onMount(() => {
    const daysTag = document.querySelector(".days"),
      currentDate = document.querySelector(".current-date"),
      prevNextIcon = document.querySelectorAll(".icons span")
    // getting new date, current year and month
    let date = new Date(),
      currYear = date.getFullYear(),
      currMonth = date.getMonth()
    // storing full name of all months in array
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const renderCalendar = () => {
      let firstDayofMonth = (new Date(currYear, currMonth, 1).getDay() + 6) % 7
      let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate()
      let lastDayofMonth = new Date(
          currYear,
          currMonth,
          lastDateofMonth
        ).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate() // getting last date of previous month
      let liTag = ""
      for (let i = firstDayofMonth; i > 0; i--) {
        // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`
      }
      for (let i = 1; i <= lastDateofMonth; i++) {
        // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday =
          i === date.getDate() &&
          currMonth === new Date().getMonth() &&
          currYear === new Date().getFullYear()
            ? "active"
            : ""
        liTag += `<li class="${isToday}">${i}</li>`
      }
      for (let i = lastDayofMonth; i < 6; i++) {
        // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
      }
      if (currentDate != null)
        currentDate.innerHTML = `${months[currMonth]} ${currYear}` // passing current mon and yr as currentDate text
      if (daysTag != null) daysTag.innerHTML = liTag
    }
    renderCalendar()
    prevNextIcon.forEach((icon) => {
      // getting prev and next icons
      icon.addEventListener("click", () => {
        // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1
        if (currMonth < 0 || currMonth > 11) {
          // if current month is less than 0 or greater than 11
          // creating a new date of current year & month and pass it as date value
          date = new Date(currYear, currMonth, new Date().getDate())
          currYear = date.getFullYear() // updating current year with new date year
          currMonth = date.getMonth() // updating current month with new date month
        } else {
          date = new Date() // pass the current date as date value
        }
        renderCalendar() // calling renderCalendar function
      })
    })
  })

  return (
    <div class="py-3 px-5 mb-2 panel widget">
      <div class="my-1 wrapper min-w-80">
        <header>
          <a href="">
            <p class="font-bold current-date"></p>
          </a>
          <div class="icons">
            <span id="prev" class="button">
              {"<"}
            </span>
            <span id="next" class="button">
              {">"}
            </span>
          </div>
        </header>
        <div class="calendar">
          {/* <ul class="weeks accent">
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
            <li>Sun</li>
          </ul> */}
          <ul class="days"></ul>
        </div>
      </div>
    </div>
  )
}

export default Calendar
