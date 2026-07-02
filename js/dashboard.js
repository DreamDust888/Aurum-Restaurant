/* ============================================
   AURUM — Admin Dashboard Controller
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  if (typeof RESERVATIONS_DATA !== 'undefined') {
    initDashboard();
  }
});

function initDashboard() {
  const menuItems = document.querySelectorAll('.db-menu-item');
  const panels = document.querySelectorAll('.db-panel');
  const collapseBtn = document.querySelector('.db-sidebar-collapse-btn');
  const sidebar = document.querySelector('.db-sidebar');
  const pageTitle = document.querySelector('.db-page-title');

  // SPA Routing: Switch Content Panels
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuItems.forEach(i => i.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      const targetId = item.dataset.target;
      const panel = document.getElementById(targetId);
      
      if (panel) {
        panel.classList.add('active');
        pageTitle.textContent = item.querySelector('span').textContent;
        
        // Trigger specific panel animations
        if (targetId === 'overview') {
          animateChart();
        }
      }
    });
  });

  // Sidebar Collapse Toggle
  if (collapseBtn && sidebar) {
    collapseBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      const isCollapsed = sidebar.classList.contains('collapsed');
      collapseBtn.innerHTML = isCollapsed ? '&rarr;' : '&larr;';
    });
  }

  // Load and Render Roster data lists
  renderOverviewReservations();
  renderReservationsTable();
  renderVisualTablesMap();
  renderMenuManagement();
  animateChart();

  // 1. Render Overview Log Rows
  function renderOverviewReservations() {
    const tbody = document.querySelector('#overview-reservations-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    // Load static arrays merged with custom reservation inserts
    const customList = getLocalStorage('custom_reservations', []);
    const mergedList = [...customList, ...RESERVATIONS_DATA].slice(0, 7);

    mergedList.forEach(res => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${res.id}</strong></td>
        <td>${res.guestName}</td>
        <td>${res.date}</td>
        <td>${res.time} PM</td>
        <td>${res.guests} Pax</td>
        <td><span class="status status-${res.status}">${res.status}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // 2. Render Full Reservations Panel list
  function renderReservationsTable() {
    const tbody = document.querySelector('#full-reservations-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const customList = getLocalStorage('custom_reservations', []);
    const mergedList = [...customList, ...RESERVATIONS_DATA];

    mergedList.forEach(res => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${res.id}</strong></td>
        <td>${res.guestName}</td>
        <td>${res.date}</td>
        <td>${res.time} PM</td>
        <td>${res.guests} Pax</td>
        <td>${res.seating}</td>
        <td><span class="status status-${res.status}">${res.status}</span></td>
        <td>
          <button class="btn btn-sm btn-ghost btn-action-confirm" data-id="${res.id}">Confirm</button>
          <button class="btn btn-sm btn-dark btn-action-cancel" data-id="${res.id}" style="border-color:var(--color-error)">Cancel</button>
        </td>
      `;

      // Status updates simulation
      tr.querySelector('.btn-action-confirm').addEventListener('click', () => {
        updateResStatus(res.id, 'confirmed');
      });

      tr.querySelector('.btn-action-cancel').addEventListener('click', () => {
        updateResStatus(res.id, 'cancelled');
      });

      tbody.appendChild(tr);
    });
  }

  function updateResStatus(id, newStatus) {
    // Check custom list first
    const customList = getLocalStorage('custom_reservations', []);
    const index = customList.findIndex(r => r.id === id);
    
    if (index !== -1) {
      customList[index].status = newStatus;
      setLocalStorage('custom_reservations', customList);
    } else {
      // Modify fallback list
      const staticIndex = RESERVATIONS_DATA.findIndex(r => r.id === id);
      if (staticIndex !== -1) RESERVATIONS_DATA[staticIndex].status = newStatus;
    }

    showToast('success', 'Status Updated', `Reservation ${id} set to ${newStatus}.`, 3000);
    renderOverviewReservations();
    renderReservationsTable();
  }

  // 3. Render Visual Tables Map
  function renderVisualTablesMap() {
    const grid = document.querySelector('#tables-map-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (typeof TABLES_DATA !== 'undefined') {
      TABLES_DATA.forEach(table => {
        const el = document.createElement('div');
        el.className = `table-layout-card shape-${table.shape} status-${table.status}`;
        
        el.innerHTML = `
          <div class="table-icon-visual">${table.id}</div>
          <p class="text-sm font-semibold">${table.name}</p>
          <p class="text-xs text-muted">Cap: ${table.capacity} Pax</p>
        `;

        // Toggle table status simulation
        el.addEventListener('click', () => {
          const statuses = ['available', 'occupied', 'reserved'];
          const nextIndex = (statuses.indexOf(table.status) + 1) % statuses.length;
          table.status = statuses[nextIndex];
          
          showToast('info', 'Table Status', `Table ${table.id} status updated to ${table.status}.`, 1500);
          renderVisualTablesMap();
        });

        grid.appendChild(el);
      });
    }
  }

  // 4. Render Menu Management List
  function renderMenuManagement() {
    const tbody = document.querySelector('#menu-management-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (typeof MENU_DATA !== 'undefined') {
      MENU_DATA.items.slice(0, 10).forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>#${item.id}</strong></td>
          <td>${item.name}</td>
          <td><span class="badge badge-gold">${item.category}</span></td>
          <td>${formatPrice(item.price)}</td>
          <td>${item.calories} Cal</td>
          <td>
            <button class="btn btn-sm btn-ghost">Edit</button>
            <button class="btn btn-sm btn-dark" style="border-color:var(--color-error)">Delete</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }
  }

  // Helper: Animate Revenue Chart column heights
  function animateChart() {
    const columns = document.querySelectorAll('.bar-fill-column');
    if (columns.length === 0) return;

    if (typeof DASHBOARD_STATS !== 'undefined') {
      columns.forEach((col, index) => {
        const data = DASHBOARD_STATS.revenueByDay[index];
        if (data) {
          // Calculate height percent based on max day ($6,200)
          const pct = (data.amount / 6500) * 100;
          setTimeout(() => {
            col.style.height = `${pct}%`;
          }, index * 80);
        }
      });
    }
  }

  // 5. Mock real-time updates intervals
  setInterval(() => {
    // Randomly update KPI numbers by 2-5% representing live sales
    const todaySalesEl = document.querySelector('#kpi-today-sales');
    if (todaySalesEl && typeof DASHBOARD_STATS !== 'undefined') {
      const addVal = Math.floor(Math.random() * 80 + 20);
      DASHBOARD_STATS.today.revenue += addVal;
      todaySalesEl.textContent = formatPrice(DASHBOARD_STATS.today.revenue);
    }
  }, 9000);
}
