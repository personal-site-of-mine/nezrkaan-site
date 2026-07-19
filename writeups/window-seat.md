---
articleTitle: Window Seat
date: 2026-05-07T00:00:00.000Z
excerpt: Solving Bellingcat's window-seat geolocation challenge. Yellow engine cowls cut the airline pool to three; FlightRadar24 playback narrowed it to two flights over the Alps; a valley silhouette did the rest.
tags_for_filter:
  - CTF
  - Bellingcat
  - Aviation OSINT
advanced:
  dek: A jet engine over many snowy mountains.
  category: Aviation OSINT
  type: Aviation OSINT
  tag: Bellingcat CTF
  number: "004"
  kicker: Field Note 004 Aviation OSINT
  archive_title: "Window Seat: A jet engine over many snowy mountains"
  title: Window Seat Field Notes by Nezr Kaan
  description: Solving Bellingcat Window Seat location challenge from a window seat photo of the Alps to a single tail number using FlightRadar24 and matching mountain shapes.
  keywords: OSINT, aviation OSINT, Bellingcat CTF, Vueling, FlightRadar24, Alps geolocation
  ogTitle: Window Seat
  ogDescription: One window seat photo. Three possible airlines. Two flights over the Alps. One tail number.
---

<p class="lead">
  The challenge showed a jet engine over a large mountain range. The photo details showed 12:55 on 24 February 2026 but the time zone field was empty. The goal was to find the exact tail number.
</p>

<figure class="article-figure">
  <img src="/images/uploads/window-seat-original.jpg" alt="The original challenge photo showing a plane wing in the front and snowy mountains below.">
</figure>

<div class="try-callout">
  <span class="try-callout-icon">↪ Try it</span>
  <p>
    <strong>This writeup contains the solution.</strong> If you want to try the challenge yourself first, it is available at <a href="https://challenge.bellingcat.com/" target="_blank" rel="noopener">challenge.bellingcat.com</a>.
  </p>
</div>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">01</span> / 03</span>
  <h2>The mountains</h2>
</div>

<p>
  When I try to find a location my first step is to look at the ground. I ran the photo through an image search and the results were clear. It was the <strong>European Alps</strong>. It had snowy peaks specific valley shapes and the sharp looks you only see in those mountains.
</p>

<p>
  The problem is that the Alps are huge. Comparing peaks with reference photos gave me too many different results. Every mountain looked a bit like the photo but none of them matched perfectly. There are just too many similar shapes across hundreds of kilometers of mountains. The land alone was not enough to find the exact flight.
</p>

<p>
  I needed another way to solve the problem.
</p>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">02</span> / 03</span>
  <h2>The yellow engines</h2>
</div>

<p>
  So, I started looking at the plane. The photo is not just about the Alps. It also shows a plane and that plane has a specific design. The most unique detail was the engines. They were yellow, which is rare enough to really make the list of airlines smaller.
</p>

<p>
  Image search and Google keywords were not helping much with yellow aircraft engines. Search engines struggle with this kind of specific visual detail because there are too many wrong results. So, I changed my tools and asked Gemini directly. I asked which airlines operate, in Europe, planes with yellow engines. It gave me four options:
</p>

<ul class="evidence">
  <li><span><strong>Condor</strong> is a German airline with a yellow tail and engines from a recent rebrand.</span></li>
  <li><span><strong>Icelandair</strong> has at least one older plane with yellow engines.</span></li>
  <li><span><strong>Vueling</strong> is a Spanish low cost airline with yellow details on the engines.</span></li>
  <li><span><strong>DHL Aviation</strong> has yellow engines but I knew it was not DHL right away. DHL is a cargo airline and this photo was taken from a passenger seat.</span></li>
</ul>

<p>
  I checked the other three with regular image searches. The engines all looked very similar at the photo resolution. So, I could not pick a clear winner just by looking at the design. But three good options was still a much smaller search area than looking at any airline in Europe.
</p>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">03</span> / 03</span>
  <h2>Checking the map</h2>
</div>

<p>
  With three possible airlines and a date the rest of the puzzle was a job for <strong>FlightRadar24</strong>. FR24 keeps past flight data and lets you filter by airline. So, I just needed to find out which Condor, Icelandair or Vueling flight was over the Alps at the time of the photo.
</p>

<p>
  The time needed one more step. The photo details said 12:55 on 24 February 2026 but the time zone field was empty. The photo is clearly over Europe. So, the camera was probably set to local time. In late February that means <strong>CET</strong> which is Central European Time or UTC plus 1. That means 12:55 local time was 11:55 UTC and that was the exact moment I needed to check.
</p>

<a href="https://www.flightradar24.com/" target="_blank" rel="noopener" class="evidence-link is-reference">
  <span class="source-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="9" y1="13" x2="15" y2="13"/>
      <line x1="9" y1="17" x2="13" y2="17"/>
    </svg>
  </span>
  <span class="evidence-link-text">
    <span class="evidence-link-kicker">Tool FlightRadar24</span>
    <span class="evidence-link-title">Live and historical flight tracking with airline filters and playback</span>
  </span>
  <span class="evidence-link-arrow" aria-hidden="true">↗</span>
</a>

<details class="method-detail">
  <summary>How do I use FlightRadar24 filters and playback?</summary>
  <div class="method-detail-body">
    <p>The FR24 playback feature lets you move the global flight map back to any past moment and the airline filter hides the extra noise so you only see the flights you want. Note that playback is a paid feature but the first seven days are free which is enough for one challenge.</p>
    <ol>
      <li>Open flightradar24.com sign in and zoom the map to the area you care about. In this case that means the Alps.</li>
      <li>Click the Filters button in the top menu.</li>
      <li>Open the Airline tab and add the airlines you want to see. Everything else will be hidden.</li>
      <li>From the same menu click Playback. Set the date and the time. For this challenge that is 24 February 2026 at 11:55 UTC.</li>
      <li>FR24 reloads the map at that exact moment with only the filtered airlines visible.</li>
    </ol>
    <figure class="article-figure inline-figure">
      <img src="/images/uploads/window-seat-filter-button.png" alt="The FlightRadar24 top menu with the Filters button shown in a red box.">
    </figure>
  </div>
</details>

<p>
  With the filter set to Condor, Icelandair, Vueling and the time set to 11:55 UTC on 24 February two possible planes were over the Alps. Either one could have been the right plane.
</p>

<figure class="article-figure">
  <img src="/images/uploads/window-seat-2-planes.png" alt="Screenshot of FlightRadar24 map showing two planes crossing the Alps at 11:55 UTC on 24 February 2026.">
</figure>

<p>
  I could have just clicked one and guessed since I have unlimited guesses but that misses the point of the challenge. So, I opened the original photo again and drew lines over the most unique valleys. These were the deepest parts in the front. Then, I turned the satellite map view 180 degrees to match what you would see from a south facing window and I drew the same lines there.
</p>

<figure class="article-figure is-pair">
  <div class="figure-pair">
    <img src="/images/uploads/window-seat-map_view-painted.jpg" alt="Satellite map view of the Alps with valley shapes painted in red turned 180 degrees to match the photo angle.">
    <img src="/images/uploads/window-seat-aviation_2_painted.jpg" alt="The original window seat photo with the same valley shapes painted in red.">
  </div>
  <figcaption>Left is the satellite view turned 180 degrees to match the angle from the plane. Right is the original photo with the same valleys outlined.</figcaption>
</figure>

<p>
  The shapes lined up perfectly. Only one of the two FR24 planes was flying through that exact part of the mountains at 11:55 UTC. Clicking the plane on the map opened a side panel and the <strong>Registration</strong> field gave me the final answer.
</p>

<div class="finding" id="finding">
  <span class="finding-label">The tail number</span>
  <span class="finding-answer" id="findingAnswer" aria-hidden="true">EC-MAH</span>
  <button class="finding-reveal" id="findingReveal" type="button" aria-controls="findingAnswer" aria-expanded="false">
    Reveal the answer
  </button>
  <span class="finding-hint">Solve it first at challenge.bellingcat.com</span>
</div>

<p style="margin-top: 2rem;">
  A photo and a time stamp. The yellow engines narrowed the airlines down to three. The time narrowed the flights down to two. The valleys narrowed it down to just one.
</p>

<div class="acknowledgement">
  <span class="ack-label">Thanks</span>
  <p>Thanks to Galen and the Bellingcat team for this challenge. It was a great and fun puzzle. I am looking forward to the next one.</p>
</div>

<div class="end-mark">✦ ✦ ✦</div>
