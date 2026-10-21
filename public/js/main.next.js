/* ===== UstaTop — PocketBase backend bilan ishlaydigan versiya =====
   Bu fayl hali JONLI EMAS — index.html hozircha eski main.js'ga ishora
   qiladi. Ishga tushirish: index.html'ni index.next.html bilan,
   main.js'ni shu fayl bilan almashtirish (va api.js'ni ulash kerak). */

/* To'liq katalog — barcha yo'nalishlar.
   popular: true bo'lganlari bosh sahifada plitka sifatida chiqadi,
   qolganlari "Boshqa" bo'limida (to'liq katalog) ko'rinadi. */
const CATEGORIES = [
  { key: 'santexnik',    label: 'Santexnik',       icon: '🚰', popular: true },
  { key: 'elektrik',     label: 'Elektrik',        icon: '💡', popular: true },
  { key: 'konditsioner', label: 'Konditsioner',    icon: '❄️', popular: true },
  { key: 'texnika',      label: 'Texnika',         icon: '🧺', popular: true },
  { key: 'mebel',        label: 'Mebel',           icon: '🪑', popular: true },
  { key: 'boyoqchi',     label: "Bo'yoqchi",       icon: '🖌️', popular: true },

  { key: 'qurilish',     label: "Qurilish-ta'mir", icon: '🧱' },
  { key: 'kafel',        label: 'Kafelchi',        icon: '◼️' },
  { key: 'gaz',          label: 'Gaz uskunalari',  icon: '🔥' },
  { key: 'eshik',        label: 'Eshik-deraza',    icon: '🚪' },
  { key: 'tom',          label: 'Tom yopish',      icon: '🏠' },
  { key: 'payvand',      label: 'Payvandchi',      icon: '⚙️' },
  { key: 'tozalash',     label: 'Tozalash',        icon: '🧹' },
  { key: 'kochirish',    label: 'Yuk ko‘chirish',  icon: '🚚' },
  { key: 'bogbon',       label: 'Bog‘bon',         icon: '🌿' },
  { key: 'kompyuter',    label: 'Kompyuter',       icon: '💻' },
];

/* "Boshqa" plitkasining maxsus kaliti — xizmat turi emas, katalogni ochadi */
const CATALOG_KEY = '__catalog__';

/* Bosh sahifadagi 8 plitka: Barchasi + 6 mashhur + Boshqa (4x2 grid) */
const HOME_TILES = [
  { key: '', label: 'Barchasi', icon: '🧰' },
  ...CATEGORIES.filter((c) => c.popular),
  { key: CATALOG_KEY, label: 'Boshqa', icon: '➕' },
];

const REGIONS = [
  'Toshkent shahri',
  'Toshkent viloyati',
  'Samarqand',
  'Buxoro',
  'Andijon',
  "Farg'ona",
];

const ROLES = {
  mijoz: { label: 'Mijoz', icon: '🙋', note: 'Usta qidiraman va buyurtma beraman' },
  usta:  { label: 'Usta',  icon: '🛠️', note: 'Xizmat ko‘rsataman, buyurtma qabul qilaman' },
};

const STATUS_LABELS = {
  yangi: 'Yangi',
  jarayonda: 'Jarayonda',
  bajarildi: 'Bajarildi',
  bekor: 'Bekor qilindi',
};

const LOGO_TAPS_NEEDED = 5;

/* Ustalar ro'yxati PocketBase'dan bir marta yuklanib, xotirada saqlanadi —
   har bir kartani chizishda qayta so'rov yubormaslik uchun. Yangi usta
   ro'yxatdan o'tganda yoki admin panel ochilganda yangilanadi. */
let ustalarCache = [];

async function loadUstalar() {
  try {
    ustalarCache = await Api.listUstalar();
  } catch (e) {
    showToast('Ustalar ro‘yxatini yuklab bo‘lmadi: ' + e.message);
  }
}

const state = {
  view: 'home',
  homeCategory: '',                                   /* bosh sahifa filtri — qidiruvga ta'sir qilmaydi */
  filters: { query: '', category: '', region: '' },   /* "Ustalar" bo'limi filtri */
  authRole: 'mijoz',
};

/* ---------- helpers ---------- */
function qs(id) { return document.getElementById(id); }

/* HTML'ga qo'yiladigan har qanday ma'lumot shu yerdan o'tadi — boshqa
   foydalanuvchilarga ko'rinadigan matn, shuning uchun tozalanishi shart
   (aks holda kimdir <script> yozib XSS qilishi mumkin). */
function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function categoryLabel(key) {
  const c = CATEGORIES.find((c) => c.key === key);
  return c ? c.label : key;
}

function findUsta(id) { return ustalarCache.find((u) => u.id === id); }

function initials(name) {
  return String(name || '').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

const AVATAR_COLORS = ['#0f3460', '#2a9d8f', '#e07a5f', '#5e60ce', '#c9811b', '#457b9d'];
function avatarColor(id) {
  let hash = 0;
  const s = String(id || '');
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function ratingLine(rating, reviewsCount) {
  return `⭐ ${Number(rating || 0).toFixed(1)} · ${reviewsCount || 0} sharh`;
}

function pad(n) { return String(n).padStart(2, '0'); }

function formatDate(iso) {
  const d = new Date(iso);
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

let toastTimer = null;
function showToast(message) {
  const el = qs('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------- Boshqaruv paneli (admin) ----------
   Panel oddiy foydalanuvchiga ko'rinmaydi: pastki navigatsiyada tugmasi yo'q.
   Kirishning ikki yo'li bor:
     1) havolaga #admin qo'shish  — masalan  .../index.html#admin
     2) hero'dagi "U" logosiga ketma-ket 5 marta bosish (telefon uchun qulay)
   Ikkalasida ham parol so'raladi — bu PocketBase'dagi haqiqiy superuser
   hisobi, serverda tekshiriladi (oldingi JS-ichidagi PIN kabi emas). */
let logoTaps = 0;
let logoTapTimer = null;

function requestAdmin() {
  if (Api.isAdminUnlocked()) { showView('admin'); return; }
  qs('pin').value = '';
  setFieldError('pin', '');
  qs('modal-pin').classList.add('open');
  setTimeout(() => qs('pin').focus(), 50);
}

function exitAdmin() {
  Api.adminLogout();
  if (location.hash === '#admin') history.replaceState(null, '', location.pathname + location.search);
  showView('home');
  showToast('Boshqaruv panelidan chiqdingiz');
}

/* Logoga 5 marta bosish (3 soniya ichida) */
function handleLogoTap() {
  logoTaps += 1;
  clearTimeout(logoTapTimer);
  logoTapTimer = setTimeout(() => { logoTaps = 0; }, 3000);
  if (logoTaps >= LOGO_TAPS_NEEDED) {
    logoTaps = 0;
    requestAdmin();
  }
}

/* ---------- navigation ---------- */
function showView(name) {
  /* Boshqaruv paneli faqat admin kirgandan keyin ochiladi */
  if (name === 'admin' && !Api.isAdminUnlocked()) { requestAdmin(); return; }

  document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
  qs('view-' + name).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.view === name));
  qs('appbar').classList.toggle('compact', name !== 'home');
  state.view = name;
  document.querySelector('.view-wrap').scrollTop = 0;
  window.scrollTo(0, 0);

  if (name === 'search') renderSearchResults();
  if (name === 'orders') renderOrdersList();
  if (name === 'admin') renderAdmin();
  if (name === 'catalog') renderCatalog();
  if (name === 'profile') renderProfile();
}

/* ---------- home ---------- */
function renderCategoryGrid() {
  qs('category-grid').innerHTML = HOME_TILES.map((c) => `
    <div class="category-card${c.key === state.homeCategory && c.key !== CATALOG_KEY ? ' active' : ''}" data-action="home-category" data-key="${c.key}">
      <span class="icon">${c.icon}</span>
      <span class="label">${c.label}</span>
    </div>
  `).join('');
}

/* Bosh sahifadagi plitka bosilganda — shu sahifada filtrlanadi,
   "Boshqa" esa to'liq katalog bo'limini ochadi. */
function pickHomeCategory(key) {
  if (key === CATALOG_KEY) { showView('catalog'); return; }
  state.homeCategory = key;
  renderCategoryGrid();
  renderFeatured();
}

function ustaCardHtml(usta) {
  return `
    <div class="usta-card" data-action="open-profile" data-id="${esc(usta.id)}">
      <div class="usta-avatar" style="background:${avatarColor(usta.id)}">${esc(initials(usta.name))}</div>
      <div class="usta-info">
        <div class="usta-name">${esc(usta.name)}</div>
        <div class="usta-meta">${esc(categoryLabel(usta.categoryKey))} · ${esc(usta.region)}</div>
        <div class="usta-rating">${ratingLine(usta.rating, usta.reviewsCount)}</div>
      </div>
      <div class="usta-price">${esc(usta.price)}</div>
    </div>
  `;
}

function renderFeatured() {
  const cat = state.homeCategory;
  const region = state.filters.region;

  let pool = ustalarCache;
  if (cat) pool = pool.filter((u) => u.categoryKey === cat);
  if (region) pool = pool.filter((u) => u.region === region);

  const sorted = [...pool].sort((a, b) => b.rating - a.rating);
  const top = cat ? sorted : sorted.slice(0, 4);   /* filtrsiz holatda faqat eng yaxshi 4 ta */

  qs('featured-title').textContent = cat ? categoryLabel(cat) + ' ustalari' : 'Tavsiya etilgan ustalar';
  qs('featured-list').innerHTML = top.length
    ? top.map(ustaCardHtml).join('')
    : `<div class="empty-state">${region ? 'Bu hududda' : 'Bu yo‘nalishda'} hozircha usta yo‘q.</div>`;
  qs('featured-count').textContent = top.length ? top.length + ' ta' : '';
}

/* ---------- to'liq katalog ("Boshqa" bo'limi) ---------- */
function renderCatalog() {
  qs('catalog-list').innerHTML = CATEGORIES.map((c) => {
    const count = ustalarCache.filter((u) => u.categoryKey === c.key).length;
    return `
      <button type="button" class="catalog-row" data-action="catalog-pick" data-key="${c.key}">
        <span class="catalog-icon">${c.icon}</span>
        <span class="catalog-label">${c.label}</span>
        <span class="catalog-count">${count} ta usta</span>
      </button>
    `;
  }).join('');
  qs('catalog-count').textContent = CATEGORIES.length + ' yo‘nalish';
}

/* ---------- hudud tanlash ---------- */
function renderRegionOptions() {
  const opts = [{ value: '', label: 'Barcha hududlar' }, ...REGIONS.map((r) => ({ value: r, label: r }))];
  qs('region-options').innerHTML = opts.map((o) => `
    <button type="button" class="region-option${o.value === state.filters.region ? ' active' : ''}" data-action="pick-region" data-region="${o.value}">${o.label}</button>
  `).join('');
}

function setRegion(region) {
  state.filters.region = region;
  qs('region-pill-label').textContent = region || 'Hudud tanlash';
  qs('filter-region').value = region;
  renderFeatured();
  if (state.view === 'search') renderSearchResults();
}

/* ---------- search ---------- */
function populateFilterSelects() {
  const catOptions = CATEGORIES.map((c) => `<option value="${esc(c.key)}">${esc(c.label)}</option>`).join('');
  const regOptions = REGIONS.map((r) => `<option value="${esc(r)}">${esc(r)}</option>`).join('');
  qs('filter-category').insertAdjacentHTML('beforeend', catOptions);
  qs('filter-region').insertAdjacentHTML('beforeend', regOptions);
}

function renderSearchResults() {
  const { query, category, region } = state.filters;
  const q = query.trim().toLowerCase();
  const results = ustalarCache.filter((u) => {
    if (category && u.categoryKey !== category) return false;
    if (region && u.region !== region) return false;
    if (q && !(u.name.toLowerCase().includes(q) || categoryLabel(u.categoryKey).toLowerCase().includes(q))) return false;
    return true;
  });
  qs('search-results').innerHTML = results.length
    ? results.map(ustaCardHtml).join('')
    : '<div class="empty-state">Hech narsa topilmadi. Boshqa so‘rov bilan urinib ko‘ring.</div>';
  qs('search-count').textContent = results.length + ' ta';
}

function goToSearchWithCategory(key) {
  /* tanlangan hudud saqlanadi — faqat xizmat turi va matn so'rovi yangilanadi */
  state.filters = { query: '', category: key, region: state.filters.region };
  qs('filter-query').value = '';
  qs('filter-category').value = key;
  showView('search');
}

/* ---------- Profil ekrani ---------- */
async function renderProfile() {
  const acc = Api.currentUser();
  const box = qs('profile-view');

  if (!acc) {
    box.innerHTML = `
      <div class="auth-intro">
        <div class="auth-emoji">👤</div>
        <h3>Akkauntga kiring</h3>
        <p>Buyurtmalaringizni saqlash yoki usta sifatida xizmat ko‘rsatish uchun akkaunt oching.</p>
      </div>
      <div class="role-cards">
        ${Object.entries(ROLES).map(([key, r]) => `
          <button type="button" class="role-card" data-action="open-auth" data-role="${key}">
            <span class="role-icon">${r.icon}</span>
            <b>${r.label}</b>
            <small>${r.note}</small>
          </button>
        `).join('')}
      </div>
      <p class="admin-note">Telefon raqamingiz akkauntingizni aniqlaydi — shu raqam bilan istalgan qurilmadan kira olasiz.</p>
    `;
    return;
  }

  const role = ROLES[acc.role] || ROLES.mijoz;

  let roleBlock = '';
  if (acc.role === 'usta') {
    roleBlock = `
      <div class="profile-block">
        <h4>Xizmatim</h4>
        <p>${esc(categoryLabel(acc.categoryKey))} · ${esc(acc.region)}</p>
        <p class="muted">${esc(acc.price || 'Narx ko‘rsatilmagan')}</p>
        ${acc.bio ? `<p class="muted">${esc(acc.bio)}</p>` : ''}
      </div>
      <div class="profile-block">
        <h4>Yo‘nalishimdagi buyurtmalar</h4>
        <p class="muted">Buyurtmalar administrator tomonidan ustalarga biriktiriladi — biriktirilgan buyurtma haqida siz bilan telefon orqali bog‘lanishadi.</p>
      </div>
    `;
  } else {
    const myOrders = await Api.listMyOrders().catch(() => []);
    roleBlock = `
      <div class="profile-block">
        <h4>Buyurtmalarim</h4>
        <p><b>${myOrders.length}</b> ta buyurtma</p>
        <button type="button" class="link-btn" data-action="go-orders">Buyurtmalarni ko‘rish</button>
      </div>
    `;
  }

  box.innerHTML = `
    <div class="profile-card">
      <div class="usta-avatar" style="background:${avatarColor(acc.id)}">${esc(initials(acc.name))}</div>
      <div class="profile-id">
        <b>${esc(acc.name)}</b>
        <span class="muted">${esc(acc.phone)}</span>
        <span class="role-badge">${role.icon} ${role.label}</span>
      </div>
    </div>
    ${roleBlock}
    <div class="profile-block">
      <h4>Hudud</h4>
      <p>${esc(acc.region)}</p>
    </div>
    ${Api.isAdminUnlocked() ? '<button type="button" class="btn btn-secondary btn-block" data-action="go-admin">⚙ Boshqaruv paneli</button>' : ''}
    <button type="button" class="btn btn-secondary btn-block" data-action="logout">Akkauntdan chiqish</button>
  `;
}

/* ---------- Kirish / ro'yxatdan o'tish modali ---------- */
function openAuthModal(role) {
  state.authRole = role in ROLES ? role : 'mijoz';
  renderAuthForm();
  qs('modal-auth').classList.add('open');
}

function renderAuthForm() {
  const isUsta = state.authRole === 'usta';
  qs('auth-title').textContent = ROLES[state.authRole].label + ' sifatida kirish';
  qs('auth-usta-fields').style.display = isUsta ? 'block' : 'none';
  qs('auth-category').required = isUsta;

  document.querySelectorAll('[data-role-tab]').forEach((b) => {
    b.classList.toggle('active', b.dataset.roleTab === state.authRole);
  });
}

const AUTH_FIELD_IDS = ['auth-name', 'auth-phone', 'auth-region', 'auth-category'];

function validateAuthForm() {
  let ok = true;
  AUTH_FIELD_IDS.forEach((id) => setFieldError(id, ''));

  if (!qs('auth-name').value.trim()) { setFieldError('auth-name', 'Ismingizni kiriting'); ok = false; }

  const phone = qs('auth-phone').value.trim();
  if (!phone) { setFieldError('auth-phone', 'Telefon raqamingizni kiriting'); ok = false; }
  else if (phone.replace(/\D/g, '').length < 9) { setFieldError('auth-phone', "Raqam to'liq emas"); ok = false; }

  if (!qs('auth-region').value) { setFieldError('auth-region', 'Hududni tanlang'); ok = false; }

  if (state.authRole === 'usta' && !qs('auth-category').value) {
    setFieldError('auth-category', 'Xizmat turini tanlang'); ok = false;
  }
  return ok;
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  if (!validateAuthForm()) return;

  const fields = {
    role: state.authRole,
    name: qs('auth-name').value.trim(),
    phone: qs('auth-phone').value.trim(),
    region: qs('auth-region').value,
  };
  if (state.authRole === 'usta') {
    fields.categoryKey = qs('auth-category').value;
    fields.price = qs('auth-price').value.trim();
    fields.bio = qs('auth-bio').value.trim();
  }

  const submitBtn = qs('auth-form').querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  try {
    const { account } = await Api.signInOrRegister(fields);
    if (fields.role === 'usta') await loadUstalar();

    closeModal(qs('modal-auth'));
    qs('auth-form').reset();
    renderProfile();
    renderFeatured();
    renderCatalog();
    showToast(fields.role === 'usta' ? 'Usta sifatida kirdingiz' : 'Xush kelibsiz, ' + account.name);
  } catch (err) {
    showToast('Xatolik: ' + err.message);
  } finally {
    submitBtn.disabled = false;
  }
}

function logout() {
  Api.logoutUser();
  renderProfile();
  showToast('Akkauntdan chiqdingiz');
}

/* ---------- usta profile modal ---------- */
function openProfileModal(ustaId) {
  const usta = findUsta(ustaId);
  if (!usta) return;
  const reviews = usta.reviews || [];
  qs('profile-content').innerHTML = `
    <div class="profile-header">
      <div class="usta-avatar" style="background:${avatarColor(usta.id)}">${esc(initials(usta.name))}</div>
      <div>
        <h3>${esc(usta.name)}</h3>
        <div class="usta-meta">${esc(categoryLabel(usta.categoryKey))} · ${esc(usta.region)}</div>
        <div class="usta-rating">${ratingLine(usta.rating, usta.reviewsCount)}</div>
      </div>
    </div>

    <div class="profile-section">
      <h4>Haqida</h4>
      <p>${esc(usta.bio)}</p>
    </div>

    <div class="profile-section">
      <h4>Narxi</h4>
      <p>${esc(usta.price)}</p>
    </div>

    <div class="profile-section">
      <h4>Telefon</h4>
      <p><a href="tel:${esc(usta.phone.replace(/\s/g, ''))}">${esc(usta.phone)}</a></p>
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
      ${reviews.length ? reviews.map((r) => `
        <div class="review-item">
          <div class="review-name">${esc(r.name)}</div>
          <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
          <div class="review-text">${esc(r.text)}</div>
        </div>
      `).join('') : '<p class="muted">Hozircha sharhlar yo‘q.</p>'}
    </div>

    <button class="btn btn-primary btn-block" data-action="open-order" data-id="${esc(usta.id)}">Buyurtma berish</button>
  `;
  qs('modal-profile').classList.add('open');
}

/* ---------- order modal ---------- */
function populateAuthSelects() {
  qs('auth-region').insertAdjacentHTML('beforeend', REGIONS.map((r) => `<option value="${esc(r)}">${esc(r)}</option>`).join(''));
  qs('auth-category').insertAdjacentHTML('beforeend', CATEGORIES.map((c) => `<option value="${esc(c.key)}">${esc(c.label)}</option>`).join(''));
}

function populateOrderSelects() {
  qs('order-category').innerHTML = CATEGORIES.map((c) => `<option value="${esc(c.key)}">${esc(c.label)}</option>`).join('');
  qs('order-region').innerHTML = '<option value="">Hududni tanlang</option>' + REGIONS.map((r) => `<option value="${esc(r)}">${esc(r)}</option>`).join('');
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
    ? `Tanlangan usta: ${esc(usta.name)} (${esc(categoryLabel(usta.categoryKey))})`
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

async function handleOrderSubmit(e) {
  e.preventDefault();
  if (!validateOrderForm()) {
    showToast('Belgilangan maydonlarni tekshirib qayta urinib ko‘ring');
    return;
  }

  const ustaId = qs('order-usta-id').value || null;
  const usta = ustaId ? findUsta(ustaId) : null;

  const submitBtn = qs('order-form').querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  try {
    await Api.createOrder({
      usta: ustaId,
      ustaName: usta ? usta.name : '',
      categoryKey: qs('order-category').value,
      name: qs('order-name').value.trim(),
      phone: qs('order-phone').value.trim(),
      region: qs('order-region').value,
      comment: qs('order-comment').value.trim(),
    });
    closeModal(qs('modal-order'));
    showToast('Buyurtmangiz qabul qilindi!');
    if (state.view === 'orders') renderOrdersList();
  } catch (err) {
    showToast('Xatolik: ' + err.message);
  } finally {
    submitBtn.disabled = false;
  }
}

/* ---------- orders (mijoz) ---------- */
async function renderOrdersList() {
  if (!Api.currentUser()) {
    qs('orders-list').innerHTML = '<div class="empty-state">Buyurtmalaringizni ko‘rish uchun avval akkauntga kiring (Profil bo‘limi).</div>';
    qs('orders-count').textContent = '';
    return;
  }

  let orders = [];
  try {
    orders = await Api.listMyOrders();
  } catch (e) {
    qs('orders-list').innerHTML = `<div class="empty-state">Buyurtmalarni yuklab bo‘lmadi: ${esc(e.message)}</div>`;
    return;
  }

  qs('orders-list').innerHTML = orders.length
    ? orders.map((o) => `
      <div class="order-card">
        <div class="order-top">
          <span class="order-service">${categoryLabel(o.categoryKey)}</span>
          <span class="badge badge-${o.status}">${STATUS_LABELS[o.status]}</span>
        </div>
        <div class="order-meta">${o.ustaName ? 'Usta: ' + esc(o.ustaName) : 'Usta tanlanmoqda'} · ${esc(o.region)}</div>
        <div class="order-date">${formatDate(o.created)}</div>
      </div>
    `).join('')
    : '<div class="empty-state">Hali buyurtma yo‘q.</div>';
  qs('orders-count').textContent = orders.length ? orders.length + ' ta' : '';
}

/* ---------- admin ---------- */
async function renderAdmin() {
  await loadUstalar();   /* admin har doim eng yangi ro'yxatni ko'rsin */

  let orders = [];
  try {
    orders = await Api.listAllOrders();
  } catch (e) {
    qs('admin-orders').innerHTML = `<div class="empty-state">Buyurtmalarni yuklab bo‘lmadi: ${esc(e.message)}</div>`;
    return;
  }

  const counts = { yangi: 0, jarayonda: 0, bajarildi: 0, bekor: 0 };
  orders.forEach((o) => { counts[o.status] = (counts[o.status] || 0) + 1; });

  qs('admin-stats').innerHTML = `
    <div class="stat-card"><div class="stat-value">${orders.length}</div><div class="stat-label">Jami buyurtmalar</div></div>
    <div class="stat-card"><div class="stat-value">${counts.yangi}</div><div class="stat-label">Yangi</div></div>
    <div class="stat-card"><div class="stat-value">${counts.jarayonda}</div><div class="stat-label">Jarayonda</div></div>
    <div class="stat-card"><div class="stat-value">${counts.bajarildi}</div><div class="stat-label">Bajarildi</div></div>
  `;

  qs('admin-orders').innerHTML = orders.length ? orders.map((o) => {
    const matchingUstalar = ustalarCache.filter((u) => u.categoryKey === o.categoryKey);
    return `
      <div class="admin-order-card">
        <div class="order-top">
          <span class="order-service">${categoryLabel(o.categoryKey)}</span>
          <span class="order-date">${formatDate(o.created)}</span>
        </div>
        <div class="order-meta">${esc(o.name)} · ${esc(o.phone)}</div>
        <div class="order-meta">${esc(o.region)}${o.comment ? ' · ' + esc(o.comment) : ''}</div>

        <div class="field-label">Holat</div>
        <select data-role="status-select" data-order-id="${esc(o.id)}">
          ${Object.entries(STATUS_LABELS).map(([key, label]) => `<option value="${key}" ${o.status === key ? 'selected' : ''}>${label}</option>`).join('')}
        </select>

        <div class="field-label">Ustaga biriktirish</div>
        <select data-role="assign-select" data-order-id="${esc(o.id)}">
          <option value="">Tanlanmagan</option>
          ${matchingUstalar.map((u) => `<option value="${esc(u.id)}" ${o.usta === u.id ? 'selected' : ''}>${esc(u.name)}</option>`).join('')}
        </select>

        <button class="remove-btn" data-action="remove-order" data-id="${esc(o.id)}">Buyurtmani o'chirish</button>
      </div>
    `;
  }).join('') : '<div class="empty-state">Hali buyurtmalar yo‘q.</div>';
}

async function updateOrderStatus(orderId, status) {
  try {
    await Api.updateOrder(orderId, { status });
    renderAdmin();
  } catch (e) {
    showToast('Xatolik: ' + e.message);
  }
}

async function assignUsta(orderId, ustaId) {
  try {
    const usta = ustaId ? findUsta(ustaId) : null;
    await Api.updateOrder(orderId, { usta: ustaId || null, ustaName: usta ? usta.name : '' });
    renderAdmin();
  } catch (e) {
    showToast('Xatolik: ' + e.message);
  }
}

function removeOrder(orderId) {
  confirmDialog("Buyurtmani o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.", async () => {
    try {
      await Api.deleteOrder(orderId);
      renderAdmin();
    } catch (e) {
      showToast('Xatolik: ' + e.message);
    }
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
async function init() {
  await loadUstalar();
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

  /* --- akkaunt --- */
  populateAuthSelects();
  renderProfile();

  document.querySelectorAll('[data-role-tab]').forEach((btn) => {
    btn.addEventListener('click', () => { state.authRole = btn.dataset.roleTab; renderAuthForm(); });
  });

  qs('auth-form').addEventListener('submit', handleAuthSubmit);
  AUTH_FIELD_IDS.forEach((id) => {
    qs(id).addEventListener('input', () => setFieldError(id, ''));
    qs(id).addEventListener('change', () => setFieldError(id, ''));
  });

  /* --- boshqaruv paneliga maxfiy kirish --- */
  document.querySelector('.brand-mark').addEventListener('click', handleLogoTap);

  qs('admin-exit').addEventListener('click', exitAdmin);

  qs('pin-cancel').addEventListener('click', () => closeModal(qs('modal-pin')));

  qs('pin-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const pinBtn = qs('pin-form').querySelector('button[type="submit"]');
    pinBtn.disabled = true;
    try {
      await Api.adminLogin(qs('pin').value.trim());
      setFieldError('pin', '');
      closeModal(qs('modal-pin'));
      showView('admin');
      showToast('Boshqaruv paneli ochildi');
    } catch (err) {
      setFieldError('pin', "Parol noto'g'ri");
      qs('pin').value = '';
    } finally {
      pinBtn.disabled = false;
    }
  });

  qs('pin').addEventListener('input', () => setFieldError('pin', ''));

  /* havolada #admin bo'lsa — panelga kirishga urinadi */
  if (location.hash === '#admin') requestAdmin();
  window.addEventListener('hashchange', () => {
    if (location.hash === '#admin') requestAdmin();
  });

  qs('region-pill').addEventListener('click', () => {
    renderRegionOptions();
    qs('modal-region').classList.add('open');
  });

  qs('quick-order-btn').addEventListener('click', () => openOrderModal(null));
  qs('orders-new-btn').addEventListener('click', () => openOrderModal(null));

  qs('filter-query').addEventListener('input', (e) => { state.filters.query = e.target.value; renderSearchResults(); });
  qs('filter-category').addEventListener('change', (e) => { state.filters.category = e.target.value; renderSearchResults(); });
  qs('filter-region').addEventListener('change', (e) => { setRegion(e.target.value); renderSearchResults(); });

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
    if (action === 'home-category') pickHomeCategory(el.dataset.key);
    if (action === 'catalog-pick') goToSearchWithCategory(el.dataset.key);
    if (action === 'open-auth') openAuthModal(el.dataset.role);
    if (action === 'logout') logout();
    if (action === 'go-orders') showView('orders');
    if (action === 'go-admin') showView('admin');
    if (action === 'pick-region') {
      setRegion(el.dataset.region);
      renderRegionOptions();
      closeModal(qs('modal-region'));
      showToast(el.dataset.region ? el.dataset.region + ' tanlandi' : 'Barcha hududlar');
    }
    if (action === 'open-order') openOrderModal(el.dataset.id);
    if (action === 'remove-order') removeOrder(el.dataset.id);
  });

  document.addEventListener('change', (e) => {
    if (e.target.matches('[data-role="status-select"]')) updateOrderStatus(e.target.dataset.orderId, e.target.value);
    if (e.target.matches('[data-role="assign-select"]')) assignUsta(e.target.dataset.orderId, e.target.value);
  });
}

document.addEventListener('DOMContentLoaded', init);
