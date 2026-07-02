/* ============================================
   AURUM — Digital Menu Page Controller
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  if (typeof MENU_DATA !== 'undefined') {
    initMenuPage();
  }
});

function initMenuPage() {
  const container = document.querySelector('#menu-sections-container');
  const searchInput = document.querySelector('.search-input');
  const filterTabsContainer = document.querySelector('.filter-tabs');
  const dietaryCheckboxes = document.querySelectorAll('.dietary-filters-row input[type="checkbox"]');

  let activeCategory = 'all';
  let searchQuery = '';
  let activeDietary = []; // V, VG, GF

  // 1. Initial Render
  renderMenu();

  // 2. Setup Category Tabs Click handlers
  if (filterTabsContainer) {
    const tabs = filterTabsContainer.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeCategory = tab.dataset.filter;
        renderMenu();
      });
    });
  }

  // 3. Setup Live Search Input handler (Debounced)
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderMenu();
    }, 250));
  }

  // 4. Setup Dietary Checklist Toggle handlers
  dietaryCheckboxes.forEach(box => {
    box.addEventListener('change', () => {
      activeDietary = Array.from(dietaryCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value);
      renderMenu();
    });
  });

  // 5. Core Menu Rendering Logic
  function renderMenu() {
    if (!container) return;
    container.innerHTML = '';

    // Group items by category to render section blocks
    const categoriesToRender = activeCategory === 'all' 
      ? MENU_DATA.categories 
      : MENU_DATA.categories.filter(c => c.id === activeCategory);

    let totalRendered = 0;

    categoriesToRender.forEach(cat => {
      // Filter items within this category block
      const catItems = MENU_DATA.items.filter(item => {
        const matchesCategory = item.category === cat.id;
        const matchesSearch = searchQuery === '' || 
          item.name.toLowerCase().includes(searchQuery) || 
          item.description.toLowerCase().includes(searchQuery) ||
          item.ingredients.some(i => i.toLowerCase().includes(searchQuery));
        
        const matchesDietary = activeDietary.length === 0 || 
          activeDietary.every(d => item.dietary.includes(d));

        return matchesCategory && matchesSearch && matchesDietary;
      });

      if (catItems.length === 0) return; // Skip empty categories

      totalRendered += catItems.length;

      // Create Section Elements
      const section = document.createElement('section');
      section.className = 'menu-section reveal revealed';
      section.id = `menu-cat-${cat.id}`;

      section.innerHTML = `
        <div class="menu-section-header">
          <h2 class="menu-section-title">
            <span>${cat.icon}</span> ${cat.name}
          </h2>
          <div class="menu-section-line"></div>
        </div>
        <div class="grid grid-2">
          <!-- Items will be injected here -->
        </div>
      `;

      const grid = section.querySelector('.grid');

      catItems.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = 'menu-item-row';
        itemRow.setAttribute('tabindex', '0');
        itemRow.setAttribute('role', 'button');
        itemRow.setAttribute('aria-expanded', 'false');

        // Build Badge HTML
        let badgesHtml = '';
        if (item.isChefSpecial) badgesHtml += '<span class="badge badge-gold">Chef\'s Special</span>';
        if (item.isSeasonal) badgesHtml += '<span class="badge badge-outline">Seasonal</span>';

        // Build Dietary Badges
        let dietBadges = '';
        if (item.dietary.includes('vegetarian')) dietBadges += '<span class="badge badge-emerald">V</span>';
        if (item.dietary.includes('vegan')) dietBadges += '<span class="badge badge-forest">VG</span>';
        if (item.dietary.includes('gluten-free')) dietBadges += '<span class="badge badge-copper">GF</span>';

        itemRow.innerHTML = `
          <div class="menu-item-main">
            <div class="menu-item-title-box">
              <h3 class="menu-item-title">${item.name}</h3>
              ${badgesHtml}
              ${dietBadges}
            </div>
            <span class="menu-item-price">${formatPrice(item.price)}</span>
          </div>
          <p class="menu-item-desc">${item.description}</p>
          <div class="menu-item-expandable" aria-hidden="true">
            <div class="menu-expanded-details">
              <div class="detail-block">
                <h5>Key Ingredients</h5>
                <p>${item.ingredients.join(', ')}</p>
              </div>
              <div class="detail-block">
                <h5>Nutrition Info</h5>
                <p>${item.calories} Calories</p>
              </div>
              <div class="detail-block">
                <h5>Allergen Safety</h5>
                <p>${item.allergens.length > 0 ? item.allergens.join(', ') : 'None'}</p>
              </div>
            </div>
          </div>
        `;

        // Click to expand/collapse details
        itemRow.addEventListener('click', (e) => {
          const isExpanded = itemRow.classList.toggle('expanded');
          const panel = itemRow.querySelector('.menu-item-expandable');
          
          if (isExpanded) {
            panel.style.maxHeight = panel.scrollHeight + 'px';
            itemRow.setAttribute('aria-expanded', 'true');
            panel.setAttribute('aria-hidden', 'false');
          } else {
            panel.style.maxHeight = null;
            itemRow.setAttribute('aria-expanded', 'false');
            panel.setAttribute('aria-hidden', 'true');
          }
        });

        // Keypress accessibility support
        itemRow.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            itemRow.click();
          }
        });

        grid.appendChild(itemRow);
      });

      container.appendChild(section);
    });

    if (totalRendered === 0) {
      container.innerHTML = `
        <div class="text-center p-12">
          <h3>No Menu Items Found</h3>
          <p class="text-muted mt-2">Adjust your keyword search or dietary filters and try again.</p>
        </div>
      `;
    }
  }
}
