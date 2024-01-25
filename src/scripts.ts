import { Months } from "./enums.js";

import { domElements } from "./dom.js";

<<<<<<< Updated upstream
=======
// const getMonthName = (month: Months): string => {
//   return Months[month];
// };

>>>>>>> Stashed changes
let date: Date = new Date();

let currentDay: number = date.getDate();
let currentMonth: Months = date.getMonth() as Months;
let currentYear: number = date.getFullYear();

// Function to print the Calendar
function printCalendar(): void {
  const {
    currentMonthElement,
    currentDayElement,
    daysElement,
    prevBtn,
    nextBtn,
  } = domElements;

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
<<<<<<< Updated upstream
  currentMonthElement.innerText = `${Months[currentMonth]}`;

  // Buttons functionality
  const nextMonthBtn = () => {
    currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    if (currentMonth === 0) {
      currentYear += 1;
    }
  };
  const prevMonthBtn = () => {
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    if (currentMonth === 11) {
      currentYear -= 1;
    }
  };
  nextBtn.addEventListener("click", () => {
    nextMonthBtn();
    printCalendar();
  });

  prevBtn.addEventListener("click", () => {
    prevMonthBtn();
    printCalendar();
  });
=======
  currentMonthElement.innerText = `${Months[currentMonth]}`; // Use getMonthName function
>>>>>>> Stashed changes
}

printCalendar();
