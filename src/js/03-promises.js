import Notiflix from 'notiflix';

const form = document.querySelector('.form');
console.log(form);
form.addEventListener('submit', makePromisSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function makePromisSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  let infodelay = Number(delay.value);
  let infostep = Number(step.value);
  let infoamount = Number(amount.value);
  for (let i = 1; i <= infoamount; i += 1) {
    createPromise(i, infodelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`Rejected promise ${position} in ${delay}ms`);
      });
    infodelay += infostep;
  }
}
