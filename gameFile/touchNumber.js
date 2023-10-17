import {
  getNowTime,
  getResultTimeString,
  setTime,
  startTimer,
  stopTimer,
} from "./utils/timer.js";
import { handleModalClose, handleModalOpen } from "./utils/module.js";

const numberButtonList = document.getElementsByClassName("number-button");
const maxId = numberButtonList.length;
let currentNumber = 1;

const handleSuccessGame = () => {
  stopTimer();
  handleModalOpen({
    isSuccess: true,
    timeString: getResultTimeString(),
  });
  const nowSpendTime = getNowTime();
  const currentSpendTIme = localStorage.getItem("TOUCH_NUMBER_SCORE_KEY");
  if (!currentSpendTIme || Number(currentSpendTIme) > nowSpendTime) {
    localStorage.setItem("TOUCH_NUMBER_SCORE_KEY", nowSpendTime);
  }
};

const handleFailedGame = () => {
  stopTimer();
  handleModalOpen({
    isSuccess: false,
  });
  setTime(0);
};

const setButtonDOm = () => {
  for (let numberButton of numberButtonList) {
    numberButton.style.display = "block";
    numberButton.style.top = `${Math.floor(Math.random() * 100 * 0.9)}%`;
    numberButton.style.left = `${Math.floor(Math.random() * 100 * 0.9)}%`;
    numberButton.onclick = (event) => {
      const numId = Number(event.target.innerHTML);
      if (isNaN(numId)) return;
      if (numId !== currentNumber) {
        return;
      }
      event.target.style.display = "none";
      if (numId === maxId) {
        handleSuccessGame();
        return;
      }
      if (numId === 1) {
        startTimer(handleFailedGame);
      }
      currentNumber++;
    };
  }
};

const initializeTouchNumberGame = () => {
  setTime(0);
  stopTimer();
  setButtonDOm();
  currentNumber = 1;
};

const initialize = () => {
  const [headerRetryButton, modalRetryButton] =
    document.getElementsByClassName("retry-button");
  headerRetryButton.onclick = () => {
    handleModalClose(initializeTouchNumberGame);
  };

  modalRetryButton.onclick = () => {
    handleModalClose(initializeTouchNumberGame);
  };
};

setButtonDOm();
initialize();
