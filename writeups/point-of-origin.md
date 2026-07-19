---
articleTitle: Point of Origin
date: 2026-06-04T00:00:00.000Z
excerpt: Solving Bellingcat's crater geolocation challenge from a single photo
  taken in Orikhiv, Ukraine. Reverse image searching a church to pin a street,
  then reading the blast pattern to find the munition's direction of fire.
tags_for_filter:
  - CTF
  - Bellingcat
  - Geolocation
  - Munition Analysis
advanced:
  ogTitle: "Point of Origin: A Crater, a Church, a Direction"
  ogDescription: "One photo of a crater in a Ukrainian street. Two questions:
    where, and from which direction."
  number: "005"
  dek: A crater, a church, and a street in Ukraine.
  keywords: OSINT, geolocation, munition analysis, crater analysis, blast pattern,
    Bellingcat CTF, Orikhiv, Ukraine, Pokrovska
  kicker: Field Note № 005 — Geolocation OSINT
  title: Point of Origin — Field Notes by Nezr Kaan
  type: Geolocation OSINT
  tag: Bellingcat CTF
  archive_title: "Point of Origin: A crater and a compass bearing"
  description: Solving Bellingcat's Point of Origin challenge. Geolocating a
    crater photo to Pokrovska Street in Orikhiv, Ukraine and working out the
    munition's direction of fire from the blast pattern.
  category: Geolocation OSINT
---
<p class="lead">
  This month's Bellingcat challenges have all been about blast analysis and they have been fun to work through. This challenge gave one photo of a crater in a Ukrainian street. Two questions. What street is this and from which direction was the munition fired?
</p>

<figure class="article-figure">
  <img src="images/uploads/point-of-origin-blast-photo.jpg">
</figure>

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
  The first step was identifying the street. I used Google Reverse Image Search. Instead of running the whole photo I cropped it tight on the church in the background. The church has a distinctive shape and that is usually enough on its own.
</p>

<p>
  The search returned a few photos of the same church but none of them named it directly. However, I discovered <a href="https://catholicvirginian.org/news/global/greek-catholic-bishop-in-ukraine-only-37-parishes-remain-active/" target="_blank" rel="noopener">an article </a> that identified the church's general location. This led me to search the town of Orikhiv in Ukraine's Zaporizhzhia region on Google Maps. There are only two churches in the area and the one matching our image is the <strong>Svyato-Pokrovskyy Khram</strong> (Свято-Покровський храм).
</p>

<figure class="article-figure">
  <img src="/images/uploads/point-of-origin-maps-bird-view.png" alt="Bird's-eye satellite view of the area around Svyato-Pokrovskyy Khram in Orikhiv, with the exact location marked.">
  <figcaption>The exact location on Google Maps, with the church and surrounding streets visible.</figcaption>
</figure>

<p>
  There is only one angle in the area where the white building and the church behind the trees line up the way they do in the photo. That gave me the exact spot. The coordinates are <span class="dork">47.575376, 35.785224</span>. The street is <strong>Pokrovska</strong> (Покровська).
</p>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">02</span> / 02</span>
  <h2>Reading the crater</h2>
</div>

<p>
  The second question was about direction. To work out where the munition came from I needed to look closely at the edges of the crater, then match that to a compass bearing on Google Earth.
</p>

<figure class="article-figure is-pair">
  <div class="figure-pair">
    <img src="/images/uploads/point-of-origin-blast-zoom.jpg" alt="Cropped close-up of the crater showing the uplifted and fractured asphalt edge facing toward the camera.">
    <img src="/images/uploads/point-of-origin-north-aligned-map.png" alt="Google Earth view of the location aligned to true North using the compass icon in the bottom right corner.">
  </div>
  <figcaption>Left is the close-up of the crater edge. Right is the Google Earth view aligned to true North using the compass icon in the bottom right corner.</figcaption>
</figure>

<p>
  The uplifted, fractured edge of the asphalt is facing the camera. This tells you which way the munition was moving. The blast pushes material in the same direction the munition was travelling. So the munition came from the background of the photo and moved toward the foreground.
</p>

<p>
  Lining up the North-aligned map with the photo, the uplifted edge of the asphalt is pointing south. The asphalt was pushed south, which means the munition came from the north. That is the point of origin.
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
  The church gave us the street. The crater edge gave us the direction.
</p>

<div class="acknowledgement">
  <span class="ack-label">Thanks</span>
  <p>Thanks to the Bellingcat team for this one. The crater analysis was the best part. It made me slow down and look closely at what the blast actually left on the road.</p>
</div>

<div class="end-mark">✦ ✦ ✦</div>
