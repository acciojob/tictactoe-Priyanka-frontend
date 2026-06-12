const submitBtn = document.getElementById("submit");
const container = document.querySelector(".container");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let board = Array(9).fill("");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  currentPlayer = player1;

  container.innerHTML = `
    <h1>Tic Tac Toe</h1>
    <div class="message">${player1}, you're up</div>
    <div id="board">
      <div class="cell" id="1"></div>
      <div class="cell" id="2"></div>
      <div class="cell" id="3"></div>
      <div class="cell" id="4"></div>
      <div class="cell" id="5"></div>
      <div class="cell" id="6"></div>
      <div class="cell" id="7"></div>
      <div class="cell" id="8"></div>
      <div class="cell" id="9"></div>
    </div>
  `;

  const cells = document.querySelectorAll(".cell");
  const message = document.querySelector(".message");

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (cell.textContent !== "") return;

      cell.textContent = currentSymbol;
      board[index] = currentSymbol;

      if (checkWinner(currentSymbol)) {
        message.textContent = `${currentPlayer} congratulations you won!`;
        return;
      }

      if (board.every(cell => cell !== "")) {
        message.textContent = "It's a draw!";
        return;
      }

      if (currentSymbol === "X") {
        currentSymbol = "O";
        currentPlayer = player2;
      } else {
        currentSymbol = "X";
        currentPlayer = player1;
      }

      message.textContent = `${currentPlayer}, you're up`;
    });
  });
});

function checkWinner(symbol) {
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === symbol)
  );
}
