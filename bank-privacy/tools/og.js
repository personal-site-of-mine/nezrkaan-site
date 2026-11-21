// Makes the share images (1200 x 630) that LinkedIn, X and messaging apps show for the Bank Privacy Index.
//
//   node bank-privacy/tools/og.js            the index image and one image per scored bank
//   node bank-privacy/tools/og.js index      only the index image
//
// Needs Chrome and puppeteer-core. Set CHROME to Chrome's path, PUPPETEER to puppeteer-core's folder
// and FONTS to a folder holding the @fontsource packages for Newsreader and JetBrains Mono.
// Images go to images/bank-privacy/; run Eleventy afterwards so the pages point to them.

const fs = require("fs");
const path = require("path");

const SITE = path.join(__dirname, "..", "..");
const OUT = path.join(SITE, "images", "bank-privacy");
const CHROME = process.env.CHROME || "/usr/bin/google-chrome";
const puppeteer = require(process.env.PUPPETEER || "puppeteer-core");
const FONTS = process.env.FONTS || path.join(SITE, "node_modules");

const font = (file) => fs.readFileSync(path.join(FONTS, file)).toString("base64");
const fontCss = `
@font-face { font-family: "Newsreader"; font-weight: 200 800; src: url(data:font/woff2;base64,${font("@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2")}) format("woff2-variations"); }
@font-face { font-family: "Newsreader"; font-weight: 200 800; unicode-range: U+0100-02BA, U+1E00-1EFF; src: url(data:font/woff2;base64,${font("@fontsource-variable/newsreader/files/newsreader-latin-ext-opsz-normal.woff2")}) format("woff2-variations"); }
@font-face { font-family: "JetBrains Mono"; font-weight: 400; src: url(data:font/woff2;base64,${font("@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2")}) format("woff2"); }
@font-face { font-family: "JetBrains Mono"; font-weight: 500; src: url(data:font/woff2;base64,${font("@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2")}) format("woff2"); }`;

// The site's dark theme colours (css/base.css)
const C = { bg: "#1D1A15", raised: "#252119", text: "#EDE6D0", muted: "#B8AE9A", faint: "#8F8678", border: "#3A342B", purple: "#9278D9", orange: "#D68357" };

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const page = (body) => `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
${fontCss}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 1200px; height: 630px; background: ${C.bg}; color: ${C.text}; }
body { font-family: "Newsreader", serif; padding: 64px 80px; display: flex; flex-direction: column; position: relative; overflow: hidden; }
.label { font-family: "JetBrains Mono", monospace; font-size: 19px; letter-spacing: 0.2em; text-transform: uppercase; color: ${C.orange}; display: flex; align-items: center; gap: 18px; }
.label::before { content: ""; width: 44px; height: 1px; background: ${C.orange}; }
.foot { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; font-family: "JetBrains Mono", monospace; font-size: 19px; letter-spacing: 0.08em; color: ${C.faint}; }
.foot b { color: ${C.text}; font-weight: 500; }
.rule { position: absolute; left: 0; right: 0; bottom: 0; height: 10px; background: linear-gradient(90deg, ${C.purple} 0 62%, ${C.border} 62% 100%); }
</style></head><body>${body}<div class="rule"></div></body></html>`;

function indexCard(data) {
  const counts = data.regions.map((r) => `${r.name} ${r.count}`).join(" · ");
  return page(`
<p class="label">Bank Privacy Index</p>
<h1 style="font-size: 92px; line-height: 1.02; font-weight: 400; letter-spacing: -0.02em; margin-top: 54px; font-variation-settings: 'opsz' 72;">Which banks sell<br>your data?</h1>
<p style="font-size: 34px; line-height: 1.35; color: ${C.muted}; margin-top: 30px; max-width: 900px;">${data.total} of the most-used banks in the UK, the US and Europe, scored out of 10 on how they treat your data.</p>
<div class="foot"><span><b>nezrkaan.com</b>/bank-privacy</span><span>${esc(counts)}</span></div>`);
}

function bankCard(bank) {
  const nameSize = bank.name.length > 16 ? 76 : bank.name.length > 11 ? 92 : 108;
  const sells = `${bank.selling[0]} ${bank.selling[1]}`;
  return page(`
<p class="label">Bank Privacy Index · ${esc(bank.region)}</p>
<div style="display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; margin-top: 46px;">
  <h1 style="font-size: ${nameSize}px; line-height: 1; font-weight: 400; letter-spacing: -0.02em; font-variation-settings: 'opsz' 72;">${esc(bank.name)}</h1>
  <p style="white-space: nowrap; line-height: 1;"><span style="font-size: 132px; font-weight: 400; letter-spacing: -0.03em;">${bank.totalShown}</span><span style="font-family: 'JetBrains Mono', monospace; font-size: 26px; color: ${C.faint}; margin-left: 12px;">/ 10${bank.provisional ? "*" : ""}</span></p>
</div>
<div style="height: 8px; background: ${C.border}; margin-top: 30px; border-radius: 4px; overflow: hidden;"><div style="height: 100%; width: ${bank.total * 10}%; background: ${C.purple};"></div></div>
<p style="font-size: 34px; line-height: 1.3; margin-top: 36px;">Does ${esc(bank.name)} sell your data?</p>
<p style="font-size: 26px; line-height: 1.4; color: ${C.muted}; margin-top: 10px; max-width: 1040px;">${esc(sells)}</p>
<div class="foot"><span><b>nezrkaan.com</b>/bank-privacy/${esc(bank.slug)}</span><span>${bank.provisional ? "* provisional" : ""}</span></div>`);
}

(async () => {
  const data = require(path.join(SITE, "_data", "bankPrivacy.js"))();
  const only = process.argv[2];
  fs.mkdirSync(path.join(OUT, "og"), { recursive: true });

  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
  const tab = await browser.newPage();
  await tab.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  const shoot = async (html, file) => {
    await tab.setContent(html, { waitUntil: "load" });
    await tab.evaluate(() => document.fonts.ready);
    await tab.screenshot({ path: file, type: "png" });
    console.log("wrote", path.relative(SITE, file));
  };

  await shoot(indexCard(data), path.join(OUT, "og.png"));
  if (only !== "index") {
    for (const bank of data.banks) await shoot(bankCard(bank), path.join(OUT, "og", `${bank.slug}.png`));
  }
  await browser.close();
})();
