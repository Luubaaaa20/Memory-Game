const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');
const ctaButton = document.querySelector('.cta-button');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.href.includes('memory-game')) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            console.log(`Перехід до: ${link.textContent}`);
        }
    });
});

ctaButton.addEventListener('click', () => {
    console.log('Перехід до каталогу');
    // Заглушка для каталогу, буде реалізовано іншим членом команди
});
