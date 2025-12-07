// Toggle menú móvil con animación mejorada
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
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      closeMenu();
    }
  });
});

// Navbar scroll effect mejorado
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Intersection Observer para animaciones suaves
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

// Observar todos los elementos con clase reveal
document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

// Efecto Parallax en Hero
const hero = document.querySelector('.hero');
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  
  if (hero && scrolled <= hero.offsetHeight) {
    const parallaxSpeed = 0.5;
    hero.style.setProperty('--scroll-y', scrolled * parallaxSpeed + 'px');
  }
  
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Inicializar al cargar
document.addEventListener("DOMContentLoaded", () => {
  // Activar elementos visibles al cargar
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight * 0.85) {
      el.classList.add("active");
    }
  });
  
  // Inicializar parallax
  hero.style.setProperty('--scroll-y', '0');
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