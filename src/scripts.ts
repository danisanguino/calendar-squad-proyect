import { Months } from "./enums.js";

import { domElements } from "./dom.js";

let date: Date = new Date();

let currentDay: number = date.getDate();
let currentMonth: Months = date.getMonth() as Months;
let currentYear: number = date.getFullYear();

const {
  currentMonthElement,
  currentDayElement,
  daysElement,
  prevBtn,
  nextBtn,
} = domElements;

// Function to print the Calendar
function printCalendar(): void {
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
  currentMonthElement.innerText = `${Months[currentMonth]}`;
}

const prevMonthBtn = (): void => {
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  if (currentMonth === 11) {
    currentYear -= 1;
  }
};
const nextMonthBtn = (): void => {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear += 1;
  } else {
    currentMonth += 1;
  }
  console.log(currentMonth);
};

prevBtn.addEventListener("click", () => {
  prevMonthBtn();
  printCalendar();
});
nextBtn.addEventListener("click", () => {
  nextMonthBtn();
  printCalendar();
});
printCalendar();
