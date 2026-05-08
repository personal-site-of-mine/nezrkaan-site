# Snippet Kütüphanesi — Field Note bileşenleri

Yeni yazı yazarken **Body HTML** alanına şu blokları kopyala-yapıştır.
AI metni düz yazı olarak verirse, sen sadece özel bileşenleri sarmalarsın.

---

## 1. Lead paragraf (drop cap)
İlk paragrafa kullan — büyük harfle başlar.

```html
<p class="lead">
  İlk paragraf metni buraya gelir.
</p>
```

---

## 2. Try it kutusu
Her yazıda ikinci blok genelde bu olur.

```html
<div class="try-callout">
  <span class="try-callout-icon">↪ Try it</span>
  <p>
    <strong>This writeup contains the solution.</strong> If you want to try the challenge yourself first, it is available at <a href="https://challenge.bellingcat.com/" target="_blank" rel="noopener">challenge.bellingcat.com</a>.
  </p>
</div>
```

---

## 3. Bölüm başlığı (Part header)
Yazıyı bölümlere ayırır. `01 / 03`, `02 / 03` gibi numaralandır.

```html
<div class="part-header">
  <span class="part-label">Part <span class="part-num">01</span> / 03</span>
  <h2>Bölüm başlığı</h2>
</div>
```

---

## 4. Görsel (figure)
Tek görsel, alt açıklamayla. Görseli Decap'tan yükleyince URL'i `<img src=...>`'e koy.

```html
<figure class="article-figure">
  <img src="/images/uploads/dosya.jpg" alt="Görselin açıklaması">
  <figcaption>Caption metni — küçük mono yazıyla görünür</figcaption>
</figure>
```

**Küçük görsel** (örn. UI butonu screenshot):
```html
<figure class="article-figure is-small">
  <img src="/images/uploads/buton.png" alt="Açıklama">
</figure>
```

**Yan yana iki görsel** (karşılaştırma):
```html
<figure class="article-figure is-pair">
  <div class="figure-pair">
    <img src="/images/uploads/sol.jpg" alt="Sol görsel">
    <img src="/images/uploads/sag.jpg" alt="Sağ görsel">
  </div>
  <figcaption>İki görselin yan yana karşılaştırması</figcaption>
</figure>
```

---

## 5. Kanıt listesi (evidence)
Madde madde gözlem/kanıt.

```html
<ul class="evidence">
  <li>İlk gözlem — <em>vurgulamak istediğin kelime</em> italik olur.</li>
  <li>İkinci gözlem.</li>
  <li>Üçüncü gözlem.</li>
</ul>
```

---

## 6. Kaynak kartı (evidence-link)
Dış bağlantı kartı. **İki türü var:**

**Video/Audio** (oynat ikonu):
```html
<a href="https://youtube.com/..." target="_blank" rel="noopener" class="evidence-link">
  <span class="play-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
  </span>
  <span class="evidence-link-text">
    <span class="evidence-link-kicker">Evidence — YouTube</span>
    <span class="evidence-link-title">Kaynağın başlığı</span>
  </span>
  <span class="evidence-link-arrow" aria-hidden="true">↗</span>
</a>
```

**Yazılı kaynak** (Wikipedia, makale vs):
```html
<a href="https://wikipedia.org/..." target="_blank" rel="noopener" class="evidence-link is-reference">
  <span class="source-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
  </span>
  <span class="evidence-link-text">
    <span class="evidence-link-kicker">Reference — Wikipedia</span>
    <span class="evidence-link-title">Kaynağın başlığı</span>
  </span>
  <span class="evidence-link-arrow" aria-hidden="true">↗</span>
</a>
```

---

## 7. Pull quote (alıntı)
Vurgulanan italik alıntı. Tek satır, etkileyici cümle için.

```html
<div class="pullquote">
  Vurgulamak istediğin cümle buraya gelir.
</div>
```

---

## 8. Inline kod / arama sorgusu (dork)
Satır içi kod tarzı kutu — Google sorgusu, terminal komutu, dosya adı.

```html
<span class="dork">"South Sudan" animal sounds like gunshot</span>
```

Kendi paragrafı olarak büyük göstermek için:
```html
<p><span class="dork">"sorgu metni"</span></p>
```

---

## 9. Method dropdown (açılır metod kutusu)
Detaylı yan açıklamalar — okuyucuyu ana akıştan koparmadan açıklama.

```html
<details class="method-detail">
  <summary>Methodu göster</summary>
  <div class="method-detail-body">
    <p>Açıklama metni buraya.</p>
    <ol>
      <li>Adım bir.</li>
      <li>Adım iki.</li>
      <li>Adım üç.</li>
    </ol>
  </div>
</details>
```

---

## 10. Finding (blurlanmış cevap)
Yazının sonunda blurlanmış cevap kutusu. Sadece bir tane olmalı.

```html
<div class="finding" id="finding">
  <span class="finding-label">The source</span>
  <span class="finding-answer" id="findingAnswer" aria-hidden="true">CEVAP</span>
  <button class="finding-reveal" id="findingReveal" type="button" aria-controls="findingAnswer" aria-expanded="false">
    → Reveal the answer
  </button>
  <span class="finding-hint">Solve it first at challenge.bellingcat.com</span>
</div>
```

---

## 11. Acknowledgement (teşekkür)
Yazının en sonunda.

```html
<div class="acknowledgement">
  <span class="ack-label">Thanks</span>
  <p>Teşekkür metni — italik gösterilir.</p>
</div>

<div class="end-mark">✦ ✦ ✦</div>
```

---

## Body HTML — sıralama önerisi

Genelde şu sırayla yazıyorsun:

1. `<p class="lead">` — açılış paragrafı (drop cap)
2. `<div class="try-callout">` — challenge linki
3. `<div class="part-header">` Part 01 — `<p>`paragraflar
4. `<div class="part-header">` Part 02 — `<p>` + figure'lar
5. `<div class="part-header">` Part 03 — kanıtlar, evidence-link'ler
6. `<div class="finding">` — cevap kutusu
7. Kapanış paragrafı
8. `<div class="acknowledgement">` + `<div class="end-mark">`

---

## AI'ya prompt verirken

> "Bu yazıyı `<p class="lead">`, `<div class="part-header">`, `<p>`, `<figure class="article-figure">`, `<ul class="evidence">` bileşenlerini kullanarak HTML olarak yaz. Bölüm başlıklarını numaralandır. Görselleri `/images/uploads/<slug>/` yoluyla referansla."

şeklinde söylersen, AI doğrudan kullanılabilir HTML üretir, sen sadece kopyala-yapıştır.
