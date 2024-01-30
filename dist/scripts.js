var _a;
import { Months } from "./enums.js";
import { domElements } from "./dom.js";
let date = new Date();
let currentDay = date.getDate();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
const { currentMonthElement, currentDayElement, daysElement, prevBtn, nextBtn, currentYearElement, eventBtnElement, eventModalElement, eventModalEndDate, eventModalInitialDate, eventNameElement, eventModalEndDateCheck, eventModalReminderCheck, eventModalReminderOptions, modalOverlayElement, modalCloseBtnElement, modalCurrentDayElement, } = domElements;
function updateCalendarWithReminders(events) {
    events.forEach((event) => {
        if (event.initialDate instanceof Date ||
            typeof event.initialDate === "string") {
            const eventDate = new Date(event.initialDate);
            const eventDay = eventDate.getDate();
            const dayBox = daysElement.children[eventDay - 1];
            if (dayBox) {
                const reminderText = `${event.title} - ${event.time.toString()}:00`;
                const reminderElement = document.createElement("div");
                reminderElement.classList.add("reminder");
                reminderElement.innerText = reminderText;
                dayBox.appendChild(reminderElement);
            }
        }
        else {
            console.error(`Invalid initialDate for event: ${event.title}`);
        }
    });
}
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
    const previousEvents = localStorage.getItem("events");
    const allEvents = previousEvents ? JSON.parse(previousEvents) : [];
    updateCalendarWithReminders(allEvents);
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
    if (evnt.title && evnt.time) {
        if (!evnt.initialDate || typeof evnt.initialDate === "string") {
            evnt.initialDate = new Date();
        }
        if (typeof evnt.initialDate === "string") {
            evnt.initialDate = new Date(evnt.initialDate);
        }
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
    const headers = document.getElementsByClassName("header");
    for (let i = 0; i < headers.length; i++) {
        headers[i].classList.toggle("dark-mode");
    }
    const h1Elements = document.querySelectorAll(".header__date--today-month");
    h1Elements.forEach((element) => {
        element.classList.toggle("h1-dark-mode");
    });
    const h2Elements = document.querySelectorAll(".header__date--today-day");
    h2Elements.forEach((element) => {
        element.classList.toggle("h2-dark-mode");
    });
    const h3Elements = document.querySelectorAll(".header__date--year-and-btn--year");
    h3Elements.forEach((h3) => {
        h3.classList.toggle("h3-dark-mode");
        const calendarBtn = document.querySelectorAll(".header__date--year-and-btn--btn");
        calendarBtn.forEach((element) => {
            element.classList.toggle("calendar-btn-dark-mode");
        });
        const monthBtn = document.querySelectorAll(".month-btn");
        monthBtn.forEach((element) => {
            element.classList.toggle("month-btn-dark-mode");
        });
    });
}
const img = document.querySelector("#icon");
let newSrc = "assets/button-on.png";
function onImageClick(event) {
    const target = event.target;
    target.src = newSrc;
    if (newSrc == "assets/button-on.png") {
        newSrc = "assets/button-off.png";
    }
    else {
        newSrc = "assets/button-on.png";
    }
}
if (img) {
    img.addEventListener("click", onImageClick);
}
const ShowEndDate = () => {
    eventModalEndDate.classList.remove("hide");
};
const showReminder = () => {
    eventModalReminderOptions.classList.remove("hide");
};
eventModalEndDateCheck.addEventListener("click", () => {
    ShowEndDate();
});
eventModalReminderCheck.addEventListener("click", () => {
    showReminder();
});
