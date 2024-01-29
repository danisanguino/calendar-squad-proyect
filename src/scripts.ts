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

    // if (i === currentDay) {
    //   dayBox.classList.add("active");
    // }
    dayBox.addEventListener("click", () => {
      showModalDayBox();
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

const showModalDayBox = () => {
  eventModalElement.classList.remove("hide");
  modalOverlayElement.classList.remove("hide");
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  modalCurrentDayElement.value = formattedDate;
};

// Listener to show modal
eventBtnElement.addEventListener("click", () => {
  showModal();
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

  // const headers = document.getElementsByClassName('header');
  // for (let i=0; i < headers.length; i++) {
  //   headers[i].classList.toggle('dark-mode');
  // }

  // const h1Elements = document.querySelectorAll('.header__date--today-month');
  // h1Elements.forEach(element => {
  //   element.classList.toggle('h1-dark-mode')
  // })

  // const h2Elements = document.querySelectorAll('.header__date--today-day');
  // h2Elements.forEach(element => {
  //   element.classList.toggle('h2-dark-mode');
  // });

  // const h3Elements = document.querySelectorAll('.header__date--year-and-btn--year');
  // h3Elements.forEach(h3 => {
  //   h3.classList.toggle('h3-dark-mode');

  // const calendarBtn = document.querySelectorAll('.header__date--year-and-btn--btn');
  // calendarBtn.forEach (element => {
  //   element.classList.toggle('calendar-btn-dark-mode')
  // });

  // const monthBtn = document.querySelectorAll('.month-btn');
  // monthBtn.forEach (element => {
  //   element.classList.toggle('month-btn-dark-mode')
  // });

  // });
}

// Dark Mode Button

const img = document.querySelector("#icon") as HTMLImageElement;
let newSrc = "assets/button-on.png";

function onImageClick(event: MouseEvent) {
  const target = event.target as HTMLImageElement;
  target.src = newSrc;
  if (newSrc == "assets/button-on.png") {
    newSrc = "assets/button-off.png";
  } else {
    newSrc = "assets/button-on.png";
  }
}

if (img) {
  img.addEventListener("click", onImageClick);
}
