import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button'); // кнопка старт
startBtn.disabled = true; // кнопка при старте в состоянии *disabled*

const times = document.querySelectorAll('.value'); // счетчик
// const [days, hours, minutes, seconds] = times; // поля счетчика
const inputData = document.getElementById('datetime-picker'); // поле *input*

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let diffTime = selectedDates[0] - Date.now();
    if (diffTime <= 0) {
      Notify.failure(
        'Please choose a date in the future',
        Notify.init({
          clickToClose: true,
          position: 'center-top',
        })
      );
      return;
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', onClick);
    }
    function onClick() {
      startBtn.disabled = true;
      inputData.disabled = true;
      const interval = setInterval(() => {
        if (diffTime < 1000) {
          clearInterval(interval);
          Notify.info(
            'Timer is stopped',
            Notify.init({
              backOverlay: true,
              clickToClose: true,
              position: 'center-center',
              timeout: 5000,
              cssAnimationDuration: 1000,
            })
          );
          setTimeout(function () {
            location.reload();
          }, 5500);
        }
        const data = convertMs(diffTime);
        diffTime -= 1000;
        times[0].textContent = addLeadingZero(data.days);
        times[1].textContent = addLeadingZero(data.hours);
        times[2].textContent = addLeadingZero(data.minutes);
        times[3].textContent = addLeadingZero(data.seconds);
      }, 1000);
    }
  },
};

flatpickr(inputData, options);

// Number of milliseconds per unit of time
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day); // Remaining days
  const hours = Math.floor((ms % day) / hour); // Remaining hours
  const minutes = Math.floor(((ms % day) % hour) / minute); // Remaining minutes
  const seconds = Math.floor((((ms % day) % hour) % minute) / second); // Remaining seconds
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0'); //добавляем 0 до двух символов
}
