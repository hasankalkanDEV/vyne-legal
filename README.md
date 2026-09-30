# Vyne — yasal sayfalar

GitHub Pages `main` dalından yayınlıyor: `main`'e push = canlı (~1 dakika).

| Sayfa | Adres |
|---|---|
| `index.html` | Gizlilik Politikası |
| `terms.html` | Kullanım Şartları |
| `delete-account.html` | Hesabını sil |

**Sayfaları elle düzenleme.** Metinler `tools/content.json`'da, İngilizce ve Türkçe yan yana.
Değiştir, sonra:

```
node tools/build.mjs
```

- Yeni bölüm: `["h2", "English", "Türkçe", "ikon"]`, altına `["p", …]` ya da `["ul", [[…, …]]]`.
- Yeni ikon (uygulamanın çizimlerinden): `node tools/export-glyphs.mjs ikonadı`
  (yan klasörde `vyne-website` olmalı).
- Metin değişince en üstteki tarihi de (`updated`) değiştir.

Gerçekler uygulamanın kodundan: e-posta+şifre ile giriş (Firebase), bulut ve Sentry ABD'de,
bulut yedeği uçtan uca şifreli değil, reklam ve analiz SDK'sı yok, rehber ve takvim izni yok.
Uygulama bunlardan birini değiştirirse bu sayfalar da değişmeli.
