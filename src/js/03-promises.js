import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
// const { delay, step, amount } = form;

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  let delay = Number(form.delay.value);
  const step = Number(form.step.value);
  const amount = Number(form.amount.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(message => Notify.success(message))
      .catch(error => Notify.failure(error));

    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`); //✅
      } else {
        reject(`Rejected promise ${position} in ${delay}ms`); // ❌
      }
    }, delay);
  });
}
