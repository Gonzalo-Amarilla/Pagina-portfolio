// Toggle menu móvil con animación mejorada
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector(".menu-toggle");
  
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
  
  // Prevenir scroll cuando el menú está abierto
  if (navLinks.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

function closeMenu() {
  document.getElementById("navLinks").classList.remove("active");
  document.querySelector(".menu-toggle").classList.remove("active");
  document.body.style.overflow = "";
}

// Scroll suave mejorado
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Ajuste para navbar fijo
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      closeMenu(); // Cerrar menú después de click
    }
  });
});

// Navbar scroll effect mejorado
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});
// Scroll reveal animation mejorada - activación más temprana
function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element, index) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 50; // Reducido de 100 a 50 para activación más temprana

    if (elementTop < windowHeight - elementVisible) {
      setTimeout(() => {
        element.classList.add("active");
      }, index * 50); // Reducido de 100 a 50 para cascada más rápida
    }
  });
}

// Throttle para mejor rendimiento
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      reveal();
      ticking = false;
    });
    ticking = true;
  }
});

// Inicializar al cargar
document.addEventListener("DOMContentLoaded", () => {
  reveal();
  
  // Animación inicial del hero
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    setTimeout(() => {
      heroContent.style.opacity = "1";
    }, 100);
  }
  
  // Activar reveals visibles al cargar
  setTimeout(() => {
    reveal();
  }, 200);
});

// Cerrar menú al hacer click fuera
document.addEventListener("click", (e) => {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector(".menu-toggle");
  
  if (navLinks.classList.contains("active") && 
      !navLinks.contains(e.target) && 
      !menuToggle.contains(e.target)) {
    closeMenu();
  }
});