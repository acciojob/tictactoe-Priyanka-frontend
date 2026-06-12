// Game state
let currentPlayer = 1;
let player1Name = '';
let player2Name = '';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Get DOM elements
const submitBtn = document.getElementById('submit');
const inputSection = document.getElementById('inputSection');
const gameSection = document.getElementById('gameSection');
const messageDiv = document.querySelector('.message');
const resetBtn = document.getElementById('resetBtn');
const cells = document.querySelectorAll('.cell');

// Event listeners
submitBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
cells.forEach(cell => {
    cell.addEventListener('click', cellClicked);
});

// Start the game
function startGame() {
    player1Name = document.getElementById('player1').value.trim();
    player2Name = document.getElementById('player2').value.trim();

    if (!player1Name || !player2Name) {
        alert('Please enter names for both players!');
        return;
    }

    // Hide input section and show game section
    inputSection.style.display = 'none';
    gameSection.style.display = 'block';

    // Reset game state
    currentPlayer = 1;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    // Clear cells
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });

    // Show whose turn is
    updateMessage();
}

// Update message
function updateMessage() {
    const currentPlayerName = currentPlayer === 1 ? player1Name : player2Name;
    messageDiv.textContent = `${currentPlayerName}, you're up`;
}

// Handle cell click
function cellClicked(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.id) - 1;

    // Check if cell is already filled or game is not active
    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }

    // Update game board
    const symbol = currentPlayer === 1 ? 'x' : 'o';
    gameBoard[cellIndex] = symbol;

    // Update UI
    cell.textContent = symbol;
    cell.classList.add(symbol);

    // Check for win
    if (checkWin()) {
        const winnerName = currentPlayer === 1 ? player1Name : player2Name;
        messageDiv.textContent = `${winnerName} congratulations you won!`;
        gameActive = false;
        return;
    }

    // Check for draw
    if (checkDraw()) {
        messageDiv.textContent = `It's a draw!`;
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateMessage();
}

// Check for win
function checkWin() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (
            gameBoard[a] !== '' &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            return true;
        }
    }
    return false;
}

// Check for draw
function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

// Reset game
function resetGame() {
    currentPlayer = 1;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });

    updateMessage();
}
