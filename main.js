/*Variables*/
let player1 = true;
let player2 = false;
let array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const reload = document.querySelector(".reload");
const items = document.getElementsByTagName("div");
const itemsArray = Array.prototype.slice.call(items);
const h1Winner = document.querySelector(".winner-1");
const h2Winner = document.querySelector(".winner-2");
const play = document.querySelector(".play");
const player2Circle = document.querySelector(".player2-circle");
const player1Circle = document.querySelector(".player1-circle");

/*Eventos*/
play.addEventListener("click", randomPlayerStart);
reload.addEventListener("click", reloadPage);

/*Functions*/
function randomPlayerStart() {
  let starterPlayer = Math.floor(Math.random() * 2 + 1);
  if (starterPlayer == 1) {
    managePlayerStatus(true);
    stylePlayerTurn(true);
  } else {
    managePlayerStatus(false);
    stylePlayerTurn(false);
  }
}

function reloadPage() {
  window.location.reload(true);
}

function stylePlayerTurn(boolean) {
  play.style.display = "none";
  reload.style.display = "flex";
  if (boolean) {
    player1Circle.style.color = "red";
    player2Circle.style.color = "gray";
  } else {
    player1Circle.style.color = "gray";
    player2Circle.style.color = "red";
  }
}

function display(item) {
  let v;
  if (player1) {
    v = "X";
    item.innerHTML = v;
    stylePlayerTurn(false);
    changeTurn(true);
  } else {
    v = "O";
    item.innerHTML = v;
    stylePlayerTurn(true);
    changeTurn(false);
  }
  evaluateGame(item, v);
  disableItem(item);
}

function disableItem(item) {
  item.onclick = "null";
}

function changeTurn(player) {
  if (player) {
    managePlayerStatus(false);
  } else {
    managePlayerStatus(true);
  }
}

function managePlayerStatus(boolean) {
  player1 = boolean;
  player2 = !boolean;
}

function evaluateGame(item, value) {
  let i = parseInt(item.id) - 1;
  array[i] = value;
  if (horizontalLine() || verticalLine() || diagonalLine()) {
    setWinner(true);
  } else if (draw()) {
    setWinner(false);
  }
}

function setWinner(boolean) {
  if (boolean) {
    if (player1) {
      player1Circle.style.color = "gray";
      player2Circle.style.color = "#b6b901";
      h2Winner.innerHTML = "WINNER";
    } else {
      player1Circle.style.color = "#b6b901";
      player2Circle.style.color = "gray";
      h1Winner.innerHTML = "WINNER";
    }
  } else {
    player1Circle.style.color = "gray";
    player2Circle.style.color = "gray";
    h1Winner.innerHTML = "DRAW";
    h2Winner.innerHTML = "DRAW";
  }

  disableGameScreen();
}

function disableGameScreen() {
  itemsArray.forEach((element) => {
    element.onclick = "null";
  });
}

function horizontalLine() {
  let boolean;
  if (
    (array[0] == array[1] && array[0] == array[2] && array[0] != 0) ||
    (array[3] == array[4] && array[3] == array[5] && array[3] != 0) ||
    (array[6] == array[7] && array[6] == array[8] && array[6] != 0)
  ) {
    boolean = true;
  } else {
    boolean = false;
  }
  return boolean;
}

function verticalLine() {
  let boolean;
  if (
    (array[0] == array[3] && array[0] == array[6] && array[0] != 0) ||
    (array[1] == array[4] && array[1] == array[7] && array[1] != 0) ||
    (array[2] == array[5] && array[2] == array[8] && array[2] != 0)
  ) {
    boolean = true;
  } else {
    boolean = false;
  }
  return boolean;
}

function diagonalLine() {
  let boolean;
  if (
    (array[0] == array[4] && array[0] == array[8] && array[0] != 0) ||
    (array[2] == array[4] && array[2] == array[6] && array[2] != 0)
  ) {
    boolean = true;
  } else {
    boolean = false;
  }
  return boolean;
}

function draw() {
  let boolean = false;
  if (!array.includes(0)) {
    boolean = true;
  }
  return boolean;
}
