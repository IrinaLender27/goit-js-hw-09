const flatpickr = require('flatpickr');
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let timerId = null;
let selectedDate = null;
let timeToEnd = 0;
const refs = {
  date: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minut: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
};
console.log(refs);
refs.button.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    currentDate = new Date().getTime();
    if (selectedDate > currentDate) {
      refs.button.disabled = false;
      Notiflix.Notify.failure('Hello!Click on start');

      return;
    }
    Notiflix.Notify.failure('Please choose a date in the future');
  },
};
flatpickr(refs.date, options);

refs.button.addEventListener('click', onStart);
function onStart() {
  intervalId = setInterval(() => {
    currentDate = new Date().getTime();
    if (selectedDate - currentDate <= 1000) {
      clearInterval(intervalId);
      refs.button.disabled = true;
      refs.date.disabled = false;
      Notiflix.Notify.failure('Timer stopped!');
      return;
    } else {
      refs.button.disabled = true;
      refs.date.disabled = true;
      currentDate += 1000;
      timeToEnd = selectedDate - currentDate;
      convertMs(timeToEnd);
    }
  }, 1000);
}
function updateClockface({ days, hours, minutes, seconds }) {
  refs.day.textContent = days;
  refs.hour.textContent = hours;
  refs.minut.textContent = minutes;
  refs.second.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  updateClockface({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}
