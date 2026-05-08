---
title: "Touching Tarmac — Field Notes by Nezr Kaan"
ogTitle: "Touching Tarmac — A Plane, an Airline, an ICAO Code"
ogDescription: "One taxiing photo. One airline. One airport in the Caribbean."
description: "Solving Bellingcat's Touching Tarmac geolocation challenge — from a single taxiing photo to an airline, an airport and an ICAO code in Cuba."
keywords: "OSINT, geolocation, Bellingcat CTF, Aero Caribbean, Havana, José Martí Airport"
date: 2026-05-04
kicker: "Field Note № 003 — Geolocation OSINT"
articleTitle: "Touching Tarmac"
dek: "A taxiing photo, an airline and one airport in the Caribbean."
tag: "Bellingcat CTF"
type: "Image OSINT"
number: "003"
category: "Image OSINT"
excerpt: "Solving Bellingcat's geolocation challenge from a single photo of parked aircraft. Reading the livery, walking through the airline's route map, and confirming a control tower against historical satellite imagery."
tags_for_filter: ["CTF", "Bellingcat", "Geolocation"]
archive_title: "Touching Tarmac: A taxiing photo and an ICAO code"
---

<p class="lead">
  Bellingcat's brief was short: <em>they're waiting in the wings. While taxiing I took this photo of several aircraft, one looking particularly worse for wear. What is the ICAO code of this airport?</em> One photo. No metadata.
</p>

<figure class="article-figure">
  <img src="/images/touching-tarmac/challenge-original.jpg" alt="The original challenge photograph: small turboprop aircraft parked on a wet apron at dusk, taken from inside a taxiing aircraft.">
</figure>

<div class="try-callout">
  <span class="try-callout-icon">↪ Try it</span>
  <p>
    <strong>This writeup contains the solution.</strong> If you want to try the challenge yourself first, it is available at <a href="https://challenge.bellingcat.com/" target="_blank" rel="noopener">challenge.bellingcat.com</a>.
  </p>
</div>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">01</span> / 03</span>
  <h2>Reading the livery</h2>
</div>

<p>
  When you are given a photo with aircraft in it, the first thing to do is read the planes themselves. The markings narrow the world faster than the ground will.
</p>

<p>
  I cropped tight on the closest aircraft and ran a reverse image search. The white fuselage with a yellow accent matched <strong>Aero Caribbean</strong>, a now-defunct Cuban regional carrier. The Wikipedia entry for the airlines of Cuba confirmed it.
</p>

<figure class="article-figure">
  <img src="/images/touching-tarmac/challenge-zoom.png" alt="A cropped, closer view of one of the parked aircraft showing the Aero Caribbean livery in white and yellow.">
</figure>

<a href="https://en.wikipedia.org/wiki/List_of_airlines_of_Cuba" target="_blank" rel="noopener" class="evidence-link is-reference">
  <span class="source-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="9" y1="13" x2="15" y2="13"/>
      <line x1="9" y1="17" x2="13" y2="17"/>
    </svg>
  </span>
  <span class="evidence-link-text">
    <span class="evidence-link-kicker">Reference — Wikipedia</span>
    <span class="evidence-link-title">List of airlines of Cuba</span>
  </span>
  <span class="evidence-link-arrow" aria-hidden="true">↗</span>
</a>

<p>
  Knowing the airline cuts the search down hard. Aero Caribbean only flew a small set of routes, domestic Cuba plus a handful of Caribbean and Latin American stops.
</p>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">02</span> / 03</span>
  <h2>From hub to apron</h2>
</div>

<p>
  The simplest way to work through that list is to start where the airline flies most. A search for <span class="dork">Aero Caribbean main hub</span> pointed straight at <strong>José Martí International Airport (HAV)</strong> in Havana. So I started there.
</p>

<p>
  Before opening the satellite view, I went back to the photo and wrote down what should be visible from above. This is the part of the work I always find most useful — turning a ground-level photo into a checklist of overhead features.
</p>

<ul class="evidence">
  <li><span><em>Aircraft parked facing each other</em>, in a radial arrangement instead of the usual nose-out parallel rows.</span></li>
  <li><span><em>A grass strip with a sharp, geometric corner</em>, instead of the rounded edges of a typical taxiway shoulder.</span></li>
  <li><span><em>A single low building</em> in the middle distance behind the parked aircraft.</span></li>
  <li><span><em>A black-and-white control tower</em> further to the left, beyond the building.</span></li>
</ul>

<p>
  The radial arrangement was the strongest signal. Most aprons line aircraft up parallel and nose-out. A circle of planes facing each other is rare and it shows up clearly from above.
</p>

<p>
  I opened José Martí on Google Earth and started scanning the apron areas. It did not take long.
</p>

<figure class="article-figure">
  <img src="/images/touching-tarmac/aerial-apron.png" alt="Satellite view of a circular apron at José Martí International Airport with several aircraft parked radially around its edge, highlighted with a red box.">
</figure>

<p>
  The grass corner matched. The low building matched. The taxiway curving in from the runway lined up with the angle the photo was taken from — the photographer was almost certainly taxiing along that exact line, just as the brief said.
</p>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">03</span> / 03</span>
  <h2>The tower in time</h2>
</div>

<p>
  Two strong matches still wasn't enough for me. The photo also showed a black-and-white control tower in the background and I wanted that confirmed before locking in the answer.
</p>

<figure class="article-figure">
  <img src="/images/touching-tarmac/aerial-context.png" alt="Wider satellite view showing the circular apron at the bottom and a building near the top, both highlighted with red boxes.">
</figure>

<figure class="article-figure is-small">
  <img src="/images/touching-tarmac/watch-tower.png" alt="Cropped detail from the original challenge photograph showing the control tower faintly visible in the background.">
  <figcaption>The control tower, just visible in the background of the original photo.</figcaption>
</figure>

<p>
  The current Google Earth imagery showed a tower in roughly the right place, but from straight above. A flat top-down view does not show you much of a tower's body. What I needed was a satellite pass at a different angle — oblique enough that the vertical surfaces actually showed.
</p>

<p>
  That is what <strong>historical imagery</strong> is for. Google Earth keeps every satellite pass it has ever recorded for a given location and you can scrub through them by date. Different dates mean different lighting, different angles and sometimes a much better look at vertical structures.
</p>

<details class="method-detail">
  <summary>How do I view historical imagery in Google Earth?</summary>
  <div class="method-detail-body">
    <p>Google Earth keeps every satellite pass it has ever recorded for a given coordinate. Scrubbing through them lets you see the same building under different lighting, from different angles and across years.</p>
    <ol>
      <li>Open Google Earth — either the web version at <em>earth.google.com</em> or the desktop app.</li>
      <li>Navigate to the location you want to inspect.</li>
      <li>Click the clock icon in the toolbar, just to the right of the search bar.</li>
      <li>Drag the timeline slider through the available dates and compare the results.</li>
    </ol>
    <figure class="article-figure inline-figure">
      <img src="/images/touching-tarmac/historical-imagery-button.png" alt="Google Earth toolbar with the historical imagery clock icon highlighted by a red box.">
    </figure>
  </div>
</details>

<p>
  Scrubbing back through the dates, the imagery from <strong>24 July 2022</strong> caught the tower from the angle I needed. Black painted body, white observation deck near the top. Same proportions, same placement, same colours.
</p>

<figure class="article-figure">
  <img src="/images/touching-tarmac/control-tower.png" alt="Aerial view of a black-and-white control tower with a circular observation deck, taken from an oblique satellite pass.">
</figure>

<p>
  Same airport. Same apron. Same tower. The ICAO code was the only thing left to write down.
</p>

<div class="finding" id="finding">
  <span class="finding-label">The code</span>
  <span class="finding-answer" id="findingAnswer" aria-hidden="true">MUHA</span>
  <button class="finding-reveal" id="findingReveal" type="button" aria-controls="findingAnswer" aria-expanded="false">
    → Reveal the answer
  </button>
  <span class="finding-hint">Solve it first at challenge.bellingcat.com</span>
</div>

<p style="margin-top: 2rem;">
  One photo, no metadata. Once you read the planes, the rest of it lined up — airline, hub, apron geometry, tower.
</p>

<div class="acknowledgement">
  <span class="ack-label">Thanks</span>
  <p>To Logan and the Bellingcat team for this one. A clean little geolocation puzzle with a satisfying chain of deductions. Looking forward to the next.</p>
</div>

<div class="end-mark">✦ ✦ ✦</div>
