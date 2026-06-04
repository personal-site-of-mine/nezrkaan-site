---
title: Point of Origin — Field Notes by Nezr Kaan
kicker: Field Note № 005 — Geolocation OSINT
articleTitle: Point of Origin
dek: A crater, a church, and a street in Ukraine.
date: 2026-06-04
tag: Bellingcat CTF
type: Geolocation OSINT
readtime: 5 min read
number: "005"
category: Geolocation OSINT
archive_title: "Point of Origin: A crater and a compass bearing"
excerpt: Solving Bellingcat's crater geolocation challenge from a single photo
  taken in Orikhiv, Ukraine. Reverse image searching a church, pinning a street,
  and reading the blast pattern to find the direction of fire.
tags_for_filter:
  - CTF
  - Bellingcat
  - Geolocation
description: Solving Bellingcat's Point of Origin challenge — geolocating a
  crater photo to Pokrovska Street in Orikhiv, Ukraine, and determining the
  munition's direction of fire from blast pattern analysis.
keywords: OSINT, geolocation, Bellingcat CTF, Orikhiv, Ukraine, crater analysis,
  blast pattern
ogTitle: Point of Origin — A Crater, a Church, a Direction
ogDescription: "One photo of a crater in a Ukrainian street. Two questions:
  where, and from which direction."
---
<p class="lead">

  Bellingcat's brief was direct: <em>a photo taken in a Ukrainian town shows a crater in the road. Where was the photo taken — and from which direction was the munition fired?</em> One image, no metadata. Two questions.

<div class="try-callout">  <span class="try-callout-icon">↪ Try it</span>  <p>    <strong>This writeup contains the solution.</strong> If you want to try the challenge yourself first, it is available at <a href="https://challenge.bellingcat.com/" target="_blank" rel="noopener">challenge.bellingcat.com</a>.  </p></div>

<div class="part-header">

  <span class="part-label">Part <span class="part-num">01</span> / 02</span>

  <h2>Geolocating the street</h2>

</div>

<p>

  The first task was identifying the location. I cropped the image tightly on the church in the background — its architecture is distinctive enough to search on its own. A Google reverse image search returned several matching photos, but none named the building directly.

</p>

<p>

  One result led further than the others: an article on catholicvirginian.org covering Greek Catholic parishes in Ukraine placed a similar-looking church in the region. That gave me a starting point. I searched the town of <strong>Orikhiv</strong> in Ukraine's Zaporizhzhia region on Google Maps. There are only two churches in the area. The one matching the photo is <strong>Svyato-Pokrovskyy Khram</strong> (Свято-Покровський храм).

</p>

<figure class="article-figure">

  <img src="/images/uploads/point-of-origin/maps-bird-view.png" alt="Bird's-eye satellite view of the area around Svyato-Pokrovskyy Khram in Orikhiv, with the church and surrounding streets visible.">

</figure>

<p>

  From there I worked out the exact angle. There is only one line of sight from which both the white building and the church — partially screened by trees — appear in the same frame at the proportions shown. The coordinates I landed on were <span class="dork">47.575376, 35.785224</span> — on <strong>Pokrovska Street</strong> (Покровська).

</p>

<figure class="article-figure">

  <img src="/images/uploads/point-of-origin/blast-photo.jpg" alt="The original challenge photograph: a crater in a damaged asphalt road, with a church visible behind trees in the background.">

</figure>

<div class="part-header">

  <span class="part-label">Part <span class="part-num">02</span> / 02</span>

  <h2>Reading the crater</h2>

</div>

<p>

  The second question — which direction was the munition fired from — came down to reading the crater itself.

</p>

<ul class="evidence">

  <li><span><em>The uplifted, fractured edge of the asphalt</em> faces toward the camera — toward the foreground of the photo.</span></li>

  <li><span><em>Fragmentation patterns like this indicate direction of travel.</em> The munition displaced material in the direction it was moving, so it traveled from the background toward the foreground.</span></li>

</ul>

<figure class="article-figure">

  <img src="/images/uploads/point-of-origin/blast-zoom.jpg" alt="Cropped close-up of the crater showing the uplifted and fractured asphalt edge facing toward the camera.">

</figure>

<p>

  To turn that into a compass bearing, I returned to Google Earth and aligned the map to true North using the compass icon. Comparing the North-aligned satellite view against the photograph placed the uplifted edge pointing <strong>south</strong>. For the kinetic energy to push the asphalt in that direction, the munition had to have come from the opposite direction.

</p>

<figure class="article-figure">

  <img src="/images/uploads/point-of-origin/north-aligned-map.png" alt="Google Earth view of the location aligned to true North, used to determine the bearing of the crater's displaced edge.">

</figure>

<div class="finding" id="finding">

  <span class="finding-label">Street · Direction</span>

  <span class="finding-answer" id="findingAnswer" aria-hidden="true">Покровська · North</span>

  <button class="finding-reveal" id="findingReveal" type="button" aria-controls="findingAnswer" aria-expanded="false">

→ Reveal the answer</button> <span class="finding-hint">Solve it first at challenge.bellingcat.com</span>

</div>

<p style="margin-top: 2rem;">

  One photo. Two questions. The church named the street; the crater's fractured edge named the direction. Neither required anything beyond what was already in the open.

</p>

<div class="acknowledgement">

  <span class="ack-label">Thanks</span>

  <p>To the Bellingcat team for this one. A tight little puzzle — the crater analysis especially rewards slowing down and looking carefully at what the physics of the impact actually left behind.</p>

</div>

<div class="end-mark">✦ ✦ ✦</div>
