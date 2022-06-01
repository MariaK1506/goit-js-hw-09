const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

const SWITCHER_DELAY = 1000;
let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {
  const addBackgroundColor = () => {
    document.body.style.backgroundColor = getRandomHexColor();
  };
  intervalId = setInterval(addBackgroundColor, SWITCHER_DELAY);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function onStopBtnClick() {
  //   console.log(intervalId);
  clearInterval(intervalId);
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
}
