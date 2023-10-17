import { makeDOMwithProperties } from "./utils/dom.js";
import {
  startTimer,
  stopTimer,
  setTime,
  getNowTime,
  getResultTimeString,
} from "./utils/timer.js";
import { handleModalOpen, handleModalClose } from "./utils/module.js";

const MAX_ARROW = 8;
let startState = false;
let clearStage = 0;

let arrowDOMList = [];
const arrowFieldDOM = document.getElementById("arrow-field");
const retryDom = document.querySelector(".retry-button");

const clearArrowDOM = () => {
  arrowDOMList.forEach((arrowDOM) => {
    arrowDOM.remove();
  });
  arrowDOMList = [];
};

const saveLocalStorage = (time) => {
  localStorage.setItem("ARROW_CLICK_SCORE_KEY", time);
};

const initializeTouchNumberGame = () => {
  startState = false;
  clearStage = 0;
  setTime(0);
  window.addEventListener("keydown", playGame);
  removeEventListener("click", retry);
  setArrowDOM();
};

const retry = (event) => {
  const target = event.target;
  if (target.classList.contains("retry-button")) {
    handleModalClose(initializeTouchNumberGame);
  }
};

const removeArrow = (keyCode) => {
  // 왼쪽 37 오른쪽 39
  if (keyCode === 37 && arrowDOMList[0].classList.contains("arrow-left")) {
    arrowDOMList[0].remove();
    arrowDOMList.shift();
  } else if (
    keyCode === 39 &&
    arrowDOMList[0].classList.contains("arrow-right")
  ) {
    arrowDOMList[0].remove();
    arrowDOMList.shift();
  }
  if (arrowDOMList.length <= 0) {
    setArrowDOM();
    clearStage++;
  }
  if (clearStage > 2) {
    stopTimer();
    handleModalOpen({
      isSuccess: true,
      timeString: getResultTimeString(),
    });
    const timer = getNowTime();
    const getScore = Number(localStorage.getItem("ARROW_CLICK_SCORE_KEY"));

    console.log(getScore, timer);
    if (getScore > timer) saveLocalStorage(timer);
    removeEventListener("keydown", playGame);
    window.addEventListener("click", retry);
  }
};

const playGame = (event) => {
  if (!startState) {
    startState = true;
    startTimer();
  }
  removeArrow(event.keyCode);
};

const setArrowDOM = () => {
  clearArrowDOM();
  for (let i = 0; i < MAX_ARROW; i++) {
    const direction = Math.random() < 0.5 ? "left" : "right";
    const arrowDOM = makeDOMwithProperties("span", {
      className: `arrow arrow-${direction}`,
      innerHTML: direction === "left" ? "&lt;" : "&gt;",
    });
    arrowDOMList.push(arrowDOM);
    arrowFieldDOM.appendChild(arrowDOM);
  }
};

retryDom.addEventListener("click", setArrowDOM);

window.addEventListener("keydown", playGame);

setArrowDOM();
