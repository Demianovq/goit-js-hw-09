const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
startBtn.addEventListener('click', onClick);
stopBtn.disabled = true;
let isActive = false;
function onClick() {
  if (isActive) {
    return;
  }
  isActive = true;
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }, 1000);
}

stopBtn.addEventListener('click', () => {
  isActive = false;
  document.body.style.backgroundColor = 'white';
  clearInterval(timerId);
  stopBtn.disabled = true;
  startBtn.disabled = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
