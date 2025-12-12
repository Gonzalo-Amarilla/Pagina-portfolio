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

// Variable para optimización de scroll
let ticking = false;

// Efecto Parallax OPTIMIZADO en Hero + Navbar
function handleScroll() {
  const scrolled = window.scrollY;
  
  // Parallax del hero - Más suave y optimizado
  document.documentElement.style.setProperty('--scroll-y', `${scrolled * 0.4}px`);
  
  // Navbar efecto scrolled
  const navbar = document.getElementById("navbar");
  if (scrolled > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  
  ticking = false;
}

// Listener de scroll optimizado con requestAnimationFrame
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(handleScroll);
    ticking = true;
  }
}, { passive: true });

// Inicializar al cargar
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar parallax
  document.documentElement.style.setProperty('--scroll-y', '0px');
  
  // Activar elementos visibles al cargar
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    observer.observe(el);
    
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight * 0.85) {
      el.classList.add("active");
    }
  });
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

// AGREGAR AL FINAL DE funciones.js

// Efecto Typewriter para el subtítulo del Hero
function typewriterEffect() {
  const subtitle = document.querySelector('.hero .subtitle');
  if (!subtitle) return;
  
  const text = subtitle.textContent;
  subtitle.textContent = '';
  subtitle.style.opacity = '1';
  
  let charIndex = 0;
  const speed = 80; // Velocidad de escritura en ms
  
  function type() {
    if (charIndex < text.length) {
      subtitle.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, speed);
    } else {
      // Agregar cursor parpadeante al final
      subtitle.classList.add('typing-complete');
    }
  }
  
  // Delay antes de comenzar la animación
  setTimeout(type, 150);
}

// Modificar el DOMContentLoaded existente para incluir el typewriter
document.addEventListener("DOMContentLoaded", () => {
  // Código existente...
  document.documentElement.style.setProperty('--scroll-y', '0px');
  
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    observer.observe(el);
    
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight * 0.85) {
      el.classList.add("active");
    }
  });
  
  // AGREGAR ESTA LÍNEA
  typewriterEffect();
});