import { Months, Days, EventType, Event, Reminder } from "./enums.js";

import { domElements } from "./dom.js";

import * as localstorage from "./localstorage.js";

let date: Date = new Date();

let currentDay: number = date.getDate();
let currentMonth: Months = date.getMonth() as Months;
let currentYear: number = date.getFullYear();
let currentDate: object = new Date();
let currentHour: number = date.getHours();
let currentMinutes: number = date.getMinutes();
let allEvents: Event[] = [];

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
  eventModalEndDateTime,
  eventModalInitialDate,
  eventNameElement,
  eventModalEndDateCheck,
  eventModalReminderCheck,
  eventModalReminderOptions,
  modalOverlayElement,
  modalCloseBtnElement,
  modalCurrentDayElement,
  modalPlaceholderElement,
  modalDescriptionElement,
  eventSecondModalTitle,
  eventSecondModalInitialDate,
  eventSecondModalTime,
  eventSecondModalEndDate,
  eventSecondModalEndTime,
  eventSecondModalDescription,
  eventSecondModalEventType,
  eventSecondModalReminder,
  eventDeleteButton,
  eventSecondModalCloseBtn,
} = domElements;

function updateCalendarWithReminders(
  events: Event[],
  currentMonth: number,
  currentYear: number,
  i: number,
  dayBox: Element
): void {
  // Loop through each event and update the corresponding day box in the calendar
  events.forEach((event: Event) => {
    if (
      event.initialDate instanceof Date ||
      typeof event.initialDate === "string"
    ) {
      const eventDate = new Date(event.initialDate);
      const eventDay = eventDate.getDate();
      const eventMonth = eventDate.getMonth();
      const eventYear = eventDate.getFullYear();

      if (
        eventMonth === currentMonth &&
        eventYear === currentYear &&
        eventDay === i
      ) {
        // Display the title and time as a reminder in the day box
        const reminderText = `${event.time.toString()}:00 - ${event.title}`;
        const reminderElement = document.createElement("div");
        reminderElement.classList.add("reminder");
        reminderElement.innerText = reminderText;
        const reminderDescription = `<p class="event-description">${event.title}
        Description: ${event.description}
        Time: ${event.time.toString()}:00</p>`;
        // console.log(reminderDescription);
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

// Function to print the Calendar
function printCalendar(): void {
  const previousEvents = localStorage.getItem("events");
  const allEvents: Event[] = previousEvents ? JSON.parse(previousEvents) : [];
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

  // Clean Calendar content
  daysElement.innerHTML = " ";

  // Add empty days element before first day
  for (let i = 0; i < firstDayOfTheMonth; i++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("main__container-days--dynamic-day", "opacity");
    daysElement.appendChild(dayBox);
  }
  // Printing Days of actual month
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("main__container-days--dynamic-day");
    dayBox.innerText = i.toString();
    updateCalendarWithReminders(
      allEvents,
      currentMonth,
      currentYear,
      i,
      dayBox
    );

    // Emphasing current day ******* ****** *******
    if (
      i === date.getDate() &&
      currentMonth === date.getMonth() &&
      currentYear === date.getFullYear()
    ) {
      dayBox.classList.add("active");
    }
    // ******** ******** ******** ******** ********

    // Create dynamic button
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

const hideModal = () => {
  eventModalElement.classList.add("hide");
  modalOverlayElement.classList.add("hide");
};

const hideEventModal = () => {
  modalDescriptionElement.classList.add("hide");
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

document.addEventListener("keydown", (escKey) => {
  if (
    escKey.key === "Escape" &&
    !modalDescriptionElement.classList.contains("hide")
  ) {
    hideEventModal();
  }
});

// Overlay click to close modal
modalOverlayElement.addEventListener("click", () => {
  hideModal();
  hideEventModal();
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
  if (evnt.title && evnt.time !== undefined) {
    if (!evnt.initialDate || typeof evnt.initialDate === "string") {
      // If initialDate is missing or a string, set it to the current date
      evnt.initialDate = new Date();
    }

    // If initialDate is a string, convert it to a Date object
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

export const deleteEvent = (eventIndex: number) => {
  const previousEvents = localStorage.getItem("events");
  allEvents = previousEvents ? JSON.parse(previousEvents) : [];

  // Eliminar el evento del arreglo de eventos
  allEvents.splice(eventIndex, 1);

  // Guardar el nuevo arreglo en localStorage
  localStorage.setItem("events", JSON.stringify(allEvents));
  printCalendar();
};

eventDeleteButton.addEventListener("click", () => {
  // Obtener el índice del evento que se eliminará
  const eventIndex = allEvents.findIndex(
    (event: Event) => event.title === eventSecondModalTitle.innerText
  );
  // if (eventIndex !== -1) // ESTO TIENE QUE SER ASÍ
  if (eventIndex !== -1) {
    deleteEvent(eventIndex);
    hideEventModal();
  } else {
    console.error("Evento no encontrado para eliminar");
  }
});

document.getElementById("event-form")?.addEventListener("submit", (evt) => {
  evt.preventDefault();

  // Gather form data
  const title = eventNameElement.value;
  const initialDate = new Date(eventModalInitialDate.value);
  const endDate = eventModalEndDateCheck.checked
    ? new Date(eventModalEndDateTime.value)
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

// Listener to show modal

eventModalEndDateCheck.addEventListener("click", () => {
  if (eventModalEndDateCheck.checked) {
    showEndDateTime();
  } else {
    hideEndDateTime();
  }
});

eventModalReminderCheck.addEventListener("click", () => {
  if (eventModalReminderCheck.checked) {
    showReminder();
  } else {
    hideReminder();
  }
});
