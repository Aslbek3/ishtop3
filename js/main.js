/* ===== UstaTop — demo MVP (frontend-only, localStorage) ===== */

const CATEGORIES = [
  { key: 'santexnik', label: 'Santexnik', icon: '🚰' },
  { key: 'elektrik', label: 'Elektrik', icon: '💡' },
  { key: 'mebel', label: 'Mebel ustasi', icon: '🪚' },
  { key: 'rangsoz', label: 'Rangsoz-shtukatur', icon: '🎨' },
  { key: 'konditsioner', label: 'Konditsioner ustasi', icon: '❄️' },
  { key: 'qurilish', label: "Qurilish-ta'mirlash", icon: '🧱' },
];

const REGIONS = [
  'Toshkent shahri',
  'Toshkent viloyati',
  'Samarqand',
  'Buxoro',
  'Andijon',
  "Farg'ona",
];

const USTALAR = [
  { id: 'u1', name: 'Botir Qosimov', categoryKey: 'santexnik', region: 'Toshkent shahri', rating: 4.8, reviewsCount: 64, price: "80 000 – 150 000 so'm", phone: '+998 90 123 45 67', bio: "10 yildan ortiq tajriba. Suv, isitish tizimlari va kanalizatsiya ta'mirlash.", reviews: [
    { name: 'Shahnoza', stars: 5, text: 'Tez va sifatli ishladi, rahmat!' },
    { name: 'Jahongir', stars: 4, text: 'Narxi mos, ishni vaqtida tugatdi.' },
  ] },
  { id: 'u2', name: 'Dilshod Yusupov', categoryKey: 'santexnik', region: 'Toshkent viloyati', rating: 4.5, reviewsCount: 31, price: "70 000 – 120 000 so'm", phone: '+998 93 234 56 78', bio: "Gigiena tugunlari va isitish uskunalarini o'rnatish bo'yicha mutaxassis.", reviews: [
    { name: 'Asal', stars: 5, text: 'Juda yaxshi mutaxassis!' },
    { name: 'Oybek', stars: 4, text: 'Hammasi rejadagidek bo‘ldi.' },
  ] },
  { id: 'u3', name: 'Aziz Rahimov', categoryKey: 'elektrik', region: 'Toshkent shahri', rating: 4.9, reviewsCount: 102, price: "60 000 – 130 000 so'm", phone: '+998 94 345 67 89', bio: "Elektr simlari, rozetkalar va yoritish tizimlarini o'rnatish, ta'mirlash.", reviews: [
    { name: 'Malika', stars: 5, text: 'Juda ehtiyotkor va bilimdon.' },
    { name: 'Sardor', stars: 5, text: 'Tavsiya qilaman!' },
  ] },
  { id: 'u4', name: 'Jasur Toirov', categoryKey: 'elektrik', region: 'Samarqand', rating: 4.3, reviewsCount: 18, price: "50 000 – 100 000 so'm", phone: '+998 97 456 78 90', bio: 'Uy va ofis elektr tarmoqlarini zamonaviylashtirish.', reviews: [
    { name: 'Gulnora', stars: 4, text: 'Yaxshi ishladi, biroz kech keldi.' },
  ] },
  { id: 'u5', name: 'Shuhrat Mirzayev', categoryKey: 'mebel', region: 'Toshkent shahri', rating: 4.7, reviewsCount: 45, price: "500 000 so'mdan", phone: '+998 90 567 89 01', bio: "Buyurtma asosida mebel yasash, eski mebelni ta'mirlash va yangilash.", reviews: [
    { name: 'Nodira', stars: 5, text: 'Oshxona mebeli ajoyib chiqdi!' },
  ] },
  { id: 'u6', name: 'Bekzod Nazarov', categoryKey: 'mebel', region: 'Buxoro', rating: 4.4, reviewsCount: 22, price: "400 000 so'mdan", phone: '+998 91 678 90 12', bio: "Shkaf, stol, karavot yasash va mebel yig'ish xizmatlari.", reviews: [
    { name: 'Zarina', stars: 4, text: 'Sifatli ishladi, narxi arzon.' },
  ] },
  { id: 'u7', name: 'Olim Saidov', categoryKey: 'rangsoz', region: 'Toshkent viloyati', rating: 4.6, reviewsCount: 37, price: "25 000 so'm/kv.m", phone: '+998 93 789 01 23', bio: 'Devor, shift bo‘yash va shtukatur ishlari.', reviews: [
    { name: 'Feruza', stars: 5, text: 'Devorlarimiz juda tekis chiqdi.' },
  ] },
  { id: 'u8', name: 'Rustam Qodirov', categoryKey: 'rangsoz', region: 'Andijon', rating: 4.2, reviewsCount: 14, price: "20 000 so'm/kv.m", phone: '+998 94 890 12 34', bio: 'Ichki va tashqi bo‘yash ishlari, dekorativ shtukatur.', reviews: [
    { name: 'Hulkar', stars: 4, text: 'Vaqtida va arzon qilib berdi.' },
  ] },
  { id: 'u9', name: 'Davron Egamov', categoryKey: 'konditsioner', region: 'Toshkent shahri', rating: 4.8, reviewsCount: 58, price: "100 000 – 200 000 so'm", phone: '+998 90 901 23 45', bio: "Konditsioner va muzlatgich o'rnatish, ta'mirlash, tozalash.", reviews: [
    { name: 'Kamola', stars: 5, text: 'Konditsionerni bir kunda tozalab berdi.' },
  ] },
  { id: 'u10', name: 'Sanjar Ibragimov', categoryKey: 'konditsioner', region: "Farg'ona", rating: 4.1, reviewsCount: 9, price: "90 000 – 180 000 so'm", phone: '+998 97 012 34 56', bio: 'Sovutish tizimlarini diagnostika va ta‘mirlash.', reviews: [
    { name: 'Lola', stars: 4, text: 'Tez keldi, muammoni topdi.' },
  ] },
  { id: 'u11', name: 'Farrux Alimov', categoryKey: 'qurilish', region: 'Toshkent shahri', rating: 4.9, reviewsCount: 76, price: 'Kelishilgan narxda', phone: '+998 91 123 45 67', bio: "Kapital va kosmetik ta'mirlash, old-key ishlar.", reviews: [
    { name: 'Umida', stars: 5, text: 'Butun kvartirani ajoyib qilib berdi.' },
  ] },
  { id: 'u12', name: 'Jamshid Qurbonov', categoryKey: 'qurilish', region: 'Samarqand', rating: 4.0, reviewsCount: 11, price: 'Kelishilgan narxda', phone: '+998 93 234 56 78', bio: 'Devor, pol, shift ishlarini bajaradi.', reviews: [
    { name: 'Sevara', stars: 4, text: 'Ishni belgilangan vaqtda tugatdi.' },
  ] },
];

const ORDERS_KEY = 'ustatop_orders';

const state = {
  view: 'home',
  filters: { query: '', category: '', region: '' },
};

/* ---------- helpers ---------- */
function qs(id) { return document.getElementById(id); }

function categoryLabel(key) {
  const c = CATEGORIES.find((c) => c.key === key);
  return c ? c.label : key;
}

function findUsta(id) { return USTALAR.find((u) => u.id === id); }

function initials(name) {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

const AVATAR_COLORS = ['#0f3460', '#2a9d8f', '#e07a5f', '#5e60ce', '#c9811b', '#457b9d'];
function avatarColor(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function ratingLine(rating, reviewsCount) {
  return `⭐ ${rating.toFixed(1)} · ${reviewsCount} sharh`;
}

function pad(n) { return String(n).padStart(2, '0'); }

function formatDate(iso) {
  const d = new Date(iso);
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const STATUS_LABELS = {
  yangi: 'Yangi',
  jarayonda: 'Jarayonda',
  bajarildi: 'Bajarildi',
  bekor: 'Bekor qilindi',
};

let toastTimer = null;
function showToast(message) {
  const el = qs('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------- orders storage ---------- */
function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function addOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
}

function seedDemoOrders() {
  if (getOrders().length > 0) return;
  const now = Date.now();
  const demo = [
    { id: 'seed1', ustaId: 'u1', ustaName: 'Botir Qosimov', categoryKey: 'santexnik', name: 'Shahnoza Rahimova', phone: '+998 90 111 22 33', region: 'Toshkent shahri', comment: 'Kran oqib yotadi.', status: 'bajarildi', createdAt: new Date(now - 3 * 86400000).toISOString() },
    { id: 'seed2', ustaId: 'u3', ustaName: 'Aziz Rahimov', categoryKey: 'elektrik', name: 'Jahongir Yoqubov', phone: '+998 93 444 55 66', region: 'Toshkent shahri', comment: 'Rozetka ishlamayapti.', status: 'jarayonda', createdAt: new Date(now - 1 * 86400000).toISOString() },
    { id: 'seed3', ustaId: null, ustaName: null, categoryKey: 'mebel', name: 'Nodira Egamova', phone: '+998 94 777 88 99', region: 'Buxoro', comment: "Yangi oshxona mebeli kerak.", status: 'yangi', createdAt: new Date(now - 2 * 3600000).toISOString() },
  ];
  saveOrders(demo);
}

/* ---------- navigation ---------- */
function showView(name) {
  document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
  qs('view-' + name).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.view === name));
  state.view = name;
  document.querySelector('.view-wrap').scrollTop = 0;

  if (name === 'search') renderSearchResults();
  if (name === 'orders') renderOrdersList();
  if (name === 'admin') renderAdmin();
}

/* ---------- home ---------- */
function renderCategoryGrid() {
  qs('category-grid').innerHTML = CATEGORIES.map((c) => `
    <div class="category-card" data-action="go-category" data-key="${c.key}">
      <span class="icon">${c.icon}</span>
      <span class="label">${c.label}</span>
    </div>
  `).join('');
}

function ustaCardHtml(usta) {
  return `
    <div class="usta-card" data-action="open-profile" data-id="${usta.id}">
      <div class="usta-avatar" style="background:${avatarColor(usta.id)}">${initials(usta.name)}</div>
      <div class="usta-info">
        <div class="usta-name">${usta.name}</div>
        <div class="usta-meta">${categoryLabel(usta.categoryKey)} · ${usta.region}</div>
        <div class="usta-rating">${ratingLine(usta.rating, usta.reviewsCount)}</div>
      </div>
      <div class="usta-price">${usta.price}</div>
    </div>
  `;
}

function renderFeatured() {
  const top = [...USTALAR].sort((a, b) => b.rating - a.rating).slice(0, 4);
  qs('featured-list').innerHTML = top.map(ustaCardHtml).join('');
}

/* ---------- search ---------- */
function populateFilterSelects() {
  const catOptions = CATEGORIES.map((c) => `<option value="${c.key}">${c.label}</option>`).join('');
  const regOptions = REGIONS.map((r) => `<option value="${r}">${r}</option>`).join('');
  qs('filter-category').insertAdjacentHTML('beforeend', catOptions);
  qs('filter-region').insertAdjacentHTML('beforeend', regOptions);
}

function renderSearchResults() {
  const { query, category, region } = state.filters;
  const q = query.trim().toLowerCase();
  const results = USTALAR.filter((u) => {
    if (category && u.categoryKey !== category) return false;
    if (region && u.region !== region) return false;
    if (q && !(u.name.toLowerCase().includes(q) || categoryLabel(u.categoryKey).toLowerCase().includes(q))) return false;
    return true;
  });
  qs('search-results').innerHTML = results.length
    ? results.map(ustaCardHtml).join('')
    : '<div class="empty-state">Hech narsa topilmadi. Boshqa so‘rov bilan urinib ko‘ring.</div>';
}

function goToSearchWithCategory(key) {
  state.filters = { query: '', category: key, region: '' };
  qs('filter-query').value = '';
  qs('filter-category').value = key;
  qs('filter-region').value = '';
  showView('search');
}

/* ---------- usta profile modal ---------- */
function openProfileModal(ustaId) {
  const usta = findUsta(ustaId);
  if (!usta) return;
  qs('profile-content').innerHTML = `
    <div class="profile-header">
      <div class="usta-avatar" style="background:${avatarColor(usta.id)}">${initials(usta.name)}</div>
      <div>
        <h3>${usta.name}</h3>
        <div class="usta-meta">${categoryLabel(usta.categoryKey)} · ${usta.region}</div>
        <div class="usta-rating">${ratingLine(usta.rating, usta.reviewsCount)}</div>
      </div>
    </div>

    <div class="profile-section">
      <h4>Haqida</h4>
      <p>${usta.bio}</p>
    </div>

    <div class="profile-section">
      <h4>Narxi</h4>
      <p>${usta.price}</p>
    </div>

    <div class="profile-section">
      <h4>Telefon</h4>
      <p><a href="tel:${usta.phone.replace(/\s/g, '')}">${usta.phone}</a></p>
    </div>

    <div class="profile-section">
      <h4>Ish namunalari</h4>
      <div class="photo-placeholder">
        <div class="photo-box"><span class="photo-icon">📷</span>Namuna</div>
        <div class="photo-box"><span class="photo-icon">📷</span>Namuna</div>
        <div class="photo-box"><span class="photo-icon">📷</span>Namuna</div>
      </div>
      <p class="photo-note">Usta hali rasm yuklamagan</p>
    </div>

    <div class="profile-section">
      <h4>Mijoz fikrlari</h4>
      ${usta.reviews.map((r) => `
        <div class="review-item">
          <div class="review-name">${r.name}</div>
          <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
          <div class="review-text">${r.text}</div>
        </div>
      `).join('')}
    </div>

    <button class="btn btn-primary btn-block" data-action="open-order" data-id="${usta.id}">Buyurtma berish</button>
  `;
  qs('modal-profile').classList.add('open');
}

/* ---------- order modal ---------- */
function populateOrderSelects() {
  qs('order-category').innerHTML = CATEGORIES.map((c) => `<option value="${c.key}">${c.label}</option>`).join('');
  qs('order-region').innerHTML = '<option value="">Hududni tanlang</option>' + REGIONS.map((r) => `<option value="${r}">${r}</option>`).join('');
}

const ORDER_FIELD_IDS = ['order-category', 'order-name', 'order-phone', 'order-region'];

function setFieldError(inputId, message) {
  const input = qs(inputId);
  const err = qs('err-' + inputId);
  input.classList.toggle('invalid', Boolean(message));
  if (err) err.textContent = message || '';
}

function clearOrderFormErrors() {
  ORDER_FIELD_IDS.forEach((id) => setFieldError(id, ''));
}

function validateOrderForm() {
  let valid = true;

  const categoryKey = qs('order-category').value;
  if (!categoryKey) { setFieldError('order-category', 'Xizmat turini tanlang'); valid = false; }
  else setFieldError('order-category', '');

  const name = qs('order-name').value.trim();
  if (!name) { setFieldError('order-name', 'Ism familiyangizni kiriting'); valid = false; }
  else setFieldError('order-name', '');

  const phone = qs('order-phone').value.trim();
  const digits = phone.replace(/\D/g, '');
  if (!phone) { setFieldError('order-phone', 'Telefon raqamingizni kiriting'); valid = false; }
  else if (digits.length < 9) { setFieldError('order-phone', "Telefon raqam to'liq emas"); valid = false; }
  else setFieldError('order-phone', '');

  const region = qs('order-region').value;
  if (!region) { setFieldError('order-region', 'Hududni tanlang'); valid = false; }
  else setFieldError('order-region', '');

  return valid;
}

function openOrderModal(ustaId) {
  const usta = ustaId ? findUsta(ustaId) : null;
  qs('order-usta-id').value = usta ? usta.id : '';
  qs('order-usta-info').textContent = usta
    ? `Tanlangan usta: ${usta.name} (${categoryLabel(usta.categoryKey)})`
    : "Mutaxassis tanlanmagan — buyurtmangizni ko'rib, mos ustani biz tanlaymiz.";
  qs('order-category').value = usta ? usta.categoryKey : CATEGORIES[0].key;
  qs('order-region').value = usta ? usta.region : '';
  qs('order-name').value = '';
  qs('order-phone').value = '';
  qs('order-comment').value = '';
  clearOrderFormErrors();
  qs('modal-order').classList.add('open');
  closeModal(qs('modal-profile'));
}

function handleOrderSubmit(e) {
  e.preventDefault();
  if (!validateOrderForm()) {
    showToast('Belgilangan maydonlarni tekshirib qayta urinib ko‘ring');
    return;
  }

  const ustaId = qs('order-usta-id').value || null;
  const usta = ustaId ? findUsta(ustaId) : null;

  addOrder({
    id: 'o_' + Date.now(),
    ustaId,
    ustaName: usta ? usta.name : null,
    categoryKey: qs('order-category').value,
    name: qs('order-name').value.trim(),
    phone: qs('order-phone').value.trim(),
    region: qs('order-region').value,
    comment: qs('order-comment').value.trim(),
    status: 'yangi',
    createdAt: new Date().toISOString(),
  });

  closeModal(qs('modal-order'));
  showToast('Buyurtmangiz qabul qilindi!');
  if (state.view === 'orders') renderOrdersList();
}

/* ---------- orders (mijoz) ---------- */
function renderOrdersList() {
  const orders = getOrders();
  qs('orders-list').innerHTML = orders.length
    ? orders.map((o) => `
      <div class="order-card">
        <div class="order-top">
          <span class="order-service">${categoryLabel(o.categoryKey)}</span>
          <span class="badge badge-${o.status}">${STATUS_LABELS[o.status]}</span>
        </div>
        <div class="order-meta">${o.ustaName ? 'Usta: ' + o.ustaName : 'Usta tanlanmoqda'} · ${o.region}</div>
        <div class="order-date">${formatDate(o.createdAt)}</div>
      </div>
    `).join('')
    : '<div class="empty-state">Hali buyurtma yo‘q.</div>';
}

/* ---------- admin ---------- */
function renderAdmin() {
  const orders = getOrders();
  const counts = { yangi: 0, jarayonda: 0, bajarildi: 0, bekor: 0 };
  orders.forEach((o) => { counts[o.status] = (counts[o.status] || 0) + 1; });

  qs('admin-stats').innerHTML = `
    <div class="stat-card"><div class="stat-value">${orders.length}</div><div class="stat-label">Jami buyurtmalar</div></div>
    <div class="stat-card"><div class="stat-value">${counts.yangi}</div><div class="stat-label">Yangi</div></div>
    <div class="stat-card"><div class="stat-value">${counts.jarayonda}</div><div class="stat-label">Jarayonda</div></div>
    <div class="stat-card"><div class="stat-value">${counts.bajarildi}</div><div class="stat-label">Bajarildi</div></div>
  `;

  qs('admin-orders').innerHTML = orders.length ? orders.map((o) => {
    const matchingUstalar = USTALAR.filter((u) => u.categoryKey === o.categoryKey);
    return `
      <div class="admin-order-card">
        <div class="order-top">
          <span class="order-service">${categoryLabel(o.categoryKey)}</span>
          <span class="order-date">${formatDate(o.createdAt)}</span>
        </div>
        <div class="order-meta">${o.name} · ${o.phone}</div>
        <div class="order-meta">${o.region}${o.comment ? ' · ' + o.comment : ''}</div>

        <div class="field-label">Holat</div>
        <select data-role="status-select" data-order-id="${o.id}">
          ${Object.entries(STATUS_LABELS).map(([key, label]) => `<option value="${key}" ${o.status === key ? 'selected' : ''}>${label}</option>`).join('')}
        </select>

        <div class="field-label">Ustaga biriktirish</div>
        <select data-role="assign-select" data-order-id="${o.id}">
          <option value="">Tanlanmagan</option>
          ${matchingUstalar.map((u) => `<option value="${u.id}" ${o.ustaId === u.id ? 'selected' : ''}>${u.name}</option>`).join('')}
        </select>

        <button class="remove-btn" data-action="remove-order" data-id="${o.id}">Buyurtmani o'chirish</button>
      </div>
    `;
  }).join('') : '<div class="empty-state">Hali buyurtmalar yo‘q.</div>';
}

function updateOrderStatus(orderId, status) {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return;
  order.status = status;
  saveOrders(orders);
  renderAdmin();
  if (state.view === 'orders') renderOrdersList();
}

function assignUsta(orderId, ustaId) {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return;
  order.ustaId = ustaId || null;
  order.ustaName = ustaId ? findUsta(ustaId).name : null;
  saveOrders(orders);
  renderAdmin();
  if (state.view === 'orders') renderOrdersList();
}

function removeOrder(orderId) {
  confirmDialog("Buyurtmani o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.", () => {
    saveOrders(getOrders().filter((o) => o.id !== orderId));
    renderAdmin();
    if (state.view === 'orders') renderOrdersList();
  });
}

/* ---------- modal helpers ---------- */
function closeModal(modalEl) { modalEl.classList.remove('open'); }

let confirmCallback = null;
function confirmDialog(message, onConfirm) {
  qs('confirm-message').textContent = message;
  confirmCallback = onConfirm;
  qs('modal-confirm').classList.add('open');
}

/* ---------- wiring ---------- */
function init() {
  seedDemoOrders();
  renderCategoryGrid();
  renderFeatured();
  populateFilterSelects();
  populateOrderSelects();

  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => closeModal(btn.closest('.modal')));
  });

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(closeModal);
  });

  qs('home-search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const value = qs('home-search-input').value;
    state.filters = { query: value, category: '', region: '' };
    qs('filter-query').value = value;
    qs('filter-category').value = '';
    qs('filter-region').value = '';
    showView('search');
  });

  qs('quick-order-btn').addEventListener('click', () => openOrderModal(null));
  qs('orders-new-btn').addEventListener('click', () => openOrderModal(null));

  qs('filter-query').addEventListener('input', (e) => { state.filters.query = e.target.value; renderSearchResults(); });
  qs('filter-category').addEventListener('change', (e) => { state.filters.category = e.target.value; renderSearchResults(); });
  qs('filter-region').addEventListener('change', (e) => { state.filters.region = e.target.value; renderSearchResults(); });

  qs('order-form').addEventListener('submit', handleOrderSubmit);

  ORDER_FIELD_IDS.forEach((id) => {
    qs(id).addEventListener('input', () => setFieldError(id, ''));
    qs(id).addEventListener('change', () => setFieldError(id, ''));
  });

  qs('confirm-cancel').addEventListener('click', () => {
    confirmCallback = null;
    closeModal(qs('modal-confirm'));
  });

  qs('confirm-ok').addEventListener('click', () => {
    const cb = confirmCallback;
    confirmCallback = null;
    closeModal(qs('modal-confirm'));
    if (cb) cb();
  });

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;
    if (action === 'open-profile') openProfileModal(el.dataset.id);
    if (action === 'go-category') goToSearchWithCategory(el.dataset.key);
    if (action === 'open-order') openOrderModal(el.dataset.id);
    if (action === 'remove-order') removeOrder(el.dataset.id);
  });

  document.addEventListener('change', (e) => {
    if (e.target.matches('[data-role="status-select"]')) updateOrderStatus(e.target.dataset.orderId, e.target.value);
    if (e.target.matches('[data-role="assign-select"]')) assignUsta(e.target.dataset.orderId, e.target.value);
  });
}

document.addEventListener('DOMContentLoaded', init);
