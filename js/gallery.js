/* ============================================
   AURUM — Photo Gallery Controller
   ============================================ */

'use strict';

// 18+ Mock Gallery Items with staggered ratios for masonry
const GALLERY_DATA = [
  { id: 1, title: 'Seared Wagyu A5 Ribeye', category: 'food', ratio: 'landscape', src: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800' },
  { id: 2, title: 'Main Dining Room Entrance', category: 'interior', ratio: 'portrait', src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800' },
  { id: 3, title: 'Chef Alessandro Plating', category: 'chef', ratio: 'square', src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800' },
  { id: 4, title: 'Aurum Signature Old Fashioned', category: 'food', ratio: 'portrait', src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800' },
  { id: 5, title: 'Rooftop Lounge Views', category: 'interior', ratio: 'landscape', src: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=800' },
  { id: 6, title: 'Private Wine Cellar Table', category: 'interior', ratio: 'square', src: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=800' },
  { id: 7, title: 'Pan-Seared Foie Gras', category: 'food', ratio: 'portrait', src: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800' },
  { id: 8, title: 'Wine Tasting Gala Night', category: 'events', ratio: 'landscape', src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800' },
  { id: 9, title: 'Chef\'s Table Preparation', category: 'chef', ratio: 'portrait', src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800' },
  { id: 10, title: 'Truffle Burrata & Tomato', category: 'food', ratio: 'square', src: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=800' },
  { id: 11, title: 'Outdoor Garden Path', category: 'interior', ratio: 'portrait', src: 'https://images.unsplash.com/photo-1504627033174-8dba7b578c77?q=80&w=800' },
  { id: 12, title: 'Live Jazz Band Night', category: 'events', ratio: 'landscape', src: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800' },
  { id: 13, title: 'Fresh Omakase Nigiri', category: 'food', ratio: 'landscape', src: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800' },
  { id: 14, title: 'Valrhona Melted Core Cake', category: 'food', ratio: 'square', src: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800' },
  { id: 15, title: 'Sommelier Selecting Bottle', category: 'chef', ratio: 'portrait', src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800' },
  { id: 16, title: 'Sunday Brunch Spread', category: 'events', ratio: 'landscape', src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800' },
  { id: 17, title: 'New Year Dinner Gala Decor', category: 'events', ratio: 'portrait', src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800' },
  { id: 18, title: 'Exterior Restaurant Lighting', category: 'interior', ratio: 'landscape', src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800' }
];

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
});

function initGallery() {
  const grid = document.querySelector('.gallery-grid');
  const tabs = document.querySelectorAll('.filter-tab');
  
  // Lightbox Elements
  const lightbox = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const lightboxCat = document.querySelector('.lightbox-category');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  let activeFilter = 'all';
  let filteredItems = [...GALLERY_DATA];
  let currentLightboxIndex = 0;

  // 1. Initial Render
  renderGallery();

  // 2. Filter Tabs Click handler
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.filter;
      
      // Filter the items list
      filteredItems = activeFilter === 'all'
        ? GALLERY_DATA
        : GALLERY_DATA.filter(item => item.category === activeFilter);

      renderGallery();
    });
  });

  // 3. Render Gallery Items
  function renderGallery() {
    if (!grid) return;
    grid.innerHTML = '';

    filteredItems.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = `gallery-item ratio-${item.ratio} reveal revealed`;
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', `View large photo: ${item.title}`);
      
      el.innerHTML = `
        <div class="gallery-img-wrapper">
          <img class="gallery-img" src="${item.src}" alt="${item.title}">
          <div class="gallery-item-overlay">
            <h3 class="gallery-item-title">${item.title}</h3>
            <span class="gallery-item-cat">${item.category}</span>
          </div>
        </div>
      `;

      // Open Lightbox on Click
      el.addEventListener('click', () => {
        openLightbox(index);
      });

      // Accessibility key support
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });

      grid.appendChild(el);
    });

    // Lazy load the newly created image tags
    lazyLoadImages();
  }

  // 4. Open Lightbox
  function openLightbox(index) {
    if (!lightbox) return;
    currentLightboxIndex = index;
    updateLightboxContent();
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock page scroll
  }

  // 5. Close Lightbox
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  
  // Close on outside click
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
        closeLightbox();
      }
    });
  }

  // 6. Navigation Controls in Lightbox
  const showNext = (e) => {
    if (e) e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredItems.length;
    updateLightboxContent();
  };

  const showPrev = (e) => {
    if (e) e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightboxContent();
  };

  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Keyboard navigation shortcuts
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Helper: Update Lightbox Image and text content
  function updateLightboxContent() {
    const item = filteredItems[currentLightboxIndex];
    if (!item) return;
    
    // Animate transition slightly
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.97)';
    
    setTimeout(() => {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.title;
      if (lightboxTitle) lightboxTitle.textContent = item.title;
      if (lightboxCat) lightboxCat.textContent = item.category;
      
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'scale(1)';
    }, 150);
  }
}
