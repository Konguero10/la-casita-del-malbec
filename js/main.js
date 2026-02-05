console.log("JS cargado OK");


const slides = document.querySelectorAll(".hero-carousel img");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((img, i) => {
    img.classList.remove("active");
    if (i === index) {
      img.classList.add("active");
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Cambia de imagen cada 4 segundos
setInterval(nextSlide, 4000);


// =========================
// LIGHTBOX GALERÍA CON FLECHAS
// =========================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

const galleryImages = document.querySelectorAll(".galeria-img");
let currentIndex = 0;

function setImageWithAnimation(newIndex, direction) {
  // direction: "next" o "prev"
  const outClass = direction === "next" ? "slide-in-left" : "slide-in-right";
  const inClass = direction === "next" ? "slide-in-right" : "slide-in-left";

  // Preparar imagen entrante
  lightboxImg.classList.remove("slide-active");
  lightboxImg.classList.add(inClass);

  // Pequeño delay para que el navegador aplique la clase
  setTimeout(() => {
    currentIndex = newIndex;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;

    // Forzar reflow para reiniciar animación
    lightboxImg.offsetWidth;

    // Activar animación de entrada
    lightboxImg.classList.remove("slide-in-left", "slide-in-right");
    lightboxImg.classList.add("slide-active");
  }, 20);
}

function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  lightboxImg.src = galleryImages[currentIndex].src;
  lightboxImg.alt = galleryImages[currentIndex].alt;

  // Estado inicial
  lightboxImg.classList.remove("slide-in-left", "slide-in-right");
  lightboxImg.classList.add("slide-active");
}

function showNext() {
  const newIndex = (currentIndex + 1) % galleryImages.length;
  setImageWithAnimation(newIndex, "next");
}

function showPrev() {
  const newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  setImageWithAnimation(newIndex, "prev");
}


// Abrir lightbox al hacer click en una miniatura
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    openLightbox(index);
  });
});

// Cerrar
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

// Click fuera de la imagen cierra
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}

// Flechas
if (prevBtn) prevBtn.addEventListener("click", showPrev);
if (nextBtn) nextBtn.addEventListener("click", showNext);

// Teclado (opcional, queda pro 😏)
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "Escape") lightbox.style.display = "none";
  }
});

// =========================
// SWIPE EN CELULAR (TOUCH)
// =========================
let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
  const threshold = 50; // distancia mínima para considerar swipe

  if (touchEndX < touchStartX - threshold) {
    // Swipe a la izquierda -> siguiente
    showNext();
  }

  if (touchEndX > touchStartX + threshold) {
    // Swipe a la derecha -> anterior
    showPrev();
  }
}

if (lightbox) {
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });
}

// =========================
// MENÚ MOBILE
// =========================
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

// =========================
// REVEAL ON SCROLL
// =========================
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 100;

  reveals.forEach((el) => {
    const revealTop = el.getBoundingClientRect().top;

    if (revealTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // para que cargue animado si ya está visible
