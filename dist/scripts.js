var _a;
import { Months } from "./enums.js";
import { domElements } from "./dom.js";
let date = new Date();
let currentDay = date.getDate();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
const { currentMonthElement, currentDayElement, daysElement, prevBtn, nextBtn, currentYearElement, eventBtnElement, eventModalElement, eventModalEndDate, eventModalEndDateTime, eventModalInitialDate, eventNameElement, eventModalEndDateCheck, eventModalReminderCheck, eventModalReminderOptions, modalOverlayElement, modalCloseBtnElement, modalCurrentDayElement, } = domElements;
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
        if (i === date.getDate() &&
            currentMonth === date.getMonth() &&
            currentYear === date.getFullYear()) {
            dayBox.classList.add("active");
        }
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
        dayBox.addEventListener("click", () => {
            showModalDayBox(i);
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
    leftAnimation();
});
nextBtn.addEventListener("click", () => {
    nextMonthBtn();
    printCalendar();
    rightAnimation();
});
const leftAnimation = function () {
    daysElement.classList.add("animate__slideOutRight");
    daysElement.addEventListener("animationend", function () {
        daysElement.classList.remove("animate__slideOutRight");
    });
};
const rightAnimation = function () {
    daysElement.classList.add("animate__slideOutLeft");
    daysElement.addEventListener("animationend", function () {
        daysElement.classList.remove("animate__slideOutLeft");
    });
};
prevBtn.addEventListener("click", () => {
    prevMonthBtn();
    printCalendar();
    leftAnimation();
});
nextBtn.addEventListener("click", () => {
    nextMonthBtn();
    printCalendar();
    rightAnimation();
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
const showModalDayBox = (clickedDay) => {
    eventModalElement.classList.remove("hide");
    modalOverlayElement.classList.remove("hide");
    const clickedDate = new Date(currentYear, currentMonth, clickedDay + 1);
    const formattedDate = clickedDate.toISOString().split("T")[0];
    modalCurrentDayElement.value = formattedDate;
};
eventBtnElement.addEventListener("click", () => {
    showModal();
});
export const saveEvent = (evnt) => {
    if (evnt.title && evnt.initialDate && evnt.time) {
        const previousEvents = localStorage.getItem("events");
        const allEvents = previousEvents ? JSON.parse(previousEvents) : [];
        allEvents.push(evnt);
        localStorage.setItem("events", JSON.stringify(allEvents));
        printCalendar();
    }
};
(_a = document.getElementById("event-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const title = eventNameElement.value;
    const initialDate = new Date(eventModalInitialDate.value);
    const endDate = eventModalEndDateCheck.checked
        ? new Date(eventModalEndDate.value)
        : null;
    const eventTypeString = document.getElementById("type-events-options-values").value;
    const eventType = eventTypeString;
    const reminderValue = document.getElementById("reminder-checkbox").value;
    const reminder = eventModalReminderCheck.checked
        ? reminderValue
        : null;
    const description = document.querySelector('textarea[name="modal-form-textarea"]').value;
    const startTimeInput = document.getElementById("start-time-input").value;
    const endTimeInputValue = document.getElementById("end-time-input").value;
    const time = parseInt(startTimeInput, 10);
    const endTime = endTimeInputValue
        ? parseInt(endTimeInputValue, 10)
        : null;
    const event = {
        initialDate,
        title,
        eventType,
        time,
        endDate,
        endTime,
        reminder,
        description,
    };
    saveEvent(event);
    hideModal();
});
printCalendar();
window.addEventListener("load", () => {
    const darkMode = document.getElementById("switch");
    if (darkMode) {
        darkMode.addEventListener("click", darkModeSwitcher);
    }
    else {
        console.error("Dark mode toggle button not found");
    }
});
function darkModeSwitcher() {
    const body = document.body;
    body.classList.toggle("dark-mode");
}
const addEventBtnImg = document.getElementById("button-off");
let newSrc = "assets/button-on.png";
function onImageClick(event) {
    const target = event.target;
    if (target) {
        target.src = newSrc;
        if (newSrc == "assets/button-on.png") {
            newSrc = "assets/button-off.png";
        }
        else {
            newSrc = "assets/button-on.png";
        }
    }
}
addEventBtnImg.addEventListener("click", onImageClick);
const showEndDateTime = () => {
    eventModalEndDateTime.classList.remove("hide");
};
const hideEndDateTime = () => {
    eventModalEndDateTime.classList.add("hide");
};
const showReminder = () => {
    eventModalReminderOptions.classList.remove("hide");
};
const hideReminder = () => {
    eventModalReminderOptions.classList.add("hide");
};
eventModalEndDateCheck.addEventListener("click", () => {
    if (eventModalEndDateCheck.checked) {
        showEndDateTime();
    }
    else {
        hideEndDateTime();
    }
});
eventModalReminderCheck.addEventListener("click", () => {
    if (eventModalReminderCheck.checked) {
        showReminder();
    }
    else {
        hideReminder();
    }
});
