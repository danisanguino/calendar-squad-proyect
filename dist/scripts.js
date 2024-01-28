import { Months } from "./enums.js";
import { domElements } from "./dom.js";
let date = new Date();
let currentDay = date.getDate();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
const { currentMonthElement, currentDayElement, daysElement, prevBtn, nextBtn, currentYearElement, eventBtnElement, eventModalElement, modalOverlayElement, modalCloseBtnElement, modalCurrentDayElement, } = domElements;
function printCalendar() {
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
        const addTaskButton = document.createElement("button");
        addTaskButton.innerHTML = "+";
        addTaskButton.classList.add("add-btn", "hide");
        dayBox.addEventListener("mouseover", () => {
            addTaskButton.classList.remove("hide");
        });
        dayBox.addEventListener("mouseout", () => {
            addTaskButton.classList.add("hide");
        });
        dayBox.appendChild(addTaskButton);
        daysElement.appendChild(dayBox);
        if (i === currentDay) {
            dayBox.classList.add("active");
        }
        dayBox.addEventListener("click", () => {
            showModalDayBox();
        });
    }
    currentMonthElement.innerText = `${Months[currentMonth]}`;
    currentYearElement.innerHTML = `${currentYear}`;
    const weekDay = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
    const dayNumber = date.getDate();
    currentDayElement.innerText = `${weekDay} ${dayNumber}`;
}
const prevMonthBtn = () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear -= 1;
    }
    else {
        currentMonth -= 1;
    }
};
const nextMonthBtn = () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear += 1;
    }
    else {
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
const hideModal = () => {
    eventModalElement.classList.add("hide");
    modalOverlayElement.classList.add("hide");
};
document.addEventListener("keydown", (escKey) => {
    if (escKey.key === "Escape" &&
        !eventModalElement.classList.contains("hide")) {
        hideModal();
    }
});
modalOverlayElement.addEventListener("click", () => {
    hideModal();
});
modalCloseBtnElement.addEventListener("click", () => {
    hideModal();
});
const showModal = () => {
    eventModalElement.classList.remove("hide");
    modalOverlayElement.classList.remove("hide");
};
const showModalDayBox = () => {
    eventModalElement.classList.remove("hide");
    modalOverlayElement.classList.remove("hide");
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    modalCurrentDayElement.value = formattedDate;
};
eventBtnElement.addEventListener("click", () => {
    showModal();
});
printCalendar();
window.addEventListener('load', () => {
    const darkMode = document.getElementById('dark-mode');
    if (darkMode) {
        darkMode.addEventListener('click', darkModeSwitcher);
    }
    else {
        console.error('Dark mode toggle button not found');
    }
});
function darkModeSwitcher() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}
