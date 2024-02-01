var _a;
import { Months } from "./enums.js";
import { domElements } from "./dom.js";
let date = new Date();
let currentDay = date.getDate();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let currentDate = new Date();
let currentHour = date.getHours();
let currentMinutes = date.getMinutes();
let allEvents = [];
const { currentMonthElement, currentDayElement, daysElement, prevBtn, nextBtn, currentYearElement, eventBtnElement, eventModalElement, eventModalEndDate, eventModalEndDateTime, eventModalInitialDate, eventNameElement, eventModalEndDateCheck, eventModalReminderCheck, eventModalReminderOptions, modalOverlayElement, modalCloseBtnElement, modalCurrentDayElement, modalPlaceholderElement, modalDescriptionElement, eventSecondModalTitle, eventSecondModalInitialDate, eventSecondModalTime, eventSecondModalEndDate, eventSecondModalEndTime, eventSecondModalDescription, eventSecondModalEventType, eventSecondModalReminder, eventDeleteButton, eventSecondModalCloseBtn, } = domElements;
function updateCalendarWithReminders(events, currentMonth, currentYear, i, dayBox) {
    events.forEach((event) => {
        if (event.initialDate instanceof Date ||
            typeof event.initialDate === "string") {
            const eventDate = new Date(event.initialDate);
            const eventDay = eventDate.getDate();
            const eventMonth = eventDate.getMonth();
            const eventYear = eventDate.getFullYear();
            if (eventMonth === currentMonth &&
                eventYear === currentYear &&
                eventDay === i) {
                const reminderText = `${event.time.toString()}:00 - ${event.title}`;
                const reminderElement = document.createElement("div");
                reminderElement.classList.add("reminder");
                reminderElement.innerText = reminderText;
                const reminderDescription = `<p class="event-description">${event.title}
        Description: ${event.description}
        Time: ${event.time.toString()}:00</p>`;
                dayBox.appendChild(reminderElement);
                reminderElement.innerHTML += reminderDescription;
                reminderElement.addEventListener("click", () => {
                    modalDescriptionElement.classList.remove("hide");
                    modalOverlayElement.classList.remove("hide");
                    eventSecondModalTitle.innerText = event.title;
                    eventSecondModalInitialDate.innerText = `Start: ${event.initialDate}`;
                    eventSecondModalTime.innerText = `at: ${event.time} h.`;
                    if (event.endDate)
                        eventSecondModalEndDate.innerText = `Finish: ${event.endDate}`;
                    if (event.endTime)
                        eventSecondModalEndTime.innerText = `at: ${event.endTime} h.`;
                    if (event.reminder)
                        eventSecondModalReminder.innerText = `Remind me: ${event.reminder}`;
                    if (event.description)
                        eventSecondModalDescription.innerText = `Description: ${event.description}`;
                    eventSecondModalEventType.innerText = `Type: ${event.eventType}`;
                    eventSecondModalCloseBtn.addEventListener("click", () => {
                        hideEventModal();
                    });
                    eventDeleteButton.addEventListener("click", () => {
                        reminderElement.remove();
                        hideEventModal();
                    });
                });
            }
        }
    });
}
function printCalendar() {
    const previousEvents = localStorage.getItem("events");
    const allEvents = previousEvents ? JSON.parse(previousEvents) : [];
    const firstDayOfTheMonth = new Date(currentYear, currentMonth, 1).getDay();
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    daysElement.innerHTML = " ";
    for (let i = 0; i < firstDayOfTheMonth; i++) {
        const dayBox = document.createElement("div");
        dayBox.classList.add("main__container-days--dynamic-day", "opacity");
        daysElement.appendChild(dayBox);
    }
    for (let i = 1; i <= totalDaysInMonth; i++) {
        const dayBox = document.createElement("div");
        dayBox.classList.add("main__container-days--dynamic-day");
        dayBox.innerText = i.toString();
        updateCalendarWithReminders(allEvents, currentMonth, currentYear, i, dayBox);
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
        addTaskButton.addEventListener("click", () => {
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
const hideModal = () => {
    eventModalElement.classList.add("hide");
    modalOverlayElement.classList.add("hide");
};
const hideEventModal = () => {
    modalDescriptionElement.classList.add("hide");
    modalOverlayElement.classList.add("hide");
};
document.addEventListener("keydown", (escKey) => {
    if (escKey.key === "Escape" &&
        !eventModalElement.classList.contains("hide")) {
        hideModal();
    }
});
document.addEventListener("keydown", (escKey) => {
    if (escKey.key === "Escape" &&
        !modalDescriptionElement.classList.contains("hide")) {
        hideEventModal();
    }
});
modalOverlayElement.addEventListener("click", () => {
    hideModal();
    hideEventModal();
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
    if (evnt.title && evnt.time !== undefined) {
        if (!evnt.initialDate || typeof evnt.initialDate === "string") {
            evnt.initialDate = new Date();
        }
        if (typeof evnt.initialDate === "string") {
            evnt.initialDate = new Date(evnt.initialDate);
        }
        const previousEvents = localStorage.getItem("events");
        allEvents = previousEvents ? JSON.parse(previousEvents) : [];
        allEvents.push(evnt);
        localStorage.setItem("events", JSON.stringify(allEvents));
        printCalendar();
    }
};
export const deleteEvent = (eventIndex) => {
    const previousEvents = localStorage.getItem("events");
    allEvents = previousEvents ? JSON.parse(previousEvents) : [];
    allEvents.splice(eventIndex, 1);
    localStorage.setItem("events", JSON.stringify(allEvents));
    printCalendar();
};
eventDeleteButton.addEventListener("click", () => {
    const eventIndex = allEvents.findIndex((event) => event.title === eventSecondModalTitle.innerText);
    if (eventIndex !== -1) {
        deleteEvent(eventIndex);
        hideEventModal();
    }
    else {
        console.error("Evento no encontrado para eliminar");
    }
});
(_a = document.getElementById("event-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const title = eventNameElement.value;
    const initialDate = new Date(eventModalInitialDate.value);
    const endDate = eventModalEndDateCheck.checked
        ? new Date(eventModalEndDateTime.value)
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
    eventModalEndDate.classList.remove("hide");
};
const hideEndDateTime = () => {
    eventModalEndDate.classList.add("hide");
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
