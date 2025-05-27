const board = document.getElementById('gameBoard');
const difficultySelect = document.getElementById('difficulty');
const startBtn = document.getElementById('startBtn');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');

let timerInterval, timerSeconds;
let firstCard = null;
let lockBoard = false;
let moves = 0;

const emojis = ['🎲','🧩','🎯','🃏','♟️','🎮','👾','🕹️','📦','🧠','⚔️','🚀'];

startBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerSeconds = 0;
    moves = 0;
    timerDisplay.textContent = '00:00';
    movesDisplay.textContent = 'Ходи: 0';
    startTimer();
    const difficulty = difficultySelect.value;
    setupGame(difficulty);
});

function startTimer() {
    timerInterval = setInterval(() => {
        timerSeconds++;
        const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
        const secs = String(timerSeconds % 60).padStart(2, '0');
        timerDisplay.textContent = `${mins}:${secs}`;
    }, 1000);
}

function setupGame(level) {
    board.innerHTML = '';
    let rows, cols;
    switch (level) {
        case 'easy': rows = 2; cols = 3; break;
        case 'medium': rows = 3; cols = 4; break;
        case 'hard': rows = 4; cols = 6; break;
    }
    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    const pairs = (rows * cols) / 2;
    const chosen = shuffle([...emojis].slice(0, pairs));
    const cardsArray = shuffle([...chosen, ...chosen]);

    cardsArray.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.addEventListener('click', onCardClick);
        card.innerHTML = '❓';
        board.appendChild(card);
    });

    firstCard = null;
    lockBoard = false;
}

function onCardClick() {
    if (lockBoard || this.classList.contains('matched') || this === firstCard) return;

    this.textContent = this.dataset.emoji;
    this.classList.add('revealed');

    if (!firstCard) {
        firstCard = this;
    } else {
        moves++;
        movesDisplay.textContent = `Ходи: ${moves}`;
        if (firstCard.dataset.emoji === this.dataset.emoji) {
            firstCard.classList.add('matched');
            this.classList.add('matched');
            firstCard = null;
            checkWin();
        } else {
            lockBoard = true;
            setTimeout(() => {
                firstCard.textContent = '❓';
                this.textContent = '❓';
                firstCard.classList.remove('revealed');
                this.classList.remove('revealed');
                firstCard = null;
                lockBoard = false;
            }, 1000);
        }
    }
}

function checkWin() {
    const unmatched = document.querySelectorAll('.card:not(.matched)');
    if (unmatched.length === 0) {
        clearInterval(timerInterval);
        setTimeout(() => {
            if (confirm(`Вітаємо! Ви виграли за ${timerDisplay.textContent} і ${moves} ходів. Почати спочатку?`)) {
                startBtn.click();
            }
        }, 500);
    }
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
