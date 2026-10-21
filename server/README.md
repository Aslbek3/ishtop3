# UstaTop — server (VPS)

Ubuntu 22.04 · nginx + Certbot · PocketBase port **8090**

```
Brauzer ──► nginx (443, SSL)
              ├─ /       ──► public/           statik fayllar
              ├─ /api/   ──► 127.0.0.1:8090    PocketBase API
              └─ /_/     ──► 127.0.0.1:8090    admin paneli
```

PocketBase faqat `127.0.0.1` da tinglaydi — tashqaridan to'g'ridan-to'g'ri
kirib bo'lmaydi, hamma narsa nginx orqali o'tadi.

---

## O'rnatish

```bash
cd /root/projects/ustatop
git pull

sudo bash server/setup.sh

sudo cp server/nginx-ustatop.conf /etc/nginx/sites-available/ustatop
sudo ln -sf /etc/nginx/sites-available/ustatop /etc/nginx/sites-enabled/ustatop
sudo nginx -t && sudo systemctl reload nginx

sudo certbot --nginx -d ustatop.duckdns.org
```

Keyin `https://ustatop.duckdns.org/_/` ni ochib **birinchi admin akkauntni**
yarating. Parolni ishonchli joyda saqlang — tiklash yo'li yo'q.

---

## Jadvallar (collections)

Admin panelda quyidagilarni yarating.

### `ustalar`

| Maydon | Turi | Izoh |
|---|---|---|
| `user` | relation → users | ustaning akkaunti |
| `name` | text | majburiy |
| `categoryKey` | text | majburiy |
| `region` | text | majburiy |
| `price` | text | |
| `phone` | text | majburiy |
| `bio` | text | |
| `photos` | file (ko'p, max 5) | ish namunalari |
| `rating` | number | 0 dan boshlanadi |
| `active` | bool | admin tasdiqlaguncha `false` |

**API qoidalari:** `List`/`View` — `active = true`;
`Create`/`Update` — `@request.auth.id = user.id`; `Delete` — faqat admin.

### `orders`

| Maydon | Turi |
|---|---|
| `customer` | relation → users |
| `usta` | relation → ustalar (ixtiyoriy) |
| `categoryKey` | text |
| `region` | text |
| `name` | text |
| `phone` | text |
| `comment` | text |
| `status` | select: `yangi` · `jarayonda` · `bajarildi` · `bekor` |

**API qoidalari:** `List`/`View` — `@request.auth.id = customer.id`
(usta o'ziga biriktirilganini ko'radi); `Create` — ro'yxatdan o'tganlar;
`Update` — faqat admin (holat o'zgartirish).

### `reviews`

| Maydon | Turi |
|---|---|
| `order` | relation → orders |
| `usta` | relation → ustalar |
| `stars` | number 1–5 |
| `text` | text |

---

## Muhim eslatmalar

**Versiya qotirilgan.** `pb/VERSION` faylida o'rnatilgan versiya yozilgan.
PocketBase hali `0.x` da — avtomatik yangilamang, har yangilanishdan oldin
zaxira nusxa oling va o'zgarishlar ro'yxatini o'qing.

**Zaxira nusxa.** Hamma narsa `pb/pb_data/` ichida. Kunlik nusxa:

```bash
echo '0 3 * * * tar -czf /root/backups/pb-$(date +\%F).tgz -C /root/projects/ustatop/pb pb_data' | crontab -
```

`/root/backups/` papkasini oldindan yarating va vaqti-vaqti bilan
serverdan tashqariga ham ko'chiring — server o'chsa nusxa ham yo'qoladi.

---

## Foydali buyruqlar

```bash
systemctl status ustatop-pb          # holati
systemctl restart ustatop-pb         # qayta ishga tushirish
journalctl -u ustatop-pb -f          # jonli loglar
curl localhost:8090/api/health       # API tirikmi
```
