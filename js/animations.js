/* ============================================
   AURUM — Animations Controller
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
});

function initAnimations() {
  // 1. Scroll-Triggered Reveal Animations
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade');
  
  if ('IntersectionObserver' in window && reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.classList.add('revealed');
          
          // If there is a stagger parent, handle its children stagger delays
          if (target.hasAttribute('data-stagger-parent')) {
            const children = target.querySelectorAll('[class*="stagger-"]');
            children.forEach(child => {
              // Find the delay from class, e.g. stagger-1, stagger-2
              const match = child.className.match(/stagger-(\d+)/);
              if (match) {
                const delay = parseInt(match[1]) * 0.15;
                child.style.transitionDelay = `${delay}s`;
              }
            });
          }
          
          revealObserver.unobserve(target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -10% 0px', // Trigger slightly before entering screen
      threshold: 0.15
    });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: Reveal everything immediately if IntersectionObserver is not supported
    reveals.forEach(el => el.classList.add('revealed'));
  }

  // 2. Animated Numbers / Counters
  const counters = document.querySelectorAll('.counter[data-target]');
  if ('IntersectionObserver' in window && counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.dataset.target, 10);
          const suffix = target.dataset.suffix || '';
          
          animateValue(target, 0, endValue, 2000, suffix);
          counterObserver.unobserve(target);
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(el => counterObserver.observe(el));
  }

  // 3. Scroll Progress Indicator
  const progressIndicator = document.querySelector('.scroll-progress');
  if (progressIndicator) {
    window.addEventListener('scroll', throttle(() => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressIndicator.style.width = scrolled + '%';
    }, 15));
  }

  // 4. Parallax Background Scrolling Effect
  const parallaxBgs = document.querySelectorAll('.parallax-bg');
  if (parallaxBgs.length > 0 && window.innerWidth > 1024) {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      
      parallaxBgs.forEach(bg => {
        const parent = bg.parentElement;
        const parentRect = parent.getBoundingClientRect();
        
        // Calculate offset if parent is in viewport range
        if (parentRect.top < window.innerHeight && parentRect.bottom > 0) {
          // Speed coefficient
          const speed = 0.2;
          const yPos = -(scrollY - parent.offsetTop) * speed;
          bg.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });
    });
  }

  // 5. Lazy Loading Images Initialization
  lazyLoadImages();
}
