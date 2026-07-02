/* ============================================
   AURUM — Reservations Mock Data
   Sample reservations for dashboards
   ============================================ */

'use strict';

const RESERVATIONS_DATA = [
  {
    id: 'AUR-2024-001',
    guestName: 'Isabella Fontaine',
    email: 'isabella.f@email.com',
    phone: '+33 6 12 34 56 78',
    date: '2025-01-15',
    time: '19:30',
    guests: 2,
    seating: 'Indoor',
    occasion: 'Anniversary',
    status: 'confirmed',
    table: 'T-05',
    specialRequests: 'Window seat preferred. Allergic to shellfish.',
    totalAmount: 185,
    createdAt: '2025-01-10T14:23:00Z'
  },
  {
    id: 'AUR-2024-002',
    guestName: 'James Whitmore',
    email: 'j.whitmore@corp.com',
    phone: '+44 20 7946 0958',
    date: '2025-01-15',
    time: '20:00',
    guests: 6,
    seating: 'Private',
    occasion: 'Business Dinner',
    status: 'confirmed',
    table: 'P-02',
    specialRequests: 'Presentation setup needed. Wine pairing for all guests.',
    totalAmount: 720,
    createdAt: '2025-01-08T09:15:00Z'
  },
  {
    id: 'AUR-2024-003',
    guestName: 'Yuki Tanaka',
    email: 'yuki.t@mail.jp',
    phone: '+81 3-1234-5678',
    date: '2025-01-16',
    time: '19:00',
    guests: 4,
    seating: 'Rooftop',
    occasion: 'Birthday',
    status: 'confirmed',
    table: 'R-03',
    specialRequests: 'Birthday cake arrangement. Vegetarian options for 2 guests.',
    totalAmount: 420,
    createdAt: '2025-01-12T16:45:00Z'
  },
  {
    id: 'AUR-2024-004',
    guestName: 'Sofia Andersson',
    email: 'sofia.a@scandi.se',
    phone: '+46 8 123 456 78',
    date: '2025-01-16',
    time: '20:30',
    guests: 2,
    seating: 'Indoor',
    occasion: 'Date Night',
    status: 'pending',
    table: null,
    specialRequests: 'Candlelight setup. Tasting menu preferred.',
    totalAmount: 210,
    createdAt: '2025-01-14T11:30:00Z'
  },
  {
    id: 'AUR-2024-005',
    guestName: 'Marco Benedetti',
    email: 'marco.b@luxury.it',
    phone: '+39 02 1234 5678',
    date: '2025-01-17',
    time: '19:30',
    guests: 8,
    seating: 'Private',
    occasion: 'Corporate Event',
    status: 'confirmed',
    table: 'P-01',
    specialRequests: 'Full wine pairing. AV setup for brief presentation.',
    totalAmount: 960,
    createdAt: '2025-01-05T08:20:00Z'
  },
  {
    id: 'AUR-2024-006',
    guestName: 'Catherine Dubois',
    email: 'catherine.d@email.fr',
    phone: '+33 1 42 86 00 00',
    date: '2025-01-17',
    time: '20:00',
    guests: 3,
    seating: 'Outdoor',
    occasion: 'Celebration',
    status: 'confirmed',
    table: 'O-04',
    specialRequests: 'Gluten-free menu required for one guest.',
    totalAmount: 315,
    createdAt: '2025-01-11T13:00:00Z'
  },
  {
    id: 'AUR-2024-007',
    guestName: 'Alexander Petrov',
    email: 'alex.p@email.ru',
    phone: '+7 495 123-45-67',
    date: '2025-01-18',
    time: '21:00',
    guests: 2,
    seating: 'Rooftop',
    occasion: 'None',
    status: 'cancelled',
    table: null,
    specialRequests: '',
    totalAmount: 0,
    createdAt: '2025-01-13T10:40:00Z'
  },
  {
    id: 'AUR-2024-008',
    guestName: 'Amara Okafor',
    email: 'amara.o@email.ng',
    phone: '+234 1 234 5678',
    date: '2025-01-18',
    time: '19:00',
    guests: 2,
    seating: 'Indoor',
    occasion: 'Anniversary',
    status: 'confirmed',
    table: 'T-08',
    specialRequests: 'Anniversary package. Rose arrangement on table.',
    totalAmount: 200,
    createdAt: '2025-01-09T15:00:00Z'
  },
  {
    id: 'AUR-2024-009',
    guestName: 'Henrik Nielsen',
    email: 'henrik.n@press.dk',
    phone: '+45 12 34 56 78',
    date: '2025-01-19',
    time: '19:30',
    guests: 1,
    seating: 'Indoor',
    occasion: 'None',
    status: 'confirmed',
    table: 'T-02',
    specialRequests: 'Food critic visit. Please prepare chef\'s tasting menu.',
    totalAmount: 150,
    createdAt: '2025-01-15T09:00:00Z'
  },
  {
    id: 'AUR-2024-010',
    guestName: 'Priya Sharma',
    email: 'priya.s@email.in',
    phone: '+91 98765 43210',
    date: '2025-01-19',
    time: '20:00',
    guests: 5,
    seating: 'Indoor',
    occasion: 'Birthday',
    status: 'pending',
    table: null,
    specialRequests: 'Fully vegetarian for all guests. Birthday cake for guest of honor.',
    totalAmount: 450,
    createdAt: '2025-01-16T12:15:00Z'
  },
  {
    id: 'AUR-2024-011',
    guestName: 'Robert Chen',
    email: 'robert.c@tech.com',
    phone: '+1 415-555-0123',
    date: '2025-01-20',
    time: '18:30',
    guests: 10,
    seating: 'Private',
    occasion: 'Corporate Event',
    status: 'confirmed',
    table: 'P-01',
    specialRequests: 'Team dinner. Mix of dietary requirements. Pre-set menu option.',
    totalAmount: 1200,
    createdAt: '2025-01-07T16:30:00Z'
  },
  {
    id: 'AUR-2024-012',
    guestName: 'Elena Rodriguez',
    email: 'elena.r@email.es',
    phone: '+34 91 123 4567',
    date: '2025-01-20',
    time: '20:30',
    guests: 4,
    seating: 'Rooftop',
    occasion: 'Celebration',
    status: 'confirmed',
    table: 'R-01',
    specialRequests: 'Champagne on arrival. Sunset seating preferred.',
    totalAmount: 520,
    createdAt: '2025-01-12T14:20:00Z'
  },
  // Past / Completed reservations
  {
    id: 'AUR-2024-P01',
    guestName: 'Thomas Müller',
    email: 'thomas.m@email.de',
    phone: '+49 30 12345678',
    date: '2025-01-10',
    time: '19:00',
    guests: 2,
    seating: 'Indoor',
    occasion: 'Date Night',
    status: 'completed',
    table: 'T-03',
    specialRequests: '',
    totalAmount: 195,
    createdAt: '2025-01-05T10:00:00Z'
  },
  {
    id: 'AUR-2024-P02',
    guestName: 'Marie Lefèvre',
    email: 'marie.l@email.fr',
    phone: '+33 6 98 76 54 32',
    date: '2025-01-11',
    time: '20:00',
    guests: 6,
    seating: 'Private',
    occasion: 'Birthday',
    status: 'completed',
    table: 'P-02',
    specialRequests: 'Surprise birthday arrangement.',
    totalAmount: 680,
    createdAt: '2025-01-03T11:45:00Z'
  },
  {
    id: 'AUR-2024-P03',
    guestName: 'David Kim',
    email: 'david.k@email.kr',
    phone: '+82 2-1234-5678',
    date: '2025-01-12',
    time: '19:30',
    guests: 3,
    seating: 'Indoor',
    occasion: 'None',
    status: 'completed',
    table: 'T-06',
    specialRequests: 'Sushi omakase for all.',
    totalAmount: 285,
    createdAt: '2025-01-08T09:30:00Z'
  }
];

const TABLES_DATA = [
  { id: 'T-01', name: 'Table 1', capacity: 2, zone: 'Indoor', status: 'available', shape: 'round' },
  { id: 'T-02', name: 'Table 2', capacity: 2, zone: 'Indoor', status: 'occupied', shape: 'round' },
  { id: 'T-03', name: 'Table 3', capacity: 4, zone: 'Indoor', status: 'available', shape: 'square' },
  { id: 'T-04', name: 'Table 4', capacity: 4, zone: 'Indoor', status: 'reserved', shape: 'square' },
  { id: 'T-05', name: 'Table 5', capacity: 2, zone: 'Indoor', status: 'occupied', shape: 'round' },
  { id: 'T-06', name: 'Table 6', capacity: 6, zone: 'Indoor', status: 'available', shape: 'rectangular' },
  { id: 'T-07', name: 'Table 7', capacity: 4, zone: 'Indoor', status: 'available', shape: 'square' },
  { id: 'T-08', name: 'Table 8', capacity: 2, zone: 'Indoor', status: 'reserved', shape: 'round' },
  { id: 'O-01', name: 'Garden 1', capacity: 4, zone: 'Outdoor', status: 'available', shape: 'round' },
  { id: 'O-02', name: 'Garden 2', capacity: 6, zone: 'Outdoor', status: 'occupied', shape: 'rectangular' },
  { id: 'O-03', name: 'Garden 3', capacity: 2, zone: 'Outdoor', status: 'available', shape: 'round' },
  { id: 'O-04', name: 'Garden 4', capacity: 4, zone: 'Outdoor', status: 'reserved', shape: 'square' },
  { id: 'R-01', name: 'Rooftop 1', capacity: 4, zone: 'Rooftop', status: 'available', shape: 'round' },
  { id: 'R-02', name: 'Rooftop 2', capacity: 6, zone: 'Rooftop', status: 'occupied', shape: 'rectangular' },
  { id: 'R-03', name: 'Rooftop 3', capacity: 4, zone: 'Rooftop', status: 'reserved', shape: 'round' },
  { id: 'P-01', name: 'Gold Room', capacity: 12, zone: 'Private', status: 'reserved', shape: 'rectangular' },
  { id: 'P-02', name: 'Wine Cellar', capacity: 20, zone: 'Private', status: 'available', shape: 'rectangular' }
];

const DASHBOARD_STATS = {
  today: {
    reservations: 24,
    revenue: 4850,
    guests: 86,
    avgRating: 4.8
  },
  thisWeek: {
    reservations: 142,
    revenue: 28400,
    guests: 538,
    avgCheck: 105
  },
  revenueByDay: [
    { day: 'Mon', amount: 3200 },
    { day: 'Tue', amount: 2800 },
    { day: 'Wed', amount: 3600 },
    { day: 'Thu', amount: 4100 },
    { day: 'Fri', amount: 5800 },
    { day: 'Sat', amount: 6200 },
    { day: 'Sun', amount: 4850 }
  ],
  popularDishes: [
    { name: 'Wagyu A5 Ribeye', orders: 45, revenue: 4275 },
    { name: 'Truffle Risotto', orders: 38, revenue: 1292 },
    { name: 'Pan-Seared Foie Gras', orders: 35, revenue: 1330 },
    { name: 'Butter-Poached Lobster', orders: 32, revenue: 2304 },
    { name: 'Chocolate Fondant', orders: 28, revenue: 504 }
  ],
  peakHours: [
    { hour: '12:00', guests: 15 },
    { hour: '13:00', guests: 22 },
    { hour: '14:00', guests: 12 },
    { hour: '18:00', guests: 8 },
    { hour: '19:00', guests: 28 },
    { hour: '20:00', guests: 35 },
    { hour: '21:00', guests: 30 },
    { hour: '22:00', guests: 18 }
  ],
  monthlyTrend: {
    currentMonth: 28400,
    lastMonth: 25600,
    change: 10.9
  }
};

const STAFF_DATA = [
  { id: 1, name: 'Alessandro Moretti', role: 'Executive Chef', status: 'active', shift: 'Evening', since: '2018' },
  { id: 2, name: 'Marie Laurent', role: 'Sous Chef', status: 'active', shift: 'Morning', since: '2019' },
  { id: 3, name: 'Jean-Pierre Dubois', role: 'Sommelier', status: 'active', shift: 'Evening', since: '2020' },
  { id: 4, name: 'Sarah Mitchell', role: 'Restaurant Manager', status: 'active', shift: 'Full Day', since: '2017' },
  { id: 5, name: 'Takeshi Yamamoto', role: 'Sushi Chef', status: 'active', shift: 'Evening', since: '2021' },
  { id: 6, name: 'Emma Clarke', role: 'Head Hostess', status: 'active', shift: 'Evening', since: '2022' },
  { id: 7, name: 'Luca Romano', role: 'Pastry Chef', status: 'active', shift: 'Morning', since: '2019' },
  { id: 8, name: 'Anna Kowalski', role: 'Server Lead', status: 'on-leave', shift: 'Evening', since: '2020' }
];

const COUPONS_DATA = [
  { code: 'AURUM20', discount: 20, type: 'percentage', validUntil: '2025-03-31', usageCount: 45, maxUsage: 100, status: 'active' },
  { code: 'WELCOME10', discount: 10, type: 'percentage', validUntil: '2025-06-30', usageCount: 120, maxUsage: 500, status: 'active' },
  { code: 'BIRTHDAY', discount: 15, type: 'percentage', validUntil: '2025-12-31', usageCount: 28, maxUsage: null, status: 'active' },
  { code: 'WINE50', discount: 50, type: 'fixed', validUntil: '2025-02-28', usageCount: 12, maxUsage: 30, status: 'active' },
  { code: 'NEWYEAR25', discount: 25, type: 'percentage', validUntil: '2025-01-31', usageCount: 89, maxUsage: 100, status: 'expired' }
];
