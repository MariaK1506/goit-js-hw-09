import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedTime = null;

refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartTimer);

function onStartTimer() {
  refs.startBtn.disabled = true;

  const timerId = setInterval(() => {
    const currentTime = Date.now();
    // console.log(currentTime);
    const deltaTime = selectedTime - currentTime;
    // console.log(selectedTime);
    if (deltaTime >= 0) {
      const elementsTimer = convertMs(deltaTime);
      updateClockFace(elementsTimer);
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

// function onStartTimer() {
//   refs.startBtn.disabled = true;

//   const timerId = setInterval(() => {
//     const currentTime = Date.now();
//     // console.log(currentTime);
//     const deltaTime = selectedTime - currentTime;
//     // console.log(selectedTime);
//     const componentsTimer = convertMs(deltaTime);
//     updateClockFace(componentsTimer);
//     if (deltaTime <= 0) {
//            // console.log('end!!!!');
//       clearInterval(timerId);
//     }
//   }, 1000);
// }

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please, choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      refs.startBtn.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.innerHTML = days;
  refs.hours.innerHTML = hours;
  refs.minutes.innerHTML = minutes;
  refs.seconds.innerHTML = seconds;
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

  return { days, hours, minutes, seconds };
}

// // console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// // console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// // console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

flatpickr(refs.input, options);
