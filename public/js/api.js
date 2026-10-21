/* ===== UstaTop — PocketBase bilan aloqa qiluvchi qatlam =====
   Bitta domenda ishlaydi (/api/...), shuning uchun CORS sozlash shart emas.

   Ikki xil "sessiya" bor:
   - Foydalanuvchi (mijoz/usta) — localStorage'da saqlanadi, brauzer yopilsa ham qoladi.
   - Admin (superuser) — sessionStorage'da saqlanadi, brauzer yopilganda o'chadi
     (avvalgi PIN-himoya xuddi shunday ishlar edi, xavfsizlik odati saqlanadi).

   DIQQAT — telefon raqamiga asoslangan "parol": foydalanuvchidan email/parol
   so'ralmaydi (hozirgi forma shunga mos emas), shuning uchun telefon
   raqamidan email+parol avtomatik hosil qilinadi. Bu ism-telefon orqali
   "kirish" bo'lgan avvalgi demo xatti-harakatini saqlab qoladi — haqiqiy
   maxfiy parol emas. Shu raqamni bilgan kishi o'sha akkauntga kira oladi.
   Haqiqiy parolli kirish — keyingi versiya uchun. */

const Api = (() => {
  const USER_KEY = 'ustatop_user_auth';
  const ADMIN_KEY = 'ustatop_admin_auth';
  const ADMIN_EMAIL = 'aslbekno07@gmail.com';

  /* ---------- past darajadagi so'rov ---------- */
  async function request(path, { method = 'GET', body, token } = {}) {
    const headers = {};
    if (token) headers['Authorization'] = token;
    if (body !== undefined) headers['Content-Type'] = 'application/json';

    let res;
    try {
      res = await fetch(path, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
    } catch (e) {
      throw new Error('Internetga ulanishda xatolik. Qayta urinib ko‘ring.');
    }

    let data = null;
    try { data = await res.json(); } catch (e) { /* bo'sh javob (masalan DELETE) */ }

    if (!res.ok) {
      throw new Error(extractErrorMessage(data, res.status));
    }
    return data;
  }

  function extractErrorMessage(data, status) {
    if (data && data.data && Object.keys(data.data).length) {
      const firstField = Object.keys(data.data)[0];
      const fieldErr = data.data[firstField];
      if (fieldErr && fieldErr.message) return fieldErr.message;
    }
    if (data && data.message) return data.message;
    return `Xatolik yuz berdi (${status})`;
  }

  function digitsOnly(phone) {
    return String(phone || '').replace(/\D/g, '');
  }

  /* Telefon raqamidan barqaror email+parol hosil qiladi (yuqoridagi izohga qarang) */
  function deriveCredentials(phone) {
    const digits = digitsOnly(phone);
    return {
      email: `u${digits}@ustatop.local`,
      password: `Ust@${digits}Top!`,
    };
  }

  /* ---------- foydalanuvchi sessiyasi (mijoz/usta) ---------- */
  function getUserSession() {
    try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch (e) { return null; }
  }
  function setUserSession(session) {
    try {
      if (session) localStorage.setItem(USER_KEY, JSON.stringify(session));
      else localStorage.removeItem(USER_KEY);
    } catch (e) { /* xotira ishlamasa ham ilova davom etadi */ }
  }
  function currentUser() {
    const s = getUserSession();
    return s ? s.record : null;
  }

  async function loginUser(email, password) {
    const data = await request('/api/collections/users/auth-with-password', {
      method: 'POST',
      body: { identity: email, password },
    });
    const session = { token: data.token, record: data.record };
    setUserSession(session);
    return session;
  }

  async function registerUser(fields) {
    const { email, password } = deriveCredentials(fields.phone);
    await request('/api/collections/users/records', {
      method: 'POST',
      body: {
        email,
        password,
        passwordConfirm: password,
        name: fields.name,
        phone: fields.phone,
        region: fields.region,
        role: fields.role,
        categoryKey: fields.categoryKey || '',
        price: fields.price || '',
        bio: fields.bio || '',
      },
    });
    return loginUser(email, password);
  }

  /* Ism/telefon/hudud (va kerak bo'lsa usta maydonlari) bilan "kirish" —
     agar bu telefon bilan akkaunt bo'lsa kiradi, bo'lmasa yaratadi.
     Avvalgi demo xatti-harakati: forma = kirish ham, ro'yxatdan o'tish ham. */
  async function authenticateAccount(fields) {
    const { email, password } = deriveCredentials(fields.phone);
    try {
      const session = await loginUser(email, password);
      // Ma'lumotlar o'zgargan bo'lishi mumkin (ism, hudud) — yangilab qo'yamiz
      const patch = {
        name: fields.name, region: fields.region, role: fields.role,
        categoryKey: fields.categoryKey || '', price: fields.price || '', bio: fields.bio || '',
      };
      const updated = await request(`/api/collections/users/records/${session.record.id}`, {
        method: 'PATCH', body: patch, token: session.token,
      });
      session.record = updated;
      setUserSession(session);
      return { session, isNew: false };
    } catch (e) {
      const session = await registerUser(fields);
      return { session, isNew: true };
    }
  }

  function logoutUser() { setUserSession(null); }

  /* ---------- admin (superuser) sessiyasi ---------- */
  function getAdminSession() {
    try { return JSON.parse(sessionStorage.getItem(ADMIN_KEY)); } catch (e) { return null; }
  }
  function setAdminSession(session) {
    try {
      if (session) sessionStorage.setItem(ADMIN_KEY, JSON.stringify(session));
      else sessionStorage.removeItem(ADMIN_KEY);
    } catch (e) { /* xotira ishlamasa ham ilova davom etadi */ }
  }
  function isAdminUnlocked() { return !!getAdminSession(); }

  async function adminLogin(password) {
    const data = await request('/api/collections/_superusers/auth-with-password', {
      method: 'POST',
      body: { identity: ADMIN_EMAIL, password },
    });
    setAdminSession({ token: data.token });
    return true;
  }

  function adminLogout() { setAdminSession(null); }

  /* ---------- ustalar ---------- */
  async function listUstalar() {
    const data = await request('/api/collections/ustalar/records?perPage=200&sort=-rating');
    return data.items;
  }

  async function createUstaProfile(fields, accountId, token) {
    return request('/api/collections/ustalar/records', {
      method: 'POST',
      token,
      body: {
        name: fields.name,
        phone: fields.phone,
        region: fields.region,
        categoryKey: fields.categoryKey,
        price: fields.price || 'Kelishilgan narxda',
        bio: fields.bio || 'Yangi usta — hozircha sharhlar yo‘q.',
        rating: 0,
        reviewsCount: 0,
        reviews: [],
        active: true,
        account: accountId,
      },
    });
  }

  /* Akkaunt orqali kirish/ro'yxatdan o'tish + (kerak bo'lsa) usta profilini yaratish.
     main.js shu bitta funksiyani chaqiradi. */
  async function signInOrRegister(fields) {
    const { session, isNew } = await authenticateAccount(fields);

    if (fields.role === 'usta') {
      const mine = await request(
        `/api/collections/ustalar/records?filter=${encodeURIComponent(`account="${session.record.id}"`)}`,
        { token: session.token },
      );
      if (!mine.items.length) {
        await createUstaProfile(fields, session.record.id, session.token);
      }
    }
    return { account: session.record, isNew };
  }

  /* ---------- buyurtmalar ---------- */
  async function createOrder(order) {
    const session = getUserSession();
    return request('/api/collections/buyurtmalar/records', {
      method: 'POST',
      token: session ? session.token : undefined,
      body: { ...order, status: 'yangi', account: session ? session.record.id : '' },
    });
  }

  async function listMyOrders() {
    const session = getUserSession();
    if (!session) return [];
    const data = await request(
      `/api/collections/buyurtmalar/records?perPage=100&sort=-created&filter=${encodeURIComponent(`account="${session.record.id}"`)}`,
      { token: session.token },
    );
    return data.items;
  }

  async function listAllOrders() {
    const admin = getAdminSession();
    if (!admin) return [];
    const data = await request('/api/collections/buyurtmalar/records?perPage=200&sort=-created', {
      token: admin.token,
    });
    return data.items;
  }

  async function updateOrder(id, patch) {
    const admin = getAdminSession();
    return request(`/api/collections/buyurtmalar/records/${id}`, {
      method: 'PATCH', body: patch, token: admin ? admin.token : undefined,
    });
  }

  async function deleteOrder(id) {
    const admin = getAdminSession();
    return request(`/api/collections/buyurtmalar/records/${id}`, {
      method: 'DELETE', token: admin ? admin.token : undefined,
    });
  }

  return {
    currentUser, getUserSession, signInOrRegister, logoutUser,
    isAdminUnlocked, adminLogin, adminLogout,
    listUstalar,
    createOrder, listMyOrders, listAllOrders, updateOrder, deleteOrder,
  };
})();
