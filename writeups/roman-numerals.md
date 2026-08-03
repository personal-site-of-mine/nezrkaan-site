---
articleTitle: Roman Numerals
date: 2026-08-03T00:00:00.000Z
excerpt: Two LeetCode problems, one number system. Turning Roman numerals into
  integers with a single pass and a simple rule, then going the other way with
  a greedy loop and two arrays.
tags_for_filter:
  - Blog
  - LeetCode
  - Java
advanced:
  ogTitle: "Roman Numerals: Two Problems, One Number System"
  ogDescription: "Solving LeetCode 13 (Roman to Integer) and 12 (Integer to
    Roman) in Java. The logic behind both, in plain terms."
  number: "006"
  dek: Two LeetCode problems, one number system.
  keywords: LeetCode, Roman to Integer, Integer to Roman, Java, algorithms,
    greedy, string parsing
  kicker: Field Note № 006 — LeetCode
  title: Roman Numerals — Field Notes by Nezr Kaan
  type: Coding
  tag: LeetCode
  archive_title: "Roman Numerals: Both directions in Java"
  description: Solving LeetCode problems 13 and 12 in Java. Roman to Integer
    with a one-pass subtraction rule, and Integer to Roman with a greedy loop
    over two parallel arrays.
  category: Coding
---
<p class="lead">
  This one is not an OSINT note. I have been solving LeetCode problems to keep my Java sharp, and two of them fit together nicely. Problem 13 asks you to turn a Roman numeral into an integer. Problem 12 asks you to go the other way. Same seven symbols, two directions.
</p>

<div class="try-callout">
  <span class="try-callout-icon">↪ Try it</span>
  <p>
    <strong>This writeup contains full solutions.</strong> If you want to try the problems yourself first, they are at <a href="https://leetcode.com/problems/roman-to-integer/" target="_blank" rel="noopener">Roman to Integer</a> and <a href="https://leetcode.com/problems/integer-to-roman/" target="_blank" rel="noopener">Integer to Roman</a>.
  </p>
</div>

<p>
  Quick refresher on the symbols. <span class="dork">I</span> is 1, <span class="dork">V</span> is 5, <span class="dork">X</span> is 10, <span class="dork">L</span> is 50, <span class="dork">C</span> is 100, <span class="dork">D</span> is 500, <span class="dork">M</span> is 1000. Symbols are normally written from big to small, and you add them up. The exception is the subtractive pairs. Four is not IIII, it is IV. Nine is IX. The same trick gives you XL, XC, CD and CM. Both problems are really about handling that one exception.
</p>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">01</span> / 03</span>
  <h2>Roman to Integer</h2>
</div>

<p>
  First I wrote a small helper called <span class="dork">translate</span>. It takes one letter and returns its value. Nothing clever, just an if-else chain. It keeps the main method clean, because the main method never has to think about what a letter is worth. It just asks.
</p>

<p>
  Then the main idea. Read the string left to right and keep a running total. Most of the time you add the value of each letter. The only problem is the subtractive pairs. In IV, the I should count as minus one, not plus one.
</p>

<p>
  Here is the thing that makes it easy. A subtractive pair is the only place in a valid Roman numeral where a smaller letter sits in front of a bigger one. So the rule becomes one comparison. Look at the letter after the current one. If the current value is smaller than the next value, subtract it. Otherwise, add it.
</p>

<p>
  Take <span class="dork">MCMXCIV</span>. M is 1000, add it. C is smaller than the M after it, subtract 100. M again, add 1000. X is smaller than the C after it, subtract 10. C, add 100. I is smaller than the V after it, subtract 1. V, add 5. Total: 1994.
</p>

<p>
  The last letter has no next letter, so the loop checks <span class="dork">i + 1 &lt; s.length()</span> before comparing. If there is no next letter, the letter just gets added. One pass over the string and the total is done.
</p>

<div class="finding is-code" id="findingRoman">
  <span class="finding-label">The full code</span>
  <div class="finding-answer" id="findingRomanAnswer" aria-hidden="true"><pre><code>class Solution {

    public int translate(char letter) {
        if (letter == 'I') {
            return 1;
        }
        else if (letter == 'V') {
            return 5;
        }
        else if (letter == 'X') {
            return 10;
        }
        else if (letter == 'L') {
            return 50;
        }
        else if (letter == 'C') {
            return 100;
        }
        else if (letter == 'D') {
            return 500;
        }
        else if (letter == 'M') {
            return 1000;
        }
        else {
            return 0;
        }
    }

    public int romanToInt(String s) {
        int store = 0;

        for (int i = 0; i &lt; s.length(); i++) {

            if (i + 1 &lt; s.length() &amp;&amp; translate(s.charAt(i)) &lt; translate(s.charAt(i + 1))) {

                store = store - translate(s.charAt(i));
            }
            else {

                store = store + translate(s.charAt(i));
            }
        }

        return store;
    }
}</code></pre></div>
  <button class="finding-reveal" type="button" aria-controls="findingRomanAnswer" aria-expanded="false">
    → Reveal the code
  </button>
  <span class="finding-hint">Solve it first at leetcode.com</span>
</div>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">02</span> / 03</span>
  <h2>Integer to Roman</h2>
</div>

<p>
  Going the other way sounds harder, but the trick is to stop treating the subtractive pairs as special. I set up two arrays that line up with each other. One holds the values from biggest to smallest, the other holds the matching symbols. The pairs like 900 and CM, or 4 and IV, are in the list as their own entries, exactly like M or I.
</p>

<p><span class="dork">{1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1}</span></p>

<p>
  Once the pairs live in the table, subtraction stops being a case you have to handle. The rest is greedy. Walk down the list. While the number is still bigger than or equal to the current value, append the symbol and subtract the value. When the number drops below the value, move to the next entry.
</p>

<p>
  Take 1994. It is bigger than 1000, so append M and drop to 994. Not bigger than 1000 anymore, move on. Bigger than 900, append CM, drop to 94. Skip down to 90, append XC, drop to 4. Skip down to 4, append IV, done. Result: <span class="dork">MCMXCIV</span>.
</p>

<p>
  I used a <span class="dork">StringBuilder</span> instead of adding to a normal String. In Java a String cannot change, so every plus in a loop builds a whole new copy. StringBuilder just appends.
</p>

<div class="finding is-code" id="findingInt">
  <span class="finding-label">The full code</span>
  <div class="finding-answer" id="findingIntAnswer" aria-hidden="true"><pre><code>class Solution {
    public String intToRoman(int num) {
        int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String[] symbols = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

        StringBuilder result = new StringBuilder();

        for (int i = 0; i &lt; values.length; i++) {
            while (num &gt;= values[i]) {
                result.append(symbols[i]);
                num = num - values[i];
            }
        }

        return result.toString();
    }
}</code></pre></div>
  <button class="finding-reveal" type="button" aria-controls="findingIntAnswer" aria-expanded="false">
    → Reveal the code
  </button>
  <span class="finding-hint">Solve it first at leetcode.com</span>
</div>

<div class="part-header">
  <span class="part-label">Part <span class="part-num">03</span> / 03</span>
  <h2>A shorter way</h2>
</div>

<p>
  After solving it I asked Claude to review my code. According to Claude Fable 5, this is the efficient way to code this:
</p>

<pre><code>class Solution {
    public String intToRoman(int num) {
        String[] thousands = {"", "M", "MM", "MMM"};
        String[] hundreds  = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
        String[] tens      = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
        String[] ones      = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};

        return thousands[num / 1000] + hundreds[num % 1000 / 100]
             + tens[num % 100 / 10] + ones[num % 10];
    }
}</code></pre>

<p>
  The idea is that the input never goes above 3999, so each digit place only has a few possible spellings. Write them all out once, then use the digits of the number as indexes. No loops at all. My greedy version and this one are both fast enough for the problem, but this one is hard to beat for how little it does at runtime.
</p>

<p>
  Two easy problems on paper, but they teach the same lesson from both sides. Roman numerals look like a pile of special cases. Put the exception in the right place, one comparison in the first problem, a few extra table entries in the second, and the special cases disappear.
</p>

<div class="end-mark">✦ ✦ ✦</div>
