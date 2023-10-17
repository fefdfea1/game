import { makeDOMwithProperties } from "../utils/dom.js";
import { handleModalOpen } from "../utils/module.js";
import {
  isGameStart,
  setTime,
  startTimer,
  stopTimer,
  getResultTimeString,
  getNowTime,
} from "../utils/timer.js";
let boxDOMList = [];
let wallBoxDOMList = [];
let startBoxDOM = null;
let endBoxDOM = null;

const gameFieldDOM = document.getElementById("game-field");

export const initMouseControlGame = () => {
  startBoxDOM.innerHTML = "시작";
  endBoxDOM.innerHTML = "끝";
  boxDOMList.forEach((boxDom) => {
    boxDom.style.backgroundColor = "transparent";
  });
  stopTimer();
  setTime(0);
};
const handlesuccessGame = () => {
  stopTimer();

  handleModalOpen({
    isSuccess: true,
    timeString: getResultTimeString(),
  });

  const nowScoreTime = getNowTime();
  const currentSpendTime = localStorage.getItem("MOUSE_CONTROL_SCORE_KEY");
  if (!currentSpendTime || Number(currentSpendTime) > nowScoreTime) {
    localStorage.setItem("MOUSE_CONTROL_SCORE_KEY", nowScoreTime);
  }

  setTime(0);
};

const handleFailedGame = () => {
  stopTimer();
  handleModalOpen({
    isSuccess: false,
    timeString: getResultTimeString(),
  });

  setTime(0);
};

export const setBoxDom = ({ row, col, start, end, walls }) => {
  const controlBoxcontainer = makeDOMwithProperties("div", {
    id: "control-box-container",
    onmouseleave: () => {
      if (!isGameStart) return;
      handleFailedGame();
    },
  });

  controlBoxcontainer.style.display = "grid";
  controlBoxcontainer.style.gridTemplateRows = `repeat(${row},1fr)`;
  controlBoxcontainer.style.display = `repeat(${col})`;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const {
        type,
        className,
        innerHTML = "",
        onmouseover,
      } = (function () {
        if (i === start[0] && j === start[1]) {
          return {
            type: "start",
            className: "control-box start",
            innerHTML: "시작",
            onmouseover: (e) => {
              startTimer(handleFailedGame);

              e.target.innerHTML = "";
            },
          };
        }
        if (i === end[0] && j === end[1]) {
          return {
            type: "end",
            className: "control-box end",
            innerHTML: "끝",
            onmouseover: (e) => {
              if (!isGameStart) return;
              e.target.innerHTML = "";
              handlesuccessGame();
            },
          };
        }
        for (let wall of walls) {
          if (i === wall[0] && j === wall[1]) {
            return {
              type: "wall",
              className: " control-box wall",
              onmouseover: () => {
                if (!isGameStart) return;
                handleFailedGame();
              },
            };
          }
        }
        return {
          type: "normal",
          className: "control-box",
          onmouseover: (e) => {
            if (!isGameStart) return;
            e.target.style.background = "linen";
          },
        };
      })();
      const boxDOM = makeDOMwithProperties("div", {
        className,
        innerHTML,
        id: `box-${i}-${j}`,
        onmouseover,
      });

      switch (type) {
        case "start":
          startBoxDOM = boxDOM;
          break;
        case "end":
          endBoxDOM = boxDOM;
          break;
        case "wall":
          wallBoxDOMList.push(boxDOM);
          break;
        default:
          boxDOMList.push(boxDOM);
      }

      controlBoxcontainer.appendChild(boxDOM);
    }
  }

  gameFieldDOM.appendChild(controlBoxcontainer);
};
