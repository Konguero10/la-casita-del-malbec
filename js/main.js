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


// =========================
// FORMULARIO DE CONTACTO
// =========================
const form = document.getElementById("formContacto");
const formMensaje = document.getElementById("formMensaje");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // evita que recargue la página

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (nombre === "" || email === "" || mensaje === "") {
      formMensaje.textContent = "Por favor, completá todos los campos.";
      formMensaje.className = "form-mensaje error";
      return;
    }

    // Validación simple de email
    if (!email.includes("@")) {
      formMensaje.textContent = "Por favor, ingresá un email válido.";
      formMensaje.className = "form-mensaje error";
      return;
    }

    // Si todo está OK
    formMensaje.textContent = "¡Gracias por tu mensaje! Te responderemos a la brevedad.";
    formMensaje.className = "form-mensaje ok";

    // (Opcional) Armar mensaje para WhatsApp
    const textoWhatsApp = `Hola, soy ${nombre}. Mi email es ${email}. Quería consultar: ${mensaje}`;

    // Si querés redirigir automáticamente a WhatsApp, descomentá estas líneas:
     const telefono = "5492616403194"; // tu número
     const url = `https://wa.me/${telefono}?text=${encodeURIComponent(textoWhatsApp)}`;
     window.open(url, "_blank");

    // Limpia el formulario
    form.reset();
  });
}

document.getElementById("reservaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombreReserva").value;
  const telefono = document.getElementById("telefono").value;
  const entrada = document.getElementById("entrada").value;
  const salida = document.getElementById("salida").value;
  const personas = document.getElementById("personas").value;
  const mensaje = document.getElementById("mensajeReserva").value;

  let texto = `Hola! 👋 Quisiera hacer una reserva en La Casita del Malbec 🍷

Nombre: ${nombre}
Teléfono: ${telefono}
Entrada: ${entrada}
Salida: ${salida}
Personas: ${personas}
`;

  if (mensaje.trim() !== "") {
    texto += `\nMensaje: ${mensaje}\n`;
  }

  texto += `\nMuchas gracias!`;

  const numeroWhatsApp = "5492616403194"; // tu número con 54 + 9

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank");
});

