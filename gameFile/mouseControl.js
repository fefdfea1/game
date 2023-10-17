import {
  setBoxDom,
  initMouseControlGame,
} from "/../module/mouseContrilModule.js";
import { handleModalClose } from "/../utils/module.js";

const initialize = () => {
  //modal의 버튼을 세팅
  //retryButton에 게임 상태를 원복하는 함수를 실행
  const retryButton = document.getElementsByClassName("retry-button")[0];

  retryButton.onclick = () => {
    handleModalClose(initMouseControlGame);
    //게임상태원복
  };
};

setBoxDom({
  row: 5,
  col: 5,
  start: [0, 0],
  end: [4, 4],
  walls: [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
  ],
});

initialize();
