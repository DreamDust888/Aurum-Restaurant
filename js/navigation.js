/* ============================================
   AURUM — Navigation Controller
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});

function initNavigation() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
  const sections = document.querySelectorAll('section[id], header[id], div[id].section');
  const navLinks = document.querySelectorAll('.nav-link');
  const langBtn = document.querySelector('.lang-switch-btn');
  const langSwitch = document.querySelector('.lang-switch');
  const langOptions = document.querySelectorAll('.lang-option');

  // 1. Sticky Navigation on Scroll
  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', throttle(handleScroll, 100));
  handleScroll(); // Run immediately

  // 2. Active Link Highlighting (Scroll Spy)
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section occupies center of screen
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}` || link.getAttribute('href') === `${window.location.pathname}#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  // 3. Mobile Hamburger Menu Toggle
  if (hamburger && mobileMenu) {
    const toggleMobileMenu = () => {
      const isOpen = hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      
      if (isOpen) {
        document.body.style.overflow = 'hidden'; // Prevent body scroll
        hamburger.setAttribute('aria-expanded', 'true');
      } else {
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      }
    };

    hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu on link click
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  }

  // 4. Smooth Scrolling for Anchor Links
  const allAnchors = document.querySelectorAll('a[href^="#"]');
  allAnchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        
        // Offset scroll based on desktop nav height
        const offset = window.innerWidth > 1200 ? 80 : 64;
        smoothScrollTo(targetElement, offset);
      }
    });
  });

  // 5. Language Switcher Dropdown
  if (langBtn && langSwitch) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langSwitch.classList.toggle('active');
    });

    // Close on clicking options
    langOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const lang = opt.dataset.lang;
        langBtn.querySelector('.lang-text').textContent = lang;
        langOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        langSwitch.classList.remove('active');
        
        showToast('info', 'Language Switched', `Website content updated to ${opt.textContent.trim()}.`, 2500);
      });
    });

    // Close dropdown on clicking outside
    document.addEventListener('click', () => {
      langSwitch.classList.remove('active');
    });
  }
}
