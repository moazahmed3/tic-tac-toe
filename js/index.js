const board = document.querySelector(".board");
let currentPlayer = "X";
let arrCases = new Array(9).fill(null);
let gameOver = false;
let currentPlayerSpan = document.querySelector("#current-player");

displayDivs();

function displayDivs() {
  let divs = "";
  for (let i = 0; i < 9; i++) {
    divs += `<div class='cell' onclick='draw(${i})' data-index="${i}"></div>`;
  }
  board.innerHTML = divs;
  // Reset game state
  arrCases = new Array(9).fill(null);
  currentPlayer = "X";
  currentPlayerSpan.innerHTML = currentPlayer;
  gameOver = false;
}

function draw(index) {
  if (gameOver) return;

  const target = document.querySelector(`.cell[data-index="${index}"]`);
  if (target.innerHTML) return;

  arrCases[index] = currentPlayer;
  target.innerHTML = currentPlayer;
  target.classList.add(`player-${currentPlayer.toLowerCase()}`);

  checkWinner();

  if (!gameOver) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayerSpan.innerHTML = currentPlayer;
  }
}

function checkWinner() {
  const winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winCases) {
    const [a, b, c] = combo;
    if (
      arrCases[a] &&
      arrCases[a] === arrCases[b] &&
      arrCases[b] === arrCases[c]
    ) {
      alert(`${arrCases[a]} wins!`);
      gameOver = true;
      setTimeout(displayDivs, 1000); // small delay before reset
      return;
    }
  }

  const isDraw = arrCases.every((cell) => cell === "X" || cell === "O");
  if (isDraw) {
    alert("It's a draw!");
    gameOver = true;
    setTimeout(displayDivs, 1000);
  }
}
