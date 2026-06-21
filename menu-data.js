// =============================================
// menu-data.js — All menu items for the restaurant
// =============================================

const MENU = {

  // ---- VEG STARTERS ----
  vegStarters: [
    { id: 'vs1',  name: 'Paneer Tikka',          price: 110, emoji: '🧀', type: 'veg' },
    { id: 'vs2',  name: 'Veg Seekh Kabab',        price: 110, emoji: '🌿', type: 'veg' },
    { id: 'vs3',  name: 'Hara Bhara Kabab',       price: 110, emoji: '🟢', type: 'veg' },
    { id: 'vs4',  name: 'Shanghai Spring Roll',   price: 150, emoji: '🥢', type: 'veg' },
    { id: 'vs5',  name: 'American Corn Ball',     price: 150, emoji: '🌽', type: 'veg' },
    { id: 'vs6',  name: 'Crispy American Corn',   price: 140, emoji: '🌽', type: 'veg' },
    { id: 'vs7',  name: 'Crispy Baby Corn',       price: 140, emoji: '🌾', type: 'veg' },
    { id: 'vs8',  name: 'Crispy Mushroom',        price: 120, emoji: '🍄', type: 'veg' },
    { id: 'vs9',  name: 'Crispy Chilly Potato',   price: 120, emoji: '🥔', type: 'veg' },
    { id: 'vs10', name: 'Crispy Chilly Chana',    price: 150, emoji: '🫘', type: 'veg' },
  ],

  // ---- NON-VEG STARTERS ----
  nonVegStarters: [
    { id: 'nvs1',  name: 'Chicken Tikka',         price: 170, emoji: '🍗', type: 'nonveg' },
    { id: 'nvs2',  name: 'Murg Reshmi Kabab',     price: 170, emoji: '🍖', type: 'nonveg' },
    { id: 'nvs3',  name: 'Murg Chilli Kabab',     price: 160, emoji: '🌶️', type: 'nonveg' },
    { id: 'nvs4',  name: 'Chicken Seekh Kabab',   price: 180, emoji: '🍖', type: 'nonveg' },
    { id: 'nvs5',  name: 'Tangdi Kabab',          price: 180, emoji: '🍗', type: 'nonveg' },
    { id: 'nvs6',  name: 'Murg Tandoori',         price: 190, emoji: '🔥', type: 'nonveg' },
    { id: 'nvs7',  name: 'Fish Ajwani Tikka',     price: 190, emoji: '🐟', type: 'nonveg' },
    { id: 'nvs8',  name: 'Chilli Chicken',        price: 160, emoji: '🌶️', type: 'nonveg' },
    { id: 'nvs9',  name: 'Drums of Heaven',       price: 180, emoji: '🍗', type: 'nonveg' },
    { id: 'nvs10', name: 'Shanghai Chicken',      price: 180, emoji: '🥡', type: 'nonveg' },
  ],

  // ---- INDIAN VEG MAIN COURSE ----
  indianVeg: [
    { id: 'iv1', name: 'Shahi Paneer',       price: 180, emoji: '🧀', type: 'veg' },
    { id: 'iv2', name: 'Navratan Korma',     price: 180, emoji: '🍲', type: 'veg' },
    { id: 'iv3', name: 'Kadahi Paneer',      price: 150, emoji: '🫕', type: 'veg' },
    { id: 'iv4', name: 'Malai Kofta',        price: 140, emoji: '🥘', type: 'veg' },
    { id: 'iv5', name: 'Kadahi Vegetable',   price: 140, emoji: '🥦', type: 'veg' },
  ],

  // ---- INDIAN NON-VEG MAIN COURSE ----
  indianNonVeg: [
    { id: 'inv1', name: 'Butter Chicken',       price: 220, emoji: '🍗', type: 'nonveg' },
    { id: 'inv2', name: 'Chicken Biryani',      price: 250, emoji: '🍚', type: 'nonveg' },
    { id: 'inv3', name: 'Mutton Rogan Josh',    price: 280, emoji: '🍖', type: 'nonveg' },
    { id: 'inv4', name: 'Fish Curry',           price: 230, emoji: '🐟', type: 'nonveg' },
    { id: 'inv5', name: 'Chicken Masala',       price: 210, emoji: '🍛', type: 'nonveg' },
  ],

  // ---- CHINESE MAIN COURSE ----
  chinese: [
    { id: 'ch1', name: 'Veg Fried Rice',           price: 150, emoji: '🍚', type: 'veg' },
    { id: 'ch2', name: 'Chicken Fried Rice',        price: 190, emoji: '🍚', type: 'nonveg' },
    { id: 'ch3', name: 'Veg Hakka Noodles',         price: 140, emoji: '🍜', type: 'veg' },
    { id: 'ch4', name: 'Chicken Hakka Noodles',     price: 180, emoji: '🍜', type: 'nonveg' },
    { id: 'ch5', name: 'Manchurian (Dry)',           price: 160, emoji: '🥢', type: 'veg' },
    { id: 'ch6', name: 'Schezwan Chicken',           price: 200, emoji: '🌶️', type: 'nonveg' },
  ],

  // ---- DESSERTS ----
  desserts: [
    { id: 'd1', name: 'Softy Pineapple',            price: 110, emoji: '🍍', type: 'veg' },
    { id: 'd2', name: 'Softy Crunchy Chocolate',    price: 110, emoji: '🍫', type: 'veg' },
    { id: 'd3', name: 'Chocolate Walnut Brownie',   price: 190, emoji: '🍰', type: 'veg' },
  ],
};
