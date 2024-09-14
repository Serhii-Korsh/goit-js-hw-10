// Import the necessary libraries
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Get references to HTML elements
const datePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");

let userSelectedDate = null; // Variable to store the selected date
let timerId = null; // Timer ID for the countdown

// Disable the Start button initially
startButton.disabled = true;

// Flatpickr options configuration
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({ title: "ⓧ", titleSize: '42px', titleColor: 'FireBrick', message: "Please choose a date in the future", backgroundColor: "red", theme: 'dark', icon: '', messageColor: 'white', close: false, position: "topRight"});
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false; // Enable the Start button when a valid date is selected
    }
  },
};

// Initialize flatpickr
flatpickr(datePicker, options);

// Event listener for the Start button click
startButton.addEventListener("click", () => {
  if (userSelectedDate) {
    startCountdown();
    startButton.disabled = true; // Disable the Start button after it's clicked
    datePicker.disabled = true;  // Disable the date picker input
  }
});

// Countdown function
function startCountdown() {
  timerId = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = userSelectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(timerId);
      iziToast.success({ title: "Done", message: "Timer has ended!" });
      resetTimer();
      return;
    }

    const timeRemaining = convertMs(timeDifference);
    updateTimerDisplay(timeRemaining);
  }, 1000);
}

// Function to convert milliseconds to time units
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Function to update the timer display
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

// Function to add leading zeros to values
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

// Reset the timer and form
function resetTimer() {
  startButton.disabled = true; // Disable the Start button
  datePicker.disabled = false; // Enable the date picker input
  daysSpan.textContent = "00";
  hoursSpan.textContent = "00";
  minutesSpan.textContent = "00";
  secondsSpan.textContent = "00";
}