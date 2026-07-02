/* ============================================
   AURUM — Custom Cursor & Magnetic Interactions
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
});

function initCustomCursor() {
  // Only execute on desktop browsers with hover support
  const hoverMatch = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!hoverMatch.matches) return;

  // Create markup if not exists
  let dot = document.querySelector('.cursor-dot');
  let ring = document.querySelector('.cursor-ring');

  if (!dot || !ring) {
    const cursorContainer = document.createElement('div');
    cursorContainer.className = 'custom-cursor';
    
    dot = document.createElement('div');
    dot.className = 'cursor-dot';
    
    ring = document.createElement('div');
    ring.className = 'cursor-ring';
    
    cursorContainer.appendChild(dot);
    cursorContainer.appendChild(ring);
    document.body.appendChild(cursorContainer);
  }

  // Pointer position tracker
  const mouse = { x: -100, y: -100 };
  const ringPos = { x: -100, y: -100 };

  document.body.classList.add('has-custom-cursor');

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Lerp easing function for the lag effect
  const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

  // Animation loop
  const animateCursor = () => {
    // Instant dot movement
    dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
    
    // Eased ring movement
    ringPos.x = lerp(ringPos.x, mouse.x, 0.15);
    ringPos.y = lerp(ringPos.y, mouse.y, 0.15);
    ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
    
    requestAnimationFrame(animateCursor);
  };
  requestAnimationFrame(animateCursor);

  // Hover states on interactive elements
  const interactiveSelector = 'a, button, input, select, textarea, .hover-tilt, [role="button"], .accordion-header';
  
  const addHoverClass = (e) => {
    const target = e.currentTarget;
    if (target.matches('input[type="text"], input[type="email"], input[type="tel"], textarea')) {
      document.body.classList.add('cursor-text');
    } else {
      document.body.classList.add('cursor-hover');
    }
  };

  const removeHoverClass = () => {
    document.body.classList.remove('cursor-hover', 'cursor-text');
  };

  const attachEvents = () => {
    const elements = document.querySelectorAll(interactiveSelector);
    elements.forEach(el => {
      el.addEventListener('mouseenter', addHoverClass);
      el.addEventListener('mouseleave', removeHoverClass);
    });
  };

  attachEvents();

  // Re-observe DOM changes (for dynamic items like filter menu items or AJAX loads)
  const observer = new MutationObserver(attachEvents);
  observer.observe(document.body, { childList: true, subtree: true });

  // Hide cursor on leaving window bounds
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  // Magnetic attraction effect on buttons
  const magneticBtns = document.querySelectorAll('.btn, .nav-logo, .theme-toggle, .lang-switch-btn');
  if (magneticBtns.length > 0) {
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;
        
        const distX = mouse.x - btnX;
        const distY = mouse.y - btnY;
        
        // Push amount (max 8px translation)
        const strength = 0.25;
        const pushX = distX * strength;
        const pushY = distY * strength;
        
        btn.style.transform = `translate3d(${pushX}px, ${pushY}px, 0)`;
        
        // Also slide background slightly if primary/accent button
        if (btn.classList.contains('btn-primary')) {
          btn.style.setProperty('--ripple-x', `${e.clientX - rect.left}px`);
          btn.style.setProperty('--ripple-y', `${e.clientY - rect.top}px`);
        }
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }
}
/* CSS support properties for magnetic buttons */
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .btn { transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow var(--transition-base), filter var(--transition-base) !important; }
  </style>
`);
