
let cart = {};

document.addEventListener('DOMContentLoaded', () => {
  renderGrid('veg-starter-grid',    MENU.vegStarters);
  renderGrid('nveg-starter-grid',   MENU.nonVegStarters);
  renderGrid('indian-veg-grid',     MENU.indianVeg);
  renderGrid('indian-nonveg-grid',  MENU.indianNonVeg);
  renderGrid('chinese-grid',        MENU.chinese);
  renderGrid('desserts-grid',       MENU.desserts);
});

// ---------- RENDER MENU CARDS ----------
function renderGrid(gridId, items) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = items.map(item => `
    <div class="menu-card" id="card-${item.id}">
      <div class="card-top">
        <span class="food-emoji">${item.emoji}</span>
        <span class="${item.type === 'veg' ? 'veg-badge' : 'nonveg-badge'}" title="${item.type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
      </div>
      <div class="food-name">${item.name}</div>
      <div class="food-price">₹${item.price}</div>
      <div class="qty-control">
        <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
        <span class="qty-display" id="qty-${item.id}">1</span>
        <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
        <button class="add-btn ${cart[item.id] ? 'added' : ''}" id="addbtn-${item.id}" onclick="addToCart('${item.id}')">
          ${cart[item.id] ? '✓ Added' : 'Add'}
        </button>
      </div>
    </div>
  `).join('');
}

// ---------- FIND ITEM ----------
function findItem(id) {
  const all = [
    ...MENU.vegStarters, ...MENU.nonVegStarters,
    ...MENU.indianVeg, ...MENU.indianNonVeg,
    ...MENU.chinese, ...MENU.desserts
  ];
  return all.find(i => i.id === id);
}

// ---------- CHANGE QTY (in card, before adding) ----------
function changeQty(id, delta) {
  const qtyEl = document.getElementById(`qty-${id}`);
  let qty = parseInt(qtyEl.textContent);
  qty = Math.max(1, qty + delta);
  qtyEl.textContent = qty;
}

// ---------- ADD TO CART ----------
function addToCart(id) {
  const item = findItem(id);
  const qty = parseInt(document.getElementById(`qty-${id}`).textContent);

  if (cart[id]) {
    cart[id].qty += qty;
  } else {
    cart[id] = { item, qty };
  }

  // Update button appearance
  const btn = document.getElementById(`addbtn-${id}`);
  btn.textContent = '✓ Added';
  btn.classList.add('added');

  updateCartFloat();
  showToast(`${item.name} added to cart!`);
}

// ---------- UPDATE CART FLOATING BAR ----------
function updateCartFloat() {
  const float = document.getElementById('cartFloat');
  const totalItems = Object.values(cart).reduce((s, v) => s + v.qty, 0);
  const totalAmt   = Object.values(cart).reduce((s, v) => s + v.item.price * v.qty, 0);

  document.getElementById('cartCount').textContent = totalItems;
  document.getElementById('cartTotal').textContent = totalAmt;

  float.style.display = totalItems > 0 ? 'block' : 'none';
}

// ---------- SHOW / CLOSE BILL ----------
function showBill() {
  renderBill();
  document.getElementById('billModal').style.display = 'flex';
}

function closeBill() {
  document.getElementById('billModal').style.display = 'none';
}

// Close on overlay click
document.addEventListener('click', (e) => {
  if (e.target.id === 'billModal') closeBill();
});

// ---------- RENDER BILL ----------
function renderBill() {
  const billItems = document.getElementById('billItems');
  const entries = Object.values(cart);

  if (entries.length === 0) {
    billItems.innerHTML = '<div class="bill-empty">🍽 Your cart is empty.<br>Add some delicious items!</div>';
    document.getElementById('subtotal').textContent   = '₹0';
    document.getElementById('gstAmt').textContent     = '₹0';
    document.getElementById('grandTotal').textContent = '₹0';
    return;
  }

  billItems.innerHTML = entries.map(({ item, qty }) => `
    <div class="bill-item">
      <span class="bill-item-name">${item.emoji} ${item.name}</span>
      <span class="bill-item-qty">× ${qty}</span>
      <span class="bill-item-price">₹${item.price * qty}</span>
      <button class="bill-item-remove" onclick="removeFromCart('${item.id}')" title="Remove">🗑</button>
    </div>
  `).join('');

  const subtotal  = entries.reduce((s, { item, qty }) => s + item.price * qty, 0);
  const gst       = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  document.getElementById('subtotal').textContent   = `₹${subtotal.toFixed(2)}`;
  document.getElementById('gstAmt').textContent     = `₹${gst.toFixed(2)}`;
  document.getElementById('grandTotal').textContent = `₹${grandTotal.toFixed(2)}`;
}

// ---------- REMOVE FROM CART ----------
function removeFromCart(id) {
  delete cart[id];

  // Reset button
  const btn = document.getElementById(`addbtn-${id}`);
  if (btn) {
    btn.textContent = 'Add';
    btn.classList.remove('added');
    document.getElementById(`qty-${id}`).textContent = '1';
  }

  updateCartFloat();
  renderBill();
}

// ---------- BUILD WHATSAPP MESSAGE ----------
function buildWhatsAppMessage(customerName) {
  const entries = Object.values(cart);
  if (entries.length === 0) return null;

  const subtotal   = entries.reduce((s, { item, qty }) => s + item.price * qty, 0);
  const gst        = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  let msg = `🍽 *Multi-Cuisine Restaurant*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  if (customerName) msg += `👤 *Customer:* ${customerName}\n`;
  msg += `📅 *Date:* ${dateStr}  🕐 *Time:* ${timeStr}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `*ORDER DETAILS*\n\n`;

  entries.forEach(({ item, qty }) => {
    const badge = item.type === 'veg' ? '🟢' : '🔴';
    msg += `${badge} ${item.name}\n   × ${qty}  →  ₹${item.price * qty}\n\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *Subtotal:*    ₹${subtotal.toFixed(2)}\n`;
  msg += `🧾 *GST (18%):*  ₹${gst.toFixed(2)}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `✅ *Grand Total: ₹${grandTotal.toFixed(2)}*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🙏 *Thank you for dining with us!*\n`;
  msg += `_Your Pleasure, Our Comfort! Visit Again!_ 😊`;

  return msg;
}

// ---------- SEND WHATSAPP ----------
function sendWhatsApp() {
  const entries = Object.values(cart);
  if (entries.length === 0) {
    showToast('⚠️ Cart is empty! Add items first.');
    return;
  }

  const countryCode   = document.getElementById('countryCode').value.trim();
  const phoneRaw      = document.getElementById('customerPhone').value.trim();
  const customerName  = document.getElementById('customerName').value.trim();

  // Validate phone
  const phoneClean = phoneRaw.replace(/\D/g, '');
  if (!phoneClean || phoneClean.length < 7) {
    showToast('⚠️ Please enter a valid phone number.');
    return;
  }

  const fullPhone = countryCode + phoneClean;
  const message   = buildWhatsAppMessage(customerName);
  const encoded   = encodeURIComponent(message);

  // WhatsApp Universal Link
  const url = `https://wa.me/${fullPhone}?text=${encoded}`;
  window.open(url, '_blank');
}

// ---------- SECTION / TAB NAVIGATION ----------
function showSection(sectionId) {
  document.querySelectorAll('.menu-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
  event.currentTarget.classList.add('active');
}

function showSubTab(subId, btn) {
  const parent = btn.closest('.menu-section');
  parent.querySelectorAll('.sub-section').forEach(s => s.classList.remove('active'));
  parent.querySelectorAll('.sub-tab').forEach(b => b.classList.remove('active'));
  document.getElementById(subId).classList.add('active');
  btn.classList.add('active');
}

// ---------- TOAST NOTIFICATION ----------
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}
