const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart-btn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

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

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.style.color = currentPlayer === 'X' ? 'blue' : 'red';

    if (checkWin()) {
        endGame(false);
        highlightWinningCells();
    } else if (isDraw()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function isDraw() {
    return gameState.every(cell => {
        return cell !== '';
    });
}

function endGame(draw) {
    if (draw) {
        statusDisplay.textContent = 'It\'s a draw!';
    } else {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    }
    gameActive = false;
}

function highlightWinningCells() {
    winningConditions.forEach(condition => {
        const [a, b, c] = condition;
        const cellA = cells[a];
        const cellB = cells[b];
        const cellC = cells[c];
        if (gameState[a] === currentPlayer && gameState[b] === currentPlayer && gameState[c] === currentPlayer) {
            cellA.classList.add('highlight');
            cellB.classList.add('highlight');
            cellC.classList.add('highlight');
        }
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '';
        cell.classList.remove('highlight');
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
