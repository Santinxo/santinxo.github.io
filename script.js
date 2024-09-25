function toggleMenu() {
    const menu = document.querySelector(".mobile-nav-menu");
    const hamburgerButton = document.querySelector(".hamburger");

    if (menu.style.display === "flex") {
        menu.style.display = "none";
        hamburgerButton.setAttribute("aria-expanded", "false");
    } else {
        menu.style.display = "flex";
        hamburgerButton.setAttribute("aria-expanded", "true");
    }
}

window.addEventListener("resize", function() {
    const menu = document.querySelector(".mobile-nav-menu");

    if (window.innerWidth > 618) {
        menu.style.display = "none";
        document.querySelector(".hamburger").setAttribute("aria-expanded", "false");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;

    const navLinks = document.querySelectorAll(".nav-menu ul li a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active-page");
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {

    let currentPath = window.location.pathname.replace(/\/$/, '');
    console.log("Current Path:", currentPath);

    const navLinks = document.querySelectorAll(".mobile-nav-menu li a");

    navLinks.forEach(link => {
        let linkPath = link.getAttribute("href").replace(/\/$/, '');
        console.log("Link Path:", linkPath);

        if (currentPath === linkPath) {
            link.classList.add("active-page");
        }
    });
});

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
let autoSlideInterval;

function showSlide(index) {
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }

    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    updateIndicators();
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function createIndicators() {
    const sliderContainer = document.querySelector('.slider-container');
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.classList.add('indicators');

    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        indicator.addEventListener('click', () => {
            showSlide(index); 
            resetAutoSlide();
        });
        indicatorsContainer.appendChild(indicator);
    });

    sliderContainer.appendChild(indicatorsContainer);
    updateIndicators();
}

function autoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlide();
}

document.addEventListener('DOMContentLoaded', () => {
    createIndicators();
    showSlide(0);
    autoSlide();

    document.querySelector('.prev').addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    document.querySelector('.next').addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
});
