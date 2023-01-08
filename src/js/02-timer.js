import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dataInput = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysData = document.querySelector('span[data-days]');
const hoursData = document.querySelector('span[data-hours]');
const minutesData = document.querySelector('span[data-minutes]');
const secondsData = document.querySelector('span[data-seconds]');

const currentDate = new Date();
startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < currentDate) {
      startBtn.disabled = true;

      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
    const selectedTime = selectedDates[0].getTime();

    startBtn.addEventListener('click', () => {
      onBtnClick(selectedTime);
    });
  },
};

flatpickr(dataInput, options);

function onBtnClick(selectedTime) {
  startBtn.disabled = true;
  const inervalId = setInterval(() => {
    const currentTime = Date.now();

    const referenceTime = currentTime - selectedTime;

    const { days, hours, minutes, seconds } = convertMs(referenceTime * -1);

    makeDateTextContent(days, hours, minutes, seconds);

    if (referenceTime >= -1000) {
      Notiflix.Notify.success('The timer has finished!');
      startBtn.disabled = false;
      clearInterval(inervalId);
    }
  }, 1000);
}

function makeDateTextContent(days, hours, minutes, seconds) {
  daysData.textContent = pad(days);
  hoursData.textContent = pad(hours);
  minutesData.textContent = pad(minutes);
  secondsData.textContent = pad(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function pad(value) {
  return String(value).padStart(2, '0');
}
