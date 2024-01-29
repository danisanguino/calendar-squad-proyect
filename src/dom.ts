export const domElements = {
  daysElement: document.getElementById("container-days") as HTMLDivElement,
  currentMonthElement: document.getElementById("header-month") as HTMLElement,
  currentDayElement: document.getElementById("header-day") as HTMLElement,
  prevBtn: document.getElementById("prev-btn") as HTMLButtonElement,
  nextBtn: document.getElementById("next-btn") as HTMLButtonElement,
  currentYearElement: document.getElementById(
    "header-year"
  ) as HTMLHeadingElement,
  eventBtnElement: document.getElementById("event-btn") as HTMLButtonElement,
  eventModalElement: document.getElementById("event-form") as HTMLModElement,
  modalOverlayElement: document.getElementById(
    "modal-overlay"
  ) as HTMLDivElement,
  modalCloseBtnElement: document.getElementById(
    "close-btn"
  ) as HTMLButtonElement,
  modalCurrentDayElement: document.getElementById(
    "initial-date"
  ) as HTMLInputElement,
};


