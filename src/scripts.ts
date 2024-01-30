import { Months, Days, EventType, Event, Reminder } from "./enums.js";

import { domElements } from "./dom.js";

import * as localstorage from "./localstorage.js";

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
  eventModalEndDate,
  eventModalInitialDate,
  eventNameElement,
  eventModalEndDateCheck,
  eventModalReminderCheck,
  eventModalReminderOptions,
  modalOverlayElement,
  modalCloseBtnElement,
  modalCurrentDayElement,
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

    // Emphasing current day
    if (
      i === date.getDate() &&
      currentMonth === date.getMonth() &&
      currentYear === date.getFullYear()
    ) {
      dayBox.classList.add("active");
    }

    //PRUEBA DE CREAR EL BUTTON DINAMICAMENTE
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
  leftAnimation();
});

nextBtn.addEventListener("click", () => {
  nextMonthBtn();
  printCalendar();
  rightAnimation();
});

// Add animation into main__container

const leftAnimation = function () {
  daysElement.classList.add("animate__slideOutRight");

  // Remove class after animation is completed
  daysElement.addEventListener("animationend", function () {
    daysElement.classList.remove("animate__slideOutRight");
  });
};

const rightAnimation = function () {
  daysElement.classList.add("animate__slideOutLeft");

  // Remove class after animation is completed
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

// Escape button listener to close modal
document.addEventListener("keydown", (escKey) => {
  if (
    escKey.key === "Escape" &&
    !eventModalElement.classList.contains("hide")
  ) {
    hideModal();
  }
});

// Overlay click to close modal
modalOverlayElement.addEventListener("click", () => {
  hideModal();
});

modalCloseBtnElement.addEventListener("click", () => {
  hideModal();
});

//Showing Modal Function
const showModal = () => {
  eventModalElement.classList.remove("hide");
  modalOverlayElement.classList.remove("hide");
};

const showModalDayBox = (clickedDay: number) => {
  eventModalElement.classList.remove("hide");
  modalOverlayElement.classList.remove("hide");

  const clickedDate = new Date(currentYear, currentMonth, clickedDay + 1);
  const formattedDate = clickedDate.toISOString().split("T")[0];
  modalCurrentDayElement.value = formattedDate;
};

// Listener to show modal
eventBtnElement.addEventListener("click", () => {
  showModal();
});

export const saveEvent = (evnt: Event) => {
  if (evnt.title && evnt.initialDate && evnt.time) {
    const previousEvents = localStorage.getItem("events");
    const allEvents: Event[] = previousEvents ? JSON.parse(previousEvents) : [];

    allEvents.push(evnt);
    localStorage.setItem("events", JSON.stringify(allEvents));
    printCalendar();
  }
};

document.getElementById("event-form")?.addEventListener("submit", (evt) => {
  evt.preventDefault();

  // Gather form data
  const title = eventNameElement.value;
  const initialDate = new Date(eventModalInitialDate.value);
  const endDate = eventModalEndDateCheck.checked
    ? new Date(eventModalEndDate.value)
    : null;
  const eventTypeString = (
    document.getElementById("type-events-options-values") as HTMLSelectElement
  ).value;
  const eventType: EventType = <EventType>eventTypeString;
  const reminderValue = (
    document.getElementById("reminder-checkbox") as HTMLSelectElement
  ).value;
  const reminder: Reminder | null = eventModalReminderCheck.checked
    ? (reminderValue as Reminder)
    : null;
  const description = (
    document.querySelector(
      'textarea[name="modal-form-textarea"]'
    ) as HTMLTextAreaElement
  ).value;

  const startTimeInput = (
    document.getElementById("start-time-input") as HTMLInputElement
  ).value;
  const endTimeInputValue = (
    document.getElementById("end-time-input") as HTMLInputElement
  ).value;

  const time: number = parseInt(startTimeInput, 10);
  const endTime: number | null = endTimeInputValue
    ? parseInt(endTimeInputValue, 10)
    : null;

  //Create event Object
  const event: Event = {
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

// Dark Mode switcher

window.addEventListener("load", () => {
  const darkMode = document.getElementById("switch");

  // Check if the element exists before adding the event listener
  if (darkMode) {
    darkMode.addEventListener("click", darkModeSwitcher);
  } else {
    console.error("Dark mode toggle button not found");
  }
});

function darkModeSwitcher() {
  const body = document.body;
  body.classList.toggle("dark-mode");
}

// Dark Mode Button

const addEventBtnImg = document.getElementById(
  "button-off"
) as HTMLImageElement;
let newSrc = "assets/button-on.png";

function onImageClick(event: MouseEvent) {
  const target = event.target as HTMLImageElement;
  if (target) {
    target.src = newSrc;
    if (newSrc == "assets/button-on.png") {
      newSrc = "assets/button-off.png";
    } else {
      newSrc = "assets/button-on.png";
    }
  }
}

addEventBtnImg.addEventListener("click", onImageClick);

// Show and hide modal's children

// !!! HAY QUE CAMBIARLO PARA QUE SE MUESTRE U OCULTE EN FUNCIÓN DE SI ESTÁ EL CHECK ACTIVO O NO. AHORA SOLO SE MUESTRA AL HACER EL PRIMER CLICK !!!

const ShowEndDate = () => {
  eventModalEndDate.classList.remove("hide");
};
const showReminder = () => {
  eventModalReminderOptions.classList.remove("hide");
};

// Listener to show modal

eventModalEndDateCheck.addEventListener("click", () => {
  ShowEndDate();
});
eventModalReminderCheck.addEventListener("click", () => {
  showReminder();
});
