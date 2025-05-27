const board = document.getElementById('gameBoard');
const difficultySelect = document.getElementById('difficulty');
const startBtn = document.getElementById('startBtn');
const timerDisplay = document.getElementById('timer');

let timerInterval, timerSeconds;
let countdownInterval, countdownSeconds;
let firstCard = null;
let lockBoard = false;

const emojis = ['🎲','🧩','🎯','🃏','♟️','🎮','👾','🕹️','📦','🧠','⚔️','🚀'];

// Звукові ефекти
const soundOpen = new Audio('https://freesound.org/data/previews/341/341695_5260877-lq.mp3');
const soundMatch = new Audio('https://freesound.org/data/previews/109/109662_945474-lq.mp3');
const soundWin = new Audio('https://freesound.org/data/previews/276/276033_5121236-lq.mp3');

// Тайми для рівнів у секундах
const levelTimes = {
    easy: 10,
    medium: 20,
    hard: 90
};

// Пройдені рівні з localStorage
let completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || {
    easy: false,
    medium: false,
    hard: false
};

function updateDifficultyOptions() {
    if (!completedLevels.easy) {
        difficultySelect.value = 'easy';
        difficultySelect.querySelector('option[value="medium"]').disabled = true;
        difficultySelect.querySelector('option[value="hard"]').disabled = true;
    } else if (!completedLevels.medium) {
        difficultySelect.value = 'medium';
        difficultySelect.querySelector('option[value="medium"]').disabled = false;
        difficultySelect.querySelector('option[value="hard"]').disabled = true;
    } else {
        difficultySelect.value = 'hard';
        difficultySelect.querySelector('option[value="medium"]').disabled = false;
        difficultySelect.querySelector('option[value="hard"]').disabled = false;
    }
}

updateDifficultyOptions();

startBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    clearInterval(countdownInterval);
    timerSeconds = 0;
    timerDisplay.textContent = '00:00';
    startTimer();
    startCountdown(difficultySelect.value);
    setupGame(difficultySelect.value);
});

function startCountdown(level) {
    countdownSeconds = levelTimes[level];
    updateCountdownDisplay();
    countdownInterval = setInterval(() => {
        countdownSeconds--;
        updateCountdownDisplay();
        if (countdownSeconds <= 0) {
            clearInterval(countdownInterval);
            alert('Час вийшов! Спробуйте ще раз.');
            setupGame(level);  // Перезапускаємо рівень
            startCountdown(level);
        }
    }, 1000);
}

function updateCountdownDisplay() {
    const mins = String(Math.floor(countdownSeconds / 60)).padStart(2, '0');
    const secs = String(countdownSeconds % 60).padStart(2, '0');
    timerDisplay.textContent = `${mins}:${secs}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timerSeconds++;
        const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
        const secs = String(timerSeconds % 60).padStart(2, '0');
        // Загальний таймер гри (можна сховати, якщо не потрібен)
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

    soundOpen.play();

    this.textContent = this.dataset.emoji;
    this.classList.add('revealed');

    if (!firstCard) {
        firstCard = this;
    } else {
        if (firstCard.dataset.emoji === this.dataset.emoji) {
            soundMatch.play();

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
        clearInterval(countdownInterval);

        soundWin.play();

        setTimeout(() => {
            alert(`Вітаємо! Ви пройшли рівень ${difficultySelect.value}!`);
            completedLevels[difficultySelect.value] = true;
            localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
            updateDifficultyOptions();

            // Автоматичний перехід на наступний рівень, якщо є
            if (difficultySelect.value === 'easy' && !completedLevels.medium) {
                difficultySelect.value = 'medium';
            } else if (difficultySelect.value === 'medium' && !completedLevels.hard) {
                difficultySelect.value = 'hard';
            }

            // Якщо всі рівні пройдені — показати промокод
            if (completedLevels.easy && completedLevels.medium && completedLevels.hard) {
                alert('Ви пройшли всі рівні! Ваш промокод на знижку: GAMEBOX2025');
            } else {
                startBtn.click(); // Автоматично стартує наступний рівень
            }
        }, 500);
    }
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
