const hamburger = document.querySelector('.navbar__hamburger');
const navMenu = document.querySelector('.navbar__links');
const navLinks = document.querySelectorAll('.navbar__link');
const ctaButton = document.querySelector('.hero__button');
const slides = document.querySelectorAll('.slider__slide');
const dots = document.querySelectorAll('.slider__dot');
const prevBtn = document.querySelector('.slider__prev');
const nextBtn = document.querySelector('.slider__next');
const slider = document.querySelector('.slider');
const slidesContainer = document.querySelector('.slider__slides');
let currentSlide = 0;
let autoSlideInterval;

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('navbar__links--active');
});

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100 / slides.length}%)`;
    slides.forEach((slide, i) => slide.classList.toggle('slider__slide--active', i === currentSlide));
    dots.forEach((dot, i) => dot.classList.toggle('slider__dot--active', i === currentSlide));
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.href.includes('index.html')) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('navbar__link--active'));
            link.classList.add('navbar__link--active');
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
    startAutoSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

document.querySelectorAll('.slider__button').forEach(btn => {
    btn.addEventListener('click', () => alert('Перейдіть до каталогу для деталей!'));
});

startAutoSlide();
showSlide(currentSlide);
