# UstaTop

Ishonchli ustalarni mijozlar bilan bog'laydigan platforma — demo versiya.

**Jonli sayt:** https://aslbek3.github.io/ishtop3/

## Nima qiladi

Odamlar santexnik, elektrik, mebel ustasi va boshqa mutaxassislarni
topadi, narx va sharhlarni ko'radi, onlayn buyurtma beradi.

## Tarkibi

| Fayl | Tavsif |
|---|---|
| `public/index.html` | Barcha ekranlar (bosh sahifa, qidiruv, profil, buyurtma, panel) |
| `public/css/style.css` | Mobil-first dizayn |
| `public/js/main.js` | Ekranlar almashishi, qidiruv, buyurtma mantiqi |
| `startup.md` | Barcha startup g'oyalari va biznes-rejalar arxivi |

Backend yo'q — sof statik sayt. Buyurtmalar hozircha serverga
yuborilmaydi, ustalar ro'yxati namuna uchun.

## Mahalliy ishga tushirish

```bash
cd public
python -m http.server 8000
# brauzerda: http://localhost:8000
```

## Deploy

Sayt `gh-pages` branchidan GitHub Pages orqali chiqariladi.
`public/` papkasidagi o'zgarishlardan keyin:

```bash
git subtree push --prefix public origin gh-pages
```

## Holati

Bu demo versiya. Keyingi bosqichlar `startup.md` faylida.
