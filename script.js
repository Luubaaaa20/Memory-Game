const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');
const ctaButton = document.querySelector('.cta-button');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

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
});

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentSlide = i;
        showSlide(currentSlide);
    });
});

setInterval(nextSlide, 5000); // Зміна слайда кожні 5 секунд
showSlide(currentSlide);
