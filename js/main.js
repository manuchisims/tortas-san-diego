// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== HERO SLIDER =====
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let current = 0;
let sliderTimer;

function goToSlide(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function nextSlide() { goToSlide(current + 1); }

function startSlider() {
  sliderTimer = setInterval(nextSlide, 5000);
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(sliderTimer);
    goToSlide(parseInt(dot.dataset.index));
    startSlider();
  });
});

startSlider();

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .sabor-card, .gallery-item');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => {
  if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
    el.classList.add('reveal');
  }
  revealObserver.observe(el);
});

// ===== FILTROS DE GALERÍA =====
function setupGallery(tabsSelector, itemsSelector, allTabValue) {
  const tabs = document.querySelectorAll(tabsSelector);
  const items = document.querySelectorAll(itemsSelector);
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.tab;
      items.forEach(item => {
        item.classList.toggle('hidden', filter !== allTabValue && item.dataset.cat !== filter);
      });
    });
  });
}

setupGallery('[data-gallery="adultos"] .tab', '.gallery-item.adultos', 'todas-adultos');
setupGallery('[data-gallery="jovenes"] .tab', '.gallery-item.jovenes', 'todas-jovenes');

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

// Recopilar todas las imágenes de galería visibles
let galleryImages = [];
let lightboxIndex = 0;

function buildImageList() {
  galleryImages = Array.from(document.querySelectorAll('.gallery-item:not(.hidden) img'));
}

function openLightbox(img) {
  buildImageList();
  lightboxIndex = galleryImages.indexOf(img);
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

function showLightboxImage(index) {
  buildImageList();
  lightboxIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[lightboxIndex].src;
  lightboxImg.alt = galleryImages[lightboxIndex].alt;
}

// Click en fotos de galería
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => openLightbox(img));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => showLightboxImage(lightboxIndex - 1));
lightboxNext.addEventListener('click', () => showLightboxImage(lightboxIndex + 1));

// Cerrar con Escape o clic en fondo
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showLightboxImage(lightboxIndex - 1);
  if (e.key === 'ArrowRight') showLightboxImage(lightboxIndex + 1);
});
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
