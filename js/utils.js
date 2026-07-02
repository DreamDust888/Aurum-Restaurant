/* ============================================
   AURUM — Shared Utilities
   ============================================ */

'use strict';

/**
 * Debounces a function call
 * @param {Function} fn - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttles a function call
 * @param {Function} fn - The function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Smoothly scrolls to an element with an offset
 * @param {HTMLElement|string} target - Selector or element to scroll to
 * @param {number} offset - Offset in pixels (e.g. header height)
 */
function smoothScrollTo(target, offset = 80) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

/**
 * Lazy loads images using Intersection Observer
 */
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src], .lazy-bg[data-bg]');
  if (!('IntersectionObserver' in window)) {
    // Fallback if not supported
    images.forEach(img => {
      if (img.tagName === 'IMG') {
        img.src = img.dataset.src;
      } else {
        img.style.backgroundImage = `url(${img.dataset.bg})`;
      }
    });
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        if (target.tagName === 'IMG') {
          target.src = target.dataset.src;
          target.removeAttribute('data-src');
        } else {
          target.style.backgroundImage = `url(${target.dataset.bg})`;
          target.removeAttribute('data-bg');
        }
        target.classList.add('lazy-loaded');
        imageObserver.unobserve(target);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

/**
 * Displays a custom toast notification
 * @param {'success'|'error'|'warning'|'info'} type - Type of toast
 * @param {string} title - Toast title
 * @param {string} message - Toast message text
 * @param {number} duration - Auto-dismiss duration in ms
 */
function showToast(type, title, message, duration = 4000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '❌';
  if (type === 'warning') icon = '⚠️';

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <span class="toast-close">&times;</span>
  `;

  container.appendChild(toast);

  // Trigger animation after append
  setTimeout(() => toast.classList.add('show'), 10);

  const dismiss = () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  };

  toast.querySelector('.toast-close').addEventListener('click', dismiss);

  if (duration > 0) {
    setTimeout(dismiss, duration);
  }
}

/**
 * Formats pricing as currency ($ USD)
 * @param {number} amount - Value to format
 * @returns {string} - Formatted string
 */
function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Generates a unique transaction/reservation ID prefix
 * @returns {string} - ID string
 */
function generateId() {
  return 'AUR-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

/**
 * Animates a number counter in an element
 * @param {HTMLElement} element - Target element
 * @param {number} start - Start number
 * @param {number} end - End number
 * @param {number} duration - Duration in ms
 * @param {string} suffix - Suffix to append
 */
function animateValue(element, start, end, duration = 2000, suffix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/**
 * Safe local storage operations
 */
function getLocalStorage(key, defaultValue) {
  try {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // Ignore
  }
}
