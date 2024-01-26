import { Months, Days } from "./enums.js";

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
  currentYearElement,
  eventBtnElement,
  eventModalElement,
  modalOverlayElement,
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

    if (i === currentDay) {
      dayBox.classList.add("active");
    }
  }
  currentMonthElement.innerText = `${Months[currentMonth]}`;
  currentYearElement.innerHTML = `${currentYear}`;

  const weekDay = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    date
  );
  const dayNumber = date.getDate();

  currentDayElement.innerText = `${weekDay} ${dayNumber}`;
}

// Buttons functionality
const prevMonthBtn = () => {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear -= 1;
  } else {
    currentMonth -= 1;
  }
};

const nextMonthBtn = () => {
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

//Showing Modal Function
const showModal = () => {
  eventModalElement.classList.remove("hide");
  eventModalElement.classList.remove("");
};

eventBtnElement.addEventListener("click", () => {
  showModal();
});

printCalendar();
