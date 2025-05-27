const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');
const ctaButton = document.querySelector('.cta-button');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const slider = document.querySelector('.slider');
const slidesContainer = document.querySelector('.slides');
let currentSlide = 0;
let autoSlideInterval;

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length; // Уникаємо негативних індексів
    slidesContainer.style.transform = `translateX(-${currentSlide * 100 / slides.length}%)`;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startAutoSlide() {
    stopAutoSlide(); // Очищаємо попередній інтервал
    autoSlideInterval = setInterval(nextSlide, 4000); // Зміна кожні 4 секунди
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

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
    alert('Ознайомтесь із каталогом GameBox!');
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        showSlide(i);
    });
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide(); // Перезапуск після ручної зміни
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide(); // Перезапуск після ручної зміни
});

slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

document.querySelectorAll('.slide-button').forEach(btn => {
    btn.addEventListener('click', () => alert('Перейдіть до каталогу для деталей!'));
});

startAutoSlide();
showSlide(currentSlide);
