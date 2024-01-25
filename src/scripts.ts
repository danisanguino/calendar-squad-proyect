// import { Months } from "./enums";

import { domElements } from "./dom.js";

let date: Date = new Date();

let currentDay: number = date.getDay();
let currentMonth: number = date.getMonth();
let currentYear: number = date.getFullYear();

// Function to print the Calendar
function printCalendar(): void {
  const { currentMonthElement, currentDayElement, daysElement } = domElements;

  const firstDayOfTheMonth: number = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();
  const totalDaysInMonth: number = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  // clean Calendar content
  daysElement.innerHTML = " ";

  // Add empty days element before first day
  for (let i = 0; i < firstDayOfTheMonth; i++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("main__container-days--dynamic-day");
    daysElement.appendChild(dayBox);
  }
  // Printing Days of actual month
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("main__container-days--dynamic-day");
    dayBox.innerText = i.toString();
    daysElement.appendChild(dayBox);
  }
  currentMonthElement.innerText = "";
}

printCalendar();
