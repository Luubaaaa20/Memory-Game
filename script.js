const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');
const gameModal = document.getElementById('gameModal');
const closeModal = document.querySelector('.close');
const playGameBtn = document.getElementById('playGame');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        console.log(`Перехід до: ${link.textContent}`);
    });
});

playGameBtn.addEventListener('click', (e) => {
    e.preventDefault();
    gameModal.style.display = 'flex';
    loadGame();
});

closeModal.addEventListener('click', () => {
    gameModal.style.display = 'none';
    document.getElementById('gameContainer').innerHTML = '';
});

async function loadGame() {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = `
        <div class="container">
            <header>
                <h1>🎮 GameBox Memory Game</h1>
                <p>Знайди всі пари карток!</p>
            </header>
            <section class="controls">
                <button id="startBtn">Почати гру</button>
                <span id="timer">00:00</span>
                <span id="score">Бали: 0</span>
            </section>
            <section id="gameBoard" class="game-board"></section>
        </div>
    `;
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'memory-game/styles.css';
    document.head.appendChild(style);

    const script = document.createElement('script');
    script.src = 'memory-game/script.js';
    document.body.appendChild(script);
}
