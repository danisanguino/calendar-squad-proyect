import { domElements } from "./dom.js";
let date = new Date();
let currentDay = date.getDay();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
function printCalendar() {
    const { currentMonthElement, currentDayElement, daysElement } = domElements;
    const firstDayOfTheMonth = new Date(currentYear, currentMonth, 1).getDay();
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    daysElement.innerHTML = " ";
    for (let i = 0; i < firstDayOfTheMonth; i++) {
        const dayBox = document.createElement("div");
        dayBox.classList.add("main__container-days--dynamic-day");
        daysElement.appendChild(dayBox);
    }
    for (let i = 1; i <= totalDaysInMonth; i++) {
        const dayBox = document.createElement("div");
        dayBox.classList.add("main__container-days--dynamic-day");
        dayBox.innerText = i.toString();
        daysElement.appendChild(dayBox);
    }
    currentMonthElement.innerText = "";
}
printCalendar();
