---
title: Point of Origin — Field Notes by Nezr Kaan
kicker: Field Note № 005 — Geolocation OSINT
articleTitle: Point of Origin
dek: A crater, a church, and a street in Ukraine.
date: 2026-06-04
tag: Bellingcat CTF
type: Geolocation OSINT
readtime: 4 min read
number: "005"
category: Geolocation OSINT
archive_title: "Point of Origin: A crater and a compass bearing"
excerpt: Solving Bellingcat's crater geolocation challenge from a single photo taken in Orikhiv, Ukraine. Reverse image searching a church to pin a street, then reading the blast pattern to find the munition's direction of fire.
tags_for_filter:
  - CTF
  - Bellingcat
  - Geolocation
  - Munition Analysis
description: Solving Bellingcat's Point of Origin challenge — geolocating a crater photo to Pokrovska Street in Orikhiv, Ukraine, and determining the munition's direction of fire from blast pattern analysis.
keywords: OSINT, geolocation, crater analysis, blast pattern, munition direction, Bellingcat CTF, Orikhiv, Ukraine, Pokrovska
ogTitle: Point of Origin — A Crater, a Church, a Direction
ogDescription: "One photo of a crater in a Ukrainian street. Two questions: where, and from which direction."
---

<p class="lead">
  Bellingcat's brief was short: <em>a photo taken somewhere in Ukraine shows a crater in the road. What street was the photo taken on — and from which direction was the munition fired?</em> One photo. Two questions.
</p>

<div class="try-callout">
  <span class="try-callout-icon">↪ Try it</span>
  <p>
    <strong>This writeup contains the solution.</strong> If you want to try the challenge yourself first, it is available at <a href="https://challenge.bellingcat.com/" target="_blank" rel="noopener">challenge.bellingcat.com</a>.
  </p>
</div>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">01</span> / 02</span>
  <h2>Geolocating the street</h2>
</div>

<p>
  The first step was identifying the street. I used Google Reverse Image Search, but instead of running the full photo I cropped it tightly on the church in the background. The architecture is iconic enough to search on its own.
</p>

<p>
  I found several photos of the church but none of them named it directly. One result led further than the others — an article on catholicvirginian.org covering Greek Catholic parishes in Ukraine placed a similar-looking church in the region. That was enough to open Google Maps and search the town of <strong>Orikhiv</strong> in Ukraine's Zaporizhzhia region. There are only two churches in the area. The one matching the photo is <strong>Svyato-Pokrovskyy Khram</strong> (Свято-Покровський храм).
</p>

<figure class="article-figure is-pair">
  <div class="figure-pair">
    <img src="/images/point-of-origin/maps-bird-view.png" alt="Bird's-eye satellite view of the area around Svyato-Pokrovskyy Khram in Orikhiv, with the exact location marked.">
    <img src="/images/point-of-origin/blast-photo.jpg" alt="The original challenge photograph: a crater in a damaged road with the church visible behind trees in the background.">
  </div>
  <figcaption>Left is the exact location on Google Maps. Right is the original challenge photo with the church visible behind the trees.</figcaption>
</figure>

<p>
  By analysing the surroundings, there is only one specific angle and line of sight that places the white building and the church behind the trees in the same frame. The exact coordinates are <span class="dork">47.575376, 35.785224</span>. This confirms the photo was taken on <strong>Pokrovska Street</strong> (Покровська).
</p>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">02</span> / 02</span>
  <h2>Reading the crater</h2>
</div>

<p>
  The second question was about direction. To find the point of origin I needed to look closely at the edges of the crater.
</p>

<figure class="article-figure">
  <img src="/images/point-of-origin/blast-zoom.jpg" alt="Cropped close-up of the crater showing the uplifted and fractured asphalt edge facing toward the camera.">
</figure>

<p>
  The uplifted and fractured edge of the asphalt is facing toward the camera. This fragmentation pattern tells you which way the munition was moving. It displaced material in the direction it was travelling, so it came from the background of the photo toward the foreground.
</p>

<p>
  To turn that into a compass bearing, I went back to Google Earth and clicked the compass icon in the bottom right corner to align the map exactly to North.
</p>

<figure class="article-figure">
  <img src="/images/point-of-origin/north-aligned-map.png" alt="Google Earth view of the location aligned to true North, used to determine the bearing of the displaced asphalt edge.">
</figure>

<p>
  Comparing the North-aligned map view against the photo, the uplifted edge of the asphalt is pointing toward the South. For the kinetic energy of the impact to tilt the asphalt in that direction, the munition must have come from the opposite side. The point of origin is <strong>North</strong>.
</p>

<div class="finding" id="finding">
  <span class="finding-label">Street · Direction</span>
  <span class="finding-answer" id="findingAnswer" aria-hidden="true">Покровська · North</span>
  <button class="finding-reveal" id="findingReveal" type="button" aria-controls="findingAnswer" aria-expanded="false">
    → Reveal the answer
  </button>
  <span class="finding-hint">Solve it first at challenge.bellingcat.com</span>
</div>

<p style="margin-top: 2rem;">
  One photo, two questions. The church named the street. The crater's fractured edge named the direction.
</p>

<div class="acknowledgement">
  <span class="ack-label">Thanks</span>
  <p>To the Bellingcat team for this one. The crater analysis especially rewards slowing down and looking carefully at what the physics of the impact actually left behind.</p>
</div>

<div class="end-mark">✦ ✦ ✦</div>
