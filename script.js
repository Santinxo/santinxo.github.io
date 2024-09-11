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

/*

document.addEventListener("DOMContentLoaded", function() {
    // Obtener la ruta actual de la URL
    const currentPath = window.location.pathname;

    // Seleccionar todos los enlaces de navegación
    const navLinks = document.querySelectorAll(".mobile-nav-menu li a");

    // Iterar sobre los enlaces y comparar con la ruta actual
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            // Agregar clase para resaltar el enlace de la página actual
            link.classList.add("active-page");
        }
    });
});

*/