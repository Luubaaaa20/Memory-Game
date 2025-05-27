const startBtn = document.getElementById('startBtn');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const gameBoard = document.getElementById('gameBoard');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let time = 0;
let timerInterval;
let isGameRunning = false;

async function loadCards() {
    try {
        const response = await fetch('cards.json');
        if (!response.ok) throw new Error('Не вдалося завантажити cards.json');
        const data = await response.json();
        cards = [...data, ...data];
        shuffleCards();
    } catch (error) {
        console.error('Помилка завантаження карток:', error);
        cards = [
            { id: 1, name: 'Карта 1', image: 'https://via.placeholder.com/100?text=Card1' },
            { id: 2, name: 'Карта 2', image: 'https://via.placeholder.com/100?text=Card2' },
            { id: 3, name: 'Карта 3', image: 'https://via.placeholder.com/100?text=Card3' },
            { id: 4, name: 'Карта 4', image: 'https://via.placeholder.com/100?text=Card4' },
            { id: 1, name: 'Карта 1', image: 'https://via.placeholder.com/100?text=Card1' },
            { id: 2, name: 'Карта 2', image: 'https://via.placeholder.com/100?text=Card2' },
            { id: 3, name: 'Карта 3', image: 'https://via.placeholder.com/100?text=Card3' },
            { id: 4, name: 'Карта 4', image: 'https://via.placeholder.com/100?text=Card4' }
        ];
        shuffleCards();
    }
}

function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function createBoard() {
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('game__card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.index = index;
        cardElement.innerHTML = `
            <div class="game__card-inner">
                <div class="game__card-front"></div>
                <div class="game__card-back">
                    <img src="${card.image}" alt="${card.name}">
                </div>
            </div>
        `;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (!isGameRunning || flippedCards.length >= 2 || this.classList.contains('game__card--flipped')) return;
    
    const sound = new Audio('sounds/560043__andrussy44__book_flip1.wav');
    sound.play().catch(error => console.error('Помилка відтворення звуку:', error));

    this.classList.add('game__card--flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const id1 = card1.dataset.id;
    const id2 = card2.dataset.id;

    if (id1 === id2) {
        matchedPairs++;
        score += 10;
        scoreDisplay.textContent = `Бали: ${score}`;
        flippedCards = [];

        const matchSound = new Audio('sounds/386200__ldezem__match-lighting-short.wav');
        matchSound.play().catch(error => console.error('Помилка відтворення звуку:', error));

        if (matchedPairs === cards.length / 2) {
            endGame(true);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('game__card--flipped');
            card2.classList.remove('game__card--flipped');
            flippedCards = [];
        }, 1000);
    }
}

function startGame() {
    if (isGameRunning) return;
    isGameRunning = true;
    matchedPairs = 0;
    score = 0;
    time = 0;
    flippedCards = [];
    scoreDisplay.textContent = `Бали: ${score}`;
    timerDisplay.textContent = `00:00`;
    startBtn.textContent = 'Грати знову';
    loadCards().then(() => {
        createBoard();
        startTimer();
    });
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        time++;
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

function endGame(won) {
    isGameRunning = false;
    clearInterval(timerInterval);
    const message = won ? `Вітаємо! Ви виграли з ${score} балами за ${timerDisplay.textContent}!` : 'Гра закінчена!';
    alert(message);

    const winSound = new Audio('sounds/787559__interstellarcat__video-game-level-complete-sound-effect.wav');
    winSound.play().catch(error => console.error('Помилка відтворення звуку:', error));
}

startBtn.addEventListener('click', startGame);
