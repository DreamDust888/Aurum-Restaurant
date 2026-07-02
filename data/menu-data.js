/* ============================================
   AURUM — Menu Data
   Comprehensive restaurant menu with 50+ items
   ============================================ */

'use strict';

const MENU_DATA = {
  categories: [
    { id: 'starters', name: 'Starters', icon: '🍽️' },
    { id: 'soups', name: 'Soups', icon: '🥣' },
    { id: 'salads', name: 'Salads', icon: '🥗' },
    { id: 'seafood', name: 'Seafood', icon: '🦐' },
    { id: 'vegetarian', name: 'Vegetarian', icon: '🌿' },
    { id: 'main-course', name: 'Main Course', icon: '🥩' },
    { id: 'steaks', name: 'Steaks', icon: '🥩' },
    { id: 'sushi', name: 'Sushi', icon: '🍣' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'beverages', name: 'Beverages', icon: '☕' },
    { id: 'cocktails', name: 'Cocktails', icon: '🍸' },
    { id: 'wine', name: 'Wine', icon: '🍷' }
  ],

  items: [
    // ── STARTERS ──
    {
      id: 1, name: 'Pan-Seared Foie Gras',
      description: 'Seared duck foie gras with fig compote, toasted brioche, and aged balsamic reduction',
      category: 'starters', price: 38,
      ingredients: ['Duck Foie Gras', 'Fig Compote', 'Brioche', 'Balsamic', 'Micro Greens'],
      calories: 420, allergens: ['Gluten', 'Dairy'],
      dietary: [], spiceLevel: 0,
      isChefSpecial: true, isSeasonal: false,
      image: 'foie-gras.jpg'
    },
    {
      id: 2, name: 'Truffle Burrata',
      description: 'Creamy burrata with black truffle shavings, heirloom tomatoes, and basil oil',
      category: 'starters', price: 28,
      ingredients: ['Burrata', 'Black Truffle', 'Heirloom Tomato', 'Basil Oil', 'Sea Salt'],
      calories: 340, allergens: ['Dairy'],
      dietary: ['vegetarian'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: true,
      image: 'burrata.jpg'
    },
    {
      id: 3, name: 'Tuna Tartare',
      description: 'Fresh yellowfin tuna with avocado mousse, sesame crisps, and ponzu dressing',
      category: 'starters', price: 32,
      ingredients: ['Yellowfin Tuna', 'Avocado', 'Sesame', 'Ponzu', 'Shallots'],
      calories: 280, allergens: ['Fish', 'Sesame', 'Soy'],
      dietary: ['gluten-free'], spiceLevel: 1,
      isChefSpecial: true, isSeasonal: false,
      image: 'tuna-tartare.jpg'
    },
    {
      id: 4, name: 'Lobster Bisque Crostini',
      description: 'Rich lobster bisque served on golden crostini with crème fraîche and chive oil',
      category: 'starters', price: 26,
      ingredients: ['Lobster', 'Crème Fraîche', 'Chives', 'Crostini', 'Cognac'],
      calories: 310, allergens: ['Shellfish', 'Gluten', 'Dairy'],
      dietary: [], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'lobster-crostini.jpg'
    },
    {
      id: 5, name: 'Wagyu Beef Carpaccio',
      description: 'Paper-thin wagyu slices with truffle aioli, capers, arugula, and shaved Parmigiano',
      category: 'starters', price: 36,
      ingredients: ['Wagyu Beef', 'Truffle Aioli', 'Capers', 'Arugula', 'Parmigiano'],
      calories: 290, allergens: ['Dairy', 'Eggs'],
      dietary: ['gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'wagyu-carpaccio.jpg'
    },

    // ── SOUPS ──
    {
      id: 6, name: 'French Onion Soup',
      description: 'Classic caramelized onion soup with Gruyère crouton and thyme',
      category: 'soups', price: 18,
      ingredients: ['Sweet Onions', 'Gruyère', 'Beef Broth', 'Thyme', 'Cognac'],
      calories: 320, allergens: ['Gluten', 'Dairy'],
      dietary: [], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'french-onion.jpg'
    },
    {
      id: 7, name: 'Lobster Bisque',
      description: 'Velvety Maine lobster bisque with cognac cream and lobster claw garnish',
      category: 'soups', price: 24,
      ingredients: ['Maine Lobster', 'Cognac', 'Cream', 'Tomato', 'Herbs'],
      calories: 380, allergens: ['Shellfish', 'Dairy'],
      dietary: ['gluten-free'], spiceLevel: 0,
      isChefSpecial: true, isSeasonal: false,
      image: 'lobster-bisque.jpg'
    },
    {
      id: 8, name: 'Wild Mushroom Velouté',
      description: 'Silky blend of porcini, chanterelle, and shiitake with truffle oil',
      category: 'soups', price: 16,
      ingredients: ['Porcini', 'Chanterelle', 'Shiitake', 'Truffle Oil', 'Cream'],
      calories: 240, allergens: ['Dairy'],
      dietary: ['vegetarian', 'gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: true,
      image: 'mushroom-veloute.jpg'
    },

    // ── SALADS ──
    {
      id: 9, name: 'Niçoise Salad',
      description: 'Seared ahi tuna, haricots verts, olives, quail eggs, and anchovy vinaigrette',
      category: 'salads', price: 24,
      ingredients: ['Ahi Tuna', 'Haricots Verts', 'Olives', 'Quail Egg', 'Anchovy'],
      calories: 380, allergens: ['Fish', 'Eggs'],
      dietary: ['gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'nicoise.jpg'
    },
    {
      id: 10, name: 'Burrata & Heirloom Tomato',
      description: 'Creamy burrata with vine-ripened heirloom tomatoes, basil, and aged balsamic',
      category: 'salads', price: 22,
      ingredients: ['Burrata', 'Heirloom Tomato', 'Basil', 'Balsamic', 'Olive Oil'],
      calories: 310, allergens: ['Dairy'],
      dietary: ['vegetarian', 'gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: true,
      image: 'burrata-salad.jpg'
    },
    {
      id: 11, name: 'Caesar Royale',
      description: 'Baby gem lettuce, white anchovies, crispy pancetta, Parmigiano, and truffle Caesar dressing',
      category: 'salads', price: 20,
      ingredients: ['Baby Gem', 'Anchovies', 'Pancetta', 'Parmigiano', 'Truffle'],
      calories: 350, allergens: ['Fish', 'Dairy', 'Eggs', 'Gluten'],
      dietary: [], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'caesar.jpg'
    },

    // ── SEAFOOD ──
    {
      id: 12, name: 'Pan-Roasted Dover Sole',
      description: 'Whole Dover sole meunière with brown butter, capers, lemon, and parsley',
      category: 'seafood', price: 62,
      ingredients: ['Dover Sole', 'Brown Butter', 'Capers', 'Lemon', 'Parsley'],
      calories: 480, allergens: ['Fish', 'Dairy'],
      dietary: ['gluten-free'], spiceLevel: 0,
      isChefSpecial: true, isSeasonal: false,
      image: 'dover-sole.jpg'
    },
    {
      id: 13, name: 'Grilled Mediterranean Octopus',
      description: 'Tender chargrilled octopus with romesco sauce, fingerling potatoes, and smoked paprika',
      category: 'seafood', price: 38,
      ingredients: ['Octopus', 'Romesco', 'Fingerling Potato', 'Paprika', 'Olive Oil'],
      calories: 420, allergens: ['Nuts'],
      dietary: ['gluten-free'], spiceLevel: 1,
      isChefSpecial: false, isSeasonal: false,
      image: 'octopus.jpg'
    },
    {
      id: 14, name: 'Butter-Poached Lobster Tail',
      description: 'Maine lobster tail poached in herb butter with asparagus and champagne beurre blanc',
      category: 'seafood', price: 72,
      ingredients: ['Maine Lobster', 'Herb Butter', 'Asparagus', 'Champagne', 'Shallots'],
      calories: 520, allergens: ['Shellfish', 'Dairy'],
      dietary: ['gluten-free'], spiceLevel: 0,
      isChefSpecial: true, isSeasonal: false,
      image: 'lobster-tail.jpg'
    },
    {
      id: 15, name: 'Chilean Sea Bass',
      description: 'Miso-glazed Chilean sea bass with bok choy, shiitake mushrooms, and dashi broth',
      category: 'seafood', price: 56,
      ingredients: ['Sea Bass', 'White Miso', 'Bok Choy', 'Shiitake', 'Dashi'],
      calories: 460, allergens: ['Fish', 'Soy'],
      dietary: ['gluten-free'], spiceLevel: 1,
      isChefSpecial: false, isSeasonal: false,
      image: 'sea-bass.jpg'
    },

    // ── VEGETARIAN ──
    {
      id: 16, name: 'Truffle Risotto',
      description: 'Carnaroli rice risotto with black truffle, wild mushrooms, and aged Parmigiano',
      category: 'vegetarian', price: 34,
      ingredients: ['Carnaroli Rice', 'Black Truffle', 'Porcini', 'Parmigiano', 'Shallots'],
      calories: 520, allergens: ['Dairy'],
      dietary: ['vegetarian', 'gluten-free'], spiceLevel: 0,
      isChefSpecial: true, isSeasonal: true,
      image: 'truffle-risotto.jpg'
    },
    {
      id: 17, name: 'Roasted Cauliflower Steak',
      description: 'Whole roasted cauliflower with romesco, pine nuts, golden raisins, and herb gremolata',
      category: 'vegetarian', price: 28,
      ingredients: ['Cauliflower', 'Romesco', 'Pine Nuts', 'Raisins', 'Gremolata'],
      calories: 380, allergens: ['Nuts'],
      dietary: ['vegan', 'gluten-free'], spiceLevel: 1,
      isChefSpecial: false, isSeasonal: false,
      image: 'cauliflower.jpg'
    },
    {
      id: 18, name: 'Garden Tasting Plate',
      description: 'Seasonal vegetable tasting with five preparations from our kitchen garden',
      category: 'vegetarian', price: 32,
      ingredients: ['Seasonal Vegetables', 'Herb Oils', 'Edible Flowers', 'Seeds', 'Vinaigrette'],
      calories: 320, allergens: [],
      dietary: ['vegan', 'gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: true,
      image: 'garden-plate.jpg'
    },

    // ── MAIN COURSE ──
    {
      id: 19, name: 'Rack of Lamb',
      description: 'Herb-crusted New Zealand lamb rack with ratatouille, rosemary jus, and potato gratin',
      category: 'main-course', price: 52,
      ingredients: ['Lamb Rack', 'Herbs', 'Ratatouille', 'Rosemary', 'Gratin'],
      calories: 680, allergens: ['Gluten', 'Dairy'],
      dietary: [], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'lamb-rack.jpg'
    },
    {
      id: 20, name: 'Duck Confit',
      description: 'Slow-cooked duck leg confit with cherry gastrique, celeriac purée, and wilted greens',
      category: 'main-course', price: 44,
      ingredients: ['Duck Leg', 'Cherry', 'Celeriac', 'Greens', 'Duck Fat'],
      calories: 620, allergens: [],
      dietary: ['gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: true,
      image: 'duck-confit.jpg'
    },
    {
      id: 21, name: 'Coq au Vin',
      description: 'Traditional Burgundy-style braised chicken with pearl onions, mushrooms, and lardons',
      category: 'main-course', price: 38,
      ingredients: ['Chicken', 'Burgundy Wine', 'Pearl Onions', 'Mushrooms', 'Lardons'],
      calories: 580, allergens: [],
      dietary: ['gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'coq-au-vin.jpg'
    },
    {
      id: 22, name: 'Osso Buco alla Milanese',
      description: 'Braised veal shank with saffron risotto, gremolata, and slow-cooked vegetables',
      category: 'main-course', price: 48,
      ingredients: ['Veal Shank', 'Saffron', 'Arborio Rice', 'Gremolata', 'Root Vegetables'],
      calories: 720, allergens: ['Dairy'],
      dietary: ['gluten-free'], spiceLevel: 0,
      isChefSpecial: true, isSeasonal: false,
      image: 'osso-buco.jpg'
    },

    // ── STEAKS ──
    {
      id: 23, name: 'Wagyu A5 Ribeye',
      description: 'Japanese A5 wagyu ribeye, grilled over binchotan charcoal, with wasabi and sea salt',
      category: 'steaks', price: 95,
      ingredients: ['A5 Wagyu', 'Binchotan', 'Wasabi', 'Fleur de Sel', 'Shiso'],
      calories: 780, allergens: [],
      dietary: ['gluten-free'], spiceLevel: 1,
      isChefSpecial: true, isSeasonal: false,
      image: 'wagyu-ribeye.jpg'
    },
    {
      id: 24, name: 'Prime Filet Mignon',
      description: 'Center-cut filet mignon with truffle butter, roasted bone marrow, and red wine reduction',
      category: 'steaks', price: 68,
      ingredients: ['Filet Mignon', 'Truffle Butter', 'Bone Marrow', 'Red Wine', 'Shallots'],
      calories: 650, allergens: ['Dairy'],
      dietary: ['gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'filet-mignon.jpg'
    },
    {
      id: 25, name: 'Dry-Aged Tomahawk',
      description: '45-day dry-aged tomahawk steak with peppercorn sauce and crispy onion rings',
      category: 'steaks', price: 85,
      ingredients: ['Dry-Aged Beef', 'Peppercorn', 'Cream', 'Onion Rings', 'Watercress'],
      calories: 920, allergens: ['Dairy', 'Gluten'],
      dietary: [], spiceLevel: 1,
      isChefSpecial: false, isSeasonal: false,
      image: 'tomahawk.jpg'
    },
    {
      id: 26, name: 'Côte de Boeuf for Two',
      description: 'Prime rib for two with béarnaise, roasted garlic, and seasonal vegetables',
      category: 'steaks', price: 120,
      ingredients: ['Prime Rib', 'Béarnaise', 'Garlic', 'Seasonal Vegetables', 'Herbs'],
      calories: 850, allergens: ['Dairy', 'Eggs'],
      dietary: ['gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'cote-de-boeuf.jpg'
    },

    // ── SUSHI ──
    {
      id: 27, name: 'Omakase Selection',
      description: "Chef's choice of 12 premium nigiri pieces with seasonal fish selections",
      category: 'sushi', price: 78,
      ingredients: ['Seasonal Fish', 'Shari Rice', 'Wasabi', 'Ginger', 'Soy'],
      calories: 480, allergens: ['Fish', 'Soy'],
      dietary: ['gluten-free'], spiceLevel: 1,
      isChefSpecial: true, isSeasonal: true,
      image: 'omakase.jpg'
    },
    {
      id: 28, name: 'Dragon Roll',
      description: 'Tempura shrimp roll topped with avocado, eel, and unagi glaze',
      category: 'sushi', price: 28,
      ingredients: ['Shrimp Tempura', 'Avocado', 'Eel', 'Unagi Sauce', 'Sesame'],
      calories: 420, allergens: ['Shellfish', 'Gluten', 'Soy', 'Sesame'],
      dietary: [], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'dragon-roll.jpg'
    },
    {
      id: 29, name: 'Toro & Uni Duo',
      description: 'Premium fatty tuna belly and fresh sea urchin with yuzu gel and gold leaf',
      category: 'sushi', price: 58,
      ingredients: ['Otoro', 'Uni', 'Yuzu', 'Gold Leaf', 'Shari Rice'],
      calories: 320, allergens: ['Fish'],
      dietary: ['gluten-free'], spiceLevel: 0,
      isChefSpecial: true, isSeasonal: false,
      image: 'toro-uni.jpg'
    },
    {
      id: 30, name: 'Sashimi Platter',
      description: 'Selection of 15 premium sashimi pieces: salmon, tuna, hamachi, tai, and hotate',
      category: 'sushi', price: 52,
      ingredients: ['Salmon', 'Tuna', 'Hamachi', 'Tai', 'Hotate'],
      calories: 380, allergens: ['Fish', 'Shellfish'],
      dietary: ['gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'sashimi-platter.jpg'
    },

    // ── DESSERTS ──
    {
      id: 31, name: 'Chocolate Fondant',
      description: 'Warm Valrhona chocolate fondant with vanilla bean ice cream and gold leaf',
      category: 'desserts', price: 18,
      ingredients: ['Valrhona Chocolate', 'Butter', 'Eggs', 'Vanilla Ice Cream', 'Gold Leaf'],
      calories: 520, allergens: ['Dairy', 'Eggs', 'Gluten'],
      dietary: [], spiceLevel: 0,
      isChefSpecial: true, isSeasonal: false,
      image: 'chocolate-fondant.jpg'
    },
    {
      id: 32, name: 'Crème Brûlée',
      description: 'Classic Tahitian vanilla crème brûlée with caramelized sugar crust',
      category: 'desserts', price: 14,
      ingredients: ['Cream', 'Tahitian Vanilla', 'Eggs', 'Sugar', 'Berries'],
      calories: 380, allergens: ['Dairy', 'Eggs'],
      dietary: ['gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'creme-brulee.jpg'
    },
    {
      id: 33, name: 'Tarte Tatin',
      description: 'Caramelized apple tarte tatin with calvados ice cream and crème anglaise',
      category: 'desserts', price: 16,
      ingredients: ['Apples', 'Caramel', 'Puff Pastry', 'Calvados', 'Crème Anglaise'],
      calories: 440, allergens: ['Dairy', 'Eggs', 'Gluten'],
      dietary: [], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: true,
      image: 'tarte-tatin.jpg'
    },
    {
      id: 34, name: 'Mille-Feuille',
      description: 'Crispy layers of caramelized puff pastry with Madagascar vanilla cream and fresh berries',
      category: 'desserts', price: 16,
      ingredients: ['Puff Pastry', 'Vanilla Cream', 'Berries', 'Caramel', 'Powdered Sugar'],
      calories: 460, allergens: ['Dairy', 'Eggs', 'Gluten'],
      dietary: [], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'mille-feuille.jpg'
    },
    {
      id: 35, name: 'Passion Fruit Soufflé',
      description: 'Light and airy passion fruit soufflé with white chocolate sauce',
      category: 'desserts', price: 18,
      ingredients: ['Passion Fruit', 'Eggs', 'Sugar', 'White Chocolate', 'Cream'],
      calories: 340, allergens: ['Dairy', 'Eggs'],
      dietary: ['gluten-free'], spiceLevel: 0,
      isChefSpecial: true, isSeasonal: false,
      image: 'souffle.jpg'
    },

    // ── BEVERAGES ──
    {
      id: 36, name: 'Artisan Espresso',
      description: 'Single-origin Ethiopian espresso with notes of dark chocolate and citrus',
      category: 'beverages', price: 8,
      ingredients: ['Ethiopian Coffee Beans'],
      calories: 5, allergens: [],
      dietary: ['vegan', 'gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'espresso.jpg'
    },
    {
      id: 37, name: 'Matcha Ceremonial',
      description: 'Japanese ceremonial grade matcha prepared with traditional bamboo whisk',
      category: 'beverages', price: 12,
      ingredients: ['Ceremonial Matcha', 'Spring Water'],
      calories: 10, allergens: [],
      dietary: ['vegan', 'gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'matcha.jpg'
    },
    {
      id: 38, name: 'Fresh Juice Selection',
      description: 'Cold-pressed seasonal juices: green detox, beetroot ginger, or tropical blend',
      category: 'beverages', price: 10,
      ingredients: ['Seasonal Fruits', 'Vegetables', 'Ginger', 'Mint'],
      calories: 120, allergens: [],
      dietary: ['vegan', 'gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: true,
      image: 'juice.jpg'
    },

    // ── COCKTAILS ──
    {
      id: 39, name: 'Aurum Old Fashioned',
      description: 'Woodford Reserve bourbon, Angostura bitters, demerara, smoked orange peel, and gold flakes',
      category: 'cocktails', price: 22,
      ingredients: ['Bourbon', 'Angostura Bitters', 'Demerara Sugar', 'Orange', 'Gold Flakes'],
      calories: 180, allergens: [],
      dietary: ['vegan', 'gluten-free'], spiceLevel: 0,
      isChefSpecial: true, isSeasonal: false,
      image: 'old-fashioned.jpg'
    },
    {
      id: 40, name: 'Truffle Martini',
      description: 'Grey Goose vodka, truffle-infused vermouth, and a truffle olive garnish',
      category: 'cocktails', price: 24,
      ingredients: ['Vodka', 'Truffle Vermouth', 'Truffle Olive'],
      calories: 160, allergens: [],
      dietary: ['vegan', 'gluten-free'], spiceLevel: 0,
      isChefSpecial: true, isSeasonal: false,
      image: 'truffle-martini.jpg'
    },
    {
      id: 41, name: 'Champagne Cocktail',
      description: 'Moët & Chandon with cognac-soaked sugar cube, Angostura, and lemon twist',
      category: 'cocktails', price: 28,
      ingredients: ['Champagne', 'Cognac', 'Sugar', 'Angostura', 'Lemon'],
      calories: 150, allergens: [],
      dietary: ['vegan', 'gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'champagne-cocktail.jpg'
    },
    {
      id: 42, name: 'Lavender Gin Fizz',
      description: 'Hendricks gin, lavender syrup, lemon, egg white foam, and dried lavender',
      category: 'cocktails', price: 20,
      ingredients: ['Gin', 'Lavender Syrup', 'Lemon', 'Egg White', 'Soda'],
      calories: 140, allergens: ['Eggs'],
      dietary: ['gluten-free'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: true,
      image: 'lavender-fizz.jpg'
    },
    {
      id: 43, name: 'Spiced Negroni',
      description: 'Campari, sweet vermouth, star anise-infused gin, and flamed orange',
      category: 'cocktails', price: 20,
      ingredients: ['Campari', 'Sweet Vermouth', 'Gin', 'Star Anise', 'Orange'],
      calories: 170, allergens: [],
      dietary: ['vegan', 'gluten-free'], spiceLevel: 1,
      isChefSpecial: false, isSeasonal: false,
      image: 'negroni.jpg'
    },

    // ── WINE ──
    {
      id: 44, name: 'Château Margaux 2015',
      description: 'Premier Grand Cru Classé, Bordeaux — Deep ruby with cassis, violet, and cedar notes',
      category: 'wine', price: 85,
      ingredients: ['Cabernet Sauvignon', 'Merlot', 'Petit Verdot'],
      calories: 130, allergens: ['Sulfites'],
      dietary: ['vegan'], spiceLevel: 0,
      isChefSpecial: true, isSeasonal: false,
      image: 'chateau-margaux.jpg',
      wineDetails: { region: 'Bordeaux, France', type: 'Red', pairing: 'Wagyu Ribeye, Rack of Lamb' }
    },
    {
      id: 45, name: 'Puligny-Montrachet 2019',
      description: 'Premier Cru, Burgundy — Elegant white with honeysuckle, citrus, and mineral notes',
      category: 'wine', price: 72,
      ingredients: ['Chardonnay'],
      calories: 120, allergens: ['Sulfites'],
      dietary: ['vegan'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'puligny.jpg',
      wineDetails: { region: 'Burgundy, France', type: 'White', pairing: 'Dover Sole, Lobster Tail' }
    },
    {
      id: 46, name: 'Barolo Riserva 2016',
      description: 'Piedmont DOCG — Full-bodied with tar, roses, truffle, and dark cherry',
      category: 'wine', price: 68,
      ingredients: ['Nebbiolo'],
      calories: 135, allergens: ['Sulfites'],
      dietary: ['vegan'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'barolo.jpg',
      wineDetails: { region: 'Piedmont, Italy', type: 'Red', pairing: 'Osso Buco, Truffle Risotto' }
    },
    {
      id: 47, name: 'Dom Pérignon 2012',
      description: 'Legendary Champagne — Complex with brioche, citrus, and toasted almond',
      category: 'wine', price: 95,
      ingredients: ['Chardonnay', 'Pinot Noir'],
      calories: 100, allergens: ['Sulfites'],
      dietary: ['vegan'], spiceLevel: 0,
      isChefSpecial: true, isSeasonal: false,
      image: 'dom-perignon.jpg',
      wineDetails: { region: 'Champagne, France', type: 'Sparkling', pairing: 'Foie Gras, Toro & Uni' }
    },
    {
      id: 48, name: 'Sancerre 2021',
      description: 'Loire Valley — Crisp and refreshing with grapefruit, gooseberry, and flinty minerality',
      category: 'wine', price: 42,
      ingredients: ['Sauvignon Blanc'],
      calories: 115, allergens: ['Sulfites'],
      dietary: ['vegan'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'sancerre.jpg',
      wineDetails: { region: 'Loire Valley, France', type: 'White', pairing: 'Niçoise Salad, Sea Bass' }
    },
    {
      id: 49, name: 'Amarone della Valpolicella 2017',
      description: 'Rich and intense with dried fruit, chocolate, and warm spice',
      category: 'wine', price: 78,
      ingredients: ['Corvina', 'Rondinella', 'Molinara'],
      calories: 140, allergens: ['Sulfites'],
      dietary: ['vegan'], spiceLevel: 0,
      isChefSpecial: false, isSeasonal: false,
      image: 'amarone.jpg',
      wineDetails: { region: 'Veneto, Italy', type: 'Red', pairing: 'Côte de Boeuf, Duck Confit' }
    },
    {
      id: 50, name: 'Château d\'Yquem 2015',
      description: 'Premier Cru Supérieur, Sauternes — Luscious with apricot, honey, and saffron',
      category: 'wine', price: 120,
      ingredients: ['Sémillon', 'Sauvignon Blanc'],
      calories: 150, allergens: ['Sulfites'],
      dietary: ['vegan'], spiceLevel: 0,
      isChefSpecial: true, isSeasonal: false,
      image: 'yquem.jpg',
      wineDetails: { region: 'Sauternes, France', type: 'Dessert', pairing: 'Foie Gras, Crème Brûlée' }
    }
  ]
};
