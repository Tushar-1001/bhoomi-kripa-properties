/* ===================================================
   Bhoomi Kripa Properties — Main JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollAnimations();
  initNavbarShrink();
  initActiveNavLink();
  initGalleryLightbox();
  initContactForm();
  initSmoothScroll();
  initCounterAnimation();
});

/* --- Mobile Menu Toggle --- */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    // Toggle hamburger ↔ close icon
    if (menu.classList.contains('open')) {
      icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`;
    } else {
      icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`;
    }
  });

  // Close menu on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`;
    });
  });
}

/* --- Scroll-triggered Animations (IntersectionObserver) --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* --- Navbar Shrink on Scroll --- */
function initNavbarShrink() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 60) {
      navbar.classList.add('navbar-shrink');
    } else {
      navbar.classList.remove('navbar-shrink');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* --- Active Navigation Link --- */
function initActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('text-maroon', 'font-bold');
      link.classList.remove('text-darkgrey');
      // Add active indicator
      const indicator = document.createElement('span');
      indicator.className = 'absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full';
      link.style.position = 'relative';
      link.appendChild(indicator);
    }
  });
}

/* --- Gallery Lightbox --- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  // Create lightbox overlay
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img src="" alt="Gallery Image" />
  `;
  document.body.appendChild(overlay);

  const lightboxImg = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* --- Contact Form Validation --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#form-name');
    const phone = form.querySelector('#form-phone');
    const email = form.querySelector('#form-email');
    const message = form.querySelector('#form-message');
    let valid = true;

    // Reset errors
    form.querySelectorAll('.error-msg').forEach(el => el.remove());
    form.querySelectorAll('.border-red-500').forEach(el => el.classList.remove('border-red-500'));

    // Validate name
    if (!name.value.trim()) {
      showError(name, 'कृपया अपना नाम दर्ज करें');
      valid = false;
    }

    // Validate phone
    if (!phone.value.trim() || !/^[6-9]\d{9}$/.test(phone.value.trim())) {
      showError(phone, 'कृपया सही फोन नंबर दर्ज करें');
      valid = false;
    }

    // Validate email (optional but if filled, must be valid)
    if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showError(email, 'कृपया सही ईमेल दर्ज करें');
      valid = false;
    }

    // Validate message
    if (!message.value.trim()) {
      showError(message, 'कृपया अपना संदेश लिखें');
      valid = false;
    }

    if (valid) {
      // Show success message
      const successDiv = document.createElement('div');
      successDiv.className = 'bg-emerald/10 border border-emerald text-emerald rounded-lg p-4 mt-4 anim-fade-in-up';
      successDiv.innerHTML = `
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
          <span class="font-semibold">धन्यवाद! आपका संदेश सफलतापूर्वक भेजा गया।</span>
        </div>
        <p class="text-sm mt-1">हम जल्द ही आपसे संपर्क करेंगे।</p>
      `;
      form.appendChild(successDiv);
      form.reset();

      setTimeout(() => successDiv.remove(), 5000);
    }
  });

  function showError(input, message) {
    input.classList.add('border-red-500');
    const err = document.createElement('p');
    err.className = 'error-msg text-red-500 text-sm mt-1';
    err.textContent = message;
    input.parentElement.appendChild(err);
  }
}

/* --- Smooth Scrolling for Anchor Links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --- Counter Animation --- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count, 10);
        const suffix = counter.dataset.suffix || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.floor(current) + suffix;
        }, 16);

        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}
