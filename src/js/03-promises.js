import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formData = document.querySelector('.form');

formData.addEventListener('submit', getValue);

function getValue(evt) {
  evt.preventDefault();
  const formObj = {
    delay: evt.currentTarget.elements.delay.valueAsNumber,
    step: evt.currentTarget.elements.step.valueAsNumber,
    amount: evt.currentTarget.elements.amount.valueAsNumber,
  };
  promisesCounter(formObj);
}

function promisesCounter({ delay, step, amount }) {
  for (let i = 0; i < amount; i++) {
    const delayInfo = delay + step * i;
    createPromise(i + 1, delayInfo)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
  return promise;
}
