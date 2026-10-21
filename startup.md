# Startup loyihalari — umumiy arxiv

> Manba: ChatGPT suhbati "Startup loyiha g'oyalari"
> (`https://chatgpt.com/share/6ad85d36-1584-83ed-9c63-74024a8609b3`)
> Arxivlangan: 2026-10-21 · Egasi: Aslbek3

Bu fayl — suhbatdagi barcha g'oyalar, biznes-rejalar va demo
spetsifikatsiyalarining to'liq xulosasi. Har bir startup **alohida**
ko'tariladi; bu fayl keyingi bosqichlar uchun yagona ma'lumot manbai.

---

## Umumiy kontekst (foydalanuvchi sharoiti)

| Parametr | Qiymat |
|---|---|
| Maqsad | Tezroq daromad olish |
| Budjet | 1–5 mln so'm |
| Mahsulot turi | Mobil ilova (avval PWA veb-ilova) |
| Qurilma | Faqat Android telefon |
| Dasturlash darajasi | Boshlovchi / no-code afzal |
| Bozor | O'zbekiston (Toshkentdan tashqari viloyat) |
| Hozirgi deploy usuli | GitHub Pages (`gh` CLI, Aslbek3) |

**Muhim tamoyil:** pullik xizmatlarga pul sarflashdan oldin bepul
vositalar bilan demo qilib, haqiqiy talabni tekshirish.

---

## Loyihalar holati

| # | Loyiha | Demo | Kod | Deploy |
|---|---|---|---|---|
| 1 | **UstaTop** | ✅ tayyor | ✅ `fr5/ustatop` | ✅ [jonli](https://aslbek3.github.io/ishtop3/) |
| 2 | **IjaraGo** | ✅ qayta qurildi | ✅ `fr5/ijarago` | ✅ [jonli](https://aslbek3.github.io/ijarago/) |
| 3 | **LUXPLAY** | ✅ tayyor | ✅ `fr5/luxplay` | ✅ [jonli](https://aslbek3.github.io/luxplay/) |
| 4 | **BiznesAI** | ❌ | ❌ | ⏳ |
| 5 | **MahallaMarket** | ❌ | ❌ | ⏳ |

---

# 1. UstaTop — ustalar va mijozlar platformasi

**Holati:** demo tayyor, deploy qilindi. Suhbatda eng chuqur ishlangan loyiha.

## Nima qiladi

Odamlar santexnik, elektrik, mebel ustasi va boshqa mutaxassislarni
topadi, narx va sharhlarni ko'radi, onlayn buyurtma beradi.

**Oqim:** mijoz ustani topadi → buyurtma yuboradi → usta bilan
bog'lanadi → platforma daromad oladi.

**Asosiy ustunlik:** boshlash uchun murakkab to'lov tizimi, jonli xarita
yoki AI shart emas. Ishonchli ustalar ro'yxati + tezkor aloqa +
buyurtmalarni boshqarish — shu kifoya.

**Oddiy e'lonlar saytidan ajralib turish uchun keyin qo'shiladi:**
tekshirilgan ustalar, haqiqiy mijoz sharhlari, buyurtma tarixi,
kafolat shartlari.

## Daromad modeli

| Xizmat | Rejalashtirilgan narx |
|---|---:|
| Oddiy usta profili | Bepul |
| Ustaning reklama profili | 100 000–200 000 so'm/oy |
| Muvaffaqiyatli buyurtma uchun haq | 10 000–25 000 so'm |
| Birinchi mijozlar uchun aksiya | Bepul / chegirmali |

> Bular sinov narxlari, bozorda tasdiqlanmagan. Avval ustalar pul
> to'lashga tayyormi — shuni tekshirish kerak.

## Budjet smetasi (~2.5 mln so'm)

| Maqsad | Summa |
|---|---:|
| No-code MVP va hosting | 500 000 |
| Dizayn va brend | 200 000 |
| Ustalarni jalb qilish va tekshirish | 350 000 |
| Reklama sinovi | 650 000 |
| Internet, aloqa, boshqa | 200 000 |
| Zaxira mablag' | 600 000 |

> Pulning hammasini birdan sarflamaslik kerak — avval mijozlar
> haqiqatan buyurtma berishini tekshir.

## MVP tarkibi (4 ekran)

1. **Bosh sahifa** — xizmat turlari, hudud tanlash, qidiruv
2. **Usta profili** — ism, hudud, telefon, ish namunalari, fikrlar
3. **Buyurtma berish** — xizmat tanlash, aloqa, yuborish
4. **Boshqaruv paneli** — buyurtmalarni ko'rish, ustaga biriktirish, natija

**Birinchi versiyada QILINMAYDI:** jonli xarita, ichki chat, karta
orqali to'lov, murakkab reyting algoritmi, iPhone ilovasi.

## 30 kunlik reja

1. **Bozorni tekshirish** — 1 hudud, 15–20 usta + 10 mijoz bilan suhbat
2. **Ustalar bazasi** — kamida 10 usta bilan kelishish, rozilik bilan ma'lumot yig'ish
3. **MVP yaratish** — katalog + profillar + buyurtma formasi
4. **Sinov va birinchi mijozlar** — tanishlar, mahalliy guruhlar, kichik reklama
5. **Natijani o'lchash** — murojaat / buyurtma / reklama narxi / ustalar qaytishi

## Muvaffaqiyat mezonlari (1-oy oxiri)

| Ko'rsatkich | Maqsad |
|---|---:|
| Ro'yxatga olingan ustalar | 10–20 |
| Haqiqiy mijoz murojaatlari | 20+ |
| Bajarilgan buyurtmalar | 10+ |
| Pullik xizmatga qiziqqan ustalar | 3+ |
| Mijoz shikoyatlari | Har birini qayd etish va hal qilish |

## Texnologiya yo'li

1. **Hozir:** PWA veb-ilova (HTML/CSS/JS) — telefon bosh ekraniga qo'shiladi
2. **Buyurtmalar:** oddiy baza + boshqaruv paneli
3. **Sinovdan keyin:** Flutter + Firebase → Android ilovasi
4. **Talab tasdiqlansa:** iPhone versiyasi

> Do'konlarga joylashtirish hozircha kutiladi: Google Play — bir martalik
> $25, Apple Developer Program — yiliga $99.

## Texnik holati (hozirgi repo)

- `public/index.html` (141 satr) — SPA ko'rinishidagi ekranlar
- `public/css/style.css` (724 satr) — Inter font, mobil-first
- `public/js/main.js` (535 satr) — ekranlar almashishi, qidiruv, buyurtma
- Backend yo'q, build yo'q — sof statik sayt, nisbiy yo'llar
- Oldingi deploy: `playful-crostata-5b9376.netlify.app` (Netlify Drop)

## Keyingi qadamlar

- [x] GitHub Pages'ga deploy
- [ ] Haqiqiy buyurtmalarni saqlash (Google Sheets / Firebase)
- [ ] Ustalar bazasini bitta viloyatda to'ldirish
- [ ] PWA manifest + offline ishlashi
- [ ] Logotip va brend ranglari
- [ ] Nom va domen bandligini tekshirish (`UstaTop` — ishchi nom)

---

# 2. IjaraGo — kvartira ijarasi platformasi

**Holati:** ✅ **demo tayyor va deploy qilingan** — https://aslbek3.github.io/ijarago/

Asl fayllar ChatGPT sandboxida yo'qolgan edi (`ijarago_demo_complete.html`,
`ijarago_complete_site.zip`), shuning uchun quyidagi spetsifikatsiya
bo'yicha noldan qayta yozildi. Repo: `Aslbek3/ijarago`, papka: `d:/fr5/ijarago`.

## Tanlangan parametrlar

| Parametr | Qiymat |
|---|---|
| Brend nomi | **IjaraGo** (variantlar: Makonim, UyManzil) |
| Hudud | Butun O'zbekiston |
| E'lon beruvchilar | Uy egalari **va** rieltorlar |
| Ijara muddati | Kunlik **va** uzoq muddatli |
| Interfeys tili | O'zbekcha + ruscha |
| Aloqa usuli | Telefon qo'ng'iroq **va** Telegram |

## Raqobatchilar (O'zbekiston)

OLX, Urbo, Uyiz.uz

## Demo funksiyalari (to'liq spetsifikatsiya)

1. **Uy qidirish va e'lonlar** — kunlik/uzoq muddatli, hudud, narx,
   xonalar soni bo'yicha filtr
2. **Interaktiv xarita** — e'lon belgilarini xaritada ko'rish, hudud va
   ijara turi bo'yicha saralash (internet talab qiladi)
3. **Aloqa** — telefon qo'ng'irog'i va Telegram profiliga o'tish
4. **Saqlash** — tanlangan e'lonlar va yangi kiritilgan e'lonlar
   brauzer xotirasida (`localStorage`)
5. **Ikki til** — uz/ru almashtirish tugmasi
6. **Mobil dizayn** — Android ekraniga mos, kartalar + batafsil sahifa

## Dizayn tizimi (chatdagi ranglar)

- Asosiy yashil: `#17634f`
- Och fon: `#e4f3ed` / `#e5f3eb`
- Oq matn ustida: `#D4E6DF`

## "Mukammal versiya" rejasi (4 blok)

1. **Professional dizayn** — zamonaviy bosh sahifa, kvartira kartalari,
   katta rasmlar, batafsil e'lon sahifasi, filtrlar
2. **Haqiqiy ishlaydigan e'lonlar** — uy egasi/rieltor akkaunt ochadi,
   rasm + narx + manzil joylaydi, e'lonlar bazada saqlanadi va hammaga ko'rinadi
3. **Foydali funksiyalar** — saqlangan e'lonlar, aloqa, xarita,
   kunlik + uzoq muddatli, uz/ru
4. **Ishonchli platforma** — e'lonlarni tekshirish, soxta e'lonlarga
   qarshi choralar, administrator paneli, Android ilova

## Keyingi qadamlar

- [x] Demo kodini noldan yozish
- [x] Xarita: Leaflet 1.9.4 + OpenStreetMap
- [x] GitHub Pages'ga deploy
- [ ] Haqiqiy umumiy baza (PocketBase — UstaTop bilan bir xil andoza)
- [ ] Foydalanuvchi akkauntlari va admin panel
- [ ] Uy rasmlarini yuklash

---

# 3. LUXPLAY — o'yinchilar uchun yagona platforma

**Holati:** ✅ **demo tayyor va deploy qilingan** — https://aslbek3.github.io/luxplay/

Suhbatda demo yaratilmagan edi, faqat g'oya sifatida eslatilgan.
Tungi mavzuda noldan yozildi. Repo: `Aslbek3/luxplay`, papka: `d:/fr5/luxplay`.

O'yinlar, do'stlar, chat, ovozli xonalar, profillar va sovg'alar bitta
ilovada. Avval kichik ishlaydigan versiya, keyin kengaytirish.

**Daromad:** premium obuna, virtual sovg'alar, hamkorlik.

## Demo tarkibi

O'yinlar katalogi (8 ta, 5 janr), ovozli xonalar, do'stlar ro'yxati,
virtual sovg'alar (6 tur, 💎 balans), Premium obuna oqimi, profil.

## Keyingi qadamlar

- [x] Demo kodini yozish va deploy qilish
- [ ] Ovozli aloqa — WebRTC (eng og'ir qism)
- [ ] Real vaqt chat
- [ ] To'lov tizimi (tanga sotib olish)
- [ ] O'yin integratsiyasi

> LUXPLAY texnik jihatdan eng og'ir loyiha: ovoz va real vaqt aloqasi
> kerak. Shuning uchun UstaTop va IjaraGo backendidan keyin ko'tariladi.

---

# 4. BiznesAI — kichik biznes uchun sun'iy intellekt

**Holati:** faqat g'oya.

Do'konlar va xizmat ko'rsatuvchilar uchun reklama matni, post, narxlar
ro'yxati va mijozlarga javob tayyorlaydi.

**Daromad:** oylik obuna va pullik funksiyalar.

**Eslatma:** API xarajati bor — 1–5 mln budjetda narxlashni
ehtiyotkorlik bilan hisoblash kerak.

---

# 5. MahallaMarket — mahalliy savdo platformasi

**Holati:** faqat g'oya.

Mahalliy do'konlar mahsulotlarini internet orqali ko'rsatadi, xaridor
buyurtma beradi.

**Daromad:** sotuvdan komissiya va do'konlar uchun reklama.

---

## Suhbatdan olingan saboqlar

1. **No-code yo'li qiyin bo'ldi.** Google Sheets + Forms + AppSheet
   zanjiri Android telefonda juda chalkash chiqdi — foydalanuvchi
   "Qiynalib kettim" degan nuqtaga keldi. Yechim: to'g'ridan-to'g'ri
   HTML demo yozish ancha tez va aniq bo'ldi.
2. **Bitta HTML fayl + statik hosting** eng tez yo'l: Netlify Drop yoki
   GitHub Pages.
3. **Fayllarni o'z repoda saqlash kerak.** IjaraGo demosi ChatGPT
   sandboxida qolib ketgani uchun butunlay yo'qoldi — shuning uchun
   har bir loyiha o'z GitHub repositoriyasida bo'lishi shart.
4. **Har bir startupni alohida ko'tarish** — bitta repoda aralashtirmaslik.
