/* Cambiar clase "active" on click + on scroll */

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navegador a, .navegador-movil a");
    const sections = document.querySelectorAll("section");
    let scrollingManually = false; // Bandera para indicar si estamos en desplazamiento manual

    // Función para cambiar la clase "active" en el enlace correspondiente
    function changeActiveLink(targetId) {
        navLinks.forEach(link => {
            link.classList.toggle("activo", link.getAttribute("href") === `#${targetId}`);
        });
    }

    // Configuración del IntersectionObserver
    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        // No cambia la clase "active" si estamos en desplazamiento manual
        if (scrollingManually) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                changeActiveLink(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Función de desplazamiento suave
    function smoothScroll(event) {
        event.preventDefault();
        scrollingManually = true; // Activamos el modo manual
        const targetId = event.currentTarget.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        // Desconectamos el observer temporalmente para evitar conflictos
        observer.disconnect();

        // Desplazamiento suave
        targetSection.scrollIntoView({ behavior: "smooth" });

        // Reactivamos el observer después de un breve tiempo
        setTimeout(() => {
            scrollingManually = false; // Desactivamos el modo manual
            sections.forEach(section => observer.observe(section)); // Reactivamos el observer
        }, 800); // Ajusta el tiempo si es necesario según la velocidad de desplazamiento
    }

    // Agrega el evento de click para desplazamiento suave a cada enlace
    navLinks.forEach(link => link.addEventListener("click", smoothScroll));
});

/* Slider */

document.addEventListener("DOMContentLoaded", function () {
    // Obtener todos los sliders de las secciones
    const sliders = document.querySelectorAll(".slider");

    // Configurar cada slider
    sliders.forEach(slider => {
        let currentSlide = 0;
        const slides = slider.querySelectorAll(".slide");
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove("active"));
            slides[index].classList.add("active");
        }

        function moveSlide(n) {
            currentSlide = (currentSlide + n + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        // Botones de control
        slider.querySelector(".prev").addEventListener("click", () => moveSlide(-1));
        slider.querySelector(".next").addEventListener("click", () => moveSlide(1));

        // Mostrar la primera diapositiva
        showSlide(currentSlide);
    });
});

/* Despliega el menú para móviles */

function toggleMenu() {
    const menu = document.querySelector(".navegador-movil");
    const hamburgerButton = document.querySelector(".hamburger");

    if (menu.style.display === "flex") {
        menu.style.display = "none";
        hamburgerButton.innerHTML = "&#9776;"; // Restaurar a hamburguesa
        hamburgerButton.setAttribute("aria-expanded", "false");
    } else {
        menu.style.display = "flex";
        hamburgerButton.innerHTML = "&#88;"; // Cambiar a "X" al abrir el menú
        hamburgerButton.setAttribute("aria-expanded", "true");
    }
}

/* Cierra el menú para móviles al clickear un link */

const movileMenuLinks = document.querySelectorAll(".navegador-movil a");
movileMenuLinks.forEach(link => {
    link.addEventListener("click", () => {
        const menu = document.querySelector(".navegador-movil");
        menu.style.display = "none";
        document.querySelector(".hamburger").innerHTML = "&#9776;"; // Restaurar hamburguesa
        document.querySelector(".hamburger").setAttribute("aria-expanded", "false");
    });
});

/* Cierra el menú para móviles y restaura la hamburguesa */

window.addEventListener("resize", function() {
    const menu = document.querySelector(".navegador-movil");
    const hamburgerButton = document.querySelector(".hamburger");

    if (window.innerWidth > 618) {
        menu.style.display = "none";
        hamburgerButton.innerHTML = "&#9776;"; // Restaurar hamburguesa
        hamburgerButton.setAttribute("aria-expanded", "false");
    }
});

/* Desplazamiento de las slides con el dedo en dispositivos móviles */

document.addEventListener("DOMContentLoaded", function () {
    // Obtener todos los sliders de las secciones
    const sliders = document.querySelectorAll(".slider");

    sliders.forEach(slider => {
        let currentSlide = 0;
        const slides = slider.querySelectorAll(".slide");
        const totalSlides = slides.length;
        let startX = 0;
        let endX = 0;

        // Mostrar la diapositiva en función del índice
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove("active"));
            slides[index].classList.add("active");
        }

        // Mover a la siguiente o anterior diapositiva
        function moveSlide(n) {
            currentSlide = (currentSlide + n + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        // Detectar el inicio del toque
        slider.addEventListener("touchstart", function (e) {
            startX = e.touches[0].clientX;
        });

        // Detectar el final del toque y determinar la dirección del deslizamiento
        slider.addEventListener("touchend", function (e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        // Manejar el deslizamiento
        function handleSwipe() {
            const swipeThreshold = 50; // Umbral mínimo de deslizamiento en píxeles

            if (Math.abs(startX - endX) > swipeThreshold) {
                if (endX < startX) {
                    // Deslizamiento hacia la izquierda
                    moveSlide(1);
                } else {
                    // Deslizamiento hacia la derecha
                    moveSlide(-1);
                }
            }
        }

        // Botones de control (si los tienes en tu HTML)
        const prevButton = slider.querySelector(".prev");
        const nextButton = slider.querySelector(".next");
        if (prevButton && nextButton) {
            prevButton.addEventListener("click", () => moveSlide(-1));
            nextButton.addEventListener("click", () => moveSlide(1));
        }

        // Mostrar la primera diapositiva
        showSlide(currentSlide);
    });
});
