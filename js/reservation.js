/* ============================================
   AURUM — Table Reservation Controller
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initReservationFlow();
});

function initReservationFlow() {
  const steps = Array.from(document.querySelectorAll('.step'));
  const panels = Array.from(document.querySelectorAll('.reservation-step-panel'));
  const prevBtn = document.getElementById('btn-prev-step');
  const nextBtn = document.getElementById('btn-next-step');

  // Step state
  let currentStep = 0;
  const reservationData = {
    date: '',
    time: '',
    guests: '2',
    zone: 'Indoor',
    occasion: 'None',
    guestName: '',
    email: '',
    phone: '',
    specialRequests: '',
    couponCode: '',
    discount: 0,
    subtotal: 100, // mock base reservation deposit
    total: 100,
    paymentMethod: 'card',
    cardNum: '•••• •••• •••• ••••',
    cardExpiry: 'MM/YY',
    cardHolder: 'GUEST NAME'
  };

  // Check if we redirected from homepage reservation widget
  const cachedWidget = getLocalStorage('pending_reservation', null);
  if (cachedWidget) {
    reservationData.date = cachedWidget.date;
    reservationData.time = cachedWidget.time;
    reservationData.guests = cachedWidget.guests;
    reservationData.zone = cachedWidget.zone;
    localStorage.removeItem('pending_reservation'); // Clear cache
  }

  // Initialize view
  initCalendar();
  initTimeSlots();
  initZoneSelection();
  initFormInputs();
  initCouponHandler();
  initPaymentToggle();
  updateStepView();

  // Navigation handlers
  nextBtn.addEventListener('click', () => {
    if (!validateStep(currentStep)) return;
    
    if (currentStep < panels.length - 1) {
      if (currentStep === 1) {
        // Prepare summary page before rendering Step 3 (index 2)
        generateSummary();
      }
      if (currentStep === 3) {
        // Complete checkout on Step 4 (index 3) and generate receipt
        finalizeReservation();
      }
      currentStep++;
      updateStepView();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      updateStepView();
    }
  });

  function updateStepView() {
    panels.forEach((panel, i) => {
      panel.classList.toggle('active', i === currentStep);
    });

    steps.forEach((step, i) => {
      step.classList.remove('active', 'completed');
      if (i === currentStep) {
        step.classList.add('active');
      } else if (i < currentStep) {
        step.classList.add('completed');
      }
    });

    // Control navigation buttons visibility
    prevBtn.style.visibility = (currentStep === 0 || currentStep === panels.length - 1) ? 'hidden' : 'visible';
    
    if (currentStep === panels.length - 1) {
      // Last confirmation step: Hide next btn entirely
      nextBtn.style.display = 'none';
    } else {
      nextBtn.style.display = '';
      nextBtn.textContent = currentStep === panels.length - 2 ? 'Confirm Booking' : 'Next Step';
    }
    
    // Auto-scroll back to top of card on step change
    const box = document.querySelector('.reservation-flow-box');
    if (box) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Step 1: Calendar & Slots Initialization ──
  function initCalendar() {
    const grid = document.querySelector('.booking-calendar-grid');
    if (!grid) return;

    // Render calendar header
    const headers = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    grid.innerHTML = headers.map(h => `<div class="calendar-day-header">${h}</div>`).join('');

    const today = new Date();
    const startDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    // Fill blank prefix padding days
    for (let i = 0; i < startDay; i++) {
      grid.appendChild(document.createElement('div'));
    }

    // Populate day buttons
    for (let day = 1; day <= daysInMonth; day++) {
      const btn = document.createElement('button');
      btn.className = 'calendar-day-btn';
      btn.textContent = day;
      
      const btnDate = new Date(today.getFullYear(), today.getMonth(), day);
      
      // Disable past days
      if (btnDate < today.setHours(0,0,0,0)) {
        btn.classList.add('disabled');
        btn.setAttribute('disabled', 'true');
      } else {
        // Pre-select date if matching cached date
        const dateStr = formatDateISO(btnDate);
        if (reservationData.date === dateStr) {
          btn.classList.add('active');
        }

        btn.addEventListener('click', (e) => {
          e.preventDefault();
          grid.querySelectorAll('.calendar-day-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          reservationData.date = dateStr;
          
          // Randomize time availability on date change to make layout feel "alive"
          randomizeTimeSlots();
        });
      }
      grid.appendChild(btn);
    }
  }

  function initTimeSlots() {
    const slots = document.querySelectorAll('.time-slot-btn');
    slots.forEach(slot => {
      // Pre-select if matches cached time
      if (reservationData.time === slot.dataset.time) {
        slot.classList.add('active');
      }

      slot.addEventListener('click', (e) => {
        e.preventDefault();
        slots.forEach(s => s.classList.remove('active'));
        slot.classList.add('active');
        reservationData.time = slot.dataset.time;
      });
    });
  }

  function randomizeTimeSlots() {
    const slots = document.querySelectorAll('.time-slot-btn');
    slots.forEach(slot => {
      slot.classList.remove('active');
      
      // 25% chance of being booked/disabled
      const isBooked = Math.random() < 0.25;
      slot.classList.toggle('disabled', isBooked);
      slot.toggleAttribute('disabled', isBooked);
      
      if (reservationData.time === slot.dataset.time) {
        if (isBooked) reservationData.time = ''; // Clear selection if now disabled
        else slot.classList.add('active');
      }
    });
  }

  function initZoneSelection() {
    const cards = document.querySelectorAll('.seating-zone-card');
    cards.forEach(card => {
      // Pre-select if matching
      if (reservationData.zone === card.dataset.zone) {
        card.classList.add('active');
      }

      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        reservationData.zone = card.dataset.zone;
      });
    });
  }

  // ── Step 2: Form Input Syncs ──
  function initFormInputs() {
    const inputs = [
      { id: 'reserve-name', field: 'guestName' },
      { id: 'reserve-email', field: 'email' },
      { id: 'reserve-phone', field: 'phone' },
      { id: 'reserve-requests', field: 'specialRequests' },
      { id: 'reserve-guests', field: 'guests' },
      { id: 'reserve-occasion', field: 'occasion' }
    ];

    inputs.forEach(item => {
      const el = document.getElementById(item.id);
      if (!el) return;

      // Bind input values
      el.value = reservationData[item.field];
      el.addEventListener('input', (e) => {
        reservationData[item.field] = e.target.value;
        
        // Specific card syncs for payment stage
        if (item.field === 'guestName') {
          syncCardHolder(e.target.value);
        }
      });
      el.addEventListener('change', (e) => {
        reservationData[item.field] = e.target.value;
      });
    });

    // Credit Card forms visual synchronizations
    const cNumInput = document.getElementById('card-number');
    const cExpInput = document.getElementById('card-expiry');
    const cNameInput = document.getElementById('card-name');

    if (cNumInput) {
      cNumInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formatted = '';
        for (let i = 0; i < val.length; i++) {
          if (i > 0 && i % 4 === 0) formatted += ' ';
          formatted += val[i];
        }
        e.target.value = formatted.substring(0, 19);
        document.querySelector('.payment-card-number').textContent = e.target.value || '•••• •••• •••• ••••';
      });
    }

    if (cExpInput) {
      cExpInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length >= 2) {
          e.target.value = val.substring(0, 2) + '/' + val.substring(2, 4);
        } else {
          e.target.value = val;
        }
        e.target.value = e.target.value.substring(0, 5);
        document.querySelector('.payment-card-expiry').textContent = e.target.value || 'MM/YY';
      });
    }

    if (cNameInput) {
      cNameInput.addEventListener('input', (e) => {
        syncCardHolder(e.target.value);
      });
    }
  }

  function syncCardHolder(name) {
    const el = document.querySelector('.payment-card-holder');
    if (el) el.textContent = name.toUpperCase() || 'GUEST NAME';
  }

  // ── Step 3: Promo Coupon Deductions ──
  function initCouponHandler() {
    const couponInput = document.getElementById('coupon-code');
    const applyBtn = document.getElementById('btn-apply-coupon');
    if (!applyBtn) return;

    applyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const code = couponInput.value.toUpperCase().trim();
      
      // Mock code deduction check: 'AURUM20'
      if (code === 'AURUM20') {
        reservationData.couponCode = code;
        reservationData.discount = 20; // 20% off
        reservationData.total = reservationData.subtotal * 0.8;
        
        generateSummary(); // Re-render summary cards
        showToast('success', 'Coupon Applied', '20% discount successfully applied to table deposit.', 3000);
      } else {
        showToast('error', 'Invalid Coupon', 'The entered promotion coupon code is invalid or expired.', 3000);
      }
    });
  }

  // ── Step 4: Checkout Payment Toggles ──
  function initPaymentToggle() {
    const cards = document.querySelectorAll('.payment-method-card');
    const cardForm = document.getElementById('card-form-wrapper');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        const method = card.dataset.method;
        reservationData.paymentMethod = method;

        if (method === 'card') {
          if (cardForm) cardForm.style.display = 'block';
        } else {
          if (cardForm) cardForm.style.display = 'none';
        }
      });
    });
  }

  // ── Step Render & Validations ──
  function validateStep(stepIndex) {
    if (stepIndex === 0) {
      if (!reservationData.date) {
        showToast('error', 'Select Date', 'Please pick a preferred date slot on our booking calendar.', 3000);
        return false;
      }
      if (!reservationData.time) {
        showToast('error', 'Select Time', 'Please select a preferred dining time slot.', 3000);
        return false;
      }
      return true;
    }
    
    if (stepIndex === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!reservationData.guestName.trim()) {
        showToast('error', 'Missing Name', 'Please input your full guest name.', 3000);
        return false;
      }
      if (!emailRegex.test(reservationData.email)) {
        showToast('error', 'Invalid Email', 'Please input a valid email address.', 3000);
        return false;
      }
      if (reservationData.phone.replace(/\D/g, '').length < 8) {
        showToast('error', 'Invalid Phone', 'Please input a valid phone number.', 3000);
        return false;
      }
      return true;
    }

    if (stepIndex === 3) {
      if (reservationData.paymentMethod === 'card') {
        const cNum = document.getElementById('card-number').value.replace(/\s+/g, '');
        const cExp = document.getElementById('card-expiry').value;
        const cCvv = document.getElementById('card-cvv').value;

        if (cNum.length < 16) {
          showToast('error', 'Invalid Card', 'Please input your full 16-digit credit card number.', 3000);
          return false;
        }
        if (cExp.length < 5) {
          showToast('error', 'Invalid Expiry', 'Please input a valid card expiration month/year.', 3000);
          return false;
        }
        if (cCvv.length < 3) {
          showToast('error', 'Invalid CVV', 'Please input a valid security card CVV code.', 3000);
          return false;
        }
      }
      return true;
    }

    return true;
  }

  function generateSummary() {
    const wrapper = document.querySelector('#summary-wrapper');
    if (!wrapper) return;

    const discountRowHtml = reservationData.discount > 0
      ? `<div class="summary-receipt-row">
          <span class="summary-receipt-label">Promo Discount (20%):</span>
          <span class="summary-receipt-val text-accent">-${formatPrice(reservationData.subtotal * 0.2)}</span>
         </div>`
      : '';

    wrapper.innerHTML = `
      <div class="summary-receipt-card">
        <div class="summary-receipt-row">
          <span class="summary-receipt-label">Guest Reservation:</span>
          <span class="summary-receipt-val">${reservationData.guestName}</span>
        </div>
        <div class="summary-receipt-row">
          <span class="summary-receipt-label">Table Details:</span>
          <span class="summary-receipt-val">${reservationData.guests} Guests (${reservationData.zone} Zone)</span>
        </div>
        <div class="summary-receipt-row">
          <span class="summary-receipt-label">Dining Date:</span>
          <span class="summary-receipt-val">${formatReadableDate(reservationData.date)}</span>
        </div>
        <div class="summary-receipt-row">
          <span class="summary-receipt-label">Arrival Time:</span>
          <span class="summary-receipt-val">${reservationData.time} PM</span>
        </div>
        <div class="summary-receipt-row">
          <span class="summary-receipt-label">Occasion Special:</span>
          <span class="summary-receipt-val">${reservationData.occasion}</span>
        </div>
        <div class="summary-receipt-row" style="margin-top:var(--space-4); border-top:1px dashed var(--border-color)">
          <span class="summary-receipt-label">Table Deposit Subtotal:</span>
          <span class="summary-receipt-val">${formatPrice(reservationData.subtotal)}</span>
        </div>
        ${discountRowHtml}
        <div class="summary-receipt-row" style="border-top:1px solid var(--border-gold); padding-top:var(--space-3)">
          <span class="summary-receipt-label"><strong>Grand Total Charge:</strong></span>
          <span class="summary-receipt-val text-gold" style="font-size:var(--text-lg)"><strong>${formatPrice(reservationData.total)}</strong></span>
        </div>
      </div>
    `;
  }

  function finalizeReservation() {
    const summaryContainer = document.querySelector('#final-receipt-summary');
    const bookingCode = generateId();

    if (summaryContainer) {
      summaryContainer.innerHTML = `
        <div class="summary-receipt-card" style="text-align:left; max-width:550px; margin:0 auto var(--space-6)">
          <div class="summary-receipt-row">
            <span class="summary-receipt-label">Booking Code Reference:</span>
            <span class="summary-receipt-val text-gold"><strong>${bookingCode}</strong></span>
          </div>
          <div class="summary-receipt-row">
            <span class="summary-receipt-label">Guest Booker:</span>
            <span class="summary-receipt-val">${reservationData.guestName}</span>
          </div>
          <div class="summary-receipt-row">
            <span class="summary-receipt-label">Table Seating:</span>
            <span class="summary-receipt-val">${reservationData.guests} Guests (${reservationData.zone} Zone)</span>
          </div>
          <div class="summary-receipt-row">
            <span class="summary-receipt-label">Dining Schedule:</span>
            <span class="summary-receipt-val">${formatReadableDate(reservationData.date)} @ ${reservationData.time} PM</span>
          </div>
          <div class="summary-receipt-row">
            <span class="summary-receipt-label">Payment Status:</span>
            <span class="summary-receipt-val text-accent">SUCCESSFUL (Mock Charge)</span>
          </div>
        </div>
      `;
    }

    // Save final details locally for dashboard sync simulation
    const dbReservations = getLocalStorage('custom_reservations', []);
    dbReservations.push({
      id: bookingCode,
      guestName: reservationData.guestName,
      email: reservationData.email,
      phone: reservationData.phone,
      date: reservationData.date,
      time: reservationData.time,
      guests: parseInt(reservationData.guests, 10),
      seating: reservationData.zone,
      occasion: reservationData.occasion,
      status: 'confirmed',
      table: 'T-0' + Math.floor(Math.random() * 8 + 1),
      specialRequests: reservationData.specialRequests,
      totalAmount: reservationData.total,
      createdAt: new Date().toISOString()
    });
    setLocalStorage('custom_reservations', dbReservations);

    showToast('success', 'Table Booked', 'Your gourmet table reservation has been locked successfully.', 4000);
  }

  // Helper date utilities
  function formatDateISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatReadableDate(dateStr) {
    const parts = dateStr.split('-');
    if (parts.length < 3) return dateStr;
    const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
    return dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
}
