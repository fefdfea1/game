const MAX_TIME = 3599; //최대시간 24시간
const timeDOM = document.getElementsByClassName("game-time")[0];

export let isGameStart = false;
let time = 0;
let timerId = null;
const converToTwonumvber = (num) => {
  const stringNum = `${num}`;
  if (stringNum.length === 1) return `0${stringNum}`;
  else return stringNum;
};

export const getTimeString = (time) => {
  // e.g time = 0 return 00:00:00
  const hours = Math.floor(time / 3600); // time = 3661;
  time = time - hours * 3600;
  const minutes = Math.floor(time / 60);
  time = time - minutes * 60;
  const seconds = time;

  return `${converToTwonumvber(hours)}:${converToTwonumvber(
    minutes
  )}:${converToTwonumvber(seconds)}`;
};

export const startTimer = (onTimeOver) => {
  isGameStart = true;
  timerId = setInterval(() => {
    time++;
    timeDOM.innerHTML = getTimeString(time);

    if (MAX_TIME < time) {
      onTimeOver?.();
      clearInterval(timerId);
    }
  }, 1000);
};

export const stopTimer = () => {
  isGameStart = false;
  if (timerId === null) return;
  clearInterval(timerId);
};

export const setTime = (initTime) => {
  time = initTime;
  timeDOM.innerHTML = getTimeString(time);
};

export const getResultTimeString = () => {
  return getTimeString(time);
};

export const getNowTime = () => {
  return time;
};
