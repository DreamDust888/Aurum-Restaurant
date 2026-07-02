/* ============================================
   AURUM — Customer Portal Controller
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initCustomerPortal();
});

function initCustomerPortal() {
  const tabs = document.querySelectorAll('.customer-tab-btn');
  const panels = document.querySelectorAll('.customer-panel');

  // SPA Tab Panel Router
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.dataset.target;
      const panel = document.getElementById(targetId);
      if (panel) {
        panel.classList.add('active');
      }
    });
  });

  // Render and load personal history listings
  renderUpcomingReservations();
  renderHistoryReservations();
  renderFavoritesList();
  renderInvoicesList();

  // 1. Render Upcoming Booking Cards
  function renderUpcomingReservations() {
    const container = document.querySelector('#upcoming-bookings-container');
    if (!container) return;
    container.innerHTML = '';

    const customList = getLocalStorage('custom_reservations', []);
    const upcoming = [...customList, ...RESERVATIONS_DATA].filter(r => r.status === 'confirmed');

    if (upcoming.length === 0) {
      container.innerHTML = `
        <div class="card p-6 text-center">
          <p class="text-muted">No upcoming reservations scheduled.</p>
          <a href="../reservation.html" class="btn btn-primary btn-sm mt-4">Book A Table Now</a>
        </div>
      `;
      return;
    }

    upcoming.forEach(res => {
      const card = document.createElement('div');
      card.className = 'upcoming-booking-card';
      
      card.innerHTML = `
        <div class="upcoming-date-box">
          📅 ${formatReadableDate(res.date)} @ ${res.time} PM
        </div>
        <div class="grid grid-2 mb-4">
          <div>
            <p class="text-xs text-muted uppercase">Booking Code</p>
            <p class="text-sm font-semibold">${res.id}</p>
          </div>
          <div>
            <p class="text-xs text-muted uppercase">Seating Details</p>
            <p class="text-sm font-semibold">${res.guests} Guests (${res.seating})</p>
          </div>
        </div>
        <div>
          <p class="text-xs text-muted uppercase">Special Requests</p>
          <p class="text-sm">${res.specialRequests || 'None noted.'}</p>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // 2. Render Past Booking Table Logs
  function renderHistoryReservations() {
    const tbody = document.querySelector('#past-history-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const customList = getLocalStorage('custom_reservations', []);
    const past = [...customList, ...RESERVATIONS_DATA].filter(r => r.status === 'completed' || r.status === 'cancelled');

    past.forEach(res => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${res.id}</strong></td>
        <td>${res.date}</td>
        <td>${res.time} PM</td>
        <td>${res.guests} Pax</td>
        <td>${res.seating}</td>
        <td><span class="status status-${res.status}">${res.status}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // 3. Render Favorites Grid list
  function renderFavoritesList() {
    const grid = document.querySelector('#favorites-grid-list');
    if (!grid) return;
    grid.innerHTML = '';

    // Static default list
    const defaults = [
      { id: 1, name: 'Pan-Seared Foie Gras', price: 38 },
      { id: 16, name: 'Truffle Risotto', price: 34 },
      { id: 23, name: 'Wagyu A5 Ribeye', price: 95 }
    ];

    defaults.forEach(item => {
      const card = document.createElement('div');
      card.className = 'favorite-dish-card';
      
      card.innerHTML = `
        <div class="fav-dish-info">
          <h4>${item.name}</h4>
          <p>${formatPrice(item.price)} • Signature Dish</p>
        </div>
        <button class="btn btn-sm btn-dark remove-fav-btn" style="border-color:var(--color-error)">&times; Remove</button>
      `;

      card.querySelector('.remove-fav-btn').addEventListener('click', () => {
        card.remove();
        showToast('info', 'Favorites', `${item.name} removed from favorites.`, 2000);
      });

      grid.appendChild(card);
    });
  }

  // 4. Render Invoices Table
  function renderInvoicesList() {
    const tbody = document.querySelector('#invoices-history-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const invoices = [
      { id: 'INV-2024-104', date: '2024-12-12', amount: 185 },
      { id: 'INV-2024-098', date: '2024-11-05', amount: 320 },
      { id: 'INV-2024-084', date: '2024-10-14', amount: 95 }
    ];

    invoices.forEach(inv => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${inv.id}</strong></td>
        <td>${inv.date}</td>
        <td>${formatPrice(inv.amount)}</td>
        <td><span class="status status-confirmed">PAID</span></td>
        <td><button class="btn btn-sm btn-ghost btn-download-invoice">Download</button></td>
      `;

      tr.querySelector('.btn-download-invoice').addEventListener('click', () => {
        showToast('success', 'Downloading', `Invoice ${inv.id} PDF download started.`, 2500);
      });

      tbody.appendChild(tr);
    });
  }

  // Form Profile submit triggers
  const profileForm = document.querySelector('#profile-details-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Update name visual in hero section
      const newName = document.getElementById('prof-name').value;
      const heroNameEl = document.querySelector('#profile-hero-name');
      if (heroNameEl && newName) heroNameEl.textContent = newName;

      showToast('success', 'Profile Updated', 'Your profile details have been successfully saved.', 3000);
    });
  }

  // Gift card purchasing triggers
  const buyGiftCardBtn = document.querySelector('#btn-buy-giftcard');
  if (buyGiftCardBtn) {
    buyGiftCardBtn.addEventListener('click', () => {
      showToast('success', 'Order Placed', 'Gift Card purchase request received. Redirecting to mock payment checkout...', 3000);
    });
  }

  // Helper date utilities
  function formatReadableDate(dateStr) {
    const parts = dateStr.split('-');
    if (parts.length < 3) return dateStr;
    const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
    return dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
}
