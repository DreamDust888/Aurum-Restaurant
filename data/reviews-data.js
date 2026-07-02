/* ============================================
   AURUM — Reviews / Testimonials Data
   ============================================ */

'use strict';

const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Isabella Fontaine',
    location: 'Paris, France',
    avatar: null,
    rating: 5,
    title: 'An Unforgettable Evening',
    text: 'From the moment we walked in, every detail was impeccable. The truffle risotto was a revelation, and Chef Alessandro personally came to our table to explain his inspiration. This is dining elevated to an art form.',
    date: '2024-11-15',
    isVerified: true,
    occasion: 'Anniversary'
  },
  {
    id: 2,
    name: 'James Whitmore',
    location: 'London, UK',
    avatar: null,
    rating: 5,
    title: 'Michelin-Worthy Experience',
    text: 'The wine pairing dinner was extraordinary. Each course perfectly complemented by the sommelier\'s selections. The Wagyu A5 with the 2015 Château Margaux was a match made in heaven. Already planning our return.',
    date: '2024-10-28',
    isVerified: true,
    occasion: 'Business Dinner'
  },
  {
    id: 3,
    name: 'Yuki Tanaka',
    location: 'Tokyo, Japan',
    avatar: null,
    rating: 5,
    title: 'Perfection in Every Bite',
    text: 'As someone who has dined at numerous Michelin-starred restaurants across Tokyo and Paris, I can confidently say Aurum stands among the very best. The omakase selection showcased impeccable quality and technique.',
    date: '2024-12-03',
    isVerified: true,
    occasion: 'Birthday'
  },
  {
    id: 4,
    name: 'Sofia Andersson',
    location: 'Stockholm, Sweden',
    avatar: null,
    rating: 5,
    title: 'A Culinary Journey',
    text: 'The tasting menu was a journey through flavors I\'ve never experienced before. The passion fruit soufflé alone is worth the visit. The staff\'s attention to detail and warmth made us feel like royalty.',
    date: '2024-09-20',
    isVerified: true,
    occasion: 'Date Night'
  },
  {
    id: 5,
    name: 'Marco Benedetti',
    location: 'Milan, Italy',
    avatar: null,
    rating: 5,
    title: 'Exquisite from Start to Finish',
    text: 'The private dining room for our corporate event was stunning. The customized menu featured the freshest ingredients prepared with extraordinary skill. Our international clients were thoroughly impressed.',
    date: '2024-11-02',
    isVerified: true,
    occasion: 'Corporate Event'
  },
  {
    id: 6,
    name: 'Catherine Dubois',
    location: 'Lyon, France',
    avatar: null,
    rating: 5,
    title: 'Simply Magnificent',
    text: 'The ambiance transported us to another world. Every dish was a masterpiece — visually stunning and bursting with flavor. The chocolate fondant with gold leaf was the perfect ending to a perfect evening.',
    date: '2024-10-15',
    isVerified: true,
    occasion: 'Celebration'
  },
  {
    id: 7,
    name: 'Alexander Petrov',
    location: 'Moscow, Russia',
    avatar: null,
    rating: 4,
    title: 'World-Class Dining',
    text: 'Outstanding quality in every aspect. The Dover sole meunière was prepared flawlessly, and the wine list is one of the most impressive I\'ve encountered. The rooftop setting at sunset is breathtaking.',
    date: '2024-08-30',
    isVerified: true,
    occasion: 'Anniversary'
  },
  {
    id: 8,
    name: 'Amara Okafor',
    location: 'Lagos, Nigeria',
    avatar: null,
    rating: 5,
    title: 'Worth Every Moment',
    text: 'We celebrated our 10th anniversary at Aurum and it exceeded all expectations. The candlelight dinner setup was incredibly romantic. Chef\'s special tasting menu with wine pairing was an absolute dream.',
    date: '2024-12-10',
    isVerified: true,
    occasion: 'Anniversary'
  },
  {
    id: 9,
    name: 'Henrik Nielsen',
    location: 'Copenhagen, Denmark',
    avatar: null,
    rating: 5,
    title: 'A New Standard',
    text: 'Aurum has set a new standard for fine dining in the city. The seasonal menu demonstrates a deep respect for ingredients and craftsmanship. The service is warm without being intrusive — perfectly balanced.',
    date: '2024-11-22',
    isVerified: true,
    occasion: 'Food Review'
  },
  {
    id: 10,
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    avatar: null,
    rating: 5,
    title: 'Exceptional Hospitality',
    text: 'The team at Aurum made our dietary requirements feel completely effortless. Every vegetarian dish was as spectacular as the others. The truffle risotto and garden tasting plate were absolute highlights.',
    date: '2024-10-05',
    isVerified: true,
    occasion: 'Birthday'
  }
];

const REVIEWS_STATS = {
  averageRating: 4.9,
  totalReviews: 847,
  fiveStarPercentage: 92,
  fourStarPercentage: 6,
  threeStarPercentage: 2,
  platforms: {
    google: { rating: 4.9, reviews: 523 },
    tripadvisor: { rating: 4.8, reviews: 201 },
    yelp: { rating: 4.7, reviews: 123 }
  }
};
