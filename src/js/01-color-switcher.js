const bodyElem = document.querySelector('body');
const startBtn = document.querySelectorAll('button')[0]; // кнопка СТАРТ
const stopBtn = document.querySelectorAll('button')[1]; // кнопка СТОП

let timerId = null;

startBtn.addEventListener('click', () => {
  timerId = setInterval(changeColor, 1000);
});
stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
});

function changeColor() {
  startBtn.disabled = true;
  let newColor = getRandomHexColor();
  bodyElem.style.backgroundColor = newColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
