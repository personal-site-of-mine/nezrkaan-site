---
articleTitle: Urban Symphony
date: 2026-04-07T00:00:00.000Z
excerpt: Solving Bellingcat's audio-only challenge with three minutes of recording and no metadata. Working backwards from a pickpocket announcement, bicycle traffic, a Google dork on a travelator phrase and a carillon run to pinpoint a single tower in Amsterdam.
tags_for_filter:
  - CTF
  - Bellingcat
  - Audio OSINT
advanced:
  dek: An audio fingerprint of a city, and the carillon that gave it away.
  category: Audio OSINT
  type: Audio forensics
  tag: Bellingcat CTF
  number: "001"
  kicker: Field Note № 001 — Audio OSINT
  archive_title: "Urban Symphony: An audio fingerprint of a city"
  title: Urban Symphony — Field Notes by Nezr Kaan
  description: Solving Bellingcat's Urban Symphony audio OSINT challenge — identifying a city and its carillon from three minutes of sound and no metadata.
  keywords: OSINT, audio forensics, Bellingcat CTF, Amsterdam, Munttoren, carillon
  ogTitle: Urban Symphony — An Audio Fingerprint of a City
  ogDescription: Solving Bellingcat's audio OSINT challenge with three minutes of sound and no metadata.
---

<p class="lead">
  Bellingcat's challenge has a single instruction and an audio file: <em>the sounds in this clip might sound strange, but together they form an audio fingerprint of a city. Use them to identify the city and the name of the ringing tower.</em> Three minutes of recording. No EXIF. No image.
</p>

<div class="try-callout">
  <span class="try-callout-icon">↪ Try it</span>
  <p>
    <strong>This writeup contains the solution.</strong> If you want to try the challenge yourself first, it is available at <a href="https://challenge.bellingcat.com/" target="_blank" rel="noopener">challenge.bellingcat.com</a>.
  </p>
</div>

<p>
  When there is no technical metadata, there is no shortcut. You have to work out the environment by yourself. And that's what I did. This is how I broke the three minutes down.
</p>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">01</span> / 03</span>
  <h2>Mapping the timeline</h2>
</div>

<p>
  The first step in audio analysis is to strip away imagination and rely strictly on what we hear. I listened to it twice and mapped out the events chronologically.
</p>

<ul class="evidence">
  <li><span><em>The door closed with a hiss.</em> The specific sound of a bus or tram door. The vehicle pulls away.</span></li>
  <li><span><em>A public announcement:</em> "Be aware of pickpockets at this station."</span></li>
  <li><span><em>Church chimes begin.</em> Not a single strike, but a full melodic run.</span></li>
  <li><span><em>A second announcement:</em> "Caution, you are reaching the end of the travelator." Footsteps are audible underneath it.</span></li>
  <li><span><em>A sharp, repeated beep.</em> The tone a bus or tram gives when a wheelchair ramp deploys.</span></li>
</ul>

<p>
  Here is a rule I come back to on every investigation: <strong>when you cannot work out what something is, ask what it is not.</strong> The pickpocket announcement is in English, but the accent is clearly not native. That alone ruled out the UK. A non-native English announcement in a transit hub usually means a major continental European station with enough international traffic that English has become the working language for public safety.
</p>

<div class="pullquote">
  When you cannot work out what something <em>is</em>, ask what it <em>is not</em>.
</div>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">02</span> / 03</span>
  <h2>What the tape isn't saying</h2>
</div>

<p>
There is a constant soft sound of bicycle traffic. No motorbikes or cars close enough to be heard. This told me two things: the location is pedestrianised or very close to it, and it is away from a main road. This helped me narrow down exactly where to look when investigating on the map.
</p>

<p>
  Heavy bicycle traffic points to a small group of countries. The Netherlands and Denmark are the most obvious. Copenhagen was my first guess, but Copenhagen Central plays its announcements in <a href="https://youtu.be/gtla_DufYgs?si=THns_2cvX-VL-Yob&t=88" target="_blank" rel="noopener">Danish as well as English,</a> and there is no Danish on the clip. There is no German either, which rules out much of Belgium and the German border stations. That left the Netherlands. Most likely Amsterdam or Utrecht.
</p>

<p>
  To decide between the two, I ran a Google dork on the travelator line. Searching for the exact phrase <em>"Caution, you are reaching the end of the travelator"</em> returned a <a href="https://www.reddit.com/r/Amsterdam/comments/14xi2mw/why_did_they_do_this/" target="_blank" rel="noopener">Reddit thread in r/Amsterdam</a> where users were discussing the same announcement. That was enough to begin the carillon search with Amsterdam instead of Utrecht.
</p>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">03</span> / 03</span>
  <h2>Pinpointing the tower</h2>
</div>

<p>
  The chimes themselves were the main clue. A full melodic phrase, and not a simple quarter-hour strike, meant I was listening to a <strong>carillon</strong>. A carillon is a tuned set of bells played as an instrument, not an ordinary clock.
</p>

<p>
  A search for Dutch carillons led me to <a href="https://www.towerbells.org/" target="_blank" rel="noopener">towerbells.org</a>, a database of bell towers worldwide. I filtered the Netherlands entries first by "Chimes". Nothing matched. I then switched to "Traditional carillons" and <a href="https://www.towerbells.org/data/atlas/GRegionalMap.html?XMNLTR" target="_blank" rel="noopener"> opened the map view.</a>
</p>

<p>
  I needed a place that fit the acoustic profile. Close to a bus or tram stop. Pedestrianised. Heavy foot and bicycle traffic. No main road within earshot. Zooming into Amsterdam, one pin stood out. The environment around it matched every condition the tape had set.
</p>

<p>
  Before committing to an answer, I wanted to hear it. I spent the next hour on YouTube, playing recordings of each candidate carillon alongside the Bellingcat clip. I compared the tempo, the interval pattern, and the weight and timbre of each set of bells. One recording matched the challenge clip. That was when I was certain.
</p>

<a href="https://www.youtube.com/watch?v=OZ3kBuPnbVA" target="_blank" rel="noopener" class="evidence-link">
  <span class="play-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
  </span>
  <span class="evidence-link-text">
    <span class="evidence-link-kicker">Evidence — YouTube</span>
    <span class="evidence-link-title">Reference recording of the carillon, matched against the Bellingcat clip</span>
  </span>
  <span class="evidence-link-arrow" aria-hidden="true">↗</span>
</a>

<div class="finding" id="finding">
  <span class="finding-label">The tower</span>
  <span class="finding-answer" id="findingAnswer" aria-hidden="true">Munttoren</span>
  <button class="finding-reveal" id="findingReveal" type="button" aria-controls="findingAnswer" aria-expanded="false">
    → Reveal the answer
  </button>
  <span class="finding-hint">Solve it first at challenge.bellingcat.com</span>
</div>

<p style="margin-top: 2rem;">
  No photo. No EXIF. Just three minutes of background noise and enough acoustics to figure out where we were.
</p>

<div class="acknowledgement">
  <span class="ack-label">Thanks</span>
  <p>To the Bellingcat team for designing this challenge. Audio-only CTFs are rare, and this one was carefully put together. Looking forward to the next.</p>
</div>

<div class="end-mark">✦ ✦ ✦</div>
