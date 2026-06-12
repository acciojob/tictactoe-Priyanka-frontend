const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", () => {
  const player1 = document.getElementById("player1").value;
  const player2 = document.getElementById("player2").value;

  document.querySelector(".container").innerHTML = `
    <h1>Tic Tac Toe</h1>
    <div class="message">${player1}, you're up</div>

    <div class="board">
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

  const message = document.querySelector(".message");
  const cells = document.querySelectorAll(".cell");

  let currentPlayer = player1;
  let symbol = "x";

  const board = Array(9).fill("");

  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function checkWinner() {
    return wins.some(pattern =>
      pattern.every(index => board[index] === symbol)
    );
  }

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (cell.innerText !== "") return;

      cell.innerText = symbol;
      board[index] = symbol;

      if (checkWinner()) {
        message.innerText = `${currentPlayer} congratulations you won!`;
        return;
      }

      if (symbol === "x") {
        symbol = "o";
        currentPlayer = player2;
      } else {
        symbol = "x";
        currentPlayer = player1;
      }

      message.innerText = `${currentPlayer}, you're up`;
    });
  });
});