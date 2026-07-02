/* ============================================
   AURUM — Main Application Entry
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Application Features
  initPreloader();
  initThemeToggle();
  initAccordion();
  initFilterTabs();
  initBackToTop();
  init3dTilt();
  initAccessibilityControls();
  initAudioToggle();
  initReservationWidget();
  initNewsletterForm();
});

/**
 * 1. Brand Preloader Fade-out
 */
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    // Hide after page load or at least 1.8 seconds to display brand animation
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 800);
    });

    // Timeout safety fallback
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2500);
  }
}

/**
 * 2. Dark / Light Theme Swapping
 */
function initThemeToggle() {
  const toggleBtn = document.querySelector('.theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = getLocalStorage('theme', 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    setLocalStorage('theme', newTheme);
    updateThemeIcon(newTheme);
    
    showToast('info', 'Theme Updated', `Switched to ${newTheme} mode.`, 2000);
  });
}

function updateThemeIcon(theme) {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  
  if (theme === 'light') {
    // Show Moon Icon SVG for dark mode option
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    btn.setAttribute('aria-label', 'Switch to dark theme');
  } else {
    // Show Sun Icon SVG for light mode option
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    btn.setAttribute('aria-label', 'Switch to light theme');
  }
}

/**
 * 3. Accordion Expand/Collapse
 */
function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const accordion = item.parentElement;
      const isActive = item.classList.contains('active');

      // Close all items in this accordion
      accordion.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-content').style.maxHeight = null;
        i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        const content = item.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * 4. Tab and Card Filtering (Standard Page Lists)
 */
function initFilterTabs() {
  const filterContainers = document.querySelectorAll('[data-filter-grid]');
  filterContainers.forEach(container => {
    const gridId = container.dataset.filterGrid;
    const grid = document.querySelector(`#${gridId}`);
    const tabs = container.querySelectorAll('.filter-tab');
    
    if (!grid) return;
    const cards = grid.querySelectorAll('[data-category]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterValue = tab.dataset.filter;

        cards.forEach(card => {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            if (filterValue === 'all' || card.dataset.category.includes(filterValue)) {
              card.style.display = '';
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              }, 50);
            } else {
              card.style.display = 'none';
            }
          }, 300);
        });
      });
    });
  });
}

/**
 * 5. Back to Top Button
 */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, 100));

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 6. Interactive 3D Tilt Effect on Food Cards
 */
function init3dTilt() {
  const cards = document.querySelectorAll('.hover-tilt');
  if (window.innerWidth <= 1024) return; // Disable on tablet/mobile for performance

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = -(y - centerY) / 12; // tilt amount max 15 deg
      const rotateY = (x - centerX) / 12;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/**
 * 7. Accessibility Controls
 */
function initAccessibilityControls() {
  // Font Size Resizer and Contrast Toggle
  let fontSizeIndex = 0;
  const sizes = ['100%', '110%', '120%'];
  
  const createA11yMenu = () => {
    const menu = document.createElement('div');
    menu.className = 'a11y-controls';
    menu.innerHTML = `
      <button class="a11y-btn font-size" title="Adjust text size" aria-label="Adjust text size">A+</button>
      <button class="a11y-btn contrast" title="Contrast toggle" aria-label="Contrast toggle">◐</button>
    `;
    
    // Floating layout
    document.body.appendChild(menu);

    // Apply inline style to container
    Object.assign(menu.style, {
      position: 'fixed',
      top: '50%',
      right: '10px',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      zIndex: '300'
    });

    // Style buttons
    menu.querySelectorAll('.a11y-btn').forEach(btn => {
      Object.assign(btn.style, {
        width: '36px',
        height: '36px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '50%',
        color: 'var(--text-accent)',
        fontWeight: 'bold',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)',
        cursor: 'pointer',
        transition: 'all 0.3s'
      });
    });

    menu.querySelector('.font-size').addEventListener('click', () => {
      fontSizeIndex = (fontSizeIndex + 1) % sizes.length;
      document.documentElement.style.fontSize = sizes[fontSizeIndex];
      showToast('info', 'Text Size', `Font scale updated to ${sizes[fontSizeIndex]}.`, 1500);
    });

    menu.querySelector('.contrast').addEventListener('click', () => {
      const mode = document.body.classList.toggle('high-contrast');
      if (mode) {
        showToast('info', 'Contrast', 'High contrast mode enabled.', 1500);
      } else {
        showToast('info', 'Contrast', 'Standard contrast restored.', 1500);
      }
    });
  };
  
  createA11yMenu();
}

/**
 * 8. Ambient Music Toggle
 */
function initAudioToggle() {
  const musicToggle = document.createElement('button');
  musicToggle.className = 'music-toggle';
  musicToggle.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  `;
  
  Object.assign(musicToggle.style, {
    position: 'fixed',
    bottom: '24px',
    left: '80px',
    width: '48px',
    height: '48px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '50%',
    color: 'var(--color-gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-md)',
    zIndex: '200',
    cursor: 'pointer',
    transition: 'all var(--transition-base)'
  });

  document.body.appendChild(musicToggle);

  let isPlaying = false;
  let audio = null;

  musicToggle.addEventListener('click', () => {
    if (!audio) {
      audio = new Audio();
      // Placeholder instrumental luxury lounge track
      audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
      audio.loop = true;
      audio.volume = 0.15; // Soft ambient volume
    }

    if (isPlaying) {
      audio.pause();
      musicToggle.style.color = 'var(--text-muted)';
      showToast('info', 'Ambient Audio', 'Background music muted.', 2000);
    } else {
      audio.play().then(() => {
        musicToggle.style.color = 'var(--color-gold)';
        showToast('info', 'Ambient Audio', 'Playing soft luxury lounge track.', 2000);
      }).catch(() => {
        showToast('error', 'Audio Error', 'Could not play background track.', 2000);
      });
    }
    isPlaying = !isPlaying;
  });
}

/**
 * 9. Frontpage Floating Reservation Form
 */
function initReservationWidget() {
  const form = document.querySelector('.widget-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = form.querySelector('[type="date"]').value;
    const time = form.querySelector('select[name="time"]').value;
    const guests = form.querySelector('select[name="guests"]').value;
    const zone = form.querySelector('select[name="zone"]').value;

    if (!date || !time) {
      showToast('error', 'Missing Information', 'Please select a date and time slot.', 3000);
      return;
    }

    // Save data temporarily and redirect to checkout
    setLocalStorage('pending_reservation', { date, time, guests, zone });
    
    showToast('success', 'Table Available', 'Redirecting to booking confirmation...', 1500);
    setTimeout(() => {
      window.location.href = 'reservation.html';
    }, 1200);
  });
}

/**
 * 10. Newsletter Form
 */
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    if (!email) return;

    showToast('success', 'Subscribed', 'Thank you! You have subscribed to our exclusive offers newsletter.', 4000);
    form.reset();
  });
}
