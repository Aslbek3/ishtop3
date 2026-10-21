# Dizayn tizimi — UstaTop

> ⚠️ **Ikkita turli dizayn mavjud:**
> - **A — Netlify demo** (skrinshotdagi, *tasdiqlangan uslub*) — kodi yo'q
> - **B — repodagi kod** (`public/`) — eskiroq, boshqa ko'rinish
>
> Quyidagi tizim **A**dan olingan. Ranglar skrinshotdan piksel
> darajasida o'lchangan (576×1280, Android).

Bu uslub barcha startup demolarida (IjaraGo, LUXPLAY, BiznesAI,
MahallaMarket) qayta ishlatiladi — faqat brend rangi o'zgaradi.

---

## 1. Ranglar (skrinshotdan o'lchangan)

### Brend — yorqin ko'k

| Rol | Kod | Qayerda |
|---|---|---|
| Brend (asosiy) | `#1457d9` | "Qidirish" tugmasi, faol nav |
| Hero gradient — yuqori | `#1757cf` | hero boshi |
| Hero gradient — past | `#2370ea` | hero oxiri |
| Brend — shaffof ustama | `#3877e1` | "Hudud tanlash" pill (oq 15% ustama) |

> Repodagi eski `#0f3460` (to'q ko'k) **emas** — yangi dizayn ancha
> yorqin va "elektr" ko'k.

### Fon va yuza

| Rol | Kod | Izoh |
|---|---|---|
| Sahifa foni | `#ffffff` | **sof oq** (eski kodda `#f7f8fa` edi) |
| Karta foni | `#ffffff` | chegara bilan ajratiladi |
| Ikonka plitkasi | `#e9f3ff` | emoji orqasidagi och ko'k kvadrat |
| Tanlangan karta | `#f3f7ff` | + ko'k chegara |
| Ma'lumot banneri | `#f1f5ff` | 🤝 "Usta qidirish bepul" bloki |

### Matn

| Rol | Kod |
|---|---|
| Sarlavha / asosiy matn | `#131722` |
| Ikkilamchi matn | `#6f7277` |
| Oq fon ustida (hero) | `#ffffff` |
| Hero ikkilamchi | `#dce8fb` |

> Matn ranglari Tailwind'ning `gray-900` / `gray-500` shkalasiga juda
> yaqin — dizayn o'sha mantiqda qurilgan.

---

## 2. Tipografika

Skrinshotdan o'lchangan taxminiy o'lchamlar (576px kenglikda):

| Daraja | Ko'rinish | Qalinlik |
|---|---|---|
| Hero H1 | "Uyingizga usta kerakmi?" — 2 qator, katta | 700–800 |
| Logo | "UstaTop" | 700 |
| Logo tagline | "Usta topish oson" | 400, kichik |
| Bo'lim sarlavhasi | "Xizmat turlari" | 700 |
| Bo'lim yorlig'i (o'ng) | "Keraklisini tanlang", "4 ta" | 400, kulrang |
| Karta yorlig'i | "Santexnik", "Mebel" | 500 |
| Banner sarlavhasi | "Usta qidirish bepul" | 600 |

Shrift: sans-serif (Inter yoki tizim shrifti).

---

## 3. Asosiy tuzilma (bosh sahifa)

Skrinshotdagi tartib — yuqoridan pastga:

```
┌─────────────────────────────────────┐
│ ╭───╮ UstaTop        ╭────────────╮ │  ← HERO (ko'k gradient)
│ │ U │ Usta topish    │📍Hudud     │ │     pastki burchaklar
│ ╰───╯ oson           │  tanlash   │ │     yumaloq (~24px)
│                      ╰────────────╯ │
│   Uyingizga usta                    │
│   kerakmi?                          │
│   Ishonchli xizmatlarni bir         │
│   joydan toping.                    │
│  ┌─────────────────────┬─────────┐  │
│  │ Masalan, santexnik… │ Qidirish│  │  ← oq input + ko'k tugma
│  └─────────────────────┴─────────┘  │     bitta ramkada
└─────────────────────────────────────┘
  Xizmat turlari      Keraklisini tanlang
  ┌────┐ ┌────┐ ┌────┐ ┌────┐
  │ 🧰 │ │ 🚰 │ │ 💡 │ │ ❄️ │           ← 4 ustunli grid
  │Barc│ │Sant│ │Elek│ │Kond│              ikonka plitkada
  └────┘ └────┘ └────┘ └────┘
  ┌────┐ ┌────┐ ┌────┐ ┌────┐
  │ 🧺 │ │ 🪑 │ │ 🖌️ │ │ ➕ │
  │Texn│ │Mebe│ │Bo'yo│ │Bosh│
  └────┘ └────┘ └────┘ └────┘
  ┌─────────────────────────────────┐
  │ 🤝  Usta qidirish bepul          │  ← banner #f1f5ff
  │     Buyurtma yuboring — siz      │
  │     bilan bog'lanish uchun…      │
  └─────────────────────────────────┘
  Tavsiya etilgan ustalar          4 ta
  …
┌─────────────────────────────────────┐
│  🏠 Bosh sahifa  Buyurtma  Buyurtmalar│ ← pastki nav, oq
└─────────────────────────────────────┘
```

### Muhim detallar

1. **Hero — to'liq kenglikdagi blok.** Topbar alohida emas: logo,
   tagline, "Hudud tanlash" tugmasi, sarlavha va qidiruv — hammasi
   **bitta ko'k blok** ichida. Pastki burchaklari yumaloq.
2. **Logo — oq kvadrat + "U" harfi.** Emoji emas, harf. Oq fon,
   ko'k harf, radius ~14px.
3. **Qidiruv — birlashgan blok.** Oq input va ko'k "Qidirish" tugmasi
   bitta oq ramka ichida, tugma o'ng tomonda.
4. **4 ustunli grid** (eski kodda 3 ustun edi). Har bir kartada
   emoji och ko'k plitkada (`#e9f3ff`), ostida yorliq.
5. **"Barchasi" va "Boshqa"** — qo'shimcha kartalar. Jami 8 ta.
   Faol karta ko'k chegara + `#f3f7ff` fon oladi.
6. **Bo'lim sarlavhalari juftlik:** chapda sarlavha, o'ngda kulrang
   yordamchi matn ("Keraklisini tanlang", "4 ta").
7. **Ma'lumot banneri** — emoji + sarlavha + tavsif, och ko'k fon.
8. **Pastki nav** — 3 bo'lim, faol element ko'k.

---

## 4. Shakl

| Element | Radius (taxminiy) |
|---|---|
| Hero pastki burchaklari | ~24px |
| Logo kvadrati | ~14px |
| Qidiruv ramkasi | ~12px |
| Qidirish tugmasi | ~10px |
| "Hudud tanlash" pill | to'liq yumaloq (999px) |
| Kategoriya kartasi | ~14px |
| Ikonka plitkasi | ~12px |
| Banner | ~14px |

**Soya:** deyarli yo'q. Kartalar yupqa chegara bilan ajratilgan.
Dizayn "tekis + chegara" uslubida.

---

## 5. Tayyor CSS tokenlar

```css
:root {
  /* brend */
  --brand:        #1457d9;
  --brand-top:    #1757cf;
  --brand-bottom: #2370ea;
  --brand-soft:   #3877e1;

  /* fon */
  --bg:           #ffffff;
  --card:         #ffffff;
  --tile:         #e9f3ff;
  --tile-active:  #f3f7ff;
  --banner:       #f1f5ff;

  /* matn */
  --text:         #131722;
  --text-2:       #6f7277;
  --on-brand:     #ffffff;
  --on-brand-2:   #dce8fb;

  /* chegara */
  --border:       #e7e9ee;

  /* shakl */
  --r-hero:   24px;
  --r-card:   14px;
  --r-tile:   12px;
  --r-btn:    10px;
  --r-pill:  999px;
}
```

Hero gradienti:

```css
background: linear-gradient(180deg, var(--brand-top), var(--brand-bottom));
border-radius: 0 0 var(--r-hero) var(--r-hero);
```

---

## 6. Boshqa startuplar uchun palitra

Tuzilma bir xil, faqat 4 ta qiymat almashadi:

| Loyiha | `--brand` | `--brand-top` | `--brand-bottom` | `--tile` |
|---|---|---|---|---|
| **UstaTop** | `#1457d9` | `#1757cf` | `#2370ea` | `#e9f3ff` |
| **IjaraGo** | `#17634f` | `#145a47` | `#1f8064` | `#e4f3ed` |
| **LUXPLAY** | `#4a2bd9` | `#3d22b8` | `#6b4bf0` | `#eeeaff` |
| **BiznesAI** | `#4338ca` | `#3a30b0` | `#6366f1` | `#eef0fd` |
| **MahallaMarket** | `#c2560a` | `#a84a08` | `#e2731b` | `#fdf0e4` |

IjaraGo ranglari ChatGPT suhbatidagi haqiqiy dizayndan (`#17634f`,
`#e4f3ed`).

---

## 7. Nima yaxshi ishlagan

1. **Yagona hero bloki** — topbar va qidiruv birlashtirilgan, ekran
   yuqorisi tartibli ko'rinadi
2. **Emoji ikonkalar plitkada** — ikonka kutubxonasi kerak emas (0 KB),
   och ko'k plitka ularni "professional" qiladi
3. **4 ustunli grid** — bitta ekranda 8 ta xizmat ko'rinadi, scroll kam
4. **"Barchasi" / "Boshqa"** kartalari — foydalanuvchi boshi berk
   ko'chaga kirmaydi
5. **Sarlavha + o'ng yorliq juftligi** — har bir bo'lim nima qilish
   kerakligini aytadi ("Keraklisini tanlang")
6. **Sof oq fon** — kulrang fondan toza va yorqinroq ko'rinadi
7. **Tinchlantiruvchi banner** — "Usta qidirish bepul" ishonch beradi

---

## 8. Hozirgi holat

| | Dizayn A (Netlify) | Dizayn B (repo kodi) |
|---|---|---|
| Hero matni | "Uyingizga usta kerakmi?" | "Ustangizni toping" |
| Brend rangi | `#1457d9` yorqin ko'k | `#0f3460` to'q ko'k |
| Sahifa foni | `#ffffff` | `#f7f8fa` |
| Logo | oq kvadrat + "U" | 🛠️ emoji nishoni |
| Xizmat turlari | 8 ta, 4 ustun | 6 ta, 3 ustun |
| Ikonka plitkasi | bor (`#e9f3ff`) | yo'q |
| Ustalar bo'limi | "Tavsiya etilgan ustalar" | "Mashhur ustalar" |
| Ma'lumot banneri | bor | yo'q |
| Hudud tanlash | hero ichida pill | yo'q |
| **Kodi** | ❌ yo'q (Netlify parol ostida) | ✅ `public/` |

**Muammo:** yoqqan dizaynning (A) kodi yo'q. Netlify sayti
`edge-access` parol himoyasi ostida — tashqaridan yuklab bo'lmaydi.

**Ikki yo'l:**
1. **Netlify himoyasini olib tashlash** → men asl kodni aynan
   yuklab olaman (eng aniq yo'l)
2. **Skrinshotlardan qayta qurish** → bu hujjat bo'yicha yozaman;
   qolgan ekranlar uchun skrinshot kerak bo'ladi
