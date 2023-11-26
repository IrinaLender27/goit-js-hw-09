const start = document.querySelector('button[data-start]');
console.log(start);
const stop = document.querySelector('button[data-stop]');
console.log(stop);

let timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

start.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    start.setAttribute('disabled', 'true');
    stop.removeAttribute('disabled');
  }, 1000);
});
stop.addEventListener('click', () => {
  clearInterval(timerId);
  start.removeAttribute('disabled');
  stop.setAttribute('disabled', 'true');
});
