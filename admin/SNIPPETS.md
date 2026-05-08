# Snippet Library — Field Note Components

When writing a new note, copy and paste these blocks into the **Body HTML** field.
If your prose comes from AI, just paste the prose and wrap special components with these snippets.

---

## 1. Lead paragraph (drop cap)
Use for the first paragraph — starts with a large drop-cap letter.

```html
<p class="lead">
  Your opening paragraph goes here.
</p>
```

---

## 2. Try-it callout
Usually the second block in every writeup.

```html
<div class="try-callout">
  <span class="try-callout-icon">↪ Try it</span>
  <p>
    <strong>This writeup contains the solution.</strong> If you want to try the challenge yourself first, it is available at <a href="https://challenge.bellingcat.com/" target="_blank" rel="noopener">challenge.bellingcat.com</a>.
  </p>
</div>
```

---

## 3. Part header
Splits the writeup into sections. Number them `01 / 03`, `02 / 03`, etc.

```html
<div class="part-header">
  <span class="part-label">Part <span class="part-num">01</span> / 03</span>
  <h2>Section title</h2>
</div>
```

---

## 4. Figure (image)
Single image with optional caption. After uploading via Decap, paste the URL into `src`.

```html
<figure class="article-figure">
  <img src="/images/uploads/file.jpg" alt="Description of the image">
  <figcaption>Caption text — appears in small mono type</figcaption>
</figure>
```

**Small image** (e.g. UI screenshot of a button):
```html
<figure class="article-figure is-small">
  <img src="/images/uploads/button.png" alt="Description">
</figure>
```

**Side-by-side pair** (comparison):
```html
<figure class="article-figure is-pair">
  <div class="figure-pair">
    <img src="/images/uploads/left.jpg" alt="Left image">
    <img src="/images/uploads/right.jpg" alt="Right image">
  </div>
  <figcaption>Side-by-side comparison caption</figcaption>
</figure>
```

---

## 5. Evidence list
Bullet observations or evidence points.

```html
<ul class="evidence">
  <li>First observation — <em>highlighted phrase</em> renders in italic.</li>
  <li>Second observation.</li>
  <li>Third observation.</li>
</ul>
```

---

## 6. Evidence link card
External link card. **Two variants:**

**Video / audio source** (play icon):
```html
<a href="https://youtube.com/..." target="_blank" rel="noopener" class="evidence-link">
  <span class="play-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
  </span>
  <span class="evidence-link-text">
    <span class="evidence-link-kicker">Evidence — YouTube</span>
    <span class="evidence-link-title">Title of the source</span>
  </span>
  <span class="evidence-link-arrow" aria-hidden="true">↗</span>
</a>
```

**Written reference** (Wikipedia, articles, papers):
```html
<a href="https://wikipedia.org/..." target="_blank" rel="noopener" class="evidence-link is-reference">
  <span class="source-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
  </span>
  <span class="evidence-link-text">
    <span class="evidence-link-kicker">Reference — Wikipedia</span>
    <span class="evidence-link-title">Title of the source</span>
  </span>
  <span class="evidence-link-arrow" aria-hidden="true">↗</span>
</a>
```

---

## 7. Pullquote
Standout italic quote. One impactful sentence.

```html
<div class="pullquote">
  Your standout sentence goes here.
</div>
```

---

## 8. Inline code / search query (dork)
Inline code-style box — Google query, terminal command, filename.

```html
<span class="dork">"South Sudan" animal sounds like gunshot</span>
```

As its own paragraph block:
```html
<p><span class="dork">"query string"</span></p>
```

---

## 9. Method dropdown
Collapsible side detail — keeps tangents from breaking flow.

```html
<details class="method-detail">
  <summary>Show the method</summary>
  <div class="method-detail-body">
    <p>Explanation goes here.</p>
    <ol>
      <li>Step one.</li>
      <li>Step two.</li>
      <li>Step three.</li>
    </ol>
  </div>
</details>
```

---

## 10. Finding (blurred answer)
The blurred answer block at the end of the writeup. Use only one per page.

```html
<div class="finding" id="finding">
  <span class="finding-label">The source</span>
  <span class="finding-answer" id="findingAnswer" aria-hidden="true">ANSWER</span>
  <button class="finding-reveal" id="findingReveal" type="button" aria-controls="findingAnswer" aria-expanded="false">
    → Reveal the answer
  </button>
  <span class="finding-hint">Solve it first at challenge.bellingcat.com</span>
</div>
```

---

## 11. Acknowledgement
At the very end of the writeup.

```html
<div class="acknowledgement">
  <span class="ack-label">Thanks</span>
  <p>Your acknowledgement text — renders in italic.</p>
</div>

<div class="end-mark">✦ ✦ ✦</div>
```

---

## Body HTML — recommended order

A typical writeup follows this order:

1. `<p class="lead">` — opening paragraph (drop cap)
2. `<div class="try-callout">` — challenge link
3. `<div class="part-header">` Part 01 — `<p>` paragraphs
4. `<div class="part-header">` Part 02 — `<p>` + figures
5. `<div class="part-header">` Part 03 — evidence, evidence-link cards
6. `<div class="finding">` — answer block
7. Closing paragraph
8. `<div class="acknowledgement">` + `<div class="end-mark">`

---

## Prompting AI

> "Write the body of this writeup as raw HTML using these components: `<p class="lead">`, `<div class="part-header">`, `<p>`, `<figure class="article-figure">`, `<ul class="evidence">`. Number the part headers. Reference images via `/images/uploads/<slug>/`."

That way AI returns ready-to-paste HTML and you only swap in the right image URLs.
