/* ===== CARAPAPOILS — JavaScript ===== */

// --- Header scroll behavior ---
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 60) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
  lastScroll = current;
}, { passive: true });

// --- Mobile menu toggle ---
const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('mobileNav');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = !mobileNav.hidden;
    mobileNav.hidden = isOpen;
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close when a link is clicked
  mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.hidden = true;
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- Smooth reveal on scroll ---
const revealItems = document.querySelectorAll(
  '.action-card, .support-card, .contact-card, .value-item, .about-logo-card, .quote-block'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  revealItems.forEach((el, i) => {
    el.classList.add('reveal-on-scroll');
    el.style.setProperty('--reveal-delay', `${i * 0.07}s`);
    observer.observe(el);
  });
}

// --- Filtres adoption ---
const filterBtns = document.querySelectorAll('.filter-btn');
const animalCards = document.querySelectorAll('.animal-card');
const animalsEmpty = document.getElementById('animalsEmpty');

if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active state
      filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');

      const filter = btn.dataset.filter;
      let visible = 0;

      animalCards.forEach(card => {
        const espece = card.dataset.espece;
        const show = filter === 'all' || espece === filter;
        card.hidden = !show;
        if (show) visible++;
      });

      // Affiche l'état vide si aucune carte visible
      if (animalsEmpty) {
        animalsEmpty.style.display = (visible === 0 && animalCards.length === 0) ? 'flex' : (visible === 0 ? 'flex' : 'none');
      }
    });
  });

  // Affichage initial de l'état vide
  if (animalsEmpty && animalCards.length === 0) {
    animalsEmpty.style.display = 'flex';
  } else if (animalsEmpty) {
    animalsEmpty.style.display = 'none';
  }
}

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--color-primary)';
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));
