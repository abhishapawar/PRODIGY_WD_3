let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let isAIMode = false;
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const modeButton = document.getElementById('mode-button');
const themeSwitch = document.getElementById('theme-switch');
const cells = document.querySelectorAll('.cell');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    updateCell(cell, index);
    checkResult();

    if (isAIMode && isGameActive) {
        setTimeout(makeAIMove, 500);
    }
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('animate');
    setTimeout(() => cell.classList.remove('animate'), 200);
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            highlightWinningCells([a, b, c]);
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
    } else if (!board.includes('')) {
        statusDisplay.textContent = `It's a draw!`;
        isGameActive = false;
    } else {
        switchPlayer();
    }
}

function highlightWinningCells(indices) {
    indices.forEach(index => {
        document.querySelector(`.cell[data-index="${index}"]`).classList.add('winning-cell');
    });
}

function makeAIMove() {
    let availableMoves = board.map((cell, index) => (cell === '' ? index : null)).filter(index => index !== null);

    if (availableMoves.length > 0) {
        const aiMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        const cell = document.querySelector(`.cell[data-index="${aiMove}"]`);
        updateCell(cell, aiMove);
        checkResult();
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    statusDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
}

function toggleMode() {
    isAIMode = !isAIMode;
    modeButton.textContent = isAIMode ? 'Switch to Player Mode' : 'Switch to AI Mode';
    resetGame();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
modeButton.addEventListener('click', toggleMode);
themeSwitch.addEventListener('change', toggleTheme);
