---
title: "Rapid Fire — Field Notes by Nezr Kaan"
ogTitle: "Rapid Fire — A Burst That Wasn't Gunfire"
ogDescription: "A short audio clip, a framing built to mislead, and the bird behind the sound."
description: "Solving Bellingcat's Rapid Fire audio OSINT challenge. A misleading prompt, a ruled-out woodpecker, and a single Google dork that led to the Shoebill."
keywords: "OSINT, audio forensics, Bellingcat CTF, Shoebill, South Sudan, bird identification"
date: 2026-04-15
kicker: "Field Note № 002 — Audio OSINT"
articleTitle: "Rapid Fire"
dek: "A short burst and the bird behind it."
tag: "Bellingcat CTF"
type: "Audio forensics"
number: "002"
category: "Audio OSINT"
excerpt: "Solving Bellingcat's audio-only challenge with three minutes of recording and no metadata. A Google dork that landed on the answer."
tags_for_filter: ["CTF", "Bellingcat", "Audio OSINT"]
archive_title: "Rapid Fire: A burst that wasn't gunfire"
---

<p class="lead">
  Bellingcat's audio clip is short. The context around it talked about tension and unrest in South Sudan and how sound carries across the landscape. The whole framing pushed you to hear a gunshot. However, sentence at the end pushed back: <em>not everything is what it seems.</em>
</p>

<div class="try-callout">
  <span class="try-callout-icon">↪ Try it</span>
  <p>
    <strong>This writeup contains the solution.</strong> If you want to try the challenge yourself first, it is available at <a href="https://challenge.bellingcat.com/" target="_blank" rel="noopener">challenge.bellingcat.com</a>.
  </p>
</div>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">01</span> / 03</span>
  <h2>Listening carefully</h2>
</div>

<p>
At first, it sounded exactly like combat footage. But on the second listen, I caught an animal sound, which made me think the clip was recorded in a woodland. So, I thought the main sound might not be a weapon after all.
</p>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">02</span> / 03</span>
  <h2>Guessing the animal</h2>
</div>

<p>
 My first guess was a woodpecker. The rhythm made sense. So, I looked into the native woodpecker species of South Sudan. However, none of them was large enough to produce a sound with that much weight. It had the right pattern, but the wrong scale. So, that theory went out the window.
</p>

<p>
  What I needed was something loud. Loud enough to be mistaken for automatic fire.
</p>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">03</span> / 03</span>
  <h2>Google Dorking</h2>
</div>

<p>
  I ran one Google search:
</p>

<p><span class="dork">"South Sudan" animal sounds like gunshot</span></p>

<p>
  The first page named a bird I had never heard of. The <strong>Shoebill</strong>. A tall, grey bird found in the swamps of central and east Africa.
</p>

<p>
  When a Shoebill claps its beak together, a behaviour called <em>bill-clattering</em>, sounds exactly like a short machine-gun burst. I played some reference recordings alongside the Bellingcat clip and everything matched perfectly.
</p>

<a href="https://www.youtube.com/watch?v=m_iHF39dJFk" target="_blank" rel="noopener" class="evidence-link">
  <span class="play-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
  </span>
  <span class="evidence-link-text">
    <span class="evidence-link-kicker">Evidence — YouTube</span>
    <span class="evidence-link-title">Reference recording of Shoebill bill-clattering</span>
  </span>
  <span class="evidence-link-arrow" aria-hidden="true">↗</span>
</a>

<div class="finding" id="finding">
  <span class="finding-label">The source</span>
  <span class="finding-answer" id="findingAnswer" aria-hidden="true">Shoebill</span>
  <button class="finding-reveal" id="findingReveal" type="button" aria-controls="findingAnswer" aria-expanded="false">
    → Reveal the answer
  </button>
  <span class="finding-hint">Solve it first at challenge.bellingcat.com</span>
</div>

<p style="margin-top: 2rem;">
  This one unravelled fast. Once you ignore the text, the tape stops sounding like combat and starts sounding like what it is.
</p>

<div class="acknowledgement">
  <span class="ack-label">Thanks</span>
  <p>To the Bellingcat team for this one. A short puzzle with a surprising answer. Looking forward to the next.</p>
</div>

<div class="end-mark">✦ ✦ ✦</div>
