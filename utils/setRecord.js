import { getTimeString } from "./timer.js";

export const mainSetRecord = () => {
  const getMouseControlRecord = localStorage.getItem("MOUSE_CONTROL_SCORE_KEY");
  const getTouchNumRecord = localStorage.getItem("TOUCH_NUMBER_SCORE_KEY");
  const getArrowRecord = localStorage.getItem("ARROW_CLICK_SCORE_KEY");
  const mouseControleGameTime = document.querySelector(".game-result.mouse");
  const ArrowGameTime = document.querySelector(".game-result.key");
  const numberClickGame = document.querySelector(".game-result.click");
  if (getMouseControlRecord) {
    const time = getTimeString(Number(getMouseControlRecord));
    mouseControleGameTime.innerHTML = `최고 기록 : ${time}`;
  }

  if (getTouchNumRecord) {
    const time = getTimeString(Number(getTouchNumRecord));
    numberClickGame.innerHTML = `최고 기록 : ${time}`;
  }

  if (getArrowRecord) {
    const time = getTimeString(Number(getArrowRecord));
    ArrowGameTime.innerHTML = `최고 기록 : ${time}`;
  }
  // if (getTouchNumRecord) changeTimer(numberClickGame, getTouchNumRecord);
};

const init = () => {
  mainSetRecord();
};

init();
